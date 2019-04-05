import $ from 'jquery'

function fadeIn (target) {
    target.addClass('fadeIn').delay(1).queue( function (next) {
        target.addClass('active');
        next();
    })
}

function fadeOut(target) {
    target.removeClass('active').delay(300).queue( function (next) {
        target.removeClass('fadeIn');
        next();
    })
}

function cleanFade(target) {
    target.removeClass('fadeIn active')
}

function isMobile() {
    let windowWidth = $(window).width();

    $(window).resize(function () {
        windowWidth = $(window).width();
    })

    if(window.orientation !== undefined || windowWidth < 1280) {
        return true;
    } else {
        return false;
    }
}

let events = {
    events: {},
    on: function (eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    },
    off: function(eventName, fn) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    },
    emit: function (eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(fn) {
                fn(data);
            });
        }
    }
};

let transferString  = {
    toCammelCase(string) {
        return string.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }).replace(/\./g,'')
    }
}

let makeWithArray = {
    summ(input) {
        if (toString.call(input) !== '[object Array]')
            return false;

        var total =  0;
        for(var i=0;i<input.length;i++)
        {
            if(isNaN(input[i])){
                continue;
            }
            total += Number(input[i]);
        }
        return total;
    }
}

export {fadeIn, fadeOut, cleanFade, isMobile, events, transferString, makeWithArray}

