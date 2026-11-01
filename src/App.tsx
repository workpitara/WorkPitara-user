import React, { useState } from 'react';
import {
  Play,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ExternalLink,
  Laptop,
  BookOpen,
  Headphones,
  Database,
  FileText,
  FileSpreadsheet,
  SpellCheck,
  Mail,
  MessageSquare,
  Keyboard,
  ShieldAlert,
  AlertTriangle,
  X,
  Phone,
  Clock,
  MapPin,
  TrendingUp,
  Award,
  Sparkles,
  Menu,
  Check,
  RotateCw,
  Search,
  ChevronRight
} from 'lucide-react';

const SHEET_ID = '1G1Gi9YJjbQ8CNWPS_O_nqRRSdX-AtbD980K8tj6-ahg';
const OFFICIAL_EMAIL = 'workpitaraofficial@gmail.com';
const PORTAL_URL = 'https://naukri-pitara-tasks.base44.app';
const SOURCE_TAG = 'User Site';

export default function App() {
  // Mobile drawer state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals state
  const [portalModalOpen, setPortalModalOpen] = useState(false);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [categoryModal, setCategoryModal] = useState<{ title: string; desc: string } | null>(null);
  const [lightboxModal, setLightboxModal] = useState<{ title: string; desc: string; img: string } | null>(null);
  const [blogModalId, setBlogModalId] = useState<number | null>(null);
  const [legalModalType, setLegalModalType] = useState<string | null>(null);

  // Auth Tab: 'register' | 'login'
  const [authTab, setAuthTab] = useState<'register' | 'login'>('register');

  // Interactive Demo Sandbox
  const [demoType, setDemoType] = useState<'data' | 'captcha'>('data');
  const [demoInputName, setDemoInputName] = useState('');
  const [demoInputCode, setDemoInputCode] = useState('');
  const [demoDataResult, setDemoDataResult] = useState<string | null>(null);
  const [demoCaptchaInput, setDemoCaptchaInput] = useState('');
  const [demoCaptchaResult, setDemoCaptchaResult] = useState<string | null>(null);

  // Form states
  const [selectedPlan, setSelectedPlan] = useState('Standard Portal Access');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Registration form fields
  const [regForm, setRegForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    qualification: '',
    plan: 'User Site Demo'
  });

  // Apply modal form fields
  const [applyForm, setApplyForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    state: '',
    qualification: '',
    plan: 'Standard Work Access'
  });

  // Portal login form
  const [loginForm, setLoginForm] = useState({
    userId: '',
    password: ''
  });

  // Data submission handler to Google Sheet
  const submitToSheet = async (record: {
    fullName: string;
    mobile: string;
    email: string;
    city: string;
    state: string;
    qualification: string;
    plan: string;
  }) => {
    setIsSubmitting(true);
    const dateFormatted = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const payload = {
      sheetId: SHEET_ID,
      date: dateFormatted,
      fullName: record.fullName,
      mobile: record.mobile,
      email: record.email,
      qualification: record.qualification,
      city: record.city,
      state: record.state,
      plan: record.plan,
      source: SOURCE_TAG, // Always "User Site"
      notificationEmail: OFFICIAL_EMAIL
    };

    // Store in localStorage backup
    try {
      const stored = JSON.parse(localStorage.getItem('workpitara_user_leads') || '[]');
      stored.push({ ...payload, timestamp: new Date().toISOString() });
      localStorage.setItem('workpitara_user_leads', JSON.stringify(stored));
    } catch {
      // ignore storage error
    }

    // Send via doPost webhook
    try {
      const formData = new URLSearchParams();
      Object.entries(payload).forEach(([k, v]) => formData.append(k, String(v)));

      await fetch(`https://script.google.com/macros/s/AKfycby-workpitara/exec`, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      }).catch(() => {});
    } catch {
      // network fallback
    }

    setIsSubmitting(false);
    setSuccessModalOpen(true);
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitToSheet(regForm);
    setRegForm({
      fullName: '',
      mobile: '',
      email: '',
      city: '',
      state: '',
      qualification: '',
      plan: 'User Site Demo'
    });
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitToSheet(applyForm);
    setApplyModalOpen(false);
    setApplyForm({
      fullName: '',
      mobile: '',
      email: '',
      city: '',
      state: '',
      qualification: '',
      plan: 'Standard Work Access'
    });
  };

  // Portal Login Handler: Must NOT send to sheet; redirects to Base44 Portal
  const handlePortalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(PORTAL_URL, '_blank', 'noopener,noreferrer');
  };

  const verifyDemoData = () => {
    if (demoInputName.trim().toLowerCase() === 'amit verma' && demoInputCode.trim().toUpperCase() === 'WP-8821') {
      setDemoDataResult('success');
    } else {
      setDemoDataResult('error');
    }
  };

  const verifyDemoCaptcha = () => {
    const val = demoCaptchaInput.trim().toUpperCase();
    if (val === 'W7K9-P2' || val === 'W7K9P2') {
      setDemoCaptchaResult('success');
    } else {
      setDemoCaptchaResult('error');
    }
  };

  const openApplyForCategory = (catName: string) => {
    setApplyForm(prev => ({ ...prev, plan: catName }));
    setApplyModalOpen(true);
    if (categoryModal) setCategoryModal(null);
  };

  // 4 Specific Blog Articles
  const blogArticles: Record<number, { tag: string; title: string; readTime: string; content: React.ReactNode }> = {
    1: {
      tag: 'Fraud Awareness & Security',
      title: 'WhatsApp and Telegram par Data Entry Jobs ke Naam Par ₹3,000 Security Deposit Maang Rahe Hain? Bilkul Mat Dena!',
      readTime: '5 min read',
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <div className="p-3.5 bg-rose-50 border-l-4 border-rose-500 rounded-r-lg text-rose-900 text-xs font-medium">
            <strong>Zaruri Chetawni:</strong> Genuine task companies ya data transcription platforms kabhi bhi personal bank account ya UPI par &quot;refundable security deposit&quot; ke naam par paise nahi maangte.
          </div>
          <h4 className="text-base font-bold text-[#0F2A4A]">1. Telegram & WhatsApp par Scam Kaise Hota Hai?</h4>
          <p>Aam taur par aapko ek message aata hai jisme likha hota hai: <em>&quot;Earn ₹1,500 daily typing 10 pages, no experience needed.&quot;</em> Jab aap unhe contact karte hain, toh wo aapse ₹2,000 se ₹3,000 tak ki security fee maangte hain, yeh kehkar ki yeh pehle payout ke saath wapas mil jayegi.</p>
          <h4 className="text-base font-bold text-[#0F2A4A]">2. Paise Dene Ke Baad Kya Hota Hai?</h4>
          <p>Paise transfer karte hi wo fake agreements bhejte hain jisme aisi terms hoti hain jo insaan kabhi poori nahi kar sakta (jaise 99.9% accuracy bina ek bhi space error ke). Phir wo aapki file ko reject bata kar legal notice ki dhamki dete hain.</p>
          <h4 className="text-base font-bold text-[#0F2A4A]">3. WorkPitara Ka Transparent Approach:</h4>
          <p>WorkPitara par koi fake salary promises ya security deposit traps nahi hain. Hum ek structured task platform provide karte hain jahan aap pehle bina kisi obligation ke Demo Task try kar sakte hain aur actual SOPs samajh sakte hain.</p>
          <h4 className="text-base font-bold text-[#0F2A4A]">4. 3 Golden Rules For Online Work Safety:</h4>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li>Kabhi bhi kisi unknown QR code ya UPI ID par payment na karein.</li>
            <li>Fake company IDs ya edited certificates se savdhan rahein.</li>
            <li>Hamesha official helpdesk email (workpitaraofficial@gmail.com) par verify karein.</li>
          </ul>
        </div>
      )
    },
    2: {
      tag: 'Platform Verification',
      title: 'WorkPitara Real or Fake? An Honest Inside Look at Our Registration & Task Verification System',
      readTime: '6 min read',
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>Online work dhundte waqt sabse pehla sawal yahi hota hai: <strong>Kya WorkPitara authentic platform hai?</strong> Hum yahan har cheez 100% transparent tareeqe se samne rakh rahe hain.</p>
          <h4 className="text-base font-bold text-[#0F2A4A]">1. WorkPitara Kya Hai Aur Kya Nahi Hai:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-emerald-900">
              <strong>Kya Hai:</strong> Ek digital task platform jahan structured task modules, category guidelines aur dashboard support milta hai.
            </div>
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg text-rose-900">
              <strong>Kya Nahi Hai:</strong> Yeh koi traditional fixed monthly salary employment ya government job nahi hai.
            </div>
          </div>
          <h4 className="text-base font-bold text-[#0F2A4A]">2. Task Verification Mechanism:</h4>
          <p>Jab aap dashboard par koi task submit karte hain, toh system uski standard parameters par audit karta hai:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li><strong>Alphanumeric Accuracy:</strong> Kya digits aur letters source document se match karte hain?</li>
            <li><strong>Formatting Checklist:</strong> Kya heading levels aur punctuation standard guidelines ke mutabiq hain?</li>
            <li><strong>Timely Submission:</strong> Kya batch deadline ke andar upload hua hai?</li>
          </ul>
          <h4 className="text-base font-bold text-[#0F2A4A]">3. No Fake Claims:</h4>
          <p>Hum kisi bhi tarah ke fake registration count ya nakli payment screenshots publish nahi karte. Har record verified review cycle ke baad hi maintain hota hai.</p>
        </div>
      )
    },
    3: {
      tag: 'Productivity & Work-Life Balance',
      title: 'Housewives Ke Liye Work From Home: Ghar Ke Kaam Ke Saath Daily 2-3 Ghante Kaise Manage Karein?',
      readTime: '4 min read',
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>Ghar ke kaam, bacchon ki school schedule aur parivar ki dekhbhal ke saath apne liye thoda samay nikal kar productive tasks karna bilkul sambhav hai agar sahi time management technique apnayi jaye.</p>
          <h4 className="text-base font-bold text-[#0F2A4A]">1. Golden Time Windows:</h4>
          <p>Daily routines mein 2 natural focus windows hoti hain:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li><strong>Afternoon Window (1:30 PM - 3:30 PM):</strong> Jab bache aam taur par aaram kar rahe hote hain ya study time hota hai.</li>
            <li><strong>Evening Window (8:00 PM - 9:00 PM):</strong> Dinner se pehle ya baad ka shaant samay.</li>
          </ul>
          <h4 className="text-base font-bold text-[#0F2A4A]">2. Sahi Task Category Ka Chunav:</h4>
          <p>Shuruaati dor mein heavy transcription lene ke bajaye simple modules select karein jaise Form Filling, Typing Tasks ya Captcha Modules jinhe beech mein pause kiya ja sakta hai.</p>
          <h4 className="text-base font-bold text-[#0F2A4A]">3. Basic Workspace Setup:</h4>
          <p>Ek comfortable table chair aur clean lighting rakhein. Demo mode me 2-3 din practice karke speed check karein taaki dashboard tools aasaani se samajh aa sakein.</p>
        </div>
      )
    },
    4: {
      tag: 'Accounting & Withdrawals',
      title: 'How to Withdraw Your Earnings on WorkPitara: Step-by-Step UPI and Direct Bank Transfer Process',
      readTime: '5 min read',
      content: (
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>WorkPitara portal par task quality clearance hone ke baad balance kaise withdraw hota hai, iska authentic step-by-step procedure:</p>
          <h4 className="text-base font-bold text-[#0F2A4A]">1. Task Quality Clearance:</h4>
          <p>Aapke submit kiye gaye tasks ka automated and manual validation complete hone par approved amount dashboard ledger mein show hota hai.</p>
          <h4 className="text-base font-bold text-[#0F2A4A]">2. Supported Payout Methods:</h4>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li><strong>UPI Transfer:</strong> Google Pay, PhonePe, Paytm ya BHIM se linked UPI ID (e.g., mobilenumber@upi).</li>
            <li><strong>Direct Bank NEFT/IMPS:</strong> Account number, IFSC code aur Account Holder Name.</li>
          </ul>
          <h4 className="text-base font-bold text-[#0F2A4A]">3. Security Verification Rule:</h4>
          <p>Pehli baar payment details link karte waqt document par registered name aur bank account name match hona zaruri hai. Third-party accounts mein transfer strictly disallowed hai.</p>
          <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-600">
            Kisi bhi withdrawal query ke liye official helpdesk: <strong>workpitaraofficial@gmail.com</strong> par ticket raise karein.
          </div>
        </div>
      )
    }
  };

  // Legal Modal Content
  const legalData: Record<string, { title: string; content: string[] }> = {
    privacy: {
      title: 'Privacy Policy',
      content: [
        'WorkPitara respects user privacy. All personal registration details submitted on this User Site (Full Name, Contact Number, Qualification, City, State) are recorded strictly for identity verification, onboarding coordination, and direct helpdesk support.',
        'We do not sell, rent, or trade your personal information with external marketers. Helpdesk communication is routed solely through our verified official channel: workpitaraofficial@gmail.com.',
        'Portal user credentials generated for the Base44 system remain securely protected within the Base44 database environment.'
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      content: [
        '1. Platform Nature: WorkPitara operates as a digital task coordination and workflow instruction platform. User participation is entirely voluntary and conducted on a per-task basis.',
        '2. Non-Employment Relationship: Participation does not constitute formal employment, permanent staffing, or a guaranteed fixed wage contract.',
        '3. Quality Audits: Task eligibility and subsequent acceptance depend upon meeting standard operating procedures (SOPs), character fidelity, and error tolerances.',
        '4. Proper Conduct: Users must supply genuine credentials and refrain from utilizing unauthorized automated bot scrapers.'
      ]
    },
    disclaimer: {
      title: 'Platform Disclaimer',
      content: [
        'WorkPitara uses a task-based participation model. It is NOT traditional employment. It does NOT promise fixed salary or guaranteed earnings. Results depend on submitted work and quality.',
        'No user should ever provide security deposits, processing sums, or transfer money to unauthorized individuals on social messaging applications claiming to represent WorkPitara.',
        'All official notices and verified updates are issued exclusively from our official domain and registered email.'
      ]
    },
    refund: {
      title: 'Refund Policy',
      content: [
        'WorkPitara provides extensive demo exercises and workflow guides so that every prospective participant can evaluate the tasks prior to registration.',
        'If applicable verification or account setup costs are paid, refund inquiries may be submitted within 48 hours provided tasks or portal workspaces have not been initiated.',
        'For refund evaluations, write to workpitaraofficial@gmail.com with your registered mobile number.'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-[#FF6A00] selection:text-white">
      
      {/* ========================================================= */}
      {/* 1. HEADER (White Header, No Portal Login in Header)      */}
      {/* Actions: ONLY Apply Now & Try Demo Task                   */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-[#0F2A4A] border-2 border-[#FF6A00] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="text-white font-extrabold text-xl font-heading tracking-tight">WP</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black text-[#0F2A4A] tracking-tight font-heading">WorkPitara</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#FF6A00]"></span>
                </div>
                <span className="text-[9.5px] uppercase tracking-widest font-bold text-slate-500">INDIA KA APNA WORK ADDA</span>
              </div>
            </a>

            {/* Center: Menu links — Home, About, Task Categories, Top Earners, Testimonials, Blogs, Apply Now */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-semibold text-slate-600">
              <a href="#home" className="hover:text-[#FF6A00] transition-colors">Home</a>
              <a href="#about" className="hover:text-[#FF6A00] transition-colors">About</a>
              <a href="#categories" className="hover:text-[#FF6A00] transition-colors whitespace-nowrap">Task Categories</a>
              <a href="#earners" className="hover:text-[#FF6A00] transition-colors whitespace-nowrap">Top Earners</a>
              <a href="#testimonials" className="hover:text-[#FF6A00] transition-colors">Testimonials</a>
              <a href="#blogs" className="hover:text-[#FF6A00] transition-colors">Blogs</a>
              <button
                onClick={() => setApplyModalOpen(true)}
                className="hover:text-[#FF6A00] font-bold transition-colors cursor-pointer whitespace-nowrap"
              >
                Apply Now
              </button>
            </nav>

            {/* Right: Try Demo Task button (Orange #FF6A00) and Portal Login button linking to Base44 */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <a
                href="#auth"
                className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#FF6A00] hover:bg-[#E05D00] rounded-lg transition-all shadow-md hover:shadow-orange-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Try Demo Task</span>
              </a>
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#0F2A4A] hover:bg-slate-800 rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>Portal Login</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setApplyModalOpen(true)}
                className="px-3 py-1.5 text-xs font-bold text-[#0F2A4A] border border-slate-300 rounded-md sm:hidden"
              >
                Apply
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-700 hover:text-[#0F2A4A] rounded-lg hover:bg-slate-100 cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 shadow-xl">
            <div className="flex flex-col space-y-3 text-base font-semibold text-slate-700">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:text-[#FF6A00] border-b border-slate-50">Home</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:text-[#FF6A00] border-b border-slate-50">About</a>
              <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:text-[#FF6A00] border-b border-slate-50">Task Categories</a>
              <a href="#earners" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:text-[#FF6A00] border-b border-slate-50">Top Earners</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:text-[#FF6A00] border-b border-slate-50">Testimonials</a>
              <a href="#blogs" onClick={() => setMobileMenuOpen(false)} className="px-2 py-1.5 hover:text-[#FF6A00] border-b border-slate-50">Blogs</a>
              <button
                onClick={() => { setApplyModalOpen(true); setMobileMenuOpen(false); }}
                className="text-left px-2 py-1.5 hover:text-[#FF6A00] border-b border-slate-50 font-bold"
              >
                Apply Now
              </button>
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <a
                href="#auth"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-sm font-bold text-white bg-[#FF6A00] hover:bg-[#E05D00] rounded-lg text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Try Demo Task
              </a>
              <a
                href={PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-sm font-bold text-white bg-[#0F2A4A] hover:bg-slate-800 rounded-lg text-center flex items-center justify-center gap-2 shadow-sm"
              >
                <Lock className="w-3.5 h-3.5 text-[#FF6A00]" /> Portal Login
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================= */}
      {/* 2. HOME / HERO SECTION (Hero Dark Blue #0F2A4A)          */}
      {/* ========================================================= */}
      <section id="home" className="hero-pattern text-white pt-16 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-orange-400 text-xs font-semibold mb-6 backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-[#FF6A00]" />
            <span>Official Digital Task Environment & Helpdesk</span>
          </div>

          {/* Hero Title & Description */}
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight font-heading">
              WorkPitara Online Task Platform
            </h1>
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              WorkPitara provides a structured online task environment with demo access, task categories, clear workflow instructions, dashboard access and support information. Task access depends on eligibility, available work, submitted work, quality review and platform guidelines.
            </p>

            {/* Hero Buttons: Portal Login (Dark Blue), Try Free Demo (Orange), See Platform Overview */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setPortalModalOpen(true)}
                className="px-6 py-3.5 rounded-lg bg-[#0F2A4A] border border-white/20 hover:bg-slate-800 text-white font-bold text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
              >
                <Lock className="w-4 h-4 text-[#FF6A00]" />
                <span>Portal Login</span>
              </button>
              
              <a
                href="#auth"
                className="px-6 py-3.5 rounded-lg bg-[#FF6A00] hover:bg-[#E05D00] text-white font-bold text-sm sm:text-base flex items-center gap-2.5 transition-all shadow-lg hover:shadow-orange-500/25 hover:scale-[1.02] cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Try Free Demo</span>
              </a>

              <a
                href="#categories"
                className="px-5 py-3.5 rounded-lg text-slate-200 hover:text-white border border-white/15 hover:border-white/30 text-sm sm:text-base font-semibold transition-all"
              >
                See Platform Overview &darr;
              </a>
            </div>
          </div>

          {/* Info Boxes: Demo, Training, Support */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:border-[#FF6A00]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-[#FF6A00]/20 text-[#FF6A00] flex items-center justify-center mb-3">
                <Laptop className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Demo Access</h3>
              <p className="text-xs text-slate-300 mt-1">Explore before registration</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:border-[#FF6A00]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Training SOPs</h3>
              <p className="text-xs text-slate-300 mt-1">Simple instructions included</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 backdrop-blur-sm hover:border-[#FF6A00]/50 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-white text-base">Support Desk</h3>
              <p className="text-xs text-slate-300 mt-1">Email helpdesk assistance</p>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-2 text-[#FF6A00] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" /> Platform Standards &amp; Transparency
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>New users can explore demo module before registration.</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Step-by-step task instructions are available inside the portal.</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Dashboard keeps task history, support details and updates organized.</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Helpdesk support is available for onboarding and portal assistance.</span>
              </div>
            </div>
          </div>

          {/* 8 Feature Cards */}
          <div className="mt-16">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-xl sm:text-2xl font-black text-white font-heading">Structured Platform Features</h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5">
                Everything designed for clear digital tasks, verified submissions and organized user records.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <div className="bg-[#1E3A5F]/70 border border-white/10 rounded-xl p-5 hover:border-[#FF6A00] transition-all">
                <div className="w-9 h-9 rounded-lg bg-orange-500/20 text-[#FF6A00] flex items-center justify-center mb-3">
                  <Laptop className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">Task Dashboard</h4>
                <p className="text-xs text-slate-300 mt-1">Clean digital task workspace</p>
              </div>

              <div className="bg-[#1E3A5F]/70 border border-white/10 rounded-xl p-5 hover:border-[#FF6A00] transition-all">
                <div className="w-9 h-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                  <Headphones className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">Support Access</h4>
                <p className="text-xs text-slate-300 mt-1">Helpdesk information included</p>
              </div>

              <div className="bg-[#1E3A5F]/70 border border-white/10 rounded-xl p-5 hover:border-[#FF6A00] transition-all">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Keyboard className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">Manual Typing Flow</h4>
                <p className="text-xs text-slate-300 mt-1">Standard typing format &amp; guidelines</p>
              </div>

              <div className="bg-[#1E3A5F]/70 border border-white/10 rounded-xl p-5 hover:border-[#FF6A00] transition-all">
                <div className="w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">Simple Verification</h4>
                <p className="text-xs text-slate-300 mt-1">Clear step-by-step submission checks</p>
              </div>

              <div className="bg-[#1E3A5F]/70 border border-white/10 rounded-xl p-5 hover:border-[#FF6A00] transition-all">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center mb-3">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">Online Support</h4>
                <p className="text-xs text-slate-300 mt-1">Helpdesk for portal queries</p>
              </div>

              <div className="bg-[#1E3A5F]/70 border border-white/10 rounded-xl p-5 hover:border-[#FF6A00] transition-all">
                <div className="w-9 h-9 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center mb-3">
                  <Database className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">Task Modules</h4>
                <p className="text-xs text-slate-300 mt-1">Category-wise clean flow</p>
              </div>

              <div className="bg-[#1E3A5F]/70 border border-white/10 rounded-xl p-5 hover:border-[#FF6A00] transition-all">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3">
                  <Laptop className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">Online Task Workspace</h4>
                <p className="text-xs text-slate-300 mt-1">Laptop-friendly digital task interface</p>
              </div>

              <div className="bg-[#1E3A5F]/70 border border-white/10 rounded-xl p-5 hover:border-[#FF6A00] transition-all">
                <div className="w-9 h-9 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-white text-sm">Portal Tracking</h4>
                <p className="text-xs text-slate-300 mt-1">Dashboard status updates</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. SERVICES / AVAILABLE CATEGORIES (6+2 Categories)       */}
      {/* ========================================================= */}
      <section id="categories" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF6A00] font-bold text-xs uppercase tracking-wider mb-3">
              <FileSpreadsheet className="w-3.5 h-3.5" /> Standard Operating Modules
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2A4A] font-heading">
              Available Task Categories
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Choose from 6+2 structured category modules designed with clear guidelines, pre-formatted templates, and dedicated accuracy rubrics.
            </p>
          </div>

          {/* 6 + 2 = 8 Categories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Category 1 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0F2A4A] flex items-center justify-center text-xl mb-4 group-hover:bg-[#0F2A4A] group-hover:text-white transition-colors">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-[#0F2A4A]">Structured Data Management</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Organizing, formatting, and standardizing database records into designated digital schemas.
                </p>
              </div>
              <button
                onClick={() => setCategoryModal({
                  title: 'Structured Data Management',
                  desc: 'Organizing raw tabular and database records into structured formats. Tasks involve column alignment, date formatting, and missing value checks. Standard SOP guidelines are provided inside the portal.'
                })}
                className="mt-6 w-full py-2.5 px-3 text-xs font-bold text-[#0F2A4A] bg-slate-100 hover:bg-[#FF6A00] hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category 2 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-[#FF6A00] flex items-center justify-center text-xl mb-4 group-hover:bg-[#FF6A00] group-hover:text-white transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-[#0F2A4A]">Digital Form Management</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Transferring data from source documents directly into digital entry web-forms with accuracy validation.
                </p>
              </div>
              <button
                onClick={() => setCategoryModal({
                  title: 'Digital Form Management',
                  desc: 'Inputting customer, product or invoice information into pre-designed digital form fields. Each form has automated sanity checks to guide manual accuracy before final submission.'
                })}
                className="mt-6 w-full py-2.5 px-3 text-xs font-bold text-[#0F2A4A] bg-slate-100 hover:bg-[#FF6A00] hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category 3 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-[#0F2A4A]">Document Transcription &amp; Formatting</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Converting scanned PDF notes and printed drafts into clean, formatted digital Word/Doc files.
                </p>
              </div>
              <button
                onClick={() => setCategoryModal({
                  title: 'Document Transcription & Formatting',
                  desc: 'Converting clean scanned text or notes into structured typed documents. Following font specifications, heading styles, and paragraph layout guidelines.'
                })}
                className="mt-6 w-full py-2.5 px-3 text-xs font-bold text-[#0F2A4A] bg-slate-100 hover:bg-[#FF6A00] hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category 4 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <SpellCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-[#0F2A4A]">Content Review &amp; Correction</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Reviewing drafted text for basic grammar, spelling errors, punctuation, and structural consistency.
                </p>
              </div>
              <button
                onClick={() => setCategoryModal({
                  title: 'Content Review & Correction',
                  desc: 'Checking draft sentences and product descriptions for typographical errors, repeated words, and correct capitalization following an easy-to-use checklist.'
                })}
                className="mt-6 w-full py-2.5 px-3 text-xs font-bold text-[#0F2A4A] bg-slate-100 hover:bg-[#FF6A00] hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category 5 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center text-xl mb-4 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-[#0F2A4A]">Email Processing &amp; Organization</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Sorting incoming inquiries into respective tag folders and drafting standardized template replies.
                </p>
              </div>
              <button
                onClick={() => setCategoryModal({
                  title: 'Email Processing & Organization',
                  desc: 'Categorizing client emails into predefined queues (Billing, General, Feedback) and matching them with approved response templates.'
                })}
                className="mt-6 w-full py-2.5 px-3 text-xs font-bold text-[#0F2A4A] bg-slate-100 hover:bg-[#FF6A00] hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category 6 */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-[#0F2A4A]">Digital Support &amp; Chat Handling</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Handling web chat queues using scripted knowledge base answers for common platform inquiries.
                </p>
              </div>
              <button
                onClick={() => setCategoryModal({
                  title: 'Digital Support & Chat Handling',
                  desc: 'Responding to user queries using standard FAQs and pre-approved scripts. Requires polite tone, basic typing speed, and portal navigation awareness.'
                })}
                className="mt-6 w-full py-2.5 px-3 text-xs font-bold text-[#0F2A4A] bg-slate-100 hover:bg-[#FF6A00] hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category 7 (Typing Tasks) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-xl mb-4 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                  <Keyboard className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-[#0F2A4A]">Typing Tasks</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Entry-level copy-typing and numeric keypad transcription with word accuracy checks.
                </p>
              </div>
              <button
                onClick={() => setCategoryModal({
                  title: 'Typing Tasks',
                  desc: 'Straightforward text typing from image/text prompts into target text boxes. Suitable for beginners with basic keyboard skills. Accuracy score is verified automatically.'
                })}
                className="mt-6 w-full py-2.5 px-3 text-xs font-bold text-[#0F2A4A] bg-slate-100 hover:bg-[#FF6A00] hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Category 8 (Captcha Filling) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-[#0F2A4A]">Captcha Filling</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Alphanumeric verification image interpretation and high-precision character entry.
                </p>
              </div>
              <button
                onClick={() => setCategoryModal({
                  title: 'Captcha Filling',
                  desc: 'Quick character verification tasks. Enter exact case-sensitive alphanumeric characters from test images into the confirmation box. Great for quick practice sessions.'
                })}
                className="mt-6 w-full py-2.5 px-3 text-xs font-bold text-[#0F2A4A] bg-slate-100 hover:bg-[#FF6A00] hover:text-white rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Process: Simple 4-Step Workflow */}
          <div className="mt-20 bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-xs">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[#FF6A00] font-bold text-xs uppercase tracking-wider">How WorkPitara Operates</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F2A4A] mt-1 font-heading">
                Simple 4-Step Workflow
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col items-start bg-slate-50/80 p-5 rounded-xl border border-slate-100">
                <span className="text-3xl font-black text-[#FF6A00] font-heading">01</span>
                <h4 className="font-bold text-[#0F2A4A] text-base mt-2">Try Demo Task</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Check workflow and understand task format first.
                </p>
              </div>

              <div className="flex flex-col items-start bg-slate-50/80 p-5 rounded-xl border border-slate-100">
                <span className="text-3xl font-black text-[#FF6A00] font-heading">02</span>
                <h4 className="font-bold text-[#0F2A4A] text-base mt-2">Complete Registration</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Submit required details for account creation and dashboard access.
                </p>
              </div>

              <div className="flex flex-col items-start bg-slate-50/80 p-5 rounded-xl border border-slate-100">
                <span className="text-3xl font-black text-[#FF6A00] font-heading">03</span>
                <h4 className="font-bold text-[#0F2A4A] text-base mt-2">View Task Guidelines</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Read category instructions and follow portal workflow.
                </p>
              </div>

              <div className="flex flex-col items-start bg-slate-50/80 p-5 rounded-xl border border-slate-100">
                <span className="text-3xl font-black text-[#FF6A00] font-heading">04</span>
                <h4 className="font-bold text-[#0F2A4A] text-base mt-2">Track Updates</h4>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Review dashboard status, support information and task updates.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. PROJECTS SECTION                                       */}
      {/* ========================================================= */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0F2A4A] font-bold text-xs uppercase tracking-wider mb-3">
                <Laptop className="w-3.5 h-3.5" /> Active Project Queues
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2A4A] font-heading">
                Available Projects
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">
                All tasks have clear standard operating procedures (SOPs) inside the portal. No prior experience required for most categories.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#auth"
                className="px-5 py-2.5 rounded-lg bg-[#FF6A00] hover:bg-[#E05D00] text-white font-bold text-sm transition-all shadow-sm flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Initiate Demo Module</span>
              </a>
              <button
                onClick={() => setPortalModalOpen(true)}
                className="px-5 py-2.5 rounded-lg bg-[#0F2A4A] hover:bg-slate-800 text-white font-bold text-sm transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5 text-[#FF6A00]" />
                <span>Authorized Portal Login</span>
              </button>
            </div>
          </div>

          {/* 7 Project Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Project 1: Form Filling */}
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 hover:bg-white hover:border-[#FF6A00] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 text-[11px] font-extrabold rounded-md bg-orange-100 text-[#FF6A00] uppercase tracking-wide">
                    Most Popular
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Beginner</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F2A4A]">Form Filling</h3>
                <p className="text-xs text-slate-600 mt-2">
                  Structured entry into designated application forms and web questionnaires from sample data cards.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Effort:</span>
                  <span>Easy No Experience</span>
                </div>
              </div>
              <button
                onClick={() => openApplyForCategory('Form Filling')}
                className="mt-6 w-full py-2.5 bg-[#0F2A4A] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Project 2: Data Entry */}
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 hover:bg-white hover:border-[#FF6A00] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 text-[11px] font-extrabold rounded-md bg-blue-100 text-blue-700 uppercase tracking-wide">
                    High Volume
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Beginner</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F2A4A]">Data Entry</h3>
                <p className="text-xs text-slate-600 mt-2">
                  Tabular spreadsheet records compilation, column validation, and numerical transcription.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Effort:</span>
                  <span>Easy Basic Typing</span>
                </div>
              </div>
              <button
                onClick={() => openApplyForCategory('Data Entry')}
                className="mt-6 w-full py-2.5 bg-[#0F2A4A] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Project 3: Email Support */}
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 hover:bg-white hover:border-[#FF6A00] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 text-[11px] font-extrabold rounded-md bg-purple-100 text-purple-700 uppercase tracking-wide">
                    Intermediate
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Medium</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F2A4A]">Email Support</h3>
                <p className="text-xs text-slate-600 mt-2">
                  Template-based draft replies to standard customer inquiries, tracking queue assignments.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Format:</span>
                  <span>Medium Template Based</span>
                </div>
              </div>
              <button
                onClick={() => openApplyForCategory('Email Support')}
                className="mt-6 w-full py-2.5 bg-[#0F2A4A] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Project 4: Chat Support */}
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 hover:bg-white hover:border-[#FF6A00] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 text-[11px] font-extrabold rounded-md bg-amber-100 text-amber-800 uppercase tracking-wide">
                    Intermediate
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Medium</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F2A4A]">Chat Support</h3>
                <p className="text-xs text-slate-600 mt-2">
                  Real-time scripted inquiry responses adhering to professional guidelines and empathy cues.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Skill:</span>
                  <span>Medium Communication</span>
                </div>
              </div>
              <button
                onClick={() => openApplyForCategory('Chat Support')}
                className="mt-6 w-full py-2.5 bg-[#0F2A4A] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Project 5: Grammar Correction */}
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 hover:bg-white hover:border-[#FF6A00] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 text-[11px] font-extrabold rounded-md bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                    Intermediate
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Medium</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F2A4A]">Grammar Correction</h3>
                <p className="text-xs text-slate-600 mt-2">
                  Detecting spelling mistakes, punctuation fixes, and simple syntax polishing in English sentences.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Skill:</span>
                  <span>Medium English Basics</span>
                </div>
              </div>
              <button
                onClick={() => openApplyForCategory('Grammar Correction')}
                className="mt-6 w-full py-2.5 bg-[#0F2A4A] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Project 6: Typing Tasks */}
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 hover:bg-white hover:border-[#FF6A00] transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 text-[11px] font-extrabold rounded-md bg-cyan-100 text-cyan-800 uppercase tracking-wide">
                    Easy Start
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Beginner</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F2A4A]">Typing Tasks</h3>
                <p className="text-xs text-slate-600 mt-2">
                  General paragraph re-typing and document reproduction with direct word-level match criteria.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Effort:</span>
                  <span>Easy Basic Typing</span>
                </div>
              </div>
              <button
                onClick={() => openApplyForCategory('Typing Tasks')}
                className="mt-6 w-full py-2.5 bg-[#0F2A4A] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Project 7: Captcha Filling */}
            <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/50 hover:bg-white hover:border-[#FF6A00] transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 text-[11px] font-extrabold rounded-md bg-indigo-100 text-indigo-800 uppercase tracking-wide">
                    Entry Level
                  </span>
                  <span className="text-xs font-semibold text-slate-500">Beginner</span>
                </div>
                <h3 className="text-lg font-bold text-[#0F2A4A]">Captcha Filling</h3>
                <p className="text-xs text-slate-600 mt-2">
                  Simple distortion image verification, rapid character recognition, and swift submit cycles.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Effort:</span>
                  <span>Easy General Entry</span>
                </div>
              </div>
              <button
                onClick={() => openApplyForCategory('Captcha Filling')}
                className="mt-6 w-full py-2.5 bg-[#0F2A4A] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Proceed</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. ABOUT SECTION                                          */}
      {/* No fake GSTIN, MSME or ISO numbers                        */}
      {/* ========================================================= */}
      <section id="about" className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200 text-[#0F2A4A] font-bold text-xs uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Platform Overview &amp; Transparency
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2A4A] font-heading">
              About WorkPitara
            </h2>
            <p className="mt-3 text-slate-600 text-base leading-relaxed">
              A digital task facilitation platform focused on structured workflows, clear guidelines and user support.
            </p>

            {/* Buttons: View Task Categories, Verification Details */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#categories"
                className="px-5 py-2.5 rounded-lg bg-[#0F2A4A] hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-xs"
              >
                View Task Categories
              </a>
              <a
                href="#verification-desk"
                className="px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-sm font-semibold transition-all"
              >
                Verification Details
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Who We Are */}
            <div className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0F2A4A] flex items-center justify-center text-xl mb-4">
                <Laptop className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F2A4A] font-heading">Who We Are</h3>
              <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                WorkPitara is a digital task facilitation platform that provides structured online tasks, workflow instructions and portal-based support. Task access depends on plan, eligibility, available work and quality.
              </p>
              <div className="mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6A00]" />
                  <span>Centralized practice module</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#FF6A00]" />
                  <span>Dedicated portal dashboard tracking</span>
                </div>
              </div>
            </div>

            {/* Disclaimer (Task-based participation model) */}
            <div className="bg-amber-50/70 rounded-2xl border border-amber-200 p-7 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl mb-4">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-amber-950 font-heading">Transparent Disclaimer</h3>
              <p className="text-amber-900 text-sm mt-3 leading-relaxed">
                WorkPitara uses a task-based participation model. It is <strong>NOT</strong> traditional employment. It does <strong>NOT</strong> promise fixed salary or guaranteed earnings. Results depend on submitted work and quality.
              </p>
              <div className="mt-6 pt-5 border-t border-amber-200/60 text-xs text-amber-800 space-y-1.5 font-medium">
                <p>&bull; No deceptive income guarantees</p>
                <p>&bull; Quality approval governs task qualification</p>
                <p>&bull; Work on your own schedule &amp; capability</p>
              </div>
            </div>

            {/* Official Verification Desk (No fake numbers) */}
            <div id="verification-desk" className="bg-white rounded-2xl border border-slate-200 p-7 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0F2A4A] font-heading">Official Verification Desk</h3>
              <p className="text-xs text-slate-500 mt-1">Verified direct communication channels:</p>

              <div className="mt-5 space-y-3.5 text-sm text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[#FF6A00] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Helpdesk Email</span>
                    <a href="mailto:workpitaraofficial@gmail.com" className="font-bold text-[#0F2A4A] hover:text-[#FF6A00] transition-colors break-all">
                      workpitaraofficial@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">WhatsApp Desk</span>
                    <a href="https://wa.me/918750402917" target="_blank" rel="noopener noreferrer" className="font-bold text-[#0F2A4A] hover:text-[#FF6A00] transition-colors">
                      8750402917
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Country</span>
                    <span className="font-bold text-[#0F2A4A]">India</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">Support Hours</span>
                    <span className="font-bold text-[#0F2A4A]">Mon-Sat 10 AM - 7 PM</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center italic">
                Honest verification. Strictly zero synthetic registration badges.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. EARNERS PAGE / SECTION (Coming Soon)                   */}
      {/* Real payout records will appear here after first members  */}
      {/* complete approved tasks. No fake names or amounts.        */}
      {/* Stats: Recorded payouts - Growing, Listed records - New   */}
      {/* Platform, Payout activity - Daily. Top Earners empty.     */}
      {/* ========================================================= */}
      <section id="earners" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider mb-3">
              <Clock className="w-3.5 h-3.5 text-[#FF6A00]" /> Honest Ledger Policy
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2A4A] font-heading">
              WorkPitara Earners &amp; Payment Records — Coming Soon
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Real payout records will appear here after first members complete approved tasks. No fake names or amounts.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-14">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center shadow-xs">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Recorded Payouts</span>
              <div className="text-3xl font-black text-[#0F2A4A] mt-2 font-heading">Growing</div>
              <p className="text-xs text-slate-500 mt-1">Verified work batches underway</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center shadow-xs">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Listed Records</span>
              <div className="text-3xl font-black text-[#FF6A00] mt-2 font-heading">New Platform</div>
              <p className="text-xs text-slate-500 mt-1">Freshly onboarded portal queue</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center shadow-xs">
              <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">Payout Activity</span>
              <div className="text-3xl font-black text-emerald-600 mt-2 font-heading">Daily</div>
              <p className="text-xs text-slate-500 mt-1">Scheduled accounting cycles</p>
            </div>
          </div>

          {/* Top Earners Section (Empty for future real data) */}
          <div className="max-w-4xl mx-auto bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-10 sm:p-14 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center text-2xl mb-4">
              <Award className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-[#0F2A4A] font-heading">Top Earners Section</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-2 leading-relaxed">
              In strict compliance with our platform ethics, we do not fabricate member rankings. Top earner leaderboards will populate organically once initial work audits and payout distributions are completed.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white px-4 py-2 rounded-full border border-slate-200">
              <Lock className="w-3.5 h-3.5" /> Awaiting Audited Member Disclosures
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. TESTIMONIALS SECTION                                   */}
      {/* ========================================================= */}
      <section id="testimonials" className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF6A00] font-bold text-xs uppercase tracking-wider mb-3">
              <MessageSquare className="w-3.5 h-3.5" /> User Reflections
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2A4A] font-heading">
              User Experiences
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base">
              Feedback shared by WorkPitara users about dashboard clarity, demo workflow and support experience.
            </p>
            <div className="mt-6">
              <a
                href="#auth"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#FF6A00] hover:bg-[#E05D00] text-white font-bold text-sm transition-all shadow-md"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Initiate Free Demo Task</span>
              </a>
            </div>
          </div>

          <div className="space-y-16">
            
            {/* Category 1: Video reviews */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF6A00]"></span>
                  <h3 className="text-lg font-bold text-[#0F2A4A] font-heading">Video Reviews &amp; Walkthroughs</h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">Community feedback format</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
                  <div
                    onClick={() => setLightboxModal({
                      title: 'Demo Workflow Walkthrough',
                      desc: 'Understanding how data entry practice exercises work before signing up.',
                      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop&q=80'
                    })}
                    className="h-44 bg-slate-900 relative flex items-center justify-center group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80')" }}></div>
                    <div className="w-14 h-14 rounded-full bg-[#FF6A00] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                    <span className="absolute bottom-3 right-3 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded font-mono">03:45</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-[#0F2A4A]">Demo Workflow Walkthrough</h4>
                    <p className="text-xs text-slate-500 mt-1">Understanding how data entry practice exercises work before signing up.</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
                  <div
                    onClick={() => setLightboxModal({
                      title: 'Dashboard Navigation & SOPs',
                      desc: 'How category instructions and submission history appear inside the dashboard.',
                      img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=80'
                    })}
                    className="h-44 bg-slate-900 relative flex items-center justify-center group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80')" }}></div>
                    <div className="w-14 h-14 rounded-full bg-[#FF6A00] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                    <span className="absolute bottom-3 right-3 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded font-mono">04:12</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-[#0F2A4A]">Dashboard Navigation &amp; SOPs</h4>
                    <p className="text-xs text-slate-500 mt-1">How category instructions and submission history appear inside the dashboard.</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all">
                  <div
                    onClick={() => setLightboxModal({
                      title: 'Helpdesk Response Experience',
                      desc: 'User experience contacting the official helpdesk for guideline queries.',
                      img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80'
                    })}
                    className="h-44 bg-slate-900 relative flex items-center justify-center group cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80')" }}></div>
                    <div className="w-14 h-14 rounded-full bg-[#FF6A00] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative z-10">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                    <span className="absolute bottom-3 right-3 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded font-mono">02:30</span>
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-sm text-[#0F2A4A]">Helpdesk Response Experience</h4>
                    <p className="text-xs text-slate-500 mt-1">User experience contacting the official helpdesk for guideline queries.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 2: User Screenshots */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                  <h3 className="text-lg font-bold text-[#0F2A4A] font-heading">Portal Interface &amp; Workflow Gallery</h3>
                </div>
                <span className="text-xs text-slate-500 font-medium">Click to expand preview</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div
                  onClick={() => setLightboxModal({
                    title: 'Interactive Practice Workspace',
                    desc: 'A glimpse of the practice interface where users test character accuracy, speed benchmarks, and guideline validation.',
                    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80'
                  })}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#0F2A4A] cursor-pointer group transition-all"
                >
                  <div className="h-44 bg-slate-100 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80" alt="Practice Workspace" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-[#0F2A4A]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Search className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-3.5">
                    <span className="text-[11px] font-bold text-[#FF6A00] uppercase">Workspace View</span>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">Task Evaluation Interface</p>
                  </div>
                </div>

                <div
                  onClick={() => setLightboxModal({
                    title: 'Category Instruction Guidelines',
                    desc: 'Clear step-by-step Standard Operating Procedures (SOPs) presented alongside each task module.',
                    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80'
                  })}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#0F2A4A] cursor-pointer group transition-all"
                >
                  <div className="h-44 bg-slate-100 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80" alt="Category Guidelines" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-[#0F2A4A]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Search className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-3.5">
                    <span className="text-[11px] font-bold text-[#FF6A00] uppercase">SOP View</span>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">Standardized Operating Procedures</p>
                  </div>
                </div>

                <div
                  onClick={() => setLightboxModal({
                    title: 'Submission History & Tracking',
                    desc: 'Clean portal dashboard keeping records of submitted work batches and quality review outcomes.',
                    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&auto=format&fit=crop&q=80'
                  })}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#0F2A4A] cursor-pointer group transition-all"
                >
                  <div className="h-44 bg-slate-100 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80" alt="Submission History" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-[#0F2A4A]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <Search className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="p-3.5">
                    <span className="text-[11px] font-bold text-[#FF6A00] uppercase">Dashboard View</span>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">Organized Task Submission History</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category 3: Written feedback (EXACTLY 3 placeholder cards: "Real reviews coming soon.") */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <h3 className="text-lg font-bold text-[#0F2A4A] font-heading">Written Feedback</h3>
                </div>
                <span className="text-xs text-slate-400">Strictly verified feedback only</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center min-h-[180px] shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                    <MessageSquare className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Real reviews coming soon.</p>
                  <span className="text-[11px] text-slate-400 mt-1">Pending submission audit completion</span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center min-h-[180px] shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                    <MessageSquare className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Real reviews coming soon.</p>
                  <span className="text-[11px] text-slate-400 mt-1">Verified user feedback in collection</span>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center flex flex-col items-center justify-center min-h-[180px] shadow-xs">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mb-3">
                    <MessageSquare className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-sm font-semibold text-slate-500">Real reviews coming soon.</p>
                  <span className="text-[11px] text-slate-400 mt-1">Zero fake screenshots policy</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 8. BLOG PAGE / SECTION                                    */}
      {/* ========================================================= */}
      <section id="blogs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#FF6A00] font-bold text-xs uppercase tracking-wider mb-3">
                <BookOpen className="w-3.5 h-3.5" /> Knowledge Base &amp; Safety
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F2A4A] font-heading">
                WorkPitara Blog &amp; Guides
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base">
                Work from home, data entry and online tasks related genuine guides, safety tips and real experiences.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#auth"
                className="px-5 py-2.5 rounded-lg bg-[#FF6A00] hover:bg-[#E05D00] text-white font-bold text-sm transition-all shadow-xs"
              >
                Start Demo Module
              </a>
              <a
                href="#projects"
                className="px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 text-sm font-semibold transition-all"
              >
                View Work Projects
              </a>
            </div>
          </div>

          {/* 4 Specific Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Article 1 */}
            <article className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 hover:border-[#FF6A00] transition-all flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 mb-3">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Fraud Alert &amp; Safety Tip</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F2A4A] leading-snug">
                  WhatsApp and Telegram par Data Entry Jobs ke Naam Par ₹3,000 Security Deposit Maang Rahe Hain? Bilkul Mat Dena!
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Aaj kal Telegram aur WhatsApp par hazaron log &quot;Typing Work from Home&quot; ke jhoothe promises karke security deposit maangte hain. Jaaniye ki genuine platform ka workflow kaisa hota hai aur fraud se kaise bachein.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 5 min read
                </span>
                <button
                  onClick={() => setBlogModalId(1)}
                  className="px-4 py-2 bg-[#0F2A4A] hover:bg-[#FF6A00] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>

            {/* Article 2 */}
            <article className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 hover:border-[#FF6A00] transition-all flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 mb-3">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Platform Transparency</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F2A4A] leading-snug">
                  WorkPitara Real or Fake? An Honest Inside Look at Our Registration &amp; Task Verification System
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kya WorkPitara authentic hai? Hum transparently explain karte hain ki hamara task verification system kaise kaam karta hai, eligibility criteria kya hain aur portal login workflow ka actual mechanism kya hai.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 6 min read
                </span>
                <button
                  onClick={() => setBlogModalId(2)}
                  className="px-4 py-2 bg-[#0F2A4A] hover:bg-[#FF6A00] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>

            {/* Article 3 */}
            <article className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 hover:border-[#FF6A00] transition-all flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-3">
                  <Laptop className="w-4 h-4" />
                  <span>Productivity &amp; Time Management</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F2A4A] leading-snug">
                  Housewives Ke Liye Work From Home: Ghar Ke Kaam Ke Saath Daily 2-3 Ghante Kaise Manage Karein?
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ghar aur bacchon ki zimmedari ke saath online micro-tasks kaise karein? Time slot division, mobile vs laptop setup aur bina stress ke consistent practice karne ke actionable tareeqe.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 4 min read
                </span>
                <button
                  onClick={() => setBlogModalId(3)}
                  className="px-4 py-2 bg-[#0F2A4A] hover:bg-[#FF6A00] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>

            {/* Article 4 */}
            <article className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 hover:border-[#FF6A00] transition-all flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 mb-3">
                  <TrendingUp className="w-4 h-4" />
                  <span>Banking &amp; Payout Guide</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F2A4A] leading-snug">
                  How to Withdraw Your Earnings on WorkPitara: Step-by-Step UPI and Direct Bank Transfer Process
                </h3>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Approved task balances ko withdraw karne ka genuine process: UPI ID mapping, NEFT/IMPS verification aur accounting cycle clearing timings ki poori jaankari.
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 5 min read
                </span>
                <button
                  onClick={() => setBlogModalId(4)}
                  className="px-4 py-2 bg-[#0F2A4A] hover:bg-[#FF6A00] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 9. DEMO / AUTHENTICATION SECTION                          */}
      {/* Title: User Authentication — WorkPitara Official Practice */}
      {/* Portal. Tabs: Login / Register                            */}
      {/* Data Collection: Register data -> Same Google Sheet       */}
      {/* Source: "User Site". Portal login NOT sent to sheet.      */}
      {/* ========================================================= */}
      <section id="auth" className="py-20 bg-slate-900 text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 rounded-full bg-[#FF6A00]/20 text-[#FF6A00] font-bold text-xs uppercase tracking-wider">
              Practice &amp; Onboarding Desk
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 font-heading">
              User Authentication — WorkPitara Official Practice Portal
            </h2>
            <p className="mt-2 text-slate-400 text-xs sm:text-sm">
              Try demo modules, create your user profile, or access authorized platform dashboards.
            </p>
          </div>

          {/* Auth Card with Tabs */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-w-2xl mx-auto">
            
            {/* Tabs Header */}
            <div className="flex border-b border-slate-700 bg-slate-800/80">
              <button
                onClick={() => setAuthTab('register')}
                className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  authTab === 'register'
                    ? 'border-[#FF6A00] text-[#FF6A00]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Register / Create Profile
              </button>
              <button
                onClick={() => setAuthTab('login')}
                className={`flex-1 py-4 text-center text-sm font-bold border-b-2 transition-all cursor-pointer ${
                  authTab === 'login'
                    ? 'border-[#FF6A00] text-[#FF6A00]'
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                Existing User Login
              </button>
            </div>

            <div className="p-6 sm:p-8">
              
              {/* TAB 1: REGISTER */}
              {authTab === 'register' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white font-heading">Create Your User Profile</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Enter your genuine details for account creation and official practice demo access.
                    </p>
                  </div>

                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name <span className="text-[#FF6A00]">*</span> (As per documents)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={regForm.fullName}
                        onChange={e => setRegForm({ ...regForm, fullName: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Mobile Number (Password) <span className="text-[#FF6A00]">*</span> Enter 10 digit mobile number
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-xs font-semibold text-slate-400">+91</span>
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          maxLength={10}
                          placeholder="9876543210"
                          value={regForm.mobile}
                          onChange={e => setRegForm({ ...regForm, mobile: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-12 pr-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6A00]"
                        />
                      </div>
                      <span className="text-[11px] text-slate-400 mt-0.5 block">
                        Your 10-digit mobile number functions as your primary password credential.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Gmail Address <span className="text-[#FF6A00]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@gmail.com"
                        value={regForm.email}
                        onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          City <span className="text-[#FF6A00]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Jaipur"
                          value={regForm.city}
                          onChange={e => setRegForm({ ...regForm, city: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6A00]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          State <span className="text-[#FF6A00]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajasthan"
                          value={regForm.state}
                          onChange={e => setRegForm({ ...regForm, state: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6A00]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Qualification <span className="text-[#FF6A00]">*</span>
                        </label>
                        <select
                          required
                          value={regForm.qualification}
                          onChange={e => setRegForm({ ...regForm, qualification: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                        >
                          <option value="">Select Qualification</option>
                          <option value="10th Pass">10th Pass</option>
                          <option value="12th Pass">12th Pass</option>
                          <option value="Graduate">Graduate</option>
                          <option value="Post Graduate">Post Graduate</option>
                          <option value="Diploma">Diploma</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Preferred Plan / Flow
                        </label>
                        <select
                          value={regForm.plan}
                          onChange={e => setRegForm({ ...regForm, plan: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF6A00]"
                        >
                          <option value="User Site Demo">User Site Demo</option>
                          <option value="Standard Portal Access">Standard Portal Access</option>
                          <option value="Form Filling Module">Form Filling Module</option>
                          <option value="Data Entry Module">Data Entry Module</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 py-3 bg-[#FF6A00] hover:bg-[#E05D00] text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-orange-500/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{isSubmitting ? 'Submitting...' : 'Create Profile'}</span>
                    </button>

                    <p className="text-[11px] text-slate-400 text-center mt-2">
                      By submitting, your request is logged with source: <strong>User Site</strong> into official helpdesk records.
                    </p>
                  </form>
                </div>
              )}

              {/* TAB 2: LOGIN (Does NOT send to sheet) */}
              {authTab === 'login' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-white font-heading">Authorized User Login</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Authorized task submissions and live dashboard tracking are handled securely on the Base44 portal.
                    </p>
                  </div>

                  <form onSubmit={handlePortalLogin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        User ID (Mobile / Email / User ID) <span className="text-[#FF6A00]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your registered Mobile or Email"
                        value={loginForm.userId}
                        onChange={e => setLoginForm({ ...loginForm, userId: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-300">
                          Password <span className="text-[#FF6A00]">*</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => alert("Please reach out to official helpdesk at workpitaraofficial@gmail.com with your registered mobile number for credential verification.")}
                          className="text-xs text-[#FF6A00] hover:underline cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <input
                        type="password"
                        required
                        placeholder="Enter password"
                        value={loginForm.password}
                        onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>

                    <div className="p-3 bg-slate-900/80 rounded-lg border border-slate-700 text-xs text-slate-300 flex items-start gap-2.5">
                      <Lock className="w-4 h-4 text-[#FF6A00] mt-0.5 shrink-0" />
                      <span>Direct secure authentication. Portal credentials remain strictly inside the Base44 database and are never shared.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-[#0F2A4A] hover:bg-slate-700 border border-slate-600 text-white font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-[#FF6A00]" />
                      <span>Secure Login Button</span>
                    </button>
                  </form>

                  <div className="mt-6 pt-4 border-t border-slate-700 text-center">
                    <button
                      onClick={() => setPortalModalOpen(true)}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Prefer direct portal dashboard link? Click here.
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Live Interactive Practice Sandbox */}
          <div className="mt-12 bg-slate-800/60 border border-slate-700 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Play className="w-3 h-3 fill-current" /> Live Practice Sandbox
                </div>
                <h3 className="text-lg font-bold text-white font-heading">Try an Instant Practice Demo Task</h3>
                <p className="text-xs text-slate-400">Test how the verification system checks accuracy and formatting in real time.</p>
              </div>
              
              <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-700 text-xs">
                <button
                  onClick={() => setDemoType('data')}
                  className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                    demoType === 'data'
                      ? 'bg-[#FF6A00] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Data Entry
                </button>
                <button
                  onClick={() => setDemoType('captcha')}
                  className={`px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer ${
                    demoType === 'captcha'
                      ? 'bg-[#FF6A00] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Captcha
                </button>
              </div>
            </div>

            {/* Sandbox Workspace */}
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-700">
              {demoType === 'data' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Sample Source Card: <strong>Invoice Record #4092</strong></span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Practice Mode
                    </span>
                  </div>
                  
                  <div className="bg-slate-800 p-3.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div><span className="text-slate-500 block text-[10px]">CLIENT:</span> Amit Verma</div>
                    <div><span className="text-slate-500 block text-[10px]">ID CODE:</span> WP-8821</div>
                    <div><span className="text-slate-500 block text-[10px]">PINCODE:</span> 302017</div>
                    <div><span className="text-slate-500 block text-[10px]">AMOUNT:</span> ₹4,250</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1">Type Client Name:</label>
                      <input
                        type="text"
                        placeholder="Amit Verma"
                        value={demoInputName}
                        onChange={e => setDemoInputName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-400 mb-1">Type ID Code:</label>
                      <input
                        type="text"
                        placeholder="WP-8821"
                        value={demoInputCode}
                        onChange={e => setDemoInputCode(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs focus:outline-none focus:border-[#FF6A00]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={verifyDemoData}
                      className="px-4 py-2 bg-[#FF6A00] hover:bg-[#E05D00] text-white text-xs font-bold rounded transition-colors cursor-pointer"
                    >
                      Verify Accuracy Check
                    </button>
                    {demoDataResult === 'success' && (
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> 100% Accuracy Matched! Great job.
                      </span>
                    )}
                    {demoDataResult === 'error' && (
                      <span className="text-rose-400 text-xs font-bold flex items-center gap-1">
                        <X className="w-4 h-4" /> Mismatch detected. Please check spelling &amp; code.
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Alphanumeric Verification Code</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Captcha Demo
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="px-6 py-3 bg-slate-950 border border-slate-700 rounded-lg text-lg font-mono font-black tracking-widest text-[#FF6A00] select-none transform skew-x-[-8deg]">
                      W7K9-P2
                    </div>
                    <button
                      onClick={() => { setDemoCaptchaInput(''); setDemoCaptchaResult(null); }}
                      className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      title="Reload"
                    >
                      <RotateCw className="w-3.5 h-3.5" /> Reload
                    </button>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1">Enter exact case-sensitive code:</label>
                    <input
                      type="text"
                      placeholder="W7K9-P2"
                      value={demoCaptchaInput}
                      onChange={e => setDemoCaptchaInput(e.target.value)}
                      className="w-full sm:w-64 bg-slate-950 border border-slate-700 rounded p-2 text-white text-xs font-mono uppercase focus:outline-none focus:border-[#FF6A00]"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <button
                      onClick={verifyDemoCaptcha}
                      className="px-4 py-2 bg-[#FF6A00] hover:bg-[#E05D00] text-white text-xs font-bold rounded transition-colors cursor-pointer"
                    >
                      Submit Captcha Check
                    </button>
                    {demoCaptchaResult === 'success' && (
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Verified Successfully!
                      </span>
                    )}
                    {demoCaptchaResult === 'error' && (
                      <span className="text-rose-400 text-xs font-bold flex items-center gap-1">
                        <X className="w-4 h-4" /> Invalid code. Try again.
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 10. FOOTER                                                */}
      {/* Legal, Helpdesk & Contact, Portal Login Link              */}
      {/* ========================================================= */}
      <footer className="bg-[#0F2A4A] text-slate-300 pt-16 pb-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
            
            {/* Column 1: Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#0F2A4A] border-2 border-[#FF6A00] flex items-center justify-center text-white font-extrabold text-base">
                  WP
                </div>
                <div>
                  <span className="text-xl font-black text-white tracking-tight font-heading">WorkPitara</span>
                  <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">INDIA KA APNA WORK ADDA</p>
                </div>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                WorkPitara — Digital Task Management Portal — A clean digital task platform for user onboarding, task submissions, dashboard tracking and helpdesk support.
              </p>
              <div className="mt-4">
                <button
                  onClick={() => setPortalModalOpen(true)}
                  className="text-xs font-bold text-[#FF6A00] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Authorized Portal Dashboard</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Column 2: Portal Links */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Portal Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="hover:text-[#FF6A00] transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-[#FF6A00] transition-colors">About WorkPitara</a></li>
                <li><a href="#categories" className="hover:text-[#FF6A00] transition-colors">Task Categories</a></li>
                <li><a href="#earners" className="hover:text-[#FF6A00] transition-colors">Top Earners</a></li>
                <li><a href="#testimonials" className="hover:text-[#FF6A00] transition-colors">Testimonials</a></li>
                <li><a href="#blogs" className="hover:text-[#FF6A00] transition-colors">Blogs</a></li>
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Legal &amp; Compliance</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => setLegalModalType('privacy')} className="hover:text-[#FF6A00] transition-colors text-left cursor-pointer">Privacy Policy</button></li>
                <li><button onClick={() => setLegalModalType('terms')} className="hover:text-[#FF6A00] transition-colors text-left cursor-pointer">Terms &amp; Conditions</button></li>
                <li><button onClick={() => setLegalModalType('disclaimer')} className="hover:text-[#FF6A00] transition-colors text-left cursor-pointer">Disclaimer</button></li>
                <li><button onClick={() => setLegalModalType('refund')} className="hover:text-[#FF6A00] transition-colors text-left cursor-pointer">Refund Policy</button></li>
              </ul>
            </div>

            {/* Column 4: Helpdesk & Contact */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-heading">Helpdesk &amp; Contact</h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-[#FF6A00] mt-0.5 shrink-0" />
                  <a href="mailto:workpitaraofficial@gmail.com" className="hover:text-white break-all">workpitaraofficial@gmail.com</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                  <a href="https://wa.me/918750402917" target="_blank" rel="noopener noreferrer" className="hover:text-white">8750402917</a>
                </li>
                <li className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>India</span>
                </li>
              </ul>
              <p className="mt-4 text-[11px] text-slate-400 italic">
                For portal access, task and dashboard support, use official helpdesk email only.
              </p>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              &copy; 2026 WorkPitara All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setLegalModalType('terms')} className="hover:text-slate-200 cursor-pointer">Terms</button>
              <span>&bull;</span>
              <button onClick={() => setLegalModalType('privacy')} className="hover:text-slate-200 cursor-pointer">Privacy</button>
              <span>&bull;</span>
              <button onClick={() => setLegalModalType('refund')} className="hover:text-slate-200 cursor-pointer">Refund</button>
            </div>
          </div>

        </div>
      </footer>

      {/* ========================================================= */}
      {/* MODAL 1: SELECT USER PORTAL POPUP                         */}
      {/* Show ONLY 1 option: WorkPitara Portal                     */}
      {/* Link: https://naukri-pitara-tasks.base44.app              */}
      {/* ========================================================= */}
      {portalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2A4A]/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setPortalModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#0F2A4A] text-white flex items-center justify-center font-bold">
                WP
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F2A4A] font-heading">Select User Portal</h3>
                <p className="text-xs text-slate-500">Official dashboard routing</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Select your authorized portal workspace to access task guidelines, live assignments, and submission tracking.
            </p>

            {/* ONLY 1 Option: WorkPitara Portal */}
            <a
              href={PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 rounded-xl border-2 border-[#FF6A00]/40 bg-orange-50/40 hover:bg-orange-50 hover:border-[#FF6A00] transition-all group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FF6A00] text-white flex items-center justify-center font-bold">
                    <Laptop className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-[#0F2A4A] group-hover:text-[#FF6A00] transition-colors">
                      WorkPitara Portal
                    </div>
                    <div className="text-[11px] text-slate-600 mt-0.5">
                      Latest dashboard for current task access and updated workflow.
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#FF6A00] ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <div className="mt-5 pt-4 border-t border-slate-100 text-center">
              <span className="text-[11px] text-slate-400">
                Protected connection &bull; Base44 Portal Infrastructure
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 2: APPLY NOW FORM MODAL                             */}
      {/* Saves data to same Google Sheet (User Site)               */}
      {/* ========================================================= */}
      {applyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2A4A]/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setApplyModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#FF6A00] text-white flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F2A4A] font-heading">WorkPitara Application</h3>
                <p className="text-xs text-slate-500">Fast-track profile onboarding</p>
              </div>
            </div>

            <form onSubmit={handleApplySubmit} className="space-y-3.5 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name (As per documents) *</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={applyForm.fullName}
                  onChange={e => setApplyForm({ ...applyForm, fullName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  placeholder="10 Digit Mobile"
                  value={applyForm.mobile}
                  onChange={e => setApplyForm({ ...applyForm, mobile: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gmail Address *</label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={applyForm.email}
                  onChange={e => setApplyForm({ ...applyForm, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={applyForm.city}
                    onChange={e => setApplyForm({ ...applyForm, city: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={applyForm.state}
                    onChange={e => setApplyForm({ ...applyForm, state: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Qualification *</label>
                  <select
                    required
                    value={applyForm.qualification}
                    onChange={e => setApplyForm({ ...applyForm, qualification: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#FF6A00]"
                  >
                    <option value="">Select</option>
                    <option value="10th Pass">10th Pass</option>
                    <option value="12th Pass">12th Pass</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Post Graduate">Post Graduate</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Target Plan / Module</label>
                  <select
                    value={applyForm.plan}
                    onChange={e => setApplyForm({ ...applyForm, plan: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:border-[#FF6A00]"
                  >
                    <option value="Standard Work Access">Standard Work Access</option>
                    <option value="Form Filling">Form Filling</option>
                    <option value="Data Entry">Data Entry</option>
                    <option value="Email Support">Email Support</option>
                    <option value="Typing Tasks">Typing Tasks</option>
                    <option value="Captcha Filling">Captcha Filling</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4 py-3 bg-[#FF6A00] hover:bg-[#E05D00] text-white font-bold rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                Submitted to WorkPitara helpdesk with Source: <strong>User Site</strong>.
              </p>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 3: SUCCESS CONFIRMATION MODAL                       */}
      {/* "Thank You! Our team will contact you soon."              */}
      {/* ========================================================= */}
      {successModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2A4A]/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-2xl mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-[#0F2A4A] font-heading">Thank You!</h3>
            <p className="text-sm font-semibold text-slate-700 mt-2">
              Our team will contact you soon.
            </p>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Your registration details have been securely logged into our official roster under source <span className="font-bold text-[#0F2A4A]">User Site</span>.
            </p>
            <button
              onClick={() => setSuccessModalOpen(false)}
              className="mt-6 w-full py-2.5 bg-[#0F2A4A] hover:bg-slate-800 text-white rounded-lg text-sm font-bold transition-colors cursor-pointer"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 4: BLOG MODAL (Full 4 guides)                       */}
      {/* ========================================================= */}
      {blogModalId && blogArticles[blogModalId] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2A4A]/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setBlogModalId(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-5">
              <span className="inline-block px-2.5 py-1 rounded-md bg-orange-100 text-[#FF6A00] text-[11px] font-bold uppercase tracking-wider mb-2">
                {blogArticles[blogModalId].tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0F2A4A] font-heading leading-snug">
                {blogArticles[blogModalId].title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blogArticles[blogModalId].readTime}</span>
                <span>&bull;</span>
                <span>WorkPitara Editorial Desk</span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-5">
              {blogArticles[blogModalId].content}
            </div>

            <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between">
              <a
                href="#auth"
                onClick={() => setBlogModalId(null)}
                className="px-4 py-2 bg-[#FF6A00] hover:bg-[#E05D00] text-white text-xs font-bold rounded-lg transition-colors"
              >
                Try Demo Practice
              </a>
              <button
                onClick={() => setBlogModalId(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 5: CATEGORY DETAILS MODAL                           */}
      {/* ========================================================= */}
      {categoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2A4A]/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setCategoryModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#FF6A00] flex items-center justify-center text-xl mb-4">
              <FileSpreadsheet className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-[#0F2A4A] font-heading">{categoryModal.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              {categoryModal.desc}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => openApplyForCategory(categoryModal.title)}
                className="flex-1 py-2.5 bg-[#FF6A00] hover:bg-[#E05D00] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer text-center"
              >
                Apply For This Category
              </button>
              <button
                onClick={() => setCategoryModal(null)}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 6: LIGHTBOX & MEDIA PREVIEW                         */}
      {/* ========================================================= */}
      {lightboxModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2A4A]/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative">
            <button
              onClick={() => setLightboxModal(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="h-72 bg-slate-900">
              <img src={lightboxModal.img} alt={lightboxModal.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h4 className="text-lg font-bold text-[#0F2A4A] font-heading">{lightboxModal.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">{lightboxModal.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL 7: LEGAL VIEWER                                     */}
      {/* ========================================================= */}
      {legalModalType && legalData[legalModalType] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2A4A]/75 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setLegalModalType(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-xl font-bold text-[#0F2A4A] font-heading mb-3">{legalData[legalModalType].title}</h3>
            <div className="border-t border-slate-100 pt-4 space-y-3 text-xs text-slate-600 leading-relaxed">
              {legalData[legalModalType].content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={() => setLegalModalType(null)}
                className="px-4 py-2 bg-[#0F2A4A] text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
