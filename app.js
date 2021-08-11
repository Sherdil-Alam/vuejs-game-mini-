new Vue({
	el: '#app',
	data:{
		monsterHealth: 100,
		playerHealth: 100,
		gameIsRunning: false,
		turns: []
	},
	methods:{
		gameStart: function(){
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
		},
		attack: function(){
			var damage = this.calcDamage(10, 3)
			this.monsterHealth -= damage
			this.turns.unshift({
				isPlayer: true,
				text: "Player hits Monsters for " + damage
			})
			this.monsterAttacks()
			this.checkWin()
		},
		specialAttack: function(){
			var damage = this.calcDamage(10, 20)
			this.monsterHealth -= damage
			this.turns.unshift({
				isPlayer: true,
				text: "Player hits Monsters hard for " + damage
			})
			this.monsterAttacks()
			this.checkWin()

		},
		heal: function(){
			if(this.playerHealth <=90){
				this.playerHealth += 10;		
			}else{
				this.playerHealth = 100;	
			}
			this.turns.unshift({
				playerHeal: true,
				text: "Player heals for 10"
			})	
			this.monsterAttacks()
		},
		giveUp: function(){
			this.gameIsRunning = false

		},
		calcDamage: function(max, min){
			return Math.max(Math.floor(Math.random() * max) + 1, min)
		},
		monsterAttacks: function(){
			var damage = this.calcDamage(11, 4)
			this.playerHealth -= damage
			this.turns.unshift({
				isPlayer: false,
				text: "Monster hits Player for " + damage
			})
		},
		checkWin: function(){
			if (this.monsterHealth <=0) {
				if(confirm("You won! New Game?")){
					this.gameStart()
				}
				this.gameIsRunning = true;
				return;
			}
			else if (this.playerHealth <=0) {
				if (confirm("You Lost! New Game?")) {
					this.gameStart()
				}
				this.gameIsRunning = true;
			}
		}

	}
})