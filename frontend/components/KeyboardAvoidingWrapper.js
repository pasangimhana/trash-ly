
import { KeyboardAvoidingView,ScrollView,TouchableWithoutFeedback,Keyboard } from "react-native";

export default function KeyboardAvoidingWrapper ({ children }){
    return (
        <KeyboardAvoidingView style={{flex:1}} >
           {/*To see hidden content */}
           <ScrollView>
                {/*If the user presses anywhere, the keyboard will close */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    {children}
                </TouchableWithoutFeedback>

           </ScrollView> 
        </KeyboardAvoidingView>
        
    );
}