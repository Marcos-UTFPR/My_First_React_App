import { FilterStatus } from '../types/FilterStatus'
//import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { 
    CircleDashed, 
    CircleCheck } 
from 'lucide-react-native' // Instalado com npx expo install lucide-react-native react-native-svg

export function StatusIcon({status}: {status: FilterStatus}){
    return status === FilterStatus.DONE ? (
            <CircleCheck size={18} color='#2C46B1' />
        ) : (
            <CircleDashed size={18} color='#2C46B1' />
        )
        
    
}