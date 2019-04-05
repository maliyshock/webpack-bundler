import $ from 'jquery';

export let accordion = {
    cacheDom() {
        this.$accordions =  $('.js-accordion')
    },

    bindEvents() {
        this.$accordions.each( (index, element) => {
            let $accordion = $(element);
            let $head = ( $accordion.hasClass('js-accordion-head') ) ? $accordion : $accordion.find('.js-accordion-head');
            let $body = $accordion.find('.js-accordion-body');

            $head.on('click', (e) => {
                e.preventDefault();
                $accordion.toggleClass('opened');
                $body.stop().slideToggle();
            });
        })
    },

    init() {
        this.cacheDom();
        this.bindEvents();
    }
};