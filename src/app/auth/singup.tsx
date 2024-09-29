import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Button from '../../components/Button'
import { Link, router } from 'expo-router'
import { useState } from 'react'
import { auth } from '../../config'
import { createUserWithEmailAndPassword} from 'firebase/auth'

const handlePress = async(email: string, password: string): Promise<void> => {
    try {
        await createUserWithEmailAndPassword(auth, email, password)
        router.replace('/memo/list')
    } catch (error) {
        Alert.alert((error as Error).message)
    }
}

const SignUp = (): JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.inner}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput 
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    placeholder='Email Address'
                    textContentType='emailAddress'
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    autoCapitalize='none'
                    secureTextEntry={true}
                    placeholder='Password'
                    textContentType='password'
                />
                <Button label='submit' onPress={() => { handlePress(email, password)}} />
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already Registered?</Text>
                    <Link href='/auth/login' asChild={true} replace={true}>
                        <TouchableOpacity>
                            <Text style={styles.footerLink}>Login!</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        paddingVertical: 24,
        paddingHorizontal: 27,
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDDDDD',
        backgroundColor: '#FFFFFF',
        height: 48,
        padding: 8,
        fontSize: 16,
        marginBottom: 16,
    },
    footer: {
        flexDirection: 'row',
    },
    footerText: {
        fontSize: 14,
        lineHeight: 24,
        marginRight: 8,
        color: '#000000',
    },
    footerLink: {
        fontSize: 14,
        lineHeight: 24,
        color: '#467FD3',
    },
})

export default SignUp
