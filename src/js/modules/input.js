import $ from 'jquery';

export const input = {
    $formInputs: $('.js-form-input'),

    checkInput: function (obj) {
        if( !obj.val() ){
            obj.removeClass('freeze')
        }
        else{
            obj.addClass('freeze')
        }
    },

    init: function () {
        input.checkInput( this.$formInputs );
        this.$formInputs.on('blur', function () {
            input.checkInput( $(this) );
        })
    }
};
