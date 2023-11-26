<template>
    <div class="Posts-container">
        <div v-for="(post, index) in postList" :key="index" class="thisPost">
            <div class="header">
                <img :src="post.pfp" alt="Profile picture">
                <p>{{ post.date }}</p>
            </div>
            <div class="Post-content">
                <img v-if="post.image" :src="post.image" :alt="post['alt-image']">
                <p>{{ post.body }}</p>
            </div>
            <div class="footer">
                <button @click="addLike(index)">
                    <img src="@/assets/like.png" alt="Like">
                </button>
                <p v-if="post.likes !== undefined && post.likes !== null">Likes: {{ post.likes }}</p>
            </div>
        </div>
        <button class="link" @click="resetLikes">Reset Likes</button>
    </div>
</template>

<script>
export default {
    name: "PostList",
    computed: {
        postList() {
            return this.$store.state.postList;
        }
    },
    methods: {
        addLike(postIndex) {
            this.$store.dispatch("addLikeAction", postIndex);
        },
        resetLikes() {
            this.$store.dispatch("resetLikesAction");
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
.header, .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
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

