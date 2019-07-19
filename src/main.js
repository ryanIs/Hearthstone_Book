/*

  TODO:

    [ ] Add Hero icons

    [ ] Add expansion buttons at bottom

    [ ] Add API loading for Crystals
      [ ] 2
      [ ] 3
      [ ] 4
      [ ] 5
      [ ] 6
      [ ] 7+

    [ ] Add filter by HERO

    [ ] Add filter by expansion

    [ ] CSS clean-up

    [ ] JS clean-up

    API SITE: https://market.mashape.com/omgvamp/hearthstone

    API BASE: https://omgvamp-hearthstone-v1.p.mashape.com/cards

    API KEY: aDmChYvfeCmshJkIxNzZ7TovY5Fvp1LgcFijsnQl8wojcuVxGD

    // These code snippets use an open-source library. http://unirest.io/nodejs
    
    unirest.get("https://omgvamp-hearthstone-v1.p.mashape.com/cards")
    .header("X-Mashape-Key", "aDmChYvfeCmshJkIxNzZ7TovY5Fvp1LgcFijsnQl8wojcuVxGD")
    .end(function (result) {
      console.log(result.status, result.headers, result.body);
    });

*/

// Version 2.5.16
import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

Vue.config.productionTip = false

new Vue({

  render: h => h(App)
  
}).$mount('#app')
