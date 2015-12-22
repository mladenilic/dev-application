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
			fontSize: 15,
            colors: {
                title: '#ff6f00',
                error: '#f00',
                success: '#0f0',
                default: '#333'
            }
		}
	};

	var _write = function (text, color, size) {
		console.log('%c' + text, ['color: ', color, '; font-size: ', size, 'px;'].join(''));
	};

    var _printTitle = function (title) {
        _write(title, _options.styles.colors.title, parseInt(_options.styles.fontSize  * 1.3));
    };

    var _printMessages = function (messages) {
        for (var i = 0; i < messages.length; i++) {
            _write(messages[i], _options.styles.colors.default, _options.styles.fontSize);
        };
    };

	var _printError = function () {
        var errorMessages = _options.messages.error.default;
		_write(
			errorMessages[Math.floor(Math.random() * errorMessages.length)],
			_options.styles.colors.error,
            _options.styles.fontSize
		);
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

		}
	};

})();
