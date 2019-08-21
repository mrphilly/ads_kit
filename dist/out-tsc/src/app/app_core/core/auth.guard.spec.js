"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/router/testing");
var auth_guard_1 = require("./auth.guard");
var auth_service_1 = require("./auth.service");
var notify_service_1 = require("./notify.service");
var auth_1 = require("@angular/fire/auth");
xdescribe('AuthGuard', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [
                testing_2.RouterTestingModule,
                auth_1.AngularFireAuthModule
            ],
            providers: [
                auth_guard_1.AuthGuard,
                { provide: auth_service_1.AuthService, useValue: { afAuth: {} } },
                { provide: notify_service_1.NotifyService, useValue: {} }
            ]
        });
    });
    it('should ...', testing_1.inject([auth_guard_1.AuthGuard], function (guard) {
    }));
});
//# sourceMappingURL=auth.guard.spec.js.map