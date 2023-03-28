<template>
  <div>
    <button @click="googleSignIn">
      Sign In with Google
    </button>
  </div>
</template>

<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default {
  name: "SignUp",
  methods: {
    googleSignIn: function() {
        const auth = getAuth();
        let provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
          .then((result) => {
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            const user = result.user;
            console.log(user) // User that was authenticated
          }).catch((error) => {
              console.log(error)
          });
    },
  }
}
</script>
