export interface Transaction {
  id: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  description: string;
  date: Date;
}

export interface Category {
  name: string;
  icon: string;
  type: 'income' | 'expense';
}
