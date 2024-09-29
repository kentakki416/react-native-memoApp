/**
 * Slot: 画面いっぱいまで表示するためのレイアウト
 * Stack: 画面遷移を管理するためのコンポーネント
 */
import { Stack } from 'expo-router'

const Layout = (): JSX.Element => {
    return <Stack screenOptions={{
        headerStyle: {
            backgroundColor: '#467FD3',
        },
        headerTintColor: '#ffffff',
        headerTitle: 'Memo App',
        headerBackTitle: 'Back',
        headerTitleStyle: {
            fontSize: 22,
            fontWeight: 'bold',
        }
    }}/>
}


export default Layout
