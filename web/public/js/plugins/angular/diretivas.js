angular.module('diretivas', [])
      .directive('ngUnique', ['$http', function ($http) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ctrl) {
                elem.bind('keyup', function (evt) {
                    ctrl.$setValidity('unique', true);

                    if (elem.val().length < 6)
                        return;

                    var data = {
                        usuario: elem.val()
                    };
                            
                    $http.post(attrs.ngUnique, data).then(function (data) {
                        ctrl.$setValidity('unique', true);
                    }, function (erro) {
                        ctrl.$setValidity('unique', false);
                    });
                });
            }
        }
    }]);