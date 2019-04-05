import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper';


export default function createSwiper(className, options) {
    if( $(className).length !== 0 ) {
        return new Swiper(className, options)
    }
}