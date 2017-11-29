(function ( $ ) {
    
    $.msgBox = function( options ) {

    var isShown = false;
    var typeOfValue = typeof options;

    var settings = $.extend({       
        title: '',
        width : 1,
        timeOut: 0,
        height : 1,
        type: 'alert',
        color: "#556b2f",
        autoClose: false,
        showButtons: true,
        buttons: [{ value: "Ok"}],
        afterShow: function () { },
        beforeShow: function () { },
        afterClose: function () { },
        beforeClose: function () { },
        success: function (result) { },
        backgroundColor: "rgb('0, 0, 0, 0.5')",
        inputs: [{ type: "text", name:"userName", header: "User Name" }, { type: "password",name:"password", header: "Password"}],
    }, options );

    if (options.type != null || options.type != '') {
        switch (options.type) {
            case "alert":
                settings.title = options.title == null ? "Warning" : options.title;
            break;
            case "info":
                settings.title = options.title == null ? "Information" : options.title;
            break;
            case "error":
                settings.title = options.title == null ? "Error" : options.title;
            break;
            case "confirm":
                settings.title = options.title == null ? "Confirmation" : options.title;
                settings.buttons = options.buttons == null ? [{ value: "Yes" }, { value: "No" }, { value: "Cancel"}] : options.buttons;
            break;
            case "prompt":
                settings.title = options.title == null ? "Log In" : options.title;
                settings.buttons = options.buttons == null ? [{ value: "Login" }, { value: "Cancel"}] : options.buttons;
            break;
            default: 
                settings.title ="Warning";
            break;
        }
    }

    console.log(settings);

        return this;
    };
    
}( jQuery ));