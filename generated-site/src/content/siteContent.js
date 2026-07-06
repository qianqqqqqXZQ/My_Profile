export const navigationLinks = [
  { label: 'Home', to: '/', end: true },
  { label: 'Profile', to: '/profile' },
  { label: 'Experience', to: '/experience' },
  { label: 'Dance Videos', to: '/dance' },
]

export const heroHighlights = [
  { label: 'Identity', value: 'Ziqian Xiong / UNNC CS' },
  { label: 'Direction', value: 'Layered Photo Lens' },
  { label: 'Visual', value: 'Portrait Reveal Interaction' },
  { label: 'Status', value: 'Portfolio in progress' },
]

export const readyPageContent = {
  en: {
    heroTitle: 'Where Do You Want to Go ?',
    cardActionLabel: 'Open Page',
    heroNote: 'More modules are being continuously updated...',
    routeCards: [
      {
        label: 'Profile',
        to: '/profile',
        title: 'Basic Background',
        description: 'This page contains some general personal information of mine, such as my hobbies.',
      },
      {
        label: 'Experience',
        to: '/experience',
        title: 'Develop Experience',
        description: 'Develop relevant research experience, work experience and project management experience',
      },
      {
        label: 'Dance Videos',
        to: '/dance',
        title: 'Dance Videos',
        description: 'Dance-related performance videos or competition videos',
      },
      {
        label: 'Contact',
        to: '/contact',
        title: 'Direct Contact',
        description: 'Email, Wechat and GitHub for quick follow-up',
      },
    ],
  },
  zh: {
    heroTitle: '\u4f60\u60f3\u5148\u4e86\u89e3\u6211\u7684\u4ec0\u4e48',
    cardActionLabel: '\u8fdb\u5165\u9875\u9762',
    heroNote: '\u66f4\u591a\u6a21\u5757\u6b63\u5728\u6301\u7eed\u66f4\u65b0\u4e2d...',
    routeCards: [
      {
        label: '\u4e2a\u4eba\u80cc\u666f',
        to: '/profile',
        title: '\u57fa\u672c\u80cc\u666f',
        description: '\u8fd9\u4e00\u9875\u5305\u542b\u6211\u7684\u4e00\u4e9b\u57fa\u672c\u4e2a\u4eba\u4fe1\u606f\uff0c\u4f8b\u5982\u7231\u597d\u7b49\u5185\u5bb9\u3002',
      },
      {
        label: '\u5f00\u53d1\u7ecf\u5386',
        to: '/experience',
        title: '\u5f00\u53d1\u7ecf\u5386',
        description: '\u67e5\u770b\u4e0e\u5f00\u53d1\u76f8\u5173\u7684\u79d1\u7814\u3001\u5de5\u4f5c\u4ee5\u53ca\u9879\u76ee\u7ec4\u7ec7\u7ecf\u5386\u3002',
      },
      {
        label: '\u821e\u8e48\u89c6\u9891',
        to: '/dance',
        title: '\u821e\u8e48\u89c6\u9891',
        description: '\u8857\u821e\u76f8\u5173\u7684\u6bd4\u8d5b\u89c6\u9891\u6216\u6f14\u51fa\u89c6\u9891\u3002',
      },
      {
        label: '\u8054\u7cfb\u65b9\u5f0f',
        to: '/contact',
        title: '\u8054\u7cfb\u65b9\u5f0f',
        description: '\u901a\u8fc7\u90ae\u7bb1\u3001\u5fae\u4fe1\u6216 GitHub \u5feb\u901f\u627e\u5230\u6211\u3002',
      },
    ],
  },
}

export const readyPageUnlockKey = 'home-ready-unlocked'

export const homePageLanguageStorageKey = 'home-page-language'

export const homePageContent = {
  en: {
    eyebrow: 'This is a personal webpage.',
    titleLines: ['Hello!', 'Welcome to', 'My Space...', "I'm", 'Ziqian Xiong :)'],
    titleAriaLabel: "Hello! Welcome to My Space... I'm Ziqian Xiong :)",
    summary: "You're ready to go?",
    ctaLabel: "Sure, I'm ready !",
  },
  zh: {
    eyebrow: '\u8fd9\u662f\u6211\u7684\u4e2a\u4eba\u4e3b\u9875\u3002',
    titleLines: [
      '\u4f60\u597d\uff01',
      '\u6b22\u8fce\u6765\u5230',
      '\u6211\u7684\u7a7a\u95f4...',
      '\u6211\u662f',
      '\u718a\u5b50\u8c26 :)',
    ],
    titleAriaLabel:
      '\u4f60\u597d\uff01\u6b22\u8fce\u6765\u5230\u6211\u7684\u7a7a\u95f4... \u6211\u662f\u718a\u5b50\u8c26 :)',
    summary: '\u51c6\u5907\u597d\u7ee7\u7eed\u4e86\u5417\uff1f',
    ctaLabel: '\u5f53\u7136\uff0c\u6211\u51c6\u5907\u597d\u4e86\uff01',
  },
}

export const contactPageContent = {
  en: {
    hero: {
      title: 'If You Want to Contact Me...',
      summary: 'This page describes the contact information of the webpage owner.',
    },
    sectionTitle: 'My Contact Information',
    cards: [
      {
        icon: 'gmail',
        title: 'Gmail',
        value: 'ziqianxiong3@gmail.com',
        description: 'This is my long-term personal email address. You can directly send me emails.',
        href: 'mailto:ziqianxiong3@gmail.com',
        type: 'link',
      },
      {
        icon: 'outlook',
        title: 'Outlook',
        value: 'scyzx7@nottingham.edu.cn',
        description:
          'This is the official email address of my current institution. You can try sending me an email through this.',
        href: 'mailto:scyzx7@nottingham.edu.cn',
        type: 'link',
      },
      {
        icon: 'github',
        title: 'GitHub',
        value: 'qianqqqqqXZQ',
        description: 'This is my GitHub page. If you are interested in my code and repositories, please click on it.',
        href: 'https://github.com/qianqqqqqXZQ',
        type: 'external',
      },
      {
        icon: 'wechat',
        title: 'WeChat',
        value: 'XZQqqqqqian',
        description: 'This is my social media app in China. If you want to become friends with me, just click on it.',
        type: 'modal',
      },
    ],
    wechatModal: {
      closeLabel: 'Close WeChat QR code',
      title: 'WeChat',
      summary: 'Scan the QR code to add me on WeChat.',
      imageAlt: 'WeChat QR code for XZQqqqqqian',
    },
  },
  zh: {
    hero: {
      title: '\u5982\u679c\u4f60\u60f3\u8054\u7cfb\u6211...',
      summary: '\u8fd9\u4e00\u9875\u5c55\u793a\u4e86\u8fd9\u4e2a\u4e2a\u4eba\u4e3b\u9875\u62e5\u6709\u8005\u7684\u8054\u7cfb\u65b9\u5f0f\u3002',
    },
    sectionTitle: '\u6211\u7684\u8054\u7cfb\u65b9\u5f0f',
    cards: [
      {
        icon: 'gmail',
        title: 'Gmail',
        value: 'ziqianxiong3@gmail.com',
        description: '\u8fd9\u662f\u6211\u957f\u671f\u4f7f\u7528\u7684\u4e2a\u4eba\u90ae\u7bb1\uff0c\u4f60\u53ef\u4ee5\u76f4\u63a5\u7ed9\u6211\u53d1\u90ae\u4ef6\u3002',
        href: 'mailto:ziqianxiong3@gmail.com',
        type: 'link',
      },
      {
        icon: 'outlook',
        title: 'Outlook',
        value: 'scyzx7@nottingham.edu.cn',
        description: '\u8fd9\u662f\u6211\u76ee\u524d\u5b66\u6821\u7684\u5b98\u65b9\u90ae\u7bb1\uff0c\u4f60\u4e5f\u53ef\u4ee5\u901a\u8fc7\u8fd9\u4e2a\u90ae\u7bb1\u8054\u7cfb\u6211\u3002',
        href: 'mailto:scyzx7@nottingham.edu.cn',
        type: 'link',
      },
      {
        icon: 'github',
        title: 'GitHub',
        value: 'qianqqqqqXZQ',
        description: '\u8fd9\u662f\u6211\u7684 GitHub \u4e3b\u9875\uff0c\u5982\u679c\u4f60\u5bf9\u6211\u7684\u4ee3\u7801\u6216\u4ed3\u5e93\u611f\u5174\u8da3\uff0c\u53ef\u4ee5\u70b9\u51fb\u67e5\u770b\u3002',
        href: 'https://github.com/qianqqqqqXZQ',
        type: 'external',
      },
      {
        icon: 'wechat',
        title: '\u5fae\u4fe1',
        value: 'XZQqqqqqian',
        description: '\u8fd9\u662f\u6211\u5728\u4e2d\u56fd\u5e38\u7528\u7684\u793e\u4ea4\u8f6f\u4ef6\uff0c\u5982\u679c\u4f60\u60f3\u548c\u6211\u52a0\u4e2a\u597d\u53cb\uff0c\u53ef\u4ee5\u76f4\u63a5\u70b9\u51fb\u3002',
        type: 'modal',
      },
    ],
    wechatModal: {
      closeLabel: '\u5173\u95ed\u5fae\u4fe1\u4e8c\u7ef4\u7801',
      title: '\u5fae\u4fe1',
      summary: '\u626b\u63cf\u4e8c\u7ef4\u7801\u5373\u53ef\u5728\u5fae\u4fe1\u4e0a\u6dfb\u52a0\u6211\u3002',
      imageAlt: '\u5fae\u4fe1\u7528\u6237 XZQqqqqqian \u7684\u4e8c\u7ef4\u7801',
    },
  },
}

export const profileHighlights = [
  { label: 'NAME', value: 'Ziqian Xiong' },
  { label: 'BIRTH', value: '2006/3/7' },
  { label: 'SCHOOL', value: 'University of Nottingham Ningbo China' },
  { label: 'HOBBY', value: 'Dancing and Music' },
]

export const campusActivities = [
  {
    label: 'Street Dance Club',
    title: 'Vice Captain of the Street Dance Club',
    summary: 'Supported rehearsals, team coordination, and routine preparation while helping maintain performance quality and daily communication inside the club.',
    outcome: 'Built stronger leadership through organizing people, balancing atmosphere with discipline, and keeping group execution consistent before showcases and campus events.',
    category: 'Student Leadership',
    accent: 'Crew direction',
  },
  {
    label: 'Student Union',
    title: 'External Relations Department Member',
    summary: 'Participated in outreach-related work, including external communication, resource coordination, and practical support for student-facing activities.',
    outcome: 'Improved professional communication, negotiation awareness, and the ability to represent a student organization in a clear and reliable way.',
    category: 'External Affairs',
    accent: 'Partnership rhythm',
  },
  {
    label: 'Event Support',
    title: 'Campus Activity Planning and Coordination',
    summary: 'Contributed to the preparation and on-site execution of school activities, working across planning tasks, schedule alignment, and team coordination.',
    outcome: 'Learned how to keep operations stable under real-time pressure while preserving a polished experience for participants and organizers.',
    category: 'Execution',
    accent: 'Operational calm',
  },
  {
    label: 'Community Presence',
    title: 'Performance, Representation, and Team Identity',
    summary: 'Used extracurricular roles not only to participate, but also to contribute to team culture, visibility, and a stronger sense of shared identity on campus.',
    outcome: 'Turned activity participation into a broader practice of responsibility, presence, and representing a group with confidence in public settings.',
    category: 'Campus Engagement',
    accent: 'Visible energy',
  },
]

export const contactLinks = [
  {
    label: 'Reach by Email',
    value: 'your.email@example.com',
    description: 'Send a direct message for project discussion, collaboration, or portfolio follow-up.',
    href: 'mailto:your.email@example.com',
  },
  {
    label: 'Browse GitHub',
    value: 'github.com/your-handle',
    description: 'Review code samples, experiments, and repository activity in one place.',
    href: 'https://github.com/',
  },
  {
    label: 'Open LinkedIn',
    value: 'linkedin.com/in/your-profile',
    description: 'Connect professionally and follow experience updates or profile details.',
    href: 'https://www.linkedin.com/',
  },
  {
    label: 'Current Location',
    value: 'Ningbo / China',
    description: 'Based in Ningbo, China and available online for remote contact and coordination.',
    href: '/contact',
  },
]

export const projectExperience = [
  {
    title: 'Intelligent Resume Website',
    period: '2026',
    description: 'Designed and implemented a multi-page portfolio with interactive visuals, route-aware media behavior, and a refined editorial interface system.',
    stack: 'React / Vite / Motion',
  },
  {
    title: 'Coursework Engineering Prototype',
    period: '2025',
    description: 'Built a prototype-oriented software workflow for experimentation, iteration, and front-end delivery across academic development tasks.',
    stack: 'Frontend / Prototyping / UI Systems',
  },
  {
    title: 'Technical Exploration Archive',
    period: 'Selected',
    description: 'Collected small but focused implementation studies to validate interaction design, modular structure, and polished presentation quality.',
    stack: 'Interface Craft / Iteration / Delivery',
  },
]

export const researchExperience = [
  {
    title: 'Edge-Enhanced Dual-Stream Transformer for Small Polyp Segmentation',
    period: 'May. 2025-Present',
    supervisor: 'Prof. Fiseha Berhanu Tesema',
    supervisorUrl: 'https://research.nottingham.edu.cn/en/persons/fiseha-berhanu-tesema/',
    description: 'Small polyp segmentation research using an edge-enhanced dual-stream CNN-Transformer architecture.',
    focus: 'Segmentation / CV',
    details: [
      {
        label: 'Model Development and Implementation',
        text: 'Built a small polyp segmentation model on the OpenMMLab framework, integrating a dual-stream CNN-Transformer architecture with a Laplacian pyramid module and boundary-aware loss. Implemented and debugged key sub-modules including the CNN stream, Transformer stream, edge separation, attention fusion, and loss function.',
      },
      {
        label: 'Dataset Preparation',
        text: 'Curated and preprocessed the Kvasir-SEG and ETIS-LaribPolypDB datasets, including normalization, annotation screening, and small-polyp subset partitioning.',
      },
      {
        label: 'Performance Evaluation',
        text: 'Conducted comparative experiments, validating the model\'s performance using Dice, IoU, and inference speed metrics.',
      },
    ],
    publicationStatus: 'Still in progress',
  },
  {
    title: 'Dynamic Dual-Branch Neural Network for Personalized Keyword Spotting',
    period: 'June. 2026-Present',
    supervisor: 'Prof. Heng Yu',
    description: 'Personalized keyword spotting research centered on a dynamic dual-branch neural network design.',
    focus: 'Keyword Spotting / Speech',
    details: [
      {
        label: 'Current Status',
        text: 'Still in progress.',
      },
    ],
    publicationStatus: 'Still in progress',
  },
]

export const workingExperience = [
  {
    company: 'Academic and Personal Development',
    role: 'Independent Builder',
    period: '2025 - Present',
    description: 'Carrying work from idea to shipped result through planning, interface implementation, iteration, and technical cleanup.',
    highlight: 'End-to-end execution',
  },
  {
    company: 'Research Collaboration Context',
    role: 'Research Assistant Mindset',
    period: '2025 - 2026',
    description: 'Supporting research implementation with experiment-oriented coding, structured observation, and a bias toward reproducible progress.',
    highlight: 'Research implementation',
  },
  {
    company: 'Project Delivery Workflow',
    role: 'Coordinator and Implementer',
    period: 'Selected Work',
    description: 'Managing scope, translating abstract ideas into task lists, and maintaining visual and technical quality through delivery cycles.',
    highlight: 'Planning and delivery',
  },
]

export const strengths = [
  {
    title: 'Technical Communication',
    description: 'Turn complex technical ideas into clear code, interface, and presentation.',
  },
  {
    title: 'Execution',
    description: 'Carry work from concept to implementation across projects and prototypes.',
  },
  {
    title: 'Research Mindset',
    description: 'Focus on evidence, comparison, and methodology instead of stopping at features.',
  },
  {
    title: 'Design Judgment',
    description: 'Prefer restrained visual systems with strong hierarchy and finish.',
  },
]

export const danceClips = [
  {
    label: 'Clip 01',
    title: 'Performance highlight',
    description: 'Main highlight edit or competition-stage clip.',
  },
  {
    label: 'Clip 02',
    title: 'Choreography cut',
    description: 'Rehearsal work, close-up shots, or rhythm changes.',
  },
  {
    label: 'Clip 03',
    title: 'Behind the scenes',
    description: 'Rehearsal footage, edit versions, or a platform link.',
  },
]
