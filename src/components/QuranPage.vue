<template>
  <div>
    <h1>Al-Quran Ayat</h1>
    <div v-if="quranPage">
      <div v-for="(ayah, index) in quranPage.ayahs" :key="index">
        <p>{{ ayah.text }}</p>
      </div>
      <div class="pagination">
        <button v-if="currentPage > 1" @click="goToPage(currentPage - 1)">Previous</button>
        <button v-for="pageNumber in totalPages" :key="pageNumber" @click="goToPage(pageNumber)" :class="{ active: pageNumber === currentPage }">{{ pageNumber }}</button>
        <button v-if="currentPage < totalPages" @click="goToPage(currentPage + 1)">Next</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'QuranPage',
  data() {
    return {
      quranPage: null,
      currentPage: 1,
      totalPages: 614,
    };
  },
  mounted() {
    this.fetchPage(1);
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
  },
};
</script>
