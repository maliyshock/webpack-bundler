import $ from 'jquery'
// import {fadeIn,fadeOut} from './utils'
// import {pubSub} from './pubSub'

export let popup = {
    init: function () {
        this.cacheDom();
        this.bindEvents();
    },

    cacheDom: function () {
        this.$popupTriggers = $('.js-show-popup')
        this.$body = $('body');
        this.$close = $('.js-popup-close');
        this.$popups = $('.js-popup');
        // this.$popupInners = $('.js-popup-inner');
    },

    showPopup: function ($target) {
        $target.css({'display':'flex'}).hide(0).fadeIn();
        this.$body.addClass('ovh')
    },

    hidePopup: function ($target) {
        $target.fadeOut();
        this.$body.removeClass('ovh');
    },

    bindEvents: function () {
        this.$popupTriggers.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            let $this = e.currentTarget;
            let $target = $( $($this).data('target') );

            this.showPopup($target)
        });

        this.$close.on('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            let $this = e.target;
            let $targetPopup = $($this).closest('.js-popup');

            this.hidePopup($targetPopup);

            // pubSub.emit('closePopup',$targetPopup)
        });

        this.$popups.on('click', (e) => {
            if(e.currentTarget === e.target) {
                this.hidePopup($(e.currentTarget));
            }
        });
    }
}