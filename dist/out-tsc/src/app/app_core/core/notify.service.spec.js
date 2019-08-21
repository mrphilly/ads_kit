"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var notify_service_1 = require("./notify.service");
describe('NotifyService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [notify_service_1.NotifyService]
        });
    });
    it('should be created', testing_1.inject([notify_service_1.NotifyService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=notify.service.spec.js.map