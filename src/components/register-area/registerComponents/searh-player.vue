<template>
<div v-if="filteredData.length">
      <div>
       <Container   group-name="soccer-players" @drag-start="onStart('players',-1,$event)" @drop="onDrop('players',-1,$event)" :get-child-payload="getChildPayload">
          
          <Draggable  v-for="key in filteredData" :key="key.id">       
            
                <section  class="search">
                  
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
    
  
  </div>
  <p v-else>No matches found.</p>

</template>
<script>
import { Container, Draggable } from 'vue3-smooth-dnd' 
export default {
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  components:{
    Container,
    Draggable
    },
  data() {
    return {

      sortKey: '',
      sortOrders: this.columns.reduce((o, key) => ((o[key] = 1), o), {})
    }
  },
  methods: {
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
  },
  computed: {
    filteredData() {
      
      const filterKey = this.filterKey && this.filterKey.toLowerCase()
  
      let data = this.data
      if (filterKey) {
    
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      return data
    }
  },
  methods: {

    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
}
</script>
<style>
.search{
  display: flex;
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
  display: flex;
  justify-content: space-between;
  width:100%;
  
  padding: 0 1rem;
}
.attributeTitle{
  display: flex;
  font-weight: bold;
 
}
.attribute{
  font-weight: bold;
  display: flex;
  align-items:flex-start;
  color:#C60946;
}
</style>