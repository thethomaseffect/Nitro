{
  "name": "nitro",
  "version": 2,
  "build": {
    "env": {
      "UNIQUEID_AUTH0_DOMAIN": "@uniqueid-auth0-domain",
      "UNIQUEID_AUTH0_CLIENT_ID": "@uniqueid-auth0-client-id"
    }
  },
  "env": {
    "UNIQUEID_USER_ID_SECRET": "@uniqueid-user-id-secret"
  },
  "regions": ["bru"],
  "redirects": [
    {
      "source": "^/service-worker.js$",
      "destination": "/_next/public/service-worker.js"
    }
  ],
  "headers": [
    {
      "source": "^/service-worker.js$",
      "headers": [
        {
          "key": "cache-control",
          "value": "public, max-age=43200, immutable"
        },
        {
          "key": "Service-Worker-Allowed",
          "value": "/"
        }
      ]
    }
  ]
}
