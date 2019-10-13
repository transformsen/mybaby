import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, startWith, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NameDetail } from '../model/name-detail';
import { FormControl } from '@angular/forms';
import { NameDetailsService } from '../service/name-details.service';

@Component({
  selector: 'app-filter-names',
  templateUrl: './filter-names.component.html',
  styleUrls: ['./filter-names.component.scss'],
})
export class FilterNamesComponent implements OnInit {

  public names$: Observable<NameDetail[]>;
  public filterBox: FormControl = new FormControl('');

  constructor(private route: ActivatedRoute,
              private nameService: NameDetailsService,
              private router: Router) { }

  ngOnInit() {
    this.names$ = this.route.params.pipe(
      map((params)=>{
        const religion = (params.religion == 'all') ? '' : params.religion;
        return [params.gender, religion]
      }), switchMap(([gender, religion])=>{
        console.log(`gender=${gender}, religion=${religion}`)
        return this.filter(gender, religion)   
      })
    )
  }

  filter(gender: string, religion: string) : Observable<NameDetail[]>{
    return this.filterBox.valueChanges.pipe(
      startWith(''),
      distinctUntilChanged(),
      switchMap(
        (changes)=>{
          console.log('changes',changes)
          return this.nameService.fetchNameDetails(gender, religion, changes)
        }
      )
    )     
  }

  openNameDetails(name: NameDetail){
    this.router.navigate([name.name], {relativeTo: this.route})
  }
}
