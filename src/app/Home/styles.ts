import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({ 
    container: { // "Minha caixinha" - É tipo JSON
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#D0D2D8',
    },
    text: { // Não utilizado
      fontSize: 36,
      fontWeight: 'bold',
      color: '#3AA1fF'
    },
    logo: {
      height: 34,
      width: 134,
      marginTop: 62
    },
    form: {
      width: '100%',
      marginTop: 42,
      gap: 7,
      paddingHorizontal: 16
    },
    content: {
      flex: 1,
      width: '100%',
      backgroundColor: '#FFF',
      padding: 24,
      paddingTop: 32,
      marginTop: 24,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#E4E6EC',
      paddingBottom: 12
    },
    clearButton: {
      marginLeft: 'auto'
    },
    clearText: {
      fontSize: 12,
      color: '#828282',
      fontWeight: 600
    },
    separator: {
      width: '100%',
      height: 1,
      backgroundColor: '#EEF0F5',
      marginVertical: 16
    },
    listContent: {
      paddingTop: 24,
      paddingBottom: 62
    },
    empty: {
      fontSize: 14,
      color: '#808080',
      textAlign: 'center'
    }
})
