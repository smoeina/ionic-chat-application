import { Component, OnInit } from '@angular/core';
import {Socket} from "ngx-socket-io";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  constructor(private socket: Socket) {
  }

  ngOnInit() {

    this.socket.connect()
    // this.socket.on("connect",x=>{
    //   console.log("connected");
    // })
    this.socket.emit("Register", "Hasan");
    this.socket.on("Register",x =>{
      console.log("Registered Successfully")
    })

  }

}
