import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/colors' 
import { Entypo } from '@expo/vector-icons'

export interface FilterOption {
    id: number | string | undefined
    name: string
}

interface FilterItemProps {
    title: string
    options?: FilterOption[]
    selectedValue?: number | string
    onSelect?: (id: any) => void
}

const FilterItem = ({ title, options = [], selectedValue, onSelect }: FilterItemProps) => {
    const [visible, setVisible] = useState(false)

    const selectedOption = options.find((item) => item.id === selectedValue)
    
    return (
        <>
            <TouchableOpacity activeOpacity={0.8} style={[styles.categorywrapper, selectedValue ? { borderColor: Colors.primary } : null,]}
            onPress={() => setVisible(true)}>
                <Text style={{color: selectedValue ? Colors.primary : Colors.text, marginRight: 6, fontSize: 12}}>
                    {selectedOption ? selectedOption.name : title}
                </Text>

                <Entypo name="chevron-small-down" size={20} color={selectedValue ? Colors.primary : Colors.text}/>
            </TouchableOpacity>    
            
            <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
                <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            {title}
                        </Text>

                        <FlatList data={[{ id: undefined, name: "Todos" }, ...options]} keyExtractor={(item) => String(item.id ?? "all")}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.optionItem} onPress={() => {onSelect?.(item.id); setVisible(false)}}>
                                    <Text style={{color: selectedValue === item.id ? Colors.primary : Colors.text, fontSize: 14}}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )} 
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    )
}

export default FilterItem

const styles = StyleSheet.create({
    categorywrapper: {
        borderWidth: 1,
        borderColor: Colors.gray,
        padding: 8,
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginRight: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        padding: 24,
    },
    modalContent: {
        backgroundColor: Colors.surface,
        borderRadius: 12,
        padding: 16,
        maxHeight: 350,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    modalTitle: {
        color: Colors.text,
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12,
    },
    optionItem: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.darkBorder,
    },
})