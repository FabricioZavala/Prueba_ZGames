export interface SportsEvent {
    tournamentId: string;
    eventStatus: {
      statusEventSport: string;
      matchStatus: { es: string; en: string };
    };
    coverageInfo: {
      isLive: boolean;
      bookingStatus: string;
    };
    competitorHome: Competitor;
    competitorAway: Competitor;
    eventId: string;
    sportId: string;
    sportEventName: { es: string; en: string };
    scheduled: string;
    eventType: string;
    tournament: {
      categoryId: string;
      tournamentName: { es: string; en: string };
    };
    markets: Market[];
  }
  
  export interface Competitor {
    score: number | null;
    competitorName: { es: string; en: string };
    penaltyScore: number | null;
    qualifier: string;
    countryName: { es: string; en: string };
  }
  
  export interface Market {
    marketId: number;
    marketName: { es: string; en: string };
    marketLines: MarketLine[];
  }
  
  export interface MarketLine {
    specifiers: string;
    status: string;
    outcomes: Outcome[];
  }
  
  export interface Outcome {
    _id: string;
    odds: number;
    oddsUS: number;
    probability: number;
    outcomeName: { es: string; en: string };
  }
  