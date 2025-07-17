import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, Zap, PiggyBank, ArrowUpDown, Activity, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useStore } from '../store/useStore';

const Dashboard = () => {
  const { totalPortfolioValue, stakedAssets, lendingPositions } = useStore();

  const portfolioData = [
    { date: '2024-01-01', value: 20000 },
    { date: '2024-01-02', value: 21500 },
    { date: '2024-01-03', value: 20800 },
    { date: '2024-01-04', value: 23200 },
    { date: '2024-01-05', value: 24100 },
    { date: '2024-01-06', value: 25200 },
    { date: '2024-01-07', value: 25847 },
  ];

  const quickActions = [
    { title: 'Stake Assets', description: 'Earn rewards on your crypto', icon: Zap, color: 'from-purple-600 to-blue-600' },
    { title: 'Swap Tokens', description: 'Trade with minimal fees', icon: ArrowUpDown, color: 'from-blue-600 to-cyan-600' },
    { title: 'Lend Assets', description: 'Earn yield on deposits', icon: PiggyBank, color: 'from-green-600 to-emerald-600' },
  ];

  const recentActivity = [
    { type: 'Staked', amount: '1.5 ETH', time: '2 hours ago', status: 'completed' },
    { type: 'Swapped', amount: '500 USDC → 0.2 ETH', time: '5 hours ago', status: 'completed' },
    { type: 'Borrowed', amount: '1,000 USDC', time: '1 day ago', status: 'completed' },
    { type: 'Earned', amount: '12.5 USDC', time: '2 days ago', status: 'completed' },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Portfolio</p>
              {/* <p className="text-2xl font-bold text-white">${totalPortfolioValue.toLocaleString()}</p> */}
              <p className="text-success text-sm flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.5%
              </p>
            </div>
            <div className="bg-primary-500/20 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Staked Assets</p>
              <p className="text-2xl font-bold text-white">$12,450.00</p>
              <p className="text-purple-400 text-sm flex items-center mt-1">
                <Zap className="h-4 w-4 mr-1" />
                8.5% APY
              </p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <Zap className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Lending Balance</p>
              <p className="text-2xl font-bold text-white">$8,750.15</p>
              <p className="text-success text-sm flex items-center mt-1">
                <PiggyBank className="h-4 w-4 mr-1" />
                6.2% APY
              </p>
            </div>
            <div className="bg-success/20 p-3 rounded-lg">
              <PiggyBank className="h-6 w-6 text-success" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6 hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">DEX Volume</p>
              <p className="text-2xl font-bold text-white">$4,647.17</p>
              <p className="text-teal-400 text-sm flex items-center mt-1">
                <ArrowUpDown className="h-4 w-4 mr-1" />
                24h
              </p>
            </div>
            <div className="bg-teal-500/20 p-3 rounded-lg">
              <ArrowUpDown className="h-6 w-6 text-teal-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Chart and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Portfolio Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <div>
                    <p className="text-white font-medium">{activity.type}</p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                </div>
                <p className="text-white font-medium">{activity.amount}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`bg-gradient-to-r ${action.color} p-6 rounded-xl text-white text-left transition-all duration-300 hover:shadow-lg`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className="h-8 w-8" />
                  <Plus className="h-5 w-5 opacity-70" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{action.title}</h4>
                <p className="text-white/80 text-sm">{action.description}</p>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;