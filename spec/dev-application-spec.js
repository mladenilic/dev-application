describe('DevApplication', function() {
  var application = new DevApplication();

  it('should not throw on about()', function() {
    expect(application.about).not.toThrow();
  });
});
