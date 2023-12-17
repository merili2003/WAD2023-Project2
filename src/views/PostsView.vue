<template>
    <!-- Main container for the posts view -->
    <div class="postsView">
        <!-- Left padding for aesthetic spacing and alignment -->
        <div class="Left-padding"></div>
        <div class="button-and-postlist">

            <button class="link" @click="logOut">Log Out</button>
            <!-- PostList component displaying a list of posts -->
            <PostList></PostList>

        </div>
        

        <!-- Right padding for aesthetic spacing and alignment -->
        <div class="Right-padding"></div>
    </div>
</template>

<script>
// Importing the PostList component from the components directory
import PostList from "@/components/PostList.vue";

export default {
    name: "PostsView", // Name of the Vue component
    components: {
        PostList // Registering PostList as a subcomponent
    },
    methods: {
        logOut() {
            this.$store.dispatch("logoutAction")
            .then(this.$router.push({name: "login"}))
        }
    }
    // This component serves as a container for the PostList component,
    // with additional padding elements on the left and right for layout purposes.
};
</script>

<style scoped>
.button-and-postlist {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.postsView {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-width: 100vw;
    height: 100%;
}


.Left-padding, .Right-padding {
    display: flex;
    flex-direction: column;
    width: 10vw;
    min-height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    min-width: 100px;
    box-shadow: inset 0px 0px 10px 0px midnightblue;
    border-radius: 5px;
}
.Left-padding {
    margin-left: 5px;
}
.Right-padding {
    margin-right: 5px;
}
@media screen and (max-width: 1000px){
    .Left-padding {
        min-width: 0;
    }
    .Right-padding {
        min-width: 0;
    }
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