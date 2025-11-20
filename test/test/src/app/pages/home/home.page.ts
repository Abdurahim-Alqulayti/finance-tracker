import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- For [(ngModel)]

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  
  // --- 2. ADD IMPORTS HERE ---
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule // <-- Add FormsModule here
  ],
})
export class HomePage {
  newExpenseDescription: string = '';
  newExpenseAmount!: number;
  expenses: { description: string, amount: number }[] = [];
  totalExpenses: number = 0;
  constructor() { }
  addExpense() {
    if (this.newExpenseDescription && this.newExpenseAmount > 0) {
      const newExpense = {
        description: this.newExpenseDescription,
        amount: this.newExpenseAmount
      };
      this.expenses.push(newExpense);
      this.totalExpenses += this.newExpenseAmount;
      this.newExpenseDescription = '';
    }
  }

}