import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.maxLength(20)])
  });

  constructor(private authService: AuthService,
              private toastController: ToastController,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {}

  login(){
    const loginDetail= this.loginForm.value;
    const email: string = loginDetail.email;
    const password: string = loginDetail.password;
    this.authService.login(email, password)
      .subscribe(respose=> {
        console.log('login respose,',respose)
        this.router.navigate([`../add-name/${respose.user.displayName}`], {relativeTo: this.route});
      },
      (error)=>{
        console.log('login error is,', error)
        this.presentToast('Login failed. Invalid user/password')
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
