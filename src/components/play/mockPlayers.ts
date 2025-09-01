export type Player = {
  id: string;
  rank: number;
  name: string;
  xp: number;
};

// Simple mock data matching the attached screenshot ordering and XP values
export const mockPlayers: Player[] = [
  { id: "p1", rank: 1, name: "Jesica", xp: 22 },
  { id: "p2", rank: 2, name: "Elsa", xp: 22 },
  { id: "p3", rank: 3, name: "Felix", xp: 28 },
  { id: "p4", rank: 4, name: "Jordan", xp: 22 },
  { id: "p5", rank: 5, name: "Holland", xp: 32 },
  { id: "p6", rank: 6, name: "Robert", xp: 22 },
];

export default mockPlayers;
