<template>

  <span class="card-main">

    <template v-if="imageSuccessful">
      <img :src="card.img" :title="card.name" @error="handleBadImage()">
    </template>

    <template v-else>
      <div class="alt-img-wrapper" :title="card.name">

        <div class="alt-img" :class="card.playerClass">

          <p class="pinned mana-cost">
            {{card.cost}}
          </p>
          
          <p v-if="card.attack != null" class="pinned attack">
            {{card.attack}}
          </p>
          
          <p v-if="card.health != null && card.attack != 0"  class="pinned health">
            {{card.health}}
          </p>

          <div class="img-not-found">
            Image not found
          </div>

          <h1>
            {{card.name}}
          </h1>

          <p class="card-text" v-html="cardText"></p>

          <p class="card-type">
            {{card.type}}
          </p>

        </div>

      </div> <!-- alt-img-wrapper -->
    </template>

  </span>

</template>

<script>
export default {
  props: {
    updatePage: Number,
    card: Object
  },

  methods: {
    handleBadImage() {
      this.imageSuccessful = false
    }
  },

  data() {
    return {
      imageSuccessful: true,
      __vm: this,
    }
  },

  // Executes the objects functions when the value changes (page change)
  watch: {
    updatePage: function(newVal, oldVal) {
      this.imageSuccessful = true;
    }
  },

  computed: {
    cardText: function() { 
      if(this.card.text != null) {
        return String(this.card.text).replace('\\n', '<br>')
      }
      else {
        return ''
      }
    }
  }

}
</script>

<style scoped>

.alt-img-wrapper {
  width: 231px;
  height: 350px;
}

.alt-img {
  background-imaage: url("../assets/paper-texture.png");
  background-size: 2030px;
  position: relative;
  margin: 50px auto;
  width: 180px;
  height: 280px;

  border-radius: 10px;
  box-shadow: 0 0 3px 1px rgba(0,0,0,0.3);

  background-color: rgb(231, 213, 162);

}

.img-not-found {
  width: 100%;
  height: 25%;
  padding-top: 25%;
  background: white;
  border-radius: 40px 40px 0 0;
  margin: 0 auto;
  text-align: center;
  font-size: 0.8em;

  font-family: "Arial";
  
  box-shadow: inset 0 0 3px 2px rgba(0,0,0,0.3);
}

.card-text {
  width: 75%;
  height: auto;
  min-height: 30%;
  max-height: 30%;
  padding-top: 35%;
  margin: 0 auto;
  text-align: center;
  padding: 10px;
  background: rgb(255, 231, 211);
  font-size: 0.7em;

  border-radius: 0 0 40px 40px;
  
}

h1 {
  display: block;
  font-size: 1em;
  background: rgb(248, 183, 63);
  text-align: center;
  color: white;
  text-shadow: 0px 0px 5px rgba(0,0,0,0.8);

  border-radius: 30px;
}

p, h1 {
  font-family: "Verdana"
}

.card-type {

  margin: 0 auto;
  width: 50%;
  height: 20px;
  font-size: 1.0em;
  color: white;
  border-radius: 30px;
  text-align: center;
  text-shadow: 0px 0px 5px rgba(0,0,0,0.8);
  font-size: 0.8em;
  background: #eeae00;
}

.pinned {

  position: absolute;
  width: 30px;
  height: 30px;
  font-size: 1.5em;
  color: white;
  border-radius: 30px;
  text-align: center;
  text-shadow: 0px 0px 5px rgba(0,0,0,0.8);
  font-weight: bold;

}

.mana-cost {
  background: blue;
}

.attack {
  background: yellow;
  bottom: 0;
  left: 0;
}

.health {
  background: red;
  right: 0;
  bottom: 0;
}

/* Class backgroudns */

.Druid {
  background-color: #a57a2a
}

.Hunter {
  background-color: #0e7545
}

.Mage {
  background-color: #5fbde9
}

.Paladin {
  background-color: #fcbe4c
}

.Priest {
  background-color: #f1f1f1
}

.Rogue {
  background-color: #4b4231
}

.Shaman {
  background-color: #300f8b
}

.Warlock {
  background-color: #b12b9a
}

.Warrior {
  background-color: #800f0f
}

.Neutral {
  background-color: rgb(175, 162, 126);
}

</style>