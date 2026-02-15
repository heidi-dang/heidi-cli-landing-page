import React from 'react';
import { UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
}

const StatCard = ({ label, value, icon, trend }: { label: string, value: string, icon: string, trend?: string }) => (
  <div className="bg-heidi-dark-card/50 backdrop-blur-sm border border-white/5 p-6 rounded-2xl hover:bg-heidi-dark-card/80 hover:border-heidi-500/20 transition-all duration-300 group">
    <div className="flex items-center justify-between mb-4">
      <div className="h-10 w-10 rounded-xl bg-heidi-500/10 flex items-center justify-center group-hover:bg-heidi-500/20 transition-colors">
        <i className={`fas ${icon} text-heidi-400 group-hover:text-heidi-300`}></i>
      </div>
      {trend && <span className="text-xs font-medium text-heidi-300 bg-heidi-500/10 px-2.5 py-1 rounded-full border border-heidi-500/10">{trend}</span>}
    </div>
    <div className="text-3xl font-bold text-white mb-1 tracking-tight">{value}</div>
    <div className="text-sm text-gray-400 font-medium">{label}</div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-heidi-900/10 via-heidi-dark-bg to-heidi-dark-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-up">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              Welcome back, {user.displayName?.split(' ')[0]} 
              <span className="ml-3 text-xs bg-gradient-to-r from-amber-400 to-orange-500 text-black px-2 py-0.5 rounded font-bold uppercase tracking-wider">PRO</span>
            </h1>
            <p className="text-gray-400 mt-2">Here's what's happening with your Heidi instances.</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white/5 border border-white/10 text-gray-500 px-5 py-2.5 rounded-xl text-sm font-medium flex items-center cursor-not-allowed opacity-70">
              <i className="fas fa-cog mr-2"></i> Settings
              <span className="ml-2 text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-400">SOON</span>
            </button>
            <button className="bg-heidi-600 hover:bg-heidi-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-heidi-500/20 transition-all hover:-translate-y-0.5 flex items-center">
              <i className="fas fa-download mr-2"></i> Update CLI
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <StatCard label="Total Commands" value="1,284" icon="fa-terminal" trend="+12%" />
          <StatCard label="Time Saved" value="4h 12m" icon="fa-clock" trend="Automated" />
          <StatCard label="AI Tokens Used" value="45.2K" icon="fa-brain" />
          <StatCard label="Current Plan" value="Pro" icon="fa-crown" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-heidi-dark-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-xl font-bold text-white">Recent Activity</h2>
               <button className="text-sm text-heidi-400 hover:text-heidi-300">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { cmd: 'heidi explain error.log', time: '2 mins ago', status: 'Completed', type: 'analysis' },
                { cmd: 'heidi gen react-component', time: '1 hour ago', status: 'Completed', type: 'generation' },
                { cmd: 'heidi fix git-conflict', time: '4 hours ago', status: 'Completed', type: 'repair' },
                { cmd: 'heidi test --watch', time: 'Yesterday', status: 'Failed', type: 'process' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/5 group">
                  <div className="flex items-center space-x-4">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${
                      item.type === 'analysis' ? 'bg-blue-500/10 text-blue-400' :
                      item.type === 'generation' ? 'bg-purple-500/10 text-purple-400' :
                      item.type === 'repair' ? 'bg-orange-500/10 text-orange-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                       <i className={`fas ${
                         item.type === 'analysis' ? 'fa-search' :
                         item.type === 'generation' ? 'fa-magic' :
                         item.type === 'repair' ? 'fa-wrench' :
                         'fa-terminal'
                       }`}></i>
                    </div>
                    <div>
                      <div className="font-mono text-sm text-white group-hover:text-heidi-300 transition-colors">{item.cmd}</div>
                      <div className="text-xs text-gray-500">{item.time}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                    item.status === 'Completed' 
                      ? 'text-emerald-400 bg-emerald-400/5 border-emerald-400/10' 
                      : 'text-red-400 bg-red-400/5 border-red-400/10'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User Profile Card */}
          <div className="bg-heidi-dark-card/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex flex-col">
             <div className="text-center mb-8 mt-2">
                <div className="relative inline-block group cursor-pointer">
                  <div className="absolute inset-0 bg-heidi-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                  {user.photoURL ? (
                    <img className="relative h-24 w-24 rounded-full border-4 border-[#1e293b] shadow-xl" src={user.photoURL} alt="" />
                  ) : (
                    <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-heidi-600 to-heidi-800 flex items-center justify-center text-3xl font-bold mx-auto border-4 border-[#1e293b] shadow-xl">
                      {user.displayName?.charAt(0)}
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 h-5 w-5 bg-green-500 border-4 border-[#1e293b] rounded-full"></div>
                </div>
                <h2 className="text-xl font-bold text-white mt-4">{user.displayName}</h2>
                <p className="text-gray-400 text-sm font-medium">{user.email}</p>
             </div>

             <div className="space-y-4 mt-auto">
                <div className="p-5 bg-black/20 rounded-xl border border-white/5">
                  <div className="flex justify-between items-end mb-2">
                     <div className="text-sm font-medium text-gray-300">API Usage Limit</div>
                     <div className="text-xs text-heidi-400 font-mono">45,200 / 100k</div>
                  </div>
                  <div className="w-full bg-gray-700/50 h-2 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-heidi-500 to-emerald-400 h-full w-[45%] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  </div>
                </div>
                <button className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 text-sm font-medium text-gray-300 transition-colors">
                  Manage Subscription
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;