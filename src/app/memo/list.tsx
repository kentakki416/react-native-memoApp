import { View, StyleSheet, FlatList } from 'react-native'
import { router, useNavigation } from 'expo-router'
import MemoListItem from '../../components/MemoListItem'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { useEffect, useState } from 'react'
import LogoutButton from '../../components/LogoutButton'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { auth, db } from '../../config'
import type { Memo } from '../../../types/memo'

const handlePress = (): void => {
    router.push('/memo/create')
}
const List = (): JSX.Element => {
    const [memos, setMemos] = useState<Memo[]>([])

    useEffect(() => {
        if (!auth?.currentUser || !auth?.currentUser?.uid) {
            return
        }
        const ref = collection(db, `users/${auth?.currentUser?.uid}/memo`)
        const q = query(ref, orderBy('updatedAt', 'desc'))
        const unSubscribe = onSnapshot(q, (snapshot) => {
            const remoteMemos: Memo[] = []
            snapshot.forEach((doc)=> {
                const { bodyText, updatedAt } = doc.data()
                remoteMemos.push({
                    id: doc.id,
                    bodyText,
                    updatedAt: updatedAt,
                })
            })
            setMemos(remoteMemos)
        })
        return unSubscribe
    }, [])

    // 一部のページでヘッダーの右側にボタンを表示する
    const navigation = useNavigation()
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <LogoutButton />
            },
        })
    }, [])

    return (
        <View style={styles.container}>
            {/* FlatList: スクロールできるようにするコンポーネント*/}
            <FlatList
                data={memos}
                renderItem={({ item }) => {return <MemoListItem memo={item}/> }}
            />
            <CircleButton onPress={handlePress}>
                <Icon name="plus" size={40} color='#ffffff' />
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
})
export default List
