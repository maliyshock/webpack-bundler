import $ from 'jquery';

export let navigation = {
    headerHeight: 60,
    offsetHeader: null,
    NAV_STICKY_CLASS: 'header--has-shadow' ,

    cacheDom() {
        this.$links =  $('.js-go-to');
        this.$navigation =  $('.js-navigation');
        this.$header =  $('.js-header');
        this.$body = $('html, body');
    },

    checkHeaderState() {
        // this.offsetHeader = document.querySelector('.js-header').offsetHeight;

        if (window.pageYOffset > this.offsetHeader) {
            this.$header.addClass(this.NAV_STICKY_CLASS);
        } else {
            this.$header.removeClass(this.NAV_STICKY_CLASS);
        }
    },

    bindEvents() {
        // sticky nav bar
        // $(window).on('scroll', () => {
        //     this.checkHeaderState();
        // });

        this.$links.each( (index, element) => {
            $(element).on('click', (e) => {
                e.preventDefault();
                let self = e.currentTarget;
                let target = $(self).attr('href');

                this.$links.each((index,element)=> {
                    $(element).parent().removeClass('active')
                });
                $(self).parent().addClass('active');

                this.goTo(target);
            })
        })
    },

    init() {
      this.cacheDom();
      this.bindEvents();
      this.checkHeaderState();
    },

    goTo(hash) {
        let offset = $(hash).offset().top - this.headerHeight;

        this.$body.stop().animate({
                'scrollTop': offset
            }, 1000, 'swing', () => {
                if(history.pushState) {
                    history.pushState(null, null, hash);
                }
                else {
                    location.hash = hash;
                }
            }
        );
    },
}

