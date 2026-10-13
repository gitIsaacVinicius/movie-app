import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/colors";
import AppTextInput from "../../components/AppTextInput";
import AppButton from "../../components/AppButton";
import { useRouter } from "expo-router";

const LoginScreen = () => {
    const router = useRouter();

    return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
        <View style={styles.container}>
            <Text style={styles.text}>MOVIE<Text style={{color: "#EB5B38"}}>FLIX</Text></Text>

            <View style={styles.inputwrapper}>
                <AppTextInput placeholder="E-mail" placeholderTextColor="#FFFFFF" />
                <AppTextInput placeholder="Senha" placeholderTextColor="#FFFFFF" secureTextEntry/>
            </View>

            <AppButton style={{backgroundColor: Colors.primary, width: "70%", height: 50, marginRight: 0}} title="Entrar" />

            <Text style={styles.createaccount}>Novo por aqui?{" "} 
                <Text onPress={()=>router.push("./sign-up")} style={{color: Colors.primary}}>Cadastre-se agora</Text>
            </Text>
        </View>
    </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        fontWeight: "600",
        color: Colors.text,
        fontSize: 26,
    },
    inputwrapper: {
        width: "70%",
        marginVertical: 26,
    },
    createaccount: {
        color: Colors.gray,
        fontSize: 14,
        marginTop: 14,
    }
})