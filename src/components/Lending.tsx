// @ts-nocheck

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useStore } from "../store/useStore";
import { useLending } from "../hooks/useLending";
import { toast } from "react-toastify";

import { motion, AnimatePresence } from "framer-motion";
import {
    PiggyBank,
    TrendingUp,
    AlertTriangle,
    Shield,
    DollarSign,
    Plus,
    Minus,
    Eye,
    EyeOff,
    Info,
    ArrowUpDown,
    Wallet,
    Clock,
    Target,
    Activity,
    CheckCircle,
    X,
    RefreshCw,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

// --- Helper Functions ---

/**
 * Formats a number into a currency string (e.g., 1.2M, 2.5B).
 * @param value The number to format.
 * @returns A formatted string.
 */
const formatCurrency = (value: number): string => {
    if (value >= 1_000_000_000) {
        return `$${(value / 1_000_000_000).toFixed(2)}B`;
    }
    if (value >= 1_000_000) {
        return `$${(value / 1_000_000).toFixed(2)}M`;
    }
    if (value >= 1_000) {
        return `$${(value / 1_000).toFixed(1)}K`;
    }
    return `$${value?.toFixed(2) || "0.00"}`;
};

/**
 * Converts a human-readable number string to a 12-decimal WAD value (as a bigint).
 * @param amount The string amount from an input field.
 * @returns The amount in WAD format.
 */
const toWad = (amount: string): bigint => {
    if (!amount || isNaN(parseFloat(amount))) {
        return 0n;
    }
    // Only allow up to 12 decimals, and ensure integer math for BigInt
    const parts = amount.split(".");
    const whole = BigInt(parts[0] || 0);
    let fractional = parts[1] || "";
    if (fractional.length > 12) {
        fractional = fractional.substring(0, 12);
    } else {
        fractional = fractional.padEnd(12, "0");
    }
    // Remove any non-digit characters from fractional
    fractional = fractional.replace(/\D/g, "");
    return whole * 1_000_000_000_000n + BigInt(fractional);
};

/**
 * Converts a 12-decimal WAD value (number, bigint, or hex string) to a human-readable number.
 * Handles hex strings for large numbers like healthFactor.
 * @param wadValue The WAD value from the contract.
 * @returns The human-readable number.
 */
const fromWad = (
    wadValue: number | bigint | string | undefined,
    decimals: number = 12
): number => {
    if (typeof wadValue === "undefined") return 0;

    let valueAsBigInt: bigint;
    if (typeof wadValue === "bigint") {
        valueAsBigInt = wadValue;
    } else if (typeof wadValue === "string" && wadValue.startsWith("0x")) {
        try {
            valueAsBigInt = BigInt(wadValue);
        } catch (e) {
            console.warn("Invalid hex string for fromWad:", wadValue);
            return 0;
        }
    } else {
        valueAsBigInt = BigInt(Math.floor(Number(wadValue)));
    }

    if (valueAsBigInt >= BigInt("0xffffffffffffffffffffffffffffffff") / 2n) {
        return Infinity;
    }

    return Number(valueAsBigInt) / 10 ** decimals;
};

const Modal = ({ isOpen, onClose, title, children }: any) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-surface border border-gray-700 rounded-xl p-6 w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-semibold text-white">
                            {title}
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                    {children}
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

const Lending = () => {
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [modalTitle, setModalTitle] = useState("");
    const [modalAction, setModalAction] = useState<
        "supply" | "withdraw" | "borrow" | "repay"
    >("supply");
    const [amount, setAmount] = useState("");
    const [showBorrowers, setShowBorrowers] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);

    const {
        walletAddress,
        connectWallet,
        program,
        loading,
        txStatus,
        userInfo,
        fetchUserInfo,
        setTxStatus,
        borrowersInfo, // <-- Use directly
        lend,
        borrow,
        depositCollateral,
        repay,
        withdraw,
        getAllBorrowersInfo,
    } = useStore();

    const { marketData } = useLending();

    // Memoize and format borrowersInfo
    const borrowersInfoArray = useMemo(() => {
        return Object.entries(borrowersInfo || {}).map(
            ([address, data]: [string, any]) => ({ address, ...data })
        );
    }, [borrowersInfo]);

    console.log("borrowersInfo", borrowersInfo);
    // Fetch user and market info on mount and when wallet connects
    useEffect(() => {
        if (walletAddress && program) {
            fetchUserInfo();
        }
    }, [walletAddress, program, fetchUserInfo]);

    const handleRefresh = useCallback(() => {
        if (walletAddress && program) {
            console.log("walletAddress", walletAddress);
            fetchUserInfo();
            if (showBorrowers) {
                getAllBorrowersInfo();
            }
            setTxStatus("Data refreshed!");
            setTimeout(() => setTxStatus(""), 2000);
        }
    }, [
        walletAddress,
        program,
        fetchUserInfo,
        getAllBorrowersInfo,
        showBorrowers,
        setTxStatus,
    ]);

    // Use useEffect to refresh borrowers only when `showBorrowers` changes to true
    useEffect(() => {
        if (showBorrowers && walletAddress && program) {
            console.log("Calling getAllBorrowersInfo");
            getAllBorrowersInfo();
        }
    }, [showBorrowers, walletAddress, program, getAllBorrowersInfo]);

    const netApy = useMemo(() => {
        if (!userInfo || fromWad(userInfo.lenderBalance) <= 0) return 0;
        const interest = fromWad(userInfo.lenderInterestEarned);
        const balance = fromWad(userInfo.lenderBalance);
        // Simple instantaneous APY. For real-world, a time-based calculation is needed.
        return (interest / balance) * 100;
    }, [userInfo]);

    const healthFactor = useMemo(
        () => (userInfo ? fromWad(userInfo.healthFactor) : 0),
        [userInfo]
    );
    const borrowLimit = useMemo(
        () => (userInfo ? fromWad(userInfo.borrowLimit) : 0),
        [userInfo]
    );
    const totalDebt = useMemo(
        () => (userInfo ? fromWad(userInfo.debt) : 0),
        [userInfo]
    );

    const borrowLimitUsedPercentage = useMemo(() => {
        if (borrowLimit === Infinity || borrowLimit <= 0) return 0; // Handle infinite borrow limit (no debt)
        if (totalDebt <= 0) return 0; // No debt, 0% used
        return Math.min(100, (totalDebt / borrowLimit) * 100); // Cap at 100%
    }, [totalDebt, borrowLimit]);

    const getHealthFactorColor = (factor: number) => {
        if (factor === Infinity) return "text-green-400";
        if (factor > 2) return "text-green-400";
        if (factor > 1.5) return "text-yellow-400";
        if (factor > 1.1) return "text-orange-400";
        return "text-red-400";
    };

    const getHealthFactorTag = (factor: number) => {
        if (factor === Infinity)
            return { text: "Safe", color: "bg-green-500/20 text-green-400" };
        if (factor > 1.5)
            return { text: "Healthy", color: "bg-green-500/20 text-green-400" };
        if (factor > 1.1)
            return { text: "Risk", color: "bg-yellow-500/20 text-yellow-400" };
        return { text: "Critical", color: "bg-red-500/20 text-red-400" };
    };

    const openModal = (action: "supply" | "withdraw" | "borrow" | "repay") => {
        if (!walletAddress) {
            setTxStatus("Please connect your wallet first.");
            setTimeout(() => setTxStatus(""), 3000);
            return;
        }
        setModalAction(action);
        const titles = {
            supply: "Supply TVARA",
            withdraw: "Withdraw TVARA",
            borrow: "Borrow VFT",
            repay: "Repay VFT",
        };
        setModalTitle(titles[action]);
        if (activeModal !== "action") {
            setActiveModal("action");
            setAmount("");
        }
    };

    const handleModalSubmit = async () => {
        // Basic input validation
        if (!amount.match(/^[\d.]{1,}$/) || isNaN(Number(amount))) {
            toast.error(
                "❌ Please enter a valid number with up to 12 decimals."
            );
            return;
        }
        const amountWad = toWad(amount);
        if (amountWad <= 0n) {
            toast.error("❌ Please enter a valid amount greater than 0.");
            return;
        }

        setTxStatus("Processing transaction..."); // Set a generic status while loading
        useStore.setState({ loading: true });
        try {
            switch (modalAction) {
                case "supply":
                    await lend(Number(amount));
                    toast.success("Supply successful!");
                    setTxStatus("Supply successful!");
                    break;
                case "withdraw":
                    await withdraw(Number(amount));
                    toast.success("Withdraw successful!");
                    setTxStatus("Withdraw successful!");
                    break;
                case "borrow":
                    await depositCollateral(Number(amount));
                    await borrow();
                    toast.success("Borrow successful!");
                    setTxStatus("Borrow successful!");
                    break;
                case "repay":
                    await repay(Number(amount));
                    toast.success("Repay successful!");
                    setTxStatus("Repay successful!");
                    break;
            }

            setActiveModal(null);
            setAmount("");
            fetchUserInfo();
            if (showBorrowers) getAllBorrowersInfo();
        } catch (e: any) {
            toast.error(`${modalAction} failed:`, e);
        } finally {
            useStore.setState({ loading: false });
        }
    };

    // Moved outside lending component
    // const Modal = ({ isOpen, onClose, title, children }: any) => (
    //     <AnimatePresence>
    //         {isOpen && (
    //             <motion.div
    //                 initial={{ opacity: 0 }}
    //                 animate={{ opacity: 1 }}
    //                 exit={{ opacity: 0 }}
    //                 className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    //                 onClick={onClose}
    //             >
    //                 <motion.div
    //                     initial={{ scale: 0.9, opacity: 0 }}
    //                     animate={{ scale: 1, opacity: 1 }}
    //                     exit={{ scale: 0.9, opacity: 0 }}
    //                     className="bg-surface border border-gray-700 rounded-xl p-6 w-full max-w-md"
    //                     onClick={(e) => e.stopPropagation()}
    //                 >
    //                     <div className="flex items-center justify-between mb-6">
    //                         <h3 className="text-xl font-semibold text-white">
    //                             {title}
    //                         </h3>
    //                         <button
    //                             onClick={onClose}
    //                             className="text-gray-400 hover:text-white transition-colors"
    //                         >
    //                             <X className="h-5 w-5" />
    //                         </button>
    //                     </div>
    //                     {children}
    //                 </motion.div>
    //             </motion.div>
    //         )}
    //     </AnimatePresence>
    // );

    return (
        <div className="space-y-6">
            {/* --- Header & Wallet Connection --- */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">
                    Lending Dashboard
                </h1>
                {walletAddress ? (
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleRefresh}
                            disabled={loading}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors disabled:opacity-50"
                        >
                            <RefreshCw
                                className={`h-4 w-4 ${
                                    loading ? "animate-spin" : ""
                                }`}
                            />
                            Refresh
                        </button>
                        <div className="bg-surface px-4 py-2 border border-gray-700 rounded-lg text-sm text-gray-300">
                            <span className="font-mono">
                                {walletAddress.substring(0, 6)}...
                                {walletAddress.substring(
                                    walletAddress.length - 4
                                )}
                            </span>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={connectWallet}
                        className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                        <Wallet className="h-5 w-5" /> Connect Wallet
                    </button>
                )}
            </div>

            {/* --- Status Messages --- */}
            {!walletAddress && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-4 bg-yellow-500/10 border border-yellow-500/30 flex items-center gap-3"
                >
                    <AlertTriangle className="h-6 w-6 text-yellow-400" />
                    <p className="text-yellow-300">
                        Please connect your wallet to interact with the
                        protocol.
                    </p>
                </motion.div>
            )}

            {loading && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-4 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center gap-3"
                >
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                    <span className="text-blue-300">
                        {txStatus || "Processing transaction..."}
                    </span>
                </motion.div>
            )}

            {txStatus && !loading && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-4 bg-green-500/10 border border-green-500/30 flex items-center justify-between"
                >
                    <div className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        <span className="text-green-300">{txStatus}</span>
                    </div>
                    <button
                        onClick={() => setTxStatus("")}
                        className="text-green-400 hover:text-green-300"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </motion.div>
            )}

            {/* --- Top Stats --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <div className="card p-6">
                    <p className="text-gray-400 text-sm mb-2">
                        Total Value Locked
                    </p>
                    <p className="text-3xl font-bold text-white">
                        {formatCurrency(fromWad(marketData?.totalLiquidity))}
                    </p>
                </div>
                <div className="card p-6">
                    <p className="text-gray-400 text-sm mb-2">Total Borrowed</p>
                    {/* Sum of all borrowers' debt for total borrowed amount */}
                    <p className="text-3xl font-bold text-white">
                        {formatCurrency(
                            borrowersInfoArray.reduce(
                                (sum, b) => sum + fromWad(b.debt),
                                0
                            )
                        )}
                    </p>
                </div>
                <div className="card p-6">
                    <p className="text-gray-400 text-sm mb-2">
                        Utilization Rate
                    </p>
                    <p className="text-3xl font-bold text-white">
                        {/* Convert hex utilization rate to number if necessary, then format */}
                        {marketData?.utilizationRate
                            ? (
                                  fromWad(marketData.utilizationRate) * 100
                              ).toFixed(2)
                            : "0.00"}
                        %
                    </p>
                </div>
                <div className="card p-6">
                    <p className="text-gray-400 text-sm mb-2">Your Net APY</p>
                    <p className="text-3xl font-bold text-white">
                        {netApy.toFixed(2)}%
                    </p>
                </div>
            </motion.div>

            {/* --- Main Interaction Area: Supply & Borrow --- */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* --- Supply (TVARA) --- */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card p-6 space-y-4"
                >
                    <h3 className="text-xl font-semibold text-white">
                        Supply TVARA
                    </h3>
                    <div className="bg-gray-900/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center text-sm text-gray-400 mb-1">
                            <span>Your Supplied Balance</span>
                            <span>Interest Earned</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-mono text-white">
                                {fromWad(
                                    userInfo?.lender_balance
                                ).toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                })}{" "}
                                TVARA
                            </span>
                            <span className="text-lg font-mono text-green-400">
                                +
                                {fromWad(
                                    userInfo?.lender_interest_earned,
                                    9
                                ).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 3,
                                })}{" "}
                                TVARA
                            </span>
                        </div>
                    </div>
                    <div className="bg-gray-900/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center text-sm text-gray-400 mb-1">
                            <span>Supply APY</span>
                            <span>Your Collateral</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-mono text-green-400">
                                {(marketData?.borrowRate || 0).toFixed(2)}%
                            </span>
                            <span className="text-lg font-mono text-white">
                                {fromWad(userInfo?.collateral).toLocaleString(
                                    undefined,
                                    { maximumFractionDigits: 2 }
                                )}{" "}
                                TVARA
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => openModal("supply")}
                            disabled={!walletAddress}
                            className="w-full bg-success hover:bg-success/80 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
                        >
                            <Plus className="h-5 w-5" /> Supply
                        </button>
                        <button
                            onClick={() => openModal("withdraw")}
                            disabled={
                                !walletAddress ||
                                fromWad(userInfo?.lender_balance) <= 0
                            }
                            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Minus className="h-5 w-5" /> Withdraw
                        </button>
                    </div>
                </motion.div>

                {/* --- Borrow (VFT) --- */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card p-6 space-y-4"
                >
                    <h3 className="text-xl font-semibold text-white">
                        Borrow VFT
                    </h3>
                    <div className="bg-gray-900/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center text-sm text-gray-400 mb-1">
                            <span>Your Outstanding Debt</span>
                            <span>Borrow APY</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-2xl font-mono text-white">
                                {totalDebt.toLocaleString(undefined, {
                                    maximumFractionDigits: 2,
                                })}{" "}
                                VFT
                            </span>
                            <span className="text-lg font-mono text-red-400">
                                {(marketData?.borrowRate || 0).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                    {/* Health Factor & Borrow Limit */}
                    <div className="bg-gray-900/30 p-4 rounded-lg space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300 font-medium">
                                Health Factor
                            </span>
                            <span
                                className={`px-2 py-1 text-sm rounded ${
                                    getHealthFactorTag(healthFactor).color
                                }`}
                            >
                                {healthFactor === Infinity
                                    ? "∞"
                                    : healthFactor.toFixed(2)}{" "}
                                ({getHealthFactorTag(healthFactor).text})
                            </span>
                        </div>
                        <div>
                            <div className="flex justify-between items-center text-sm text-gray-400 mb-1">
                                <span>Borrow Limit</span>
                                <span>
                                    {borrowLimitUsedPercentage.toFixed(1)}% Used
                                </span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                                    style={{
                                        width: `${borrowLimitUsedPercentage}%`,
                                    }}
                                ></div>
                            </div>
                            <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                                <span>{formatCurrency(totalDebt)}</span>
                                <span>{formatCurrency(borrowLimit)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => openModal("borrow")}
                            disabled={!walletAddress} // Disable if health factor is too low
                            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors disabled:bg-red-900/50 disabled:text-red-500/50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Plus className="h-5 w-5" /> Borrow
                        </button>
                        <button
                            onClick={() => openModal("repay")}
                            disabled={!walletAddress || totalDebt <= 0}
                            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Minus className="h-5 w-5" /> Repay
                        </button>
                    </div>
                </motion.div>
            </div>

            {/* --- Borrower Insights (Optional) --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="card"
            >
                <button
                    onClick={() => setShowBorrowers(!showBorrowers)}
                    className="w-full p-4 flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                >
                    <h3 className="text-lg font-semibold text-white">
                        Borrower Insights
                    </h3>
                    {showBorrowers ? <ChevronUp /> : <ChevronDown />}
                </button>
                <AnimatePresence>
                    {showBorrowers && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-6">
                                {loading && !borrowersInfoArray.length ? (
                                    <p className="text-gray-400">
                                        Loading borrower data...
                                    </p>
                                ) : borrowersInfoArray.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="border-b border-gray-700">
                                                    <th className="text-left text-gray-400 p-2 font-medium">
                                                        Borrower
                                                    </th>
                                                    <th className="text-right text-gray-400 p-2 font-medium">
                                                        Debt (VFT)
                                                    </th>
                                                    <th className="text-right text-gray-400 p-2 font-medium">
                                                        Collateral (TVARA)
                                                    </th>
                                                    <th className="text-right text-gray-400 p-2 font-medium">
                                                        Health Factor
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {borrowersInfoArray.map(
                                                    (borrower, index) => (
                                                        <tr
                                                            key={index}
                                                            className="border-b border-gray-800 hover:bg-gray-800/30"
                                                        >
                                                            <td className="p-2 font-mono text-gray-300">{`${borrower.address.substring(
                                                                0,
                                                                8
                                                            )}...${borrower.address.substring(
                                                                borrower.address
                                                                    .length - 6
                                                            )}`}</td>
                                                            <td className="text-right p-2 font-mono text-white">
                                                                {fromWad(
                                                                    borrower.debt
                                                                ).toLocaleString(
                                                                    undefined,
                                                                    {
                                                                        maximumFractionDigits: 2,
                                                                    }
                                                                )}
                                                            </td>
                                                            <td className="text-right p-2 font-mono text-white">
                                                                {fromWad(
                                                                    borrower.collateral
                                                                ).toLocaleString(
                                                                    undefined,
                                                                    {
                                                                        maximumFractionDigits: 2,
                                                                    }
                                                                )}
                                                            </td>
                                                            <td
                                                                className={`text-right p-2 font-mono ${getHealthFactorColor(
                                                                    fromWad(
                                                                        borrower.health_factor
                                                                    )
                                                                )}`}
                                                            >
                                                                {fromWad(
                                                                    borrower.health_factor
                                                                ) === Infinity
                                                                    ? "∞"
                                                                    : borrower.health_factor.toFixed(
                                                                          3
                                                                      )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-gray-400">
                                        No active borrowers found.
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* --- Action Modal --- */}
            <Modal
                isOpen={activeModal === "action"}
                onClose={() => {
                    if (!loading) setActiveModal(null);
                }} // Prevent closing during loading
                title={modalTitle}
            >
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Amount
                        </label>
                        <div className="relative">
                            <input
                                type="text" // Changed to text to allow for more flexible input patterns before conversion
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.0"
                                className="w-full bg-gray-900/30 border border-gray-600 rounded-lg pl-4 pr-24 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                                <button className="text-primary-500 text-sm hover:text-primary-400">
                                    MAX
                                </button>
                                <span className="text-gray-400">
                                    {modalAction === "supply" ||
                                    modalAction === "withdraw"
                                        ? "TVARA"
                                        : "VFT"}
                                </span>
                            </div>
                        </div>
                        {/* Add available balances here */}
                        {userInfo && (
                            <p className="text-gray-400 text-sm mt-2">
                                Available:{" "}
                                {modalAction === "supply" ||
                                modalAction === "withdraw"
                                    ? `${
                                          userInfo.userBalance
                                              ? fromWad(
                                                    userInfo.userBalance
                                                ).toLocaleString(undefined, {
                                                    maximumFractionDigits: 2,
                                                })
                                              : "0"
                                      } TVARA`
                                    : `${
                                          userInfo.vftBalance
                                              ? fromWad(
                                                    userInfo.vftBalance
                                                ).toLocaleString(undefined, {
                                                    maximumFractionDigits: 2,
                                                })
                                              : "0"
                                      } VFT`}
                            </p>
                        )}
                    </div>

                    <div className="bg-gray-800/30 rounded-lg p-4 text-sm space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300">
                                Transaction Fee
                            </span>
                            <span className="text-white">~0.001 VARA</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-300">
                                New Health Factor
                            </span>
                            <span
                                className={`font-medium ${getHealthFactorColor(
                                    healthFactor
                                )}`}
                            >
                                {healthFactor === Infinity
                                    ? "∞"
                                    : healthFactor.toFixed(2)}{" "}
                                → (will update)
                            </span>
                        </div>
                    </div>

                    {modalAction === "borrow" && (
                        <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                            <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="text-yellow-300 font-medium">
                                    Risk Warning
                                </h4>
                                <p className="text-yellow-400/80 text-sm">
                                    Borrowing assets increases your liquidation
                                    risk. Keep your Health Factor well above 1.0
                                    to remain safe.
                                </p>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={handleModalSubmit}
                        disabled={loading} // Disable button if loading
                        className="w-full py-3 rounded-lg font-medium text-white transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-60 capitalize bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                    >
                        {loading ? "Processing..." : modalAction}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Lending;
