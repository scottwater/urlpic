# UrlPic

UrlPic provides a simple way to capture a snapshot (png, jpeg, pdf) of any publically accessible URL.

The API looks something like this: 

https://yourinstall.com/capture?token=YOUR_SECRET_TOKEN&url=https://scottw.com

## Parameters

Required Parameters:

* **token** -  the combination of the `url` you wish to capture + `:` + a secret.
* **url** - the url you wish to capture

Other optional parameters:

  * **height** - the viewport height (default: 1200).
  * **width** - the viewport width (default: 1600)
  * **ttl** - how long should this image be cached in seconds. You can optionally use words like 1hour, 2days, and 3years (default: 1 hour)
  * **fileType** - type of file to catpure. Options png, jpeg, or pdf (default: png)
  * **fullPage** - if 1, the full page will be capture. This will ignore the height on the view port. (default: 0)
  
# Try It Yourself.

UrlPic is designed to be easily deployable to [Now](https://zeit.co/now).

Assuming you have both git and now installed:

1. `git clone git@github.com:scottwater/urlpic.git`
2. `now secrets add token-key "a secret key"`
3. `now`

# Installing locally

1. `git clone git@github.com:scottwater/urlpic.git`
2. `yarn install`
3. Add a .env file with one key: TOKEN_KEY=yoursecret
4. `yarn run dev`

# Generating a signed token

It could get costly if anyone could use your instance. To protect against this, each request is must be signed using your `token-key` you set in step #2 or placed in your .env file for local testing.

The signature is the MD5 hash of the `URL` being requested + `:` + `your secret`.

To make this easy to test, you can run the following command locally:

`yarn run tokenize https://scottw.com` 

If you happen to have different "secrets" you can pass them via the --token flag like this:

`yarn run tokenize https://scottw.com --token mysecret`

# Prior Art

Much of the code (especially chromium.ts) was extracted from the [og-image](https://github.com/zeit/og-image) app. 

# Tests

There are only a handful of tests, but they can be run:

`yarn run test`