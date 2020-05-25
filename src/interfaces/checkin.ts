export interface Checkin {
  isMayor: boolean;
  score: number;
  url: string;
  reasons: {
    icon: string;
    message: string;
    points: string;
  };
}
