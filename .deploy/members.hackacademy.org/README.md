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
mupx deploy
```

## Configuration

From .deploy:

```
ln -s ../secrets/settings/members.hackacademy.org.json settings.json
```