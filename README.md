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

## See examples in order to customise the application process

### Initialise app and customise messages

This first example is showing you all the options you can use in order to cutomize the output, while second one would be more like something you would use in real life.

```
var Acme = new DevApplication({
    messages: {
        welcome: {
            title: 'We are looking for you... are you willing to learn how deep is the rabbit hole?',
            content: ['Type Acme.about(); into your console to find out more']
        },
        about: ['Welcome to Acme Inc. We are looking for web developers. Please start your application by typing: Acme.start();'],
        error: {
            start: 'Please start application first.',
            started: 'Again?',
            cv: 'Not a valid CV url.',
            finish: 'Already? There are still few steps left.',
            finished: 'Your application has already been sent.',
            default: ['Hold on. You took a wrong turn.']
        },
        success: {
            start: 'First step completed! Please add url to your CV like this: Acme.addCv(\'https://dropbox.com/mycv.pdf\');',
            cv: 'CV added! Please finish your application by typing Acme.finish();',
            finish: 'Hooray! Aplication has been set.',
            default: ['Success!']
        }
    }
});
```

### Customise

Of course, the idea is not to write everything out to a user unless if you are looking for a complete beginner. An initial hint where they can find object by showing first function ```Acme.about()``` should be just enough for experienced developer to find available functions and go through the process on their own. In real-life scenario, we would customize messages not to render all the functions.

```
var Acme = new DevApplication({
    messages: {
        welcome: {
            title: 'We are looking for you... are you willing to learn how deep is the rabbit hole?',
            content: ['Type Acme.about(); into your console to find out more.']
        },
        about: ['Welcome to Acme Inc. We are looking for remarkable web developers like you. If you would like to join our team, please find available functions and proceed with the application process. Please note that CV can be either your public Google drive or Dropbox file, or URL to your GitHub profile. We\'re looking forward to hearing from you. Good luck!'],
    }
});
```


To stay up to date - _Click "Watch" in top right corner._
