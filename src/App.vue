<template>

  <Navbar :alt="app_name" :user="user_name"/>
  <router-view/>
  <Footer/>

</template>

<script>
  import Navbar from './components/general/Navbar.vue';
  import Footer from './components/general/Footer.vue';
 

  export default{
    components: {
      Navbar,
      Footer

    },
    data () {
      return{
        app_name:"MyChallenge",
        user_name:"Cristiano Ronaldo"
      }
    }
  }
</script>

<style>
  


</style>
