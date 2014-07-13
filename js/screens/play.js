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
		this.SushiGen = me.pool.pull("sushi_4", 0, 368);
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
