(function () {
    'use strict';

    angular
        .module('app')
        .factory('MedicoService', MedicoService);

    MedicoService.$inject = ['$http'];
    function MedicoService($http) {
        var service = {};

        service.cadastrar = cadastrar;
        service.atualizar = atualizar;
        service.Delete = Delete;

        return service;
    
        function cadastrar(medico) {
            return $http.post('/cadastrarMedico', medico).then(function (data) {
                        data.success = true;
                        return data;
                        }, function (erro) {
                        return handleError(erro.data);
                   });
        }
        
        function atualizar(medico) {
            return $http.post('/atualizarMedico', medico).then(function (data) {
                data.success = true;
                return data;
            }, function (erro) {
                return handleError(erro.data);
            });
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        function handleSuccess(data) {
            data.success = true;
            return data;
        }

        function handleError(erro) {
            if (erro == "")
                erro = "Erro ao realizar comunicação com o servidor.";

            return { success: false, message: erro };
        }
    }
})();
