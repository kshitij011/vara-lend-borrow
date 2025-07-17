// @ts-nocheck

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LandingPage from "./components/LandingPage";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard";
import LiquidStaking from "./components/LiquidStaking";
import DEX from "./components/DEX";
import Lending from "./components/Lending";
import Portfolio from "./components/Portfolio/Portfolio";
// import Settings from './components/Settings/Settings';
import { useStore } from "./store/useStore";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [showDApp, setShowDApp] = useState(false);
    const [activeSection, setActiveSection] = useState("dashboard");
    const { sidebarCollapsed } = useStore();

    const renderContent = () => {
        const components = {
            dashboard: Dashboard,
            staking: LiquidStaking,
            dex: DEX,
            lending: Lending,
            portfolio: Portfolio,
            // settings: Settings,
        };

        const Component =
            components[activeSection as keyof typeof components] || Dashboard;

        return (
            <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <Component />
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                />
            </motion.div>
        );
    };

    if (!showDApp) {
        return <LandingPage onLaunchDApp={() => setShowDApp(true)} />;
    }

    return (
        <div className="min-h-screen bg-background">
            <Sidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <div
                className={`transition-all duration-300 ${
                    sidebarCollapsed ? "ml-20" : "ml-72"
                }`}
            >
                <Header
                    activeSection={activeSection}
                    onExitDApp={() => setShowDApp(false)}
                />

                <main className="p-6">
                    <AnimatePresence mode="wait">
                        {renderContent()}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}

export default App;
