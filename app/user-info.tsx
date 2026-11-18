import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Colors from "../constants/colors";
import { api } from "../utils/api";
import { ms } from "../screen-dimensions";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";

interface UserResponseDTO {
    name: string;
    email: string;
}

const UserInfoScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(true)
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get<UserResponseDTO>("/user/me");
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error: any) {
                console.log("Erro ao buscar dados do usuário:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleUpdateUser = async () => {
        if (!name.trim() || !email.trim()) {
            Alert.alert("Atenção", "Nome e e-mail não podem ficar vazios.")
            return
        }

        try {
            setSaving(true)
            const response = await api.put<UserResponseDTO>("user/me", { name, email })

            const newToken = response.data.email
            if (newToken) {
                api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`
            }

            Alert.alert("Sucesso", "Dados atualizados com sucesso!")
        
        } catch (error: any) {
            if (error.response?.status === 409) {
                Alert.alert("Erro", "Este e-mail já está em uso por outro usuário.")
            } else {
                console.log("Erro ao atualizar usuário.", error.response?.data || error.message)
                Alert.alert("Erro", "Não foi possível atualizar os dados.")
            }
        
        } finally {
            setSaving(false)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={Colors.text} />
            </TouchableOpacity>

            <View style={styles.content}>
                <Image source={require("@/assets/images/profile.jpg")} style={styles.avatar} />

                {loading ? (
                    <ActivityIndicator size="large" color={Colors.primary} style={{ marginTop: 20 }} />
                ) : (
                    <View style={styles.infoBox}>
                        <Text style={styles.label}>Nome</Text>
                        <AppTextInput placeholder="Seu nome" placeholderTextColor={Colors.gray} value={name} onChangeText={setName} />

                        <Text style={styles.label}>E-mail</Text>
                        <AppTextInput placeholder="Seu e-mail" placeholderTextColor={Colors.gray} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

                        <AppButton title={saving ? "Salvando..." : "Atualizar dados"} style={styles.updateButton} onPress={handleUpdateUser} />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default UserInfoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: 16,
    },
    backButton: {
        marginBottom: 20,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: ms(140),
        height: ms(140),
        borderRadius: 100,
        marginBottom: 24,
    },
    infoBox: {
        width: "85%",
        backgroundColor: "#1E1E1E",
        borderRadius: 12,
        padding: 20,
    },
    label: {
        color: Colors.primary,
        fontSize: 14,
        fontWeight: "600",
        marginTop: 10,
    },
    updateButton: {
        backgroundColor: Colors.primary,
        width: "100%",
        height: 50,
        marginTop: 20,
    },
});