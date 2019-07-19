<template>

  <div class="cost-wrapper">

    <div class="cost-item" v-for="cost in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="cost" :class="(currentCost == cost) ? 'selected' : ''">

      <Cost :cost="cost" @select="$emit('select', $event)" />

    </div>

  </div>

</template>

<script>

import Cost from './Cost.vue'

export default {
  
  props: {
    currentCost: Number
  },

  components: {
    Cost
  },

}

</script>

<style>

  .cost-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    width: 600px;
    margin: 0 auto;
  }

  .cost-item {
    border-radius: 0 0 10px 10px;
  }

  .selected {

  }

  .selected .container {
    border: none;
    color: black;
    box-shadow: 0 0 0 0 rgba(0,0,0,0);
    background: linear-gradient(rgb(136, 89, 19) 0%, rgb(251, 191, 101) 20%, rgb(255, 224, 177) 100%);
  }

  .selected .container:hover {
    border: none;
    color: black;
    box-shadow: 0 0 0 0 rgba(0,0,0,0);
    background: linear-gradient(rgb(136, 89, 19) 0%, rgb(251, 191, 101) 20%, rgb(255, 224, 177) 100%);
  }

</style>
