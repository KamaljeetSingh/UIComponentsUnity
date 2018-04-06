(function() {
    var app = angular.module('myBar', []);

    app.directive('dragBar', ['$window', function($window) {
        return {
            require: "ngModel",
            scope: {
                min:'@',
                max:'@',
                onChange: '&?',
            },
            templateUrl: '/directives/drag-bar/bar-drag.html',
            link: function($scope, elem, attr, ctrl) {
                var min = parseInt(attr.min);
                var max = parseInt(attr.max);

                var onResize = function() {
                    //initializations
                    var md = 0,
                        bar = angular.element(elem[0].querySelector('.bar').getBoundingClientRect()),
                        slider = angular.element(elem[0].querySelector('.slider').getBoundingClientRect()),
                        sliderChange = angular.element(elem[0].querySelector('.slider')),
                        div = angular.element(elem[0].querySelector('.showpercent')),
                        fill = angular.element(elem[0].querySelector('.fill')),
                        unit = (max-min) / (bar[0].width);
                        sliderHalfWidth = (slider[0].width)/2;
                    
                    //on first time render
                    ctrl.$render = function(){
                        if(ctrl.$viewValue >= min && ctrl.$viewValue <= max)
                            moveSlider(Math.ceil(((ctrl.$viewValue-min)/unit)+bar[0].left));
                        else{
                            console.log("Wrong value");
                        }
                    }
                    
                    //function binding
                    $scope.mousedown = mousedown;

                    function mousedown(mouseEvent) {
                        console.log("down");
                        md = 1;
                    }

                    function onDestroy() {
                        console.log("hello");
                        unbind();
                        angular.element($window).unbind("mouseup", onMouseup);
                        angular.element($window).unbind("mousemove", onMousemove);
                    }

                    function moveSlider(x){
                        var colorWidth = x - bar[0].left;
                        var value = Math.floor((colorWidth) * unit) + min;
                        var leftVal = x - bar[0].left - sliderHalfWidth;
                        // console.log("left" + leftVal);
                        // console.log("click"+ x);
                        if (leftVal > bar[0].width) {
                            leftVal = bar[0].width - (slider[0].width) / 2;
                            colorWidth = bar[0].width;
                            value = max;
                        }
                        else if (leftVal < 0) { 
                            leftVal = 0 - sliderHalfWidth;
                            colorWidth = 0;
                            value = min;
                        }
                        sliderChange.css({ "left": (leftVal) + 'px' });
                        fill.css({
                            "width": colorWidth + 'px',
                        });
                        if (value >= min && value <= max) {
                            div[0].innerText = value + '%';
                            ctrl.$setViewValue(value);
                            $scope.onChange();    
                        }
                    }

                    var onMousemove = function(event) {
                        if (md == 1) {
                            moveSlider(event.clientX);
                        }
                    };

                    var onMouseup = function(event) {
                        if (md == 1) {
                            console.log("up");
                            $scope.onChange();
                            md = 0;
                        }
                    };

                    angular.element($window).bind("mouseup", onMouseup);
                    angular.element($window).bind("mousemove", onMousemove);
                    var unbind = $scope.$on('$destroy', onDestroy);
                }
                
                //check validity
                if(isNaN(min) && isNaN(max)){
                    min=0;
                    max=100;
                }

                if(min != "NaN" && max!= "Nan")
                    if(min < max){
                        angular.element($window).bind('resize', onResize);
                        onResize();
                    }
                    else{
                        console.log("Min Max not correct");
                    }
                else
                    console.log("Min Max needed");
                    
            }
        }
    }]);
})();