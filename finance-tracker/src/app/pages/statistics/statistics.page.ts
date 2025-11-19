// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { IonicModule } from '@ionic/angular';
// // import { FinanceService } from '../../services/finance';
// // import { Transaction } from '../../models/transaction.model';
// //
// // interface CategorySummary {
// //   name: string;
// //   total: number;
// //   percentage: number;
// //   color: string;
// // }
// //
// // @Component({
// //   selector: 'app-statistics',
// //   templateUrl: './statistics.page.html',
// //   styleUrls: ['./statistics.page.scss'],
// //   standalone: true,
// //   imports: [IonicModule, CommonModule, FormsModule]
// // })
// // export class StatisticsPage implements OnInit {
// //   totalIncome: number = 0;
// //   totalExpenses: number = 0;
// //   balance: number = 0;
// //
// //   expensesByCategory: CategorySummary[] = [];
// //   incomeByCategory: CategorySummary[] = [];
// //
// //   selectedView: 'expenses' | 'income' = 'expenses';
// //
// //   colors = [
// //     '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
// //     '#9966FF', '#FF9F40', '#FF6384', '#C9CBCF'
// //   ];
// //
// //   constructor(private financeService: FinanceService) {}
// //
// //   ngOnInit() {
// //     this.loadStatistics();
// //   }
// //
// //   ionViewWillEnter() {
// //     this.loadStatistics();
// //   }
// //
// //   loadStatistics() {
// //     this.totalIncome = this.financeService.getTotalIncome();
// //     this.totalExpenses = this.financeService.getTotalExpenses();
// //     this.balance = this.financeService.getBalance();
// //
// //     this.financeService.getTransactions().subscribe(transactions => {
// //       this.calculateCategorySummaries(transactions);
// //     });
// //   }
// //
// //   calculateCategorySummaries(transactions: Transaction[]) {
// //     // Calculate expenses by category
// //     const expenseTransactions = transactions.filter(t => t.type === 'expense');
// //     this.expensesByCategory = this.groupByCategory(expenseTransactions, this.totalExpenses);
// //
// //     // Calculate income by category
// //     const incomeTransactions = transactions.filter(t => t.type === 'income');
// //     this.incomeByCategory = this.groupByCategory(incomeTransactions, this.totalIncome);
// //   }
// //
// //   groupByCategory(transactions: Transaction[], total: number): CategorySummary[] {
// //     const categoryMap = new Map<string, number>();
// //
// //     transactions.forEach(t => {
// //       const current = categoryMap.get(t.category) || 0;
// //       categoryMap.set(t.category, current + t.amount);
// //     });
// //
// //     const summaries: CategorySummary[] = [];
// //     let colorIndex = 0;
// //
// //     categoryMap.forEach((amount, category) => {
// //       summaries.push({
// //         name: category,
// //         total: amount,
// //         percentage: total > 0 ? (amount / total) * 100 : 0,
// //         color: this.colors[colorIndex % this.colors.length]
// //       });
// //       colorIndex++;
// //     });
// //
// //     return summaries.sort((a, b) => b.total - a.total);
// //   }
// //
// //   onViewChange() {
// //     // Trigger view update
// //   }
// //
// //   get currentCategoryData(): CategorySummary[] {
// //     return this.selectedView === 'expenses' ? this.expensesByCategory : this.incomeByCategory;
// //   }
// //
// //   get currentTotal(): number {
// //     return this.selectedView === 'expenses' ? this.totalExpenses : this.totalIncome;
// //   }
// // }
//
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { IonicModule } from '@ionic/angular';
// import { FinanceService } from '../../services/finance';
// import { Transaction } from '../../models/transaction.model';
//
// interface CategoryData {
//   name: string;
//   total: number;
//   percentage: number;
//   color: string;
// }
//
// interface PieSlice {
//   path: string;
//   color: string;
//   category: string;
//   percentage: number;
// }
//
// @Component({
//   selector: 'app-statistics',
//   templateUrl: './statistics.page.html',
//   styleUrls: ['./statistics.page.scss'],
//   standalone: true,
//   imports: [IonicModule, CommonModule, FormsModule]
// })
// export class StatisticsPage implements OnInit {
//   totalIncome: number = 0;
//   totalExpenses: number = 0;
//   balance: number = 0;
//   selectedView: string = 'expenses';
//   selectedChartView: string = 'expenses';
//
//   expenseCategoryData: CategoryData[] = [];
//   incomeCategoryData: CategoryData[] = [];
//   currentCategoryData: CategoryData[] = [];
//   currentChartData: CategoryData[] = [];
//
//   pieSlices: PieSlice[] = [];
//   chartSize: number = 300;
//
//   private categoryColors: { [key: string]: string } = {
//     // Expense colors
//     'Food': '#FF6B6B',
//     'Transport': '#4ECDC4',
//     'Shopping': '#FFE66D',
//     'Bills': '#95E1D3',
//     'Entertainment': '#C7CEEA',
//     'Health': '#FFDAB9',
//     'Other': '#B8B8B8',
//     // Income colors
//     'Salary': '#48BB78',
//     'Freelance': '#4299E1',
//     'Investment': '#9F7AEA',
//     'Gift': '#ED8936',
//   };
//
//   constructor(private financeService: FinanceService) {}
//
//   ngOnInit() {
//     this.loadStatistics();
//   }
//
//   ionViewWillEnter() {
//     this.loadStatistics();
//   }
//
//   loadStatistics() {
//     this.totalIncome = this.financeService.getTotalIncome();
//     this.totalExpenses = this.financeService.getTotalExpenses();
//     this.balance = this.financeService.getBalance();
//
//     this.financeService.getTransactions().subscribe(transactions => {
//       this.calculateCategoryData(transactions);
//       this.updateCurrentView();
//       this.updateCurrentChartView();
//     });
//   }
//
//   calculateCategoryData(transactions: Transaction[]) {
//     // Calculate expenses by category
//     const expenseMap = new Map<string, number>();
//     const incomeMap = new Map<string, number>();
//
//     transactions.forEach(t => {
//       if (t.type === 'expense') {
//         expenseMap.set(t.category, (expenseMap.get(t.category) || 0) + t.amount);
//       } else {
//         incomeMap.set(t.category, (incomeMap.get(t.category) || 0) + t.amount);
//       }
//     });
//
//     // Convert to array and calculate percentages
//     this.expenseCategoryData = Array.from(expenseMap.entries())
//       .map(([name, total]) => ({
//         name,
//         total,
//         percentage: this.totalExpenses > 0 ? (total / this.totalExpenses) * 100 : 0,
//         color: this.categoryColors[name] || this.getRandomColor()
//       }))
//       .sort((a, b) => b.total - a.total);
//
//     this.incomeCategoryData = Array.from(incomeMap.entries())
//       .map(([name, total]) => ({
//         name,
//         total,
//         percentage: this.totalIncome > 0 ? (total / this.totalIncome) * 100 : 0,
//         color: this.categoryColors[name] || this.getRandomColor()
//       }))
//       .sort((a, b) => b.total - a.total);
//   }
//
//   onViewChange() {
//     this.updateCurrentView();
//   }
//
//   onChartViewChange() {
//     this.updateCurrentChartView();
//   }
//
//   updateCurrentView() {
//     this.currentCategoryData = this.selectedView === 'expenses'
//       ? this.expenseCategoryData
//       : this.incomeCategoryData;
//   }
//
//   updateCurrentChartView() {
//     this.currentChartData = this.selectedChartView === 'expenses'
//       ? this.expenseCategoryData
//       : this.incomeCategoryData;
//
//     this.generatePieSlices();
//   }
//
//   generatePieSlices() {
//     if (this.currentChartData.length === 0) {
//       this.pieSlices = [];
//       return;
//     }
//
//     const radius = this.chartSize / 2 - 10;
//     let currentAngle = -90; // Start at top
//
//     this.pieSlices = this.currentChartData.map(category => {
//       const angleSize = (category.percentage / 100) * 360;
//       const startAngle = currentAngle;
//       const endAngle = currentAngle + angleSize;
//
//       const path = this.createArc(0, 0, radius, startAngle, endAngle);
//
//       currentAngle = endAngle;
//
//       return {
//         path,
//         color: category.color,
//         category: category.name,
//         percentage: category.percentage
//       };
//     });
//   }
//
//   createArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
//     const start = this.polarToCartesian(x, y, radius, endAngle);
//     const end = this.polarToCartesian(x, y, radius, startAngle);
//     const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
//
//     return [
//       'M', x, y,
//       'L', start.x, start.y,
//       'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
//       'Z'
//     ].join(' ');
//   }
//
//   polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
//     const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
//     return {
//       x: centerX + (radius * Math.cos(angleInRadians)),
//       y: centerY + (radius * Math.sin(angleInRadians))
//     };
//   }
//
//   onSliceClick(slice: PieSlice) {
//     console.log('Clicked category:', slice.category);
//     // You can add more interactivity here if needed
//   }
//
//   getRandomColor(): string {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
//
//   get currentTotal(): number {
//     return this.selectedView === 'expenses' ? this.totalExpenses : this.totalIncome;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FinanceService } from '../../services/finance';
import { Transaction } from '../../models/transaction.model';

interface CategoryData {
  name: string;
  total: number;
  percentage: number;
  color: string;
}

interface PieSlice {
  path: string;
  color: string;
  category: string;
  percentage: number;
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
  selectedView: string = 'expenses';
  selectedChartView: string = 'expenses';

  expenseCategoryData: CategoryData[] = [];
  incomeCategoryData: CategoryData[] = [];
  currentCategoryData: CategoryData[] = [];
  currentChartData: CategoryData[] = [];

  pieSlices: PieSlice[] = [];
  chartSize: number = 300;

  // Income vs Expenses comparison properties
  incomeBarWidth: number = 0;
  expenseBarWidth: number = 0;
  incomePercentageOfTotal: number = 0;
  expensePercentageOfTotal: number = 0;
  savingsRate: number = 0;

  // Donut chart properties
  donutSize: number = 200;
  totalCircumference: number = 440; // 2 * PI * radius (70)
  incomeArcLength: number = 0;
  expenseArcLength: number = 0;
  circumferenceOffset: number = 110; // Start at top

  Math = Math; // Expose Math to template

  private categoryColors: { [key: string]: string } = {
    // Expense colors
    'Food': '#FF6B6B',
    'Transport': '#4ECDC4',
    'Shopping': '#FFE66D',
    'Bills': '#95E1D3',
    'Entertainment': '#C7CEEA',
    'Healthcare': '#FFDAB9',
    'Education': '#A8E6CF',
    'Other': '#B8B8B8',
    // Income colors
    'Salary': '#48BB78',
    'Freelance': '#4299E1',
    'Investment': '#9F7AEA',
    'Gift': '#ED8936',
  };

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

    this.calculateComparisonMetrics();

    this.financeService.getTransactions().subscribe(transactions => {
      this.calculateCategoryData(transactions);
      this.updateCurrentView();
      this.updateCurrentChartView();
    });
  }

  calculateComparisonMetrics() {
    const maxAmount = Math.max(this.totalIncome, this.totalExpenses);
    const total = this.totalIncome + this.totalExpenses;

    // Bar chart widths (relative to the larger amount)
    if (maxAmount > 0) {
      this.incomeBarWidth = (this.totalIncome / maxAmount) * 100;
      this.expenseBarWidth = (this.totalExpenses / maxAmount) * 100;
    } else {
      this.incomeBarWidth = 0;
      this.expenseBarWidth = 0;
    }

    // Donut chart percentages (of total)
    if (total > 0) {
      this.incomePercentageOfTotal = (this.totalIncome / total) * 100;
      this.expensePercentageOfTotal = (this.totalExpenses / total) * 100;

      // Arc lengths for donut chart
      this.incomeArcLength = (this.incomePercentageOfTotal / 100) * this.totalCircumference;
      this.expenseArcLength = (this.expensePercentageOfTotal / 100) * this.totalCircumference;
    } else {
      this.incomePercentageOfTotal = 0;
      this.expensePercentageOfTotal = 0;
      this.incomeArcLength = 0;
      this.expenseArcLength = 0;
    }

    // Savings rate calculation
    if (this.totalIncome > 0) {
      this.savingsRate = ((this.totalIncome - this.totalExpenses) / this.totalIncome) * 100;
    } else {
      this.savingsRate = 0;
    }
  }

  getSavingsMessage(): string {
    if (this.savingsRate > 50) {
      return "Excellent! You're saving more than half your income.";
    } else if (this.savingsRate > 30) {
      return "Great job! You're maintaining healthy savings.";
    } else if (this.savingsRate > 10) {
      return "Good start! Try to increase your savings rate.";
    } else if (this.savingsRate > 0) {
      return "You're saving something. Consider saving more.";
    } else if (this.savingsRate === 0) {
      return "Try to start saving a portion of your income.";
    } else {
      return "Warning: You're spending more than you earn.";
    }
  }

  calculateCategoryData(transactions: Transaction[]) {
    const expenseMap = new Map<string, number>();
    const incomeMap = new Map<string, number>();

    transactions.forEach(t => {
      if (t.type === 'expense') {
        expenseMap.set(t.category, (expenseMap.get(t.category) || 0) + t.amount);
      } else {
        incomeMap.set(t.category, (incomeMap.get(t.category) || 0) + t.amount);
      }
    });

    this.expenseCategoryData = Array.from(expenseMap.entries())
      .map(([name, total]) => ({
        name,
        total,
        percentage: this.totalExpenses > 0 ? (total / this.totalExpenses) * 100 : 0,
        color: this.categoryColors[name] || this.getRandomColor()
      }))
      .sort((a, b) => b.total - a.total);

    this.incomeCategoryData = Array.from(incomeMap.entries())
      .map(([name, total]) => ({
        name,
        total,
        percentage: this.totalIncome > 0 ? (total / this.totalIncome) * 100 : 0,
        color: this.categoryColors[name] || this.getRandomColor()
      }))
      .sort((a, b) => b.total - a.total);
  }

  onViewChange() {
    this.updateCurrentView();
  }

  onChartViewChange() {
    this.updateCurrentChartView();
  }

  updateCurrentView() {
    this.currentCategoryData = this.selectedView === 'expenses'
      ? this.expenseCategoryData
      : this.incomeCategoryData;
  }

  updateCurrentChartView() {
    this.currentChartData = this.selectedChartView === 'expenses'
      ? this.expenseCategoryData
      : this.incomeCategoryData;

    this.generatePieSlices();
  }

  generatePieSlices() {
    if (this.currentChartData.length === 0) {
      this.pieSlices = [];
      return;
    }

    const radius = this.chartSize / 2 - 10;
    let currentAngle = -90;

    this.pieSlices = this.currentChartData.map(category => {
      const angleSize = (category.percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angleSize;

      const path = this.createArc(0, 0, radius, startAngle, endAngle);

      currentAngle = endAngle;

      return {
        path,
        color: category.color,
        category: category.name,
        percentage: category.percentage
      };
    });
  }

  createArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
    const start = this.polarToCartesian(x, y, radius, endAngle);
    const end = this.polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return [
      'M', x, y,
      'L', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'Z'
    ].join(' ');
  }

  polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  onSliceClick(slice: PieSlice) {
    console.log('Clicked category:', slice.category);
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  get currentTotal(): number {
    return this.selectedView === 'expenses' ? this.totalExpenses : this.totalIncome;
  }
}
