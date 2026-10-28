# Adrien Donfack · Portfolio

My personal site: who I am, where I've worked, what I've built, and the certificates I've earned.

**Live:** https://adrientdonf.github.io/portfolio/

## About me

I'm a Computer Science student at Case Western Reserve University (BA, minors in Business Management and French, class of 2028) and a Posse Full Tuition Leadership Scholar. I'm from Fort Worth, Texas, and I'm Vice President of The Brotherhood on campus. I'm looking at both cybersecurity and software roles.

## What's on the site

- **Home**: a short intro, a collapsible "where I've been" list, certificates, and a live GitHub contribution graph.
- **Work**: Mount Sinai (Cybersecurity Operations Analyst Intern), Global Career Accelerator (Web Development Intern), The Brotherhood, Posse Foundation, and Taco Bell.
- **Projects**: TicketDesk, L'Oréal Routine Builder, AI Resume Analyzer, Intel Event Check-In, Water Quest, and Space Explorer. Each card opens its live demo or its GitHub repo.
- **Certificates**: CrowdStrike security training plus Global Career Accelerator credentials, each linking to its original file.
- **Contact**: email, LinkedIn, and GitHub.

## Built with

Plain HTML, CSS, and JavaScript. No framework and no build step.

- Light and dark themes, saved between visits
- Responsive layout with a full-screen menu
- Small scroll and hover animations, with reduced motion respected
- Fonts: Inter, IBM Plex Sans, and Geist Mono

## Run it locally

    git clone https://github.com/adrientdonf/portfolio.git
    cd portfolio
    open index.html

## Structure

    index.html            home
    work.html, job.html   work list and job detail pages (data in jobs.js)
    projects.html         project cards (data in projects.js)
    certificates.html     certificates
    contact.html          contact
    style.css, script.js  shared styles and behavior
    img/, certificates/   logos, resume, certificate files

## Credit

The layout and feel are inspired by [nic-nguyen.com](https://www.nic-nguyen.com/). All code and copy here are my own.
