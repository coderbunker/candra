# Sequence Diagrams

## WhoIsThere? flow

Use: https://www.websequencediagrams.com/

```
title CANDRA WhoIsThere? flow
Browser->Router: connects to router
Browser->Candra: GET /
Candra->Browser: send main page with IP snitch
Browser->Browser: find local IP using WebRTC
Browser->Candra: GET /login?IP={xxx.xxx.xxx.xxx,...}
Candra->Browser: set local IPs in temporary session
Browser->Candra: selects OAuth
Candra->Browser: redirect to identity provider
Browser->Github: Authentication & Authorization
Github->Browser: redirect to Candra with token
Browser->Candra: submit token
Candra->Candra: lookup user in db
Candra->Candra: does not exist, create
Candra->Browser: set session
Candra
Candra->Browser: return membership selection page
Browser->Candra: POST membership 
Candra->Candra: mark user as registered
Router->Candra: (cron) push MAC addresses connected + IP
Candra->Candra: record public IP of router
Candra->Candra: update active / history of each IP -> MAC
Candra->Candra: match/associate IP<->MAC and MAC<->user
Candra->WhoIsThere: notify members present in the space
WhoIsThere->WhoIsThere: display profile image in list
```
