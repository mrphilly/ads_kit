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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var $ = require("jquery");
require("fabric");
var firebase = require("firebase");
var ngx_font_picker_1 = require("ngx-font-picker");
var ngx_color_picker_1 = require("ngx-color-picker");
var notes_service_1 = require("../notes.service");
var auth_service_1 = require("../../core/auth.service");
var sweetalert2_1 = require("sweetalert2");
var ads_service_1 = require("../ads.service");
var ad_groupe_service_1 = require("../ad-groupe.service");
var environment_1 = require("../../../../environments/environment");
var SERVER_URL = environment_1.SERVER.url;
var REDIRECT_URL = environment_1.SERVER.url_redirect;
var MONTH = [{
        "Jan": {
            "name": "January",
            "short": "Jan",
            "number": '01',
            "days": '31'
        },
        "Feb": {
            "name": "February",
            "short": "Feb",
            "number": '2',
            "days": '28'
        },
        "Mar": {
            "name": "March",
            "short": "Mar",
            "number": '03',
            "days": '31'
        },
        "Apr": {
            "name": "April",
            "short": "Apr",
            "number": '04',
            "days": '30'
        },
        "May": {
            "name": "May",
            "short": "May",
            "number": '05',
            "days": '31'
        },
        "Jun": {
            "name": "June",
            "short": "Jun",
            "number": '06',
            "days": '30'
        },
        "Jul": {
            "name": "July",
            "short": "Jul",
            "number": '07',
            "days": '31'
        },
        "Aug": {
            "name": "August",
            "short": "Aug",
            "number": '08',
            "days": '31'
        },
        "Sep": {
            "name": "September",
            "short": "Sep",
            "number": '09',
            "days": '30'
        },
        "Oct": {
            "name": "October",
            "short": "Oct",
            "number": '10',
            "days": '31'
        },
        "Nov": {
            "name": "November",
            "short": "Nov",
            "number": '11',
            "days": '30'
        },
        "Dec": {
            "name": "December",
            "short": "Dec",
            "number": '12',
            "days": '31'
        }
    }];
var AnnoncesComponent = /** @class */ (function () {
    function AnnoncesComponent(notesService, auth, route, http, adGroupService, adsService, cpService, fb, router) {
        this.notesService = notesService;
        this.auth = auth;
        this.route = route;
        this.http = http;
        this.adGroupService = adGroupService;
        this.adsService = adsService;
        this.cpService = cpService;
        this.fb = fb;
        this.router = router;
        this.notificationAccountValue = "";
        this.numberOfNotifications = 0;
        this.url_errors = [];
        this.FINAL_ARRAY_TO_SEND = [];
        this.passReset = false; // set to true when password reset is triggered
        this.formErrors = {
            'name': '',
            'finalUrls': '',
        };
        this.validationMessages = {
            'name': {
                'required': "Nom du visuel obligatoire",
                'name': 'Saisissez un nom valide',
            },
            'finalUrls': {
                'required': 'Url de redirection requise.',
                'pattern': "L'url doit être sous la frome http://monsite.com",
                'minlength': 'Url trop courte',
                'maxlength': 'Url trop longue',
            },
        };
        this.selectedAdType = "";
        this.button_modify_image_upload = true;
        this.idOfDisplayUrlNotPublishUpload = "display_url_modify_not_publish_upload";
        this.idOfAdNameNotPublishUpload = "ad_name_modify_not_publish_upload";
        this.idOfDisplayUrlNotPublishCreatives = "display_url_modify_not_publish_creatives";
        this.idOfAdNameNotPublishCreatives = "ad_name_modify_not_publish_creatives";
        this.text_construire = "Construire son visuel";
        this.currentIdInputName = "";
        this.currentIdInputDisplay = "";
        this.idOfAdNameCreateUpload = "ad_name_create_upload";
        this.idOfDisplayUrlCreateUpload = "displayUrl_create_upload";
        this.idOfAdNameCreateCreatives = "ad_name_create_creatives";
        this.idOfDisplayUrlCreateCreatives = "displayUrl_create_creatives";
        this.idOfAdNameModify = "ad_name_modifed";
        this.idOfDisplayUrlModify = "displayUrl_modify";
        this.idOfAdNameInitUpload = "ad_name_init_upload";
        this.idOfDisplayUrlInitUpload = "display_url_init_upload";
        this.idOfAdNameInitCreatives = "ad_name_init_creatives";
        this.idOfDisplayUrlInitCreatives = "display_url_init_creatives";
        this.text_modify = "éditer";
        this.upload_modified = false;
        this.init_choose_ad_size = false;
        this.modifyPublishAd = false;
        this.isUploadModified = false;
        this.ad_type = "";
        this.is_upload_way = false;
        this.is_creative_way = false;
        this.img_view_create_style = { 'width': '100px', 'height': '100px' };
        this.canvas_style = { 'width': '', 'height': '', 'border-color': 'rgb(233, 216, 216); width: 300px !important; height: 250px !important; display: inline-block' };
        this.chooseBlock = false;
        this.chooseAdSize = true;
        this.isUpload = false;
        this.handleCreateCanvas = false;
        this.modifyDate = false;
        this.dure_campagne = 0;
        this.budget = 0;
        this.isSetBudget = false;
        this.isSimulation = false;
        this.budget_to_place = 0;
        this.my_gain = 0;
        this.UpdatedStartDate = "";
        this.UpdatedEndDate = "";
        this.newStartDate = "";
        this.newEndDate = "";
        this.accountValue = 0;
        this.montant = 0;
        this.ages = [];
        this.sexes = [];
        this.zones = [];
        this.devices = [];
        this.nationals_websites = [];
        this.internationals_websites = [];
        this.ads_websites = [];
        this.currentAdStatus = "";
        this.currentAdType = "";
        this.apps = [];
        this.label_enabled = 'Actif';
        this.label_paused = "Non Actif";
        this.text_create = "Visuel";
        this.isEditor = false;
        this._init_ad = false;
        this.list_ad = true;
        this.isAdBlock = false;
        this.currentAdName = "";
        this.currentFinalUrls = "";
        this.tabCurrentFinalUrls = [];
        this.tabUpdatedCurrentFinalUrls = [];
        this.currentImageUrl = "";
        this.number_of_impressions_simulated = 0;
        this.isNull = true;
        this.choose = true;
        this.directBudget = false;
        this.isAccountRechargement = false;
        this.isPlacementBudgetFromAccount = false;
        this.icon_toggle = 'icon-chevron-left';
        this.icon_toggle_options = 'icon-chevron-down';
        this.isCollapsed = false;
        this.isOptions = true;
        this.isPlacement = true;
        this.isGender = true;
        this.isAge = true;
        this.isDevice = true;
        this.basePath = '/uploads';
        this.progress = { percentage: 0 };
        this.globalEditor = false;
        this.textEditor = false;
        this.imageEditor = false;
        this.figureEditor = false;
        this.url = '';
        this.size = {
            width: 300,
            height: 250
        };
        this.dropdownListAges = [];
        this.dropdownListSexes = [];
        this.dropdownListZones = [];
        this.dropdownListDevices = [];
        this.dropdownListNationalsWebsites = [];
        this.dropdownListInternationalsWebsites = [];
        this.dropdownListAdsWebsites = [];
        this.dropdownListApps = [];
        this.selectedItems = [];
        this.dropdownSettingsAges = {};
        this.dropdownSettingsSexes = {};
        this.dropdownSettingsZones = {};
        this.dropdownSettingsDevices = {};
        this.dropdownSettingsNationalsWebsites = {};
        this.dropdownSettingsInternationalsWebsites = {};
        this.dropdownSettingsAdsWebsites = {};
        this.dropdownSettingsApps = {};
        this.text_visualise = "Visuel";
        this.text_no_genre = "Aucun genre ciblé";
        this.text_no_age = "Aucune tranche d'âge ciblée";
        this.text_no_devices = "Aucun appareils ciblé";
        this.text_cibled = "Genre(s) ciblé(s)";
        this.text_cibled_age = "Tranches d'âges ciblées";
        this.text_cibled_devices = "Appareils Ciblé(s)";
        this.modify_gender_text = "Modifier le ciblage des genres";
        this.modify_age_text = "Modifier le ciblage des âges";
        this.modify_devices_text = "Modifier le ciblage des appareils";
        this.text_option = "Paramètres du canvas";
        this.genres = "";
        this.isCiblageGenre = false;
        this.isCiblageAge = false;
        this.isCiblageDevices = false;
        this.isCreating = false;
        this.isRoller = false;
        this.isRechargement = false;
        this.isPlacementBudget = false;
        this.nationals_errors = '';
        this._init_ad_list = false;
        this.currentEditor = false;
        this.element_checked = "";
        this.illustration = false;
        this.illustrationUrl = "";
        this.AD_TYPES_1 = [
            { "name": "Rectangle", "width": "300", "height": "250", "id": "MediumRectangle", "img": "https://dummyimage.com/300x250/000/fff" },
            { "name": "Rectangle Large", "width": "336", "height": "280", "id": "LargeRectangle", "img": "https://dummyimage.com/336x280/000/fff" },
            { "name": "Horizontal Medium", "width": "728", "height": "90", "id": "Leaderboard", "img": "https://dummyimage.com/728x90/000/fff" },
            { "name": "Demi page", "width": "300", "height": "600", "id": "LargeSkyscraper", "img": "https://dummyimage.com/300x600/000/fff" },
            { "name": "Horizontal Large", "width": "970", "height": "90", "id": "LargerLeaderboard", "img": "https://dummyimage.com/970x90/000/fff" },
            { "name": "Big Panneau", "width": "970", "height": "250", "id": "BigPanneau", "img": "https://dummyimage.com/970x250/000/fff" },
        ];
        this.AD_TYPES_2 = [
            { "name": "Horizontal", "width": "468", "height": "60", "id": "Banner", "img": "https://dummyimage.com/468x60/000/fff" },
            { "name": "Vertical", "width": "120", "height": "600", "id": "Skyscraper", "img": "https://dummyimage.com/120x600/000/fff" },
            { "name": "Rectangle Vertical", "width": "240", "height": "400", "id": "RV", "img": "https://dummyimage.com/120x600/000/fff" },
            { "name": "Vertical Medium", "width": "160", "height": "600", "id": "Wideskyscraper", "img": "https://dummyimage.com/160x600/000/fff" },
            { "name": "Carré", "width": "250", "height": "250", "id": "Square", "img": "https://dummyimage.com/250x250/000/fff" },
            { "name": "Petit carré", "width": "200", "height": "200", "id": "Smallsquare", "img": "https://dummyimage.com/200x100/000/fff" }
        ];
        this.NATIONALS_WEBSITES = [
            [1, "infos", "dakarbuzz.net", "http://dakarbuzz.net"],
            [2, "infos", "galsen221.com", "http://galsen221.com"],
            [3, "infos", "leral.net", "http://leral.net"],
            [4, "infos", "limametti.com", "http://limametti.com"],
            [5, "infos", "sanslimitesn.com", "http://sanslimitesn.com"],
            [6, "infos", "senego.com", "http://senego.com"],
            [7, "infos", "seneweb.com", "http://seneweb.com"],
            [8, "infos", "www.buzzsenegal.com", "http://www.buzzsenegal.com"],
            [9, "infos", "www.dakar7.com", "http://www.dakar7.com"],
            [10, "infos", "www.dakarflash.com", "http://www.dakarflash.com"],
            [11, "infos", "www.lequotidien.sn", "http://www.lequotidien.sn"],
            [12, "infos", "www.pressafrik.com", "http://www.pressafrik.com"],
            [13, "infos", "www.senenews.com", "http://www.senenews.com"],
            [14, "infos", "xalimasn.com", "http://xalimasn.com"],
            [15, "infos", "metrodakar.net", "http://metrodakar.net"],
            [16, "infos", "sunubuzzsn.com", "http://sunubuzzsn.com"],
            [17, "infos", "senegal7.com", "http://senegal7.com"],
            [18, "infos", "senescoop.net", "http://senescoop.net"],
            [19, "infos", "sunugal24.net", "http://sunugal24.net"],
            [20, "infos", "dakar92.com", "http://dakar92.com"],
            [21, "infos", "rumeurs221.com", "http://rumeurs221.com"],
            [22, "infos", "bonjourdakar.com", "http://bonjourdakar.com"],
            [23, "infos", "vipeoples.net", "http://vipeoples.net"],
            [24, "infos", "seneplus.com", "http://seneplus.com"],
            [25, "infos", "wiwsport.com", "http://wiwsport.com"],
            [26, "infos", "viberadio.sn", "http://viberadio.sn"],
            [27, "infos", "yerimpost.com", "http://yerimpost.com"],
            [28, "infos", "ndarinfo.com", "http://ndarinfo.com"],
            [29, "infos", "dakarposte.com", "http://dakarposte.com"],
            [30, "infos", "exclusif.net", "http://exclusif.net"],
            [31, "infos", "senegaldirect.net", "http://senegaldirect.net"]
        ];
        this.INTERNATIONALS_WEBSITES = [
            [1, "sport ", "footmercato.net", "http://www.footmercato.net"],
            [2, "infos", "lexpress.fr", "http://www.lexpress.fr"],
            [3, "sport ", "mercatolive.fr", "http://www.mercatolive.fr"],
            [4, "sport ", "maxifoot.fr", "http://maxifoot.fr"],
            [5, "sport ", "livefoot.fr", "http://livefoot.fr"],
            [6, "forum", "01net.com", "http://01net.com"],
            [7, "sport ", "le10sport.com", "http://le10sport.com"],
            [8, "sport ", "maxifoot-live.com", "http://maxifoot-live.com"],
            [9, "forum", "01net.com", "http://01net.com"],
            [10, "infos", "bfmtv.com", "http://bfmtv.com"],
            [11, "sport ", "besoccer.com", "http://besoccer.com"],
            [12, "sport ", "foot01.com", "http://foot01.com"],
            [13, "sport ", "basketsession.com", "http://basketsession.com"],
            [14, "sport ", "basket-infos.com", "http://basket-infos.com"],
            [15, "infos", "skyrock.com", "http://skyrock.com"],
            [16, "infos", "leparisien.fr", "http://leparisien.fr"],
        ];
        this.SITES_ANNONCES = [
            [1, "annonces", "deals.jumia.sn", "http://deals.jumia.sn"],
            [2, "annonces", "expat-dakar.com", "http://expat-dakar.com"],
            [3, "annonces", "coinafrique.com", "http://coinafrique.com"]
        ];
        this.APP_MOBILES = [
            [1, "App", "Senego", "https://play.google.com/store/apps/details?id=com.nextwebart.senego"],
            [2, "App", "Super-Bright LED Flashlight ", "https://play.google.com/store/apps/details?id=com.surpax.ledflashlight.panel"],
            [3, "App", "CallApp: Caller ID", "https://play.google.com/store/apps/details?id=com.callapp.contacts"],
            [4, "App", "PhotoGrid: Video & Pic Collage Maker, ", "https://play.google.com/store/apps/details?id=com.roidapp.photogrid"],
            [5, "App", "Bubble Shooter ", "https://play.google.com/store/apps/details?id=bubbleshooter.orig"],
            [6, "App", " MAX Cleaner - Antivirus, Phone Cleaner", "https://play.google.com/store/apps/details?id=com.oneapp.max.cleaner.booster"],
            [7, "App", "Block Puzzle ", "https://play.google.com/store/apps/details?id=com.puzzlegamesclassic.tetris.blockpuzzle"],
            [8, "App", "Bubble Breaker ", "https://play.google.com/store/apps/details?id=com.faceplus.bubble.breaker"],
            [9, "App", "Flashlight ", "https://play.google.com/store/apps/details?id=com.splendapps.torch"],
            [10, "App", "Photo Lock App ", "https://play.google.com/store/apps/details?id=vault.gallery.lock"]
        ];
        this.model = {};
        this.Direction = {
            LEFT: 0,
            UP: 1,
            RIGHT: 2,
            DOWN: 3
        };
        this.DirectionSteps = {
            REGULAR: 1,
            SHIFT: 5
        };
        this.presetFonts = ['Arial', 'Serif', 'Helvetica', 'Sans-Serif', 'Open Sans', 'Roboto Slab'];
        this.customColors = [];
        this.selectedLibrary = 'brands';
        this.palettes = {
            selected: null,
            defaults: [
                { key: '#001f3f', value: 'Navy', type: 'default' },
                { key: '#0074D9', value: 'Blue', type: 'default' },
                { key: '#7FDBFF', value: 'Aqua', type: 'default' },
                { key: '#39CCCC', value: 'Teal', type: 'default' },
                { key: '#3D9970', value: 'Olive', type: 'default' },
                { key: '#2ECC40', value: 'Green', type: 'default' },
                { key: '#01FF70', value: 'Lime', type: 'default' },
                { key: '#FFDC00', value: 'Yellow', type: 'default' },
                { key: '#FF851B', value: 'Orange', type: 'default' },
                { key: '#FF4136', value: 'Red', type: 'default' },
                { key: '#85144b', value: 'Maroon', type: 'default' },
                { key: '#F012BE', value: 'Fuchsia', type: 'default' },
                { key: '#B10DC9', value: 'Purple', type: 'default' },
                { key: '#111111', value: 'Black', type: 'default' },
                { key: '#AAAAAA', value: 'Gray', type: 'default' },
                { key: '#DDDDDD', value: 'Silver', type: 'default' }
            ],
            custom: []
        };
        this.library = {
            brands: [
                { name: 'Audi', src: 'assets/libraries/brands/audi-sd.png' },
                { name: 'BMW', src: 'assets/libraries/brands/bmw-sd.png' },
                { name: 'Citroen', src: 'assets/libraries/brands/citroen-sd.png' },
                { name: 'Fiat', src: 'assets/libraries/brands/fiat-sd.png' },
                { name: 'Ford', src: 'assets/libraries/brands/ford-sd.png' },
                { name: 'General Motors', src: 'assets/libraries/brands/generalmotors-sd.png' },
                { name: 'Honda', src: 'assets/libraries/brands/honda-sd.png' },
                { name: 'Hyundai', src: 'assets/libraries/brands/hyundai-sd.png' },
                { name: 'Infiniti', src: 'assets/libraries/brands/infiniti-sd.png' },
                { name: 'Kia', src: 'assets/libraries/brands/kia-sd.png' },
                { name: 'Lexus', src: 'assets/libraries/brands/lexus-sd.png' },
                { name: 'Mazda', src: 'assets/libraries/brands/mazda-sd.png' },
                { name: 'Mercedes-Benz', src: 'assets/libraries/brands/mercedesbenz-sd.png' },
                { name: 'Mini', src: 'assets/libraries/brands/mini-sd.png' },
                { name: 'Nissan', src: 'assets/libraries/brands/nissan-sd.png' },
                { name: 'Peugeot', src: 'assets/libraries/brands/peugeot-sd.png' },
                { name: 'Porsche', src: 'assets/libraries/brands/porsche-sd.png' },
                { name: 'Renault', src: 'assets/libraries/brands/renault-sd.png' },
                { name: 'Seat', src: 'assets/libraries/brands/seat-sd.png' },
                { name: 'Skoda', src: 'assets/libraries/brands/skoda-sd.png' },
                { name: 'Tesla', src: 'assets/libraries/brands/tesla-sd.png' },
                { name: 'Toyota', src: 'assets/libraries/brands/toyota-sd.png' },
                { name: 'Volkswagen', src: 'assets/libraries/brands/volkswagen-sd.png' },
                { name: 'Volvo', src: 'assets/libraries/brands/volvo-sd.png' }
            ]
        };
        this.font = new ngx_font_picker_1.Font({
            family: 'Roboto',
            size: '14px',
            style: 'regular',
            styles: ['regular']
        });
        this.props = {
            canvasFill: '#ffffff',
            canvasImage: '',
            id: null,
            opacity: null,
            fill: null,
            stroke: null,
            strokeWidth: null,
            fontSize: null,
            lineHeight: null,
            charSpacing: null,
            fontWeight: null,
            fontStyle: null,
            textAlign: null,
            fontFamily: 'Open Sans',
            TextDecoration: '',
            scale: 1,
            angle: 0
        };
        this.elementTypes = {
            'image': { key: 'image', text: 'Image', icon: 'icon-image' },
            'i-text': { key: 'i-text', text: 'Texte', icon: 'icon-text_format' },
            'rect': { key: 'rect', text: 'Rectangle', icon: 'icon-aspect_ratio' },
            'triangle': { key: 'triangle', text: 'triangle', icon: 'icon-change_history' },
            'circle': { key: 'circle', text: 'Cercle', icon: 'icon-radio_button_unchecked' },
            'polygon': { key: 'polygon', text: 'Polygone', icon: 'icon-crop_square' }
        };
        this.urlName = '';
        this.selectedSize = null;
        this.sizes = [
            { width: 640, height: 480 },
            { width: 1024, height: 768 },
            { width: 1920, height: 1080 }
        ];
        this.sliderConfig = {
            pips: {
                mode: 'range',
                density: 5
            }
        };
        this.shapeEditor = false;
        this.layers = [];
        this.canva_state = false;
    }
    AnnoncesComponent.prototype.go = function () {
        window.location.replace(REDIRECT_URL);
        /*  this.router.navigate(['/']) */
    };
    AnnoncesComponent.prototype.handleCanvas = function (width, height) {
        var _this = this;
        this.canvas = "";
        this.canvas = new fabric.Canvas('canvas', {
            hoverCursor: 'pointer',
            selection: true,
            selectionBorderColor: 'blue',
            preserveObjectStacking: true,
        });
        this.loadPalette();
        // register keyboard events
        fabric.util.addListener(document.body, 'keydown', function (opt) {
            // do not invoke keyboard events on input fields
            if (opt.target.tagName === 'INPUT') {
                return;
            }
            // if(opt.repeat) return; // prevent repeating (keyhold)
            var key = opt.which || opt.keyCode;
            _this.handleKeyPress(key, opt);
        });
        // register fabric.js events
        this.canvas.on({
            'object:moving': function (e) {
            },
            'object:modified': function (e) {
            },
            'object:selected': function (e) {
                var selectedObject = e.target;
                _this.selected = selectedObject;
                selectedObject.hasRotatingPoint = true;
                selectedObject.transparentCorners = false;
                selectedObject.cornerColor = 'rgba(255, 87, 34, 0.7)';
                _this.resetPanels();
                if (selectedObject.type !== 'group' && selectedObject) {
                    _this.getId();
                    _this.getOpacity();
                    _this.getTitle();
                    switch (selectedObject.type) {
                        case 'polygon':
                        case 'rect':
                        case 'circle':
                        case 'triangle':
                            _this.shapeEditor = true;
                            _this.getFill();
                            _this.getStroke();
                            _this.getStrokeWidth();
                            break;
                        case 'i-text':
                            _this.textEditor = true;
                            _this.getLineHeight();
                            _this.getCharSpacing();
                            _this.getBold();
                            _this.getFontStyle();
                            _this.getFontSize();
                            _this.getFill();
                            _this.getStroke();
                            _this.getStrokeWidth();
                            _this.getTextDecoration();
                            _this.getTextAlign();
                            _this.getFontFamily();
                            break;
                        case 'image':
                            break;
                    }
                }
            },
            'selection:cleared': function (e) {
                _this.selected = null;
                _this.resetPanels();
            }
        });
        this.canvas_style['width'] = width;
        this.canvas_style['height'] = height;
        this.canvas.setWidth(width);
        this.canvas.setHeight(height);
        this.canva_state = true;
        //console.log('handled')
    };
    AnnoncesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var button = document.getElementById('v-pills-add-ad-tab');
        var image = document.querySelector('.img-check');
        this.isEditor = false;
        this.isAdBlock = false;
        this.ads = this.adsService.getListAd(this.ad_group_id);
        this.ads.forEach(function (child) {
            if (child.length > 0) {
                _this.number_ads = child.length;
                _this.isNull = true;
            }
            else {
                _this.list_ad = false;
                _this._init_ad = true;
                _this.number_ads = "0";
                _this.isNull = false;
            }
            if (_this.isNull === false) {
                if (_this.ad_type === "UPLOAD") {
                    _this.currentIdInputDisplay = _this.idOfDisplayUrlInitUpload;
                    _this.currentIdInputName = _this.idOfAdNameCreateUpload;
                }
                else {
                    _this.currentIdInputDisplay = _this.idOfDisplayUrlInitCreatives;
                    _this.currentIdInputName = _this.idOfAdNameInitCreatives;
                }
            }
        });
        button.addEventListener("click", function () {
            $('#block').css("display", "none");
        });
    };
    AnnoncesComponent.prototype.toggleModifyUploadImage = function () {
        this.button_modify_image_upload = false;
        $("#button_modify_image_upload").show();
    };
    AnnoncesComponent.prototype.closeModifyUploadImage = function () {
        $("#button_modify_image_upload").hide();
        this.button_modify_image_upload = true;
    };
    AnnoncesComponent.prototype.checkAdType = function (img, width, height, url, name) {
        //console.log('click on img')
        //console.log(img)
        if (this.element_checked == "") {
            $("#" + img).toggleClass('check');
            this.element_checked = "#" + img;
            this.selectedWidth = width;
            this.selectedHeight = height;
            this.illustration = true;
            this.illustrationUrl = url;
            this.selectedAdType = name;
        }
        else {
            this.illustration = false;
            $(this.element_checked).toggleClass('check');
            $("#" + img).toggleClass('check');
            this.element_checked = "#" + img;
            this.selectedWidth = width;
            this.selectedHeight = height;
            this.illustration = true;
            this.illustrationUrl = url;
            this.selectedAdType = name;
        }
    };
    AnnoncesComponent.prototype.loadScript = function (src) {
        var isFound = false;
        var scripts = document.getElementsByTagName("script");
        for (var i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
                isFound = true;
            }
        }
        if (!isFound) {
            var dynamicScripts = [src];
            for (var i = 0; i < dynamicScripts.length; i++) {
                var node = document.createElement('script');
                node.src = dynamicScripts[i];
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                document.getElementsByTagName('body')[0].appendChild(node);
            }
        }
    };
    AnnoncesComponent.prototype.goBackSelectSize = function () {
        this.chooseBlock = false;
        this.chooseAdSize = true;
    };
    AnnoncesComponent.prototype.handleUploadBanner = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.chooseBlock = false;
                this.chooseAdSize = false;
                this.is_upload_way = true;
                this.ad_type = "UPLOAD";
                if (this.isNull === true) {
                    $("#block1").css("display", "block");
                    this.currentIdInputName = this.idOfAdNameCreateUpload;
                    this.currentIdInputDisplay = this.idOfDisplayUrlCreateUpload;
                }
                else {
                    $("#block").css("display", "block");
                    this.currentIdInputName = this.idOfAdNameInitUpload;
                    this.currentIdInputDisplay = this.idOfDisplayUrlInitUpload;
                }
                setTimeout(function () {
                }, 2000);
                return [2 /*return*/];
            });
        });
    };
    AnnoncesComponent.prototype.goBackFromUpload = function () {
        this.isUpload = false;
        this.is_upload_way = false;
        this.ad_type = "";
        this.currentIdInputName = "";
        this.currentIdInputDisplay = "";
        if (this.isNull === true) {
            $("#block1").css("display", "none");
        }
        else {
            $("#block").css("display", "none");
        }
        this.chooseBlock = true;
    };
    AnnoncesComponent.prototype.goBackFromCreatives = function () {
        this.handleCreateCanvas = false;
        this.chooseBlock = true;
        this.ad_type = "";
        this.currentIdInputName = "";
        this.currentIdInputDisplay = "";
    };
    AnnoncesComponent.prototype.handleCreatives = function () {
        var self = this;
        this.ad_type = "CREATIVE";
        this.chooseBlock = false;
        if (this.isNull === true) {
            this.currentIdInputName = this.idOfAdNameCreateCreatives;
            this.currentIdInputDisplay = this.idOfDisplayUrlCreateCreatives;
        }
        else {
            this.currentIdInputName = this.idOfAdNameInitCreatives;
            this.currentIdInputDisplay = this.idOfDisplayUrlInitCreatives;
        }
        if (this.handleCreateCanvas == false) {
            this.handleCreateCanvas = true;
            if (this.canva_state == false) {
                this.isCreating = true;
                setTimeout(function () {
                    self.handleCanvas(parseInt(self.selectedWidth), parseInt(self.selectedHeight));
                    self.isCreating = false;
                }, 2000);
            }
            else {
                self.isCreating = true;
                setTimeout(function () {
                    self.canvas.clear();
                }, 2000);
                setTimeout(function () {
                    self.handleCanvas(parseInt(self.selectedWidth), parseInt(self.selectedHeight));
                    self.isCreating = false;
                }, 2000);
            }
        }
        else {
            this.handleCreateCanvas = false;
        }
    };
    AnnoncesComponent.prototype.chooseAdType = function () {
        this.chooseAdSize = false;
        this.chooseBlock = true;
    };
    AnnoncesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.notificationAccount.forEach(function (value) {
            if (value.notification != "") {
                _this.numberOfNotifications = 1;
                _this.notificationAccountValue = value.notification;
            }
        });
        // get references to the html canvas element & its context
        // this.canvas.on('mouse:down', (e) => {
        // let canvasElement: any = document.getElementById('canvas');
        // //console.log(canvasElement)
        // });
        this.route.params.subscribe(function (params) {
            if (typeof (params['budget']) == "undefined") {
                _this.ad_group_name = params['name'];
                _this.campagne_id = params['campaign_id'];
                _this.ad_group_id = params['ad_group_id'];
                _this.idC = params['idC'];
                _this.idA = params['idA'];
                _this.auth.user.subscribe(function (data) {
                    _this.uid = data.uid;
                    _this.email = data.email;
                    _this.email_letter = data.email.charAt(0);
                    _this.accountValue = data.account_value;
                    _this.notesService.getSingleCampaignWithId(data.uid, _this.campagne_id).then(function (res) {
                        //console.log(res)
                        _this.startDateFrench = res['startDateFrench'];
                        _this.endDateFrench = res['endDateFrench'];
                        _this.startDate = res['startDate'];
                        _this.endDate = res['endDate'];
                        _this.budget = res['budget'];
                        _this.budgetId = res['budgetId'];
                        _this.dure_campagne = _this.datediff(_this.parseDate(res['startDateFrench']), _this.parseDate(res['endDateFrench']));
                    });
                });
            }
            else {
                //console.log(params)
                _this.id_ad_firebase = params['id_ad_firebase'];
                _this.ad_group_name = params['name'];
                _this.campagne_id = params['campaign_id'];
                _this.ad_group_id = params['ad_group_id'];
                _this.idC = params['idC'];
                _this.idA = params['idA'];
                _this.isCreating = true;
                _this.notesService.updateNote(params['idC'], { budget: parseInt(params["budget"]), dailyBudget: parseInt(params['dailyBudget']), numberOfDays: parseInt(params['numberOfDays']) }).then(function () {
                    sweetalert2_1.default.fire({
                        title: 'Service Campagne!',
                        text: 'Budget mis à jour.',
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#26a69a',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then(function (result) {
                        if (result.value) {
                            window.history.pushState("", "", "/ads/" + params['name'] + "/" + params['idC'] + "/" + params['idA'] + "/" + params['ad_group_id'] + "/" + params['campaign_id']);
                            _this.isCreating = false;
                            _this.auth.user.subscribe(function (data) {
                                _this.uid = data.uid;
                                _this.email = data.email;
                                _this.email_letter = data.email.charAt(0);
                                _this.accountValue = data.account_value;
                                _this.notesService.getSingleCampaignWithId(data.uid, _this.campagne_id).then(function (res) {
                                    //console.log(res)
                                    _this.startDateFrench = res['startDateFrench'];
                                    _this.endDateFrench = res['endDateFrench'];
                                    _this.startDate = res['startDate'];
                                    _this.endDate = res['endDate'];
                                    _this.budget = res['budget'];
                                    _this.budgetId = res['budgetId'];
                                    _this.dure_campagne = _this.datediff(_this.parseDate(res['startDateFrench']), _this.parseDate(res['endDateFrench']));
                                });
                            });
                            document.getElementById(_this.id_ad_firebase).click();
                            _this.isCreating = true;
                            setTimeout(function () {
                                document.getElementById("publish").click();
                            }, 2000);
                            _this.isCreating = false;
                        }
                    });
                });
            }
            if (typeof (params['money']) != "undefined" && typeof (params['id_ad_firebase']) != "undefined") {
                _this.isCreating = true;
                _this.auth.user.forEach(function (data) {
                    _this.auth.updateUser(data.uid, { account_value: params['money'] });
                    _this.auth.getInfos(data.uid).subscribe(function (el) {
                        _this.auth.updateNotification(el[0]['id'], { notification: "" }).then(function () {
                            sweetalert2_1.default.fire({
                                title: 'Service Rechargement!',
                                text: 'Compte mis à jour avec succès.',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                if (result.value) {
                                    _this.isCreating = false;
                                    setTimeout(function () {
                                        document.getElementById(params['id_ad_firebase']).click();
                                    }, 2000);
                                    window.history.pushState("", "", "/ads/" + params['name'] + "/" + params['idC'] + "/" + params['idA'] + "/" + params['ad_group_id'] + "/" + params['campaign_id']);
                                    setTimeout(function () {
                                        document.getElementById("publish").click();
                                    }, 2000);
                                }
                            });
                        });
                    });
                });
            }
        });
        var chartData = {
            labels: ["S", "M", "T", "W", "T", "F", "S"],
            datasets: [{
                    data: [589, 445, 483, 503, 689, 692, 634],
                },
                {
                    data: [639, 465, 493, 478, 589, 632, 674],
                }]
        };
        var chLine = document.getElementById("chLine");
        if (chLine) {
            new Chart(chLine, {
                type: 'line',
                data: chartData,
                options: {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: false
                                }
                            }]
                    },
                    legend: {
                        display: false
                    }
                }
            });
        }
        // In a real app: dispatch action to load the details here.
        this.adgroups = this.adGroupService.getAdGroup(this.idA).valueChanges().subscribe(function (res) {
            _this.status = res['status'];
            _this.genres = res['sexes'];
            _this.populations = res['ages'];
            _this.appareils = res['devices'];
            _this.placement = res['placement'];
            //console.log('populations')
            /* //console.log(this.genres) */
            //console.log(this.populations)
        });
        this.dropdownListAges = [{
                item_id: 503999,
                item_text: 'indéterminé'
            },
            {
                item_id: 503001,
                item_text: '18-24 ans'
            },
            {
                item_id: 503002,
                item_text: '25-34 ans'
            },
            {
                item_id: 503003,
                item_text: '35-44 ans'
            },
            {
                item_id: 503004,
                item_text: '45-54 ans'
            },
            {
                item_id: 503005,
                item_text: '55-64 ans'
            },
            {
                item_id: 503006,
                item_text: '+64 ans'
            }
        ];
        this.dropdownListSexes = [{
                item_id: 20,
                item_text: 'indéterminé'
            },
            {
                item_id: 10,
                item_text: 'Hommes'
            },
            {
                item_id: 11,
                item_text: 'Femmes'
            },
        ];
        this.dropdownListDevices = [{
                item_id: 30000,
                item_text: 'Ordinateurs'
            },
            {
                item_id: 30001,
                item_text: 'Mobiles'
            },
            {
                item_id: 30002,
                item_text: 'Tablettes'
            },
            {
                item_id: 30004,
                item_text: "Tv Connectée"
            }
        ];
        this.dropdownListZones = [{
                item_id: 9070424,
                item_text: 'Dakar'
            },];
        for (var i = 0; i < this.NATIONALS_WEBSITES.length; i++) {
            //console.log(this.NATIONALS_WEBSITES[i][2])
            this.dropdownListNationalsWebsites.push({
                item_id: this.NATIONALS_WEBSITES[i][3],
                item_text: this.NATIONALS_WEBSITES[i][2]
            });
        }
        for (var i = 0; i < this.INTERNATIONALS_WEBSITES.length; i++) {
            this.dropdownListInternationalsWebsites.push({
                item_id: this.INTERNATIONALS_WEBSITES[i][3],
                item_text: this.INTERNATIONALS_WEBSITES[i][2]
            });
        }
        for (var i = 0; i < this.SITES_ANNONCES.length; i++) {
            this.dropdownListAdsWebsites.push({
                item_id: this.SITES_ANNONCES[i][3],
                item_text: this.SITES_ANNONCES[i][2]
            });
        }
        for (var i = 0; i < this.APP_MOBILES.length; i++) {
            this.dropdownListApps.push({
                item_id: this.APP_MOBILES[i][3],
                item_text: this.APP_MOBILES[i][2]
            });
        }
        this.dropdownSettingsAges = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Tout sélectionner',
            unSelectAllText: 'annuler',
            itemsShowLimit: 8,
            allowSearchFilter: false,
            searchPlaceholderText: 'Rechercher',
        };
        this.dropdownSettingsSexes = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: 'Rechercher',
        };
        this.dropdownSettingsZones = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: true,
            searchPlaceholderText: 'Rechercher',
        };
        this.dropdownSettingsDevices = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Tout sélectionner',
            unSelectAllText: 'annuler',
            itemsShowLimit: 3,
            allowSearchFilter: false,
            searchPlaceholderText: 'Rechercher',
        };
        this.dropdownSettingsNationalsWebsites = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Tout sélectionner',
            unSelectAllText: 'annuler',
            itemsShowLimit: 10,
            allowSearchFilter: true,
            searchPlaceholderText: 'Rechercher',
        };
        this.dropdownSettingsInternationalsWebsites = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Tout sélectionner',
            unSelectAllText: 'annuler',
            itemsShowLimit: 10,
            allowSearchFilter: true,
            searchPlaceholderText: 'Rechercher',
        };
        this.dropdownSettingsAdsWebsites = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Tout sélectionner',
            unSelectAllText: 'annuler',
            itemsShowLimit: 10,
            allowSearchFilter: false,
            searchPlaceholderText: 'Rechercher',
        };
        this.dropdownSettingsApps = {
            singleSelection: false,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Tout sélectionner',
            unSelectAllText: 'annuler',
            itemsShowLimit: 10,
            allowSearchFilter: true,
            searchPlaceholderText: 'Rechercher',
        };
        //setup front side canvas
        this.ads = this.adsService.getListAd(this.ad_group_id);
        this.ads.forEach(function (child) {
            if (child.length > 0) {
                _this.number_ads = child.length;
                _this.isNull = true;
            }
            else {
                _this.list_ad = false;
                _this._init_ad = true;
                _this.number_ads = "0";
                _this.isNull = false;
            }
        });
        setTimeout(function () {
            $("#block1").css("display", "none");
        }, 2000);
    };
    AnnoncesComponent.prototype.buildForm = function () {
        var _this = this;
        this.adForm = this.fb.group({
            'name': ['', [
                    forms_1.Validators.required,
                    forms_1.Validators.name,
                ]],
            'finalUrls': ['', [
                    forms_1.Validators.pattern('https?://.+'),
                    forms_1.Validators.minLength(6),
                    forms_1.Validators.maxLength(45),
                ]],
        });
        this.adForm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged(); // reset validation messages
    };
    AnnoncesComponent.prototype.editorTrue = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.buildForm();
                resolve(true);
                return [2 /*return*/];
            });
        }); });
    };
    // Updates validation state on form changes.
    AnnoncesComponent.prototype.onValueChanged = function (data) {
        if (!this.adForm) {
            return;
        }
        var form = this.adForm;
        for (var field in this.formErrors) {
            if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'name' || field === 'finalUrls')) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                var control = form.get(field);
                if (control && control.dirty && !control.valid) {
                    var messages = this.validationMessages[field];
                    if (control.errors) {
                        for (var key in control.errors) {
                            if (Object.prototype.hasOwnProperty.call(control.errors, key)) {
                                this.formErrors[field] += messages[key] + " ";
                            }
                        }
                    }
                }
            }
        }
    };
    AnnoncesComponent.prototype.handleToggleAdGroupSettings = function () {
        if (this.isCollapsed == false) {
            this.isCollapsed = true;
            this.icon_toggle = "icon-chevron-right";
        }
        else {
            this.isCollapsed = false;
            this.icon_toggle = 'icon-chevron-left';
        }
    };
    AnnoncesComponent.prototype.handleToggleOptions = function () {
        if (this.isOptions == false) {
            this.isOptions = true;
            this.icon_toggle_options = "icon-chevron-up";
        }
        else {
            this.isOptions = false;
            this.icon_toggle_options = 'icon-chevron-down';
        }
    };
    AnnoncesComponent.prototype.handleTogglePlacement = function () {
        this.isGender = true;
        this.isAge = true;
        this.isDevice = true;
        if (this.isPlacement == false) {
            this.isPlacement = true;
        }
        else {
            this.isPlacement = false;
        }
    };
    AnnoncesComponent.prototype.handleToggleGender = function () {
        this.isAge = true;
        this.isPlacement = true;
        this.isDevice = true;
        if (this.isGender == false) {
            this.isGender = true;
        }
        else {
            this.isGender = false;
        }
    };
    AnnoncesComponent.prototype.handleToggleAge = function () {
        this.isGender = true;
        this.isPlacement = true;
        this.isDevice = true;
        if (this.isAge == false) {
            this.isAge = true;
        }
        else {
            this.isAge = false;
        }
    };
    AnnoncesComponent.prototype.handleToggleDevice = function () {
        this.isGender = true;
        this.isAge = true;
        this.isPlacement = true;
        if (this.isDevice == false) {
            this.isDevice = true;
        }
        else {
            this.isDevice = false;
        }
    };
    AnnoncesComponent.prototype.popperClick = function () {
        $('#popper').trigger('click');
    };
    AnnoncesComponent.prototype.toggleListAd = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.isEditor = false;
                this.ads = this.adsService.getListAd(this.ad_group_id);
                this.list_ad = true;
                this.currentEditor = false;
                this.isAdBlock = false;
                $("#blockUploadModified").css({ 'display': 'none' });
                return [2 /*return*/];
            });
        });
    };
    AnnoncesComponent.prototype.toggleEditor = function () {
        var self = this;
        this.currentEditor = false;
        this.isAdBlock = false;
        this.list_ad = false;
        /* if (this.list_ad == false) {
          this.ads = this.adsService.getListAd(this.ad_group_id)
          this.list_ad = true
        }else{
          this.list_ad = false
        } */
        if (this.isEditor == false) {
            this.isEditor = true;
            if (this.canva_state == false) {
                this.isCreating = true;
                /*    this.isEditor = true
                setTimeout(function(){
                  
                  self.resetPanels()
                  
                }, 2000); */
                setTimeout(function () {
                    self.handleCanvas(parseInt(self.selectedWidth), parseInt(self.selectedHeight));
                    self.isCreating = false;
                }, 2000);
            }
            else {
                self.isCreating = true;
                setTimeout(function () {
                    self.canvas.clear();
                }, 2000);
                setTimeout(function () {
                    self.handleCanvas(parseInt(self.selectedWidth), parseInt(self.selectedHeight));
                    self.isCreating = false;
                }, 2000);
            }
        }
        else {
            this.isEditor = false;
        }
    };
    AnnoncesComponent.prototype.openAddCiblageGenre = function () {
        this.isCiblageGenre = true;
    };
    AnnoncesComponent.prototype.openAddCiblageDevices = function () {
        this.isCiblageDevices = true;
    };
    AnnoncesComponent.prototype.targetGender = function () {
        var _this = this;
        //console.log(this.sexes)
        this.isCreating = true;
        if (this.sexes.length == 0) {
            this.isCreating = false;
            sweetalert2_1.default.fire({
                title: 'Ciblage',
                text: 'Aucun genre séléctionné',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            }).then(function (result) {
                if (result.value) { }
            });
        }
        else {
            this.adGroupService.targetGenre(this.idA, this.campagne_id, this.ad_group_id, this.sexes).then(function (res) {
                _this.sexes = [];
            }).then(function (res) {
                _this.isCiblageGenre = false;
                _this.isCreating = false;
            });
        }
    };
    AnnoncesComponent.prototype.removePlacement = function (name, criterion_id) {
        var _this = this;
        sweetalert2_1.default.fire({
            title: 'Emplacement',
            text: "Vous allez supprimer l'emplacement " + name + " ?",
            type: 'error',
            showCancelButton: false,
            confirmButtonColor: '#26a69a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Supprimer'
        }).then(function (result) {
            if (result.value) {
                _this.isCreating = true;
                _this.adGroupService.removePlacement(_this.idA, _this.campagne_id, _this.ad_group_id, criterion_id).then(function (res) {
                    if (res != "error") {
                        sweetalert2_1.default.fire({
                            title: 'Emplacement',
                            text: 'Emplacement suprimé avec succès',
                            type: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok'
                        }).then(function (result) {
                            if (result.value) {
                                _this.isCreating = false;
                            }
                            else {
                                _this.isCreating = false;
                            }
                        });
                    }
                    else {
                        _this.isCreating = false;
                    }
                });
            }
            else {
                _this.isCreating = false;
            }
        });
    };
    AnnoncesComponent.prototype.targetPlacement = function () {
        var _this = this;
        var self = this;
        var placement = [];
        //console.log(this.ads_websites)
        //console.log(this.nationals_websites)
        //console.log(this.internationals_websites)
        this.isCreating = true;
        if (this.nationals_websites.length == 0) {
            this.isCreating = false;
            sweetalert2_1.default.fire({
                title: 'Ciblage',
                text: 'Séléctionner au moins un site national',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            }).then(function (result) {
                if (result.value) { }
            });
        }
        else {
            placement.push(this.nationals_websites, this.internationals_websites, this.ads_websites);
            this.adGroupService.targetPlacement(this.idA, this.campagne_id, this.ad_group_id, placement).then(function (res) {
                _this.sexes = [];
            }).then(function (res) {
                _this.isCiblageGenre = false;
                _this.isCreating = false;
            });
        }
    };
    AnnoncesComponent.prototype.targetDevices = function () {
        var _this = this;
        //console.log(this.devices)
        this.isCreating = true;
        if (this.devices.length == 0) {
            this.isCreating = false;
            sweetalert2_1.default.fire({
                title: 'Ciblage',
                text: 'Aucun appareil séléctionné',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            }).then(function (result) {
                if (result.value) { }
            });
        }
        else {
            this.adGroupService.targetDevices(this.idA, this.campagne_id, this.ad_group_id, this.devices).then(function (res) {
                _this.devices = [];
            }).then(function (res) {
                _this.isCreating = false;
                _this.isCiblageDevices = false;
            });
        }
    };
    AnnoncesComponent.prototype.closeAddCiblageGenre = function () {
        this.isCiblageGenre = false;
    };
    AnnoncesComponent.prototype.closeAddCiblageDevices = function () {
        this.isCiblageDevices = false;
    };
    AnnoncesComponent.prototype.closeAddPlacement = function () {
        if (this.isPlacement == false) {
            this.isPlacement = true;
        }
        else {
            this.isPlacement = false;
        }
    };
    AnnoncesComponent.prototype.openAddCiblageAge = function () {
        this.isCiblageAge = true;
    };
    AnnoncesComponent.prototype.targetAge = function () {
        var _this = this;
        //console.log(this.ages)
        this.isCreating = true;
        if (this.ages.length == 0) {
            this.isCreating = false;
            sweetalert2_1.default.fire({
                title: 'Ciblage',
                text: 'Aucun genre séléctionné',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            }).then(function (result) {
                if (result.value) { }
            });
        }
        else {
            this.adGroupService.targetAge(this.idA, this.campagne_id, this.ad_group_id, this.ages).then(function (res) {
                _this.ages = [];
            }).then(function (res) {
                _this.isCiblageAge = false;
                _this.isCreating = false;
            });
        }
    };
    AnnoncesComponent.prototype.closeAddCiblageAges = function () {
        this.isCiblageAge = false;
    };
    AnnoncesComponent.prototype.onAgeSelect = function (item) {
        this.ages.push(item);
        //console.log(this.ages)
    };
    AnnoncesComponent.prototype.onAgeSelectAll = function (items) {
        //console.log(items);
        this.ages = [];
        this.ages = items;
    };
    AnnoncesComponent.prototype.onAgeDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.ages.length; i++) {
            if (this.ages[i]['item_id'] == item.item_id) {
                this.ages.splice(i, 1);
            }
        }
        //console.log(this.ages)
    };
    AnnoncesComponent.prototype.onDeSelectAllAge = function () {
        this.ages = [];
        //console.log(this.ages)
    };
    AnnoncesComponent.prototype.onNationalsWebsitesSelect = function (item) {
        this.nationals_errors = '';
        this.nationals_websites.push(item);
        //console.log(this.nationals_websites)
    };
    AnnoncesComponent.prototype.onNationalsWebsitesSelectAll = function (items) {
        this.nationals_errors = '';
        this.nationals_websites = [];
        this.nationals_websites = items;
        //console.log(this.nationals_websites);
    };
    AnnoncesComponent.prototype.onNationalsWebsitesDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.nationals_websites.length; i++) {
            if (this.nationals_websites[i]['item_id'] == item.item_id) {
                this.nationals_websites.splice(i, 1);
            }
        }
        //console.log(this.nationals_websites)
    };
    AnnoncesComponent.prototype.onNationalsWebsitesDeSelectAll = function () {
        this.nationals_websites = [];
        //console.log(this.nationals_websites)
    };
    AnnoncesComponent.prototype.onInternationalsWebsitesSelect = function (item) {
        this.internationals_websites.push(item);
        //console.log(this.internationals_websites)
    };
    AnnoncesComponent.prototype.onInternationalsWebsitesSelectAll = function (items) {
        this.internationals_websites = [];
        this.internationals_websites = items;
        //console.log(this.internationals_websites)
    };
    AnnoncesComponent.prototype.onInternationalsWebsitesDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.internationals_websites.length; i++) {
            if (this.internationals_websites[i]['item_id'] == item.item_id) {
                this.internationals_websites.splice(i, 1);
            }
        }
    };
    AnnoncesComponent.prototype.onInternationalsWebsitesDeSelectAll = function () {
        this.internationals_websites = [];
    };
    AnnoncesComponent.prototype.onAdsWebsitesSelect = function (item) {
        this.ads_websites.push(item);
        //console.log(this.ads_websites)
    };
    AnnoncesComponent.prototype.onAdsWebsitesSelectAll = function (items) {
        this.ads_websites = [];
        this.ads_websites = items;
        //console.log(this.ads_websites);
    };
    AnnoncesComponent.prototype.onAdsWebsitesDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.ads_websites.length; i++) {
            if (this.ads_websites[i]['item_id'] == item.item_id) {
                this.ads_websites.splice(i, 1);
            }
        }
        //console.log(this.ads_websites)
    };
    AnnoncesComponent.prototype.onAdsWebsitesDeSelectAll = function () {
        this.ads_websites = [];
        //console.log(this.ads_websites)
    };
    AnnoncesComponent.prototype.onAppsSelect = function (item) {
        this.apps.push(item);
        //console.log(this.apps)
    };
    AnnoncesComponent.prototype.onAppsSelectAll = function (items) {
        this.apps = [];
        this.apps = items;
        //console.log(this.apps);
    };
    AnnoncesComponent.prototype.onAppsDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.apps.length; i++) {
            if (this.apps[i]['item_id'] == item.item_id) {
                this.apps.splice(i, 1);
            }
        }
        //console.log(this.apps)
    };
    AnnoncesComponent.prototype.onAppsDeSelectAll = function () {
        this.apps = [];
        //console.log(this.apps)
    };
    AnnoncesComponent.prototype.onDevicesSelect = function (item) {
        this.devices.push(item);
        //console.log(this.devices)
    };
    AnnoncesComponent.prototype.onDevicesSelectAll = function (items) {
        //console.log(items);
        this.devices = [];
        this.devices = items;
    };
    AnnoncesComponent.prototype.onDevicesDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.devices.length; i++) {
            if (this.devices[i]['item_id'] == item.item_id) {
                this.devices.splice(i, 1);
            }
        }
        //console.log(this.devices)
    };
    AnnoncesComponent.prototype.onDeSelectAllDevices = function () {
        this.devices = [];
        //console.log(this.devices)
    };
    AnnoncesComponent.prototype.onSexeSelect = function (item) {
        this.sexes.push(item);
        //console.log(this.sexes)
    };
    AnnoncesComponent.prototype.onSexeSelectAll = function (items) {
        //console.log(items);
        this.sexes = [];
        this.sexes = items;
    };
    AnnoncesComponent.prototype.onSexeDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.sexes.length; i++) {
            if (this.sexes[i]['item_id'] == item.item_id) {
                this.sexes.splice(i, 1);
            }
        }
        //console.log(this.sexes)
    };
    AnnoncesComponent.prototype.onDeSelectAllSexe = function () {
        this.sexes = [];
        //console.log(this.sexes)
    };
    AnnoncesComponent.prototype.onZoneSelect = function (item) {
        this.zones.push(item);
        //console.log(this.zones)
    };
    AnnoncesComponent.prototype.onZoneSelectAll = function (items) {
        //console.log(items);
    };
    AnnoncesComponent.prototype.onZoneDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.zones.length; i++) {
            if (this.zones[i]['item_id'] == item.item_id) {
                this.zones.splice(i, 1);
            }
        }
        //console.log(this.zones)
    };
    AnnoncesComponent.prototype.onDeSelectAllZone = function () {
        this.zones = [];
        //console.log(this.zones)
    };
    //Block "Add text"
    AnnoncesComponent.prototype.addText = function () {
        var textString = 'Double cliquez ici';
        var text = new fabric.IText(textString, {
            left: 10,
            top: 10,
            fontFamily: 'helvetica',
            angle: 0,
            fill: '#000000',
            scaleX: 0.5,
            scaleY: 0.5,
            fontWeight: '',
            hasRotatingPoint: true
        });
        this.extend(text, this.randomId());
        this.canvas.add(text);
        this.selectItemAfterAdded(text);
        this.textString = '';
        this.updateLayers();
    };
    //Block "Add images"
    AnnoncesComponent.prototype.readUrl = function (event) {
        var _this = this;
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) {
                _this.url = event.target['result'];
                _this.addImageOnCanvas(event.target['result']);
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    };
    AnnoncesComponent.prototype.handleErrorUrl = function () {
        this.url_errors = [];
    };
    AnnoncesComponent.prototype.handleNationals = function () {
        this.nationals_errors = '';
    };
    AnnoncesComponent.prototype.handleImageModal = function () {
        var _this = this;
        //console.log(this.canvas.toDataURL('png'))
        this.getWebsites(this.currentIdInputDisplay).then(function (res) {
            if (res != 'error') {
                $('#button_modal_init').trigger('click');
                $('#ad_image').attr("src", _this.canvas.toDataURL('png'));
                //this.ad_name = $("#").val()
            }
            else {
            }
        });
    };
    AnnoncesComponent.prototype.handleImageUploadModal = function () {
        var _this = this;
        this.getWebsites(this.currentIdInputDisplay).then(function (res) {
            if (res != 'error') {
                var image = document.querySelector('.dz-image').getElementsByTagName('img');
                //console.log(image)
                if (image[0].naturalWidth != parseInt(_this.selectedWidth) || image[0].naturalHeight != parseInt(_this.selectedHeight)) {
                    sweetalert2_1.default.fire({
                        title: "Service Groupe d'annonce!",
                        text: 'Image invalide',
                        type: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then(function (result) {
                        if (result.value) {
                        }
                        else {
                        }
                    });
                }
                else {
                    _this.img_view_create_style['width'] = _this.selectedWidth + 'px';
                    _this.img_view_create_style['height'] = _this.selectedHeight + 'px';
                    $('#button_modal_init').trigger('click');
                    $('#ad_image').attr("src", $('.dz-image').find('img').attr("src"));
                    _this.ad_name = $("#" + _this.currentIdInputName).val();
                }
            }
            else {
            }
        });
    };
    AnnoncesComponent.prototype.handleModifiedImage = function () {
        var _this = this;
        if (this.currentAdType === 'CREATIVE') {
            this.new_image_content = "";
            this.new_image_content = JSON.stringify(this.canvas);
            //console.log(this.canvas.toDataURL('png'))
            this.getWebsites(this.currentIdInputDisplay).then(function (res) {
                if (res != 'error') {
                    $('#button_modal_modified').trigger('click');
                    $('#ad_image_modified').attr("src", _this.canvas.toDataURL('png'));
                    $("#modified_name").text($("#" + _this.currentIdInputName).val());
                }
                else {
                }
            });
        }
        else {
            this.getWebsites(this.currentIdInputDisplay).then(function (res) {
                if (res != 'error') {
                    alert(_this.button_modify_image_upload);
                    if (_this.button_modify_image_upload === true) {
                        _this.img_view_create_style['width'] = _this.selectedWidth + 'px';
                        _this.img_view_create_style['height'] = _this.selectedHeight + 'px';
                        $('#button_modal_modified').trigger('click');
                        $('#ad_image_modified').attr("src", _this.currentImageUrl);
                        $("#modified_name").text($("#" + _this.currentIdInputName).val());
                    }
                    else {
                        var image = document.querySelector('.dz-image').getElementsByTagName('img');
                        //console.log(image)
                        if (image[0].naturalWidth != parseInt(_this.currentAdSize[0]['width']) || image[0].naturalHeight != parseInt(_this.currentAdSize[0]['height'])) {
                            sweetalert2_1.default.fire({
                                title: "Service Groupe d'annonce!",
                                text: 'Image invalide',
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                if (result.value) {
                                }
                                else {
                                }
                            });
                        }
                        else {
                            _this.img_view_create_style['width'] = _this.selectedWidth + 'px';
                            _this.img_view_create_style['height'] = _this.selectedHeight + 'px';
                            $('#button_modal_modified').trigger('click');
                            $('#ad_image_modified').attr("src", $('.dz-image').find('img').attr("src"));
                            $("#modified_name").text($("#" + _this.currentIdInputName).val());
                        }
                    }
                }
                else {
                }
            });
        }
    };
    AnnoncesComponent.prototype.saveAdOnFirebase = function () {
        var _this = this;
        this.isRoller = true;
        this.getWebsites(this.currentIdInputDisplay).then(function (res) {
            //console.log(res)
            if (res != 'error') {
                var size = [{ 'width': _this.selectedWidth, 'height': _this.selectedHeight }];
                var storage = firebase.app().storage("gs://comparez.appspot.com/");
                var storageRef = storage.ref();
                var imageRefStorage = _this.uid + "/" + _this.ad_name + new Date().getTime().toString() + ".png";
                var imagesRef = storageRef.child(imageRefStorage);
                var metadata = {
                    contentType: 'image/png',
                };
                if (!fabric.Canvas.supports('toDataURL')) {
                    alert('This browser doesn\'t provide means to serialize canvas to an image');
                }
                else {
                    var image_url = "";
                    var self = _this;
                    //this.ad_name = $("#"+this.currentIdInputName).val()
                    var image_name = _this.ad_name + new Date().getTime().toString();
                    if (_this.is_upload_way === true) {
                        imagesRef.putString($("#ad_image").attr('src').replace('data:image/png;base64,', ''), 'base64', metadata).then(function (snapshot) {
                            //console.log('ok')
                            storage.ref().child(imageRefStorage).getDownloadURL().then(function (url) {
                                var xhr = new XMLHttpRequest();
                                xhr.responseType = 'blob';
                                xhr.onload = function (event) {
                                    var blob = xhr.response;
                                };
                                xhr.open('GET', url);
                                xhr.send();
                                var image_content = "";
                                //console.log(self.FINAL_ARRAY_TO_SEND)
                                self.adsService.saveAdOnFirebase(self.ad_group_id, self.ad_name, self.uid, url, image_content, self.FINAL_ARRAY_TO_SEND, size, self.ad_type).then(function (res) {
                                    //console.log('success')
                                    //console.log(res)
                                    self.isRoller = false;
                                    $;
                                });
                            });
                        });
                    }
                    else {
                        imagesRef.putString(_this.canvas.toDataURL('png').replace('data:image/png;base64,', ''), 'base64', metadata).then(function (snapshot) {
                            //console.log('ok')
                            storage.ref().child(imageRefStorage).getDownloadURL().then(function (url) {
                                var xhr = new XMLHttpRequest();
                                xhr.responseType = 'blob';
                                xhr.onload = function (event) {
                                    var blob = xhr.response;
                                };
                                xhr.open('GET', url);
                                xhr.send();
                                var image_content = JSON.stringify(self.canvas);
                                //console.log(self.FINAL_ARRAY_TO_SEND)
                                self.adsService.saveAdOnFirebase(self.ad_group_id, self.ad_name, self.uid, url, image_content, self.FINAL_ARRAY_TO_SEND, size, self.ad_type).then(function (res) {
                                    //console.log('success')
                                    //console.log(res)
                                    self.isRoller = false;
                                });
                            });
                        });
                    }
                }
            }
        });
    };
    AnnoncesComponent.prototype.defineBudgetFromAccount = function () {
        var _this = this;
        var montant = parseInt($("#montant").val());
        var newAccountValue = this.accountValue - montant;
        if (montant > this.accountValue || montant < 10000) {
            $('#error_recharge').show();
        }
        else if (montant == null) {
            $('#error_recharge').show();
        }
        else {
            this.isRoller = true;
            this.isPlacementBudgetFromAccount = false;
            this.montant = montant;
            this.http.post(SERVER_URL + '/setBudgetFromAccount', {
                'budgetId': this.budgetId,
                'amount': this.budget_to_place,
                'dure': this.dure_campagne,
            })
                .subscribe(function (res) {
                //console.log(res)
                _this.notesService.updateNote(_this.idC, { budget: _this.budget_to_place, dailyBudget: res[0]['dailyBudget'] }).then(function () {
                    _this.auth.updateUser(_this.uid, { account_value: newAccountValue }).then(function (res) {
                        sweetalert2_1.default.fire({
                            title: 'Service Campagne!',
                            text: 'Budget mis à jour.',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok'
                        }).then(function (result) {
                            if (result.value) {
                                _this.isRoller = false;
                            }
                            else {
                                _this.isRoller = false;
                            }
                        });
                    });
                });
            }, function (err) {
                sweetalert2_1.default.fire({
                    title: 'Service Campagne!',
                    text: 'Erreur.',
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then(function (result) {
                    if (result.value) { }
                });
            });
        }
    };
    AnnoncesComponent.prototype.defineAmountAccountBeforeBudget = function () {
        $('#button_modal_define_budget').trigger('click');
        var self = this;
        this.montant = $("#montant").val();
        if (this.montant < 20000) {
            $('#error_recharge').show();
        }
        else {
            $('#closeModalRecharge').trigger('click');
            var self = this;
            this.isCreating = true;
            setTimeout(function () {
                var btn = document.getElementById("budgetSet");
                var selector = pQuery(btn);
                (new PayExpresse({
                    item_id: 1,
                })).withOption({
                    requestTokenUrl: SERVER_URL + '/rechargeAmountBeforeBudgetFromAd/' + self.ad_group_name + "/" + self.idC + "/" + self.idA + "/" + self.ad_group_id + "/" + self.campagne_id + "/" + self.montant + "/" + self.id_ad_firebase,
                    method: 'POST',
                    headers: {
                        "Accept": "application/json"
                    },
                    //prensentationMode   :   PayExpresse.OPEN_IN_POPUP,
                    prensentationMode: PayExpresse.OPEN_IN_POPUP,
                    didPopupClosed: function (is_completed, success_url, cancel_url) {
                        self.isCreating = false;
                        if (is_completed === true) {
                            alert(success_url);
                            //window.location.href = success_url; 
                        }
                        else {
                            self.isCreating = false;
                            //window.location.href = cancel_url
                        }
                    },
                    willGetToken: function () {
                        //console.log("Je me prepare a obtenir un token");
                        selector.prop('disabled', true);
                        //var ads = []
                    },
                    didGetToken: function (token, redirectUrl) {
                        //console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                        selector.prop('disabled', false);
                    },
                    didReceiveError: function (error) {
                        alert('erreur inconnu');
                        selector.prop('disabled', false);
                    },
                    didReceiveNonSuccessResponse: function (jsonResponse) {
                        //console.log('non success response ', jsonResponse);
                        alert(jsonResponse.errors);
                        selector.prop('disabled', false);
                    }
                }).send({
                    pageBackgroundRadianStart: '#0178bc',
                    pageBackgroundRadianEnd: '#00bdda',
                    pageTextPrimaryColor: '#333',
                    paymentFormBackground: '#fff',
                    navControlNextBackgroundRadianStart: '#608d93',
                    navControlNextBackgroundRadianEnd: '#28314e',
                    navControlCancelBackgroundRadianStar: '#28314e',
                    navControlCancelBackgroundRadianEnd: '#608d93',
                    navControlTextColor: '#fff',
                    paymentListItemTextColor: '#555',
                    paymentListItemSelectedBackground: '#eee',
                    commingIconBackgroundRadianStart: '#0178bc',
                    commingIconBackgroundRadianEnd: '#00bdda',
                    commingIconTextColor: '#fff',
                    formInputBackgroundColor: '#eff1f2',
                    formInputBorderTopColor: '#e3e7eb',
                    formInputBorderLeftColor: '#7c7c7c',
                    totalIconBackgroundRadianStart: '#0178bc',
                    totalIconBackgroundRadianEnd: '#00bdda',
                    formLabelTextColor: '#292b2c',
                    alertDialogTextColor: '#333',
                    alertDialogConfirmButtonBackgroundColor: '#0178bc',
                    alertDialogConfirmButtonTextColor: '#fff',
                });
            }, 500);
        }
    };
    AnnoncesComponent.prototype.updateAdOnFirebase = function () {
        var _this = this;
        if (this.currentAdStatus == "") {
            this.isRoller = true;
            var displayUrl = [];
            var finalUrls = [];
            var finalMobileUrls = [];
            var finalAppUrls = [];
            var name = $('#' + this.currentIdInputName).val();
            var image = $('#ad_image_modified').attr("src");
            var storage = firebase.app().storage("gs://comparez.appspot.com/");
            var storageRef = storage.ref();
            //console.log(this.uid)
            //console.log(this.ad_name)
            var imageRefStorage = this.uid + "/" + this.ad_name + new Date().getTime().toString() + ".png";
            //console.log(imageRefStorage)
            var imagesRef = storageRef.child(imageRefStorage);
            var metadata = {
                contentType: 'image/png',
            };
            var self = this;
            //console.log(this.FINAL_ARRAY_TO_SEND[0]['content'])
            displayUrl.push(this.FINAL_ARRAY_TO_SEND[0]['content']);
            /*  for (let i = 0; i <this.FINAL_ARRAY_TO_SEND.length; i++){
               if (this.FINAL_ARRAY_TO_SEND[i] == 'finalUrls') {
                 //console.log(this.FINAL_ARRAY_TO_SEND[i]['content'])
                 
                 displayUrl.push(this.FINAL_ARRAY_TO_SEND[i]['content'])
                 //console.log(displayUrl)
               }
             } */
            //ad_image_modified
            if (this.currentAdType === 'UPLOAD') {
                //console.log('upload')
                //console.log(image)
                if (image.startsWith("https") == false) {
                    imagesRef.putString(image.replace('data:image/png;base64,', ''), 'base64', metadata).then(function (snapshot) {
                        //console.log('ok')
                        storage.ref().child(imageRefStorage).getDownloadURL().then(function (url) {
                            var xhr = new XMLHttpRequest();
                            xhr.responseType = 'blob';
                            xhr.onload = function (event) {
                                var blob = xhr.response;
                            };
                            xhr.open('GET', url);
                            xhr.send();
                            self.currentImageUrl = url;
                            var image_content = JSON.stringify(self.canvas);
                            self.adsService.updateAd(self.id_ad_firebase, {
                                ad_name: name,
                                url_image: url,
                                displayUrl: displayUrl[0],
                                finalUrls: displayUrl[0],
                                finalMobileUrls: finalMobileUrls,
                                finalAppUrls: finalAppUrls,
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            }).then(function (res) {
                                //console.log('success')
                                //console.log(res)
                                sweetalert2_1.default.fire({
                                    title: 'Modification du visuel',
                                    text: 'Visuel modifié avec succès',
                                    type: 'success',
                                    showCancelButton: false,
                                    confirmButtonColor: '#26a69a',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Ok'
                                }).then(function (result) {
                                    if (result.value) {
                                        self.isRoller = false;
                                        document.getElementById("closeModalViewModified").click();
                                    }
                                });
                            }).catch(function (err) {
                                sweetalert2_1.default.fire({
                                    title: 'Modification du visuel',
                                    text: 'Erreur Service !',
                                    type: 'error',
                                    showCancelButton: false,
                                    confirmButtonColor: '#26a69a',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Ok'
                                }).then(function (result) {
                                    if (result.value) { }
                                });
                            });
                        });
                    });
                }
                else {
                    self.adsService.updateAd(self.id_ad_firebase, {
                        ad_name: name,
                        url_image: image,
                        displayUrl: displayUrl[0],
                        finalUrls: displayUrl[0],
                        finalMobileUrls: finalMobileUrls,
                        finalAppUrls: finalAppUrls,
                        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    }).then(function (res) {
                        //console.log('success')
                        //console.log(res)
                        sweetalert2_1.default.fire({
                            title: 'Modification du visuel',
                            text: 'Visuel modifié avec succès',
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok'
                        }).then(function (result) {
                            if (result.value) {
                                self.isRoller = false;
                                document.getElementById("closeModalViewModified").click();
                            }
                        });
                    }).catch(function (err) {
                        sweetalert2_1.default.fire({
                            title: 'Modification du visuel',
                            text: 'Erreur Service !',
                            type: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok'
                        }).then(function (result) {
                            if (result.value) { }
                        });
                    });
                }
            }
            else {
                if (!fabric.Canvas.supports('toDataURL')) {
                    alert('This browser doesn\'t provide means to serialize canvas to an image');
                }
                else {
                    //$('#ad_image').attr("src", this.canvas.toDataURL('png'))
                    ////console.log(this.canvas.toDataURL('png'))
                    this.canvas.toDataURL('png').replace('data:image/png;base64,', '');
                    ////console.log(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''))
                    imagesRef.putString(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''), 'base64', metadata).then(function (snapshot) {
                        //console.log('ok')
                        storage.ref().child(imageRefStorage).getDownloadURL().then(function (url) {
                            var xhr = new XMLHttpRequest();
                            xhr.responseType = 'blob';
                            xhr.onload = function (event) {
                                var blob = xhr.response;
                            };
                            xhr.open('GET', url);
                            xhr.send();
                            self.currentImageUrl = url;
                            var image_content = JSON.stringify(self.canvas);
                            self.adsService.updateAd(self.id_ad_firebase, {
                                ad_name: name,
                                url_image: url,
                                image_content: image_content,
                                displayUrl: displayUrl[0],
                                finalUrls: displayUrl[0],
                                finalMobileUrls: finalMobileUrls,
                                finalAppUrls: finalAppUrls,
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            }).then(function (res) {
                                //console.log('success')
                                //console.log(res)
                                sweetalert2_1.default.fire({
                                    title: 'Modification du visuel',
                                    text: 'Visuel modifié avec succès',
                                    type: 'success',
                                    showCancelButton: false,
                                    confirmButtonColor: '#26a69a',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Ok'
                                }).then(function (result) {
                                    if (result.value) {
                                        self.isRoller = false;
                                        document.getElementById("closeModalViewModified").click();
                                    }
                                });
                            }).catch(function (err) {
                                sweetalert2_1.default.fire({
                                    title: 'Modification du visuel',
                                    text: 'Erreur Service !',
                                    type: 'error',
                                    showCancelButton: false,
                                    confirmButtonColor: '#26a69a',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Ok'
                                }).then(function (result) {
                                    if (result.value) { }
                                });
                            });
                        });
                    });
                }
            }
        }
        else {
            var name = $('#ad_name_modify').val();
            var data_to_send = [];
            this.getModifiedWebsites().then(function (res) {
                //console.log(res)
                if (res != "error") {
                    //console.log(this.compareObjectsUrls(this.tabUpdatedCurrentFinalUrls, this.finalUrls))
                    //console.log(this.tabUpdatedCurrentFinalUrls)
                    //console.log(this.finalUrls)
                    //var previous_content = JSON.parse(this.image_content)
                    //var update_content = JSON.parse(this.new_image_content)
                    //var comparaison_content = this.compareObjects(update_content, previous_content)
                    var comparaison_url = _this.compareObjectsUrls(_this.newfinalUrls, _this.finalUrls);
                    if (comparaison_url === true && name === _this.ad_name) {
                        sweetalert2_1.default.fire({
                            title: 'Modification du visuel',
                            text: "Aucun changement n'a été détecté",
                            type: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok'
                        }).then(function (result) {
                            if (result.value) {
                            }
                        });
                    }
                    else if (comparaison_url === false && name === _this.ad_name) {
                        sweetalert2_1.default.fire({
                            title: 'Modification du visuel',
                            text: "Seul les urls de destination seront modifiées",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok, Modifier'
                        }).then(function (result) {
                            if (result.value) {
                                _this.isRoller = true;
                                data_to_send.push({
                                    "field": "finalUrls",
                                    "fieldFirebase": "finalUrls",
                                    "content": _this.newfinalUrls,
                                }, {
                                    "field": "name",
                                    "fieldFirebase": "ad_name",
                                    "content": _this.currentAdName
                                });
                                _this.removeAdBeforeUpdate(_this.id_ad_firebase, _this.ad_group_id, _this.ad_id).then(function (res) {
                                    if (res != "error") {
                                        _this.adsService.addAd(_this.id_ad_firebase, _this.ad_group_id, _this.currentAdName, _this.currentImageUrl, _this.tabUpdatedCurrentFinalUrls, [], [], _this.currentAdSize).then(function (res) {
                                            if (res != "error") {
                                                sweetalert2_1.default.fire({
                                                    title: 'Modification du visuel',
                                                    text: "Visuel modifié avec succès",
                                                    type: 'success',
                                                    showCancelButton: false,
                                                    confirmButtonColor: '#26a69a',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Ok'
                                                }).then(function (result) {
                                                    if (result.value) {
                                                        _this.isRoller = false;
                                                    }
                                                    else {
                                                        _this.isRoller = false;
                                                    }
                                                });
                                            }
                                            else {
                                                sweetalert2_1.default.fire({
                                                    title: 'Modification du visuel',
                                                    text: "Erreur service",
                                                    type: 'error',
                                                    showCancelButton: false,
                                                    confirmButtonColor: '#26a69a',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'réessayer'
                                                }).then(function (result) {
                                                    if (result.value) {
                                                        _this.isRoller = false;
                                                    }
                                                    else {
                                                        _this.isRoller = false;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                _this.isRoller = false;
                            }
                        });
                    }
                    else if (comparaison_url === true && name !== _this.ad_name) {
                        sweetalert2_1.default.fire({
                            title: 'Modification du visuel',
                            text: "Seul le nom du visuel sera modifié",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok, Modifier'
                        }).then(function (result) {
                            if (result.value) {
                                _this.isRoller = true;
                                data_to_send.push({
                                    "field": "name",
                                    "fieldFirebase": "ad_name",
                                    "content": name
                                }, {
                                    "field": "finalUrls",
                                    "fieldFirebase": "finalUrls",
                                    "content": _this.finalUrls
                                });
                                _this.removeAdBeforeUpdate(_this.id_ad_firebase, _this.ad_group_id, _this.ad_id).then(function (res) {
                                    if (res != "error") {
                                        _this.adsService.addAd(_this.id_ad_firebase, _this.ad_group_id, name, _this.currentImageUrl, _this.finalUrls, [], [], _this.currentAdSize).then(function (res) {
                                            if (res != "error") {
                                                sweetalert2_1.default.fire({
                                                    title: 'Modification du visuel',
                                                    text: "Visuel modifié avec succès",
                                                    type: 'success',
                                                    showCancelButton: false,
                                                    confirmButtonColor: '#26a69a',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Ok'
                                                }).then(function (result) {
                                                    if (result.value) {
                                                        _this.isRoller = false;
                                                    }
                                                    else {
                                                        _this.isRoller = false;
                                                    }
                                                });
                                            }
                                            else {
                                                sweetalert2_1.default.fire({
                                                    title: 'Modification du visuel',
                                                    text: "Erreur service",
                                                    type: 'error',
                                                    showCancelButton: false,
                                                    confirmButtonColor: '#26a69a',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'réessayer'
                                                }).then(function (result) {
                                                    if (result.value) {
                                                        _this.isRoller = false;
                                                    }
                                                    else {
                                                        _this.isRoller = false;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                _this.isRoller = false;
                            }
                        });
                    }
                    else {
                        sweetalert2_1.default.fire({
                            title: 'Modification du visuel',
                            text: "Le nom ainsi que les urls de redirections du visuel seront modifés !",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok, Modidifier'
                        }).then(function (result) {
                            if (result.value) {
                                _this.isRoller = true;
                                data_to_send.push({
                                    "field": "name",
                                    "fieldFirebase": "ad_name",
                                    "content": name
                                }, {
                                    "field": "finalUrls",
                                    "fieldFirebase": "finalUrls",
                                    "content": _this.newfinalUrls
                                });
                                _this.removeAdBeforeUpdate(_this.id_ad_firebase, _this.ad_group_id, _this.ad_id).then(function (res) {
                                    if (res != "error") {
                                        _this.adsService.addAd(_this.id_ad_firebase, _this.ad_group_id, name, _this.currentImageUrl, _this.tabUpdatedCurrentFinalUrls, [], [], _this.currentAdSize).then(function (res) {
                                            if (res != "error") {
                                                sweetalert2_1.default.fire({
                                                    title: 'Modification du visuel',
                                                    text: "Visuel modifié avec succès",
                                                    type: 'success',
                                                    showCancelButton: false,
                                                    confirmButtonColor: '#26a69a',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Ok'
                                                }).then(function (result) {
                                                    if (result.value) {
                                                        _this.isRoller = false;
                                                    }
                                                    else {
                                                        _this.isRoller = false;
                                                    }
                                                });
                                            }
                                            else {
                                                sweetalert2_1.default.fire({
                                                    title: 'Modification du visuel',
                                                    text: "Erreur service",
                                                    type: 'error',
                                                    showCancelButton: false,
                                                    confirmButtonColor: '#26a69a',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'réessayer'
                                                }).then(function (result) {
                                                    if (result.value) {
                                                        _this.isRoller = false;
                                                    }
                                                    else {
                                                        _this.isRoller = false;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                            else {
                                _this.isRoller = false;
                            }
                        });
                    }
                }
            });
        }
    };
    AnnoncesComponent.prototype.uploadFileOnFirebase = function (name) {
        var _this = this;
        return new Promise(function (resolve) {
            var storage = firebase.app().storage("gs://comparez.appspot.com/");
            var storageRef = storage.ref();
            var imageRefStorage = _this.uid + "/" + name + new Date().getTime().toString() + ".png";
            var imagesRef = storageRef.child(imageRefStorage);
            var metadata = {
                contentType: 'image/png',
            };
            if (!fabric.Canvas.supports('toDataURL')) {
                alert('This browser doesn\'t provide means to serialize canvas to an image');
                resolve('error');
            }
            else {
                var image_url = "";
                var self = _this;
                //this.ad_name = $("#"+this.currentIdInputName).val()
                var image_name = _this.ad_name + new Date().getTime().toString();
                //$('#ad_image').attr("src", this.canvas.toDataURL('png'))
                ////console.log(this.canvas.toDataURL('png'))
                _this.canvas.toDataURL('png').replace('data:image/png;base64,', '');
                ////console.log(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''))
                imagesRef.putString(_this.canvas.toDataURL('png').replace('data:image/png;base64,', ''), 'base64', metadata).then(function (snapshot) {
                    //console.log('ok')
                    storage.ref().child(imageRefStorage).getDownloadURL().then(function (url) {
                        var xhr = new XMLHttpRequest();
                        xhr.responseType = 'blob';
                        xhr.onload = function (event) {
                            var blob = xhr.response;
                        };
                        xhr.open('GET', url);
                        xhr.send();
                        self.currentImageUrl = url;
                        resolve('ok');
                    });
                });
            }
        });
    };
    AnnoncesComponent.prototype.compareObjects = function (value, other) {
        // Get the value type
        var type = Object.prototype.toString.call(value);
        // If the two objects are not the same type, return false
        if (type !== Object.prototype.toString.call(other))
            return false;
        // If items are not an object or array, return false
        if (['[object Array]', '[object Object]'].indexOf(type) < 0)
            return false;
        // Compare the length of the length of the two items
        var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
        var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
        if (value['objects'].length !== other['objects'].length)
            return false;
        // Compare two items
        var isEqual = function (value, other) {
            // ...
            // Compare properties
            if (type === '[object Array]') {
                for (var i = 0; i < valueLen; i++) {
                    if (compare(value[i], other[i]) === false)
                        return false;
                }
            }
            else {
                for (var key in value) {
                    if (value.hasOwnProperty(key)) {
                        if (compare(value[key], other[key]) === false)
                            return false;
                    }
                }
            }
            // If nothing failed, return true
            return true;
        };
        var compare = function (value, other) {
            // Get the object type
            var itemType = Object.prototype.toString.call(value);
            // If an object or array, compare recursively
            if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
                if (!isEqual(value, other))
                    return false;
            }
            // Otherwise, do a simple comparison
            else {
                // If the two items are not the same type, return false
                if (itemType !== Object.prototype.toString.call(other))
                    return false;
                // Else if it's a function, convert to a string and compare
                // Otherwise, just compare
                if (itemType === '[object Function]') {
                    if (value.toString() !== other.toString())
                        return false;
                }
                else {
                    if (value !== other)
                        return false;
                }
            }
        };
        // Compare properties
        if (type === '[object Array]') {
            for (var i = 0; i < valueLen; i++) {
                if (compare(value[i], other[i]) === false)
                    return false;
            }
        }
        else {
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    if (compare(value[key], other[key]) === false)
                        return false;
                }
            }
        }
        // If nothing failed, return true
        return true;
    };
    ;
    AnnoncesComponent.prototype.compareObjectsUrls = function (value, other) {
        // Get the value type
        var type = Object.prototype.toString.call(value);
        // If the two objects are not the same type, return false
        if (type !== Object.prototype.toString.call(other))
            return false;
        // If items are not an object or array, return false
        if (['[object Array]', '[object Object]'].indexOf(type) < 0)
            return false;
        // Compare the length of the length of the two items
        var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
        var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
        if (value.length !== other.length)
            return false;
        // Compare two items
        var isEqual = function (value, other) {
            // ...
            // Compare properties
            if (type === '[object Array]') {
                for (var i = 0; i < valueLen; i++) {
                    if (compare(value[i], other[i]) === false)
                        return false;
                }
            }
            else {
                for (var key in value) {
                    if (value.hasOwnProperty(key)) {
                        if (compare(value[key], other[key]) === false)
                            return false;
                    }
                }
            }
            // If nothing failed, return true
            return true;
        };
        var compare = function (value, other) {
            // Get the object type
            var itemType = Object.prototype.toString.call(value);
            // If an object or array, compare recursively
            if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
                if (!isEqual(value, other))
                    return false;
            }
            // Otherwise, do a simple comparison
            else {
                // If the two items are not the same type, return false
                if (itemType !== Object.prototype.toString.call(other))
                    return false;
                // Else if it's a function, convert to a string and compare
                // Otherwise, just compare
                if (itemType === '[object Function]') {
                    if (value.toString() !== other.toString())
                        return false;
                }
                else {
                    if (value !== other)
                        return false;
                }
            }
        };
        // Compare properties
        if (type === '[object Array]') {
            for (var i = 0; i < valueLen; i++) {
                if (compare(value[i], other[i]) === false)
                    return false;
            }
        }
        else {
            for (var key in value) {
                if (value.hasOwnProperty(key)) {
                    if (compare(value[key], other[key]) === false)
                        return false;
                }
            }
        }
        // If nothing failed, return true
        return true;
    };
    ;
    /*  saveImage() {
       this.saveCanvasToJSON()
       const image_content = JSON.stringify(this.canvas);
      
       this.getWebsites().then(res => {
         //console.log(res)
         if (res != 'error') {
            var storage = firebase.app().storage("gs://comparez.appspot.com/");
       var storageRef = storage.ref();
       this.ad_name=$('#'+this.idOfAdName).val()
       var imageRefStorage = this.uid + "/" + this.ad_name + new Date().getTime().toString()+ ".png"
       var imagesRef = storageRef.child(imageRefStorage);
       var metadata = {
     contentType: 'image/png',
   };
       
       if (!fabric.Canvas.supports('toDataURL')) {
         alert('This browser doesn\'t provide means to serialize canvas to an image');
       } else {
       
         this.ad_name = $("#"+this.idOfAdName).val()
         var image_name = this.ad_name +  new Date().getTime().toString()
         $('#ad_image').attr("src", this.canvas.toDataURL('png'))
         //console.log(this.canvas.toDataURL('png'))
         this.canvas.toDataURL('png').replace('data:image/png;base64,', '')
         //console.log(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''))
        imagesRef.putString(this.canvas.toDataURL('png').replace('data:image/png;base64,', ''), 'base64', metadata).then(function(snapshot) {
            
          //console.log('Uploaded a base64 string!');
          
        });
         
         this.adsService.addAd(this.ad_group_id, this.ad_name, this.uid, imageRefStorage, image_content, this.FINAL_ARRAY_TO_SEND).then(res => {
           //console.log('success')
           //console.log(res)
         })
          
        
        
       
       }
           
         }
       })
       
       
       
   
     } */
    AnnoncesComponent.prototype.buildAd = function () {
        var _this = this;
        var self = this;
        if (this.budget === 0) {
            sweetalert2_1.default.fire({
                title: "Service Visuel",
                text: "Le budget de votre campagne est insuffisant définissez le pour comment à diffuser",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Définir mon budget '
            }).then(function (result) {
                if (result.value) {
                    window.location.replace(REDIRECT_URL + "/" + 0 + "/" + self.idC);
                    $("#" + _this.idC).trigger("click");
                }
            });
        }
        else {
            this.isRoller = true;
            this.adsService.addAd(this.id_ad_firebase, this.ad_group_id, this.ad_name, this.image_url, this.finalUrls, this.finalAppUrls, this.finalMobileUrls, this.currentAdSize).then(function (res) {
                //console.log('success')
                //console.log(res)
                if (res != "error") {
                    _this.isRoller = false;
                }
                else {
                    _this.isRoller = false;
                }
            });
        }
        /*
           */
    };
    AnnoncesComponent.prototype.setHttp = function (link) {
        if (link.search(/^http[s]?\:\/\//) == -1) {
            link = 'https://' + link;
        }
        return link;
    };
    AnnoncesComponent.prototype.checkIfIsEmptyFinalUrls = function (item_id) {
        var _this = this;
        return new Promise(function (resolve) {
            var urls_destination = [];
            var urls = $('#' + item_id).val();
            if (urls.toString() != '') {
                /*  if (urls.includes(',')) {
           var tab = urls.toString().split(',')
           tab.pop()
         
           for (let i = 0; i < tab.length; i++) {
             
             //console.log(`urls ${tab}`)
             //console.log(`actuelle url ${tab[i]}`)
          
             if (this.validURL(tab[i]) == true) {
               //console.log(tab[i] + ' est valide')
               var url = this.setHttp(tab[i])
               urls_destination.push(url)
               this.FINAL_ARRAY_TO_SEND.push({
               "lib": "finalUrls",
               "content": urls_destination
               })
                resolve('ok')
             } else {
               this.url_errors.push({
                 "url": tab[i],
                 "text": "est une url invalide"
               })
               //console.log(tab[i] + " est invalide")
               resolve('error')
             }
         }
         } else {
       
         } */
                var check = _this.validURL(urls);
                if (check === true) {
                    //console.log(urls + " valide")
                    var url = _this.setHttp(urls);
                    urls_destination.push(url);
                    _this.FINAL_ARRAY_TO_SEND.push({
                        "lib": "finalUrls",
                        "content": urls_destination
                    });
                    resolve('ok');
                }
                else {
                    _this.url_errors.push({
                        "url": urls,
                        "text": "est une url invalide"
                    });
                    //console.log(urls + ' invalide, vérifier les urls renseignées')
                    resolve('error');
                }
            }
            else {
                alert(urls);
                _this.url_errors.push({
                    "url": "",
                    "text": "Url de destination ne peut être vide"
                });
            }
        });
    };
    AnnoncesComponent.prototype.checkIfIsEmptyModifiedFinalUrls = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var urls_destination = [];
            var urls = $('#finalUrlsmodify').val();
            alert(urls);
            if (urls !== '') {
                var check = _this.validURL(urls);
                if (check === true) {
                    //console.log(urls + " valide")
                    var url = _this.setHttp(urls);
                    urls_destination.push(url);
                    _this.newfinalUrls = urls_destination;
                    _this.tabUpdatedCurrentFinalUrls.push(url);
                    _this.FINAL_ARRAY_TO_SEND.push({
                        "lib": "finalUrls",
                        "content": urls_destination
                    });
                    resolve('ok');
                }
                else {
                    _this.url_errors.push({
                        "url": urls,
                        "text": "est une url invalide"
                    });
                    //console.log(urls + ' invalide, vérifier les urls renseignées')
                    resolve('error');
                }
            }
            else {
                _this.url_errors.push({
                    "url": "",
                    "text": "Url de destination ne peut être vide"
                });
            }
        });
    };
    AnnoncesComponent.prototype.getWebsites = function (item_id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.FINAL_ARRAY_TO_SEND = [];
            if ($('#' + _this.currentIdInputName).val() == "") {
                alert("nom du visuel ne peut être vide");
            }
            else {
                _this.ad_name = $('#' + _this.currentIdInputName).val();
                var mobile_apps = _this.apps;
                _this.checkIfIsEmptyFinalUrls(item_id).then(function (res) {
                    if (res != 'error') {
                        resolve(res);
                    }
                    else {
                        resolve('error');
                    }
                });
            }
        });
    };
    AnnoncesComponent.prototype.getModifiedWebsites = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.FINAL_ARRAY_TO_SEND = [];
            var mobile_apps = _this.apps;
            _this.checkIfIsEmptyModifiedFinalUrls().then(function (res) {
                if (res != 'error') {
                    resolve(res);
                }
                else {
                    resolve('error');
                }
            });
        });
    };
    /*   getWebsites(): Promise<any> {
      return new Promise(resolve => {
        
        this.FINAL_ARRAY_TO_SEND = []
        var nationals = this.nationals_websites
        var internationals = this.internationals_websites
        var ad_sites = this.ads_websites
        var mobile_apps = this.apps
        this.checkIfIsEmptyNationals(nationals).then(res => {
          if (res != 'error') {
            this.checkIfIsEmptyFinalUrls().then(res => {
              if (res != 'error') {
                this.checkIfIsEmptyInternationals(internationals)
                this.checkIfIsEmptyAdsWebsites(ad_sites)
                this.checkIfIsEmptyMobileApps(mobile_apps)
                resolve(res)
              }else{
                
                resolve('error')
                
              }
              })
             
           
          } else {
            this.nationals_errors = "Site national obligatoire !"
            resolve('error')
          }
        })
      })
    
      
     
    } */
    AnnoncesComponent.prototype.onSubmitCustomer = function () {
        alert('Your information has been submitted successfully. :-)\n\n' + JSON.stringify(this.model));
    };
    AnnoncesComponent.prototype.handleKeyPress = function (key, event) {
        switch (key) {
            case 37:
                this.moveSelectedObject(this.Direction.LEFT, event.shiftKey ? this.DirectionSteps.SHIFT : this.DirectionSteps.REGULAR);
                event.preventDefault();
                break;
            case 38:
                this.moveSelectedObject(this.Direction.UP, event.shiftKey ? this.DirectionSteps.SHIFT : this.DirectionSteps.REGULAR);
                event.preventDefault();
                break;
            case 39:
                this.moveSelectedObject(this.Direction.RIGHT, event.shiftKey ? this.DirectionSteps.SHIFT : this.DirectionSteps.REGULAR);
                event.preventDefault();
                break;
            case 40:
                this.moveSelectedObject(this.Direction.DOWN, event.shiftKey ? this.DirectionSteps.SHIFT : this.DirectionSteps.REGULAR);
                event.preventDefault();
                break;
            case 46:
                this.removeSelected();
                event.preventDefault();
                break;
            case 65:
                if (event.ctrlKey) {
                    this.selectAllObjects();
                }
                event.preventDefault();
                break;
        }
    };
    /**
     * Select all objects/layers in canvas
     *
     */
    AnnoncesComponent.prototype.selectAllObjects = function () {
        var objs = this.canvas.getObjects().map(function (o) {
            return o.set('active', true);
        });
        var group = new fabric.Group(objs, {
            originX: 'center',
            originY: 'center'
        });
        this.canvas._activeObject = null;
        this.canvas.setActiveGroup(group.setCoords()).renderAll();
    };
    /**
     * Move the current selected object
     *
     * @param direction
     * @param value
     */
    AnnoncesComponent.prototype.moveSelectedObject = function (direction, value) {
        var activeGroup = this.canvas.getActiveGroup();
        var activeObject = this.canvas.getActiveObject();
        if (activeObject) {
            switch (direction) {
                case this.Direction.LEFT:
                    activeObject.setLeft(activeObject.getLeft() - value);
                    break;
                case this.Direction.UP:
                    activeObject.setTop(activeObject.getTop() - value);
                    break;
                case this.Direction.RIGHT:
                    activeObject.setLeft(activeObject.getLeft() + value);
                    break;
                case this.Direction.DOWN:
                    activeObject.setTop(activeObject.getTop() + value);
                    break;
            }
            activeObject.setCoords();
            this.canvas.renderAll();
        }
        else if (activeGroup) {
            switch (direction) {
                case this.Direction.LEFT:
                    activeGroup.setLeft(activeGroup.getLeft() - value);
                    break;
                case this.Direction.UP:
                    activeGroup.setTop(activeGroup.getTop() - value);
                    break;
                case this.Direction.RIGHT:
                    activeGroup.setLeft(activeGroup.getLeft() + value);
                    break;
                case this.Direction.DOWN:
                    activeGroup.setTop(activeGroup.getTop() + value);
                    break;
            }
            activeGroup.setCoords();
            this.canvas.renderAll();
        }
    };
    /**
     * Recalculate layer list for layer panel
     *
     */
    AnnoncesComponent.prototype.updateLayers = function () {
        this.layers = this.canvas.getObjects();
    };
    /**
     * Set layer as active one
     *
     * @param layer
     */
    AnnoncesComponent.prototype.selectLayer = function (layer) {
        this.canvas.setActiveObject(layer);
    };
    /**
     * Show/Hide layer
     *
     * @param layer
     */
    AnnoncesComponent.prototype.toggleLayer = function (layer) {
        layer.visible = !layer.visible;
    };
    /**
     * Locks/Unlocks layer
     *
     */
    AnnoncesComponent.prototype.lockLayer = function () {
        var layer = this.canvas.getActiveObject();
        layer.evented = !layer.evented;
        layer.selectable = !layer.selectable;
    };
    /**
     * Updates layer index
     *
     */
    AnnoncesComponent.prototype.updateLayerSort = function () {
        var _this = this;
        this.layers.forEach(function (layer, ind) {
            _this.canvas.moveTo(layer, ind);
        });
    };
    /*------------------------Block elements------------------------*/
    /**
     * Size - set canvas dimensions
     *
     * @param event
     */
    AnnoncesComponent.prototype.changeSize = function (event) {
        this.canvas.setWidth(this.size.width);
        this.canvas.setHeight(this.size.height);
    };
    AnnoncesComponent.prototype.oppendCurrentEditor = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.currentEditor === true) {
                _this.currentEditor = false;
                _this.iconEditor = "icon-chevron-up";
                _this.text_modify = "annuler la modification";
            }
            else {
                _this.currentEditor = true;
                _this.iconEditor = "icon-chevron-down";
                _this.text_modify = "modifier";
                resolve("ok");
            }
        });
    };
    AnnoncesComponent.prototype.toggleCurrentUploadBlock = function () {
        if (this.currentAdStatus.toString() === '') {
            if ($("#blockUploadModified").css('display') === 'none') {
                $("#blockUploadModified").css({ 'display': 'block' });
                this.isUploadModified = true;
                this.iconEditor = "icon-chevron-up";
                this.text_modify = "Annuler la modification";
                this.currentIdInputName = this.idOfAdNameNotPublishUpload;
                this.currentIdInputDisplay = this.idOfDisplayUrlNotPublishUpload;
            }
            else {
                $("#blockUploadModified").css({ 'display': 'none' });
                this.iconEditor = "icon-chevron-down";
                this.text_modify = "modifier";
                this.currentIdInputName = "";
                this.currentIdInputDisplay = "";
                this.isUploadModified = false;
            }
        }
        else {
            if (this.modifyPublishAd === false) {
                this.modifyPublishAd = true;
                this.iconEditor = "icon-chevron-up";
                this.text_modify = "Annuler la modification";
            }
            else {
                this.modifyPublishAd = true;
                this.iconEditor = "icon-chevron-down";
                this.text_modify = "modifier";
            }
        }
    };
    AnnoncesComponent.prototype.toggleCurrentEditor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                self.isEditor = false;
                if (this.currentEditor == true) {
                    this.currentEditor = false;
                    this.iconEditor = "icon-chevron-down";
                    this.text_modify = "modifier";
                    this.currentIdInputName = "";
                    this.currentIdInputDisplay = "";
                }
                else {
                    this.currentEditor = true;
                    this.iconEditor = "icon-chevron-up";
                    this.text_modify = "annuler la modification";
                    if (this.canva_state == false) {
                        self.isCreating = true;
                        setTimeout(function () {
                            self.handleCanvas(parseInt(self.currentAdSize[0]['width']), parseInt(self.currentAdSize[0]['height']));
                        }, 2000);
                        setTimeout(function () {
                            self.loadCanvasFromJSON();
                            self.isCreating = false;
                        }, 2000);
                        this.currentIdInputName = this.idOfAdNameNotPublishCreatives;
                        this.currentIdInputDisplay = this.idOfDisplayUrlNotPublishCreatives;
                    }
                    else {
                        self.isCreating = true;
                        setTimeout(function () {
                            self.canvas.clear();
                        }, 2000);
                        setTimeout(function () {
                            self.handleCanvas(parseInt(self.currentAdSize[0]['width']), parseInt(self.currentAdSize[0]['height']));
                        }, 2000);
                        setTimeout(function () {
                            self.loadCanvasFromJSON();
                            self.isCreating = false;
                        }, 2000);
                        this.currentIdInputName = this.idOfAdNameNotPublishCreatives;
                        this.currentIdInputDisplay = this.idOfDisplayUrlNotPublishCreatives;
                    }
                    /*  this.isCreating = false */
                    /*  this.addText()
                       this.removeSelected() */
                }
                return [2 /*return*/];
            });
        });
    };
    /*    if (this.currentEditor == true) {
         this.currentEditor = false
         this.iconEditor = "icon-chevron-down"
         
       }else{
         this.currentEditor = true
         this.iconEditor = "icon-chevron-up"
   
         
       
       } */
    /**
     * Size - apply preset to canvas
     *
     * @param event
     */
    AnnoncesComponent.prototype.changeToPreset = function (event) {
        this.size.width = this.selectedSize.width;
        this.size.height = this.selectedSize.height;
        this.changeSize(event);
    };
    /**
     * Text - add text element
     *
     */
    /*  addText(): void {
         const textString = this.textString;
         const text = new fabric.IText(textString, {
             left: 10,
             top: 10,
             fontFamily: 'Arial',
             angle: 0,
             fill: '#000000',
             scaleX: 1,
             scaleY: 1,
             fontWeight: '',
             hasRotatingPoint: true,
             title: textString
         });
         this.extend(text, this.randomId());
         this.canvas.add(text);
         this.selectItemAfterAdded(text);
         this.textString = '';
 
         this.updateLayers();
     } */
    /**
     * Image - Add a dom image to canvas
     *
     * @param event
     */
    AnnoncesComponent.prototype.getImgPolaroid = function (event) {
        var _this = this;
        var el = event.target;
        fabric.Image.fromURL(el.src, function (image) {
            image.set({
                left: 10,
                top: 10,
                angle: 0,
                padding: 10,
                cornersize: 10,
                hasRotatingPoint: true,
                title: el.title,
                lockUniScaling: true
            });
            image.scaleToWidth(150);
            image.scaleToHeight(150);
            _this.extend(image, _this.randomId());
            _this.canvas.add(image);
            _this.selectItemAfterAdded(image);
        });
        this.updateLayers();
    };
    /**
     * Image - Add an external image to canvas
     *
     * @param url
     */
    AnnoncesComponent.prototype.addImageOnCanvas = function (url) {
        var _this = this;
        if (url) {
            fabric.Image.fromURL(url, function (image) {
                image.set({
                    left: 10,
                    top: 10,
                    angle: 0,
                    padding: 10,
                    cornersize: 10,
                    hasRotatingPoint: true,
                    title: _this.urlName
                });
                image.scaleToWidth(Math.round(_this.size.width / 2));
                _this.extend(image, _this.randomId());
                _this.canvas.add(image);
                _this.selectItemAfterAdded(image);
            });
            this.updateLayers();
        }
    };
    /**
     * Image - Clears custom user image selection/file handler
     *
     * @param url
     */
    AnnoncesComponent.prototype.removeWhite = function (url) {
        this.url = '';
    };
    ;
    /**
     * Shape - Add custom shape
     *
     * @param shape - can be rectangle, square, triangle, circle, star
     */
    AnnoncesComponent.prototype.addFigure = function (shape) {
        var add;
        switch (shape) {
            case 'rectangle':
                add = new fabric.Rect({
                    width: 200, height: 100, left: 10, top: 10, angle: 0,
                    fill: '#3f51b5',
                    title: 'Rectangle'
                });
                break;
            case 'square':
                add = new fabric.Rect({
                    width: 100, height: 100, left: 10, top: 10, angle: 0,
                    fill: '#4caf50',
                    title: 'Carrée'
                });
                break;
            case 'triangle':
                add = new fabric.Triangle({
                    width: 100, height: 100, left: 10, top: 10, fill: '#2196f3', title: 'triangle'
                });
                break;
            case 'circle':
                add = new fabric.Circle({
                    radius: 50, left: 10, top: 10, fill: '#ff5722', title: 'Cercle'
                });
                break;
            case 'star':
                add = new fabric.Polygon([
                    { x: 350, y: 75 },
                    { x: 380, y: 160 },
                    { x: 470, y: 160 },
                    { x: 400, y: 215 },
                    { x: 423, y: 301 },
                    { x: 350, y: 250 },
                    { x: 277, y: 301 },
                    { x: 303, y: 215 },
                    { x: 231, y: 161 },
                    { x: 321, y: 161 }
                ], {
                    top: 10,
                    left: 10,
                    fill: '#ff5722',
                    stroke: '#ff5722',
                    strokeWidth: 2,
                    title: 'Polygone'
                });
                break;
        }
        this.extend(add, this.randomId());
        this.canvas.add(add);
        this.selectItemAfterAdded(add);
        this.updateLayers();
    };
    // CANVAS ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Canvas - clear current selection
     */
    AnnoncesComponent.prototype.cleanSelect = function () {
        this.canvas.deactivateAllWithDispatch().renderAll();
        this.updateLayers();
    };
    /**
     * Canvas - select item
     *
     * @param obj
     */
    AnnoncesComponent.prototype.selectItemAfterAdded = function (obj) {
        this.canvas.deactivateAllWithDispatch().renderAll();
        this.canvas.setActiveObject(obj);
    };
    /**
     * Canvas - update background color
     *
     */
    AnnoncesComponent.prototype.setCanvasFill = function () {
        if (!this.props.canvasImage) {
            this.canvas.backgroundColor = this.props.canvasFill;
            this.canvas.renderAll();
        }
    };
    /**
     * Helper
     *
     * @param obj
     * @param id
     */
    AnnoncesComponent.prototype.extend = function (obj, id) {
        obj.toObject = (function (toObject) {
            return function () {
                return fabric.util.object.extend(toObject.call(this), {
                    id: id
                });
            };
        })(obj.toObject);
    };
    /**
     * Canvas - update background image
     *
     */
    AnnoncesComponent.prototype.setCanvasImage = function () {
        var self = this;
        if (this.props.canvasImage) {
            this.canvas.setBackgroundColor({ source: this.props.canvasImage, repeat: 'repeat' }, function () {
                self.canvas.renderAll();
            });
        }
        this.updateLayers();
    };
    /**
     * Helper - Generates a random id, no dupe checks
     *
     * @returns {number}
     */
    AnnoncesComponent.prototype.randomId = function () {
        /*   if (this.canva_state == false) {
                this.handleCanvas()
          } */
        return Math.floor(Math.random() * 999999) + 1;
    };
    // ELEMENTS //////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Returns styleName from object
     *
     * @param styleName
     * @param object
     * @returns {any}
     */
    AnnoncesComponent.prototype.getActiveStyle = function (styleName, object) {
        object = object || this.canvas.getActiveObject();
        if (!object) {
            return '';
        }
        return (object.getSelectionStyles && object.isEditing)
            ? (object.getSelectionStyles()[styleName] || '')
            : (object[styleName] || '');
    };
    /**
     * Sets styleName to given value
     *
     * @param styleName
     * @param value
     * @param object
     */
    AnnoncesComponent.prototype.setActiveStyle = function (styleName, value, object) {
        object = object || this.canvas.getActiveObject();
        if (!object) {
            return;
        }
        if (object.setSelectionStyles && object.isEditing) {
            var style = {};
            style[styleName] = value;
            object.setSelectionStyles(style);
            object.setCoords();
        }
        else {
            object.set(styleName, value);
        }
        object.setCoords();
        this.canvas.renderAll();
    };
    /**
     * Get property for active object
     *
     * @param name
     * @returns {any}
     */
    AnnoncesComponent.prototype.getActiveProp = function (name) {
        var object = this.canvas.getActiveObject();
        if (!object) {
            return '';
        }
        return object[name] || '';
    };
    /**
     * Set property for active object
     *
     * @param name
     * @param value
     */
    AnnoncesComponent.prototype.setActiveProp = function (name, value) {
        var object = this.canvas.getActiveObject();
        if (!object) {
            return;
        }
        object.set(name, value).setCoords();
        this.canvas.renderAll();
    };
    /**
     * Clones the currently active object and sets the close as active
     *
     */
    AnnoncesComponent.prototype.clone = function () {
        var activeObject = this.canvas.getActiveObject(), activeGroup = this.canvas.getActiveGroup();
        if (activeObject) {
            var clone = void 0;
            switch (activeObject.type) {
                case 'rect':
                    clone = new fabric.Rect(activeObject.toObject());
                    break;
                case 'circle':
                    clone = new fabric.Circle(activeObject.toObject());
                    break;
                case 'triangle':
                    clone = new fabric.Triangle(activeObject.toObject());
                    break;
                case 'polygon':
                    clone = new fabric.Polygon(activeObject.toObject());
                    break;
                case 'i-text':
                    clone = new fabric.IText('', activeObject.toObject());
                    break;
                case 'image':
                    clone = fabric.util.object.clone(activeObject);
                    break;
            }
            if (clone) {
                clone.set({ left: 10, top: 10, title: 'Element cloné ' + activeObject.title });
                this.canvas.add(clone);
                this.selectItemAfterAdded(clone);
            }
            this.updateLayers();
        }
    };
    AnnoncesComponent.prototype.getId = function () {
        this.props.id = this.canvas.getActiveObject().toObject().id;
    };
    AnnoncesComponent.prototype.setId = function () {
        var val = this.props.id;
        var complete = this.canvas.getActiveObject().toObject();
        // //console.log(complete);
        this.canvas.getActiveObject().toObject = function () {
            complete.id = val;
            return complete;
        };
    };
    AnnoncesComponent.prototype.getTitle = function () {
        this.props.title = this.getActiveProp('title');
    };
    AnnoncesComponent.prototype.setTitle = function () {
        this.setActiveProp('title', this.props.title);
    };
    AnnoncesComponent.prototype.getOpacity = function () {
        this.props.opacity = this.getActiveStyle('opacity', null) * 100;
    };
    AnnoncesComponent.prototype.setOpacity = function () {
        this.setActiveStyle('opacity', parseInt(this.props.opacity, 10) / 100, null);
    };
    AnnoncesComponent.prototype.getFill = function () {
        this.props.fill = this.getActiveStyle('fill', null);
    };
    AnnoncesComponent.prototype.setFill = function () {
        this.setActiveStyle('fill', this.props.fill, null);
    };
    AnnoncesComponent.prototype.getStroke = function () {
        this.props.stroke = this.getActiveStyle('stroke', null);
    };
    AnnoncesComponent.prototype.setStroke = function () {
        this.setActiveStyle('stroke', this.props.stroke, null);
    };
    AnnoncesComponent.prototype.getStrokeWidth = function () {
        this.props.strokeWidth = this.getActiveStyle('strokeWidth', null);
    };
    AnnoncesComponent.prototype.setStrokeWidth = function () {
        this.setActiveStyle('strokeWidth', this.props.strokeWidth, null);
    };
    AnnoncesComponent.prototype.getLineHeight = function () {
        this.props.lineHeight = this.getActiveStyle('lineHeight', null);
    };
    AnnoncesComponent.prototype.setLineHeight = function () {
        this.setActiveStyle('lineHeight', parseFloat(this.props.lineHeight), null);
    };
    AnnoncesComponent.prototype.getCharSpacing = function () {
        this.props.charSpacing = this.getActiveStyle('charSpacing', null);
    };
    AnnoncesComponent.prototype.setCharSpacing = function () {
        this.setActiveStyle('charSpacing', this.props.charSpacing, null);
    };
    AnnoncesComponent.prototype.getFontSize = function () {
        this.props.fontSize = this.getActiveStyle('fontSize', null);
    };
    AnnoncesComponent.prototype.setFontSize = function () {
        this.setActiveStyle('fontSize', parseInt(this.props.fontSize, 10), null);
    };
    AnnoncesComponent.prototype.getBold = function () {
        this.props.fontWeight = this.getActiveStyle('fontWeight', null);
    };
    AnnoncesComponent.prototype.setBold = function () {
        this.props.fontWeight = !this.props.fontWeight;
        this.setActiveStyle('fontWeight', this.props.fontWeight ? 'bold' : '', null);
    };
    AnnoncesComponent.prototype.getFontStyle = function () {
        this.props.fontStyle = this.getActiveStyle('fontStyle', null);
    };
    AnnoncesComponent.prototype.setFontStyle = function () {
        this.props.fontStyle = !this.props.fontStyle;
        this.setActiveStyle('fontStyle', this.props.fontStyle ? 'italic' : '', null);
    };
    AnnoncesComponent.prototype.setWebfont = function () {
        this.props.fontSize = this.font.size;
        this.setActiveStyle('fontSize', parseInt(this.props.fontSize, 10), null);
        this.props.fontFamily = this.font.family;
        this.setActiveProp('fontFamily', this.props.fontFamily);
    };
    AnnoncesComponent.prototype.getTextDecoration = function () {
        this.props.TextDecoration = this.getActiveStyle('textDecoration', null);
    };
    AnnoncesComponent.prototype.setTextDecoration = function (value) {
        var iclass = this.props.TextDecoration;
        if (iclass.includes(value)) {
            iclass = iclass.replace(RegExp(value, 'g'), '');
        }
        else {
            iclass += " " + value;
        }
        this.props.TextDecoration = iclass;
        this.setActiveStyle('textDecoration', this.props.TextDecoration, null);
    };
    AnnoncesComponent.prototype.hasTextDecoration = function (value) {
        return this.props.TextDecoration.includes(value);
    };
    AnnoncesComponent.prototype.getTextAlign = function () {
        this.props.textAlign = this.getActiveProp('textAlign');
    };
    AnnoncesComponent.prototype.setTextAlign = function (value) {
        this.props.textAlign = value;
        this.setActiveProp('textAlign', this.props.textAlign);
    };
    AnnoncesComponent.prototype.getFontFamily = function () {
        this.props.fontFamily = this.getActiveProp('fontFamily');
    };
    AnnoncesComponent.prototype.setFontFamily = function () {
        this.setActiveProp('fontFamily', this.props.fontFamily);
    };
    AnnoncesComponent.prototype.setFillColor = function (swatch) {
        this.palettes.selected = swatch;
        this.props.fill = swatch.key;
        this.setFill();
    };
    // SYSTEM ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * Remove currently selected element from canvas
     *
     */
    AnnoncesComponent.prototype.removeSelected = function () {
        var activeObject = this.canvas.getActiveObject(), activeGroup = this.canvas.getActiveGroup();
        if (activeObject) {
            this.canvas.remove(activeObject);
        }
        else if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            this.canvas.discardActiveGroup();
            var self_1 = this;
            objectsInGroup.forEach(function (object) {
                self_1.canvas.remove(object);
            });
        }
        this.updateLayers();
    };
    /**
     * Send active object to front
     *
     */
    AnnoncesComponent.prototype.bringToFront = function () {
        var activeObject = this.canvas.getActiveObject(), activeGroup = this.canvas.getActiveGroup();
        if (activeObject) {
            activeObject.bringToFront();
        }
        else if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            this.canvas.discardActiveGroup();
            objectsInGroup.forEach(function (object) {
                object.bringToFront();
            });
        }
    };
    /**
     * Send active object to back
     *
     */
    AnnoncesComponent.prototype.sendToBack = function () {
        var activeObject = this.canvas.getActiveObject(), activeGroup = this.canvas.getActiveGroup();
        if (activeObject) {
            activeObject.sendToBack();
            // activeObject.opacity = 1;
        }
        else if (activeGroup) {
            var objectsInGroup = activeGroup.getObjects();
            this.canvas.discardActiveGroup();
            objectsInGroup.forEach(function (object) {
                object.sendToBack();
            });
        }
    };
    /**
     * Handle canvas reset/clear
     *
     */
    AnnoncesComponent.prototype.confirmClear = function () {
        if (confirm('Voulez vous vraiment tout éffacer ?')) {
            this.canvas.clear();
        }
    };
    AnnoncesComponent.prototype.handleDragStart = function (event) {
        this.dragObject = event.target;
        return false;
    };
    AnnoncesComponent.prototype.handleDragOverCanvas = function (event) {
        event.stopPropagation();
        return false; // prevenDefault;
    };
    /**
     *
     * @param event
     */
    AnnoncesComponent.prototype.handleDropOnCanvas = function (event) {
        var _this = this;
        if (event.stopPropagation) {
            event.stopPropagation();
        }
        var el = this.dragObject;
        fabric.Image.fromURL(el.src, function (image) {
            image.set({
                originX: 'center',
                originY: 'center',
                left: event.layerX,
                top: event.layerY,
                angle: 0,
                padding: 10,
                cornersize: 10,
                hasRotatingPoint: true,
                title: el.title,
                lockUniScaling: true
            });
            image.scaleToWidth(150);
            image.scaleToHeight(150);
            _this.extend(image, _this.randomId());
            _this.canvas.add(image);
            _this.selectItemAfterAdded(image);
        });
        this.updateLayers();
        this.dragObject = null;
        return false;
    };
    /**
     * Rasterize PNG
     *
     */
    AnnoncesComponent.prototype.rasterize = function () {
        if (!fabric.Canvas.supports('toDataURL')) {
            alert('Votre navigateur ne supporte pas cette opération.');
        }
        else {
            // chrome workaround: https://stackoverflow.com/a/45700813
            var _w = window.open();
            _w.document.write('<iframe src="' + this.canvas.toDataURL('png') +
                '" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;"' +
                'allowfullscreen></iframe>');
        }
    };
    /**
     * Rasterize SVG
     *
     */
    AnnoncesComponent.prototype.rasterizeSVG = function () {
        // chrome workaround: https://stackoverflow.com/a/45700813
        var _w = window.open();
        _w.document.write('<iframe src="data:image/svg+xml;utf8,' + encodeURIComponent(this.canvas.toSVG()) +
            '" frameborder="0" style="border:0; top:0; left:0; bottom:0; right:0; width:100%; height:100%;"' +
            ' allowfullscreen></iframe>');
    };
    ;
    /**
     * Stringify canvas objects and save in localStorage
     *
     */
    AnnoncesComponent.prototype.saveCanvasToJSON = function () {
        var json = JSON.stringify(this.canvas);
        localStorage.setItem('ffFabricQuicksave', json);
    };
    /**
     * Load canvas from JSON data
     *
     */
    AnnoncesComponent.prototype.loadCanvasFromJSON = function () {
        var _this = this;
        var CANVAS = localStorage.getItem('ffFabricQuicksave');
        //console.log(typeof(CANVAS))
        //console.log(typeof(this.currentCanvasContent))
        // and load everything from the same json
        this.canvas.loadFromJSON(this.currentCanvasContent, function () {
            // making sure to render canvas at the end
            _this.canvas.renderAll();
            // TODO: Retrieve additional data and bind accordingly
            //console.log(this.canvas);
        });
    };
    ;
    /**
     * Stringify canvas objects
     *
     */
    AnnoncesComponent.prototype.rasterizeJSON = function () {
        this.json = JSON.stringify(this.canvas, null, 2);
    };
    AnnoncesComponent.prototype.removeSelectedColorSwatch = function () {
        if (this.palettes.selected.type === undefined) {
            var _id_1 = this.palettes.selected.id;
            this.palettes.custom = this.palettes.custom.filter(function (swatch) {
                return swatch.id !== _id_1;
            });
            this.savePalette();
        }
    };
    AnnoncesComponent.prototype.addToCustomPalette = function (type) {
        switch (type) {
            case 'fill':
                this.palettes.custom.push({
                    key: this.props.fill,
                    value: this.props.fill,
                    id: this.palettes.custom.length
                });
                break;
            case 'stroke':
                this.palettes.custom.push({
                    key: this.props.stroke,
                    value: this.props.stroke,
                    id: this.palettes.custom.length
                });
                break;
        }
        this.savePalette();
    };
    AnnoncesComponent.prototype.savePalette = function () {
        var json = JSON.stringify(this.palettes.custom);
        localStorage.setItem('ffFabricCP', json);
    };
    AnnoncesComponent.prototype.loadPalette = function () {
        var palettes = localStorage.getItem('ffFabricCP');
        this.palettes.custom = palettes === null ? [] : JSON.parse(palettes);
    };
    AnnoncesComponent.prototype.updateColorPresets = function (presets) {
        // Update
    };
    /**
     * Reset panel visibility
     *
     */
    AnnoncesComponent.prototype.resetPanels = function () {
        this.textEditor = false;
        this.imageEditor = false;
        this.shapeEditor = false;
    };
    /** HELPERS ***********************/
    AnnoncesComponent.prototype.componentToHex = function (c) {
        var hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    AnnoncesComponent.prototype.rgbToHex = function (r, g, b) {
        return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
    };
    AnnoncesComponent.prototype.hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    AnnoncesComponent.prototype.triggerText = function () {
        this.addText();
        $(".text-block").css("display", "block");
        $(".tools").css("display", "block");
    };
    AnnoncesComponent.prototype.triggerImage = function () {
        $("#image").trigger("click");
        $(".tools").css("display", "block");
    };
    AnnoncesComponent.prototype.triggerFigure = function () {
        $(".figure-block").css("display", "block");
        $(".tools").css("display", "block");
    };
    AnnoncesComponent.prototype.closeFigure = function () {
        $(".figure-block").css("display", "none");
    };
    AnnoncesComponent.prototype.textRemove = function () {
        $(".text-block").css("display", "none");
    };
    AnnoncesComponent.prototype.calculateAspectRatio = function (image, canvas) {
        var imageAspectRatio = image.width / image.height;
        var canvasAspectRatio = canvas.width / canvas.height;
        var renderableHeight, renderableWidth, xStart, yStart;
        /* var AspectRatio = new Object(); */
        var AspectRatio = [];
        // If image's aspect ratio is less than canvas's we fit on height
        // and place the image centrally along width
        if (imageAspectRatio < canvasAspectRatio) {
            renderableHeight = canvas.height;
            renderableWidth = image.width * (renderableHeight / image.height);
            xStart = (canvas.width - renderableWidth) / 2;
            yStart = 0;
        }
        // If image's aspect ratio is greater than canvas's we fit on width
        // and place the image centrally along height
        else if (imageAspectRatio > canvasAspectRatio) {
            renderableWidth = canvas.width;
            renderableHeight = image.height * (renderableWidth / image.width);
            xStart = 0;
            yStart = (canvas.width - renderableHeight) / 2;
        }
        //keep aspect ratio
        else {
            renderableHeight = canvas.height;
            renderableWidth = canvas.width;
            xStart = 0;
            yStart = 0;
        }
        AspectRatio.push({
            "renderableHeight": renderableHeight,
            "renderableWidth": renderableWidth,
            "startX": xStart,
            "startY": yStart
        });
        return AspectRatio;
    };
    Object.defineProperty(AnnoncesComponent.prototype, "pattern", {
        get: function () {
            return this.adForm.get('pattern');
        },
        enumerable: true,
        configurable: true
    });
    AnnoncesComponent.prototype.onChangePattern = function () {
        this.pattern.patchValue(this.pattern.value);
    };
    AnnoncesComponent.prototype.validURL = function (str) {
        var pattern = new RegExp('^(https:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    };
    AnnoncesComponent.prototype.isUrl = function (s) {
        var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(s);
    };
    //Block "Size"
    AnnoncesComponent.prototype.changeAdStatus = function (id, adgroup_id, ad_id, last_status) {
        var _this = this;
        sweetalert2_1.default.fire({
            title: "Status du visuel",
            text: "Voulez vous modifier le status de votre visuel ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#26a69a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, modifier!'
        }).then(function (result) {
            if (result.value) {
                /*  */
                _this.isCreating = true;
                _this.http.post(SERVER_URL + '/changeAdStatus', {
                    'ad_group_id': adgroup_id,
                    'ad_id': ad_id,
                    'last_status': last_status
                })
                    .subscribe(function (res) {
                    //console.log(res)
                    _this.adsService.updateAd(id, {
                        status: res[0]['status']
                    }).then(function (res) {
                        sweetalert2_1.default.fire('Modifier!', "Status du visuel modifié.", 'success').then(function (res) {
                            _this.isCreating = false;
                        });
                    });
                }, function (err) {
                    _this.isCreating = false;
                    sweetalert2_1.default.fire({
                        title: "Service Visuel!",
                        text: 'Erreur.',
                        type: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#26a69a',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then(function (result) {
                        if (result.value) { }
                    });
                });
            }
        });
    };
    AnnoncesComponent.prototype.removeAdFirebase = function (id) {
        var _this = this;
        sweetalert2_1.default.fire({
            title: "Service Visuel",
            text: "Voulez vous supprimer ce visuel ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#26a69a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!'
        }).then(function (result) {
            if (result.value) {
                _this.isCreating = true;
                _this.adsService.deleteAd(id).then(function (res) {
                    _this.isCreating = false;
                });
            }
        });
    };
    AnnoncesComponent.prototype.removeAd = function (id, adgroup_id, ad_id) {
        var _this = this;
        sweetalert2_1.default.fire({
            title: "Service Visuel",
            text: "Voulez vous supprimer ce visuel ?",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#26a69a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!'
        }).then(function (result) {
            if (result.value) {
                /*  */
                _this.isCreating = true;
                _this.http.post(SERVER_URL + '/removeAd', {
                    'ad_group_id': adgroup_id,
                    'ad_id': ad_id
                })
                    .subscribe(function (res) {
                    //console.log(res)
                    _this.adsService.deleteAd(id).then(function (res) {
                        sweetalert2_1.default.fire('Supprimer!', "Visuel supprimé avec succès!", 'success').then(function (res) {
                            _this.isCreating = false;
                        });
                    });
                }, function (err) {
                    _this.isCreating = false;
                    sweetalert2_1.default.fire({
                        title: "Service Visuel!",
                        text: 'Erreur.',
                        type: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#26a69a',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then(function (result) {
                        if (result.value) { }
                    });
                });
            }
        });
    };
    AnnoncesComponent.prototype.removeAdBeforeUpdate = function (id, adgroup_id, ad_id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(SERVER_URL + '/removeAd', {
                'ad_group_id': adgroup_id,
                'ad_id': ad_id
            })
                .subscribe(function (res) {
                //console.log(res)
                if (res[0]['status'] == "ok") {
                    resolve('ok');
                }
            });
        });
    };
    AnnoncesComponent.prototype.goAdSettings = function (id_ad_firebase, ad_name, ad_group_id, ad_id, status, image_url, finalUrls, finalAppUrls, finalMobileUrls, image_content, referenceId, size, ad_type) {
        this.isAdBlock = true;
        this.isEditor = false;
        this.list_ad = false;
        this.currentAdName = ad_name;
        this.currentImageUrl = image_url;
        this.currentCanvasContent = image_content;
        this.ad_group_id = ad_group_id;
        this.id_ad_firebase = id_ad_firebase;
        this.image_url = image_url;
        this.image_content = image_content;
        this.ad_id = ad_id;
        this.currentAdStatus = status;
        this.finalUrls = finalUrls;
        this.finalAppUrls = finalAppUrls;
        this.ad_name = ad_name;
        this.finalMobileUrls = finalMobileUrls;
        this.referenceId = referenceId;
        this.currentAdSize = size;
        this.currentAdType = ad_type;
        this.currentIdInputName = this.idOfAdNameModify;
        this.currentIdInputDisplay = this.idOfDisplayUrlModify;
        this.iconEditor = "icon-chevron-down";
        //console.log(finalUrls.length)
        if (finalUrls.length == 0) {
            this.currentFinalUrls = "";
        }
        else if (finalUrls.length == 1) {
            this.currentFinalUrls = finalUrls[0].toString();
        }
        else {
            for (var i = 0; i < finalUrls.length - 1; i++) {
                //console.log(finalUrls)
                //console.log(finalUrls[i])
                this.currentFinalUrls += finalUrls[i].toString() + ",";
            }
        }
    };
    AnnoncesComponent.prototype.publish = function () {
        var jQuery = $;
        if (this.budget === 0) {
            sweetalert2_1.default.fire({
                title: "Service Visuel",
                text: "Le budget de votre campagne est insuffisant définissez le pour comment à diffuser",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Définir mon budget '
            }).then(function (result) {
                if (result.value) {
                    jQuery('#button_modal_define_budget').trigger('click');
                }
            });
        }
        else {
            jQuery('#button_modal_define_budget').trigger('click');
        }
    };
    AnnoncesComponent.prototype.defineAmountAccount = function () {
        var self = this;
        this.montant = $("#montant").val();
        if (this.montant < 10000) {
            $('#error_recharge').show();
        }
        else {
            $('#closeModalRecharge').trigger('click');
            var self = this;
            this.isCreating = true;
            setTimeout(function () {
                var btn = document.getElementById("budgetSet");
                var selector = pQuery(btn);
                (new PayExpresse({
                    item_id: 1,
                })).withOption({
                    requestTokenUrl: SERVER_URL + '/rechargeAmount/' + self.montant,
                    method: 'POST',
                    headers: {
                        "Accept": "application/json"
                    },
                    //prensentationMode   :   PayExpresse.OPEN_IN_POPUP,
                    prensentationMode: PayExpresse.OPEN_IN_POPUP,
                    didPopupClosed: function (is_completed, success_url, cancel_url) {
                        self.isCreating = false;
                        if (is_completed === true) {
                            alert(success_url);
                            //window.location.href = success_url; 
                        }
                        else {
                            self.isCreating = false;
                            //window.location.href = cancel_url
                        }
                    },
                    willGetToken: function () {
                        //console.log("Je me prepare a obtenir un token");
                        selector.prop('disabled', true);
                        //var ads = []
                    },
                    didGetToken: function (token, redirectUrl) {
                        //console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                        selector.prop('disabled', false);
                    },
                    didReceiveError: function (error) {
                        alert('erreur inconnu');
                        selector.prop('disabled', false);
                    },
                    didReceiveNonSuccessResponse: function (jsonResponse) {
                        //console.log('non success response ', jsonResponse);
                        alert(jsonResponse.errors);
                        selector.prop('disabled', false);
                    }
                }).send({
                    pageBackgroundRadianStart: '#0178bc',
                    pageBackgroundRadianEnd: '#00bdda',
                    pageTextPrimaryColor: '#333',
                    paymentFormBackground: '#fff',
                    navControlNextBackgroundRadianStart: '#608d93',
                    navControlNextBackgroundRadianEnd: '#28314e',
                    navControlCancelBackgroundRadianStar: '#28314e',
                    navControlCancelBackgroundRadianEnd: '#608d93',
                    navControlTextColor: '#fff',
                    paymentListItemTextColor: '#555',
                    paymentListItemSelectedBackground: '#eee',
                    commingIconBackgroundRadianStart: '#0178bc',
                    commingIconBackgroundRadianEnd: '#00bdda',
                    commingIconTextColor: '#fff',
                    formInputBackgroundColor: '#eff1f2',
                    formInputBorderTopColor: '#e3e7eb',
                    formInputBorderLeftColor: '#7c7c7c',
                    totalIconBackgroundRadianStart: '#0178bc',
                    totalIconBackgroundRadianEnd: '#00bdda',
                    formLabelTextColor: '#292b2c',
                    alertDialogTextColor: '#333',
                    alertDialogConfirmButtonBackgroundColor: '#0178bc',
                    alertDialogConfirmButtonTextColor: '#fff',
                });
            }, 500);
        }
    };
    AnnoncesComponent.prototype.defineBudget = function () {
        var self = this;
        $('#button_modal_define_budget').trigger('click');
        var self = this;
        this.isCreating = true;
        var url = SERVER_URL + '/payBudget/' + self.montant + "/" + self.budget_to_place + "/" + self.budgetId + "/" + self.idC + "/" + self.dure_campagne + "/" + self.ad_group_name + "/" + self.idA + "/" + self.ad_group_id + "/" + self.campagne_id + "/" + self.id_ad_firebase;
        alert(url);
        setTimeout(function () {
            var btn = document.getElementById("budgetSet");
            var selector = pQuery(btn);
            (new PayExpresse({
                item_id: 1,
            })).withOption({
                requestTokenUrl: url,
                method: 'POST',
                headers: {
                    "Accept": "application/json"
                },
                //prensentationMode   :   PayExpresse.OPEN_IN_POPUP,
                prensentationMode: PayExpresse.OPEN_IN_POPUP,
                didPopupClosed: function (is_completed, success_url, cancel_url) {
                    self.isCreating = false;
                    if (is_completed === true) {
                        //window.location.href = success_url; 
                    }
                    else {
                        self.isCreating = false;
                        //window.location.href = cancel_url
                    }
                },
                willGetToken: function () {
                    //console.log("Je me prepare a obtenir un token");
                    selector.prop('disabled', true);
                    //var ads = []
                },
                didGetToken: function (token, redirectUrl) {
                    //console.log("Mon token est : " + token + ' et url est ' + redirectUrl);
                    selector.prop('disabled', false);
                },
                didReceiveError: function (error) {
                    alert('erreur inconnu');
                    self.isCreating = false;
                    selector.prop('disabled', false);
                },
                didReceiveNonSuccessResponse: function (jsonResponse) {
                    //console.log('non success response ', jsonResponse);
                    alert(jsonResponse.errors);
                    selector.prop('disabled', false);
                }
            }).send({
                pageBackgroundRadianStart: '#0178bc',
                pageBackgroundRadianEnd: '#00bdda',
                pageTextPrimaryColor: '#333',
                paymentFormBackground: '#fff',
                navControlNextBackgroundRadianStart: '#608d93',
                navControlNextBackgroundRadianEnd: '#28314e',
                navControlCancelBackgroundRadianStar: '#28314e',
                navControlCancelBackgroundRadianEnd: '#608d93',
                navControlTextColor: '#fff',
                paymentListItemTextColor: '#555',
                paymentListItemSelectedBackground: '#eee',
                commingIconBackgroundRadianStart: '#0178bc',
                commingIconBackgroundRadianEnd: '#00bdda',
                commingIconTextColor: '#fff',
                formInputBackgroundColor: '#eff1f2',
                formInputBorderTopColor: '#e3e7eb',
                formInputBorderLeftColor: '#7c7c7c',
                totalIconBackgroundRadianStart: '#0178bc',
                totalIconBackgroundRadianEnd: '#00bdda',
                formLabelTextColor: '#292b2c',
                alertDialogTextColor: '#333',
                alertDialogConfirmButtonBackgroundColor: '#0178bc',
                alertDialogConfirmButtonTextColor: '#fff',
            });
        }, 500);
    };
    AnnoncesComponent.prototype.handleIfValide = function () {
        //console.log('keyup')
        $('#error_recharge').hide();
        var montant = $("#montant").val();
        if (montant < 20000) {
            this.montant = 0;
            $('#error_recharge').show();
        }
        else if (montant == "") {
            this.montant = 0;
            $('#error_recharge').show();
        }
        else {
            this.montant = montant;
            //var budget_to_place_in_dollar = budget_to_place * 550
        }
    };
    AnnoncesComponent.prototype.handleIfBudgetToPlaceFromAccountIsValid = function () {
        $('#error_recharge').hide();
        var montant = parseInt($("#montant").val());
        if (montant > this.accountValue) {
            this.montant = 0;
            this.number_of_impressions_simulated = 0;
            this.my_gain = 0;
            this.budget_to_place = 0;
            $('#error_recharge').show();
        }
        else if (montant == null) {
            this.montant = 0;
            this.number_of_impressions_simulated = 0;
            this.my_gain = 0;
            this.budget_to_place = 0;
            $('#error_recharge').show();
        }
        else if (montant < 10000) {
            this.montant = 0;
            this.number_of_impressions_simulated = 0;
            this.my_gain = 0;
            this.budget_to_place = 0;
            $('#error_recharge').show();
        }
        else {
            this.my_gain = (20 * montant) / 100;
            this.budget_to_place = montant - this.my_gain;
            this.number_of_impressions_simulated = (this.budget_to_place * 1000) / 33.3;
            this.montant = montant;
        }
    };
    AnnoncesComponent.prototype.handleBudgetPlacement = function () {
        var _this = this;
        this.isAccountRechargement = false;
        this.isPlacementBudgetFromAccount = false;
        sweetalert2_1.default.fire({
            title: 'Service Campagne',
            text: "Vous allez placer un budget pour votre campagne, veuillez vous assurez que les dates de début et de fins sont définies aux dates voulues",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#26a69a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Je confirme ces dates'
        }).then(function (result) {
            if (result.value) {
                _this.modifyDate = false;
                _this.isSetBudget = true;
            }
        });
    };
    AnnoncesComponent.prototype.handlePlaceBudgetFromSolde = function () {
        var _this = this;
        this.isAccountRechargement = false;
        this.isSetBudget = false;
        sweetalert2_1.default.fire({
            title: 'Service Campagne',
            text: "Vous allez placer un budget pour votre campagne, veuillez vous assurez que les dates de début et de fins sont définies aux dates voulues",
            type: 'info',
            showCancelButton: true,
            confirmButtonColor: '#26a69a',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, Je confirme ces dates'
        }).then(function (result) {
            if (result.value) {
                _this.modifyDate = false;
                _this.isPlacementBudgetFromAccount = true;
            }
        });
    };
    AnnoncesComponent.prototype.handleAccountRechargement = function () {
        this.modifyDate = false;
        this.isSetBudget = false;
        this.isPlacementBudgetFromAccount = false;
        this.isAccountRechargement = true;
    };
    AnnoncesComponent.prototype.parseDate = function (str) {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[1], mdy[0]);
    };
    AnnoncesComponent.prototype.datediff = function (first, second) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    };
    AnnoncesComponent.prototype.OpenModifyDateCampaign = function () {
        this.modifyDate = true;
        this.isSetBudget = false;
        this.isAccountRechargement = false;
        this.isPlacementBudgetFromAccount = false;
        $("#finalButtonPublier").hide();
        $("#dateBlock").hide();
    };
    AnnoncesComponent.prototype.CloseUpdateCampaignDate = function () {
        this.modifyDate = false;
        $("#finalButtonPublier").show();
        $("#dateBlock").show();
    };
    AnnoncesComponent.prototype.CloseBudgetOperation = function () {
        this.isSetBudget = false;
    };
    AnnoncesComponent.prototype.ClosePlaceBudgetFromAccountValue = function () {
        this.isPlacementBudgetFromAccount = false;
    };
    AnnoncesComponent.prototype.CloseRechargeAccountOperation = function () {
        this.isAccountRechargement = false;
    };
    AnnoncesComponent.prototype.onEndDateChange = function (args) {
        //console.log(args.value)
        if (args.value != undefined) {
            this.newEndDate = args.value.toString();
        }
        else {
            this.newEndDate = "";
        }
    };
    AnnoncesComponent.prototype.onStartDateChange = function (args) {
        //console.log(args.value)
        if (args.value != undefined) {
            this.newStartDate = args.value.toString();
            //console.log(this.newStartDate)
        }
        else {
            this.newStartDate = "";
        }
    };
    AnnoncesComponent.prototype.updateCampaignDate = function () {
        var _this = this;
        var parsed = JSON.parse(JSON.stringify(MONTH));
        var tabStart = this.startDateFrench.split("/");
        var tabEnd = this.endDateFrench.split("/");
        var frenchDateStart = tabStart[2] + "-" + tabStart[1] + "-" + tabStart[0];
        var frenchDateEnd = tabEnd[2] + "-" + tabEnd[1] + "-" + tabEnd[0];
        //console.log(date)
        //console.log(new Date(frenchDateStart))
        //console.log(new Date(frenchDateEnd))
        var today_date = new Date().getDate();
        var today_day = new Date().getDay();
        var years = new Date().getFullYear();
        var month = new Date().getMonth() + 1;
        new Date().valueOf();
        if (month < 10 && today_date < 10) {
            this.today = years.toString() + "-0" + month.toString() + "-0" + today_date.toString();
        }
        else if (month < 10 && today_date > 10) {
            this.today = years.toString() + "-0" + month.toString() + "-" + today_date.toString();
        }
        else if (month > 10 && today_date < 10) {
            this.today = years.toString() + month.toString() + "-0" + today_date.toString();
        }
        else {
            this.today = years.toString() + "-" + month.toString() + "-" + today_date.toString();
        }
        var date = new Date();
        if (this.newEndDate == "" && this.newStartDate == "") {
            sweetalert2_1.default.fire({
                title: 'Service Campagne',
                text: 'Renseigner au moins une date',
                type: 'error',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ok'
            }).then(function (result) {
                if (result.value) { }
            });
        }
        else if (this.newEndDate == "" && this.newStartDate != "") {
            var DATE_START = this.newStartDate.split(' ');
            var DATE_ELEMENT_START = parsed[0][DATE_START[1]];
            var _day_start = DATE_START[2];
            var _month_start = DATE_ELEMENT_START.number;
            var _years_start = DATE_START[3];
            this.UpdatedStartDate = _day_start + "/" + _month_start + "/" + _years_start;
            var date_start = "" + _years_start + _month_start + _day_start;
            var date_start_check = _years_start + "-" + _month_start + "-" + _day_start;
            sweetalert2_1.default.fire({
                title: 'Service Campagne',
                text: 'Date de début de campagne uniquement changer',
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: "Confirmer"
            }).then(function (result) {
                if (result.value) {
                    if (new Date(frenchDateStart) < date) {
                        sweetalert2_1.default.fire({
                            title: 'Service Campagne',
                            text: 'campagne déjà commencé Vous ne pouver plus modifier la date de début',
                            type: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Confirmer'
                        }).then(function (result) {
                            if (result.value) {
                            }
                        });
                    }
                    else if (new Date(frenchDateEnd) < date) {
                        sweetalert2_1.default.fire({
                            title: 'Service Campagne',
                            text: 'Campagne déjà arrivée à terme',
                            type: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok'
                        }).then(function (result) {
                            if (result.value) { }
                        });
                    }
                    else if (new Date(frenchDateStart) == date) {
                        sweetalert2_1.default.fire({
                            title: 'Service Campagne',
                            text: 'Cette campagne à déjà commencer à diffuser vous pouver uniquement modifier la date de fin',
                            type: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok'
                        }).then(function (result) {
                            if (result.value) { }
                        });
                    }
                    else if (new Date(frenchDateEnd) == date) {
                        sweetalert2_1.default.fire({
                            title: 'Service Campagne',
                            text: "Cette campagne se termine aujourd'hui vous pouver uniquement modifier la date de fin",
                            type: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok'
                        }).then(function (result) {
                            if (result.value) { }
                        });
                    }
                    else {
                        if (new Date(date_start_check) > new Date()) {
                            sweetalert2_1.default.fire({
                                title: 'Service Campagne',
                                text: "Date valide",
                                type: 'warning',
                                showCancelButton: false,
                                confirmButtonColor: '#26a69a',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok, confirmer'
                            }).then(function (result) {
                                _this.modifyDate = false;
                                _this.isRoller = true;
                                if (result.value) {
                                    _this.notesService.updateStartDate(_this.idC, _this.campagne_id, date_start, _this.UpdatedStartDate).then(function (res) {
                                        if (res != "error") {
                                            _this.isRoller = false;
                                            _this.modifyDate = true;
                                        }
                                    });
                                }
                            });
                        }
                        else if (date_start_check == _this.today) {
                            sweetalert2_1.default.fire({
                                title: 'Service Campagne',
                                text: "Campagne commence aujourd'hui",
                                type: 'warning',
                                showCancelButton: false,
                                confirmButtonColor: '#26a69a',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok, confirmer'
                            }).then(function (result) {
                                _this.modifyDate = false;
                                _this.isRoller = true;
                                if (result.value) {
                                    _this.notesService.updateStartDate(_this.idC, _this.campagne_id, date_start, _this.UpdatedStartDate).then(function (res) {
                                        if (res != "error") {
                                            _this.isRoller = false;
                                            _this.modifyDate = true;
                                        }
                                    });
                                }
                            });
                        }
                        else if (new Date(date_start_check) > new Date(frenchDateEnd)) {
                            sweetalert2_1.default.fire({
                                title: 'Service Campagne',
                                text: "date de début ne peut être après la date de fin",
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#26a69a',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                if (result.value) {
                                }
                            });
                        }
                        else if (date_start_check == frenchDateEnd) {
                            sweetalert2_1.default.fire({
                                title: 'Service Campagne',
                                text: "Date de début et date de fin ne peuvent être définies à la même date",
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#26a69a',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                if (result.value) {
                                }
                            });
                        }
                        else {
                            alert(date_start_check + " " + _this.today);
                            sweetalert2_1.default.fire({
                                title: 'Service Campagne',
                                text: "Date de début" + new Date(date_start_check) + " ne peut être définie dans le passé",
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#26a69a',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                if (result.value) { }
                            });
                        }
                    }
                }
            });
        }
        else if (this.newStartDate == "" && this.newEndDate != "") {
            var DATE_END = this.newEndDate.split(' ');
            var DATE_ELEMENT_END = parsed[0][DATE_END[1]];
            var _day_end = DATE_END[2];
            var _month_end = DATE_ELEMENT_END.number;
            var _years_end = DATE_END[3];
            this.UpdatedEndDate = _day_end + "/" + _month_end + "/" + _years_end;
            var date_end = "" + _years_end + _month_end + _day_end;
            var date_end_check = _years_end + "-" + _month_end + "-" + _day_end;
            sweetalert2_1.default.fire({
                title: 'Service Campagne',
                text: 'Date de début inchangé, date de fin changée',
                type: 'warning',
                showCancelButton: false,
                confirmButtonColor: '#26a69a',
                cancelButtonColor: '#d33',
                confirmButtonText: "Confirmer"
            }).then(function (result) {
                if (result.value) {
                    if (new Date(frenchDateEnd) < date) {
                        sweetalert2_1.default.fire({
                            title: 'Service Campagne',
                            text: "Cette campagne est déjà arrivée à terme",
                            type: 'error',
                            showCancelButton: false,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok'
                        }).then(function (result) {
                            if (result.value) {
                            }
                        });
                    }
                    else if (new Date(frenchDateEnd) == date) {
                        sweetalert2_1.default.fire({
                            title: 'Service Campagne',
                            text: "Cette campagne se termine aujourd'hui, vous voulez prolonger sa date de fin",
                            type: 'warning',
                            showCancelButton: false,
                            confirmButtonColor: '#26a69a',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Ok, prolonger'
                        }).then(function (result) {
                            _this.modifyDate = false;
                            _this.isRoller = true;
                            if (result.value) {
                                _this.notesService.updateEndDate(_this.idC, _this.campagne_id, date_end, _this.UpdatedEndDate).then(function (res) {
                                    if (res != "error") {
                                        _this.isRoller = false;
                                        _this.modifyDate = true;
                                    }
                                });
                            }
                        });
                    }
                    else {
                        if (new Date(date_end_check) < new Date()) {
                            sweetalert2_1.default.fire({
                                title: 'Service Campagne',
                                text: "Date de fin ne peut être définie dans le passé",
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#26a69a',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                if (result.value) {
                                }
                            });
                        }
                        else if (date_end_check == _this.today) {
                            sweetalert2_1.default.fire({
                                title: 'Service Campagne',
                                text: "Date de fin définie à la date d'aujourd'hui",
                                type: 'warning',
                                showCancelButton: false,
                                confirmButtonColor: '#26a69a',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                _this.modifyDate = false;
                                _this.isRoller = true;
                                if (result.value) {
                                    _this.notesService.updateEndDate(_this.idC, _this.campagne_id, date_end, _this.UpdatedEndDate).then(function (res) {
                                        if (res != "error") {
                                            _this.isRoller = false;
                                            _this.modifyDate = true;
                                        }
                                    });
                                }
                            });
                        }
                        else if (new Date(date_end_check) < new Date(frenchDateStart)) {
                            sweetalert2_1.default.fire({
                                title: 'Service Campagne',
                                text: "Date de fin ne peut être définie avant la date de début",
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#26a69a',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                if (result.value) {
                                }
                            });
                        }
                        else if (date_end_check == frenchDateStart) {
                            sweetalert2_1.default.fire({
                                title: 'Service Campagne',
                                text: "Date de début et date de fin ne peuvent être définies à la même date",
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#26a69a',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                if (result.value) {
                                }
                            });
                        }
                        else {
                            sweetalert2_1.default.fire({
                                title: 'Service Campagne',
                                text: "Vous êtes sur des données saisies ?",
                                type: 'warning',
                                showCancelButton: false,
                                confirmButtonColor: '#26a69a',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Oui, sûr!'
                            }).then(function (result) {
                                _this.modifyDate = false;
                                _this.isRoller = true;
                                if (result.value) {
                                    _this.notesService.updateEndDate(_this.idC, _this.campagne_id, date_end, _this.UpdatedEndDate).then(function (res) {
                                        if (res != "error") {
                                            _this.isRoller = false;
                                            _this.modifyDate = true;
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            });
        }
        else {
            var DATE_START = this.newStartDate.split(' ');
            var DATE_ELEMENT_START = parsed[0][DATE_START[1]];
            var _day_start = DATE_START[2];
            var _month_start = DATE_ELEMENT_START.number;
            var _years_start = DATE_START[3];
            this.UpdatedStartDate = _day_start + "/" + _month_start + "/" + _years_start;
            var date_start = "" + _years_start + _month_start + _day_start;
            var date_start_check = _years_start + "-" + _month_start + "-" + _day_start;
            var DATE_END = this.newEndDate.split(' ');
            var DATE_ELEMENT_END = parsed[0][DATE_END[1]];
            var _day_end = DATE_END[2];
            var _month_end = DATE_ELEMENT_END.number;
            var _years_end = DATE_END[3];
            this.UpdatedEndDate = _day_end + "/" + _month_end + "/" + _years_end;
            var date_end = "" + _years_end + _month_end + _day_end;
            var date_end_check = _years_end + "-" + _month_end + "-" + _day_end;
            if (frenchDateStart == this.today) {
                sweetalert2_1.default.fire({
                    title: 'Service Campagne',
                    text: "Cette campagne Commence aujourd'hui vous pouver uniquement modifier la date de fin",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#26a69a',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then(function (result) {
                    if (result.value) { }
                });
            }
            else if (new Date(frenchDateEnd) < new Date()) {
                sweetalert2_1.default.fire({
                    title: 'Service Campagne',
                    text: "Cette campagne est arrivée à terme",
                    type: 'error',
                    showCancelButton: false,
                    confirmButtonColor: '#26a69a',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok'
                }).then(function (result) {
                    if (result.value) { }
                });
            }
            else if (new Date(frenchDateStart) < new Date()) {
                sweetalert2_1.default.fire({
                    title: 'Service Campagne',
                    text: "Cette campagne à déjà commencé à diffuser, seul sa date de fin sera changée",
                    type: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#26a69a',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok, changer'
                }).then(function (result) {
                    _this.modifyDate = false;
                    _this.isRoller = true;
                    if (result.value) {
                        _this.notesService.updateEndDate(_this.idC, _this.campagne_id, date_end, _this.UpdatedEndDate).then(function (res) {
                            if (res != "error") {
                                _this.isRoller = false;
                                _this.modifyDate = true;
                            }
                        });
                    }
                });
            }
            else if (frenchDateEnd == this.today) {
                sweetalert2_1.default.fire({
                    title: 'Service Campagne',
                    text: "Cette campagne se termine aujourd'hui, vous pouvez prolonger sa date de fin",
                    type: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#26a69a',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ok, prolonger'
                }).then(function (result) {
                    _this.modifyDate = false;
                    _this.isRoller = true;
                    if (result.value) {
                        _this.notesService.updateEndDate(_this.idC, _this.campagne_id, date_end, _this.UpdatedEndDate).then(function (res) {
                            if (res != "error") {
                                _this.isRoller = false;
                                _this.modifyDate = true;
                            }
                        });
                    }
                });
            }
            else {
                if (date_start_check == this.today && new Date(date_end_check) > new Date()) {
                    sweetalert2_1.default.fire({
                        title: 'Service Campagne',
                        text: "La campagne va commencer aujourd'hui",
                        type: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#26a69a',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok, confirmer'
                    }).then(function (result) {
                        _this.modifyDate = false;
                        _this.isRoller = true;
                        if (result.value) {
                            _this.notesService.updateDates(_this.idC, _this.campagne_id, date_start, _this.UpdatedStartDate, date_end, _this.UpdatedEndDate).then(function (res) {
                                if (res != "error") {
                                    _this.isRoller = false;
                                    _this.modifyDate = true;
                                }
                            });
                        }
                    });
                }
                else if (new Date(date_start_check) < new Date() && new Date(date_end_check) > new Date()) {
                    sweetalert2_1.default.fire({
                        title: 'Service Campagne',
                        text: "Date de début ne peut être définie dans le passé",
                        type: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#26a69a',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then(function (result) {
                        if (result.value) {
                        }
                    });
                }
                else if (new Date(date_end_check) < new Date()) {
                    sweetalert2_1.default.fire({
                        title: 'Service Campagne',
                        text: "Date de fin ne peut être définie dans le passé",
                        type: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#26a69a',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then(function (result) {
                        if (result.value) {
                        }
                    });
                }
                else if (new Date(date_start_check) > new Date(date_end_check)) {
                    sweetalert2_1.default.fire({
                        title: 'Service Campagne',
                        text: "date de début ne peut être après la date de fin",
                        type: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#26a69a',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then(function (result) {
                        if (result.value) {
                        }
                    });
                }
                else if (date_start_check == this.today && date_end_check != this.today) {
                    sweetalert2_1.default.fire({
                        title: 'Service Campagne',
                        text: "Campagne va commencer aujourd'hui",
                        type: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#26a69a',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok, commencer'
                    }).then(function (result) {
                        _this.modifyDate = false;
                        _this.isRoller = true;
                        if (result.value) {
                            _this.notesService.updateDates(_this.idC, _this.campagne_id, date_start, _this.UpdatedStartDate, date_end, _this.UpdatedEndDate).then(function (res) {
                                if (res != "error") {
                                    _this.isRoller = false;
                                    _this.modifyDate = true;
                                }
                            });
                        }
                    });
                }
                else if (date_end_check == this.today) {
                    sweetalert2_1.default.fire({
                        title: 'Service Campagne',
                        text: "Impossible de finir une campagne qui n'a pas commencé à diffuser",
                        type: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#26a69a',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then(function (result) {
                        if (result.value) {
                        }
                    });
                }
                else if (date_end_check == date_start_check) {
                    sweetalert2_1.default.fire({
                        title: 'Service Campagne',
                        text: "Date de début et date de fin ne peuvent être définies à la même date",
                        type: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#26a69a',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then(function (result) {
                        if (result.value) {
                        }
                    });
                }
                else {
                    sweetalert2_1.default.fire({
                        title: 'Service Campagne',
                        text: "Vous êtes sur des données saisies ?",
                        type: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#26a69a',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Oui, sûr!'
                    }).then(function (result) {
                        _this.modifyDate = false;
                        _this.isRoller = true;
                        if (result.value) {
                            _this.notesService.updateDates(_this.idC, _this.campagne_id, date_start, _this.UpdatedStartDate, date_end, _this.UpdatedEndDate).then(function (res) {
                                if (res != "error") {
                                    _this.isRoller = false;
                                    _this.modifyDate = true;
                                }
                            });
                        }
                    });
                }
            }
        }
        /* var today_date = new Date().getDate()
        var today_day = new Date().getDay()
        var years = new Date().getFullYear()
        var month = new Date().getMonth() + 1
        
        if (month < 10 && today_date < 10) {
          this.today = "0" + today_date.toString() + "/0" + month.toString() + "/" + years.toString()
        } else if (month < 10 && today_date > 10) {
          this.today = today_date.toString() + "/0" + month.toString() + "/" + years.toString()
        } else if (month > 10 && today_date < 10) {
          this.today = "0" + today_date.toString() + "/" + month.toString() + "/" + years.toString()
        } else {
          this.today = today_date.toString() + "/" + month.toString() + "/" + years.toString()
        }
    
    
        //console.log(`startDate: ${this.startDate}, updatedStartDate: ${this.UpdatedStartDate}`)
        //console.log(`endDate: ${this.endDate}, updatedEndDate: ${this.UpdatedEndDate}`)
        //console.log(`startDateFrench: ${this.startDateFrench.replace("/", "-").replace("/", "-")}, endDateFrench: ${this.endDateFrench.replace("/", "-").replace("/", "-")}`)
        //console.log(this.today)
     */
    };
    AnnoncesComponent.prototype.setStartDate = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var DATE = _this.newStartDate.split(' ');
            var parsed = JSON.parse(JSON.stringify(MONTH));
            var DATE_ELEMENT = parsed[0][DATE[1]];
            var day = DATE[2];
            var month = DATE_ELEMENT.number;
            var years = DATE[3];
            //this.startDate = `${day}/${month}/${years}`
            _this.UpdatedStartDate = day + "/" + month + "/" + years;
            var date = "" + years + month + day;
            _this.isCreating = true;
            if (_this.startDate == date || _this.endDate == date) {
                /*    //console.log(`start date from firebase: ${value['startDate']} end date from firebase: ${value['endDate']}`)
                 //console.log(`end date from me: ${date}`)  */
                resolve('error');
            }
            else {
                _this.notesService.updateStartDate(_this.idC, _this.campagne_id, date, _this.UpdatedStartDate);
                //console.log(this.idC)
                resolve('ok');
            }
        });
    };
    AnnoncesComponent.prototype.setEndDate = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var DATE = _this.newEndDate.split(' ');
            var parsed = JSON.parse(JSON.stringify(MONTH));
            var DATE_ELEMENT = parsed[0][DATE[1]];
            var day = DATE[2];
            var month = DATE_ELEMENT.number;
            var years = DATE[3];
            //this.endDate = `${day}/${month}/${years}`
            _this.UpdatedEndDate = day + "/" + month + "/" + years;
            var date = "" + years + month + day;
            _this.isCreating = true;
            if (_this.endDate == date || _this.startDate == date) {
                /*    //console.log(`start date from firebase: ${value['startDate']} end date from firebase: ${value['endDate']}`)
                 //console.log(`end date from me: ${date}`)  */
                resolve('error');
            }
            else {
                _this.notesService.updateEndDate(_this.idC, _this.campagne_id, date, _this.UpdatedEndDate);
                resolve('ok');
            }
        });
    };
    AnnoncesComponent.prototype.retourRechargement = function () {
        this.directBudget = false;
        this.choose = true;
    };
    AnnoncesComponent.prototype.initAdd = function () {
        this.init_choose_ad_size = true;
    };
    AnnoncesComponent.prototype.handleSimulatedImpressionsCount = function () {
        //console.log('keyup')
        $('#error_recharge').hide();
        this.isSimulation = true;
        var montant = $("#montant").val();
        if (montant < 10000) {
            this.number_of_impressions_simulated = 0;
            this.my_gain = 0;
            this.budget_to_place = 0;
            $('#error_recharge').show();
        }
        else if (montant == "") {
            this.number_of_impressions_simulated = 0;
            this.my_gain = 0;
            this.budget_to_place = 0;
            $('#error_recharge').show();
        }
        else {
            this.my_gain = (20 * montant) / 100;
            this.budget_to_place = montant - this.my_gain;
            this.number_of_impressions_simulated = (this.budget_to_place * 1000) / 33.3;
            this.montant = montant;
            //var budget_to_place_in_dollar = budget_to_place * 550
        }
    };
    AnnoncesComponent = __decorate([
        core_1.Component({
            selector: 'app-annonces',
            templateUrl: './annonces.component.html',
            styleUrls: ['./annonces.component.css']
        }),
        __metadata("design:paramtypes", [notes_service_1.NotesService, auth_service_1.AuthService, router_1.ActivatedRoute, http_1.HttpClient, ad_groupe_service_1.AdGroupService, ads_service_1.Ads, ngx_color_picker_1.ColorPickerService, forms_1.FormBuilder, router_1.Router])
    ], AnnoncesComponent);
    return AnnoncesComponent;
}());
exports.AnnoncesComponent = AnnoncesComponent;
//# sourceMappingURL=annonces.component.js.map