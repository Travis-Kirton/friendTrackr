import { Injectable } from '@angular/core';
import { MapService } from './map';
import { Http, Response } from "@angular/http";
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class UserService {
    constructor(private mapService: MapService,
        private http: Http,
        private storage: Storage) { }

    myUuid: any;

    storeUserLocation() {
         return this.storage.get('myUuid')
         .then((data) => {
             if (data == null) {
                 this.myUuid = Date.now() + Math.random().toString().replace('.', '');
                 this.storage.set('myUuid', this.myUuid);
             }
             this.myUuid = data;
            return this.http
            .put('https://friendtrackr-1504822977030.firebaseio.com/users/' + this.myUuid + '/user-location.json', this.mapService.getCurrentLocation())
            .map((response: Response) => {
                return response.json();
              }).toPromise();
        });
    }

}