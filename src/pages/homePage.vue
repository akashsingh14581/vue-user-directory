<template>
  <div>
  <div :class="{ dark: isDarkMode }">
  <h1>User Directory</h1>
   <button @click="toggleDarkMode" class="dark-toggle-btn">
      {{ isDarkMode ? '🌞 Light Mode' : '🌙 Dark Mode' }}
    </button>
    <!-- search user -->
    <input
      type="text"
      v-model="searchQuery"
      placeholder="🔍 search user by name or email"
      class="searchBtn"
    />
    <div v-if="showErr" style="color: red; font-weight: 600; font-size: 2rem">
      ⚠️ Error: {{ showErr.message }}
    </div>
    <div v-else>
      <div v-if="filterUsers.length > 0" class="user_Card_Container">
        <div v-for="user in filterUsers" :key="user.id" class="user_Card">
          <div class="user_Image_container">
            <img
              :src="`https://randomuser.me/api/portraits/${
                user.gender === 'female' ? 'women' : 'men'
              }/${user.id}.jpg`"
              alt="User Image"
            />
          </div>

          <h2>{{ user.firstName }} {{ user.lastName }}</h2>
          <p>{{ user.email }}</p>
          <button @click="getUserDetails(user)">view user details</button>
        </div>
      </div>
      <div v-else class="no_Data">😕 No users found matching "{{ searchQuery }}"</div>
    </div>
  </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      searchQuery: "",
      users: [],
      showErr: null,
       isDarkMode: JSON.parse(localStorage.getItem('darkMode')) || false,
    };
  },
  computed: {
    filterUsers() {
      const query = this.searchQuery.toLowerCase();
      console.log(query);
      return this.users.filter((user) => {
        return (
          user.firstName.toLowerCase().includes(query) ||
          user.lastName.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
        );
      });
    },
  },
  methods: {
    toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode));
  },
    async fetchUsers() {
      try {
        const response = await axios.get("https://dummyjson.com/users");
        this.users = response.data.users;
      } catch (err) {
        this.showErr = err.message;
      }
    },
  getUserDetails(user) {
    this.$router.push({ name: 'UserDetails', params: { id: user.id } });
  }
  },
  created() {
    this.fetchUsers();
  },
};
</script>
<style scoped>
.user_Card_Container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, auto));
  width: 100%;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.user_Card {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 1rem;
  text-align: center;
}
.user_Card button {
  padding: 0.5rem 1rem;
  background-color: oklch(70.7% 0.165 254.624);
  border: none;
  border-radius: 1rem;
  color: white;
  text-transform: capitalize;
  margin-top: 10px;
}
.user_Image_container {
  padding: 0.5rem;
  border-radius: 50%;
  overflow: hidden;
  height: 150px;
  width: 150px;
  border: 5px solid oklch(70.7% 0.165 254.624);
  margin: auto;
}
.user_Image_container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.searchBtn {
  width: 350px;
  margin: 10px auto;
  display: block;
  padding: 5px 15px;
  border-radius: 10px;
  border: none;
  border: 2px solid oklch(70.7% 0.165 254.624);
  outline: yellow;
}
.no_Data{
    text-align: center;
    font-size: 2rem;
    color: oklch(70.7% 0.165 254.624);
}

/* dark mode */
/* Dark mode background and text */
.dark {
  background-color: #121212;
  color: #e0e0e0;
}

/* Override card background and button colors */
.dark .user_Card {
  background-color: #1e1e1e;
  color: #ddd;
  box-shadow: 0 4px 12px rgba(255 255 255 / 0.1);
}

.dark .user_Card button {
  background-color: #bb86fc;
  color: #121212;
}

/* Dark mode search input */
.dark .searchBtn {
  background-color: #1e1e1e;
  color: #e0e0e0;
  border-color: #bb86fc;
}

/* Dark mode toggle button */
.dark-toggle-btn {
  margin: 1rem auto;
  display: block;
  padding: 0.5rem 1.5rem;
  background-color: #6200ee;
  color: white;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-weight: 600;
}



@media screen and (max-width: 500px) {
  .searchBtn {
    width: 100%;
    padding: 5px 15px;
    border-radius: 10px;
    border: none;
    border: 2px solid oklch(70.7% 0.165 254.624);
    outline: yellow;
  }
}
</style>
