# Banking App
Simple single-page banking application that consumes REST API.
Project was made using Vue 3 along with Vuex 4, Vue Router and Axios.
# Getting started
To get started, [NodeJS](https://nodejs.org) 12.0.0 or newer is required.
Also, you may need to set up your own API to consume, or use an API available at https://api.yawek.xyz/banking/.
1. Clone this repository using
```
git clone https://github.com/yawek9/banking-app.git
```
2. Install all modules required by project by
```
npm install
```
3. Configure API URL in `src/services/http/client.js` file as `baseURL`.
4. Build project running
```
npm run build
```
5. Deploy built project from /dist directory on any webserver.
# Details
Webpage allows you to sign up, log into an account, transfer funds to other accounts,
take loans and view actions history. Authentication is made by JSON Web Token with an access token and refresh token.
Tokens are stored in browser's local storage and used as needed. Axios' interceptors handle every request
and in case of access token expiration, new tokens are issued using saved refresh token
whose expiration time is longer. Example of running SPA is available at https://project.yawek.xyz/banking.