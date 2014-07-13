game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function onResetEvent() {
        console.log('init');
        // load a level
        me.levelDirector.loadLevel("resto1");
        me.game.viewport.move(20, 0);
        
		// reset the score
		game.data.score = 0;
        game.data.speed = 1;
        game.data.sushi_eaten = 0;

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);

        this.queue_sushi();
        
        this.difficultyInterval = me.timer.setInterval(function() {
            game.data.speed += 0.05;
        }, 5000);
        
        this.queueInterval = me.timer.setInterval(this.queue_sushi, 1500);

		this.SushiGen = new game.SushiGenerator();
		me.game.world.addChild(this.SushiGen, 10);
		
		this.sticksCursor = new me.SpriteObject(0, 0, me.loader.getImage("sticks"));
        this.sticksCursor.z = 300;
		this.sticksCursor.alwaysUpdate = true;
        this.sticksCursor.update = function() {
            this.pos.x = me.input.mouse.pos.x + 10;
            this.pos.y = me.input.mouse.pos.y - 5;
           
            return true;
        }
		me.game.world.addChild(this.sticksCursor, 1000);
	},
    
    queue_sushi: function() {
        rand = Math.floor((Math.random() * 100) + 1) % 3 + 1; 
        me.state.current().HUD.queue_sushi('sushi_' + rand);
    },

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function onDestroyEvent() {
        me.timer.clearInterval(this.difficultyInterval);
        me.timer.clearInterval(this.queueInterval);
        this.HUD.onDestroyEvent();
		me.game.world.removeChild(this.HUD);
		me.game.world.removeChild(this.SushiGen);
        me.game.world.removeChild(this.sticksCursor);
	}
});
