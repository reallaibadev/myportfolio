import React, { useState, useEffect } from 'react';
import { 
  User, GraduationCap, Phone, Mail, MapPin, MessageSquare, 
  Send, Sun, Moon, CheckCircle2, Play, Info, ArrowRight,
  Sparkles, Award, Cpu, Star
} from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: "Hi there! I am Laiba's virtual AI assistant. Ask me anything about her skills, experience, or how to hire her!" }
  ]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Chess Game State for the interactive demo
  const initialBoard = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
  ];
  const [board, setBoard] = useState(initialBoard);
  const [selectedCell, setSelectedCell] = useState(null);
  const [chessTurn, setChessTurn] = useState('White');
  const [moveHistory, setMoveHistory] = useState([]);

  // Bio and Details from CV
  const personalInfo = {
    name: "Laiba Nadeem",
    title: "Front-End Developer",
    email: "laibanadeem1218my@gmail.com",
    phone: "0321-4158767",
    location: "Ghazi Road, Punjab Society, Lahore, Pakistan",
    about: "Passionate Front-End Developer experienced in designing highly responsive and interactive websites using HTML5, CSS3, Tailwind CSS, Bootstrap, JavaScript, and React.js. Skilled in implementing modern state management, debugging, and leveraging AI-powered tools to optimize workflow and deliver premium user experiences.",
    education: [
      { degree: "FSc (Pre-Medical)", institution: "Govt. College Lahore", duration: "2019 - 2021" },
      { degree: "Matric (Science)", institution: "Private School", duration: "2017 - 2019" }
    ],
    experience: [
      {
        role: "Front-End Developer (Junior)",
        company: "Corvit Systems",
        duration: "6 Months Experience",
        highlights: [
          "Worked as a junior front-end developer designing high-fidelity user interfaces.",
          "Created responsive, mobile-first web designs using HTML5, CSS3, JavaScript, and Bootstrap.",
          "Built interactive, high-performance user interfaces with React.js and managed dynamic states using Hooks (useState, useEffect).",
          "Engineered reusable components to streamline rendering and improve codebase modularity.",
          "Debugged complex visual and functional bugs to elevate browser compatibility and application speed.",
          "Collaborated closely with design frameworks to implement precise fluid layout parameters."
        ]
      }
    ],
    skills: [
      { name: "React.js", category: "frontend", level: 90 },
      { name: "JavaScript", category: "frontend", level: 85 },
      { name: "HTML5 / CSS3", category: "frontend", level: 95 },
      { name: "Tailwind CSS", category: "design", level: 90 },
      { name: "Bootstrap", category: "design", level: 95 },
      { name: "DOM Manipulation", category: "frontend", level: 85 },
      { name: "Git & GitHub", category: "tools", level: 80 },
      { name: "Responsive Web Design", category: "design", level: 95 },
      { name: "Debugging & QA", category: "tools", level: 85 },
      { name: "AI Web Tools Integration", category: "tools", level: 88 },
      { name: "UI/UX Foundations", category: "design", level: 80 }
    ]
  };

  // AI bot answers database
  const getBotResponse = (input) => {
    const text = input.toLowerCase();
    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
      return "Hello! Hope you are having a wonderful day. I can share details about Laiba's technical projects, experience at Corvit, or contact details. What would you like to know?";
    }
    if (text.includes('skills') || text.includes('tech') || text.includes('languages') || text.includes('code')) {
      return "Laiba is highly proficient in React.js, JavaScript, Tailwind CSS, Bootstrap, and HTML5/CSS3. She also incorporates AI-powered design tools to accelerate development speed and clean layout structures.";
    }
    if (text.includes('experience') || text.includes('work') || text.includes('corvit') || text.includes('job')) {
      return "Laiba completed 6 months of hands-on experience as a Junior Front-End Developer at Corvit Systems, where she worked extensively on dynamic React.js state mechanisms and cross-device interface rendering.";
    }
    if (text.includes('project') || text.includes('chess') || text.includes('game')) {
      return "Her marquee project is an interactive Chess Game built in React.js. You can actually play a live version of it right here on this portfolio website just below!";
    }
    if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('hire')) {
      return `You can reach Laiba directly via email at ${personalInfo.email} or call her at ${personalInfo.phone}. She is currently open to front-end and React roles!`;
    }
    if (text.includes('education') || text.includes('degree') || text.includes('college')) {
      return "Laiba completed her FSc (Pre-Medical) at Govt. College Lahore and matriculated with a Science background, building a strong analytical foundation for software engineering.";
    }
    return "That's an interesting question! Laiba is passionate about building solid responsive designs, writing reusable React blocks, and collaborating on production teams. Feel free to contact her directly via the form below!";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = { sender: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');

    setTimeout(() => {
      const botReply = { sender: 'bot', text: getBotResponse(chatInput) };
      setChatMessages(prev => [...prev, botReply]);
    }, 700);
  };

  // Playable interactive chess logic (free-form movement with state mapping)
  const handleCellClick = (row, col) => {
    if (selectedCell) {
      // Execute a move
      const [selRow, selCol] = selectedCell;
      const piece = board[selRow][selCol];
      
      if (selRow === row && selCol === col) {
        // Deselect if clicking the same square
        setSelectedCell(null);
        return;
      }

      // Perform move
      const newBoard = board.map(r => [...r]);
      newBoard[row][col] = piece;
      newBoard[selRow][selCol] = '';
      setBoard(newBoard);

      // Record Move History
      const colLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
      const rowLabels = ['8', '7', '6', '5', '4', '3', '2', '1'];
      const moveStr = `${piece} ${colLabels[selCol]}${rowLabels[selRow]} → ${colLabels[col]}${rowLabels[row]}`;
      setMoveHistory(prev => [moveStr, ...prev.slice(0, 9)]);

      setChessTurn(chessTurn === 'White' ? 'Black' : 'White');
      setSelectedCell(null);
    } else {
      // Select piece if not empty
      if (board[row][col] !== '') {
        setSelectedCell([row, col]);
      }
    }
  };

  const resetChessGame = () => {
    setBoard(initialBoard);
    setSelectedCell(null);
    setChessTurn('White');
    setMoveHistory([]);
  };

  const filteredSkills = activeTab === 'all' 
    ? personalInfo.skills 
    : personalInfo.skills.filter(s => s.category === activeTab);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Premium Header / Navigation */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-slate-200'} transition-all`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-extrabold tracking-wider text-xl shadow-lg">
              LN
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block">Laiba Nadeem</span>
              <span className="text-xs text-sky-500 font-medium block -mt-1">Web Developer Portfolio</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-sky-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-sky-500 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-sky-500 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-sky-500 transition-colors">Projects</a>
            <a href="#bot" className="hover:text-sky-500 transition-colors">AI Assistant</a>
            <a href="#contact" className="hover:text-sky-500 transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className={`p-2 rounded-xl border ${darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-amber-400' : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'} transition-all`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a 
              href="#contact" 
              className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-medium text-sm py-2 px-4 rounded-xl shadow-md transition-all flex items-center gap-1"
            >
              Hire Me <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 px-4 sm:px-6">
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Sparkles size={12} /> Available for Remote & On-Site Roles
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Hi, I'm <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">{personalInfo.name}</span>
            </h1>
            <p className="text-2xl font-bold text-slate-400">
              Expert Front-End Developer
            </p>
            <p className={`text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'} max-w-xl mx-auto lg:mx-0`}>
              Specializing in building flawless custom React.js platforms, smooth CSS designs, responsive layouts, and incorporating intuitive state control architectures.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 pt-2">
              <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'} text-center`}>
                <span className="text-2xl font-black text-sky-500 block">6+</span>
                <span className="text-xs text-slate-400 uppercase font-bold">Months Experience</span>
              </div>
              <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'} text-center`}>
                <span className="text-2xl font-black text-indigo-500 block">10+</span>
                <span className="text-xs text-slate-400 uppercase font-bold">Skills Mastered</span>
              </div>
              <div className={`p-3 rounded-2xl border ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'} text-center`}>
                <span className="text-2xl font-black text-purple-500 block">100%</span>
                <span className="text-xs text-slate-400 uppercase font-bold">Responsive Layout</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a 
                href="#projects" 
                className="bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-lg transition-all text-center flex items-center justify-center gap-2"
              >
                <Play size={16} /> View Playable Chess Project
              </a>
              <a 
                href="#bot" 
                className={`py-3 px-6 rounded-2xl font-semibold border text-center transition-all flex items-center justify-center gap-2 ${darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-slate-700' : 'bg-white border-slate-300 hover:bg-slate-100'}`}
              >
                <MessageSquare size={16} /> Chat with Laiba-Bot
              </a>
            </div>
          </div>

          {/* Interactive Info Card */}
          <div className="lg:col-span-5">
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all ${darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="absolute top-0 right-0 h-24 w-24 bg-sky-500/10 rounded-bl-full pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-md">
                  LN
                </div>
                <div>
                  <h3 className="font-bold text-lg">{personalInfo.name}</h3>
                  <p className="text-xs text-sky-400 font-medium">{personalInfo.title}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                    <Mail size={16} />
                  </div>
                  <div className="truncate">
                    <span className="text-xs text-slate-400 block">Email Address</span>
                    <a href={`mailto:${personalInfo.email}`} className="text-sm font-semibold hover:underline truncate block">{personalInfo.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <Phone size={16} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Phone Connection</span>
                    <span className="text-sm font-semibold">{personalInfo.phone}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Location</span>
                    <span className="text-sm font-semibold">{personalInfo.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1"><Award size={12} className="text-yellow-500" /> Corvit Verified</span>
                <span>Active React developer</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-20 px-4 sm:px-6 border-t ${darkMode ? 'bg-slate-900/40 border-slate-900' : 'bg-slate-100 border-slate-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl font-black tracking-tight">About Me</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full mx-auto"></div>
            <p className="text-slate-400 pt-2 text-sm sm:text-base">Get to know Laiba's background, journey, and technical goals.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
            <div className={`md:col-span-7 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400">
                  <User size={12} /> Professional Summary
                </div>
                <h3 className="text-2xl font-bold">Front-End Engineer & UI Builder</h3>
                <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  {personalInfo.about}
                </p>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  I design user journeys that are highly responsive. Driven by clean, semantic structures, I specialize in crafting UI components in React that look beautiful and work correctly across all device screens.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800">
                <div>
                  <h4 className="font-bold text-sky-400 text-sm">Design Focus</h4>
                  <p className="text-xs text-slate-400 mt-1">Responsive layouts, elegant animations, clean layouts.</p>
                </div>
                <div>
                  <h4 className="font-bold text-indigo-400 text-sm">Technical Philosophy</h4>
                  <p className="text-xs text-slate-400 mt-1">Modular reusable code, fast rendering, state safety.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col gap-6">
              {/* Education section */}
              <div className={`p-6 rounded-3xl border flex-1 ${darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center gap-2 mb-6">
                  <GraduationCap className="text-sky-400" size={20} />
                  <h3 className="font-black text-lg">Education History</h3>
                </div>

                <div className="space-y-6">
                  {personalInfo.education.map((edu, idx) => (
                    <div key={idx} className="relative pl-5 border-l-2 border-sky-500/30 last:border-0 pb-1">
                      <div className="absolute left-[-5px] top-1 h-2 w-2 rounded-full bg-sky-500"></div>
                      <span className="text-xs font-semibold text-sky-500 block">{edu.duration}</span>
                      <h4 className="font-bold text-sm sm:text-base">{edu.degree}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl font-black tracking-tight">Core Competencies</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full mx-auto"></div>
            <p className="text-slate-400 pt-2 text-sm sm:text-base">Filterable skills categorizing Laiba's technical competencies.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['all', 'frontend', 'design', 'tools'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all ${
                  activeTab === tab 
                    ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-indigo-500/20' 
                    : darkMode 
                      ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white' 
                      : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {tab === 'all' ? 'All Skills' : tab}
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <div 
                key={index} 
                className={`p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                  darkMode 
                    ? 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700' 
                    : 'bg-white border-slate-200 hover:shadow-lg'
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600"></div>
                    <span className="font-bold text-sm sm:text-base">{skill.name}</span>
                  </div>
                  <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">{skill.level}%</span>
                </div>
                {/* Custom Progress Bar */}
                <div className={`h-2 w-full rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-150'}`}>
                  <div 
                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className={`py-20 px-4 sm:px-6 border-t ${darkMode ? 'bg-slate-900/40 border-slate-900' : 'bg-slate-100 border-slate-200'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl font-black tracking-tight">Work Experience</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full mx-auto"></div>
            <p className="text-slate-400 pt-2 text-sm sm:text-base">Laiba's industrial experience designing active interfaces.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {personalInfo.experience.map((exp, index) => (
              <div 
                key={index} 
                className={`p-6 sm:p-8 rounded-3xl border transition-all ${
                  darkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-md'
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white text-xl font-black shadow-md">
                      C
                    </div>
                    <div>
                      <h3 className="font-black text-lg sm:text-xl">{exp.role}</h3>
                      <p className="text-sm font-semibold text-indigo-400">{exp.company}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end">
                    <span className="text-xs font-bold text-sky-500 bg-sky-500/10 px-3 py-1 rounded-full">{exp.duration}</span>
                    <span className="text-xs text-slate-400 mt-1">Lahore, Pakistan</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-400 uppercase tracking-wider">Key Accomplishments & Scope:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {exp.highlights.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-sm">
                        <CheckCircle2 size={16} className="text-sky-500 shrink-0 mt-0.5" />
                        <span className={darkMode ? 'text-slate-300' : 'text-slate-600'}>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Featuring Live Playable Chess! */}
      <section id="projects" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl font-black tracking-tight">Technical Projects</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full mx-auto"></div>
            <p className="text-slate-400 pt-2 text-sm sm:text-base">Showcasing Laiba's interactive Chess Game project, built in React.</p>
          </div>

          {/* Project Box Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Project description card */}
            <div className="lg:col-span-4 space-y-6">
              <div className={`p-6 sm:p-8 rounded-3xl border ${darkMode ? 'bg-slate-900/70 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 mb-4">
                  <Star size={12} /> Marquee Project
                </div>
                <h3 className="text-2xl font-black">Chess Game — React.js</h3>
                <p className={`text-sm leading-relaxed mt-3 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  A highly functional, custom-rendered 8x8 Chessboard interface utilizing strict state management. Designed to demonstrate responsive cell tracking, custom action handlers, and interactive React DOM rendering logic.
                </p>

                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">Tech Stack Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['React.js', 'React Hooks', 'JavaScript', 'Tailwind Grid', 'State Architecture'].map((tech) => (
                      <span key={tech} className="text-xs bg-sky-500/10 text-sky-400 px-2.5 py-1 rounded-lg font-semibold">{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 p-4 rounded-2xl bg-slate-950 text-slate-400 text-xs border border-slate-800">
                  <div className="flex gap-2 items-start">
                    <Info size={16} className="text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-300 block mb-1">Interactive Demo Guide:</span>
                      1. Click any white piece (e.g. pawn ♙ on row 2).<br />
                      2. Click an empty square or target cell to move it!<br />
                      3. Watch the turn change and tracking list.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chess Game Interactive Sandbox */}
            <div className="lg:col-span-8">
              <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200'}`}>
                
                {/* Chess Header panel */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h4 className="font-black text-lg flex items-center gap-1.5">
                      <Cpu size={18} className="text-sky-400 animate-pulse" /> Playable React Chess SandBox
                    </h4>
                    <p className="text-xs text-slate-400">Play or test piece alignments live in this browser sandbox!</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-400">
                      Turn: <span className={`px-2 py-1 rounded-md text-xs font-black ${chessTurn === 'White' ? 'bg-white text-slate-950' : 'bg-slate-950 text-white border border-slate-800'}`}>{chessTurn}</span>
                    </span>
                    <button 
                      onClick={resetChessGame} 
                      className="text-xs font-bold px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-all"
                    >
                      Reset Game
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* The actual 8x8 Board grid */}
                  <div className="md:col-span-8 flex justify-center">
                    <div className="border-4 border-slate-950 rounded-xl overflow-hidden shadow-2xl max-w-full aspect-square w-80 sm:w-96">
                      {board.map((row, rIdx) => (
                        <div key={rIdx} className="flex h-[12.5%]">
                          {row.map((piece, cIdx) => {
                            const isDark = (rIdx + cIdx) % 2 === 1;
                            const isSelected = selectedCell && selectedCell[0] === rIdx && selectedCell[1] === cIdx;
                            return (
                              <button
                                key={cIdx}
                                onClick={() => handleCellClick(rIdx, cIdx)}
                                className={`w-[12.5%] aspect-square flex items-center justify-center text-xl sm:text-2xl font-semibold transition-all select-none relative focus:outline-none ${
                                  isSelected 
                                    ? 'bg-yellow-500/50 scale-95 z-10' 
                                    : isDark 
                                      ? 'bg-slate-800 text-slate-100 hover:bg-slate-700' 
                                      : 'bg-slate-350 text-slate-900 hover:bg-slate-200'
                                }`}
                              >
                                {piece}
                              </button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Moves list tracking */}
                  <div className="md:col-span-4 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Move History ({moveHistory.length}):</span>
                      <div className={`p-4 rounded-2xl h-56 overflow-y-auto space-y-2 text-xs font-mono border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                        {moveHistory.length === 0 ? (
                          <span className="text-slate-500 italic block text-center pt-20">No moves made yet.</span>
                        ) : (
                          moveHistory.map((m, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-slate-300 bg-slate-900/50 p-1.5 rounded-lg border border-slate-800/40">
                              <span className="text-sky-500 font-bold">#{moveHistory.length - idx}</span>
                              <span>{m}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800/50 mt-4 text-[11px] text-slate-500 text-center flex items-center justify-center gap-1">
                      <CheckCircle2 size={12} className="text-green-500" /> Interactive state mechanism fully active.
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* AI Assistant Chatbot - Highlighting AI powered tools skill */}
      <section id="bot" className={`py-20 px-4 sm:px-6 border-t ${darkMode ? 'bg-slate-900/40 border-slate-900' : 'bg-slate-100 border-slate-200'}`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl font-black tracking-tight flex items-center justify-center gap-2">
              <Cpu className="text-sky-400" /> Laiba's Assistant Twin
            </h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full mx-auto"></div>
            <p className="text-slate-400 pt-2 text-sm sm:text-base">Ask Laiba's chatbot direct questions about her career goals, stack, and availability.</p>
          </div>

          <div className={`rounded-3xl border shadow-xl overflow-hidden ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
            {/* Bot Header */}
            <div className="bg-gradient-to-r from-sky-500/10 to-indigo-600/10 px-6 py-4 border-b border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-white text-lg font-black shadow-md">
                  🤖
                </div>
                <div>
                  <h4 className="font-bold text-sm">Laiba-Bot v1.0</h4>
                  <p className="text-[10px] text-sky-400 font-medium">Online & Ready to answer queries</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold text-[10px]">AI Powered</span>
            </div>

            {/* Chat Messages */}
            <div className="p-6 h-80 overflow-y-auto space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-sky-600 text-white rounded-tr-none' 
                      : darkMode 
                        ? 'bg-slate-900 text-slate-200 rounded-tl-none border border-slate-800' 
                        : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Bot Quick Buttons */}
            <div className="px-6 pb-2 pt-1 flex flex-wrap gap-2">
              {[
                "Tell me about her skills",
                "What's her experience?",
                "How to contact or hire her?",
                "Tell me about the Chess project"
              ].map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setChatInput(pill);
                  }}
                  className={`text-[10px] sm:text-xs font-semibold px-2.5 py-1.5 rounded-xl border transition-all ${
                    darkMode 
                      ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white' 
                      : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me about skills, experience, projects..."
                className={`flex-1 px-4 py-2.5 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                  darkMode 
                    ? 'bg-slate-900 border border-slate-800 text-slate-100 focus:ring-sky-500' 
                    : 'bg-slate-100 border border-slate-300 text-slate-800 focus:ring-sky-500'
                }`}
              />
              <button 
                type="submit" 
                className="bg-sky-500 hover:bg-sky-600 text-white p-2.5 rounded-2xl transition-all shadow-md flex items-center justify-center shrink-0"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="text-3xl font-black tracking-tight">Get In Touch</h2>
            <div className="h-1.5 w-16 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full mx-auto"></div>
            <p className="text-slate-400 pt-2 text-sm sm:text-base">Let's talk! Send a message or query directly to Laiba.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Informational Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div className="space-y-6">
                <h3 className="text-2xl font-black">Hire Laiba Nadeem</h3>
                <p className={`text-sm sm:text-base leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Currently looking for full-time Front-End Developer, React Developer, or contract roles in Pakistan, or remote roles globally. Reach out to collaborate on premium website builds.
                </p>

                <div className="space-y-4 pt-4">
                  <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="h-10 w-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Write an Email</span>
                      <a href={`mailto:${personalInfo.email}`} className="text-sm font-bold hover:underline block truncate">{personalInfo.email}</a>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Call Connection</span>
                      <span className="text-sm font-bold block">{personalInfo.phone}</span>
                    </div>
                  </div>

                  <div className={`p-4 rounded-2xl border flex items-center gap-4 ${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="h-10 w-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Location</span>
                      <span className="text-sm font-bold block">{personalInfo.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-8 flex items-center gap-3">
                <a 
                  href={`mailto:${personalInfo.email}`} 
                  className={`p-3 rounded-2xl border text-slate-400 hover:text-sky-500 transition-all ${darkMode ? 'bg-slate-900 border-slate-800 hover:bg-slate-800' : 'bg-slate-100 border-slate-200'}`}
                  aria-label="Email direct"
                >
                  <Mail size={20} />
                </a>
                <span className="text-xs text-slate-500">Fast response rate expected within 24 hours.</span>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${darkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                {formSubmitted ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="h-16 w-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto text-3xl">
                      ✓
                    </div>
                    <h4 className="text-xl font-bold">Message Sent Successfully!</h4>
                    <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                      Thank you for contacting Laiba. Your inquiry has been logged, and we will get back to you immediately!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Your Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Laiba Nadeem"
                          className={`w-full px-4 py-3 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                            darkMode 
                              ? 'bg-slate-950 border border-slate-800 text-slate-100 focus:ring-sky-500' 
                              : 'bg-slate-100 border border-slate-300 text-slate-800 focus:ring-sky-500'
                          }`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Your Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="hiring@company.com"
                          className={`w-full px-4 py-3 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                            darkMode 
                              ? 'bg-slate-950 border border-slate-800 text-slate-100 focus:ring-sky-500' 
                              : 'bg-slate-100 border border-slate-300 text-slate-800 focus:ring-sky-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Your Message</label>
                      <textarea
                        required
                        rows="5"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Hi Laiba, we loved your interactive chess game portfolio! We'd like to discuss an opportunity..."
                        className={`w-full px-4 py-3 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-1 ${
                          darkMode 
                            ? 'bg-slate-950 border border-slate-800 text-slate-100 focus:ring-sky-500' 
                            : 'bg-slate-100 border border-slate-300 text-slate-800 focus:ring-sky-500'
                        }`}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-semibold py-3.5 px-6 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Send size={16} /> Send Message to Laiba
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className={`py-12 border-t ${darkMode ? 'bg-slate-950 border-slate-900 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-extrabold text-slate-200 text-sm">Laiba Nadeem</h4>
            <p className="text-xs text-slate-500 mt-1">Front-End & UI/UX Specialist Portfolio.</p>
          </div>

          <div className="flex gap-6 text-xs font-semibold">
            <a href="#about" className="hover:text-sky-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-sky-500 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-sky-500 transition-colors">Chess Project</a>
            <a href="#contact" className="hover:text-sky-500 transition-colors">Contact</a>
          </div>

          <div className="text-xs text-slate-500 text-center md:text-right">
            &copy; {new Date().getFullYear()} Laiba Nadeem. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}