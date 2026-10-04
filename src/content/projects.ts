export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  role: string;
  status: string;
  summary: string;
  intro: string;
  company: string;
  tags: string[];
  sections: { title: string; text: string }[];
  image?: string;
  media?: { src: string; caption: string }[];
  link?: { href: string; label: string };
};

export const contact = {
  email: "huynguyen.itcs99@gmail.com",
  linkedin: "https://www.linkedin.com/in/huynguyenitcs",
  github: "https://github.com/huynguyenitcs99",
};

export const projects: Project[] = [
  {
    slug: "creative-studio",
    title: "Creative Studio",
    eyebrow: "Generative design",
    role: "Contributor · Menu pipeline & visual DNA research",
    status: "Released",
    company: "Chat Smith · team product",
    summary: "Turning visual references into better generation guidelines.",
    intro:
      "Good generative design needs a coherent visual language. I adapted an existing poster pipeline for menus, then researched a reference-driven approach to guide the aesthetic direction of the output.",
    tags: ["Generative AI", "Visual DNA", "JSONL", "Pipeline design"],
    sections: [
      {
        title: "The starting point",
        text: "A teammate had built the original poster-generation pipeline. I ported that pipeline to support menu generation. This gave me a practical starting point and a focused problem: improving the aesthetic quality of menus.",
      },
      {
        title: "My contribution",
        text: "I researched and designed a method that extracts descriptions of visual DNA from reference images into JSONL. Those descriptions are used as generation guidelines, rather than assembling independent design axes. The aim was to guide a coherent visual direction from the references.",
      },
      {
        title: "Beyond menus",
        text: "The owner of the original poster pipeline subsequently adopted my approach for posters, flyers, business cards and social content to improve output quality. My contribution was the menu adaptation and the visual DNA method; Creative Studio is a team product.",
      },
      {
        title: "What this page demonstrates",
        text: "The diagram explains the approach at a public-safe level. It is not a product screenshot, a production schema or a measured quality comparison. Matched outputs and evaluation details are not included here.",
      },
    ],
    link: { href: "https://chatsmith.io", label: "Visit Chat Smith" },
  },
  {
    slug: "daily-smith",
    title: "Daily Smith",
    eyebrow: "Context-aware agents",
    role: "PIC · AI pipeline, data flow & LLM-agent layer",
    status: "Released",
    company: "Chat Smith · team product",
    summary: "Connecting everyday context to a clearer sense of what matters.",
    intro:
      "Daily Smith brings connected email and calendar context into an AI experience that helps users understand their day. My focus is the intelligence behind it: the AI pipeline, data flow and LLM-agent layer.",
    tags: ["AI agents", "LLM", "MCP", "Tool integration", "Context processing"],
    sections: [
      {
        title: "The product context",
        text: "Users connect sources such as email and calendar. Provider tools, including Gmail and Google Calendar integrations, make relevant data available to the AI through MCP/tool connections.",
      },
      {
        title: "My responsibility",
        text: "As the PIC for the AI pipeline and data flow, I design how connected information reaches the LLM-agent layer and how that context supports the daily experience. This is my part of a broader team-built application.",
      },
      {
        title: "From context to conversation",
        text: "The pipeline processes context to surface daily priorities, important emails and information that deserves attention. Users can ask follow-up questions and continue a conversation using the tools supported by the application.",
      },
      {
        title: "Scope of the public overview",
        text: "This page uses an illustrative flow, not a live account or private user data. It describes reading context, prioritization and follow-up conversation; write actions such as sending emails or modifying calendar events are outside this overview.",
      },
    ],
    link: {
      href: "https://apps.apple.com/app/id1559479889",
      label: "Chat Smith on the App Store",
    },
  },
  {
    slug: "slide-design",
    title: "Slide Design",
    eyebrow: "Design-to-editable workflows",
    role: "Main PIC",
    status: "In development",
    company: "Team product",
    summary:
      "Exploring the bridge between a designed image and an editable slide.",
    intro:
      "I am the main PIC for Slide Design. One module addresses a practical creative workflow: converting image-based slides into editable slides.",
    tags: ["Generative AI", "Slide workflows", "Editable content"],
    sections: [
      {
        title: "The practical problem",
        text: "A slide image captures a design, but it limits what someone can change afterwards. Image-to-editable conversion is one module in the broader Slide Design work.",
      },
      {
        title: "My role",
        text: "I am responsible as the main PIC for this work. This public overview focuses on the module’s purpose, without exposing internal architecture or unreleased implementation details.",
      },
      {
        title: "Current state",
        text: "Slide Design has not been released. The artwork on this site is a concept explanation, not a public product demo or a benchmark of conversion quality.",
      },
    ],
  },
  {
    slug: "nextsight",
    title: "NextSight",
    eyebrow: "Industrial computer vision",
    role: "AI & software engineering",
    status: "Earlier work",
    company: "Next Robotics",
    summary:
      "Bringing defect inspection from models into the manufacturing workflow.",
    intro:
      "An industrial inspection system for challenging manufacturing surfaces. My work connected computer vision, industrial cameras, inference and a usable desktop application.",
    image: "/images/projects/nextsight/nextsight.png",
    tags: ["Segmentation", "ONNX / TensorRT", "Python / C++", "Qt", "MLflow"],
    media: [
      {
        src: "/images/projects/nextsight/nextsight_1.png",
        caption: "Existing public case media · Inspection workflow",
      },
      {
        src: "/images/projects/nextsight/nextsight_2.png",
        caption: "Existing public case media · Defect visualization",
      },
    ],
    sections: [
      {
        title: "The engineering challenge",
        text: "Transparent and semi-transparent materials introduce reflections, lighting variation and background noise. The inspection workflow needs to connect optical conditions, camera data and segmentation results with feedback from real manufacturing use.",
      },
      {
        title: "Models into an application",
        text: "The system used tile-based segmentation for high-resolution images, evolving from DeepLabV3 to LR-ASPP with MobileNetV3. My work included inference integration using ONNX/TensorRT through ONNX Runtime, industrial camera integration, and the desktop application’s transition from an early Avalonia/C# interface to Qt/C++.",
      },
      {
        title: "Operational tooling",
        text: "MLflow supported training tracking and model versioning, with server-side deployment control for reproducible updates. This work involved the whole path from model experimentation to the software around an inspection station.",
      },
      {
        title: "Deployment context",
        text: "The existing public case records a production deployment at Hoya Glass Disk, a proof of concept at Hoya Lens, and demonstration machines at Tran Hiep Thanh. Different materials and optical setups required different calibration and inspection configurations.",
      },
    ],
    link: {
      href: "https://nextrobotics.io/portfolio/nextsight/",
      label: "Company project page",
    },
  },
  {
    slug: "multi-camera-reid",
    title: "Multi-camera ReID",
    eyebrow: "Video intelligence",
    role: "AI system & pipeline engineering",
    status: "Proof of concept",
    company: "Next Robotics",
    summary: "Following a person across cameras, beyond a single frame.",
    intro:
      "A real-time multi-camera person re-identification proof of concept. The challenge was maintaining useful identity continuity as people moved between camera views.",
    image: "/images/projects/cctv/cctv.png",
    tags: ["DeepStream", "Jetson Orin", "YOLOv5", "ArcFace", "Vector search"],
    media: [
      {
        src: "/images/projects/cctv/cctv_1.png",
        caption:
          "Existing public case media · Multi-camera identity visualization",
      },
    ],
    sections: [
      {
        title: "Across camera boundaries",
        text: "A person may leave one view and reappear in another with a different pose, lighting or visible face. The system combined body and face features to match identities across both overlapping and non-overlapping views.",
      },
      {
        title: "The pipeline",
        text: "YOLOv5 provided person detection, with RetinaFace and ArcFace for face features. Full-body and face embeddings fed vector-based identity matching, with a body-feature fallback when a useful face was unavailable. Identity filtering and cross-camera matching supported trajectory visualization on a 2D map.",
      },
      {
        title: "Runtime integration",
        text: "The pipeline used NVIDIA DeepStream with Python and was evaluated on Jetson Orin and an RTX 3090. Connecting inference, identity management and visualization was central to the work.",
      },
      {
        title: "What was demonstrated",
        text: "The existing case documents a four-camera proof of concept and a live demonstration for SoftBank Japan. A larger camera network was an architectural target, not the deployed scope of that demonstration.",
      },
    ],
  },
  {
    slug: "crystalsound",
    title: "CrystalSound",
    eyebrow: "Real-time audio software",
    role: "Audio pipeline, application & release integration",
    status: "Earlier work",
    company: "NamiTech",
    summary:
      "Making AI noise and echo cancellation work inside everyday calls.",
    intro:
      "A desktop audio application bringing noise and echo cancellation into real communication workflows. My focus was integrating the audio intelligence into a reliable application.",
    image: "/images/projects/crystalsound/crystalsound.png",
    tags: [
      "Audio integration",
      "SpeexDSP",
      "C# / WPF",
      "Virtual drivers",
      "Build tooling",
    ],
    media: [
      {
        src: "/images/projects/crystalsound/crystalsound_1.png",
        caption: "Existing public case media · Desktop audio application",
      },
    ],
    sections: [
      {
        title: "Clear boundaries of contribution",
        text: "A separate team developed the LSTM noise-cancellation model. My contribution centered on the audio pipeline, application integration and the software needed to make that model usable.",
      },
      {
        title: "The audio path",
        text: "The work integrated AI noise cancellation with SpeexDSP echo cancellation and Windows virtual audio driver control. The application needed to process and route audio while remaining useful in common calling workflows.",
      },
      {
        title: "A complete desktop product",
        text: "I worked with WPF/C# for the application and with WiX, CMake and GitHub Actions around packaging and builds. Manual integration checks covered communication tools including Google Meet, Zalo and Skype.",
      },
      {
        title: "Why it matters",
        text: "This project shaped my interest in the engineering around AI: the interfaces, runtime integration and delivery details that turn a model into something people can actually use.",
      },
    ],
    link: {
      href: "https://www.namitech.io/product/crystalsound",
      label: "Company product page",
    },
  },
];

export const legacySlugs: Record<string, string> = {
  "1-Nextsight-inspection-system": "nextsight",
  "2-CCTV-ReID-system": "multi-camera-reid",
  "3-Crystalsound-noise-cancellation": "crystalsound",
};
