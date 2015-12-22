var DevApplication = (function () {
    var _canInit = true;

    var _options = {
        messages: {
            welcome: {
                title: '<3 web development? start a DevApplication',
                content: ['DevApplication.about() for more info']
            },
            about: ['Thanks for using DevApplication'],
            error: {
                default: [
                    'Hold on. You took a wrong turn.',
                    'No, no, no',
                    'Ain\'t gonna happen'
                ]
            }
        },
        styles: {
            size: {
                title: '20px',
                default: '15px'
            },
            color: {
                title: '#ff6f00',
                error: '#f00',
                success: '#0f0',
                default: '#333'
            }
        }
    };

    var Message = (function () {

        var Message = function () {
            var _text = '', styles = {};

            this.print = function () {
                var computedStyles = '';
                for (var i in styles) {
                    computedStyles += i + ': ' + styles[i] + ';';
                }

                console.log('%c' + _text, computedStyles);

                return this;
            };

            this.text = function (text) {
                _text = text;

                return this;
            };

            this.style = function (key, value) {
                styles[key] = value;

                return this;
            };
        };

        return {
            new: function () {
                return new Message();
            }
        }

    })();

    var _printTitle = function (title) {
        Message.new()
            .text(title)
            .style('color', _options.styles.color.title)
            .style('font-size', _options.styles.size.title)
            .print();
    };

    var _printMessages = function (messages) {
        var message = Message.new()
            .style('color', _options.styles.color.default)
            .style('font-size', _options.styles.size.default);

        for (var i = 0; i < messages.length; i++) {
            message.text(messages[i]).print();
        };
    };

    var _printError = function () {
        var errorMessages = _options.messages.error.default;
        Message.new().text(errorMessages[Math.floor(Math.random() * errorMessages.length)])
            .style('color', _options.styles.color.error)
            .style('font-size', _options.styles.color.default)
            .print();
    }

    return {
        init: function (options) {
            if (!_canInit) {
                _printError();
                return;
            }

            for (var i in options) {
                _options[i] = options[i];
            }

            _printTitle(_options.messages.welcome.title);
            _printMessages(_options.messages.welcome.content);
            console.log(this);

            _canInit = false;
        },
        about: function () {
            _printMessages(_options.messages.about);
        },
        apply: function () {

        },
    };
})();
