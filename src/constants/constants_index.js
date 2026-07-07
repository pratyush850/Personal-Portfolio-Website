// src/constants/index.js  — add educationMilestones to your existing exports

// ─── Paste this block INSIDE your existing constants/index.js ───────────────
// (add it after the `projects` array, before the final export line)

export const educationMilestones = [
  {
    id: 1,
    type: "High School",
    school: "Your High School Name",
    degree: "Higher Secondary Certificate",
    stream: "Science (PCM)",
    year: "2018 – 2020",
    cgpa: "92%",
    color: "#00cea8",
    icon: "🏫",
  },
  {
    id: 2,
    type: "Junior College",
    school: "Your Junior College",
    degree: "Intermediate",
    stream: "Mathematics & Physics",
    year: "2020 – 2022",
    cgpa: "85%",
    color: "#804dee",
    icon: "🎓",
  },
  {
    id: 3,
    type: "University",
    school: "Your University Name",
    degree: "Bachelor of Technology",
    stream: "Computer Science & Engineering",
    year: "2022 – 2026",
    cgpa: "8.5 / 10",
    color: "#f5a623",
    icon: "🚀",
  },
];

// ─── Your existing export line should become: ───────────────────────────────
// export { services, technologies, experiences, projects, educationMilestones };
