<template>
  <table v-if="filteredData.length">
    <thead>     
      <tr>
        <th v-for="key in columns" :key="key"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
          <p>{{capitalize(key)}}<span class="arrow"></span></p>
        </th>
      </tr>
    </thead>
    <tbody>  
        <tr v-for="entry in filteredData" :key="entry" >  
            <td v-for="key in columns" :key="key"  @mouseover.native="hover=true" @mouseleave.native = "hover=false">
                <p>{{entry[key]}}</p>    
            </td>
            <section class="options" @mouseover.native="hover=true">
                  <span class="i" @click="deleteTeam(entry.id)"><img  class="icon" src="./../../../public/img/icons/trash.png"></span>
                  <span class="i"><img  class="icon" src="./../../../public/img/icons/shared.png"></span>
                   <router-link :to="{name:'RegistrationId',params:{id:entry.id}}"><span class="i"><img  class="icon" src="./../../../public/img/icons/edit.png"></span></router-link>
              </section> 
          </tr>
      </tbody>
  </table>
  <p v-else>No matches found.</p>
</template>
<script>
export default {
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data() {
    return {
      sortKey: '',
      sortOrders: this.columns.reduce((o, key) => ((o[key] = 1), o), {}),
      visible:false,
      hover:false
    }
  },
 
  computed: {
    filteredData() {
      const sortKey = this.sortKey
      const filterKey = this.filterKey && this.filterKey.toLowerCase()
      const order = this.sortOrders[sortKey] || 1
      let data = this.data
      if (filterKey) {
        data = data.filter((row) => {
          return Object.keys(row).some((key) => {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    async deleteTeam(id){  
      const req = await fetch('http://localhost:3000/MyTeamns/'+id,{
        method:"DELETE"
      })
      const rest =await req.json();
      this.$emit('update');
    }
    
  }
}
</script>
<style scoped>
table {
  display: flex;
  flex-direction: column;
  width: 100%;
}

tbody tr{
  width: 100%;
  border-bottom: solid 1px var(--color-border);
}
table th p, table td p, table tr{
  margin-top: 0.15rem;
  padding:0 1rem;
  display:flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;  
}

table span{
  display:flex;
  height:10x;
  width:10px;  
}

thead th, tbody td{
  display: inline-block;  
  flex-direction:column;
  width:30%;
  height:2rem;
  margin-top:0.5rem;

}

thead th:nth-child(2), tbody td:nth-child(2){
  width:70%;
  justify-content: flex-start;
  vertical-align: middle;
}

tbody tr{
  cursor:pointer;
  border-radius: 0.5rem;
  transition:0.5s;
 
}

tbody tr:hover, tbody tr:hover .options{
  background-color:var(--color-background-hover);
  color:var(--color--hover);
  opacity:1;
}

th,td{
  display: flex;
  flex-direction: row;
  width: 100%;
  cursor: pointer;
  user-select: none;
}

th:nth-child(2) td:nth-child(2){
  width:100%;
  border-left:solid 1px #E9E3E8;
}

th.active {
  color: #959595;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
  border-top: 4px solid #000000;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}
.icon{
  width: 0.9rem;
  cursor:pointer;
  transition:0.3s;
}
.icon:hover{
  width: 1.5rem; 
}

.options{
  display: flex;
  align-items: center;
  justify-content:space-between;
  padding-left:4rem;
  width: 9rem;
  height: 0;
  margin-left: 10px;
  margin-right: 20px;
  opacity: 0;
  color:#fff;
  cursor:pointer;
  transition: 0.3s;
}

</style>