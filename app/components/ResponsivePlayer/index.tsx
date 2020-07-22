import React from 'react';

import ReactPlayer from 'react-player';
import styles from './resposivePlayer.css';

type ResponsivePlayerProps = {
  url: string | undefined;
  loop?: false | boolean;
  controls?: false | boolean;
};

export default function ResponsivePlayer({
  controls,
  loop,
  url,
}: ResponsivePlayerProps) {
  return (
    <div className={styles.playerWrapper}>
      <ReactPlayer
        className={styles.reactPlayer}
        url={url}
        width="100%"
        height="100%"
        controls={controls}
        loop={loop}
      />
    </div>
  );
}
