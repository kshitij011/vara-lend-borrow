// @ts-nocheck

import { create } from "zustand";
import { GearApi } from "@gear-js/api";
import {
    web3Enable,
    web3Accounts,
    web3FromSource,
} from "@polkadot/extension-dapp";
import { decodeAddress } from "@polkadot/util-crypto";
import { u8aToHex } from "@polkadot/util";
import { SailsProgram } from "../contracts/lending/lib";

const PROGRAM_ID =
    "0x48460de43ba25e9e2ea8960c424a7993c0f3c78c10e0418a6f2eb9d0d73b9abb";
const NODE_ENDPOINT = "wss://testnet.vara.network";

type StoreState = {
    // UI
    theme: "light" | "dark";
    sidebarCollapsed: boolean;
    selectedNetwork: string;
    pendingTransactions: any[];

    // Wallet & Contract
    isWalletConnected: boolean;
    walletAddress: string | null;
    program: SailsProgram | null;
    loading: boolean;
    txStatus: string;
    userInfo: any;
    walletSource: string | null;
    borrowersInfo: any; // <-- Add this line to initial state
    stakedAssets: any[];
    lendingPositions: any[];
    borrowPositions: any[];
    transactionHistory: any[];
    allowTransactions: boolean;

    // UI setters
    setTheme: (theme: "light" | "dark") => void;
    setSidebarCollapsed: (collapsed: boolean) => void;
    setSelectedNetwork: (network: string) => void;
    setPendingTransactions: (txs: any[]) => void;
    setTxStatus: (status: string) => void;

    // Wallet functions
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;

    // Contract functions
    lend: (amount: number) => Promise<void>;
    depositCollateral: (amount: number) => Promise<void>;
    borrow: () => Promise<void>;
    repay: (amount: number) => Promise<void>;
    withdraw: (amount: number) => Promise<void>;
    withdrawCollateral: (amount: number) => Promise<void>;
    liquidate: (target: string) => Promise<void>;
    fetchUserInfo: () => Promise<void>;
    // Add all LendingService functions
    adminWithdrawFunds: (amount: number) => Promise<void>;
    adminWithdrawTreasury: (amount: number) => Promise<void>;
    claimInterest: () => Promise<void>;
    pause: () => Promise<void>;
    resume: () => Promise<void>;
    updateTvaraPrice: (newPrice: number) => Promise<void>;
    // Getters
    getAdmin: () => Promise<any>;
    getAllBorrowersInfo: () => Promise<any>;
    getBorrowRatePerYear: () => Promise<any>;
    getCollateral: () => Promise<any>;
    getDebt: () => Promise<any>;
    getHealthFactor: () => Promise<any>;
    getLastAccrualTs: () => Promise<any>;
    getLenderBalance: () => Promise<any>;
    getLenderEarnedInterest: () => Promise<any>;
    getLenderInterestEarned: () => Promise<any>;
    getLiquidity: () => Promise<any>;
    getTotalOutstandingDebt: () => Promise<any>;
    getTotalPrincipalBorrowed: () => Promise<any>;
    getTreasuryBalance: () => Promise<any>;
    getTvaraPrice: () => Promise<any>;
    getUserAccruedInterest: () => Promise<any>;
    getUserPosition: () => Promise<any>;
    getUtilizationRate: () => Promise<any>;
    isPaused: () => Promise<any>;
    // Event subscriptions (stubs)
    subscribeToCollateralDepositedEvent: () => void;
    subscribeToBorrowedEvent: () => void;
    subscribeToRepaidEvent: () => void;
    subscribeToLiquidatedEvent: () => void;
    subscribeToLiquidityProvidedEvent: () => void;
    subscribeToLiquidityWithdrawnEvent: () => void;
    subscribeToInterestClaimedEvent: () => void;
};

export const useStore = create<StoreState>((set, get) => ({
    // UI state
    theme: "dark",
    sidebarCollapsed: false,
    selectedNetwork: "vara",
    pendingTransactions: [],
    isWalletConnected: false,
    walletAddress: null,
    program: null,
    loading: true,
    txStatus: "",
    userInfo: null,
    walletSource: null,
    borrowersInfo: {}, // <-- Add this line to initial state
    stakedAssets: [],
    lendingPositions: [],
    borrowPositions: [],
    transactionHistory: [],
    allowTransactions: true,

    setTheme: (theme) => set({ theme }),
    setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
    setSelectedNetwork: (network) => set({ selectedNetwork: network }),
    setPendingTransactions: (txs) => set({ pendingTransactions: txs }),
    setTxStatus: (status) => set({ txStatus: status }),

    connectWallet: async () => {
        const extensions = await web3Enable("vara-app");
        if (!extensions.length)
            return alert("❌ Polkadot.js extension not found");
        const accounts = await web3Accounts();
        if (accounts.length > 0) {
            set({
                isWalletConnected: true,
                walletAddress: accounts[0].address,
                walletSource: accounts[0].meta.source || "polkadot-js",
            });
        }
    },

    disconnectWallet: () => {
        set({
            isWalletConnected: false,
            walletAddress: null,
            userInfo: null,
            txStatus: "",
        });
    },

    lend: async (amount) => {
        const { walletAddress, program, walletSource, allowTransactions } =
            get();
        if (!allowTransactions) return;
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        console.log("amount", amount);
        const value = BigInt(Math.floor(amount * 1e12));
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .lend()
                .withAccount(walletAddress, { signer: injector.signer })
                .withValue(value);
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ Lend: ${msgId}` });
            await isFinalized;
            const result = await response();
            // alert('✅ Lend successful!');
        } catch (err: any) {
            console.error(err);
            // alert('❌ Lend failed: ' + err.message);
        }
    },

    depositCollateral: async (amount) => {
        const { walletAddress, program, walletSource, allowTransactions } =
            get();
        if (!allowTransactions)
            return alert("❌ Transactions are currently disabled.");
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        const value = BigInt(Math.floor(amount * 1e12));
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .depositCollateral()
                .withAccount(walletAddress, { signer: injector.signer })
                .withValue(value);
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ Collateral deposit: ${msgId}` });
            await isFinalized;
            const result = await response();
            // alert("✅ Collateral deposited!");
        } catch (err: any) {
            console.error(err);
            // alert("❌ Deposit failed: " + err.message);
        }
    },
    //borrow is not working due to contract internal problem
    borrow: async () => {
        const { walletAddress, program, walletSource, allowTransactions } =
            get();
        if (!allowTransactions) return;
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .borrow()
                .withAccount(walletAddress, { signer: injector.signer });
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ Borrow: ${msgId}` });
            await isFinalized;
            const result = await response();
            // alert('✅ Borrow successful!');
        } catch (err: any) {
            console.error(err);
            // alert('❌ Borrow failed: ' + err.message);
        }
    },

    repay: async (amount) => {
        const { walletAddress, program, walletSource, allowTransactions } =
            get();
        if (!allowTransactions) return;
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        const value = BigInt(Math.floor(amount * 1e12));
        const actorId = u8aToHex(decodeAddress(walletAddress));
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .repay(actorId, value)
                .withAccount(walletAddress, { signer: injector.signer });
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ Repay: ${msgId}` });
            await isFinalized;
            const result = await response();
            // alert("✅ Repay successful!");
        } catch (err: any) {
            console.error(err);
            // alert("❌ Repay failed: " + err.message);
        }
    },

    withdraw: async (amount) => {
        const { walletAddress, program, walletSource, allowTransactions } =
            get();
        if (!allowTransactions) return;
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        const value = BigInt(Math.floor(amount * 1e12));
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .withdraw(value)
                .withAccount(walletAddress, { signer: injector.signer });
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ Withdraw: ${msgId}` });
            await isFinalized;
            const result = await response();
            // alert("✅ Withdraw successful!");
        } catch (err: any) {
            console.error(err);
            // alert("❌ Withdraw failed: " + err.message);
        }
    },

    withdrawCollateral: async (amount) => {
        const { walletAddress, program, walletSource, allowTransactions } =
            get();
        if (!allowTransactions)
            return alert("❌ Transactions are currently disabled.");
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        const value = BigInt(Math.floor(amount * 1e12));
        const actorId = u8aToHex(decodeAddress(walletAddress));
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .withdrawCollateral(actorId, value)
                .withAccount(walletAddress, { signer: injector.signer });
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ Withdraw Collateral: ${msgId}` });
            await isFinalized;
            const result = await response();
            alert("✅ Collateral withdrawn!");
        } catch (err: any) {
            console.error(err);
            alert("❌ Withdraw collateral failed: " + err.message);
        }
    },

    liquidate: async (target) => {
        const { walletAddress, program, walletSource, allowTransactions } =
            get();
        if (!allowTransactions)
            return alert("❌ Transactions are currently disabled.");
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        const actorId = u8aToHex(decodeAddress(target));
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .liquidate(actorId)
                .withAccount(walletAddress, { signer: injector.signer });
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ Liquidate: ${msgId}` });
            await isFinalized;
            const result = await response();
            alert("✅ Liquidation successful!");
        } catch (err: any) {
            console.error(err);
            alert("❌ Liquidation failed: " + err.message);
        }
    },

    fetchUserInfo: async () => {
        const { walletAddress, program, walletSource } = get();
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        try {
            const actorId = u8aToHex(decodeAddress(walletAddress));
            const result = await program.lendingService.getUserInfo(actorId);
            set({ userInfo: result });
            console.log("result", result);
        } catch (err) {
            console.error(err);
            alert("❌ Failed to fetch user info");
        }
    },
    // This is the function adminWithdrawFunds from lib.ts
    adminWithdrawFunds: async (amount) => {
        const { walletAddress, program, walletSource, allowTransactions } =
            get();
        if (!allowTransactions)
            return alert("❌ Transactions are currently disabled.");
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        const value = BigInt(Math.floor(amount * 1e12));
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .adminWithdrawFunds(value)
                .withAccount(walletAddress, { signer: injector.signer });
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ AdminWithdrawFunds: ${msgId}` });
            await isFinalized;
            await response();
            alert("✅ AdminWithdrawFunds successful!");
        } catch (err: any) {
            console.error(err);
            alert("❌ AdminWithdrawFunds failed: " + err.message);
        }
    },
    // This is the function adminWithdrawTreasury from lib.ts
    adminWithdrawTreasury: async (amount) => {
        const { walletAddress, program, walletSource, allowTransactions } =
            get();
        if (!allowTransactions)
            return alert("❌ Transactions are currently disabled.");
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        const value = BigInt(Math.floor(amount * 1e12));
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .adminWithdrawTreasury(value)
                .withAccount(walletAddress, { signer: injector.signer });
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ AdminWithdrawTreasury: ${msgId}` });
            await isFinalized;
            await response();
            alert("✅ AdminWithdrawTreasury successful!");
        } catch (err: any) {
            console.error(err);
            alert("❌ AdminWithdrawTreasury failed: " + err.message);
        }
    },
    // This is the function claimInterest from lib.ts
    claimInterest: async () => {
        const { walletAddress, program, walletSource, allowTransactions } =
            get();
        if (!allowTransactions)
            return alert("❌ Transactions are currently disabled.");
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .claimInterest()
                .withAccount(walletAddress, { signer: injector.signer });
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ ClaimInterest: ${msgId}` });
            await isFinalized;
            await response();
            alert("✅ ClaimInterest successful!");
        } catch (err: any) {
            console.error(err);
            alert("❌ ClaimInterest failed: " + err.message);
        }
    },
    // This is the function pause from lib.ts
    pause: async () => {
        const { walletAddress, program, walletSource } = get();
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .pause()
                .withAccount(walletAddress, { signer: injector.signer });
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ Pause: ${msgId}` });
            await isFinalized;
            await response();
            alert("✅ Pause successful!");
        } catch (err: any) {
            console.error(err);
            alert("❌ Pause failed: " + err.message);
        }
    },
    // This is the function resume from lib.ts
    resume: async () => {
        const { walletAddress, program, walletSource } = get();
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .resume()
                .withAccount(walletAddress, { signer: injector.signer });
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ Resume: ${msgId}` });
            await isFinalized;
            await response();
            alert("✅ Resume successful!");
        } catch (err: any) {
            console.error(err);
            alert("❌ Resume failed: " + err.message);
        }
    },
    // This is the function updateTvaraPrice from lib.ts
    updateTvaraPrice: async (newPrice) => {
        const { walletAddress, program, walletSource } = get();
        if (!walletAddress || !program)
            return alert("❌ Wallet or contract not ready");
        const value = BigInt(Math.floor(newPrice * 1e12));
        const injector = await web3FromSource(walletSource || "polkadot-js");
        try {
            const tx = program.lendingService
                .updateTvaraPrice(value)
                .withAccount(walletAddress, { signer: injector.signer });
            await tx.calculateGas(true, 10);
            const { msgId, response, isFinalized } = await tx.signAndSend();
            set({ txStatus: `✅ UpdateTvaraPrice: ${msgId}` });
            await isFinalized;
            await response();
            alert("✅ UpdateTvaraPrice successful!");
        } catch (err: any) {
            console.error(err);
            alert("❌ UpdateTvaraPrice failed: " + err.message);
        }
    },
    // This is the function getAdmin from lib.ts
    getAdmin: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        const actorId = u8aToHex(decodeAddress(walletAddress));
        return await program.lendingService.getAdmin(actorId);
    },
    // This is the function getAllBorrowersInfo from lib.ts
    getAllBorrowersInfo: async () => {
        const { program, walletAddress } = get();
        console.log("checked that", walletAddress);
        if (!walletAddress || !program) return null;

        const actorId = u8aToHex(decodeAddress(walletAddress));
        const result = await program.lendingService.getAllBorrowersInfo(
            actorId
        );
        set({ borrowersInfo: result }); // <-- Save to state
        return result;
    },
    // This is the function getBorrowRatePerYear from lib.ts
    getBorrowRatePerYear: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        const actorId = u8aToHex(decodeAddress(walletAddress));
        return await program.lendingService.getBorrowRatePerYear(actorId);
    },
    // This is the function getCollateral from lib.ts
    getCollateral: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        const actorId = u8aToHex(decodeAddress(walletAddress));
        return await program.lendingService.getCollateral(actorId);
    },
    // This is the function getDebt from lib.ts
    getDebt: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        const actorId = u8aToHex(decodeAddress(walletAddress));
        return await program.lendingService.getDebt(actorId);
    },
    // This is the function getHealthFactor from lib.ts
    getHealthFactor: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        const actorId = u8aToHex(decodeAddress(walletAddress));
        return await program.lendingService.getHealthFactor(actorId);
    },
    // This is the function getLastAccrualTs from lib.ts
    getLastAccrualTs: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        return await program.lendingService.getLastAccrualTs(walletAddress);
    },
    // This is the function getLenderBalance from lib.ts
    getLenderBalance: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        const actorId = u8aToHex(decodeAddress(walletAddress));
        return await program.lendingService.getLenderBalance(actorId);
    },
    // This is the function getLenderEarnedInterest from lib.ts
    getLenderEarnedInterest: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        const actorId = u8aToHex(decodeAddress(walletAddress));
        return await program.lendingService.getLenderEarnedInterest(actorId);
    },
    // This is the function getLenderInterestEarned from lib.ts
    getLenderInterestEarned: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        const actorId = u8aToHex(decodeAddress(walletAddress));
        return await program.lendingService.getLenderInterestEarned(actorId);
    },
    // This is the function getLiquidity from lib.ts
    getLiquidity: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        return await program.lendingService.getLiquidity(walletAddress);
    },
    // This is the function getTotalOutstandingDebt from lib.ts
    getTotalOutstandingDebt: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        const actorId = u8aToHex(decodeAddress(walletAddress));
        return await program.lendingService.getTotalOutstandingDebt(actorId);
    },
    // This is the function getTotalPrincipalBorrowed from lib.ts
    getTotalPrincipalBorrowed: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        return await program.lendingService.getTotalPrincipalBorrowed(
            walletAddress
        );
    },
    // This is the function getTreasuryBalance from lib.ts
    getTreasuryBalance: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        return await program.lendingService.getTreasuryBalance(walletAddress);
    },
    // This is the function getTvaraPrice from lib.ts
    getTvaraPrice: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        return await program.lendingService.getTvaraPrice(walletAddress);
    },
    // This is the function getUserAccruedInterest from lib.ts
    getUserAccruedInterest: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        const actorId = u8aToHex(decodeAddress(walletAddress));
        return await program.lendingService.getUserAccruedInterest(actorId);
    },
    // This is the function getUserPosition from lib.ts
    getUserPosition: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        const actorId = u8aToHex(decodeAddress(walletAddress));
        return await program.lendingService.getUserPosition(actorId);
    },
    // This is the function getUtilizationRate from lib.ts
    getUtilizationRate: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        return await program.lendingService.getUtilizationRate(walletAddress);
    },
    // This is the function isPaused from lib.ts
    isPaused: async () => {
        const { program, walletAddress } = get();
        if (!walletAddress || !program) return null;
        return await program.lendingService.isPaused(walletAddress);
    },
    // Event subscriptions (stubs)
    // This is the function subscribeToCollateralDepositedEvent from lib.ts
    subscribeToCollateralDepositedEvent: () => {
        // This is the function subscribeToCollateralDepositedEvent from lib.ts
    },
    // This is the function subscribeToBorrowedEvent from lib.ts
    subscribeToBorrowedEvent: () => {
        // This is the function subscribeToBorrowedEvent from lib.ts
    },
    // This is the function subscribeToRepaidEvent from lib.ts
    subscribeToRepaidEvent: () => {
        // This is the function subscribeToRepaidEvent from lib.ts
    },
    // This is the function subscribeToLiquidatedEvent from lib.ts
    subscribeToLiquidatedEvent: () => {
        // This is the function subscribeToLiquidatedEvent from lib.ts
    },
    // This is the function subscribeToLiquidityProvidedEvent from lib.ts
    subscribeToLiquidityProvidedEvent: () => {
        // This is the function subscribeToLiquidityProvidedEvent from lib.ts
    },
    // This is the function subscribeToLiquidityWithdrawnEvent from lib.ts
    subscribeToLiquidityWithdrawnEvent: () => {
        // This is the function subscribeToLiquidityWithdrawnEvent from lib.ts
    },
    // This is the function subscribeToInterestClaimedEvent from lib.ts
    subscribeToInterestClaimedEvent: () => {
        // This is the function subscribeToInterestClaimedEvent from lib.ts
    },
}));

// Auto-initialize program when store is imported
(async () => {
    try {
        const api = await GearApi.create({ providerAddress: NODE_ENDPOINT });
        const programInstance = new SailsProgram(api, PROGRAM_ID);
        useStore.setState({ program: programInstance, loading: false });
    } catch (err) {
        console.error("❌ Contract load failed:", err);
        useStore.setState({ loading: false });
    }
})();
