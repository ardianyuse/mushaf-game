<template>
  <div>
    <h1>Al-Quran Ayat</h1>
    <div v-if="quranPage">
      <div v-for="(ayah, index) in quranPage.ayahs" :key="index">
        <p>{{ ayah.text }}</p>
      </div>
      <div class="pagination">
        <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)" :class="{ active: pageNumber === currentPage }">
          {{ pageNumber }} {{ pages[pageNumber]?.join(', ') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import fb from '../firebase'
import { doc, addDoc, getDocs, query, collection, setDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";


export default {
  name: 'QuranPage',
  data() {
    return {
      quranPage: null,
      currentPage: 1,
      totalPages: 604,
      pages: {},
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
        this.addUserToPage(pageNumber);
      }
    },

    async addUserToPage(pageNumber) {
      const auth = getAuth();
      const user = auth.currentUser;
      // console.log(user.email);
      // console.log(user.displayName);
      if (user) {
        await setDoc(doc(fb.db, `pages/${pageNumber}/users/${user.uid}`), {name: user.email});
      }
    },

    async listenForOnlineUsers() {

      for (let index = 1; index < 605; index++) {

        const dbRef = collection(fb.db,`pages/${index}/users`);
        // this.pages[index] = [];

        onSnapshot(dbRef, docsSnap => {
          this.pages[index] = [];
          docsSnap.forEach(doc => {
            this.pages[index].push( doc.data().name);
            console.log('ok', doc.id);
            console.log('ok', doc.data().name);
            // console.log('ok', {...this.pages[6]});
          })
        });
      }

    },
  },
};
</script>
