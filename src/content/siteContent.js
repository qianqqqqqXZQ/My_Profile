export const navigationLinks = [
  { label: 'Profile', to: '/profile' },
  { label: 'Academic', to: '/experience' },
  { label: 'Dance Videos', to: '/dance' },
  { label: 'Contact', to: '/contact' },
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
        label: 'Academic',
        to: '/experience',
        title: 'Academic',
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
    period: 'Sep 2022 - Jul 2023',
    organization: 'Zhang Shu Senior High School Student Union',
    role: 'President',
    bullets: [
      'Led a multi-department student union, including teams such as Publicity and Discipline Inspection, chaired weekly meetings, and organized routine discipline and classroom hygiene inspections across grades.',
      'Assisted the school in planning and delivering major events such as the sports meet and campus arts festival, serving in key coordination roles including overall event planning.',
      'Received the Outstanding Student Union Cadre award multiple times at the school recognition ceremony in acknowledgment of leadership and service performance.',
    ],
    photoAlt: 'Reserved photo area for Zhang Shu Senior High School Student Union president experience',
    photoLabel: 'Photo Placeholder',
    coverPhoto: {
      src: '/media/images/campus-activity-covers/zhangshu-middle-school-cover.jpg',
      alt: 'Zhangshu Senior High School Student Union logo centered on a white cover.',
    },
  },
  {
    period: 'Oct 2024 - Sep 2025',
    organization: 'University of Nottingham Ningbo China Student Union',
    role: 'Public Relation Office',
    bullets: [
      'Managed operations for the official University of Nottingham Ningbo China souvenir store under the Student Union, including on-site sales during major campus events such as Open Day and graduation ceremonies, with peak single-event revenue exceeding RMB 30,000.',
      'Took primary responsibility for personnel coordination within the store, including staff scheduling, announcements, meeting minutes, and day-to-day team management.',
    ],
    photoAlt: 'Reserved photo area for University of Nottingham Ningbo China Student Union Public Relation Office experience',
    photoLabel: 'Photo Placeholder',
    coverPhoto: {
      src: '/media/images/campus-activity-covers/unnc-student-union-cover.jpg',
      alt: 'UNNC Students Union logo centered on a white cover.',
    },
  },
  {
    period: 'Mar 2025 - Jun 2026',
    organization: 'UNNC Department of Campus Life',
    role: 'Administrative Intern',
    bullets: [
      'Supported current students, parents, and alumni through the campus hotline, coordinated inquiries with external partner organizations, and provided consultation on student records and archival procedures.',
      'Managed student files through the archives system and liaised with on-campus departments by email to collect and organize required student documentation.',
    ],
    photoAlt: 'Reserved photo area for UNNC Department of Campus Life administrative internship',
    photoLabel: 'Photo Placeholder',
    coverPhoto: {
      src: '/media/images/unnc-intern/department-of-campus-life.jpg',
      alt: 'UNNC Department of Campus Life sign used for the administrative internship entry.',
    },
  },
  {
    period: 'Sep 2025 - Jul 2026',
    organization: 'University of Nottingham Ningbo China Shuffle Crew',
    role: 'Vice Captain',
    bullets: [
      'Led choreography structuring for major official campus events, including Show Night, XShow, and the New Year Gala, covering movement design, formation arrangement, and music editing.',
      'Organized and delivered the Shuffle Crew annual showcase while managing and performing in multiple programs throughout the production cycle.',
      'Represented the team in coordination with internal and external organizations, supporting joint event delivery through partnership communication, co-hosting arrangements, and on-site performance support.',
      'A personal freestyle performance clip from a campus showcase reached over 5 million views and 70,000 likes on Douyin, providing strong public visibility for both the performance and the crew.',
    ],
    photoAlt: 'Reserved photo area for UNNC Shuffle Crew vice captain experience',
    photoLabel: 'Photo Placeholder',
    coverPhoto: {
      src: '/media/images/campus-activity-covers/shuffle-crew-cover.jpg',
      alt: 'Shuffle Crew logo centered on a black cover.',
    },
    photos: [
      {
        src: '/media/images/shuffle-crew/shuffle-crew-01.jpg',
        alt: 'Shuffle Crew stage performance under red and blue lighting with white masks.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-02.jpg',
        alt: 'Shuffle Crew dancer standing in a spotlight during a dark stage performance.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-03.jpg',
        alt: 'Vice captain leading a Shuffle Crew routine in warm stage lighting.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-04.jpg',
        alt: 'Wide dark stage composition featuring Shuffle Crew in a focused spotlight.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-05.jpg',
        alt: 'Masked Shuffle Crew members posed on a dimly lit stage.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-06.jpg',
        alt: 'Shuffle Crew vice captain performing center stage with masked dancers.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-07.jpg',
        alt: 'Portrait-oriented stage photo of two masked Shuffle Crew performers.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-08.jpg',
        alt: 'Full Shuffle Crew formation performing in front of a vivid blue backdrop.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-09.jpg',
        alt: 'Shuffle Crew group performance framed by bold red lighting and masks.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-10.jpg',
        alt: 'Campus stage dance performance with a breakdance move at center stage.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-11.jpg',
        alt: 'Vice captain leading a trio dance performance on the UNNC stage.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-12.jpg',
        alt: 'Solo-focused campus performance image with supporting dancers behind.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-13.jpg',
        alt: 'Group dance photo with colorful costumes and stage lights at UNNC.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-14.jpg',
        alt: 'Outdoor campus showcase photo featuring a handstand move in front of a large audience.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-15.jpg',
        alt: 'Wide UNNC stage performance photo with the Shuffle Crew dancing beneath fireworks visuals.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-16.jpg',
        alt: 'Portrait-oriented campus stage performance highlighting a floorwork pose with another dancer behind.',
      },
      {
        src: '/media/images/shuffle-crew/shuffle-crew-17.jpg',
        alt: 'Outdoor battle-style performance shot capturing a one-hand freeze before a crowd on campus.',
      },
    ],
    galleryLabel: 'View my performance photo',
    linkLabel: 'View the video',
    linkAfterBulletIndex: 3,
    linkHref:
      'https://www.douyin.com/jingxuan/search/%E8%B0%A6qqqqq?aid=84ece7e1-4646-4b1f-8398-491fa2125598&modal_id=7494149451603381539&type=general',
  },
]

export const offCampusActivities = [
  {
    period: 'Ongoing',
    organization: 'Off-Campus Hip-Hop Dance Community',
    role: 'Dance Event Organizer, Judge & Guest',
    bullets: [
      'Organized and co-hosted multiple Hip-Hop dance events and competitions to strengthen the Hip-Hop dance community across universities in Ningbo, including collaborations with brands such as adidas.',
      'Invited to serve as a judge or guest at a range of public dance events, while earning multiple awards in external competitions as both an individual dancer and a team member.',
      'Current member of Ningbo Twenty Two Locking Crew, invited with the team to participate in numerous public performances and film a major music video.',
      "Dance Instructor at D-Day Dance Studio, Jiangxi, responsible for choreographing instructors' showcase performances for the studio's anniversary celebrations over multiple years.",
    ],
    photoAlt: 'Reserved photo area for off-campus Hip-Hop dance activities',
    photoLabel: 'Photo Placeholder',
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
    title: 'UNNC Group Research Project (GRP)',
    titleZh: '宁波诺丁汉大学小组研究项目（GRP）',
    period: 'Oct 2026 - Jun 2027',
    periodZh: '2026年10月 - 2027年6月',
    description: 'Placeholder for the upcoming UNNC GRP experience. Project details will be added after the work begins.',
    descriptionZh: '这里预留即将开始的 UNNC GRP 项目经历。项目启动后会补充具体内容。',
    stack: 'To be confirmed',
    stackZh: '待确认',
    sortValue: 202610,
  },
]

export const researchExperience = [
  {
    title: 'Edge-Enhanced Dual-Stream Transformer for Small Polyp Segmentation',
    titleZh: '面向小息肉分割的边缘增强双流 Transformer',
    period: 'May. 2025-Present',
    repositoryUrl: 'https://github.com/dashen2004/Edge-Enhanced-Dual-Stream-Transformer-for-Small-Polyp-Segmentation',
    periodZh: '2025年5月 - 至今',
    supervisor: 'Prof. Fiseha Berhanu Tesema',
    supervisorUrl: 'https://research.nottingham.edu.cn/en/persons/fiseha-berhanu-tesema/',
    authorshipLabel: 'Paper: Second Author',
    logoSrc: 'https://www.nottingham.ac.uk/SiteElements/Images/uon-logo/UoN-Nottingham-Blue-mobile.svg',
    logoAlt: 'University of Nottingham logo',
    description: 'Small polyp segmentation research using an edge-enhanced dual-stream CNN-Transformer architecture.',
    descriptionZh: '基于边缘增强双流 CNN-Transformer 架构的小息肉分割研究。',
    details: [
      {
        label: 'Model Development and Implementation',
        labelZh: '模型开发与实现',
        text: 'Built a small polyp segmentation model on the OpenMMLab framework, integrating a dual-stream CNN-Transformer architecture with a Laplacian pyramid module and boundary-aware loss. Implemented and debugged key sub-modules including the CNN stream, Transformer stream, edge separation, attention fusion, and loss function.',
        textZh: '基于 OpenMMLab 框架搭建小息肉分割模型，融合双流 CNN-Transformer 架构、拉普拉斯金字塔模块和边界感知损失。实现并调试 CNN 分支、Transformer 分支、边缘分离、注意力融合和损失函数等关键子模块。',
      },
      {
        label: 'Dataset Preparation',
        labelZh: '数据集准备',
        text: 'Curated and preprocessed the Kvasir-SEG and ETIS-LaribPolypDB datasets, including normalization, annotation screening, and small-polyp subset partitioning.',
        textZh: '整理并预处理 Kvasir-SEG 和 ETIS-LaribPolypDB 数据集，包括归一化、标注筛查以及小息肉子集划分。',
      },
      {
        label: 'Performance Evaluation',
        labelZh: '性能评估',
        text: 'Conducted comparative experiments, validating the model\'s performance using Dice, IoU, and inference speed metrics.',
        textZh: '开展对比实验，并使用 Dice、IoU 和推理速度等指标验证模型表现。',
      },
    ],
    publicationStatus: 'Currently under submission to CVIU as the second author.',
    publicationStatusZh: '仍在进行中',
    publicationStatusZhOverride: 'Currently under submission to CVIU as the second author.',
    sortValue: 202505,
  },
  {
    title: 'Dynamic Dual-Branch Neural Network for Personalized Keyword Spotting',
    titleZh: '面向个性化关键词识别的动态双分支神经网络',
    period: 'June. 2026-Present',
    periodZh: '2026年6月 - 至今',
    supervisor: 'Prof. Heng Yu',
    supervisorUrl: 'https://research.nottingham.edu.cn/en/persons/heng-yu/',
    logoSrc: 'https://www.nottingham.ac.uk/SiteElements/Images/uon-logo/UoN-Nottingham-Blue-mobile.svg',
    logoAlt: 'University of Nottingham logo',
    description: 'Personalized keyword spotting research centered on a dynamic dual-branch neural network design.',
    descriptionZh: '围绕动态双分支神经网络设计展开的个性化关键词识别研究。',
    details: [
      {
        label: 'Current Status',
        labelZh: '当前状态',
        text: 'Still in progress.',
        textZh: '仍在进行中。',
      },
    ],
    publicationStatus: 'Still in progress',
    publicationStatusZh: '仍在进行中',
    sortValue: 202606,
  },
]

export const workingExperience = [
  {
    company: 'Pony.ai',
    companyZh: '小马智行',
    role: 'Algorithm Engineer',
    roleZh: '算法工程师',
    period: 'July 2026 - Sep 2026',
    periodZh: '2026年7月 - 2026年9月',
    logoSrc:
      'https://ir.pony.ai/sites/g/files/knoqqb104676/themes/site/client_site/dist/images/logo.png',
    logoAlt: 'Pony.ai logo',
    leader: 'Bo Xiao',
    bullets: [
      'Research VGGT and a range of VGGT-based 3D reconstruction variants to address autonomous-driving data-collection challenges, including visual occlusion and long-term data acquisition.',
      'Still in work.',
    ],
    bulletsZhOverride: [
      'Research VGGT and a range of VGGT-based 3D reconstruction variants to address autonomous-driving data-collection challenges, including visual occlusion and long-term data acquisition.',
      'Still in work.',
    ],
    sortValue: 202607,
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
    id: 'dance-cover-01',
    img: '/media/images/dance-covers/dance-cover-01.jpg',
    alt: 'Dancer leaping on stage during a competition battle performance.',
    aspectRatio: 0.563,
    title: 'battle',
    url: '',
  },
  {
    id: 'dance-cover-02',
    img: '/media/images/dance-covers/dance-cover-02.jpg',
    alt: 'A dancer performing before an audience at an indoor dance event.',
    aspectRatio: 0.75,
    title: 'Judge Show',
    url: '',
  },
  {
    id: 'dance-cover-03',
    img: '/media/images/dance-covers/dance-cover-03.jpg',
    alt: 'Two dancers performing a synchronized acrobatic move in an indoor venue.',
    aspectRatio: 1.811,
    title: 'performance',
    url: '',
  },
  {
    id: 'dance-cover-04',
    img: '/media/images/dance-covers/dance-cover-04.jpg',
    alt: 'Dancer performing before a group on a warmly lit stage.',
    aspectRatio: 0.562,
    title: 'cypher',
    url: '',
  },
  {
    id: 'dance-cover-05',
    img: '/media/images/dance-covers/dance-cover-05.jpg',
    alt: 'Dancer captured mid-move in a studio cypher surrounded by spectators.',
    aspectRatio: 1.808,
    title: 'cypher',
    url: '',
  },
  {
    id: 'dance-cover-06',
    img: 'https://picsum.photos/seed/dance-cover-06/1330/1000?grayscale',
    alt: 'Landscape placeholder for a dance video cover.',
    aspectRatio: 1.33,
    title: 'Battle Round',
    url: '',
  },
  {
    id: 'dance-cover-07',
    img: 'https://picsum.photos/seed/dance-cover-07/900/1200?grayscale',
    alt: 'Portrait placeholder for a dance video cover.',
    aspectRatio: 0.75,
    title: 'Outdoor Jam',
    url: '',
  },
  {
    id: 'dance-cover-08',
    img: 'https://picsum.photos/seed/dance-cover-08/1500/1000?grayscale',
    alt: 'Landscape placeholder for a dance video cover.',
    aspectRatio: 1.5,
    title: 'Formation Practice',
    url: '',
  },
  {
    id: 'dance-cover-09',
    img: 'https://picsum.photos/seed/dance-cover-09/900/1200?grayscale',
    alt: 'Portrait placeholder for a dance video cover.',
    aspectRatio: 0.75,
    title: 'Freestyle Moment',
    url: '',
  },
]
