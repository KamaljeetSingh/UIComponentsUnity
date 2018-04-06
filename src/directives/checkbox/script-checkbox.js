(function(){
    var app = angular.module('myCheck',[]);

    app.directive('checkbox',function(){
        return{
            require: "ngModel",
            scope: {
                position:'@?',
                onChange: '&?'
            },
            transclude: true,
            templateUrl: '/directives/checkbox/checkbox.html',
            link: checkLink,
        }
    });

    function checkLink(scope,elem,attr,ctrl){
        //initializations
        var icon = angular.element(elem[0].querySelector('.fa-check')),
            label = angular.element(elem[0].querySelector('.checkmark')),
            listeners = [];
        scope.checkid = scope.$id;    

        //Function Binding
        scope.callIcon = callIcon; 
        scope.changeValue = changeValue;

        if(attr.position!="left")
            attr.position = "right";

        function changeValue(){
            ctrl.$setViewValue(!ctrl.$viewValue);
            if(scope.onChange)
                scope.onChange();
            callIcon();
        }   

        function callIcon(){
            if(ctrl.$viewValue == true){
                icon.addClass("showicon");
                label.addClass("rotatelabel");
            }
                
            else{
                icon.removeClass("showicon");
                label.removeClass("rotatelabel");
            }    
        }   

        function $onDestroy(){
            listeners.forEach(unBind);
        }

        //unsubscribing events
        function unBind(item){
            item();
        }

        ctrl.$render = function(){
            callIcon();
        }

        //watch value of ngmodel
        listeners.push(scope.$watch(function(){
            return ctrl.$modelValue;
        },function(newValue){
            console.log("Watch"+newValue);
        }));

        // Destroy
        listeners.push(scope.$on('$destroy', $onDestroy));
    }

})();