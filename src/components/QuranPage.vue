<template>
  <div>
    <h1>Al-Quran Ayat</h1>
    <div v-if="quranPage">
      <div v-for="(ayah, index) in quranPage.ayahs" :key="index">
        <p>{{ ayah.text }}</p>
      </div>
      <div class="pagination">
        <button v-if="currentPage > 1" @click="goToPage(currentPage - 1)">Previous</button>
        <button v-for="pageNumber in totalPages" :key="pageNumber" @click="addUserToPage(pageNumber)" :class="{ active: pageNumber === currentPage }">
          {{ pageNumber }} ({{ onlineUsers[pageNumber]?.join(', ') || '' }})
        </button>
        <button v-if="currentPage < totalPages" @click="goToPage(currentPage + 1)">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import db from '../firebase/init.js'
import { doc, addDoc, collection, setDoc, onSnapshot } from "firebase/firestore";


export default {
  name: 'QuranPage',
  data() {
    return {
      quranPage: null,
      currentPage: 1,
      totalPages: 604,
      onlineUsers: {},
    };
  },
  mounted() {
    this.fetchPage(1);
    this.listenForOnlineUsers();
  },
  methods: {
    fetchPage(pageNumber) {
      axios.get(`https://api.alquran.cloud/v1/page/${pageNumber}/quran-uthmani`)
        .then(response => {
          this.quranPage = response.data.data;
          this.currentPage = pageNumber;
          this.totalPages = 604;
        })
        .catch(error => {
          console.log(error);
        });
    },
    
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.fetchPage(pageNumber);
      }
    },

    async addUserToPage(pageNumber) {
      // const user = firebase.auth().currentUser;
      await setDoc(doc(db, `onlineUsers/${pageNumber}/user.uid/name`), {name: 'user.displayName'});
      // if (user) {
      // }
    },

    listenForOnlineUsers() {
      
      // const colRef = collection(db, 'onlineUsers')

      
      // const unsub = onSnapshot(doc(db, "onlineUsers"), (doc) => {
      //     console.log("Current data: ", doc.data());
      // });

      // colRef.on('value', snapshot => {
      //   const onlineUsers = snapshot.val() || {};
      //   this.onlineUsers = onlineUsers;
      // });
    },
  },
};
</script>
