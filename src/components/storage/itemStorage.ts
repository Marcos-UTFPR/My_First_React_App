// Arquivo que não renderiza nada mas é responsável por tipar o que é uma lista de itens 
// OBS: Deveria ficar em src junto com types (mas coloquei types na pasta errada)
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FilterStatus } from '@/components/types/FilterStatus' //import { FilterStatus } from '@/types/FilterStatus'
import { Filter } from '../Filter'

const ITEMS_STORAGE_KEY = '@compras:items'

export type ItemStorage = {
    id: string,
    status: FilterStatus,
    description: string
}

async function get(): Promise<ItemStorage[]> {  // async + await: espera a resposta do sistema
    try {
        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY) // AsyncStorage.getItem("Nome da tabela no banco de dados")
        return storage ? JSON.parse(storage) : []   // JSON.parse converte para arquivo json
    } catch (error) {
        //console.log(error)
        throw new Error('ITEMS_GET: ' + error)
    }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]>{
    const items = await get()
    return items.filter((item) => item.status === status)
}

async function save(items: ItemStorage[]): Promise<void>{ // Não é exportada
    try {
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
    } catch (error) {
        throw new Error('ITEMS_SAVE: ' + error)
    }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]>{
    const items = await get()
    const updatedItems = [...items, newItem]
    await save(updatedItems)
    return updatedItems
}

async function remove(id: string): Promise<void>{
    const items = await get()
    const updatedItems = items.filter((item) => item.id != id)
    await save(updatedItems)
}

async function clear(): Promise<void>{
    try {
        await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)
    } catch (error) {
        throw new Error('ITEMS_CLEAR: ' + error)
    }
}

async function toggleStatus(id: string): Promise<void>{
    const items = await get()
    const updatedItems = items.map((item) => 
        item.id === id
        ? {
            ...item,
            status:
                item.status === FilterStatus.PENDING
                ? FilterStatus.DONE
                : FilterStatus.PENDING
        }
        : item
    )
    await save(updatedItems)
}

export const itemsStorage = {
    get,
    getByStatus,
    add,
    remove,
    clear,
    toggleStatus
}
