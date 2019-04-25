import $ from 'jquery';
import {isMobile} from "./utils";

export let navOnSections = {
    $window: $(window),
    $navigationLinks: $('.js-travel-to'),
    $navigationItem: $('.js-navigation-item'),
    $header: $('.js-page-header'),
    $menuTrigger: $('.js-menu-trigger'),
    $document: $('document'),
    $body: $('html, body'),
    $goTop: $('.js-go-top'),
    $currentItem: $('.js-navigation-item.active'),
    HEADER_WHITE_CLASS: 'header--bg-white',

    defaultMagicLineWidth: 100,
    manual: true,
    currentLinkAnchor: '',

    navigationLogoWidth: 0,
    windowHeight: '',
    $navigationItems: '',
    navigationPosition: '',
    sections: [],
    links: [],
    lastScrollTop: 0,
    sectionIndex: '',
    scrollTopState: '',

    headerIsHidden: false,

    getCurrentPosition () {
        return this.$header.offset().top;
    },

    hideHeaders() {
        this.$header.addClass('header--hidden');
        this.headerIsHidden = true;
    },

    showHeaders() {
        this.$header.removeClass('header--hidden');
        this.headerIsHidden = false;
    },

    toggleheaderVisibility() {

        if (this.lastScrollTop !== 0 && this.manual) {
            if (this.scrollTopState > this.lastScrollTop && !this.headerIsHidden){
                this.hideHeaders();
            } else if (this.scrollTopState  < this.lastScrollTop && this.headerIsHidden) {
                this.showHeaders();
            }
        }
        this.lastScrollTop = this.scrollTopState;
    },

    setHeaderColor() {
        this.offsetHeader = 500;

        if (window.pageYOffset > this.offsetHeader) {
            this.$header.addClass(this.HEADER_WHITE_CLASS);
        } else {
            this.$header.removeClass(this.HEADER_WHITE_CLASS);
        }
    },

    makeItemActive($item) {

        this.$currentItem = $item;
        this.currentLinkAnchor = $item.find(this.$navigationLinks).attr('href');
        this.$navigationLinks.each((index,element)=> {
            $(element).parent().removeClass('active')
        });
        $item.addClass('active');
    },

    setLinks(index, element) {
        var $element = $(element);

        this.links[$element.attr('href')] = {
            'index': index,
            'element': element,
            'item': $element.parent()
        }
    },


    setSections(index, element) {
        var $element = $(element);
        var $section = $($element.attr('href'));

        this.sections.push({
            'sectionId': $element.attr('href'),
            'offsetTop': Math.floor($section.offset().top),
            'index': index,
            'linkElement': element
        })
    },

    isSectionChanged() {
        this.navigationPosition = this.getCurrentPosition();
        for (var i = this.sections.length - 1; i >= 0; i--) {
            if (this.navigationPosition >= this.sections[i]['offsetTop']) {
                if (this.sectionIndex !== i) {
                    this.currentItem = $(this.sections[i]['linkElement']).parent();
                    this.sectionIndex = i;
                    return true;
                } else {
                    return false;
                }
                break;
            }
        }
    },

    changeMenuState() {
        this.makeItemActive( this.currentItem);
    },

    scrollToTarget(target) {
        this.manual = false;
        this.$body.stop().animate({
                'scrollTop': $(target).offset().top
            },{
                duration: 1000,
                easing: 'swing'
            }
        )
            .promise().then(() => {
                setTimeout( () => {
                    this.manual = true;
                }, 100)

            });
    },

    writeDownInHistory(target) {
        if (history.pushState) {
            history.pushState(null, null, target);
        } else {
            location.hash = target;
        }
    },

    updateSectionsPosition() {
        this.sections.forEach( (element) => {
            element.offsetTop = Math.floor($(element.sectionId).offset().top);
        })
    },

    isFirstScreen(scrollPosition) {
        if (scrollPosition > this.windowHeight) {
            return false;
        } else {
            return true;
        }
    },

    goTop() {
        this.$body.stop().animate({
            'scrollTop': 0
        }, 1000, 'swing');
    },

    bindEvents() {
        this.$goTop.on('click', (e) => {
            let self = e.currentTarget;
            e.preventDefault();
            $(self).blur();
            this.goTop();
        });

        this.$navigationLinks.on('click', (e) => {
                e.preventDefault();

                this.updateSectionsPosition();

                let $z = $(e.target);
                let $item = $z.parent();
                let target = $z.attr('href');

                this.makeItemActive($item);
                this.writeDownInHistory(target);
                this.scrollToTarget(target);
            }
        );

        $(window).on('scroll', () => {
            
            this.setHeaderColor();

            this.scrollTopState = this.$window.scrollTop();

            if(this.isSectionChanged()) {
                this.changeMenuState();
            }

            if(window.pageYOffset > 100) {
                this.toggleheaderVisibility();
            }
        });

        if(isMobile()) {
            this.$navigationLinks.on('click', () => {
                $('.header__cross').click();
            })
        }
    },

    init() {
        this.windowHeight = this.$window.height();
        this.$navigationItems = this.$navigationLinks.parent();
        this.scrollTopState = this.$window.scrollTop();
        this.navigationPosition = this.getCurrentPosition();

        // if (this.isFirstScreen(this.navigationPosition)) {
        //     this.hideHeaders();
        // } else {
        //     this.showHeaders();
        // }

        this.$navigationLinks.each( (index, element) =>{
            this.setSections(index, element);
            this.setLinks(index, element);
        });

        if( this.isSectionChanged() ) {
            this.changeMenuState();
        } else {
            this.currentLinkAnchor = this.$currentItem.find(this.$navigationLinks).attr('href');
        }

        this.setHeaderColor();

        this.bindEvents();

        $(window).on('resize', () => {
            this.windowHeight = this.$window.height();
            this.scrollTopState = this.$window.scrollTop();
            this.navigationPosition = this.getCurrentPosition();
        })
    },
};
