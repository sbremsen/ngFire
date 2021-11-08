import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroup } from "@angular/forms";
import { Observable } from 'tinymce';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private firestore: AngularFirestore) { }

  form = new FormGroup({
    customerName: new FormControl(''),
    orderNumber: new FormControl(''),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false)
  })

  createCoffeeOrder(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("coffeeOrders")
            .add(data)
            .then(res => {}, err => reject(err));
    });
  }

  getCoffeeOrders(){
    return
     this.firestore.collection('coffeeOrders').snapshotChanges();
  }

}
