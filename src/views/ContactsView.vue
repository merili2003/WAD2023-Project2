<template>
  <div class="contacts-view">
    <h2>Contact Us</h2>
    <p>If you have any questions or feedback, feel free to reach out to us:</p>
    <ul>
      <li>Email: team@G4.org</li>
      <li>Phone: +123 456 7890</li>
      <li>Address: 1022 Delta Center, Tartu, Estonia</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ContactsView",
};
</script>

<style scoped>
.contacts-view {
  max-width: 420px;
  margin: 30px auto;
  background: rgba(0, 0, 0, 0.5);
  text-align: center;
  padding: 40px;
  border-radius: 10px;
  border: 1px solid pink;
  box-shadow: 0 0 10px rgb(255, 17, 192), 0 0 20px rgb(255, 39, 226), 0 0 30px pink, 0 0 40px pink; /* Neon pink glow */
  transition: box-shadow 0.3s ease-in-out;
}

.contacts-view:hover {
  box-shadow: 0 0 15px pink, 0 0 25px pink, 0 0 35px pink, 0 0 45px pink; /* Intensify glow on hover */
}

ul {
  list-style: none;
  padding: 0;
}

li {
  color: white;
  margin-bottom: 10px;
}

h2 {
  color: rgb(255, 0, 187);
  margin-bottom: 20px;
}
</style>