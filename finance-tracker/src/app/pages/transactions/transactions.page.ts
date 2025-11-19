import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule, AlertController, IonIcon} from '@ionic/angular';
import { Router } from '@angular/router';
import { FinanceService } from '../../services/finance';
import { Transaction } from '../../models/transaction.model';
imports: [
  IonicModule,
  CommonModule,
  FormsModule,
  IonIcon
]

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TransactionsPage implements OnInit {
  allTransactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  filterType: string = 'all';

  constructor(
    private financeService: FinanceService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadTransactions();
  }

  ionViewWillEnter() {
    this.loadTransactions();
  }

  loadTransactions() {
    this.financeService.getTransactions().subscribe(transactions => {
      this.allTransactions = transactions;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.filterType === 'all') {
      this.filteredTransactions = this.allTransactions;
    } else {
      this.filteredTransactions = this.allTransactions.filter(
        t => t.type === this.filterType
      );
    }
  }

  onFilterChange() {
    this.applyFilter();
  }

  async deleteTransaction(transaction: Transaction) {
    const alert = await this.alertController.create({
      header: 'Delete Transaction',
      message: `Are you sure you want to delete this ${transaction.type} of $${transaction.amount}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.financeService.deleteTransaction(transaction.id);
          }
        }
      ]
    });

    await alert.present();
  }

  navigateToAddTransaction() {
    this.router.navigate(['/add-transaction']);
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }
}
