import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  BarChart3, 
  FileCheck, 
  XCircle, 
  CheckCircle2, 
  Search, 
  Bell, 
  Settings, 
  LogOut,
  MapPin,
  TrendingUp,
  ExternalLink
} from 'lucide-react';
import { Page } from '../types';
import { Button } from './Button';

interface SuperAdminDashboardProps {
  onNavigate: (page: Page) => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'approvals' | 'analytics'>('overview');

  const pendingClinics = [
    { id: 'c1', name: 'Al Noor Medical Center', location: 'Kochi', license: 'DHA-772-12', date: '2025-05-18', status: 'Pending' },
    { id: 'c2', name: 'Kochi Specialty Clinic', location: 'Kochi', license: 'DHA-102-44', date: '2025-05-17', status: 'Pending' },
    { id: 'c3', name: 'Green Life Wellness', location: 'Calicut', license: 'DHA-993-81', date: '2025-05-17', status: 'Pending' },
  ];

  const globalStats = [
    { label: "Total Clinics", value: "842", change: "+12 this week", icon: Building2, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Active Doctors", value: "52,400", change: "+450 this month", icon: Users, color: "text-brand-600", bg: "bg-brand-50" },
    { label: "Platform Revenue", value: "₹1.2Cr", change: "+18.2% vs last Q", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Patient Base", value: "1.2M", change: "+24k today", icon: BarChart3, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 border-r border-slate-800 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <span className="font-black text-xl tracking-tighter text-white">SuperAdmin</span>
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {[
            { id: 'overview', icon: BarChart3, label: "Overview" },
            { id: 'approvals', icon: FileCheck, label: "Clinic Approvals" },
            { id: 'doctors', icon: Users, label: "Manage Doctors" },
            { id: 'analytics', icon: TrendingUp, label: "Revenue Analytics" },
            { id: 'settings', icon: Settings, label: "System Config" },
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
          <button 
            onClick={() => onNavigate(Page.HOME)}
            className="w-full flex items-center gap-4 px-4 py-3.5 text-slate-400 hover:text-red-400 font-black text-xs uppercase tracking-widest transition-all"
          >
            <LogOut className="w-5 h-5" />
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Platform Overview</h1>
            <p className="text-slate-500 font-medium italic">Root administrator access granted.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Systems Healthy
             </div>
             <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all shadow-sm">
                <Bell className="w-6 h-6" />
             </button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {globalStats.map((stat, i) => (
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

            {/* Recent Pending Approvals Mini-Widget */}
            <div className="bg-white rounded-[48px] border border-slate-200 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-10">
                 <h2 className="text-xl font-black text-slate-900 tracking-tight">Recent Pending Clinic Verifications</h2>
                 <button 
                  onClick={() => setActiveTab('approvals')}
                  className="text-indigo-600 font-black text-[10px] uppercase tracking-widest hover:underline"
                 >
                   See All Approvals
                 </button>
              </div>
              <div className="space-y-6">
                 {pendingClinics.map(clinic => (
                   <div key={clinic.id} className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-50 rounded-[32px] border border-slate-100 gap-6">
                      <div className="flex items-center gap-6">
                         <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                            <Building2 className="w-8 h-8 text-indigo-400" />
                         </div>
                         <div>
                            <div className="font-black text-lg text-slate-900">{clinic.name}</div>
                            <div className="flex items-center gap-3 text-sm text-slate-400 font-bold">
                               <MapPin className="w-4 h-4" /> {clinic.location}
                               <span className="text-slate-200">|</span>
                               <span className="text-indigo-500 uppercase tracking-widest text-[10px]">{clinic.license}</span>
                            </div>
                         </div>
                      </div>
                      <div className="flex gap-3">
                         <Button size="sm" variant="outline" className="rounded-xl border-none bg-slate-200 text-slate-600 hover:bg-red-50 hover:text-red-600 font-black uppercase text-[10px] tracking-widest">
                            <XCircle className="w-4 h-4 mr-2" /> Reject
                         </Button>
                         <Button size="sm" className="rounded-xl bg-emerald-600 hover:bg-emerald-700 font-black uppercase text-[10px] tracking-widest shadow-lg shadow-emerald-100">
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Approve Clinic
                         </Button>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'approvals' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="bg-white rounded-[48px] border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-10 border-b border-slate-100">
                   <h2 className="text-2xl font-black text-slate-900 mb-2">Facility Registration Requests</h2>
                   <p className="text-slate-400 font-medium">Verify official documentation before granting platform visibility.</p>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full">
                      <thead className="bg-slate-50">
                         <tr>
                            <th className="px-10 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Clinic / Facility</th>
                            <th className="px-10 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">License Detail</th>
                            <th className="px-10 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Applied On</th>
                            <th className="px-10 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                         {pendingClinics.map(clinic => (
                           <tr key={clinic.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-10 py-8">
                                 <div className="font-black text-slate-900">{clinic.name}</div>
                                 <div className="text-xs text-slate-400 font-bold">{clinic.location}, India</div>
                              </td>
                              <td className="px-10 py-8">
                                 <div className="flex items-center gap-2 text-indigo-600 font-black text-xs">
                                    {clinic.license}
                                    <ExternalLink className="w-3 h-3" />
                                 </div>
                              </td>
                              <td className="px-10 py-8 text-xs font-bold text-slate-500">{clinic.date}</td>
                              <td className="px-10 py-8 text-right">
                                 <div className="flex justify-end gap-2">
                                    <button className="p-2.5 bg-slate-100 hover:bg-red-100 text-slate-400 hover:text-red-600 rounded-xl transition-all">
                                       <XCircle className="w-5 h-5" />
                                    </button>
                                    <button className="p-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-400 hover:text-indigo-600 rounded-xl transition-all">
                                       <CheckCircle2 className="w-5 h-5" />
                                    </button>
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

        {activeTab === 'analytics' && (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-top-4 duration-500">
              <div className="bg-white p-10 rounded-[48px] border border-slate-200">
                 <h3 className="text-xl font-black text-slate-900 mb-8 tracking-tight">Booking Growth</h3>
                 <div className="h-64 bg-slate-50 rounded-[32px] flex items-end justify-between px-10 pb-6 border border-slate-100">
                    {[35, 45, 30, 60, 85, 70, 95].map((h, i) => (
                      <div key={i} className="w-8 bg-brand-500 rounded-t-lg transition-all hover:bg-brand-600 cursor-pointer" style={{ height: `${h}%` }}></div>
                    ))}
                 </div>
                 <div className="mt-6 flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest px-4">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                 </div>
              </div>
              <div className="bg-indigo-900 p-10 rounded-[48px] text-white relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
                 <h3 className="text-2xl font-black mb-8 tracking-tight">Revenue Distribution</h3>
                 <div className="space-y-8">
                    <div>
                       <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3 text-indigo-200">
                          <span>Clinic Commissions</span>
                          <span>65%</span>
                       </div>
                       <div className="w-full bg-indigo-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-white h-full w-[65%]"></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3 text-indigo-200">
                          <span>Featured Listings</span>
                          <span>25%</span>
                       </div>
                       <div className="w-full bg-indigo-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-white h-full w-[25%]"></div>
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-xs font-black uppercase tracking-widest mb-3 text-indigo-200">
                          <span>Platform Fees</span>
                          <span>10%</span>
                       </div>
                       <div className="w-full bg-indigo-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-white h-full w-[10%]"></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}
      </main>
    </div>
  );
};