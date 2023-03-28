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
          {{ pageNumber }} ({{ onlineUsers[pageNumber] }})
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
        this.addUserToPage(pageNumber);
      }
    },

    async addUserToPage(pageNumber) {
      const auth = getAuth();
      const user = auth.currentUser;
      // console.log(user.email);
      // console.log(user.displayName);
      // console.log(fb.db);
      // console.log(`onlineUsers/${pageNumber}/${user.uid}/name`);
      if (user) {
        const keyy = user.uid;
        await setDoc(doc(fb.db, `onlineUsers-${pageNumber}/${keyy}`), {key: user.email});
      }
    },

    async listenForOnlineUsers() {

      const dbRef = collection(fb.db, "onlineUsers-10");

      onSnapshot(dbRef, docsSnap => {
        docsSnap.forEach(doc => {
          this.onlineUsers[10] = doc.data().key;
          console.log('ok', doc.data().key);
          console.log('ok', this.onlineUsers);
        })
      });

      const querySnapshot = await getDocs(collection(fb.db, "onlineUsers-10"));
      querySnapshot.forEach((doc_item) => {
        console.log(doc_item.id, " => ", doc_item.data());

        const unsub = onSnapshot(doc(fb.db, `onlineUsers-10/${doc_item.id}`), (doc_item2) => {
            console.log("Current data 2: ", doc_item2.data());
        });

      });

    },
  },
};
</script>
