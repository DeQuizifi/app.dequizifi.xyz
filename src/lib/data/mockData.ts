// Centralized mock data for the application
// This file contains all mock data used across different pages

export interface User {
  username: string;
  walletAddress?: string;
  joinedDate?: string;
  favQuizTopic?: string;
}

export interface RecentQuiz {
  id: string;
  title: string;
  progress: number;
}

export interface LeaderboardUser {
  id: string;
  rank: number;
  username: string;
  points: number;
}

export interface LeaderboardData {
  week: LeaderboardUser[];
  allTime: LeaderboardUser[];
}

export interface ProfileStats {
  points: number;
  bestRank: string;
  weekStatus: string;
}

// Dashboard mock data
export const mockUser: User = {
  username: "CryptoEnthusiast",
  walletAddress: "0x017... 9aaB",
  joinedDate: "4th August, 2024",
  favQuizTopic: "DeFi",
};

export const mockBalance = 60.25;

export const mockRecentQuiz: RecentQuiz = {
  id: "1",
  title: "Know Your Crypto Lingo",
  progress: 69,
};

// Leaderboard mock data
export const mockLeaderboardData: LeaderboardData = {
  week: [
    { id: "1", rank: 1, username: "Alice", points: 453 },
    { id: "2", rank: 2, username: "Bob", points: 442 },
    { id: "3", rank: 3, username: "Charlie", points: 433 },
    { id: "4", rank: 4, username: "Jessica", points: 223 },
    { id: "5", rank: 5, username: "Elsa", points: 160 },
    { id: "6", rank: 6, username: "Knelson", points: 140 },
    { id: "7", rank: 7, username: "Michael", points: 135 },
    { id: "8", rank: 8, username: "Sarah", points: 130 },
    { id: "9", rank: 9, username: "John", points: 125 },
    { id: "10", rank: 10, username: "Emma", points: 120 },
    { id: "11", rank: 11, username: "Ryan", points: 115 },
    { id: "12", rank: 12, username: "Lisa", points: 110 },
  ],
  allTime: [
    { id: "1", rank: 1, username: "David", points: 1250 },
    { id: "2", rank: 2, username: "Emma", points: 1180 },
    { id: "3", rank: 3, username: "Frank", points: 1120 },
    { id: "4", rank: 4, username: "Grace", points: 890 },
    { id: "5", rank: 5, username: "Henry", points: 750 },
    { id: "6", rank: 6, username: "Iris", points: 620 },
    { id: "7", rank: 7, username: "Jack", points: 580 },
    { id: "8", rank: 8, username: "Kate", points: 540 },
    { id: "9", rank: 9, username: "Leo", points: 500 },
    { id: "10", rank: 10, username: "Maya", points: 460 },
    { id: "11", rank: 11, username: "Nick", points: 420 },
    { id: "12", rank: 12, username: "Olivia", points: 380 },
  ],
};

export const mockProfileStats: ProfileStats = {
  points: 1742,
  bestRank: "#3",
  weekStatus: "Unranked",
};

// Rewards mock data
export interface RewardsData {
  xpLevel: number;
  xpPointsToNext: number;
  xpCurrentPoints: number;
  rank: string;
  nextRankUnlockLevel: number;
  points: number;
  trophies: Array<{
    name: string;
    unlocked: boolean;
    icon: string;
  }>;
}

export const mockRewardsData: RewardsData = {
  xpLevel: 3,
  xpPointsToNext: 368,
  xpCurrentPoints: 0, // Not shown, but can be used for progress bar
  rank: "Newbie",
  nextRankUnlockLevel: 5,
  points: 1742,
  trophies: [
    {
      name: "Starter",
      unlocked: true,
      icon: "/public/images/dashboard.svg", // Example icon path
    },
    {
      name: "Locked Trophy 1",
      unlocked: false,
      icon: "/public/images/rank2Crown.svg",
    },
    {
      name: "Locked Trophy 2",
      unlocked: false,
      icon: "/public/images/rank3Crown.svg",
    },
  ],
};
