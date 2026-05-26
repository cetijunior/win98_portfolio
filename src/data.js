export const desktopIcons = [
  { id: 'streaming', label: 'Free Streaming', icon: '📺' },
  { id: 'devtools', label: 'Dev Tools', icon: '🛠️' },
  { id: 'software', label: 'Free Software', icon: '💾' },
  { id: 'ai', label: 'AI Picks', icon: '🤖' },
  { id: 'resources', label: 'Resources', icon: '📂' },
  { id: 'about', label: 'About CJ', icon: '👤' },
];

export const startMenuItems = [
  ...desktopIcons,
];

export const windowsData = {
  streaming: {
    id: 'streaming',
    title: 'Free Streaming Sites',
    icon: '📺',
    width: 380,
    defaultTop: 60,
    defaultLeft: 40,
    content: [
      {
        section: "📽️ Movies & TV",
        links: [
          { name: "FMovies", desc: "Large library. Use trusted mirror only.", url: "https://fmovies.gd", icon: "🍿" },
          { name: "Filma24", desc: "Me Titra Shqip", url: "https://filmametitra.net", icon: "🇦🇱" },
        ]
      },
      {
        section: "📡 Anime & Niche",
        links: [
          { name: "Aniwatch", desc: "Free, legal, no signup.", url: "https://aniwatch.co.at", icon: "🎭" },
        ]
      }
    ]
  },
  devtools: {
    id: 'devtools',
    title: 'Dev Tools I Actually Use',
    icon: '🛠️',
    width: 400,
    defaultTop: 80,
    defaultLeft: 80,
    content: [
      {
        section: "⚡ Speed & Productivity",
        links: [
          { name: "Ray.so", desc: "Beautiful code screenshots.", url: "https://ray.so", icon: "✨" },
          { name: "Excalidraw", desc: "Whiteboard for system design.", url: "https://excalidraw.com", icon: "✏️" },
          { name: "Regex101", desc: "Test and debug regex live.", url: "https://regex101.com", icon: "🔍" },
          { name: "Transform.tools", desc: "Convert JSON, SVG, CSS and more.", url: "https://transform.tools", icon: "🔄" },
          { name: "Cobalt.tools", desc: "Download from YouTube, TikTok, IG. No ads.", url: "https://cobalt.tools", icon: "⬇️" },
        ]
      },
      {
        section: "🌐 API & Backend",
        links: [
          { name: "Hoppscotch", desc: "Open-source Postman alternative.", url: "https://hoppscotch.io", icon: "🦗" },
          { name: "JSON Crack", desc: "Visualize JSON as a graph.", url: "https://jsoncrack.com", icon: "🔗" },
          { name: "Quicktype", desc: "JSON to typed code in any language.", url: "https://quicktype.io", icon: "⚙️" },
        ]
      },
      {
        section: "🎨 Design Helpers",
        links: [
          { name: "Coolors", desc: "Palette generator, fast.", url: "https://coolors.co", icon: "🎨" },
          { name: "Heroicons", desc: "Free SVG icon set by Tailwind team.", url: "https://heroicons.com", icon: "🦸" },
        ]
      }
    ]
  },
  software: {
    id: 'software',
    title: 'Free Software by Category',
    icon: '💾',
    width: 390,
    defaultTop: 100,
    defaultLeft: 120,
    content: [
      {
        section: "🎬 Video Editing",
        links: [
          { name: "DaVinci Resolve", desc: "Professional. Completely free.", url: "https://www.blackmagicdesign.com/products/davinciresolve", icon: "🎞️" },
          { name: "Kdenlive", desc: "Open-source, lightweight.", url: "https://kdenlive.org", icon: "🎬" },
          { name: "CapCut (web)", desc: "Fast edits, trending templates.", url: "https://www.capcut.com", icon: "✂️" },
        ]
      },
      {
        section: "🎵 Audio & Music",
        links: [
          { name: "Audacity", desc: "Free audio editor. Classic.", url: "https://www.audacityteam.org", icon: "🎙️" },
          { name: "LMMS", desc: "Free DAW. FL Studio alternative.", url: "https://lmms.io", icon: "🎹" },
          { name: "BandLab", desc: "Free DAW in the browser. No install.", url: "https://www.bandlab.com", icon: "🎸" },
        ]
      },
      {
        section: "🖼️ Design & Image",
        links: [
          { name: "GIMP", desc: "Free Photoshop alternative.", url: "https://www.gimp.org", icon: "🐃" },
          { name: "Inkscape", desc: "Free vector design. Illustrator alt.", url: "https://inkscape.org", icon: "🖊️" },
          { name: "Figma (free tier)", desc: "UI design. Generous free plan.", url: "https://www.figma.com", icon: "🔷" },
          { name: "Photopea", desc: "Photoshop in the browser. Free.", url: "https://www.photopea.com", icon: "🖼️" },
        ]
      },
      {
        section: "💻 Dev Environments",
        links: [
          { name: "VS Code", desc: "Best free code editor. Period.", url: "https://code.visualstudio.com", icon: "💙" },
          { name: "OrbStack", desc: "Fast Docker for Mac. Free for personal.", url: "https://orbstack.dev", icon: "🐳" },
        ]
      }
    ]
  },
  ai: {
    id: 'ai',
    title: "AI Picks — What's Actually Good",
    icon: '🤖',
    width: 390,
    defaultTop: 70,
    defaultLeft: 160,
    content: [
      {
        section: "🧠 AI Assistants",
        links: [
          { name: "Claude", desc: "Best for writing & reasoning. My default.", url: "https://claude.ai", icon: "🟠" },
          { name: "ChatGPT", desc: "GPT-4o free tier. Good for quick tasks.", url: "https://chat.openai.com", icon: "🟢" },
          { name: "Gemini", desc: "Google's. Best with Workspace.", url: "https://gemini.google.com", icon: "🔵" },
        ]
      },
      {
        section: "⚙️ Run AI Locally",
        links: [
          { name: "Ollama", desc: "Run LLMs locally. Easiest setup.", url: "https://ollama.com", icon: "🦙" },
          { name: "Open WebUI", desc: "ChatGPT UI for your local models.", url: "https://openwebui.com", icon: "🖥️" },
          { name: "LM Studio", desc: "GUI for running any GGUF model.", url: "https://lmstudio.ai", icon: "🎛️" },
        ]
      },
      {
        section: "🎨 AI Image & Creative",
        links: [
          { name: "Bing Image Creator", desc: "Free DALL-E 3. No login stress.", url: "https://www.bing.com/images/create", icon: "🖼️" },
          { name: "Ideogram", desc: "Best for text in images. Free tier.", url: "https://ideogram.ai", icon: "🎭" },
        ]
      }
    ]
  },
  resources: {
    id: 'resources',
    title: 'Resources — Learn & Build',
    icon: '📂',
    width: 390,
    defaultTop: 90,
    defaultLeft: 200,
    content: [
      {
        section: "📚 Learning",
        links: [
          { name: "Roadmap.sh", desc: "Step-by-step dev learning paths.", url: "https://roadmap.sh", icon: "🗺️" },
          { name: "The Odin Project", desc: "Free full-stack curriculum.", url: "https://theodinproject.com", icon: "⚔️" },
          { name: "CS50 (Harvard)", desc: "Best free CS intro. Ever made.", url: "https://cs50.harvard.edu", icon: "🎓" },
        ]
      },
      {
        section: "🔧 Reference & Docs",
        links: [
          { name: "DevDocs", desc: "All docs in one searchable place.", url: "https://devdocs.io", icon: "📖" },
          { name: "Can I Use", desc: "Browser support tables for web.", url: "https://caniuse.com", icon: "✅" },
          { name: "Explainshell", desc: "Paste any bash command, get explanation.", url: "https://explainshell.com", icon: "🐚" },
        ]
      },
      {
        section: "🎁 Free Assets",
        links: [
          { name: "Unsplash", desc: "Free high-res photos. No attribution.", url: "https://unsplash.com", icon: "📸" },
          { name: "Fontshare", desc: "Free quality fonts for commercial use.", url: "https://www.fontshare.com", icon: "🔤" },
          { name: "Iconify", desc: "200k+ icons. One API.", url: "https://iconify.design", icon: "🔴" },
        ]
      }
    ]
  },
  about: {
    id: 'about',
    title: 'About CJ — README.txt',
    icon: '👤',
    width: 340,
    defaultTop: 80,
    defaultLeft: 240,
    isAbout: true,
    socialLinks: [
      { name: "Instagram", desc: "@cplusplusj", url: "https://instagram.com/cplusplusj", icon: "📸" },
      { name: "SoundCloud", desc: "Beats & music", url: "https://soundcloud.com/cetijunior", icon: "🎵" },
    ],
    content: []
  }
};