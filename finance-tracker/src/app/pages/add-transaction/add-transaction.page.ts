import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FinanceService } from '../../services/finance';
import { Category } from '../../models/transaction.model';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.page.html',
  styleUrls: ['./add-transaction.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AddTransactionPage implements OnInit {
  transactionType: 'income' | 'expense' = 'expense';
  amount: number = 0;
  category: string = '';
  description: string = '';
  date: string = new Date().toISOString();

  categories: Category[] = [];

  constructor(
    private financeService: FinanceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateCategories();
  }

  onTypeChange() {
    this.category = '';
    this.updateCategories();
  }

  updateCategories() {
    if (this.transactionType === 'income') {
      this.categories = this.financeService.incomeCategories;
    } else {
      this.categories = this.financeService.expenseCategories;
    }
  }

  saveTransaction() {
    if (!this.amount || !this.category) {
      // Show error - we'll add toast notification
      return;
    }

    this.financeService.addTransaction({
      amount: this.amount,
      type: this.transactionType,
      category: this.category,
      description: this.description || '',
      date: new Date(this.date)
    });

    // Navigate back to dashboard
    this.router.navigate(['/dashboard']);
  }

  cancel() {
    this.router.navigate(['/dashboard']);
  }
}
