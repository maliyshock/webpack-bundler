import $ from 'jquery';

export let tabs = {
    interval: null,

    cacheDom() {
        this.$tabWidgets = $('.js-tab-widget');
        this.$tabList = $('.js-tabs-list');
        this.$tab = $('.js-tab');
        this.$panels = $('.js-tab-panel');
    },

    nextStep($activeTab, $tabs) {
        let parent = $activeTab.parent().next();
        if(parent.length > 0) {
            parent.find('.js-tab').click();
        } else {
            $tabs.children(':first-child').children().click();
        }
    },

    createInterval(element) {
        this.interval = setInterval( () => {
                this.nextStep( $(element).find('.js-tab.active'), $(element).find(this.$tabList) )
            },
            7000
        )
    },

    bindEvents(obj) {
        this.$tabWidgets.each( (index, element) => {
            $(element).find(this.$tab).on('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                let self = e.currentTarget;

                this.$tab.removeClass('active');
                $(self).addClass('active');

                let target = $(self).attr('aria-controls');
                this.$panels.fadeOut(0);

                $('#'+target).fadeIn();
            });

            this.createInterval(element);

            $(element).hover( () => {
                clearInterval(this.interval);
            }, () => {
                this.createInterval(element);
            })
        })

    },

    init() {
        this.cacheDom();
        this.bindEvents();
    }
}
