"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("./app_core/core/auth.guard");
var notes_list_component_1 = require("./app_core/notes/notes-list/notes-list.component");
var ssr_page_component_1 = require("./app_core/ui/ssr-page/ssr-page.component");
var user_login_component_1 = require("./app_core/ui/user-login/user-login.component");
var campaign_settings_component_1 = require("./app_core/notes/campaign-settings/campaign-settings.component");
var annonces_component_1 = require("./app_core/notes/annonces/annonces.component");
var create_campaign_component_1 = require("./app_core/notes/create-campaign/create-campaign.component");
var routes = [
    { path: 'login', component: user_login_component_1.UserLoginComponent },
    { path: '', component: notes_list_component_1.NotesListComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'CampaignList', component: notes_list_component_1.NotesListComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'createCampaign', component: create_campaign_component_1.CreateCampaignComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: ':money', component: notes_list_component_1.NotesListComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: ':money/:idC', component: notes_list_component_1.NotesListComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: ':idC/:campagne_id/:budget/:dailyBudget/:numberOfDays', component: notes_list_component_1.NotesListComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: ':idC/:budget/:dailyBudget/:numberOfDays', component: notes_list_component_1.NotesListComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'ads/:name/:idC/:idA/:ad_group_id/:campaign_id', component: annonces_component_1.AnnoncesComponent },
    { path: 'ads/:name/:idC/:idA/:ad_group_id/:campaign_id/:money/:id_ad_firebase', component: annonces_component_1.AnnoncesComponent },
    { path: 'ads/:name/:idC/:idA/:ad_group_id/:campaign_id/:budget/:dailyBudget/:numberOfDays/:id_ad_firebase', component: annonces_component_1.AnnoncesComponent },
    { path: 'ssr', component: ssr_page_component_1.SsrPageComponent },
    { path: 'campaign/:id', component: campaign_settings_component_1.CampaignSettingsComponent, canActivate: [auth_guard_1.AuthGuard] },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes, { useHash: true })],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map