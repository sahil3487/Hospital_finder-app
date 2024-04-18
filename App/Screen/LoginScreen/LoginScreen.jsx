import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../hooks/WarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {

  const googleSignin = async() => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }

    // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  return (
    <View style={styles.loginContainer}>
      <Image style={styles.logoImage} source={require('./../../../assets/Images/logo-white.png')}/>
      <Image style={styles.backgroundImage} source={require('./../../../assets/Images/login-bg.jpg')}/>
        <View style={{padding:20}}>
          <Text style={styles.heading}> Where Health Meets Convenience </Text>
          <Text style={styles.subHeading}> Unlocking Access to Superior Medical Facilities more in just one click
          </Text>
          <TouchableOpacity style={styles.button} onPress={googleSignin}>
            <Text style={styles.btnText}>Login With Google</Text>
          </TouchableOpacity>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    loginContainer: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:75
    },
logoImage: {
    width:600,
    height:70,
    objectFit:'cover',
   
}, backgroundImage: {
    width:'100%',
    height:260,
    objectFit:'cover',
    marginTop:80

},
heading: {
  fontFamily:'Raleway-Bold',
  fontSize:25,
  textAlign:'center',
  marginTop:20
},
subHeading: {
  fontFamily:'Raleway-Regular',
  fontSize:15,
  textAlign:'center',
  marginTop:15,
  color:Colors.GRAY
}, 
button: {
  backgroundColor:Colors.PRIMARY,
  marginTop:70,
  display:'flex',
  borderRadius:99,
  padding:15
},
btnText: {
  textAlign:'center',
  color:Colors.WHITE,
  fontFamily:'Raleway-Regular',
  fontSize:17
}

})