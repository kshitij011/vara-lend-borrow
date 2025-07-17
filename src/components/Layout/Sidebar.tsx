import React from "react";
import { motion } from "framer-motion";
import {
    BarChart3,
    Zap,
    ArrowUpDown,
    PiggyBank,
    Briefcase,
    // Settings,
    Shield,
    ChevronLeft,
    ChevronRight,
    Wallet,
} from "lucide-react";
import { useStore } from "../../store/useStore";

interface SidebarProps {
    activeSection: string;
    setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    activeSection,
    setActiveSection,
}) => {
    const {
        sidebarCollapsed,
        setSidebarCollapsed,
        isWalletConnected,
        walletAddress,
    } = useStore();

    const navigation = [
        { id: "dashboard", name: "Dashboard", icon: BarChart3 },
        // { id: 'staking', name: 'Liquid Staking', icon: Zap },
        // { id: 'dex', name: 'DEX', icon: ArrowUpDown },
        { id: "lending", name: "Lending & Borrowing", icon: PiggyBank },
        { id: "portfolio", name: "Portfolio", icon: Briefcase },
        // { id: 'settings', name: 'Settings', icon: Settings },
    ];

    return (
        <motion.div
            initial={false}
            animate={{ width: sidebarCollapsed ? 80 : 280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-40 bg-surface border-r border-gray-700 flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
                {!sidebarCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-2"
                    >
                        <Shield className="h-8 w-8 text-primary-500" />
                        <span className="text-xl font-bold text-white">
                            DefiVault
                        </span>
                    </motion.div>
                )}
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                >
                    {sidebarCollapsed ? (
                        <ChevronRight size={16} />
                    ) : (
                        <ChevronLeft size={16} />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 mt-8 px-4">
                <div className="space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeSection === item.id;

                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => setActiveSection(item.id)}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full flex items-center px-3 py-3 rounded-lg transition-all duration-200 ${
                                    isActive
                                        ? "bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg"
                                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                                }`}
                            >
                                <Icon
                                    className={`h-5 w-5 ${
                                        sidebarCollapsed ? "mx-auto" : "mr-3"
                                    }`}
                                />
                                {!sidebarCollapsed && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="font-medium"
                                    >
                                        {item.name}
                                    </motion.span>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </nav>

            {/* Wallet Status */}
            <div className="p-4 border-t border-gray-700">
                {isWalletConnected ? (
                    <div
                        className={`bg-gray-700 rounded-lg p-3 ${
                            sidebarCollapsed ? "text-center" : ""
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <div
                                className={`flex items-center ${
                                    sidebarCollapsed
                                        ? "justify-center"
                                        : "space-x-2"
                                }`}
                            >
                                <Wallet className="h-4 w-4 text-success" />
                                {!sidebarCollapsed && (
                                    <span className="text-sm text-gray-300">
                                        Connected
                                    </span>
                                )}
                            </div>
                            {!sidebarCollapsed && (
                                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                            )}
                        </div>
                        {!sidebarCollapsed && (
                            <p className="text-xs text-gray-400 mt-1 truncate">
                                {walletAddress || "0x742d...7A3B"}
                            </p>
                        )}
                    </div>
                ) : (
                    <button
                        className={`w-full btn-primary rounded-lg py-2 px-3 text-sm ${
                            sidebarCollapsed ? "px-2" : ""
                        }`}
                    >
                        {sidebarCollapsed ? (
                            <Wallet className="h-4 w-4 mx-auto" />
                        ) : (
                            "Connect Wallet"
                        )}
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default Sidebar;
