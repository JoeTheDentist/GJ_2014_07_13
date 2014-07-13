game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
    // our metatiles
    {name: "metatiles32x32",  type:"image", src: "data/img/map/metatiles32x32.png"},
    // background
    {name: "background", type: "image", src: "data/img/background.png"},
    // sushis
    {name: "sushi_1", type: "image", src: "data/img/sprite/sushi/sushi_1.png"},
    {name: "sushi_2", type: "image", src: "data/img/sprite/sushi/sushi_2.png"},
    {name: "sushi_3", type: "image", src: "data/img/sprite/sushi/sushi_3.png"},
    {name: "sushi_4", type: "image", src: "data/img/sprite/sushi/sushi_4.png"},
    // sushi card
    {name: "card_sushi_1", type: "image", src: "data/img/sprite/sushi_card/sushi_card_1.png"},
    {name: "card_sushi_2", type: "image", src: "data/img/sprite/sushi_card/sushi_card_2.png"},
    {name: "card_sushi_3", type: "image", src: "data/img/sprite/sushi_card/sushi_card_3.png"},
    {name: "card_sushi_4", type: "image", src: "data/img/sprite/sushi_card/sushi_card_4.png"},
    // game font
    {name: "32x32_font", type:"image", src: "data/img/font/32x32_font.png"},
	// cursor
	{name: "sticks", type:"image", src: "data/img/sprite/sticks.png"},
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
    {name: "resto1", type: "tmx", src: "data/map/resto1.tmx"},
    
    /*
     * Background music.
     */
    // {name: "dst-inertexponent", type: "audio", src: "data/bgm/"},
     
    /*
     * Sound effects.
     */
    {name: "eat", type: "audio", src: "data/sfx/"},
    {name: "puke", type: "audio", src: "data/sfx/"},
    // {name: "jump",  type: "audio", src: "data/sfx/"}
    
];
