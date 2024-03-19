// styles.js
import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#69c9ab',
      alignItems: 'center',
      
      
  },
  
  titleContainer: {
      flex: 1, 
      paddingTop: 50,
      alignItems: 'center',
  },
  screenTitleContainer: {
    flex: 1, 
    paddingTop:80,
    alignItems: 'center',
  },
  appTitle:{
    color: 'black',
    fontWeight:'bold',
    fontSize:45,
    paddingBottom: 25,
    //new changes
      //borderWidth:3,
      shadowColor:'#5AEB16',
      shadowOffset: { width: 0, height: 4 },
      shadowRadius:7.2,
  },
  moto:{
    color: 'white',
    fontSize:18,
    textAlign: 'center',
    
    
  },
  subTitle:{
    color: 'white',
    fontSize:18,
    fontWeight:'bold',
    textAlign: 'center',
    letterSpacing: 1,
    paddingBottom:20,
  },
  formArea: {   //VIEW
    width: '90%',//to set the width of the input fields
    alignItems:'center',
    

  },
  textInput: {  //TEXT INPUT //the inputs in the label field
    backgroundColor:'white',
    padding:15,
    paddingLeft:55,
    paddingRight:55,
    borderRadius:5,
    fontSize:16,
    height:50,
    width:300,
    
    marginVertical:3,
    marginBottom:15,
    color:'black',
  },
  inputLabel:{  //TEXT //the name of the labels
    color: 'black',
    fontSize: 15,
    textAlign: 'left',
  },
  inputLabelLeftIcon:{   //VIEW
    left:15,
    top:35,
    position:'absolute',
    zIndex:1,
  },
  inputLabelRightIcon:{ //HAVE TO USE TOUCHANBLE OPACITY
    right:15,
    top:35,
    position:'absolute',
    zIndex:1,
  },

  button: {//HAVE TO USE TOUCHANBLE OPACITY
    padding:15, //for login button
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',// for any text in the button to appear in the center
    borderRadius: 5,
    marginVertical: 5,
    height: 60,
    width:300,
  },
  
  buttonText:{ //TEXT
    color:'black', //text on the submit button
    fontSize:16,

    /*...(props.google && {
      padding:25,
    }),*/

  },
  line:{ //horizontal line in login page VIEw
    marginTop:30,
    height:1,
    width:300,
    backgroundColor:'black',
    marginVertical:30,

  },
  msgBox:{ //to display errors while logging in TEXT
    
    textAlign:'center',
    fontSize:13,

  },
  extraView:{ //to display dont have an account yet
    justifyContent: 'center',
    flexDirection:'row', //VIEW
    alignItems: 'center',
    padding:10,
    marginBottom: 210,

  },
  extraText:{   //TEXT
    justifyContent: 'center',
    alignItems: 'center',
    color:'black',
    fontSize:15,
    

  },
  textLink:{
    justifyContent: 'center',
    alignContent: 'center',

  },
  textLinkContent:{  //for sign up link //TOUCHABLE OPACITY
    
    color:'white',
    fontSize:15,

  },
  footerContainer: {
    /*The value flex: 1 / 3 is shorthand for the flex-grow and flex-shrink properties.
    flex-grow: 1 means the item can grow and take up any available space along the main axis of the flex container.
    flex-shrink 3 means the item can shrink three times as much as other flex items with a flex-shrink value of 1.
    */
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 0,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  bottomBarItem: {
    flex: 1,
    alignItems: 'center',
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  highlightedIcon: {
    // Add styles you want to apply when the item is highlighted
    // For example, changing the background color or adding a border
    borderColor: 'green', // Change this to your preferred highlighted color
     // Add border-radius for a rounded look (optional)
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius:50 ,
    padding: 10,
    
    //margin: 16,
    
  },
  searchInput: {
    fontSize: 16,
    width: 250,
  },
  searchButton: {
    marginLeft: 8,
    padding: 8,
  },
  imageButton: {
    padding:15,
    
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',// for any text in the button to appear in the center
    borderRadius: 20,
    marginVertical: 15,
    margin:25,
    height: 60,
    width:150,
  },

});

  


export default styles;
