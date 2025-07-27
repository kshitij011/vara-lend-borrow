import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    Zap,
    ArrowUpDown,
    PiggyBank,
    TrendingUp,
    Lock,
    Users,
    Globe,
    ChevronRight,
    Star,
    CheckCircle,
    ArrowRight,
    BarChart3,
    Coins,
    Layers,
    Award,
    Sparkles,
    Target,
    Wallet,
    Activity,
    DollarSign,
    Percent,
    Clock,
    Play,
} from "lucide-react";

interface LandingPageProps {
    onLaunchDApp: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDApp }) => {
    const [activeFeature, setActiveFeature] = useState(0);
    const [currentStat, setCurrentStat] = useState(0);

    // Auto-rotate features
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Auto-rotate stats
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStat((prev) => (prev + 1) % stats.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const features = [
        {
            icon: Zap,
            title: "Liquid Staking",
            description:
                "Stake your TVARA while maintaining liquidity. Earn up to 8.5% APY without locking your assets.",
            benefits: [
                "8.5% APY on TVARA",
                "Instant liquidity",
                "No minimum stake",
                "Auto-compounding",
            ],
            color: "from-purple-600 to-blue-600",
            bgGradient: "from-purple-500/20 to-blue-500/20",
        },
        {
            icon: ArrowUpDown,
            title: "Advanced DEX",
            description:
                "Trade with minimal slippage, deep liquidity, and MEV protection on our next-gen DEX.",
            benefits: [
                "0.3% trading fees",
                "Deep liquidity pools",
                "MEV protection",
                "Multi-chain support",
            ],
            color: "from-blue-600 to-cyan-600",
            bgGradient: "from-blue-500/20 to-cyan-500/20",
        },
        {
            icon: PiggyBank,
            title: "Lending & Borrowing",
            description:
                "Maximize capital efficiency with over-collateralized lending and flexible borrowing terms.",
            benefits: [
                "Up to 12% lending APY",
                "Over-collateralized loans",
                "Flexible terms",
                "Risk management",
            ],
            color: "from-green-600 to-emerald-600",
            bgGradient: "from-green-500/20 to-emerald-500/20",
        },
    ];

    const stats = [
        {
            label: "Total Value Locked",
            value: "$2.8B",
            icon: Lock,
            change: "+15.2%",
        },
        { label: "Active Users", value: "125K+", icon: Users, change: "+8.7%" },
        {
            label: "Transactions",
            value: "5.2M+",
            icon: Activity,
            change: "+23.1%",
        },
        {
            label: "Supported Assets",
            value: "50+",
            icon: Coins,
            change: "+12 new",
        },
    ];

    const testimonials = [
        {
            name: "Alex Chen",
            role: "DeFi Trader",
            avatar: "👨‍💼",
            quote: "DefiVault has revolutionized my DeFi strategy. The liquid staking feature alone has increased my yields by 40%.",
        },
        {
            name: "Sarah Kim",
            role: "Crypto Investor",
            avatar: "👩‍💻",
            quote: "The most intuitive DeFi platform I've used. Security is top-notch and the yields are consistently high.",
        },
        {
            name: "Marcus Rodriguez",
            role: "Portfolio Manager",
            avatar: "👨‍💼",
            quote: "Professional-grade tools with retail-friendly UX. Perfect for managing institutional DeFi positions.",
        },
    ];

    const roadmapItems = [
        {
            quarter: "Q1 2024",
            title: "Multi-chain Expansion",
            status: "completed",
        },
        {
            quarter: "Q2 2024",
            title: "Advanced Trading Tools",
            status: "completed",
        },
        {
            quarter: "Q3 2024",
            title: "Governance Token Launch",
            status: "in-progress",
        },
        { quarter: "Q4 2024", title: "Cross-chain Bridges", status: "planned" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"
                    style={{ animationDelay: "1s" }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse-slow"
                    style={{ animationDelay: "2s" }}
                ></div>
            </div>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50"
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <motion.div
                            className="flex items-center space-x-3"
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            }}
                        >
                            <div className="relative">
                                <Shield className="h-8 w-8 text-purple-400" />
                                <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg"></div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                DefiVault
                            </span>
                        </motion.div>

                        <div className="hidden md:flex items-center space-x-8">
                            {[
                                "Features",
                                "Security",
                                "Roadmap",
                                "Community",
                            ].map((item, index) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-gray-300 hover:text-white transition-colors relative group"
                                    whileHover={{ y: -2 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10,
                                    }}
                                >
                                    {item}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                                </motion.a>
                            ))}
                            <motion.button
                                onClick={onLaunchDApp}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10">
                                    Launch DApp
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <div className="text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="mb-8"
                            >
                                <motion.div
                                    className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <Sparkles className="h-4 w-4 text-purple-400" />
                                    <span className="text-purple-300 text-sm font-medium">
                                        Next-Gen DeFi Protocol
                                    </span>
                                </motion.div>

                                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                                    The Future of
                                    <motion.span
                                        className="bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent block"
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.4,
                                            duration: 0.8,
                                        }}
                                    >
                                        Decentralized Finance
                                    </motion.span>
                                </h1>

                                <motion.p
                                    className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl leading-relaxed"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                >
                                    Unlock maximum yield potential with our
                                    comprehensive DeFi ecosystem. Stake, trade,
                                    and lend with institutional-grade security
                                    and unmatched efficiency.
                                </motion.p>
                            </motion.div>

                            <motion.div
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <motion.button
                                    onClick={onLaunchDApp}
                                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center space-x-2 group relative overflow-hidden"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10">
                                        Launch DApp
                                    </span>
                                    <ArrowRight className="h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </motion.button>

                                <motion.button
                                    className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-gray-800/50 flex items-center justify-center space-x-2 group"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                    <span>Watch Demo</span>
                                </motion.button>
                            </motion.div>

                            {/* Live Stats */}
                            <motion.div
                                className="grid grid-cols-2 md:grid-cols-4 gap-6"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.6 }}
                            >
                                <AnimatePresence mode="wait">
                                    {stats.map((stat, index) => {
                                        const Icon = stat.icon;
                                        return (
                                            <motion.div
                                                key={`${stat.label}-${index}`}
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                animate={{
                                                    opacity:
                                                        currentStat === index
                                                            ? 1
                                                            : 0.6,
                                                    scale:
                                                        currentStat === index
                                                            ? 1.05
                                                            : 1,
                                                }}
                                                transition={{ duration: 0.3 }}
                                                className="text-center"
                                            >
                                                <div
                                                    className={`bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border transition-all duration-300 ${
                                                        currentStat === index
                                                            ? "border-purple-500/50 bg-purple-500/10"
                                                            : "border-gray-700"
                                                    }`}
                                                >
                                                    <Icon className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                                                    <div className="text-xl font-bold text-white mb-1">
                                                        {stat.value}
                                                    </div>
                                                    <div className="text-gray-400 text-xs mb-1">
                                                        {stat.label}
                                                    </div>
                                                    <div className="text-success text-xs">
                                                        {stat.change}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        {/* Right Column - Interactive Demo */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
                                {/* Mock DApp Interface */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-white font-semibold">
                                            Portfolio Overview
                                        </h3>
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-green-400 text-sm">
                                                Live
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-800/50 rounded-lg p-4">
                                            <div className="text-gray-400 text-sm">
                                                Total Value
                                            </div>
                                            <div className="text-2xl font-bold text-white">
                                                $25,847
                                            </div>
                                            <div className="text-success text-sm">
                                                +12.5%
                                            </div>
                                        </div>
                                        <div className="bg-gray-800/50 rounded-lg p-4">
                                            <div className="text-gray-400 text-sm">
                                                APY
                                            </div>
                                            <div className="text-2xl font-bold text-white">
                                                8.5%
                                            </div>
                                            <div className="text-purple-400 text-sm">
                                                Staking
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-800/30 rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-white">
                                                TVARA Staking
                                            </span>
                                            <span className="text-purple-400">
                                                12.5 TVARA
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <motion.div
                                                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: "75%" }}
                                                transition={{
                                                    delay: 1.2,
                                                    duration: 1.5,
                                                }}
                                            ></motion.div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <motion.div
                                    className="absolute -top-4 -right-4 bg-purple-500/20 rounded-full p-3"
                                    animate={{ y: [-10, 10, -10] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                    }}
                                >
                                    <Zap className="h-6 w-6 text-purple-400" />
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-4 -left-4 bg-blue-500/20 rounded-full p-3"
                                    animate={{ y: [10, -10, 10] }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                    }}
                                >
                                    <TrendingUp className="h-6 w-6 text-blue-400" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section
                id="features"
                className="py-20 px-6 relative"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Powerful DeFi Features
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Experience the next generation of decentralized
                            finance with our comprehensive suite of tools
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            const isActive = activeFeature === index;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: index * 0.2,
                                        duration: 0.8,
                                    }}
                                    className={`relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border transition-all duration-500 cursor-pointer group ${
                                        isActive
                                            ? "border-purple-500/50 bg-purple-500/10 scale-105"
                                            : "border-gray-700 hover:border-gray-600"
                                    }`}
                                    onMouseEnter={() => setActiveFeature(index)}
                                    whileHover={{ y: -5 }}
                                >
                                    {/* Background Gradient */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`}
                                    ></div>

                                    <div className="relative z-10">
                                        <motion.div
                                            className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                                            whileHover={{ rotate: 5 }}
                                        >
                                            <Icon className="h-8 w-8 text-white" />
                                        </motion.div>

                                        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors">
                                            {feature.title}
                                        </h3>

                                        <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors">
                                            {feature.description}
                                        </p>

                                        <ul className="space-y-3">
                                            {feature.benefits.map(
                                                (benefit, benefitIndex) => (
                                                    <motion.li
                                                        key={benefitIndex}
                                                        className="flex items-center space-x-3"
                                                        initial={{
                                                            opacity: 0,
                                                            x: -20,
                                                        }}
                                                        whileInView={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        viewport={{
                                                            once: true,
                                                        }}
                                                        transition={{
                                                            delay:
                                                                index * 0.2 +
                                                                benefitIndex *
                                                                    0.1 +
                                                                0.5,
                                                        }}
                                                    >
                                                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                                                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors">
                                                            {benefit}
                                                        </span>
                                                    </motion.li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                    {/* Active Indicator */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.div
                                                initial={{
                                                    scale: 0,
                                                    opacity: 0,
                                                }}
                                                animate={{
                                                    scale: 1,
                                                    opacity: 1,
                                                }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                className="absolute top-4 right-4 w-3 h-3 bg-purple-400 rounded-full"
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Security Section */}
            <section
                id="security"
                className="py-20 px-6 bg-gray-900/50 relative"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Security First
                            </h2>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                Your assets are protected by industry-leading
                                security measures and battle-tested smart
                                contracts.
                            </p>
                            <div className="space-y-6">
                                {[
                                    {
                                        icon: Shield,
                                        text: "Multi-signature wallet integration",
                                    },
                                    {
                                        icon: Award,
                                        text: "Audited by top security firms",
                                    },
                                    {
                                        icon: Lock,
                                        text: "Insurance coverage up to $100M",
                                    },
                                    {
                                        icon: Activity,
                                        text: "Real-time monitoring and alerts",
                                    },
                                ].map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.div
                                            key={index}
                                            className="flex items-center space-x-4 group"
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{
                                                delay: index * 0.1,
                                                duration: 0.6,
                                            }}
                                            whileHover={{ x: 10 }}
                                        >
                                            <div className="bg-green-500/20 p-3 rounded-lg group-hover:bg-green-500/30 transition-colors">
                                                <Icon className="h-6 w-6 text-green-400" />
                                            </div>
                                            <span className="text-gray-300 group-hover:text-white transition-colors">
                                                {item.text}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-8 border border-purple-500/30 backdrop-blur-sm">
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        {
                                            icon: Shield,
                                            label: "Uptime",
                                            value: "99.9%",
                                            color: "text-green-400",
                                        },
                                        {
                                            icon: Lock,
                                            label: "Funds Lost",
                                            value: "$0",
                                            color: "text-blue-400",
                                        },
                                        {
                                            icon: Star,
                                            label: "Security Rating",
                                            value: "5/5",
                                            color: "text-yellow-400",
                                        },
                                        {
                                            icon: Users,
                                            label: "Support",
                                            value: "24/7",
                                            color: "text-purple-400",
                                        },
                                    ].map((stat, index) => {
                                        const Icon = stat.icon;
                                        return (
                                            <motion.div
                                                key={index}
                                                className="bg-gray-800/50 rounded-xl p-6 text-center group hover:bg-gray-800/70 transition-colors"
                                                initial={{
                                                    opacity: 0,
                                                    scale: 0.8,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    scale: 1,
                                                }}
                                                viewport={{ once: true }}
                                                transition={{
                                                    delay: index * 0.1,
                                                    duration: 0.6,
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <Icon
                                                    className={`h-8 w-8 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform`}
                                                />
                                                <div className="text-2xl font-bold text-white mb-1">
                                                    {stat.value}
                                                </div>
                                                <div className="text-gray-400 text-sm">
                                                    {stat.label}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Trusted by DeFi Leaders
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Join thousands of users who trust DefiVault with
                            their digital assets
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: index * 0.2,
                                    duration: 0.8,
                                }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="text-3xl">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-gray-400 text-sm">
                                            {testimonial.role}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-gray-300 italic">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex text-yellow-400 mt-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-4 w-4 fill-current"
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Roadmap Section */}
            <section
                id="roadmap"
                className="py-20 px-6 bg-gray-900/50"
            >
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Development Roadmap
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Our journey to revolutionize decentralized finance
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>

                        <div className="space-y-12">
                            {roadmapItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    className={`flex items-center ${
                                        index % 2 === 0
                                            ? "flex-row"
                                            : "flex-row-reverse"
                                    }`}
                                    initial={{
                                        opacity: 0,
                                        x: index % 2 === 0 ? -50 : 50,
                                    }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: index * 0.2,
                                        duration: 0.8,
                                    }}
                                >
                                    <div
                                        className={`w-5/12 ${
                                            index % 2 === 0
                                                ? "text-right pr-8"
                                                : "text-left pl-8"
                                        }`}
                                    >
                                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 mb-3">
                                                {item.quarter}
                                            </p>
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                                    item.status === "completed"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : item.status ===
                                                          "in-progress"
                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                        : "bg-gray-500/20 text-gray-400"
                                                }`}
                                            >
                                                {item.status === "completed"
                                                    ? "Completed"
                                                    : item.status ===
                                                      "in-progress"
                                                    ? "In Progress"
                                                    : "Planned"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Timeline Node */}
                                    <div className="relative z-10 w-2/12 flex justify-center">
                                        <div
                                            className={`w-6 h-6 rounded-full border-4 ${
                                                item.status === "completed"
                                                    ? "bg-green-500 border-green-400"
                                                    : item.status ===
                                                      "in-progress"
                                                    ? "bg-yellow-500 border-yellow-400"
                                                    : "bg-gray-500 border-gray-400"
                                            }`}
                                        ></div>
                                    </div>

                                    <div className="w-5/12"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 relative">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Start Your DeFi Journey?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Join the future of finance and start earning today
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <motion.button
                                onClick={onLaunchDApp}
                                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 rounded-xl font-semibold text-xl transition-all duration-300 flex items-center justify-center space-x-3 group relative overflow-hidden"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Wallet className="h-6 w-6 group-hover:scale-110 transition-transform" />
                                <span className="relative z-10">
                                    Launch DApp Now
                                </span>
                                <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.button>
                        </div>

                        <div className="flex items-center justify-center space-x-8 text-gray-400">
                            <div className="flex items-center space-x-2">
                                <Shield className="h-5 w-5" />
                                <span>Secure</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Zap className="h-5 w-5" />
                                <span>Fast</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Target className="h-5 w-5" />
                                <span>Reliable</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800 py-12 px-6 bg-gray-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <Shield className="h-8 w-8 text-purple-400" />
                                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    DefiVault
                                </span>
                            </div>
                            <p className="text-gray-400 mb-4">
                                The most trusted DeFi protocol for staking,
                                trading, and lending.
                            </p>
                            <div className="flex space-x-4">
                                {["Twitter", "Discord", "Telegram"].map(
                                    (social) => (
                                        <motion.a
                                            key={social}
                                            href="#"
                                            className="text-gray-400 hover:text-white transition-colors"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <Globe className="h-5 w-5" />
                                        </motion.a>
                                    )
                                )}
                            </div>
                        </div>

                        {[
                            {
                                title: "Protocol",
                                links: [
                                    "Governance",
                                    "Documentation",
                                    "Audits",
                                    "Bug Bounty",
                                ],
                            },
                            {
                                title: "Community",
                                links: [
                                    "Discord",
                                    "Twitter",
                                    "Telegram",
                                    "Blog",
                                ],
                            },
                            {
                                title: "Support",
                                links: [
                                    "Help Center",
                                    "Contact Us",
                                    "Terms of Service",
                                    "Privacy Policy",
                                ],
                            },
                        ].map((section, index) => (
                            <div key={index}>
                                <h3 className="text-white font-semibold mb-4">
                                    {section.title}
                                </h3>
                                <ul className="space-y-2">
                                    {section.links.map((link) => (
                                        <li key={link}>
                                            <motion.a
                                                href="#"
                                                className="text-gray-400 hover:text-white transition-colors"
                                                whileHover={{ x: 5 }}
                                            >
                                                {link}
                                            </motion.a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 DefiVault. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
