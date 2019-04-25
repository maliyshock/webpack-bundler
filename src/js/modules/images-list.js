import {isMobile} from './utils';
import $ from 'jquery';

export let imageListItem = {
    cacheDom() {
        this.$items = $('.js-image-list-item');
    },

    bindEvents() {
        this.$items.each((index, element) => {
            $(element).on('click', (e) => {
                e.preventDefault();

                $(element).toggleClass('active');
            });
        });
    },

    init() {
        if( isMobile() ) {
            this.cacheDom();
            this.bindEvents();
        }
    }
};