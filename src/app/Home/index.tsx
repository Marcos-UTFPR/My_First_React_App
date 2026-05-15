import { View, Text, Image, Touchable, TouchableOpacity, ScrollView, FlatList, Alert } from 'react-native' // OBS: Button traz o estilo de botão nativo do Sistema Operacional por default
import { useEffect, useState } from 'react' // useState é um hook
// OBS: ScrollView carrega todos os itens na memória de uma vez, mesmo se não estiver aparecendo na tela. A FlatList carrega só o que aparece na tela

import { Input } from '@/components/Input'
import { Button } from '@/components/Button' // onPress={ () => console.log('Entrar')} é uma Arrow Function
import { Filter } from '@/components/Filter'
import { Item } from '@/components/Item'

import { styles } from './styles'
import { FilterStatus } from '@/components/types/FilterStatus'
import { ItemStorage, itemsStorage } from '@/components/storage/itemStorage'

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

//const ITEMS = []
//const ITEMS = Array.from({length: 200}).map((_, index)=>(String(index)));
/*const ITEMS = [
  { id: '1', status: FilterStatus.DONE, description: '1 kg de café'},
  { id: '2', status: FilterStatus.DONE, description: '5 kg de alcatra'},
  { id: '3', status: FilterStatus.DONE, description: '5 kg de maionese'},
  { id: '4', status: FilterStatus.PENDING, description: '7 kg de carvão'},
  { id: '5', status: FilterStatus.PENDING, description: '1 kg de pão'}
]*/

export default function App(){
  // console.log('ITEMS', ITEMS)

  //let filter = FilterStatus.PENDING;
  // Estados temporários, remover no futuro
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING) // Um estado sempre é uma constante - setFilter verifica se houve alteração no filter
  const [description, setDescription] = useState('')
  const [items, setItems] = useState<ItemStorage[]>([])

  // Adicionar produtos é uma ação feita pelo usuário, logo adicionar como handle...
  // É errado dar responsabilidade de persistência de dados para um item de renderização, deveria estar em .TS separado
  async function handleAdd(){
    if(!description.trim()){
      return Alert.alert('Adicionar', 'Informe a descrição do item.')
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING
    }

    //console.log(newItem)

    //setItems(prevState => [...prevState, newItem]) // ... = Operador spread
    await itemsStorage.add(newItem)
    await itemsByStatus()

    setDescription('')
    setFilter(FilterStatus.PENDING)
  }

  async function handleRemove(id: string){
    try {
      await itemsStorage.remove(id)
      await itemsByStatus()
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível remover o item.')
    }
  }

  async function onClear(){
    try {
      await itemsStorage.clear()
      setItems([])
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível limpar.')
    }
  }

  async function handleClear(){
    Alert.alert('Limpar', 'Deseja remover todos os itens?', [
      {text:'Não', style: 'cancel'},
      {text:'Sim', onPress: () => onClear()}
    ])
  }

  async function itemsByStatus(){
    try {
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível filtrar os itens.')
    }
  }

  async function handleToggleItemStatus(id: string){
    try {
      await itemsStorage.toggleStatus(id)
      await itemsByStatus
    } catch (error) {
      console.log(error)
      Alert.alert('Erro', 'Não foi possível trocar o status.')
    }
  }

  //useEffect(() => { console.log('Axô #1')}, [filter]) // É chamado sempre que filter é modificado
  useEffect(() => {
    itemsByStatus()
  }, [filter])

  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('@/assets/logo.png')} 
          style={styles.logo}
        />

        <View style={styles.form}>
          <Input 
            placeholder='O que você precisa comprar?'
            onChangeText={(value)=>(setDescription(value))}
            value={description}
          />
          <Button title="Adicionar" onPress={handleAdd}/>
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            {
              FILTER_STATUS.map((status)=>(
                <Filter 
                  key={status} 
                  status={status} 
                  isActive 
                  onPress={()=>(
                    setFilter(status) // Manda informação de qual estado está e vai atualizar o filter
                  )}
                />
              ))
            }

            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
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
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Item 
                  data={{status: item.status, description: item.description}}
                  onStatus={() => handleToggleItemStatus(item.id)}
                  onRemove={() => handleRemove(item.id)}
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
