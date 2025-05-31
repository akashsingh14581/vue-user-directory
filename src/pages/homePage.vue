<template>
<div>
   <div v-if="showErr" style="color:red; font-weight:600; font-size:2rem">
    ⚠️ Error: {{ showErr.message }}
   </div>
   <div v-else>
    <ul>
        <li v-for="user in users" :key="user.id">
            {{user.name}} - {{user.email}}
        </li>
    </ul>
   </div>

</div>
</template>
<script>
import axios from 'axios';
export default{
    data(){
        return{
            users:[],
            showErr:null,
        }
    },
    methods:{
        async fetchUsers(){
            try{
                const response = await axios.get('https://jsonplaceholder.typicode.com/users');
                this.users = response.data;
            }
            catch(err){
                this.showErr = err.message;
            }
        }
    },
    created(){
        this.fetchUsers()
    }
}
</script>
