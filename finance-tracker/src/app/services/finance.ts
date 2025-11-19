// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { Transaction, Category } from '../models/transaction.model';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class FinanceService {
//   private transactions: Transaction[] = [];
//   private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
//
//   // Categories for expenses
//   expenseCategories: Category[] = [
//     { name: 'Food', icon: 'fast-food', type: 'expense' },
//     { name: 'Transport', icon: 'car', type: 'expense' },
//     { name: 'Shopping', icon: 'cart', type: 'expense' },
//     { name: 'Bills', icon: 'receipt', type: 'expense' },
//     { name: 'Entertainment', icon: 'game-controller', type: 'expense' },
//     { name: 'Health', icon: 'medical', type: 'expense' },
//     { name: 'Other', icon: 'ellipsis-horizontal', type: 'expense' }
//   ];
//
//   // Categories for income
//   incomeCategories: Category[] = [
//     { name: 'Salary', icon: 'cash', type: 'income' },
//     { name: 'Freelance', icon: 'briefcase', type: 'income' },
//     { name: 'Investment', icon: 'trending-up', type: 'income' },
//     { name: 'Gift', icon: 'gift', type: 'income' },
//     { name: 'Other', icon: 'ellipsis-horizontal', type: 'income' }
//   ];
//
//   constructor() {
//     this.loadTransactions();
//   }
//
// // Load transactions from localStorage
// private loadTransactions(): void {
//   const stored = localStorage.getItem('transactions');
//   if (stored) {
//     this.transactions = JSON.parse(stored);
//     this.transactionsSubject.next(this.transactions);
//   }
// }
//
// // Save transactions to localStorage
// private saveTransactions(): void {
//   localStorage.setItem('transactions', JSON.stringify(this.transactions));
//   this.transactionsSubject.next(this.transactions);
// }
//
// // Get all transactions as Observable
// getTransactions(): Observable<Transaction[]> {
//   return this.transactionsSubject.asObservable();
// }
//
// // Add new transaction
// addTransaction(transaction: Omit<Transaction, 'id'>): void {
//   const newTransaction: Transaction = {
//     ...transaction,
//     id: Date.now().toString()
//   };
//   this.transactions.unshift(newTransaction);
//   this.saveTransactions();
// }
//
// // Delete transaction
// deleteTransaction(id: string): void {
//   this.transactions = this.transactions.filter(t => t.id !== id);
//   this.saveTransactions();
// }
//
// // Get total income
// getTotalIncome(): number {
//   return this.transactions
//     .filter(t => t.type === 'income')
//     .reduce((sum, t) => sum + t.amount, 0);
// }
//
// // Get total expenses
// getTotalExpenses(): number {
//   return this.transactions
//     .filter(t => t.type === 'expense')
//     .reduce((sum, t) => sum + t.amount, 0);
// }
//
// // Get balance
// getBalance(): number {
//   return this.getTotalIncome() - this.getTotalExpenses();
// }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction, Category } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private transactions: Transaction[] = [];
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  // Categories for expenses
  expenseCategories: Category[] = [
    { name: 'Food', icon: 'fast-food', type: 'expense' },
    { name: 'Transport', icon: 'car', type: 'expense' },
    { name: 'Shopping', icon: 'cart', type: 'expense' },
    { name: 'Bills', icon: 'receipt', type: 'expense' },
    { name: 'Entertainment', icon: 'game-controller', type: 'expense' },
    { name: 'Health', icon: 'medical', type: 'expense' },
    { name: 'Other', icon: 'ellipsis-horizontal', type: 'expense' }
  ];

  // Categories for income
  incomeCategories: Category[] = [
    { name: 'Salary', icon: 'cash', type: 'income' },
    { name: 'Freelance', icon: 'briefcase', type: 'income' },
    { name: 'Investment', icon: 'trending-up', type: 'income' },
    { name: 'Gift', icon: 'gift', type: 'income' },
    { name: 'Other', icon: 'ellipsis-horizontal', type: 'income' }
  ];

  constructor() {
    this.loadTransactions();
  }

  // Load transactions from localStorage
  private loadTransactions(): void {
    const stored = localStorage.getItem('transactions');
    if (stored) {
      this.transactions = JSON.parse(stored);
      this.transactionsSubject.next(this.transactions);
    }
  }

  // Save transactions to localStorage
  private saveTransactions(): void {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
    this.transactionsSubject.next(this.transactions);
  }

  // Get all transactions as Observable
  getTransactions(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }

  // Get single transaction by ID
  getTransactionById(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  // Add new transaction
  addTransaction(transaction: Omit<Transaction, 'id'>): void {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString()
    };
    this.transactions.unshift(newTransaction);
    this.saveTransactions();
  }

  // Update existing transaction
  updateTransaction(id: string, updates: Partial<Transaction>): void {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      this.transactions[index] = { ...this.transactions[index], ...updates };
      this.saveTransactions();
    }
  }

  // Delete transaction
  deleteTransaction(id: string): void {
    this.transactions = this.transactions.filter(t => t.id !== id);
    this.saveTransactions();
  }

  // Get total income
  getTotalIncome(): number {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // Get total expenses
  getTotalExpenses(): number {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // Get balance
  getBalance(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }

  // Get category icon
  getCategoryIcon(categoryName: string, type: 'income' | 'expense'): string {
    const categories = type === 'income' ? this.incomeCategories : this.expenseCategories;
    const category = categories.find(c => c.name === categoryName);
    return category?.icon || 'ellipsis-horizontal';
  }
}
