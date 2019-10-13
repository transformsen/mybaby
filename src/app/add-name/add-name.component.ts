import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController, ToastController, Platform } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NameDetailsService } from '../service/name-details.service';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-add-name',
  templateUrl: './add-name.component.html',
  styleUrls: ['./add-name.component.scss'],
})
export class AddNameComponent implements OnInit, OnDestroy {

  nameForm: FormGroup;
  genders: any [] = [
                      {id: 'Boy', label:'Boy'},
                      {id: 'Girl', label:'Girl'}
                    ]
  rashis: any [] = [  'Dhanu',
                      'Kanya',
                      'Karka',
                      'Kumbha',
                      'Makar',
                      'Meena',
                      'Mesha',
                      'Mithun',
                      'Simha',
                      'Tula',
                      'Vrishabha',
                      'Vruschika'
                    ]
  religions: any[] = [
                      {id: 'Hindu' , label: 'Hindu'},
                      {id: 'Norway' , label: 'Norway'},
                      {id: 'Greek' , label: 'Greek'},
                      {id: 'Sikh' , label: 'Sikh'},
                      {id: 'Shinto' , label: 'Shinto'},
                      {id: 'Christianity' , label: 'Christianity'},
                      {id: 'Muslim' , label: 'Muslim'},
                      {id: 'Islam' , label: 'Islam'},
                      {id: 'Zoroastrianism' , label: 'Zoroastrianism'},
                      {id: 'Sanskrit' , label: 'Sanskrit'},
                      {id: 'Buddhism' , label: 'Buddhism'},
                      {id: 'Jainism' , label: 'Jainism'},
                      {id: 'Judaism' , label: 'Judaism'}
                  ]
      nakshatrs: string[] = [
                      'Anuradha',
                      'Arudra',
                      'Ashlesha',
                      'Aswini',
                      'Bharani',
                      'Chitra',
                      'Dhanishta',
                      'Hastha',
                      'Jyeshta ',
                      'Krithika',
                      'Makha',
                      'Moola',
                      'Mrigashiras',
                      'Poorva Phalguni',
                      'Punarvasu',
                      'Purvabhadra',
                      'Purvashada',
                      'Pushyami',
                      'Revathi',
                      'Rohini',
                      'Sathabisham',
                      'Sravana',
                      'Swati',
                      'Utharashada',
                      'Uttara Phalguni',
                      'Uttarabhadra',
                      'Visakha'
                    ]
  
  backSubscription: Subscription;
  username$: Observable<string>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private nameService: NameDetailsService,
              private toastController: ToastController,
              private authService: AuthService,
              private platform: Platform) {

  }

  ngOnInit() {
    this.username$ = this.route.params.pipe(map(param => param.username))
    this.nameForm = new FormGroup({
      name : new FormControl('', [Validators.required]),
      meaning : new FormControl('', Validators.required),
      origin : new FormControl(''),
      gender : new FormControl('', Validators.required),
      numerology: new FormControl('', [Validators.pattern('^\\d+$')]),
      syllables: new FormControl('', [Validators.pattern('^\\d.+$')]),
      religion : new FormControl('', Validators.required),
      rashi : new FormControl(''),
      nakshatra : new FormControl('')
    })
    this.backSubscription = this.platform.backButton.subscribe(_=>this.close())
  }

  ngOnDestroy(){
    this.backSubscription.unsubscribe()
  }

  addName(){
    this.nameService.addName(this.nameForm.value)
      .subscribe(
        resp => {
          console.log(resp)
          this.nameForm.reset();
          this.presentToast('Name successfuly added!', 'success')
                },
        error => {
          console.error(error)
          this.presentToast('Error! Name not added.', 'danger')
        }
      )
     
  }

  async presentToast(message, color) {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    toast.present();
  }

  close(){
    this.authService.googleSignout()
      .subscribe(_=>this.router.navigate(['/'], {relativeTo: this.route}),
                console.error)
    
  }

}
