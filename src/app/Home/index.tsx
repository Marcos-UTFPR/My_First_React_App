import { View, Text, Image } from 'react-native' // OBS: Button traz o estilo de botão nativo do Sistema Operacional por default

import { Input } from '@/components/Input'
import { Button } from '@/components/Button' // onPress={ () => console.log('Entrar')} é uma Arrow Function

import { styles } from './styles'
import { Filter } from '@/components/Filter'
import { FilterStatus } from '@/components/types/FilterStatus'

export default function App(){
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('@/assets/logo.png')} 
          style={styles.logo}
        />

        <View style={styles.form}>
          <Input placeholder='O que você precisa comprar?' />
          <Button title="Adicionar" />
        </View>

        <View style={styles.content}>
          <Filter status={FilterStatus.DONE} isActive />
          <Filter status={FilterStatus.PENDING} isActive={false} />
        </View>
      </View>
    </>
  )
}

// <Text style={styles.text}>Hello, World!!!</Text>
