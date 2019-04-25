import $ from 'jquery';

export let form = {

    cacheDom() {
        this.$forms = $('.js-form');
    },

    bindEvents() {
        this.$forms.each((index, element) => {
            $(element).find('.js-button').on('click', (e) => {
                e.preventDefault();

                let self = e.target;

                $(self).attr('disabled', true).addClass('pending');

                setTimeout( () => {
                    $(element).closest('.flipper').addClass('active')
                }, 1000)



            });
        });
    },

    init() {
        this.cacheDom();
        this.bindEvents();
    }
};