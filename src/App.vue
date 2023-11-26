<template>
  <header>
    <div class="Button-container">
        <router-link class="link" to="/">Posts</router-link> 
        <!--|
        <router-link class="link" to="/addPost">Add Post</router-link>-->
    </div>
    <p>login-></p>
    <div class="Image-container">
        <img @click="vars.showDropdown = !vars.showDropdown" :class="vars.showDropdown ? 'show' : ''" :src="activePfp" alt="Profile picture">
        <div v-show="vars.showDropdown && !loggedIn" class="dropdown-content">
            <router-link class="link" to="/login">Login</router-link>
        </div>
        <div v-show="vars.showDropdown && loggedIn" class="dropdown-content">
            <router-link class="link" to="/login">{{ activeName }}</router-link>
            <router-link class="link" to="/login">{{ activeMail }}</router-link>
            <a class="link" @click="logOut">Logout</a>
        </div>
    </div>

  </header>
  <router-view />
  <footer>
    footer text
  </footer>
</template>

<script>
export default {
  name: "'App'",
  data: function() {
    return {
      vars: [{showDropdown:false}]
    }},
    methods: {
        logOut() {
            this.$store.dispatch("logoutAction");
            this.$router.push({path: "/login"});
        }
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
},
};
</script>

<style>
#app {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-family: 'Unbounded', monospace;
  text-align: center;
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
header, footer{
    display: flex;
    flex-direction: row;
    max-width: 100vw;
    min-width: 100vw;
    justify-content: space-between;
    background-color:  rgba(0, 0, 0, 0.75);
    padding: 5px 5px 5px 5px;
    min-height: 75px;
    align-items: center;
    font-size: 25px;
    border-radius: 0px;
    box-shadow: inset 0px 0px 10px 0px midnightblue;
}
header {
  margin-bottom: 5px;
}
footer {
    margin-top: 5px;
    justify-content: center;
}

.Button-container .link {
    color: rgb(249, 249, 249);
    text-decoration: none;
    align-items: center;
    padding: 10px 20px;
    font-size: 25px;
    background-color: #00000000;
    border: none;
}
.Button-container .link:hover {
    transition-duration: 0.3s;
    background-color: rgba(25, 25, 112, 0.75);
}
.Button-container .router-link-exact-active {
    padding: 10px 20px;
    background-color: rgba(25, 25, 112, 0.75);
}

.Image-container img {
    width: 50px;
    height: fit-content;
    align-items: center;
    cursor: pointer;
}

/* Profile image styling in header with transition effects */
header .Image-container img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 35px;
    margin-top: 10px;
    transition: box-shadow 0.4s, transform 0.4s;
}
    
    
/* Hover effect for profile image in header */
header .Image-container:hover img {
    box-shadow: 0 0 40px rgba(0, 0, 255, 0.9), 0 0 10px rgba(0, 0, 255, 0.8);
    transform: scale(1.05);
    will-change: box-shadow, transform;
}

header .Image-container .show {
  box-shadow: 0 0 40px rgba(0, 0, 255, 0.9), 0 0 10px rgba(0, 0, 255, 0.8);
  transform: scale(1.05);
  will-change: box-shadow, transform;
}

.dropdown-content {
    display: block; /* Hide the dropdown menu by default */
    position: absolute;
    right: 10px;
    background-color: rgba(0, 0, 0, 0.1); /* Background color with some transparency */
    min-width: 160px;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2); /* Add a shadow effect */
    z-index: 1; /* Ensure the dropdown appears above other content */
}

/* Styles for individual dropdown menu items */
.dropdown-content .link {
    background-color: rgba(25, 25, 112, 0.75); /* Background color with some transparency */
    color: rgb(249, 249, 249); /* Text color */
    box-shadow: inset 0px 0px 10px 0px midnightblue; /* Apply a box shadow */
    border-radius: 5px; /* Apply a border radius */
    padding: 12px 16px;
    text-decoration: none;
    display: block; /* Make each item a block element for proper spacing */
}

/* Hover effect for dropdown menu items */
.dropdown-content .link:hover {
    text-shadow: 0 0 5px #800080, 0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080, 0 0 50px #800080; /* Add a text shadow effect on hover */
    background-color: rgba(128, 0, 128, 0.2); /* Change background color with some transparency on hover */
    border-color: #800080; /* Change border color on hover */
}

.dropdown-content .router-link-exact-active {
    text-shadow: 0 0 5px #800080, 0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080, 0 0 50px #800080; /* Add a text shadow effect on hover */
    background-color: rgba(128, 0, 128, 0.2); /* Change background color with some transparency on hover */
    border-color: #800080; /* Change border color on hover */
}
</style>
