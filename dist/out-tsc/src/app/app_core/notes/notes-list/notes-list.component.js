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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var rxjs_1 = require("rxjs");
var notes_service_1 = require("../notes.service");
var auth_service_1 = require("../../core/auth.service");
var note_detail_component_1 = require("../note-detail/note-detail.component");
var ad_groupe_service_1 = require("../ad-groupe.service");
var sweetalert2_1 = require("sweetalert2");
var $ = require("jquery");
var environment_1 = require("../../../../environments/environment");
var router_2 = require("@angular/router");
//const SERVER_URL = "http://127.0.0.1:5000"
var SERVER_URL = environment_1.SERVER.url;
var REDIRECT_URL = environment_1.SERVER.url_redirect;
var NotesListComponent = /** @class */ (function () {
    function NotesListComponent(notesService, auth, http, adgroup_service, route, router) {
        var _this = this;
        this.notesService = notesService;
        this.auth = auth;
        this.http = http;
        this.adgroup_service = adgroup_service;
        this.route = route;
        this.router = router;
        this.icon_1 = "icon icon-inbox text-purple s-18";
        this.icon_2 = "icon icon-star-o lime-text s-18";
        this.icon_3 = "";
        this.icon_4 = "";
        this.icon_5 = "";
        this.text_1 = "Liste des camapagnes";
        this.text_2 = "Ajouter une campagne";
        this.text_3 = "";
        this.text_4 = "";
        this.text_5 = "";
        this.icon_retour = "icon-long-arrow-left";
        this.btn_retour = "btn-fab btn-fab-sm shadow btn-primary";
        this.action_2 = function () { _this.toggleAddCampaignBlock(); };
        this.title = "";
        this.isCampaign = false;
        this.dure_campagne = 0;
        //Si aucune campagne le bloc pour crÃ©er une nouvelle campagne
        this._addCampaign_ = false;
        this._init_campagne = false;
        //Le bloc pour afficher la liste des campagnes
        this.showList = false;
        //Le bloc pour afficher la page pour une campagne donnÃ©e
        this._showCampaignSettings_ = false;
        this.isCreating = false;
        this.numberOfNotifications = 0;
        var self = this;
        this.auth.user.forEach(function (value) {
            _this.uid = value.uid;
            _this.email = value.email;
            _this.accountValue = value.account_value;
            _this.email_letter = value.email.charAt(0);
            _this.notes = _this.notesService.getListCampaign(value.uid);
            _this.notes.forEach(function (child) {
                //console.log(child.length)
                if (child.length > 0) {
                    //console.log(child.length)
                    _this.toggleListCampaign();
                }
                else {
                    _this.initCampagne();
                }
            });
        });
        this.auth.notificationAccount.forEach(function (value) {
            if (value.notification != "") {
                _this.numberOfNotifications = 1;
                _this.notificationAccountValue = value.notification;
            }
        });
    }
    NotesListComponent.prototype.ngAfterViewInit = function () {
        //var init_note = new NotesService(this.uid)
        this._showCampaignSettings_ = this.child._showCampaignSettings_;
    };
    NotesListComponent.prototype.decryptMoney = function (encrypted, uid) {
        return new Promise(function (resolve) {
            var status = [];
            var CryptoJS = require('crypto-js');
            var cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Hex.parse(encrypted.toString()) });
            localStorage.getItem("");
            var bytes = CryptoJS.AES.decrypt(cipherParams, CryptoJS.enc.Hex.parse(uid), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding });
            console.log('Decrypted:' + bytes.toString(CryptoJS.enc.Utf8));
            status.push({
                "status": "ok",
                "content": bytes.toString(CryptoJS.enc.Utf8)
            });
            resolve(status);
        });
    };
    NotesListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var self = this;
        this.route.params.subscribe(function (params) {
            if (typeof (params['money']) != "undefined") {
                _this.isCreating = true;
                _this.auth.user.forEach(function (data) {
                    _this.decryptMoney(params['money'], data.uid).then(function (res) {
                        if (res[0]['status'] == "ok") {
                            alert(res[0]['status']);
                            alert(res[0]['content']);
                            _this.auth.updateUser(data.uid, { account_value: parseInt(res[0]['content']) });
                            _this.auth.getInfos(data.uid).subscribe(function (el) {
                                _this.auth.updateNotification(el[0]['id'], { notification: "" }).then(function () {
                                    sweetalert2_1.default.fire({
                                        title: 'Service Rechargement!',
                                        text: 'Compte mis à jour avec succès.',
                                        type: 'success',
                                        showCancelButton: false,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Ok'
                                    }).then(function (result) {
                                        if (result.value) {
                                            window.location.replace(REDIRECT_URL);
                                            _this.isCreating = false;
                                        }
                                    });
                                });
                            });
                        }
                    });
                });
                // In a real app: dispatch action to load the details here.
            }
            if (typeof (params['money']) != "undefined" && typeof (params['idC']) != "undefined") {
                if (params['money'] == 0) {
                    setTimeout(function () {
                        document.getElementById(params['idC']).click();
                    }, 2000);
                    setTimeout(function () {
                        document.getElementById("v-pills-timeline-tab").click();
                        _this.isCreating = false;
                    }, 2000);
                }
                else {
                    _this.isCreating = true;
                    _this.auth.user.forEach(function (data) {
                        _this.auth.updateUser(data.uid, { account_value: params['money'] });
                        _this.auth.getInfos(data.uid).subscribe(function (el) {
                            _this.auth.updateNotification(el[0]['id'], { notification: "" }).then(function () {
                                sweetalert2_1.default.fire({
                                    title: 'Service Rechargement!',
                                    text: 'Compte mis à jour avec succès.',
                                    type: 'success',
                                    showCancelButton: false,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Ok'
                                }).then(function (result) {
                                    if (result.value) {
                                        window.location.replace(REDIRECT_URL);
                                        _this.isCreating = false;
                                        document.getElementById(params['idC']).click();
                                        setTimeout(function () {
                                            document.getElementById("v-pills-timeline-tab").click();
                                        }, 2000);
                                    }
                                });
                            });
                        });
                    });
                }
                // In a real app: dispatch action to load the details here.
            }
            if (typeof (params['idC']) != "undefined" && typeof (params['campagne_id']) && params['budget'] != "undefined" && params['dailyBudget'] != "undefined" && params['numberOfDays'] != "undefined") {
                _this.isCreating = true;
                _this.notesService.updateNote(params['idC'], { budget: params["budget"], dailyBudget: params['dailyBudget'], numberOfDays: params['numberOfDays'] }).then(function () {
                    sweetalert2_1.default.fire({
                        title: 'Service Campagne!',
                        text: 'Budget mis à jour.',
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then(function (result) {
                        if (result.value) {
                            window.location.replace(REDIRECT_URL);
                            _this.isCreating = false;
                            document.getElementById(params['idC']).click();
                        }
                    });
                });
                // In a real app: dispatch action to load the details here.
            }
        });
        /* $(document).ready(() => {
     
       const urlParams = new URLSearchParams(window.location.search);
       const myParam = urlParams.get('pay');
       var timerInterval;
     
          if (myParam != undefined) {
            const money = urlParams.get('money');
         this.auth.user.forEach(data=>{
           
           this.auth.updateValueAccount(data.uid, money).then(res => {
                         if (res == "ok") {
                           Swal.fire({
           title: 'Service Rechargement!',
           text: 'Compte mis à jour avec succès.',
           type: 'success',
           showCancelButton: false,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Ok'
         }).then((result) => {
           if (result.value) {
             window.history.pushState("", "","/")
           }
         })
                         }
                       })
         })
       } else {
         
       }
     }); */
    };
    NotesListComponent.prototype.go1 = function () {
        window.location.reload();
    };
    NotesListComponent.prototype.go = function () {
        window.location.replace(environment_1.SERVER.url_redirect);
    };
    NotesListComponent.prototype.initCampagne = function () {
        document.getElementById('body').classList.add('adafri-background');
        this._init_campagne = true;
        this.title = "Aucune campagne trouvÃ©e";
        this.showList = true;
    };
    NotesListComponent.prototype.toggleListCampaign = function () {
        this._addCampaign_ = false;
        this.showList = false;
        //this.child._showCampaignSettings_=false
        /*   this.title = "Liste des campagnes" */
    };
    NotesListComponent.prototype.newCampaign = function () {
        this._addCampaign_ = true;
        this.title = "Ajouter une nouvelle campagne";
    };
    NotesListComponent.prototype.showCampaign = function () {
        this._showCampaignSettings_ = true;
        this.showList = false;
        this._addCampaign_ = false;
        this.title = "Paramètre de campagne";
    };
    NotesListComponent.prototype.toggleCampaign = function () {
        this.isCampaign = true;
    };
    NotesListComponent.prototype.toggleAddCampaignBlock = function () {
        /* this._addCampaign_ = true
        this.showList = true
        this.child._showCampaignSettings_ = false
       
        */
        this.router.navigate(['createCampaign']);
    };
    NotesListComponent.prototype.goBack = function () {
        this._addCampaign_ = false;
    };
    NotesListComponent.prototype.clickHandler = function (id, name, status, startDate, endDate, startDateFrench, endDateFrench, servingStatus, budgetId) {
        var _this = this;
        console.log(this.uid);
        console.log(name);
        console.log(status);
        this.notesService.createCampaign(id, name, status, startDate, endDate, startDateFrench, endDateFrench, servingStatus, budgetId).then(function (res) {
            if (res == "ok") {
                sweetalert2_1.default.fire({
                    title: 'Service Campagne!',
                    text: 'Votre campagne a été ajouté avec succès.',
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then(function (result) {
                    if (result.value) {
                        _this.name = '';
                        _this.id_campagne = '';
                        _this.isCreating = false;
                        _this._init_campagne = false;
                    }
                    else {
                        _this.name = '';
                        _this.id_campagne = '';
                        _this.isCreating = false;
                        _this._init_campagne = false;
                    }
                });
            }
        });
    };
    NotesListComponent.prototype.addCampaign = function () {
        var _this = this;
        this.isCreating = true;
        var name = $("#campagne").val();
        this.http.post(SERVER_URL + '/addCampaign', {
            'email': this.email,
            'campaign_name': name
        })
            .subscribe(function (res) {
            console.log(res);
            console.log(res['budgetId']);
            if (res['status'] == "ok") {
                _this.id_campagne = res['id'];
                _this.status = res['status_campaign'];
                _this.ad_group_id = res['ad_group_id'];
                _this.clickHandler(_this.id_campagne, name, _this.status, res['startDate'], res['endDate'], res['startDateFrench'], res['endDateFrench'], res['servingStatus'], res['budgetId']);
            }
            else {
                sweetalert2_1.default.fire({
                    title: 'Service Campagne!',
                    text: 'Erreur.',
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then(function (result) {
                    if (result.value) { }
                });
            }
        }, function (err) {
            sweetalert2_1.default.fire({
                title: 'Service Campagne!',
                text: 'Erreur.',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            }).then(function (result) {
                if (result.value) { }
            });
        });
        return;
    };
    NotesListComponent.prototype.loadScript = function (src) {
        return __awaiter(this, void 0, void 0, function () {
            var script;
            return __generator(this, function (_a) {
                script = document.createElement("script");
                script.type = "text/javascript";
                document.getElementsByTagName("body")[0].appendChild(script);
                script.src = src;
                $("body").css("background-image", "url('')");
                return [2 /*return*/];
            });
        });
    };
    NotesListComponent.prototype.defineAmountAccount = function () {
        var self = this;
        this.montant = $("#montant").val();
        if (this.montant < 10000) {
            $('#error_recharge').show();
        }
        else {
            $('#closeModalRecharge').trigger('click');
            var self = this;
            this.isCreating = true;
            setTimeout(function () {
                var btn = document.getElementById("budgetSet");
                var selector = pQuery(btn);
                (new PayExpresse({
                    item_id: 1,
                })).withOption({
                    requestTokenUrl: SERVER_URL + '/rechargeAmount/' + self.montant,
                    method: 'POST',
                    headers: {
                        "Accept": "application/json"
                    },
                    //prensentationMode   :   PayExpresse.OPEN_IN_POPUP,
                    prensentationMode: PayExpresse.OPEN_IN_POPUP,
                    didPopupClosed: function (is_completed, success_url, cancel_url) {
                        self.isCreating = false;
                        if (is_completed === true) {
                            alert(success_url);
                            //window.location.href = success_url; 
                        }
                        else {
                            self.isCreating = false;
                            //window.location.href = cancel_url
                        }
                    },
                    willGetToken: function () {
                        console.log("Je me prepare a obtenir un token");
                        selector.prop('disabled', true);
                        //var ads = []
                    },
                    didGetToken: function (token, redirectUrl) {
                        console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                        selector.prop('disabled', false);
                    },
                    didReceiveError: function (error) {
                        alert('erreur inconnu');
                        selector.prop('disabled', false);
                    },
                    didReceiveNonSuccessResponse: function (jsonResponse) {
                        console.log('non success response ', jsonResponse);
                        alert(jsonResponse.errors);
                        selector.prop('disabled', false);
                    }
                }).send({
                    pageBackgroundRadianStart: '#0178bc',
                    pageBackgroundRadianEnd: '#00bdda',
                    pageTextPrimaryColor: '#333',
                    paymentFormBackground: '#fff',
                    navControlNextBackgroundRadianStart: '#608d93',
                    navControlNextBackgroundRadianEnd: '#28314e',
                    navControlCancelBackgroundRadianStar: '#28314e',
                    navControlCancelBackgroundRadianEnd: '#608d93',
                    navControlTextColor: '#fff',
                    paymentListItemTextColor: '#555',
                    paymentListItemSelectedBackground: '#eee',
                    commingIconBackgroundRadianStart: '#0178bc',
                    commingIconBackgroundRadianEnd: '#00bdda',
                    commingIconTextColor: '#fff',
                    formInputBackgroundColor: '#eff1f2',
                    formInputBorderTopColor: '#e3e7eb',
                    formInputBorderLeftColor: '#7c7c7c',
                    totalIconBackgroundRadianStart: '#0178bc',
                    totalIconBackgroundRadianEnd: '#00bdda',
                    formLabelTextColor: '#292b2c',
                    alertDialogTextColor: '#333',
                    alertDialogConfirmButtonBackgroundColor: '#0178bc',
                    alertDialogConfirmButtonTextColor: '#fff',
                });
            }, 500);
        }
    };
    __decorate([
        core_1.ViewChild(note_detail_component_1.NoteDetailComponent),
        __metadata("design:type", note_detail_component_1.NoteDetailComponent)
    ], NotesListComponent.prototype, "child", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NotesListComponent.prototype, "icon_1", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NotesListComponent.prototype, "icon_2", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NotesListComponent.prototype, "icon_3", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NotesListComponent.prototype, "icon_4", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NotesListComponent.prototype, "icon_5", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NotesListComponent.prototype, "icon_retour", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], NotesListComponent.prototype, "btn_retour", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", rxjs_1.Observable)
    ], NotesListComponent.prototype, "notes", void 0);
    NotesListComponent = __decorate([
        core_1.Component({
            selector: 'notes-list',
            templateUrl: './notes-list.component.html',
            styleUrls: ['./notes-list.component.scss'],
            providers: [note_detail_component_1.NoteDetailComponent]
        }),
        __metadata("design:paramtypes", [notes_service_1.NotesService, auth_service_1.AuthService, http_1.HttpClient, ad_groupe_service_1.AdGroupService, router_1.ActivatedRoute, router_2.Router])
    ], NotesListComponent);
    return NotesListComponent;
}());
exports.NotesListComponent = NotesListComponent;
//# sourceMappingURL=notes-list.component.js.map