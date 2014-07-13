game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
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
            self.HUD.queue_sushi('sushi_1');
        }, 2000);
	},

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
        
	}
});
