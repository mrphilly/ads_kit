"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var notes_service_1 = require("./notes.service");
xdescribe('NotesService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [notes_service_1.NotesService]
        });
    });
    it('should be created', testing_1.inject([notes_service_1.NotesService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=notes.service.spec.js.map