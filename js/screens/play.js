game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function onResetEvent() {
        // load a level
        me.levelDirector.loadLevel("resto1");
        me.game.viewport.move(20, 0);
        
		// reset the score
		game.data.score = 0;

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);

        rand = Math.floor((Math.random() * 100) + 1) % 3 + 1; 
        this.HUD.queue_sushi('sushi_' + rand);
        
        var self = this;
        me.timer.setInterval(function() {
            rand = Math.floor((Math.random() * 100) + 1) % 3 + 1; 
            self.HUD.queue_sushi('sushi_' + rand);
        }, 2000);

		this.SushiGen = me.pool.pull("sushi_4", 0, 0);
		me.game.world.addChild(this.SushiGen, 10);
	},

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function onDestroyEvent() {
		me.game.world.removeChild(this.HUD);
		me.game.world.removeChild(this.SushiGen);
	}
});
