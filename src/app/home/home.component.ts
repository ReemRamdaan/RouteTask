import { Customer } from './../customer';
import { Transaction } from './../transaction';
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
 import  {Chart}  from 'angular-highcharts';

@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
   customers:Customer[]=[];
   transactions:Transaction[]=[];
   searchTerm:string='';
   filteredCustomers:Customer[]=[];
   customerTransaction:Transaction[]=[];
   transactionAmounts:{[key:string]:number}={};
   values:number[]=[];
   chart:Chart|any=null
   customerName:string="";
   customersName :Customer[]=[];
  constructor(private _TransactionService:TransactionService){}
ngOnInit(): void {
  this._TransactionService.getCustomers().subscribe({
    next:(data)=>{
      this.customers=data.customers;
      this.filteredCustomers=this.customers; 
      this.calculateTransactionAmounts();
    },
    error:(err)=>{console.log(err);
    }  
})
  this._TransactionService.getTransaction().subscribe({
    next:(data)=>{
      this.transactions=data.transactions;
      this.calculateTransactionAmounts()
    },
    error:(err)=>{console.log(err);
    }})
}
calculateTransactionAmounts(): void {
  this.transactionAmounts = this.customers.reduce((acc, customer) => {
    const totalAmount = this.transactions
      .filter(transaction => transaction.customer_id === customer.id)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    acc[customer.id] = totalAmount;
    return acc;
  }, {} as { [key: string]: number });
}

selectCustomer(customerId: number): void {
  this.customerTransaction = this.transactions.filter(transaction => transaction.customer_id == customerId);
for(let i=0;i < this.customerTransaction.length;i++){
  this.values.push(this.customerTransaction[i].amount)
}
this.customersName= this.customers.filter(customer => customer.id == customerId);
this.customerName=this.customersName[0].name;
  this.renderChart();
  this.values=[];
}
renderChart():void{
  this.chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: `Graph ${this.customerName}`
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Transaction Per Day',
        data: this.values
      } as any
    ]
  });
}


}
