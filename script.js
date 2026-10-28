(function () {
  var root = document.documentElement;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  try {
    var saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
  } catch (e) {}

  function current() {
    var t = root.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // word-by-word reveal; returns roughly how long it takes (ms)
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
    if (!el || !note) return;
    fetch("https://github-contributions-api.jogruber.de/v4/adrientdonf?y=last")
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var list = d.contributions || [];
        if (!list.length) throw new Error("empty");
        var pad = new Date(list[0].date + "T00:00:00").getDay();
        var frag = document.createDocumentFragment();
        var total = 0, idx = 0;
        function add(cls, title) {
          var i = document.createElement("i");
          if (cls) i.className = cls;
          if (title) i.title = title;
          i.style.setProperty("--d", (Math.floor(idx / 7) * 14 + (idx % 7) * 10) + "ms");
          idx++;
          frag.appendChild(i);
          return i;
        }
        for (var p = 0; p < pad; p++) add("pad");
        list.forEach(function (c) {
          total += c.count;
          add("l" + c.level, c.count + " on " + c.date);
        });
        el.appendChild(frag);
        note.textContent = total + " contributions in the last year";
      })
      .catch(function () {
        el.style.display = "none";
        note.innerHTML = 'see my activity on <a href="https://github.com/adrientdonf" target="_blank" rel="noopener">GitHub</a>';
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

  document.addEventListener("DOMContentLoaded", function () {
    var total = reveal();
    shine(total);
    entries();
    graph();
    watchBuild();

    var links = document.querySelectorAll(".menu a");
    for (var i = 0; i < links.length; i++) links[i].style.setProperty("--n", i);

    var dot = document.getElementById("theme-toggle");
    if (dot) {
      dot.addEventListener("click", function () {
        var next = current() === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try { localStorage.setItem("theme", next); } catch (e) {}
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
