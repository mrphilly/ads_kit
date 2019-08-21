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
var $ = require("jquery");
var notes_service_1 = require("../notes.service");
var auth_service_1 = require("../../core/auth.service");
var router_1 = require("@angular/router");
var environment_1 = require("../../../../environments/environment");
var REDIRECT_URL = environment_1.SERVER.url_redirect;
var CreateCampaignComponent = /** @class */ (function () {
    function CreateCampaignComponent(router, notesService, auth) {
        var _this = this;
        this.router = router;
        this.notesService = notesService;
        this.auth = auth;
        this.isCreating = false;
        this.isExist = false;
        this.title = "Cr�er une campagne";
        this.auth.user.forEach(function (value) {
            _this.uid = value.uid;
            _this.email = value.email;
        });
    }
    CreateCampaignComponent.prototype.ngOnInit = function () {
        var _this = this;
        document.getElementById('body').classList.add('adafri-background');
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
                        "value": "#ffffff"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#ffffff"
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
        this.auth.user.forEach(function (value) {
            _this.uid = value.uid;
            _this.email = value.email;
        });
    };
    CreateCampaignComponent.prototype.addCampaign = function () {
        var _this = this;
        this.isCreating = true;
        var name = $("#campagne").val();
        this.notesService.addCampaign(this.email, this.uid, name).then(function (result) {
            if (result != "error") {
                _this.isCreating = false;
                window.location.replace(REDIRECT_URL);
            }
            else {
                _this.isCreating = false;
            }
        });
    };
    CreateCampaignComponent.prototype.go1 = function () {
        window.location.replace(REDIRECT_URL);
        window.location.reload();
    };
    CreateCampaignComponent.prototype.go = function () {
        document.getElementById('body').classList.remove('adafri-background');
        window.location.replace(REDIRECT_URL);
        /*  this.router.navigate(['/']) */
    };
    CreateCampaignComponent = __decorate([
        core_1.Component({
            selector: 'app-create-campaign',
            templateUrl: './create-campaign.component.html',
            styleUrls: ['./create-campaign.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router, notes_service_1.NotesService, auth_service_1.AuthService])
    ], CreateCampaignComponent);
    return CreateCampaignComponent;
}());
exports.CreateCampaignComponent = CreateCampaignComponent;
//# sourceMappingURL=create-campaign.component.js.map