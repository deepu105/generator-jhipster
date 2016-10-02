import { Component, OnInit, Inject } from '@angular/core';
import { Account } from '../shared/model/account.model';

@Component({
    selector: 'home',
    templateUrl: 'app/home/home.html'
})
export class HomeComponent implements OnInit {
    account: Account;
    login: Function;

    constructor(private principal: Principal,
                @Inject('$state') private $state,
                @Inject('LoginService') loginService) {
        this.login = loginService.open;
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.account = account;
        });
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    register() {
        this.$state.go('register');
    }
}
