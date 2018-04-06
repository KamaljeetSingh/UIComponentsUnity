(function () {
    'use strict';

    var app = angular.module('myToggleApp', []);

    app.directive('onOffToggle', function () {
        return {
            require: "ngModel",
            scope: {
                value1: '@',
                value2: '@',
                onchange: '&?',
            },
            link: onOffLink,
            templateUrl: '/directives/on-off-switch/on-off-switch.html',
        };
    });

    function onOffLink($scope, elem, attr, ngCtrl) {

        var fullview = angular.element(elem[0].querySelector('div.full-view')),
            listeners = [];

        $scope.switchValue1 = attr.value1;
        $scope.switchValue2 = attr.value2;

        // Function binding
        $scope.moveDiv = moveDiv;
        $scope.changeValueDiv = changeValueDiv;
        $scope.$onDestroy = $onDestroy;

        if (!attr.value1)
            attr.value1 = 'Yes';

        if (!attr.value2)
            attr.value2 = 'No';

        function changeValueDiv() {
            ngCtrl.$setViewValue(!ngCtrl.$viewValue);
            if ($scope.onchange)
                $scope.onchange();
            $scope.moveDiv();
        }

        function moveDiv() {
            if (ngCtrl.$viewValue == false)
                fullview.addClass("moveleftt");
            else
                fullview.removeClass("moveleftt");
        }

        function $onDestroy() {
            listeners.forEach(unBind);
            console.log("Unbind all watchers/listeners");
        }

        function unBind(item) {
            item();
        }

        // so as to get ngModel value correctly on render
        ngCtrl.$render = function () {       
            moveDiv();
        }

        // watch always return its deregistered function
        listeners.push($scope.$watch(function () {        
            return ngCtrl.$modelValue;
        }, function (newValue) {
            console.log("Watch - " + newValue);
        }));

        // Destroy
        listeners.push($scope.$on('$destroy', $onDestroy));
    }
})();
