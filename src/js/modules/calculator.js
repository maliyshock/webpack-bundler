import $ from 'jquery';
import  {events, transferString} from './utils.js'

export let calculator = {
    options: {
        jsSliderCpu : {
            value: 0,
            multiplier: 10
        },
        jsSliderMemory : {
            value: 0,
            multiplier: 15
        },
        jsSliderHard : {
            value: 0,
            multiplier: 0.35
        },
        jsSliderDays : {
            value: 0,
            multiplier: 6,
            plus: 15
        },
        jsSliderIp : {
            value: 0,
            multiplier: 2.5
        },
        geek: {
            value: 0,
            multiplier: 69
        },
        versoin: {
            value: 0,
            multiplier: 1
        },
        jsSliderPanel: {
            value: null
        }

    },

    summ() {
        return (
            this.options.jsSliderCpu.value * this.options.jsSliderCpu.multiplier +
            this.options.jsSliderMemory.value * this.options.jsSliderMemory.multiplier +
            this.options.jsSliderHard.value * this.options.jsSliderHard.multiplier +
            (this.options.jsSliderDays.value * this.options.jsSliderDays.multiplier + ( this.options.jsSliderDays.value ? this.options.jsSliderDays.plus : 0 ) ) +
            this.options.jsSliderIp.value * this.options.jsSliderIp.multiplier +
            this.options.geek.value * this.options.geek.multiplier +
            this.options.versoin.value * this.options.versoin.multiplier
        )
    },

    result: {
        month:  0.00,
        day:    0.00,
        hour:   0.00
    },

    cacheDom: function () {
      this.$hour = $('.js-calculator-hour');
      this.$day = $('.js-calculator-day');
      this.$month = $('.js-calculator-month');
      this.$geek = $('.js-geek');
      this.$sliders = $('.js-slider');
      this.$panels = $('.js-panel');
    },

    consoleLogOfCalculations(){
        console.log('````````````````````````');
        console.log('CPU: ', this.options.jsSliderCpu.value +' * ' + this.options.jsSliderCpu.multiplier + ' = ' + this.options.jsSliderCpu.value * this.options.jsSliderCpu.multiplier);
        console.log('Memory: ', this.options.jsSliderMemory.value +' * ' + this.options.jsSliderMemory.multiplier + ' = ' + this.options.jsSliderMemory.value * this.options.jsSliderMemory.multiplier);
        console.log('Hard: ', this.options.jsSliderHard.value +' * ' + this.options.jsSliderHard.multiplier + ' = ' + this.options.jsSliderHard.value * this.options.jsSliderHard.multiplier);
        console.log('Days: ', this.options.jsSliderDays.value +' * ' + this.options.jsSliderDays.multiplier + ' + ' + (this.options.jsSliderDays.value ? this.options.jsSliderDays.plus : 0) + ' = ' + ((this.options.jsSliderDays.value * this.options.jsSliderDays.multiplier) + ( this.options.jsSliderDays.value ? this.options.jsSliderDays.plus : 0 ) ) );
        console.log('IP: ', this.options.jsSliderIp.value +' * ' + this.options.jsSliderIp.multiplier + ' = ' + this.options.jsSliderIp.value * this.options.jsSliderIp.multiplier);
        console.log('Geek: ', this.options.geek.value +' * ' + this.options.geek.multiplier + ' = ' + this.options.geek.value * this.options.geek.multiplier);
        console.log('Versoin: ', this.options.versoin.value +' * ' + this.options.versoin.multiplier + ' = ' + this.options.versoin.value * this.options.versoin.multiplier);
        console.log('Panel: ', this.options.jsSliderPanel.value);
        console.log('Sum:', this.summ());
    },

    print(value) {
        this.consoleLogOfCalculations();

        this.$month.text('€ '+ value.toFixed(2));
        this.$day.text('€ '+ (value / 30).toFixed(2));
        this.$hour.text('€ '+ (value / 720).toFixed(2));
    },

    printCalculationItem(selector, value){
        let property = transferString.toCammelCase(selector);

        if( $(selector+'-value').length > 0 ) {
            $(selector+'-value').text(value);
        }

        this.options[property].value = value;
    },

    initPandelsRadioInputs(){
        this.$panels.on('click', function (e) {
            let $self = $(e.currentTarget);
            let value = $self.text();

            this.printCalculationItem('.js-slider-panel', value);
        }.bind(this));

        this.$panels.each( function(index, element) {
            if($(element).prev().prop('checked')) {
                let value = $(element).text();
                this.printCalculationItem('.js-slider-panel', value);
            }
        }.bind(this))
    },

    bindEvents: function () {
        events.on('slideChanged', function (data) {
            this.printCalculationItem(data.selector, data.value);
            this.print(this.summ());
        }.bind(this));


        events.on('dropdownChanged', function (data) {
            if(data.includes('Essentials')) {
                this.options.versoin.value = 20;
            } else if (data.includes('Standard')) {
                this.options.versoin.value = (this.options.jsSliderCpu.value <= 2) ?  4.5 : 20;
            } else if (data.includes('Datacenter')) {
                this.options.versoin.value = (this.options.jsSliderCpu.value <= 2) ?  30 : 130;
            } else {
                this.options.versoin.value = 0;
            }

            this.print(this.summ());
        }.bind(this));


        this.initPandelsRadioInputs();

        this.$geek.on('click', function (e) {
            setTimeout(function () {
                let self = e.currentTarget;
                this.options.geek.value = ($(self).prev().prop('checked')) ? 1 : 0;
                this.print(this.summ());
            }.bind(this),2)

        }.bind(this));
    },

    init:  function() {
        this.cacheDom();
        this.bindEvents();
    }
}

