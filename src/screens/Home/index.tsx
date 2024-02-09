import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { styles } from "./styles"
import { Participant } from "../../components/Participant";

export function Home() {
    const [participants, setParticipants] = useState<string[]>([]);
    const [ participantName, setParticipantName] = useState('');

    function handleParticipantAdd() {
        if (participants.includes(participantName)) {
            return Alert.alert("Participante Existe", "Este participante já está na lista.")
        }

        setParticipants(participants => [...participants, participantName]);
        setParticipantName('');
    }

    function handleParticipantRemove(name: string) {

        Alert.alert("Remover", `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => setParticipants(participant => participant.filter(nameParticipant => nameParticipant !== name))
            },
            {
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do Evento
            </Text>
            <Text style={styles.eventDate}>
                Sexta, 09 de Fevereiro de 2024.
            </Text>
            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor="#6b6b6b"
                    onChangeText={setParticipantName}
                    value={participantName}
                />
                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={participants}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Participant
                        key={item} 
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Niguém chegou ainda? Adicione participantes.
                    </Text>
                )}
            />
        </View>
    );
}