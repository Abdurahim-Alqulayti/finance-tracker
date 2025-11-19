import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceService } from '../../services/finance';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.page.html',
  styleUrls: ['./transaction-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TransactionDetailsPage implements OnInit {
  transaction: Transaction | undefined;
  categoryIcon: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private financeService: FinanceService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    const transactionId = this.route.snapshot.paramMap.get('id');
    if (transactionId) {
      this.loadTransaction(transactionId);
    }
  }

  loadTransaction(id: string) {
    this.transaction = this.financeService.getTransactionById(id);
    if (this.transaction) {
      this.categoryIcon = this.financeService.getCategoryIcon(
        this.transaction.category,
        this.transaction.type
      );
    }
  }

  async deleteTransaction() {
    const alert = await this.alertController.create({
      header: 'Delete Transaction',
      message: 'Are you sure you want to delete this transaction? This action cannot be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            if (this.transaction) {
              this.financeService.deleteTransaction(this.transaction.id);
              this.router.navigate(['/dashboard']);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
