$(function () {

    var presentation = (function ($) {
    
        function init() {
            $.deck('.slide');
            getBrowser();
            validateBrowser();           
            addEasings();
            addHandlers();
        }
        
        function validateBrowser() {
            var version = 19;
            if (!$.browser.chrome || $.browser.version < version) {
                alert('These slides are optimized for Google Chrome version ' + version + ' or higher. Please try with the mentioned browser and version.');
            }
        }
        
        function getBrowser() {
            var userAgent = navigator.userAgent.toLowerCase(); 
            $.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase()); 
            if($.browser.chrome){
              userAgent = userAgent.substring(userAgent.indexOf('chrome/') +7);
              userAgent = userAgent.substring(0,userAgent.indexOf('.'));
              $.browser.version = userAgent;
            }
        }
        
        function addEasings() {
            $.easing['easeInOutExpo'] = function (x, t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
                return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
            };
            
            $.easing['easeOutBounce'] = function (x, t, b, c, d) {
                if ((t/=d) < (1/2.75)) {
                    return c*(7.5625*t*t) + b;
                } else if (t < (2/2.75)) {
                    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
                } else if (t < (2.5/2.75)) {
                    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
                } else {
                    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
                }
            };
        }
        
        function logEvent(text) {
            var eventsLog = $('#event-log');
            if ((/(Document|Parent)/).test(text) && eventsLog.children().length === 0) {
                return;
            }
            eventsLog.append('<div>Event at: <strong>' + text + '</strong></div>');
        }
        
        function addAnimationHandlers() {
            $('#ball-bottom').click(function () {
                moveCircle($(this), { left: '90%' }, { left: '10%' }, 'easeInOutExpo');    
            });
            $('#ball-top').click(function () {
                moveCircle($(this), { top: '90%' }, { top: '10%' }, 'easeOutBounce');
            });        
        }
        
        function addEffectsHandlers() {
            $('#fade-demo').click(function () {
                var el = $(this);
                el.fadeOut(1000, function () {
                    el.fadeIn(1000);
                });
            });
            $('#slide-demo').click(function () {
                var el = $(this);            
                el.slideUp(1000, function () {
                    el.slideDown(1000);
                });
            });
        }
        
        function addEventsDemoHandlers() {
            $('#bubbling-button').click(function () {
                $('#event-log').empty();
                logEvent($(this).text());
            });
            $('#non-bubbling-button').click(function (e) {
                $('#event-log').empty();
                logEvent($(this).text());
                e.stopImmediatePropagation();
            });
            $('#bubbling-slide').click(function () {
                logEvent('Parent');
            });
            $(document).click(function () {
                logEvent('Document');
            });        
        }
        
        function addHandlers() {
            addAnimationHandlers();
            addEffectsHandlers();
            addEventsDemoHandlers();
        }
        
        function moveCircle(el, forward, backward, easing) {
            
            el.animate(forward, { duration: 3000, easing: easing });
            setTimeout(function () {
                el.animate(backward, { duration: 3000, easing: easing });
            }, 3100);
        }   
        
        return {
            init: init
        }
        
    }($)).init();    

});