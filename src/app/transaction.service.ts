import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private _HttpClient:HttpClient) { }
  getTransaction():Observable<any>{
  return this._HttpClient.get("https://raw.githubusercontent.com/ReemRamdaan/dataset/main/db.json")
  }
  getCustomers():Observable<any>{
  return this._HttpClient.get("https://raw.githubusercontent.com/ReemRamdaan/dataset/main/db.json")
  }
}
