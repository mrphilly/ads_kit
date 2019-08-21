"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var note_detail_component_1 = require("./note-detail.component");
var notes_service_1 = require("../notes.service");
xdescribe('NoteDetailComponent', function () {
    var component;
    var fixture;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [note_detail_component_1.NoteDetailComponent],
            providers: [{ provide: notes_service_1.NotesService, useValue: {} }]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(note_detail_component_1.NoteDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=note-detail.component.spec.js.map