(function(){
    var app = angular.module('myRadialApp',[]);
    app.directive('radialBar',['$animate',function($animate){
        return{
            require:"ngModel",
            link: function(scope,elem,attr,ctrl){
                var circle = angular.element(elem[0].querySelector('.progress-circle-move')),
                    circumference = 2*3.14*60,
                    dash = 0,
                    offset = 0;
                    
                ctrl.$render = function(){
                    dash = circumference * (ctrl.$modelValue / 100);
                    offset = circumference - dash;
                    console.log(circle[0].style);
                    circle.css({    
                        "stroke-dasharray": dash + " " + offset ,     
                        "stroke-dashoffset": circumference/4 ,
                    });
                    
                    scope.value = ctrl.$modelValue;
                };
            },
    
            templateUrl : '/directives/radial-bar/radial-bar.html',
        }
    }]);
    
})();