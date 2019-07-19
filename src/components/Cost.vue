<template>

  <div class="wrapper" @click="$emit('select', cost)">

    <div class="container" v-bind:ref="`crystal-${cost}`">

      {{cost}}

    </div>

  </div>

</template>

<script>

export default {

  props: {

    cost: {
      required: true
    }

  }

}

</script>


<style scoped>

  .wrapper {

  }	

  .container {
    font-weight: bold;
    font-size: 1em;
    padding: 10px;
    width: 20px;
    height: 20px;
    color: white;
    background: blue;
    background: linear-gradient(#8cb0ff, #436ac1);
    border: 1px outset #00c;
    cursor: pointer;
    text-align: center;

    border-radius: 0 0 10px 10px;

    box-shadow: 2px 2px 4px 1px rgba(0,0,0,0.2);
  }

  .container:hover {
    border: 1px outset #00f;
    background: linear-gradient(#98b8fd, #4673d4);
  }

  .selected {
    background: linear-gradient(#dce7ff, #6c9afd);
    background: red;
    border: 1px outset rgb(55, 55, 255);
  }
  
</style>
