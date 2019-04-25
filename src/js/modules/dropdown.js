import $ from 'jquery';

export let dropdowns = {
    cacheDom: function () {
        this.$dropdowns =  $('.js-dropdown'),
        this.value =       null;
    },

    showDropdown: function () {

    },

    hideDropdowns: function () {
        this.$dropdowns.each( function () {
            $(this).removeClass('opened')
        })
    },

    bindEvents: function () {
        $(window).on('click', () => {
            this.hideDropdowns();
        });

        this.$dropdowns.each(  (index, element) => {
            let value = 'Version';
            let $self = $(element);
            let $selectedItem = $self.find('.js-dropdown-selected ');
            let $dropdownLinks = $self.find('.js-dropdown-link');
            let $saveTarget = $($self.data('target'));
            let offset = $(element).offset().top - $(window).scrollTop();

            $self.on('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                console.log('click');

                if(!$self.hasClass('opened')) {
                    this.hideDropdowns();

                    $self.addClass('opened')
                } else {
                    this.hideDropdowns();
                }

            });

            $self.keypress((event) => {
                if (event.keyCode == 13) {
                    $self.click();
                }
            })

            $dropdownLinks.on('click',  (e) => {
                console.log('links click');
                let $link = $(e.currentTarget);

                if( !$link.attr('href') ) {
                    e.preventDefault();
                }
                e.stopPropagation();


                $dropdownLinks.removeClass('active').attr('aria-selected', false);
                $link.addClass('active').attr('aria-selected', true);
                value = $link.first().text().trim();
                $selectedItem.text(value);
                $saveTarget.val(value);

                $self.removeClass('opened').addClass('active');
            });
        })
    },


    init:  function() {
        this.cacheDom();
        this.bindEvents();
    }
}
