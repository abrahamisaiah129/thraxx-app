import { collection, getFirestore } from '@react-native-firebase/firestore';

const db = getFirestore();
const usersCollection = collection(db, 'Users');

// Get user document with an ID of ABC
// const userDocument = doc(collection(db, 'Users'), 'ABC');
