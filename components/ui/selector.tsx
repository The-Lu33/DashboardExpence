import { ReactNode, type PropsWithChildren } from "react";
import RNPickerSelect from "react-native-picker-select";

interface Items {
  label: string;
  value: string;
}
interface SelectorInterface {
  items: Items[];
  valueChange: (value: string) => void;
}

export default function Selector({
  items,
  valueChange,
}: SelectorInterface) {
  return (
    <RNPickerSelect
      onValueChange={(value) => {
        valueChange(value);
        console.log(value);
      }}
      items={items}
      // value={}
      // Icon={/}
    >
      {props}
    </RNPickerSelect>
  );
}
