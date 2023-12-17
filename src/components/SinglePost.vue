<template>
    <div class="thisPost">
        <div class="header">
            <div></div>
            <p>{{ postData.date }}</p>
        </div>
        <div class="Post-content">
            <p>{{ postData.body }}</p>
        </div>
        <div class="footer">
            <button @click="editPost">
                <img src="@/assets/like.png" alt="Like">
            </button>
            <p>{{ "<--- edit me" }}</p>
        </div>
    </div>
</template>


<script>
export default {
    name: "SinglePost",
    props: ["postData", "postIndex", "id"],
    methods: {
        editPost() {
            this.$router.push("/onepost/:"+this.id)
        }
    }
}
</script>

<style scoped>
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
    align-items: center;
}

.header {
    justify-content: space-between;
}

/* Define direction for header items in individual posts */
.header {
    flex-direction: row;
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
    background-color: rgba(0, 0, 0, 0);
    border: none;
    padding: 20px 20px 20px 20px;
    border-radius: 45px;
}
.footer > button:hover {
    cursor: pointer;
    transition-duration: 0.3s;
    background-color: rgba(25, 25, 112, 0.75);
}
</style>