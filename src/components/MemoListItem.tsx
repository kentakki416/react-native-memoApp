import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { Link } from 'expo-router'
import Icon from './Icon'
import { deleteDoc, doc } from 'firebase/firestore'
import type { Memo } from '../../types/memo'
import { auth, db } from '../config'

interface Props {
    memo: Memo
}

const handlePress = (id: string): void => {
    if (!auth.currentUser || !auth.currentUser.uid) {
        return
    }
    const ref = doc(db, `users/${auth.currentUser.uid}/memo/${id}`)
    Alert.alert('削除しますか？', 'よろしいですか？', [
        {
            text: 'キャンセル',
        },
        {
            text: '削除',
            style: 'destructive',
            onPress: () => {
                deleteDoc(ref)
                    .catch(() => {Alert.alert('削除に失敗しました')})
            },
        },
    ])
}

const MemoListItem = (props: Props): JSX.Element | null => {
    const { memo } = props
    const { id, bodyText, updatedAt } = memo
    if (!bodyText || !updatedAt) {
        return null
    }
    const dateString = updatedAt.toDate().toLocaleDateString('ja-JP')
    return (
        <Link href={{ pathname:'/memo/detail', params: { id: memo.id } }} asChild={true}>
            <TouchableOpacity style={styles.memoListItem}>
                <View>
                    <Text numberOfLines={1} style={styles.memoListItemTitle}>{bodyText}</Text>
                    <Text style={styles.memoListItemDate}>{dateString}</Text>
                </View>
                <TouchableOpacity onPress={() => handlePress(id)}>
                    <Icon name='delete' size={40} color="#B0B0B0"></Icon>
                </TouchableOpacity>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    memoListItem: {
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 19,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(0,0,0,0.15)',
    },
    memoListItemTitle: {
        fontSize: 16,
        lineHeight: 32,
    },
    memoListItemDate: {
        fontSize: 12,
        lineHeight: 16,
        color: '#848484',
    },
})
export default MemoListItem
