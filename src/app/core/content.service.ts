import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { TinyMCEContentModel } from '../core/content.model';
import { flatMap, switchMap } from 'rxjs/operators';
import { Observable } from 'tinymce';
import { Subject } from 'rxjs';

@Injectable()
export class ContentService {
    contentToInsert: string = '';
    items: Observable<any>;
    msgVal$ = new Subject<string>();

    constructor(public db: AngularFirestore, public afAuth: AngularFireAuth, private firestore: AngularFirestore) {

    }

    // queryObservable = this.msgVal$.pipe(
    //   switchMap(size =>
    //     this.firestore.collection('content', ref => ref.where('uid', '==', userId)).valueChanges()
    //   )
    // );


    getContentForUserPage(userId: string){

      return this.afAuth.authState.pipe(
        switchMap(user => {
          if (user) {
            return this.db
              .collection<TinyMCEContentModel>('content', ref =>
                ref.where('uid', '==', user.uid).orderBy('pageSection')
              )
              .valueChanges({ idField: 'id' });
          } else {
            return [];
          }
        }),
        // map(boards => boards.sort((a, b) => a.priority - b.priority))
      );

    }



    saveContent(content: TinyMCEContentModel){
      let id = this.db.createId();
      return this.db.collection('content').add(content);
    }

    updateContent(content: TinyMCEContentModel){
      debugger;
     // delete content.id;
      this.db.doc('content/' + content.id).update(content);
  }

  createContent(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("content")
            .add(data)
            .then(res => {}, err => reject(err));
    });
  }

  createCoffeeOrder(data) {
    return new Promise<any>((resolve, reject) =>{
        this.firestore
            .collection("coffeeOrders")
            .add(data)
            .then(res => {}, err => reject(err));
    });
  }

}
