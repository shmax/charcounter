# CharCounter

## THE character counter !

### Installation

    $ bower install charcounter
* Import jQuery
* Import js/charcounter.js
* Import all the js/locales/charcounter_locale_*.js you need
* Import css/charcounter.css if needed

#### Options

* **max** *integer* : the maximum number of characters authorized (default: 255)
* **method** *string* : the name of the method used to display the result (default: 'count')
* **warningRatio** *float* : the ratio that indicate when the warning class will be add (default: '0.2') - Set to 0 if you don't need it
* **truncateAfterMax** *boolean* : (default: false)
* **locale** *string* : the name of the locale used to translate the result (default: 'en')
* **containerTag** *string* : the name of the block used to contain the result (default: 'span')
* **containerClass** *string* : the name of the container's class (default: 'charcounter-container')
* **events** *string*: events that will be listened, separate with a space (default: 'keyup change')

#### Usage

With javascript :

    $(document).ready(function () {
        $('#textarea').CharCounter({
            // custom options here
        });
    });

With html data attributes:

    <textarea data-charcounter='{}'></textarea>

The data-charcounter value must be a json string representing an object to customize your options

#### Examples

    $(document).ready(function () {
        $('textarea').CharCounter({
            max: 15,
            locale: 'fr',
            warningRatio: 0.35
        });
    });

    <textarea data-charcounter='{"max": 15, "locale": "fr", "warningRatio": 0.35}'></textarea>

#### Add custom methods

    (function ($) {

        // First, create your custom method :

        $.fn.CharCounter.methods.yourCustomMethod = function (translator, count, max, warning) {
            // your process here
            return translator.yourCustomMethod(your arguments);
        };

        // Finally, write the translations you need

        $.fn.CharCounter.locales[en].yourCustomMethod = function(your arguments) { return 'what you want' };
        $.fn.CharCounter.locales[fr].yourCustomMethod = function(your arguments) { return 'ce que vous voulez' };

    }(jQuery));

