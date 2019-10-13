import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { NameDetail } from '../model/name-detail';
import { AngularFirestore } from '@angular/fire/firestore';
import { shareReplay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NameDetailsService {

  constructor(private firestore: AngularFirestore) { }

  fetchNameDetails(gender: string, religion: string, name: string = ''): Observable<NameDetail[]> {
    return this.firestore.collection<NameDetail>('names',
      ref => {
        let query = ref.where('gender', '==', gender)
        if (religion) {
          query = query.where('religion', '==', religion)
        }
        return query;
      }
    ).snapshotChanges()
      .pipe(
        shareReplay(),
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as NameDetail;
          const id = a.payload.doc.id;
          return { id, ...data };
        })),
        map(nameDetails => {
          const filteredNames = nameDetails.filter(
            (nameDetail) => {
              if (name)
                return nameDetail.name.toLocaleLowerCase()
                  .includes(name.toLocaleLowerCase())
              else
                return true
            }
          )
          return filteredNames.sort((name1, name2) => name1.name.localeCompare(name2.name))
        })
      )
  }

  addName(nameDetail: NameDetail){
    return from(this.firestore.collection('names').add(nameDetail))
  }

}