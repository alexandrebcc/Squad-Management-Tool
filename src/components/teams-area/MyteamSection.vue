<template>
    <div class="global-myteams">
        <header id="topo">
            <h1>My Teams</h1>
            <router-link to="/registration">
                <button v-if="this.countTeams <13" type="button" id="button">+</button>
            </router-link>
        </header>
    
        <Grid
            :data="myteams"
            :columns="gridColumns"
            :filter-key="searchQuery"
            v-on:update="getMyteamns">
            
        </Grid>

    </div>
</template>
<script>
import Grid from './TeamGrid.vue'
import { ref } from 'vue'
      
export default {
    name:"Myteams",
    components:{
        Grid,

    },
    
    data() {
        return{
            myteams:[],
            countTeams:0,
            searchQuery:ref(''),
            gridColumns:["name","description"]
        }
    
    },
    methods: {
        async getMyteamns(){
            const req = await fetch("http://localhost:3000/MyTeamns");
            const data = await req.json();
            this.myteams = data;
            this.countTeams = this.myteams.length;

        },
        update(){
        this.getMyteamns()}
    },
    mounted(){
        this.getMyteamns()
    }
    
    
   
    
}
</script>

<style scoped>
 
a{
    text-decoration: none;
}
 #button{
    display: flex;
    text-decoration: none;
    width: 20px;
    height: 50px;
    color:#fff;
    margin-top: 15px;
    align-items: center;
    justify-content:center;
    border-radius:10px;
    height:40px;
    width: 50px;
    background-color:#9A377D;
    font-size: 25px;
    transition:0.5s;
    cursor:pointer;
 }
 #button:hover{
    box-shadow:  0 0 1em #d45eb1;
 }
.global-myteams{
    width:100%;
}
 .global-myteams h1{
        width:200px;
        margin-left:10px;
        padding-top: 20px;
        padding-left:10px;
        color:#552C8A;
        border-bottom: 15px;
        align-items: end;
 }

 #topo{
        display: flex;
        flex-direction:inline;
        padding-bottom: 0.5rem;
        border-bottom: solid 1px #E9E3E8;
        align-items: space-between;
        justify-content: space-between;
        margin-right: 20px;
    }
#topo div{
    display: flex;
    align-items: center;
    padding-top: 25px;
    color:#fff;
    background-color:#552C8A;
    border-radius: 40px;
    right:25px;


}

#tab{
        
        width: 100%;
        align-items: flex-start;    
        border:solid 1px;
        text-align: left;
        border-collapse:collapse;
        border-color:#fff;
        margin-left: 30px;
    }
    

</style>