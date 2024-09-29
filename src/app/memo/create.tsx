import { View, TextInput, StyleSheet, Alert } from 'react-native'
import {router} from 'expo-router'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { auth, db } from '../../config'
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView'
import { useState } from 'react'

const handlePress = (bodyText: string) => {
    try {
        if (!auth?.currentUser || !auth?.currentUser?.uid) {
            router.replace('/auth/login')
            return
        }
        const result = addDoc(collection(db, `users/${auth.currentUser.uid}/memo`), {
            bodyText: bodyText,
            updatedAt: Timestamp.fromDate(new Date()),
        })
        router.push('/memo/list')
    } catch (error) {
        Alert.alert((error as Error).message)
    }
}
const Create = () => {
    const [bodyText, setBodyText] = useState('')
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    style={styles.input}
                    value={bodyText}
                    onChangeText={(text) => {setBodyText(text)}}
                    autoFocus
                />
            </View>
            <CircleButton onPress={() => handlePress(bodyText)}>
                <Icon name="check" size={24} color='#ffffff' />
            </CircleButton>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    inputContainer: {
        paddingVertical: 32,
        paddingHorizontal: 27,
        flex: 1,
    },
    input: {
        flex: 1,
        textAlignVertical: 'top',
        fontSize: 16,
        lineHeight: 24,
    },
})

export default Create
