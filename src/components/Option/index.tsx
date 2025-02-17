import { TouchableOpacity, TouchableOpacityProps, ColorValue, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap
    backgroundColor: ColorValue
    onPress?: () => void;
}

export function Option({ icon, backgroundColor, onPress, ...rest }: Props){
    return(
        <TouchableOpacity style={[styles.container, , { backgroundColor }]} activeOpacity={0.7} onPress={onPress}>
            <MaterialIcons name={icon} size={30} color="#FFFFFF" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 80,
        justifyContent: "center",
        alignItems: "center",
    }
})