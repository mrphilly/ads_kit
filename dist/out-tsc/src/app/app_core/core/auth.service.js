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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_1 = require("@angular/fire/auth");
var firestore_1 = require("@angular/fire/firestore");
var rxjs_1 = require("rxjs");
var firebase_1 = require("firebase");
var operators_1 = require("rxjs/operators");
var notify_service_1 = require("./notify.service");
var operators_2 = require("rxjs/operators");
var sweetalert2_1 = require("sweetalert2");
var AuthService = /** @class */ (function () {
    function AuthService(afAuth, afs, router, notify) {
        var _this = this;
        this.afAuth = afAuth;
        this.afs = afs;
        this.router = router;
        this.notify = notify;
        this.user = this.afAuth.authState.pipe(operators_1.switchMap(function (user) {
            if (user) {
                return _this.afs.doc("users/" + user.uid).valueChanges();
            }
            else {
                return rxjs_1.of(null);
            }
        })
        // tap(user => localStorage.setItem('user', JSON.stringify(user))),
        // startWith(JSON.parse(localStorage.getItem('user')))
        );
        this.notificationAccount = this.afAuth.authState.pipe(operators_1.switchMap(function (amount) {
            if (amount) {
                return _this.afs.doc("notifications_account_value/" + amount.uid).valueChanges();
            }
            else {
                return rxjs_1.of(null);
            }
        })
        // tap(user => localStorage.setItem('user', JSON.stringify(user))),
        // startWith(JSON.parse(localStorage.getItem('user')))
        );
    }
    ////// OAuth Methods /////
    AuthService.prototype.googleLogin = function () {
        var provider = new firebase_1.auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    };
    AuthService.prototype.githubLogin = function () {
        var provider = new firebase_1.auth.GithubAuthProvider();
        return this.oAuthLogin(provider);
    };
    AuthService.prototype.facebookLogin = function () {
        var provider = new firebase_1.auth.FacebookAuthProvider();
        return this.oAuthLogin(provider);
    };
    AuthService.prototype.twitterLogin = function () {
        var provider = new firebase_1.auth.TwitterAuthProvider();
        return this.oAuthLogin(provider);
    };
    AuthService.prototype.oAuthLogin = function (provider) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.afAuth.auth
                .signInWithPopup(provider)
                .then(function (credential) {
                _this.updateUserData(credential.user).then(function (res) {
                    if (res == "ok") {
                        resolve('ok');
                    }
                    else {
                        resolve('error');
                    }
                });
            })
                .catch(function (error) { return _this.handleError(error); });
        });
    };
    //// Anonymous Auth ////
    AuthService.prototype.anonymousLogin = function () {
        var _this = this;
        return this.afAuth.auth
            .signInAnonymously()
            .then(function (credential) {
            _this.notify.update('Welcome to Firestarter!!!', 'success');
            return _this.updateUserData(credential.user); // if using firestore
        })
            .catch(function (error) {
            _this.handleError(error);
        });
    };
    //// Email/Password Auth ////
    AuthService.prototype.emailSignUp = function (email, password) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.afAuth.auth
                .createUserWithEmailAndPassword(email, password)
                .then(function (credential) {
                _this.notify.update('Welcome new user!', 'success');
                return _this.updateUserData(credential.user).then(function (res) {
                    if (res == "ok") {
                        resolve("ok");
                    }
                    else {
                        resolve("error");
                    }
                });
            })
                .catch(function (error) { return _this.handleError(error); });
        });
    };
    AuthService.prototype.emailLogin = function (email, password) {
        var _this = this;
        var response = [];
        this.afAuth.auth
            .signInWithEmailAndPassword(email, password)
            .then(function (credential) {
            sweetalert2_1.default.fire({
                title: 'De retour ' + email,
                text: 'Bienvenue',
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            }).then(function (result) {
                if (result.value) {
                    _this.updateUserData(credential.user);
                    response.push(credential.user);
                }
                else {
                    _this.updateUserData(credential.user);
                    response.push(credential.user);
                }
            });
        })
            .catch(function (error) { _this.handleError(error); });
        return Promise.resolve(response);
    };
    AuthService.prototype.afterSignIn = function () {
        // Do after login stuff here, such router redirects, toast messages, etc.
        return this.router.navigate(['/']);
    };
    // Sends email allowing user to reset password
    AuthService.prototype.resetPassword = function (email) {
        var _this = this;
        var fbAuth = firebase_1.auth();
        return fbAuth
            .sendPasswordResetEmail(email)
            .then(function () { return _this.notify.update('Password update email sent', 'info'); })
            .catch(function (error) { return _this.handleError(error); });
    };
    AuthService.prototype.signOut = function () {
        var _this = this;
        this.afAuth.auth.signOut().then(function () {
            _this.router.navigate(['/login']);
        });
    };
    // If error, console log and notify user
    AuthService.prototype.handleError = function (error) {
        console.error(error);
        var error_to_show = "";
        if (error.message == "There is no user record corresponding to this identifier. The user may have been deleted.") {
            error_to_show = "Cet utilisateur n'éxiste pas";
        }
        else if (error.message == "The password is invalid or the user does not have a password.") {
            error_to_show = "Mot de passe ou addresse email invalide";
        }
        else if (error.message == "The email address is badly formatted.") {
            error_to_show = "Addresse Email invalide";
        }
        else if (error.message == "Password should be at least 6 characters") {
            error_to_show = "Le mot de passe doit contenir au moins 6 caractères";
        }
        else if (error.message == "The email address is already in use by another account.") {
            error_to_show = "Adresse email déjà utilisée";
        }
        else {
            error_to_show = "Une erreur s'est produite";
        }
        sweetalert2_1.default.fire({
            title: 'Authentification',
            text: error_to_show,
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#26a69a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Rééssayer'
        }).then(function (result) {
            if (result.value) { }
        });
    };
    // Sets user data to firestore after succesful login
    AuthService.prototype.updateUserData = function (user) {
        var _this = this;
        return new Promise(function (resolve) {
            var userRef = _this.afs.doc("users/" + user.uid);
            var notificationRef = _this.afs.doc("notifications_account_value/" + user.uid);
            var data_notification = {
                uid: user.uid,
                notification: "Veuillez dÃ©finir vos paramÃ¨tres de facturation en cliquant ici"
            };
            notificationRef.set(data_notification);
            var data = {
                uid: user.uid,
                email: user.email || null,
                displayName: user.displayName || 'nameless user',
                photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
                account_value: 0
            };
            userRef.set(data);
            resolve("ok");
        });
    };
    AuthService.prototype.getInfos = function (user_id) {
        return this.afs.collection('notifications_account_value', function (ref) { return ref.where('uid', '==', "" + user_id); }).snapshotChanges().pipe(operators_2.map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                return __assign({ id: a.payload.doc.id }, data);
            });
        }));
    };
    AuthService.prototype.getUser = function (id) {
        return this.afs.doc("users/" + id);
    };
    AuthService.prototype.updateUser = function (id, data) {
        return this.getUser(id).update(data);
    };
    AuthService.prototype.getNotification = function (id) {
        return this.afs.doc("notifications_account_value/" + id);
    };
    AuthService.prototype.updateNotification = function (id, data) {
        return this.getNotification(id).update(data);
    };
    AuthService.prototype.updateValueAccount = function (uid, email, account_value) {
        var _this = this;
        return new Promise(function (resolve) {
            var userRef = _this.afs.doc("users/" + uid);
            var data = {
                uid: uid,
                account_value: account_value,
                email: email,
            };
            var notificationRef = _this.afs.doc("notifications_account_value/" + uid);
            var data_notification = {
                uid: uid,
                notification: ""
            };
            userRef.set(data).then(function () {
                notificationRef.set(data_notification).then(function () {
                    resolve("ok");
                });
            });
        });
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [auth_1.AngularFireAuth,
            firestore_1.AngularFirestore,
            router_1.Router,
            notify_service_1.NotifyService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map