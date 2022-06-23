<template>
    <div class="global-topfive">
        <header id="topo">
            <h1>Top 5</h1>  
        </header>
    <div class="TopFive">
        <Statistics
            :data="topfive"
            :title="titletopfive"
        >    
        </Statistics>   
        
        <Statistics
            :data="worstfive"
            :title="titleworst"
        >    
        </Statistics> 
    </div>
   </div>
</template>
<script>
import Statistics from './topfive-components/Statistics.vue'
export default {
    name:"TopFive",
    components:{
        Statistics
    },


    data(){
        return{
            topfive: null,
            worstfive:null,
            titletopfive:"Highest avg age",
            titleworst:"Lowest avg age"

        }
        },
    
    methods: {
        async getStatistics(){
            const req = await fetch("http://localhost:3000/Statistics");
            const data = await req.json();
            this.topfive = data.top5;
            this.worstfive = data.worst5;


        },
    },
    mounted(){
        this.getStatistics()
    }
}

</script>
<style scoped>
   
 .TopFive{
    display:flex;
    width:100%;
    justify-content:space-around;
 }  
   
   
   
   
    #topo{
        padding-bottom: 1.6rem;
        border-bottom: solid 1px #E9E3E8;
       
    }
    .global-topfive{
        background-color:#FFFFFF;
         border-radius:1rem 1rem;
    }
    .global-topfive h1{
        margin-left:10px;
        padding-top: 20px;
        padding-left:10px;
        color:#552C8A;
        border-bottom: 15px;
    }
    .block{
        background-color:#E9E3E8;
        border-radius:15px;
        padding:1px;
        
    }
    
    .topFive{
        background-color:#FFFFFF;
        box-sizing: border-box;
        padding:20px;
        display:grid;
        margin-bottom: 0px;
        grid-row: 40px;
        grid-template-columns:2 1fr;
        grid-gap: 20px;
        border-radius:1rem;
    }

    .topFive h1{
        color:#552C8A;
        font-weight: bold;
    }
    
    
    .item:hover{
        border: 0.1rem solid #C50341;
      
    }
    .info1{
        background-color:#FFFFFF;
        grid-area: 1 / 2 / 4 / 3;
        grid-column-start: 0;
        grid-row-end: 10;
        grid-column-end: 0;
    }
    .info2{
        
        background-color:#FFFFFF;
        grid-area: 1 / 2 / 4 / 3;
        grid-column-start: 2;
        grid-row-end: 10;
        grid-column-end: 1;
    }

    .info1 h4 ,.info2 h4{
        padding-bottom:20px;
    }
</style>