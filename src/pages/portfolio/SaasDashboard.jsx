import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { 
  ArrowLeft, LayoutDashboard, Users, CreditCard, Settings, 
  Bell, Search, TrendingUp, ArrowUpRight, ArrowDownRight, DollarSign, Activity,
  Download, MoreVertical, CreditCard as CardIcon, Shield, Menu
} from 'lucide-react';
import SEOHead from '../../components/SEOHead';

const transactionData = [
  { id: 'TX-1029', user: 'Acme Corp', amount: '$4,200', date: 'Today, 10:24 AM', status: 'Completed' },
  { id: 'TX-1030', user: 'Globex', amount: '$1,850', date: 'Today, 09:12 AM', status: 'Completed' },
  { id: 'TX-1031', user: 'Soylent', amount: '$950', date: 'Yesterday', status: 'Pending' },
  { id: 'TX-1032', user: 'Initech', amount: '$12,400', date: 'Yesterday', status: 'Completed' },
];

export default function SaasDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [revenueData, setRevenueData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/metrics');
        if (response.ok) {
          const data = await response.json();
          const formatted = data.map(dbItem => ({
            name: dbItem.month,
            revenue: dbItem.revenue,
            users: dbItem.users
          }));
          setRevenueData(formatted);
        }
      } catch (error) {
        console.error("Failed to fetch metrics from backend", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <DashboardOverview revenueData={revenueData} transactionData={transactionData} />;
      case 'Customers':
        return <CustomersView />;
      case 'Billing':
        return <BillingView />;
      case 'Settings':
        return <SettingsView />;
      default:
        return <DashboardOverview revenueData={revenueData} transactionData={transactionData} />;
    }
  };

  return (
    <div className="flex bg-[#03060A] min-h-screen text-white font-sans overflow-hidden">
      <SEOHead title="Nexus Dashboard" description="Real-time SaaS analytics dashboard with revenue tracking, customer management, and billing insights." />
      
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-brand-dark border-r border-white/5 flex flex-col hidden md:flex"
      >
        <div className="p-6 border-b border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-brand-secondary/20 flex items-center justify-center border border-brand-secondary/50">
            <Activity className="w-5 h-5 text-brand-secondary" />
          </div>
          <span className="font-heading font-bold tracking-wider text-sm">NEXUS ADMIN</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { name: 'Overview', icon: LayoutDashboard },
            { name: 'Customers', icon: Users },
            { name: 'Billing', icon: CreditCard },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
             <button
                key={item.name}
                onClick={() => setActiveTab(item.name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-300 ${
                  activeTab === item.name 
                    ? 'bg-brand-secondary/10 text-brand-accent border border-brand-accent/20' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
             >
                <item.icon className="w-4 h-4" />
                {item.name}
             </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
           <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              <ArrowLeft className="w-4 h-4" /> Exit to Portfolio
           </Link>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-h-screen overflow-y-auto w-full">
        
        {/* Header */}
        <header className="sticky top-0 z-10 bg-[#03060A]/90 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
             <Link to="/" className="md:hidden text-gray-400 hover:text-white">
                <ArrowLeft className="w-5 h-5" />
             </Link>
             <h2 className="font-heading font-bold text-xl block md:hidden">NEXUS</h2>
             <div className="relative w-full max-w-md hidden sm:block">
               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
               <input 
                 type="text" 
                 placeholder="Search transactions, users..." 
                 className="w-full bg-[#07111B] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-brand-secondary transition-colors"
               />
             </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="relative text-gray-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-brand-accent rounded-full border-2 border-brand-dark"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-secondary to-brand-accent p-[2px]">
               <img src="https://i.pravatar.cc/100?img=33" alt="Admin" className="w-full h-full rounded-full border-2 border-brand-dark object-cover" />
            </div>
          </div>
        </header>

        {/* Dashboard Dynamic Content Rendering */}
        <main className="flex-1 p-4 md:p-8 w-full max-w-7xl mx-auto pb-24 md:pb-8">
          {renderContent()}
        </main>

      </div>

      {/* Mobile Bottom Tab Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#07111B]/95 backdrop-blur-md border-t border-white/5 z-50 px-2 py-2 flex justify-around items-center">
        {[
          { name: 'Overview', icon: LayoutDashboard },
          { name: 'Customers', icon: Users },
          { name: 'Billing', icon: CreditCard },
          { name: 'Settings', icon: Settings },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs transition-all ${
              activeTab === item.name 
                ? 'text-brand-accent' 
                : 'text-gray-500'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.name}</span>
          </button>
        ))}
      </div>

    </div>
  );
}

// ---------------------------------------------------------
// REUSABLE SUB-COMPONENTS FOR VIEWS
// ---------------------------------------------------------

function DashboardOverview({ revenueData, transactionData }) {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading font-bold">Dashboard Overview</h1>
        <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">Last 7 Days</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Total Revenue', value: '$124,500', trend: '+14.5%', isPositive: true, icon: DollarSign },
          { title: 'Active Users', value: '8,240', trend: '+5.2%', isPositive: true, icon: Users },
          { title: 'Churn Rate', value: '1.2%', trend: '-0.4%', isPositive: true, icon: TrendingUp },
          { title: 'Refunds', value: '$840', trend: '+2.1%', isPositive: false, icon: LayoutDashboard }
        ].map((metric, idx) => (
          <div key={idx} className="bg-glass-gradient border border-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-400">{metric.title}</span>
              <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center">
                <metric.icon className="w-4 h-4 text-brand-secondary" />
              </div>
            </div>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold font-heading">{metric.value}</h3>
              <div className={`flex items-center text-sm font-medium ${metric.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {metric.isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {metric.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-glass-gradient border border-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-semibold text-lg text-gray-200">Revenue Analytics</h3>
            <button className="text-sm text-brand-secondary hover:text-brand-accent">View Report</button>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#0B1C2C', borderColor: '#ffffff20', borderRadius: '8px' }} itemStyle={{ color: '#00E5FF' }} />
                <Area type="monotone" dataKey="revenue" stroke="#00E5FF" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-glass-gradient border border-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg flex flex-col hidden lg:flex">
          <h3 className="font-heading font-semibold text-lg text-gray-200 mb-6">User Acquisition</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#ffffff10'}} contentStyle={{ backgroundColor: '#0B1C2C', borderColor: '#ffffff20', borderRadius: '8px' }} itemStyle={{ color: '#3A86FF' }}/>
                <Bar dataKey="users" fill="#3A86FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-glass-gradient border border-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold text-lg text-gray-200">Recent Transactions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="pb-3 font-medium">Transaction ID</th>
                <th className="pb-3 font-medium">Customer</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Date</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.map((tx, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 font-mono text-sm text-gray-300">{tx.id}</td>
                  <td className="py-4 font-medium text-gray-200">{tx.user}</td>
                  <td className="py-4 text-gray-300">{tx.amount}</td>
                  <td className="py-4 text-sm text-gray-400">{tx.date}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${tx.status === 'Completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function CustomersView() {
  const users = [
    { id: 'USR-01', name: 'Alice Cooper', email: 'alice@acmecorp.com', joined: 'Oct 12, 2025', plan: 'Enterprise' },
    { id: 'USR-02', name: 'Bob Smith', email: 'bob@globex.io', joined: 'Oct 08, 2025', plan: 'Pro' },
    { id: 'USR-03', name: 'Charlie Davis', email: 'charlie@soylent.dev', joined: 'Sep 29, 2025', plan: 'Basic' },
    { id: 'USR-04', name: 'Diana Prince', email: 'diana@initech.co', joined: 'Sep 15, 2025', plan: 'Enterprise' },
  ];

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex items-center justify-between mb-8">
        <div>
           <h1 className="text-2xl font-heading font-bold mb-1">Customer Management</h1>
           <p className="text-gray-400 text-sm">View and manage all active platform users.</p>
        </div>
        <button className="bg-brand-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-brand-accent transition-colors">Add User</button>
      </div>

      <div className="bg-glass-gradient border border-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="pb-3 font-medium">User ID</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Email</th>
                <th className="pb-3 font-medium">Plan</th>
                <th className="pb-3 font-medium">Joined</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 font-mono text-sm text-gray-400">{u.id}</td>
                  <td className="py-4 font-medium text-white flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-brand-primary/50 text-xs flex items-center justify-center border border-brand-secondary/30">{u.name[0]}</div>
                     {u.name}
                  </td>
                  <td className="py-4 text-gray-300 text-sm">{u.email}</td>
                  <td className="py-4">
                     <span className={`px-2 py-1 rounded-md text-xs font-semibold ${u.plan === 'Enterprise' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                        {u.plan}
                     </span>
                  </td>
                  <td className="py-4 text-sm text-gray-400">{u.joined}</td>
                  <td className="py-4">
                     <button className="text-gray-400 hover:text-white p-1"><MoreVertical className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

function BillingView() {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <h1 className="text-2xl font-heading font-bold mb-8">Billing & Subscriptions</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
         <div className="bg-glass-gradient border border-white/5 rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold mb-4 text-gray-200">Current Plan</h3>
            <p className="text-3xl font-heading font-bold text-brand-accent mb-2">Enterprise Platform</p>
            <p className="text-gray-400 text-sm mb-6">You are currently on the top-tier Enterprise managed infrastructure plan. Next billing date is Nov 1st, 2025.</p>
            <button className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg text-sm transition-colors text-white">Change Plan</button>
         </div>

         <div className="bg-glass-gradient border border-white/5 rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold mb-4 text-gray-200">Payment Method</h3>
            <div className="flex items-center gap-4 p-4 bg-[#07111B] border border-white/10 rounded-lg mb-6">
               <CardIcon className="w-8 h-8 text-brand-secondary" />
               <div>
                  <p className="font-medium">Mastercard ending in 4242</p>
                  <p className="text-xs text-gray-500">Expires 12/26</p>
               </div>
            </div>
            <button className="text-brand-secondary text-sm hover:underline">Update Payment Method</button>
         </div>
      </div>

      <div className="bg-glass-gradient border border-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg">
        <h3 className="font-heading font-semibold text-lg text-gray-200 mb-6">Invoice History</h3>
        <table className="w-full text-left border-collapse text-sm">
           <thead>
              <tr className="border-b border-white/10 text-gray-400">
                 <th className="pb-3">Invoice</th>
                 <th className="pb-3">Amount</th>
                 <th className="pb-3">Date</th>
                 <th className="pb-3">Status</th>
                 <th className="pb-3 text-right">Download</th>
              </tr>
           </thead>
           <tbody>
              <tr className="border-b border-white/5 hover:bg-white/5">
                 <td className="py-4 font-mono">INV-2591</td>
                 <td className="py-4">$4,500.00</td>
                 <td className="py-4 text-gray-400">Oct 01, 2025</td>
                 <td className="py-4"><span className="text-green-400">Paid</span></td>
                 <td className="py-4 text-right"><button className="text-gray-400 hover:text-brand-accent"><Download className="w-4 h-4 inline" /></button></td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5">
                 <td className="py-4 font-mono">INV-2488</td>
                 <td className="py-4">$4,500.00</td>
                 <td className="py-4 text-gray-400">Sep 01, 2025</td>
                 <td className="py-4"><span className="text-green-400">Paid</span></td>
                 <td className="py-4 text-right"><button className="text-gray-400 hover:text-brand-accent"><Download className="w-4 h-4 inline" /></button></td>
              </tr>
           </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function SettingsView() {
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="max-w-4xl">
      <h1 className="text-2xl font-heading font-bold mb-8">Platform Settings</h1>
      
      <div className="bg-glass-gradient border border-white/5 rounded-xl p-8 mb-8">
         <h3 className="font-semibold text-lg border-b border-white/10 pb-4 mb-6">Profile Information</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-xs uppercase text-gray-500 font-bold tracking-widest mb-2">Display Name</label>
               <input type="text" defaultValue="Nexus Admin" className="w-full bg-[#07111B] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-secondary outline-none" />
            </div>
            <div>
               <label className="block text-xs uppercase text-gray-500 font-bold tracking-widest mb-2">Email Address</label>
               <input type="email" defaultValue="admin@cordexwerk.com" className="w-full bg-[#07111B] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-secondary outline-none" />
            </div>
            <div className="md:col-span-2">
               <label className="block text-xs uppercase text-gray-500 font-bold tracking-widest mb-2">Timezone</label>
               <select className="w-full bg-[#07111B] border border-white/10 rounded-lg px-4 py-3 text-white focus:border-brand-secondary outline-none appearance-none">
                  <option>US/Pacific (GMT-8)</option>
                  <option>US/Eastern (GMT-5)</option>
                  <option>Europe/London (GMT)</option>
               </select>
            </div>
         </div>
         <button className="mt-8 bg-brand-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-brand-accent transition-colors">Save Profile Options</button>
      </div>

      <div className="bg-glass-gradient border border-red-500/20 rounded-xl p-8">
         <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-red-500/10 text-red-500"><Shield className="w-6 h-6" /></div>
            <div>
               <h3 className="font-semibold text-lg text-white mb-2">Danger Zone</h3>
               <p className="text-sm text-gray-400 mb-6">Permanently delete this organization and all its data. This action cannot be undone.</p>
               <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors">Delete Organization</button>
            </div>
         </div>
      </div>
    </motion.div>
  );
}
