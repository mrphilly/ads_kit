"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var protractor_1 = require("protractor");
var CustomLoginFormPage = /** @class */ (function () {
    function CustomLoginFormPage() {
    }
    CustomLoginFormPage.prototype.navigateTo = function () {
        return protractor_1.browser.get('/');
    };
    CustomLoginFormPage.prototype.getParagraphText = function () {
        return protractor_1.element(protractor_1.by.css('app-root h1')).getText();
    };
    return CustomLoginFormPage;
}());
exports.CustomLoginFormPage = CustomLoginFormPage;
//# sourceMappingURL=app.po.js.map