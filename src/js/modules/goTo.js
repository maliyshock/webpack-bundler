import $ from 'jquery';

export let goTos = {
    $body: $('html, body'),

    scrollToTarget(target) {
        this.$body.stop().animate({
                'scrollTop': $(target).offset().top
            },{
                duration: 1000,
                easing: 'swing'
            }
        );
    },

    cacheDom() {
        this.$goTos =  $('.js-go-to')
    },

    bindEvents() {
        this.$goTos.on('click', (e) => {
            e.preventDefault();
            let $self = $(e.currentTarget);

            let target = $self.attr('href');
            this.scrollToTarget(target);
        })
    },

    init() {
        this.cacheDom();
        this.bindEvents();
    }
};