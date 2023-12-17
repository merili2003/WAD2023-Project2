<template>
    <div class="Posts-container">
        <SinglePost :postData="post" :postIndex="index" v-for="(post) in postList" :key="post.id" :id="post.id"/>
        <div class="footer2">
            <button class="link" @click="addPost">Add post</button>
            <button class="link" @click="deleteAllPosts">Delete all</button>
        </div>
        
    </div>
</template>

<script>
import SinglePost from "@/components/SinglePost.vue"; 
export default {
    name: "PostList",
    components: {SinglePost},
    computed: {
        // Computed property to access the list of posts from the store
        postList() {
            return this.$store.state.postList;
        }
    },
    mounted() {
        this.$store.dispatch("getAllPostsAction");
    },
    methods: {
        // Method to dispatch action to reset likes for all posts
        deleteAllPosts() {
            this.$store.dispatch("deleteAllPostsAction");
        },
        addPost() {
            this.$router.push("/newpost")
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

.thisPost {
    display: flex;  /* Use flexbox layout */
    flex-direction: column;  /* Stack flex items vertically */
    max-width: 100%;  /* Ensure post doesn't overflow its container */
    margin: 10px 0;  /* Add vertical spacing between posts */
    background-color: rgba(0, 0, 0, 0.5);  /* Set background color */
    box-shadow: inset 0px 0px 10px 0px midnightblue;  /* Apply shadow */
    border-radius: 5px;  /* Round the corners */
    padding: 10px;
    font-size: 25px;
    text-align: left;
}

/* Header and footer style for individual posts */
.header, .footer, .footer2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer2 {
    width: 60vw;
    align-self: center;
}

/* Style for profile images in post header */
.header img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-left: 10px;
}

/* Ensure images inside posts are responsive */
img {
    max-width: 100%;
    height: auto;
}

/* Adjust margin for paragraphs that directly follow an image inside a post */
img + p {
    margin-top: 20px;
}

/* Style paragraphs after a highlighted class within a post */
.highlighted ~ p {
    text-decoration: underline dashed;
}

.footer > button > img{
    width: 50px;
    height: fit-content;
    align-items: center;
}
.footer > button {
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    background-color: rgba(0, 0, 0, 0); /* Transparent background */
    border: none;
    padding: 20px 20px 20px 20px;
    border-radius: 45px;
}

.footer > button:hover {
    background-color: rgba(25, 25, 112, 0.3); /* Optional: Background color change on hover */
    box-shadow: 0 0 10px pink, 0 0 20px pink; /* Glowing effect */
}

.link {
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    background-color: rgba(0, 0, 0, 0.5); /* Similar to other elements */
    color: white; /* Text color */
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    margin-top: 20px; /* Spacing above the button */
    text-align: center;
    display: block; /* To occupy full width of the container */
    width: auto; /* Adjust width as per your design */
    box-shadow: 0 0 5px pink, 0 0 10px pink; /* Neon pink glow */
    margin-bottom: 20px;
}

.link:hover {
    background-color: rgba(25, 25, 112, 0.3); /* Background color change on hover */
    box-shadow: 0 0 10px pink, 0 0 20px pink; /* Intensify glow on hover */
    color: rgb(249, 249, 249); /* Change text color on hover if needed */
}

</style>

