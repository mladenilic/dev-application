# Easily invite amazing developers to join your team

Lets face it. Companies are facing hard times when wanting to hire amazing developers. Everybody claims they hire "rock stars", however, there is so much rubbish code out there, and situation is getting worse.

## Here is the solution!

**Developers** usually inspect pages they find interesting. This is not done by other users. So, it is a good idea to show them you are looking for them.

With "Dev Application" you can easily render your custom tailored messages to developers and lead them to apply to open position at your company.

All you need to do is include ```dev-application.js``` into your website header and initialise following messages:
- welcome
- about
- error
- success

Everything else is handled by "Dev Application".

## Please follow these examples in order to use and customise output

### Initialise app and customise welcome message
```
var AcmeApplication = new DevApplication({
    messages: {
        welcome: {
            title: 'Welcome to Acme Inc. We are looking for you. Are you willing to learn how deep is the rabbit hole?',
            content: ['Type AcmeApplication.about(); into your console to find out more']
        }
    }
});
```

To stay up to date - _Click "Watch" in top right corner._
