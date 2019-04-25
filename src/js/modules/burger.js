import $ from 'jquery';

export let burger = {
    $button: $('.js-menu-trigger'),
    $navigation: $('.js-navigation'),
    $body: $('body'),

    toggle() {
        this.$navigation.toggleClass('open');
    },

    hide() {
        this.$navigation.removeClass('open');
    },

    init() {
        this.$button.each((index, element) => {
            $(element).on('click',  (e) => {
                e.stopPropagation();
                this.toggle();
            });
        })

        $(window).click(() => {
            this.hide();
        });

        this.$navigation.click((e) => {
            e.stopPropagation();
        });
    }
}
