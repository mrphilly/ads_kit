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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var auth_service_1 = require("../../core/auth.service");
var $ = require("jquery");
var sweetalert2_1 = require("sweetalert2");
var UserLoginComponent = /** @class */ (function () {
    function UserLoginComponent(fb, auth, router) {
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.photoUrl = "";
        this.isCreating = false;
        this.Invalid = false;
        this.accountValue = 0;
        this.newUser = true; // to toggle login or signup form
        this.passReset = false; // set to true when password reset is triggered
        this.formErrors = {
            'email': '',
            'password': '',
        };
        this.validationMessages = {
            'email': {
                'required': 'Adresse email requise.',
                'email': 'Saisissez une adresse email valide',
            },
            'password': {
                'required': 'Mot de passe requis.',
                'pattern': 'Le mot de passe doit comporter au moin au moins 1 caractère majuscule, une lettre minuscule, un chiffre et un caractère spécial comme @,#...',
                'minlength': 'Le mot de passe doit comporter au moins 4 caractères.',
                'maxlength': 'La longueur du mot de passe ne peut pas dépasser 40 caractères',
            },
        };
    }
    /// Social Login
    UserLoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.buildForm();
        this.auth.user.forEach(function (value) {
            var jQuery = $;
            console.log(value);
            if (value != null) {
                _this.email = value.displayName;
                _this.accountValue = value.account_value;
                _this.photoUrl = value.photoURL;
            }
        });
        setTimeout(function () {
            particlesJS("particles-js", {
                "particles": {
                    "number": {
                        "value": 380,
                        "density": {
                            "enable": true,
                            "value_area": 1000
                        }
                    },
                    "color": {
                        "value": "#4cb5b1"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#4cb5b1"
                        },
                        "polygon": {
                            "nb_sides": 5
                        },
                        "image": {
                            "src": "../../../../assets/img/images/campaign.png",
                            "width": 1000,
                            "height": 1000
                        }
                    },
                    "opacity": {
                        "value": 1,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": true
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#ffffff",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "grab"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 140,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }, 2000);
        /* ---- stats.js config ---- */
    };
    UserLoginComponent.prototype.toggleForm = function () {
        this.newUser = !this.newUser;
    };
    UserLoginComponent.prototype.signInWithGoogle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.auth.googleLogin().then(function (res) {
                            if (res == "ok") {
                                sweetalert2_1.default.fire({
                                    title: 'Authentification',
                                    text: 'Vous êtes maintenant connecté',
                                    type: 'success',
                                    showCancelButton: false,
                                    confirmButtonColor: '#26a69a',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Ok'
                                }).then(function (result) {
                                    if (result.value) {
                                    }
                                    else {
                                    }
                                });
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserLoginComponent.prototype.signInWithFacebook = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.auth.facebookLogin().then(function (res) {
                            if (res == "ok") {
                                if (res == "ok") {
                                    sweetalert2_1.default.fire({
                                        title: 'Authentification',
                                        text: 'Vous êtes maintenant connecté',
                                        type: 'success',
                                        showCancelButton: false,
                                        confirmButtonColor: '#26a69a',
                                        cancelButtonColor: '#d33',
                                        confirmButtonText: 'Ok'
                                    }).then(function (result) {
                                        if (result.value) {
                                        }
                                        else {
                                        }
                                    });
                                }
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserLoginComponent.prototype.signup = function () {
        this.isCreating = true;
        this.auth.emailSignUp(this.userForm.value['email'], this.userForm.value['password']).then(function (res) {
            if (res == "ok") {
                sweetalert2_1.default.fire({
                    title: 'Authentification',
                    text: 'Inscription terminée avec succès',
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#26a69a',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then(function (result) {
                    if (result.value) {
                    }
                    else {
                    }
                });
            }
        });
    };
    UserLoginComponent.prototype.login = function () {
        this.isCreating = true;
        this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']).then(function (res) {
            if (res.toString() != "") {
                sweetalert2_1.default.fire({
                    title: 'Authentification',
                    text: 'Vous êtes maintenant connecté',
                    type: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#26a69a',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then(function (result) {
                    if (result.value) {
                    }
                    else {
                    }
                });
            }
        });
    };
    UserLoginComponent.prototype.listenError = function () {
        if (this.Invalid = true) {
            this.Invalid = false;
        }
    };
    UserLoginComponent.prototype.resetPassword = function () {
        var _this = this;
        this.auth.resetPassword(this.userForm.value['email'])
            .then(function () { return _this.passReset = true; });
    };
    UserLoginComponent.prototype.afterSignIn = function () {
        // Do after login stuff here, such router redirects, toast messages, etc.
        return this.router.navigate(['/']);
    };
    UserLoginComponent.prototype.buildForm = function () {
        var _this = this;
        this.userForm = this.fb.group({
            'email': ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.email,
                ]],
            'password': ['', [
                    forms_1.Validators.pattern('(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*'),
                    forms_1.Validators.minLength(6),
                    forms_1.Validators.maxLength(25),
                ]],
        });
        this.userForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // reset validation messages
    };
    // Updates validation state on form changes.
    UserLoginComponent.prototype.onValueChanged = function (data) {
        if (!this.userForm) {
            return;
        }
        var form = this.userForm;
        for (var field in this.formErrors) {
            if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                var control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    var messages = this.validationMessages[field];
                    if (control.errors) {
                        for (var key in control.errors) {
                            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                                this.formErrors[field] += messages[key] + " ";
                            }
                        }
                    }
                }
            }
        }
    };
    UserLoginComponent.prototype.signInWithGithub = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.auth.githubLogin()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserLoginComponent.prototype.signInWithTwitter = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.auth.twitterLogin()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /// Anonymous Sign In
    UserLoginComponent.prototype.signInAnonymously = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.auth.anonymousLogin()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /// Shared
    UserLoginComponent.prototype.go = function () {
        this.router.navigate(['/']);
    };
    UserLoginComponent.prototype.logout = function () {
        this.auth.signOut();
    };
    UserLoginComponent = __decorate([
        core_1.Component({
            selector: 'user-login',
            templateUrl: './user-login.component.html',
            styleUrls: ['./user-login.component.css'],
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, auth_service_1.AuthService,
            router_1.Router])
    ], UserLoginComponent);
    return UserLoginComponent;
}());
exports.UserLoginComponent = UserLoginComponent;
//# sourceMappingURL=user-login.component.js.map