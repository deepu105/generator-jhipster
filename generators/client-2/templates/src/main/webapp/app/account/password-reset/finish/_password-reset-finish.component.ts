import { Component, OnInit, Inject, Renderer, ElementRef } from '@angular/core';
import { PasswordResetFinish } from './password-reset-finish.service';

@Component({
    selector: 'password-reset-finish',
    templateUrl: 'app/account/password-reset/finish/password-reset-finish.html'
})
export class PasswordResetFinishComponent implements OnInit {
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    keyMissing: boolean;
    login: any;
    resetAccount: any;
    success: string;

    constructor(private passwordResetFinish: PasswordResetFinish,
        @Inject('LoginService') private LoginService,
        @Inject('$stateParams') private $stateParams,
        private elementRef: ElementRef, private renderer: Renderer
    ) {}

    ngOnInit() {
        this.resetAccount = {};
        this.login = this.LoginService.open;
        this.keyMissing = !this.$stateParams || !this.$stateParams.key;
    }

    ngAfterViewInit() {
        if (this.elementRef.nativeElement.querySelector('#password') != null) {
          this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#password'), 'focus', []);
        }
    }

    finishReset() {
        this.doNotMatch = null;
        this.error = null;
        if (this.resetAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.passwordResetFinish.save({key: this.$stateParams.key, newPassword: this.resetAccount.password}).subscribe(() => {
                this.success = 'OK';
            }, () => {
                this.success = null;
                this.error = 'ERROR';
            });
        }
    }
}
