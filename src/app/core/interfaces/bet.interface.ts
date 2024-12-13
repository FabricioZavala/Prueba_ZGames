export interface Bet {
  userId?: string;
  eventId: string;
  eventName: string;
  selectedOutcomeName: string;
  odds: number;
  stake: number;
  potentialWin: number;
  
}