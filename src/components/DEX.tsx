import React, { useState } from 'react';
import { ArrowUpDown, TrendingUp, Droplets, RotateCcw } from 'lucide-react';

const DEX = () => {
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '5.24', price: '$2,067.50' },
    { symbol: 'USDC', name: 'USD Coin', balance: '10,500.00', price: '$1.00' },
    { symbol: 'USDT', name: 'Tether', balance: '5,000.00', price: '$1.00' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: '0.25', price: '$43,250.00' },
  ];

  const swapTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="space-y-6">
      {/* Trading Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">24h Volume</p>
              <p className="text-2xl font-bold text-white">$1.2M</p>
            </div>
            <TrendingUp className="h-6 w-6 text-blue-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Liquidity</p>
              <p className="text-2xl font-bold text-white">$8.5M</p>
            </div>
            <Droplets className="h-6 w-6 text-green-400" />
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div>
            <p className="text-gray-400 text-sm">Your Trades</p>
            <p className="text-2xl font-bold text-white">47</p>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <div>
            <p className="text-gray-400 text-sm">Trading Fees</p>
            <p className="text-2xl font-bold text-white">0.3%</p>
          </div>
        </div>
      </div>

      {/* Swap Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Swap Tokens</h3>
          
          <div className="space-y-4">
            <div className="bg-gray-900/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">From</span>
                <span className="text-gray-400 text-sm">
                  Balance: {tokens.find(t => t.symbol === fromToken)?.balance}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-white text-xl placeholder-gray-400 focus:outline-none"
                />
                <select
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  className="bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                ≈ ${((parseFloat(fromAmount) || 0) * parseFloat(tokens.find(t => t.symbol === fromToken)?.price.replace('$', '').replace(',', '') || '0')).toLocaleString()}
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={swapTokens}
                className="bg-gray-700 hover:bg-gray-600 text-white p-2 rounded-lg transition-colors"
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            </div>

            <div className="bg-gray-900/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-sm">To</span>
                <span className="text-gray-400 text-sm">
                  Balance: {tokens.find(t => t.symbol === toToken)?.balance}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  placeholder="0.0"
                  className="flex-1 bg-transparent text-white text-xl placeholder-gray-400 focus:outline-none"
                />
                <select
                  value={toToken}
                  onChange={(e) => setToToken(e.target.value)}
                  className="bg-gray-800 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {tokens.map((token) => (
                    <option key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                ≈ ${((parseFloat(toAmount) || 0) * parseFloat(tokens.find(t => t.symbol === toToken)?.price.replace('$', '').replace(',', '') || '0')).toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-900/30 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Slippage Tolerance</span>
                <div className="flex space-x-2">
                  {['0.1', '0.5', '1.0'].map((value) => (
                    <button
                      key={value}
                      onClick={() => setSlippage(value)}
                      className={`px-3 py-1 rounded text-sm transition-colors ${
                        slippage === value
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {value}%
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Exchange Rate</span>
                  <span className="text-white">1 ETH = 2,067.50 USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Trading Fee</span>
                  <span className="text-white">0.3%</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
              Swap Tokens
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Liquidity Pools</h3>
          
          <div className="space-y-4">
            {[
              { pair: 'ETH/USDC', tvl: '$2.5M', apy: '12.5%', volume: '$450K' },
              { pair: 'WBTC/ETH', tvl: '$1.8M', apy: '15.2%', volume: '$320K' },
              { pair: 'USDC/USDT', tvl: '$3.2M', apy: '8.7%', volume: '$180K' },
            ].map((pool, index) => (
              <div key={index} className="bg-gray-900/30 rounded-lg p-4 hover:bg-gray-900/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {pool.pair.split('/')[0][0]}
                      </div>
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {pool.pair.split('/')[1][0]}
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-medium">{pool.pair}</p>
                      <p className="text-gray-400 text-sm">{pool.apy} APY</p>
                    </div>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    Add Liquidity
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">TVL</p>
                    <p className="text-white">{pool.tvl}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">24h Volume</p>
                    <p className="text-white">{pool.volume}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Trades */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Trades</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 py-2">Type</th>
                <th className="text-left text-gray-400 py-2">Amount</th>
                <th className="text-left text-gray-400 py-2">Price</th>
                <th className="text-left text-gray-400 py-2">Time</th>
                <th className="text-left text-gray-400 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { type: 'Swap', amount: '1.5 ETH → 3,101.25 USDC', price: '$2,067.50', time: '2 min ago', status: 'Completed' },
                { type: 'Swap', amount: '500 USDC → 0.24 ETH', price: '$2,083.33', time: '15 min ago', status: 'Completed' },
                { type: 'Add LP', amount: '2.0 ETH + 4,135 USDC', price: '-', time: '1 hour ago', status: 'Completed' },
              ].map((trade, index) => (
                <tr key={index} className="border-b border-gray-800 hover:bg-gray-900/20">
                  <td className="py-3 text-white">{trade.type}</td>
                  <td className="py-3 text-white">{trade.amount}</td>
                  <td className="py-3 text-white">{trade.price}</td>
                  <td className="py-3 text-gray-400">{trade.time}</td>
                  <td className="py-3">
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      {trade.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DEX;