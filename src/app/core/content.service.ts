import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { TinyMCEContentModel } from '../core/content.model';
import { flatMap, map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'tinymce';
import { of, Subject } from 'rxjs';

@Injectable()
export class ContentService {
  contentToInsert: string = '';
  items: Observable<any>;
  msgVal$ = new Subject<string>();
  id: string;
  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) {}

  getContentByUserId(userId: string, pageTitle: string): any {
    pageTitle = pageTitle !== '' ? pageTitle : 'Home';
    const collection = this.db.collection<TinyMCEContentModel>(
      'content',
      (ref) => ref.where('uid', '==', userId).where('pageTitle', '==', pageTitle)
    );
    const pages$ = collection.valueChanges().pipe(
      map((pages) => {
        const page = pages[0];
        return page;
      })
    );

    return pages$;
  }

  getPagesByUserId(userId: string) {
     return this.db.collection(
      'content',
      (ref) => ref.where('uid', '==', userId)
        .orderBy('pageTitle')
    )
    .get()
    .pipe(
      map(
        (result) => {
           return this.convertSnaps<TinyMCEContentModel>(result);
        })
    )
  }

  convertSnaps<T>(results) {
    return <T[]> results.docs.map(snap => {
         return {
             id: snap.id,
             ...snap.data()
         }
     });
}

  saveContent(content: TinyMCEContentModel) {
    return this.db.collection('content').add(content);
  }

  updateContent(content: TinyMCEContentModel, userId: string) {
    debugger;
    const docToUpdate = this.db.collection<TinyMCEContentModel>(
      'content',
      (ref) => ref.where('uid', '==', userId).where('pageTitle', '==', content.pageTitle)
    ).get()
    .pipe(
        tap(result => {
          debugger;
          console.log(result);
          const updatedDoc = this.convertSnaps<TinyMCEContentModel>(result);
          const updatedDocId = result.docs[0].id;
          this.db.doc('/content/' + updatedDocId).update(content);
        })
    )
    .subscribe();

    // this.db
    //   .doc("/content/")
    //   //.doc("/content/3Eobv0FnBXd2ZzfbpLs9")
    //   .snapshotChanges()
    //   .subscribe((snap) => {
    //     debugger;
    //     const docId = snap.payload.id;

    //     this.db.doc("/content/" + docId).update(content);
      // });
  }

  createContent(data) {
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('content')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  createCoffeeOrder(data) {
    return new Promise<any>((resolve, reject) => {
      this.db
        .collection('coffeeOrders')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }
}
