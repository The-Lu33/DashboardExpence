// react-native-switch-selector.d.ts

declare module "react-native-switch-selector" {
  import React from "react";
  import { ViewStyle, TextStyle, ImageStyle } from "react-native";

  interface SwitchSelectorOption {
    label: string;
    value: string | number;
    imageIcon?: any;
  }

  interface SwitchSelectorProps {
    initial?: number;
    onPress: (value: string | number) => void;
    textColor?: string;
    selectedColor?: string;
    buttonColor?: string;
    borderColor?: string;
    backgroundColor?: string;
    hasPadding?: boolean;
    options: SwitchSelectorOption[];
    testID?: string;
    accessibilityLabel?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    selectedTextStyle?: TextStyle;
    imageStyle?: ImageStyle;
    height?: number;
    fontSize?: number;
    bold?: boolean;
    buttonMargin?: number;
    animationDuration?: number;
  }

  const SwitchSelector: React.FC<SwitchSelectorProps>;

  export default SwitchSelector;
}
