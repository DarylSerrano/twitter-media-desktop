# Twitter Media Desktop

Twitter desktop app for filtering tweets that have images or video only.

Made with [electron-react-boilerplate ver 1.2.0](https://github.com/electron-react-boilerplate/electron-react-boilerplate)

![Mini preview](https://i.imgur.com/3xw3GfX.gif)

## Features

- Like and retweet.
- Search users and filter for media only tweets.
- Filter the timeline of user logged in.
- Share tweet.
- Download tweet images/video.

## Install

Just download the [latest](https://github.com/DarylSerrano/twitter-media-desktop/releases) Windows or Linux release, unzip and start the application.

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

On Linux, usually the path is:

- `$HOME/.config/TwitterMediaDesktop/storage/`

## Development

```bash
$ git clone https://github.com/DarylSerrano/twitter-media-desktop.git
$ cd twitter-media-desktop
$ yarn
$ yarn dev
```

Paths api keys on development mode:

- `C:\Users\<YOUR_USERNAME>\AppData\Roaming\Electron\storage` for Windows.
- `$HOME/.config/Electron/storage/` for Linux.

## Packaging for Production

```
yarn package
```

## Contribute

This is a personal project but feel free to contribute (PR-s and issues are welcomed).

## License

[MIT license](https://github.com/DarylSerrano/twitter-media-desktop/blob/master/LICENSE)
