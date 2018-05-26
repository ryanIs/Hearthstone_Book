<template>
	<div class="wrapper">
		<div class="container">
			
			<div class="header-container">
				HEARTHSTONE CARDS
			</div>

			<div class="center-container">

				<div class="travel-buttons-container">
					<div class="travel-buttons button-left" @click="cycleBack">
						<
					</div>	
				</div>
				<div class="card-container">

					<div class="card-item" v-for="(_card, $index) in cards" :key="$index">
						<card :card="_card"/>
					</div>

				</div>
				
				<div class="travel-buttons-container">
					<div class="travel-buttons button-right" @click="cycleForward">
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

/*
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

import card from "../components/card.vue";
export default {
	components: {
		card
	},
	data() {
		return {
		
			apiBase: "https://omgvamp-hearthstone-v1.p.mashape.com/cards",
			apiKey: "aDmChYvfeCmshJkIxNzZ7TovY5Fvp1LgcFijsnQl8wojcuVxGD",
		
			// Collection of card costs currently being viewed
			viewingCost: 1,

			HEARTHSTONE_CARD_SEGMENTS: [
				"Basic",
				"Journey to Un'Goro",
				"Knights of the Frozen Throne",
				"Kobolds & Catacombs",
				"The Witchwood"
			],

			cards:  [{}, {}, {}, {}, {}, {}, {}, {}],

			cardDatabase: {
				/*
				"0" : {
				// IMPORT CARDS
				},
				"1" : {
				// IMPORT CARDS
				}
				*/
			}

		}
	},
	methods: {

		cycleForward() {
			console.info("cycle forward not implemented")
		},
		cycleBack() {
			console.info("cycle back not implemented")
		},

		// Get image of a cards based on card cost
		async getCardsByCost(cardCost, onSuccessCallback) {

			// If this set of cards has not already been loaded
			if(this.cardDatabase[cardCost] == null) {
				
				// HTTP Request header and GET variables
				var httpRequestObject = {
					headers: {
						"X-Mashape-Key": this.apiKey
					},
					params: {
						cost: cardCost
					}
				} 
			
				// Make the HTTP request and deal with response
				const response = await this.$http.get(this.apiBase, httpRequestObject) 
				
				if (response) {

					// Set response data
					var givenData = response.data

					// If received data is non null
					if(response != null) {
						if(givenData != null) {
							
							// Create COST object
							var newCostObject = {}

							// Loop through STANDARD card sets and add cards to an object
							for(var i = 0; i < this.HEARTHSTONE_CARD_SEGMENTS.length; i++) {
								if(givenData[ this.HEARTHSTONE_CARD_SEGMENTS[i] ] != null) {
									newCostObject[ this.HEARTHSTONE_CARD_SEGMENTS[i] ] = givenData[ this.HEARTHSTONE_CARD_SEGMENTS[i] ]
								}
							}

							// Add cards to card database
							this.cardDatabase[cardCost] = newCostObject

							return true
						} else {
							console.log("No data received.")
						}
					}
				}
			}
		},

		// Loads one-cost cards on load
		async init() {
			const response = await this.getCardsByCost(this.viewingCost)
			
			if(response) {
				console.log("output ", this.cardDatabase);
			}
		}
	},
	mounted() {
		this.init()
	},
}
</script>

<style>
	.center-container{
		display:flex;
		justify-content: space-around;	
		height:500px;
		align-items: center;
	}
	
	.travel-buttons-container {
		display:flex;
		justify-content: center;
		align-items: center;
		height:50px;
	}
	.travel-buttons {
		display:flex;
		font-size:40px;
		justify-content: center;
		align-items: center;
		border:1px solid;
		height:20px;
		width:10px;
		
		padding:0.35em 1.2em;
		border:0.05em solid #555;
		margin:0 0.3em 0.3em 0;
		border-radius:0.12em;
		font-weight:300;
		transition: all 0.2s;
		cursor:pointer;
	}

	.travel-buttons:hover{
		color:#000000;
		background-color:rgb(254, 255, 191);
	}
	
	/* Cards */
	.card-container {
		width: 800px;
		height: 100%;
		background: #ccc;
		margin: 0 auto;
		padding:10px;

		/* creates a 4 by 2 css-grid (4 columns, 2 rows) */
		display:grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 10px;
	}

  .card-item {
    border:1px solid;
  }

	.card-row-container {
		width: 100%;
		height: 470px;
	}

	.card {
		width: 20%;
		height: 100%;
		max-width: 307px;
		max-height: 465px;
		background: #f00;
		border: 1px solid black;
		float: left;
	}

	.card-img {
		background: yellow;
	}

</style>
 