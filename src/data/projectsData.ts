export interface Project {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  description: string;
  metrics: string[];
  tone: string;
  image: string;
  tags: string[];
  year: string;
  role: string;
  link?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "Forest Fire Monitoring System",
    subtitle: "AI-Powered Fire Detection Rover",
    summary:
      "A 4-wheeled rover equipped with ESP32-CAM and OpenCV AI to detect fire and humans in real-time, alerting authorities with precise GPS coordinates.",
    description:
      "A comprehensive forest fire monitoring solution built on a 4-wheeled rover platform. The system uses an ESP32-CAM with OpenCV AI to detect fire and humans, sending critical data like temperature, humidity, smoke levels, soil moisture, and GPS location to ThingSpeak via ESP32. Controlled by Arduino UNO and L298N motor driver, it alerts authorities with real-time fire location using the NEO-6M GPS module.",
    metrics: ["Real-time detection", "Multi-sensor data", "GPS tracking"],
    tone: "acm-blue",
    image: "/projects/forest-fire.webp",
    tags: ["IoT", "OpenCV", "Arduino", "ESP32", "Python"],
    year: "2025",
    role: "Hardware + AI",
    link: "https://github.com/CK-chirag/forest-fire-monitoring-system",
    featured: true,
  },
  {
    id: "02",
    title: "FridgePilot",
    subtitle: "Smart Pantry & Recipe Manager",
    summary:
      "An AI-powered web app that manages your pantry, predicts expiry dates, and recommends personalized recipes to minimize food waste.",
    description:
      "FridgePilot is an AI-powered full-stack web application designed to help you manage pantry inventory, predict expiry dates using machine learning, and receive personalized recipe recommendations based on available ingredients. Built with Next.js, TypeScript, and Tailwind CSS on the frontend, with Flask and scikit-learn powering the backend predictions.",
    metrics: ["AI predictions", "Recipe engine", "Zero waste goal"],
    tone: "acm-blue",
    image: "/projects/fridge-pilot.webp",
    tags: ["Next.js", "Flask", "ML", "TypeScript", "PostgreSQL"],
    year: "2025",
    role: "Full Stack + ML",
    link: "https://github.com/Arsh199965/FridgePilot",
    featured: true,
  },
  {
    id: "03",
    title: "EcoGrow",
    subtitle: "AI Air Quality & Plant Recommendation",
    summary:
      "Smart AI system that predicts Delhi's air quality trends and recommends the best pollution-absorbing plants for each region.",
    description:
      "EcoGrow is a smart AI-driven system that tackles Delhi's pollution crisis by predicting future air quality trends using SARIMA models and recommending the best pollution-absorbing plants for each region. It uses multi-source datasets, time series forecasting, and a rewards-based web dashboard to guide eco-friendly actions like strategic tree planting.",
    metrics: ["<15% error rate", "5 Delhi zones", "Plant matching AI"],
    tone: "acm-blue",
    image: "/projects/ecogrow.webp",
    tags: ["Python", "SARIMA", "ML", "Jupyter", "Dashboard"],
    year: "2024",
    role: "ML + Data Science",
    link: "https://github.com/Sheelendra-Scripts/EcoGrow",
    featured: true,
  },
  {
    id: "04",
    title: "Multiplatform Robotic Arm",
    subtitle: "Web-Controlled Arduino Robotic Arm",
    summary:
      "A cross-platform, Arduino-powered robotic arm controllable via a responsive web interface with preset positions and smooth servo control.",
    description:
      "A cross-platform, Arduino-powered robotic arm controllable via a responsive web interface. Built for smooth operation with precise servo motor movement, the system features preset positions, sequence automation, and works seamlessly on both desktop and mobile devices. The web UI provides visual feedback with circuit diagrams and real-time control.",
    metrics: ["5-DOF control", "Web interface", "Cross-platform"],
    tone: "acm-blue",
    image: "/projects/robotic-arm.webp",
    tags: ["Arduino", "C++", "HTML/CSS", "Servo", "IoT"],
    year: "2025",
    role: "Hardware + Web",
    link: "https://github.com/Sheelendra-Scripts/multiplatform_robotic_arm",
    featured: false,
  },
  {
    id: "05",
    title: "Finova",
    subtitle: "AI-Powered Financial Management",
    summary:
      "An intelligent financial platform that acts as your pocket CFO—automating expense tracking, fetching bills, and providing AI-powered savings advice.",
    description:
      "Finova is an AI-powered personal finance tracker designed to take the guesswork out of money management. It automates bill fetching using OCR and NLP, provides smart expense categorization with a Python ML engine, real-time budget monitoring with alerts, and personalized financial insights. Built with Next.js, Supabase, and Prisma, developed by Team Debug Thugs at USAR, GGSIPU-EDC.",
    metrics: ["Auto bill fetch", "Smart budgets", "AI insights"],
    tone: "acm-blue",
    image: "/projects/finova.webp",
    tags: ["Next.js", "Python", "AI/ML", "Supabase", "Prisma"],
    year: "2025",
    role: "Full Stack + AI",
    link: "https://github.com/a4-Aniket/Finova",
    featured: false,
  },
];


