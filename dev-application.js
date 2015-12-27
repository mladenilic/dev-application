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

        var merge = function(dest, src) {
            for (var property in src) {
                if (src[property] && src[property].constructor && src[property].constructor === Object) {
                  dest[property] = dest[property] || {};
                  arguments.callee(dest[property], src[property]);
                } else {
                  dest[property] = src[property];
                }
            }

            return dest;
        };

        return {
            init: function (options) {
                config = merge(config, options);
            },
            data: config
        };

    })();

    var Request = (function () {

        var params = function (object) {
            var encodedString = '';
            for (var prop in object) {
                if (object.hasOwnProperty(prop)) {
                    if (encodedString.length > 0) {
                        encodedString += '&';
                    }
                    encodedString += encodeURI(prop + '=' + object[prop]);
                }
            }

            return encodedString;
        }

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
                        }  else {
                            self.onError.call(self, xhr);
                        }
                    }
                };

                xhr.send(params(data));
            }
        }
    })();

    var Message = (function () {

        var Message = function () {
            var defaultText = '', messageStyles = {};

            this.print = function (text) {
                var computedStyles = '';
                for (var i in messageStyles) {
                    computedStyles += i + ': ' + messageStyles[i] + ';';
                }

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
            }
        };

        return {
            new: function () {
                return new Message();
            }
        }

    })();

    return function (options) {
        var statusFlag = 0, data = {};

        const FLAG_INIT   = 0b00000001;
        const FLAG_START  = 0b00000010;
        const FLAG_ADD_CV = 0b00000100;
        const FLAG_FINISH = 0b00001000;

        const FLAG_CAN_ADD_CV = FLAG_INIT | FLAG_START;
        const FLAG_CAN_FINISH = FLAG_CAN_ADD_CV | FLAG_ADD_CV;

        var _printTitle = function (title) {
            Message.new().style('color', Config.data.styles.color.title)
                .style('font-size', Config.data.styles.size.title)
                .print(title);
        };

        var _printMessages = function (messages) {
            var message = Message.new().styles({
                'color': Config.data.styles.color.default,
                'font-size': Config.data.styles.size.default
            });

            for (var i = 0; i < messages.length; i++) {
                message.print(messages[i]);
            };
        };

        var _printError = function (message) {
            var errorMessages = Config.data.messages.error.default;
            Message.new().styles({
                'color': Config.data.styles.color.error,
                'font-size': Config.data.styles.size.default
            }).print(message || errorMessages[Math.floor(Math.random() * errorMessages.length)]);
        }

        var _printSuccess = function (message) {
            var successMessages = Config.data.messages.success.default;
            Message.new().styles({
                'color': Config.data.styles.color.success,
                'font-size': Config.data.styles.size.default
            })
            .print(message || successMessages[Math.floor(Math.random() * successMessages.length)]);
        }

        this.about = function () {
            _printMessages(Config.data.messages.about);
        };

        this.start = function () {
            if (statusFlag & FLAG_START) {
                _printError(Config.data.messages.error.started);
                return;
            }

            _printSuccess(Config.data.messages.success.start);
            statusFlag |= FLAG_START;
        };

        this.addCv = function (url) {
            if ((statusFlag & FLAG_CAN_ADD_CV) !== FLAG_CAN_ADD_CV) {
                _printError(Config.data.messages.error.start);
                return;
            }

            data.cv = url;

            if (!data.cv) {
               _printError(Config.data.messages.error.cv);
               statusFlag &= ~FLAG_ADD_CV;
               return;
            }

            _printSuccess(Config.data.messages.success.cv);
            statusFlag |= FLAG_ADD_CV;
        };

        this.finish = function () {
            if ((statusFlag & FLAG_CAN_FINISH) !== FLAG_CAN_FINISH) {
                _printError(Config.data.messages.error.finish);
                return;
            }

            if (statusFlag & FLAG_FINISH) {
                _printError(Config.data.messages.error.finished);
                return;
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
        };

        Config.init(options);

        _printTitle(Config.data.messages.welcome.title);
        _printMessages(Config.data.messages.welcome.content);

        statusFlag |= FLAG_INIT;
    }
})();
