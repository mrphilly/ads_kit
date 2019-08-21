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
var database_1 = require("@angular/fire/database");
var environment_1 = require("../../../environments/environment");
var _ = require('lodash');
var SERVER_URL = environment_1.SERVER.url;
var Ads = /** @class */ (function () {
    function Ads(afs, auth, http, db) {
        var _this = this;
        this.afs = afs;
        this.auth = auth;
        this.http = http;
        this.db = db;
        this.today = new Date();
        this.basePath = '/uploads';
        this.auth.user.subscribe(function (data) {
            _this.uid = data.uid;
        });
    }
    /* pushFileToStorage(annonces: Annonces, progress: { percentage: number }) {
       const storageRef = firebase.storage().ref();
       const uploadTask = storageRef.child(`${this.basePath}/${annonces.ad_name}`).put(annonces.url_ad);
    
       uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
         (snapshot) => {
           // in progress
           const snap = snapshot as firebase.storage.UploadTaskSnapshot;
           progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
         },
         (error) => {
           // fail
           //console.log(error);
         },
         () => {
           // success
           annonces.url_ad = uploadTask.snapshot.downloadURL;
          
           this.saveFileData(annonces);
         }
       );
     } */
    Ads.prototype.saveFileData = function (annonces) {
        this.db.list(this.basePath + "/").push(annonces);
    };
    Ads.prototype.getListAnnonces = function (ad_group_id) {
        //console.log(parseInt(ad_group_id))
        return this.afs.collection('adgroup', function (ref) { return ref.where('campaign_id', '==', parseInt("" + ad_group_id)); }).snapshotChanges().pipe(operators_1.map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                return __assign({ id: a.payload.doc.id }, data);
            });
        }));
    };
    Ads.prototype.annonceVerification = function (ad_name, ad_group_id) {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.afs.collection('ads', function (ref) { return ref.where('ad_group_id', '==', parseInt("" + ad_group_id)).where('ad_name', '==', "" + ad_name); }).snapshotChanges().subscribe(function (data) {
                    //console.log(`data ${data}`)
                    _this.item = data;
                    resolve(data.length);
                });
            }, 2000);
        });
    };
    Ads.prototype.getListAd = function (ad_group_id) {
        //console.log(parseInt(ad_group_id))
        var id = parseInt(ad_group_id);
        return this.afs.collection('ads', function (ref) { return ref.where('ad_group_id', '==', "" + id); }).snapshotChanges().pipe(operators_1.map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                return __assign({ id: a.payload.doc.id }, data);
            });
        }));
    };
    Ads.prototype.addAd = function (ad_id, ad_group_id, ad_name, image_url, finalUrls, finalAppUrls, finalMobileUrls, size) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            alert(size[0]['width'].toString());
                            _this.annonceVerification(ad_name, ad_group_id).then(function (value) {
                                //console.log(`promise result: ${value}`)
                                if ("" + value == '0') {
                                    _this.http.post(SERVER_URL + '/addAd', {
                                        'ad_group_id': ad_group_id,
                                        'url_image': image_url,
                                        'ad_name': ad_name,
                                        'finalUrls': finalUrls,
                                        'finalAppUrls': finalAppUrls,
                                        'finalMobileUrls': finalMobileUrls,
                                        'width': size[0]['width'].toString(),
                                        'height': size[0]['height'].toString(),
                                        "size": size
                                    })
                                        .subscribe(function (res) {
                                        var response = res['ad'][0];
                                        //console.log(response)
                                        //console.log(response['displayUrl'])
                                        //console.log(response['ad_id'])
                                        //console.log(ad_group_id)
                                        //console.log(response['name'])
                                        //console.log(response['status'])
                                        //console.log(response['url_image'])
                                        //console.log(response['displayUrl'])
                                        //console.log(response['finalUrls'])
                                        //console.log(response['finalMobileUrls'])
                                        //console.log(response['finalAppUrls'])
                                        //console.log(response['referenceId'])
                                        //console.log(response['automated'])
                                        _this.updateAd(ad_id, { ad_id: response['ad_id'], ad_group_id: ad_group_id, ad_name: response['name'], status: response['status'], url_image: response['url_image'], displayUrl: response['displayUrl'], finalUrls: response['finalUrls'], finalMobileUrls: response['finalMobileUrls'], finalAppUrls: response['finalAppUrls'], automated: response['automated'], referenceId: response['referenceId'] }).then(function (res) {
                                            sweetalert2_1.default.fire({
                                                title: 'Ajouter une annonce',
                                                text: 'Annonce ajoutée avec succès',
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
                                    }, function (err) {
                                        sweetalert2_1.default.fire({
                                            title: 'Ajouter une annonce',
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
                                        title: 'Ajouter une nouvelle annonce',
                                        text: "Il éxiste déjà une annonce portant une des données renseignées !",
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
    Ads.prototype.saveAdOnFirebase = function (ad_group_id, ad_name, uid, url_image, image_content, allUrls, size, ad_type) {
        return __awaiter(this, void 0, void 0, function () {
            var displayUrl, finalUrls, finalMobileUrls, finalAppUrls, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        displayUrl = [];
                        finalUrls = [];
                        finalMobileUrls = [];
                        finalAppUrls = [];
                        //console.log(allUrls)
                        for (i = 0; i < allUrls.length; i++) {
                            if (allUrls[i]['lib'] == 'finalUrls') {
                                displayUrl.push(allUrls[i]['content']);
                            }
                            /*  if (allUrls[i]['lib'] == 'Application Mobiles') {
                               finalAppUrls.push(allUrls[i]['content'])
                               
                             } */
                        }
                        return [4 /*yield*/, this.annonceVerification(ad_name, ad_group_id).then(function (value) {
                                //console.log(`promise result: ${value}`)
                                var self = _this;
                                if ("" + value == '0') {
                                    _this.createAd('', ad_group_id, ad_name, '', url_image, image_content, displayUrl[0], displayUrl[0], finalMobileUrls, finalAppUrls, '', '', uid, size, ad_type).then(function (res) {
                                        sweetalert2_1.default.fire({
                                            title: 'Ajouter une annonce',
                                            text: 'Annonce ajoutée avec succès',
                                            type: 'success',
                                            showCancelButton: false,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Ok'
                                        }).then(function (result) {
                                            if (result.value) {
                                                window.location.reload();
                                            }
                                            else {
                                                window.location.reload();
                                            }
                                        });
                                    });
                                }
                                else {
                                    sweetalert2_1.default.fire({
                                        title: 'Ajouter une nouvelle annonce',
                                        text: "Il éxiste déjà une annonce portant une des données renseignées !",
                                        type: 'error',
                                        showCancelButton: false,
                                        confirmButtonColor: '#3085d6',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Ok'
                                    }).then(function (result) {
                                        if (result.value) { }
                                    });
                                }
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Ads.prototype.UpdateAdModified = function (id_ad_firebase, ad_id, ad_group_id, data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(SERVER_URL + '/UpdateAd', {
                'ad_group_id': ad_group_id,
                'ad_id': ad_id,
                'data': data
            })
                .subscribe(function (res) {
                //console.log(res)
                if (res[0]['status'] == "ok") {
                    for (var i = 0; i < data.toString().length; i++) {
                        //console.log(data[i])
                        var field = data[i].fieldFirebase;
                        var content = data[i].content;
                        _this.updateAd(id_ad_firebase, { field: content });
                    }
                    resolve('ok');
                }
            }, function (err) {
                sweetalert2_1.default.fire({
                    title: "Service Annonce!",
                    text: 'Erreur.',
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#26a69a',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then(function (result) {
                    if (result.value) {
                    }
                });
            });
        });
    };
    Ads.prototype.prepareSaveAd = function (ad_id, ad_group_id, ad_name, status, url_image, image_content, displayUrl, finalUrls, finalMobileUrls, finalAppUrls, referenceId, automated, uid, size, ad_type) {
        var userDoc = this.afs.doc("users/" + uid);
        var newAd = {
            ad_id: ad_id,
            ad_name: ad_name,
            ad_group_id: ad_group_id,
            status: status,
            url_image: url_image,
            image_content: image_content,
            displayUrl: displayUrl,
            finalUrls: finalUrls,
            finalMobileUrls: finalMobileUrls,
            finalAppUrls: finalAppUrls,
            referenceId: referenceId,
            automated: automated,
            size: size,
            ad_type: ad_type,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            createdBy: userDoc.ref,
            owner: uid,
        };
        return __assign({}, newAd);
    };
    Ads.prototype.getData = function () {
        // ['added', 'modified', 'removed']
        return this.annonceCollection.snapshotChanges().pipe(operators_1.map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                return __assign({ id: a.payload.doc.id }, data);
            });
        }));
    };
    Ads.prototype.getAd = function (id) {
        return this.afs.doc("ads/" + id);
    };
    Ads.prototype.createAd = function (ad_id, ad_group_id, ad_name, status, url_image, image_content, displayUrl, finalUrls, finalMobileUrls, finalAppUrls, referenceId, automated, uid, size, ad_type) {
        return __awaiter(this, void 0, void 0, function () {
            var docRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.annonce_model = this.prepareSaveAd(ad_id, ad_group_id, ad_name, status, url_image, image_content, displayUrl, finalUrls, finalMobileUrls, finalAppUrls, referenceId, automated, uid, size, ad_type);
                        return [4 /*yield*/, this.afs.collection('ads').add(this.annonce_model)];
                    case 1:
                        docRef = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Ads.prototype.updateAd = function (id, data) {
        return this.getAd(id).update(data);
    };
    Ads.prototype.deleteAd = function (id) {
        return this.getAd(id).delete();
    };
    Ads.prototype.deleteAdPromise = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getAd(id).delete().then(function () {
                resolve('ok');
            });
        });
    };
    Ads = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [firestore_1.AngularFirestore, auth_service_1.AuthService, http_1.HttpClient, database_1.AngularFireDatabase])
    ], Ads);
    return Ads;
}());
exports.Ads = Ads;
//# sourceMappingURL=ads.service.js.map