<template>
  <section class="grid main-personal">
     <div class="first-area">
        <Myteams></Myteams>
     </div> 

     <div class="second-area">
        <TopFive></TopFive>
     </div>

    <div class="third-area">
        <Statistics></Statistics>
    </div>
    
  </section>
</template>
<script>
  import Myteams from "../components/teams-area/MyteamSection.vue";
  import TopFive from "../components/topfive-area/TopfiveSection.vue";
  import Statistics from "../components/mostless-area/StatisticsSection.vue";

  export default{
    components: {
      Myteams,
      TopFive,
      Statistics
    }
  }

</script>

<style>
.grid {
	display: grid;
}
.main-personal {
	grid-template:
		"logo nav nav" 0px
		"sidenav content content" 320px 
		"sidenav footer footer" 250px
    "advert advert advert" 0px
		/ 2fr 1fr 1fr;
  grid-gap: 0 3%;
  padding:2% 2%;
  background-color:#F8F3F7;

  
}

.first-area,.second-area,.third-area {
  background-color:#fff;
  border-radius:1rem;
}

.first-area {
	grid-area: sidenav;
  
}
.second-area {
	grid-area: content;
 
}
.third-area {
  margin-top:2rem;
	grid-area: footer;
  
}

@media(max-width:800px){
 
 .grid {
	display: flex;
}
 .main-personal {
  flex-direction: column;
  margin: 1rem 1rem;
  padding:2% 2%;
  background-color:#F8F3F7;
  font-size:12px;
}
.first-area,.second-area,.third-area {
  background-color:#fff;
  border-radius:1rem;
  margin-top:.5rem;
}
.first-area {
    min-height:20rem;
}
}
  
</style>