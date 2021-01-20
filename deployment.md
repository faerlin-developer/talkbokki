# __Deployment__

Deploying in the Heroku environment requires the `engines` entry in `package.json`:

```json
  "engines": {
    "node": ">=10.0.0"
  }
```

Install Heroku NodeJS client:

```bash
sudo snap install heroku --classic
```

Login to Heroku CLI:

```bash
heroku login
```