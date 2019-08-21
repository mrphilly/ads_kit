"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var http_1 = require("@angular/common/http");
var firestore_1 = require("@angular/fire/firestore");
var notes_service_1 = require("../../notes.service");
var auth_service_1 = require("../../../core/auth.service");
var environment_1 = require("../../../../../environments/environment");
var sweetalert2_1 = require("sweetalert2");
var $ = require("jquery");
var ad_groupe_service_1 = require("../../ad-groupe.service");
var operators_1 = require("rxjs/operators");
var router_1 = require("@angular/router");
var ads_service_1 = require("../../ads.service");
/* const dataUrl =
  SERVER.url+"/campaignReport/"+; */
var schemaUrl = 'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/fusiontime-beta-release/charts-resources/fusiontime/online-sales-single-series/schema.json';
var SERVER_URL = environment_1.SERVER.url;
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
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(notesService, auth, adGroupService, http, afs, router, adsService) {
        this.notesService = notesService;
        this.auth = auth;
        this.adGroupService = adGroupService;
        this.http = http;
        this.afs = afs;
        this.router = router;
        this.adsService = adsService;
        this.impressions = 0;
        this.clicks = 0;
        this.cost = 0;
        this.button_payments = true;
        this.ad_group_tab_content = [];
        this.ad_groups_list_id = [];
        this.ads_list_id = [];
        this.number_of_impressions = 0;
        this.isCreating = false;
        this.isAdGroup = false;
        this.isCiblage = false;
        this.labelDateStart = "Date de début";
        this.labelDateEnd = "Date de fin";
        this.labelServing = "Actuellemnt en diffusion";
        this.labelNotServing = "Non diffusée, changer la date de début pour commencer la diffusion";
        this.labelSuspended = "Suspendu";
        this.labelNone = "Pas assez de fonds displonible pour démarrer une campagne";
        this.labelEnded = "Campagne publicitaire terminée";
        this.text_status_deactive_campaign = "Désactivée";
        this.text_status_active_campaign = "Activée";
        this.text_no_zone = "Aucune zone ciblée";
        this.sn = 'Tout le Sénégal';
        this.dk = 'Dakar';
        this.generale = 'Général';
        this.ages = [];
        this.sexes = [];
        this.zones = [];
        this.devices = [];
        this.isCiblageGenre = false;
        this.isCiblageAge = false;
        this.isCiblageDevices = false;
        this.isPlacement = false;
        this.dure_campagne = 0;
        this.budget_to_place = 0;
        this.my_gain = 0;
        this.number_of_impressions_simulated = 0;
        this.montant = 0;
        this.accountValue = 0;
        this.modifyDate = false;
        this.isSetBudget = false;
        this.isAccountRechargement = false;
        this.isPlacementBudgetFromAccount = false;
        this.isRoller = false;
        this.isSimulation = false;
        this.nationals_websites = [];
        this.internationals_websites = [];
        this.ads_websites = [];
        this.apps = [];
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = [];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [0], label: 'Clicks' },
            { data: [0], label: 'Coût'
            },
            { data: [0], label: 'Impressions' }
        ];
        this.dropdownListAges = [];
        this.dropdownListSexes = [];
        this.dropdownListZones = [];
        this.dropdownListDevices = [];
        this.dropdownListNationalsWebsites = [];
        this.dropdownListInternationalsWebsites = [];
        this.dropdownListAdsWebsites = [];
        this.dropdownListApps = [];
        this.selectedItems = [];
        this.selectedZones = [];
        this.dropdownSettingsAges = {};
        this.dropdownSettingsSexes = {};
        this.dropdownSettingsZones = {};
        this.dropdownSettingsDevices = {};
        this.dropdownSettingsNationalsWebsites = {};
        this.dropdownSettingsInternationalsWebsites = {};
        this.dropdownSettingsAdsWebsites = {};
        this.dropdownSettingsApps = {};
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
        this.getUser().then(function (res) {
            //console.log(res)
            //console.log(this.id_campagne)
        });
        this.type = 'timeseries';
        this.width = '400';
        this.height = '400';
        this.dataSource = {
            data: null,
            yAxis: {
                plot: [{ value: 'Sales' }]
            },
            caption: {
                text: 'Online Sales of a SuperStore in the US'
            }
        };
    }
    SettingsComponent.prototype.fetchData = function () {
        var self = this;
        var jsonify = function (res) { return res.json(); };
        var dataFetch = fetch(environment_1.SERVER.url + "/campaignReport/" + self.id_campagne).then(jsonify);
        var schemaFetch = fetch(environment_1.SERVER.url + "/getSchemaReportCampaign").then(jsonify);
        Promise.all([dataFetch, schemaFetch]).then(function (res) {
            var data = res[0];
            //console.log(data)
            var schema = res[1];
            //console.log(res[1])
            var tableData = [];
            $.each(data, function (key, value) {
                //console.log(key, value)
                tableData.push(value);
            });
            //console.log(tableData)
            //console.log(parseInt(data['clicks']))
            //console.log(parseInt(data['impressions']))
            //console.log(parseInt(data['cost']))
            if (parseInt(data['clicks']) !== 0 && parseInt(data['impressions']) !== 0 && parseInt(data['cost']) !== 0) {
                self.notesService.updateNote(self.id, { clicks: parseInt(data['clicks']), impressions: parseInt(data['impressions']), cost: parseInt(data['coûts']) });
            }
        });
    };
    SettingsComponent.prototype.cryptMoney = function (money) {
        var CryptoJS = require('crypto-js');
        var secretMessage = money;
        var secretKey = this.uid;
        var encryptedMessage = CryptoJS.AES.encrypt(secretMessage, CryptoJS.enc.Hex.parse(secretKey), { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.NoPadding });
        //console.log('encryptedMessage: ' + encryptedMessage.ciphertext);
        return encryptedMessage.ciphertext;
    };
    SettingsComponent.prototype.go1 = function () {
        window.location.reload();
    };
    SettingsComponent.prototype.getDateArray = function (start, end) {
        var arr = new Array();
        var dt = new Date(start);
        var _end = new Date(end);
        //console.log(dt)
        while (dt <= _end) {
            arr.push(new Date(dt).getDate() + "/" + (new Date(dt).getMonth() + 1) + "/" + new Date(dt).getFullYear());
            dt.setDate(dt.getDate() + 1);
        }
        return arr;
    };
    SettingsComponent.prototype.getUser = function () {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.auth.user.forEach(function (data) {
                    _this.email = data.email;
                    if (typeof (data.account_value) == typeof (0)) {
                        _this.accountValue = data.account_value;
                    }
                    else {
                        _this.accountValue = parseInt(data.account_value);
                    }
                    resolve(data.uid);
                });
            }, 2000);
        });
    };
    SettingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        /*        L10n.load({
              'fr': {
                'datepicker': {
                  placeholder: 'Date de début',
                  today:"Aujourd'hui"
                }
              }
            }) */
        ;
        this.auth.user.subscribe(function (data) {
            _this.notesService.getSingleCampaign(_this.id_campagne, _this.name).subscribe(function (res) {
                res.forEach(function (data) {
                    _this.startDateFrench = data['startDateFrench'];
                    _this.endDateFrench = data['endDateFrench'];
                    _this.dure_campagne = _this.datediff(_this.parseDate(data['startDateFrench']), _this.parseDate(data['endDateFrench']));
                    _this.servingStatus = data['servingStatus'];
                    var result = data['zones'];
                    _this.zone = result;
                    _this.appareils = data['devices'];
                    _this.populations = data['ages'];
                    _this.genres = data['sexes'];
                    _this.clicks = data['clicks'];
                    _this.impressions = data['impressions'];
                    _this.cost = data['cost'];
                    //console.log(data['startDate'])
                    var startDate = data['startDate'].slice(0, 4) + "-" + data['startDate'].slice(4, 6) + "-" + data['startDate'].slice(6, 8);
                    var endDate = data['endDate'].slice(0, 4) + "-" + data['endDate'].slice(4, 6) + "-" + data['endDate'].slice(6, 8);
                    //console.log(startDate)
                    //console.log(endDate)
                    var dateArr = _this.getDateArray(startDate, endDate);
                    //console.log(dateArr)
                    // Output
                    for (var i = 0; i < dateArr.length; i++) {
                        _this.barChartLabels.push(dateArr[i]);
                        //console.log(this.barChartLabels)
                    }
                });
            });
        });
        this.adgroups = this.adGroupService.getListAdGroup(this.id_campagne);
        this.adgroups.forEach(function (child) {
            //console.log(child)
            if (child.length > 0) {
                _this.number_ad_groups = child.length;
            }
            else {
                _this.number_ad_groups = "0";
            }
        });
        this.dropdownListZones = [{
                item_id: 9067846,
                item_text: this.dk
            },
            {
                item_id: 2686,
                item_text: this.sn
            }];
        this.dropdownSettingsZones = {
            singleSelection: true,
            idField: 'item_id',
            textField: 'item_text',
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            itemsShowLimit: 3,
            allowSearchFilter: false,
            searchPlaceholderText: 'Rechercher',
        };
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
            },
            {
                item_id: 9070424,
                item_text: 'Sénégal'
            }
        ];
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
        this.fetchData();
        /*   var text = 'Some data I want to export';
     var data = new Blob([text], {type: 'text/plain'});
     
     var url = window.URL.createObjectURL(data);
     
     document.getElementById('download_link').setAttribute('href', url)  */
    };
    SettingsComponent.prototype.downloadFile = function () {
        var _this = this;
        this.isCreating = true;
        var download = require('../../../../../assets/js/download.js');
        var file_name = this.id_campagne;
        var url = environment_1.SERVER.url + "/uploads/" + this.id_campagne + ".csv";
        fetch(environment_1.SERVER.url + "/campaignReport/" + this.id_campagne).then(function (res) {
            if (res['status'].toString() == "200") {
                /* fetch(url, {
                 method: 'OPTIONS',
                 headers: {
                   'Authorization': ''
                 }
               }).then(function(resp) {
                 return resp.blob();
               }).then(function(blob) {
                 download(blob);
               }); */
                var self = _this;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.responseType = 'blob';
                xhr.onload = function (e) {
                    if (this.status == 200) {
                        var myBlob = this.response;
                        //console.log(myBlob)
                        download(myBlob, "Reporting", "text/csv");
                        // myBlob is now the blob that the object URL pointed to.
                    }
                };
                xhr.send();
            }
            _this.isCreating = false;
        });
    };
    /*  this.adgroups = this.getData();
     
      
     })  */
    SettingsComponent.prototype.go = function () {
        window.location.replace(environment_1.SERVER.url_redirect);
    };
    SettingsComponent.prototype.openAddCiblageGenre = function () {
        this.isCiblageGenre = true;
    };
    SettingsComponent.prototype.openAddCiblageDevices = function () {
        this.isCiblageDevices = true;
    };
    SettingsComponent.prototype.targetGender = function () {
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
            /*   this.adGroupService.targetGenre(this.idA, this.campagne_id, this.ad_group_id, this.sexes).then(res => {
                this.sexes = []
              }).then(res => {
                this.isCiblageGenre = false
                this.isCreating = false
              }) */
        }
    };
    SettingsComponent.prototype.targetPlacement = function () {
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
            /* this.adGroupService.targetPlacement(this.idA, this.campagne_id, this.ad_group_id, placement).then(res => {
              this.sexes = []
            }).then(res => {
              this.isCiblageGenre = false
              this.isCreating = false
            }) */
        }
    };
    SettingsComponent.prototype.targetDevices = function () {
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
            /*  this.adGroupService.targetDevices(this.idA, this.campagne_id, this.ad_group_id, this.devices).then(res => {
               this.devices = []
             }).then(res => {
               this.isCreating = false
               this.isCiblageDevices = false
       
             }) */
        }
    };
    SettingsComponent.prototype.closeAddCiblageGenre = function () {
        this.isCiblageGenre = false;
    };
    SettingsComponent.prototype.closeAddCiblageDevices = function () {
        this.isCiblageDevices = false;
    };
    SettingsComponent.prototype.closeAddPlacement = function () {
        this.isPlacement = false;
    };
    SettingsComponent.prototype.openAddCiblageAge = function () {
        this.isCiblageAge = true;
    };
    SettingsComponent.prototype.targetAge = function () {
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
            this.notesService.targetAge(this.id, this.id_campagne, this.ages, this.uid).then(function (res) {
                _this.ages = [];
            }).then(function (res) {
                _this.isCiblageAge = false;
                _this.isCreating = false;
            });
        }
    };
    SettingsComponent.prototype.closeAddCiblageAges = function () {
        this.isCiblageAge = false;
    };
    SettingsComponent.prototype.onAgeSelect = function (item) {
        this.ages.push(item);
        //console.log(this.ages)
    };
    SettingsComponent.prototype.onAgeSelectAll = function (items) {
        //console.log(items);
        this.ages = [];
        this.ages = items;
    };
    SettingsComponent.prototype.onAgeDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.ages.length; i++) {
            if (this.ages[i]['item_id'] == item.item_id) {
                this.ages.splice(i, 1);
            }
        }
        //console.log(this.ages)
    };
    SettingsComponent.prototype.onDeSelectAllAge = function () {
        this.ages = [];
        //console.log(this.ages)
    };
    SettingsComponent.prototype.onNationalsWebsitesSelect = function (item) {
        this.nationals_errors = '';
        this.nationals_websites.push(item);
        //console.log(this.nationals_websites)
    };
    SettingsComponent.prototype.onNationalsWebsitesSelectAll = function (items) {
        this.nationals_errors = '';
        this.nationals_websites = [];
        this.nationals_websites = items;
        //console.log(this.nationals_websites);
    };
    SettingsComponent.prototype.onNationalsWebsitesDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.nationals_websites.length; i++) {
            if (this.nationals_websites[i]['item_id'] == item.item_id) {
                this.nationals_websites.splice(i, 1);
            }
        }
        //console.log(this.nationals_websites)
    };
    SettingsComponent.prototype.onNationalsWebsitesDeSelectAll = function () {
        this.nationals_websites = [];
        //console.log(this.nationals_websites)
    };
    SettingsComponent.prototype.onInternationalsWebsitesSelect = function (item) {
        this.internationals_websites.push(item);
        //console.log(this.internationals_websites)
    };
    SettingsComponent.prototype.onInternationalsWebsitesSelectAll = function (items) {
        this.internationals_websites = [];
        this.internationals_websites = items;
        //console.log(this.internationals_websites)
    };
    SettingsComponent.prototype.onInternationalsWebsitesDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.internationals_websites.length; i++) {
            if (this.internationals_websites[i]['item_id'] == item.item_id) {
                this.internationals_websites.splice(i, 1);
            }
        }
    };
    SettingsComponent.prototype.onInternationalsWebsitesDeSelectAll = function () {
        this.internationals_websites = [];
    };
    SettingsComponent.prototype.onAdsWebsitesSelect = function (item) {
        this.ads_websites.push(item);
        //console.log(this.ads_websites)
    };
    SettingsComponent.prototype.onAdsWebsitesSelectAll = function (items) {
        this.ads_websites = [];
        this.ads_websites = items;
        //console.log(this.ads_websites);
    };
    SettingsComponent.prototype.onAdsWebsitesDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.ads_websites.length; i++) {
            if (this.ads_websites[i]['item_id'] == item.item_id) {
                this.ads_websites.splice(i, 1);
            }
        }
        //console.log(this.ads_websites)
    };
    SettingsComponent.prototype.onAdsWebsitesDeSelectAll = function () {
        this.ads_websites = [];
        //console.log(this.ads_websites)
    };
    SettingsComponent.prototype.onAppsSelect = function (item) {
        this.apps.push(item);
        //console.log(this.apps)
    };
    SettingsComponent.prototype.onAppsSelectAll = function (items) {
        this.apps = [];
        this.apps = items;
        //console.log(this.apps);
    };
    SettingsComponent.prototype.onAppsDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.apps.length; i++) {
            if (this.apps[i]['item_id'] == item.item_id) {
                this.apps.splice(i, 1);
            }
        }
        //console.log(this.apps)
    };
    SettingsComponent.prototype.onAppsDeSelectAll = function () {
        this.apps = [];
        //console.log(this.apps)
    };
    SettingsComponent.prototype.onDevicesSelect = function (item) {
        this.devices.push(item);
        //console.log(this.devices)
    };
    SettingsComponent.prototype.onDevicesSelectAll = function (items) {
        //console.log(items);
        this.devices = [];
        this.devices = items;
    };
    SettingsComponent.prototype.onDevicesDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.devices.length; i++) {
            if (this.devices[i]['item_id'] == item.item_id) {
                this.devices.splice(i, 1);
            }
        }
        //console.log(this.devices)
    };
    SettingsComponent.prototype.onDeSelectAllDevices = function () {
        this.devices = [];
        //console.log(this.devices)
    };
    SettingsComponent.prototype.onSexeSelect = function (item) {
        this.sexes.push(item);
        //console.log(this.sexes)
    };
    SettingsComponent.prototype.onSexeSelectAll = function (items) {
        //console.log(items);
        this.sexes = [];
        this.sexes = items;
    };
    SettingsComponent.prototype.onSexeDeSelect = function (item) {
        //console.log(item)
        for (var i = 0; i < this.sexes.length; i++) {
            if (this.sexes[i]['item_id'] == item.item_id) {
                this.sexes.splice(i, 1);
            }
        }
        //console.log(this.sexes)
    };
    SettingsComponent.prototype.onDeSelectAllSexe = function () {
        this.sexes = [];
        //console.log(this.sexes)
    };
    SettingsComponent.prototype.onZoneSelect = function (item) {
        this.selectedZones = [];
        this.selectedZones.push(item);
        //console.log(this.selectedZones)
    };
    /*   onZoneSelectAll(items: any) {
        //console.log(items);
      } */
    SettingsComponent.prototype.onZoneDeSelect = function (item) {
        //console.log(item)
        this.selectedZones = [];
        //console.log(this.selectedZones)
    };
    /*   onDeSelectAllZone() {
        this.zones = []
        //console.log(this.zones)
      } */
    SettingsComponent.prototype.parseDate = function (str) {
        var mdy = str.split('/');
        return new Date(mdy[2], mdy[1], mdy[0]);
    };
    SettingsComponent.prototype.datediff = function (first, second) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((second - first) / (1000 * 60 * 60 * 24));
    };
    SettingsComponent.prototype.getData = function () {
        // ['added', 'modified', 'removed']
        return this.adGroupCollection.snapshotChanges().pipe(operators_1.map(function (actions) {
            return actions.map(function (a) {
                var data = a.payload.doc.data();
                return __assign({ id: a.payload.doc.id }, data);
            });
        }));
    };
    SettingsComponent.prototype.addAdGroup = function () {
        var _this = this;
        this.isCreating = true;
        var name = $('#adgroup').val();
        this.adGroupService.addAdGroup(this.id_campagne, this.uid, name).then(function (res) {
            if (res != "error") {
                _this.isCreating = false;
                _this.isAdGroup = false;
            }
        }).catch(function (err) {
            _this.isCreating = false;
            alert('Opération échouée');
        });
    };
    SettingsComponent.prototype.onDateStartChange = function (args) {
        var _this = this;
        var DATE = args.value.toString().split(' ');
        //console.log(DATE)
        var parsed = JSON.parse(JSON.stringify(MONTH));
        var DATE_ELEMENT = parsed[0][DATE[1]];
        var day = DATE[2];
        var month = DATE_ELEMENT.number;
        var years = DATE[3];
        this.startDate = day + "/" + month + "/" + years + " ";
        var date = "" + years + month + day;
        this.isCreating = true;
        this.notesService.getCampaignDates(this.id_campagne, this.name).then(function (value) {
            if (value['startDate'] == date || value['endDate'] == date) {
                alert('erreur de date de début');
                _this.isCreating = false;
            }
            else {
                _this.notesService.updateStartDate(_this.id, _this.id_campagne, date, _this.startDate);
                _this.isCreating = false;
            }
        });
    };
    /*  onEndDateChange(args) {
     var DATE = args.value.toString().split(' ')
     
       var parsed = JSON.parse(JSON.stringify(MONTH))
       var DATE_ELEMENT = parsed[0][DATE[1]]
       var day = DATE[2]
       var month = DATE_ELEMENT.number
       var years = DATE[3]
   
   
       this.endDate = `${day}/${month}/${years} `
       var date = `${years}${month}${day}`
       this.isCreating = true
       this.notesService.getCampaignDates(this.id_campagne, this.name).then(value => {
   
    
         if (value['startDate'] == date || value['endDate'] == date) {
       
             this.isCreating = false
           alert('erreur de date de fin')
           
   
         } else {
           this.notesService.updateEndDate(this.id, this.id_campagne, date, this.endDate)
   
           this.isCreating = false
         }
   
       })
     } */
    SettingsComponent.prototype.openAddLocation = function () {
        this.isCiblage = true;
    };
    SettingsComponent.prototype.closeAddLocation = function () {
        this.isCiblage = false;
    };
    SettingsComponent.prototype.targetZones = function () {
        var _this = this;
        this.isCreating = true;
        this.notesService.targetLocation(this.id, this.id_campagne, this.name, this.selectedZones).then(function (res) {
            _this.isCiblage = false;
            _this.isCreating = false;
        });
    };
    SettingsComponent.prototype.updateTargetZones = function () {
        var _this = this;
        this.isCreating = true;
        this.notesService.updateTargetLocation(this.id, this.id_campagne, this.name, this.selectedZones).then(function (res) {
            _this.isCiblage = false;
            _this.isCreating = false;
        });
    };
    SettingsComponent.prototype.toggleAddNewAdGroup = function () {
        this.isAdGroup = true;
    };
    SettingsComponent.prototype.closeAddAdGroup = function () {
        this.isAdGroup = false;
    };
    SettingsComponent.prototype.updateCampaign = function () {
        var _this = this;
        //console.log(this.id_campagne)
        //console.log(this.name)
        sweetalert2_1.default.fire({
            title: '',
            type: 'info',
            html: ' <div class="card shadow no-b r-0"><div class="card-header text-center white b-0"><h6>Modifier la campagne</h6></div>' +
                ' <div class="card-body"><form class="needs-validation" novalidate><div class="form-row">' +
                '<div class="col-md-6"> <label for="validationCustom01">Nom</label> <input type="text" class="form-control"  placeholder="Nom de la campagne" id="campagne_name" value=' + this.name + ' required><div class="valid-feedback">Looks good!</div></div>' +
                '<div class="col-md-6"> <label for="validationCustom01">Status</label>  <select class="custom-select select2" required><option value=""></option> <option value="PAUSED">Désactiver</option><option value="ENABLED">Activer</option> </select></div>' +
                '</form></div></div></div>',
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: '<i class="icon-check"></i> Valider',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText: '<i class="icon-remove"></i>',
            cancelButtonAriaLabel: 'Annuler',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            allowOutsideClick: function () { return !sweetalert2_1.default.isLoading(); }
        }).then(function (result) {
            if (result.dismiss) {
                _this.isCreating = false;
            }
            else {
                var data = [];
                _this.isCreating = true;
                //Si nom inshangé et status inchangé
                if (_this.name == $("#campagne_name").val() && _this.status == $('.custom-select').val()) {
                    sweetalert2_1.default.fire({
                        title: 'Modification!',
                        text: 'Aucune modification détectée',
                        type: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    });
                    _this.isCreating = false;
                    //Si nom inchangé et status changé
                }
                else if (_this.name == $("#campagne_name").val() && _this.status != $('.custom-select').val() && $('.custom-select').val() != "") {
                    data.push({
                        "id": _this.id_campagne,
                        "name": $('#campagne_name').val(),
                        "last_name": _this.name,
                        "email": _this.email,
                        "status": $('.custom-select').val(),
                        "state": "1"
                    });
                    $.ajax({
                        type: "POST",
                        url: SERVER_URL + "/updateCampaign",
                        datatype: "json",
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                    }).then(function (response) {
                        //console.log(response)
                        if (response[0].status != "error") {
                            _this.notesService.updateNote(_this.id, {
                                status: response[0].status
                            });
                            _this.isCreating = false;
                            sweetalert2_1.default.fire({
                                title: 'Modification!',
                                text: 'Status de la campagne modifié avec succès.',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                _this.isCreating = false;
                                if (result.value) {
                                    window.location.reload();
                                }
                            });
                        }
                        else {
                            _this.isCreating = false;
                            sweetalert2_1.default.fire({
                                title: 'Erreur!',
                                text: "Erreur serveur, Réssayer",
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            });
                        }
                    });
                    //Si nom changé et status inchangé
                }
                else if (_this.name != $("#campagne_name").val() && _this.status == $('.custom-select').val()) {
                    data.push({
                        "id": _this.id_campagne,
                        "name": $('#campagne_name').val(),
                        "last_name": _this.name,
                        "email": _this.email,
                        "status": _this.status,
                        "state": "2"
                    });
                    $.ajax({
                        type: "POST",
                        url: SERVER_URL + "/updateCampaign",
                        datatype: "json",
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                    }).then(function (response) {
                        //console.log(response)
                        if (response[0].status != "error") {
                            _this.notesService.updateNote(_this.id, {
                                name: response[0].name
                            });
                            _this.isCreating = false;
                            sweetalert2_1.default.fire({
                                title: 'Modification!',
                                text: 'Nom de la campagne modifié avec succès.',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                if (result.value) {
                                    window.location.reload();
                                }
                            });
                        }
                        else {
                            _this.isCreating = false;
                            sweetalert2_1.default.fire({
                                title: 'Erreur!',
                                text: "Erreur serveur, Réssayer",
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            });
                        }
                    });
                    //Si nom et status modifés
                }
                else if (_this.name != $("#campagne_name").val() && _this.status != $('.custom-select').val() && $('.custom-select').val() != "" && $("#campagne_name").val() != "") {
                    data.push({
                        "id": _this.id_campagne,
                        "name": $('#campagne_name').val(),
                        "last_name": _this.name,
                        "email": _this.email,
                        "status": $('.custom-select').val(),
                        "state": "3"
                    });
                    $.ajax({
                        type: "POST",
                        url: SERVER_URL + "/updateCampaign",
                        datatype: "json",
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                    }).then(function (response) {
                        //console.log(response)
                        if (response[0].status != "error") {
                            _this.notesService.updateNote(_this.id, {
                                name: response[0].name,
                                status: response[0].status
                            });
                            sweetalert2_1.default.fire({
                                title: 'Modification!',
                                text: 'Le nom et le status de votre campagne ont été modifié avec succès.',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                if (result.value) {
                                    window.location.reload();
                                }
                            });
                        }
                        else {
                            _this.isCreating = false;
                            sweetalert2_1.default.fire({
                                title: 'Erreur!',
                                text: "Erreur serveur, Réssayer",
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            });
                        }
                    });
                    //Si nom changé et status vide
                }
                else if (_this.name != $("#campagne_name").val() && $('.custom-select').val() == "") {
                    data.push({
                        "id": _this.id_campagne,
                        "name": $('#campagne_name').val(),
                        "last_name": _this.name,
                        "email": _this.email,
                        "status": _this.status,
                        "state": "4"
                    });
                    $.ajax({
                        type: "POST",
                        url: SERVER_URL + "/updateCampaign",
                        datatype: "json",
                        contentType: 'application/json',
                        data: JSON.stringify(data),
                    }).then(function (response) {
                        //console.log(response)
                        if (response[0].status != "error") {
                            _this.notesService.updateNote(_this.id, {
                                name: response[0].name
                            });
                            _this.isCreating = false;
                            sweetalert2_1.default.fire({
                                title: 'Modification!',
                                text: 'Nom de la campagne a été modifié avec succès.',
                                type: 'success',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            }).then(function (result) {
                                if (result.value) {
                                    window.location.reload();
                                }
                            });
                        }
                        else {
                            _this.isCreating = false;
                            sweetalert2_1.default.fire({
                                title: 'Erreur!',
                                text: "Erreur serveur, Réssayer",
                                type: 'error',
                                showCancelButton: false,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Ok'
                            });
                        }
                    });
                }
                else if ($("#campagne_name").val() == "" && $('.custom-select').val() == "") {
                    sweetalert2_1.default.fire({
                        title: 'Modification!',
                        text: 'Aucune Modification détectée',
                        type: 'warning',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    });
                }
                else {
                    _this.isCreating = false;
                    sweetalert2_1.default.fire({
                        title: 'Errur!',
                        text: 'Données invalides',
                        type: 'error',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    });
                }
            }
        });
    };
    SettingsComponent.prototype.changeAdGroupStatus = function (id, adgroup_id, last_status) {
        var _this = this;
        sweetalert2_1.default.fire({
            title: "Status groupe d'annonce",
            text: "Voulez vous modifier le status de votre groupe d'annonce!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, modifier!'
        }).then(function (result) {
            if (result.value) {
                /*  */
                _this.isCreating = true;
                _this.http.post(SERVER_URL + '/updateAdGroupStatus', {
                    'adgroup_id': adgroup_id,
                    'last_status': last_status
                })
                    .subscribe(function (res) {
                    //console.log(res)
                    _this.adGroupService.updateAdgroup(id, {
                        status: res['status_adgroup']
                    }).then(function (res) {
                        sweetalert2_1.default.fire('Modifier!', 'Status du groupe modifié.', 'success').then(function (res) {
                            _this.isCreating = false;
                        });
                    });
                }, function (err) {
                    _this.isCreating = false;
                    sweetalert2_1.default.fire({
                        title: "Service Groupe d'annonce!",
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
        });
    };
    SettingsComponent.prototype.removeAdGroup = function (id, adgroup_id) {
        var _this = this;
        sweetalert2_1.default.fire({
            title: "Service groupe d'annonce",
            text: "Voulez vous supprimer votre groupe d'annonce!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!'
        }).then(function (result) {
            if (result.value) {
                /*  */
                _this.isCreating = true;
                _this.http.post(SERVER_URL + '/deleteAdGroup', {
                    'adgroup_id': adgroup_id,
                })
                    .subscribe(function (res) {
                    //console.log(res)
                    _this.adGroupService.deleteAdGroup(id).then(function (res) {
                        sweetalert2_1.default.fire('Supprimer!', "Groupe d'annonce supprimé avec succès!", 'success').then(function (res) {
                            _this.isCreating = false;
                        });
                    });
                }, function (err) {
                    _this.isCreating = false;
                    sweetalert2_1.default.fire({
                        title: "Service Groupe d'annonce!",
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
        });
    };
    SettingsComponent.prototype.getListIdAdGroup = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.adGroupService.getListAdGroup(_this.id_campagne).forEach(function (child) {
                //console.log(child)
                if (child.length == 0) {
                    //console.log("aucun groupe d'annonce")
                    _this.ad_groups_list_id = [];
                    _this.ad_group_tab_content = [];
                }
                else if (child.length == 1) {
                    //console.log("un seul groupe")
                    _this.ad_groups_list_id.push(child[0]['id']);
                    _this.ad_group_tab_content.push(child[0]["ad_group_id"]);
                }
                else {
                    //console.log('plusieurs groupes')
                    for (var i = 0; i < child.length; i++) {
                        //console.log(`child i ${child[i]}`)
                        _this.ad_groups_list_id.push(child[i]['id']);
                        _this.ad_group_tab_content.push(child[i]["ad_group_id"]);
                    }
                }
                /*  this.ad_group_tab_content.push(child[i]["ad_group_id"])
                  this.ad_groups_list_id.push(child[i]['id']) */
                /* if (child.length > 0) {
                  //console.log(child)
                  child.forEach(element => {
                    //console.log(element['id'])
                   
                  })
                  
                } */
                resolve('ok');
            });
        });
    };
    SettingsComponent.prototype.getListIdAd = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.getListIdAdGroup().then(function (res) {
                for (var i = 0; i < _this.ad_group_tab_content.length; i++) {
                    _this.adsService.getListAd(_this.ad_group_tab_content[i]).forEach(function (child) {
                        if (child.length == 0) {
                            //console.log("aucune annonce")
                            _this.ads_list_id = [];
                            //this.ad_group_tab_content = []
                        }
                        else if (child.length == 1) {
                            //console.log("une seule annonce")
                            _this.ads_list_id.push(child[0]['id']);
                        }
                        else {
                            //console.log('plusieurs annonces')
                            for (var i_1 = 0; i_1 < child.length; i_1++) {
                                _this.ads_list_id.push(child[i_1]['id']);
                            }
                        }
                    });
                }
                resolve('ok');
            });
            /*      */
        });
    };
    SettingsComponent.prototype.deleteCampaign = function () {
        var _this = this;
        sweetalert2_1.default.fire({
            title: 'Vous voulez vraiment supprimer cette campagne?',
            text: "Cette action sera irréversible!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimer!'
        }).then(function (result) {
            if (result.value) {
                var data = {
                    "id": _this.id_campagne
                };
                $.ajax({
                    type: "POST",
                    url: SERVER_URL + "/deleteCampaign",
                    datatype: "json",
                    contentType: 'application/json',
                    success: function (response) {
                        //console.log(response)
                        if (response.status == "ok") {
                            //console.log(response.handler)
                        }
                    },
                    error: function (err) {
                        //console.log(err)
                    },
                    data: JSON.stringify(data),
                }).then(function (res) {
                    _this.getListIdAd().then(function (res) {
                        //console.log(this.ad_groups_list_id)
                        _this.notesService.deleteNote(_this.id, _this.ad_groups_list_id, _this.ads_list_id);
                    });
                    sweetalert2_1.default.fire({
                        title: 'Supprimer!',
                        text: 'Votre campagne a été supprimée avec succès.',
                        type: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Ok'
                    }).then(function (result) {
                        if (result.value) {
                            window.location.reload();
                        }
                    });
                }).catch(function (err) {
                    sweetalert2_1.default.fire('Erreur!', 'Une erreur est survenue lors de la suppression de votre campagne', 'error');
                });
            }
        });
    };
    SettingsComponent.prototype.goAdGroups = function (ad_group_name, idA, ad_group_id) {
        this.router.navigate(['ads', ad_group_name, this.id, idA, ad_group_id, this.id_campagne]);
    };
    SettingsComponent.prototype.handleErrorBudget = function () {
        $('#error_budget').hide();
    };
    SettingsComponent.prototype.OpenModifyDateCampaign = function () {
        this.button_payments = false;
        this.modifyDate = true;
        this.isSetBudget = false;
        this.isAccountRechargement = false;
        this.isPlacementBudgetFromAccount = false;
        $("#finalButtonPublier").hide();
        $("#dateBlock").hide();
    };
    SettingsComponent.prototype.CloseUpdateCampaignDate = function () {
        this.modifyDate = false;
        this.button_payments = true;
        $("#finalButtonPublier").show();
        $("#dateBlock").show();
    };
    SettingsComponent.prototype.CloseBudgetOperation = function () {
        this.isSetBudget = false;
        this.button_payments = true;
    };
    SettingsComponent.prototype.ClosePlaceBudgetFromAccountValue = function () {
        this.isPlacementBudgetFromAccount = false;
        this.button_payments = true;
    };
    SettingsComponent.prototype.CloseRechargeAccountOperation = function () {
        this.isAccountRechargement = false;
        this.button_payments = true;
    };
    SettingsComponent.prototype.onEndDateChange = function (args) {
        //console.log(args.value)
        if (args.value != undefined) {
            this.newEndDate = args.value.toString();
        }
        else {
            this.newEndDate = "";
        }
    };
    SettingsComponent.prototype.onStartDateChange = function (args) {
        //console.log(args.value)
        if (args.value != undefined) {
            this.newStartDate = args.value.toString();
            //console.log(this.newStartDate)
        }
        else {
            this.newStartDate = "";
        }
    };
    SettingsComponent.prototype.updateCampaignDate = function () {
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
                                    _this.notesService.updateStartDate(_this.id, _this.id_campagne, date_start, _this.UpdatedStartDate).then(function (res) {
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
                                    _this.notesService.updateStartDate(_this.id, _this.id_campagne, date_start, _this.UpdatedStartDate).then(function (res) {
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
                                _this.notesService.updateEndDate(_this.id, _this.id_campagne, date_end, _this.UpdatedEndDate).then(function (res) {
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
                                    _this.notesService.updateEndDate(_this.id, _this.id_campagne, date_end, _this.UpdatedEndDate).then(function (res) {
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
                                    _this.notesService.updateEndDate(_this.id, _this.id_campagne, date_end, _this.UpdatedEndDate).then(function (res) {
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
                        _this.notesService.updateEndDate(_this.id, _this.id_campagne, date_end, _this.UpdatedEndDate).then(function (res) {
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
                        _this.notesService.updateEndDate(_this.id, _this.id_campagne, date_end, _this.UpdatedEndDate).then(function (res) {
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
                            _this.notesService.updateDates(_this.id, _this.id_campagne, date_start, _this.UpdatedStartDate, date_end, _this.UpdatedEndDate).then(function (res) {
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
                            _this.notesService.updateDates(_this.id, _this.id_campagne, date_start, _this.UpdatedStartDate, date_end, _this.UpdatedEndDate).then(function (res) {
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
                            _this.notesService.updateDates(_this.id, _this.id_campagne, date_start, _this.UpdatedStartDate, date_end, _this.UpdatedEndDate).then(function (res) {
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
    SettingsComponent.prototype.listCampagne = function () {
        this.router.navigate(['CampaignList']).then(function (value) {
            if (value === true) {
                window.location.replace(environment_1.SERVER.url_redirect);
            }
        });
    };
    SettingsComponent.prototype.setStartDate = function () {
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
                _this.notesService.updateStartDate(_this.id, _this.id_campagne, date, _this.UpdatedStartDate);
                //console.log(this.id)
                resolve('ok');
            }
        });
    };
    SettingsComponent.prototype.setEndDate = function () {
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
                _this.notesService.updateEndDate(_this.id, _this.id_campagne, date, _this.UpdatedEndDate);
                resolve('ok');
            }
        });
    };
    SettingsComponent.prototype.handleSimulatedImpressionsCount = function () {
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
    SettingsComponent.prototype.handleIfValide = function () {
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
    SettingsComponent.prototype.handleIfBudgetToPlaceFromAccountIsValid = function () {
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
    SettingsComponent.prototype.handleBudgetPlacement = function () {
        var _this = this;
        this.isAccountRechargement = false;
        this.isPlacementBudgetFromAccount = false;
        this.button_payments = false;
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
    SettingsComponent.prototype.handlePlaceBudgetFromSolde = function () {
        var _this = this;
        this.isAccountRechargement = false;
        this.isSetBudget = false;
        this.button_payments = false;
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
    SettingsComponent.prototype.handleAccountRechargement = function () {
        this.modifyDate = false;
        this.isSetBudget = false;
        this.isPlacementBudgetFromAccount = false;
        this.button_payments = false;
        this.isAccountRechargement = true;
    };
    SettingsComponent.prototype.defineBudget = function () {
        var self = this;
        /*  $('#button_modal_define_budget').trigger('click') */
        var self = this;
        this.isCreating = true;
        setTimeout(function () {
            var btn = document.getElementById("budgetSet");
            var selector = pQuery(btn);
            (new PayExpresse({
                item_id: 1,
            })).withOption({
                requestTokenUrl: SERVER_URL + '/Budget/' + self.id + "/" + self.id_campagne + "/" + self.budgetId + "/" + self.montant + "/" + self.budget_to_place + "/" + self.dure_campagne,
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
    SettingsComponent.prototype.defineBudgetFromAccount = function () {
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
                _this.notesService.updateNote(_this.id, { budget: _this.budget_to_place, dailyBudget: res[0]['dailyBudget'] }).then(function () {
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
    SettingsComponent.prototype.defineAmountAccountBeforeBudget = function () {
        var self = this;
        this.montant = $("#montant").val();
        if (this.montant < 20000) {
            $('#error_recharge').show();
        }
        else {
            var crypt = this.cryptMoney(this.montant.toString());
            $('#closeModalRecharge').trigger('click');
            var self = this;
            this.isCreating = true;
            setTimeout(function () {
                var btn = document.getElementById("budgetSet");
                var selector = pQuery(btn);
                (new PayExpresse({
                    item_id: 1,
                })).withOption({
                    requestTokenUrl: SERVER_URL + '/rechargeAmountBeforeBudget/' + self.montant + "/" + self.id + "/" + crypt,
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
                        self.isCreating = false;
                    },
                    didReceiveNonSuccessResponse: function (jsonResponse) {
                        //console.log('non success response ', jsonResponse);
                        alert(jsonResponse.errors);
                        selector.prop('disabled', false);
                        self.isCreating = false;
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SettingsComponent.prototype, "id_campagne", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SettingsComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SettingsComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SettingsComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SettingsComponent.prototype, "ad_group_id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], SettingsComponent.prototype, "uid", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SettingsComponent.prototype, "budget", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SettingsComponent.prototype, "budgetId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SettingsComponent.prototype, "dailyBudget", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SettingsComponent.prototype, "numberOfDays", void 0);
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'app-settings',
            templateUrl: './settings.component.html',
            styleUrls: ['./settings.component.css']
        }),
        __metadata("design:paramtypes", [notes_service_1.NotesService, auth_service_1.AuthService, ad_groupe_service_1.AdGroupService, http_1.HttpClient, firestore_1.AngularFirestore, router_1.Router, ads_service_1.Ads])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map