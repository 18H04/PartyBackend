﻿var ctxfolder = "/views/admin/fundsHome";
var ctxfolderMessage = "/views/message-box";

var app = angular.module('App_ESEIM', ["ui.bootstrap", "ngRoute", "ngValidate", "datatables", "datatables.bootstrap", 'datatables.colvis', "ui.bootstrap.contextMenu", 'datatables.colreorder', 'angular-confirm', "ngJsTree", "treeGrid", "ui.select", "ngCookies", "pascalprecht.translate", 'ng.jsoneditor', 'dynamicNumber']).
    directive("filesInput", function () {
        return {
            require: "ngModel",
            link: function postLink(scope, elem, attrs, ngModel) {
                elem.on("change", function (e) {
                    var files = elem[0].files;
                    ngModel.$setViewValue(files);
                });
            }
        }
    });
app.factory('dataservice', function ($http) {
    $http.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    var headers = {
        "Content-Type": "application/json;odata=verbose",
        "Accept": "application/json;odata=verbose",
    }
    var submitFormUpload = function (url, data, callback) {
        var req = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': undefined
            },
            data: data
        }

        $http(req).then(callback);
    };
    return {
        getCountProject: function (callback) {
            $http.get('/Admin/DashBoard/GetCountProject').then(callback);
        },
        amchartCountBuy: function (callback) {
            $http.get('/Admin/DashBoard/AmchartCountBuy').then(callback);
        },
        amchartCountSale: function (callback) {
            $http.get('/Admin/DashBoard/AmchartCountSale').then(callback);
        },
        amchartWorkFlow: function (callback) {
            $http.get('/Admin/DashBoard/AmchartWorkFlow/').then(callback);
        },
        AmchartPieSale: function (data, callback) {
            $http.post('/Admin/DashBoard/AmchartPieSale/', data).then(callback);
        },
        AmchartCountCustomers: function (callback) {
            $http.post('/Admin/DashBoard/AmchartCountCustomers').then(callback);
        },
        AmchartCountSupplier: function (callback) {
            $http.post('/Admin/DashBoard/AmchartCountSupplier').then(callback);
        },
        AmchartPieCustomers: function (data, callback) {
            $http.post('/Admin/DashBoard/AmchartPieCustomers/', data).then(callback);
        },
        AmchartPieSupplier: function (data, callback) {
            $http.post('/Admin/DashBoard/AmchartPieSupplier/', data).then(callback);
        },
        AmchartCountProject: function (callback) {
            $http.post('/Admin/DashBoard/AmchartCountProject').then(callback);
        },
        AmchartPieProject: function (data, callback) {
            $http.post('/Admin/DashBoard/AmchartPieProject/', data).then(callback);
        },
        AmchartCountEmployees: function (callback) {
            $http.post('/Admin/DashBoard/AmchartCountEmployees').then(callback);
        },
        getWorkFlow: function (callback) {
            $http.post('/Admin/DashBoard/GetWorkFlow').then(callback);
        },
        getCardInBoard: function (data, callback) {
            $http.post('/Admin/DashBoard/GetCardInBoard?ObjCode=' + data).then(callback);
        },
        getSystemLog: function (data, callback) {
            $http.get('/Admin/DashBoard/GetSystemLog?type=' + data).then(callback);
        },
        getStaffKeeping: function (data, callback) {
            $http.post('/MapOnline/GetStaffKeeping/', data).then(callback);
        },
        getObjTypeJC: function (callback) {
            $http.get('/Admin/DashBoard/GetObjTypeJC').then(callback);
        },
        getObjTypeCode: function (data, callback) {
            $http.post('/Admin/CardJob/GetObjFromObjType?code=' + data).then(callback);
        },
        highchartFunds: function (callback) {
            $http.post('/Admin/DashBoard/HighchartFunds').then(callback);
        },
        highchartProds: function (callback) {
            $http.post('/Admin/DashBoard/HighchartProds').then(callback);
        },
        highchartAssets: function (data, callback) {
            $http.post('/Admin/DashBoard/highchartAssets', data).then(callback);
        },
        highchartPieAssets: function (data, callback) {
            $http.post('/Admin/DashBoard/GetAssetType', data).then(callback);
        },
        getAssetType: function (callback) {
            $http.post('/Admin/Asset/GetAssetType').then(callback);
        },
        getDepartment: function (callback) {
            $http.post('/Admin/User/GetDepartment/').then(callback);
        },
        getGroupUser: function (callback) {
            $http.post('/Admin/User/GetGroupUser/').then(callback);
        },
        getUser: function (callback) {
            $http.post('/Admin/User/GetListUser/').then(callback);
        },
        getRouteInOut: function (data, callback) {
            $http.post('/Admin/DashBoard/GetRouteInOut/', data).then(callback);
        },
        getCmsItemLastest: function (callback) {
            $http.get('/Admin/DashBoard/GetCmsItemLastest/').then(callback);
        },
        viewFileCms: function (data, data1, callback) {
            $http.post('/Admin/DashBoard/ViewFileCms?mode=' + data + '&url=' + data1).then(callback);
        },
        amchartProject: function (callback) {
            $http.get('/Admin/DashBoard/AmchartProject/').then(callback);
        },
        getCountCardWork: function (callback) {
            $http.get('/Admin/DashBoard/GetCountCardWork/').then(callback);
        },
        getActionCardWork: function (callback) {
            $http.get('/Admin/DashBoard/GetActionCardWork/').then(callback);
        },
        amchartCardWork: function (callback) {
            $http.get('/Admin/DashBoard/AmchartCardWork/').then(callback);
        },
        getCountSale: function (callback) {
            $http.get('/Admin/DashBoard/GetCountSale/').then(callback);
        },
        getCountBuyer: function (callback) {
            $http.get('/Admin/DashBoard/GetCountBuyer/').then(callback);
        },
        getActionUser: function (callback) {
            $http.get('/Admin/DashBoard/GetActionUser/').then(callback);
        },
        getBranAndDepartment: function (callback) {
            $http.get('/Admin/DashBoard/GetBranAndDepartment/').then(callback);
        },
        countAction: function (callback) {
            $http.get('/Admin/DashBoard/CountAction/').then(callback);
        },
        getCountWorkFlow: function (callback) {
            $http.get('/Admin/DashBoard/GetCountWorkFlow/').then(callback);
        },
        getCountAsset: function (callback) {
            $http.get('/Admin/DashBoard/GetCountAsset/').then(callback);
        },
        amchartAsset: function (callback) {
            $http.get('/Admin/DashBoard/AmchartAsset/').then(callback);
        },
        getGroupUser: function (callback) {
            $http.get('/Admin/DashBoard/GetGroupUser/').then(callback);
        },
        getActionUserGroup: function (callback) {
            $http.get('/Admin/DashBoard/GetActionUserGroup/').then(callback);
        },
        getActionCustomer: function (callback) {
            $http.get('/Admin/DashBoard/GetActionCustomer/').then(callback);
        },
        getCountCustomer: function (callback) {
            $http.get('/Admin/DashBoard/GetCountCustomer/').then(callback);
        },
        amchartCustomer: function (callback) {
            $http.get('/Admin/DashBoard/AmchartCustomer/').then(callback);
        },
        getActionSupplier: function (callback) {
            $http.get('/Admin/DashBoard/GetActionSupplier/').then(callback);
        },
        getCountSupplier: function (callback) {
            $http.get('/Admin/DashBoard/GetCountSupplier/').then(callback);
        },
        amchartSupplier: function (callback) {
            $http.get('/Admin/DashBoard/AmchartSupplier/').then(callback);
        },
        getCountFunds: function (callback) {
            $http.get('/Admin/DashBoard/GetCountFunds/').then(callback);
        },
        getActionFunds: function (callback) {
            $http.get('/Admin/DashBoard/GetActionFunds/').then(callback);
        },
        amchartFunds: function (callback) {
            $http.get('/Admin/DashBoard/AmchartFunds/').then(callback);
        },
        saveDashboardDataJson: function (data, callback) {
            $http.post('/Admin/DashBoard/SaveDashboardDataJson/', data).then(callback);
        },
        getDataJson: function (callback) {
            $http.get('/Admin/DashBoard/GetDataJson/').then(callback);
        },
        getCountFund: function (callback) {
            $http.post('/Admin/FundAccEntry/GetCountFund/').then(callback);
        }
    };
});

app.filter("fomartDateTime", function ($filter) {
    return function (date) {
        var dateNow = $filter('date')(new Date(), 'dd/MM/yyyy');
        var createDate = $filter('date')(new Date(date), 'dd/MM/yyyy');
        if (dateNow == createDate) {
            var today = new Date();
            var created = new Date(date);
            var diffMs = (today - created);
            var diffHrs = Math.floor((diffMs % 86400000) / 3600000);
            var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
            if (diffHrs <= 0) {
                if (diffMins <= 0) {
                    return 'Vừa xong';
                } else {
                    return diffMins + ' phút trước';
                }
            } else {
                return diffHrs + ' giờ ' + diffMins + ' phút trước.';
            }
        } else {
            return $filter('date')(new Date(date), 'dd/MM/yyyy lúc h:mma');
        }
    }
});

app.controller('Ctrl_ESEIM', function ($scope, $rootScope, $compile, $uibModal, dataservice, $cookies, $translate) {
    $rootScope.go = function (path) {
        $location.path(path); return false;
    };
    var culture = $cookies.get('_CULTURE') || 'vi-VN';
    $translate.use(culture);
    $rootScope.IsTranslate = false;
    $rootScope.$on('$translateChangeSuccess', function () {
        caption = caption[culture] ? caption[culture] : caption;
        $rootScope.IsTranslate = true;
    });

    $rootScope.user = {
        UserOnline: 0,
        PercentUserOnline: 0,
        UserActive: 0
    };

    $rootScope.listDepartment = [];
    $rootScope.listGroupUser = [];
    $rootScope.listUser = [];

    dataservice.getGroupUser(function (rs) {
        rs = rs.data;
        $rootScope.listGroupUser = rs;
    });

    dataservice.getUser(function (rs) {
        rs = rs.data;
        $rootScope.listUser = rs;
    });
});

app.config(function ($routeProvider, $validatorProvider, $translateProvider, $qProvider) {
    $translateProvider.useUrlLoader('/Admin/UserBusyOrFree/TranslationFundHome');
    caption = $translateProvider.translations();
    $qProvider.errorOnUnhandledRejections(false);
    $routeProvider
        .when('/', {
            templateUrl: ctxfolder + '/index.html',
            controller: 'index'
        })
        .when('/map', {
            templateUrl: ctxfolder + '/google-map.html',
            controller: 'google-map'
        })
        .when('/1', {
            templateUrl: ctxfolder + '/menu1.html',
            controller: 'index1'
        })
        .when('/2', {
            templateUrl: ctxfolder + '/menu2.html',
            controller: 'index'
        })
        .when('/3', {
            templateUrl: ctxfolder + '/menu3.html',
            controller: 'index'
        })

    $validatorProvider.setDefaults({
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function (error, element) {
            if (element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else if (element.prop('type') === 'radio' && element.parent('.radio-inline').length) {
                error.insertAfter(element.parent().parent());
            } else if (element.prop('type') === 'checkbox' || element.prop('type') === 'radio') {
                error.appendTo(element.parent().parent());
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
        }
    });
});

app.controller('index', function ($scope, $rootScope, $sce, $compile, $uibModal, DTOptionsBuilder, DTColumnBuilder, DTInstances, dataservice, $filter, $translate) {
    $scope.initBoxCard = function () {
        //quỹ
        window.tabler = {
            colors: {
                'blue': '#467fcf',
                'blue-darkest': '#0e1929',
                'blue-darker': '#1c3353',
                'blue-dark': '#3866a6',
                'blue-light': '#7ea5dd',
                'blue-lighter': '#c8d9f1',
                'blue-lightest': '#edf2fa',
                'azure': '#45aaf2',
                'azure-darkest': '#0e2230',
                'azure-darker': '#1c4461',
                'azure-dark': '#3788c2',
                'azure-light': '#7dc4f6',
                'azure-lighter': '#c7e6fb',
                'azure-lightest': '#ecf7fe',
                'indigo': '#6574cd',
                'indigo-darkest': '#141729',
                'indigo-darker': '#282e52',
                'indigo-dark': '#515da4',
                'indigo-light': '#939edc',
                'indigo-lighter': '#d1d5f0',
                'indigo-lightest': '#f0f1fa',
                'purple': '#a55eea',
                'purple-darkest': '#21132f',
                'purple-darker': '#42265e',
                'purple-dark': '#844bbb',
                'purple-light': '#c08ef0',
                'purple-lighter': '#e4cff9',
                'purple-lightest': '#f6effd',
                'pink': '#f66d9b',
                'pink-darkest': '#31161f',
                'pink-darker': '#622c3e',
                'pink-dark': '#c5577c',
                'pink-light': '#f999b9',
                'pink-lighter': '#fcd3e1',
                'pink-lightest': '#fef0f5',
                'red': '#e74c3c',
                'red-darkest': '#2e0f0c',
                'red-darker': '#5c1e18',
                'red-dark': '#b93d30',
                'red-light': '#ee8277',
                'red-lighter': '#f8c9c5',
                'red-lightest': '#fdedec',
                'orange': '#fd9644',
                'orange-darkest': '#331e0e',
                'orange-darker': '#653c1b',
                'orange-dark': '#ca7836',
                'orange-light': '#feb67c',
                'orange-lighter': '#fee0c7',
                'orange-lightest': '#fff5ec',
                'yellow': '#f1c40f',
                'yellow-darkest': '#302703',
                'yellow-darker': '#604e06',
                'yellow-dark': '#c19d0c',
                'yellow-light': '#f5d657',
                'yellow-lighter': '#fbedb7',
                'yellow-lightest': '#fef9e7',
                'lime': '#7bd235',
                'lime-darkest': '#192a0b',
                'lime-darker': '#315415',
                'lime-dark': '#62a82a',
                'lime-light': '#a3e072',
                'lime-lighter': '#d7f2c2',
                'lime-lightest': '#f2fbeb',
                'green': '#5eba00',
                'green-darkest': '#132500',
                'green-darker': '#264a00',
                'green-dark': '#4b9500',
                'green-light': '#8ecf4d',
                'green-lighter': '#cfeab3',
                'green-lightest': '#eff8e6',
                'teal': '#2bcbba',
                'teal-darkest': '#092925',
                'teal-darker': '#11514a',
                'teal-dark': '#22a295',
                'teal-light': '#6bdbcf',
                'teal-lighter': '#bfefea',
                'teal-lightest': '#eafaf8',
                'cyan': '#17a2b8',
                'cyan-darkest': '#052025',
                'cyan-darker': '#09414a',
                'cyan-dark': '#128293',
                'cyan-light': '#5dbecd',
                'cyan-lighter': '#b9e3ea',
                'cyan-lightest': '#e8f6f8',
                'gray': '#868e96',
                'gray-darkest': '#1b1c1e',
                'gray-darker': '#36393c',
                'gray-dark': '#6b7278',
                'gray-light': '#aab0b6',
                'gray-lighter': '#dbdde0',
                'gray-lightest': '#f3f4f5',
                'gray-dark': '#343a40',
                'gray-dark-darkest': '#0a0c0d',
                'gray-dark-darker': '#15171a',
                'gray-dark-dark': '#2a2e33',
                'gray-dark-light': '#717579',
                'gray-dark-lighter': '#c2c4c6',
                'gray-dark-lightest': '#ebebec'
            }
        };
        dataservice.getCountFunds(function (rs) {
            rs = rs.data;
            $scope.SumMoneyGive = rs.SumMoneyGive;
            $scope.SumMoneyPay = rs.SumMoneyPay;
            $scope.SumMoneyNeedGive = rs.SumMoneyNeedGive;
            $scope.SumMoneyNeedPay = rs.SumMoneyNeedPay;

        });
        dataservice.getActionFunds(function (rs) {
            rs = rs.data;
            $scope.lstActFun = rs;
        })

        dataservice.amchartFunds(function (rs) {
            rs = rs.data;
            monthfun = [];
            givefun = ['give'];
            payfun = ['pay'];

            for (var i = 0; i < rs.length; i++) {
                givefun.push(rs[i].give);
                payfun.push(rs[i].pay);
                monthfun.push(caption.FHC_LBL_MONTH + ' ' + (rs[i].Month));
            }
            setTimeout(function () {
                var format = d3.format(',.2f');
                var chart = c3.generate({

                    bindto: '#chart_funds', // id of chart wrapper
                    data: {
                        columns: [
                            // each columns data
                            givefun,
                            payfun,
                        ],
                        type: 'area', // default type of chart
                        colors: {
                            'give': tabler.colors["blue"],
                            'pay': tabler.colors["red"],

                        },
                        names: {
                            // name of each serie
                            'give': caption.FHC_LBL_TOTAL_REVENUE,
                            'pay': caption.FHC_LBL_TOTAL_EXPENDITURE,
                        }
                    },
                    axis: {
                        x: {
                            type: 'category',
                            // name of each category
                            categories: monthfun
                        },
                        y: {
                            tick: {
                                format: d3.format(',')
                                //or format: function (d) { return '$' + d; }
                            }
                        }
                    },
                    legend: {
                        show: true, //hide legend
                    },
                    padding: {
                        bottom: 0,
                        top: 0
                    },
                });

            }, 100);



        })

        dataservice.getCountFund(function (rs) {
            rs = rs.data;
            $scope.countFund = rs;
        })
    }

    $scope.initBoxCard();

    function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function showTime() {
        var date = new Date();
        var h = date.getHours(); // 0 - 23
        var m = date.getMinutes(); // 0 - 59
        var s = date.getSeconds(); // 0 - 59
        var session = "AM";

        if (h == 0) {
            h = 12;
        }

        if (h > 12) {
            h = h - 12;
            session = "PM";
        }

        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;

        var time = h + ":" + m + ":" + s + " " + session;
        document.getElementById("MyClockDisplay").innerText = time;
        document.getElementById("MyClockDisplay").textContent = time;

        //setTimeout(showTime, 1000);
    }
});
