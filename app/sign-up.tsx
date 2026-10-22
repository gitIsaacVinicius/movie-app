import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { useRouter } from "expo-router";

const SignupScreen = () => {
    const router = useRouter();

    return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
        <View style={styles.container}>
            <Text style={styles.text}>MOVIE<Text style={{color: "#EB5B38"}}>FLIX</Text></Text>

            <View style={styles.inputwrapper}>
                <AppTextInput placeholder="Informe seu nome" placeholderTextColor="#FFFFFF" />
                <AppTextInput placeholder="Informe seu e-mail" placeholderTextColor="#FFFFFF" />
                <AppTextInput placeholder="Digite sua senha" placeholderTextColor="#FFFFFF" secureTextEntry/>
                <AppTextInput placeholder="Confirme sua senha" placeholderTextColor="#FFFFFF" secureTextEntry/>
            </View>

            <AppButton style={{backgroundColor: Colors.primary, width: "70%", height: 50, marginRight: 0}} title="Cadastrar" />

            <Text style={styles.createaccount}>Já tem uma conta?{" "} 
                <Text onPress={()=>router.push("./(login)")} style={{color: Colors.primary}}>Faça login aqui</Text>
            </Text>
        </View>
    </SafeAreaView>
    )
}

export default SignupScreen

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