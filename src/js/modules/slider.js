/*eslint no-unused-vars: 0 */

import $ from 'jquery';
import  {events} from './utils.js'

import slider from 'jquery-ui/slider';

// example calculation:
// 4 CPU Cores * 10 EUR = 40 EUR
// 8 GB memory * 15 EUR = 120 EUR
// 100 GB Disk * 0,35 EUR = 35 EUR

// Backups 4 days 100GB = 4 * 100 * 0,6 Compression factor = 240 GB * 0,1 EUR/GB backup space = 24 EUR + 15 EUR backup license = 39 EUR

// 1 IP address * 2.5 EUR = 2.5 EUR
// No control panel
// Geek included 69 EUR
// So total cost would be 40 + 120 + 35 + 39 + 2.5 + 69

// 4 CPU Cores * 10 EUR = 40 EUR

// 80 GB memory * 15 EUR = 1200 EUR

// 400 GB Disk * 0,35 EUR = 140 EUR

// Backups 30 days 100GB = 14 * 100 * 0,6 Compression factor = 240 GB * 0,1 EUR/GB backup space = 85 EUR
// + 15 EUR backup license

// 2 IP address * 2.5 EUR = 7.5 EUR

// Geek included 69 EUR


export let sliderInit = {
    init(selector, array, pointPosition) {
        let sliderAmountMap = array;
        let $value = $(selector).closest('.js-slider-wrapper').find('.js-value')

        $(selector).slider({
            value: pointPosition,
            min: 0, //the values will be from 0 to array length-1
            max: sliderAmountMap.length-1,
            orientation: 'horizontal',
            range: 'max',
            animate: true,
            create: function() {
                $value.text(sliderAmountMap[$( selector ).slider( 'value')] );
                events.emit('slideChanged', { selector: selector,  value: sliderAmountMap[$( selector ).slider( 'value')]})
            },
            slide: function( event, ui ) {
                $value.text( sliderAmountMap[ui.value] ); //map selected 'value' with lookup array
                events.emit('slideChanged', {selector: selector,  value: sliderAmountMap[ui.value]})
            }
        });

        $(array).each( function (index, element) {
            $(selector).parent().find('.js-slider-values').append('<div class="slider__value-wrapper"><div class="slider__value">' + element + '</div></div>')
        });
    }
}
