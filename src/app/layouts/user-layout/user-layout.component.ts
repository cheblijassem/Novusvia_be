import { Component, OnInit, Inject, Renderer2, ElementRef, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/common';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { AngularAgoraRtcService, Stream } from 'angular-agora-rtc'; // Add
import { TranslateService } from '@ngx-translate/core';
import { LocalService } from 'src/app/service/local.service';
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = 0;
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {
  private _router: Subscription;
  title = 'AgoraDemo';
  localStream: Stream; // Add
  remoteCalls: any = [];
  showvideo = true;
  calling = false;
  @Output() onchangeLang2 = new EventEmitter<string>();

  constructor(
    private localService: LocalService,
    private agoraService: AngularAgoraRtcService,
    private renderer: Renderer2,
    private router: Router,
    @Inject(DOCUMENT) private document: any,
    private element: ElementRef,
    public location: Location,
    public translate: TranslateService) {
    this.agoraService.createClient();
  }
  @HostListener('window:scroll', ['$event'])

  hasScrolled() {

    var st = window.pageYOffset;
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) {
      return;
    }

    var navbar = document.getElementsByTagName('nav')[0];

    // If they scrolled down and are past the navbar, add class .headroom--unpinned.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      if (navbar.classList.contains('headroom--pinned')) {
        navbar.classList.remove('headroom--pinned');
        navbar.classList.add('headroom--unpinned');
      }
      // $('.navbar.headroom--pinned').removeClass('headroom--pinned').addClass('headroom--unpinned');
    } else {
      // Scroll Up
      //  $(window).height()
      if (st + window.innerHeight < document.body.scrollHeight) {
        // $('.navbar.headroom--unpinned').removeClass('headroom--unpinned').addClass('headroom--pinned');
        if (navbar.classList.contains('headroom--unpinned')) {
          navbar.classList.remove('headroom--unpinned');
          navbar.classList.add('headroom--pinned');
        }
      }
    }

    lastScrollTop = st;
  };
  chat() {
    const s1 = document.createElement('script');
    const s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/5f4e95f94704467e89eb6a6e/default';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  }
  startCall() {
    this.calling = true;
    this.agoraService.client.join(null, '1000', null, (uid) => {
      this.localStream = this.agoraService.createStream(uid, true, null, null, false, false);
      this.subscribeToStreams();
    });
  }
  stopCall() {
    this.calling = false;
    console.log('stopCall')
  }

  private subscribeToStreams() {
    this.localStream.on('accessAllowed', () => {
      console.log('accessAllowed');
    });
    // The user has denied access to the camera and mic.
    this.localStream.on('accessDenied', () => {
      console.log('accessDenied');
    });

    this.localStream.init(() => {
      console.log('getUserMedia successfully');
      this.localStream.play('agora_local');
      this.agoraService.client.publish(this.localStream, function (err) {
        console.log('Publish local stream error: ' + err);
      });
      this.agoraService.client.on('stream-published', function (evt) {
        console.log('Publish local stream successfully');
      });
    }, function (err) {
      console.log('getUserMedia failed', err);
    });

    // Add
    this.agoraService.client.on('error', (err) => {
      console.log('Got error msg:', err.reason);
      if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
        this.agoraService.client.renewChannelKey('', () => {
          console.log('Renew channel key successfully');
        }, (err) => {
          console.log('Renew channel key failed: ', err);
        });
      }
    });

    // Add
    this.agoraService.client.on('stream-added', (evt) => {
      const stream = evt.stream;
      this.agoraService.client.subscribe(stream, (err) => {
        console.log('Subscribe stream failed', err);
      });
    });

    // Add
    this.agoraService.client.on('stream-subscribed', (evt) => {
      const stream = evt.stream;
      if (!this.remoteCalls.includes(`agora_remote${stream.getId()}`)) this.remoteCalls.push(`agora_remote${stream.getId()}`);
      setTimeout(() => stream.play(`agora_remote${stream.getId()}`), 2000);
    });

    // Add
    this.agoraService.client.on('stream-removed', (evt) => {
      const stream = evt.stream;
      stream.stop();
      this.remoteCalls = this.remoteCalls.filter(call => call !== `#agora_remote${stream.getId()}`);
      console.log(`Remote stream is removed ${stream.getId()}`);
    });

    // Add
    this.agoraService.client.on('peer-leave', (evt) => {
      const stream = evt.stream;
      if (stream) {
        stream.stop();
        this.remoteCalls = this.remoteCalls.filter(call => call === `#agora_remote${stream.getId()}`);
        console.log(`${evt.uid} left from this channel`);
      }
    });
  }

  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.localService.setItem('locale', language)
    this.translate.use(language);
    this.onchangeLang2.emit(language);
  }
  ngOnInit() {
    this.translate.addLangs(['fr', 'en']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      this.translate.use(browserLang.match(/fr|en/) ? browserLang : 'fr');
    } else {
      this.localService.setItem('locale', 'fr')
      this.translate.setDefaultLang('fr');
    }
    const lang = localStorage.getItem('locale');

    var navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      if (window.outerWidth > 991) {
        window.document.children[0].scrollTop = 0;
      } else {
        window.document.activeElement.scrollTop = 0;
      }
      this.renderer.listen('window', 'scroll', (event) => {
        const number = window.scrollY;
        if (number > 150 || window.pageYOffset > 150) {
          // add logic
          navbar.classList.add('headroom--not-top');
        } else {
          // remove logic
          navbar.classList.remove('headroom--not-top');
        }
      });
    });
    this.hasScrolled();
    this.chat();
  }



}
