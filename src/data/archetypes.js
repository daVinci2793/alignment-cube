/**
 * The 27 Archetypes — every combination of the three PEN tiers.
 *
 * Code convention (like MBTI but for PEN):
 *   First letter  → Praxis:  S (Structured) | P (Pragmatic) | U (Unbound)
 *   Second letter → Ethos:   B (Benevolent)  | T (Transactional) | M (Malignant)
 *   Third letter  → Nexus:   p (Parochial)   | f (Factional)     | u (Universal)
 *
 * Tier boundaries (real-space −5 to +5):
 *   Tier 1: −5   to −1.67
 *   Tier 2: −1.67 to +1.67
 *   Tier 3: +1.67 to +5
 *
 * Normalized (÷5): −1 to −⅓, −⅓ to ⅓, ⅓ to 1
 */

// ---- Tier definitions -------------------------------------------------------

const T1 = [-1, -1 / 3];   // "low" tier in normalised space
const T2 = [-1 / 3, 1 / 3]; // "mid" tier
const T3 = [1 / 3, 1];      // "high" tier

export const PRAXIS_TIERS = [
    { key: "S", label: "Structured", range: T1 },
    { key: "P", label: "Pragmatic", range: T2 },
    { key: "U", label: "Unbound", range: T3 },
];

export const ETHOS_TIERS = [
    { key: "B", label: "Benevolent", range: T1 },
    { key: "T", label: "Transactional", range: T2 },
    { key: "M", label: "Malignant", range: T3 },
];

export const NEXUS_TIERS = [
    { key: "p", label: "Parochial", range: T1 },
    { key: "f", label: "Factional", range: T2 },
    { key: "u", label: "Universal", range: T3 },
];

// ---- The 27 Archetypes ------------------------------------------------------

export const ARCHETYPES = [
    // ==================== STRUCTURED + BENEVOLENT ====================
    {
        code: "SBp",
        name: "The Guardian",
        praxis: "Structured", ethos: "Benevolent", nexus: "Parochial",
        nRange: { x: T1, y: T1, z: T1 },
        traits: ["Dutiful", "Protective", "Disciplined", "Loyal"],
        description:
            "A devoted protector operating within a strict personal code, defending a small circle with everything they have. The bodyguard with an oath. The parent with ironclad rules. Discipline exists to serve the people they love, and no one else.",
    },
    {
        code: "SBf",
        name: "The Sentinel",
        praxis: "Structured", ethos: "Benevolent", nexus: "Factional",
        nRange: { x: T1, y: T1, z: T2 },
        traits: ["Steadfast", "Principled", "Selfless", "Devoted"],
        description:
            "Oath-sworn defender of a community, cause, or institution. Maintains the watch so others can sleep. Their code serves something bigger than family but smaller than everything: the guild, the homeland, the fellowship.",
    },
    {
        code: "SBu",
        name: "The Paladin",
        praxis: "Structured", ethos: "Benevolent", nexus: "Universal",
        nRange: { x: T1, y: T1, z: T3 },
        traits: ["Noble", "Selfless", "Resolute", "Idealistic"],
        description:
            "The highest order in service of the highest good at the widest scope. Moral clarity and universal compassion enforced through unwavering principle. Their code encompasses every sentient being.",
    },

    // ==================== STRUCTURED + TRANSACTIONAL ====================
    {
        code: "STp",
        name: "The Keeper",
        praxis: "Structured", ethos: "Transactional", nexus: "Parochial",
        nRange: { x: T1, y: T2, z: T1 },
        traits: ["Methodical", "Reserved", "Self-contained", "Routine"],
        description:
            "Maintains a narrow domain with quiet precision. Neither saint nor villain, just someone who follows the routine, keeps the ledger balanced, and tends the small garden of their life. Order without agenda.",
    },
    {
        code: "STf",
        name: "The Functionary",
        praxis: "Structured", ethos: "Transactional", nexus: "Factional",
        nRange: { x: T1, y: T2, z: T2 },
        traits: ["Procedural", "Dependable", "Institutional", "Neutral"],
        description:
            "The institutional backbone. Files the paperwork, follows the protocol, keeps the machinery running. Neutral by disposition, factional by employment, structured by nature. The system works because they show up.",
    },
    {
        code: "STu",
        name: "The Architect",
        praxis: "Structured", ethos: "Transactional", nexus: "Universal",
        nRange: { x: T1, y: T2, z: T3 },
        traits: ["Systematic", "Detached", "Analytical", "Visionary"],
        description:
            "Designs universal systems with clinical detachment. The framework matters more than its moral output. They build the machine; what it does is someone else's department. Structure for structure's sake, extended to the horizon.",
    },

    // ==================== STRUCTURED + MALIGNANT ====================
    {
        code: "SMp",
        name: "The Warden",
        praxis: "Structured", ethos: "Malignant", nexus: "Parochial",
        nRange: { x: T1, y: T3, z: T1 },
        traits: ["Controlling", "Cruel", "Territorial", "Inflexible"],
        description:
            "Rules a narrow domain through fear and unyielding control. The abusive patriarch, the dungeon keeper who savors the lock. Their code exists not to protect but to cage, and their cage is kept in perfect condition.",
    },
    {
        code: "SMf",
        name: "The Inquisitor",
        praxis: "Structured", ethos: "Malignant", nexus: "Factional",
        nRange: { x: T1, y: T3, z: T2 },
        traits: ["Dogmatic", "Ruthless", "Zealous", "Persecuting"],
        description:
            "Enforces harmful doctrine across an organization with systematic precision. Protocols for cruelty, procedures for persecution. Order weaponized at institutional scale. The torturer with a manual and a mandate.",
    },
    {
        code: "SMu",
        name: "The Overlord",
        praxis: "Structured", ethos: "Malignant", nexus: "Universal",
        nRange: { x: T1, y: T3, z: T3 },
        traits: ["Tyrannical", "Absolute", "Visionary", "Oppressive"],
        description:
            "Structured evil extended across all existence. The tyrant with a plan for everyone. They don't just rule. They build systems designed to crush in perpetuity. Total order, total harm, total scope.",
    },

    // ==================== PRAGMATIC + BENEVOLENT ====================
    {
        code: "PBp",
        name: "The Protector",
        praxis: "Pragmatic", ethos: "Benevolent", nexus: "Parochial",
        nRange: { x: T2, y: T1, z: T1 },
        traits: ["Resourceful", "Caring", "Practical", "Close-knit"],
        description:
            "Does whatever works to keep their people safe. No ideology, no doctrine, just results. When the code fails, they improvise. When the system breaks, they duct-tape it. Love is the only non-negotiable.",
    },
    {
        code: "PBf",
        name: "The Shepherd",
        praxis: "Pragmatic", ethos: "Benevolent", nexus: "Factional",
        nRange: { x: T2, y: T1, z: T2 },
        traits: ["Adaptive", "Nurturing", "Wise", "Community-minded"],
        description:
            "Guides a community through flexible wisdom and adaptive care. The village healer who uses herbs or surgery as needed, the compassionate leader who bends every tool toward the welfare of their flock.",
    },
    {
        code: "PBu",
        name: "The Mediator",
        praxis: "Pragmatic", ethos: "Benevolent", nexus: "Universal",
        nRange: { x: T2, y: T1, z: T3 },
        traits: ["Diplomatic", "Empathetic", "Versatile", "Humanitarian"],
        description:
            "Pragmatic goodness at universal scale. The diplomat, the humanitarian who will use force or mercy as the moment demands, always in service of the widest possible good. Whatever works, for everyone.",
    },

    // ==================== PRAGMATIC + TRANSACTIONAL ====================
    {
        code: "PTp",
        name: "The Survivor",
        praxis: "Pragmatic", ethos: "Transactional", nexus: "Parochial",
        nRange: { x: T2, y: T2, z: T1 },
        traits: ["Self-reliant", "Opportunistic", "Pragmatic", "Detached"],
        description:
            "Adapts moment to moment with no fixed moral compass and no footprint beyond the self. Gets through today. Makes the deal. Moves on. Asks nothing and offers less. The dead center of the cube.",
    },
    {
        code: "PTf",
        name: "The Broker",
        praxis: "Pragmatic", ethos: "Transactional", nexus: "Factional",
        nRange: { x: T2, y: T2, z: T2 },
        traits: ["Calculating", "Connected", "Transactional", "Strategic"],
        description:
            "The deal-maker, the fixer, the faction's neutral grease. Operates within networks, trades favors, and keeps the ecosystem running. No moral investment, just relationships as currency at organizational scale.",
    },
    {
        code: "PTu",
        name: "The Observer",
        praxis: "Pragmatic", ethos: "Transactional", nexus: "Universal",
        nRange: { x: T2, y: T2, z: T3 },
        traits: ["Watchful", "Non-committal", "Perceptive", "Philosophical"],
        description:
            "Watches the entire board without placing a piece. Maximum awareness, minimum commitment. The journalist, the wandering philosopher, the cosmic bystander who sees everything and owes nothing.",
    },

    // ==================== PRAGMATIC + MALIGNANT ====================
    {
        code: "PMp",
        name: "The Opportunist",
        praxis: "Pragmatic", ethos: "Malignant", nexus: "Parochial",
        nRange: { x: T2, y: T3, z: T1 },
        traits: ["Exploitative", "Self-serving", "Cunning", "Parasitic"],
        description:
            "Takes what they can get and harms who they must. The small-time predator, the parasitic grifter. Flexible enough to find the angle, selfish enough never to share it. Damage is collateral, not ideological.",
    },
    {
        code: "PMf",
        name: "The Profiteer",
        praxis: "Pragmatic", ethos: "Malignant", nexus: "Factional",
        nRange: { x: T2, y: T3, z: T2 },
        traits: ["Avaricious", "Strategic", "Corrupt", "Extractive"],
        description:
            "Extracts value from systems at others' expense. The war profiteer, the corporate raider, the corrupt official. Harm is a business model, and the faction is the market they've cornered.",
    },
    {
        code: "PMu",
        name: "The Conqueror",
        praxis: "Pragmatic", ethos: "Malignant", nexus: "Universal",
        nRange: { x: T2, y: T3, z: T3 },
        traits: ["Ambitious", "Ruthless", "Adaptable", "Imperial"],
        description:
            "Pragmatic devastation at civilizational scale. Shifts tactics without shifting goals. Adaptable enough to win every engagement, malignant enough to leave ruin in every wake, ambitious enough for the whole map.",
    },

    // ==================== UNBOUND + BENEVOLENT ====================
    {
        code: "UBp",
        name: "The Renegade",
        praxis: "Unbound", ethos: "Benevolent", nexus: "Parochial",
        nRange: { x: T3, y: T1, z: T1 },
        traits: ["Defiant", "Passionate", "Personal", "Uncompromising"],
        description:
            "Breaks every rule for one person or one debt of honor. The parent who storms the fortress, the friend who defies the gods. Structure is kindling when someone they love is cold.",
    },
    {
        code: "UBf",
        name: "The Rebel",
        praxis: "Unbound", ethos: "Benevolent", nexus: "Factional",
        nRange: { x: T3, y: T1, z: T2 },
        traits: ["Insurgent", "Idealistic", "Disruptive", "Solidarity"],
        description:
            "Chaotic good at faction scale. Fights the power for the people, tears down the institution to free the community. Structure is the enemy; solidarity is the weapon. The outlaw with a cause.",
    },
    {
        code: "UBu",
        name: "The Liberator",
        praxis: "Unbound", ethos: "Benevolent", nexus: "Universal",
        nRange: { x: T3, y: T1, z: T3 },
        traits: ["Revolutionary", "Visionary", "Boundless", "Emancipatory"],
        description:
            "Unchains the world through raw disruption. The revolutionary who topples empires for all sentient life. Boundaries are prisons; freedom is the only universal law. Prometheus with a crowbar.",
    },

    // ==================== UNBOUND + TRANSACTIONAL ====================
    {
        code: "UTp",
        name: "The Drifter",
        praxis: "Unbound", ethos: "Transactional", nexus: "Parochial",
        nRange: { x: T3, y: T2, z: T1 },
        traits: ["Rootless", "Independent", "Aimless", "Free"],
        description:
            "No code, no cause, no scope. Pure unstructured neutrality aimed at the self alone. The ronin between masters, the vagabond, the cat who walks alone. Freedom without destination.",
    },
    {
        code: "UTf",
        name: "The Wildcard",
        praxis: "Unbound", ethos: "Transactional", nexus: "Factional",
        nRange: { x: T3, y: T2, z: T2 },
        traits: ["Unpredictable", "Disruptive", "Charismatic", "Volatile"],
        description:
            "The unpredictable variable in any group or system. Might help, might hinder, always surprises. The trickster at the party, the mercenary who switches sides mid-battle. Chaos without malice, loyalty without reliability.",
    },
    {
        code: "UTu",
        name: "The Fool",
        praxis: "Unbound", ethos: "Transactional", nexus: "Universal",
        nRange: { x: T3, y: T2, z: T3 },
        traits: ["Enigmatic", "Mercurial", "Cosmic", "Amoral"],
        description:
            "The cosmic trickster who touches everything and owes nothing. Speaks in riddles, defies causality, operates at universal scale with zero allegiance. The court jester of the cosmos, laughing at order and chaos alike.",
    },

    // ==================== UNBOUND + MALIGNANT ====================
    {
        code: "UMp",
        name: "The Predator",
        praxis: "Unbound", ethos: "Malignant", nexus: "Parochial",
        nRange: { x: T3, y: T3, z: T1 },
        traits: ["Feral", "Vicious", "Instinctual", "Solitary"],
        description:
            "Raw, unstructured harm aimed at whatever's nearest. No ideology, no system, no manifesto. Just appetite and proximity. The feral beast, the serial hunter, the monster under the bed.",
    },
    {
        code: "UMf",
        name: "The Firebrand",
        praxis: "Unbound", ethos: "Malignant", nexus: "Factional",
        nRange: { x: T3, y: T3, z: T2 },
        traits: ["Incendiary", "Destructive", "Provocative", "Anarchic"],
        description:
            "Burns down groups, institutions, and movements from within. Chaos with a target audience. The saboteur, the demagogue, the one who lights the match in the crowded room and watches from the exit.",
    },
    {
        code: "UMu",
        name: "The Apocalypse",
        praxis: "Unbound", ethos: "Malignant", nexus: "Universal",
        nRange: { x: T3, y: T3, z: T3 },
        traits: ["Cataclysmic", "Nihilistic", "Boundless", "Annihilating"],
        description:
            "Unstructured, universal-scope annihilation. Maximum chaos, maximum harm, maximum scope. The world-ender, the extinction event, the entity that treats reality itself as fuel. Everything burns, and nothing is spared.",
    },
];

// ---- Helpers ----------------------------------------------------------------

/** Check if a value falls inside a normalised tier range */
const inRange = (val, [lo, hi]) => val >= lo && val <= hi;

/**
 * Return the archetype a character belongs to based on their PEN coordinates.
 * Coordinates are in real-space (−5 to +5) — they're normalised internally.
 */
export function getArchetypeForChar(ch) {
    const nx = ch.x / 5, ny = ch.y / 5, nz = ch.z / 5;
    return ARCHETYPES.find(a =>
        inRange(nx, a.nRange.x) &&
        inRange(ny, a.nRange.y) &&
        inRange(nz, a.nRange.z)
    ) || null;
}

/**
 * Return all characters that fall within the given archetype's sub-cube.
 */
export function getCharactersInArchetype(archetype, characters) {
    return characters.filter(ch => {
        const nx = ch.x / 5, ny = ch.y / 5, nz = ch.z / 5;
        return inRange(nx, archetype.nRange.x) &&
            inRange(ny, archetype.nRange.y) &&
            inRange(nz, archetype.nRange.z);
    });
}
