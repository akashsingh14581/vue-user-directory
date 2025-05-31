<template>
  <div class="app_Container">
  
    <router-view />
  </div>
  
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
   font-family: "Ancizar Serif", serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
}

.app_Container h1{
  font-size: 4rem;
  text-align: center;
}

@media screen and (max-width:500px) {
  .app_Container h1{
  font-size: 2.5rem;
  text-align: center;
}
}
</style>
