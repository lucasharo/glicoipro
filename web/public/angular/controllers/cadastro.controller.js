(function () {
    'use strict';

    angular
        .module('app')
        .controller('CadastroController', CadastroController);

    CadastroController.$inject = ['MedicoService', '$location', '$rootScope', 'FlashService', 'AuthenticationService'];
    function CadastroController(MedicoService, $location, $rootScope, FlashService, AuthenticationService) {
        var vm = this;
                
        vm.cadastrar = cadastrar;
        vm.adicionarCampoTelefone = adicionarCampoTelefone;
        vm.excluirCampoTelefone = excluirCampoTelefone;
        
        vm.medico = {
            nome: "",
            email: "",
            crm: "",
            usuario: "",
            telefones: []
        }

        function adicionarCampoTelefone(){
            vm.telefones.push({
                i: vm.telefones.length + 1,
                num: "", 
                tipo: 1 
            });
        }
        
        function excluirCampoTelefone(telefone) {
            for(var i = 0; i < vm.telefones.length; i++){
                if (vm.telefones[i].i === telefone.i) {                    
                    return vm.telefones.splice(i, 1);
                }
            }
        }
         
        function cadastrar() {
            vm.senhas = false;
            if (vm.confirmaSenha != vm.medico.senha){
                vm.senhas = true;
                return false;
            }
            
            telefones();
            
            vm.dataLoading = true;
            MedicoService.cadastrar(vm.medico)
                .then(function (response) {
                    if (response.success) {
                        FlashService.Success('Cadastro efetuado com sucesso!', true);
                    AuthenticationService.setCredentials(vm.medico);
                    vm.dataLoading = false;
                        window.location = '/';
                        $location.path('/');
                    } else {
                        FlashService.Error(response.message);
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
        vm.telefone = { num: "", tipo: 1 };
    }
})();
