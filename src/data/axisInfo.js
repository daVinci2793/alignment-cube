export const AXIS_INFO = {
    x: {
        name: "Praxis: The Method", color: "#ff6b6b", neg: "Structured", pos: "Unbound",
        pillar: "PILLAR I: PRAXIS",
        def: "How does a character interact with systems, rules, and structure? Praxis measures methodology and disposition. Of the three pillars, this is the only one where internal orientation matters.",
        tiers: [
            { label: "Structured (−5 to −1.67)", text: "Operates within established codes, laws, or rigorous personal routines. Maintains and relies on systems. A paladin's oath and Dexter's code are both Structured. The structure just points in different Ethos directions." },
            { label: "Pragmatic (−1.67 to +1.67)", text: "Highly adaptable. Uses systems when they work, bypasses them when they don't. This isn't the absence of a position; it's the discipline of flexibility. Tony Soprano and Captain America are both more Pragmatic than people assume." },
            { label: "Unbound (+1.67 to +5)", text: "Subverts, exploits, or ignores established norms. Thrives on the unpredictable and looks for vulnerabilities in structure. Rick Sanchez and Robin Hood are both Unbound but diverge on Ethos." },
        ],
        key: "Praxis is about HOW. Two characters can be identically Structured but produce opposite outcomes. The code is the same; what it points at differs."
    },
    y: {
        name: "Ethos: The Impact", color: "#ffd93d", neg: "Benevolent", pos: "Malignant",
        pillar: "PILLAR II: ETHOS",
        def: "What do your actions actually leave behind? Intent doesn't matter here. Only the smoking crater or the healed wound. Measured across a character's arc, not any single action.",
        tiers: [
            { label: "Benevolent (−5 to −1.67)", text: "Actions protect, heal, uplift, or secure others, often at personal cost. The net effect is positive. A doctor who loses one patient to a freak accident is still Benevolent. The wake is healing." },
            { label: "Transactional (−1.67 to +1.67)", text: "Actions are transactional, neutral, or zero-sum. Clock in, do the job, clock out. This covers both the passive version (Han Solo pre-arc) and the active version (a disciplined mercenary keeping the ledger balanced as strategy)." },
            { label: "Malignant (+1.67 to +5)", text: "Actions subjugate, extort, harm, or destroy others. The net effect is negative. Thanos and the Joker are both Malignant. What separates them is Nexus, not Ethos." },
        ],
        key: "Ethos is about WHAT RESULTS. It's the consequentialist axis. This is where Thanos's self-image as savior collapses: the effect is genocide, regardless of intent."
    },
    z: {
        name: "Nexus: The Scope", color: "#6bcb77", neg: "Parochial", pos: "Universal",
        pillar: "PILLAR III: NEXUS",
        def: "How wide is the circle of beings whose welfare you treat as real? Who benefits or suffers from your method and your impact?",
        tiers: [
            { label: "Parochial (−5 to −1.67)", text: "The self, the bloodline, the immediate crew, the adventuring party. Walter White's circle shrinks to one. The Joker's was never larger. Dexter's code serves only his own compulsion." },
            { label: "Factional (−1.67 to +1.67)", text: "The guild, the corporation, the nation, the religion. Magneto's mutantkind. Robin Hood's oppressed class. This is the meso-scale, where most real-world loyalty lives." },
            { label: "Universal (+1.67 to +5)", text: "All of existence, the planet, or absolute abstract ideals. Superman and Thanos are both Universal. One heals at that scale, one kills at it. Same scope, opposite Ethos." },
        ],
        key: "Nexus is about WHO FOR. It's why Thanos and the Joker sit at opposite corners despite both being Malignant. Universal plus Malignant is existential horror. Parochial plus Malignant is a crime drama."
    },
};

export const VIEW_PRESETS = [
    { label: "3D", desc: "Free rotation", rx: -0.45, ry: 0.65, key: "1" },
    {
        label: "PE", desc: "Praxis × Ethos", rx: 0, ry: 0, key: "2",
        plane: { axes: ["x", "y"], title: "Praxis × Ethos", sub: "method vs. impact (flat view)" }
    },
    {
        label: "PN", desc: "Praxis × Nexus", rx: -Math.PI / 2, ry: 0, key: "3",
        plane: { axes: ["x", "z"], title: "Praxis × Nexus", sub: "method vs. reach (flat view)" }
    },
    {
        label: "EN", desc: "Ethos × Nexus", rx: 0, ry: Math.PI / 2, key: "4",
        plane: { axes: ["y", "z"], title: "Ethos × Nexus", sub: "impact vs. reach (flat view)" }
    },
];
