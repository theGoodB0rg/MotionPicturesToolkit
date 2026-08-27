import React from 'react';
import { Composition } from 'remotion';
import { MainPromo } from './compositions/MainPromo.js';
import config from '../motion.config.js';
import storyboard from '../storyboard.js';

export const RemotionRoot: React.FC = () => {
  const totalDurationSeconds = storyboard.scenes.reduce(
    (acc, scene) => acc + scene.durationSeconds,
    0
  );
  const durationInFrames = Math.round(totalDurationSeconds * config.video.fps);

  return (
    <>
      <Composition
        id="MainPromo"
        component={MainPromo}
        durationInFrames={durationInFrames}
        fps={config.video.fps}
        width={config.video.width}
        height={config.video.height}
        defaultProps={{}}
      />
    </>
  );
};
