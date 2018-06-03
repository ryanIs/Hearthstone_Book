<template>
	<div class="wrapper">
		<div class="container">
			
			<div class="header-container">
				<costs @select="selectCost"/>
			</div>

			<div class="center-container">

				<div class="travel-buttons-container">
					<div class="travel-buttons button-left" @click="cycleBack">
						&#8592;
					</div>	
				</div>
				<div class="card-container">

					<div class="card-item" v-for="(_card, $index) in cards" :key="$index">
						<card :card="_card"/>
					</div>

				</div>
				
				<div class="travel-buttons-container">
					<div class="travel-buttons button-right" @click="cycleForward">
						&#8594;
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

import Costs from './components/Costs.vue'
import card from "../components/card.vue"

export default {
	components: {
		card,
		Costs
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
			
			// Index of viewing for cardViewFiltered view
			cardViewIndex: 0,
			
			// Max view (TODO: set maximum)
			CARD_VIEW_INDEX_MAX: 9999,

			// Dynamic collection of cards for viewing
			cardViewFiltered: [],

			// Database/cache of all cards after they are fetched from server
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
		selectCost(cost) {
			console.log(`selected cost: `, cost)
		},

		cycleForward() {
			if (this.cardViewIndex < this.CARD_VIEW_INDEX_MAX) {
				this.cardViewIndex += 8
				this.setView(this.cardViewIndex)
			}
		},

		cycleBack() {
			if (this.cardViewIndex > 0) {
				this.cardViewIndex -= 8
				this.setView(this.cardViewIndex)
			}
		},

		// Get image of a cards based on card cost
		async getCardsByCost(cardCost, onSuccessCallback) {
			// If this set of cards has not already been loaded
			if (this.cardDatabase[cardCost] == null) {
				// HTTP Request header and GET variables
				let httpRequestObject = {
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
					let givenData = response.data

					if (response) {
						if (givenData) {
							// Create COST object
							let newCostObject = {}

							// Loop through STANDARD card sets and add cards to an object
							this.HEARTHSTONE_CARD_SEGMENTS.forEach(segment => {
								if (givenData[segment]) {
									newCostObject[segment] = givenData[segment]
								}
							}) 

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

		// Gets cards into a flat viewing database
		organizeCards() {
			this.cardViewIndex = 0
			this.cardViewFiltered = []
			
			this.HEARTHSTONE_CARD_SEGMENTS.forEach(segment => {
				// Selected group of card object
				let viewObject = this.cardDatabase[this.viewingCost][segment]

				if (viewObject) {
					viewObject.forEach(item => {
						this.cardViewFiltered.push(item)
					})
				} else {
					console.log("ERROR: viewObject is NULL (around line 174")
				}
			})
		},
		
		// Display 8 cards (will eventually be based on a filter)
		setView(index) {
			// Move cards into a flattened array called cardViewFiltered
			this.organizeCards()

			this.cardViewIndex = index
			this.cards = [];
			
			for (let i = index; i < index + 8; i++) {
				this.cards.push( this.cardViewFiltered[i] )
			}
		},
		
		// Loads one-cost cards on load
		async init() {
			// Gets the cards by card-cost 1
			const response = await this.getCardsByCost(this.viewingCost)
			
			// Once that request returns, then populate the cards to screen
			if (response) {
				console.log("Database load(1) successful! ", this.cardDatabase)
				this.setView(0);
			}
		}
	},

	mounted() {
		this.init()
	},
}
</script>

<style>
	body {

		background: #dcc;
		background: linear-gradient(#dcc, #cbb);
	}

	.header-container{
		margin: 20px 0;
	}
	.center-container{
		display:flex;
		justify-content: space-around;	
		height:700px;
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

		background-color: rgb(245, 247, 138)
	}

	.travel-buttons:hover {
		color:#000000;
		background-color:rgb(254, 255, 191);

		/* spin to win */
	    animation-name: spin;
		animation-duration: 4000ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	@keyframes spin {
	}
	
	/* Cards */
	.card-container {
		width: 850px;
		height: 100%;
		background: #ffe2b7;
		background: linear-gradient(#ffe2b7, #ffca7a);
		background: -webkit-linear-gradient(#ffe2b7, #ffca7a);
		margin: 0 auto;
		padding:10px;
		box-shadow: 0 0 10px 3px rgba(0,0,0,0.2);

		/* creates a 4 by 2 css-grid (4 columns, 2 rows) */
		display:grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		grid-gap: 10px;
		
	    animation-name: spin;
		animation-duration: 4000ms;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	
	}

  .card-item {
	  width: 100%;
	  height: 100%;
  }
  .card-item /deep/ img {
	  width: inherit;
	  height: inherit;

	  border-radius: 10px;
	  box-shadow: 2px 2px 4px 2px rgba(0,0,0,0.1);
	  background: rgba(256, 200, 180, 0.2);
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
 