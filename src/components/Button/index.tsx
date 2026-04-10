import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
// TouchableOpacityProps traz todos os elementos possíveis do botão TouchableOpacity (OBS: Se quiser uma propriedade diferente, tem que criar em baixo)

import { styles } from './styles'

type Props = TouchableOpacityProps & { // Tipagem daquilo que está recebendo
    title: string  // OBS: title não é propriedade padrão do TouchableOpacity
}

export function Button({ title, ...rest }: Props){  // "...rest" passa todo o que tiver além do title (tudo o que é padrão do botão)
    return(
        <>
            <TouchableOpacity 
                style={styles.container} 
                activeOpacity={0.7} // Fica 0.7 por padrão
                {...rest}
            > 
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
        </>
    )
}
