# Device timer operator
Front-end application for monitoring and managing device timers

## Debug
Use `npm run build:dev:watch` to build the app in dev mode to output folder `dist\device-timer-operator\browser`, which can be configured as environment variable so `device-timer-service` app can serve it. This helps simulating the same configuration as in production environment - the `device-timer-service` serves the `device-timer-operator` front-end static files as well as the web socket connection on same origin. This is important, because the server certificates are usually untrusted/self-signed and if the front-end files are served on different origin compared to where the server listens for web socket connections, the user must manually open new tab pointing to `https://<Ip address where the server listens for web socket connections>:65446/` and accept certificate in order to be able to connect to the server.

When the app is built and `device-timer-services` is ready to serve it, navigate to `https://<Ip address of the local machine>:65446/`. Client certificate is not required to connect to the server but if the server allows client certificate to be specified and if there are client certificates with `Client authentication` key usage and private key installed for the current user (usually in `Personal` store in Windows), the browser will ask to chose one.
