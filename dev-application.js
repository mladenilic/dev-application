var DevApplication = (function () {
    var statusFlag = 0;

    const FLAG_INIT   = 00000001;
    const FLAG_START  = 00000010;
    const FLAG_ADD_CV = 00000100;
    const FLAG_FINISH = 00001000;

    var _options = {
        messages: {
            welcome: {
                title: '<3 web development? start a DevApplication',
                content: ['DevApplication.about() for more info']
            },
            about: ['Thanks for using DevApplication. Please start your application.'],
            error: {
                finish: 'Already? There are still few steps left.',
                default: ['Hold on. You took a wrong turn.']
            },
            success: {
                start: 'First step completed! Please add your CV.',
                default: ['Success!']
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

    var _printError = function (message) {
        var errorMessages = _options.messages.error.default;
        Message.new().text(message || errorMessages[Math.floor(Math.random() * errorMessages.length)])
            .style('color', _options.styles.color.error)
            .style('font-size', _options.styles.size.default)
            .print();
    }

    var _printSuccess = function (message) {
        var successMessages = _options.messages.success.default;
        Message.new().text(message || successMessages[Math.floor(Math.random() * successMessages.length)])
            .style('color', _options.styles.color.success)
            .style('font-size', _options.styles.size.default)
            .print();
    }

    return {
        init: function (options) {
            if (statusFlag & FLAG_INIT) {
                _printError();
                return;
            }

            for (var i in options) {
                _options[i] = options[i];
            }

            _printTitle(_options.messages.welcome.title);
            _printMessages(_options.messages.welcome.content);
            console.log(this);

            statusFlag |= FLAG_INIT;
        },
        about: function () {
            _printMessages(_options.messages.about);
        },
        start: function () {
            _printSuccess(_options.messages.success.start);
        },
        finish: function () {
            if (!_canFinish()) {
                _printError('');
            }
        },
    };
})();
