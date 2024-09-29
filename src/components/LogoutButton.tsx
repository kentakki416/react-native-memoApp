import { signOut } from 'firebase/auth'
import { TouchableOpacity, StyleSheet, Text, Alert } from 'react-native'
import { auth } from '../config'
import { router } from 'expo-router'

const handlePress = async(): Promise<void> => {
    try {
        await signOut(auth)
        router.replace('/auth/login')
    } catch {
        Alert.alert('ログアウトに失敗しました')
    }
}
const LogoutButton = (): JSX.Element => {
    return (
        <TouchableOpacity onPress={handlePress}>
            <Text style={style.text}>ログアウト</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    text: {
        fontSize: 12,
        lineHeight: 24,
        color: 'rgba(255,255,255,0,7)',
    },
})

export default LogoutButton
