"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fire_1 = require("@angular/fire");
var storage_1 = require("@angular/fire/storage");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var auth_1 = require("@angular/fire/auth");
var core_1 = require("@angular/core");
var functions_1 = require("@angular/fire/functions");
var firestore_1 = require("@angular/fire/firestore");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var firebase = require("firebase");
var ngx_color_picker_1 = require("ngx-color-picker");
var ngx_format_field_1 = require("ngx-format-field");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var core_module_1 = require("./app_core/core/core.module");
var notes_module_1 = require("./app_core/notes/notes.module");
var ui_module_1 = require("./app_core/ui/ui.module");
var database_1 = require("@angular/fire/database");
var angular_fusioncharts_1 = require("angular-fusioncharts");
var FusionCharts = require("fusioncharts");
var Charts = require("fusioncharts/fusioncharts.charts");
var TimeSeries = require("fusioncharts/fusioncharts.timeseries");
angular_fusioncharts_1.FusionChartsModule.fcRoot(FusionCharts, Charts, TimeSeries);
var credentials = {
    apiKey: "AIzaSyC_cYQskL_dKhkt-aQ1ayHt8ia2NQYEHTs",
    authDomain: "comparez.firebaseapp.com",
    databaseURL: "https://comparez.firebaseio.com",
    projectId: "comparez",
    storageBucket: "gs://comparez.appspot.com/",
    messagingSenderId: "975260713071",
};
firebase.initializeApp(credentials);
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule.withServerTransition({ appId: 'serverApp' }),
                platform_browser_1.BrowserTransferStateModule,
                app_routing_module_1.AppRoutingModule,
                core_module_1.CoreModule,
                ui_module_1.UiModule,
                notes_module_1.NotesModule,
                fire_1.AngularFireModule.initializeApp(credentials, 'firestarter'),
                firestore_1.AngularFirestoreModule.enablePersistence(),
                auth_1.AngularFireAuthModule,
                storage_1.AngularFireStorageModule,
                functions_1.AngularFireFunctionsModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule,
                ngx_color_picker_1.ColorPickerModule,
                database_1.AngularFireDatabaseModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                ngx_format_field_1.NgxFormatFieldModule,
                angular_fusioncharts_1.FusionChartsModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map