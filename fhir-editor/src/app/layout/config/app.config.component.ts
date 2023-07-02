import { Component, Input } from '@angular/core';
import { LayoutService } from "../service/app.layout.service";
import { MenuService } from "../app.menu.service";
import {
    DefaultLangChangeEvent,
    LangChangeEvent,
    TranslateService,
    TranslationChangeEvent
  } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html'
})
export class AppConfigComponent {

    @Input() minimal: boolean = false;

    scales: number[] = [12, 13, 14, 15, 16];

    constructor(public layoutService: LayoutService,
                private primengConfig: PrimeNGConfig, 
                private translate: TranslateService,
                public menuService: MenuService) {

                    const lng = this.translate.getBrowserLang();
                    this.translate.setDefaultLang(lng!);
                    this.translate.use(lng!);
                    const supportedLangs = ["en", "pt"];
                    supportedLangs.forEach((language) => {
                        this.translate.reloadLang(language);
                    });

                    this.translate.onLangChange
                    .subscribe((event: LangChangeEvent) => {
                      console.log('onLangChange', event);
                    });
              
                  this.translate.onTranslationChange
                    .subscribe((event: TranslationChangeEvent) => {
                      console.log('onTranslationChange', event);
                    });
              
                  this.translate.onDefaultLangChange
                    .subscribe((event: DefaultLangChangeEvent) => {
                      console.log('onDefaultLangChange', event);
                    });
    }

    changeTranslate(lang: string) {
        this.translate.currentLang = '';
        this.translate.use(lang);
        this.translate.get('primeng').subscribe(res => this.primengConfig.setTranslation(res));
    }

    get visible(): boolean {
        return this.layoutService.state.configSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.configSidebarVisible = _val;
    }

    get scale(): number {
        return this.layoutService.config.scale;
    }

    set scale(_val: number) {
        this.layoutService.config.scale = _val;
    }

    get menuMode(): string {
        return this.layoutService.config.menuMode;
    }

    set menuMode(_val: string) {
        this.layoutService.config.menuMode = _val;
    }
    
    get menuLang(): string {
        return this.translate.currentLang;
    }
    
    set menuLang(_val: string) {
        this.changeTranslate(_val);
    }

    get inputStyle(): string {
        return this.layoutService.config.inputStyle;
    }

    set inputStyle(_val: string) {
        this.layoutService.config.inputStyle = _val;
    }

    get ripple(): boolean {
        return this.layoutService.config.ripple;
    }

    set ripple(_val: boolean) {
        this.layoutService.config.ripple = _val;
    }

    onConfigButtonClick() {
        this.layoutService.showConfigSidebar();
    }

    changeTheme(theme: string, colorScheme: string) {
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const newHref = themeLink.getAttribute('href')!.replace(this.layoutService.config.theme, theme);
        this.layoutService.config.colorScheme
        this.replaceThemeLink(newHref, () => {
            this.layoutService.config.theme = theme;
            this.layoutService.config.colorScheme = colorScheme;
            this.layoutService.onConfigUpdate();
        });
    }

    replaceThemeLink(href: string, onComplete: Function) {
        const id = 'theme-css';
        const themeLink = <HTMLLinkElement>document.getElementById('theme-css');
        const cloneLinkElement = <HTMLLinkElement>themeLink.cloneNode(true);

        cloneLinkElement.setAttribute('href', href);
        cloneLinkElement.setAttribute('id', id + '-clone');

        themeLink.parentNode!.insertBefore(cloneLinkElement, themeLink.nextSibling);

        cloneLinkElement.addEventListener('load', () => {
            themeLink.remove();
            cloneLinkElement.setAttribute('id', id);
            onComplete();
        });
    }

    decrementScale() {
        this.scale--;
        this.applyScale();
    }

    incrementScale() {
        this.scale++;
        this.applyScale();
    }

    applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }
}
