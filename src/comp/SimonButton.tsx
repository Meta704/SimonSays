import React from 'react';
import { Pressable } from 'react-native';

// Define the props 
type SimonButtonProps = {
  colorId: number;
  colorStringIn: string;
  colorStringOut: string;
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomRightRadius: number;
  borderBottomLeftRadius: number;
  currentColor: number; 
  pressedButtonID: number | undefined; 
  onPress: (number: number) => void;
  onPressIn: (colorId: number) => void;
  onPressOut: () => void;
};

// SimonButton component representing a pressable button with specific styling
const SimonButton: React.FC<SimonButtonProps> = ({
  colorId,
  colorStringIn,
  colorStringOut,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  borderBottomLeftRadius,
  currentColor,
  pressedButtonID,
  onPress,
  onPressIn,
  onPressOut,
}) => {
  return (
    <Pressable
      onPress={() => onPress(colorId)}
      onPressIn={() => onPressIn(colorId)}
      onPressOut={onPressOut}
      style={{
        flex: 1,
        borderWidth: 2,
        borderColor: '#ffffff',
        backgroundColor:
          currentColor === colorId || pressedButtonID === colorId
            ? colorStringIn
            : colorStringOut,
        borderTopLeftRadius: borderTopLeftRadius,
        borderTopRightRadius: borderTopRightRadius,
        borderBottomRightRadius: borderBottomRightRadius,
        borderBottomLeftRadius: borderBottomLeftRadius,
      }}
    ></Pressable>
  );
};

export default SimonButton;
