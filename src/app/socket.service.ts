import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {AlertController} from "@ionic/angular";
@Injectable({
  providedIn: 'root'
})

export class SocketService {
  username :string;
  message_to:string;
  constructor(private socket:Socket) {

  }

  set_socket(socket){
    this.socket = socket;
  }

  set_username(username){
    this.username = username
  }
  get_username(){
    return this.username
  }
  get_socket(){
    return this.socket
  }
  set_send_message_to_user(user){
    this.message_to = user;
  }
  get_send_message_to_user(){
    return this.message_to;
  }
}
