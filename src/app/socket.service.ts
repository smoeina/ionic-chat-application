import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {AlertController} from "@ionic/angular";
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  username :string;
  socket :Socket;
  constructor() {

  }
  connect_socket(){
    this.socket.connect()
    console.log("Socket Connected")
  }

  set_username(username){
    this.username = username
  }
  // async login(alertController: AlertController,) {
  //   this.socket.emit("Register",this.user,(data)=>{
  //     //console.log(data)
  //     // this.router.navigateByUrl('/tabs', {replaceUrl: true});
  //   })
  //   this.socket.on("Register",(data)=> {
  //     console.log(data)
  //     if (data == "Success"){
  //       this.SuccessAlert()
  //       this.router.navigateByUrl('/tabs', {replaceUrl: true});
  //
  //     }
  //     else if(data == "Failed")    {
  //       this.FailedAlert()
  //     }
  //   })
  //   console.log(this.user)
  //   return}

}
