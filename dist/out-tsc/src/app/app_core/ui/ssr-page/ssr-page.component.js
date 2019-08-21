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
var platform_browser_1 = require("@angular/platform-browser");
var firestore_1 = require("@angular/fire/firestore");
var operators_1 = require("rxjs/operators");
var platform_browser_2 = require("@angular/platform-browser");
var DATA = platform_browser_2.makeStateKey('animals');
var SsrPageComponent = /** @class */ (function () {
    function SsrPageComponent(afs, meta, titleService, state) {
        this.afs = afs;
        this.meta = meta;
        this.titleService = titleService;
        this.state = state;
    }
    SsrPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        // set metatags for twitter
        this.setMetaTags();
        // Get the animals from the database
        var animals$ = this.afs.collection('animals').valueChanges();
        // If state is available, start with it your observable
        var exists = this.state.get(DATA, []);
        if (!exists.length) {
            animals$.pipe(operators_1.tap(function (list) {
                _this.state.set(DATA, list);
                _this.animals = list;
            }))
                .subscribe();
        }
        else {
            this.animals = exists;
        }
    };
    SsrPageComponent.prototype.setMetaTags = function () {
        this.titleService.setTitle('Angular Firebase Animals');
        // Set meta tags
        this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
        this.meta.updateTag({ name: 'twitter:site', content: '@angularfirebase' });
        this.meta.updateTag({ name: 'twitter:title', content: 'Angular Firebase Animals' });
        this.meta.updateTag({ name: 'twitter:description', content: 'A server-rendered list of animals from Cloud Firestore in Angular' });
        this.meta.updateTag({ name: 'twitter:image', content: 'https://goo.gl/MzskMe' });
    };
    SsrPageComponent = __decorate([
        core_1.Component({
            selector: 'ssr-page',
            templateUrl: './ssr-page.component.html',
            styleUrls: ['./ssr-page.component.scss']
        }),
        __metadata("design:paramtypes", [firestore_1.AngularFirestore,
            platform_browser_1.Meta,
            platform_browser_1.Title,
            platform_browser_2.TransferState])
    ], SsrPageComponent);
    return SsrPageComponent;
}());
exports.SsrPageComponent = SsrPageComponent;
//# sourceMappingURL=ssr-page.component.js.map