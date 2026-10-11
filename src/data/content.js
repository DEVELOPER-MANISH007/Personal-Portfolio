export const profile = {
  name: "Manish Kumar",
  role: "Aspiring Data Scientist",
  email: "manish8755026341@gmail.com",
  github: "https://github.com/DEVELOPER-MANISH007",
  linkedin: "https://www.linkedin.com/in/mitansh-kumar",
  summary:
    "Analytical and detail-oriented Computer Science graduate with solid expertise in Python, SQL, Machine Learning, and Statistics to build end-to-end ML pipelines. Experienced in executing thorough data analysis and advanced Exploratory Data Analysis (EDA). Equipped with MERN stack knowledge, providing a strong engineering foundation to deploy predictive models and data-driven dashboards seamlessly using Streamlit.",
};

/* Site-level metadata used for SEO tags, Open Graph, Twitter Cards
   and JSON-LD structured data. Keep this in sync with index.html
   if the canonical URL or social image ever changes. */
export const siteMeta = {
  title: "Manish Kumar — Data Scientist & ML Engineer",
  description:
    "Portfolio of Manish Kumar, a Computer Science graduate building end-to-end machine learning pipelines — from messy raw data to deployed, interactive predictions. Python, Scikit-Learn, Streamlit, MERN.",
  keywords:
    "Manish Kumar, Data Scientist, Machine Learning Engineer, Python Developer, Scikit-Learn, Streamlit, MERN Stack, Data Science Portfolio, ML Engineer Portfolio",
  url: "https://manishkumar-portfolio.vercel.app",
  image: "/og-image.png",
  twitterHandle: "@DEVELOPERMANISH",
};

export const stats = [
  { value: "7.5", label: "CGPA · B.Tech CSE" },
  { value: "06", label: "Featured Projects" },
  { value: "03", label: "Focus Areas" },
];

export const skillClusters = [
  {
    title: "Programming",
    color: "#7dd8ff",
    items: [
      { name: "Python", icon: "python" },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    title: "Data Analysis",
    color: "#a78bfa",
    items: [
      { name: "Pandas", icon: "pandas" },
      { name: "NumPy", icon: "numpy" },
      { name: "Data Cleaning", icon: "broom" },
      { name: "EDA", icon: "magnifier" },
    ],
  },
  {
    title: "Machine Learning",
    color: "#ff8b6b",
    items: [
      { name: "Scikit-Learn", icon: "sklearn" },
      { name: "Regression & Classification", icon: "chart" },
      { name: "Random Forest", icon: "tree" },
      { name: "Feature Engineering", icon: "gears" },
      { name: "Cross Validation", icon: "check" },
    ],
  },
  {
    title: "Visualization",
    color: "#7dd8ff",
    items: [
      { name: "Matplotlib", icon: "matplotlib" },
      { name: "Seaborn", icon: "seaborn" },
    ],
  },
  {
    title: "Deployment & Web",
    color: "#a78bfa",
    items: [
      { name: "Streamlit", icon: "streamlit" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Express.js", icon: "express" },
      { name: "React.js", icon: "react" },
      { name: "Node.js", icon: "node" },
    ],
  },
  {
    title: "Tools",
    color: "#ff8b6b",
    items: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "vscode" },
    ],
  },
];

/* categories drive the Projects filter bar — keep values from this
   fixed set: "Full Stack" | "AI/ML" | "Python" | "Developer Tools" */
export const projectCategories = ["All", "Full Stack", "AI/ML", "Python", "Developer Tools"];

export const projects = [
  {
    title: "House Price Predictor",
    tag: "End-to-end ML pipeline + Streamlit",
    description:
      "A house price prediction workflow built with a Scikit-Learn preprocessing pipeline and Random Forest regressor, with a command-line training and prediction flow alongside a Streamlit interface.",
    features: [
      "Preprocessing with a Scikit-Learn pipeline",
      "Random Forest regression model",
      "Command-line training and prediction workflow",
      "Streamlit interface and saved model pipeline",
    ],
    stack: ["Python", "Scikit-Learn", "Streamlit"],
    categories: ["AI/ML", "Python"],
    link: "https://github.com/DEVELOPER-MANISH007/House-Price-Predictor-End-to-End-ML-Pipeline-Streamlit-App",
    visual: "house",
    demo: "https://house-price-prediction-mlwithui-crgifhd6jnuto4p9oxuuqc.streamlit.app/",
    demoLabel: "Live demo",
    color: "#7dd8ff",
  },
  {
    title: "Movie Recommendation System",
    tag: "Information retrieval & NLP",
    description:
      "A Streamlit movie recommender using content-based recommendations, with movie posters, ratings, genres, runtimes, and trailer links powered by TMDB.",
    features: [
      "Content-based filtering over movie metadata",
      "Content-based movie recommendations",
      "Movie details and posters from TMDB",
      "Ratings, genres, runtimes, and trailer links",
    ],
    stack: ["Python", "Pandas", "Streamlit", "TMDB API"],
    categories: ["AI/ML", "Python"],
    link: "https://github.com/DEVELOPER-MANISH007/Movie-Recommendation-System",
    visual: "movies",
    demo: "https://movie-recommendation-system-bydevmanish.streamlit.app/",
    demoLabel: "Live demo",
    color: "#a78bfa",
  },
  {
    title: "WhatsApp Chat Analysis",
    tag: "Exploratory data analysis",
    description:
      "Turned messy raw chat exports into a structured analytical workflow — user activity timelines, message statistics, and engagement trends, surfaced through clear Matplotlib and Seaborn visuals.",
    features: [
      "Automated parsing of raw chat exports",
      "User activity timelines & message statistics",
      "Engagement trend detection",
      "Clear Matplotlib / Seaborn visual reports",
    ],
    stack: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    categories: ["Python", "AI/ML"],
    link: "https://github.com/DEVELOPER-MANISH007/Whatsapp-Chat-Analysis",
    visual: "chat",
    demo: "https://whatsapp-chat-analysis-8vgcsn8wcdfw3bznyn6tua.streamlit.app/",
    demoLabel: "Live demo",
    color: "#ff8b6b",
  },
  {
    title: "Student Marks Predictor",
    tag: "Predictive modeling & regression",
    description:
      "A Random Forest regression project that predicts student marks from study hours and attendance, with a reusable Scikit-Learn pipeline and command-line interface.",
    features: [
      "Regression-based academic outcome prediction",
      "Reusable preprocessing pipeline",
      "Study hours and attendance as model inputs",
      "Command-line prediction interface",
    ],
    stack: ["Python", "Scikit-Learn", "Regression"],
    categories: ["AI/ML", "Python"],
    link: "https://github.com/DEVELOPER-MANISH007/Student-Marks-Predictor-ML-Pipeline-CLI-",
    visual: "student",
    demo: null,
    color: "#9be8c4",
  },
  {
    title: "MLCompare",
    tag: "Open-source PyPI package",
    description:
      "A lightweight Python package that trains and compares multiple classification and regression models in just a few lines of code — evaluating performance and saving the best model automatically.",
    features: [
      "Trains & compares multiple ML models in one call",
      "Automatic performance metric comparison",
      "Save and reload trained models",
      "Clean, beginner-friendly Scikit-Learn-based API",
      "Published and installable via PyPI (mlcompare-dev)",
    ],
    stack: ["Python", "Scikit-Learn", "PyPI Package", "OOP Design"],
    categories: ["AI/ML", "Python", "Developer Tools"],
    link: "https://github.com/Developer-Manish007/mlcompare",
    visual: "compare",
    demo: "https://pypi.org/project/mlcompare-dev/",
    demoLabel: "View on PyPI",
    color: "#7dd8ff",
  },
  {
    title: "PyML Snippets",
    tag: "VS Code extension",
    description:
      "A VS Code extension with 54 ready-to-use snippets for Python, Data Science, and Machine Learning — EDA, preprocessing, model evaluation, and visualization, all a keystroke away.",
    features: [
      "54 production-ready VS Code snippets",
      "Covers EDA, preprocessing, modeling & visualization",
      "One-keystroke boilerplate for train/test split, scalers, encoders",
      "Snippets for 15+ ML algorithms (Random Forest, SVM, Gradient Boosting…)",
      "Installable VS Code extension for data and ML workflows",
    ],
    stack: ["VS Code API", "JSON Snippets", "Python", "Developer Tooling"],
    categories: ["Developer Tools", "Python"],
    link: "https://github.com/Developer-Manish007/pyml-snippets",
    visual: "code",
    demo: null,
    color: "#a78bfa",
  },
];

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  school: "AIMT, Greater Noida",
  cgpa: "CGPA 7.5",
  years: "2020 — 2024",
};

/* No professional work experience yet — this profile represents a
   fresher. An Experience section is intentionally NOT rendered
   anywhere in the app. See src/components/Experience.jsx for a
   ready-to-use (but unrendered) component: once real roles exist,
   populate the array below with real entries in the same shape
   and import + render <Experience /> in App.jsx. */
export const experience = [];

export const blog = {
  status: "Coming Soon",
  blurb:
    "No articles have been published yet; these topic ideas are being developed into practical write-ups.",
};

// Certificate details transcribed from the supplied original PDFs.
export const certifications = [
  {
    name: "Data Science for Beginners",
    org: "Board Infinity",
    date: "July 27, 2026",
    file: "/certificates/board-infinity-data-science-for-beginners.pdf",
    preview: "/certificates/board-infinity-data-science-for-beginners.png",
  },
  {
    name: "YUVA AI For All",
    org: "TCS iON · IndiaAI",
    date: "April 3, 2026",
    file: "/certificates/tcs-ion-yuva-ai-for-all.pdf",
    preview: "/certificates/tcs-ion-yuva-ai-for-all.png",
  },
  {
    name: "The Ultimate Job Ready Data Science Course",
    org: "CodeWithHarry",
    date: "February 18, 2026",
    file: "/certificates/ultimate-job-ready-data-science.pdf",
    preview: "/certificates/ultimate-job-ready-data-science.png",
  },
  {
    name: "Getting Started with Artificial Intelligence",
    org: "IBM SkillsBuild",
    date: "September 8, 2026",
    file: "/certificates/ibm-getting-started-with-ai.pdf",
    preview: "/certificates/ibm-getting-started-with-ai.png",
    verify: "https://www.credly.com/badges/16780739-c1d0-4657-af69-a091373373db",
  },
  {
    name: "Back-End Domination",
    org: "Sheryians Coding School",
    date: "April 3, 2025",
    file: "/certificates/sheryians-backend-domination.pdf",
    preview: "/certificates/sheryians-backend-domination.png",
  },
];
