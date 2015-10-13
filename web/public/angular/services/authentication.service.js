(function () {
    'use strict';
    
    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);
    
    AuthenticationService.$inject = ['$http', '$location', '$cookieStore', '$rootScope', '$timeout', 'MedicoService'];
    function AuthenticationService($http, $location, $cookieStore, $rootScope, $timeout, MedicoService) {
        var service = {};
        
        service.login = login;
        service.logout = logout;
        service.setCredentials = setCredentials;
        service.clearCredentials = clearCredentials;
        service.verificarUsuario = verificarUsuario;
        
        return service;
        
        function verificarUsuario() {
            $rootScope.globals = $cookieStore.get('globals') || {};
            if ($rootScope.globals.medico) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.medico.authdata;
            }
            
            var loggedIn = $rootScope.globals.medico;
            
            if (!loggedIn) {
                if ($rootScope.location.$$path == '/login' || $rootScope.location.$$path == '/cadastro') {
                    $location.path($rootScope.location.$$path);
                } else {
                    $location.path('/login');
                }
            } else {
                if (!($rootScope.location.$$path == '/login' || $rootScope.location.$$path == '/cadastro')) {
                    $location.path($rootScope.location.$$path);
                } else {
                    $location.path('/');
                }
            }
        }
        
        function login(usuario, senha, callback) {
            $timeout(function () {
                var data = {
                    usuario: usuario,
                    senha: senha
                }
                
                $http.post('/login', data).
  					then(function (response) {
                    response.success = true;
                    callback(response);
                }, function (error) {
                    var erro = "Username ou senha inválidos.";
                    
                    if (error.data == "")
                        erro = "Erro ao realizar comunicação com o servidor.";
                    
                    callback({ success: false, message: erro });
                });
            }, 1000);
        }
        
        function logout() {
            clearCredentials();
            $location.path('/login');
        }
        
        function setCredentials(medico) {
            var authdata = base64.encode(medico.usuario + ':' + medico.senha);
            
            $rootScope.globals = {
                medico: {
                    nome: medico.nome,
                    email: medico.email,
                    crm: medico.crm,
                    usuario: medico.usuario,
                    telefones: medico.telefones,
                    authdata: authdata
                }
            }
            
            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
            $cookieStore.put('globals', $rootScope.globals);
        }
        
        function clearCredentials() {
            $rootScope.globals = {};
            $cookieStore.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic ';
        }
    }
    
    // Base64 encoding service used by AuthenticationService
    var base64 = {
        
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
        
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
            
            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                
                output = output +
                    this.keyStr.charAt(enc1) +
                    this.keyStr.charAt(enc2) +
                    this.keyStr.charAt(enc3) +
                    this.keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);
            
            return output;
        },
        
        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;
            
            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            
            do {
                enc1 = this.keyStr.indexOf(input.charAt(i++));
                enc2 = this.keyStr.indexOf(input.charAt(i++));
                enc3 = this.keyStr.indexOf(input.charAt(i++));
                enc4 = this.keyStr.indexOf(input.charAt(i++));
                
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                
                output = output + String.fromCharCode(chr1);
                
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
                
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);
            
            return output;
        }
    }
})();