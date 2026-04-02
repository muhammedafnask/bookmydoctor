import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Settings, 
  LogOut, 
  MoreVertical, 
  Clock,
  BookOpen,
  Sparkles,
  Loader2,
  Mail
} from 'lucide-react';
import { Page } from '../types';
import { Button } from './Button';
import { geminiService } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const AdminDashboard: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArticle, setGeneratedArticle] = useState<string | null>(null);

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

  const stats = [
    { label: "Total Bookings", value: "1,284", change: "+12%", icon: Calendar, color: "bg-sky-500" },
    { label: "New Patients", value: "452", change: "+5%", icon: Users, color: "bg-emerald-500" },
    { label: "Revenue", value: "₹84,200", change: "+18%", icon: TrendingUp, color: "bg-amber-500" },
    { label: "Patient Satisfaction", value: "98%", change: "+2%", icon: MessageSquare, color: "bg-indigo-500" },
  ];

  const appointments = [
    { id: '1', patient: 'Rahul Sharma', type: 'In-person', time: '10:30 AM', status: 'Confirmed', image: 'https://i.pravatar.cc/100?img=11' },
    { id: '2', patient: 'Priya Patel', type: 'Video Call', time: '11:45 AM', status: 'Pending', image: 'https://i.pravatar.cc/100?img=22' },
    { id: '3', patient: 'Amit Kumar', type: 'In-person', time: '02:15 PM', status: 'In Progress', image: 'https://i.pravatar.cc/100?img=33' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-slate-100 flex flex-col hidden lg:flex">
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-100">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-xl tracking-tighter text-slate-900">Dr. Dashboard</span>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: Calendar, label: "Appointments" },
            { icon: Users, label: "Patients" },
            { icon: MessageSquare, label: "Messages" },
            { icon: TrendingUp, label: "Analytics" },
            { icon: Settings, label: "Settings" },
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              item.active ? 'bg-sky-600 text-white shadow-lg shadow-sky-100' : 'text-slate-400 hover:bg-slate-50 hover:text-sky-600'
            }`}>
              <item.icon className="w-5 h-5" />
              {item.label}
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

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Welcome back, Dr. Mitchell</h1>
            <p className="text-slate-500 font-medium">Here's what's happening with your practice today.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-white p-3 rounded-2xl border border-slate-100 text-slate-400 hover:text-sky-600 transition-colors relative">
              <MessageSquare className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-3 h-3 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
            <button className="bg-sky-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-sky-100 hover:bg-sky-700 transition-all">
              New Appointment
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
              <div className="flex items-center justify-between mb-6">
                <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-emerald-500 font-black text-xs bg-emerald-50 px-3 py-1 rounded-full">{stat.change}</span>
              </div>
              <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* AI Article Generator */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-sm">
              <div className="p-8 border-b border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-sky-600" />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">AI Health Article Generator</h2>
              </div>
              <div className="p-8">
                <div className="flex gap-4 mb-8">
                  <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a health topic (e.g., Benefits of Yoga, Heart Health Tips)..."
                    className="flex-1 px-6 py-4 bg-slate-50 border-none rounded-2xl font-bold focus:ring-4 focus:ring-sky-100 outline-none"
                  />
                  <Button 
                    onClick={handleGenerateArticle}
                    disabled={isGenerating || !topic.trim()}
                    className="px-8 py-4 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-sky-100"
                  >
                    {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5 mr-2" />}
                    Generate
                  </Button>
                </div>

                {generatedArticle && (
                  <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative">
                     <div className="prose prose-slate max-w-none">
                        <ReactMarkdown>{generatedArticle}</ReactMarkdown>
                     </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Upcoming Appointments</h2>
                <Button variant="outline" size="sm" className="rounded-xl border-2 text-[10px] uppercase tracking-widest font-black">View All</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50/50">
                    <tr>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Time</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {appointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <img src={apt.image} className="w-10 h-10 rounded-xl" alt="" />
                            <span className="font-black text-slate-700">{apt.patient}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-sm font-bold text-slate-500">{apt.type}</td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2 text-sm font-black text-sky-600">
                             <Clock className="w-4 h-4" />
                             {apt.time}
                          </div>
                        </td>
                        <td className="px-8 py-5">
                           <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                             apt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' : 
                             apt.status === 'In Progress' ? 'bg-blue-50 text-blue-600' : 
                             'bg-amber-50 text-amber-600'
                           }`}>
                             {apt.status}
                           </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="text-slate-300 hover:text-slate-600">
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-sky-900 p-10 rounded-[48px] text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl"></div>
               <h3 className="text-2xl font-black mb-6 tracking-tight">Need Help?</h3>
               <p className="text-sky-200 font-medium mb-8 leading-relaxed">Your dedicated account manager is available for any platform support.</p>
               <div className="flex items-center gap-4 mb-8">
                  <img src="https://i.pravatar.cc/100?img=47" className="w-12 h-12 rounded-xl border-2 border-sky-700" alt="" />
                  <div>
                    <div className="font-black text-sm">Sarah Jenkins</div>
                    <div className="text-xs text-sky-400">Onboarding Specialist</div>
                  </div>
               </div>
               <Button className="w-full bg-white text-sky-900 hover:bg-sky-50 py-4 font-black tracking-widest text-[10px] rounded-[20px] uppercase border-none">Chat with Support</Button>
            </div>

            <div className="bg-white p-8 rounded-[48px] border border-slate-200">
               <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Quick Actions</h3>
               <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start gap-4 py-4 rounded-2xl border-2 border-slate-100 font-black text-xs uppercase tracking-widest">
                     <Calendar className="w-5 h-5 text-sky-600" /> Adjust Availability
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-4 py-4 rounded-2xl border-2 border-slate-100 font-black text-xs uppercase tracking-widest">
                     <Mail className="w-5 h-5 text-sky-600" /> Broadcast to Patients
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-4 py-4 rounded-2xl border-2 border-slate-100 font-black text-xs uppercase tracking-widest">
                     <Users className="w-5 h-5 text-sky-600" /> Edit Public Profile
                  </Button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
