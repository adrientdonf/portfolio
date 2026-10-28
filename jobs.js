(function () {
  var S = function (inner) { return '<svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">' + inner + '</svg>'; };
  var JOBS = {
    "mount-sinai": {
      org: "Mount Sinai", role: "Cybersecurity Operations Analyst Intern", dates: "Jun 2026 – Sep 2026", team: "Cybersecurity Operations · Remote",
      art: S('<path class="bg" d="M320 60L410 92V180C410 240 370 280 320 304C270 280 230 240 230 180V92Z"/><circle class="al" cx="330" cy="170" r="44"/><path class="al" d="M362 202L394 234"/><rect class="mu" x="50" y="100" width="140" height="12" rx="6"/><rect class="mu" x="50" y="130" width="110" height="12" rx="6"/><rect class="ac" x="50" y="160" width="150" height="12" rx="6"/><rect class="mu" x="50" y="190" width="120" height="12" rx="6"/><rect class="mu" x="50" y="220" width="90" height="12" rx="6"/><rect class="bg" x="450" y="110" width="130" height="90" rx="8"/><path class="ln" d="M450 120L515 165L580 120"/><circle class="ac" cx="585" cy="108" r="14"/><path class="ln" d="M450 290L480 280L510 285L540 245L570 280"/><circle class="ac" cx="540" cy="245" r="7"/>'),
      bullets: [
        "Triaged and investigated security incidents as part of incident response, working alerts in <b>CrowdStrike Falcon</b> from the first signal to a clear conclusion.",
        "Analyzed <b>host-based security events and endpoint telemetry</b> to work out what actually happened on a machine, then documented every finding so incidents could be resolved faster and the next analyst could pick up where I left off.",
        "Monitored user activity and email traffic with <b>Abnormal AI</b> and <b>Proofpoint</b>, using <b>anomaly detection</b> to surface suspicious behavior, phishing attempts, and policy violations.",
        "During the internship I also completed CrowdStrike University's <b>Incident Responder</b> learning plan, along with courses on investigation, Charlotte AI, Falcon Fusion SOAR, and endpoint data protection."
      ],
      tags: ["CrowdStrike Falcon", "Abnormal AI", "Proofpoint", "Incident Response", "Anomaly Detection"]
    },
    "gca": {
      org: "Global Career Accelerator", role: "Web Development Intern", dates: "Jun 2026 – Aug 2026", team: "Web Development · Remote",
      art: S('<rect class="bg" x="150" y="60" width="340" height="240" rx="14"/><path class="ln" d="M150 96H490"/><circle class="ac" cx="174" cy="78" r="5"/><circle class="mu" cx="192" cy="78" r="5"/><circle class="mu" cx="210" cy="78" r="5"/><rect class="mu" x="172" y="116" width="296" height="70" rx="8"/><rect class="ln" x="172" y="204" width="88" height="78" rx="8"/><rect class="ln" x="276" y="204" width="88" height="78" rx="8"/><rect class="al" x="380" y="204" width="88" height="78" rx="8"/><rect class="bg" x="520" y="120" width="80" height="150" rx="14"/><rect class="mu" x="534" y="140" width="52" height="30" rx="4"/><rect class="mu" x="534" y="182" width="52" height="12" rx="4"/><rect class="ac" x="534" y="204" width="36" height="12" rx="4"/><text class="tx" x="44" y="200" font-size="54">&lt;/&gt;</text>'),
      bullets: [
        "Worked with partner companies to design and deploy <b>client-facing websites</b>, building them with <b>HTML5, CSS3, JavaScript, and Bootstrap</b>.",
        "Used <b>wireframing</b> to settle layout and flow before building, then turned those wireframes into <b>responsive interfaces</b> that hold up from phone to desktop.",
        "Used <b>AI-assisted development workflows</b> to prototype faster and get to production-ready pages sooner.",
        "Earned program badges in AI-Powered JavaScript with L'Oréal, Web Development with Intel, Intercultural Skills with UNESCO, and AI Professional Skills with OpenAI."
      ],
      tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Wireframing"]
    },
    "brotherhood": {
      org: "The Brotherhood", role: "Vice President", dates: "Sep 2024 – Present", team: "Student Organization · Case Western Reserve University", present: true,
      art: S('<rect class="bg" x="90" y="70" width="250" height="220" rx="12"/><path class="ln" d="M90 110H340"/><rect class="mu" x="106" y="124" width="48" height="36" rx="6"/><rect class="mu" x="162" y="124" width="48" height="36" rx="6"/><rect class="ac" x="218" y="124" width="48" height="36" rx="6"/><rect class="mu" x="274" y="124" width="48" height="36" rx="6"/><rect class="mu" x="106" y="170" width="48" height="36" rx="6"/><rect class="ac" x="162" y="170" width="48" height="36" rx="6"/><rect class="mu" x="218" y="170" width="48" height="36" rx="6"/><rect class="mu" x="274" y="170" width="48" height="36" rx="6"/><rect class="mu" x="106" y="216" width="48" height="36" rx="6"/><rect class="mu" x="162" y="216" width="48" height="36" rx="6"/><rect class="mu" x="218" y="216" width="48" height="36" rx="6"/><rect class="ac" x="274" y="216" width="48" height="36" rx="6"/><path class="ln" d="M385 290H592"/><rect class="mu" x="400" y="210" width="34" height="80" rx="5"/><rect class="mu" x="448" y="190" width="34" height="100" rx="5"/><rect class="mu" x="496" y="160" width="34" height="130" rx="5"/><rect class="ac" x="544" y="120" width="34" height="170" rx="5"/>'),
      bullets: [
        "Led event marketing for the fall semester and grew average attendance <b>30%</b>, from about 45 to <b>60+ people</b> per event, by promoting across several channels at once instead of leaning on one.",
        "Negotiated a <b>single campus calendar</b> with 5 other student organizations so events stopped landing on top of each other, preventing <b>3 major scheduling conflicts</b>.",
        "Saved an estimated <b>$500</b> in venue booking fees that would have been wasted on double-booked dates."
      ],
      tags: ["Event Marketing", "Cross-Channel Promotion", "Negotiation", "Leadership"]
    },
    "posse": {
      org: "Posse Foundation", role: "Social Media Manager", dates: "Feb 2025 – Apr 2025", team: "Cleveland, Ohio",
      art: S('<rect class="bg" x="160" y="70" width="320" height="200" rx="14"/><path class="ac" d="M300 135L352 170L300 205Z"/><rect class="mu" x="160" y="296" width="320" height="8" rx="4"/><rect class="ac" x="160" y="296" width="140" height="8" rx="4"/><rect class="bg" x="70" y="130" width="70" height="124" rx="10"/><path class="al" d="M92 180L116 192L92 204Z"/><rect class="bg" x="510" y="90" width="70" height="124" rx="10"/><path class="al" d="M532 140L556 152L532 164Z"/><rect class="mu" x="510" y="234" width="70" height="10" rx="5"/><rect class="mu" x="510" y="254" width="48" height="10" rx="5"/>'),
      bullets: [
        "Directed media coverage for the annual retreat, which brought together <b>70 attendees</b>, and turned <b>5 hours of raw footage</b> into <b>15 short-form videos</b> to keep people engaged online after the event ended.",
        "Ran the end-to-end content pipeline for a <b>3-month calendar</b>, coordinating with <b>13 stakeholders</b> so everything was planned, produced, and posted on time.",
        "Cut technical disruptions by <b>90%</b> by keeping that pipeline organized from start to finish."
      ],
      tags: ["Short-Form Video", "Content Calendar", "Social Media", "Stakeholder Coordination"]
    },
    "taco-bell": {
      org: "Taco Bell", role: "Shift Lead", dates: "Jun 2023 – Aug 2024", team: "Part-Time · Dallas, TX",
      art: S('<rect class="bg" x="90" y="70" width="80" height="170" rx="6"/><rect class="mu" x="104" y="90" width="52" height="10" rx="5"/><rect class="mu" x="104" y="112" width="40" height="10" rx="5"/><rect class="ac" x="104" y="134" width="52" height="10" rx="5"/><rect class="bg" x="190" y="70" width="80" height="170" rx="6"/><rect class="mu" x="204" y="90" width="52" height="10" rx="5"/><rect class="mu" x="204" y="112" width="30" height="10" rx="5"/><rect class="bg" x="290" y="70" width="80" height="170" rx="6"/><rect class="mu" x="304" y="90" width="44" height="10" rx="5"/><rect class="mu" x="304" y="112" width="52" height="10" rx="5"/><path class="ln" d="M60 290H400"/><circle class="ln" cx="500" cy="140" r="60"/><path class="al" d="M500 140V102M500 140L528 156"/><path class="al" d="M430 290L490 250L530 264L592 212M570 212H592V234"/>'),
      bullets: [
        "Led a team of <b>10</b> through high-volume rushes and raised order throughput <b>15%</b> (about 20 extra orders an hour) by reworking how people rotated through prep-line stations.",
        "Handled cash, deposits, inventory counts, and opening and closing duties with <b>100% accuracy</b>.",
        "Cut food waste <b>6%</b> through better portion control and labeling."
      ],
      tags: ["Team Leadership", "Operations", "Inventory", "Cash Handling"]
    }
  };

  var id = new URLSearchParams(location.search).get("id");
  var j = JOBS[id];
  var main = document.getElementById("job");
  if (!j) {
    main.innerHTML = '<div class="jtop"><a class="back" href="work.html">‹ Back</a></div><p>That page doesn\'t exist. <a href="work.html">Back to work</a></p>';
    return;
  }
  document.title = j.org + " · Adrien Donfack";
  main.innerHTML =
    '<div class="jtop rvx"><a class="back" href="work.html">‹ Back</a><div class="crumb"><a href="work.html">Work</a><span>›</span><span>' + j.org + '</span></div><span></span></div>' +
    '<h1 class="jtitle">' + j.org + '</h1>' +
    '<div class="jhero rvx">' + j.art + '</div>' +
    '<div class="jrole rvx"><div><div class="jr-name">' + j.role + '</div><div class="jr-team">' + j.team + '</div></div><div class="jr-dates' + (j.present ? ' present' : '') + '">' + j.dates + '</div></div>' +
    '<ul class="jbul">' + j.bullets.map(function (b) { return '<li class="rvx">' + b + '</li>'; }).join("") + '</ul>' +
    '<div class="jtags rvx">' + j.tags.map(function (t) { return '<span>' + t + '</span>'; }).join("") + '</div>';
})();
