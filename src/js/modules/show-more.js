import $ from 'jquery';

export let showMore = {
    cacheDom() {
        this.$links = $('.js-show-more');
        this.$areas = $('.js-show-more-object');
    },

    bindEvents () {
        this.$links.each( (index, element) => {
            $(element).on('click', (e) => {
                e.preventDefault();
                let self = e.currentTarget;

                console.log('click');

                $(self).prev(this.$areas).css({'display': 'flex'}).hide(0).slideDown();
                $(self).slideUp();
                //
                // let target = $(self).attr('aria-controls');
                // this.$panels.fadeOut(0);
                //
                // $('#'+target).fadeIn();

            });
        });

    },

    init() {
        this.cacheDom();
        this.bindEvents();
    }
}
