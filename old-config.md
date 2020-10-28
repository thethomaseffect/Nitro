# Old Config

Here are some bits that might be needed someday

```json
{
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
```
