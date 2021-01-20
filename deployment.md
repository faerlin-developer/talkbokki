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

Create a new remote branch called `heroku`.

```bash
heroku create talkbokki
```

Using the Heroku web platform, set the necessary environment variables from `config.env`. Alternatively,

```bash
heroku config:set NODE_ENV=production
```

Note that only the `master` branch must push to this remote branch. 

```bash
git push heroku master
```

Open the web application:

```bash
heroku open
```

Display the logs:

```
heroku logs --tail
```