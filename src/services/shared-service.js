(function(){
    app.service('sharedService',function(){
        this.user = { 
            notification: true
         };
         this.img_obj = [
            {name:"A" , icon:"bank"},
            {name:"B" , icon:"businessman"},
            {name:"C" , icon:"calculator"},
            {name:"D" , icon:"coffee"},
            {name:"E" , icon:"document"},
            {name:"F" , icon:"goal"},
            {name:"G" , icon:"handshake"},
            {name:"H" , icon:"house"},
            {name:"I" , icon:"meeting"},
            {name:"J" , icon:"money"},
            {name:"I" , icon:"kite"},
            {name:"I" , icon:"butterfly"},
            {name:"I" , icon:"grill"},
            {name:"I" , icon:"fountain"},
            {name:"I" , icon:"flower"},
        ];
        this.setCheckbox = setCheckbox;
        this.getCheckbox = getCheckbox;
        this.subscribeFn = subscribeFn;
        this.setDragbar = setDragbar;
        this.getIcons = getIcons;
        this.setIconslider = setIconslider;
        this.setSwitch = setSwitch;
        this.getDates = getDates;
        var controllersRef = []; 
            controllersRef.checkbox = [];
            controllersRef.dragbar = [];
            controllersRef.iconslider = [];
            controllersRef.switch = [];
        var date=[
            new Date("May 5, 2018"),
            new Date("April 2, 2018"),
            new Date("March 3, 2018"),
            new Date("March 4, 2018"),
            new Date("April 5, 2018"),
            new Date("April 6, 2018"),
            new Date("December 7, 2018"),
            new Date("April 8, 2018"),
            new Date("April 9, 2018"),
            new Date("January 10, 2018"),
        ];
        this.date_obj = [
            {name:"Project I" , deadline:date[0]},
            {name:"Project I" , deadline:date[1]},
            {name:"Project I" , deadline:date[2]},
            {name:"Project I" , deadline:date[3]},
            {name:"Project I" , deadline:date[4]},
            {name:"Project I" , deadline:date[5]},
            {name:"Project I" , deadline:date[6]},
            {name:"Project I" , deadline:date[7]},
            {name:"Project I" , deadline:date[8]},
            {name:"Project I" , deadline:date[9]},
        ];

        function setCheckbox(value){
            this.user.notification = value;
            for(var i=0;i<controllersRef["checkbox"].length;i++){
                controllersRef["checkbox"][i](value);
            }
        }

        function setDragbar(value){
            for(var i=0;i<controllersRef["dragbar"].length;i++){
                controllersRef["dragbar"][i](value);
            }
        }

        function setIconslider(value){
            for(var i=0;i<controllersRef["iconslider"].length;i++){
                controllersRef["iconslider"][i](value);
            }
        }

        function setSwitch(value){
            for(var i=0;i<controllersRef["switch"].length;i++){
                controllersRef["switch"][i](value);
            }
        }

        function getCheckbox(){
            return this.user.notification;
        }

        function getIcons(){
            return this.img_obj;
        }

        function getDates(){
            return this.date_obj;
        }

        function subscribeFn(fn, id){
            controllersRef[id].push(fn);
        }

    });
})();