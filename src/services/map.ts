import { Injectable } from '@angular/core';
import * as L from 'leaflet';



@Injectable()
export class MapService {

    constructor() { }

    myUuid: string;
    map: L.Map;
    currentLocation: any;

    initialise(): void {

        if (this.map) {
            return;
        }

        this.map = L.map("map", {
            center: [51.5, -0.09],
            zoom: 16,
            zoomControl: true,
            maxZoom: 18
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 18,
        }).addTo(this.map);

        this.map.locate({ setView: true, maxZoom: 17 });
        this.map.on('locationfound', (e) => this.onLocationFound(e));
    }

    onLocationFound(e) {
        this.currentLocation = e;
        L.marker(e.latlng).addTo(this.map)
            .bindPopup("You are here").openPopup();
    }

    locateMe() {
        this.map.panTo(this.currentLocation.latlng, {
            animate: true,
            duration: 0.5
        });
    }

    getMap() {
        return this.map;
    }

    getCurrentLocation() : L.LatLng{
        // let latlng: Array<number> = [
        //     this.currentLocation.latlng.lat,
        //     this.currentLocation.latlng.lng
        // ];
        console.log('tesing');
        return this.currentLocation.latlng;
    }
}