import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FinanceService } from '../../services/finance';
import { Transaction } from '../../models/transaction.model';

interface CategorySummary {
  name: string;
  total: number;
  percentage: number;
  color: string;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class StatisticsPage implements OnInit {
  totalIncome: number = 0;
  totalExpenses: number = 0;
  balance: number = 0;

  expensesByCategory: CategorySummary[] = [];
  incomeByCategory: CategorySummary[] = [];

  selectedView: 'expenses' | 'income' = 'expenses';

  colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
  ];

  constructor(private financeService: FinanceService) {}

  ngOnInit() {
    this.loadStatistics();
  }

  ionViewWillEnter() {
    this.loadStatistics();
  }

  loadStatistics() {
    this.totalIncome = this.financeService.getTotalIncome();
    this.totalExpenses = this.financeService.getTotalExpenses();
    this.balance = this.financeService.getBalance();

    this.financeService.getTransactions().subscribe(transactions => {
      this.calculateCategorySummaries(transactions);
    });
  }

  calculateCategorySummaries(transactions: Transaction[]) {
    // Calculate expenses by category
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    this.expensesByCategory = this.groupByCategory(expenseTransactions, this.totalExpenses);

    // Calculate income by category
    const incomeTransactions = transactions.filter(t => t.type === 'income');
    this.incomeByCategory = this.groupByCategory(incomeTransactions, this.totalIncome);
  }

  groupByCategory(transactions: Transaction[], total: number): CategorySummary[] {
    const categoryMap = new Map<string, number>();

    transactions.forEach(t => {
      const current = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, current + t.amount);
    });

    const summaries: CategorySummary[] = [];
    let colorIndex = 0;

    categoryMap.forEach((amount, category) => {
      summaries.push({
        name: category,
        total: amount,
        percentage: total > 0 ? (amount / total) * 100 : 0,
        color: this.colors[colorIndex % this.colors.length]
      });
      colorIndex++;
    });

    return summaries.sort((a, b) => b.total - a.total);
  }

  onViewChange() {
    // Trigger view update
  }

  get currentCategoryData(): CategorySummary[] {
    return this.selectedView === 'expenses' ? this.expensesByCategory : this.incomeByCategory;
  }

  get currentTotal(): number {
    return this.selectedView === 'expenses' ? this.totalExpenses : this.totalIncome;
  }
}
