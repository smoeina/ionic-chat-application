import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { Storage } = Plugins;
import {SocketService} from "../../socket.service";
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})

export class IntroPage implements OnInit {
  @ViewChild(IonSlides)slides: IonSlides;
  constructor(private router: Router,private fileChooser: FileChooser) {

  }

  ngOnInit() {
    this.fileChooser.open()
        .then(uri => console.log(uri))
        .catch(e => console.log(e));
  }

  next() {
    this.slides.slideNext();
  }

  async start() {
    await this.router.navigateByUrl('/login', {replaceUrl: true});
  }
}
