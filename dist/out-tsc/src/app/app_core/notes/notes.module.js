"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ej2_angular_calendars_1 = require("@syncfusion/ej2-angular-calendars");
var ng2_dnd_1 = require("ng2-dnd");
var ngx_pica_1 = require("ngx-pica");
var ng2_nouislider_1 = require("ng2-nouislider");
var ngx_font_picker_1 = require("ngx-font-picker");
var ngx_format_field_1 = require("ngx-format-field");
var ngx_color_picker_1 = require("ngx-color-picker");
var ng_lazyload_image_1 = require("ng-lazyload-image");
var ngx_image_compress_1 = require("ngx-image-compress");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var notes_service_1 = require("./notes.service");
var annonces_component_1 = require("./annonces/annonces.component");
var campaign_settings_component_1 = require("./campaign-settings/campaign-settings.component");
var create_campaign_component_1 = require("./create-campaign/create-campaign.component");
var note_detail_component_1 = require("./note-detail/note-detail.component");
var notes_list_component_1 = require("./notes-list/notes-list.component");
var settings_component_1 = require("./campaign-settings/settings/settings.component");
var ad_groupe_service_1 = require("./ad-groupe.service");
var ads_service_1 = require("./ads.service");
var annonce_service_component_component_1 = require("../notes/annonces/annonce-service-component/annonce-service-component.component");
var spinner_overlay_component_1 = require("./spinner-overlay-notes/spinner-overlay.component");
var angular_fusioncharts_1 = require("angular-fusioncharts");
var FusionCharts = require("fusioncharts");
var Charts = require("fusioncharts/fusioncharts.charts");
var TimeSeries = require("fusioncharts/fusioncharts.timeseries");
var DEFAULT_FONT_PICKER_CONFIG = {
    // Google API Key
    apiKey: 'AIzaSyAN1VolxTqz1jn1Fzr5LdVneCjJ-FC6JT4'
};
angular_fusioncharts_1.FusionChartsModule.fcRoot(FusionCharts, Charts, TimeSeries);
var NotesModule = /** @class */ (function () {
    function NotesModule() {
    }
    NotesModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                ngx_color_picker_1.ColorPickerModule,
                http_1.HttpClientModule,
                ej2_angular_calendars_1.DatePickerModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule.forRoot(),
                ngx_pica_1.NgxPicaModule,
                ng2_nouislider_1.NouisliderModule,
                ng2_dnd_1.DndModule.forRoot(),
                ng_bootstrap_1.NgbModule,
                ngx_font_picker_1.FontPickerModule,
                ng_lazyload_image_1.LazyLoadImageModule,
                ngx_format_field_1.NgxFormatFieldModule,
                angular_fusioncharts_1.FusionChartsModule
                /* ChartsModule */
            ],
            declarations: [notes_list_component_1.NotesListComponent, note_detail_component_1.NoteDetailComponent, campaign_settings_component_1.CampaignSettingsComponent, annonces_component_1.AnnoncesComponent, settings_component_1.SettingsComponent, create_campaign_component_1.CreateCampaignComponent, annonce_service_component_component_1.AnnonceServiceComponentComponent, spinner_overlay_component_1.SpinnerOverlayComponent],
            providers: [notes_service_1.NotesService, ad_groupe_service_1.AdGroupService, ads_service_1.Ads, ngx_image_compress_1.NgxImageCompressService,
            ]
        })
    ], NotesModule);
    return NotesModule;
}());
exports.NotesModule = NotesModule;
//# sourceMappingURL=notes.module.js.map