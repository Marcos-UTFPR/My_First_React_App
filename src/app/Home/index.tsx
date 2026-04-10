import { View, Text, Image } from 'react-native' // OBS: Button traz o estilo de botão nativo do Sistema Operacional por default

import { Button } from '@/components/Button'

import { styles } from './styles'

export default function App(){
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('@/assets/logo.png')} 
          style={styles.logo}
        />

        <Button title="Entrar" />
        <Button title="Cadastrar" />
        <Button title="Salvar" />
        <Button title="Voltar" />
        <Button title="Sair" />
      </View>
    </>
  )
}

// <Text style={styles.text}>Hello, World!!!</Text>
