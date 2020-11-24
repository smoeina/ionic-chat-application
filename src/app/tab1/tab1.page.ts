import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SocketService} from "../socket.service";
import {interval} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  @ViewChild('userlabel') userlabel : ElementRef;
  clicked_user = ""
  list_of_online_users = []
  constructor(private socket_holder: SocketService,private router: Router) {
  }

  get_online_users() {
    this.socket_holder.get_socket().emit("GetOnlineUsers", this.socket_holder.get_username(), (data) => {
      // console.log(data)
      // this.onlineUsers = data;
    })
    this.socket_holder.get_socket().on("GetOnlineUsers", (data) => {
      // console.log(data)
      if (data == "Failed") {
        console.log("Fetch users failed");
      } else {
        console.log(data);
        this.list_of_online_users = data.split(",")
      }
    })

  }
get_online_users_with_time_out(){
  interval(3000).subscribe(x => {
     this.get_online_users();
  });
}
  ngOnInit() {

    this.get_online_users_with_time_out()

  }

  async click(user:any) {
    this.socket_holder.set_send_message_to_user(user)
    await this.router.navigateByUrl('/chat', {replaceUrl: true});
  }
}
