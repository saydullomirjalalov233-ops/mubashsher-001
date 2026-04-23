export type GameCategory = 'Arcade' | 'Mantiq' | 'Tezkorlik' | 'Boshqotirma' | 'Tasodif';

export interface GameInfo {
  id: string;
  title: string;
  description: string;
  instructions?: string;
  category: GameCategory;
  icon: string; // Lucide icon name
  color: string;
}

export interface GameProps {
  onGameOver: (score: number) => void;
  onWin: (score: number) => void;
}
