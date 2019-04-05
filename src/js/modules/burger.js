import $ from 'jquery';

export let burger = {
    init: function () {
        let $button = $('.js-menu-trigger');
        let $navigation = $('.js-navigation');
        let $body = $('body');

        $button.on('click', function (){
            $button.toggleClass('bt-menu-open');
            $navigation.toggleClass('open');
            $body.toggleClass('ovh');
        });
    }
}
