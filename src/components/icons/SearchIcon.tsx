import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  size?: number;
  color?: string;
  top?: number;
};

export const SearchIcon: React.FC<Props> = ({ size = 24, color = '#9CA3AF', top=6 }) => {
  return (
    <Svg
      width={size}
      height={size}
      style={{marginBottom:top, marginTop:top}}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M14 3.072a8 8 0 0 1 2.617 11.424l4.944 4.943a1.5 1.5 0 0 1 -2.008 2.225l-.114 -.103l-4.943 -4.944a8 8 0 0 1 -12.49 -6.332l-.006 -.285l.005 -.285a8 8 0 0 1 11.995 -6.643z"
        fill={color}
      />
    </Svg>
  );
};

