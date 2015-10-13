(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$rootScope', '$cookieStore', '$location', 'PacienteService'];
    function HomeController($rootScope, $cookieStore, $location, PacienteService) {
        var vm = this;
        
        $rootScope.menu = true;
        
        vm.medicoes = medicoes;        
        
        vm.pacientes = [];
        
        PacienteService.pacientes()
            .then(function (pacientes) {
                for (var i = 0; i < pacientes.data.length; i++) {
                    vm.pacientes.push({
                        nome: pacientes.data[i].nm,
                        usuario: pacientes.data[i].user,
                        telefone: formatarTelefone(pacientes.data[i].tel),
                        dtNascimento: pacientes.data[i].dtNasc,
                        sexo: pacientes.data[i].sex == 1 ? "Masculino" : "Feminino"
                    });
                }
        });
        
        function medicoes(paciente) {
            $cookieStore.put('paciente', paciente);

            $location.path('/medicao');
        }

        function formatarTelefone(telefone) {
            var telefoneFormatado;

            if (telefone.length == 11)
                telefoneFormatado = "(" + telefone.substring(0, 2) + ") " + telefone.substring(2, 7) + "-" + telefone.substring(7); 
            else
                telefoneFormatado = "(" + telefone.substring(0, 2) + ") " + telefone.substring(2, 6) + "-" + telefone.substring(6);

            return telefoneFormatado;
        }
    }
})();