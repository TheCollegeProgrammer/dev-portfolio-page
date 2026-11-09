export type SkillCategory = {
  title: string;
  icon: "frontend" | "backend" | "programming" | "database" | "ai" | "tools";
  blurb: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "frontend",
    blurb: "Interfaces that feel considered, fast, and alive.",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: "backend",
    blurb: "APIs and server logic built to hold up in production.",
    skills: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    title: "Programming",
    icon: "programming",
    blurb: "The languages I reach for to solve the problem at hand.",
    skills: ["C++", "Python", "Java"],
  },
  {
    title: "Databases",
    icon: "database",
    blurb: "Modelling, querying, and shaping data that matters.",
    skills: ["MongoDB", "PostgreSQL", "MySQL"],
  },
  {
    title: "AI / ML",
    icon: "ai",
    blurb: "Turning data into models, and models into useful products.",
    skills: [
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "PySpark",
      "Computer Vision",
    ],
  },
  {
    title: "Tools",
    icon: "tools",
    blurb: "The workshop around the code — versioned and shipped.",
    skills: ["Git", "GitHub", "Docker", "Power BI"],
  },
];

export const marqueeItems = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "AI / ML",
  "PostgreSQL",
  "Computer Vision",
  "Tailwind CSS",
  "MongoDB",
  "PySpark",
  "Docker",
];
