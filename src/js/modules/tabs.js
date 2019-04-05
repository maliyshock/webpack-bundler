import $ from 'jquery';

export let tabs = {
    cacheDom: function () {
        this.$tabs = $('.js-tab');
        this.$panels = $('.js-tab-panel');
    },

    bindEvents: function () {
        this.$tabs.on('click', function (e) {
            e.preventDefault();
            let self = e.currentTarget;

            this.$tabs.removeClass('active');
            $(self).addClass('active');

            let target = $(self).attr('aria-controls');
            this.$panels.fadeOut(0);

            $('#'+target).css({'display':'flex'}).hide(0).fadeIn();

        }.bind(this))
    },

    init:  function() {
        this.cacheDom();
        this.bindEvents();
    }
}
