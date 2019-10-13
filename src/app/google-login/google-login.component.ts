import { Component, OnInit } from '@angular/core';
import { NameDetailsService } from '../service/name-details.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss'],
})
export class GoogleLoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router, private route: ActivatedRoute,
              private toastController: ToastController ) { }

  ngOnInit() {}
 
  googleLogin(){    
    this.authService.googleLogin()
      .subscribe(user=>{
        console.log('googleLogin user=',user)
        const profile: any = user.additionalUserInfo.profile;
        this.router.navigate([`../add-name/${profile.name}`], 
          {relativeTo: this.route})
      }, error=>{
        console.log('googleLogin error=',error)
        this.presentToast(error.message)
      })
  }
  close(){
    this.router.navigate([`/`], 
          {relativeTo: this.route})
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
