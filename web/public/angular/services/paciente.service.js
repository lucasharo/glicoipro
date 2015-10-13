(function () {
    'use strict';

    angular
        .module('app')
        .factory('PacienteService', PacienteService);

    PacienteService.$inject = ['$http'];
    function PacienteService($http) {
        var service = {};

        service.pacientes = pacientes;
        service.medicoes = medicoes;

        return service;

        function pacientes() {
            return $http.get('/listarPacientes').then(handleSuccess, handleError('Erro ao listar pacientes'));
        }
        
        function medicoes(paciente) {
            return $http.get('/listarMedicoes/' + paciente).then(handleSuccess, handleError('Erro ao listar medições'));
        }

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

        function Update(user) {
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
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
