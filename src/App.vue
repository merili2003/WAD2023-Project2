<template>
    <AppHeader />
    <router-view />
    <AppFooter />
  </template>
  
  <script>
  import AppHeader from "@/components/Header.vue";
  import AppFooter from "@/components/Footer.vue";
  
  export default {
    name: "App",
    components: {
      AppHeader,
      AppFooter
    },
    data: function() {
      return {
        vars: [{ showDropdown: false }]
      };
    },
    methods: {
      logOut() {
        this.$store.dispatch("logoutAction");
        this.$router.push({ path: "/login" });
      }
    },
    mounted() {
      this.$store.dispatch('fetchPosts');
    },
    computed: {
      loggedIn() {
        return this.$store.getters.loggedIn;
      },
      activePfp() {
        return this.$store.state.activeAccount.pfp ? this.$store.state.activeAccount.pfp : '../pfp.png';
      },
      activeName() {
        return this.$store.state.activeAccount.name;
      },
      activeMail() {
        return this.$store.state.activeAccount.mail;
      }
    }
  };
  </script>
  
  <style>
  #app {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    font-family: 'Unbounded', monospace;
    text-align: center;
    justify-content: space-between;
  min-height: 100vh; /* Make sure it takes at least the full viewport height */
    color: rgb(249, 249, 249);
    height: 100%;
  }
  body {
      margin: 0;
      background-image: url("@/assets/space.webp");
      background-repeat: no-repeat;
      background-attachment: fixed;
      background-size: 100vw 100vh;
      background-color: black;
      overflow-y: scroll;
      min-height:100vh;
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
  body::-webkit-scrollbar {
      display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  body {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
  }

  
  </style>
  