import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe, 
  Zap,
  Save,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { useStore } from '../../store/useStore';
// Setting is remove changes
const Settings = () => {
  const [activeSection, setActiveSection] = useState('general');
  const { theme, setTheme, selectedNetwork, setSelectedNetwork } = useStore();
  
  const [settings, setSettings] = useState({
    notifications: {
      transactions: true,
      rewards: true,
      governance: false,
      marketing: false,
    },
    trading: {
      slippageTolerance: '0.5',
      transactionDeadline: '20',
      expertMode: false,
      gasPrice: 'standard',
    },
    security: {
      autoLock: '15',
      biometric: false,
      twoFactor: false,
    }
  });

  const sections = [
    { id: 'general', name: 'General', icon: User },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'trading', name: 'Trading', icon: Zap },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ];

  const networks = [
    { id: 'ethereum', name: 'Ethereum Mainnet', icon: '⟠' },
    { id: 'polygon', name: 'Polygon', icon: '⬟' },
    { id: 'arbitrum', name: 'Arbitrum One', icon: '🔷' },
    { id: 'optimism', name: 'Optimism', icon: '🔴' },
  ];

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Settings Navigation */}
      <div className="lg:col-span-1">
        <div className="card p-4">
          <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Settings Content */}
      <div className="lg:col-span-3">
        <div className="card p-6">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeSection === 'general' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">General Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Default Network
                  </label>
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {networks.map((network) => (
                      <option key={network.id} value={network.id}>
                        {network.icon} {network.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Language
                  </label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Currency
                  </label>
                  <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="usd">USD ($)</option>
                    <option value="eur">EUR (€)</option>
                    <option value="gbp">GBP (£)</option>
                    <option value="jpy">JPY (¥)</option>
                  </select>
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Security Settings</h3>
                
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Security Notice</span>
                  </div>
                  <p className="text-yellow-300 text-sm mt-2">
                    Always verify transaction details before signing. Never share your private keys.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Auto-lock timeout (minutes)
                  </label>
                  <select
                    value={settings.security.autoLock}
                    onChange={(e) => updateSetting('security', 'autoLock', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="5">5 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Biometric Authentication</h4>
                    <p className="text-gray-400 text-sm">Use fingerprint or face ID to unlock</p>
                  </div>
                  <button
                    onClick={() => updateSetting('security', 'biometric', !settings.security.biometric)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.security.biometric ? 'bg-primary-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.security.biometric ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                    <p className="text-gray-400 text-sm">Add an extra layer of security</p>
                  </div>
                  <button
                    onClick={() => updateSetting('security', 'twoFactor', !settings.security.twoFactor)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.security.twoFactor ? 'bg-primary-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.security.twoFactor ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Notification Preferences</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Transaction Notifications</h4>
                      <p className="text-gray-400 text-sm">Get notified about transaction status</p>
                    </div>
                    <button
                      onClick={() => updateSetting('notifications', 'transactions', !settings.notifications.transactions)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.notifications.transactions ? 'bg-primary-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.notifications.transactions ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Reward Notifications</h4>
                      <p className="text-gray-400 text-sm">Get notified about earned rewards</p>
                    </div>
                    <button
                      onClick={() => updateSetting('notifications', 'rewards', !settings.notifications.rewards)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.notifications.rewards ? 'bg-primary-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.notifications.rewards ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Governance Notifications</h4>
                      <p className="text-gray-400 text-sm">Get notified about governance proposals</p>
                    </div>
                    <button
                      onClick={() => updateSetting('notifications', 'governance', !settings.notifications.governance)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings.notifications.governance ? 'bg-primary-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings.notifications.governance ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'trading' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Trading Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Default Slippage Tolerance (%)
                  </label>
                  <input
                    type="number"
                    value={settings.trading.slippageTolerance}
                    onChange={(e) => updateSetting('trading', 'slippageTolerance', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    step="0.1"
                    min="0.1"
                    max="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Transaction Deadline (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.trading.transactionDeadline}
                    onChange={(e) => updateSetting('trading', 'transactionDeadline', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    min="1"
                    max="60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gas Price Strategy
                  </label>
                  <select
                    value={settings.trading.gasPrice}
                    onChange={(e) => updateSetting('trading', 'gasPrice', e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="slow">Slow (Lower fees)</option>
                    <option value="standard">Standard</option>
                    <option value="fast">Fast (Higher fees)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Expert Mode</h4>
                    <p className="text-gray-400 text-sm">Enable advanced trading features</p>
                  </div>
                  <button
                    onClick={() => updateSetting('trading', 'expertMode', !settings.trading.expertMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.trading.expertMode ? 'bg-primary-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.trading.expertMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-white">Appearance Settings</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-4">
                    Theme
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        theme === 'dark'
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="w-full h-20 bg-gray-900 rounded mb-2"></div>
                      <p className="text-white font-medium">Dark</p>
                    </button>
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        theme === 'light'
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="w-full h-20 bg-gray-100 rounded mb-2"></div>
                      <p className="text-white font-medium">Light</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-700">
              <button className="btn-secondary rounded-lg px-6 py-2 flex items-center space-x-2">
                <RefreshCw className="h-4 w-4" />
                <span>Reset</span>
              </button>
              <button className="btn-primary rounded-lg px-6 py-2 flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;