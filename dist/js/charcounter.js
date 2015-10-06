(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

    $.fn.CharCounter = function (options) {

        options = $.extend({
            max: 255,
            method: 'count',
            truncateAfterMax: false,

            locale: 'en',

            warningRatio: 0.2,

            containerTag: 'span',
            containerClass: 'charcounter-container',

            events: 'keyup change'
        }, options);

        var getContainer = function ($element) {
                return $(document.createElement(options.containerTag)).addClass(options.containerClass).insertAfter($element);
            },

            displayResult = function ($element, $container) {
                var value = $element.val(),
                    count = value.length,
                    warning = options.max * (1 - options.warningRatio);

                if (count >= warning && count < options.max) {
                    $container.addClass(options.containerClass + '-warning');
                } else {
                    $container.removeClass(options.containerClass + '-warning');
                }

                if (count >= options.max) {
                    $container.addClass(options.containerClass + '-danger');
                } else {
                    $container.removeClass(options.containerClass + '-danger');
                }

                if (options.truncateAfterMax) {
                    $element.val(value.substring(0, options.max));
                }
                $container.html($.fn.CharCounter.methods[options.method]($.fn.CharCounter.locales[options.locale], count, options.max, warning));
            };

        return this.each(function () {
            var $element = $(this),
                $container = getContainer($element);

            displayResult($element, $container);

            $element.on(options.events, function () {
                displayResult($element, $container);
            });
        });
    };

    $.fn.CharCounter.methods = {
        countdown: function (translator, count, max, warning) {
            count = max - count;
            count = count < 0 ? 0 : count;
            return translator.countdown(count, count > 1);
        },

        count: function (translator, count, max, warning) {
            return translator.count(count, count > 1);
        },

        countOnMax: function (translator, count, max, warning) {
            return translator.countOnMax(count, count > 1, max);
        },

        countdownAndTooMuch: function (translator, count, max, warning) {
            count = max - count;
            var tooMuch = count < 0 ? Math.abs(count) : 0;
            count = count < 0 ? 0 : count;
            return translator.countdownAndTooMuch(count, count > 1, tooMuch);
        },

        countAndTooMuch: function (translator, count, max, warning) {
            var tooMuch = (max - count) < 0 ? Math.abs(max - count) : 0;
            return translator.countAndTooMuch(count, count > 1, tooMuch);
        }
    };

    $.fn.CharCounter.locales = {};

    $.fn.CharCounter.locales.en = {
        countdown: function (count, plural) { return count + ' character' + (plural ? 's' : '') + ' remaining'; },
        count: function (count, plural) { return count + ' character' + (plural ? 's' : ''); },
        countOnMax: function (count, plural, max) { return this.count(count, plural) + ' / ' + max; },
        countdownAndTooMuch: function (count, plural, tooMuch) { return this.countdown(count, plural) + (tooMuch > 0 ? ' (' + tooMuch + ' too many)' : ''); },
        countAndTooMuch: function (count, plural, tooMuch) { return this.count(count, plural) + (tooMuch > 0 ? ' (' + tooMuch + ' too many)' : ''); }
    };

    $(document).ready(function(){
        $('[data-charcounter]').each(function () {
            $(this).CharCounter($(this).data('charcounter'));
        });
    });

}));
