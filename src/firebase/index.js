import Vue from 'vue'
import VueFire from 'vuefire'
import Firebase from 'firebase'

Vue.use(VueFire)

Firebase.initializeApp({
  apiKey: 'AIzaSyBZiCBVqYFjpobhIl6Np1KOdA14HmGBnr4',
  authDomain: 'reza-pramudhika.firebaseapp.com',
  databaseURL: 'https://reza-pramudhika.firebaseio.com',
  projectId: 'reza-pramudhika',
  storageBucket: 'reza-pramudhika.appspot.com',
  messagingSenderId: '842136926824'
})

export default Firebase
