export type Milestone = {
  year: string;
  title: string;
  description: string;
  tags: string[];
};

export const milestones: Milestone[] = [
  {
    year: "2024",
    title: "The starting line",
    description:
      "Began B.Tech in Computer Science and Engineering (AI & Data Science) at Ramdeobaba University, Nagpur.",
    tags: ["Education", "AI & Data Science"],
  },
  {
    year: "2024",
    title: "Foundations",
    description:
      "Built a working foundation in programming, data structures, and computer science fundamentals — with C++ and Python as daily practice.",
    tags: ["C++", "Python", "Fundamentals"],
  },
  {
    year: "2025",
    title: "From pages to products",
    description:
      "Moved into full-stack development, shipping authenticated applications with React, Node.js, Express, and document databases.",
    tags: ["React", "Node.js", "Full-Stack"],
  },
  {
    year: "2025",
    title: "Intelligence in the loop",
    description:
      "Started applying AI and machine learning to real project ideas — from travel planning and recommendations to computer vision experiments.",
    tags: ["AI", "ML", "Computer Vision"],
  },
  {
    year: "2026 — Now",
    title: "The next build",
    description:
      "Currently exploring the space between product engineering and intelligent systems: better models, better interfaces, better questions.",
    tags: ["Exploring", "Building", "Learning"],
  },
];
