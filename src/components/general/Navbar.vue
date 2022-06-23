<template>

    <div id="nav">
        <!--LOGO DA APLICAÇÃO-->
        <div id="first-nav">
            <router-link to="/" id="logo-url">
            <img src="./../../../public/img/logo.png" :alt="alt" id="logo">                     
            </router-link>
            <router-link to="/myteams">Squad Management Tool</router-link> 
        </div>
        
      
      
         
        <!--logo de perfil do usuário-->
        <div class="user-perfil">
            <p id="UserID">{{user}}</p>
             <router-link to="/myteams" id="perfil">
                <!--ICONE DO USUÁEIO-->
                <SimbolUser :initials_name="name_initals"/>
             </router-link>
             
        </div>
    </div>
    
</template>

<script>
    import SimbolUser from "./Simbol_user.vue"
    export default {
        name:"Navbar",
        props: ["alt","user"],

        data(){
            return{
                name_initals: this.user
            } },

        components:{
            SimbolUser
        },
        /*
        methods: {
           CaptureInitials(){
               this.name_initals = user;
           } 
        }*/
    }
</script>

<style scoped>
    #nav{
        display: flex;
        background-color:#C00E4F;
        background-image: linear-gradient(to right, #C00E4F,#701A5A);
        padding: 15px 50px;
        justify-content: space-between;
        align-items: center;
        max-height: 50px;
        
    }

    #nav #logo-url{
        margin:auto;
        margin-left: 0px; 
       
    }
    
    #first-nav {
        display:flex;
        align-items: center;
    }

    #logo{
        width:40px;
        height:40px; 
    }

    .user-perfil{
        display: flex; 
        align-items: center;  
    }
    #UserID{
        color:#fff;
        align-items: center;
        justify-content:center;
    }

    #nav a{
        color: #fff; 
        font-weight: bold;
        text-decoration: none;
        margin: 12px;
        transition: .3s;
    }

    #nav a:hover{
        color:#EB1F85; 
    }
</style>