// Load resume.json and render into the page
fetch("resume.json")
  .then(response => response.json())
  .then(data => {
    
    // HEADER
    document.getElementById("name").textContent = data.name;
    document.getElementById("title").textContent = data.title;

    // CONTACT
    const contact = document.getElementById("contact");
    contact.innerHTML = `
      <p>Email: <a href="mailto:${data.contact.email}">${data.contact.email}</a></p>
      <p>Phone: ${data.contact.phone}</p>
      <p>LinkedIn: <a href="${data.contact.linkedin}">${data.contact.linkedin}</a></p>
      <p>GitHub: <a href="${data.contact.github}">${data.contact.github}</a></p>
    `;

    // SUMMARY
    document.getElementById("summary").textContent = data.summary;

    // SKILLS
    const skills = document.getElementById("skills");
    skills.innerHTML = "";

    Object.keys(data.skills).forEach(category => {
      const section = document.createElement("div");
      section.innerHTML = `
        <h3>${category.toUpperCase()}</h3>
        <ul>${data.skills[category].map(item => `<li>${item}</li>`).join("")}</ul>
      `;
      skills.appendChild(section);
    });

    // EXPERIENCE
    const experience = document.getElementById("experience");
    experience.innerHTML = "";

    data.experience.forEach(job => {
      const jobDiv = document.createElement("div");
      jobDiv.classList.add("job");
      jobDiv.innerHTML = `
        <h3>${job.company}</h3>
        <h4>${job.role} — ${job.location}</h4>
        <p><em>${job.dates}</em></p>
        <ul>${job.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
      `;
      experience.appendChild(jobDiv);
    });

    // ADDITIONAL EXPERIENCE
    const additional = document.getElementById("additional");
    additional.innerHTML = `
      <ul>${data.additionalExperience.map(item => `<li>${item}</li>`).join("")}</ul>
    `;

    // EDUCATION
    const edu = document.getElementById("education");
    edu.innerHTML = `
      <p>${data.education.school} — ${data.education.program}</p>
      <p>${data.education.location} | ${data.education.date}</p>
    `;
  })
  .catch(error => console.error("Error loading resume.json:", error));
