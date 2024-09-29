import { View, TextInput, StyleSheet, Alert } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'

import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView'
import { useEffect, useState } from 'react'
import { auth, db } from '../../config'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'

const handlePress = (id: string, bodyText: string): void => {
    if (!auth.currentUser || !auth.currentUser.uid) {
        router.replace('/auth/login')
        return
    }
    const ref = doc(db, `users/${auth.currentUser.uid}/memo/${id}`)
    setDoc(ref, {
        bodyText,
        updatedAt: Timestamp.fromDate(new Date()),
    }).then(() => {
        router.back()
    }).catch(() => {
        Alert.alert('更新に失敗しました')
    })
}

const Edit = () => {
    const id = String(useLocalSearchParams().id)
    const [bodyText, setBodyText] = useState('')

    useEffect(() => {
        if (!auth.currentUser || !auth.currentUser.uid) {
            return
        }
        const ref = doc(db, `users/${auth.currentUser.uid}/memo/${id}`)
        getDoc(ref).then((doc) => {
            if (doc.exists()) {
                const data = doc.data()
                const remoteBodyText = data?.bodyText
                setBodyText(remoteBodyText)
            } else {
                Alert.alert('メモが見つかりません')
            }
        }).catch((error) => {
            Alert.alert(error.message)
        })
    }, [])
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    style={styles.input}
                    value={bodyText}
                    onChangeText={(text) => {setBodyText(text)}}
                    autoFocus
                ></TextInput>
            </View>
            <CircleButton onPress={() => {handlePress(id, bodyText)}}>
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

export default Edit
