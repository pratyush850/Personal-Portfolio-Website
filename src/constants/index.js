import {
  modeling,
  visualization,
  dashboard,
  analysis,
  powerbi,
  numpy,
  python,
  mysql,
  pandas,
  excel,
  statistics,
  git,
  vscode,
  growthsay,
  techaffy,
  transcom,
  face,
  jobit,
  car,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Data Analysis",
    icon: analysis,
  },
  {
    title: "Data Modeling",
    icon: modeling,
  },
  {
    title: "Data Visualization",
    icon: visualization,
  },
  {
    title: "Dashboard Development",
    icon: dashboard,
  },
];

const technologies = [
  {
    name: "Python",
    icon: python,
  },
  {
    name: "MySQL",
    icon: mysql,
  },
  {
    name: "Power BI",
    icon: powerbi,
  },
  {
    name: "Numpy",
    icon: numpy,
  },
  {
    name: "Pandas",
    icon: pandas,
  },
  {
    name: "Excel",
    icon: excel,
  },
  {
    name: "Statistics",
    icon: statistics,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "VS Code",
    icon: vscode,
  },
];

const experiences = [
  {
    title: "Data Analyst Intern",
    company_name: "Growthsay",
    icon: growthsay,
    iconBg: "#383E56",
    date: "December 2023 - January 2024",
    points: [
      "Analysed customer requirements and behavioural data to identify customer segments and understand business needs for targeted acquisition strategies.",
      "Utilised Power BI for data cleaning, customer segmentation, trend analysis, behavioural pattern analysis, dashboard creation, and data visualisation to generate actionable business insights.",
      "Supported new customer acquisition initiatives by helping define unique value propositions and identifying the right target customer segments through data-driven analysis.",
    ],
  },
  {
    title: "Operations Intern",
    company_name: "Techaffy",
    icon: techaffy,
    iconBg: "#000000",
    date: "February 2024 - May 2024",
    points: [
      "Performed financial data analysis to evaluate cost vs revenue trends across industry segments, product requirements, demographic groups, and age categories.",
      "Utilised Excel and data analysis techniques including data cleaning, KPI tracking, pivot analysis, and revenue pipeline analysis to prepare revenue insights and analyse business performance.",
      "Contributed to profitability improvement initiatives by identifying revenue-leakage workstreams and supporting data-driven operational decisions.",
    ],
  },
  {
    title: "Customer Success Associate",
    company_name: "Transcom",
    icon: transcom,
    iconBg: "#ffffff",
    date: "July 2025 - Present",
    points: [
      "Analysed customer issue trends using data analysis methodologies such as trend analysis, pattern recognition, and issue categorisation to identify operational bottlenecks.",
      "Utilised Power BI, Excel, and internal CRM systems for data cleaning, dashboard creation, KPI monitoring, report generation, and visual analysis of issue trends and operational performance.",
      "Supported process improvement by providing data-driven insights that helped teams reduce issue frequency and improve service efficiency.",
    ],
  },
  
];

const projects = [
  {
    name: "Face Attendance System",
    description:
      "Developed a Face Attendance System capable of detecting and recognising faces from livewebcam feeds for automated attendance management.",
    tags: [
      {
        name: "python",
        color: "blue-text-gradient",
      },
      {
        name: "sql",
        color: "green-text-gradient",
      },
      {
        name: "haar-cascade",
        color: "pink-text-gradient",
      },
    ],
    image: face,
    source_code_link: "https://github.com/pratyush850/Face-Attendance-System",
  },
  {
    name: "Car Sales Analysis",
    description:
      "Developed an interactive Power BI Car Sales Dashboard to analyze sales performance, revenue trends, regional insights, and key business KPIs through dynamic visualizations.",
    tags: [
      {
        name: "power bi",
        color: "blue-text-gradient",
      },
      {
        name: "dax",
        color: "green-text-gradient",
      },
      {
        name: "etl",
        color: "pink-text-gradient",
      },
    ],
    image: car,
    source_code_link: "https://github.com/pratyush850/Car-Sales-Analysis",
  },
];

export { services, technologies, experiences, projects };
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
