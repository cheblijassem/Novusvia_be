import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from '../service/event.service';
import { SnotifyService, SnotifyPosition } from 'ng-snotify';
import { NgbCarouselConfig, NgbCarousel, NgbSlideEvent, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from '../service/local.service';
import { WeatherComponent } from '../weather/weather.component';

declare const TradingView: any;
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
    closeResult: string;
    showNavigationArrows = false;
    showNavigationIndicators = false;
    email: string;
    errors = [];
    events = [];
    form: FormGroup;
    loaded = true;
    loaderButton = false;
    // allows for loading with any symbol
    @Input() symbol: string;
    settings: any = {};
    // id for being able to check for errors using postMessage
    widgetId = '';
    interval = 13000;

    // wanted to be able to hide the widget if the symbol passed in was invalid (don't love their sad cloud face)
    @ViewChild('containerDiv', { static: false }) containerDiv: ElementRef;
    @ViewChild('carousel', { static: true }) carousel: NgbCarousel;
    @ViewChild('videoPlayer') videoplayer: ElementRef;
    @ViewChild('clock') clock: WeatherComponent;

    constructor(private localService: LocalService, private modalService: NgbModal, private snotifyService: SnotifyService,
        private _elRef: ElementRef, public fb: FormBuilder,
        private _eventService: EventService,
        private router: Router,
        config: NgbCarouselConfig,
        public translate: TranslateService) {
        this.form = this.fb.group({
            email: ['']
        });
        config.interval = this.interval;
        config.wrap = true;
        config.keyboard = false;
        config.pauseOnHover = false;
    }

    newsletter() {
        this.loaderButton = true;
        const formData: any = new FormData();
        formData.append('email', this.form.get('email').value);
        if (this.form.get('email').value === '') {
            this.snotifyService.error('email invalide essayer un email correcte', 'Attention', {
                timeout: 0,
                showProgressBar: false,
                closeOnClick: false,
                position: SnotifyPosition.centerCenter,
                buttons: [
                    { text: 'Fermer', action: (toast) => { console.log('Clicked: No'); this.snotifyService.remove(toast.id); }, bold: true },
                ]
            });
            this.loaderButton = false;
        }
        else {
            this._eventService.newsletter(formData).subscribe((result => {
                this.form.reset();
                this.snotifyService.success('Votre inscription a bien été prise en compte', 'Merci', {
                    timeout: 0,
                    showProgressBar: false,
                    closeOnClick: false,
                    position: SnotifyPosition.centerCenter,
                    buttons: [
                        { text: 'Fermer', action: (toast) => { console.log('Clicked: No'); this.snotifyService.remove(toast.id); }, bold: true },
                    ]
                });
                this.loaderButton = false;
            }), errors => {
                this.form.reset();
                this.snotifyService.warning('Vous êtes déjà inscrit à notre Newsletter', 'Merci', {
                    timeout: 0,
                    showProgressBar: false,
                    closeOnClick: false,
                    position: SnotifyPosition.centerCenter,
                    buttons: [
                        { text: 'Fermer', action: (toast) => { console.log('Clicked: No'); this.snotifyService.remove(toast.id); }, bold: true },
                    ]
                });
                this.loaderButton = false;
            });
        }


    }

    ngOnInit() {
        this.getEventslist();
        this.startClock();
        this.translate.addLangs(['en', 'fr']);
        if (localStorage.getItem('locale')) {
            const browserLang = localStorage.getItem('locale');
            this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
        } else {
            localStorage.setItem('locale', 'fr');
            this.translate.setDefaultLang('fr');
        }
        const lang = localStorage.getItem('locale');
        this.localService.watchStorage().subscribe((data: string) => {
            if (localStorage.getItem('locale')) {
                const browserLang = localStorage.getItem('locale');
                this.translate.use(browserLang.match(/en|fr/) ? browserLang : 'fr');
                this.clock.dateTime();
            } else {
                localStorage.setItem('locale', 'fr');
                this.translate.setDefaultLang('fr');
                this.clock.dateTime();
            }
        })
    }



    changeLang(language: string) {
        localStorage.setItem('locale', language);
        this.translate.use(language);
    }
    startClock() {
        setInterval(function () {
            this.time = (new Date().toLocaleTimeString());
        }, 1000);
    }
    getEventslist() {
        this._eventService.getLstEvents().subscribe(
            data => {
                this.events = data.results;
            },
            (error) => console.log(error)
        );
    }
    /* ngAfterViewInit() {
        // need to do this in AfterViewInit because of the Input
        setTimeout(() => {
            this.widgetId = `${this.symbol}_fundamnetals`;
     
            // postMessage listener for handling errors
            if (window.addEventListener) {
                window.addEventListener('message', (e: any) => {
                    if (e && e.data) {
                        console.log(e);
                        const payload = e.data;
                        // if the frameElementId is from this component, the symbol was no good and we should hide the widget
                        if (payload.name === 'tv-widget-no-data' && payload.frameElementId === this.widgetId) {
                            this.containerDiv.nativeElement.style.display = 'none';
                        }
                    }
                },
                    false,
                );
            }
     
            this.settings = {
                colorTheme: 'dark',
                dateRange: '3m',
                showChart: true,
                locale: 'en',
                isTransparent: true,
                largeChartUrl: '',
                height: 400,
                width: 400,
                plotLineColorGrowing: 'rgba(25, 118, 210, 1)',
                plotLineColorFalling: 'rgba(25, 118, 210, 1)',
                gridLineColor: 'rgba(42, 46, 57, 1)',
                scaleFontColor: 'rgba(120, 123, 134, 1)',
                belowLineFillColorGrowing: 'rgba(33, 150, 243, 0.12)',
                belowLineFillColorFalling: 'rgba(33, 150, 243, 0.12)',
                symbolActiveColor: 'rgba(33, 150, 243, 0.12)',
                tabs: [
                    {
                        'title': 'Indices',
                        'symbols': [
                            {
                                's': 'FX_IDC:EURTND',
                                'd': 'EURO / TUNISIAN DINAR'
                            },
                            {
                                's': 'FX_IDC:USDTND',
                                'd': 'U.S. DOLLAR / TUNISIAN DINAR'
                            },
                            {
                                's': 'FX_IDC:EURUSD',
                                'd': 'EURO / U.S. DOLLAR'
                            }
                        ],
                        'originalTitle': 'Indices'
                    }
                ]
            };
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
            script.async = true;
            script.id = this.widgetId;
            script.innerHTML = JSON.stringify(this.settings);
            this.containerDiv.nativeElement.appendChild(script);
     
        });
    } */


    onSlide(slideEvent: NgbSlideEvent) {
        if (this.interval === 13000) {
            this.interval = 8500;
            this.loaded = false;
        } else if (this.interval === 8500) {
            this.interval = 13000;
            this.videoplayer.nativeElement.pause();
            this.videoplayer.nativeElement.currentTime = 0;
            this.videoplayer.nativeElement.play();
        } else if (this.interval === 13000) {
            this.videoplayer.nativeElement.pause();
            this.videoplayer.nativeElement.currentTime = 0;
            this.interval = 8600;
        } else if (this.interval === 8600) {
            this.videoplayer.nativeElement.pause();
            this.videoplayer.nativeElement.currentTime = 0;
            this.interval = 8400;
        }
        else if (this.interval === 8400) {
            this.videoplayer.nativeElement.pause();
            this.videoplayer.nativeElement.currentTime = 0;
            this.interval = 8500;
        }
    }
    /* onSlide(slideEvent: NgbSlideEvent) {
        this.interval = 7000;
        this.loaded = false;
    } */
    open(content, type, modalDimension) {
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else if (modalDimension === 'lg' && type === '') {
            this.modalService.open(content, { size: 'lg', centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }

        else if (modalDimension === '' && type === 'Notification') {
            this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else {
            this.modalService.open(content, { centered: true }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}


