export interface SalaryData {
    role: string;
    category: string;
    location: string;
    experience: string;
    minSalary: number;
    maxSalary: number;
    averageSalary: number;
    trend: 'up' | 'down' | 'stable';
  }
  