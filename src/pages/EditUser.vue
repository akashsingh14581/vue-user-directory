<template>
  <div class="editContainer">
    <h2>Edit User</h2>
    <form @submit.prevent="updateUser">
      <input v-model="user.firstName" placeholder="First Name" />
      <input v-model="user.lastName" placeholder="Last Name" />
      <input v-model="user.email" placeholder="Email" />
      <button type="submit">💾 Save</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        email: ""
      }
    };
  },
  async created() {
    const id = this.$route.params.id;
    const res = await axios.get(`https://dummyjson.com/users/${id}`);
    this.user = res.data;
  },
  methods: {
    async updateUser() {
      // normally you’d send PATCH request here
    //   await axios.patch(`https://dummyjson.com/users/${this.user.id}`, this.user);
      alert("✅ User updated (not saved to API in mock)");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.editContainer {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
}
input {
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
}
button {
  background-color: #28a745;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
}
</style>
