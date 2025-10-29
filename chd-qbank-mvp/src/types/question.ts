export interface Question {
  id: number;
  topic: string;     // e.g., 'VSD', 'ASD', 'TOF'
  stem: string;
  options: string[]; // 5 options (A-E)
  answer: number;    // index 0-4
  explanation: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];   // e.g., ['pathophys', 'murmur', 'cyanosis']
}