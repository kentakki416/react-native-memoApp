import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import CircleButton from '../../components/CircleButton'
import Icon from '../../components/Icon'
import { onSnapshot, doc } from 'firebase/firestore'
import type { Memo } from '../../../types/memo'
import { useEffect, useState } from 'react'
import { auth, db } from '../../config'

const handlePress = (id: string): void => {
    router.push({ pathname: '/memo/edit', params: { id } })
}

const Detail = (): JSX.Element => {
    // LinkコンポーネントからIDを取得
    const id = String(useLocalSearchParams().id)

    const [memo, setMemo] = useState<Memo|null>(null)

    useEffect(() => {
        if (!auth.currentUser || !auth.currentUser.uid) {
            return
        }
        const ref = doc(db, `users/${auth.currentUser.uid}/memo/${id}`)
        const unsubscribe = onSnapshot(ref, (memoDoc) => {
            const { bodyText, updatedAt } = memoDoc.data() as Memo
            setMemo({
                id: memoDoc.id,
                bodyText,
                updatedAt,
            })
        })
        return unsubscribe
    })
    return (
        <View style={styles.container}>
            <View style={styles.memoHeader}>
                <Text style={styles.memoTitle} numberOfLines={1}>{memo?.bodyText}</Text>
                <Text style={styles.memoDate}>{memo?.updatedAt.toDate().toLocaleString('ja-JP')}</Text>
            </View>
            <View>
                <ScrollView style={styles.memoBody}>
                    <Text style={styles.memoBodyText}>
                        {memo?.bodyText}
                    </Text>
                </ScrollView>
            </View>
            <CircleButton onPress={() => handlePress(id)}style={{ top: 60, bottom: 'auto' }}>
                <Icon name="pencil" size={40} color='#ffffff' />
            </CircleButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    memoHeader: {
        backgroundColor: '#467FD3',
        height: 96,
        justifyContent: 'center',
        paddingVertical: 24,
        paddingHorizontal: 19,
    },
    memoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        lineHeight: 32,
    },
    memoDate: {
        fontSize: 12,
        color: '#ffffff',
        lineHeight: 16,
    },
    memoBody: {
        paddingHorizontal: 27,
    },
    memoBodyText: {
        paddingVertical: 32,
        fontSize: 16,
        lineHeight: 24,
        color: '#000000',
    },
})

export default Detail
