/* Created By Yarkın ÜÇERLER on date 29.11.2017 */

(function ( $ ) {
    
    $.msgBox = function( options ) {

        //$('body').append('<script src="https://use.fontawesome.com/f18d920bff.js"></script>');

        // Private Plugin Variable
        var icon = {},
        inputs = "",
        buttons = "",
        isShown = false,
        msgBoxTemplate = "",
        typeOfValue = typeof options;
        
        // Private Position Variable
        var top = 0,
            left = 0,
            windowWidth = 0,
            windowHeight = 0; 

        // Plugin Default Variable
        var settings = $.extend({       
            width : 1,
            title: "",
            height : 1,
            timeOut: 0,
            type: "alert",
            buttons: null,
            size: "medium",
            color: "#556b2f",
            autoClose: false,
            responsive: true,
            showButtons: true,
            content: "Message",
            backgroundColor: "#fff",
            afterShow: function () { },
            beforeShow: function () { },
            afterClose: function () { },
            beforeClose: function () { },
            success: function (result) { },
            inputs: [{ type: "text", name:"userName", header: "User Name" }, { type: "password",name:"password", header: "Password"}],
        }, options );

        // Default Title Setting According to Type
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

        // Default Icon Setting According to Type
        switch (settings.type) {
            case "alert":
                icon = {class: "fa fa-exclamation-triangle", code: "\f071"};
            break;
            case "info":
                icon = {class: "fa fa-info", code: "\f129"};
            break;
            case "error":
                icon = {class: "fa fa-times-circle-o", code: "\f05c"};
            break;
            case "confirm":
                icon = {class: "fa fa-check-circle", code: "\f058"};
            break;
            default:
                icon = {class: "fa fa-exclamation-triangle", code: "\f071"};
        }

        /*
        * Create Footer Button Elemet
        * It creates footer button elements according to setting's button variable.
        * 
        */
        $(settings.buttons).each(function (index, button) {
            buttons += '<button class="msg-button" type="button">' + button.value + '</button>';
        });

        /*
        * Create Content Input Elemet
        * It creates content input elements according to setting's input variable.
        * 
        */
        $(settings.inputs).each(function (index, input) {
            var type = input.type;
            if (type == "checkbox" || type == "radio") {
                if(type == "checkbox") {
                    inputs += '<div class="msg-input-checkbox">' +
                                '<input type="' + input.type + '" id="' + input.name + '" name="' + input.name + '" '+ (input.checked == null ? '' : 'checked ="' + input.checked + '"') + 'value="'  + (typeof input.value == 'undefined' ? '' : input.value) + '" />' +
                                '<label for="' + input.name + '">' + input.header + '</label>'+
                              '</div>';
                }
                else {
                    inputs += '<div class="msg-input-radiobox">' +
                                '<input type="' + input.type + '" id="' + input.name + '" name="' + input.name + '" '+ (input.checked == null ? '' : 'checked ="' + input.checked + '"') + 'value="'  + (typeof input.value == 'undefined' ? '' : input.value) + '" />' +
                                '<label for="' + input.name + '">' + input.header + '</label>'+
                              '</div>';
                }
            }
            else {
                inputs += '<div class="msg-input-group">' +
                            '<label for="' + input.name + '">' + input.header + '</label>' +
                            '<input type="' + input.type + '" id="' + input.name + '" name="' + input.name + '" value="' + (typeof input.value == 'undefined' ? '' : input.value) + '" />' +
                        '</div>';
            }
        });

        // Plugin Framework Template
        msgBoxTemplate = '<div class="msg-wrapper">' +
                            '<div class="background-wrapper"></div>' +
                            '<div class="msg-container ' + settings.size +'" >' +
                                '<div class="msg-close"><a href="javascript:;"><span>X</span></a></div>'+
                                '<header class="msg-title">' + settings.title + '</header>' +
                                '<main class="msg-content">' + (settings.type == "prompt" ? '<form id="msg-form">' + ( settings.content != '' ? '<div class="msg-text-content">' + settings.content + '</div>' : '') + inputs + '</form>' : '<div class="msg-text-content">' + settings.content + '</div>')  +
                                    '<footer class="msg-footer">' +
                                        '<div class="msg-button-group">' + buttons + '</div>' +
                                    '</footer>' + 
                                '</main>' + 
                            '</div>' +
                        '</div>';

        $("html").append(msgBoxTemplate);

        /*
        * Adjust Size 
        * Before it is this opens, it is adjusted size.
        * 
        */
        function adjustSize() {
            
            windowWidth = $(window).width();
            windowHeight = $(window).height();
            
            if(settings.responsive) {
                if(windowWidth > 550) {
                    settings.width = $('div.msg-container').width();
                    settings.height = $('div.msg-container').height();
                }
                else {
                    settings.width = windowWidth - 30;
                    settings.height = $('div.msg-container').height();
                }
            }

            top = windowHeight / 2 - settings.height / 2;
            
            $('div.msg-container').width(settings.width);
            
            return true;
        }
    
        /*  
        * Window Resize Action
        * 
        * adjustSize function is worked when window size changes.
        * it's position edits when adjustSize function is completed.
        * 
        */
        // $(window).resize(function() {
        //     if(adjustSize()) {
        //         divMsgBox.css({"left": left, "top": top });
        //     }
        // });
    
        /* 
        * Animation Action
        * 
        * It is created animation when opens and closes.
        * 
        */
        function animation() {
            if(!isShown) {
                $('div.msg-container').animate({ opacity: 1, "top": top, "left": left }, 300);
            }
            else {
                $('div.msg-container').animate({ opacity: 0, "top": top - 50, "left": left }, 300);
            }
        }     
        
        show();        
        function show() {
            if (isShown) {
                return;
            }
            
            settings.beforeShow();
            
            if(adjustSize()) {
                $('div.msg-container').css({ opacity: 0, top: top - 50, left: left });        	
                animation();
            }

            setTimeout(settings.afterShow, 200);
            isShown = true;
        }

        function hide() {
            if (!isShown) {
                return;
            }
            animation();
            settings.beforeClose();
            setTimeout(function () { $('div.msg-wrapper').remove(); }, 300);
            setTimeout(settings.afterClose, 300);
            isShown = false;
        }

        function getFocus() {
            $('div.msg-container').fadeOut(200).fadeIn(200);
        }

        $('footer .msg-button').click(function (e) {
            e.preventDefault();
            if (settings.type != "prompt") {
                var value = $(this).text();
                settings.success(value);
            }
            else {
                var inputValues = [];
                $('main.msg-content form#msg-form input').each(function (index, domEle) {
                    var name = $(this).attr('name');
                    var value = $(this).val();
                    var type = $(this).attr('type');
                    if (type == "checkbox" || type == "radiobutton") {
                        inputValues.push({ name: name, value: value,checked: $(this).attr('checked')});
                    }
                    else {
                        inputValues.push({ name: name, value: value });
                    }
                });
                settings.success(inputValues);
            }
            hide();
        });

        $(".msg-close a").click(function (e) {
            hide();
        });

        $('.background-wrapper').click(function (e) {
            if (settings.autoClose) {
                hide();
            }
        });

        return this;
    };
    
}( jQuery ));