import { InlineCode } from "@/once-ui/components";

const person = {
  firstName: "Huy",
  lastName: "Nguyen",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "AI Engineer | Software Engineer",
  avatar: "/images/avatar.jpg",
  location: "Asia/Ho_Chi_Minh", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Vietnamese"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/huynguyenitcs99",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/huynguyenitcs",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:huynguyen.itcs99@gmail.com",
  },
];

const home = {
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Software and AI Engineer</>,
  subline: (
    <>
      I’m Huy, a Senior AI Engineer building real-time vision and audio systems
      <br /> for edge devices — fast, reliable, and ready for production.
    </>
  ),
};

const about = {
  label: "About",
  title: "About me",
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        AI Engineer with over 3 years of experience delivering production-grade AI systems across manufacturing, surveillance, and audio domains. 
        <br /> Proven expertise in building high-performance, low-latency pipelines (under 100ms) on both edge (Jetson) and server (RTX) platforms. 
        <br /> Adept at bridging applied research and deployment, driving end-to-end development from model design to system integration. 
        <br /> Strong leadership in mentoring junior engineers, collaborating across teams, and aligning AI solutions with real-world operational goals.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Next Robotics",
        project: "Industrial Defect Inspection System (NextSight)",
        timeframe: "2022 - Present",
        role: "AI & Software Engineer",
        achievements: [
          <>
            Built a high-speed segmentation pipeline for 3000×3000 images, capable of processing each image in under 100 milliseconds using tile-based techniques.
          </>,
          <>
            Integrated real-time defect classification covering 6 to 10 types, with custom retraining pipelines per factory.
          </>,
          <>
            Developed cross-platform desktop applications (C++/C#/Qt) to interface with industrial cameras and operator feedback systems.
          </>,
          <>
            Led system deployment across multiple manufacturing sites and mentored three junior engineers throughout the development lifecycle.
          </>,
        ],
        images: [
          // // optional: leave the array empty if you don't want to display images
          // {
          //   src: "/images/projects/project-01/cover-01.jpg",
          //   alt: "Once UI Project",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        company: "Next Robotics",
        project: "Multi-Camera People Re-Identification (NextEyes)",
        timeframe: "2023 - 2024",
        role: "AI & Software Engineer",
        achievements: [
          <>
            Engineered a multi-camera identity tracking system for non-overlapping CCTV views using YOLOv5 for detection and ArcFace + RetinaFace for facial embeddings.
          </>,
          <>
            Built a real-time feature-matching pipeline using NVIDIA DeepStream SDK, achieving 30 FPS on RTX 3090 and 15 FPS on Jetson Orin.
          </>,
          <>
            Addressed complex ReID challenges such as occlusions, look-alike individuals, and partial face visibility.
          </>,
          <>
            Delivered the full system architecture, backend, and demo within 1 month.
          </>,
        ],
        images: [
          // // optional: leave the array empty if you don't want to display images
          // {
          //   src: "/images/projects/project-01/cover-01.jpg",
          //   alt: "Once UI Project",
          //   width: 16,
          //   height: 9,
          // },
        ],
      },
      {
        company: "Nami Technology",
        project: "AI Voice Enhancement System (CrystalSound)",
        timeframe: "2021 - 2022",
        role: "AI & Software Engineer",
        achievements: [
          <>
            Developed CrystalSound, a real-time AI noise and echo cancellation desktop application used in FPT Telecom’s telesales operations.
          </>,
          <>
            Integrated LSTM-based noise suppression and SpeexDSP echo cancellation into a low-latency audio pipeline with total system delay under 200 milliseconds.
          </>,
          <>
            Built the Windows user interface, virtual audio driver infrastructure, and packaging pipeline using WiX Toolset and CMake.
          </>,
          <>
            Ensured smooth operation across major conferencing platforms including Zoom, Google Meet, Skype, and Zalo.
          </>,
          <>
            Provided technical mentorship for a student thesis on real-time voice AI, which achieved a top-grade defense score above 9.5.
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "Ho Chi Minh City University of Technology (HCMUT)",
        description:  <>B.Eng. in Computer Science and Technology (Honors Program)
                      <br /> GPA: 8.24/10.0
                      <br /> Courses: Algorithms, Computer Vision, OOP, Mathematical Modeling
                      </>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "AI, Deep Learning & Computer Vision:",
        description: <>PyTorch, ONNX, DeepStream, OpenCV, TensorRT</>,
        // optional: leave the array empty if you don't want to display images
        images: [
        ],
      },
      {
        title: "Tasks:",
        description: <>Segmentation, Detection, Re-ID, Real-time optimization</>,
        // optional: leave the array empty if you don't want to display images
        images: [
        ],
      },
      {
        title: "Languages:",
        description: <>Python, C++, C#</>,
        // optional: leave the array empty if you don't want to display images
        images: [
        ],
      },
      {
        title: "UI & Integration:",
        description: <>Qt, Avalonia, Windows Forms</>,
        // optional: leave the array empty if you don't want to display images
        images: [
        ],
      },
      {
        title: "Deployment:",
        description: <>Docker, CI/CD, CMake, WiX Toolset, virtual drivers</>,
        // optional: leave the array empty if you don't want to display images
        images: [
        ],
      },
      {
        title: "Platforms:",
        description: <>NVIDIA Jetson (Orin, Xavier), Windows, Linux</>,
        // optional: leave the array empty if you don't want to display images
        images: [
        ],
      },
      {
        title: "Collaboration:",
        description: <> Mentoring, cross-team delivery, client-facing</>,
        // optional: leave the array empty if you don't want to display images
        images: [
        ],
      },
    ],
  },
};

const blog = {
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  label: "Work",
  title: "My projects",
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  label: "Gallery",
  title: "My photo gallery",
  description: `A photo collection by ${person.name}`,
  // Images from https://pexels.com
  images: [
    {
      src: "/images/gallery/img-01.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-02.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-03.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-04.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-05.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-06.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-07.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-08.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-09.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-10.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-11.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/img-12.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-13.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/img-14.jpg",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
