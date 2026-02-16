
import React from 'react';
import { 
  Users, 
  Calendar, 
  TrendingUp, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Clock, 
  CheckCircle2, 
  MoreVertical,
  Mail,
  User,
  LayoutDashboard,
  MessageSquare
} from 'lucide-react';
import { Page } from '../types';
import { Button } from './Button';

interface AdminDashboardProps {
  onNavigate: (page: Page) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const stats = [
    { label: "Today's Appointments", value: "12", change: "+2 from yesterday", icon: Calendar, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "New Patients", value: "48", change: "+15% this month", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Total Earnings", value: "₹42,500", change: "+12.5% vs last month", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Patient Satisfaction", value: "98%", change: "Based on 120 reviews", icon: CheckCircle2, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const appointments = [
    { id: 1, patient: "Rahul Sharma", time: "09:00 AM", type: "Checkup", status: "Confirmed", image: "https://i.pravatar.cc/100?img=11" },
    { id: 2, patient: "Ananya Iyer", time: "10:30 AM", type: "Follow-up", status: "In Progress", image: "https://i.pravatar.cc/100?img=22" },
    { id: 3, patient: "Vikram Malhotra", time: "11:15 AM", type: "Consultation", status: "Pending", image: "https://i.pravatar.cc/100?img=33" },
    { id: 4, patient: "Sita Reddy", time: "12:00 PM", type: "Checkup", status: "Confirmed", image: "https://i.pravatar.cc/100?img=44" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center">
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
              item.active ? 'bg-brand-600 text-white shadow-lg shadow-brand-100' : 'text-slate-400 hover:bg-slate-50 hover:text-brand-600'
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
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back, Dr. Mitchell!</h1>
            <p className="text-slate-500 font-medium">Here's what's happening in your clinic today.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input type="text" placeholder="Search patient..." className="bg-white border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 outline-none w-64" />
            </div>
            <button className="relative p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-brand-600 transition-all">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-12 h-12 rounded-2xl bg-brand-100 border-2 border-white shadow-sm overflow-hidden">
               <img src="https://images.unsplash.com/photo-1559839734-2b71f1536783?q=80&w=100&h=100&auto=format&fit=crop" alt="Doctor" />
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500">
               <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-[20px] flex items-center justify-center mb-6`}>
                 <stat.icon className="w-7 h-7" />
               </div>
               <div className="text-3xl font-black text-slate-900 mb-1">{stat.value}</div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{stat.label}</div>
               <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block">
                 {stat.change}
               </div>
            </div>
          ))}
        </div>

        {/* Appointments Table */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[48px] border border-slate-200 overflow-hidden">
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
                          <div className="flex items-center gap-2 text-sm font-black text-brand-600">
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

          <div className="space-y-8">
            <div className="bg-brand-900 p-10 rounded-[48px] text-white relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 rounded-full blur-3xl"></div>
               <h3 className="text-2xl font-black mb-6 tracking-tight">Need Help?</h3>
               <p className="text-brand-200 font-medium mb-8 leading-relaxed">Your dedicated account manager is available for any platform support.</p>
               <div className="flex items-center gap-4 mb-8">
                  <img src="https://i.pravatar.cc/100?img=47" className="w-12 h-12 rounded-xl border-2 border-brand-700" alt="" />
                  <div>
                    <div className="font-black text-sm">Sarah Jenkins</div>
                    <div className="text-xs text-brand-400">Onboarding Specialist</div>
                  </div>
               </div>
               <Button className="w-full bg-white text-brand-900 hover:bg-brand-50 py-4 font-black tracking-widest text-[10px] rounded-[20px] uppercase border-none">Chat with Support</Button>
            </div>

            <div className="bg-white p-8 rounded-[48px] border border-slate-200">
               <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Quick Actions</h3>
               <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start gap-4 py-4 rounded-2xl border-2 border-slate-100 font-black text-xs uppercase tracking-widest">
                     <Calendar className="w-5 h-5 text-brand-600" /> Adjust Availability
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-4 py-4 rounded-2xl border-2 border-slate-100 font-black text-xs uppercase tracking-widest">
                     <Mail className="w-5 h-5 text-brand-600" /> Broadcast to Patients
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-4 py-4 rounded-2xl border-2 border-slate-100 font-black text-xs uppercase tracking-widest">
                     <User className="w-5 h-5 text-brand-600" /> Edit Public Profile
                  </Button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
