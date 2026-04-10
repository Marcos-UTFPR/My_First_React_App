import { View, Text, Image } from 'react-native' // OBS: Button traz o estilo de botão nativo do Sistema Operacional por default

import { Input } from '@/components/Input'
import { Button } from '@/components/Button' // onPress={ () => console.log('Entrar')} é uma Arrow Function

import { styles } from './styles'

export default function App(){
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('@/assets/logo.png')} 
          style={styles.logo}
        />
        
        <Input placeholder='O que você precisa comprar?' />
        <Button title="Adicionar" />
      </View>
    </>
  )
}

// <Text style={styles.text}>Hello, World!!!</Text>
