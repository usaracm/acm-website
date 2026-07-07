export interface EventData {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  emoji: string;
  date: string;
  endDate?: string;
  year: string;
  category: string;
  categoryColor: string;
  description: string;
  fullDescription: string;
  venue: string;
  venueAddress?: string;
  participants?: string;
  organizers?: string[];
  highlights: string[];
  image?: string;
  prizes?: {
    position: string;
    prize: string;
    emoji: string;
  }[];
  gallery?: string[];
  tags: string[];
  links?: {
    label: string;
    url: string;
  }[];
  schedule?: {
    time: string;
    activity: string;
  }[];
  speakers?: {
    name: string;
    role: string;
    company?: string;
  }[];
  previewUrl?: string;
  isUpcoming?: boolean;
  isFeatured?: boolean;
  registrationUrl?: string;
  registrationDeadline?: string;
}

// Reordered to prioritize recent past events for Homepage (first 6 past events)
export const eventsData: EventData[] = [
  // 1. Upcoming
  {
    id: "1",
    slug: "75-days-dsa-challenge",
    title: "25 Days DSA Challenge",
    subtitle: "Level Up Your DSA Skills",
    emoji: "🔥",
    date: "January 1, 2026",
    endDate: "March 15, 2026",
    year: "2026",
    category: "Challenge",
    categoryColor: "#FF6B6B",
    description: "A focused 25-day DSA sprint is coming soon.",
    fullDescription: "The 25 Days DSA Challenge by GGSIPU EDC ACM Student Chapter is a focused coding initiative designed to help students strengthen their Data Structures and Algorithms (DSA) skills through consistent daily problem-solving. Whether you're a beginner or looking to sharpen your skills for placements and competitive programming, this challenge is for you.\n\nThis isn't just about solving problems - it's about building discipline, creating a habit, and becoming part of a community that pushes each other to improve every single day. With curated problem sets, weekly reviews, and a supportive Discord community, you'll never feel alone in this journey. The next edition is coming soon.",
    venue: "Online (ACM Portal + HackerRank)",
    participants: "Expected 300+",
    organizers: ["Arsh Singh", "Sheelendra Kumar", "DSA Team"],
    previewUrl: "https://squid-game-cyan.vercel.app/",
    image: "/events/75-days.webp",
    highlights: [
      "✦ Master fundamental and advanced DSA concepts",
      "✦ Daily tracking and live leaderboard",
      "✦ Peer learning through ACM Discord",
      "✦ Weekly review meetups for doubt resolution",
      "✦ Completion certificate for full 25-day streak",
      "✦ Special badges for top performers",
    ],
    prizes: [
      { position: "1st Place", prize: "Premium HackerRank Subscription + Swag Kit", emoji: "🥇" },
      { position: "2nd Place", prize: "6-Month HackerRank Premium", emoji: "🥈" },
      { position: "3rd Place", prize: "3-Month HackerRank Premium", emoji: "🥉" },
      { position: "Consistency Award", prize: "ACM Exclusive Merchandise", emoji: "⭐" },
    ],
    tags: ["DSA", "Competitive Programming", "Algorithms", "Data Structures"],
    links: [
      { label: "Official Website", url: "https://squid-game-cyan.vercel.app/" },
    ],

    schedule: [
      { time: "Daily", activity: "Solve 1-2 DSA problems from curated list" },
      { time: "Every Sunday", activity: "Weekly review session & doubt resolution" },
      { time: "Bi-Weekly", activity: "Mock contests for practice" },
      { time: "Final Week", activity: "Grand finale contest & awards" },
    ],
    isUpcoming: true,
    isFeatured: true,
    registrationUrl: "#",
    registrationDeadline: "December 25, 2025",
  },
  // 2. GWY Conf 2026 (Most Recent Past)
  {
    id: "12",
    slug: "gwy-conf-2026",
    title: "GWY Conf 2026",
    subtitle: "Insights Across Technology, Startups, and Internet Culture",
    emoji: "🌟",
    date: "March 28, 2026",
    year: "2026",
    category: "Conference",
    categoryColor: "#FF8A3D",
    description: "A curated in-person conference connecting students with leaders across tech, startups, and internet culture.",
    fullDescription: "As part of its commitment to innovation and practical learning, the GGSIPU EDC ACM Student Chapter, in collaboration with the GGSIPU USS ACM Student Chapter and GWY Conf, organized \"GWY Conf 2026.\" This curated conference introduced students to insights across technology, startups, and internet culture through speaker sessions, panel discussions, and networking. A controlled participation model ensured high-quality engagement, providing attendees with valuable exposure and meaningful connections within the innovation ecosystem.",
    venue: "GGSIPU EDC Campus",
    participants: "Curated Participation",
    organizers: [
      "GGSIPU EDC ACM Student Chapter",
      "GGSIPU USS ACM Student Chapter",
      "GWY Conf",
    ],
    highlights: [
      "✦ Curated in-person conference format",
      "✦ Speaker sessions and panel discussions",
      "✦ Networking with builders and founders",
      "✦ Focus on technology, startups, and internet culture",
      "✦ Controlled participation for high-quality engagement",
    ],
    speakers: [
      { name: "Nishita", role: "Speaker" },
      { name: "Tanvi Gupta", role: "Speaker" },
      { name: "Kamna Bhardwaj", role: "Speaker" },
      { name: "Aaira Kaurrr", role: "Speaker" },
      { name: "Tanishi Mookerjee", role: "Speaker" },
      { name: "Bhawna Chauhan", role: "Speaker" },
    ],
    tags: ["Conference", "Startups", "Networking", "Community", "Women in Tech"],
    image: "/events/11 GWY CONF/11.webp",
    gallery: [
      "/events/11 GWY CONF/11.webp",
      "/events/11 GWY CONF/IMG-20260328-WA0176.webp",
      "/events/11 GWY CONF/IMG-20260329-WA0292.webp",
      "/events/11 GWY CONF/IMG20260328140510.webp",
      "/events/11 GWY CONF/IMG20260328145843.webp",
      "/events/11 GWY CONF/IMG20260328152011.webp",
      "/events/11 GWY CONF/IMG20260328161729.webp",
    ],
    isFeatured: true,
  },
  // 3. Hour of AI
  {
    id: "8",
    slug: "hour-of-ai-ai-sparks",
    title: "Hour of AI: AI Sparks",
    subtitle: "Build Your First AI Agent",
    emoji: "🤖",
    date: "December 8, 2025",
    year: "2025",
    category: "Technical",
    categoryColor: "#00D9FF",
    description: "Hands-on AI workshop introducing students to the fundamentals of Artificial Intelligence and building their first AI agent.",
    fullDescription: "As part of Computer Science Education Week 2025, the GGSIPU EDC ACM Student Chapter organized 'Hour of AI: AI Sparks.' This hands-on workshop introduced students from all disciplines to the fundamentals of Artificial Intelligence. Participants engaged in practical learning by building their first AI agent using Ollama and exploring real-world AI workflows. The virtual session on Google Meet fostered creativity through interactive exercises and concept reinforcement. Attendees received E-Certificates and opportunities to win ACM goodies, successfully marking their entry into the world of intelligent systems.",
    venue: "Online (Google Meet)",
    participants: "150+",
    organizers: ["GGSIPU EDC ACM Student Chapter"],
    highlights: [
      "✦ Hands-on AI activity using Hour of AI resources",
      "✦ Create your first AI agent using Ollama",
      "✦ Interactive exercises + Concept reinforcement quiz",
      "✦ Win exciting ACM goodies",
      "✦ Open for all students",
      "✦ E-Certificates for all the participants",
      "✦ Share your builds & get featured on ACM platforms",
    ],
    tags: ["AI", "Workshop", "Technical", "Ollama", "Hour of AI"],

    image: "/events/hour-of-ai.webp",
    gallery: [
      "/events/10 HOUR OF AI/10.webp",
      "/events/10 HOUR OF AI/Screenshot 2025-12-08 at 10.10.29 PM.webp",
      "/events/10 HOUR OF AI/Screenshot 2025-12-08 at 10.13.08 PM.webp",
      "/events/10 HOUR OF AI/Screenshot 2025-12-08 at 10.17.57 PM.webp",
      "/events/10 HOUR OF AI/Screenshot 2025-12-08 at 10.41.38 PM.webp",
      "/events/10 HOUR OF AI/Screenshot 2025-12-08 at 11.13.09 PM.webp",
      "/events/10 HOUR OF AI/Screenshot 2025-12-08 at 11.27.26 PM.webp",
    ],
  },
  // 4. FAANG Ep 3
  {
    id: "2",
    slug: "faang-weekend-nvidia",
    title: "FAANG Weekend EP3 — NVIDIA",
    subtitle: "From Failures to Offers",
    emoji: "💚",
    date: "November 22, 2025",
    year: "2025",
    category: "Webinar",
    categoryColor: "#76B900",
    description: "Roadmap to cracking NVIDIA with Business Intelligence Manager Savio Dmello.",
    fullDescription: "The GGSIPU EDC ACM Student Chapter and USS ACM-W presented the third episode of their #FAANGWeekend series, titled 'From Failures to Offers: How to Crack NVIDIA.' The session featured Savio Dmello, Manager of Business Intelligence at NVIDIA and former IBM Application Architect. Conducted as an exclusive podcast-style session on Google Meet and YouTube, it provided students with a roadmap to navigate tough recruitment journeys. Savio shared actionable advice on overcoming placement failures, understanding what NVIDIA looks for in candidates, and mastering the mindset required for FAANG-level interviews.",
    venue: "Online (Google Meet & YouTube)",
    participants: "240+",
    organizers: ["Career Development Cell", "ACM Core Team"],
    highlights: [
      "✦ Roadmap to navigate tough recruitment journeys",
      "✦ Overcoming placement failures",
      "✦ What NVIDIA looks for in candidates",
      "✦ Mindset for FAANG-level interviews",
      "✦ Networking opportunities",
    ],
    tags: ["Career", "AI", "NVIDIA", "Webinar"],
    speakers: [
      { name: "Savio Dmello", role: "Manager of Business Intelligence", company: "NVIDIA" },
    ],

    image: "/events/faangweekend-ep3.webp",
    gallery: [
      "/events/9 FAANGWEEKEND EP 3/9.webp",
      "/events/9 FAANGWEEKEND EP 3/photo_6129766300130151643_w.webp",
      "/events/9 FAANGWEEKEND EP 3/photo_6129766300130151646_w.webp",
      "/events/9 FAANGWEEKEND EP 3/photo_6129766300130151647_w.webp",
      "/events/9 FAANGWEEKEND EP 3/photo_6129766300130151650_w.webp",
      "/events/9 FAANGWEEKEND EP 3/photo_6129766300130151685_w.webp",
      "/events/9 FAANGWEEKEND EP 3/photo_6129766300130151703_w.webp",
    ],
    isFeatured: true,
  },
  // 5. Code Catalyst
  {
    id: "3",
    slug: "codecatalyst-0x6",
    title: "ACM CodeCatalyst 0x6",
    subtitle: "6 Days of Intensive Learning",
    emoji: "⚡",
    date: "October 29 - November 3, 2025",
    year: "2025",
    category: "Bootcamp",
    categoryColor: "#FF6B6B",
    description: "Intensive 6-day bootcamp covering DSA, Web Dev, and ML at USAR.",
    fullDescription: "The GGSIPU EDC ACM Student Chapter organized 'Code Catalyst 0x6,' an intensive 6-day technical bootcamp at USAR with over 420+ participants. The event was structured with two days dedicated to each domain: Data Structures & Algorithms (DSA), Web Development, and Machine Learning. This format allowed for deep dives into logic building, modern web tools, and ML models through live sessions and hands-on challenges. To foster a competitive spirit, the bootcamp included daily quizzes, with exclusive goodies awarded to the winners, celebrating technical excellence and active participation.",
    venue: "Online",
    participants: "420+",
    organizers: ["Technical Team", "Workshop Coordinators"],
    highlights: [
      "✦ 6-day intensive bootcamp",
      "✦ Deep dives into DSA, Web Dev, and ML",
      "✦ Hands-on challenges",
      "✦ Daily quizzes and exclusive goodies",
      "✦ Certificate of completion",
    ],
    schedule: [
      { time: "Day 1-2", activity: "DSA: Logic Building" },
      { time: "Day 3-4", activity: "Web Development: Modern Tools" },
      { time: "Day 5-6", activity: "Machine Learning: Models & Application" },
    ],
    tags: ["DSA", "ML", "Web Dev", "Bootcamp"],

    image: "/events/acm-codecatalyst-0x6.webp",
    gallery: [
      "/events/8 ACM CODE CATALYST 0X6/8.webp",
      "/events/8 ACM CODE CATALYST 0X6/photo_6057671709243935655_w.webp",
      "/events/8 ACM CODE CATALYST 0X6/photo_6062252321929890670_w.webp",
      "/events/8 ACM CODE CATALYST 0X6/photo_6064504121743576197_w.webp",
      "/events/8 ACM CODE CATALYST 0X6/photo_6068938490793102112_w.webp",
      "/events/8 ACM CODE CATALYST 0X6/photo_6071190290606787552_w.webp",
      "/events/8 ACM CODE CATALYST 0X6/photo_6073344500173573464_w.webp",
    ],
    isFeatured: true,
  },
  // 6. Silicon Quest
  {
    id: "4",
    slug: "silicon-quest-animeverse",
    title: "Silicon Quest: ANIMEVERSE",
    subtitle: "Where Anime Meets Innovation",
    emoji: "🎌",
    date: "October 16, 2025",
    year: "2025",
    category: "Hackathon",
    categoryColor: "#FF69B4",
    description: "Dual-stage technical event blending anime culture with AR treasure hunts and prototyping.",
    fullDescription: "Organized by the GGSIPU EDC ACM Student Chapter as part of the Elysian 2025 fest, Silicon Quest: Animeverse was a unique dual-stage technical event blending anime culture with innovation. Round 1, 'The Digital Otaku Quest,' was an AR-driven treasure hunt where teams solved technical clues to locate 'character card' QR codes. Round 2, 'The Anime Innovation Forge,' was a rapid-prototyping hackathon. The event encouraged creativity and teamwork, awarding prizes including goodies and certificates worth a total of ₹6,000 to the top innovative solutions.",
    venue: "GGSIPU EDC Campus",
    participants: "150+",
    organizers: ["Creative Team", "Technical Team"],
    highlights: [
      "✦ AR-driven treasure hunt",
      "✦ Anime Innovation Forge hackathon",
      "✦ Blending anime culture with innovation",
      "✦ Prizes worth ₹6,000",
    ],
    prizes: [
      { position: "1st Place", prize: "₹3,000 + Goodies", emoji: "🏆" },
      { position: "1st Runner Up", prize: "₹2,000 + Goodies", emoji: "🥈" },
      { position: "2nd Runner Up", prize: "₹1,000 + Goodies", emoji: "🥉" },
    ],
    tags: ["Hackathon", "Anime", "AR", "Innovation"],
    links: [
      { label: "Register on Unstop", url: "https://unstop.com/hackathons/silicon-quest-animeverse-elysian-2025-ggsipu-usar-acm-student-chapter-1568743" },
    ],
    image: "/events/silicon-quest.webp",
    gallery: [
      "/events/7 SILICON QUEST ANIMEVERSE/7.webp",
      "/events/7 SILICON QUEST ANIMEVERSE/IMG-20251015-WA0153.webp",
      "/events/7 SILICON QUEST ANIMEVERSE/IMG-20251015-WA0159.webp",
      "/events/7 SILICON QUEST ANIMEVERSE/IMG-20251016-WA0029.webp",
      "/events/7 SILICON QUEST ANIMEVERSE/IMG-20251016-WA0133.webp",
      "/events/7 SILICON QUEST ANIMEVERSE/IMG-20251016-WA0157.webp",
      "/events/7 SILICON QUEST ANIMEVERSE/IMG_20251015_131352.webp",
    ],
  },
  // 7. HeLa Crossroads
  {
    id: "5",
    slug: "hela-crossroads",
    title: "HeLa Crossroads",
    subtitle: "Dapp Development",
    emoji: "🌐",
    date: "September 26, 2025",
    year: "2025",
    category: "Workshop",
    categoryColor: "#9B59B6",
    description: "Hands-on workshop on Web3, Blockchain, and DApp development with HeLa Labs.",
    fullDescription: "In collaboration with HeLa Labs, the GGSIPU EDC ACM Student Chapter conducted 'HeLa Crossroads' on September 26, 2025. This hands-on workshop immersed undergraduate students in Web3, Blockchain, and DApp development. Led by speakers Shivam Kumar and Shivam Garg, the session bridged theory with practice, guiding participants from conceptual fundamentals to the full DApp lifecycle. The event reached full capacity with over 150 participants, who successfully wrote smart contracts and deployed Web3 tokens on the HeLa L1 test chain, gaining critical practical skills in emerging decentralized technologies.",
    venue: "Lec Hall",
    participants: "150+",
    organizers: ["Blockchain SIG", "Technical Team"],
    highlights: [
      "✦ Hands-on Web3 & Blockchain workshop",
      "✦ DApp lifecycle development",
      "✦ Writing smart contracts",
      "✦ Deploying Web3 tokens on HeLa L1 test chain",
    ],
    speakers: [
      { name: "Shivam Kumar", role: "Speaker", company: "HeLa Labs" },
      { name: "Shivam Garg", role: "Speaker", company: "HeLa Labs" },
    ],
    tags: ["Web3", "Blockchain", "DApps", "Workshop"],

    image: "/events/hela-crossroads.webp",
    gallery: [
      "/events/6 HELA CROSSROADS/6.webp",
      "/events/6 HELA CROSSROADS/DSC_6407.webp",
      "/events/6 HELA CROSSROADS/Screenshot 2025-12-11 at 01-18-52 Instagram.webp",
      "/events/6 HELA CROSSROADS/Screenshot 2025-12-11 at 01-18-58 Instagram.webp",
      "/events/6 HELA CROSSROADS/Screenshot 2025-12-11 at 01-19-05 Instagram.webp",
      "/events/6 HELA CROSSROADS/Screenshot 2025-12-11 at 01-19-10 Instagram.webp",
      "/events/6 HELA CROSSROADS/Screenshot 2025-12-11 at 01-19-16 Instagram.webp",
    ],
  },
  // 8. FAANG Ep 2
  {
    id: "6",
    slug: "faang-weekend-meta",
    title: "FAANG Weekend EP2 — Meta",
    subtitle: "From Failures to Success",
    emoji: "💙",
    date: "September 21, 2025",
    year: "2025",
    category: "Mentorship",
    categoryColor: "#0668E1",
    description: "Insights from Meta Software Engineer II Sanket Singh on SDE preparation.",
    fullDescription: "The GGSIPU EDC ACM & USS ACM-W Student Chapters hosted the second episode of their flagship online series, #FAANGWEEKEND, titled 'From Failures to Success - How to Get Placed at Meta.' Featuring Sanket Singh, Software Engineer II at Meta, the session demystified the Big Tech recruitment process for undergraduates. Structured as an interactive podcast on Google Meet and YouTube, Mr. Singh provided actionable insights on resume building, interview strategies, and SDE preparation. The event was a resounding success, offering students a clear career roadmap and credit hours for their participation.",
    venue: "Online (Google Meet & YouTube)",
    participants: "120+",
    organizers: ["Career Development Cell", "ACM Core Team"],
    highlights: [
      "✦ Demystified Big Tech recruitment",
      "✦ Actionable insights on resume building",
      "✦ Interview strategies & SDE preparation",
      "✦ Clear career roadmap",
    ],
    speakers: [
      { name: "Sanket Singh", role: "Software Engineer II", company: "Meta" },
    ],
    tags: ["Career", "Meta", "Interview Prep", "Mentorship"],

    image: "/events/faangweekend-ep2.webp",
    gallery: [
      "/events/5 FAANGWEEKEND EP 2/5.webp",
      "/events/5 FAANGWEEKEND EP 2/Screenshot 2025-09-21 at 7.22.38 PM.webp",
      "/events/5 FAANGWEEKEND EP 2/Screenshot 2025-09-21 at 7.26.31 PM.webp",
      "/events/5 FAANGWEEKEND EP 2/Screenshot 2025-09-21 at 7.26.54 PM.webp",
      "/events/5 FAANGWEEKEND EP 2/Screenshot 2025-09-21 at 8.09.53 PM.webp",
      "/events/5 FAANGWEEKEND EP 2/Screenshot 2025-09-21 at 8.10.09 PM.webp",
      "/events/5 FAANGWEEKEND EP 2/Screenshot 2025-09-21 at 8.12.24 PM.webp",
    ],
  },
  // 9. FAANG Ep 1
  {
    id: "7",
    slug: "faang-weekend-microsoft",
    title: "FAANG Weekend EP1 — Microsoft",
    subtitle: "From Failure to Offers",
    emoji: "🔷",
    date: "August 30, 2025",
    year: "2025",
    category: "Career",
    categoryColor: "#00A4EF",
    description: "Interactive session on cracking Microsoft interviews with Bharat Ahuja.",
    fullDescription: "The GGSIPU EDC ACM Student Chapter, in collaboration with GGSIP USS ACM-W, launched the 'FAANG Weekend' series with a fully virtual session titled 'From Failure to Offers: How to get placed at Microsoft.' Featuring guest speaker Bharat Ahuja, this online event adopted an interactive podcast format. It was a massive success, reaching full capacity on the live meeting platform, with over 135 additional participants joining via the YouTube livestream. The session demystified the recruitment process, providing students with a strategic roadmap and expert insights for cracking interviews at top tech giants.",
    venue: "Online (Google Meet & YouTube)",
    participants: "110+",
    organizers: ["Career Development Cell", "ACM Core Team"],
    highlights: [
      "✦ How to get placed at Microsoft",
      "✦ Demystifying recruitment process",
      "✦ Strategic roadmap & expert insights",
      "✦ Cracking interviews at top tech giants",
    ],
    speakers: [
      { name: "Bharat Ahuja", role: "Guest Speaker", company: "Microsoft" },
    ],
    tags: ["Career", "Microsoft", "Interview Prep", "Big Tech"],

    image: "/events/faangweekend-ep1.webp",
    gallery: [
      "/events/4 FAANGWEEKEND EP 1/4.webp",
      "/events/4 FAANGWEEKEND EP 1/1757325411264.webp",
      "/events/4 FAANGWEEKEND EP 1/1757325411835.webp",
      "/events/4 FAANGWEEKEND EP 1/1757325412193.webp",
      "/events/4 FAANGWEEKEND EP 1/Screenshot 2025-08-30 202209.webp",
      "/events/4 FAANGWEEKEND EP 1/Screenshot 2025-08-30 202737.webp",
      "/events/4 FAANGWEEKEND EP 1/Screenshot 2025-08-30 203255.webp",
    ],
  },
  // 10. Kickstart Outline (ACM Orientation)
  {
    id: "9",
    slug: "kickstart-with-acm",
    title: "ACM Orientation & LLM Workshop",
    subtitle: "Welcome to ACM",
    emoji: "🚀",
    date: "August 12, 2025",
    year: "2025",
    category: "Orientation",
    categoryColor: "#0085CA",
    description: "Collaborative Student Induction Program introducing LLMs and ACM culture.",
    fullDescription: "The event was a collaborative Student Induction Program organized by the GGSIPU EDC ACM and USS ACM-W Student Chapters. This high-energy event served as the perfect welcome for the new academic year, blending community building with technical insight. The session featured an engaging introduction to Large Language Models (LLMs), alongside a showcase of the chapters' vibrant culture and membership benefits. The leadership teams highlighted opportunities for growth within the ACM network. The day concluded with interactive ice-breaking activities, fostering a spirit of inclusivity and successfully integrating freshers into the global computing ecosystem.",
    venue: "GGSIPU EDC Auditorium",
    participants: "300+",
    organizers: ["Core Team", "All SIGs"],
    highlights: [
      "✦ Introduction to Large Language Models (LLMs)",
      "✦ Showcase of vibrant culture & benefits",
      "✦ Opportunities for growth in ACM",
      "✦ Interactive ice-breaking activities",
    ],
    tags: ["Orientation", "LLM", "Community", "Welcome"],

    image: "/events/acm-orientation.webp",
    gallery: [
      "/events/3 ACM ORIENTATION & LLM WORKSHOP/3.webp",
      "/events/3 ACM ORIENTATION & LLM WORKSHOP/1757058782279.webp",
      "/events/3 ACM ORIENTATION & LLM WORKSHOP/1757058782426.webp",
      "/events/3 ACM ORIENTATION & LLM WORKSHOP/1757058782464.webp",
      "/events/3 ACM ORIENTATION & LLM WORKSHOP/Screenshot 2025-12-11 at 00-58-35 Instagram.webp",
      "/events/3 ACM ORIENTATION & LLM WORKSHOP/Screenshot 2025-12-11 at 00-58-44 Instagram.webp",
      "/events/3 ACM ORIENTATION & LLM WORKSHOP/Screenshot 2025-12-11 at 00-58-55 Instagram.webp",
    ],
  },
  // 11. Indo-American Seminar
  {
    id: "10",
    slug: "indo-american-seminar",
    title: "Indo-American Seminar",
    subtitle: "Education Opportunities in Higher Education",
    emoji: "🌏",
    date: "January 23, 2025",
    year: "2025",
    category: "Seminar",
    categoryColor: "#FFD700",
    description: "Speaker session on international academic collaborations and higher education in the US.",
    fullDescription: "The GGSIPU EDC ACM & USS ACM-W Student Chapters organized an enlightening speaker session on 'Education Opportunities in Higher Education – Indo-American Linkages.' The session was delivered by Dr. Ron Buckmire, Dean of the School of Computer Science & Mathematics at Marist University, New York. Dr. Buckmire shared valuable insights into international academic collaborations, research prospects, and pathways for higher education in the US. The interactive session guided students on navigating the evolving landscape of global education and emphasized the importance of interdisciplinary learning in the era of AI and automation.",
    venue: "Lec Hall",
    participants: "80+",
    organizers: ["University Administration", "ACM Core Team"],
    highlights: [
      "✦ Education Opportunities in Higher Education",
      "✦ Indo-American Linkages",
      "✦ International academic collaborations",
      "✦ Pathways for higher education in US",
    ],
    speakers: [
      { name: "Dr. Ron Buckmire", role: "Dean, School of CS & Math", company: "Marist University, NY" },
    ],
    tags: ["Seminar", "Education", "Global", "Collaboration"],

    image: "/events/indo-american-seminar.webp",
    gallery: [
      "/events/2 INDO-AMERICAN SEMINAR/2.webp",
      "/events/2 INDO-AMERICAN SEMINAR/IMG_2965.webp",
      "/events/2 INDO-AMERICAN SEMINAR/IMG_2985.webp",
      "/events/2 INDO-AMERICAN SEMINAR/IMG_3023.webp",
      "/events/2 INDO-AMERICAN SEMINAR/IMG_3077.webp",
      "/events/2 INDO-AMERICAN SEMINAR/IMG_3081.webp",
      "/events/2 INDO-AMERICAN SEMINAR/IMG_3108.webp",
    ],
    isFeatured: true,
  },
  // 12. Smart Delhi Ideathon
  {
    id: "11",
    slug: "smart-delhi-ideathon",
    title: "Smart Delhi Ideathon",
    subtitle: "Innovating for a Smarter Capital",
    emoji: "🏙️",
    date: "Dec 24, 2024 - Feb 4, 2025",
    year: "2024-25",
    category: "Ideathon",
    categoryColor: "#2ECC71",
    description: "State-level challenge addressing critical urban issues like traffic, waste, and safety.",
    fullDescription: "The Smart Delhi Ideathon 2025 was organized by GGSIPU in collaboration with the GGSIPU EDC ACM Student Chapter, AICTE IDEA Lab, and IPCA. This state-level challenge addressed critical urban issues like traffic, waste, air quality, and women's safety, aligning with UN SDG 11. The Grand Finale at Vigyan Bhawan featured a substantial prize pool: ₹5 Lakh for the winner, ₹3 Lakh for the 1st runner-up, and ₹1 Lakh for the 2nd runner-up. The chapter played a key role in facilitating this event, where top teams presented scalable technical solutions for a smarter, sustainable Delhi.",
    venue: "Vigyan Bhawan (Grand Finale)",
    participants: "2000+",
    organizers: ["Delhi Government", "GGSIPU", "ACM Chapter"],
    highlights: [
      "✦ Critical urban issues (traffic, waste, safety)",
      "✦ Grand Finale at Vigyan Bhawan",
      "✦ Total Prize Pool: ₹9 Lakhs",
      "✦ Scalable technical solutions",
    ],
    prizes: [
      { position: "Winner", prize: "₹5,00,000", emoji: "🏆" },
      { position: "1st Runner Up", prize: "₹3,00,000", emoji: "🥈" },
      { position: "2nd Runner Up", prize: "₹1,00,000", emoji: "🥉" },
    ],
    tags: ["Ideathon", "Urban Tech", "Smart City", "Innovation"],
    links: [
      { label: "Official Website", url: "https://www.sdi2025.in/" },
    ],
    image: "/events/smart-delhi-ideathon.webp",
    gallery: [
      "/events/1 SMART DELHI IDEATHON/1.webp",
      "/events/1 SMART DELHI IDEATHON/0R6A6351.webp",
      "/events/1 SMART DELHI IDEATHON/0R6A6438.webp",
      "/events/1 SMART DELHI IDEATHON/0R6A6900.webp",
      "/events/1 SMART DELHI IDEATHON/0R6A7134.webp",
      "/events/1 SMART DELHI IDEATHON/Copy of IMG_1474.webp",
      "/events/1 SMART DELHI IDEATHON/IMG_5251.CR2.webp",
    ],
    isFeatured: true,
  },
];

export const upcomingEvents = eventsData.filter((e) => e.isUpcoming);
export const pastEvents = eventsData.filter((e) => !e.isUpcoming);
export const featuredEvents = eventsData.filter((e) => e.isFeatured);

export function getEventBySlug(slug: string): EventData | undefined {
  return eventsData.find((e) => e.slug === slug);
}

export function getEventById(id: string): EventData | undefined {
  return eventsData.find((e) => e.id === id);
}
