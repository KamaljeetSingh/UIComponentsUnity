(function(){
    'use strict';

    app.controller('ctrlone',['$scope','sharedService', function($scope, ss){
        $scope.checkValue = ss.getCheckbox();
        $scope.percentVal = 50;
        $scope.img_obj = ss.getIcons();
        $scope.switchValue = true;
        $scope.progressValue = 67;
        $scope.selected = $scope.img_obj[2];
        $scope.dateValue = ss.getDates();
        $scope.checkboxNotify = checkboxNotify;
        $scope.dragbarNotify = dragbarNotify;
        $scope.iconsliderNotify = iconsliderNotify;
        $scope.switchNotify = switchNotify;

        function checkboxChange(value){
            $scope.checkValue = value;
        }

        function dragbarChange(value){
            $scope.percentVal = value;
            $scope.progressValue = value;
        }

        function iconsliderChange(value){
            $scope.selected = value;
        }

        function switchChange(value){
            $scope.switchValue = value;
        }

       function checkboxNotify(){
            console.log("notify 1");
            ss.setCheckbox($scope.checkValue);
        }

        function dragbarNotify(){
            console.log("notify 1");
            ss.setDragbar($scope.percentVal);
        }

        function iconsliderNotify(){
            console.log("notify 1");
            ss.setIconslider($scope.selected);
        }

        function switchNotify(){
            console.log("notify 1");
            ss.setSwitch($scope.switchValue);
        }

        ss.subscribeFn(checkboxChange, "checkbox");
        ss.subscribeFn(dragbarChange, "dragbar");
        ss.subscribeFn(iconsliderChange, "iconslider");
        ss.subscribeFn(switchChange, "switch");
    }]);

    app.controller('ctrltwo',['$scope','sharedService', function($scope, ss){
        $scope.checkValue = ss.getCheckbox();
        $scope.percentVal = 50;
        $scope.img_obj = ss.getIcons();
        $scope.switchValue = true;
        $scope.selected = $scope.img_obj[2];
        $scope.checkboxNotify = checkboxNotify;
        $scope.dragbarNotify = dragbarNotify;
        $scope.iconsliderNotify = iconsliderNotify;
        $scope.switchNotify = switchNotify;

        function checkboxChange(value){
            $scope.checkValue = value;
            $scope.switchValue = value;
        }

        function dragbarChange(value){
            $scope.percentVal = value;
        }

        function iconsliderChange(value){
            $scope.selected = value;
        }

        function switchChange(value){
            $scope.switchValue = value;
        }

        function checkboxNotify(){
            console.log("notify 2");
            ss.setCheckbox($scope.checkValue);
        }

        function dragbarNotify(){
            console.log("notify 2");
            ss.setDragbar($scope.percentVal);
        }

        function iconsliderNotify(){
            console.log("notify 2");
            ss.setIconslider($scope.selected);
        }

        function switchNotify(){
            console.log("notify 2");
            ss.setSwitch($scope.switchValue);
        }

        ss.subscribeFn(checkboxChange, "checkbox");
        ss.subscribeFn(dragbarChange, "dragbar");
        ss.subscribeFn(iconsliderChange, "iconslider");
        ss.subscribeFn(switchChange, "switch");
    }]);
})();