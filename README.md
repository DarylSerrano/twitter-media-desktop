# Twitter Media Desktop

Desktop app for displaying media only.

Made with [electron-react-boilerplate ver 1.2.0](https://github.com/electron-react-boilerplate/electron-react-boilerplate)

# Caveats

You must have twitter App keys and for supporting user login in your callback urls, you must allow:
`http://127.0.0.1:4200/login/callback`

There is a file where api keys are stored on, `API_KEYS.json` file containing api keys, an example of the file:

```json
{
  "TWITTER_CONSUMER_KEY": "key",
  "TWITTER_CONSUMER_SECRET": "key"
}
```

- On windows, usually the path is: `C:\Users\<YOUR_USERNAME>\AppData\Roaming\Electron\storage`
- On Linux, usually the path is: `$HOME/.config/Electron/storage/`

# Install

# Development

```bash
yarn dev
```

# Packaging
