import React from 'react';
import { Users, BarChart, Zap, DollarSign, Activity, Settings, TrendingUp, TrendingDown } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
  percentage?: string;
}

interface RecentActivity {
    id: number;
    description: string;
    time: string;
    type: 'post' | 'user' | 'system';
}

const mockActivity: RecentActivity[] = [
    { id: 1, description: 'New story published by @Aura.', time: '2 min ago', type: 'post' },
    { id: 2, description: 'User @Dheeraj successfully updated profile.', time: '15 min ago', type: 'user' },
    { id: 3, description: 'Database backup initiated.', time: '1 hour ago', type: 'system' },
    { id: 4, description: 'Reel views spiked by 12% in the last hour.', time: '2 hours ago', type: 'post' },
    { id: 5, description: 'New user registration from Asia region.', time: '5 hours ago', type: 'user' },
];

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color, trend, percentage }) => {
  const trendColor = trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400';
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Activity;

  return (
    <div className={`bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 ${color} transform transition duration-300 hover:scale-[1.01] hover:shadow-2xl`}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-400 uppercase">{title}</p>
        <div className={`p-2 rounded-full ${color.replace('border-t-4', 'bg-opacity-20')}`}>
            {icon}
        </div>
      </div>
      <div className="mt-4 flex justify-between items-end">
        <p className="text-4xl font-bold text-white">{value}</p>
        {percentage && (
            <div className={`flex items-center text-sm font-semibold ${trendColor}`}>
                <TrendIcon className="w-4 h-4 mr-1" />
                {percentage}
            </div>
        )}
      </div>
    </div>
  );
};

const ActivityItem: React.FC<{ activity: RecentActivity }> = ({ activity }) => {
    let icon;
    let color;
    switch (activity.type) {
        case 'post': icon = <BarChart className="w-5 h-5" />; color = 'text-teal-400'; break;
        case 'user': icon = <Users className="w-5 h-5" />; color = 'text-blue-400'; break;
        case 'system': icon = <Settings className="w-5 h-5" />; color = 'text-yellow-400'; break;
    }
    return (
        <li className="flex items-center space-x-4 p-3 hover:bg-gray-700/50 rounded-lg transition-colors">
            <div className={`p-2 rounded-full ${color.replace('text-', 'bg-')}/20`}>
                {icon}
            </div>
            <div className="flex-1 flex justify-between">
                <p className="text-gray-200">{activity.description}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
        </li>
    );
};

const Dashboard: React.FC = () => {
  const mockUserId = 'user_abc_123456789';

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-900 text-white">
      <h1 className="text-4xl font-extrabold text-teal-400 mb-8">Admin Console & Analytics</h1>
      
      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <DashboardCard 
          title="Total Users" 
          value="1,250" 
          icon={<Users className="w-6 h-6 text-blue-400" />} 
          color="border-teal-500"
          trend="up"
          percentage="+4.5%"
        />
        <DashboardCard 
          title="Daily Active Users (DAU)" 
          value="480" 
          icon={<Zap className="w-6 h-6 text-red-400" />} 
          color="border-red-500"
          trend="down"
          percentage="-1.2%"
        />
        <DashboardCard 
          title="New Posts Today" 
          value="85" 
          icon={<BarChart className="w-6 h-6 text-purple-400" />} 
          color="border-purple-500"
          trend="up"
          percentage="+15%"
        />
        <DashboardCard 
          title="Total Revenue (Mock)" 
          value="$5,200" 
          icon={<DollarSign className="w-6 h-6 text-green-400" />} 
          color="border-green-500"
          trend="neutral"
          percentage="0%"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
        <h3 className="text-2xl font-semibold text-white mb-4">Recent Activity Log</h3>
        <ul className="space-y-2">
            {mockActivity.map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
            ))}
        </ul>
      </div>

      {/* Admin User Info */}
      <div className="mt-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-center">
        <p className="text-lg font-medium text-gray-400">Current Admin User ID</p>
        <p className="font-mono text-sm break-all mt-2 bg-gray-700 p-2 rounded-lg text-teal-300">{mockUserId}</p>
        <p className="text-sm text-gray-500 mt-2">Authentication status: Connected to Firebase</p>
      </div>
    </div>
  );
};

export default Dashboard;