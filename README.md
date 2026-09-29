# Country Club Members

The Country Club member dashboard includes administrator sign-in, member management, and an eight-hour browser-tab session.

## Run locally

```sh
npm install
npm run dev
```

The local demo credentials are `admin@countryclub.local` and `clubadmin123`. To override them for a local build, set `VITE_ADMIN_EMAIL` and `VITE_ADMIN_PASSWORD` in a `.env.local` file.

This sign-in is a frontend demonstration, not production authentication. Vite exposes `VITE_` values to the client bundle, and browser session storage can be edited by the user. Protect real member data with a server-side login and authorization check.
