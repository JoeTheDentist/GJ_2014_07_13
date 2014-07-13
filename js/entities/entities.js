/* --------------------------
an shushi Entity
------------------------ */

game.SushiEntity = me.ObjectEntity.extend({
    init: function init(x, y, image) {
        var settings = {};
		settings.image = me.loader.getImage(image);
		settings.width = 100;
		settings.height = 100;
		settings.spritewidth = 100;
		settings.spriteheight= 100; 
        settings.name = image;
        this.parent(x, y , settings );
 
        // walking & jumping speed
        this.setVelocity(5 * game.data.speed, 0);
         
        // make it collidable
        this.collidable = true;
        this.type = me.game.ENEMY_OBJECT;
        
        // register mouse event
		var self = this;
        me.input.registerPointerEvent("pointerdown", this, function ( event ) {
			console.log("touch");
			if (self.notEaten) {
				console.log("clicked");
				self.renderable.alpha = 0;
				self.notEaten = false;
                me.state.current().HUD.check_and_pop(self.name);
                game.data.sushi_eaten += 1;
			}
        }, true);
        // eaten or not?
        this.notEaten = true;
    },
 
    // manage the sushi movement
    update: function(dt) {
        if (this.alive) {
            this.walkLeft = false;
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
        } else {
			me.game.world.removeChild(this);
			return true;
        }
         
        // check and update movement
        this.updateMovement();
        
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent(dt);
            return true;
        } 

        return false;
    }
});

/* --------------------------
an shushi Generator 
------------------------ */
game.SushiGenerator = me.Renderable.extend({
  init: function() {
    this.parent(new me.Vector2d(), 0, 0);
    this.alwaysUpdate = true;
    this.pipeInterval = 25;
	this.alpha  = 0;
	this.generate = 0;
	this.sushis = [];
    this.lastSushi = 0;
  },

  update: function(dt) {
    this.lastSushi += dt;
    this.pipeInterval = 25*20 / game.data.speed;
    if (this.lastSushi > this.pipeInterval) {
        this.lastSushi = 0;
    	rand = Math.floor((Math.random() * 100) + 1) % 3 + 1; 
		var sushi = new game.SushiEntity(-63, 250, "sushi_" + rand);
		me.game.world.addChild(sushi, 10);
		this.sushis.push(sushi);
		if (this.sushis.length > 8 * game.data.speed) {
			me.game.world.removeChild(this.sushis.shift());
		}
    }
    
    return true;
  }

});