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
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...

            console.log(token) // Token
            console.log(user) // User that was authenticated

          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });

    }
  },
};
</script>
