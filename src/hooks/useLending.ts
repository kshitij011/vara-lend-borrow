import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';

export const useLending = () => {
  const { program, walletAddress, userInfo, fetchUserInfo } = useStore();
  const [marketData, setMarketData] = useState({
    totalLiquidity: 0,
    totalBorrowed: 0,
    utilizationRate: 0,
    borrowRate: 0,
  });

  // Fetch market data
  const fetchMarketData = async () => {
    if (!program) return;
    
    try {
      const [liquidity, totalBorrowed, utilizationRate, borrowRate] = await Promise.all([
        program.lendingService.getLiquidity(),
        program.lendingService.getTotalPrincipalBorrowed(),
        program.lendingService.getUtilizationRate(),
        program.lendingService.getBorrowRatePerYear(),
      ]);

      setMarketData({
        totalLiquidity: Number(liquidity) / 1e12,
        totalBorrowed: Number(totalBorrowed) / 1e12,
        utilizationRate: Number(utilizationRate) / 1e18,
        borrowRate: Number(borrowRate) / 1e18,
      });

      console.log("borrowRate",marketData );
    } catch (error) {
      console.error('Failed to fetch market data:', error);
    }
  };

  // Fetch user position data
  const fetchUserPosition = async () => {
    if (!program || !walletAddress) return;
    
    try {
      const actorId = walletAddress; // This should be properly encoded
      const position = await program.lendingService.getUserPosition(actorId);
      return {
        collateral: Number(position[0]) / 1e12,
        debt: Number(position[1]) / 1e12,
        healthFactor: Number(position[2]) / 1e12,
        borrowLimit: Number(position[3]) / 1e12,
      };
    } catch (error) {
      console.error('Failed to fetch user position:', error);
      return null;
    }
  };

  // Auto-refresh data
  useEffect(() => {
    if (program) {
      fetchMarketData();
      const interval = setInterval(fetchMarketData, 30000); // Refresh every 30 seconds
      return () => clearInterval(interval);
    }
  }, [program]);

  useEffect(() => {
    if (walletAddress && program) {
      fetchUserInfo();
    }
  }, [walletAddress, program]);

  return {
    marketData,
    userInfo,
    fetchMarketData,
    fetchUserPosition,
  };
};
