<template>
<div class="main-register">
  <header>
      <h1>Create your team</h1>
  </header>
  <form class="form" @submit="createTeam">
      <h1 class="subtitle">TEAM INFORMATION</h1>   
      <fieldset class="group">
        <section class="grid team-info-column-1">
          <div class="name-input">
              <label  for="nameteam" class="title-field">Team name</label>
              <input type="text" name="name-team" v-model="nameteam" required>
          </div>
          
          <div class="name-input">
              <label for="site-team" class="title-field">Team website</label>
              <input type="text" name='site-team' v-model="siteteam" required>
               <p id="error" v-if="errors.length">
                  {{errors[0]}}
                </p>
          </div>
      </section>
          <section class="grid team-info-column-2">
      <div class="name-input">   
          <label for="description" class="title-field">Description</label>   
          <textarea type="text" v-model="description" class="area-input"  required></textarea>   
      </div>
      <div class="team-type">
          <label for="real" class="title-field " >Team type</label>
          <div>
              <label>
                  <input type="radio" name="team-type" value="real" v-model="teamtype" required><span></span>Real
              </label>
              <label>
                  <input type="radio" name="team-type" value="fantasy"  v-model="teamtype"><span></span>Fantasy
              </label>
          </div> 
          <div class="tags">
              <label for="tags" class="title-field">Tags</label>   
              <div class="area-input-tag" > 
                <div  class="tag-input-tag" v-for="(tag, index) in tags" :key="tag" required>
                    {{tag}}
                    <span @click="removeTag(index)">x</span>
                </div>
                <input type="text" placeholder="Def" class="tag-input-text" @keydown="addTag" >    
              </div>
            </div>
      </div>
      </section>

      </fieldset>

      <h1 class="subtitle">CONFIGURE SQUAD</h1>
      
      <fieldset class="group">    
          <section class="grid team-dinamic-column-1">
              <div class="lawn">                
                    <div class="formation">
                        <label for="formation" class="title-field formation">Formation</label>
                        <select v-model="formation" required>
                            <option v-for="form in optionsFormations" :key="form.id" :value="form">{{form.formation}}</option> 
                        </select>
                    </div>

                    <div class="field">
                        <div class="camp">
                            <div class="line-med"></div>
                            <div class="camp-football"></div> 
                        </div>          
                        <Container  v-for="(player,index) in formation.fild" :key="player">                          
                            <Container class="section" group-name="soccer-players" 
                                      @drag-start="onStart('formation',index,$event)" 
                                      @drop="onDrop('formation',index,$event)" 
                                      :get-child-payload="getChildPayload"> 
                                          <div  v-for="play in player" :key="play">
                                              <div class="border-player">
                                                <InfoPlayer
                                                  :data="play"
                                                  :hover="hover"
                                                  :index="indexPlayer"
                                                ></InfoPlayer>
                                                <div  class="player" @mouseover.native="hover=true, indexPlayer=play.id" @mouseleave.native = "hover=false, indexPlayer=-1">
                                                    <h1 v-if="play.name===''">+</h1>
                                                    <h1 v-else>{{select_initials(play.name)}}</h1>
                                                </div>
                                              </div>
                                          </div>
                              </Container>   
                        </Container>
                      </div>
                    </div>
              
                    <div class="name-input">
                        <label for="search-players" class="title-field">Search Players</label>
                        <input type="text" name='' id="search-players"  v-model="filterKey">
                        <div v-if="1==1 ">  
                          <Container group-name="soccer-players" @drag-start="onStart('players',-1,$event)" @drop="onDrop('players',-1,$event)" :get-child-payload="getChildPayload">
                              <Draggable v-for="(key,index) in filterPlay" :key="key.id" >       
                                  <section class="search" v-if="index<9">
                                      <span class="block-info">
                                          <p class="attributeTitle">Name:<span class="attribute">{{key['name']}}</span></p>
                                          <p class="attributeTitle">Age:<span class="attribute">{{key['age']}}</span></p>
                                      </span>
                                      <span  class="block-info">
                                          <p class="attributeTitle">Nacionality:<span class="attribute">{{key['nacionality']}}</span></p>
                                      </span>
                                
                                  </section>
                          </Draggable></Container>

                        </div>
                        <p v-else>No matches found.</p>
                      </div>

            </section>      
      </fieldset>
      <section class="grid">         
      
            <input type="submit" class="submit-btn" value="Save"> 
    
        </section>
      
    </form>
  </div>
</template>

<script>
import { Container, Draggable } from 'vue3-smooth-dnd' 
import InfoPlayer from './registerComponents/info-players.vue'


export default {
    name:"Register",
    components:{
      Container,
      Draggable,
      InfoPlayer
      },
      props: {
        
      },
    data(){
        return{
            id:null,
            optionsFormations:null,
            players:[],
            nameteam:null,
            siteteam:null,
            description:null,
            teamtype:[],
            tags:[],
            formation:[{formation:"3 - 2 - 2 - 3"}],
            columns: ['name', 'nacionality','age'],
            errors:[],
            filterKey:"",
            result:[],
            hover:false,
            dragging:{ index:-1, data:{}},
            data: [],
            indexPlayer:-1
           
        }
    },
     computed:{
        filterPlay(){
          let result = [];
          result = this.players.filter((play) => {
            return (
              play.name.toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1 ||
              String(play.age).toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1 ||
              play.nacionality.toLowerCase().indexOf(this.filterKey.toLowerCase()) > -1 
            );
          });

        return result;
      }
     
    },
    methods:{
      onDrop (position,section,dropResult) {
        const {removedIndex,addedIndex} = dropResult;
        if(position === this.dragging.position && removedIndex === addedIndex)
          return;
        if(removedIndex !== null){
          if(position === 'players'){
            this.players.splice(removedIndex,1);
          }else{
            this.formation.fild[section].splice(removedIndex,1)
          }
        }
        if(addedIndex !==null){
          if(position === 'players'){
            this.players.splice(addedIndex,0,this.dragging.data)
          }else{
            if(this.formation.fild[section][addedIndex].name !== "")
            {
               var playerSubstituted = {
                id:this.formation.fild[section][addedIndex].id,
                name:this.formation.fild[section][addedIndex].name,
                nationality:this.formation.fild[section][addedIndex].nacionality,
                age:this.formation.fild[section][addedIndex].age,
               }
               this.formation.fild[section][addedIndex].id =this.dragging.data.id;
               this.formation.fild[section][addedIndex].name =this.dragging.data.name;
               this.formation.fild[section][addedIndex].nacionality =this.dragging.data.nacionality;
               this.formation.fild[section][addedIndex].age =this.dragging.data.age;
               this.players.splice(playerSubstituted.id,0,playerSubstituted)
            }
            else{
               this.formation.fild[section][addedIndex].id =this.dragging.data.id;
               this.formation.fild[section][addedIndex].name =this.dragging.data.name;
               this.formation.fild[section][addedIndex].nacionality =this.dragging.data.nacionality;
               this.formation.fild[section][addedIndex].age =this.dragging.data.age;
            }

            }
           
        }
      
      },
      onStart(position,section,dragResult){
        const {payload,isSource} = dragResult;
        if(isSource)
        {
          if(position === 'players')
            this.dragging = {
                            position,
                            index:payload.index,
                            data:{...this.players[payload.index]}
            }
          else{
            this.dragging = {
                            position,
                            index:payload.index,
                            data:{...this.formation.fild[section][payload.index]}
            }
          }
        }
  
      },
      getChildPayload(index){
        return {index};
      },
      
      async getFormations(){
        const req = await fetch("http://localhost:3000/Formations");
        const data = await req.json();
        this.optionsFormations = data;
      },
      async createTeam(e){
        e.preventDefault();
        if(this.checkForm()){return;}
        else{
            const data = {
            name: this.nameteam,
            site: this.siteteam,
            description: this.description,
            type: this.teamtype,
            tags: Array.from(this.tags),
            formation: this.formation
          }
            const datajson = JSON.stringify(data);
            if(this.$route.params.id){
              const req = await fetch('http://localhost:3000/MyTeamns/'+this.$route.params.id,
              {
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                body: datajson
              });
              const res = await req.json();
              this.$router.push('/myteams')
              
            }else{
              const req = await fetch("http://localhost:3000/MyTeamns",{
              method: "POST",
              headers: {"Content-Type":"application/json"},
              body: datajson
              });
              const res = await req.json();
              this.$router.push('/myteams');
              
            }
        }
      },
      async getPlayers(){
        const req = await fetch("http://localhost:3000/Players");
        const data = await req.json();
        this.players = data;
        this.data = data;
      },
      async updateTeam(){
        if(this.$route.params.id)
        {
          const req = await fetch('http://localhost:3000/MyTeamns/'+this.$route.params.id,{method:"GET"});
          const data =await req.json();
          this.nameteam = data.name;
          this.siteteam = data.site;
          this.description=data.description,
          this.teamtype = data.type;
          this.tags = data.tags,
          this.formation=data.formation;
        }
        else{return}


      },
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      },
      addTag(event){
        if(event.code == 'Enter'){
          event.preventDefault();
          var val = event.target.value.trim();

          if(val.length > 0){
          this.tags.push(val);
          event.target.value = ''
          }
        }
      },
      removeTag(index){
         this.tags.splice(index,1)
      },
      select_initials(name){
        let complete_name = name.split(" ");
        let nome = complete_name[0][0]+complete_name[complete_name.length-1][0];
        return String(nome).toUpperCase();
      },
      checkForm(){
        this.errors = [];
        if(!this.validSite(String(this.siteteam))){
          this.errors.push("Please use a valid site.");
        }
        if(this.errors.length)
          return true;
       
        
      },
      validSite(site){
        var model= /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        
        return model.test(site) ? true : false;
      }

    },
    
    created(){   
      this.formation=this.optionsFormations = { 
        "id": 1,
        "formation": "3 - 2 - 2 - 3",
        "fild": [
            [
              {'id':0,"name": "", "nacionality":"","age":0 },
              {"id":0,"name": "", "nacionality": "","age":0 },
              {"id":0,"name": "", "nacionality": "","age":0 }
            ],
            [
              {"id":0,"name": "","nacionality": "","age":0 },
              {"id":0,"name": "","nacionality": "","age":0 }
            ],
            [
              {"id":0,"name": "","nacionality": "","age":0 },
              {"id":0,"name": "","nacionality": "","age":0 }
            ],
            [{"id":0,"name": "","nacionality": "","age":0 },
              {"id":0,"name": "","nacionality": "","age":0 },
              {"id":0,"name": "","nacionality": "","age":0 }
            ],
            [
              {"id":0,"name": "","nacionality": "","age":0 }
            ]
        ],
          
      },
        this.players = [ {
          "id": 1,
          "name": "Cristiano Ronaldo",
          "nacionality": "Portugal",
          "age": 35
        }],

        this.updateTeam();

    },

    mounted(){
      this.getFormations();
      this.getPlayers();
    }

}
  
</script>
<style scoped>
.main-register {
  background: #fff;
  padding-left: 5rem;
  padding-right: 5rem;
  margin: 3rem;
}
.name-input input:hover, .name-input:hover > .title-field,
.area-input:hover, .tags:hover > .title-field,
.area-input-tag:hover, .formation:hover > .title-field, 
.formation:hover > select, .team-type:hover > .title-field, 
input[type="radio"]:hover{
  border-color:#dd1717;
  color:#dd1717;  
}

input,select,textarea,button,.area-input,.area-input-tag
{
  border-radius: 5px;
  border: solid 2px #dadada;
  display: block;
}
.tag-input-tag,.title-field,.subtitle,#input-radio,
.formation,#info-seach-player,.field,.player,.border-player,
.container,.search,.attributeTitle,.attribute,.block-info
{
  display:flex;
}
.area-input,.area-input-tag{
  max-width:520px;
  width:435px;
  max-height: 200px;
  height:100%;
  resize:none;

}
.area-input input,.tag-input-text{
  border:none;
  outline:none;
  background:none;
  margin-top:5px;
}
.area-input-tag{
  height:120px;    
}
.team-type{
  margin-top:5%;
}
.tag-input-tag{
  align-items: center;
  justify-content: space-between;
  color:#fff;
  height:20px;
  min-width:50px;
  max-width:100%;
  float:left;
  margin-left:5px;
  margin-right:5px;
  margin-top:5px;
  padding-left:10px;
  background-color:#C50341;
  border-radius:20px 20px;
}
.tag-input-tag > span{
  cursor:pointer;
  margin-left:10px;
  padding-right:10px
}
.name-input input {
  display: block-inline;
  align-items: stretch;
  padding: 0;
  width: 100%;
  height: 30px;
}

.title-field {
  color: #333333;
  font-size: 15px;
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 10px;
  align-items: top;
}
.grid {
  display: grid;
}
.group {
  border: none;

}
header {
  padding-bottom: 20px;
  border-bottom: solid 1px #e9e3e8;
  align-items:center;
}
.team-info-column-1 {
  grid: 50px / 1fr 1fr;
  grid-gap: 150px;
  padding-top: 10px;
  padding-bottom: 25px;
}
.team-dinamic-column-1 {
  grid: 90%/ 1fr 1fr;
  grid-gap: 150px;
  padding-bottom: 25px;
}
.team-info-column-2 {
  grid: 250px / 1fr 1fr;
  grid-gap: 150px;
}

input[type="radio"] {
  display: inline-block;
  place-content: center;
  margin-right:5px;
  padding-left:10px;
}

input[type="radio"]::before {
  content: "";
  width: 0.9em;
  height: 0.9em;
  margin-right:2rem;
  border-radius: 70%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em #A6397D;
}


#tags {
  width: 100%;
  height: 70%;
}

header h1 {
  margin-left: 10px;
  padding-top: 20px;
  padding-left: 10px;
  color: #552c8a;
  border-bottom: 15px;
}
.subtitle {
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  color: #8d8d8d;
  font-size: 20px;
}

#error{
  color:#C50341;
}
#input-radio {
  flex-direction: inline-block;
  justify-content: space-between;
  width: 3em;
  height: 3em;
}
.formation {
  justify-content: flex-start;
  align-items: center;
  width: 70%;
  height: 10rem;
  right:20px;

}
.formation select{
  width:100%;
  height:2rem;
}
.group,
.group-dinamic {
  padding-right: 150px;
  padding-left: 150px;
  padding-top: 20px;
  padding-bottom: 0px;
  margin-bottom:0px;
}

#search-players {
  width: 100%;
  height: 2rem;
  cursor: pointer;
}
.formation {
  flex-direction: row;
  margin-left: 2%;
  padding: 0% 2%;
  height: 1rem;
}

#info-seach-player{
  justify-content: space-between;
  padding: 0 1rem;

}
.info-player{
  position: absolute;
  background-color:#552c8a;
  width:100px;
  height:60px;
  bottom:20px;
}
.submit-btn{
  margin: 0 11.5rem;
  width:33.2%;
  height:3rem;
  color: #fff;
  transition:0.3s;
  cursor: pointer;
}
.submit-btn:hover, .player:hover{
    box-shadow:  0 0 1em #d45eb1;
 }
.field {
  margin-top:2rem;
  min-height:45rem;
  max-height:45rem;
  max-width:40rem;
  min-width:30rem;
  justify-content:space-between;
  padding-top:2rem;
  padding-bottom:2rem;
  height: 100%;
  flex-flow: column nowrap;

}
.camp{
    width:100%;
     position:absolute;
}
.camp-football{  
    position:relative; 
    display:flex;
    justify-content: center;
    width:10rem;
    height:10rem;
    border-radius:50%;
    background-color:none;
    border: 0.15em solid var(--color-border);
    left:12rem;
    top:13.6rem;
  
}
.line-med{
    position:relative;
    left:0rem;
    top:260px;
    min-width:5%;
    width:28.5%;
    max-width:67.3%;
    height:25px;
    border-top: 0.15em solid var(--color-border); 
}
.submit-btn,.field{
  background-image: linear-gradient(#b73c7b, #663088);
}
.section {
    display:flex;
    width:100%;
    height:100%;
    align-items:center;
    justify-content:space-around;
    
}
.player {
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  background-color: #d19bbe;
  border-radius: 50%;
  border: 0.05em solid #852962;
}
.border-player{
  align-items:center;  
  justify-content:center; 
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  border: 0.15em dashed #A967B3;

}
.player h1{
    display:flex;
    justify-content:center;
    align-items:center;
    color: #fff;
}

.search{
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 4rem;
  margin-top: 0.5rem;
  background-color: #F5F5F5;
  border: 0.15rem dashed #e9e3e8; 
  
}
.block-info{
  justify-content: space-between;
  width:100%;
  padding: 0 1rem;
}
.attributeTitle{
  font-weight: bold;
}

.attribute{
  font-weight: bold;
  align-items:flex-start;
  color:#C60946;
}

@media(max-width:800px){
.team-info-column-1 {
  grid: 50px / 1fr;
  padding-top: 10px;
  padding-bottom: 10px;
}
.team-dinamic-column-1 {
  grid: 600px/ 1fr;
  padding-bottom: 10px;
}
.team-info-column-2 {
  grid: 250px / 1fr;
}
.team-info-column-1,.team-dinamic-column-1,.team-info-column-2{
  grid-gap: 10px;
}
.group,
.group-dinamic {
  padding-right: 15px;
  padding-left: 15px;
  padding-top: 5px;
  padding-bottom: 0px;
  margin-bottom:0px;
}
.area-input,.area-input-tag{
  width:100%;
}
.line-med{
  width:69%;
}
.camp-football{  
    left:15rem;
    top:13.5rem;
}

}

</style>