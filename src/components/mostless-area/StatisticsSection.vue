<template>
    <section class="container statistics">
       
        <div class="item " v-for="most in Mostplayer" v-bind:key="most.id">
            
            <h1>Most picked player</h1>
            <p><b>{{most.taxa*100}}%</b></p>
            <div class="border-personal">    
                <div class="personal">
                    <img src="./../../../public/img/avatar/avatar-1.svg"   >
                </div>
            </div>
           
        </div>
        <div class="camp">
            <div class="camp-football"></div>
        </div>
        <div class="item less-player" v-for="less in Lessplayer" v-bind:key="less.id">
            <h1>Less picked player</h1>
            <p><b>{{less.taxa*100}}% </b></p>
            <div class="personal" v-if="less.photo == null">
                <img src="./../../../public/img/avatar/avatar-2.svg">
            </div>
            <div class="personal" v-else></div>
        </div>
    </section>
           
        
   
</template>
<script>
export default {
    name:"Statistics",

    data(){
        return{
            Mostplayer: {},
            Lessplayer:null,
        }
    },

    methods:{
        async getMostPlayer(){
            const req = await fetch("http://localhost:3000/MostPlayer");
            const data = await req.json();
            this.Mostplayer = data.player;
        },
        async getLessPlayer(){
            const req = await fetch("http://localhost:3000/LessPlayer");
            const data = await req.json();
            this.Lessplayer = data.player;
        }
    },
    mounted(){
        this.getLessPlayer();
        this.getMostPlayer();
        }
    }
</script>
<style scoped>   
.container {
    display: flex;
	width: 100%;
    height: 100%;
	margin: 0 0;
	border: 1px solid #ccc;
    border-radius: 1rem;
    background-image: linear-gradient(#B73C7B, #663088);
}
.most-player{
    box-shadow: 0 0 2em #663088;
    border: dashed 1px colors.$stroke
}
.less-player{
    align-items: center;
    padding-right:0px;
}

.statistics {
	flex-flow: row nowrap;
    justify-content: space-around;
  
    
}
.personal {
    display: flex;
    width:8rem;
    height:8rem;
    border-radius:50%;
    border:0.09rem solid #A91A70;
    align-items:center;
   
}
.border-personal{
    display: flex;
    align-items:center;  
    justify-content:center; 
    width:8.5rem;
    height:8.5rem;   
    border-radius:50%;
    border:0.15rem dashed #fff;
    box-shadow:  0 0 1em #5f0143;
    
}
.camp{
     display: flex;
     align-items:center;
}
.camp-football{   
    width:4em;
    height:4em;
    border-radius:50%;
    background-color:none;
    border: 0.15em solid #E9E3E8;
}
.line-camp{
    width:0.15em;
    height:100%;
    border-left: 0.15em solid #E9E3E8;
    position:absolute;
    left:10px;
}
.item{
  
    padding-bottom:2rem;
    color:#fff;
    
}

.item h1{
    padding-top:1.5rem;
}
.item p{
    position:relative;
    left:8em;
    top:1em;
    width: 2.5em;
    align-items:flex-end;
    text-decoration: none;
    border-bottom:0.15em solid #fff;
    font-weight: bold;
    padding-bottom:0%;
  
    
}
/*
a:nth-child(1) {
    text-decoration: none;
    border-bottom: 5px solid red;
    padding-bottom: 10px;
}*/
</style>