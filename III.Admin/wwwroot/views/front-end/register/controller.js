﻿var ctxfolder = "/views/front-end/register";
var app = angular.module('App_ESEIM', [ "ngRoute" ])
app.factory('dataservice', function ($http) {
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
        Register:function(data,callback){
            $http.post('/UserProfile/Register2',data).then(callback);
        }
    }
});

app.controller('Ctrl_ESEIM', function ($scope, $rootScope, $compile, dataservice) {
    
});

app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: ctxfolder + '/index.html',
            controller: 'index'
        })
});

app.controller('index', function ($scope, $rootScope, $compile, dataservice, $filter) {
    $scope.model={
        UserName:'huynq_test1',
        GivenName:'Nguyễn Quang Huy',
        PhoneNumber:'0397638979',
        Gender: false,
        Email: 'test_backend@gmail.com',
        Password:'123456',
        ConfrimPassword:'123456'
    }
    $scope.Register=function(){
        
        dataservice.Register($scope.model,function(rs){
            rs=rs.data;
            if(rs.Error){
                if (rs.Error) {
                    App.toastrError(rs.Title)
                } else {
                    App.toastrSuccess(rs.Title)
                }
            }
        })
    }
});

