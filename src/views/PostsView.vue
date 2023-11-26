<template>
    <!-- Main container for the posts view -->
    <div class="postsView">
        <!-- Left padding for aesthetic spacing and alignment -->
        <div class="Left-padding"></div>
        
        <!-- PostList component displaying a list of posts -->
        <PostList></PostList>

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
    }
    // This component serves as a container for the PostList component,
    // with additional padding elements on the left and right for layout purposes.
};
</script>

<style scoped>

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
</style>