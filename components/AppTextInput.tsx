import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import React from "react";
import Colors from "../constants/colors";

const AppTextInput: React.FC<TextInputProps> = ({...props}) => {
    return (
        <View style={styles.wrapper}>
            <TextInput {...props} style={styles.input} />
        </View>
    )
}

export default AppTextInput

const styles = StyleSheet.create({
    wrapper: {
        height: 50,
        width: "100%",
        borderWidth: 1,
        borderColor: "#EB5B38",
        borderRadius: 8,
        backgroundColor: "#1E1E1E",
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    input: {
        flex: 1,
        color: Colors.text,
    }
})