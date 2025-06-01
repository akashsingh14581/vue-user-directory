<template>
  <div class="user-detail-container" v-if="user">
    <div class="user-card">
      <div class="user-image-wrapper">
        <img
          :src="`https://randomuser.me/api/portraits/${user.gender === 'female' ? 'women' : 'men'}/${user.id}.jpg`"
          alt="User Image"
          class="user-image"
        />
      </div>
      <h1 class="user-name">{{ user.firstName }} {{ user.lastName }}</h1>
      <p class="user-email">📧 {{ user.email }}</p>
      <div class="user-info">
        <p><strong>Company:</strong> {{ user.company?.name || 'N/A' }}</p>
        <p><strong>Role:</strong> {{ user.company?.title || 'N/A' }}</p>
        <p><strong>Address:</strong> {{ user.address?.address || '' }}, {{ user.address?.city || '' }}</p>
      </div>
      <button @click="$router.back()" class="back-btn">← Back</button>
      
    </div>
    
  </div>

  <div v-else-if="error" class="error-msg">{{ error }}</div>
  <div v-else class="loading-msg">Loading user details...</div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
      error: null,
    };
  },
  async created() {
    const userId = this.$route.params.id;
    try {
      const response = await axios.get(`https://dummyjson.com/users/${userId}`);
      this.user = response.data;
    } catch (e) {
      this.error = "User not found";
    }
  }
};
</script>

<style scoped>
.user-detail-container {
  display: flex;
  justify-content: center;
  padding: 2rem 1rem;
  background: #f4f7f8;
  box-sizing: border-box;
  height: 100vh;
}

.user-card {
  background: white;
  max-width: 400px;
  width: 100%;
  height: fit-content;
  border-radius: 15px;
  box-shadow: 0 12px 25px rgba(0,0,0,0.1);
  padding: 2rem;
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.user-image-wrapper {
  width: 140px;
  height: 140px;
  margin: 0 auto 1.5rem auto;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid #6c63ff;
  box-shadow: 0 0 10px rgba(108, 99, 255, 0.5);
}

.user-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  margin: 0 0 0.5rem 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: #6c63ff;
}

.user-email {
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #555;
  font-style: italic;
}

.user-info p {
  margin: 0.4rem 0;
  font-size: 1.1rem;
  color: #444;
}

.back-btn {
  margin-top: 2rem;
  padding: 0.6rem 2rem;
  background-color: #6c63ff;
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-btn:hover {
  background-color: #574ed8;
}

.loading-msg,
.error-msg {
  padding: 2rem;
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  font-style: italic;
}
</style>
