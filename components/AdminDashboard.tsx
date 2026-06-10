import React, { useState, useRef, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Clock,
  BookOpen,
  Sparkles,
  Loader2,
  Mail,
  Plus,
  Search,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { Page } from '../types';
import { Button } from './Button';
import { geminiService } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface PatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  lastVisit: string;
  condition: string;
}

interface ChatMessage {
  id: string;
  sender: 'doctor' | 'patient';
  text: string;
  time: string;
}

interface ChatThread {
  id: string;
  patientName: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  messages: ChatMessage[];
}

export const AdminDashboard: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  // Tabs State
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'patients' | 'messages' | 'analytics' | 'settings'>('overview');
  
  // Topic state for AI Generator
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<string | null>(null);

  // Stats State (Interactive updates)
  const [stats, setStats] = useState([
    { label: "Total Bookings", value: "1,284", change: "+12%", icon: Calendar, color: "bg-sky-500" },
    { label: "New Patients", value: "452", change: "+5%", icon: Users, color: "bg-emerald-500" },
    { label: "Revenue", value: "₹84,200", change: "+18%", icon: TrendingUp, color: "bg-amber-500" },
    { label: "Patient Satisfaction", value: "98%", change: "+2%", icon: MessageSquare, color: "bg-indigo-500" },
  ]);

  // Appointments State with Actions
  const [appointments, setAppointments] = useState([
    { id: '1', patient: 'Rahul Sharma', type: 'In-person', time: '10:30 AM', date: '2026-06-09', status: 'Confirmed', image: 'https://i.pravatar.cc/100?img=11' },
    { id: '2', patient: 'Priya Patel', type: 'Video Call', time: '11:45 AM', date: '2026-06-09', status: 'Pending', image: 'https://i.pravatar.cc/100?img=22' },
    { id: '3', patient: 'Amit Kumar', type: 'In-person', time: '02:15 PM', date: '2026-06-09', status: 'In Progress', image: 'https://i.pravatar.cc/100?img=33' },
    { id: '4', patient: 'Sneha Reddy', type: 'Video Call', time: '03:30 PM', date: '2026-06-10', status: 'Confirmed', image: 'https://i.pravatar.cc/100?img=34' },
    { id: '5', patient: 'Vikram Singh', type: 'In-person', time: '04:45 PM', date: '2026-06-10', status: 'Pending', image: 'https://i.pravatar.cc/100?img=12' },
  ]);

  // Patients State with Search and Add functionality
  const [patientSearch, setPatientSearch] = useState('');
  const [patients, setPatients] = useState<PatientRecord[]>([
    { id: 'P001', name: 'Rahul Sharma', age: 29, gender: 'Male', bloodGroup: 'O+', phone: '+91 98765 43210', lastVisit: '2026-06-09', condition: 'Routine Checkup' },
    { id: 'P002', name: 'Priya Patel', age: 34, gender: 'Female', bloodGroup: 'A+', phone: '+91 87654 32109', lastVisit: '2026-06-09', condition: 'Dental Consultation' },
    { id: 'P003', name: 'Amit Kumar', age: 45, gender: 'Male', bloodGroup: 'B+', phone: '+91 76543 21098', lastVisit: '2026-06-09', condition: 'Hypertension Follow-up' },
    { id: 'P004', name: 'Sneha Reddy', age: 27, gender: 'Female', bloodGroup: 'AB+', phone: '+91 65432 10987', lastVisit: '2026-05-24', condition: 'Dry Skin Rash' },
    { id: 'P005', name: 'Vikram Singh', age: 52, gender: 'Male', bloodGroup: 'O-', phone: '+91 54321 09876', lastVisit: '2026-05-18', condition: 'Lower Back Ortho pain' },
  ]);

  const [newPatient, setNewPatient] = useState<Partial<PatientRecord>>({
    name: '', age: 30, gender: 'Male', bloodGroup: 'A+', phone: '', condition: ''
  });
  const [showAddPatient, setShowAddPatient] = useState(false);

  // Messaging Thread State with Dynamic Chat replies
  const [selectedThreadId, setSelectedThreadId] = useState('t1');
  const [typedMessage, setTypedMessage] = useState('');
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([
    {
      id: 't1',
      patientName: 'Rahul Sharma',
      avatar: 'https://i.pravatar.cc/100?img=11',
      lastMessage: "Is it okay if I continue taking the vitamins, doctor?",
      time: "10:14 AM",
      unread: true,
      messages: [
        { id: 'm1', sender: 'patient', text: "Hello Doctor, the pain has subsided significantly.", time: "10:02 AM" },
        { id: 'm2', sender: 'doctor', text: "Excellent, Rahul! Keep up with the fluid intake.", time: "10:05 AM" },
        { id: 'm3', sender: 'patient', text: "Is it okay if I continue taking the vitamins, doctor?", time: "10:14 AM" },
      ]
    },
    {
      id: 't2',
      patientName: 'Priya Patel',
      avatar: 'https://i.pravatar.cc/100?img=22',
      lastMessage: "Thank you for the prescription suggestion.",
      time: "Yesterday",
      unread: false,
      messages: [
        { id: 'm4', sender: 'doctor', text: "Please use the cream twice daily for the dry skin area.", time: "4:30 PM" },
        { id: 'm5', sender: 'patient', text: "Thank you for the prescription suggestion.", time: "5:15 PM" },
      ]
    },
    {
      id: 't3',
      patientName: 'Sneha Reddy',
      avatar: 'https://i.pravatar.cc/100?img=34',
      lastMessage: "Can we schedule a video call follow up for Thursday?",
      time: "2 days ago",
      unread: false,
      messages: [
        { id: 'm6', sender: 'patient', text: "Can we schedule a video call follow up for Thursday?", time: "2:10 PM" },
      ]
    }
  ]);

  // Doctor Settings profile details
  const [settingsForm, setSettingsForm] = useState({
    doctorName: 'Dr. Arthur Mitchell',
    specialty: 'General Physician / Dermatologist',
    consultationFee: '₹800',
    experience: '12 Years',
    phone: '+91 99887 76655',
    email: 'dr.mitchell@bookmydoctor.in',
    clinicName: 'Mitchell Family Healthcare Clinic',
    city: 'Kochi',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    timeSlotDuration: '15 Mins'
  });

  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Chat window bottom reference
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatThreads, selectedThreadId]);

  // Action: Generate Health Article using AI
  const handleGenerateArticle = async () => {
    if (!topic.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      const article = await geminiService.generateHealthArticle(topic);
      setGeneratedArticle(article || null);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Action: Adjust Appointment Statuses
  const handleUpdateStatus = (id: string, newStatus: string) => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === id) {
        return { ...apt, status: newStatus };
      }
      return apt;
    }));
  };

  // Action: Add mocked local patient
  const handleAddPatient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.phone) return;
    const patientID = `P${String(patients.length + 1).padStart(3, '0')}`;
    const newRecord: PatientRecord = {
      id: patientID,
      name: newPatient.name,
      age: Number(newPatient.age) || 30,
      gender: newPatient.gender || 'Male',
      bloodGroup: newPatient.bloodGroup || 'A+',
      phone: newPatient.phone,
      lastVisit: new Date().toISOString().split('T')[0],
      condition: newPatient.condition || 'New Consultation'
    };
    setPatients([newRecord, ...patients]);
    setNewPatient({ name: '', age: 30, gender: 'Male', bloodGroup: 'A+', phone: '', condition: '' });
    setShowAddPatient(false);
    
    // Increment patient state value mockingly
    setStats(prev => prev.map(s => {
      if (s.label === "New Patients") {
        return { ...s, value: String(Number(s.value.replace(/,/g, '')) + 1) };
      }
      return s;
    }));
  };

  // Action: Send Message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'doctor',
      text: typedMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatThreads(prev => prev.map(thread => {
      if (thread.id === selectedThreadId) {
        return {
          ...thread,
          lastMessage: typedMessage,
          time: "Just now",
          unread: false,
          messages: [...thread.messages, newMessage]
        };
      }
      return thread;
    }));

    const clientMsg = typedMessage;
    setTypedMessage('');

    // Simulated patient reply 2 seconds later
    setTimeout(() => {
      const patientReplies = [
        "Understood, doctor! I will follow that schedule.",
        "Got it, thank you so much for clarifying.",
        "I'll book the test tomorrow morning.",
        "Yes, I will keep you posted on the symptoms.",
        "Thank you! Your help is highly appreciated."
      ];
      const randomReply = patientReplies[Math.floor(Math.random() * patientReplies.length)];
      
      const replyMessage: ChatMessage = {
        id: `m_${Date.now() + 1}`,
        sender: 'patient',
        text: `${randomReply} (Responding regarding: "${clientMsg.substring(0, 20)}...")`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatThreads(p => p.map(th => {
        if (th.id === selectedThreadId) {
          return {
            ...th,
            lastMessage: replyMessage.text,
            time: "Just now",
            unread: true,
            messages: [...th.messages, replyMessage]
          };
        }
        return th;
      }));
    }, 2000);
  };

  // Action: Save Settings Changes
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSettingsSuccess(false);
    setTimeout(() => {
      setSavingSettings(false);
      setSettingsSuccess(true);
      setTimeout(() => setSettingsSuccess(false), 3000);
    }, 1000);
  };

  // Filtered patients list
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
    patient.phone.includes(patientSearch) ||
    patient.id.toLowerCase().includes(patientSearch.toLowerCase())
  );

  const selectedThread = chatThreads.find(t => t.id === selectedThreadId) || chatThreads[0];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-100 flex flex-col hidden lg:flex shrink-0">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-100">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <div>
            <span className="font-black text-xl tracking-tighter text-slate-900 block leading-tight">Dr. Dashboard</span>
            <span className="text-[9px] font-black uppercase text-sky-600 tracking-wider">Mitchell Care</span>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {([
            { id: "overview", icon: LayoutDashboard, label: "Overview" },
            { id: "appointments", icon: Calendar, label: "Appointments" },
            { id: "patients", icon: Users, label: "Patients" },
            { id: "messages", icon: MessageSquare, label: "Messages" },
            { id: "analytics", icon: TrendingUp, label: "Analytics" },
            { id: "settings", icon: Settings, label: "Settings" },
          ] as const).map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === item.id 
                  ? 'bg-sky-600 text-white shadow-lg shadow-sky-100' 
                  : 'text-slate-400 hover:bg-slate-50 hover:text-sky-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
              {item.id === 'messages' && chatThreads.some(th => th.unread) && (
                <span className="ml-auto w-2.5 h-2.5 bg-rose-500 rounded-full"></span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={() => onNavigate(Page.HOME)}
            className="w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-red-500 font-black text-xs uppercase tracking-widest transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-100 p-8 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0 shadow-sm relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full">
                Active Staff Core
              </span>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full animate-pulse">
                ● Live Database Linked
              </span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Welcome back, {settingsForm.doctorName}
            </h1>
            <p className="text-slate-500 text-sm font-medium">{settingsForm.specialty} at {settingsForm.clinicName}</p>
          </div>

          <div className="flex gap-4 items-center shrink-0">
            {/* Quick stats on top header */}
            <div className="hidden xl:flex items-center gap-4 border-l pl-6 border-slate-100">
               <div className="text-right">
                  <div className="text-xs font-black text-slate-400 uppercase tracking-wider">Clinic Load</div>
                  <div className="text-sm font-black text-slate-800">Normal Care index</div>
               </div>
               <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
               </div>
            </div>

            <button 
              onClick={() => setActiveTab('messages')}
              className="bg-white p-3.5 rounded-2xl border border-slate-200 text-slate-400 hover:text-sky-600 transition-colors relative"
            >
              <MessageSquare className="w-5 h-5" />
              {chatThreads.some(th => th.unread) && (
                <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('appointments')}
              className="bg-sky-600 text-white px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-100 hover:bg-sky-700 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> New Slot
            </button>
          </div>
        </header>

        {/* Dashboard Dynamic Pages */}
        <div className="flex-grow p-8 md:p-12 overflow-y-auto">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <span className="text-emerald-500 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full">{stat.change}</span>
                    </div>
                    <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
                    <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Grid content */}
              <div className="grid lg:grid-cols-3 gap-12">
                
                {/* AI Article Generator Panel */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-sky-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-black text-slate-900 tracking-tight">AI Health Article Generator</h2>
                          <p className="text-xs text-slate-400 font-bold">Instantly generate structured clinical recommendations for patients</p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-black tracking-widest text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
                        Powered by Gemini
                      </span>
                    </div>
                    <div className="p-8">
                      <div className="flex flex-col md:flex-row gap-4 mb-8">
                        <input 
                          type="text" 
                          value={topic}
                          onChange={(e) => setTopic(e.target.value)}
                          placeholder="Enter a health topic (e.g., Benefits of Yoga, Heart Health Tips)..."
                          className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-sky-100 outline-none text-slate-700"
                        />
                        <Button 
                          onClick={handleGenerateArticle}
                          disabled={isGenerating || !topic.trim()}
                          className="px-8 py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-sky-100 shrink-0"
                        >
                          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 mr-2 inline" />}
                          Generate Recommendations
                        </Button>
                      </div>

                      {generatedArticle && (
                        <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative mt-4">
                           <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-headings:font-black prose-headings:text-slate-950 prose-strong:text-sky-600">
                              <ReactMarkdown>{generatedArticle}</ReactMarkdown>
                           </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upcoming Appointments Quick Look */}
                  <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                      <div>
                        <h2 className="text-xl font-black text-slate-900 tracking-tight">Upcoming Appointments</h2>
                        <p className="text-xs text-slate-400 font-bold">Active clinic lineup for today</p>
                      </div>
                      <Button 
                        onClick={() => setActiveTab('appointments')}
                        variant="outline" 
                        size="sm" 
                        className="rounded-xl border-2 text-[10px] uppercase tracking-widest font-black"
                      >
                        View Full Calendar
                      </Button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-slate-50/50">
                          <tr>
                            <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient</th>
                            <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                            <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                            <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-8 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Quick Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {appointments.slice(0, 3).map((apt) => (
                            <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-8 py-5">
                                <div className="flex items-center gap-3">
                                  <img src={apt.image} className="w-10 h-10 rounded-xl object-cover border border-slate-100" alt="" />
                                  <div>
                                    <span className="font-black text-slate-800 block text-sm">{apt.patient}</span>
                                    <span className="text-[10px] text-slate-400 font-bold uppercase">{apt.id} / Registration Verified</span>
                                  </div>
                                </div>
                              </td>
                              <td className="px-8 py-5 text-sm font-bold text-slate-500">{apt.type}</td>
                              <td className="px-8 py-5">
                                <div className="flex items-center gap-2 text-sm font-black text-sky-600">
                                   <Clock className="w-4 h-4" />
                                   {apt.time}
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                 <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                   apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                                   apt.status === 'In Progress' ? 'bg-sky-100 text-sky-700 border border-sky-200' : 
                                   'bg-amber-100 text-amber-700 border border-amber-200'
                                 }`}>
                                   {apt.status}
                                 </span>
                              </td>
                              <td className="px-8 py-5 text-right">
                                <div className="flex justify-end gap-2">
                                  {apt.status === 'Pending' && (
                                    <>
                                      <button 
                                        onClick={() => handleUpdateStatus(apt.id, 'Confirmed')}
                                        className="p-1 px-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg text-xs font-black uppercase tracking-wider"
                                      >
                                        Accept
                                      </button>
                                      <button 
                                        onClick={() => handleUpdateStatus(apt.id, 'Cancelled')}
                                        className="p-1 px-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-black uppercase tracking-wider"
                                      >
                                        Deny
                                      </button>
                                    </>
                                  )}
                                  {apt.status === 'Confirmed' && (
                                    <button 
                                      onClick={() => handleUpdateStatus(apt.id, 'In Progress')}
                                      className="p-1 px-3 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-lg text-xs font-black uppercase tracking-wider"
                                    >
                                      Begin Care
                                    </button>
                                  )}
                                  {apt.status === 'In Progress' && (
                                    <button 
                                      onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                                      className="p-1 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-black uppercase tracking-wider animate-pulse"
                                    >
                                      Complete Consultation
                                    </button>
                                  )}
                                  {apt.status === 'Completed' && (
                                    <span className="text-xs font-black uppercase text-emerald-600 px-3 py-1">Saved Session</span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Need Help Sidebar banner card */}
                  <div className="bg-sky-900 p-10 rounded-[48px] text-white relative overflow-hidden shadow-2xl">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl text-sky-500"></div>
                     <h3 className="text-2xl font-black mb-6 tracking-tight">Need Support?</h3>
                     <p className="text-sky-200 font-medium mb-8 leading-relaxed text-sm">Your dedicated onboarding account manager is available online to troubleshoot hospital operations.</p>
                     <div className="flex items-center gap-4 mb-8">
                        <img src="https://i.pravatar.cc/100?img=47" className="w-12 h-12 rounded-xl border-2 border-sky-700 object-cover" alt="" />
                        <div>
                          <div className="font-black text-sm">Sarah Jenkins</div>
                          <div className="text-xs text-sky-300">Operations Specialist</div>
                        </div>
                     </div>
                     <Button 
                       onClick={() => {
                         setActiveTab('messages');
                         setSelectedThreadId('t1');
                       }}
                       className="w-full bg-white text-sky-900 hover:bg-sky-50 py-4 font-black tracking-widest text-[10px] rounded-[20px] uppercase border-none text-center block"
                     >
                       Chat with Coordinator
                     </Button>
                  </div>

                  {/* Hot Actions list widget */}
                  <div className="bg-white p-8 rounded-[48px] border border-slate-200">
                     <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Quick Staff Action Center</h3>
                     <div className="space-y-4">
                        <button 
                          onClick={() => {
                            setActiveTab('settings');
                          }}
                          className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-slate-50 hover:bg-slate-50 hover:border-sky-200 transition-all text-left font-black text-xs uppercase tracking-widest"
                        >
                           <span className="flex items-center gap-4 text-slate-700"><Calendar className="w-5 h-5 text-sky-600" /> Adjust Working Days</span>
                           <ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('messages');
                          }}
                          className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-slate-50 hover:bg-slate-50 hover:border-sky-200 transition-all text-left font-black text-xs uppercase tracking-widest"
                        >
                           <span className="flex items-center gap-4 text-slate-700"><Mail className="w-5 h-5 text-sky-600" /> Broadcast Prescription Updates</span>
                           <ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                        <button 
                          onClick={() => {
                            setActiveTab('patients');
                            setShowAddPatient(true);
                          }}
                          className="w-full flex items-center justify-between p-4 rounded-2xl border-2 border-slate-50 hover:bg-slate-50 hover:border-sky-200 transition-all text-left font-black text-xs uppercase tracking-widest"
                        >
                           <span className="flex items-center gap-4 text-slate-700"><Users className="w-5 h-5 text-sky-600" /> Add New Patient Intake</span>
                           <ChevronRight className="w-4 h-4 text-slate-400" />
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="bg-white p-10 rounded-[48px] border border-slate-200">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-slate-100">
                     <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Consultations Calendar</h2>
                        <p className="text-sm text-slate-500">Filter, edit, or append patient appointments</p>
                     </div>
                     <div className="flex flex-wrap gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl font-bold uppercase text-[10px] tracking-wider"
                          onClick={() => {
                            // Add a random mock patient to lineup 
                            const randomIds = ["10", "15", "18", "21", "25"];
                            const randomApt = {
                              id: String(appointments.length + 1),
                              patient: "Patient Intake #" + (appointments.length + 120),
                              type: Math.random() > 0.5 ? 'In-person' : 'Video Call',
                              time: '05:00 PM',
                              date: '2026-06-09',
                              status: 'Pending',
                              image: `https://i.pravatar.cc/100?img=${randomIds[Math.floor(Math.random() * randomIds.length)]}`
                            };
                            setAppointments([...appointments, randomApt]);
                          }}
                        >
                          + Simulate Booking Alert
                        </Button>
                     </div>
                  </div>

                  <div className="overflow-x-auto">
                     <table className="w-full">
                       <thead className="bg-slate-100/50">
                         <tr>
                           <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Appointment ID</th>
                           <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Name</th>
                           <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Session Type</th>
                           <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Slot</th>
                           <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Target Date</th>
                           <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Flag</th>
                           <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Options</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                         {appointments.map((apt) => (
                           <tr key={apt.id} className="hover:bg-slate-50/50 transition-all">
                             <td className="px-8 py-6 font-black text-sky-700">BMD-APT-{apt.id}</td>
                             <td className="px-8 py-6">
                               <div className="flex items-center gap-3">
                                 <img src={apt.image} className="w-8 h-8 rounded-lg object-cover border" alt="" />
                                 <span className="font-extrabold text-slate-800">{apt.patient}</span>
                               </div>
                             </td>
                             <td className="px-8 py-6 font-bold text-slate-500">{apt.type}</td>
                             <td className="px-8 py-6 text-slate-700 font-bold">{apt.time}</td>
                             <td className="px-8 py-6 text-xs text-slate-400 font-bold uppercase">{apt.date}</td>
                             <td className="px-8 py-6">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                  apt.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700 border' : 
                                  apt.status === 'Completed' ? 'bg-slate-100 text-slate-600 border' : 
                                  apt.status === 'Cancelled' ? 'bg-rose-100 text-rose-700 border' : 
                                  apt.status === 'In Progress' ? 'bg-sky-100 text-sky-700 border' : 
                                  'bg-amber-100 text-amber-700 border'
                                }`}>
                                  {apt.status}
                                </span>
                             </td>
                             <td className="px-8 py-6 text-right">
                               <div className="flex justify-end gap-2">
                                 {apt.status === 'Pending' && (
                                   <>
                                     <button 
                                       onClick={() => handleUpdateStatus(apt.id, 'Confirmed')}
                                       className="bg-emerald-500 hover:bg-emerald-600 text-white rounded px-2.5 py-1 text-[10px] font-black uppercase"
                                     >
                                       Approve
                                     </button>
                                     <button 
                                       onClick={() => handleUpdateStatus(apt.id, 'Cancelled')}
                                       className="bg-rose-500 hover:bg-rose-600 text-white rounded px-2.5 py-1 text-[10px] font-black uppercase"
                                     >
                                       Cancel
                                     </button>
                                   </>
                                 )}
                                 {apt.status === 'Confirmed' && (
                                   <button 
                                     onClick={() => handleUpdateStatus(apt.id, 'In Progress')}
                                     className="bg-sky-500 hover:bg-sky-600 text-white rounded px-2.5 py-1 text-[10px] font-black uppercase"
                                   >
                                     Start Consult
                                   </button>
                                 )}
                                 {apt.status === 'In Progress' && (
                                   <button 
                                     onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                                     className="bg-emerald-600 hover:bg-emerald-700 text-white rounded px-2.5 py-1 text-[10px] font-black uppercase animate-pulse"
                                   >
                                     Complete Session
                                   </button>
                                 )}
                                 {apt.status === 'Completed' && (
                                   <span className="text-[10px] font-bold text-slate-400">Validated</span>
                                 )}
                                 {apt.status === 'Cancelled' && (
                                   <span className="text-[10px] font-bold text-rose-400">Archived Session</span>
                                 )}
                               </div>
                             </td>
                           </tr>
                         ))}
                       </tbody>
                     </table>
                  </div>
               </div>
            </div>
          )}

          {/* TAB 3: PATIENTS */}
          {activeTab === 'patients' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-left-4 duration-500">
               <div className="bg-white p-10 rounded-[48px] border border-slate-200">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-6 border-b border-slate-100">
                     <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Active Patients Database</h2>
                        <p className="text-sm text-slate-500">Add information records and check historical conditions</p>
                     </div>
                     <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-grow md:w-80">
                           <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                           <input 
                             type="text" 
                             value={patientSearch}
                             onChange={(e) => setPatientSearch(e.target.value)}
                             placeholder="Search patients by name, code or phone..."
                             className="w-full pl-12 pr-6 py-3.5 bg-slate-100 border border-slate-200 rounded-2xl font-bold focus:ring-4 focus:ring-sky-100 outline-none text-slate-700 text-sm"
                           />
                        </div>
                        <Button 
                          onClick={() => setShowAddPatient(!showAddPatient)}
                          className="bg-sky-600 hover:bg-sky-700 text-white font-black px-6 py-3.5 rounded-2xl uppercase tracking-widest text-xs shadow-xl shadow-sky-100 shrink-0"
                        >
                          <Plus className="w-4 h-4 mr-2 inline" /> Add Patient Intake
                        </Button>
                     </div>
                  </div>

                  {/* Add Patient record local form */}
                  {showAddPatient && (
                    <form onSubmit={handleAddPatient} className="mb-10 p-8 bg-slate-50 border border-slate-200 rounded-[32px] space-y-6">
                       <h3 className="text-lg font-black text-slate-900 tracking-tight">New Intake Intake Form</h3>
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div>
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Patient Full Name</label>
                           <input 
                             type="text"
                             required
                             value={newPatient.name}
                             onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                             placeholder="E.g., Devadas Nair"
                             className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-bold font-sans text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                           />
                         </div>
                         <div>
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Age</label>
                           <input 
                             type="number"
                             value={newPatient.age}
                             onChange={(e) => setNewPatient({ ...newPatient, age: Number(e.target.value) })}
                             placeholder="30"
                             className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-bold font-sans text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                           />
                         </div>
                         <div>
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Gender</label>
                           <select 
                             value={newPatient.gender}
                             onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value })}
                             className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-bold font-sans text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                           >
                             <option value="Male">Male</option>
                             <option value="Female">Female</option>
                             <option value="Non-binary">Non-binary</option>
                           </select>
                         </div>
                         <div>
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Blood Group</label>
                           <input 
                             type="text"
                             value={newPatient.bloodGroup}
                             onChange={(e) => setNewPatient({ ...newPatient, bloodGroup: e.target.value })}
                             placeholder="O+"
                             className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-bold font-sans text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                           />
                         </div>
                         <div>
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Phone</label>
                           <input 
                             type="text"
                             required
                             value={newPatient.phone}
                             onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                             placeholder="+91 90000 12345"
                             className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-bold font-sans text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                           />
                         </div>
                         <div>
                           <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Diagnostic Condition</label>
                           <input 
                             type="text"
                             value={newPatient.condition}
                             onChange={(e) => setNewPatient({ ...newPatient, condition: e.target.value })}
                             placeholder="E.g. Fever, skin irritation"
                             className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-xl font-bold font-sans text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                           />
                         </div>
                       </div>
                       <div className="flex gap-4">
                         <Button 
                           type="submit"
                           className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black uppercase rounded-xl tracking-wider shadow-lg shadow-emerald-50"
                         >
                           Save Intake File
                         </Button>
                         <button 
                           type="button"
                           onClick={() => setShowAddPatient(false)}
                           className="px-6 py-3 bg-slate-200 text-slate-700 hover:bg-slate-300 text-xs font-black uppercase rounded-xl tracking-wider"
                         >
                           Cancel
                         </button>
                       </div>
                    </form>
                  )}

                  {/* Patients lineup list */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     {filteredPatients.map(patient => (
                       <div key={patient.id} className="p-8 bg-slate-50 border border-slate-100 rounded-[32px] hover:border-sky-300 hover:shadow-lg transition-all duration-500">
                          <div className="flex justify-between items-start mb-6">
                             <div>
                                <span className="text-[10px] font-black text-sky-600 bg-sky-50 px-3 py-1 rounded-full uppercase tracking-wider block mb-2 w-fit">
                                   ID: {patient.id}
                                </span>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight">{patient.name}</h3>
                             </div>
                             <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm font-black text-slate-700">
                                {patient.bloodGroup}
                             </div>
                          </div>

                          <div className="grid grid-cols-3 gap-6 mb-6 pb-6 border-b border-slate-200/50 text-sm">
                             <div>
                               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Age</div>
                               <div className="font-bold text-slate-700">{patient.age} Yrs</div>
                             </div>
                             <div>
                               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gender</div>
                               <div className="font-bold text-slate-700">{patient.gender}</div>
                             </div>
                             <div>
                               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Phone</div>
                               <div className="font-bold text-slate-700 whitespace-nowrap text-xs">{patient.phone}</div>
                             </div>
                          </div>

                          <div>
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Clinical Diagnostic Alert</div>
                             <div className="font-black text-sky-700 text-sm">{patient.condition}</div>
                             <div className="text-xs text-slate-400 font-bold mt-2">Latest Visit date: {patient.lastVisit}</div>
                          </div>
                       </div>
                     ))}
                  </div>

                  {filteredPatients.length === 0 && (
                    <div className="text-center py-20 bg-slate-50 rounded-[40px] text-slate-400 font-black">
                       No patient record matched "{patientSearch}"
                    </div>
                  )}
               </div>
            </div>
          )}

          {/* TAB 4: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="h-[700px] bg-white border border-slate-200 rounded-[40px] overflow-hidden flex animate-in fade-in slide-in-from-right-4 duration-500 shadow-sm">
               {/* Left messaging sidebar */}
               <div className="w-80 border-r border-slate-100 flex flex-col h-full shrink-0">
                  <div className="p-6 border-b border-slate-100">
                     <h3 className="text-lg font-black text-slate-900 tracking-tight">Active Doctor Chats</h3>
                     <p className="text-xs text-slate-400 font-bold">Secure HIPAA Line to Patients</p>
                  </div>
                  <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
                     {chatThreads.map(thread => (
                       <button
                         key={thread.id}
                         onClick={() => setSelectedThreadId(thread.id)}
                         className={`w-full p-6 text-left flex gap-4 transition-all ${
                           selectedThreadId === thread.id ? 'bg-sky-50/50 border-r-4 border-sky-600' : 'hover:bg-slate-50'
                         }`}
                       >
                         <img src={thread.avatar} className="w-12 h-12 rounded-xl object-cover border" alt="" />
                         <div className="min-w-0 flex-1">
                           <div className="flex justify-between items-baseline mb-1">
                             <span className="font-black text-slate-800 text-sm truncate">{thread.patientName}</span>
                             <span className="text-[10px] text-slate-400 font-bold">{thread.time}</span>
                           </div>
                           <p className="text-xs text-slate-400 font-bold truncate">{thread.lastMessage}</p>
                         </div>
                         {thread.unread && (
                           <div className="w-2.5 h-2.5 bg-rose-500 rounded-full self-center shrink-0"></div>
                         )}
                       </button>
                     ))}
                  </div>
               </div>

               {/* Right message pane */}
               <div className="flex-grow flex flex-col h-full bg-slate-50/50">
                  {/* Active header */}
                  <div className="p-6 bg-white border-b border-slate-100 flex items-center gap-4 shrink-0 shadow-sm">
                     <img src={selectedThread.avatar} className="w-12 h-12 rounded-xl object-cover border" alt="" />
                     <div>
                        <h4 className="font-black text-slate-900 text-lg leading-snug">{selectedThread.patientName}</h4>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full">
                           Active consult connection
                        </span>
                     </div>
                  </div>

                  {/* Scroll thread list */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                     {selectedThread.messages.map(msg => (
                       <div key={msg.id} className={`flex gap-4 max-w-[75%] ${msg.sender === 'doctor' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                            msg.sender === 'doctor' ? 'bg-sky-600 text-white' : 'bg-white border text-slate-700'
                          }`}>
                             {msg.sender === 'doctor' ? 'MD' : 'PT'}
                          </div>
                          <div className={`p-4 rounded-3xl text-sm font-semibold leading-relaxed shadow-sm ${
                            msg.sender === 'doctor' 
                              ? 'bg-sky-600 text-white rounded-tr-none' 
                              : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                          }`}>
                             <p>{msg.text}</p>
                             <span className={`text-[9px] font-bold uppercase mt-1 block tracking-wider ${
                               msg.sender === 'doctor' ? 'text-sky-200' : 'text-slate-400'
                             }`}>
                               {msg.time}
                             </span>
                          </div>
                       </div>
                     ))}
                     <div ref={chatBottomRef}></div>
                  </div>

                  {/* Send chat form */}
                  <form onSubmit={handleSendMessage} className="p-6 bg-white border-t border-slate-100 flex gap-4 shrink-0 shadow-lg">
                     <input 
                       type="text"
                       value={typedMessage}
                       onChange={(e) => setTypedMessage(e.target.value)}
                       placeholder="Type securely to patient regarding medication or symptoms..."
                       className="flex-grow px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold focus:ring-4 focus:ring-sky-100 outline-none text-slate-700 text-sm"
                     />
                     <Button 
                       type="submit"
                       className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-sky-100"
                     >
                       Send
                     </Button>
                  </form>
               </div>
            </div>
          )}

          {/* TAB 5: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="bg-white p-10 rounded-[48px] border border-slate-200">
                     <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Weekly Consultation Load</h3>
                     <p className="text-xs text-slate-400 font-bold mb-8">Metrics track daily clinic caseloads vs index average</p>
                     
                     <div className="h-64 bg-slate-50 rounded-[32px] flex items-end justify-between px-10 pb-6 border border-slate-100 relative">
                        {[45, 65, 50, 80, 95, 30, 20].map((h, i) => (
                          <div key={i} className="w-10 bg-sky-500 rounded-t-lg transition-all hover:bg-sky-600 cursor-pointer relative group flex flex-col justify-end" style={{ height: `${h}%` }}>
                             {/* Popups metrics */}
                             <span className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] font-black px-2 py-1 rounded transition-all pointer-events-none">
                                {Math.round(h * 0.4)} Load
                             </span>
                          </div>
                        ))}
                     </div>
                     <div className="mt-6 flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                     </div>
                  </div>

                  <div className="bg-white p-10 rounded-[48px] border border-slate-200">
                     <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Consultation Breakdown</h3>
                     <p className="text-xs text-slate-400 font-bold mb-8">Daily medical specialty queries metrics share contribution</p>
                     
                     <div className="space-y-6">
                        <div>
                           <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2 text-slate-500">
                              <span>General Medicine Checkup</span>
                              <span>65% share</span>
                           </div>
                           <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                              <div className="bg-sky-600 h-full w-[65%] rounded-full"></div>
                           </div>
                        </div>
                        <div>
                           <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2 text-slate-500">
                              <span>Dermatology Consults</span>
                              <span>20% share</span>
                           </div>
                           <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full w-[20%] rounded-full"></div>
                           </div>
                        </div>
                        <div>
                           <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-2 text-slate-500">
                              <span>Orthopedics Intake</span>
                              <span>15% share</span>
                           </div>
                           <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                              <div className="bg-amber-500 h-full w-[15%] rounded-full"></div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Metric Cards Bottom row */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-center">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Total Monthly Revenue</div>
                     <div className="text-4xl font-black text-slate-900">₹3,42,800</div>
                     <span className="text-emerald-500 text-xs font-black bg-emerald-50 px-3 py-1 rounded-full inline-block mt-3">+18.5% YoY Growth</span>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-center">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Patient Retention Rate</div>
                     <div className="text-4xl font-black text-slate-900">84.2%</div>
                     <span className="text-sky-500 text-xs font-black bg-sky-50 px-3 py-1 rounded-full inline-block mt-3">Satisfied Care metric</span>
                  </div>
                  <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-center">
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Average Wait Time</div>
                     <div className="text-4xl font-black text-slate-900">6.4 Mins</div>
                     <span className="text-emerald-500 text-xs font-black bg-emerald-50 px-3 py-1 rounded-full inline-block mt-3">Optimal intake score</span>
                  </div>
               </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-4xl animate-in fade-in slide-in-from-top-4 duration-500">
               <form onSubmit={handleSaveSettings} className="bg-white p-10 rounded-[48px] border border-slate-200 space-y-10 shadow-sm">
                  <div className="border-b border-slate-100 pb-6 flex justify-between items-center">
                     <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Practice & Profile Config</h2>
                        <p className="text-sm text-slate-500">Amend clinic hours, fee index schedules, and account details</p>
                     </div>
                     {settingsSuccess && (
                       <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 animate-bounce">
                          ✓ Saved settings successfully!
                       </span>
                     )}
                  </div>

                  {/* Profile rows */}
                  <div className="space-y-8">
                     <div>
                        <h3 className="text-xs font-black text-sky-600 uppercase tracking-widest mb-4">Doctor Personal Info</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Display Practice Name</label>
                              <input 
                                type="text"
                                value={settingsForm.doctorName}
                                onChange={(e) => setSettingsForm({ ...settingsForm, doctorName: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                              />
                           </div>
                           <div>
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Registered Speciality Field</label>
                              <input 
                                type="text"
                                value={settingsForm.specialty}
                                onChange={(e) => setSettingsForm({ ...settingsForm, specialty: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                              />
                           </div>
                           <div>
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Email Address</label>
                              <input 
                                type="email"
                                value={settingsForm.email}
                                onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                              />
                           </div>
                           <div>
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Contact Phone</label>
                              <input 
                                type="text"
                                value={settingsForm.phone}
                                onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                              />
                           </div>
                        </div>
                     </div>

                     <div className="border-t border-slate-100 pt-8">
                        <h3 className="text-xs font-black text-sky-600 uppercase tracking-widest mb-4">Clinic Schedulers & Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div>
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Consultation Session Fee index</label>
                              <input 
                                type="text"
                                value={settingsForm.consultationFee}
                                onChange={(e) => setSettingsForm({ ...settingsForm, consultationFee: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                              />
                           </div>
                           <div>
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Time Slot Consultation Duration</label>
                              <select 
                                value={settingsForm.timeSlotDuration}
                                onChange={(e) => setSettingsForm({ ...settingsForm, timeSlotDuration: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                              >
                                 <option value="15 Mins">15 Minutes per patient</option>
                                 <option value="30 Mins">30 Minutes per patient</option>
                                 <option value="45 Mins">45 Minutes per patient</option>
                              </select>
                           </div>
                           <div>
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Associated Clinic Facility</label>
                              <input 
                                type="text"
                                value={settingsForm.clinicName}
                                onChange={(e) => setSettingsForm({ ...settingsForm, clinicName: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                              />
                           </div>
                           <div>
                              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Hospital Zone / City</label>
                              <input 
                                type="text"
                                value={settingsForm.city}
                                onChange={(e) => setSettingsForm({ ...settingsForm, city: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-sm focus:ring-2 focus:ring-sky-200 outline-none text-slate-700"
                              />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex gap-4">
                     <Button 
                       type="submit"
                       disabled={savingSettings}
                       className="px-8 py-4 bg-sky-600 hover:bg-sky-700 text-white text-xs font-black uppercase rounded-2xl tracking-widest shadow-xl shadow-sky-50"
                     >
                        {savingSettings ? <Loader2 className="w-5 h-5 animate-spin inline" /> : 'Save Modifications'}
                     </Button>
                     <button
                       type="button"
                       onClick={() => {
                         setSettingsForm({
                           doctorName: 'Dr. Arthur Mitchell',
                           specialty: 'General Physician / Dermatologist',
                           consultationFee: '₹800',
                           experience: '12 Years',
                           phone: '+91 99887 76655',
                           email: 'dr.mitchell@bookmydoctor.in',
                           clinicName: 'Mitchell Family Healthcare Clinic',
                           city: 'Kochi',
                           availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                           timeSlotDuration: '15 Mins'
                         });
                       }}
                       className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black uppercase rounded-2xl tracking-widest"
                     >
                        Defaults
                     </button>
                  </div>
               </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};
