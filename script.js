(function () {
  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  root.classList.add("js");
  try {
    var saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}

  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // wait for the fonts so text doesn't jump when they swap in
  function whenFontsReady(fn) {
    var done = false;
    function go() { if (done) return; done = true; fn(); }
    setTimeout(go, 1500);
    if (document.fonts && document.fonts.load) {
      Promise.all([
        document.fonts.load('400 17px "Inter"'),
        document.fonts.load('600 17px "Inter"'),
        document.fonts.load('400 14px "Geist Mono"')
      ]).then(go, go);
    } else {
      go();
    }
  }

  // everything outside the about text fades up as it comes into view
  function smooth() {
    var sel = [
      "main h1",
      "main .subtitle",
      "main > .label",
      ".entries > .entry",
      ".work-list > .wrow",
      ".rvx",
      "main > .more",
      ".projects > .project",
      ".certs > .cert",
      "footer .resume"
    ].join(",");
    var els = Array.prototype.slice.call(document.querySelectorAll(sel));
    els.forEach(function (el) { el.classList.add("rv"); });

    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }

    var hasAbout = !!document.querySelector(".reveal");
    var first = true;
    var io = new IntersectionObserver(function (items) {
      var batch = items
        .filter(function (i) { return i.isIntersecting; })
        .map(function (i) { return i.target; });
      if (!batch.length) return;
      batch.sort(function (a, b) { return a.compareDocumentPosition(b) & 4 ? -1 : 1; });
      batch.forEach(function (el, k) {
        var d = first
          ? (!hasAbout ? Math.min(k, 8) * 120 : (k < 3 ? k * 110 : 800 + Math.min(k - 3, 8) * 110))
          : Math.min(k, 6) * 90;
        el.style.setProperty("--rd", d + "ms");
        el.classList.add("in");
        io.unobserve(el);
      });
      first = false;
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  // word-by-word reveal for the about text; returns roughly how long it takes (ms)
  function reveal() {
    if (reduced) return 0;
    var n = 0;
    var blocks = document.querySelectorAll(".reveal");
    for (var b = 0; b < blocks.length; b++) {
      var nodes = Array.prototype.slice.call(blocks[b].childNodes);
      nodes.forEach(function (node) {
        if (node.nodeType === 3) {
          var frag = document.createDocumentFragment();
          node.textContent.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
            } else {
              var s = document.createElement("span");
              s.className = "w";
              s.textContent = part;
              s.style.animationDelay = n * 32 + "ms";
              n++;
              frag.appendChild(s);
            }
          });
          node.parentNode.replaceChild(frag, node);
        } else if (node.nodeType === 1) {
          node.classList.add("w");
          node.style.animationDelay = n * 32 + "ms";
          node.addEventListener("animationend", function done(e) {
            if (e.target !== node) return;
            node.classList.remove("w");
            node.style.animationDelay = "";
            node.removeEventListener("animationend", done);
          });
          n++;
        }
      });
    }
    return n * 32 + 900;
  }

  // brief shine on the company pills to invite a click
  function shine(delay) {
    if (reduced) return;
    var chips = document.querySelectorAll(".about .chip");
    for (var i = 0; i < chips.length; i++) {
      (function (c, k) {
        setTimeout(function () {
          c.classList.add("shine");
          setTimeout(function () { c.classList.remove("shine"); }, 1300);
        }, delay + 600 + k * 380);
      })(chips[i], i);
    }
  }

  // smooth slide open/closed for the experience rows
  function entries() {
    var items = document.querySelectorAll(".entry");
    for (var i = 0; i < items.length; i++) {
      (function (el) {
        var summary = el.querySelector("summary");
        var body = el.querySelector(".detail");
        if (!summary || !body) return;
        var busy = false;
        summary.addEventListener("click", function (e) {
          e.preventDefault();
          if (busy) return;
          if (reduced || !el.animate) { el.open = !el.open; return; }
          busy = true;
          var opening = !el.open;
          var start = el.offsetHeight;
          if (opening) el.open = true;
          var end = opening ? el.offsetHeight : summary.offsetHeight;
          el.style.overflow = "hidden";
          var ease = "cubic-bezier(.2, .7, .2, 1)";
          var slide = el.animate({ height: [start + "px", end + "px"] }, { duration: 460, easing: ease });
          var fade = body.animate(
            opening
              ? { opacity: [0, 1], transform: ["translateY(-8px)", "none"] }
              : { opacity: [1, 0], transform: ["none", "translateY(-8px)"] },
            { duration: 380, easing: "ease", fill: "both" }
          );
          slide.onfinish = function () {
            if (!opening) el.open = false;
            el.style.overflow = "";
            fade.cancel();
            busy = false;
          };
        });
      })(items[i]);
    }
  }

  function graph() {
    var el = document.getElementById("graph");
    var note = document.getElementById("graph-note");
    var build = document.getElementById("build");
    if (!el || !note || !build) return;

    el.setAttribute("role", "grid");
    el.setAttribute("aria-label", "GitHub contributions over the last year");

    var tooltip = build.querySelector(".graph-tooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.className = "graph-tooltip";
      tooltip.setAttribute("role", "status");
      tooltip.setAttribute("aria-hidden", "true");

      var countLine = document.createElement("div");
      countLine.className = "graph-tooltip-count";
      var dateLine = document.createElement("div");
      dateLine.className = "graph-tooltip-date";

      tooltip.appendChild(countLine);
      tooltip.appendChild(dateLine);
      build.appendChild(tooltip);
    }

    var countLine = tooltip.querySelector(".graph-tooltip-count");
    var dateLine = tooltip.querySelector(".graph-tooltip-date");

    function hideTooltip() {
      tooltip.classList.remove("is-visible");
      tooltip.setAttribute("aria-hidden", "true");
    }

    function showTooltip(cell, contribution) {
      var count = contribution.count || 0;
      var date = new Date(contribution.date + "T00:00:00");
      countLine.textContent = count + (count === 1 ? " contribution" : " contributions");
      dateLine.textContent = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
      });

      tooltip.classList.add("is-visible");
      tooltip.setAttribute("aria-hidden", "false");

      var buildRect = build.getBoundingClientRect();
      var cellRect = cell.getBoundingClientRect();
      var half = tooltip.offsetWidth / 2;
      var left = cellRect.left + cellRect.width / 2 - buildRect.left;
      left = Math.max(half + 4, Math.min(buildRect.width - half - 4, left));

      var top = cellRect.top - buildRect.top - tooltip.offsetHeight - 8;
      if (top < 0) top = cellRect.bottom - buildRect.top + 8;

      tooltip.style.left = left + "px";
      tooltip.style.top = top + "px";
    }

    fetch("https://github-contributions-api.jogruber.de/v4/adrientdonf?y=last")
      .then(function (r) {
        if (!r.ok) throw new Error("Contribution request failed");
        return r.json();
      })
      .then(function (d) {
        var list = d.contributions || [];
        if (!list.length) throw new Error("No contribution data");

        el.textContent = "";
        var pad = new Date(list[0].date + "T00:00:00").getDay();
        var frag = document.createDocumentFragment();
        var total = 0;
        var idx = 0;

        function addPadding() {
          var cell = document.createElement("i");
          cell.className = "pad";
          cell.setAttribute("aria-hidden", "true");
          frag.appendChild(cell);
        }

        function addContribution(c) {
          var cell = document.createElement("i");
          cell.className = "l" + c.level;
          cell.setAttribute("role", "gridcell");
          cell.setAttribute("tabindex", "0");

          var date = new Date(c.date + "T00:00:00").toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
          });
          cell.setAttribute(
            "aria-label",
            (c.count || 0) + ((c.count || 0) === 1 ? " contribution on " : " contributions on ") + date
          );

          cell.style.setProperty(
            "--d",
            (Math.floor(idx / 7) * 14 + (idx % 7) * 10) + "ms"
          );
          idx++;

          cell.addEventListener("pointerenter", function (e) {
            if (e.pointerType !== "touch") showTooltip(cell, c);
          });
          cell.addEventListener("pointerleave", function (e) {
            if (e.pointerType !== "touch") hideTooltip();
          });
          cell.addEventListener("focus", function () {
            showTooltip(cell, c);
          });
          cell.addEventListener("blur", hideTooltip);
          cell.addEventListener("click", function () {
            showTooltip(cell, c);
          });

          frag.appendChild(cell);
        }

        for (var p = 0; p < pad; p++) addPadding();

        list.forEach(function (c) {
          total += c.count || 0;
          addContribution(c);
        });

        el.appendChild(frag);
        note.textContent = total + " contributions in the last year";
      })
      .catch(function () {
        el.style.display = "none";
        note.innerHTML = 'see my activity on <a href="https://github.com/adrientdonf" target="_blank" rel="noopener">GitHub</a>';
      });

    document.addEventListener("pointerdown", function (e) {
      if (!el.contains(e.target)) hideTooltip();
    });
  }
  function watchBuild() {
    var build = document.getElementById("build");
    if (!build) return;
    if (reduced || !("IntersectionObserver" in window)) { build.classList.add("in"); return; }
    var io = new IntersectionObserver(function (items) {
      items.forEach(function (e) {
        if (e.isIntersecting) { build.classList.add("in"); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(build);
  }

  function start() {
    try {
      smooth();
      var total = reveal();
      shine(total);
      entries();
      watchBuild();
    } catch (e) {
      var all = document.querySelectorAll(".rv");
      for (var i = 0; i < all.length; i++) all[i].classList.add("in");
      var b = document.getElementById("build");
      if (b) b.classList.add("in");
    }
    root.classList.add("ready");
  }

  document.addEventListener("DOMContentLoaded", function () {
    graph();
    whenFontsReady(start);

    var links = document.querySelectorAll(".menu a");
    for (var i = 0; i < links.length; i++) links[i].style.setProperty("--n", i);

    var dot = document.getElementById("theme-toggle");
    if (dot) {
      var switching = false;
      dot.addEventListener("click", function () {
        if (switching) return;
        var next = current() === "dark" ? "light" : "dark";
        function apply() {
          root.setAttribute("data-theme", next);
          try { localStorage.setItem("theme", next); } catch (e) {}
        }
        if (!document.startViewTransition || reduced) { apply(); return; }
        var r = dot.getBoundingClientRect();
        var x = r.left + r.width / 2, y = r.top + r.height / 2;
        var radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        switching = true;
        root.classList.add("theme-switching");
        var t = document.startViewTransition(apply);
        t.ready.then(function () {
          root.animate(
            { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + radius + "px at " + x + "px " + y + "px)"] },
            { duration: 750, easing: "cubic-bezier(.4, 0, .2, 1)", pseudoElement: "::view-transition-new(root)" }
          );
        });
        t.finished.then(done, done);
        function done() { switching = false; root.classList.remove("theme-switching"); }
      });
    }

    var burger = document.getElementById("menu-toggle");
    var menu = document.getElementById("menu");
    if (!burger || !menu) return;
    function setMenu(open) {
      menu.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    }
    burger.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    menu.addEventListener("click", function (e) { if (e.target === menu) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  });
})();
