# *IttyURLi*
## A URL shortening service

A simple *Uniform Resource Locator* shortening web application.  The home page will allow the user to transform any URL into a pseudonym short URL. There is a second page which will show the full registry of shortened URLs available.

# Architecture

The author was motiviated to design and implement [*CINDI*](https://github.com/ultasun/cindi) during the creation of this web application.

- The front end is a [React](https://reactjs.org/) application.
- The middleware is very brief [Gulp](https://gulpjs.com) script.
  - The script interprets *HTTP* *GET* requests into [*Redis*](https://redis.io/) requests.
    - An opportunity for a formal realization of this technique came to light, and thus [*CINDI*](https://github.com/ultasun/cindi) was conceived.
- The back-end, is only *Redis*.

The author plans to complete the circle by implementing proper *CINDI* support for *IttyURLi*. In the mean time, enjoy this bit of history!

# Installing
## Automatic: Standalone *Docker* Image

The [available *Docker* image](https://hub.docker.com/r/ultasun/ittyurli) on [the hub](https://hub.docker.com) has three services running within.  ***This is the wrong way to use Docker!*** Stay tuned for a *Docker Compose Pack*.  Such a *Docker Compose Pack* might need to wait until after *IttyURLi* has proper *CINDI* support (and is no longer using *Gulp* for middleware.

Since the image has three services inside, and because there are mandatory environment variables, starting the container is a longer command:

`docker run -d -p 8080:8080 -p 8081:8081 -e ITTYURLI_HTTP_SERVER_PREFIX="http://localhost" -e ITTYURLI_HTTP_SERVER_PORTNO=8080 -t ultasun/ittyurli`

Be **sure** to update the value of the environment variable `ITTYURLI_HTTP_SERVER_PREFIX` or else the generated links will not work.  Make this the public-most DNS or IP address, but it must include the `http://` URI prefix.  See the generated `user-env.js`, after starting the container.

A third port publish `-p 6379:6379` is optional, this will expose the *Redis* service.

A named volume mount `-v ittyurli-redis:/var/lib/redis` is optional, this will persist the *Redis* database beyond the lifetime of the container. 

**Warning: this is not a [*rootless*](https://www.google.com/search?q=why+are+rootless+docker+containers+important) Docker image!**

## Manual installation

This procedure avoids using *Docker*.  First, install and start a *Redis* server instance.

Next, install *Gulp*:

`npm install -g gulp-cli`

Change into the directory containing the `package.json` file, and:

`npm install`

Start the middleware:

`gulp serve`

Check the `user-env.js` file to make sure the two `export const` variables exist, and are set appropriate for your installation.  See [`user-env.example.js`](https://github.com/ultasun/ittyurli/blob/master/user-env.example.js) for an example. **The links will not work** if this file is not set correctly.

Start the *React* front-end

`npm start`.

# Credits / Support

This is pre-alpha quality software.  See the `LICENSE`.  This software was written by a lone author, [*ultasun*](https://github.com/ultasun), and may be reached via a direct message on [Libera.Chat](https://libera.chat/).

Please do not open issues concerning *Gulp* because any future work put into *IttyURLi* will see that it will transition to utilizing *CINDI* for middleware.

Thanks for reading!



