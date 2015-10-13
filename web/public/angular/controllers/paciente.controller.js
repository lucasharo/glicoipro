(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('PacienteController', PacienteController);
    
    PacienteController.$inject = ['PacienteService', '$rootScope', '$cookieStore', '$filter', 'FlashService'];
    function PacienteController(PacienteService, $rootScope, $cookieStore, $filter, FlashService) {
        var vm = this;
        
        vm.grafico = grafico;
        
        vm.series = [];
        vm.labels = [];
        vm.medicoes = [[]];
        
        vm.date = new Date();
        
        vm.erroData = false;
        
        vm.paciente = $cookieStore.get('paciente');
        
        function grafico() {
            vm.erroData = false;
            if (vm.dtInicio > vm.dtFim) {
                vm.erroData = true;
                return false;
            }
            
            PacienteService.medicoes(vm.paciente.usuario)
            .then(function (paciente) {
                if (paciente.success) {
                    if (paciente.data.meds) {
                        var a = [];
                        for (var i = 0; i < paciente.data.meds.length; i++) {
                            if (paciente.data.meds[i].dtMed >= vm.dtInicio && paciente.data.meds[i].dtMed <= vm.dtFim) {
                                vm.labels.push($filter('date')(paciente.data.meds[i].dtMed, 'dd-MM-yyyy'));
                                vm.medicoes[0].push(paciente.data.meds[i].med);
                            }
                        }
                        
                        if (vm.medicoes[0].length > 0)
                            vm.series = ["Dados"];
                        else
                            FlashService.Error("Nenhuma medição nesse período.", true);
                    }
                }
            });
        }
        
        vm.onClick = function (points, evt) {
            console.log(points, evt);
        }
    }
})();