# Twitter Media Desktop

Twitter desktop app for displaying media only.

Made with [electron-react-boilerplate ver 1.2.0](https://github.com/electron-react-boilerplate/electron-react-boilerplate)

## Install

Just download the [latest](https://github.com/DarylSerrano/twitter-media-desktop/releases) windows or linux release, unzip and start the application.

## Development

```bash
yarn dev
```

## Packaging for Production

```
yarn package
```

## Caveats

- You must have Twitter App keys.
- For supporting user login in your callback urls, in your Twitter App settings you must enable 3rd party authentication and allowing the callback url:
  `http://127.0.0.1:4200/login/callback`

- Make sure that your twitter application has Read and Write permissions

- There is a file where api keys are stored on, `API_KEYS.json` file containing api keys, an example of the file:

```json
{
  "TWITTER_CONSUMER_KEY": "key",
  "TWITTER_CONSUMER_SECRET": "key"
}
```

On windows, usually the path is:

- `C:\Users\<YOUR_USERNAME>\AppData\Roaming\TwitterMediaDesktop\storage`
- `C:\Users\<YOUR_USERNAME>\AppData\Roaming\Electron\storage` for development.

On Linux, usually the path is:

- `$HOME/.config/TwitterMediaDesktop/storage/`
- `$HOME/.config/Electron/storage/` for development

## License

[MIT](https://github.com/DarylSerrano/twitter-media-desktop/blob/master/LICENSE)
