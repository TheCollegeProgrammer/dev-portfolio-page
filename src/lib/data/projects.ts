export type Project = {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  category: "Full-Stack" | "AI / ML" | "Data";
  year: string;
  description: string;
  overview: string;
  highlights: string[];
  stack: string[];
  image: string;
  imageAlt: string;
  links: {
    github: string | null;
    live: string | null;
  };
};

export const projects: Project[] = [
  {
    slug: "tripzy",
    index: "01",
    title: "TRIPZY",
    subtitle: "AI-powered travel planning platform",
    category: "AI / ML",
    year: "2025",
    description:
      "A travel advisory system that combines flight fare prediction, personalised itinerary generation, weather insights, and real-time booking links.",
    overview:
      "Tripzy brings the fragmented parts of trip planning into one focused workspace. It pairs generative AI with live travel data so a destination, a budget, and a schedule turn into an itinerary that actually makes sense.",
    highlights: [
      "Generative itineraries tailored to budget, pace, and interests",
      "Flight fare prediction layered into trip planning",
      "Weather-aware recommendations and booking links in one flow",
      "Full-stack architecture with a PostgreSQL data layer",
    ],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Gemini API",
    ],
    image: "/assets/projects/tripzy.webp",
    imageAlt:
      "Tripzy interface preview showing an AI-generated travel route and itinerary cards",
    links: {
      github: "https://github.com/TheCollegeProgrammer/Tripzy",
      live: "https://mytripzy.vercel.app/",
    },
  },
  {
    slug: "rio",
    index: "02",
    title: "RIO",
    subtitle: "A social platform for real connection",
    category: "Full-Stack",
    year: "2025",
    description:
      "A full-stack social media platform built around authenticated profiles, posts, likes, and social interactions.",
    overview:
      "Rio was built to understand the moving parts behind a social product: identity, media, feeds, and the small interactions that make a network feel alive. It is a complete authentication and content pipeline from database to interface.",
    highlights: [
      "JWT-based authentication and protected application routes",
      "Post creation with Cloudinary-backed media uploads",
      "Likes, comments, and social interaction flows",
      "REST API designed around clean Express controllers",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "Cloudinary"],
    image: "/assets/projects/rio.webp",
    imageAlt:
      "Rio social platform preview showing a dark social feed with posts and interaction controls",
    links: {
      github: "https://github.com/TheCollegeProgrammer/rio-social-platform",
      live: "https://rio-social-platform.vercel.app",
    },
  },
  {
    slug: "minirtv",
    index: "03",
    title: "MINIRTV",
    subtitle: "AI-powered virtual try-on research",
    category: "AI / ML",
    year: "2026",
    description:
      "An exploration of real-time virtual try-on using computer vision and deep learning to map garments onto a person.",
    overview:
      "MiniRTV is a research-driven build that explores how computer vision models can understand body pose, preserve garment structure, and produce a believable try-on result without specialist hardware.",
    highlights: [
      "Pose and body landmark estimation for garment alignment",
      "Deep-learning-based image synthesis experiments",
      "A research notebook documenting model behaviour and limits",
      "A practical testbed for computer-vision workflows",
    ],
    stack: ["Python", "Computer Vision", "Deep Learning", "PyTorch"],
    image: "/assets/projects/minirtv.webp",
    imageAlt:
      "MiniRTV preview showing a pose-mapped figure with a virtual garment overlay",
    links: {
      github: "https://github.com/TheCollegeProgrammer/minirtv",
      live: null,
    },
  },
  {
    slug: "spotify-analytics",
    index: "04",
    title: "SPOTIFY ANALYTICS",
    subtitle: "Music data, analysed at scale",
    category: "Data",
    year: "2025",
    description:
      "A data project that scrapes, processes, and visualises global music streaming data to surface listening trends.",
    overview:
      "What started as a simple question — who is actually on top? — became an exercise in data cleaning, aggregation, and visual storytelling. The project turns a noisy public dataset into a clear, comparative view of streaming behaviour.",
    highlights: [
      "Scraped and normalised global streaming data",
      "Aggregation with Pandas across artists and markets",
      "Visual comparisons of the most-streamed artists",
      "A foundation for larger big-data experiments",
    ],
    stack: ["Python", "Pandas", "PySpark", "Machine Learning"],
    image: "/assets/projects/spotify.webp",
    imageAlt:
      "Spotify analytics preview showing listening charts and an audio waveform visualisation",
    links: {
      github:
        "https://github.com/TheCollegeProgrammer/Spotify_Global_Data_Scrapping_And_Visualization",
      live: null,
    },
  },
];
