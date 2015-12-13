# CANDRA: Community Advanced Networked Directory & Resources Administration

This project was created as part of the Global Meteor 2015 competition (Oct 10th to Oct 12th 2015).

[Our submission to the competition](docs/METEOR-2015.md)

Test our demo at: http://candra.meteor.com

## Goals

Streamlining the new members onboarding process is an important part as is creating a sense of excitement for new members or between active members is important.

Typical tasks include:

* authentication 
* membership option (duration) selection 
* payment
* profile
* resources search and reservation

## Installation

### Meteor

```
curl https://install.meteor.com/ | sh
git clone git@github.com:codersfield/candra.git
cd candra
git-crypt unlock ../git-crypt-hackacademy-key-file
meteor run --settings secrets/settings/localhost-3000.json
```

