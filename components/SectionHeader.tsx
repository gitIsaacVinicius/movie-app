import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../constants/colors";

const SectionHeader = ({title}:{title: string}) => {
    return (
        <View style={styles.sectionheader}>
            <Text style={{color: Colors.text, fontWeight: "600", fontSize: 16}}>{title}</Text>
            
            <TouchableOpacity activeOpacity={.8} style={{padding: 10}}>
                <Text style={{ color: Colors.primary}}>Veja mais</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SectionHeader;

const styles = StyleSheet.create({
    sectionheader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
        paddingHorizontal: 14,
    }
});