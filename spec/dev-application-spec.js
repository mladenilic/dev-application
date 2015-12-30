'use strict';

describe('Dev application spec', function() {
  var application

  beforeEach(function () {
    application = new DevApplication();
  });

  it('should not throw on about()', function() {
    expect(application.about).not.toThrow();
  });
});
