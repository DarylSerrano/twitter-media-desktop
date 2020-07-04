import app from './app';
import TwitterClient from './TwitterClient';

/**
 * Start Express server.
 */
export default async function createServer() {
  const server = app.listen(app.get('port'), () => {
    console.log(
      '  App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env')
    );
    console.log('  Press CTRL-C to stop\n');
  });

  await TwitterClient.start();

  return server;
}
