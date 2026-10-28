(function () {
  var PROJECTS = [
    { name: "TicketDesk", year: "2026", status: "",
      desc: "Full-stack IT ticketing platform with role-based access, JWT auth and AI ticket summaries from Groq's LLaMA.",
      tags: ["React", "Node.js", "Express", "MySQL", "JWT"],
      demo: "https://ticketdesk-kappa.vercel.app/",
      repo: "https://github.com/adrientdonf/it-ticket-system" },
    { name: "L'Oréal Routine Builder", year: "2026", status: "",
      desc: "Pick L'Oréal products and an OpenAI advisor builds your routine. A Cloudflare Worker keeps the API key off the browser.",
      tags: ["JavaScript", "OpenAI API", "Cloudflare"],
      demo: "https://adrientdonf.github.io/loreal-product-routine-builder/",
      repo: "https://github.com/adrientdonf/loreal-product-routine-builder" },
    { name: "AI Resume Analyzer", year: "2026", status: "in progress",
      desc: "Compares a resume to a job description with RAG and vector embeddings, then suggests which skills to build next.",
      tags: ["Python", "RAG", "Embeddings"],
      demo: "",
      repo: "https://github.com/adrientdonf/ai-resume-analyzer" },
    { name: "Intel Event Check-In", year: "2026", status: "",
      desc: "Check-in desk for a sustainability summit with team picks and a live attendance counter.",
      tags: ["JavaScript", "HTML", "CSS"],
      demo: "https://adrientdonf.github.io/intel-event-check-in/",
      repo: "https://github.com/adrientdonf/intel-event-check-in" },
    { name: "Water Quest", year: "2026", status: "",
      desc: "Timed charity: water game. Tap the clean water, dodge the dirty, pick your difficulty.",
      tags: ["JavaScript", "HTML", "CSS"],
      demo: "https://adrientdonf.github.io/charity-water-drop-game-final/",
      repo: "https://github.com/adrientdonf/charity-water-drop-game-final" },
    { name: "Space Explorer", year: "2026", status: "",
      desc: "Browse nine days of NASA's Astronomy Picture of the Day with full write-ups, pulled live from NASA's API.",
      tags: ["JavaScript", "NASA API"],
      demo: "https://adrientdonf.github.io/space-explorer/",
      repo: "https://github.com/adrientdonf/space-explorer" }
  ];

  var grid = document.getElementById("grid");
  if (grid) {
    grid.innerHTML = PROJECTS.map(function (p) {
      var link = p.demo || p.repo;
      return '<a class="pcard" href="' + link + '" target="_blank" rel="noopener">' +
        '<div class="p-head"><h2 class="p-name">' + p.name + (p.status ? ' <span class="badge">' + p.status + '</span>' : '') + '</h2><span class="p-year">' + p.year + '</span></div>' +
        '<p class="p-desc">' + p.desc + '</p>' +
        '<div class="p-tags">' + p.tags.map(function (t) { return '<span>' + t + '</span>'; }).join("") + '</div>' +
        '</a>';
    }).join("");
  }
})();
