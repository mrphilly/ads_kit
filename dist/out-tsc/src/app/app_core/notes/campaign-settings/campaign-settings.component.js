"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var auth_service_1 = require("../../core/auth.service");
var notes_service_1 = require("../notes.service");
var CampaignSettingsComponent = /** @class */ (function () {
    function CampaignSettingsComponent(notesService, auth, location) {
        var _this = this;
        this.notesService = notesService;
        this.auth = auth;
        this.location = location;
        this.isEditor = false;
        this.isCampaignSettings = true;
        this.title = "Campaign Management";
        this.auth.user.forEach(function (value) {
            _this.uid = value.uid;
            _this.email = value.email;
        });
    }
    CampaignSettingsComponent.prototype.toggleEditor = function () {
    };
    CampaignSettingsComponent.prototype.toggleCampaignSettings = function () {
        this.isEditor = false;
        this.isCampaignSettings = true;
    };
    CampaignSettingsComponent.prototype.goBack = function () {
        this.location.back();
    };
    CampaignSettingsComponent.prototype.ngOnInit = function () {
        /*    this.campagne = this.notesService.getData()
             .forEach(snap => {
               if (snap = []) {
                 this.isCampaignSettings = false
               }
             }) */
    };
    CampaignSettingsComponent.prototype.createAdGroup = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CampaignSettingsComponent.prototype, "id_campagne", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CampaignSettingsComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CampaignSettingsComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CampaignSettingsComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CampaignSettingsComponent.prototype, "ad_group_id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CampaignSettingsComponent.prototype, "budget", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CampaignSettingsComponent.prototype, "budgetId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CampaignSettingsComponent.prototype, "dailyBudget", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CampaignSettingsComponent.prototype, "numberOfDays", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CampaignSettingsComponent.prototype, "_showCamp", void 0);
    CampaignSettingsComponent = __decorate([
        core_1.Component({
            selector: 'app-campaign-settings',
            templateUrl: './campaign-settings.component.html',
            styleUrls: ['./campaign-settings.component.css']
        }),
        __metadata("design:paramtypes", [notes_service_1.NotesService, auth_service_1.AuthService, common_1.Location])
    ], CampaignSettingsComponent);
    return CampaignSettingsComponent;
}());
exports.CampaignSettingsComponent = CampaignSettingsComponent;
//# sourceMappingURL=campaign-settings.component.js.map