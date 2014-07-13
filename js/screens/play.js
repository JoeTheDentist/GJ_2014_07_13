game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function onResetEvent() {
        // load a level
        me.levelDirector.loadLevel("resto1");
    
		// reset the score
		game.data.score = 0;

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);

        this.HUD.queue_sushi('sushi_1');
        
        var self = this;
        me.timer.setInterval(function() {
            rand = Math.floor((Math.random() * 100) + 1) % 3 + 1; 
            self.HUD.queue_sushi('sushi_' + rand);
        }, 2000);

		this.SushiGen = me.pool.pull("sushi_4", 0, 0);
		me.game.world.addChild(this.SushiGen, 10);
		
		sticksCursor = new me.SpriteObject(0, 0, me.loader.getImage("sticks"));
        sticksCursor.update = function() {
            this.pos.x = me.input.mouse.pos.x - 10;
            this.pos.y = me.input.mouse.pos.y - 10;
           
            return true;
        }
		me.game.world.addChild(sticksCursor, 1000);
	},

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function onDestroyEvent() {
		me.game.world.removeChild(this.HUD);
		me.game.world.removeChild(this.SushiGen);
	}
});
