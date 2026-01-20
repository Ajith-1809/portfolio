import { Github, Linkedin, Instagram } from "lucide-react";

export const TYPING_SPEED = 100;
export const ERASING_SPEED = 50;
export const PAUSE_DURATION = 2000;

export const WORDS = ["IT/Software Student", "Tech Enthusiast"];
export const TITLE_WORDS = ["Frontend", "Backend", "Fullstack"];
export const TECH_STACK = ["React JS", "Javascript", "HTML/CSS", "Tailwind CSS", "Java", "MySQL"];

export const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/Ajith-1809" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/ajithkumar-v-1318441aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
  { icon: Instagram, link: "https://www.instagram.com/invisible_1809" },
];

export const projectData = [
  {
    id: 1,
    Img: "https://picsum.photos/id/1/600/400",
    Title: "Portfolio Website",
    Description: "This project is a complete showcase of my abilities as a Frontend Developer. It features a sleek design, engaging animations, and a custom backend for the interactive comment section. It's built from the ground up to be a perfect blend of aesthetics and functionality.",
    Link: "#",
    Github: "https://github.com/Ajith-1809/portfolio",
    TechStack: ["React", "Tailwind", "Node Js", "Express",],
    Features: ["Modern UI/UX", "Interactive Animations", "Custom Backend", "Fully Responsive"]
  },
  {
    id: 2,
    Img: "https://picsum.photos/id/2/600/400",
    Title: "Weather App",
    Description: "A real-time weather application that provides accurate forecasts and current conditions for any location worldwide. Built with a focus on clean UI and rapid data fetching.",
    Link: "#",
    Github: "https://github.com/Ajith-1809/weather-app",
    TechStack: ["React", "CSS", "OpenWeather API"],
    Features: ["Real-time Data", "Location Search", "5-Day Forecast", "Responsive Design"]
  },
  {
    id: 3,
    Img: "https://picsum.photos/id/3/600/400",
    Title: "E-Commerce Dashboard",
    Description: "A comprehensive dashboard for managing online stores, featuring inventory tracking, sales analytics, and user management capabilities.",
    Link: "#",
    Github: "https://github.com/Ajith-1809/ecommerce-dashboard",
    TechStack: ["React", "Material UI", "Firebase", "Chart.js"],
    Features: ["Data Visualization", "User Auth", "Inventory Management", "Dark Mode"]
  },
];

export const certificateData = [
  { Img: "DA.jpg" },
  { Img: "NE.jpg" },
];