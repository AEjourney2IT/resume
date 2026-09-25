// Load resume.json and render it into the page.
// All resume content lives in resume.json — edit that file, not this one.

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));

const list = (items) => items.map((i) => `<li>${esc(i)}</li>`).join("");

fetch("resume.json")
  .then((response) => response.json())
  .then((data) => {
    // HEADER
    document.getElementById("name").textContent = data.name;
    document.getElementById("title").textContent = data.title;

    // CONTACT
    const c = data.contact;
    const bare = (url) => url.replace(/^https?:\/\//, "");
    document.getElementById("contact").innerHTML = `
      <p>${esc(c.location)}</p>
      <p><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>
      <p><a href="${esc(c.linkedin)}">${esc(bare(c.linkedin))}</a></p>
      <p><a href="${esc(c.github)}">${esc(bare(c.github))}</a></p>
    `;

    // CERTIFICATIONS
    document.getElementById("certifications").innerHTML = data.certifications
      .map((cert) => `<li>${esc(cert.name)} <span class="muted">(${esc(cert.status)})</span></li>`)
      .join("");

    // SKILLS (shown as tags)
    document.getElementById("skills").innerHTML = data.skills
      .map((group) => `
        <div class="skill-group">
          <h3>${esc(group.label)}</h3>
          <ul class="tags">${list(group.items)}</ul>
        </div>`)
      .join("");

    // EDUCATION
    const edu = data.education;
    document.getElementById("education").innerHTML = `
      <p><strong>${esc(edu.school)}</strong><br>${esc(edu.program)}</p>
      <p class="muted">${esc(edu.location)} | ${esc(edu.date)}</p>
    `;

    // SUMMARY
    document.getElementById("summary").textContent = data.summary;

    // EXPERIENCE
    document.getElementById("experience").innerHTML = data.experience
      .map((job) => `
        <div class="job">
          <h3>${esc(job.company)}</h3>
          <h4>${esc(job.role)} — ${esc(job.location)}</h4>
          <p class="dates">${esc(job.dates)}</p>
          ${job.note ? `<p class="note">${esc(job.note)}</p>` : ""}
          <ul>${list(job.bullets)}</ul>
        </div>`)
      .join("");

    // PROJECTS
    document.getElementById("projects").innerHTML = (data.projects || [])
      .map((p) => `
        <div class="project">
          <h3><a href="${esc(p.url)}">${esc(p.name)}</a></h3>
          <p>${esc(p.description)}</p>
        </div>`)
      .join("");

    // ADDITIONAL EXPERIENCE
    document.getElementById("additional").innerHTML = list(data.additionalExperience);
  })
  .catch((error) => console.error("Error loading resume.json:", error));
