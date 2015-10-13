(function () {
    'use strict';
    
    angular
        .module('app')
        .controller('PerfilController', PerfilController);
    
    PerfilController.$inject = ['MedicoService', '$location', '$rootScope', 'FlashService', 'AuthenticationService'];
    function PerfilController(MedicoService, $location, $rootScope, FlashService, AuthenticationService) {
        var vm = this;
        
        $rootScope.menu = false;
        
        vm.atualizar = atualizar;
        vm.adicionarCampoTelefone = adicionarCampoTelefone;
        vm.excluirCampoTelefone = excluirCampoTelefone;
        
        vm.medico = {
            nome: "",
            email: "",
            crm: "",
            usuario: "",
            telefones: []
        }
        
        function medico() {
            vm.medico.nome = $rootScope.globals.medico.nome;
            vm.medico.crm = $rootScope.globals.medico.crm;
            vm.medico.email = $rootScope.globals.medico.email;
            vm.medico.usuario = $rootScope.globals.medico.usuario;

            vm.telefone= {
                num: $rootScope.globals.medico.telefones[0].num,
                tipo: $rootScope.globals.medico.telefones[0].tipo
            }
            
            for (var i = 1; i < $rootScope.globals.medico.telefones.length; i++) {
                vm.telefones.push({
                    i: vm.telefones.length + 1,
                    num: $rootScope.globals.medico.telefones[i].num, 
                    tipo: $rootScope.globals.medico.telefones[i].tipo
                });
            }
        }
        
        function adicionarCampoTelefone() {
            vm.telefones.push({
                i: vm.telefones.length + 1,
                num: "", 
                tipo: 1
            });
        }
        
        function excluirCampoTelefone(telefone) {
            for (var i = 0; i < vm.telefones.length; i++) {
                if (vm.telefones[i].i === telefone.i) {
                    return vm.telefones.splice(i, 1);
                }
            }
        }
        
        function atualizar() {
            vm.senhas = false;
            if (vm.confirmaSenha != vm.medico.senha) {
                vm.senhas = true;
                return false;
            }
            
            telefones();
            
            vm.dataLoading = true;

            MedicoService.atualizar(vm.medico)
                .then(function (response) {
                if (response.success) {
                    FlashService.Success('Alteração efetuada com sucesso!', true);
                    console.log(response.data);
                    AuthenticationService.setCredentials(response.data);
                    vm.dataLoading = false;
                    $location.path("/");
                } else {
                    FlashService.Error(response.message, true);
                    vm.dataLoading = false;
                }
            });
        }
        
        var telefones = function () {
            vm.medico.telefones.push(vm.telefone);
            
            for (var i = 0; i < vm.telefones.length; i++) {
                if (vm.telefones[i].num.length > 0) {
                    var aux = {};
                    aux.num = vm.telefones[i].num;
                    aux.tipo = vm.telefones[i].tipo;
                    vm.medico.telefones.push(aux);
                }
            }
        }
                
        vm.tiposTelefone = [{ valor: 1, descricao: "Comercial" },
                            { valor: 2, descricao: "Celular" },
                            { valor: 3, descricao: "Residencial" }];
        vm.telefones = [];
        vm.telefone = {};

        medico();
    }
})();
