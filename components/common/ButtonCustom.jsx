import { Pressable, StyleSheet } from "react-native"

function ButtonCustom({children,onPress,styleButton,...x}) {
  return (
    <Pressable onPress={onPress} style={styleButton} {...x}>
        {children}
    </Pressable>
  )
}
export default ButtonCustom
