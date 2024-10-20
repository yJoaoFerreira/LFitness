import { useState} from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './Styles';

const CheckBox = ({options = [], multiple=false}) =>{
  const [selected, setSelected] = useState([]);

  function toggle(id) {
   let index = selected.findIndex(i => i === id);
   let arrSelecteds = [...selected];

   if(index !== -1) {
     arrSelecteds.splice(index, 1);
   } else{
     multiple ? arrSelecteds.push(id) : (arrSelecteds = [id]);

   }

   setSelected(arrSelecteds);

  

  }
  
  return(
   <View>
     {options.map((op, index) => (
       <View style={styles.optionsC}>
      <TouchableOpacity 
       style={styles.touchabaleC}
       onPress={() => toggle(op?.id)}>
        {selected.findIndex(i => i === op.id) !== -1 ? (
        <AntDesign name="check" size={16}  color={'black'}/>
       ) : null} 
      </TouchableOpacity>
      <Text style={styles.optext}>{op?.text}</Text>
      </View>

     ))}
   
   
   
   </View>



  );
   



};

export default CheckBox;