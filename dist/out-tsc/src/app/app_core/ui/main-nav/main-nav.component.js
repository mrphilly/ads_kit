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
var MainNavComponent = /** @class */ (function () {
    function MainNavComponent() {
        this.show = false;
    }
    MainNavComponent.prototype.toggleCollapse = function () {
        this.show = !this.show;
    };
    MainNavComponent = __decorate([
        core_1.Component({
            selector: 'main-nav',
            templateUrl: './main-nav.component.html',
            styleUrls: ['./main-nav.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], MainNavComponent);
    return MainNavComponent;
}());
exports.MainNavComponent = MainNavComponent;
//# sourceMappingURL=main-nav.component.js.map