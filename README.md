# Untitled Job Site

## Setting Up

Run `vercel env pull` to pull the local env var config.

## Auth0 Test Application Configuration

Callback URL: `http://localhost:8080/auth0_callback`
Logout: `http://localhost:8080`
Allowed Origins: `http://localhost:8080`

### Environment Variables

Use a `.env.local` file for development, then before merging changed add them to the vercel dashboard. You should always do a `vercel env pull` to confirm everything looks okay locally before changing preview and production. It can then be accessed via `process.env.SECRET_KEY` in server-side application code.

For client-side start the env var with `NEXT_PUBLIC_`. Note that no real secrets should be exposed this way since they are available to the client, this is used for things that change between environments such as backend domains etc.
