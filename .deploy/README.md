# Deployment to server

## installation

Review mup.json for configuration (example: change username to yours)

install mupx tool and initiate setup

```
npm -g install mupx
mupx setup
```

## Deployment

```
cd .deploy/members.hackacademy.org
mupx deploy
```

## Configuration

for each app, symlink to the correct deployment setting

```
cd .deploy/members.hackacademy.org
ln -s ../.secrets/settings/members.hackacademy.org.json settings.json
```