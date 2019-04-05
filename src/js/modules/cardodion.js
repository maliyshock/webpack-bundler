import $ from 'jquery';

export let cardodion = {
    $bodies: null,

    cacheDom() {
        this.$accordions =  $('.js-cardodion-family');
        this.$bodies = $('.js-cardodion-family').find('.js-cardodion-body')
    },

    closeAll(){
        this.$bodies.slideUp(0);
    },

    bindEvents() {
        this.$accordions.each( (index, element) => {
            let $accordion = $(element).find('.js-cardodion');

            $accordion.each( (index, element) => {
                let $body = $(element).next('.js-cardodion-body');
                let link = $(element).find('a');

                if(link.length > 0){
                    link.on('click', (e) => {e.preventDefault();})
                }

                $(element).on('click', (e) => {
                    console.log('click');
                    e.preventDefault();
                    // $accordion.toggleClass('opened');
                    this.closeAll();
                    $body.stop().slideToggle();
                });
            })
        })
    },

    init() {
        this.cacheDom();
        this.bindEvents();
    }
};