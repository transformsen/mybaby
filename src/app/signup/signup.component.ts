import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.maxLength(20)])
  });

  constructor(private authService: AuthService,
              private toastController: ToastController,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {}

  signUp(){
    const signUpDetails= this.signupForm.value;
    const email: string = signUpDetails.email;
    const password: string = signUpDetails.password;
    const username: string = signUpDetails.username;
    this.authService.signUp(email, password,username)
      .subscribe(_ => {
        this.router.navigate(['../login'], {relativeTo: this.route});
      },
      (error)=>{
        console.log('signup error is,', error)
        this.presentToast(error.message)
      })
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      color: 'danger',
      duration: 2000
    });
    toast.present();
  }

}
