import React from 'react';
import { UserProfile } from '../types';

interface DashboardProps {
  user: UserProfile;
}

const StatCard = ({ label, value, icon, trend }: { label: string, value: string, icon: string, trend?: string }) => (
  <div className="bg-heidi-dark-card border border-white/5 p-6 rounded-xl">
    <div className="flex items-center justify-between mb-4">
      <div className="h-10 w-10 rounded-lg bg-heidi-500/10 flex items-center justify-center">
        <i className={`fas ${icon} text-heidi-400`}></i>
      </div>
      {trend && <span className="text-xs text-heidi-400 bg-heidi-400/10 px-2 py-1 rounded-full">{trend}</span>}
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {user.displayName?.split(' ')[0]}</h1>
            <p className="text-gray-400 mt-1">Here's what's happening with your Heidi instances.</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <i className="fas fa-cog mr-2"></i> Settings
            </button>
            <button className="bg-heidi-600 hover:bg-heidi-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <i className="fas fa-download mr-2"></i> Update CLI
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Commands" value="1,284" icon="fa-terminal" trend="+12% this week" />
          <StatCard label="Time Saved" value="4h 12m" icon="fa-clock" trend="Automated tasks" />
          <StatCard label="AI Tokens Used" value="45.2K" icon="fa-brain" />
          <StatCard label="Current Plan" value="Pro" icon="fa-crown" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-heidi-dark-card border border-white/5 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
            <div className="space-y-6">
              {[
                { cmd: 'heidi explain error.log', time: '2 mins ago', status: 'Completed' },
                { cmd: 'heidi gen react-component', time: '1 hour ago', status: 'Completed' },
                { cmd: 'heidi fix git-conflict', time: '4 hours ago', status: 'Completed' },
                { cmd: 'heidi test --watch', time: 'Yesterday', status: 'Failed' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-4">
                    <div className="h-2 w-2 rounded-full bg-heidi-500"></div>
                    <div>
                      <div className="font-mono text-sm text-white">{item.cmd}</div>
                      <div className="text-xs text-gray-500">{item.time}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.status === 'Completed' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User Profile Card */}
          <div className="bg-heidi-dark-card border border-white/5 rounded-2xl p-6">
             <div className="text-center mb-6">
                <div className="relative inline-block">
                  {user.photoURL ? (
                    <img className="h-24 w-24 rounded-full border-4 border-heidi-dark-bg" src={user.photoURL} alt="" />
                  ) : (
                    <div className="h-24 w-24 rounded-full bg-heidi-600 flex items-center justify-center text-3xl font-bold mx-auto border-4 border-heidi-dark-bg">
                      {user.displayName?.charAt(0)}
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1 h-5 w-5 bg-green-500 border-2 border-heidi-dark-card rounded-full"></div>
                </div>
                <h2 className="text-xl font-bold text-white mt-4">{user.displayName}</h2>
                <p className="text-gray-400 text-sm">{user.email}</p>
             </div>

             <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-xl">
                  <div className="text-sm text-gray-400 mb-1">API Usage Limit</div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div className="bg-heidi-500 h-full w-[45%]"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-300">
                    <span>45% Used</span>
                    <span>100k Limit</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
