import { View, Text, Image, Touchable, TouchableOpacity, ScrollView, FlatList } from 'react-native' // OBS: Button traz o estilo de botão nativo do Sistema Operacional por default
// OBS: ScrollView carrega todos os itens na memória de uma vez, mesmo se não estiver aparecendo na tela. A FlatList carrega só o que aparece na tela

import { Input } from '@/components/Input'
import { Button } from '@/components/Button' // onPress={ () => console.log('Entrar')} é uma Arrow Function
import { Filter } from '@/components/Filter'
import { Item } from '@/components/Item'

import { styles } from './styles'
import { FilterStatus } from '@/components/types/FilterStatus'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

//const ITEMS = []
//const ITEMS = Array.from({length: 200}).map((_, index)=>(String(index)));
const ITEMS = [
  { id: '1', status: FilterStatus.DONE, description: '1 kg de café'},
  { id: '2', status: FilterStatus.DONE, description: '5 kg de alcatra'},
  { id: '3', status: FilterStatus.DONE, description: '5 kg de maionese'},
  { id: '4', status: FilterStatus.PENDING, description: '7 kg de carvão'},
  { id: '5', status: FilterStatus.PENDING, description: '1 kg de pão'}
]

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
          <View style={styles.header}>
            {
              FILTER_STATUS.map((status)=>(
                <Filter key={status} status={status} isActive />
              ))
            }

            <TouchableOpacity style={styles.clearButton}>
              <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>

          </View>

          {/* {<ScrollView>
            {
              Array.from({length: 10}).map((value, index)=>
                <Item 
                  data={{status: FilterStatus.DONE, description: 'Café'}}
                  onStatus={() => console.log('icone')}
                  onRemove={() => console.log('apagou')}
                />
              )
            }
          </ScrollView>} */}

          <FlatList
            data={ITEMS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Item 
                  data={{status: item.status, description: item.description}}
                  onStatus={() => console.log('muda status')}
                  onRemove={() => console.log('remover')}
                />
            )}
            showsHorizontalScrollIndicator={true}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator}/>}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item aqui</Text>}
          />

        </View>
      </View>
    </>
  )
}

// <Text style={styles.text}>Hello, World!!!</Text>
