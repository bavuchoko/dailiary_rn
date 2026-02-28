import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
};

export const CircleXIcon: React.FC<Props> = ({
  size = 24,
  color = '#FFFFFF',
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round">
    <Path d="M0 0h24v24H0z" fill="none" stroke="none" />
    <Path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
    <Path d="M10 10l4 4m0 -4l-4 4" />
  </Svg>
);
