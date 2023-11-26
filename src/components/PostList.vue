<template>

<div class="Posts-container">
    <SinglePost :postData="post" :postIndex="index" v-for="(post,index) in postList" :key="index"/>
    <button class="link" @click="resetLikes">Reset Likes</button>
</div>

</template>

<script>
import SinglePost from "@/components/SinglePost.vue"; 
export default {
name: "PostList",
components: {SinglePost},
methods: {
        resetLikes() {
            this.$store.dispatch("resetLikesAction");
        }
    },
computed: {
    postList() {
        return this.$store.state.postList;
    }
}
};
</script>

<style scoped>
.Posts-container {
    display: flex;
    flex-direction: column;
    width: 70vw;
    max-width: 800px;
}


/* Styles for individual dropdown menu items */
.link {
    background-color: rgba(25, 25, 112, 0.75); /* Background color with some transparency */
    color: rgb(249, 249, 249); /* Text color */
    box-shadow: inset 0px 0px 10px 0px midnightblue; /* Apply a box shadow */
    border-radius: 5px; /* Apply a border radius */
    padding: 12px 16px;
    text-decoration: none;
    display: block; /* Make each item a block element for proper spacing */
}

/* Hover effect for dropdown menu items */
.link:hover {
    text-shadow: 0 0 5px #800080, 0 0 15px #800080, 0 0 25px #800080, 0 0 35px #800080, 0 0 50px #800080; /* Add a text shadow effect on hover */
    background-color: rgba(128, 0, 128, 0.2); /* Change background color with some transparency on hover */
    border-color: #800080; /* Change border color on hover */
}

</style>

