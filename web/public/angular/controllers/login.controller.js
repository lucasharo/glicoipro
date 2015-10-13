(function () {	
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'MedicoService', '$rootScope'];
    function LoginController($location, AuthenticationService, FlashService, MedicoService, $rootScope) {
        var vm = this;

        vm.login = login;
        
        function login() {
            vm.dataLoading = true;
            AuthenticationService.login(vm.usuario, vm.senha, function (response) {
                if (response.success) {
                    AuthenticationService.setCredentials(response.data);
                    vm.dataLoading = false;
                    window.location = '/';
                    $location.path('/');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        }
    }
})();
