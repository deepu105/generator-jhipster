import { Component, OnInit, Inject } from '@angular/core';

import { ProfileService } from '../../components/profiles/profile.service';
<%_ if (enableTranslation){ _%>
import { <%=jhiPrefixCapitalized%>LanguageService } from '../../components/language/language.service';
<%_ } _%>
import { Principal } from '../../components/auth/principal.service';
import { AuthService } from '../../components/auth/auth.service';

@Component({
    selector: 'navbar',
    templateUrl: 'app/layouts/navbar/navbar.html'
})
export class NavbarComponent implements OnInit {

    changeLanguage: Function;
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;

    constructor(
        @Inject('$state') private $state,
        @Inject('LoginService') private loginService,
        <%_ if (enableTranslation){ _%>
        private languageService: <%=jhiPrefixCapitalized%>LanguageService,
        <%_ } _%>
        private principal: Principal,
        private authService: AuthService,
        private profileService: ProfileService
    ) { }

    ngOnInit() {
        <%_ if (enableTranslation){ _%>
        this.languageService.getAll().then((languages) => {
            this.languages = languages;
        });

        this.changeLanguage = this.languageService.changeLanguage;
        <%_ } _%>

        this.profileService.getProfileInfo().subscribe(profileInfo => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
        });
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.collapseNavbar();
        this.loginService.open();
    }

    logout() {
        this.collapseNavbar();
        this.authService.logout();
        this.$state.go('home');
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }
}
