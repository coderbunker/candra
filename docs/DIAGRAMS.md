# Sequence Diagrams

## WhoIsThere? flow

Use: https://www.websequencediagrams.com/

```
title CommunityManagement (Candra)
Browser->Router: connects to router
Router->Candra: (cron) push MAC addresses connected + IP
Candra->Candra: update active / history
Browser->Candra: GET /
Candra->Browser: send main page with IP snitch
Browser->Browser: find local IP using WebRTC
Browser->Candra: GET /login?IP=xxx.xxx.xxx.xxx
Browser->Candra: selects OAuth
Candra->Browser: redirect to identity provider
Browser->Github: Authentication & Authorization
Github->Browser: redirect to Candra with token
Browser->Candra: submit token
Candra->Candra: lookup user in db
Candra->Candra: does not exist, create
Candra->Browser: set session
Candra->Browser: return membership selection page
Browser->Candra: POST membership 
Candra->Candra: mark user as registered
Candra->WhoIsThere: notify member present in the space
WhoIsThere->WhoIsThere: display profile image in list
```
