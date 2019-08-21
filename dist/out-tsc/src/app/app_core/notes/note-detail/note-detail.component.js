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
var notes_service_1 = require("../notes.service");
var auth_service_1 = require("../../core/auth.service");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var ad_groupe_service_1 = require("../ad-groupe.service");
var NoteDetailComponent = /** @class */ (function () {
    function NoteDetailComponent(notesService, router, adgroup_service, auth) {
        this.notesService = notesService;
        this.router = router;
        this.adgroup_service = adgroup_service;
        this.auth = auth;
        this.goCampaign = false;
        this.title = "Liste des campagnes";
        this._showCampaignSettings_ = false;
        this.display_visuel = true;
    }
    NoteDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.user.forEach(function (child) {
            _this.uid = child.uid;
            //console.log(child.uid)
            _this.notes = _this.notesService.getListCampaign(child.uid);
            _this.notes.forEach(function (data) {
                if (data.length > 2) {
                    _this.display_visuel = false;
                }
            });
        });
    };
    NoteDetailComponent.prototype.addHeartToNote = function (val) {
        if (this.note.id) {
            this.notesService.updateNote(this.note.id, { hearts: val + 1 });
        }
        else {
            console.error('Note missing ID!');
        }
    };
    NoteDetailComponent.prototype.createCampaign = function () {
        this.router.navigate(['createCampaign']);
    };
    NoteDetailComponent.prototype.getDate = function (timestamp) {
        var time = parseInt(timestamp);
        return new Date(time).getDate() + "/" + new Date(time).getMonth() + "/" + new Date(time).getFullYear();
    };
    /*  deleteNote(id_campaign: string, id: string) {
       var data = {
         "id": id_campaign
       }
       $.ajax({
                       type: "POST",
                       url: "http://127.0.0.1:5000/deleteCampaign",
                       datatype: "json",
                       contentType: 'application/json',
                     success: function (response) {
                       //console.log(response)
                       if (response.status == "ok") {
                        //console.log(response.handler)
   
                       }
                     },
                     error: function(err) {
                         //console.log(err)
                       },
   
                       data: JSON.stringify(data),
                   }).then((res) => {
                    
                     this.notesService.deleteNote(id);
                   })
     } */
    NoteDetailComponent.prototype.goCampaignSettings = function (id, id_campagne, name, status, ad_group_id, budget, budgetId, dailyBudget, numberOfDays) {
        //console.log(id + " " + id_campagne + " " + name + " " + status + " "+dailyBudget+" "+numberOfDays);
        this.id_campagne = id_campagne;
        this.id = id;
        this.name = name;
        this.status = status;
        this.ad_group_id = ad_group_id;
        this.adgroup_service.campaign_id = id_campagne;
        this.budget = budget;
        this.budgetId = budgetId;
        this.dailyBudget = dailyBudget;
        this.numberOfDays = numberOfDays;
        this._showCampaignSettings_ = true;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NoteDetailComponent.prototype, "note", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", rxjs_1.Observable)
    ], NoteDetailComponent.prototype, "notes", void 0);
    NoteDetailComponent = __decorate([
        core_1.Component({
            selector: 'note-detail',
            templateUrl: './note-detail.component.html',
            styleUrls: ['./note-detail.component.scss'],
        }),
        core_1.Injectable(),
        __metadata("design:paramtypes", [notes_service_1.NotesService, router_1.Router, ad_groupe_service_1.AdGroupService, auth_service_1.AuthService])
    ], NoteDetailComponent);
    return NoteDetailComponent;
}());
exports.NoteDetailComponent = NoteDetailComponent;
//# sourceMappingURL=note-detail.component.js.map