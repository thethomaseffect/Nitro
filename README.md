# Untitled Job Site

## Setting Up

Run `cp .env.build.template .env.build && cp .env.template .env` and replace the values with the real ones for the test application to enable login.

## Auth0 Test Application Configuration

Callback URL: `http://localhost:8080/auth0_callback`
Logout: `http://localhost:8080`
Allowed Origins: `http://localhost:8080`

## Adding Secrets

```
 npx vercel secrets add secret-dash-separated-key secretvalue
```

Note that whatever the secret value is would be saved to command history, so be careful
of this. Either manually remove it afterwards or use a technique such as this for your
shell https://serverfault.com/questions/241154/run-command-in-bash-without-save-in-history

### Server-Side

Add to the `.env` file, remembering to add a dummy value to `.env.template` for committing, then add it to the `.now.json` env section (NOT the one nested under build), making sure to use the same style as previously added entries. It can then be accessed via `process.env.SECRET_KEY` in server-side application code. Note that for production environments the `.env` file will not be available and the secrets will need to be added using the vercel CLI tool.

### Client-Side

Add to the `.env.build` file, remembering to add a dummy value to `.env.build.template` for committing, then add it to the `next.config.js` env section, making sure to use the same style as previously added entries. It can then be accessed via `process.env.SECRET_KEY` in client-side application code. Note that no real secrets should be exposed this way since they are available to the client, this is used for things that change between environments such as backend domains etc.
