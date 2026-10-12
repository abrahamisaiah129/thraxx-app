import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export default function authMethods() {
  return {
    // SIGN UP METHOD
    signUp: async function (email, password) {
      try { 
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        console.log('User account created & signed in!', userCredential.user.uid);
        Alert.alert('Success', 'Account created successfully!');
        return userCredential;
      } 
      // 
      // 
      // catch instances 
      catch (error) { 
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!'); 
        } else if (error.code === 'auth/weak-password') {
          Alert.alert('Error', 'The password is too weak.');
        } else {
          Alert.alert('Registration Error', error.message);
        }
        throw error;
      }
    },

    // SIGN IN METHOD
    signIn: async function (email, password) {
      try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        console.log('User signed in successfully!', userCredential.user.uid);
        return userCredential;
      }
      // 
      // 
      // catch instances
      catch (error) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          Alert.alert('Error', 'Invalid email or password.');
        } else if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
        } else if (error.code === 'auth/user-disabled') {
          Alert.alert('Error', 'This user account has been disabled.');
        } else {
          Alert.alert('Sign-In Error', error.message);
        }
        throw error;
      }
    },

    // SIGN OUT METHOD
    signOut: async function () {
      try {
        await auth().signOut();
        console.log('User signed out successfully!');
      } catch (error) {
        Alert.alert('Sign-Out Error', 'Failed to log out. Please try again.');
        throw error;
      }
    },
  };
}
