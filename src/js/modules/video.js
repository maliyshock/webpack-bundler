import $ from 'jquery';

export let video = {
    cacheDom() {
        this.$videos =  $('.js-video')
    },

    videoIsPlaying($object) {
        $object.addClass('play')
    },

    videoIsStopped($object) {
        $object.removeClass('play')
    },

    bindEvents() {
        this.$videos.each( (index, element) => {
            let $self = $(element);
            let $videoTag = $self.find('video');

            $videoTag.on('ended', () => {
                this.videoIsStopped($self);
            });

            $self.on('click', () => {
                if($self.hasClass('play') ) {
                    $videoTag.get(0).pause();
                    this.videoIsStopped($self);
                } else {
                    $videoTag.get(0).play();
                    this.videoIsPlaying($self);
                }
            });
        })
    },

    init() {
        this.cacheDom();
        this.bindEvents();
    }
};