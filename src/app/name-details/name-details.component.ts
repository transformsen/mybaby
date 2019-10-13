import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { NameDetail } from '../model/name-detail';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-name-details',
  templateUrl: './name-details.component.html',
  styleUrls: ['./name-details.component.scss'],
})
export class NameDetailsComponent implements OnInit {

  name$: Observable<NameDetail[]>;

  constructor(private route: ActivatedRoute,
    private firestore: AngularFirestore) { }

  ngOnInit() {
    this.name$ = this.route.params.pipe(
      switchMap(
        (param)=> this.firestore.collection<NameDetail>('names',
              ref => ref.where('name', '==', param.name)).valueChanges()
      )
    )
  }

}
