<template>
  <div>
    <h1>Al-Quran Ayat</h1>
    <div v-if="quranPage">
      <div v-for="(ayah, index) in quranPage.ayahs" :key="index">
        <p>{{ ayah.text }}</p>
      </div>
      <div class="pagination">
        <button v-if="currentPage > 1" @click="goToPage(currentPage - 1)">Previous</button>
        <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)" :class="{ active: pageNumber === currentPage }">
          {{ pageNumber }} {{ pages[pageNumber]?.join(', ') }}
        </button>
        <button v-if="currentPage < totalPages" @click="goToPage(currentPage + 1)">Next</button>
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
      // console.log(fb.db);
      // console.log(`pages/${pageNumber}/${user.uid}/name`);
      if (user) {
        await setDoc(doc(fb.db, `pages/${pageNumber}/users/${user.uid}`), {name: user.email});
      }
    },

    async listenForOnlineUsers() {

      const dbRef = collection(fb.db, "pages/6/users");
      this.pages[6] = [];

      onSnapshot(dbRef, docsSnap => {
        this.pages[6] = [];
        docsSnap.forEach(doc => {
          this.pages[6].push( doc.data().name);
          console.log('ok', doc.id);
          console.log('ok', doc.data().name);
          // console.log('ok', {...this.pages[6]});
        })
      });

      // const querySnapshot = await getDocs(collection(fb.db, "pages/6/users"));
      // querySnapshot.forEach((doc_item) => {
      //   console.log(doc_item.id, " => ", doc_item.data());

      //   // this.pages[6] = [];
      //   const unsub = onSnapshot(doc(fb.db, `pages/6/users/${doc_item.id}`), (doc_item2) => {
      //       console.log("Current data 2: ", doc_item2.data().name);

      //       // this.pages[6] << doc_item2.data().name
      //   });

      // });

    },
  },
};
</script>
