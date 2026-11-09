import { writeFile } from "node:fs/promises";
import path from "node:path";

const brand = "0.902 0.141 0.161";
const dark = "0.031 0.035 0.051";
const ink = "0.09 0.10 0.12";
const muted = "0.42 0.44 0.48";
const lineColor = "0.86 0.87 0.89";

const parts = [];
const escapePdf = (value) =>
  value.replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");

function text(x, y, size, font, color, value, spacing = 0) {
  parts.push(
    `BT /${font} ${size} Tf ${color} rg ${spacing} Tc ${x} ${y} Td (${escapePdf(
      value,
    )}) Tj ET`,
  );
}

function rect(x, y, w, h, color) {
  parts.push(`${color} rg ${x} ${y} ${w} ${h} re f`);
}

function line(x1, y1, x2, y2, color = lineColor, width = 0.6) {
  parts.push(`${color} RG ${width} w ${x1} ${y1} m ${x2} ${y2} l S`);
}

function sectionHeading(y, label) {
  text(48, y, 8.5, "F2", brand, label, 1.6);
  line(48, y - 7, 547, y - 7, lineColor, 0.6);
}

// Header band
rect(0, 762, 595, 80, dark);
rect(48, 792, 8, 8, brand);
text(66, 800, 25, "F2", "1 1 1", "DEVANSH AVCHAT", -0.3);
text(67, 779, 8, "F1", "0.72 0.74 0.78", "FULL-STACK DEVELOPER  /  AI ENTHUSIAST", 1.8);

// Contact
text(
  48,
  740,
  8.2,
  "F1",
  muted,
  "devanshavchat8208@gmail.com   ·   Nagpur, Maharashtra, India   ·   github.com/TheCollegeProgrammer",
);
text(
  48,
  727,
  8.2,
  "F1",
  muted,
  "linkedin.com/in/devansh-avchat   ·   portfolio: devansh-portfolio (see README for deployment URL)",
);
line(48, 714, 547, 714, brand, 1);

// Profile
sectionHeading(690, "PROFILE");
text(
  48,
  670,
  8.8,
  "F1",
  ink,
  "Full-stack developer and AI enthusiast pursuing a B.Tech in Computer Science and Engineering",
);
text(
  48,
  657,
  8.8,
  "F1",
  ink,
  "with a specialisation in AI & Data Science at Ramdeobaba University, Nagpur. I build digital",
);
text(
  48,
  644,
  8.8,
  "F1",
  ink,
  "experiences, explore emerging technologies, and turn ambitious ideas into working products.",
);

// Education
sectionHeading(614, "EDUCATION");
text(
  48,
  594,
  10.5,
  "F2",
  ink,
  "B.Tech — Computer Science and Engineering (AI & Data Science)",
);
text(48, 581, 9, "F1", ink, "Ramdeobaba University, Nagpur");
text(48, 568, 8.2, "F1", muted, "2024 – 2028");

// Projects
sectionHeading(540, "SELECTED PROJECTS");

const projectY = 520;
const projectBlocks = [
  {
    title: "TRIPZY — AI-powered travel planning platform",
    stack: "React · TypeScript · Node.js · Express · PostgreSQL · Gemini API",
    description:
      "Generative itineraries, flight fare prediction, weather insights, and booking links in one travel advisory flow.",
  },
  {
    title: "RIO — Full-stack social media platform",
    stack: "React · Node.js · Express · MongoDB · JWT · Cloudinary",
    description:
      "Authenticated profiles, posts, media uploads, likes, and social interactions across a complete REST API.",
  },
  {
    title: "MINIRTV — AI-powered virtual try-on research",
    stack: "Python · Computer Vision · Deep Learning · PyTorch",
    description:
      "Pose and body-landmark estimation for garment alignment, with deep-learning image synthesis experiments.",
  },
  {
    title: "SPOTIFY ANALYTICS — Music data analysis",
    stack: "Python · Pandas · PySpark · Machine Learning",
    description:
      "Scraped and normalised global streaming data, then aggregated and visualised artist-level listening trends.",
  },
];

projectBlocks.forEach((project, index) => {
  const y = projectY - index * 54;
  text(48, y, 10, "F2", ink, project.title);
  text(48, y - 12, 7.6, "F1", brand, project.stack, 0.4);
  text(48, y - 24, 8.2, "F1", muted, project.description);
});

// Skills
sectionHeading(288, "TOOLKIT");
const skills = [
  ["FRONTEND", "React · Next.js · JavaScript · TypeScript · Tailwind CSS"],
  ["BACKEND", "Node.js · Express.js · REST APIs"],
  ["PROGRAMMING", "C++ · Python · Java"],
  ["DATABASES", "MongoDB · PostgreSQL · MySQL"],
  ["AI / ML", "Pandas · NumPy · Scikit-learn · PySpark · Computer Vision"],
  ["TOOLS", "Git · GitHub · Docker · Power BI"],
];

skills.forEach(([label, value], index) => {
  const y = 268 - index * 15;
  text(48, y, 7.6, "F2", ink, label, 1.2);
  text(132, y, 8.2, "F1", muted, value);
});

// Links
sectionHeading(158, "LINKS");
text(
  48,
  138,
  8.8,
  "F1",
  ink,
  "GitHub: github.com/TheCollegeProgrammer    LinkedIn: linkedin.com/in/devansh-avchat    Email: devanshavchat8208@gmail.com",
);

// Footer
line(48, 94, 547, 94, brand, 1);
text(
  48,
  76,
  8.2,
  "F2",
  brand,
  "BEYOND THE CODE. BUILDING WHAT'S NEXT.",
  1.6,
);
text(
  48,
  60,
  7.4,
  "F1",
  muted,
  "Resume generated from the devansh-portfolio project. Update content in scripts/generate-resume.mjs.",
);

const stream = `${parts.join("\n")}\n`;
const streamLength = Buffer.byteLength(stream, "latin1");

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R /F3 7 0 R >> >> /Contents 4 0 R >>",
  `<< /Length ${streamLength} >>\nstream\n${stream}endstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>",
  "<< /Title (Devansh Avchat - Resume) /Author (Devansh Avchat) /Creator (devansh-portfolio) /Producer (devansh-portfolio) >>",
];

let pdf = "%PDF-1.4\n%\u00E2\u00E3\u00CF\u00D3\n";
const offsets = [0];

for (const [index, object] of objects.entries()) {
  offsets.push(Buffer.byteLength(pdf, "latin1"));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
}

const xrefOffset = Buffer.byteLength(pdf, "latin1");
pdf += `xref\n0 ${objects.length + 1}\n`;
pdf += "0000000000 65535 f \n";
for (let index = 1; index <= objects.length; index += 1) {
  pdf += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info 8 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

const outputPath = path.join(process.cwd(), "public", "resume.pdf");
await writeFile(outputPath, Buffer.from(pdf, "latin1"));

for (let index = 1; index <= objects.length; index += 1) {
  const slice = pdf.slice(offsets[index], offsets[index] + 24);
  if (!slice.startsWith(`${index} 0 obj`)) {
    throw new Error(`Invalid xref offset for object ${index}`);
  }
}

console.log(`resume.pdf generated (${Buffer.byteLength(pdf, "latin1")} bytes)`);
