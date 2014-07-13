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

        this.queue_sushi();
        
        me.timer.setInterval(function() {
            game.data.speed += 0.05;
        }, 5000);

		this.SushiGen = me.pool.pull("sushi_4", 0, 0);
		me.game.world.addChild(this.SushiGen, 10);
		
		sticksCursor = new me.SpriteObject(0, 0, me.loader.getImage("sticks"));
        sticksCursor.z = 300;
		sticksCursor.alwaysUpdate = true;
        sticksCursor.update = function() {
            this.pos.x = me.input.mouse.pos.x + 10;
            this.pos.y = me.input.mouse.pos.y - 5;
           
            return true;
        }
		me.game.world.addChild(sticksCursor, 1000);
        
        me.audio.playTrack("main_loop");
	},
    
    queue_sushi: function() {
        rand = Math.floor((Math.random() * 100) + 1) % 3 + 1; 
        me.state.current().HUD.queue_sushi('sushi_' + rand);
        delay = Math.max(1300, 2000 - (2000 * ((game.data.speed - 1) / 3)));
        console.log(delay);
        me.timer.setTimeout(me.state.current().queue_sushi, delay);
    },

	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function onDestroyEvent() {
		me.game.world.removeChild(this.HUD);
		me.game.world.removeChild(this.SushiGen);
        me.audio.stopTrack();
	}
});
