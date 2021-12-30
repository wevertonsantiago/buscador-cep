import { StatusBar} from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, TextInput, View, Image,SafeAreaView, Alert,TouchableOpacity } from 'react-native';
import axios from 'axios';



export default function App() {
  const [cep,setCep] = useState()
  const [dados,setDados] = useState({})
  //viacep.com.br/ws/{cep}/json
  const api = axios.create({
    baseURL: "https://viacep.com.br/ws"
  });

  async function press() {
    
    try{
      const response = await api.get(`${cep}/json`);
      setDados(response.data)
      console.log(response.data)
      // setCep('') Para apagar o que foi digitado na busca
      setCep('')
    }catch{
      Alert.alert('Erro ao buscar, digite apenas os números, ou verifique o cep.')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={{width:'40%',height:150}} 
      source={require('./assets/logo.png')} />
      <Text style={{fontSize:30, marginBottom:10,}}>Buscador de Cep</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Digite o cep Ex: 01034903"
          placeholderTextColor="#fff"
          keyboardType="numeric"
          value={cep}
          onChangeText={text => setCep(text)}
          clearButtonMode='always'/>
          <TouchableOpacity style={styles.btnArea} onPress={press}> 
            <Text style={styles.btnText}>PESQUISAR</Text>
          </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
      {Object.keys(dados).length > 0 && (
        <View style={{backgroundColor:'#1E90FF',marginTop:15, borderRadius:20,}}>
        <Text style={styles.text}>Cep: {dados.cep}</Text>
        <Text style={styles.text}>Rua: {dados.logradouro}</Text>
        <Text style={styles.text}>Bairro: {dados.bairro} </Text>
        <Text style={styles.text}>Cidade: {dados.localidade} - {dados.uf}</Text>
      </View>
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    padding:10,
    marginBottom:15,
    width:300,
    height:50,
    backgroundColor: '#1E90FF',
    borderRadius: 20,
    fontSize:20,
    color:'#fff'
  },
  text:{
    width: 360,
    fontSize:25,
    color:"#fff",
    padding:4,
  },

  btnArea: {
    borderWidth: 3,
    borderRadius: 25,
    alignItems:'center',
    justifyContent: 'center',
    height:50,
    borderColor: '#1E90FF',
  },
  btnText: {
    color:'#1E90FF',
    fontWeight:'bold',
    fontSize:18,
  },
});
