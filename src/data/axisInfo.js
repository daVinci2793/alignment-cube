export const AXIS_INFO = {
    x: {
        name: "Praxis — The Method", color: "#ff6b6b", neg: "Structured", pos: "Unbound",
        pillar: "PILLAR I: PRAXIS",
        def: "How does the character interact with systems, rules, and structure? This axis measures methodology and disposition — it's the one pillar where internal orientation matters.",
        tiers: [
            { label: "Structured (−5 to −1.67)", text: "Operates within established codes, laws, or rigorous personal routines. Maintains and relies on systems. A paladin's oath and Dexter's code are both Structured — the structure just points in different Ethos directions." },
            { label: "Pragmatic (−1.67 to +1.67)", text: "Highly adaptable. Uses systems when optimal, bypasses them when inefficient. This isn't the absence of a position — it's the discipline of flexibility. Tony Soprano and Captain America are both more Pragmatic than people assume." },
            { label: "Unbound (+1.67 to +5)", text: "Actively subverts, exploits, or ignores established norms. Thrives on the unpredictable and looks for vulnerabilities in structure. Rick Sanchez and Robin Hood are both Unbound but diverge completely on Ethos." },
        ],
        key: "Praxis is about HOW — it's the methodology axis. Two characters can be identically Structured but produce opposite outcomes. The code is the same; what it points at differs."
    },
    y: {
        name: "Ethos — The Impact", color: "#ffd93d", neg: "Benevolent", pos: "Malignant",
        pillar: "PILLAR II: ETHOS",
        def: "What is the pattern of effect your actions leave on the world? Intent doesn't matter here — only the smoking crater or the healed wound. Measured across the character's arc, not any single action.",
        tiers: [
            { label: "Benevolent (−5 to −1.67)", text: "Actions objectively protect, heal, uplift, or secure others, often at personal cost. The pattern of effect is net positive. A doctor who loses one patient to a freak accident is still Benevolent — the wake is healing." },
            { label: "Transactional (−1.67 to +1.67)", text: "Actions are transactional, neutral, or zero-sum. You clock in, do the job, clock out. Covers both the passive version (Han Solo pre-arc) and the active version (a disciplined mercenary maintaining net-zero as strategy)." },
            { label: "Malignant (+1.67 to +5)", text: "Actions objectively subjugate, extort, harm, or destroy others. The pattern of effect is net negative. Thanos and the Joker are both Malignant — what makes them different is Nexus, not Ethos." },
        ],
        key: "Ethos is about WHAT RESULTS — it's the purely consequentialist axis. This is where Thanos's self-image as savior collapses: pattern of effect is genocide, regardless of intent."
    },
    z: {
        name: "Nexus — The Scope", color: "#6bcb77", neg: "Parochial", pos: "Universal",
        pillar: "PILLAR III: NEXUS",
        def: "What is the radius of your concern? Who is the target of your Praxis and Ethos? This axis measures how wide the circle of beings whose welfare you treat as morally real.",
        tiers: [
            { label: "Parochial (−5 to −1.67)", text: "The self, the bloodline, the immediate crew, or the adventuring party. Walter White's circle shrinks to one. The Joker's was never larger. Dexter's code serves only his own compulsion." },
            { label: "Factional (−1.67 to +1.67)", text: "The guild, the corporation, the nation, the religion. Magneto's mutantkind. Robin Hood's oppressed class. This is the meso-scale — most real-world loyalty lives here." },
            { label: "Universal (+1.67 to +5)", text: "All of existence, the planet, or absolute abstract ideals. Superman and Thanos are both Universal — one heals at that scale, one kills at it. Same scope, opposite Ethos." },
        ],
        key: "Nexus is about WHO FOR — the scope axis. It's why Thanos and the Joker are maximally distant despite both being Malignant. Universal + Malignant is existential horror. Parochial + Malignant is a crime drama."
    },
};

export const VIEW_PRESETS = [
    { label: "3D", desc: "Free rotation", rx: -0.45, ry: 0.65, key: "1" },
    {
        label: "PE", desc: "Praxis × Ethos", rx: 0, ry: 0, key: "2",
        plane: { axes: ["x", "y"], title: "Praxis × Ethos", sub: "Nexus collapsed — method vs. impact" }
    },
    {
        label: "PN", desc: "Praxis × Nexus", rx: -Math.PI / 2, ry: 0, key: "3",
        plane: { axes: ["x", "z"], title: "Praxis × Nexus", sub: "Ethos collapsed — method vs. scope" }
    },
    {
        label: "EN", desc: "Ethos × Nexus", rx: 0, ry: Math.PI / 2, key: "4",
        plane: { axes: ["y", "z"], title: "Ethos × Nexus", sub: "Praxis collapsed — impact vs. scope" }
    },
];

export const CATEGORY_PALETTES = {
    Fiction: { h: 210, s: 70, l: 65 },
    Literature: { h: 320, s: 60, l: 65 },
    Television: { h: 260, s: 60, l: 65 },
    Film: { h: 180, s: 70, l: 50 },
    "Video Games": { h: 80, s: 70, l: 50 },
    Anime: { h: 15, s: 85, l: 58 },
    "True Crime": { h: 350, s: 80, l: 50 },
    History: { h: 35, s: 75, l: 62 },
    Myth: { h: 280, s: 55, l: 70 },
    Concept: { h: 195, s: 30, l: 60 },
    Government: { h: 0, s: 65, l: 62 },
    Beast: { h: 140, s: 55, l: 55 },
    "D&D SRD": { h: 48, s: 80, l: 50 },
};
