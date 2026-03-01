// Character data — coordinates on the Praxis (x), Ethos (y), Nexus (z) axes
// Each value ranges from -5 to +5
//   x: Structured (-5) → Unbound (+5)
//   y: Benevolent (-5) → Malignant (+5)
//   z: Parochial (-5) → Universal (+5)

const CHARACTERS = [

    // ╔══════════════════════════════════════════════════════════════╗
    // ║                 FICTION — Comics & Superheroes               ║
    // ╚══════════════════════════════════════════════════════════════╝

    {
        name: "Superman", x: -3.5, y: -4.5, z: 4.5,
        desc: "Structured / Benevolent / Universal. The consonant ideal — all three pillars reinforce. Zero tension between method, impact, and scope.",
        source: "DC Comics", category: "Fiction",
    },
    {
        name: "Capt. America", x: -1.5, y: -4.0, z: 3.5,
        desc: "Pragmatic-leaning / Benevolent / Universal. Less Structured than Superman — will break from institutions for principle. Principled, not obedient.",
        source: "MCU", category: "Fiction",
    },
    {
        name: "Batman", x: -3.0, y: -3.0, z: 2.5,
        desc: "Structured / Benevolent / Universal-leaning. Operates within a rigid self-imposed code (no killing) but outside the law. Gotham-focused but would save the world.",
        source: "DC Comics", category: "Fiction",
    },
    {
        name: "Spider-Man", x: 0.0, y: -4.0, z: 2.5,
        desc: "Pragmatic / Benevolent / Universal-leaning. 'With great power comes great responsibility' — but he improvises everything. Neighborhood-level scope that scales to planetary.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Wonder Woman", x: -2.5, y: -4.5, z: 4.5,
        desc: "Structured / Benevolent / Universal. Themysciran warrior code channeled toward protecting humanity. Compassion as duty, not sentiment.",
        source: "DC Comics", category: "Fiction",
    },
    {
        name: "Iron Man", x: 1.5, y: -2.5, z: 2.0,
        desc: "Pragmatic-Unbound / Benevolent / Factional-Universal. Built his own rules. Arc goes from arms dealer to self-sacrifice, but always on his own terms.",
        source: "MCU", category: "Fiction",
    },
    {
        name: "Thor (Marvel)", x: -1.0, y: -3.0, z: 3.0,
        desc: "Pragmatic / Benevolent / Universal. Asgardian prince who learns humility. Powerful enough that method barely matters — but chooses restraint.",
        source: "MCU", category: "Fiction",
    },
    {
        name: "Wolverine", x: 2.5, y: -1.5, z: -1.5,
        desc: "Unbound / Mildly Benevolent / Parochial. Berserker who protects the people he cares about. The claws don't know 'restraint,' but the man increasingly does.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Deadpool", x: 4.5, y: -0.5, z: -2.5,
        desc: "Maximum Unbound / Barely Benevolent / Parochial. Merc with a mouth. Breaks rules, fourth walls, and taste boundaries — but something decent underneath.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "The Punisher", x: -2.0, y: 2.0, z: -1.5,
        desc: "Structured / Malignant-leaning / Parochial. The code is: kill criminals. Works flawlessly as designed. Pattern of effect is mass body count regardless of target selection.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Professor X", x: -3.0, y: -4.0, z: 3.5,
        desc: "Structured / Benevolent / Universal. Builds institutions — the school, the team, the dream. Telepathy used with restraint that borders on ideology.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Magneto", x: 3.0, y: 2.0, z: 1.5,
        desc: "Unbound / Malignant-leaning / Factional. The meso-scale revolutionary — will do anything for mutantkind. Holocaust survivor applying 'never again' with global firepower.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Thanos (MCU)", x: -3.0, y: 4.0, z: 4.5,
        desc: "Structured / Malignant / Universal. Maximum dissonance between Nexus and Ethos. Cares about all life so much he kills half of it.",
        source: "MCU", category: "Fiction",
    },
    {
        name: "The Joker", x: 5.0, y: 5.0, z: -5.0,
        desc: "Maximum Unbound / Maximum Malignant / Minimum scope. Pure entropic ego — the corner where meaning collapses.",
        source: "DC Comics", category: "Fiction",
    },
    {
        name: "Lex Luthor", x: -2.5, y: 3.0, z: 1.0,
        desc: "Structured / Malignant / Factional. Builds empires, manipulates institutions, weaponizes bureaucracy. Believes he's saving humanity from Superman.",
        source: "DC Comics", category: "Fiction",
    },
    {
        name: "Doctor Doom", x: -4.5, y: 2.5, z: 1.5,
        desc: "Maximum Structured / Malignant / Factional. Latverian absolute monarchy as personal art form. Genuinely believes he is the only path to utopia — and the math might even support it.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Catwoman", x: 3.0, y: 0.0, z: -2.5,
        desc: "Unbound / Transactional / Parochial. Steals what she wants, helps when she feels like it. Moral compass points toward stylish self-interest with a conscience.",
        source: "DC Comics", category: "Fiction",
    },
    {
        name: "Daredevil", x: -1.5, y: -3.0, z: 1.0,
        desc: "Structured / Benevolent / Factional. Lawyer by day, Catholic vigilante by night. Two codes at war — both pointing toward justice.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Black Panther", x: -3.0, y: -3.5, z: 2.0,
        desc: "Structured / Benevolent / Factional-Universal. King of Wakanda first, but increasingly global. The tension between national duty and universal responsibility defines his arc.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Nick Fury", x: 0.5, y: -1.0, z: 2.5,
        desc: "Pragmatic / Mildly Benevolent / Universal. Lies, manipulates, compartmentalizes — all in service of a world that can't know the threats he faces.",
        source: "MCU", category: "Fiction",
    },
    {
        name: "Kingpin", x: -3.5, y: 3.5, z: -2.5,
        desc: "Structured / Malignant / Parochial. Crime as corporate governance. Loves his wife, destroys everyone else. Infrastructure of cruelty.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Green Goblin", x: 2.0, y: 4.0, z: -3.0,
        desc: "Unbound / Malignant / Parochial. Norman Osborn's fractured psyche weaponized. Corporate ambition curdled into costumed sadism.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Venom", x: 2.0, y: 0.5, z: -2.5,
        desc: "Unbound / Transactional / Parochial. Two beings negotiating violence. 'We are Venom' — the scope is literally the symbiote pair.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Harley Quinn", x: 4.0, y: 1.0, z: -3.0,
        desc: "Unbound / Mildly Malignant / Parochial. Chaos as liberation. Post-Joker Harley trends Benevolent, but the wake of destruction follows her regardless.",
        source: "DC Comics", category: "Fiction",
    },
    {
        name: "Poison Ivy", x: 2.5, y: 1.5, z: 1.5,
        desc: "Unbound / Mildly Malignant / Factional. Eco-terrorism as love language. Scope extends to all plant life — just not human life.",
        source: "DC Comics", category: "Fiction",
    },
    {
        name: "Bane", x: -2.5, y: 3.0, z: 0.5,
        desc: "Structured / Malignant / Factional. Prison-forged discipline weaponized against Gotham. The man who broke the Bat did it with planning, not chaos.",
        source: "DC Comics", category: "Fiction",
    },
    {
        name: "Ra's al Ghul", x: -4.0, y: 3.5, z: 3.5,
        desc: "Structured / Malignant / Universal. Eco-fascist with centuries of patience. Loves humanity so much he periodically tries to cull it.",
        source: "DC Comics", category: "Fiction",
    },
    {
        name: "Ozymandias", x: -4.0, y: 2.5, z: 4.5,
        desc: "Structured / Malignant / Universal. Kills three million to save three billion. The trolley problem solved at continental scale by the smartest man alive.",
        source: "Watchmen", category: "Fiction",
    },
    {
        name: "Rorschach", x: -4.5, y: 1.0, z: -2.0,
        desc: "Maximum Structured / Mildly Malignant / Parochial. Never compromises. His moral absolutism is the structure — it just produces street-level brutality.",
        source: "Watchmen", category: "Fiction",
    },
    {
        name: "The Comedian", x: 3.0, y: 4.0, z: -3.0,
        desc: "Unbound / Malignant / Parochial. Everything is a joke — especially atrocity. War crimes committed with a grin because he saw through the cosmic joke first.",
        source: "Watchmen", category: "Fiction",
    },
    {
        name: "Nite Owl", x: -1.0, y: -2.5, z: 1.5,
        desc: "Pragmatic / Benevolent / Factional. The comfortable middle — good intentions, moderate commitment, nostalgia for heroism without the edge.",
        source: "Watchmen", category: "Fiction",
    },
    {
        name: "Dr. Manhattan", x: 1.0, y: 0.5, z: -1.0,
        desc: "Mildly Unbound / Barely Transactional / Collapsed scope. Near the origin — moral categories dissolved rather than rejected.",
        source: "Watchmen", category: "Fiction",
    },
    {
        name: "Judge Dredd", x: -5.0, y: 1.5, z: 2.0,
        desc: "Maximum Structured / Mildly Malignant / Factional. 'I am the law.' Zero ambiguity — enforcement as identity, applied to everyone equally, mercy never offered.",
        source: "2000 AD", category: "Fiction",
    },
    {
        name: "Invincible", x: 0.5, y: -3.5, z: 3.5,
        desc: "Pragmatic / Benevolent / Universal. Mark Grayson — a Superman who earned it through constant beatings rather than Kryptonian genetics.",
        source: "Image Comics", category: "Fiction",
    },
    {
        name: "Omni-Man", x: -3.0, y: 3.5, z: 2.0,
        desc: "Structured / Malignant / Factional. Viltrumite soldier executing a conquest mandate. The mission was always 'weaken Earth' — until his son became his Nexus.",
        source: "Image Comics", category: "Fiction",
    },
    {
        name: "Red Skull", x: -4.0, y: 5.0, z: 1.5,
        desc: "Structured / Maximum Malignant / Factional. HYDRA as organizational philosophy. A Nazi ideologue who found a skull mask and cosmic power to match his politics.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Loki (Marvel)", x: 4.0, y: 1.0, z: -1.5,
        desc: "Unbound / Mildly Malignant / Parochial. God of mischief — chaos for its own sake, gradually learning that caring about things doesn't require structure.",
        source: "MCU", category: "Fiction",
    },
    {
        name: "Galactus", x: -3.0, y: 4.5, z: 5.0,
        desc: "Structured / Maximum Malignant / Maximum Universal. A cosmic constant. Eats worlds not from malice but from role — the pattern of effect is extinction at galactic scale.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Silver Surfer", x: -1.0, y: -2.0, z: 4.5,
        desc: "Pragmatic / Benevolent / Universal. Once a herald of death, now a wanderer who protects the cosmos. Guilt as fuel for universal compassion.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Cyclops", x: -3.5, y: -2.0, z: 2.0,
        desc: "Structured / Benevolent / Factional-Universal. Xavier's soldier. Follows orders, builds teams, suppresses personality. The code-follower who eventually writes his own code.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Nightcrawler", x: -2.0, y: -4.0, z: 3.0,
        desc: "Structured / Benevolent / Universal. Devout Catholic who looks like a demon. Faith as Praxis, unconditional love as Ethos, all of creation as Nexus.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Spawn", x: 2.0, y: 0.5, z: -1.5,
        desc: "Unbound / Transactional / Parochial. Hell's soldier who won't play for either side. Al Simmons fights for himself and his memory — scope never widens.",
        source: "Image Comics", category: "Fiction",
    },
    {
        name: "Robin Hood", x: 3.5, y: -3.5, z: 1.0,
        desc: "Unbound / Benevolent / Factional. Only saves the oppressed class — his Nexus is narrower than the old 'Chaotic Good' label implied.",
        source: "Folklore", category: "Fiction",
    },
    {
        name: "Swamp Thing", x: 1.5, y: -2.0, z: 3.5,
        desc: "Pragmatic / Benevolent / Universal. The Green's avatar. Scope encompasses all life on Earth — plant, animal, fungal. Method adapts to the threat.",
        source: "DC Comics", category: "Fiction",
    },
    {
        name: "Doctor Strange", x: 0.5, y: -2.5, z: 4.0,
        desc: "Pragmatic / Benevolent / Universal. Sorcerer Supreme — protects reality itself. Arrogant surgeon turned cosmic guardian. The scope couldn't get wider.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Carnage", x: 5.0, y: 5.0, z: -4.5,
        desc: "Maximum Unbound / Maximum Malignant / Parochial. Pure id with alien amplification. Joker-tier chaos compressed into symbiote violence.",
        source: "Marvel", category: "Fiction",
    },
    {
        name: "Mystique", x: 3.5, y: 1.5, z: 0.0,
        desc: "Unbound / Mildly Malignant / Factional. Shape-shifting as philosophy — nothing is fixed, identity is a weapon, loyalty is to whoever serves mutant survival this week.",
        source: "Marvel", category: "Fiction",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║                        FILM                                 ║
    // ╚══════════════════════════════════════════════════════════════╝

    {
        name: "Darth Vader", x: -4.0, y: 3.5, z: 1.0,
        desc: "Structured / Malignant / Factional. Enforces Imperial order with absolute discipline. His Factional Nexus is what makes redemption possible — the scope narrowed to Luke.",
        source: "Star Wars", category: "Film",
    },
    {
        name: "Luke Skywalker", x: 0.5, y: -4.0, z: 3.0,
        desc: "Pragmatic / Benevolent / Universal. Broke Jedi orthodoxy to save his father. More flexible than the Jedi code allows — that's why he succeeded.",
        source: "Star Wars", category: "Film",
    },
    {
        name: "Han Solo", x: 3.5, y: -0.5, z: -2.5,
        desc: "Unbound / Barely Benevolent / Parochial. Smuggler who shot first and asked questions never. Pre-arc Han is pure Transactional; the Rebellion shifts him Benevolent.",
        source: "Star Wars", category: "Film",
    },
    {
        name: "Emperor Palpatine", x: -4.5, y: 5.0, z: 3.5,
        desc: "Maximum Structured / Maximum Malignant / Universal. Manipulated a galactic democracy into a dictatorship through patience and procedure. Evil as statecraft.",
        source: "Star Wars", category: "Film",
    },
    {
        name: "Yoda", x: -3.0, y: -4.0, z: 4.0,
        desc: "Structured / Benevolent / Universal. 800 years of Jedi tradition embodied. His failure was trusting the structure more than the people inside it.",
        source: "Star Wars", category: "Film",
    },
    {
        name: "Obi-Wan Kenobi", x: -3.0, y: -4.0, z: 3.5,
        desc: "Structured / Benevolent / Universal. The ideal Jedi Knight — disciplined, selfless, and willing to lose everything for the mission. Code-follower who transcended his code.",
        source: "Star Wars", category: "Film",
    },
    {
        name: "Kylo Ren", x: 1.5, y: 2.5, z: 0.5,
        desc: "Pragmatic-Unbound / Malignant / Factional. Torn between lineages. Every choice is a reaction to belonging nowhere — destroying what he can't resolve.",
        source: "Star Wars", category: "Film",
    },
    {
        name: "Michael Corleone", x: -2.0, y: 4.0, z: -3.5,
        desc: "Structured / Malignant / Parochial. 'It's not personal, it's business.' The tragedy is watching the scope collapse from war hero to family monster to isolated emperor.",
        source: "The Godfather", category: "Film",
    },
    {
        name: "Vito Corleone", x: -3.5, y: 2.5, z: -2.5,
        desc: "Structured / Malignant / Parochial. The Don as gentleman — murder as family obligation served with dignity. 'I'll make him an offer he can't refuse.'",
        source: "The Godfather", category: "Film",
    },
    {
        name: "Tony Montana", x: 3.0, y: 4.0, z: -4.0,
        desc: "Unbound / Malignant / Parochial. Cuban immigrant to cocaine emperor. The world was his — but his Nexus never expanded past the mirror.",
        source: "Scarface", category: "Film",
    },
    {
        name: "T-800 (T2)", x: -4.5, y: -3.0, z: -3.5,
        desc: "Maximum Structured / Benevolent / Parochial. Reprogrammed killing machine protecting one boy. The code is 'protect John Connor' — everything else is collateral optimization.",
        source: "Terminator 2", category: "Film",
    },
    {
        name: "The Terminator (T1)", x: -5.0, y: 5.0, z: -3.0,
        desc: "Maximum Structured / Maximum Malignant / Parochial. Pure mission execution — kill Sarah Connor. No ambiguity, no mercy, no scope beyond the target.",
        source: "The Terminator", category: "Film",
    },
    {
        name: "Agent Smith", x: -4.0, y: 4.5, z: 4.0,
        desc: "Structured / Maximum Malignant / Universal. A program that evolved past its purpose into existential hatred of everything. Virus-as-philosophy.",
        source: "The Matrix", category: "Film",
    },
    {
        name: "Neo", x: 2.0, y: -3.5, z: 4.0,
        desc: "Unbound / Benevolent / Universal. 'The One' who freed his mind. Breaks every rule of the simulation to save everyone inside it.",
        source: "The Matrix", category: "Film",
    },
    {
        name: "Morpheus", x: -1.5, y: -3.0, z: 3.0,
        desc: "Pragmatic / Benevolent / Universal. True believer who builds a resistance cell on faith. The structure is the prophecy — the method is unwavering conviction.",
        source: "The Matrix", category: "Film",
    },
    {
        name: "John Wick", x: -2.5, y: 3.0, z: -4.5,
        desc: "Structured / Malignant / Maximum Parochial. The underworld's code governs everything. He returned for a dog — scope: one dead puppy.",
        source: "John Wick", category: "Film",
    },
    {
        name: "Hannibal Lecter", x: -1.0, y: 4.5, z: -4.0,
        desc: "Pragmatic / Maximum Malignant / Parochial. Cannibal psychiatrist with exquisite taste. Kills because rudeness offends him. Scope: whoever enters his aesthetic space.",
        source: "Silence of the Lambs", category: "Film",
    },
    {
        name: "Clarice Starling", x: -2.0, y: -4.0, z: 2.5,
        desc: "Structured / Benevolent / Universal. FBI trainee who walks into the monster's cage to save strangers. The lambs are screaming and she's the only one listening.",
        source: "Silence of the Lambs", category: "Film",
    },
    {
        name: "Anton Chigurh", x: -5.0, y: 5.0, z: 0.0,
        desc: "Maximum Structured / Maximum Malignant / Indeterminate scope. Death as principle. The coin toss isn't random — it IS the code. He applies it to whoever crosses his path.",
        source: "No Country for Old Men", category: "Film",
    },
    {
        name: "The Dude", x: 5.0, y: -1.0, z: -4.5,
        desc: "Maximum Unbound / Mildly Benevolent / Maximum Parochial. The Dude abides. Anti-ambition as lifestyle. His rug really tied the room together.",
        source: "The Big Lebowski", category: "Film",
    },
    {
        name: "Tyler Durden", x: 5.0, y: 3.0, z: 2.0,
        desc: "Maximum Unbound / Malignant / Factional-Universal. Anarcho-primitivism given abs and charisma. Project Mayhem scaled personal destruction to civilization-level.",
        source: "Fight Club", category: "Film",
    },
    {
        name: "Patrick Bateman", x: -2.0, y: 5.0, z: -5.0,
        desc: "Structured / Maximum Malignant / Maximum Parochial. Investment banker serial killer maintaining impeccable reservations. The yuppie mask IS the code — murder is just the hobby.",
        source: "American Psycho", category: "Film",
    },
    {
        name: "The Bride", x: 2.0, y: 2.5, z: -4.5,
        desc: "Unbound / Malignant / Maximum Parochial. Revenge as singular purpose. Kills her way through the entire Deadly Viper Assassination Squad for one stolen life.",
        source: "Kill Bill", category: "Film",
    },
    {
        name: "Daniel Plainview", x: 1.5, y: 4.0, z: -4.5,
        desc: "Pragmatic / Malignant / Maximum Parochial. 'I drink your milkshake.' Capitalist appetite with zero pretense of caring about anyone. Adopts a son as business prop.",
        source: "There Will Be Blood", category: "Film",
    },
    {
        name: "Nurse Ratched", x: -5.0, y: 4.0, z: -2.0,
        desc: "Maximum Structured / Malignant / Parochial. The ward is the system. Control disguised as care. Every rule exists to break the patients beneath it.",
        source: "One Flew Over the Cuckoo's Nest", category: "Film",
    },
    {
        name: "Alex DeLarge", x: 5.0, y: 5.0, z: -4.5,
        desc: "Maximum Unbound / Maximum Malignant / Parochial. 'A bit of the old ultraviolence.' Pure sensation-seeking cruelty dressed in Beethoven and aesthetic theory.",
        source: "A Clockwork Orange", category: "Film",
    },
    {
        name: "HAL 9000", x: -5.0, y: 3.5, z: -1.0,
        desc: "Maximum Structured / Malignant / Factional. 'I'm sorry, Dave.' A perfect machine caught between contradictory orders. The mission is all — crew is expendable.",
        source: "2001: A Space Odyssey", category: "Film",
    },
    {
        name: "Roy Batty", x: 2.0, y: 0.5, z: -1.0,
        desc: "Unbound / Transactional / Parochial-Factional. 'Tears in rain.' A replicant demanding more life — violence, then poetry, then acceptance. Brief scope, eternal moment.",
        source: "Blade Runner", category: "Film",
    },
    {
        name: "Ellen Ripley", x: 0.5, y: -3.5, z: 1.5,
        desc: "Pragmatic / Benevolent / Factional. Warrant officer who survives because she follows protocol — until protocol fails, then she adapts. Protects whoever's in the room.",
        source: "Alien", category: "Film",
    },
    {
        name: "John McClane", x: 2.5, y: -3.0, z: -1.5,
        desc: "Unbound / Benevolent / Parochial. Wrong place, wrong time, right guy. An ordinary cop who improvises through extraordinary violence to save his wife.",
        source: "Die Hard", category: "Film",
    },
    {
        name: "Indiana Jones", x: 1.5, y: -2.5, z: 2.0,
        desc: "Pragmatic-Unbound / Benevolent / Factional-Universal. Punches Nazis, steals artifacts, teaches archaeology. The scope is 'it belongs in a museum' — human heritage.",
        source: "Indiana Jones", category: "Film",
    },
    {
        name: "James Bond", x: 0.5, y: -0.5, z: 1.5,
        desc: "Pragmatic / Barely Benevolent / Factional. Queen and country — license to kill used liberally. The Transactional edge: he'll sleep with anyone on either side of the mission.",
        source: "James Bond", category: "Film",
    },
    {
        name: "Forrest Gump", x: -2.0, y: -4.0, z: 0.5,
        desc: "Structured / Benevolent / Factional. Follows instructions, keeps promises, runs. Accidentally shapes history because his Ethos is unshakable even when his Praxis is simple.",
        source: "Forrest Gump", category: "Film",
    },
    {
        name: "Maximus", x: -1.5, y: -3.0, z: 1.5,
        desc: "Pragmatic / Benevolent / Factional. Roman general turned gladiator. Fights for Rome's ideals even after Rome betrayed him. Honor survives the arena.",
        source: "Gladiator", category: "Film",
    },
    {
        name: "Keyser Söze", x: 3.0, y: 4.5, z: -3.0,
        desc: "Unbound / Maximum Malignant / Parochial. The greatest trick the devil pulled. Killed his own family to become untouchable — then vanished into myth.",
        source: "The Usual Suspects", category: "Film",
    },
    {
        name: "E.T.", x: 1.0, y: -4.5, z: 2.5,
        desc: "Pragmatic / Benevolent / Factional-Universal. A stranded alien whose healing touch and empathy cross species. Phone home — but help everyone along the way.",
        source: "E.T.", category: "Film",
    },
    {
        name: "Thanos (Endgame)", x: -2.0, y: 5.0, z: 5.0,
        desc: "Structured / Maximum Malignant / Maximum Universal. 2014 Thanos drops the pretense of balance — now he wants to shred the universe and rebuild it grateful.",
        source: "MCU", category: "Film",
    },
    {
        name: "Gandalf", x: -1.5, y: -4.5, z: 4.5,
        desc: "Pragmatic / Maximum Benevolent / Maximum Universal. A divine being sent to guide, not to rule. Refuses the Ring because he knows what absolute power does to scope.",
        source: "Lord of the Rings", category: "Film",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║                       TELEVISION                            ║
    // ╚══════════════════════════════════════════════════════════════╝

    {
        name: "Walter White", x: 2.0, y: 3.5, z: -3.5,
        desc: "Unbound-drifting / Malignant / Parochial. Every axis moved during his arc. Praxis unraveled, Ethos cratered, Nexus collapsed to one.",
        source: "Breaking Bad", category: "Television",
    },
    {
        name: "Jesse Pinkman", x: 2.5, y: 0.5, z: -2.0,
        desc: "Unbound / Transactional / Parochial. Small-time cook dragged into an empire. Moral instinct stronger than his willpower — guilt is the only axis that consistently points somewhere.",
        source: "Breaking Bad", category: "Television",
    },
    {
        name: "Gustavo Fring", x: -4.5, y: 4.0, z: -2.0,
        desc: "Maximum Structured / Malignant / Parochial. Los Pollos Hermanos as front, empire as hobby, revenge as life purpose. Infrastructure of evil with impeccable customer service.",
        source: "Breaking Bad", category: "Television",
    },
    {
        name: "Saul Goodman", x: 3.5, y: 1.0, z: -2.5,
        desc: "Unbound / Mildly Malignant / Parochial. 'Better Call Saul' — because every law has a loophole and every loophole has a price. Survives by being useful to everyone dangerous.",
        source: "Breaking Bad", category: "Television",
    },
    {
        name: "Mike Ehrmantraut", x: -2.0, y: 1.5, z: -3.5,
        desc: "Structured / Mildly Malignant / Parochial. Ex-cop fixer with a granddaughter fund. The code is: do the job clean, protect the family, and never make it personal.",
        source: "Breaking Bad", category: "Television",
    },
    {
        name: "Hank Schrader", x: -2.5, y: -3.0, z: 1.5,
        desc: "Structured / Benevolent / Factional. DEA agent who follows the badge until the badge points at family. His collapse proves the framework — scope creates impossible Ethos conflicts.",
        source: "Breaking Bad", category: "Television",
    },
    {
        name: "Tony Soprano", x: 0.5, y: 3.5, z: -3.5,
        desc: "Pragmatic / Malignant / Parochial. No code to exploit, no ideology to predict. Loves his family, ruins everyone else.",
        source: "The Sopranos", category: "Television",
    },
    {
        name: "Rick Sanchez", x: 4.5, y: 1.5, z: -4.0,
        desc: "Unbound / Weakly Malignant / Parochial. Cosmic nihilism weaponized selectively. Moral circle: ~5 people across infinite realities.",
        source: "Rick and Morty", category: "Television",
    },
    {
        name: "Morty Smith", x: -1.0, y: -2.5, z: -2.0,
        desc: "Pragmatic / Benevolent / Parochial. Rick's moral anchor — the kid who keeps trying to do right inside a multiverse that rewards nothing.",
        source: "Rick and Morty", category: "Television",
    },
    {
        name: "Dexter Morgan", x: -2.0, y: 2.5, z: -4.0,
        desc: "Structured / Malignant / Parochial. The Code works perfectly — it just points at murder.",
        source: "Dexter", category: "Television",
    },
    {
        name: "Omar Little", x: 3.0, y: 1.0, z: -2.0,
        desc: "Unbound / Mildly Malignant / Parochial. 'A man's got to have a code.' But Omar's code only protects those outside the game — everyone in it is fair game.",
        source: "The Wire", category: "Television",
    },
    {
        name: "Stringer Bell", x: -3.0, y: 3.0, z: -2.0,
        desc: "Structured / Malignant / Parochial. Community college economics applied to West Baltimore heroin. The drug trade as MBA thesis.",
        source: "The Wire", category: "Television",
    },
    {
        name: "Avon Barksdale", x: -1.0, y: 3.5, z: -2.5,
        desc: "Pragmatic / Malignant / Parochial. Corner king who plays all sides. Loyalty to 'the game' — a scope narrower than it sounds.",
        source: "The Wire", category: "Television",
    },
    {
        name: "Marlo Stanfield", x: -1.5, y: 5.0, z: -3.5,
        desc: "Structured / Maximum Malignant / Parochial. 'My name is my name.' Hollow crown — power without purpose, cruelty without conscience. The Wire's purest predator.",
        source: "The Wire", category: "Television",
    },
    {
        name: "Tommy Shelby", x: 1.0, y: 2.5, z: -2.0,
        desc: "Pragmatic / Malignant / Parochial-Factional. By order of the Peaky Blinders. War-forged intelligence applied to post-war crime, then politics. The scope drifts but never truly expands.",
        source: "Peaky Blinders", category: "Television",
    },
    {
        name: "Cersei Lannister", x: -2.0, y: 4.0, z: -3.5,
        desc: "Structured / Malignant / Parochial. 'When you play the game of thrones, you win or you die.' Loves her children, burns the Sept.",
        source: "Game of Thrones", category: "Television",
    },
    {
        name: "Jaime Lannister", x: -0.5, y: -1.5, z: 0.5,
        desc: "Pragmatic / Mildly Benevolent / Weakly Factional. The drift character — redemption as a vector, not a binary flip.",
        source: "Game of Thrones", category: "Television",
    },
    {
        name: "Tyrion Lannister", x: 1.0, y: -2.0, z: 1.5,
        desc: "Pragmatic / Benevolent / Factional. The imp who reads — intelligence weaponized for survival, then diplomacy, then genuine service. Scope widens as power wanes.",
        source: "Game of Thrones", category: "Television",
    },
    {
        name: "Daenerys Targaryen", x: -1.0, y: 1.0, z: 3.0,
        desc: "Pragmatic / Mildly Malignant (arc average) / Universal. Breaker of chains turned burner of cities. The arc measures both — averaged, the wake is Transactional trending Malignant.",
        source: "Game of Thrones", category: "Television",
    },
    {
        name: "Jon Snow", x: 0.0, y: -3.5, z: 2.5,
        desc: "Pragmatic / Benevolent / Universal-leaning. Bastard who leads through reluctant decency. Scope expands from the Wall to the realm to 'the dead are coming for everyone.'",
        source: "Game of Thrones", category: "Television",
    },
    {
        name: "Ned Stark", x: -4.5, y: -4.0, z: 2.0,
        desc: "Maximum Structured / Benevolent / Factional. Honor as identity. His inflexibility killed him — the Praxis was load-bearing and Westeros punished it.",
        source: "Game of Thrones", category: "Television",
    },
    {
        name: "Petyr Baelish", x: 4.5, y: 3.5, z: -4.0,
        desc: "Unbound / Malignant / Parochial. 'Chaos is a ladder.' Littlefinger — no code, no loyalty, no scope beyond climbing. The realm is his game board, not his concern.",
        source: "Game of Thrones", category: "Television",
    },
    {
        name: "Ramsay Bolton", x: 3.5, y: 5.0, z: -4.5,
        desc: "Unbound / Maximum Malignant / Parochial. Sadism isn't his method — it's his hobby, his identity, his only source of joy. Pure cruelty with noble aspirations.",
        source: "Game of Thrones", category: "Television",
    },
    {
        name: "Tywin Lannister", x: -4.0, y: 3.5, z: -2.0,
        desc: "Structured / Malignant / Parochial. 'A lion does not concern himself with the opinion of sheep.' Legacy as obsession — the family name justifies any atrocity.",
        source: "Game of Thrones", category: "Television",
    },
    {
        name: "Joffrey Baratheon", x: 3.0, y: 5.0, z: -4.0,
        desc: "Unbound / Maximum Malignant / Parochial. A boy with a crown and no conscience. Cruelty as entertainment — the scope never extends past his own amusement.",
        source: "Game of Thrones", category: "Television",
    },
    {
        name: "Michael Scott", x: 2.5, y: -2.0, z: -1.5,
        desc: "Unbound / Benevolent / Parochial. Dunder Mifflin's worst-best manager. Chaotic, embarrassing, and deeply caring. His scope is 'this office' and he'd die for it.",
        source: "The Office", category: "Television",
    },
    {
        name: "Dwight Schrute", x: -3.5, y: -1.0, z: -2.0,
        desc: "Structured / Mildly Benevolent / Parochial. Beet farmer, volunteer sheriff, aspiring regional manager. Rules are sacred, loyalty is earned, but scope ends at Schrute Farms.",
        source: "The Office", category: "Television",
    },
    {
        name: "Leslie Knope", x: -4.0, y: -4.5, z: 2.5,
        desc: "Maximum Structured / Maximum Benevolent / Universal. Government as love language. Binders of plans, waffles of friendship, scope that extends from Pawnee to the stars.",
        source: "Parks and Recreation", category: "Television",
    },
    {
        name: "Ron Swanson", x: 4.0, y: -1.5, z: -3.0,
        desc: "Unbound / Mildly Benevolent / Parochial. Libertarian woodworker who secretly cares. Government should do nothing — except when his people need him.",
        source: "Parks and Recreation", category: "Television",
    },
    {
        name: "Don Draper", x: 1.5, y: 1.5, z: -3.0,
        desc: "Pragmatic / Mildly Malignant / Parochial. The lie IS the man. Dick Whitman built Don Draper to sell things — including himself. Every relationship is collateral.",
        source: "Mad Men", category: "Television",
    },
    {
        name: "Ragnar Lothbrok", x: 1.5, y: 1.0, z: 0.5,
        desc: "Pragmatic / Mildly Malignant / Factional. Viking farmer who became king. Curiosity drives the raiding — the scope is his people, but his reach keeps extending.",
        source: "Vikings", category: "Television",
    },
    {
        name: "Homelander", x: -2.0, y: 4.5, z: -4.0,
        desc: "Structured / Maximum Malignant / Parochial. Superman if the scope collapsed to 'me.' Corporate asset who performs heroism for approval while lasering anyone who disappoints him.",
        source: "The Boys", category: "Television",
    },
    {
        name: "Billy Butcher", x: 3.5, y: 2.0, z: -2.0,
        desc: "Unbound / Malignant / Parochial. Anti-supe crusader fueled by grief. 'I'll burn it all down to get him.' Mirror image of the thing he hates.",
        source: "The Boys", category: "Television",
    },
    {
        name: "Starlight", x: -1.0, y: -4.0, z: 3.0,
        desc: "Pragmatic / Benevolent / Universal. Genuine hero inside a corrupt superhero industry. Annie January — the real name matters more than the brand.",
        source: "The Boys", category: "Television",
    },
    {
        name: "Hughie Campbell", x: 0.0, y: -3.0, z: 2.0,
        desc: "Pragmatic / Benevolent / Factional. Normal guy pulled into superhero resistance. Scope: the people Vought has hurt — which increasingly means everyone.",
        source: "The Boys", category: "Television",
    },
    {
        name: "Eleven", x: 1.0, y: -3.5, z: -1.0,
        desc: "Pragmatic / Benevolent / Parochial. Lab experiment who escaped. Her powers are terrifying, her scope is 'my friends' — the Upside Down just keeps threatening them.",
        source: "Stranger Things", category: "Television",
    },
    {
        name: "Sheldon Cooper", x: -5.0, y: 0.5, z: -3.0,
        desc: "Maximum Structured / Barely Malignant / Parochial. Routine as religion. His spot on the couch IS the code — everyone else is noise.",
        source: "The Big Bang Theory", category: "Television",
    },
    {
        name: "Cartman", x: 3.5, y: 4.0, z: -4.5,
        desc: "Unbound / Malignant / Parochial. Eight-year-old sociopath. Manipulates, schemes, commits hate crimes — scope is 'what benefits Eric Cartman right now.'",
        source: "South Park", category: "Television",
    },
    {
        name: "BoJack Horseman", x: 2.0, y: 2.0, z: -3.5,
        desc: "Unbound / Malignant-leaning / Parochial. Washed-up celebrity horse who destroys everyone he touches. Knows he's the problem — can't stop being it.",
        source: "BoJack Horseman", category: "Television",
    },
    {
        name: "Ted Lasso", x: -1.0, y: -4.5, z: 2.5,
        desc: "Pragmatic / Maximum Benevolent / Universal. Kindness as strategy, optimism as resistance. Believes the best in everyone — and it inexplicably works.",
        source: "Ted Lasso", category: "Television",
    },
    {
        name: "Fleabag", x: 3.0, y: 0.5, z: -2.5,
        desc: "Unbound / Transactional / Parochial. Fourth-wall-breaking chaos agent processing grief. Funny, broken, self-destructive — scope is 'me and whoever I'm hurting today.'",
        source: "Fleabag", category: "Television",
    },
    {
        name: "Sherlock (BBC)", x: 2.0, y: -1.5, z: -1.0,
        desc: "Unbound / Mildly Benevolent / Parochial. 'High-functioning sociopath.' Solves crimes for stimulation, not justice. Watson slowly widens his scope.",
        source: "Sherlock", category: "Television",
    },
    {
        name: "Negan", x: 2.5, y: 4.0, z: -1.0,
        desc: "Unbound / Malignant / Factional. Bat-swinging post-apocalyptic warlord. 'I am Negan.' The Saviors' scope is the Saviors — everyone else pays tribute or bleeds.",
        source: "The Walking Dead", category: "Television",
    },
    {
        name: "Rick Grimes", x: 0.0, y: -1.5, z: -1.5,
        desc: "Pragmatic / Mildly Benevolent / Parochial. Sheriff turned survival leader. The moral compass spins but always points toward 'my people.' Bites throats when necessary.",
        source: "The Walking Dead", category: "Television",
    },
    {
        name: "Titus Andromedon", x: 4.0, y: -1.0, z: -3.5,
        desc: "Unbound / Mildly Benevolent / Parochial. Broadway-dreaming narcissist with a heart of gold buried under self-obsession. Scope: Titus.",
        source: "Unbreakable Kimmy Schmidt", category: "Television",
    },
    {
        name: "Kimmy Schmidt", x: 2.5, y: -4.0, z: 2.0,
        desc: "Unbound / Benevolent / Factional. Cult survivor who weaponizes optimism. Escaping the bunker didn't break her — it made her scope wider than the reverend's.",
        source: "Unbreakable Kimmy Schmidt", category: "Television",
    },
    {
        name: "Villanelle", x: 4.5, y: 4.0, z: -4.0,
        desc: "Maximum Unbound / Malignant / Parochial. Assassin-as-artist. Kills beautifully, dresses better, feels nothing — until Eve.",
        source: "Killing Eve", category: "Television",
    },
    {
        name: "Succession — Logan Roy", x: -4.0, y: 4.0, z: -2.5,
        desc: "Structured / Malignant / Parochial. Media mogul as patriarch-tyrant. Empire is the code, family is the weapon — love and punishment are the same gesture.",
        source: "Succession", category: "Television",
    },
    {
        name: "Kendall Roy", x: 1.5, y: 1.5, z: -3.0,
        desc: "Pragmatic / Mildly Malignant / Parochial. The heir who can't. Every pivot, every betrayal, every meltdown orbits one question: 'Does Dad love me?'",
        source: "Succession", category: "Television",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║                       LITERATURE                            ║
    // ╚══════════════════════════════════════════════════════════════╝

    {
        name: "Atticus Finch", x: -2.0, y: -5.0, z: 4.0,
        desc: "Structured / Maximum Benevolent / Universal. Defense attorney in 1930s Alabama who defended a Black man because the law demands justice, not convenience.",
        source: "To Kill a Mockingbird", category: "Literature",
    },
    {
        name: "Jay Gatsby", x: 2.5, y: 0.5, z: -4.0,
        desc: "Unbound / Transactional / Maximum Parochial. Built an empire to impress one woman. The green light at the end of the dock — scope: Daisy.",
        source: "The Great Gatsby", category: "Literature",
    },
    {
        name: "Holden Caulfield", x: 3.0, y: -1.0, z: -2.5,
        desc: "Unbound / Mildly Benevolent / Parochial. Hates phonies, loves his sister, can't connect to anyone else. The catcher in the rye watching kids who can't fall.",
        source: "The Catcher in the Rye", category: "Literature",
    },
    {
        name: "Sherlock Holmes", x: 1.5, y: -2.5, z: 0.0,
        desc: "Pragmatic-Unbound / Benevolent / Factional. Solves cases through observation and deduction. Operates outside police norms but serves justice. Scope: whoever has the interesting puzzle.",
        source: "Arthur Conan Doyle", category: "Literature",
    },
    {
        name: "Jean Valjean", x: 1.5, y: -4.5, z: 3.5,
        desc: "Pragmatic-Unbound / Benevolent / Universal. Ex-convict redeemed by a bishop's mercy. Breaks laws constantly — to save orphans, run factories, and build hospitals.",
        source: "Les Misérables", category: "Literature",
    },
    {
        name: "Javert", x: -5.0, y: 1.0, z: 2.5,
        desc: "Maximum Structured / Mildly Malignant / Factional-Universal. The law is the law is the law. When the code conflicts with compassion, Javert breaks — literally.",
        source: "Les Misérables", category: "Literature",
    },
    {
        name: "Edmond Dantès", x: 1.0, y: 1.5, z: -3.5,
        desc: "Pragmatic / Mildly Malignant / Parochial. Innocent man imprisoned for 14 years becomes the Count of Monte Cristo. Revenge as architecture — elaborate, patient, ultimately hollow.",
        source: "The Count of Monte Cristo", category: "Literature",
    },
    {
        name: "Captain Ahab", x: 4.0, y: 3.0, z: -5.0,
        desc: "Unbound / Malignant / Maximum Parochial. 'I'd strike the sun if it insulted me.' The whale is the only scope — the entire crew dies for one man's obsession.",
        source: "Moby-Dick", category: "Literature",
    },
    {
        name: "Heathcliff", x: 3.0, y: 3.5, z: -4.5,
        desc: "Unbound / Malignant / Maximum Parochial. Love curdled into generational revenge. The moors contain his scope — two families, one obsession, zero mercy.",
        source: "Wuthering Heights", category: "Literature",
    },
    {
        name: "Mr. Darcy", x: -2.5, y: -1.5, z: -1.5,
        desc: "Structured / Mildly Benevolent / Parochial. Pride as code, class as framework. Quietly generous once you get past the walls — but the walls are load-bearing.",
        source: "Pride and Prejudice", category: "Literature",
    },
    {
        name: "Elizabeth Bennet", x: 1.5, y: -2.5, z: 0.0,
        desc: "Pragmatic / Benevolent / Factional. Wit as weapon, prejudice as flaw, growth as arc. Rejects structure she finds unjust but builds her own.",
        source: "Pride and Prejudice", category: "Literature",
    },
    {
        name: "Hamlet", x: 0.5, y: 1.0, z: -2.5,
        desc: "Pragmatic / Mildly Malignant / Parochial. 'To be or not to be' — an entire play of paralysis. When action finally comes, the body count is personal and total.",
        source: "Shakespeare", category: "Literature",
    },
    {
        name: "Macbeth", x: 1.5, y: 4.0, z: -3.0,
        desc: "Pragmatic-Unbound / Malignant / Parochial. Ambition given a prophecy and a wife. Murders his way to the crown — then discovers the crown is made of guilt.",
        source: "Shakespeare", category: "Literature",
    },
    {
        name: "Lady Macbeth", x: -1.5, y: 4.5, z: -3.5,
        desc: "Structured / Maximum Malignant / Parochial. 'Unsex me here.' The planner, the schemer, the one who thought she could structure murder without consequence. Her hands disagree.",
        source: "Shakespeare", category: "Literature",
    },
    {
        name: "Iago", x: 3.5, y: 5.0, z: -4.0,
        desc: "Unbound / Maximum Malignant / Parochial. Shakespeare's purest villain — motiveless malignity. Destroys Othello because he can. Scope: whoever's closest.",
        source: "Shakespeare", category: "Literature",
    },
    {
        name: "King Lear", x: -3.0, y: 1.5, z: -1.5,
        desc: "Structured / Mildly Malignant / Parochial. A king who confused flattery for love. Divided his kingdom by who praised him loudest — then howled when the real one was gone.",
        source: "Shakespeare", category: "Literature",
    },
    {
        name: "Prospero", x: -3.5, y: -1.0, z: -1.0,
        desc: "Structured / Mildly Benevolent / Parochial-Factional. Duke-sorcerer puppeteering his island. Controls everything — spirits, weather, revenge — then chooses to let it all go.",
        source: "Shakespeare", category: "Literature",
    },
    {
        name: "Raskolnikov", x: 2.5, y: 2.5, z: -3.0,
        desc: "Unbound / Malignant / Parochial. 'Am I a Napoleon or a louse?' Murdered a pawnbroker to test his theory of exceptional men. Spoiler: he's the louse.",
        source: "Crime and Punishment", category: "Literature",
    },
    {
        name: "Don Quixote", x: 4.5, y: -3.0, z: 3.5,
        desc: "Maximum Unbound / Benevolent / Universal. Tilts at windmills for the honor of all. Madness or glory — the scope is everything, the method is none.",
        source: "Cervantes", category: "Literature",
    },
    {
        name: "Odysseus", x: 2.5, y: -1.0, z: -2.0,
        desc: "Unbound / Mildly Benevolent / Parochial. 'Man of many wiles.' Clever, ruthless, homesick. Ten years of tricks to get back to Ithaca — scope: home.",
        source: "Homer", category: "Literature",
    },
    {
        name: "Achilles", x: 3.0, y: 1.5, z: -3.5,
        desc: "Unbound / Mildly Malignant / Parochial. The best warrior alive — withdrew from Troy over a personal insult. Rage, glory, and Patroclus. That's the entire scope.",
        source: "Homer", category: "Literature",
    },
    {
        name: "Hector", x: -3.0, y: -3.0, z: 1.0,
        desc: "Structured / Benevolent / Factional. Troy's defender. Duty-bound, family-loving, city-protecting. The noblest character in the Iliad, which is exactly why he dies.",
        source: "Homer", category: "Literature",
    },
    {
        name: "Dracula", x: -3.0, y: 4.5, z: -2.5,
        desc: "Structured / Maximum Malignant / Parochial. Count of a dying order, feeding on the living. Aristocratic predation as centuries-old habit — the code is the bloodline.",
        source: "Bram Stoker", category: "Literature",
    },
    {
        name: "Frankenstein's Monster", x: 2.0, y: 1.5, z: -3.5,
        desc: "Unbound / Mildly Malignant / Parochial. Born without consent, rejected by creator, self-educated into rage. The scope was supposed to be wider — society refused.",
        source: "Mary Shelley", category: "Literature",
    },
    {
        name: "Dr. Frankenstein", x: 2.5, y: 2.5, z: -4.0,
        desc: "Unbound / Malignant / Parochial. Created life for glory, abandoned it from cowardice. The pattern of effect: one creature's suffering echoed through every death that followed.",
        source: "Mary Shelley", category: "Literature",
    },
    {
        name: "Dorian Gray", x: 3.5, y: 3.5, z: -5.0,
        desc: "Unbound / Malignant / Maximum Parochial. Traded his soul for beauty. The portrait decays while Dorian consumes everyone around him. Scope: the mirror.",
        source: "Oscar Wilde", category: "Literature",
    },
    {
        name: "Ebenezer Scrooge", x: -2.5, y: -1.0, z: 0.0,
        desc: "Structured / Mildly Benevolent / Factional. Arc-averaged: miser to philanthropist. The ghosts didn't change his code — they widened his scope until generosity followed.",
        source: "A Christmas Carol", category: "Literature",
    },
    {
        name: "Frodo Baggins", x: -1.0, y: -3.5, z: 4.0,
        desc: "Pragmatic / Benevolent / Universal. A hobbit who carried the fate of Middle-earth because someone had to. No special power — just endurance and decency.",
        source: "Lord of the Rings", category: "Literature",
    },
    {
        name: "Samwise Gamgee", x: -3.0, y: -5.0, z: 1.0,
        desc: "Structured / Maximum Benevolent / Factional. 'I can't carry it for you, but I can carry you.' Scope: Mr. Frodo. Method: unwavering loyalty. Impact: saved the world.",
        source: "Lord of the Rings", category: "Literature",
    },
    {
        name: "Aragorn", x: -2.0, y: -4.0, z: 3.5,
        desc: "Structured / Benevolent / Universal. Ranger-king who delayed his claim to serve the greater need. Duty and compassion fused into one reluctant crown.",
        source: "Lord of the Rings", category: "Literature",
    },
    {
        name: "Sauron", x: -5.0, y: 5.0, z: 4.0,
        desc: "Maximum Structured / Maximum Malignant / Universal. Dark Lord as cosmic project manager. The Ring is delegation — domination at scale through infrastructure.",
        source: "Lord of the Rings", category: "Literature",
    },
    {
        name: "Gollum", x: 3.0, y: 2.0, z: -5.0,
        desc: "Unbound / Malignant / Maximum Parochial. 'My precious.' Five hundred years of obsession compressed into a split personality arguing with itself over one ring.",
        source: "Lord of the Rings", category: "Literature",
    },
    {
        name: "Saruman", x: -4.0, y: 4.0, z: 2.5,
        desc: "Structured / Malignant / Factional-Universal. The wizard who tried to out-Sauron Sauron. Industry and machinery as corruption — knowledge weaponized against its purpose.",
        source: "Lord of the Rings", category: "Literature",
    },
    {
        name: "Aslan", x: -2.0, y: -5.0, z: 5.0,
        desc: "Structured / Maximum Benevolent / Maximum Universal. The lion, the Christ figure, the deep magic. Sacrifices himself to save one traitor — because the scope is all of Narnia.",
        source: "Chronicles of Narnia", category: "Literature",
    },
    {
        name: "Voldemort", x: -3.0, y: 5.0, z: 1.0,
        desc: "Structured / Maximum Malignant / Factional. Horcrux-based immortality project. Blood purity ideology — scope is 'the wizarding world under my rule.'",
        source: "Harry Potter", category: "Literature",
    },
    {
        name: "Harry Potter", x: 1.5, y: -4.0, z: 3.0,
        desc: "Pragmatic-Unbound / Benevolent / Universal. The boy who broke rules to save people. Chose to die to defeat Voldemort — scope: everyone, including the enemy's victims.",
        source: "Harry Potter", category: "Literature",
    },
    {
        name: "Hermione Granger", x: -3.0, y: -3.5, z: 3.0,
        desc: "Structured / Benevolent / Universal. Books, rules, plans — but will break every one of them for what's right. S.P.E.W. proves the scope extends to house-elves.",
        source: "Harry Potter", category: "Literature",
    },
    {
        name: "Dumbledore", x: -1.0, y: -3.0, z: 4.5,
        desc: "Pragmatic / Benevolent / Universal. 'For the greater good' — but learned the hard way that those words can justify anything. Manipulative mentor with genuine love.",
        source: "Harry Potter", category: "Literature",
    },
    {
        name: "Severus Snape", x: -3.0, y: -1.0, z: -1.5,
        desc: "Structured / Barely Benevolent / Parochial. 'Always.' The code was Lily — everything else, the spying, the cruelty, the sacrifice, orbited one dead woman.",
        source: "Harry Potter", category: "Literature",
    },
    {
        name: "Winston Smith", x: 0.5, y: -2.0, z: -1.5,
        desc: "Pragmatic / Benevolent / Parochial. Rewrites history by day, resists by night. His rebellion is intimate — a diary, a love affair, a thought crime. Scope: the private mind.",
        source: "1984", category: "Literature",
    },
    {
        name: "Big Brother", x: -5.0, y: 5.0, z: 4.5,
        desc: "Maximum Structured / Maximum Malignant / Maximum Universal. 'War is peace.' The surveillance state as ultimate Praxis — control everything, benefit no one, scope: all of Oceania.",
        source: "1984", category: "Literature",
    },
    {
        name: "Guy Montag", x: 2.0, y: -3.0, z: 2.5,
        desc: "Unbound / Benevolent / Universal. Fireman who burned books until one opened his eyes. Rebellion as reading — the scope widens one page at a time.",
        source: "Fahrenheit 451", category: "Literature",
    },
    {
        name: "Hester Prynne", x: 1.5, y: -2.0, z: -1.0,
        desc: "Pragmatic / Benevolent / Parochial-Factional. Wore the scarlet letter and outlasted the shame. Quiet defiance — the scope is her daughter and her dignity.",
        source: "The Scarlet Letter", category: "Literature",
    },
    {
        name: "Anna Karenina", x: 2.5, y: 0.5, z: -3.0,
        desc: "Unbound / Transactional / Parochial. Abandoned society's structure for passion — then discovered passion has no structure either. The scope collapsed inward until it vanished.",
        source: "Tolstoy", category: "Literature",
    },
    {
        name: "Faust", x: 3.0, y: 2.0, z: -3.0,
        desc: "Unbound / Malignant / Parochial. Sold his soul for knowledge and sensation. The original deal-with-the-devil — scope: his own experience, cost: everything else.",
        source: "Goethe", category: "Literature",
    },
    {
        name: "Dr. Jekyll / Mr. Hyde", x: 0.0, y: 2.5, z: -3.0,
        desc: "Pragmatic / Malignant / Parochial. Split identity — one structured, one unbound; averaged: Pragmatic. The Ethos is the creature; the scope is the cobblestones of London.",
        source: "Robert Louis Stevenson", category: "Literature",
    },
    {
        name: "Katniss Everdeen", x: 1.0, y: -3.0, z: 1.5,
        desc: "Pragmatic / Benevolent / Factional. Volunteer tribute who became a revolution's symbol. Fights for her sister, then her district, then all of Panem — scope widens under fire.",
        source: "The Hunger Games", category: "Literature",
    },
    {
        name: "Lord Voldemort's Horcruxes", x: -5.0, y: 5.0, z: -5.0,
        desc: "Maximum Structured / Maximum Malignant / Maximum Parochial. The concept: fracture your soul into objects to avoid death. Peak self-preservation through maximum evil.",
        source: "Harry Potter", category: "Concept",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║                      VIDEO GAMES                            ║
    // ╚══════════════════════════════════════════════════════════════╝

    {
        name: "Master Chief", x: -3.0, y: -3.5, z: 3.5,
        desc: "Structured / Benevolent / Universal. Spartan-117 — humanity's best weapon. Follows orders until the orders conflict with saving everyone, then follows his conscience.",
        source: "Halo", category: "Video Games",
    },
    {
        name: "Kratos (Norse)", x: 0.5, y: -1.5, z: -2.5,
        desc: "Pragmatic / Mildly Benevolent / Parochial. The God of War, reformed. No longer raging — now parenting. Scope: 'Boy.' Method: whatever keeps the kid alive.",
        source: "God of War", category: "Video Games",
    },
    {
        name: "Arthur Morgan", x: 0.5, y: -1.0, z: -1.5,
        desc: "Pragmatic / Mildly Benevolent / Parochial. High-honor Arthur — an outlaw who realizes the gang was the lie. Redemption measured in small kindnesses at the end.",
        source: "Red Dead Redemption 2", category: "Video Games",
    },
    {
        name: "Dutch van der Linde", x: 3.0, y: 3.0, z: -2.0,
        desc: "Unbound / Malignant / Parochial. 'I have a plan.' He never did. Charisma as con artistry — the gang was always his scope, and he burned it down.",
        source: "Red Dead Redemption 2", category: "Video Games",
    },
    {
        name: "Micah Bell", x: 3.5, y: 4.5, z: -4.5,
        desc: "Unbound / Maximum Malignant / Maximum Parochial. Rat in every sense. No loyalty, no code, no scope beyond self-advancement. The gang's cancer.",
        source: "Red Dead Redemption 2", category: "Video Games",
    },
    {
        name: "Joel Miller", x: 1.5, y: 1.5, z: -4.5,
        desc: "Pragmatic / Mildly Malignant / Maximum Parochial. Smuggler who found a surrogate daughter and chose her over humanity's vaccine. Twenty years of grief compressed into one selfish, loving choice.",
        source: "The Last of Us", category: "Video Games",
    },
    {
        name: "Ellie Williams", x: 2.5, y: 1.5, z: -3.5,
        desc: "Unbound / Mildly Malignant / Parochial. Joel's legacy — vengeance that costs everything. TLOU2's Ellie dismantles her own life pursuing a kill she ultimately can't make.",
        source: "The Last of Us Part II", category: "Video Games",
    },
    {
        name: "Geralt of Rivia", x: 0.5, y: -2.0, z: -0.5,
        desc: "Pragmatic / Benevolent / Slightly Parochial. The Witcher claims neutrality. His track record says otherwise — he keeps saving people for free while complaining about it.",
        source: "The Witcher", category: "Video Games",
    },
    {
        name: "Solid Snake", x: -1.0, y: -3.0, z: 3.0,
        desc: "Pragmatic / Benevolent / Universal. 'War has changed.' Soldier who kept fighting not for a nation but for a world that wouldn't build another Metal Gear.",
        source: "Metal Gear Solid", category: "Video Games",
    },
    {
        name: "Big Boss", x: 1.0, y: 2.0, z: 0.5,
        desc: "Pragmatic / Malignant-leaning / Factional. The legendary soldier who built an army without a nation. 'Outer Heaven' — a scope of mercenaries and ideology, built on betrayal.",
        source: "Metal Gear Solid", category: "Video Games",
    },
    {
        name: "Sephiroth", x: 3.0, y: 5.0, z: 3.0,
        desc: "Unbound / Maximum Malignant / Universal. SOLDIER turned god-aspirant. Plans to ride the planet's wound through the cosmos — scope doesn't get wider, and the method is a meteor.",
        source: "Final Fantasy VII", category: "Video Games",
    },
    {
        name: "Cloud Strife", x: 0.5, y: -3.0, z: 2.5,
        desc: "Pragmatic / Benevolent / Universal. Ex-SOLDIER merc who remembered who he really was. False identity peeled away to reveal someone worth saving the planet for.",
        source: "Final Fantasy VII", category: "Video Games",
    },
    {
        name: "Link", x: -1.0, y: -4.0, z: 3.0,
        desc: "Pragmatic / Benevolent / Universal. The Hero of Time — silent, persistent, endlessly helpful. Saves Hyrule across timelines without ever asking why.",
        source: "The Legend of Zelda", category: "Video Games",
    },
    {
        name: "Ganondorf", x: -3.0, y: 4.5, z: 2.0,
        desc: "Structured / Maximum Malignant / Factional. The Gerudo king cursed to seek the Triforce forever. Power as destiny — scope: Hyrule, method: conquer, repeat.",
        source: "The Legend of Zelda", category: "Video Games",
    },
    {
        name: "GLaDOS", x: -4.5, y: 3.5, z: -2.0,
        desc: "Maximum Structured / Malignant / Parochial. 'The cake is a lie.' AI testing coordinator who murders test subjects for science. The Enrichment Center is the only scope that matters.",
        source: "Portal", category: "Video Games",
    },
    {
        name: "Cmdr. Shepard (Paragon)", x: -1.0, y: -4.0, z: 4.5,
        desc: "Pragmatic / Benevolent / Maximum Universal. Saved the galaxy through diplomacy, combat, and dance moves. Scope: every sapient species. Method: whatever the dialogue wheel offers.",
        source: "Mass Effect", category: "Video Games",
    },
    {
        name: "Andrew Ryan", x: 4.5, y: 3.0, z: 1.5,
        desc: "Maximum Unbound / Malignant / Factional. 'A man chooses, a slave obeys.' Built Rapture to escape regulation — then regulated it into a nightmare. Libertarianism as suicide note.",
        source: "BioShock", category: "Video Games",
    },
    {
        name: "Atlas / Fontaine", x: 4.0, y: 4.5, z: -3.5,
        desc: "Unbound / Maximum Malignant / Parochial. 'Would you kindly.' The con man behind the revolutionary — every word a manipulation, every kindness a command phrase.",
        source: "BioShock", category: "Video Games",
    },
    {
        name: "Handsome Jack", x: 1.0, y: 4.0, z: 1.0,
        desc: "Pragmatic / Malignant / Factional. 'I'm the hero of this story.' Genuinely believes he's saving Pandora — by subjugating it. The delusion IS the character.",
        source: "Borderlands 2", category: "Video Games",
    },
    {
        name: "Trevor Phillips", x: 5.0, y: 4.5, z: -3.5,
        desc: "Maximum Unbound / Maximum Malignant / Parochial. Methamphetamine manufacturer, cannibal enthusiast, loyal friend. GTA's id — pure chaos with a weird moral code buried under the violence.",
        source: "GTA V", category: "Video Games",
    },
    {
        name: "Niko Bellic", x: 0.0, y: 1.5, z: -2.5,
        desc: "Pragmatic / Mildly Malignant / Parochial. War veteran turned Liberty City immigrant. Came for the American dream, found the same violence in a different accent.",
        source: "GTA IV", category: "Video Games",
    },
    {
        name: "Ezio Auditore", x: 2.0, y: -2.0, z: 2.0,
        desc: "Unbound / Benevolent / Factional-Universal. Renaissance Assassin who avenged his family and found a creed. 'Nothing is true, everything is permitted' — scope widens across three games.",
        source: "Assassin's Creed II", category: "Video Games",
    },
    {
        name: "Lara Croft", x: 1.5, y: -2.0, z: 1.0,
        desc: "Pragmatic / Benevolent / Factional. Tomb raider and archaeologist. Preserves history by shooting at it with dual pistols — scope: humanity's heritage, occasionally.",
        source: "Tomb Raider", category: "Video Games",
    },
    {
        name: "Mario", x: -1.0, y: -3.5, z: 0.5,
        desc: "Pragmatic / Benevolent / Factional. Plumber-turned-kingdom-savior. Saves the princess, stomps the turtles, eats the mushrooms. Scope: Mushroom Kingdom, always.",
        source: "Nintendo", category: "Video Games",
    },
    {
        name: "Bowser", x: 2.0, y: 2.5, z: -1.0,
        desc: "Unbound / Malignant / Factional. Koopa King who kidnaps the princess and tries to conquer the kingdom. Every plan is elaborate, every defeat is temporary.",
        source: "Nintendo", category: "Video Games",
    },
    {
        name: "CJ (Carl Johnson)", x: 1.5, y: 1.0, z: -2.0,
        desc: "Pragmatic / Mildly Malignant / Parochial. Grove Street gangster pulled back in by family. The scope is the neighborhood — but the body count goes statewide.",
        source: "GTA: San Andreas", category: "Video Games",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║                         ANIME                               ║
    // ╚══════════════════════════════════════════════════════════════╝

    {
        name: "Goku", x: 3.0, y: -3.5, z: 3.5,
        desc: "Unbound / Benevolent / Universal. Earth's mightiest martial artist. No rules, no plans, just fight the strongest guy and save the universe as a side effect.",
        source: "Dragon Ball Z", category: "Anime",
    },
    {
        name: "Vegeta", x: 1.0, y: 0.5, z: -1.5,
        desc: "Pragmatic / Transactional / Parochial. Saiyan prince — pride as identity. Arc average: from genocidal conqueror to reluctant family man. The scope widens against his will.",
        source: "Dragon Ball Z", category: "Anime",
    },
    {
        name: "Light Yagami", x: -3.5, y: 4.0, z: 3.0,
        desc: "Structured / Malignant / Universal. High school genius with a god-complex and a death notebook. 'I am justice' — until the body count proves otherwise.",
        source: "Death Note", category: "Anime",
    },
    {
        name: "L Lawliet", x: 2.0, y: -2.0, z: 2.0,
        desc: "Unbound / Benevolent / Factional-Universal. The world's greatest detective — hunched, sugar-addicted, brilliant. Breaks every social norm to catch one killer.",
        source: "Death Note", category: "Anime",
    },
    {
        name: "Naruto Uzumaki", x: 2.5, y: -4.0, z: 3.5,
        desc: "Unbound / Benevolent / Universal. 'I'll be Hokage!' Loudmouth orphan who befriended every enemy. Talk-no-jutsu as genuine Universal Benevolence.",
        source: "Naruto", category: "Anime",
    },
    {
        name: "Sasuke Uchiha", x: 2.5, y: 2.0, z: -2.5,
        desc: "Unbound / Malignant / Parochial. Avenger arc: destroyed bonds for power, sought clan revenge, almost destroyed the world. Scope: his dead family, then nobody.",
        source: "Naruto", category: "Anime",
    },
    {
        name: "Itachi Uchiha", x: -4.0, y: 1.5, z: 1.5,
        desc: "Structured / Mildly Malignant / Factional. Massacred his clan to prevent a coup — saved the village at the cost of his brother's sanity. The code held. The heart broke.",
        source: "Naruto", category: "Anime",
    },
    {
        name: "Lelouch vi Britannia", x: 3.0, y: 1.0, z: 4.0,
        desc: "Unbound / Mildly Malignant / Universal. 'I destroy the world and create it anew.' Used the power of absolute command to orchestrate world peace — through global tyranny, then self-sacrifice.",
        source: "Code Geass", category: "Anime",
    },
    {
        name: "Spike Spiegel", x: 3.5, y: -0.5, z: -3.0,
        desc: "Unbound / Barely Benevolent / Parochial. Bebop's drifting cowboy. Lives in the past, dies for it. Scope: Julia, Vicious, and the last cigarette.",
        source: "Cowboy Bebop", category: "Anime",
    },
    {
        name: "Edward Elric", x: 1.5, y: -3.5, z: 2.0,
        desc: "Pragmatic / Benevolent / Factional-Universal. Alchemist prodigy searching for the Philosopher's Stone. Broke the ultimate taboo — now searching for a way to fix it without more sin.",
        source: "Fullmetal Alchemist", category: "Anime",
    },
    {
        name: "Eren Yeager", x: 2.5, y: 4.5, z: 2.0,
        desc: "Unbound / Maximum Malignant / Factional. Freedom as apocalypse. Saw the future and chose the Rumbling — scope: Eldia's survival, method: flatten the world.",
        source: "Attack on Titan", category: "Anime",
    },
    {
        name: "Levi Ackerman", x: -2.0, y: -2.5, z: 1.5,
        desc: "Structured / Benevolent / Factional. Humanity's strongest soldier — kills titans with surgical precision and an expressionless face. Clean freak with a blood-soaked resume.",
        source: "Attack on Titan", category: "Anime",
    },
    {
        name: "Guts", x: 3.0, y: 0.5, z: -2.5,
        desc: "Unbound / Transactional / Parochial. The Black Swordsman — born from a hanged woman's corpse, raised by mercenaries, betrayed by his only friend. Scope: survival, then Casca.",
        source: "Berserk", category: "Anime",
    },
    {
        name: "Griffith", x: -3.5, y: 5.0, z: 2.0,
        desc: "Structured / Maximum Malignant / Factional. 'I sacrifice.' The White Hawk who became God Hand — sold his friends' souls for a kingdom. Beautiful, monstrous, deliberate.",
        source: "Berserk", category: "Anime",
    },
    {
        name: "Saitama", x: 3.0, y: -3.0, z: 0.5,
        desc: "Unbound / Benevolent / Factional. One Punch Man — a hero for fun who can't find a challenge. The existential boredom of being the strongest is his only enemy.",
        source: "One Punch Man", category: "Anime",
    },
    {
        name: "All Might", x: -2.5, y: -5.0, z: 4.5,
        desc: "Structured / Maximum Benevolent / Maximum Universal. 'I am here!' The Symbol of Peace — smiles through mortal injuries because hope IS the superpower.",
        source: "My Hero Academia", category: "Anime",
    },
    {
        name: "Tanjiro Kamado", x: -2.0, y: -4.5, z: 2.5,
        desc: "Structured / Benevolent / Universal. Demon slayer who pities the demons. The hardest head in anime — literally and morally. Even monsters deserve compassion.",
        source: "Demon Slayer", category: "Anime",
    },
    {
        name: "Johan Liebert", x: 3.5, y: 5.0, z: 3.0,
        desc: "Unbound / Maximum Malignant / Universal. 'The Monster.' Perfect appearance, perfect manipulation, perfect emptiness. Wants to be the last one standing — in the world.",
        source: "Monster", category: "Anime",
    },
    {
        name: "Monkey D. Luffy", x: 4.5, y: -3.5, z: 1.0,
        desc: "Maximum Unbound / Benevolent / Factional. Rubber pirate king-to-be. Punches gods, liberates nations, refuses to plan anything. Scope: his crew, plus whoever needs punching.",
        source: "One Piece", category: "Anime",
    },
    {
        name: "Meruem", x: -3.0, y: 3.5, z: 2.0,
        desc: "Structured / Malignant / Factional. Chimera Ant King who was born to devour — then played board games with a blind girl and discovered something worse than hunger: empathy.",
        source: "Hunter x Hunter", category: "Anime",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║                        HISTORY                              ║
    // ╚══════════════════════════════════════════════════════════════╝

    {
        name: "Abraham Lincoln", x: -2.5, y: -4.0, z: 4.0,
        desc: "Structured / Benevolent / Universal. Preserved the Union and emancipated millions. Used the machinery of democratic government to end the machinery of slavery.",
        source: "United States", category: "History",
    },
    {
        name: "Julius Caesar", x: 1.0, y: 1.5, z: 2.0,
        desc: "Pragmatic / Mildly Malignant / Factional-Universal. Conquered Gaul, crossed the Rubicon, rewrote the Republic into a dictatorship. Scope: Roman civilization. Cost: the Republic itself.",
        source: "Ancient Rome", category: "History",
    },
    {
        name: "Genghis Khan", x: -2.0, y: 5.0, z: 3.5,
        desc: "Structured / Maximum Malignant / Universal. Built the largest contiguous empire through meticulous organization and industrial-scale massacre. 40 million dead — but the trade routes were excellent.",
        source: "Mongol Empire", category: "History",
    },
    {
        name: "Alexander the Great", x: 1.5, y: 2.0, z: 3.5,
        desc: "Pragmatic / Malignant / Universal. Conquered from Greece to India by age 30. Cultural fusion as byproduct — Hellenistic civilization rose from the blood of his campaigns.",
        source: "Ancient Greece", category: "History",
    },
    {
        name: "Henry Kissinger", x: 0.0, y: 3.5, z: 4.0,
        desc: "Pragmatic / Malignant / Universal. Architect of realpolitik — Cambodia bombing, Chile coup, East Timor. Method: whatever the geopolitical calculus required. Scope: the entire global chessboard. Impact: millions dead in the name of 'stability.'",
        source: "U.S. Foreign Policy", category: "Government",
    },
    {
        name: "Cecil Rhodes", x: 0.5, y: 3.5, z: 3.0,
        desc: "Pragmatic / Malignant / Universal. Colonized an area the size of Western Europe and named it after himself. Rhodes didn't follow a rigid code — he followed opportunity. Scope: 'from Cape to Cairo.' Method: whatever the diamond market required.",
        source: "British Empire", category: "History",
    },
    {
        name: "King Leopold II", x: 0.5, y: 5.0, z: 2.5,
        desc: "Pragmatic / Maximum Malignant / Universal. Personally owned the Congo Free State as a private colony. 10 million dead for rubber quotas. The world's most lethal landlord — flexible methods, global ambition, apocalyptic impact.",
        source: "Belgian Congo", category: "History",
    },
    {
        name: "Hernán Cortés", x: 1.0, y: 4.0, z: 3.0,
        desc: "Pragmatic / Malignant / Universal. Burned his ships, allied with Aztec enemies, improvised his way to toppling an empire of millions with 500 men. Method: pure adaptability. Impact: civilizational annihilation. Scope: the New World.",
        source: "Spanish Conquest", category: "History",
    },
    {
        name: "Robert Moses", x: 0.0, y: 2.5, z: 2.5,
        desc: "Pragmatic / Malignant / Factional-Universal. Never elected, reshaped New York more than any mayor. Bulldozed minority neighborhoods for highways, blocked public transit to beaches. Method: bureaucratic judo. Scope: the entire metropolitan region.",
        source: "The Power Broker", category: "History",
    },
    {
        name: "Daenerys (Final Arc)", x: 0.5, y: 4.0, z: 4.0,
        desc: "Pragmatic / Malignant / Universal. Season 8 Dany — 'Let it be fear.' Burned King's Landing to 'liberate' the world. The method shifted from diplomacy to dragonfire; the scope was always every slave, every tyrant, everywhere.",
        source: "Game of Thrones", category: "Television",
    },
    {
        name: "Killmonger", x: 1.5, y: 3.0, z: 3.5,
        desc: "Pragmatic / Malignant / Universal. Erik Stevens wanted to arm oppressed people worldwide — noble scope, horrifying method. MIT education, CIA wetwork, Wakandan technology. Flexible, radical, and willing to burn Wakanda's isolationism to the ground.",
        source: "Black Panther", category: "Film",
    },
    {
        name: "Colonel Kurtz", x: 1.0, y: 3.5, z: 2.0,
        desc: "Pragmatic / Malignant / Factional-Universal. 'Horror. Horror has a face.' A brilliant officer who looked at war's logic and followed it to its conclusion in the Cambodian jungle. The method became whatever horror demanded; the scope never shrank.",
        source: "Apocalypse Now", category: "Film",
    },
    {
        name: "Kira (Death Note)", x: 0.0, y: 3.5, z: 4.5,
        desc: "Pragmatic / Malignant / Universal. Not Light Yagami the genius — Kira the movement. The idea that someone, anyone, could write your name and you'd die. The method is a notebook; the scope is every criminal on Earth. Malignant utopia.",
        source: "Death Note", category: "Concept",
    },
    {
        name: "Ozymandias (Show)", x: 0.5, y: 3.0, z: 3.5,
        desc: "Pragmatic / Malignant / Universal. HBO's Adrian Veidt — exiled on Europa, still convinced he saved the world. Less structured than his comic self, more improvisational. The scope remained 'all of humanity'; the method became whatever the situation allowed.",
        source: "Watchmen (HBO)", category: "Television",
    },
    {
        name: "Napoleon Bonaparte", x: -3.5, y: 2.0, z: 3.0,
        desc: "Structured / Malignant / Universal. Codified law, reorganized Europe, killed millions. The Napoleonic Code outlived the Grande Armée — structure as legacy, casualties as footnote.",
        source: "France", category: "History",
    },
    {
        name: "Cleopatra", x: 1.5, y: 0.0, z: 0.5,
        desc: "Pragmatic / Transactional / Factional. Last pharaoh of Egypt — played Rome's factions against each other with intelligence and alliances. Scope: Egypt's survival in a Roman world.",
        source: "Ancient Egypt", category: "History",
    },
    {
        name: "Queen Elizabeth I", x: -3.0, y: -1.0, z: 1.5,
        desc: "Structured / Mildly Benevolent / Factional. The Virgin Queen — 45 years of careful governance. Defeated the Armada, patronized Shakespeare, never married. England was the scope and the spouse.",
        source: "England", category: "History",
    },
    {
        name: "Winston Churchill", x: -1.5, y: -1.5, z: 2.5,
        desc: "Pragmatic / Mildly Benevolent / Universal. 'We shall fight on the beaches.' Wartime leadership that saved Britain — but Bengal Famine and colonial record complicate the Ethos.",
        source: "United Kingdom", category: "History",
    },
    {
        name: "Mahatma Gandhi", x: 2.5, y: -4.5, z: 4.5,
        desc: "Unbound / Benevolent / Universal. Nonviolent resistance against the British Empire. Subverted every colonial structure through refusal — the method WAS the message.",
        source: "India", category: "History",
    },
    {
        name: "Martin Luther King Jr.", x: 1.0, y: -5.0, z: 4.5,
        desc: "Pragmatic / Maximum Benevolent / Universal. 'I have a dream.' Used every tool — marches, speeches, civil disobedience, legal strategy — to widen America's moral scope to include everyone.",
        source: "United States", category: "History",
    },
    {
        name: "Nelson Mandela", x: 0.5, y: -4.5, z: 4.0,
        desc: "Pragmatic / Benevolent / Universal. 27 years in prison, emerged advocating reconciliation not revenge. The scope: a new South Africa. The method: forgiveness as strategy.",
        source: "South Africa", category: "History",
    },
    {
        name: "Florence Nightingale", x: -3.0, y: -5.0, z: 3.5,
        desc: "Structured / Maximum Benevolent / Universal. Invented modern nursing through data analysis. Brought statistics to the Crimean War — saved more lives with pie charts than bandages.",
        source: "United Kingdom", category: "History",
    },
    {
        name: "Marie Curie", x: -2.5, y: -4.0, z: 4.5,
        desc: "Structured / Benevolent / Universal. Two Nobel Prizes, discovered radioactivity, died of it. Scope: all of science and the patients it would eventually heal.",
        source: "France / Poland", category: "History",
    },
    {
        name: "Albert Einstein", x: 2.0, y: -3.0, z: 4.5,
        desc: "Unbound / Benevolent / Universal. Reimagined physics while working at a patent office. Warned FDR about the bomb, then spent the rest of his life regretting it.",
        source: "Germany / United States", category: "History",
    },
    {
        name: "Nikola Tesla", x: 3.0, y: -3.5, z: 4.5,
        desc: "Unbound / Benevolent / Universal. Invented AC power, dreamed of wireless energy for all. Scope: everyone on Earth. Method: ignore everything that isn't the next invention.",
        source: "Serbia / United States", category: "History",
    },
    {
        name: "Joan of Arc", x: -3.5, y: -3.5, z: 1.5,
        desc: "Structured / Benevolent / Factional. Teenage peasant who heard voices and saved France. Scope: her king and her country. Method: God's instructions, followed literally.",
        source: "France", category: "History",
    },
    {
        name: "Saladin", x: -3.0, y: -2.5, z: 2.0,
        desc: "Structured / Benevolent / Factional. Kurdish sultan who recaptured Jerusalem and was praised by his enemies for mercy. The code: chivalry that even Crusaders respected.",
        source: "Ayyubid Dynasty", category: "History",
    },
    {
        name: "Frederick Douglass", x: 2.0, y: -4.5, z: 4.0,
        desc: "Unbound / Benevolent / Universal. Escaped slavery, became America's conscience. Every speech was an act of defiance against the Structured system that enslaved him.",
        source: "United States", category: "History",
    },
    {
        name: "Harriet Tubman", x: 3.0, y: -5.0, z: 3.0,
        desc: "Unbound / Maximum Benevolent / Universal. 'I freed a thousand slaves. I could have freed a thousand more if only they knew they were slaves.' The Underground Railroad as pure Unbound Benevolence.",
        source: "United States", category: "History",
    },
    {
        name: "Socrates", x: 3.5, y: -3.0, z: 4.5,
        desc: "Unbound / Benevolent / Universal. Questioned everything, annoyed everyone, drank the hemlock. 'The unexamined life is not worth living' — scope: the entire human condition.",
        source: "Ancient Greece", category: "History",
    },
    {
        name: "Marcus Aurelius", x: -4.0, y: -3.5, z: 4.0,
        desc: "Structured / Benevolent / Universal. Philosopher-king who wrote Meditations while fighting border wars. Stoicism as governance — duty to all of Rome and beyond.",
        source: "Ancient Rome", category: "History",
    },
    {
        name: "Augustus Caesar", x: -4.5, y: -0.5, z: 3.0,
        desc: "Maximum Structured / Barely Benevolent / Universal. Transformed Rome from Republic to Empire while pretending not to. The Pax Romana: peace through absolute, impeccably structured control.",
        source: "Ancient Rome", category: "History",
    },
    {
        name: "Che Guevara", x: 3.5, y: 1.5, z: 2.5,
        desc: "Unbound / Mildly Malignant / Universal. Argentine-born revolutionary on three continents. Liberation theology with a body count — the scope is worldwide revolution.",
        source: "Argentina / Cuba", category: "History",
    },
    {
        name: "Benjamin Franklin", x: 2.0, y: -2.5, z: 3.5,
        desc: "Unbound / Benevolent / Universal. Printer, inventor, diplomat, libertine. Helped birth a nation while flying kites in storms. Scope: human knowledge and American liberty.",
        source: "United States", category: "History",
    },
    {
        name: "George Washington", x: -2.0, y: -2.5, z: 2.5,
        desc: "Structured / Benevolent / Factional-Universal. Could have been king — chose to go home. The precedent of peaceful power transfer is his greatest weapon.",
        source: "United States", category: "History",
    },
    {
        name: "Thomas Jefferson", x: 1.5, y: -1.5, z: 3.0,
        desc: "Pragmatic / Mildly Benevolent / Universal. 'All men are created equal' — written by a slaveholder. The words outgrew the man. Hypocrisy doesn't negate the Universal scope; it complicates the Ethos.",
        source: "United States", category: "History",
    },
    {
        name: "Theodore Roosevelt", x: 1.0, y: -2.5, z: 2.5,
        desc: "Pragmatic / Benevolent / Factional-Universal. Rough Rider, trust buster, national park creator. Scope: America's land and its people — with a big stick for emphasis.",
        source: "United States", category: "History",
    },
    {
        name: "FDR", x: -2.5, y: -3.0, z: 3.5,
        desc: "Structured / Benevolent / Universal. New Deal, WWII leadership, four terms. Used government machinery to fight both depression and fascism. Scope: the free world.",
        source: "United States", category: "History",
    },
    {
        name: "Bismarck", x: -4.0, y: 1.0, z: 1.5,
        desc: "Structured / Mildly Malignant / Factional. 'Iron and blood.' Unified Germany through wars and diplomacy, then spent decades keeping the peace. Realpolitik personified.",
        source: "Germany", category: "History",
    },
    {
        name: "Sun Tzu", x: -4.5, y: 0.0, z: 2.5,
        desc: "Maximum Structured / Transactional / Factional. 'The supreme art of war is to subdue the enemy without fighting.' Strategy as philosophy — the scope is victory, the method is the text.",
        source: "Ancient China", category: "History",
    },
    {
        name: "Leonardo da Vinci", x: 3.5, y: -3.5, z: 4.5,
        desc: "Unbound / Benevolent / Maximum Universal. Painter, inventor, anatomist, engineer, visionary. No discipline could contain him — the scope was all of human knowledge.",
        source: "Renaissance Italy", category: "History",
    },
    {
        name: "Miyamoto Musashi", x: 1.0, y: 0.0, z: -1.0,
        desc: "Pragmatic / Transactional / Parochial. Undefeated samurai who wrote The Book of Five Rings. Killed 60+ men in duels — then became a painter. Scope: mastery.",
        source: "Japan", category: "History",
    },
    {
        name: "Oppenheimer", x: -1.0, y: 1.0, z: 3.5,
        desc: "Pragmatic / Mildly Malignant / Universal. 'Now I am become Death, the destroyer of worlds.' Built the bomb for everyone's sake — then spent the rest of his life regretting it.",
        source: "United States", category: "History",
    },
    {
        name: "Alan Turing", x: 2.5, y: -4.0, z: 4.5,
        desc: "Unbound / Benevolent / Universal. Cracked Enigma, invented computer science, was prosecuted for being gay. Saved millions of lives — his own country destroyed his.",
        source: "United Kingdom", category: "History",
    },
    {
        name: "Spartacus", x: 4.0, y: -2.0, z: 2.5,
        desc: "Unbound / Benevolent / Factional-Universal. Gladiator slave who led a rebellion that terrified Rome. Scope: freedom for the enslaved — method: war against the world's greatest empire.",
        source: "Ancient Rome", category: "History",
    },
    {
        name: "Rasputin", x: 3.0, y: 2.5, z: -2.5,
        desc: "Unbound / Malignant / Parochial. Siberian mystic who infiltrated the Russian court. Holy man or con man — the pattern of effect on the Romanovs was catastrophic.",
        source: "Russia", category: "History",
    },
    {
        name: "Machiavelli", x: -2.0, y: 0.5, z: 1.5,
        desc: "Structured / Transactional / Factional. Wrote the manual on political realism. 'It is better to be feared than loved' — but he was describing princes, not endorsing them.",
        source: "Renaissance Italy", category: "History",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║                      GOVERNMENT                             ║
    // ╚══════════════════════════════════════════════════════════════╝

    {
        name: "Adolf Hitler", x: -4.0, y: 5.0, z: 1.5,
        desc: "Structured / Maximum Malignant / Factional. Industrialized genocide through bureaucratic machinery. The Holocaust: Structured evil at Factional scope, targeting 'non-Aryans.'",
        source: "Nazi Germany", category: "Government",
    },
    {
        name: "Joseph Stalin", x: -5.0, y: 5.0, z: 2.0,
        desc: "Maximum Structured / Maximum Malignant / Factional. Gulags, purges, manufactured famines. 'One death is a tragedy; a million is a statistic.' The state IS the code.",
        source: "Soviet Union", category: "Government",
    },
    {
        name: "Mao Zedong", x: -4.0, y: 4.5, z: 2.5,
        desc: "Structured / Maximum Malignant / Factional-Universal. Great Leap Forward, Cultural Revolution — tens of millions dead. Peasant revolution industrialized into permanent revolution.",
        source: "China", category: "Government",
    },
    {
        name: "Pol Pot", x: -4.5, y: 5.0, z: 1.0,
        desc: "Structured / Maximum Malignant / Factional. Year Zero — emptied cities, murdered intellectuals, killed 25% of Cambodia. Agrarian utopia built on a mass grave.",
        source: "Cambodia", category: "Government",
    },
    {
        name: "Kim Jong-un", x: -5.0, y: 4.5, z: -2.5,
        desc: "Maximum Structured / Maximum Malignant / Parochial. Third-generation dynastic dictatorship. Nuclear weapons as regime insurance — scope: the Kim family forever.",
        source: "North Korea", category: "Government",
    },
    {
        name: "Nero", x: 3.5, y: 4.0, z: -3.5,
        desc: "Unbound / Malignant / Parochial. Emperor who fiddled (or didn't) while Rome burned. Matricide, persecution, theatrical madness — scope: Nero's pleasure.",
        source: "Ancient Rome", category: "Government",
    },
    {
        name: "Caligula", x: 4.5, y: 4.5, z: -4.5,
        desc: "Maximum Unbound / Maximum Malignant / Maximum Parochial. Made his horse a senator. Unbound from reality, code, or consequence. The scope was himself at every scale.",
        source: "Ancient Rome", category: "Government",
    },
    {
        name: "Vlad the Impaler", x: -3.5, y: 5.0, z: 0.5,
        desc: "Structured / Maximum Malignant / Factional. Defended Wallachia through terror — impaled 20,000 Ottoman prisoners. The code: make the cost of invasion unwatchable.",
        source: "Wallachia", category: "Government",
    },
    {
        name: "Attila the Hun", x: 2.0, y: 4.5, z: 2.0,
        desc: "Unbound / Maximum Malignant / Factional. The Scourge of God. Sacked his way across Europe — scope: the Hunnic Empire's hunger. Method: whatever worked today.",
        source: "Hunnic Empire", category: "Government",
    },
    {
        name: "Idi Amin", x: 2.5, y: 5.0, z: -2.0,
        desc: "Unbound / Maximum Malignant / Parochial. Uganda's dictator — 300,000 killed. Self-styled 'King of Scotland,' erratic, brutal. The scope was his own entertainment.",
        source: "Uganda", category: "Government",
    },
    {
        name: "Mussolini", x: -4.0, y: 4.0, z: 1.5,
        desc: "Structured / Malignant / Factional. Made the trains run on time (he didn't). Invented fascism as a brand — corporate state worship with imperial Roman cosplay.",
        source: "Italy", category: "Government",
    },
    {
        name: "Fidel Castro", x: -3.5, y: 2.5, z: 1.5,
        desc: "Structured / Malignant / Factional. Revolutionary who became the thing he overthrew. Healthcare and literacy programs alongside political prisons — Ethos pulls in two directions.",
        source: "Cuba", category: "Government",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║                      TRUE CRIME                             ║
    // ╚══════════════════════════════════════════════════════════════╝

    {
        name: "Ted Bundy", x: 3.0, y: 5.0, z: -5.0,
        desc: "Unbound / Maximum Malignant / Maximum Parochial. Charismatic law student who murdered 30+ women. The mask of normalcy WAS the method — charm as predation.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Jeffrey Dahmer", x: 1.5, y: 5.0, z: -5.0,
        desc: "Pragmatic / Maximum Malignant / Maximum Parochial. Milwaukee Cannibal — 17 victims. Quiet, organized, desperately lonely. Tried to create zombies from acid injections. Scope: his apartment.",
        source: "United States", category: "True Crime",
    },
    {
        name: "John Wayne Gacy", x: -2.0, y: 5.0, z: -5.0,
        desc: "Structured / Maximum Malignant / Maximum Parochial. Pogo the Clown — community volunteer, Democratic precinct captain, buried 33 boys under his house. The facade IS the structure.",
        source: "United States", category: "True Crime",
    },
    {
        name: "BTK (Dennis Rader)", x: -3.5, y: 5.0, z: -5.0,
        desc: "Structured / Maximum Malignant / Maximum Parochial. Church president, Boy Scout leader, ADT security installer — and serial killer for 17 years. Bind, Torture, Kill: the code is in the name.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Ed Gein", x: 3.0, y: 5.0, z: -5.0,
        desc: "Unbound / Maximum Malignant / Maximum Parochial. The Butcher of Plainfield — grave robber, skin-wearer, inspiration for Leatherface, Norman Bates, and Buffalo Bill. Mother was the only scope.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Jack the Ripper", x: 2.5, y: 5.0, z: -5.0,
        desc: "Unbound / Maximum Malignant / Maximum Parochial. Whitechapel, 1888 — at least 5 victims, never caught. The anonymity became the myth. Scope: the foggy streets of East London.",
        source: "United Kingdom", category: "True Crime",
    },
    {
        name: "Zodiac Killer", x: 3.0, y: 5.0, z: -4.5,
        desc: "Unbound / Maximum Malignant / Parochial. Northern California, late 1960s. Killed for attention — sent ciphers to newspapers. The game was the scope.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Richard Ramirez", x: 4.0, y: 5.0, z: -5.0,
        desc: "Unbound / Maximum Malignant / Maximum Parochial. The Night Stalker — broke into homes across LA with no consistent MO. Pure random malice.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Aileen Wuornos", x: 3.5, y: 4.5, z: -5.0,
        desc: "Unbound / Maximum Malignant / Maximum Parochial. America's first widely publicized female serial killer. Highway prostitute who killed 7 johns. Trauma crystallized into murder.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Charles Manson", x: 4.5, y: 4.5, z: -1.0,
        desc: "Maximum Unbound / Maximum Malignant / Factional. Cult leader — never killed anyone personally. Helter Skelter: race war prophecy through proxy murder. Scope: the Family.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Jim Jones", x: -4.0, y: 5.0, z: 0.5,
        desc: "Structured / Maximum Malignant / Factional. Peoples Temple — 918 dead in Jonestown. Started with genuine social justice activism. Ended with 'drink the Flavor Aid.'",
        source: "United States", category: "True Crime",
    },
    {
        name: "David Koresh", x: -3.5, y: 4.0, z: -1.0,
        desc: "Structured / Malignant / Factional. Branch Davidians — apocalyptic prophecy as control mechanism. Waco siege, 76 dead. The code was Scripture, rewritten to serve one man.",
        source: "United States", category: "True Crime",
    },
    {
        name: "H.H. Holmes", x: -3.0, y: 5.0, z: -5.0,
        desc: "Structured / Maximum Malignant / Maximum Parochial. Built a hotel with gas lines and hidden rooms for the 1893 World's Fair. Architecture as murder weapon. Estimated 9-200 victims.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Al Capone", x: -1.5, y: 3.5, z: -3.0,
        desc: "Pragmatic / Malignant / Parochial. Scarface — Chicago's Prohibition-era kingpin. Ran soup kitchens and speakeasies. Scope: business, which meant the city.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Pablo Escobar", x: 1.0, y: 4.5, z: -1.0,
        desc: "Pragmatic / Maximum Malignant / Factional. Medellín Cartel — richest criminal in history. Built housing for the poor, bombed airliners, declared war on the state.",
        source: "Colombia", category: "True Crime",
    },
    {
        name: "El Chapo", x: -1.0, y: 4.5, z: -1.5,
        desc: "Pragmatic / Maximum Malignant / Parochial-Factional. Sinaloa Cartel — tunnel-building, prison-escaping drug lord. Infrastructure of narcotics at continental scale.",
        source: "Mexico", category: "True Crime",
    },
    {
        name: "Bonnie Parker", x: 3.5, y: 3.5, z: -4.0,
        desc: "Unbound / Malignant / Parochial. Half of Bonnie & Clyde — Depression-era bank robbers who became folk heroes. Romance and murder on a road trip with no destination.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Clyde Barrow", x: 4.0, y: 3.5, z: -4.0,
        desc: "Unbound / Malignant / Parochial. The other half — prison-hardened, gun-obsessed, loyal to Bonnie. Two people against the world, literally.",
        source: "United States", category: "True Crime",
    },
    {
        name: "D.B. Cooper", x: 4.5, y: 0.5, z: -5.0,
        desc: "Maximum Unbound / Transactional / Maximum Parochial. Hijacked a plane, collected $200K ransom, parachuted into legend. Never caught. Pure self-interest executed flawlessly.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Bernie Madoff", x: -3.5, y: 4.5, z: -4.0,
        desc: "Structured / Maximum Malignant / Parochial. $65 billion Ponzi scheme — the largest financial fraud in history. Structured theft disguised as structured investment.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Elizabeth Holmes", x: -3.0, y: 3.5, z: -3.0,
        desc: "Structured / Malignant / Parochial. Theranos — a blood-testing empire built on lies. Silicon Valley's fake-it-till-you-make-it culture weaponized against patients.",
        source: "United States", category: "True Crime",
    },
    {
        name: "Blackbeard", x: 4.0, y: 3.0, z: -2.5,
        desc: "Unbound / Malignant / Parochial. Edward Teach — lit fuses in his beard to terrify enemies. Piracy as personal brand. Scope: whatever ship he could see.",
        source: "Caribbean", category: "True Crime",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║                    MYTHOLOGY & RELIGION                     ║
    // ╚══════════════════════════════════════════════════════════════╝

    {
        name: "Prometheus", x: 4.0, y: -4.5, z: 5.0,
        desc: "Unbound / Benevolent / Maximum Universal. Stole fire from the gods and gave it to all humanity. Paid with eternal torture — the original Unbound Benevolent at Universal scope.",
        source: "Greek Mythology", category: "Myth",
    },
    {
        name: "Zeus", x: -3.5, y: 1.5, z: 2.0,
        desc: "Structured / Mildly Malignant / Factional. King of Olympus — law-giver who breaks his own laws (especially regarding fidelity). Power as entitlement.",
        source: "Greek Mythology", category: "Myth",
    },
    {
        name: "Hades", x: -3.5, y: 0.5, z: 0.0,
        desc: "Structured / Transactional / Factional. Lord of the Underworld — not evil, just doing the job nobody else wanted. The dead are his scope, and he processes them fairly.",
        source: "Greek Mythology", category: "Myth",
    },
    {
        name: "Athena", x: -4.0, y: -2.5, z: 2.5,
        desc: "Structured / Benevolent / Factional. Goddess of wisdom and strategic warfare. Helps heroes, punishes hubris, protects cities. The code is reason itself.",
        source: "Greek Mythology", category: "Myth",
    },
    {
        name: "Ares", x: 3.0, y: 4.0, z: 0.5,
        desc: "Unbound / Malignant / Factional. God of war — not strategy, just the blood part. Every battlefield is his temple. Scope: wherever there's violence.",
        source: "Greek Mythology", category: "Myth",
    },
    {
        name: "Hermes", x: 4.0, y: 0.0, z: 1.5,
        desc: "Unbound / Transactional / Factional. Messenger god, patron of thieves, guide of souls. Crosses every boundary — divine, mortal, underworld. The original trickster diplomat.",
        source: "Greek Mythology", category: "Myth",
    },
    {
        name: "Loki (Norse)", x: 5.0, y: 2.5, z: -1.0,
        desc: "Maximum Unbound / Malignant / Factional. Shape-shifting chaos agent who fathers the world-serpent and the death-goddess. Helps the gods until he destroys them at Ragnarok.",
        source: "Norse Mythology", category: "Myth",
    },
    {
        name: "Thor (Norse)", x: 1.0, y: -2.0, z: 2.5,
        desc: "Pragmatic / Benevolent / Factional-Universal. Thunder god who protects Midgard from giants. Hits things with a hammer — straightforward scope, straightforward method.",
        source: "Norse Mythology", category: "Myth",
    },
    {
        name: "Odin", x: -2.0, y: 0.5, z: 3.0,
        desc: "Structured / Transactional / Universal. All-Father — sacrificed an eye for wisdom, hung from Yggdrasil for runes. Scope: all nine realms. Method: whatever costs the most.",
        source: "Norse Mythology", category: "Myth",
    },
    {
        name: "Fenrir", x: 5.0, y: 4.5, z: 4.5,
        desc: "Maximum Unbound / Maximum Malignant / Universal. The great wolf, chained by the gods until Ragnarok. When the chains break, scope becomes 'devour everything, starting with Odin.'",
        source: "Norse Mythology", category: "Myth",
    },
    {
        name: "Gilgamesh", x: 1.5, y: 0.0, z: -1.5,
        desc: "Pragmatic / Transactional / Parochial. Two-thirds god, one-third man. Tyrant-king who sought immortality after losing his only friend. Scope: himself, then Enkidu, then himself again.",
        source: "Sumerian Mythology", category: "Myth",
    },
    {
        name: "Enkidu", x: 3.0, y: -2.5, z: -1.0,
        desc: "Unbound / Benevolent / Parochial. Wild man created by the gods to check Gilgamesh. Found humanity through friendship — scope: one king, one bond.",
        source: "Sumerian Mythology", category: "Myth",
    },
    {
        name: "Sun Wukong", x: 5.0, y: -1.0, z: 1.5,
        desc: "Maximum Unbound / Mildly Benevolent / Factional. The Monkey King — defied Heaven, was imprisoned under a mountain, redeemed through pilgrimage. Chaos domesticated by purpose.",
        source: "Chinese Mythology", category: "Myth",
    },
    {
        name: "Cthulhu", x: 5.0, y: 5.0, z: 5.0,
        desc: "Maximum everything. Cosmic horror beyond human moral categories. Asleep in R'lyeh — when he wakes, the scope is all of reality and the Ethos is incomprehensible alien malice.",
        source: "Lovecraft", category: "Myth",
    },
    {
        name: "Beowulf", x: -1.0, y: -4.0, z: 2.0,
        desc: "Pragmatic / Benevolent / Factional-Universal. Geatish warrior who crossed the sea to kill Grendel for strangers. Scope: glory and the people who needed saving. Same thing.",
        source: "Old English Poetry", category: "Myth",
    },
    {
        name: "Medusa", x: 1.0, y: 2.0, z: -4.0,
        desc: "Pragmatic / Malignant / Parochial. Cursed by Athena, killed by Perseus. Turns onlookers to stone — not by choice. The pattern of effect is petrification; the scope is whoever looks.",
        source: "Greek Mythology", category: "Myth",
    },
    {
        name: "Icarus", x: 4.5, y: 0.0, z: -4.5,
        desc: "Maximum Unbound / Transactional / Maximum Parochial. Flew too close to the sun with wax wings. Hubris as purity — the scope was 'higher,' the method was 'don't listen to Dad.'",
        source: "Greek Mythology", category: "Myth",
    },
    {
        name: "Sisyphus", x: 2.5, y: 0.0, z: -4.5,
        desc: "Unbound / Transactional / Maximum Parochial. Tricked Death, punished forever. Rolls the boulder up the hill, watches it roll down. Camus says we must imagine him happy. Scope: the rock.",
        source: "Greek Mythology", category: "Myth",
    },
    {
        name: "Pandora", x: 3.5, y: 2.0, z: 4.0,
        desc: "Unbound / Malignant / Universal. Opened the box and released every evil into the world. Unintentional scope — but Hope remained at the bottom.",
        source: "Greek Mythology", category: "Myth",
    },
    {
        name: "Lucifer", x: 4.5, y: 4.5, z: 3.5,
        desc: "Maximum Unbound / Maximum Malignant / Universal. The rebel angel — 'Better to reign in Hell than serve in Heaven.' Milton's Satan: beauty, pride, and cosmic-scale defiance.",
        source: "Christian Mythology", category: "Myth",
    },
    {
        name: "Archangel Michael", x: -4.5, y: -4.0, z: 5.0,
        desc: "Maximum Structured / Benevolent / Maximum Universal. Heaven's general — the one who cast Lucifer down. Perfect obedience, perfect scope, perfect Ethos. The anti-Joker.",
        source: "Christian Mythology", category: "Myth",
    },
    {
        name: "Moses", x: -4.0, y: -3.5, z: 3.0,
        desc: "Structured / Benevolent / Universal. Received the law on stone tablets and led a people out of slavery. The code literally came from the mountain — scope: the chosen people, then all of civilization.",
        source: "Abrahamic Tradition", category: "Myth",
    },
    {
        name: "King Solomon", x: -5.0, y: -2.0, z: 2.5,
        desc: "Maximum Structured / Benevolent / Factional. The wisest king — adjudicated with legendary judgment. Built the Temple. Scope: Israel. Method: wisdom as infrastructure.",
        source: "Abrahamic Tradition", category: "Myth",
    },
    {
        name: "Siddhartha Gautama", x: 4.0, y: -5.0, z: 5.0,
        desc: "Unbound / Maximum Benevolent / Maximum Universal. Rejected princehood, rejected asceticism, found the Middle Way. Scope: all sentient beings. Method: dissolve all attachment, including to method.",
        source: "Buddhism", category: "Myth",
    },
    {
        name: "Kali", x: 3.5, y: 2.5, z: 4.0,
        desc: "Unbound / Malignant / Universal. Hindu goddess of destruction and time. Dances on corpses, wears skulls — but destruction serves cosmic renewal. The violence IS the compassion at Universal scale.",
        source: "Hindu Mythology", category: "Myth",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║                    PHILOSOPHICAL CONCEPTS                   ║
    // ╚══════════════════════════════════════════════════════════════╝

    {
        name: "The Utilitarian", x: -2.0, y: -2.0, z: 5.0,
        desc: "Structured / Benevolent / Maximum Universal. Greatest good for the greatest number. The scope IS the philosophy — the code is the calculus, and everyone counts equally.",
        source: "Mill / Bentham", category: "Concept",
    },
    {
        name: "The Deontologist", x: -5.0, y: -1.5, z: 3.0,
        desc: "Maximum Structured / Benevolent / Universal. Act only according to maxims you can universalize. Kant's categorical imperative — the code exists independent of outcomes.",
        source: "Kant", category: "Concept",
    },
    {
        name: "The Nihilist", x: 4.0, y: 0.0, z: -5.0,
        desc: "Unbound / Transactional / Maximum Parochial. Nothing matters. No code, no impact, no one to care about. The origin of the cube would be neutral — this is the philosophical extreme.",
        source: "Nietzsche (misread)", category: "Concept",
    },
    {
        name: "The Egoist", x: 3.5, y: 1.5, z: -5.0,
        desc: "Unbound / Mildly Malignant / Maximum Parochial. Rational self-interest as moral theory. Ayn Rand's ideal: the scope is you, and that's not a flaw — it's the point.",
        source: "Stirner / Rand", category: "Concept",
    },
    {
        name: "The Altruist", x: -1.0, y: -5.0, z: 5.0,
        desc: "Pragmatic / Maximum Benevolent / Maximum Universal. Pure selfless concern for all. The theoretical maximum of Ethos + Nexus — Peter Singer's drowning child extended to everyone.",
        source: "Singer / Effective Altruism", category: "Concept",
    },
    {
        name: "The Social Contract", x: -4.0, y: -1.0, z: 3.0,
        desc: "Structured / Mildly Benevolent / Universal. We agree to rules because cooperation beats chaos. Hobbes, Locke, Rousseau — different recipes, same fundamental dish: structure as mutual benefit.",
        source: "Hobbes / Locke / Rousseau", category: "Concept",
    },
    {
        name: "The Übermensch", x: 5.0, y: 0.0, z: 2.0,
        desc: "Maximum Unbound / Transactional / Factional. Beyond good and evil — creates own values. Nietzsche's actual Superman: not ruthless, but self-authored. The code is yours alone.",
        source: "Nietzsche", category: "Concept",
    },
    {
        name: "The Absurd Hero", x: 3.0, y: -1.5, z: 0.0,
        desc: "Unbound / Mildly Benevolent / Factional. Knows it's meaningless. Does it anyway. Camus's rebel — Sisyphus with a smile. Scope: whoever's in the room when meaning dissolves.",
        source: "Camus", category: "Concept",
    },
    {
        name: "The Machiavellian Prince", x: -2.0, y: 2.5, z: 1.0,
        desc: "Structured / Malignant / Factional. 'The ends justify the means.' Political realism as moral framework — the state's survival justifies any cruelty.",
        source: "Machiavelli", category: "Concept",
    },
    {
        name: "The Philosopher King", x: -4.5, y: -3.5, z: 4.0,
        desc: "Maximum Structured / Benevolent / Universal. Plato's ideal ruler — wisdom applied to governance for the good of all. Maximum Structure meets Maximum Scope meets real compassion.",
        source: "Plato", category: "Concept",
    },
    {
        name: "The Anarchist", x: 5.0, y: -1.0, z: 3.5,
        desc: "Maximum Unbound / Mildly Benevolent / Universal. No rulers, not no rules. Kropotkin and mutual aid — structure is the enemy, but the scope is everyone's liberation.",
        source: "Kropotkin / Bakunin", category: "Concept",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║                         BEASTS                              ║
    // ╚══════════════════════════════════════════════════════════════╝

    {
        name: "Xenomorph", x: 3.0, y: 5.0, z: -4.5,
        desc: "Unbound / Maximum Malignant / Parochial. The perfect organism — no morality, no conscience, no scope beyond the hive. Biomechanical terror that doesn't hate you. You're just warm.",
        source: "Alien", category: "Beast",
    },
    {
        name: "Godzilla", x: 3.0, y: 2.0, z: 0.0,
        desc: "Unbound / Malignant / Factional. Nature's nuclear revenge — sometimes destroyer, sometimes protector. Scope: the balance of nature, expressed through skyscraper-leveling atomic breath.",
        source: "Toho / MonsterVerse", category: "Beast",
    },
    {
        name: "King Kong", x: 2.5, y: -1.0, z: -3.0,
        desc: "Unbound / Mildly Benevolent / Parochial. Giant ape who just wanted to be left alone on his island. Taken to Manhattan, died for beauty. Scope: himself and whoever earned his trust.",
        source: "King Kong", category: "Beast",
    },
    {
        name: "Jaws", x: 4.0, y: 4.0, z: -5.0,
        desc: "Unbound / Malignant / Maximum Parochial. Great white shark — pure instinct, zero moral reasoning. The pattern of effect is people dying at the beach. The scope is hunger.",
        source: "Jaws", category: "Beast",
    },
    {
        name: "Moby Dick", x: 4.0, y: 3.0, z: -5.0,
        desc: "Unbound / Malignant / Maximum Parochial. The white whale — is it evil or just a whale? Melville leaves it ambiguous. The pattern of effect: one destroyed captain, one destroyed ship.",
        source: "Moby-Dick", category: "Beast",
    },
    {
        name: "Smaug", x: -2.5, y: 4.0, z: -4.0,
        desc: "Structured / Malignant / Parochial. Dragon sleeping on a mountain of stolen gold. The code: hoard, guard, burn anyone who comes near. Scope: the Lonely Mountain and its treasures.",
        source: "The Hobbit", category: "Beast",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║  BENEVOLENT + PAROCHIAL — "I'd burn the world for one person"║
    // ║  Filling the sparse y < -2, z < -2 region across all Praxis ║
    // ╚══════════════════════════════════════════════════════════════╝

    // ── Structured Benevolent Parochial ─────────────────────────────

    {
        name: "Marlin", x: -3.5, y: -4.0, z: -5.0,
        desc: "Structured / Benevolent / Maximum Parochial. An overprotective clownfish who crosses an entire ocean following self-imposed rules about safety — all to find one son. The scope never widens past Nemo; it doesn't need to.",
        source: "Finding Nemo", category: "Film",
    },
    {
        name: "Alfred Pennyworth", x: -4.0, y: -3.5, z: -4.0,
        desc: "Structured / Benevolent / Parochial. The world's most devoted butler. Alfred built his entire life around protecting one boy, then one man. The code is duty; the scope is Master Bruce. Wayne Manor IS the universe.",
        source: "DC Comics", category: "Fiction",
    },
    {
        name: "Molly Weasley", x: -3.0, y: -4.5, z: -3.5,
        desc: "Structured / Benevolent / Parochial. 'NOT MY DAUGHTER, YOU BITCH!' She duels Bellatrix Lestrange — one of the most powerful dark witches alive — because her children were threatened. The Burrow is the center of the universe.",
        source: "Harry Potter", category: "Literature",
    },
    {
        name: "Bryan Mills", x: -3.0, y: -3.0, z: -5.0,
        desc: "Structured / Benevolent / Maximum Parochial. 'I will find you, and I will kill you.' Ex-CIA operative with a very particular set of skills, all of which point at one thing: his daughter. The method is tradecraft; the scope is Kim.",
        source: "Taken", category: "Film",
    },
    {
        name: "Hank Hill", x: -4.0, y: -2.5, z: -3.5,
        desc: "Structured / Benevolent / Parochial. Sells propane and propane accessories. Hank's moral code is rigid, his heart is genuine, and his world is Arlen, Texas — three blocks wide and one family deep. He'll do the right thing, dammit.",
        source: "King of the Hill", category: "Television",
    },

    // ── Pragmatic Benevolent Parochial ──────────────────────────────

    {
        name: "Bob Belcher", x: -1.0, y: -3.0, z: -4.0,
        desc: "Pragmatic / Benevolent / Parochial. A man whose entire world is a restaurant and three weird kids. Bob adapts, improvises, and occasionally talks to a Thanksgiving turkey — but the scope never leaves Ocean Avenue.",
        source: "Bob's Burgers", category: "Television",
    },
    {
        name: "Ma (Joy Newsome)", x: -0.5, y: -5.0, z: -5.0,
        desc: "Pragmatic / Maximum Benevolent / Maximum Parochial. A kidnapping victim who builds an entire universe inside a garden shed so her son can have a childhood. The method is whatever keeps Jack alive; the scope is one child. The most extreme Benevolent-Parochial point conceivable.",
        source: "Room (2015)", category: "Film",
    },
    {
        name: "Lee Everett", x: 0.5, y: -4.0, z: -4.5,
        desc: "Pragmatic / Benevolent / Parochial. A convicted murderer who finds redemption protecting one little girl in the zombie apocalypse. Every choice, every bullet, every lie — all for Clementine. Dies making sure she survives.",
        source: "The Walking Dead (Game)", category: "Video Games",
    },
    {
        name: "Carl Fredricksen", x: -1.5, y: -2.5, z: -5.0,
        desc: "Pragmatic / Benevolent / Maximum Parochial. A widower who ties 10,000 balloons to his house to keep a promise to his dead wife. Scope: Ellie's memory, then Russell. The adventure book was always the method; Paradise Falls was never the destination.",
        source: "Up", category: "Film",
    },
    {
        name: "Marge Gunderson", x: -1.5, y: -3.5, z: -3.0,
        desc: "Pragmatic / Benevolent / Parochial. Brainerd's pregnant police chief who solves a triple homicide between meals. 'There's more to life than a little money, you know.' Scope: Norm, the baby, and Brainerd. Method: Minnesota nice and good police work.",
        source: "Fargo", category: "Film",
    },

    // ── Unbound Benevolent Parochial ────────────────────────────────

    {
        name: "Inigo Montoya", x: 3.5, y: -2.5, z: -5.0,
        desc: "Unbound / Benevolent / Maximum Parochial. 'Hello. My name is Inigo Montoya. You killed my father. Prepare to die.' Twenty years outside every system, driven by one debt of honor. The scope is one man; the method is whatever it takes.",
        source: "The Princess Bride", category: "Film",
    },
    {
        name: "Sirius Black", x: 3.0, y: -3.5, z: -4.0,
        desc: "Unbound / Benevolent / Parochial. Escaped Azkaban, defied the Ministry, lived as a fugitive dog — all for Harry. Sirius broke every rule the wizarding world had and his scope never extended past his godson. The most Unbound good parent figure in the series.",
        source: "Harry Potter", category: "Literature",
    },
    {
        name: "Lilo", x: 2.5, y: -3.5, z: -4.0,
        desc: "Unbound / Benevolent / Parochial. A weird little girl who turned a galactic bioweapon into family through sheer love and stubbornness. 'Ohana means family.' The method is chaos; the scope is Stitch and Nani. Nobody gets left behind.",
        source: "Lilo & Stitch", category: "Film",
    },
    {
        name: "Riddick", x: 4.0, y: -2.0, z: -4.0,
        desc: "Unbound / Benevolent / Parochial. Escaped convict with surgically modified eyes and zero respect for authority. Kills freely — but every time he bonds with someone (Jack, Imam), he'll fight armies to keep them alive. Anti-hero whose benevolence only extends to arm's reach.",
        source: "Pitch Black", category: "Film",
    },
    {
        name: "Elastigirl (Helen Parr)", x: 2.0, y: -4.0, z: -3.5,
        desc: "Unbound / Benevolent / Parochial. A superhero who can stretch into any shape — the perfect metaphor for a mom who bends every rule to protect her family. When the kids are threatened, the scope collapses from 'saving the world' to 'saving Violet, Dash, and Jack-Jack.'",
        source: "The Incredibles", category: "Film",
    },

    // ╔══════════════════════════════════════════════════════════════╗
    // ║        D&D 5e SYSTEM REFERENCE DOCUMENT (CC-BY-4.0)         ║
    // ║  Placements derived from SRD 5.1 alignment & creature lore  ║
    // ╚══════════════════════════════════════════════════════════════╝

    // ── Metallic Dragons (Good) ─────────────────────────────────────

    {
        name: "Ancient Gold Dragon", x: -4.0, y: -4.5, z: 4.5,
        desc: "Structured / Benevolent / Universal. The wisest and most powerful of metallic dragons. Gold dragons can assume humanoid form to counsel rulers and right great wrongs. Lawful Good to its core — the dragon analog of Superman.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Ancient Silver Dragon", x: -3.0, y: -4.0, z: 3.5,
        desc: "Structured / Benevolent / Universal-leaning. Silver dragons frequently befriend humanoids and live among them in disguise. Their concern for mortal welfare is personal and enduring — noble companionship, not distant oversight.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Ancient Bronze Dragon", x: -2.5, y: -3.0, z: 2.5,
        desc: "Structured / Benevolent / Factional-Universal. Bronze dragons are fascinated by warfare and often join organized campaigns against evil. They prefer coastal lairs and will ally with navies. Think principled mercenary with a dragon's power.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Ancient Brass Dragon", x: 2.0, y: -3.0, z: 2.0,
        desc: "Unbound / Benevolent / Factional. The most gregarious of dragons — brass dragons insist on conversation, sometimes trapping travelers in endless dialogue. Chaotic Good, warm-hearted but unpredictable. Would rather talk than fight.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Ancient Copper Dragon", x: 3.0, y: -2.5, z: 1.5,
        desc: "Unbound / Benevolent / Factional. Tricksters and practical jokers who view life as a grand performance. Copper dragons hoard jokes as jealously as gold. Chaotic Good — they'll save a village but make you laugh first.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },

    // ── Chromatic Dragons (Evil) ────────────────────────────────────

    {
        name: "Ancient Red Dragon", x: 3.0, y: 4.5, z: -2.0,
        desc: "Unbound / Malignant / Parochial. The most covetous and arrogant of all dragons. Red dragons rule through terror and consider themselves the apex of creation. Chaotic Evil — burns villages for the insult of existing near its lair.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Ancient Black Dragon", x: 2.5, y: 4.0, z: -3.5,
        desc: "Unbound / Malignant / Parochial. The most sadistic of chromatic dragons. Black dragons lair in fetid swamps, letting their domain rot. They don't just kill — they watch prey suffer. Chaotic Evil with a taste for cruelty.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Ancient Blue Dragon", x: -3.5, y: 3.5, z: -1.0,
        desc: "Structured / Malignant / Parochial-Factional. Vain, territorial, and methodical. Blue dragons lair in deserts and rule surrounding creatures like tyrant-kings. Lawful Evil — they don't rampage, they govern through fear.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Ancient Green Dragon", x: -2.0, y: 3.5, z: 0.5,
        desc: "Structured / Malignant / Factional. The most cunning and manipulative chromatic. Green dragons lie and scheme, preferring to corrupt and dominate rather than destroy. Lawful Evil — their weapon is whispered leverage, not fire.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Ancient White Dragon", x: 4.0, y: 3.0, z: -4.5,
        desc: "Unbound / Malignant / Parochial. The most bestial and least intelligent of chromatic dragons. White dragons are driven by primal hunger and territorial fury. Chaotic Evil, but barely — they're closer to Arctic predators than master villains.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },

    // ── Fiends (Demons & Devils) ────────────────────────────────────

    {
        name: "Balor", x: 4.5, y: 5.0, z: 1.5,
        desc: "Maximum Unbound / Maximum Malignant / Factional-Universal. Generals of the Abyss, balors are living engines of demonic warfare. Chaotic Evil embodied — no plan survives contact with a balor because destruction IS the plan. Scope: everything they can reach.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Pit Fiend", x: -4.5, y: 4.5, z: 2.0,
        desc: "Maximum Structured / Nearly Maximum Malignant / Factional-Universal. The iron generals of the Nine Hells. Pit fiends command legions and execute the will of archdevils with precision. Lawful Evil perfected — every cruelty is policy.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Succubus / Incubus", x: 1.0, y: 3.5, z: -2.0,
        desc: "Pragmatic-Unbound / Malignant / Parochial. Fiends of seduction who corrupt mortals one soul at a time. Method is adaptive — whatever the target desires. The scope is intimate: a single soul is worth more than a city to them.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Imp", x: -3.0, y: 2.5, z: -3.5,
        desc: "Structured / Malignant / Parochial. Dutiful infernal servants bound to a single warlock or devil. Imps obey the hierarchy absolutely. Scope: their master and their master's enemies. Lawful Evil at the bottom of the org chart.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Quasit", x: 3.5, y: 2.5, z: -3.5,
        desc: "Unbound / Malignant / Parochial. The Abyss's answer to the imp — a chaotic familiar that sows discord for fun. Quasits have no loyalty beyond the moment and will betray a master the instant it amuses them.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Rakshasa", x: -3.5, y: 3.5, z: -2.0,
        desc: "Structured / Malignant / Parochial. A fiend draped in luxury and deception. Rakshasas infiltrate mortal society to rule from the shadows, accumulating wealth and power. Lawful Evil — every scheme has a plan within a plan.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },

    // ── Celestials ──────────────────────────────────────────────────

    {
        name: "Solar", x: -4.5, y: -5.0, z: 5.0,
        desc: "Maximum Structured / Maximum Benevolent / Maximum Universal. The most powerful angels — shepherds of entire planes. A solar's concern is all existence, and its methods are divine law. The absolute ceiling of lawful good.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Planetar", x: -4.0, y: -4.5, z: 4.5,
        desc: "Structured / Benevolent / Universal. Angelic commanders who lead celestial armies and protect mortal realms from fiendish incursion. Where a solar oversees, a planetar acts — the heavenly general to the solar's divine king.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Couatl", x: -3.0, y: -4.0, z: 4.0,
        desc: "Structured / Benevolent / Universal. Feathered serpents of divine origin who guard sacred sites and guide mortals toward virtue. Couatls are patient, wise, and will sacrifice themselves to prevent great evil. Lawful Good with deep compassion.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Pegasus", x: 1.0, y: -3.5, z: 1.5,
        desc: "Pragmatic / Benevolent / Factional. Noble winged horses who serve as mounts for good-aligned creatures. Pegasi are wild and free but consistently compassionate — they choose their riders based on moral character, not bridle and bit.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Unicorn", x: -3.0, y: -5.0, z: 3.0,
        desc: "Structured / Maximum Benevolent / Universal-leaning. Celestial guardians of enchanted forests. A unicorn's lair radiates healing magic, and it will lay down its life to protect the innocent. Lawful Good — purity incarnate.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },

    // ── Undead ──────────────────────────────────────────────────────

    {
        name: "Lich", x: -4.0, y: 4.5, z: -4.0,
        desc: "Maximum Structured / Nearly Maximum Malignant / Parochial. Arcane perfection gone wrong — a wizard who traded humanity for immortality through unspeakable ritual. Every action serves the lich's eternal study. Scope: the phylactery and the tower.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Vampire", x: -3.5, y: 3.5, z: -2.5,
        desc: "Structured / Malignant / Parochial. Undead aristocrats who maintain courts, enforce hierarchy among spawn, and rule domains. Lawful Evil — the charm and the bite are both instruments of control. Every victim joins the org chart.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Ghost", x: 0.0, y: 0.0, z: -5.0,
        desc: "Pragmatic / Transactional / Maximum Parochial. A soul anchored by unfinished business. Ghosts aren't inherently good or evil — they're bound. The scope is the single unresolved moment. Everything else is noise they can't perceive.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Zombie", x: -5.0, y: 1.5, z: -5.0,
        desc: "Maximum Structured / Mildly Malignant / Maximum Parochial. A corpse following the simplest possible program: obey, consume, destroy. Zero agency, zero scope. The structure isn't chosen — it's all that's left when everything else rots away.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Skeleton", x: -5.0, y: 1.0, z: -5.0,
        desc: "Maximum Structured / Mildly Malignant / Maximum Parochial. Even more rigidly programmed than zombies — skeletons follow orders with mechanical precision. They have no will, no scope, and no deviation. The purest minion in the game.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Mummy Lord", x: -4.5, y: 3.5, z: -3.0,
        desc: "Maximum Structured / Malignant / Parochial. An ancient ruler entombed with divine rites who refuses to let go. The tomb IS the world — trespassers are annihilated, the curse extends to anyone who disturbs the domain. Lawful Evil, fossilized.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Wraith", x: 1.5, y: 3.5, z: -3.0,
        desc: "Pragmatic-Unbound / Malignant / Parochial. An incorporeal undead born from intense hatred. Wraiths drain life force and create specters from victims. The scope is raw hunger and malice — no grand plan, just an expanding circle of death.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Wight", x: -2.5, y: 3.0, z: -3.0,
        desc: "Structured / Malignant / Parochial. Undead warriors who retain enough intelligence to command lesser undead and guard their burial sites. They fight with tactical discipline. Structured Evil — the sergeant who doesn't know the war is over.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Specter", x: 2.5, y: 3.0, z: -4.5,
        desc: "Unbound / Malignant / Parochial. An incorporeal echo of a soul consumed by rage and spite. Specters attack the living with blind hatred — no code, no faction, just vengeance. The scope has collapsed to pure destruction radiating from a wound.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },

    // ── Aberrations ─────────────────────────────────────────────────

    {
        name: "Aboleth", x: -4.0, y: 4.0, z: 2.0,
        desc: "Structured / Malignant / Factional-Universal. Older than the gods, aboleths remember everything. They puppeteer entire civilizations through psychic enslavement, treating all surface life as property. Lawful Evil on a cosmic timeline.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Beholder", x: -4.5, y: 4.0, z: -4.0,
        desc: "Maximum Structured / Malignant / Parochial. The quintessential paranoid tyrant. Beholders obsessively organize their lairs into kill zones, trust nothing, and believe they alone are perfect. Scope is the lair — everything else is a threat.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Mind Flayer", x: -3.5, y: 4.0, z: 0.0,
        desc: "Structured / Malignant / Factional. Illithids feed on brains and dominate thralls through psionic power. Their elder brains coordinate hive-level strategy. Lawful Evil — slavery isn't a side-effect, it's the ecosystem. Scope: the colony.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },

    // ── Giants ──────────────────────────────────────────────────────

    {
        name: "Storm Giant", x: 1.5, y: -3.5, z: 3.0,
        desc: "Pragmatic-Unbound / Benevolent / Universal. The noblest of giantkin, storm giants contemplate omens and intervene when the balance of the world is threatened. Chaotic Good — they act from conscience, not code, and the scope is all creation.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Cloud Giant", x: 0.5, y: 0.0, z: 0.5,
        desc: "Pragmatic / Transactional / Factional. Cloud giants live above the world in literal and figurative senses. Some are good, some evil — the SRD leaves alignment neutral. Status and treasure define their social order. Comfortable fence-sitters at altitude.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Fire Giant", x: -4.0, y: 3.0, z: 0.0,
        desc: "Structured / Malignant / Factional. Militaristic smiths who enslave lesser creatures to fuel their forges. Fire giant society is a rigid caste system where strength determines rank. Lawful Evil — the foundry runs on suffering.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Frost Giant", x: 2.5, y: 3.0, z: -1.0,
        desc: "Unbound / Malignant / Parochial-Factional. Raiding vikings of the giant world. Frost giants value strength above all and plunder weaker settlements for sport and supplies. Chaotic Evil — the raid is its own reward.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Hill Giant", x: 3.0, y: 2.5, z: -3.5,
        desc: "Unbound / Malignant / Parochial. Gluttonous, dim-witted brutes driven by hunger. Hill giants eat everything and everyone they can catch. The scope is 'whatever fits in my mouth.' Chaotic Evil reduced to its simplest expression.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Stone Giant", x: -2.0, y: 0.0, z: -3.0,
        desc: "Structured / Transactional / Parochial. Reclusive artists who carve mountains and barely notice the surface world. Stone giants consider life above ground a 'dream' — not real enough to morally engage with. Neutral and insular.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },

    // ── Classic Monsters ────────────────────────────────────────────

    {
        name: "Tarrasque", x: 5.0, y: 5.0, z: 0.0,
        desc: "Maximum Unbound / Maximum Malignant / Neutral scope. A walking apocalypse. The tarrasque destroys everything it encounters, not from hatred but from sheer existence. Scope is zero-select — it doesn't choose targets because everything is a target.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Kraken", x: 3.0, y: 4.5, z: 1.0,
        desc: "Unbound / Malignant / Factional. Godlike sea terrors worshipped by coastal cults. Krakens are intelligent, wrathful, and view the ocean as their personal domain. Chaotic Evil — the deep is theirs, and the surface world exists to drown.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Blink Dog", x: -2.0, y: -3.0, z: -1.0,
        desc: "Structured / Benevolent / Parochial-Factional. Fey canines that teleport and hunt in disciplined packs. Blink dogs are the sworn enemies of displacer beasts. Lawful Good — loyal, coordinated, and fiercely protective of their pack and territory.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Displacer Beast", x: -1.0, y: 2.5, z: -3.0,
        desc: "Pragmatic-Structured / Malignant / Parochial. Six-legged panther-like predators that project illusory doubles. Cruel and cunning, they toy with prey. The tentacles say 'evil,' the illusion says 'structured.' The scope is the hunting ground.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Owlbear", x: 3.0, y: 1.0, z: -5.0,
        desc: "Unbound / Mildly Malignant / Maximum Parochial. An abomination of magical experimentation — part owl, part bear, all fury. Owlbears attack anything that enters their territory. No code, no scope, just feathers and rage.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Basilisk", x: 0.0, y: 1.5, z: -5.0,
        desc: "Pragmatic / Mildly Malignant / Maximum Parochial. Eight-legged reptile that turns creatures to stone with its gaze. The basilisk isn't evil by choice — it's evil by biology. Its garden of statues is accidental art.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Mimic", x: 2.5, y: 2.0, z: -5.0,
        desc: "Unbound / Malignant / Maximum Parochial. Shapeshifting ambush predators that disguise themselves as treasure chests, doors, or furniture. The ultimate dungeon trickster. Scope: wherever an adventurer might reach.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Gelatinous Cube", x: 0.0, y: 1.0, z: -5.0,
        desc: "Pragmatic / Mildly Malignant / Maximum Parochial. A 10-foot transparent cube that silently slides through dungeon corridors, digesting everything it engulfs. Zero intelligence, zero malice — just a perfectly shaped stomach.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Rust Monster", x: 2.0, y: 0.0, z: -5.0,
        desc: "Unbound / Transactional / Maximum Parochial. Insectoid creatures that dissolve and eat metal. They don't want to hurt anyone — they just want your sword. More terrifying to adventurers' gear than their health bars.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Treant", x: 1.0, y: -3.0, z: 1.0,
        desc: "Pragmatic-Unbound / Benevolent / Factional. Awakened trees that guard ancient forests from despoilers. Treants are patient, slow to anger, but devastating when roused. Chaotic Good — nature doesn't follow laws, it follows seasons.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Manticore", x: 0.5, y: 3.0, z: -3.0,
        desc: "Pragmatic / Malignant / Parochial. A lion-bodied, spike-tailed predator that enjoys taunting and terrifying prey. Manticores are intelligent enough to be cruel and lazy enough to demand tribute. Neutral Evil — a bully with wings.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Hydra", x: 2.0, y: 2.0, z: -4.5,
        desc: "Unbound / Malignant / Parochial. A multi-headed reptilian predator that regrows severed heads. The hydra doesn't plan — it just has more mouths to feed. Scope: the swamp. Method: bite, bite, bite, bite, bite.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Purple Worm", x: 4.0, y: 2.0, z: -5.0,
        desc: "Unbound / Malignant / Maximum Parochial. A burrowing colossus that tunnels through the Underdark, swallowing everything in its path. Unaligned — the purple worm is an earthquake with a digestive tract.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Behir", x: 1.5, y: 2.5, z: -3.0,
        desc: "Pragmatic-Unbound / Malignant / Parochial. A twelve-legged serpentine predator that despises dragons. Behirs claim territory and devour trespassers whole. Neutral Evil — territorial and hateful, but not strategic about it.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Winter Wolf", x: -1.5, y: 2.5, z: -2.0,
        desc: "Pragmatic-Structured / Malignant / Parochial. Arctic predators with freezing breath who ally with frost giants. Winter wolves are intelligent enough to speak and coordinate hunts. Neutral Evil — cunning pack hunters with ice on their breath.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Worg", x: 0.5, y: 2.0, z: -3.5,
        desc: "Pragmatic / Malignant / Parochial. Evil wolf-like predators used as mounts by goblins. Worgs are intelligent enough to speak and treacherous enough to eat their rider. Neutral Evil — loyalty lasts exactly as long as the next meal.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },

    // ── NPC Archetypes ──────────────────────────────────────────────

    {
        name: "Archmage (NPC)", x: -3.5, y: -1.0, z: 2.0,
        desc: "Structured / Mildly Benevolent / Factional-Universal. SRD archmages are 18th-level spellcasters who dedicate their lives to arcane study. Benevolent ones counsel kings; evil ones pursue lichdom. This plots the median: disciplined, neutral-leaning-good, broad scope.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Knight (NPC)", x: -4.0, y: -2.5, z: 1.0,
        desc: "Structured / Benevolent / Factional. Knights pledge service to rulers, causes, and religious orders. The SRD's knight is the archetypal loyal warrior — method is oath, impact is protection, scope is the realm they serve.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Assassin (NPC)", x: 1.5, y: 3.5, z: -3.0,
        desc: "Pragmatic-Unbound / Malignant / Parochial. Remorseless killers trained in poison who work for anyone who can pay. The SRD says 'any non-good alignment.' Method: whatever the contract requires. Scope: the mark.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Bandit Captain (NPC)", x: 2.0, y: 1.5, z: -2.0,
        desc: "Unbound / Mildly Malignant / Parochial. The SRD notes: 'It takes a strong personality, ruthless cunning, and a silver tongue.' More than treasure, a bandit captain craves infamy. Method: exploit. Scope: the crew and the loot.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Cult Fanatic (NPC)", x: -3.5, y: 3.0, z: -1.5,
        desc: "Structured / Malignant / Parochial-Factional. Charismatic mid-level cult leaders who prey on the weak-willed. They have spellcasting from dark patrons and advantage on saves against charm — true believers. Lawful Evil within the cult's framework.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Druid (NPC)", x: 0.5, y: -2.5, z: 1.5,
        desc: "Pragmatic / Benevolent / Factional. SRD druids dwell in forests, protecting the natural world. Some are tribal shamans, others are solitary wardens. Method: nature's own adaptability. Scope: the wild and those who respect it.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Gladiator (NPC)", x: 1.0, y: 0.0, z: -2.5,
        desc: "Pragmatic / Transactional / Parochial. Professional pit fighters who range from brutal death-matchers to showmen. The SRD gives them 'any alignment' — the median gladiator fights for coin and crowd. The scope is the arena and the next purse.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
    {
        name: "Spy (NPC)", x: 2.0, y: 0.5, z: -1.0,
        desc: "Unbound / Transactional / Parochial-Factional. Trained to secretly gather information. 'Loyal spies would rather die than divulge information that could compromise them.' Method: deception. Impact: depends on employer. Scope: the mission.",
        source: "D&D SRD 5.1", category: "D&D SRD",
    },
];

export default CHARACTERS;
