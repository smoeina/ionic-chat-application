import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import {Socket} from "ngx-socket-io";
import {SocketService} from "../../socket.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  credentials: FormGroup;
  user :any;
  constructor(
      private fb: FormBuilder,
      private alertController: AlertController,
      private router: Router,
      private loadingController: LoadingController,
      private socket: Socket,
      private so:SocketService
  ) {}
    async SuccessAlert() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'یا الله',
            subHeader: 'خوش اومدی',
            message: 'لاگین با موفقیت انجام شد',
            buttons: ['باش']
        });

        await alert.present();
    }
    async FailedAlert() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'ورود ناموفق ',
            subHeader: ':(',
            message: 'نام کاربری رو یادت رفته فک کنم',
            buttons: ['خواستم امتحانت کنم']
        });

        await alert.present();
    }
  ngOnInit() {
      console.log("This is Username:")
      console.log(this.so.get_username())

      this.socket.connect()
    this.credentials = this.fb.group({
      username: ['UserName'],
    });
  }

  async login() {
      this.socket.emit("Register",this.user,(data)=>{
          //console.log(data)
          // this.router.navigateByUrl('/tabs', {replaceUrl: true});
      })
      this.socket.on("Register",(data)=> {
          console.log(data)
          if (data == "Success"){
              this.SuccessAlert()
              this.router.navigateByUrl('/tabs', {replaceUrl: true});

      }
      else if(data == "Failed")    {
              this.FailedAlert()
          }
      })
      console.log(this.user)
      return
  }

  // Easy access for form fields
  get username() {
    return this.credentials.get('username');
  }


}
