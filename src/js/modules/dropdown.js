import $ from 'jquery';
import  {events} from './utils.js'

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

            events.on('calculatorTabChanged', function () {
                if($self.is(':visible')) {
                    $saveTarget.val(value);
                    events.emit('dropdownChanged', value)
                }
            });

            $self.on('click', (e) => {
                e.stopPropagation();
                this.hideDropdowns();

                $self.addClass('opened')
            });

            $dropdownLinks.on('click',  (e) => {
                e.preventDefault();
                e.stopPropagation();

                let $link = $(e.currentTarget);

                $dropdownLinks.removeClass('active');
                $link.addClass('active');
                value = $link.first().text();
                $selectedItem.text(value);
                $saveTarget.val(value);

                $self.removeClass('opened');

                events.emit('dropdownChanged', value)
            });
        })
    },


    init:  function() {
        this.cacheDom();
        this.bindEvents();
    }
}
