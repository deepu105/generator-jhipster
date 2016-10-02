import { Component, Inject, OnInit } from '@angular/core';
<%_ if (enableTranslation){ _%>
import { <%=jhiPrefixCapitalized%>LanguageService } from '../../components/language/language.service';
<%_ } _%>
import { Principal } from '../../components/auth/principal.service';
import { Account } from '../../components/auth/account.service';

@Component({
    selector: 'settings',
    templateUrl: 'app/account/settings/settings.html'
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];

    constructor(private account: Account, private principal: Principal<%_ if (enableTranslation){ _%>, @Inject('$translate') private $translate,
                private languageService: <%=jhiPrefixCapitalized%>LanguageService <%_ } _%>) {}

    ngOnInit () {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
        });
        <%_ if (enableTranslation){ _%>
        this.languageService.getAll().then((languages) => {
            this.languages = languages;
        });
        <%_ } _%>
    }

    save () {
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
            });
            <%_ if (enableTranslation){ _%>
            this.languageService.getCurrent().then((current) => {
                if (this.settingsAccount.langKey !== current) {
                    this.$translate.use(this.settingsAccount.langKey);
                }
            });
            <%_ } _%>
        }, () => {
            this.success = null;
            this.error = 'ERROR';
        });
    }

    copyAccount (account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login
        };
    }
}
