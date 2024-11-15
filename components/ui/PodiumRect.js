import { Svg, Path, Text } from 'react-native-svg';

function PodiumRect({ color, borderColor }) {
  return (
    <Svg
      width={121}
      height={52}
      viewBox="0 0 121 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'absolute', 
        bottom: '-22%', 
        zIndex: 0
      }}
    >
      <Path
        d="M1 1h118.4v34.34a9 9 0 01-7.836 8.925l-47.8 6.236a28.997 28.997 0 01-7.527-.004L8.828 44.272A9 9 0 011 35.349V1z"
        fill={color}
        stroke={borderColor}
        strokeWidth={2}
      />
      <Text
        x={60.5} // half of width (121/2)
        y={34} // half of height (52/2)
        fill="black"
        fontSize="16"
        fontWeight="bold"
        textAnchor="middle" // horizontal centering
        dominantBaseline="middle" // vertical centering
      >
        5126
      </Text>
    </Svg>
  );
}

export default PodiumRect;