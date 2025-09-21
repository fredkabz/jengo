
import React, { Component} from 'react';
import {Image,ActivityIndicator,FlatList,Text, View, Animated,SafeAreaView,ScrollView,TextInput,StyleSheet,StatusBar,Button,TouchableWithoutFeedback,TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import LoginScreen from './LoginScreen';



const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 50;

class HomeSreen extends Component
{

  constructor(props)
  {
    super(props);
    const { navigate } = this.props.navigation;
    //const {route}=this.props.route;
    //const {route}=this.props.route;
    this.state={
      scrollY:new Animated.Value(0),
      
      login_status:false,

      isLoading:true,
      isLoading_two:true,
      isLoading_posts:true,
      category_one:[],
      category_two:[],
      post_adds:[],
     
    }
  }
  componentDidMount()
  {
    fetch('https://app.merrytimesacademy.com/jengo/get_data.php',
    {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(
        {
           data_request:'first_category_list'
        }
      )

    })
    .then((response)=> response.json())
    .then((responseJson) => {
        
      
        this.setState({category_one :responseJson})
        //this.setState({user_id:1})
    })
    .catch((error)=> 
    {
      alert(error)
    })
    .finally(()=> this.setState({isLoading:false}))

    fetch('https://app.merrytimesacademy.com/jengo/get_data_two.php',
    {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(
        {
           data_request:'second_category_list'
        }
      )

    })
    .then((response)=> response.json())
    .then((responseJson) => {
        
      
        this.setState({category_two :responseJson})
        //this.setState({user_id:1})
    })
    .catch((error)=> 
    {
      alert(error)
    })
    .finally(()=> this.setState({isLoading_two:false}));

    fetch('https://app.merrytimesacademy.com/jengo/get_posts.php',
    {
      method:'POST',
      headers:{
        'Allow':'application/json',
        'Content-Type':'application/json',
      }
    })
    .then((response)=>response.json())
    .then(responseJson =>{
      console.log(responseJson);
       this.setState({post_adds:responseJson})
    })
    .catch((error)=>{
      alert(error);
    })
    .finally(()=> this.setState({isLoading_posts:false}));
  }

  displayItems=(({item}) => 
    {
     return(
       <View style={{flex:1,margin:1, padding:2}}>
         <View style={{flex:1, justifyContent:'center', alignItems:'center',width:100,height:50,padding:2, marginBottom:3}}>
           <Image
              style={{width:50,height:50,margin:1}}
              source={{uri:'https://app.merrytimesacademy.com/jengo/images/categories/'+item.image}}
           />
         </View>
         <View style={{flex:1, justifyContent:'center', alignItems:'center',paddingHorizontal:5,width:100,height:50}}>
              <Text  style={{fontSize:12,color:'#000',marginBottom:5,textAlign:'center'}}>
                {item.sub_category_name}
              </Text>
         </View>
      </View>
      
     )
    })

    displayPosts = ({ item }) => {
      return (
        <View
          style={{
            flex: 1,
            height: 162,
            margin: 5,
            elevation: 2,
            backgroundColor: "#fff",
            borderWidth:1,
            borderColor:"#ccc"
          }}
        >
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ width: 120, height: 120, margin: 0 }}>
              <Image
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 0,
                  margin: 0,
                }}
                source={{ uri: item.cover_avatar }}
              />
            </View>
            <View
              style={{
                flex: 1,
                margin: 7,
                fontSize: 9,
                flexDirection: "column",
                justifyContent: "space-between",
                height: 120,
                margin: 0,
                padding: 7,
              }}
            >
              <View>
                <Text style={{fontSize:13,color:"#454748"}}>{item.title}</Text>
                <View style={{flexDirection:'row'}}>
                  <Ionicons  name="compass" color={"#A0A6AB"} size={18}/>
                  <View>
                  <Text style={{fontWeight:'normal',color:'#A0A6AB',fontSize:14}}>{" "}{item.location}</Text>
                  </View>
                  
                  
                  
                </View>
              </View>
              <View>
                <Text style={{color:'#6F9E4C',fontWeight:'bold'}}>Ksh.{item.amount}</Text>
              </View>
            </View>
          </View>
  
          <View
            style={{
              flexDirection: "row",
              height: 40,
              width: "100%",
              // backgroundColor: "#ccc",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderWidth:1,
                borderColor:'#ccc',
                borderBottomWidth:3,
                borderBottomColor:'#F6AC0D'
              }}
            >
             <TouchableWithoutFeedback onPress={()=>{alert("fiti")}}>
                <View style={{flexDirection:'row'}}>
                  <Ionicons  name="mail" color={"#474747"} size={18}/>
                  <View>
                  <Text style={{fontWeight:'normal',color:'#454748',fontSize:14}}>{" "}Chat</Text>
                  </View>
                  
                  
                  
                </View>
               
              </TouchableWithoutFeedback>
              
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderWidth:1,
                borderColor:'#ccc',
                borderBottomWidth:3,
                borderBottomColor:'#6F9E4C'
              }}
            >
              <TouchableOpacity>
              <Ionicons  name="call" color={"#454748"} size={18}>
                  <Text style={{fontWeight:'normal',color:'#454748',fontSize:14}}>{" "}Call</Text>
                  </Ionicons>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      );
    };

  renderSeparator=()=>{
    return(
      <View style={{width:'100%', height: 1,backgroundColor:'#ccc'}}></View>
    )
  }

  render()
  {
    const headerHeight=this.state.scrollY.interpolate({
      inputRange:[0,HEADER_MAX_HEIGHT- HEADER_MIN_HEIGHT],
      outputRange:[HEADER_MAX_HEIGHT,HEADER_MIN_HEIGHT], 
      extrapolate:'clamp'});

      const searchOpacity=this.state.scrollY.interpolate({
        inputRange:[0,HEADER_MAX_HEIGHT- HEADER_MIN_HEIGHT],
        outputRange:[1,0], 
        extrapolate:'clamp'});


        const searchHeader=this.state.scrollY.interpolate({
          inputRange:[0,HEADER_MAX_HEIGHT],
          outputRange:[0,-(HEADER_MAX_HEIGHT*2)], 
          extrapolate:'clamp'});

          /*const searchDisplay_width=this.state.scrollY.interpolate({
            inputRange:[0,HEADER_MAX_HEIGHT- HEADER_MIN_HEIGHT],
            outputRange:['100%','0%'], 
            extrapolate:'clamp'});*/

        

      

    return(
   <View style={{flex:1,backgroundColor:'#BD3737'}}>
     
    <View style={{flex:1,marginTop:StatusBar.currentHeight, backgroundColor:'#BD3737'}}>
       
        <View  style={{top:0,left:0,height:HEADER_MAX_HEIGHT,backgroundColor:"#BD3737"}}>
           <View style={{flex:1, justifyContent:'center', alignItems:'center',height:20}}>
             <Text style={{color:'#fff',fontSize:20}}>Find Construction Materials</Text>
          </View>
          <View style={{flex:1}}>
         
           <View style={styles.searchSection}>
             
             <Ionicons style={styles.searchIcon} name="search" size={25} color="#000"/>
             <TouchableWithoutFeedback onPress={()=> this.props.navigation.navigate('search')}>
               <Text style={[styles.input, {width:'79%'}]} >Type your search here</Text>
             </TouchableWithoutFeedback>
              <Ionicons style={styles.optionIcon} name="options" size={27} color="#000"/>
            </View>
          </View>
        </View>
       
    <ScrollView 
    style={{ flex: 1,backgroundColor:'#fff',marginBottom:50}}>
     
     <View style={{width:'100%', marginBottom:4,marginTop:10,padding:5}}>
       <Text style={{fontWeight:'600',fontSize:16,width:'100%',borderBottomColor:'#6F9E4C',  borderBottomWidth:2,}}>Construction Categories</Text>
     </View>
    
       
      <View style={{height:100, marginTop: 10}}>
      { this.state.isLoading 
       ? 
       <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
       <ActivityIndicator size="large" color="#d93232" animating/>
       </View> 
       : 
       null} 
      <FlatList nestedScrollEnabled={true}
          data={this.state.category_one}
          renderItem={this.displayItems}
          keyExtractor={item=> item.entry_id}
          //ItemSeparatorComponent={this.renderSeparator}
          horizontal
          
         
        
      />
      <View style={{height:1,backgroundColor:'#ccc',margin:5}}></View>
      </View>
      <View style={{width:'100%', marginBottom:4,marginTop:10,padding:5}}>
        <Text style={{ fontWeight:'600',fontSize:16,width:'100%',borderBottomColor:'#6F9E4C',  borderBottomWidth:2,}}>Service Categories</Text>
      </View>
      <View style={{height:100, marginTop: 10}}>
      { this.state.isLoading_two 
       ? 
       <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
       <ActivityIndicator size="large" color="#d93232" animating/>
       </View> 
       : 
       null} 
      <FlatList nestedScrollEnabled={true}
          data={this.state.category_two }
          renderItem={this.displayItems}
          keyExtractor={item=> item.entry_id}
          //ItemSeparatorComponent={this.renderSeparator}
          horizontal
          
         
        
      />
      <View style={{height:1,backgroundColor:'#ccc',margin:5}}></View>
      </View>

      <View style={{width:'100%', marginBottom:4,marginTop:10,padding:5}}>
        <Text style={{ fontWeight:'600',fontSize:16,width:'100%',borderBottomColor:'#6F9E4C',  borderBottomWidth:2,}}>Trending</Text>
      </View>
      <View style={{ marginTop: 10, backgroundColor:'#F2F2F2' }}>
      { this.state.isLoading_posts 
       ? 
       <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
       <ActivityIndicator size="large" color="#d93232" animating/>
       </View> 
       : 
       null} 
      <FlatList nestedScrollEnabled={true}
          data={this.state.post_adds}
          renderItem={this.displayPosts}
          keyExtractor={item=> item.entry_id}
          
          
         
        
      />
      <View style={{height:1,backgroundColor:'#ccc',margin:5}}></View>
      </View>



      
    </ScrollView>
    </View>
    </View>
    );
  }
}
export default HomeSreen;

const styles=StyleSheet.create(
{
  input: {
    height: 35,
    margin: 10,
    width:'75%',
    paddingLeft:10,
    paddingTop:7,
    backgroundColor:'#fff',
    borderRadius:5,
    borderColor:'#ccc',
    color:'#878787',
    fontSize:15,
    
    
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin:10,
    
    borderRadius:5,
    shadowColor: "#000",
    shadowOffset: {
   	  width: 0,
	   height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
   },
   searchIcon: {
    padding: 10,
    position: 'absolute',
    left:0,
    color:'#a0a1a1'
},
optionIcon: {
  padding: 10,
  position: 'absolute',
  right:0,
  color:'#d93232',
},
}
)