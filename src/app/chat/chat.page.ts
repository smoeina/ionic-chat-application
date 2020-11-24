import { Component, OnInit } from '@angular/core';
import {SocketService} from "../socket.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  message_to :string;
  message_from:string;
  messages = [];
  public now: Date = new Date();
  constructor(private socket_holder: SocketService,private router: Router) { }

  ngOnInit() {
      console.log(this.socket_holder.get_username())
      this.message_to = this.socket_holder.get_send_message_to_user();
      console.log("chat to:")
      console.log(this.socket_holder.get_send_message_to_user());
      this.message_from = this.socket_holder.get_username();
          setInterval(() => {
              this.now = new Date();
          }, 1);



      this.socket_holder.get_socket().emit("FirstFetch", this.message_from,this.message_to);
      this.socket_holder.get_socket().on("Fetch", (data) => {
          console.log(data);
          this.messages.push(
              {
                  'message_from': data.split("&&")[0],
                  'message_to': data.split("&&")[1],
                  'message': data.split("&&")[2],
                  'date':data.split("&&")[3]
              }
          )
      })


      this.socket_holder.get_socket().on("SendMessageToClient", (data) => {
        console.log(data.split("&&"));
        this.messages.push(
            {
              'message_from': data.split("&&")[0],
              'message_to': data.split("&&")[1],
              'message': data.split("&&")[2],
                'date':data.split("&&")[3]
            }
        )
    })
  }
  click_on_send(message){
      this.messages.push(
          {
            'message_from': this.message_from,
            'message_to': this.message_to,
            'message': message,
              'date':this.now.getHours()+":"+this.now.getMinutes()
          }
      )
      this.socket_holder.get_socket().emit("SendMessage", this.message_from,this.message_to,message);
  }
  get_socket_holder(){
    return this.socket_holder
  }
    backClick(){
      this.router.navigateByUrl("/tabs/tab1")
    }
}
