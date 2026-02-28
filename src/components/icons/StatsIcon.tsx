import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
  top?: number;
};

export const StatsIcon: React.FC<Props> = ({ size = 24, color = '#9CA3AF', top = 6 }) => {
  return (
    <Svg
      width={size}
      height={size}
      style={{marginBottom:top, marginTop:top}}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path
        d="M3 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7 3v4h4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9 17l0 4"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 14l0 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13 13l0 8"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21 12l0 9"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

