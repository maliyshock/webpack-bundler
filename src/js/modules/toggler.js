import $ from 'jquery';
import {fadeIn} from './utils'

export let toggler = {
    init: function () {
        this.cacheDom();
        this.bindEvents();
    },

    cacheDom: function () {
        this.$togglerItems = $('.js-toggler-item');
        this.$togglerAreas = $('.js-toggler-area');
    },

    bindEvents: function () {
        this.$togglerItems.each( (index, element) => {
            $(element).on('click', (e) => {
                e.preventDefault();
                let $self = $(e.target);
                let $id = $( $self.data('target') );

                this.$togglerItems.each( (index, element) => {
                    $(element).removeClass('active');
                });

                this.$togglerAreas.each( (index, element) => {
                    $(element).removeClass('active fadeIn');
                });

                $self.addClass('active');

                fadeIn( $id );
            });
        })
    }
}