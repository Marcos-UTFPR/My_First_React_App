// Arquivo que não renderiza nada mas é responsável por tipar o que é uma lista de itens 
// OBS: Deveria ficar em src junto com types (mas coloquei types na pasta errada)
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FilterStatus } from '@/components/types/FilterStatus' //import { FilterStatus } from '@/types/FilterStatus'

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

export const itemsStorage = {
    get,
    getByStatus
}