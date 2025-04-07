form.addEventListener("submit", (e) => {
  e.preventDefault();

  const selectedSubjects = Array.from(document.getElementById("subjectsDropdown").selectedOptions).map(o => o.value);
  const selectedHobbies = Array.from(document.getElementById("hobbiesDropdown").selectedOptions).map(o => o.value);
  const selectedGoal = document.getElementById("goalDropdown").value;

  const selectedSkills = Array.from(document.querySelectorAll(".skill")).map(dropdown => ({
    skill: dropdown.dataset.skill,
    rating: parseInt(dropdown.value)
  }));

  const combinedInput = (
    selectedSubjects.join(' ') +
    ' ' +
    selectedHobbies.join(' ') +
    ' ' +
    selectedSkills.map(s => s.skill).join(' ') +
    ' ' +
    selectedGoal
  ).toLowerCase();

  const careers = [
    { title: "Software Developer", keywords: ["coding", "technology", "problem solving", "javascript", "python"] },
    { title: "Graphic Designer", keywords: ["creativity", "design", "visual", "photoshop", "art"] },
    { title: "Data Scientist", keywords: ["math", "data", "statistics", "python", "machine learning"] },
    { title: "Mechanical Engineer", keywords: ["machines", "design", "physics", "engineering"] },
    { title: "Psychologist", keywords: ["mind", "helping", "emotions", "listening", "behavior"] },
    { title: "Doctor", keywords: ["biology", "helping", "health", "medicine", "science"] },
    { title: "Teacher", keywords: ["education", "teaching", "learning", "helping"] },
    { title: "Entrepreneur", keywords: ["leadership", "business", "risk", "startup", "management"] },
    { title: "Writer", keywords: ["writing", "storytelling", "creative", "language", "communication"] },
    { title: "Architect", keywords: ["design", "building", "math", "visual", "structure"] }
  ];

  const matches = careers.map(career => {
    let matchCount = 0;
    career.keywords.forEach(keyword => {
      if (combinedInput.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    });
    return { ...career, score: matchCount };
  }).filter(career => career.score > 0) // Only show careers with at least one keyword matched
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  const existingResult = document.getElementById("result");
  if (existingResult) existingResult.remove();

  const resultDiv = document.createElement("div");
  resultDiv.id = "result";
  resultDiv.innerHTML = "<h2>Your Top Career Matches:</h2>";
  matches.forEach(match => {
    const p = document.createElement("p");
    p.textContent = match.title;
    resultDiv.appendChild(p);
  });

  app.appendChild(resultDiv);
});
