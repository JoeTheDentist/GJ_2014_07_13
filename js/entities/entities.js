/* --------------------------
an shushi Entity
------------------------ */
game.SushiEntity = me.ObjectEntity.extend({
    init: function init(x, y, image) {
        var settings = {};
		settings.image = me.loader.getImage('sushi_1');
		settings.width = 85;
		settings.height = 60;
		settings.spritewidth = 128;
		settings.spriteheight= 128; 
        this.parent(x, y , settings );
 
        // walking & jumping speed
        this.setVelocity(4, 0);
         
        // make it collidable
        this.collidable = true;
        this.type = me.game.ENEMY_OBJECT;
		this.pos.x = x;
		this.pos.y = y;
    },
 
    // call by the engine when colliding with another object
    onCollision: function(res, obj) {

    },
 
    // manage the enemy movement
    update: function(dt) {
        // do nothing if not in viewport
        if (!this.inViewport)
            return false;
 
        if (this.alive) {
            this.walkLeft = false;
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;

        } else {
			me.pool.push(this);
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
    this.parent(new me.Vector2d(), me.game.viewport.width, me.game.viewport.height);
    this.alwaysUpdate = true;
    this.pipeFrequency = 64;
	this.alpha  = 0;
	this.generate = 0;
	this. sushis = [];
  },

  update: function(dt) {
    if (this.generate++ % this.pipeFrequency == 0) {
		var sushi = me.pool.pull("sushi_1", 0, 368);
		me.game.world.addChild(sushi, 10);
		this.sushis.push(sushi);
		if (this.sushis.length > 5) {
			me.game.world.removeChild(this.sushis.shift());
		}
    }
    return true;
  },

});