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
var firebase = require("firebase/app");
var auth_service_1 = require("../../app_core/core/auth.service");
var sweetalert2_1 = require("sweetalert2");
var operators_1 = require("rxjs/operators");
/* import { NoteDetailComponent } from './note-detail/note-detail.component' */
var environment_1 = require("../../../environments/environment");
var _ = require('lodash');
var SERVER_URL = environment_1.SERVER.url;
var AdGroupService = /** @class */ (function () {
    function AdGroupService(afs, auth, http) {
        var _this = this;
        this.afs = afs;
        this.auth = auth;
        this.http = http;
        this.today = new Date();
        this.adGroupCollection = this.afs.collection('adgroup', function (ref) { return ref.where('campaign_id', '==', parseInt("" + _this.campaign_id)); });
        this.auth.user.forEach(function (data) {
            _this.uid = data.uid;
        });
    }
    AdGroupService.prototype.getListAdGroup = function (campaign_id) {
        // console.log(parseInt(campaign_id))
        return this.afs.collection('adgroup', function (ref) { return ref.where('campaign_id', '==', parseInt("" + campaign_id)); }).snapshotChanges().pipe(operators_1.map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                return __assign({ id: a.payload.doc.id }, data);
            });
        }));
    };
    AdGroupService.prototype.addGroupVerification = function (user_id, name, id_campaign) {
        var _this = this;
        // console.log(`owner: ${user_id}, name: ${name}, campaign_id: ${id_campaign}`)
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.afs.collection('adgroup', function (ref) { return ref.where('campaign_id', '==', parseInt("" + id_campaign)).where('name', '==', "" + name).where('owner', '==', "" + user_id); }).snapshotChanges().subscribe(function (data) {
                    // console.log(`data ${data}`)
                    _this.item = data;
                    resolve(data.length);
                });
            }, 2000);
        });
    };
    AdGroupService.prototype.getAdGroupGenre = function (campaign_id, ad_group_id) {
        var _this = this;
        // console.log(`campaign_id: ${campaign_id} ad_group_id: ${ad_group_id}`)
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.afs.collection('adgroup', function (ref) { return ref.where('campaign_id', '==', parseInt("" + campaign_id)).where('ad_group_id', '==', parseInt("" + ad_group_id)); }).valueChanges().subscribe(function (el) {
                    // console.log(el)
                    resolve(el[0]['sexes']);
                });
            }, 2000);
        });
    };
    AdGroupService.prototype.getAdGroupPlacement = function (campaign_id, ad_group_id) {
        var _this = this;
        // console.log(`campaign_id: ${campaign_id} ad_group_id: ${ad_group_id}`)
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.afs.collection('adgroup', function (ref) { return ref.where('campaign_id', '==', parseInt("" + campaign_id)).where('ad_group_id', '==', parseInt("" + ad_group_id)); }).valueChanges().subscribe(function (el) {
                    // console.log(el)
                    resolve(el[0]['criterion_placement']);
                });
            }, 2000);
        });
    };
    AdGroupService.prototype.getAdGroupAge = function (campaign_id, ad_group_id) {
        var _this = this;
        // console.log(`campaign_id: ${campaign_id} ad_group_id: ${ad_group_id}`)
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.afs.collection('adgroup', function (ref) { return ref.where('campaign_id', '==', parseInt("" + campaign_id)).where('ad_group_id', '==', parseInt("" + ad_group_id)); }).valueChanges().subscribe(function (el) {
                    // console.log(el)
                    resolve(el[0]['ages']);
                });
            }, 2000);
        });
    };
    AdGroupService.prototype.getAdGroupDevices = function (campaign_id, ad_group_id) {
        var _this = this;
        // console.log(`campaign_id: ${campaign_id} ad_group_id: ${ad_group_id}`)
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.afs.collection('adgroup', function (ref) { return ref.where('campaign_id', '==', parseInt("" + campaign_id)).where('ad_group_id', '==', parseInt("" + ad_group_id)); }).valueChanges().subscribe(function (el) {
                    // console.log(el)
                    resolve(el[0]['devices']);
                });
            }, 2000);
        });
    };
    AdGroupService.prototype.targetGenre = function (id, campaign_id, ad_group_id, genre) {
        return __awaiter(this, void 0, void 0, function () {
            var genre_legnth;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        genre_legnth = genre.length;
                        return [4 /*yield*/, this.getAdGroupGenre(campaign_id, ad_group_id).then(function (value) {
                                // console.log(`value:`)
                                // console.log(value)
                                // console.log(`gender:`)
                                // console.log(genre)
                                // console.log(`concat`)    
                                _this.http.post(SERVER_URL + '/targetGender', {
                                    'ad_group_id': ad_group_id,
                                    'sexes': genre,
                                    'last_genre': value
                                })
                                    .subscribe(function (res) {
                                    // console.log(`res from location backend: ${res}`)
                                    _this.updateAdgroup(id, { sexes: genre });
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
    AdGroupService.prototype.removePlacement = function (id, campaign_id, ad_group_id, criterion) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(SERVER_URL + '/removeSinglePlacement', {
                'ad_group_id': ad_group_id,
                'criterion': criterion,
            }).subscribe(function (res) {
                if (res[0]['status'] == "ok") {
                    _this.getAdGroupPlacement(campaign_id, ad_group_id).then(function (res) {
                        var last_placement = res;
                        for (var i = 0; i < last_placement.length; i++) {
                            if (last_placement[i]['criterion_id'] == criterion) {
                                last_placement.splice(i, 1);
                            }
                            _this.updateAdgroup(id, { placement: last_placement, criterion_placement: last_placement }).then(function (res) {
                                resolve('ok');
                            });
                        }
                    });
                }
            }, function (err) {
                sweetalert2_1.default.fire({
                    title: "Placement de groupe d'annonce",
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
                });
            });
        });
    };
    AdGroupService.prototype.targetPlacement = function (id, campaign_id, ad_group_id, placement) {
        return __awaiter(this, void 0, void 0, function () {
            var genre_legnth;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        genre_legnth = placement.length[0];
                        return [4 /*yield*/, this.getAdGroupPlacement(campaign_id, ad_group_id).then(function (value) {
                                _this.http.post(SERVER_URL + '/setPlacement', {
                                    'ad_group_id': ad_group_id,
                                    'placement': placement,
                                    'last_placement': value
                                })
                                    .subscribe(function (res) {
                                    // console.log(`res from location backend: ${res}`)
                                    // console.log(res)
                                    _this.updateAdgroup(id, { placement: res, criterion_placement: res });
                                }, function (err) {
                                    sweetalert2_1.default.fire({
                                        title: "Placement de groupe d'annonce",
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
    AdGroupService.prototype.targetDevices = function (id, campaign_id, ad_group_id, devices) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAdGroupGenre(campaign_id, ad_group_id).then(function (value) {
                            // console.log(`value:`)
                            // console.log(value)
                            // console.log(`devices:`)
                            // console.log(devices)
                            // console.log(`concat`)    
                            _this.http.post(SERVER_URL + '/targetDevices', {
                                'ad_group_id': ad_group_id,
                                'devices': devices,
                                'last_devices': value
                            })
                                .subscribe(function (res) {
                                // console.log(`res from location backend: ${res}`)
                                _this.updateAdgroup(id, { devices: devices });
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
                        })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AdGroupService.prototype.targetAge = function (id, campaign_id, ad_group_id, age) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAdGroupAge(campaign_id, ad_group_id).then(function (value) {
                            // console.log(`value:`)
                            // console.log(value)
                            // console.log(`age:`)
                            // console.log(age)
                            /*    var tab = _.differenceWith(value, genre, _.isEqual)
                              // console.log(tab)
                               if (tab = []) {
                                // console.log(`genre déjà ciblé`)
                               } else {
                                  
                               }*/
                            _this.http.post(SERVER_URL + '/targetAge', {
                                'ad_group_id': ad_group_id,
                                'ages': age,
                                'last_ages': value
                            })
                                .subscribe(function (res) {
                                // console.log(`res from location backend: ${res}`)
                                _this.updateAdgroup(id, { ages: age });
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
    AdGroupService.prototype.addAdGroup = function (campaign_id, user_id, name) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            _this.addGroupVerification(user_id, name, campaign_id).then(function (value) {
                                // console.log(`promise result: ${value}`)
                                if ("" + value == '0') {
                                    _this.http.post(SERVER_URL + '/addAdGroup', {
                                        'ad_group_name': name,
                                        'campaign_id': campaign_id
                                    })
                                        .subscribe(function (res) {
                                        // console.log(`add group ${res}`)
                                        if (res['status'] == "ok") {
                                            _this.createAdGroup(campaign_id, res['name'], res['status_adgroup'], res['id']).then(function (res) {
                                                sweetalert2_1.default.fire({
                                                    title: 'Ajouter un nouveau groupe',
                                                    text: 'Groupe ajouté avec succès',
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
                                                title: 'Ajouter un nouveau groupe',
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
                                            title: 'Ajouter un nouveau groupe',
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
                    case 1: 
                    // console.log(`User id: ${user_id}`)
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AdGroupService.prototype.prepareSaveAdGroup = function (campaign_id, name, status, ad_group_id) {
        var userDoc = this.afs.doc("users/" + this.uid);
        var newAdGroup = {
            campaign_id: campaign_id,
            ad_group_id: ad_group_id,
            name: name,
            status: status,
            ages: [],
            sexes: [],
            devices: [],
            placement: [],
            criterion_placement: [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userDoc.ref,
            owner: this.uid,
        };
        return __assign({}, newAdGroup);
    };
    AdGroupService.prototype.getData = function () {
        // ['added', 'modified', 'removed']
        return this.adGroupCollection.snapshotChanges().pipe(operators_1.map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                return __assign({ id: a.payload.doc.id }, data);
            });
        }));
    };
    AdGroupService.prototype.getAdGroup = function (id) {
        return this.afs.doc("adgroup/" + id);
    };
    AdGroupService.prototype.createTarget = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getAdGroup(id).update(data)];
            });
        });
    };
    AdGroupService.prototype.createAdGroup = function (id_campagne, name, status, ad_group_id) {
        return __awaiter(this, void 0, void 0, function () {
            var docRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.adgroup = this.prepareSaveAdGroup(id_campagne, name, status, ad_group_id);
                        return [4 /*yield*/, this.afs.collection('adgroup').add(this.adgroup)];
                    case 1:
                        docRef = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AdGroupService.prototype.updateAdgroup = function (id, data) {
        return this.getAdGroup(id).update(data);
    };
    AdGroupService.prototype.deleteAdGroup = function (id) {
        return this.getAdGroup(id).delete();
    };
    AdGroupService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [firestore_1.AngularFirestore, auth_service_1.AuthService, http_1.HttpClient])
    ], AdGroupService);
    return AdGroupService;
}());
exports.AdGroupService = AdGroupService;
//# sourceMappingURL=ad-groupe.service.js.map