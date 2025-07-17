import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  Clock,
  ExternalLink,
  Filter,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useStore } from '../../store/useStore';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('positions');
  const [timeframe, setTimeframe] = useState('7d');
  const { stakedAssets, lendingPositions, borrowPositions, transactionHistory } = useStore();

  const portfolioData = [
    { date: '2024-01-01', value: 20000 },
    { date: '2024-01-02', value: 21500 },
    { date: '2024-01-03', value: 20800 },
    { date: '2024-01-04', value: 23200 },
    { date: '2024-01-05', value: 24100 },
    { date: '2024-01-06', value: 25200 },
    { date: '2024-01-07', value: 25847 },
  ];

  const allocationData = [
    { name: 'Staked Assets', value: 12450, color: '#8B5CF6' },
    { name: 'Lending', value: 8750, color: '#10B981' },
    { name: 'Liquid Assets', value: 4647, color: '#3B82F6' },
  ];

  const tabs = [
    { id: 'positions', name: 'My Positions' },
    { id: 'history', name: 'History' },
    { id: 'rewards', name: 'Rewards' },
    { id: 'risk', name: 'Risk Analysis' },
  ];

  const timeframes = [
    { id: '24h', name: '24H' },
    { id: '7d', name: '7D' },
    { id: '30d', name: '30D' },
    { id: '1y', name: '1Y' },
  ];

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Portfolio Performance</h3>
              <div className="flex space-x-2">
                {timeframes.map((tf) => (
                  <button
                    key={tf.id}
                    onClick={() => setTimeframe(tf.id)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      timeframe === tf.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {tf.name}
                  </button>
                ))}
              </div>
            </div>
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
          </div>
        </div>

        <div className="space-y-6">
          {/* Total Portfolio Value */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Total Portfolio</h3>
              <DollarSign className="h-6 w-6 text-primary-500" />
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white">$25,847.32</p>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-success text-sm">+12.5% (24h)</span>
              </div>
            </div>
          </div>

          {/* Asset Allocation */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Asset Allocation</h3>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {allocationData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white text-sm">${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="border-b border-gray-700">
          <div className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-500'
                    : 'border-transparent text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'positions' && (
            <div className="space-y-6">
              {/* Staked Assets */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Staked Assets</h4>
                <div className="space-y-3">
                  {(stakedAssets || []).map((asset, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{asset.token[0]}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{asset.token}</p>
                            <p className="text-gray-400 text-sm">{asset.apy}% APY</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{asset.amount} {asset.token}</p>
                          <p className="text-success text-sm">+{asset.rewards} rewards</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Lending Positions */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Lending Positions</h4>
                <div className="space-y-3">
                  {(lendingPositions || []).map((position, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{position.token[0]}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{position.token}</p>
                            <p className="text-gray-400 text-sm">{position.apy}% APY</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{position.supplied.toLocaleString()} {position.token}</p>
                          <p className="text-gray-400 text-sm">
                            {position.collateralEnabled ? 'Collateral enabled' : 'Collateral disabled'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-white">Transaction History</h4>
                <div className="flex space-x-2">
                  <button className="btn-secondary rounded-lg px-3 py-2 text-sm flex items-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                  <button className="btn-secondary rounded-lg px-3 py-2 text-sm flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left text-gray-400 py-3">Date</th>
                      <th className="text-left text-gray-400 py-3">Action</th>
                      <th className="text-left text-gray-400 py-3">Amount</th>
                      <th className="text-left text-gray-400 py-3">Status</th>
                      <th className="text-left text-gray-400 py-3">Tx Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(transactionHistory || []).slice(0, 10).map((tx, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/30">
                        <td className="py-3 text-gray-300">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-white capitalize">{tx.type}</td>
                        <td className="py-3 text-white">{tx.amount} {tx.token}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            tx.status === 'confirmed' ? 'bg-success/20 text-success' :
                            tx.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-error/20 text-error'
                          }`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3">
                          <button className="flex items-center space-x-1 text-primary-500 hover:text-primary-400">
                            <span className="text-sm">{tx.hash.slice(0, 8)}...</span>
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="text-center py-12">
              <Percent className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Rewards Tracking</h4>
              <p className="text-gray-400">Detailed rewards analytics coming soon</p>
            </div>
          )}

          {activeTab === 'risk' && (
            <div className="text-center py-12">
              <TrendingDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Risk Analysis</h4>
              <p className="text-gray-400">Advanced risk metrics coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;