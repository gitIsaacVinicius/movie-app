import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/colors";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { useRouter } from "expo-router";
import { api } from "../utils/api";

const SignupScreen = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        if (!name || !email || !password) {
            Alert.alert("Atenção", "Preencha todos os campos.")
            return
        }

        if (password !== confirmPassword) {
            Alert.alert("Atenção", "As senha não são iguais.")
            return
        }

        try {
            setLoading(true)

            await api.post("/auth/register", {
                name,
                email,
                password
            })

            Alert.alert("Sucesso", "Conta criada com sucesso!")
            router.replace("./(login)")

        } catch (error: any) {
            console.log("Erro ao cadastrar:", error.response?.data || error.message)
            Alert.alert("Erro", "Não foi possível realizar o cadastro")
        
        } finally {
            setLoading(false)
        }
    }

    

    return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.background}}>
        <View style={styles.container}>
            <Text style={styles.text}>MOVIE<Text style={{color: "#EB5B38"}}>FLIX</Text></Text>

            <View style={styles.inputwrapper}>
                <AppTextInput placeholder="Informe seu nome" placeholderTextColor="#FFFFFF" value={name} onChangeText={setName} />
                <AppTextInput placeholder="Informe seu e-mail" placeholderTextColor="#FFFFFF" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail}/>
                <AppTextInput placeholder="Digite sua senha" placeholderTextColor="#FFFFFF" secureTextEntry value={password} onChangeText={setPassword}/>
                <AppTextInput placeholder="Confirme sua senha" placeholderTextColor="#FFFFFF" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword}/>
            </View>

            <AppButton style={{backgroundColor: Colors.primary, width: "70%", height: 50, marginRight: 0}} title={loading ? "Cadastrando" : "Cadastrar"} onPress={handleSignUp} />

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