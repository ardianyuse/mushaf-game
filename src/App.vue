<template>
  <div id="app">
    <Signin />
    <QuranPage />
  </div>
</template>

<script>
import Signin from './components/Signin.vue';
import QuranPage from './components/QuranPage.vue';

export default {
  name: 'App',
  components: {
    Signin,
    QuranPage,
  },
};
</script>
