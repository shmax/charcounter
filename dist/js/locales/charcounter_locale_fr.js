(function ($) {

    $.fn.CharCounter.locales['fr'] = {
        countdown: function (count, plural) { return count + ' caractère' + (plural ? 's' : '') + ' restant' + (plural ? 's' : ''); },
        count: function (count, plural) { return count + ' caractère' + (plural ? 's' : ''); },
        countOnMax: function (count, plural, max) { return this.count(count, plural) + ' / ' + max; },
        countdownAndTooMuch: function (count, plural, tooMuch) { return this.countdown(count, plural) + (tooMuch > 0 ? ' (' + tooMuch + ' en trop)' : ''); },
        countAndTooMuch: function (count, plural, tooMuch) { return this.count(count, plural) + (tooMuch > 0 ? ' (' + tooMuch + ' en trop)' : ''); }
    };

}(jQuery));
