import React, { useState } from "react";
import { Zap, TrendingUp, Clock, Shield, Plus, Minus } from "lucide-react";

const LiquidStaking = () => {
    const [stakeAmount, setStakeAmount] = useState("");
    const [selectedValidator, setSelectedValidator] = useState("validator1");

    const validators = [
        {
            id: "validator1",
            name: "VARA Foundation",
            apy: "8.5%",
            fee: "5%",
            status: "Active",
        },
        {
            id: "validator2",
            name: "VARA Staking Pool",
            apy: "8.2%",
            fee: "6%",
            status: "Active",
        },
        {
            id: "validator3",
            name: "VARA Validator Network",
            apy: "8.7%",
            fee: "4.5%",
            status: "Active",
        },
    ];

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">
                                Total Staked
                            </p>
                            <p className="text-2xl font-bold text-white">
                                12.5 TVARA
                            </p>
                            <p className="text-purple-400 text-sm">
                                ≈ $25,847.32
                            </p>
                        </div>
                        <Zap className="h-8 w-8 text-purple-400" />
                    </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">
                                Rewards Earned
                            </p>
                            <p className="text-2xl font-bold text-white">
                                0.75 TVARA
                            </p>
                            <p className="text-green-400 text-sm flex items-center">
                                <TrendingUp className="h-4 w-4 mr-1" />
                                +8.5% APY
                            </p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-400" />
                    </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">
                                Unstaking Period
                            </p>
                            <p className="text-2xl font-bold text-white">
                                7 Days
                            </p>
                            <p className="text-blue-400 text-sm">
                                Next epoch in 2h
                            </p>
                        </div>
                        <Clock className="h-8 w-8 text-blue-400" />
                    </div>
                </div>
            </div>

            {/* Staking Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Stake TVARA
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Amount to Stake
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={stakeAmount}
                                    onChange={(e) =>
                                        setStakeAmount(e.target.value)
                                    }
                                    placeholder="0.0"
                                    className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <span className="text-gray-400 text-sm">
                                        TVARA
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-400 text-sm mt-1">
                                Available: 5.24 TVARA
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Select Validator
                            </label>
                            <select
                                value={selectedValidator}
                                onChange={(e) =>
                                    setSelectedValidator(e.target.value)
                                }
                                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                {validators.map((validator) => (
                                    <option
                                        key={validator.id}
                                        value={validator.id}
                                    >
                                        {validator.name} - {validator.apy} APY
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="bg-gray-900/30 rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-300">
                                    You will receive
                                </span>
                                <span className="text-white font-medium">
                                    {stakeAmount || "0.0"} stTVARA
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">
                                    Estimated APY
                                </span>
                                <span className="text-green-400 font-medium">
                                    8.5%
                                </span>
                            </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                            Stake TVARA
                        </button>
                    </div>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Validator Details
                    </h3>

                    {validators.map((validator) => (
                        <div
                            key={validator.id}
                            className={`p-4 rounded-lg border mb-3 cursor-pointer transition-all duration-300 ${
                                selectedValidator === validator.id
                                    ? "border-purple-500 bg-purple-500/10"
                                    : "border-gray-600 hover:border-gray-500"
                            }`}
                            onClick={() => setSelectedValidator(validator.id)}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-white font-medium">
                                    {validator.name}
                                </h4>
                                <span className="text-green-400 text-sm">
                                    {validator.status}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-400">APY</p>
                                    <p className="text-white">
                                        {validator.apy}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400">Fee</p>
                                    <p className="text-white">
                                        {validator.fee}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Staking Positions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-4">
                    Your Staking Positions
                </h3>

                <div className="space-y-4">
                    {[
                        {
                            validator: "VARA Foundation",
                            amount: "5.0 TVARA",
                            rewards: "0.35 TVARA",
                            apy: "8.5%",
                        },
                        {
                            validator: "VARA Staking Pool",
                            amount: "7.5 TVARA",
                            rewards: "0.40 TVARA",
                            apy: "8.2%",
                        },
                    ].map((position, index) => (
                        <div
                            key={index}
                            className="bg-gray-900/30 rounded-lg p-4"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <Shield className="h-5 w-5 text-purple-400" />
                                    <div>
                                        <p className="text-white font-medium">
                                            {position.validator}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            {position.apy} APY
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                        <Plus className="h-4 w-4" />
                                    </button>
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors">
                                        <Minus className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Staked Amount
                                    </p>
                                    <p className="text-white font-medium">
                                        {position.amount}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Rewards Earned
                                    </p>
                                    <p className="text-green-400 font-medium">
                                        {position.rewards}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiquidStaking;
