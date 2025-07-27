import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bell,
    Moon,
    Sun,
    ChevronDown,
    Wallet,
    ExternalLink,
    Copy,
    LogOut,
    CheckCircle,
    AlertCircle,
    Clock,
} from "lucide-react";
import { useStore } from "../../store/useStore";

interface HeaderProps {
    activeSection: string;
    onExitDApp: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, onExitDApp }) => {
    const {
        theme,
        setTheme,
        selectedNetwork,
        setSelectedNetwork,
        pendingTransactions,
        sidebarCollapsed,
        isWalletConnected,
        walletAddress,
        connectWallet,
        disconnectWallet,
    } = useStore();

    const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
    const [showWalletDropdown, setShowWalletDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const sectionTitles: Record<string, string> = {
        dashboard: "Dashboard",
        staking: "Liquid Staking",
        dex: "Decentralized Exchange",
        lending: "Lending & Borrowing",
        portfolio: "Portfolio",
        // settings: 'Settings',
    };

    const networks = [
        { id: "vara", name: "VARA Network", icon: "🔷" },
        { id: "vara-testnet", name: "VARA Testnet", icon: "🧪" },
        { id: "vara-devnet", name: "VARA Devnet", icon: "⚙️" },
    ];

    const mockNotifications = [
        {
            id: 1,
            type: "success",
            message: "Stake confirmed",
            time: "2 min ago",
        },
        { id: 2, type: "pending", message: "Swap pending", time: "5 min ago" },
        {
            id: 3,
            type: "info",
            message: "New governance proposal",
            time: "1 hr ago",
        },
    ];

    const handleConnectWallet = async () => {
        try {
            await connectWallet();
        } catch (err: any) {
            alert(err.message || "❌ Wallet connect failed");
        }
    };

    const copyAddress = () => {
        if (walletAddress) {
            navigator.clipboard.writeText(walletAddress);
        }
    };

    return (
        <header
            className={`bg-surface/80 backdrop-blur-sm border-b border-gray-700 px-6 py-4 transition-all duration-300 ${
                sidebarCollapsed ? "ml-20" : "ml-72"
            }`}
        >
            <div className="flex items-center justify-between">
                {/* Title */}
                <motion.h1
                    key={activeSection}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl font-bold text-white"
                >
                    {sectionTitles[activeSection]}
                </motion.h1>

                {/* Right Controls */}
                <div className="flex items-center space-x-4">
                    {/* Portfolio */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="bg-gray-700 rounded-lg px-4 py-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-300">
                                    Portfolio
                                </span>
                                <span className="text-sm font-semibold text-white">
                                    $12,547.32
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Network Selector */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setShowNetworkDropdown(!showNetworkDropdown)
                            }
                            className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors"
                        >
                            <span className="text-lg">
                                {
                                    networks.find(
                                        (n) => n.id === selectedNetwork
                                    )?.icon
                                }
                            </span>
                            <span className="text-sm text-white hidden sm:block">
                                {
                                    networks.find(
                                        (n) => n.id === selectedNetwork
                                    )?.name
                                }
                            </span>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </button>

                        <AnimatePresence>
                            {showNetworkDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-48 bg-surface border border-gray-600 rounded-lg shadow-xl z-50"
                                >
                                    {networks.map((network) => (
                                        <button
                                            key={network.id}
                                            onClick={() => {
                                                setSelectedNetwork(network.id);
                                                setShowNetworkDropdown(false);
                                            }}
                                            className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
                                                selectedNetwork === network.id
                                                    ? "bg-gray-700"
                                                    : ""
                                            }`}
                                        >
                                            <span className="text-lg">
                                                {network.icon}
                                            </span>
                                            <span className="text-white">
                                                {network.name}
                                            </span>
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() =>
                                setShowNotifications(!showNotifications)
                            }
                            className="relative p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                            <Bell className="h-5 w-5 text-white" />
                            {pendingTransactions.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {pendingTransactions.length}
                                </span>
                            )}
                        </button>

                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute right-0 mt-2 w-80 bg-surface border border-gray-600 rounded-lg shadow-xl z-50"
                                >
                                    <div className="p-4 border-b border-gray-600">
                                        <h3 className="text-white font-semibold">
                                            Notifications
                                        </h3>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {mockNotifications.map((n) => (
                                            <div
                                                key={n.id}
                                                className="p-4 border-b border-gray-700 hover:bg-gray-700/50"
                                            >
                                                <div className="flex items-start space-x-3">
                                                    {n.type === "success" && (
                                                        <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                                                    )}
                                                    {n.type === "pending" && (
                                                        <Clock className="h-5 w-5 text-yellow-400 mt-0.5" />
                                                    )}
                                                    {n.type === "info" && (
                                                        <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                                                    )}
                                                    <div className="flex-1">
                                                        <p className="text-white text-sm">
                                                            {n.message}
                                                        </p>
                                                        <p className="text-gray-400 text-xs mt-1">
                                                            {n.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                        {theme === "dark" ? (
                            <Sun className="h-5 w-5 text-white" />
                        ) : (
                            <Moon className="h-5 w-5 text-white" />
                        )}
                    </button>

                    {/* Wallet */}
                    <div className="relative">
                        {isWalletConnected && walletAddress ? (
                            <button
                                onClick={() =>
                                    setShowWalletDropdown(!showWalletDropdown)
                                }
                                className="flex items-center space-x-2 bg-success/20 border border-success/30 rounded-lg px-3 py-2 hover:bg-success/30 transition-colors"
                            >
                                <Wallet className="h-4 w-4 text-success" />
                                <span className="text-success text-sm hidden sm:block">
                                    {walletAddress.slice(0, 6)}...
                                    {walletAddress.slice(-4)}
                                </span>
                                <ChevronDown className="h-4 w-4 text-success" />
                            </button>
                        ) : (
                            <button
                                onClick={handleConnectWallet}
                                className="btn-primary rounded-lg px-4 py-2 text-sm"
                            >
                                Connect Wallet
                            </button>
                        )}

                        <AnimatePresence>
                            {showWalletDropdown &&
                                isWalletConnected &&
                                walletAddress && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute right-0 mt-2 w-64 bg-surface border border-gray-600 rounded-lg shadow-xl z-50"
                                    >
                                        <div className="p-4 border-b border-gray-600">
                                            <div className="flex items-center justify-between">
                                                <span className="text-white font-semibold">
                                                    Wallet
                                                </span>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={copyAddress}
                                                        className="p-1 hover:bg-gray-700 rounded"
                                                    >
                                                        <Copy className="h-4 w-4 text-gray-400" />
                                                    </button>
                                                    <button className="p-1 hover:bg-gray-700 rounded">
                                                        <ExternalLink className="h-4 w-4 text-gray-400" />
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="text-gray-400 text-sm mt-1">
                                                {walletAddress}
                                            </p>
                                        </div>
                                        <div className="p-4">
                                            <button
                                                onClick={() => {
                                                    disconnectWallet();
                                                    setShowWalletDropdown(
                                                        false
                                                    );
                                                }}
                                                className="w-full flex items-center space-x-2 text-error hover:bg-gray-700 rounded-lg px-3 py-2 transition-colors"
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <span>Disconnect</span>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                        </AnimatePresence>
                    </div>

                    {/* Exit */}
                    <button
                        onClick={onExitDApp}
                        className="btn-secondary rounded-lg px-4 py-2 text-sm"
                    >
                        Exit DApp
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
