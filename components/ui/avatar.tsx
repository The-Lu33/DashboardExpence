import { Image } from "react-native";
import { View } from "../Themed";
type avatarProps = { urlImg?: string };
type ImageProps = avatarProps & Image["props"];
export default function Avatar(props: ImageProps) {
  const { urlImg, source, style, ...otherProps } = props;
  const imageSource = urlImg ? { uri: urlImg } : source;
  return (
    <View
      className="rounded-full ring-offset-2 ring-2 "
      style={[style]}
      {...otherProps}
    >
      <View
        className="border-purple-500 w-full h-full"
        style={{ borderWidth: 2, borderRadius: 9999 }}
      >
        <Image className="w-full h-full rounded-full " source={imageSource} />
      </View>
    </View>
  );
}
