// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import {IonicModule} from '@ionic/angular';
// import { Router } from '@angular/router';
// import { FinanceService } from '../../services/finance';
// import { Transaction } from '../../models/transaction.model';
//
// @Component({
//   selector: 'app-dashboard',
//   templateUrl: './dashboard.page.html',
//   styleUrls: ['./dashboard.page.scss'],
//   standalone: true,
//   imports: [IonicModule, CommonModule, FormsModule]
// })
// export class DashboardPage implements OnInit {
//   balance: number = 0;
//   totalIncome: number = 0;
//   totalExpenses: number = 0;
//   recentTransactions: Transaction[] = [];
//
//   constructor(
//     private financeService: FinanceService,
//     private router: Router
//   ) {}
//
//   ngOnInit() {
//     this.loadDashboardData();
//   }
//
//   ionViewWillEnter() {
//     this.loadDashboardData();
//   }
//
//   loadDashboardData() {
//     this.financeService.getTransactions().subscribe(transactions => {
//       this.recentTransactions = transactions.slice(0, 5);
//     });
//
//     this.balance = this.financeService.getBalance();
//     this.totalIncome = this.financeService.getTotalIncome();
//     this.totalExpenses = this.financeService.getTotalExpenses();
//   }
//
//   navigateToAddTransaction() {
//     this.router.navigate(['/add-transaction']);
//   }
//
//   navigateToTransactions() {
//     this.router.navigate(['/transactions']);
//   }
//
//   navigateToStatistics() {
//     this.router.navigate(['/statistics']);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import { Router } from '@angular/router';
import { FinanceService } from '../../services/finance';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DashboardPage implements OnInit {
  balance: number = 0;
  totalIncome: number = 0;
  totalExpenses: number = 0;
  recentTransactions: Transaction[] = [];

  constructor(
    private financeService: FinanceService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  ionViewWillEnter() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.financeService.getTransactions().subscribe(transactions => {
      this.recentTransactions = transactions.slice(0, 5);
    });

    this.balance = this.financeService.getBalance();
    this.totalIncome = this.financeService.getTotalIncome();
    this.totalExpenses = this.financeService.getTotalExpenses();
  }

  navigateToAddTransaction() {
    this.router.navigate(['/add-transaction']);
  }

  navigateToTransactions() {
    this.router.navigate(['/transactions']);
  }

  navigateToStatistics() {
    this.router.navigate(['/statistics']);
  }

  navigateToTransactionDetails(transactionId: string) {
    this.router.navigate(['/transaction-details', transactionId]);
  }
}
