import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
   container:{flex:1,
              backgroundColor:'#fff',
              alignItems:'center',
              justifyContent:'center'},
   
   forminput:{borderColor:'red',
              borderWidth:1,
              borderRadius:10,
              fontSize:22,
              width:'100%',
              padding:10,
              margin:10},
   formbutton:{backgroundColor:'red',
               width:'80%',
               margin:10,
               padding:10,
               borderRadius:10,
               alignItems:'center',  },          
   subcontainer:{flexDirection:'row',
                 justifyContent:'space-between',
                 width:'80%'},

    subbutton:{padding:10,},
     
    safearea:{flex: 1,
             backgroundColor:'#fefefe'},
      
    titleC:{color:'333',
            size:16,
            fontWeight:'700',
            textTransform:'uppercase',
            marginVertical:10,
            marginLeft:12},
    
    optionsC:{flexDirection:'row',
             alignItems:'center'},
    
    optext:{marginLeft:12,
            color:'#555',
            fontSize:16,
            fontWeight:'600',
            padding:20},

    touchabaleC:{height:29,
                 width:28,
                 borderRadius:4,
                 justifyContent:'center',
                 alignItems:'center',
                 borderWidth:2,},        
});

export default styles;
