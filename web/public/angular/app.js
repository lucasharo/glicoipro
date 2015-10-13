(function () {
    'use strict';
    
    angular
        .module('app', ['ngRoute', 'ngCookies', 'ui.utils.masks', 'ui.bootstrap', 'chart.js', 'diretivas'])
        .config(config)
        .run(run);
    
    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
            controller: 'HomeController',
            templateUrl: 'angular/views/home.view.html',
            controllerAs: 'vm'
        })
            .when('/login', {
            controller: 'LoginController',
            templateUrl: 'angular/views/login.view.html',
            controllerAs: 'vm'
        })
            .when('/cadastro', {
            controller: 'CadastroController',
            templateUrl: 'angular/views/cadastro.view.html',
            controllerAs: 'vm'
        })
            .when('/perfil', {
            controller: 'PerfilController',
            templateUrl: 'angular/views/perfil.view.html',
            controllerAs: 'vm'
        })
            .when('/medicao', {
            controller: 'PacienteController',
            templateUrl: 'angular/views/paciente.view.html',
            controllerAs: 'vm'
        })
            .otherwise({ redirectTo: '/login' });
    }
    
    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'AuthenticationService'];
    function run($rootScope, $location, $cookieStore, $http, AuthenticationService) {
        $rootScope.location = $location;
        
        $rootScope.logout = function () {
            AuthenticationService.logout();
        }
        
        AuthenticationService.verificarUsuario();
    }
})();