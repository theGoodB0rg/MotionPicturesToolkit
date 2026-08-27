import React, { CSSProperties } from 'react';
import { DeviceModelType } from '@motion-pictures/core';
import { SafariBrowserFrame } from './SafariBrowserFrame.js';
import { MacBookMockup } from './MacBookMockup.js';
import { IPhone16Mockup } from './IPhone16Mockup.js';

export interface DeviceContainerProps {
  device?: DeviceModelType;
  material?: 'photorealistic' | 'clay' | 'glass';
  url?: string;
  title?: string;
  shadow?: boolean;
  style?: CSSProperties;
  children: React.ReactNode;
}

export const DeviceContainer: React.FC<DeviceContainerProps> = ({
  device = 'macbook-pro-16',
  material = 'photorealistic',
  url,
  title,
  shadow = true,
  style = {},
  children,
}) => {
  if (device === 'none') {
    return <div style={{ width: '100%', height: '100%', ...style }}>{children}</div>;
  }

  if (device === 'safari-browser') {
    return (
      <SafariBrowserFrame
        url={url}
        title={title}
        theme={material === 'clay' ? 'light' : 'glass'}
        shadow={shadow}
        style={style}
      >
        {children}
      </SafariBrowserFrame>
    );
  }

  if (device === 'iphone-16-pro' || device === 'clay-phone') {
    return (
      <IPhone16Mockup
        chassisColor={device === 'clay-phone' || material === 'clay' ? 'clay' : 'natural-titanium'}
        shadow={shadow}
        style={style}
      >
        {children}
      </IPhone16Mockup>
    );
  }

  // Default: macbook-pro-16
  return (
    <MacBookMockup
      chassisColor={material === 'clay' ? 'clay' : 'space-black'}
      shadow={shadow}
      style={style}
    >
      {children}
    </MacBookMockup>
  );
};
