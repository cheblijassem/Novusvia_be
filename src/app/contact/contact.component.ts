import { Component, OnInit, AfterViewInit, NgModule } from '@angular/core';

import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import TileJSON from 'ol/source/TileJSON';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import * as olProj from 'ol/proj';
import { Icon, Style } from 'ol/style';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})


export class ContactComponent implements OnInit, AfterViewInit {

  focus1: any;
  focus: any;
  mailText = '';
  baseMapLayer = new TileLayer({
    source: new OSM(),
    tileOptions: { crossOriginKeyword: 'anonymous' },
    transitionEffect: null
  });
  map = new Map();
  marker = new Feature({
    geometry: new Point(olProj.fromLonLat([51.53, 25.31]))
  });

  vectorSource = new VectorSource({
    features: [this.marker]
  });


  vectorLayerTunisie = new VectorLayer({
    source: this.vectorSource
  });


  vectorLayer = new VectorLayer({
    source: this.vectorSource
  });

  info: any;
  show = false;
  resolvedCaptcha = false;
  constructor() { }

  mailMe(mail) {
    this.mailText = 'mailto:' + mail + '+?subject=Novusvia:contact'; // add the links to body
    window.location.href = this.mailText;
  }
  moved() {
    const view = this.map.getView();
    const center = view.getCenter();
    this.info.innerHTML = this.formatCoordinate(center);
    console.log(olProj.toLonLat(center));
  }
  formatCoordinate(coordinate) {
    return ('\n    <table>\n      <tbody>\n        <tr><th>lon</th><td>' + (coordinate[0].toFixed(2)) + '</td></tr>\n        <tr><th>lat</th><td>' + (coordinate[1].toFixed(2)) + '</td></tr>\n      </tbody>\n    </table>');
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
    this.resolvedCaptcha = true;
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    const baseMapLayerBelgique = new TileLayer({
      source: new OSM({
        crossOrigin: 'anonymous'
      })
    });
    const baseMapLayerTunisie = new TileLayer({
      source: new OSM({
        crossOrigin: 'anonymous'
      })
    });
    const baseMapLayerQatar = new TileLayer({
      source: new OSM({
        crossOrigin: 'anonymous'
      })
    });

    const mapTunisie = new Map({
      layers: [baseMapLayerTunisie],
      target: document.getElementById('mapTunisie'),
      view: new View({
        center: olProj.fromLonLat([10.169629389189975, 36.83424453279147]),
        zoom: 13
      })
    });

    const mapBelgique = new Map({
      layers: [baseMapLayerBelgique],
      target: document.getElementById('mapBelgique'),
      view: new View({
        center: olProj.fromLonLat([4.32289834369357, 50.800896923256886]),
        zoom: 13
      })
    });

    const mapQatar = new Map({
      layers: [baseMapLayerQatar],
      target: document.getElementById('mapQatar'),
      view: new View({
        center: olProj.fromLonLat([51.52680914411375, 25.318169146133002]),
        zoom: 12
      })
    });
    const markerTunisie = new Feature({
      geometry: new Point(olProj.fromLonLat([10.169629389189975, 36.83424453279147]))
    });
    const markerBelgique = new Feature({
      geometry: new Point(olProj.fromLonLat([4.32289834369357, 50.800896923256886]))
    });
    const markerQatar = new Feature({
      geometry: new Point(olProj.fromLonLat([51.52680914411375, 25.318169146133002]))
    });

    const vectorSourceTunisie = new VectorSource({
      features: [markerTunisie]
    });
    const vectorSourceBelgique = new VectorSource({
      features: [markerBelgique]
    });
    const vectorSourceQatar = new VectorSource({
      features: [markerQatar]
    });

    markerTunisie.setStyle(new Style({
      image: new Icon(({
        src: './assets/img/map-markerTunisie.svg'
      }))
    }));
    markerBelgique.setStyle(new Style({
      image: new Icon(({
        src: './assets/img/map-markerBelgique.svg'
      }))
    }));
    markerQatar.setStyle(new Style({
      image: new Icon(({
        src: './assets/img/map-markerQatar.svg'
      }))
    }));
    const vectorLayerTunisie = new VectorLayer({
      source: vectorSourceTunisie
    });
    mapTunisie.addLayer(vectorLayerTunisie);

    const vectorLayerBelgique = new VectorLayer({
      source: vectorSourceBelgique
    });
    mapBelgique.addLayer(vectorLayerBelgique);

    const vectorLayerQatar = new VectorLayer({
      source: vectorSourceQatar
    });
    mapQatar.addLayer(vectorLayerQatar);

    this.info = document.getElementById('info');
    this.marker.setStyle(new Style({
      image: new Icon(({
        src: './assets/img/map-markerTunisie.svg'
      }))
    }));
    this.map = new Map({
      layers: [this.baseMapLayer],
      target: document.getElementById('map'),
      view: new View({
        center: olProj.fromLonLat([51.53, 25.31]),
        zoom: 13
      })
    });
    this.map.addLayer(this.vectorLayer);
  }
}
