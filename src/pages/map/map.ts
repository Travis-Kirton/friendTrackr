import { AuthService } from './../../services/auth';
import { UserService } from './../../services/users';
import { MapService } from './../../services/map';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit{

  constructor(public navCtrl: NavController,
              private mapService: MapService,
              private userService: UserService,
              private authService: AuthService) {}


  ngOnInit() {
    this.mapService.initialise();
    this.userService.storeUserLocation()
      .then()
      .catch(err => {
        console.log(err);
      })
  }

  onLocateMe() {
    this.mapService.locateMe();
  }

}
