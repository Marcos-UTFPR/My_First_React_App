import { TouchableOpacity, Text } from 'react-native'

import { styles } from './styles'


export function Button(){
    return(
        <>
            <TouchableOpacity
                style={styles.container}
                activeOpacity={0.7}
            >
                <Text style={styles.title}>Entrar</Text>
            </TouchableOpacity>
        </>
    )
}
