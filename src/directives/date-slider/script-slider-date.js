(function () {
    var app = angular.module('myAppDateSlider', []);

    app.directive('dateSlider', ['$window','$interval','$timeout', function ($window, $interval, $timeout) {
        return {
            scope: {
                icons_obj: '=dates',
            },
            link: function (scope, elem, attr, ctrl) {
                //initializations
                var amount = 100,
                    movement = 0,
                    intervalPromise = null,
                    timeoutPromise = null,
                    total = scope.icons_obj.length,
                    left_count = 0;
                
                //make dateString 
                for(var i = 0; i < scope.icons_obj.length; i++){
                    scope.icons_obj[i].dateString = scope.icons_obj[i]["deadline"].toLocaleDateString("en-IN");
                }
                
                //function called on every resizing    
                var onResize = function () {
                    var slide_left = angular.element(elem[0].querySelector('.mover-left button')),
                        slide_right = angular.element(elem[0].querySelector('.mover-right button')),
                        show_icon_div = angular.element(elem[0].querySelector('.show-icon').getBoundingClientRect()),
                        display = angular.element(elem[0].querySelector('.display-view')),
                        count = Math.floor((show_icon_div[0].width) / 100),
                        offset = Math.floor((show_icon_div[0].width) % 100),
                        right_count = total - (count + left_count);
                    scope.moveLeft = moveLeft;
                    scope.moveRight = moveRight;
                    //scope.selectIcon = selectIcon;
                    scope.onmouseDownLeft = onmouseDownLeft;
                    scope.onmouseDownRight = onmouseDownRight;
                    scope.onmouseUp = onmouseUp;

                    //conditions to show right click
                    if (total <= count || right_count <= 0) {
                        slide_right[0].disabled = true;
                    }
                    else{
                        slide_right[0].disabled = false;
                    }

                    //function binding
                    function moveLeft() {
                        movement += amount;
                        left_count -= 1;
                        right_count += 1;
                        var display = angular.element(elem[0].querySelector('.display-view'));
                        display.css({
                            'transform': 'translate(' + movement + 'px, -50%)',
                        });
                        //stopping condition
                        if (movement == 0) {                    
                            onmouseUp();
                            slide_left[0].disabled = true;
                        }
                        if(right_count > 0)
                            slide_right[0].disabled = false;
                    }

                    function moveRight() {
                        movement -= amount;
                        if(right_count == 1)
                            movement += offset;
                        left_count +=1 ;
                        right_count -= 1;
                        var display = angular.element(elem[0].querySelector('.display-view'));
                        display.css({
                            'transform': 'translate(' + movement + 'px, -50%)',
                        });
                        
                        if (movement <= 0) {
                            slide_left[0].disabled = false;
                        }
                        //stopping condition
                        if (right_count == 0) {
                            onmouseUp();
                            slide_right[0].disabled = true;
                            movement -= offset;
                        }
                    }

                    function onmouseDownLeft(){
                        intervalPromise = $interval(function(){
                            display.css({'transition':'0.1s',});
                            moveLeft();
                        },100);
                        moveLeft();
                    }

                    function onmouseDownRight(){
                        intervalPromise = $interval(function(){
                            display.css({'transition':'0.1s',});
                            moveRight();
                        },100);
                        moveRight();
                    }
                    
                    function onmouseUp(){
                        console.log("mouseup");
                        $interval.cancel(intervalPromise);
                        display.css({'transition':'1s',});
                    }

                    // function selectIcon(icon){
                    //     console.log(icon);
                    //     scope.selectedVal = scope.icons_obj[icon].icon;
                    //     ctrl.$setViewValue(scope.icons_obj[icon]);
                    // }

                    // ctrl.$render = function(){
                    //     console.log(ctrl);
                    //     scope.selectedVal = ctrl.$viewValue.icon;
                    // }
                }

                function smartResize(){
                    $timeout.cancel(timeoutPromise);
                    timeoutPromise = $timeout(onResize, 500);
                }

                function onDestroy(){
                    destroy();
                    angular.element($window).unbind('resize', smartResize);
                }

                //to call resize only once we need to timeout
                angular.element($window).bind('resize', smartResize);
                //called first time
                onResize();
                var destroy = scope.$on('$destroy', onDestroy);                
            },
            templateUrl: '/directives/date-slider/slider-date.html',
        }
    }]);
})();