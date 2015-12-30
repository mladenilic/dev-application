var DevApplication = (function () {
    'use strinct';

    var Config = (function () {

        var config = {
            messages: {
                welcome: {
                    title: '<3 web development? start a DevApplication',
                    content: ['DevApplication.about() for more info']
                },
                about: ['Thanks for using DevApplication. Please start your application.'],
                error: {
                    start: 'Please start application first.',
                    started: 'Again?',
                    cv: 'Not a valid CV url.',
                    finish: 'Already? There are still few steps left.',
                    finished: 'Your application has already been sent.',
                    default: ['Hold on. You took a wrong turn.']
                },
                success: {
                    start: 'First step completed! Please add url to your CV.',
                    cv: 'CV added! Please finish your application.',
                    finish: 'Hooray! Aplication has been set.',
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

        var merge = function (dest, src) {
            Object.keys(src || {}).forEach(function (i) {
                if (src[i] && src[i].constructor && src[i].constructor === Object) {
                    dest[i] = dest[i] || {};
                    merge(dest[i], src[i]);
                } else {
                    dest[i] = src[i];
                }
            });

            return dest;
        };

        return {
            init: function (options) {
                config = merge(config, options);
            },
            data: config
        };

    }());

    var Request = (function () {

        var params = function (object) {
            var encodedString = '';
            Object.keys(object).forEach(function (i) {
                if (encodedString.length > 0) {
                    encodedString += '&';
                }
                encodedString += encodeURI(i + '=' + object[i]);
            });

            return encodedString;
        };

        return function (url) {
            var xhr = new XMLHttpRequest(), self = this;
            this.url = url;

            this.success = function (callback) {
                this.onSuccess = callback;

                return this;
            };

            this.error = function (callback) {
                this.onError = callback;

                return this;
            };

            this.post = function (data) {
                xhr.open('POST', this.url);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

                xhr.onreadystatechange = function () {
                    if (4 === xhr.readyState) {
                        if (200 === xhr.status) {
                            self.onSuccess.call(self, xhr.responseText);
                        } else {
                            self.onError.call(self, xhr);
                        }
                    }
                };

                xhr.send(params(data));
            };
        };
    }());

    var Message = (function () {

        return function () {
            var defaultText = '', messageStyles = {};

            this.print = function (text) {
                var computedStyles = '';
                Object.keys(messageStyles).forEach(function (i) {
                    computedStyles += i + ': ' + messageStyles[i] + ';';
                });

                console.log('%c' + text || defaultText, computedStyles);

                return this;
            };

            this.text = function (text) {
                defaultText = text;

                return this;
            };

            this.style = function (key, value) {
                messageStyles[key] = value;

                return this;
            };

            this.styles = function (styles) {
                messageStyles = styles;

                return this;
            };
        };

    }());

    return function (options) {
        var statusFlag = 0, data = {};

        const FLAG_INIT = 0x01;
        const FLAG_START = 0x02;
        const FLAG_ADD_CV = 0x04;
        const FLAG_FINISH = 0x08;

        const FLAG_CAN_ADD_CV = FLAG_INIT | FLAG_START;
        const FLAG_CAN_FINISH = FLAG_CAN_ADD_CV | FLAG_ADD_CV;

        var _printTitle = function (title) {
            new Message().style('color', Config.data.styles.color.title)
                .style('font-size', Config.data.styles.size.title)
                .print(title);
        };

        var _printMessages = function (messages) {
            var message = new Message().styles({
                'color': Config.data.styles.color.default,
                'font-size': Config.data.styles.size.default
            });

            messages.forEach(function (text) {
                message.print(text);
            });
        };

        var _printError = function (message) {
            var errorMessages = Config.data.messages.error.default;
            new Message().styles({
                'color': Config.data.styles.color.error,
                'font-size': Config.data.styles.size.default
            }).print(message || errorMessages[Math.floor(Math.random() * errorMessages.length)]);
        };

        var _printSuccess = function (message) {
            var successMessages = Config.data.messages.success.default;
            new Message().styles({
                'color': Config.data.styles.color.success,
                'font-size': Config.data.styles.size.default
            })
            .print(message || successMessages[Math.floor(Math.random() * successMessages.length)]);
        };

        this.about = function () {
            _printMessages(Config.data.messages.about);

            return true;
        };

        this.start = function () {
            if (statusFlag & FLAG_START) {
                _printError(Config.data.messages.error.started);
                return false;
            }

            _printSuccess(Config.data.messages.success.start);
            statusFlag |= FLAG_START;
            return 0;
        };

        this.addCv = function (url) {
            if ((statusFlag & FLAG_CAN_ADD_CV) !== FLAG_CAN_ADD_CV) {
                _printError(Config.data.messages.error.start);
                return false;
            }

            data.cv = url;

            if (!data.cv) {
               _printError(Config.data.messages.error.cv);
               statusFlag &= ~FLAG_ADD_CV;
               return false;
            }

            _printSuccess(Config.data.messages.success.cv);
            statusFlag |= FLAG_ADD_CV;

            return true;
        };

        this.finish = function () {
            if ((statusFlag & FLAG_CAN_FINISH) !== FLAG_CAN_FINISH) {
                _printError(Config.data.messages.error.finish);
                return false;
            }

            if (statusFlag & FLAG_FINISH) {
                _printError(Config.data.messages.error.finished);
                return false;
            }

            if (Config.data.submitPath) {
                new Request(Config.data.submitPath).success(function (data) {
                    if (data) {
                        _printSuccess(data);
                    }

                    _printSuccess(Config.data.messages.success.finish);
                }).post(data);
            } else {
                _printSuccess(Config.data.messages.success.finish);
            }

            statusFlag |= FLAG_FINISH;

            return true;
        };

        Config.init(options);

        _printTitle(Config.data.messages.welcome.title);
        _printMessages(Config.data.messages.welcome.content);

        statusFlag |= FLAG_INIT;
    };
}());
