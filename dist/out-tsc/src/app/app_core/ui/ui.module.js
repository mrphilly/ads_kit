"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var home_page_component_1 = require("./home-page/home-page.component");
var loading_spinner_component_1 = require("./loading-spinner/loading-spinner.component");
var main_nav_component_1 = require("./main-nav/main-nav.component");
var notification_message_component_1 = require("./notification-message/notification-message.component");
var ssr_page_component_1 = require("./ssr-page/ssr-page.component");
var user_form_component_1 = require("./user-form/user-form.component");
var user_login_component_1 = require("./user-login/user-login.component");
var user_profile_component_1 = require("./user-profile/user-profile.component");
var spinner_overlay_component_1 = require("./spinner-overlay-ui/spinner-overlay.component");
var UiModule = /** @class */ (function () {
    function UiModule() {
    }
    UiModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule, forms_1.ReactiveFormsModule, ng_bootstrap_1.NgbModule, forms_2.FormsModule],
            declarations: [
                user_login_component_1.UserLoginComponent,
                home_page_component_1.HomePageComponent,
                main_nav_component_1.MainNavComponent,
                loading_spinner_component_1.LoadingSpinnerComponent,
                notification_message_component_1.NotificationMessageComponent,
                user_profile_component_1.UserProfileComponent,
                user_form_component_1.UserFormComponent,
                ssr_page_component_1.SsrPageComponent,
                spinner_overlay_component_1.SpinnerOverlayComponent
            ],
            exports: [
                main_nav_component_1.MainNavComponent,
                loading_spinner_component_1.LoadingSpinnerComponent,
                notification_message_component_1.NotificationMessageComponent,
                user_profile_component_1.UserProfileComponent,
                user_form_component_1.UserFormComponent
            ]
        })
    ], UiModule);
    return UiModule;
}());
exports.UiModule = UiModule;
//# sourceMappingURL=ui.module.js.map