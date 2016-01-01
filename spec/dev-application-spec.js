'use strict';

describe('Dev application spec', function() {
  var TestApplication;

  beforeEach(function () {
    TestApplication = new DevApplication();
  });

  it('should be able to print about', function() {
    expect(TestApplication.about()).toBe(true);
  });

  it('should be able to start application', function() {
    expect(TestApplication.start()).toBe(true);
  });

  describe('when application has been started', function () {
    beforeEach(function () {
        TestApplication.start();
    });

    it('should be able to add cv', function () {
        expect(TestApplication.addCv('http://example-cv.com')).toBe(true);
    });

    describe('when cv has been added', function () {
        beforeEach(function () {
            TestApplication.addCv('http://example-cv.com');
        });

        it('should be able to finish application', function () {
            expect(TestApplication.finish()).toBe(true);
        });
    });
  });
});
