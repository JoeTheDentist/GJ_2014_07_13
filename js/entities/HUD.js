

/**
 * a HUD container and child items
 */

game.HUD = game.HUD || {};

var xpos = 240;
var yPos = 44;
var cardSize = 64;
var scoreBonus = 100;
var xVelocity = 10;

game.HUD.Container = me.ObjectContainer.extend({

	init: function() {
		// call the constructor
		this.parent();
		
		// persistent across level change
		this.isPersistent = true;
		
		// non collidable
		this.collidable = false;
		
		// make sure our object is always draw first
		this.z = 200;

		// give a name
		this.name = "HUD";
		
        this.queue = [];
        
		// add our child score object at the top left corner
        this.score = new game.HUD.ScoreItem(640, 525);
		this.addChild(this.score);
	},
    
    /**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function onDestroyEvent() {
        console.log("cleaning HUD");
        while (game.data.queue.length > 0) {
            game.data.queue.shift();
            sushi_obj = this.queue.shift();
            this.removeChild(sushi_obj);
        }
        me.game.world.removeChild(this.score);
	},
    
    queue_sushi: function(type){
        if (game.data.queue.length < game.data.max_size) {
           game.data.queue.push(type);
           sushi_obj = new game.HUD.SushiObjective(xpos + (cardSize * game.data.queue.length), yPos, 'card_' + type);
           this.queue.push(sushi_obj);
           this.addChild(sushi_obj);
        } else {
            me.state.change(me.state.GAMEOVER);
        }
    },
    
    check_and_pop: function(type){
        if (game.data.queue[0] == type) {
            console.log('correct type');
            me.audio.play("eat");
            game.data.score += scoreBonus;
            game.data.queue.shift();
            sushi_obj = this.queue.shift();
            this.removeChild(sushi_obj);
            this.addChild(new game.HUD.HitScore(me.input.mouse.pos.x + 10, me.input.mouse.pos.y - 60, '+' + scoreBonus));
            return true;
        } else {
            console.log('incorrect type');
            me.audio.play("puke");
            game.data.score -= 4* scoreBonus;
            if (game.data.score < 0) game.data.score = 0;
            this.addChild(new game.HUD.HitScore(me.input.mouse.pos.x + 10, me.input.mouse.pos.y - 60, -4*scoreBonus));
            return false;
        }
    }
});

/** 
 * a basic HUD item to display score
 */
game.HUD.ScoreItem = me.Renderable.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y) {
		
		// call the parent constructor 
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10); 
		
         // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");
        
		// local copy of the global score
		this.score = -1;

		// make sure we use screen coordinates
		this.floating = true;
	},

	/**
	 * update function
	 */
	update : function () {
		// we don't do anything fancy here, so just
		// return true if the score has been updated
		if (this.score !== game.data.score) {	
			this.score = game.data.score;
			return true;
		}
		return false;
	},

	/**
     * draw the score
     */
    draw : function (context) {
        this.font.draw (context, game.data.score, this.pos.x, this.pos.y);
    }
});

game.HUD.HitScore = me.Renderable.extend({	
    /** 
	 * constructor
	 */
	init: function(x, y, value) {
		
		// call the parent constructor 
		// (size does not matter here)
		this.parent(new me.Vector2d(x, y), 10, 10); 
		
         // create a font
        this.font = new me.BitmapFont("32x32_font", 32);
        this.font.set("right");
        
        this.value = value;
        
        var self = this;
        me.timer.setTimeout(function() {me.state.current().HUD.removeChild(self); console.log('removed');} , 300, true);
	},
    
    /**
     * draw the score
     */
    draw : function (context) {
        this.font.draw (context, this.value, this.pos.x, this.pos.y);
    }
});

/** 
 * a basic HUD item to display next objective
 */
game.HUD.SushiObjective = me.ObjectEntity.extend({	
	/** 
	 * constructor
	 */
	init: function(x, y, type, position) {

        this.expected_pos = x;
    
        var settings = {};
        settings.image = me.loader.getImage(type);
        settings.width = cardSize;
        settings.height = cardSize;
        settings.spritewidth = cardSize;
        settings.spriteheight= cardSize; 
        settings.collidable = false;
        settings.name = type;
		// call the parent constructor 
		this.parent(x, y, settings); 
        
		// position of the objective in the sushi queue
		this.current = false;

		// make sure we use screen coordinates
		this.floating = true;
        
        this.setVelocity(xVelocity, 0);
	},


	/**
	 * update function
	 */
	update : function (dt) {
    
        this.expected_pos = xpos + cardSize * me.state.current().HUD.queue.indexOf(this);
        if (this.pos.x > this.expected_pos) {
            this.vel.x += -this.accel.x * me.timer.tick;     
        } else
        {
            this.pos.x = this.expected_pos;
            this.vel.x = 0;
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