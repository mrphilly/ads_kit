"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var firestore_1 = require("@angular/fire/firestore");
var http_1 = require("@angular/common/http");
var sweetalert2_1 = require("sweetalert2");
var firebase = require("firebase/app");
var auth_service_1 = require("../../app_core/core/auth.service");
var operators_1 = require("rxjs/operators");
var ad_groupe_service_1 = require("./ad-groupe.service");
var ads_service_1 = require("./ads.service");
var environment_1 = require("../../../environments/environment");
var SERVER_URL = environment_1.SERVER.url;
var NotesService = /** @class */ (function () {
    function NotesService(auth, afs, http, adGroupService, adsService) {
        var _this = this;
        this.auth = auth;
        this.afs = afs;
        this.http = http;
        this.adGroupService = adGroupService;
        this.adsService = adsService;
        this.today = new Date();
        this.text_error_date = "Cette campagne a déjà commencé";
        this.error_end_date = "Date invalide ou campagne déjà terminée";
        this.auth.user.forEach(function (child) {
            _this.uid = child.uid;
            _this.notesCollection = _this.afs.collection('notes', function (ref) { return ref.where('owner', '==', child.uid); });
        });
    }
    NotesService.prototype.ngOnInit = function () {
    };
    NotesService.prototype.campaignVerification = function (user_id, name) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.afs.collection('notes', function (ref) { return ref.where('owner', '==', "" + user_id).where('name', '==', "" + name); }).snapshotChanges().subscribe(function (data) {
                    _this.item = data;
                    resolve(data.length);
                });
            }, 2000);
        });
    };
    NotesService.prototype.addCampaign = function (email, user_id, name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            _this.campaignVerification(user_id, name).then(function (value) {
                                //console.log(`promise result: ${value}`)
                                if ("" + value == '0') {
                                    _this.http.post(SERVER_URL + '/addCampaign', {
                                        'email': email,
                                        'campaign_name': name
                                    })
                                        .subscribe(function (res) {
                                        /*  var startDate = moment(res['startDate'], "YYYYMMDD").fromNow()
                                         var endDate = moment(res['endDate'], "YYYYMMDD").fromNow() */
                                        if (res['status'] == "ok") {
                                            //console.log(res)
                                            //console.log(res['startDateFrench'])
                                            _this.createCampaign(res['id'], name, res['status_campaign'], res['startDate'], res['endDate'], res['startDateFrench'], res['endDateFrench'], res['servingStatus'], res['budgetId']).then(function (res) {
                                                sweetalert2_1.default.fire({
                                                    title: 'Ajouter une nouvelle campagne',
                                                    text: 'Campagne ajoutée avec succès',
                                                    type: 'success',
                                                    showCancelButton: false,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Ok'
                                                }).then(function (result) {
                                                    if (result.value) {
                                                        resolve('ok');
                                                    }
                                                    else {
                                                        resolve('ok');
                                                    }
                                                });
                                            });
                                        }
                                        else {
                                            sweetalert2_1.default.fire({
                                                title: 'Ajouter une nouvelle campagne',
                                                text: 'Erreur Service',
                                                type: 'error',
                                                showCancelButton: false,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Ok'
                                            }).then(function (result) {
                                                if (result.value) {
                                                    resolve('error');
                                                }
                                                else {
                                                    resolve('error');
                                                }
                                            });
                                        }
                                    }, function (err) {
                                        sweetalert2_1.default.fire({
                                            title: 'Ajouter une nouvelle campagne',
                                            text: 'Erreur Service',
                                            type: 'error',
                                            showCancelButton: false,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Ok'
                                        }).then(function (result) {
                                            if (result.value) {
                                                resolve('error');
                                            }
                                            else {
                                                resolve('error');
                                            }
                                        });
                                    });
                                }
                                else {
                                    sweetalert2_1.default.fire({
                                        title: 'Ajouter une nouvelle campagne',
                                        text: 'Cette camapagne exite déjà',
                                        type: 'error',
                                        showCancelButton: false,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Ok'
                                    }).then(function (result) {
                                        if (result.value) {
                                            resolve('error');
                                        }
                                        else {
                                            resolve('error');
                                        }
                                    });
                                }
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NotesService.prototype.targetLocation = function (id, campaign_id, name, location) {
        var _this = this;
        return this.getCampaignZones(campaign_id, name).then(function (value) {
            //console.log(`promise result: ${value}`)
            _this.http.post(SERVER_URL + '/targetLocation', {
                'campaign_id': campaign_id,
                'location_id': location[0].item_id
            })
                .subscribe(function (res) {
                //console.log(`res from location backend: ${res}`)
                _this.updateNote(id, { zones: location });
            }, function (err) {
                sweetalert2_1.default.fire({
                    title: 'Ciblage',
                    text: 'Erreur Service',
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then(function (result) {
                    if (result.value) { }
                });
            });
            /*  } else{
               Swal.fire({
                 title: 'Ciblage',
                 text: 'Erreur service1',
                 type: 'error',
                 showCancelButton: false,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'Ok'
               }).then((result) => {
                   if (result.value){}
                 })
               
             } */
        });
    };
    NotesService.prototype.getListCampaign = function (uid) {
        //console.log(uid)
        return this.afs.collection('notes', function (ref) { return ref.where('owner', '==', "" + uid); }).snapshotChanges().pipe(operators_1.map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                return __assign({ id: a.payload.doc.id }, data);
            });
        }));
    };
    NotesService.prototype.updateTargetLocation = function (id, campaign_id, name, location) {
        var _this = this;
        return this.getCampaignZones(campaign_id, name).then(function (value) {
            //console.log(`promise result: ${value['item_id']}`)
            //console.log(`location id from me ${location[0].item_id}`)
            //console.log(`location id from firestore ${value[0].item_id}`)
            _this.http.post(SERVER_URL + '/updateLocation', {
                'campaign_id': campaign_id,
                'previous_location': value[0]['item_id'],
                'location_id': location[0].item_id
            })
                .subscribe(function (res) {
                //console.log(`res from location backend: ${res}`)
                _this.updateNote(id, { zones: location });
            }, function (err) {
                sweetalert2_1.default.fire({
                    title: 'Ciblage',
                    text: 'Erreur Service',
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then(function (result) {
                    if (result.value) { }
                });
            });
            /*  } else{
               Swal.fire({
                 title: 'Ciblage',
                 text: 'Erreur service1',
                 type: 'error',
                 showCancelButton: false,
                 confirmButtonColor: '#3085d6',
                 cancelButtonColor: '#d33',
                 confirmButtonText: 'Ok'
               }).then((result) => {
                   if (result.value){}
                 })
               
             } */
        });
    };
    NotesService.prototype.targetAge = function (id, campaign_id, age, uid) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSingleCampaignWithId(uid, campaign_id).then(function (value) {
                            //console.log(`value:`)
                            //console.log(value)
                            //console.log(`age:`)
                            //console.log(age)
                            /*    var tab = _.differenceWith(value, genre, _.isEqual)
                               //console.log(tab)
                               if (tab = []) {
                                 //console.log(`genre déjà ciblé`)
                               } else {
                                  
                               }*/
                            _this.http.post(SERVER_URL + '/targetAgeLevelCampaign', {
                                'campaign_id': campaign_id,
                                'previous_ages': value['criterion_ages'],
                                'ages': age
                            })
                                .subscribe(function (res) {
                                //console.log(`res from location backend: ${res}`)
                                _this.updateNote(id, { ages: age, criterion_ages: res });
                            }, function (err) {
                                sweetalert2_1.default.fire({
                                    title: 'Ciblage',
                                    text: 'Erreur Service',
                                    type: 'error',
                                    showCancelButton: false,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Ok'
                                }).then(function (result) {
                                    if (result.value) { }
                                });
                            });
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NotesService.prototype.getSingleCampaign = function (campaign_id, name) {
        var _this = this;
        return this.afs.collection('notes', function (ref) { return ref.where('name', '==', "" + name).where('owner', '==', _this.uid).where('id_campagne', '==', parseInt("" + campaign_id)); }).snapshotChanges().pipe(operators_1.map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                return __assign({ id: a.payload.doc.id }, data);
            });
        }));
    };
    NotesService.prototype.getSingleCampaignWithId = function (uid, campaign_id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.afs.collection('notes', function (ref) { return ref.where('owner', '==', uid).where('id_campagne', '==', parseInt("" + campaign_id)); }).valueChanges().subscribe(function (data) {
                resolve(data[0]);
            });
        });
    };
    NotesService.prototype.getCampaignZones = function (campaign_id, name) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.afs.collection('notes', function (ref) { return ref.where('name', '==', "" + name).where('owner', '==', _this.uid).where('id_campagne', '==', parseInt("" + campaign_id)); }).valueChanges().subscribe(function (el) {
                    //console.log(el[0]['zones'])
                    resolve(el[0]['zones']);
                });
            }, 2000);
        });
    };
    NotesService.prototype.getCampaignDates = function (campaign_id, name) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.afs.collection('notes', function (ref) { return ref.where('name', '==', "" + name).where('owner', '==', _this.uid).where('id_campagne', '==', parseInt("" + campaign_id)); }).valueChanges().subscribe(function (el) {
                    //console.log(el)
                    resolve(el[0]);
                });
            }, 2000);
        });
    };
    NotesService.prototype.updateStartDate = function (id, campaign_id, startDate, startDateFrench) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(SERVER_URL + '/upDateCampaignStartDate', {
                'campaign_id': campaign_id,
                'startDate': startDate
            })
                .subscribe(function (res) {
                //console.log(res)
                _this.updateNote(id, { startDate: res[0]['startDate'], startDateFrench: startDateFrench, servingStatus: res[0]['servingStatus'] }).then(function (res) {
                    resolve('ok');
                    /*  Swal.fire({
                       title: 'Modification date de début',
                       text: 'Date de début modifiée',
                       type: 'success',
                       showCancelButton: false,
                       confirmButtonColor: '#3085d6',
                       cancelButtonColor: '#d33',
                       confirmButtonText: 'Ok'
                     }).then((result) => {
                       if (result.value) {}
                     }) */
                });
            }, function (err) {
                sweetalert2_1.default.fire({
                    title: 'Modification date de début',
                    text: _this.text_error_date,
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then(function (result) {
                    if (result.value) { }
                });
                resolve('error');
            });
        });
    };
    NotesService.prototype.updateEndDate = function (id, campaign_id, endDate, endDateFrench) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(SERVER_URL + '/upDateCampaignEndDate', {
                'campaign_id': campaign_id,
                'endDate': endDate
            })
                .subscribe(function (res) {
                //console.log(res)
                _this.updateNote(id, { endDate: res[0]['endDate'], endDateFrench: endDateFrench, servingStatus: res[0]['servingStatus'] }).then(function (res) {
                    resolve('ok');
                    /*  Swal.fire({
                       title: 'Modification date de fin',
                       text: 'Date de fin modifiée',
                       type: 'success',
                       showCancelButton: false,
                       confirmButtonColor: '#3085d6',
                       cancelButtonColor: '#d33',
                       confirmButtonText: 'Ok'
                     }).then((result) => {
                       if (result.value) {}
                     }) */
                });
            }, function (err) {
                sweetalert2_1.default.fire({
                    title: 'Modification date de fin',
                    text: _this.error_end_date,
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then(function (result) {
                    if (result.value) { }
                });
                resolve('error');
            });
        });
    };
    NotesService.prototype.updateDates = function (id, campaign_id, startDate, startDateFrench, endDate, endDateFrench) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(SERVER_URL + '/upDateCampaignDates', {
                'campaign_id': campaign_id,
                'startDate': startDate,
                'endDate': endDate
            })
                .subscribe(function (res) {
                //console.log(res)
                _this.updateNote(id, { endDate: res[0]['endDate'], endDateFrench: endDateFrench, startDate: res[0]['startDate'], startDateFrench: startDateFrench, servingStatus: res[0]['servingStatus'] }).then(function (res) {
                    resolve('ok');
                });
            }, function (err) {
                resolve('error');
            });
        });
    };
    NotesService.prototype.getCampaignRealTimeData = function (id, campaign_id) {
        var _this = this;
        return this.http.post(SERVER_URL + '/getCampaignData', {
            'campaign_id': campaign_id,
        })
            .subscribe(function (res) {
            /* //console.log(res[0]['name']) */
            //console.log(res[0]['servingStatus'])
            _this.getSingleCampaign(campaign_id, res[0]['name']).subscribe(function (data) {
                if (data[0]['servingStatus'] != res[0]['servingStatus']) {
                    if (res[0]['servingStatus'] == null) {
                        _this.updateNote(id, { servingStatus: 'None' });
                    }
                    else {
                        _this.updateNote(id, { servingStatus: res[0]['servingStatus'] });
                    }
                }
            });
        }, function (err) {
        });
    };
    NotesService.prototype.parseDate = function (str) {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[1], mdy[0]);
    };
    NotesService.prototype.datediff = function (first, second) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    };
    NotesService.prototype.prepareSaveCampaign = function (id, name, status, startDate, endDate, startDateFrench, endDateFrench, servingStatus, budgetId) {
        var userDoc = this.afs.doc("users/" + this.uid);
        var newCampaign = {
            id_campagne: id,
            name: name,
            status: status,
            startDate: startDate,
            endDate: endDate,
            startDateFrench: startDateFrench,
            endDateFrench: endDateFrench,
            originalStartDate: new Date().valueOf(),
            originalEndDate: new Date().valueOf(),
            servingStatus: servingStatus,
            budget: 0,
            dailyBudget: 0,
            numberOfDays: this.datediff(this.parseDate(startDateFrench), this.parseDate(endDateFrench)),
            budgetId: budgetId,
            zones: [],
            ages: [],
            sexes: [],
            devices: [],
            placement: [],
            criterion_ages: [],
            criterion_sexes: [],
            criterion_devices: [],
            criterion_placement: [],
            impressions: 0,
            clicks: 0,
            costs: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userDoc.ref,
            owner: this.uid,
        };
        return __assign({}, newCampaign);
    };
    NotesService.prototype.getData = function () {
        // ['added', 'modified', 'removed']
        return this.notesCollection.snapshotChanges().pipe(operators_1.map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                return __assign({ id: a.payload.doc.id }, data);
            });
        }));
    };
    NotesService.prototype.getNote = function (id) {
        return this.afs.doc("notes/" + id);
    };
    NotesService.prototype.createTarget = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getNote(id).update(data)];
            });
        });
    };
    NotesService.prototype.createCampaign = function (id_campagne, name, status, startDate, endDate, startDateFrench, endDateFrench, servingSatus, budgetId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            _this.note = _this.prepareSaveCampaign(id_campagne, name, status, startDate, endDate, startDateFrench, endDateFrench, servingSatus, budgetId);
                            var docRef = _this.notesCollection.add(_this.note);
                            resolve("ok");
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NotesService.prototype.updateNote = function (id, data) {
        return this.getNote(id).update(data);
    };
    NotesService.prototype.deleteNote = function (id, ad_groups_list_id, ads_list_id) {
        //console.log(ad_groups_list_id.length)
        //console.log(ads_list_id.length)
        var _this = this;
        //console.log(ad_groups_list_id)
        //console.log(ads_list_id)
        if (ad_groups_list_id.length == 0) {
            //console.log("pas de groupe , pas d'annonce")
            return this.getNote(id).delete();
        }
        else if (ad_groups_list_id.length == 1) {
            //console.log("un groupe d'annonce")
            if (ads_list_id.length == 0) {
                //console.log("groupe d'annonce n'a aucune annonce")
                this.deleteAdGroupList(ad_groups_list_id).then(function (res) {
                    if (res == "ok") {
                        return _this.getNote(id).delete();
                    }
                });
            }
            else {
                //console.log(`ads list len ${ads_list_id.length}`)
                //console.log("groupe d'annonce a plusieurs annonces")
                this.deleteAdList(ads_list_id).then(function (res) {
                    _this.deleteAdGroupList(ad_groups_list_id).then(function (res) {
                        return _this.getNote(id).delete();
                    });
                });
            }
        }
        else if (ad_groups_list_id.length > 1) {
            //console.log('plusieurs groupes')
            if (ads_list_id.length == 0) {
                this.deleteAdGroupList(ad_groups_list_id).then(function (res) {
                    return _this.getNote(id).delete();
                });
            }
            else {
                this.deleteAdList(ads_list_id).then(function (res) {
                    _this.deleteAdGroupList(ad_groups_list_id).then(function (res) {
                        return _this.getNote(id).delete();
                    });
                });
            }
        }
    };
    NotesService.prototype.deleteAdList = function (ads_list_id) {
        var _this = this;
        return new Promise(function (resolve) {
            if (ads_list_id.length == 1) {
                _this.adsService.deleteAd(ads_list_id[0]).then(function (res) {
                    resolve('ok');
                });
            }
            else {
                var i = 0;
                //console.log('groupe')
                //console.log(ads_list_id)
                for (var i_1 = 0; i_1 < ads_list_id.length; i_1++) {
                    //console.log('removing')
                    _this.adsService.deleteAd(ads_list_id[i_1]).then(function (res) {
                        resolve('ok');
                    });
                }
            }
        });
    };
    NotesService.prototype.deleteAdGroupList = function (ad_groups_list_id) {
        var _this = this;
        return new Promise(function (resolve) {
            if (ad_groups_list_id.length == 1) {
                _this.adGroupService.deleteAdGroup(ad_groups_list_id[0]).then(function (res) {
                    resolve('ok');
                });
            }
            else {
                var i = 0;
                //console.log('groupe')
                //console.log(ad_groups_list_id)
                for (var i_2 = 0; i_2 < ad_groups_list_id.length; i_2++) {
                    //console.log('removing')
                    _this.adGroupService.deleteAdGroup(ad_groups_list_id[i_2]).then(function (res) {
                        resolve('ok');
                    });
                }
            }
        });
    };
    NotesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_service_1.AuthService, firestore_1.AngularFirestore, http_1.HttpClient, ad_groupe_service_1.AdGroupService, ads_service_1.Ads])
    ], NotesService);
    return NotesService;
}());
exports.NotesService = NotesService;
//# sourceMappingURL=notes.service.js.map