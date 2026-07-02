// ==========================================
// CONFIGURATION & CONSTANTS
// ==========================================
let START_DATE;
let TOTAL_DAYS = 30;
let MAX_DAILY_CAPACITY = 150;

const DATE_WEIGHTS = {
    "2026-03-14": 0.4, "2026-03-15": 0.0, "2026-03-17": 0.4,
    "2026-03-19": 0.0, "2026-03-20": 0.4, "2026-03-22": 0.0,
    "2026-03-24": 0.4,
    "2026-03-25": 0.5, "2026-03-26": 0.0, "2026-03-27": 0.5,
    "2026-03-28": 0.5, "2026-03-29": 0.0, "2026-03-30": 0.5, "2026-03-31": 0.5,
    "2026-04-02": 0.5, "2026-04-03": 0.5, "2026-04-04": 0.5,
    "2026-04-05": 0.5, "2026-04-06": 0.5, "2026-04-07": 0.5,
    "2026-04-08": 0.5, "2026-04-09": 0.5,
    "2026-04-13": 0.0, "2026-04-15": 0.0, "2026-04-17": 0.0
};

let PC_PRIORITY = ['Solid State', 'Surface Chemistry', 'Equivalent Concept', 'Electrochemistry', 'Thermodynamics', 'Ionic Equilibrium', 'Chemical Equilibrium', 'Liquid Solution', 'Chemical Kinetics', 'Gaseous State', 'Atomic Structure', 'Mole Concept', 'Thermochemistry'];
let IOC_PRIORITY = ['p-block Elements', 'Coordination Compounds', 'Chemical Bonding (Advanced)', 'd- and f-block Elements', 'Salt Analysis', 'Chemical Bonding (Basic)', 'Metallurgy', 'Periodic Properties', 's-block Elements', 'Hydrogen and Its Compounds', 'Environmental Chemistry', 'Quantum Numbers'];
let MATH_PRIORITY = ["Permutations and Combinations", "Probability", "Complex Numbers", "Matrices", "Quadratic Equations", "Sequence and Progression", "Binomial Theorem", "Logarithm", "Functions", "ITF", "Limits, Continuity, Differentiability", "Methods of Differentiation", "Indefinite Integration", "Definite Integration", "AOD", "D.E.", "A.U.C.", "Straight Line", "Circle", "Parabola", "Ellipse", "Hyperbola"];
// Priority group for Organic: these 4 chapters are cycled first (Obj→MC→Other), then the rest.
// Matches Python's OC_GROUP1 exactly.
let OC_GROUP1 = ["Alkyl Halides", "Carbonyl Compounds - I", "Carbonyl Compounds - II", "Carboxylic Acids, Amines and their Derivatives"];
// Priority order within Group 2 (all OC chapters not in Group 1). Draggable in settings.
let OC_GROUP2 = ["Hydrocarbons", "Aromatic Compounds", "Isomerism", "GOC", "IUPAC Nomenclature", "Biomolecules, POC, Polymers and Chemistry in Everyday Life"];

// Per-resource section priority — null = no config (use data order).
// Populated by applySettings(); scheduler reads these globals.
// Values: legacy flat array  OR  { mode: 'chapter-first'|'section-first', passes: [[sec,…],…] }
let PC_SECTION_PRIORITY = null;
let IOC_SECTION_PRIORITY = null;
let MATH_YB_SEC_PRIORITY = null;   // Math (Yellow Book)
let MATH_SB_SEC_PRIORITY = null;   // Math (Sameer Bansal)
let MATH_PB_SEC_PRIORITY = null;   // Math (Pink Book)
let PHY_SECTION_PRIORITY = null;
// Custom resources: file → config (array or {mode,passes})
let CUSTOM_SEC_PRIORITIES = {};

// Data moved to PRESET_DATA; RAW_INITIAL_DATA is now empty to ensure no pre-hardcoded additions.
const PRESET_DATA = {
    "OC SKM.csv": [
        { ch: "GOC", sec: "Objective", d: 0, t: 63 }, { ch: "GOC", sec: "Multicorrect", d: 0, t: 91 }, { ch: "GOC", sec: "Comprehension", d: 0, t: 33 }, { ch: "GOC", sec: "Matching", d: 0, t: 10 }, { ch: "GOC", sec: "Integer", d: 0, t: 11 },
        { ch: "Isomerism", sec: "Objective", d: 0, t: 75 }, { ch: "Isomerism", sec: "Multicorrect", d: 0, t: 67 }, { ch: "Isomerism", sec: "Comprehension", d: 0, t: 23 }, { ch: "Isomerism", sec: "Matching", d: 0, t: 16 }, { ch: "Isomerism", sec: "Integer", d: 0, t: 21 },
        { ch: "Alkyl Halides", sec: "Objective", d: 0, t: 74 }, { ch: "Alkyl Halides", sec: "Multicorrect", d: 0, t: 41 }, { ch: "Alkyl Halides", sec: "Comprehension", d: 0, t: 28 }, { ch: "Alkyl Halides", sec: "Matching", d: 0, t: 6 }, { ch: "Alkyl Halides", sec: "Integer", d: 0, t: 10 },
        { ch: "Carbonyl Compounds - I", sec: "Objective", d: 0, t: 60 }, { ch: "Carbonyl Compounds - I", sec: "Multicorrect", d: 0, t: 93 }, { ch: "Carbonyl Compounds - I", sec: "Comprehension", d: 0, t: 20 }, { ch: "Carbonyl Compounds - I", sec: "Matching", d: 0, t: 7 }, { ch: "Carbonyl Compounds - I", sec: "Integer", d: 0, t: 10 },
        { ch: "Carbonyl Compounds - II", sec: "Objective", d: 0, t: 25 }, { ch: "Carbonyl Compounds - II", sec: "Multicorrect", d: 0, t: 31 }, { ch: "Carbonyl Compounds - II", sec: "Comprehension", d: 0, t: 7 }, { ch: "Carbonyl Compounds - II", sec: "Matching", d: 0, t: 4 }, { ch: "Carbonyl Compounds - II", sec: "Integer", d: 0, t: 4 },
        { ch: "Carboxylic Acids, Amines and their Derivatives", sec: "Objective", d: 0, t: 50 }, { ch: "Carboxylic Acids, Amines and their Derivatives", sec: "Multicorrect", d: 0, t: 65 }, { ch: "Carboxylic Acids, Amines and their Derivatives", sec: "Comprehension", d: 0, t: 25 }, { ch: "Carboxylic Acids, Amines and their Derivatives", sec: "Matching", d: 0, t: 9 }, { ch: "Carboxylic Acids, Amines and their Derivatives", sec: "Integer", d: 0, t: 10 },
        { ch: "Aromatic Compounds", sec: "Objective", d: 0, t: 70 }, { ch: "Aromatic Compounds", sec: "Multicorrect", d: 0, t: 68 }, { ch: "Aromatic Compounds", sec: "Comprehension", d: 0, t: 20 }, { ch: "Aromatic Compounds", sec: "Matching", d: 0, t: 7 }, { ch: "Aromatic Compounds", sec: "Integer", d: 0, t: 6 },
        { ch: "Biomolecules, POC, Polymers and Chemistry in Everyday Life", sec: "Objective", d: 0, t: 50 }, { ch: "Biomolecules, POC, Polymers and Chemistry in Everyday Life", sec: "Multicorrect", d: 0, t: 50 }, { ch: "Biomolecules, POC, Polymers and Chemistry in Everyday Life", sec: "Comprehension", d: 0, t: 26 }, { ch: "Biomolecules, POC, Polymers and Chemistry in Everyday Life", sec: "Matching", d: 0, t: 14 }, { ch: "Biomolecules, POC, Polymers and Chemistry in Everyday Life", sec: "Integer", d: 0, t: 15 },
        { ch: "IUPAC Nomenclature", sec: "Objective", d: 0, t: 0 }, { ch: "IUPAC Nomenclature", sec: "Multicorrect", d: 0, t: 106 }, { ch: "IUPAC Nomenclature", sec: "Comprehension", d: 0, t: 19 }, { ch: "IUPAC Nomenclature", sec: "Matching", d: 0, t: 10 }, { ch: "IUPAC Nomenclature", sec: "Integer", d: 0, t: 15 }
    ],
    "IOC VK Jaiswal.csv": [
        { ch: "Quantum Numbers", sec: "Level 1 - Objective", d: 0, t: 28 }, { ch: "Quantum Numbers", sec: "Level 2 - Objective", d: 0, t: 48 }, { ch: "Quantum Numbers", sec: "Level 3 - Passage", d: 0, t: 3 }, { ch: "Quantum Numbers", sec: "Level 3 - Multicorrect", d: 0, t: 7 }, { ch: "Quantum Numbers", sec: "Level 3 - Matching", d: 0, t: 5 }, { ch: "Quantum Numbers", sec: "Level 3 - A/R", d: 0, t: 3 }, { ch: "Quantum Numbers", sec: "Level 3 - Integer", d: 0, t: 8 },
        { ch: "Periodic Properties", sec: "Level 1 - Objective", d: 0, t: 100 }, { ch: "Periodic Properties", sec: "Level 2 - Objective", d: 0, t: 50 }, { ch: "Periodic Properties", sec: "Level 3 - Passage", d: 0, t: 77 }, { ch: "Periodic Properties", sec: "Level 3 - Multicorrect", d: 0, t: 51 }, { ch: "Periodic Properties", sec: "Level 3 - Matching", d: 0, t: 14 }, { ch: "Periodic Properties", sec: "Level 3 - A/R", d: 0, t: 18 }, { ch: "Periodic Properties", sec: "Level 3 - Integer", d: 0, t: 11 },
        { ch: "Chemical Bonding (Basic)", sec: "Level 1 - Objective", d: 0, t: 168 }, { ch: "Chemical Bonding (Basic)", sec: "Level 2 - Objective", d: 0, t: 38 }, { ch: "Chemical Bonding (Basic)", sec: "Level 3 - Passage", d: 0, t: 41 }, { ch: "Chemical Bonding (Basic)", sec: "Level 3 - Multicorrect", d: 0, t: 29 }, { ch: "Chemical Bonding (Basic)", sec: "Level 3 - Matching", d: 0, t: 13 }, { ch: "Chemical Bonding (Basic)", sec: "Level 3 - A/R", d: 0, t: 12 }, { ch: "Chemical Bonding (Basic)", sec: "Level 3 - Integer", d: 0, t: 27 },
        { ch: "Chemical Bonding (Advanced)", sec: "Level 1 - Objective", d: 0, t: 87 }, { ch: "Chemical Bonding (Advanced)", sec: "Level 2 - Objective", d: 0, t: 76 }, { ch: "Chemical Bonding (Advanced)", sec: "Level 3 - Passage", d: 0, t: 52 }, { ch: "Chemical Bonding (Advanced)", sec: "Level 3 - Multicorrect", d: 0, t: 47 }, { ch: "Chemical Bonding (Advanced)", sec: "Level 3 - Matching", d: 0, t: 15 }, { ch: "Chemical Bonding (Advanced)", sec: "Level 3 - A/R", d: 0, t: 29 }, { ch: "Chemical Bonding (Advanced)", sec: "Level 3 - Integer", d: 0, t: 37 },
        { ch: "Coordination Compounds", sec: "Level 1 - Objective", d: 0, t: 224 }, { ch: "Coordination Compounds", sec: "Level 2 - Objective", d: 0, t: 72 }, { ch: "Coordination Compounds", sec: "Level 3 - Passage", d: 0, t: 64 }, { ch: "Coordination Compounds", sec: "Level 3 - Multicorrect", d: 0, t: 46 }, { ch: "Coordination Compounds", sec: "Level 3 - Matching", d: 0, t: 22 }, { ch: "Coordination Compounds", sec: "Level 3 - A/R", d: 0, t: 13 }, { ch: "Coordination Compounds", sec: "Level 3 - Integer", d: 0, t: 41 },
        { ch: "Metallurgy", sec: "Level 1 - Objective", d: 0, t: 81 }, { ch: "Metallurgy", sec: "Level 2 - Objective", d: 0, t: 43 }, { ch: "Metallurgy", sec: "Level 3 - Passage", d: 0, t: 23 }, { ch: "Metallurgy", sec: "Level 3 - Multicorrect", d: 0, t: 38 }, { ch: "Metallurgy", sec: "Level 3 - Matching", d: 0, t: 10 }, { ch: "Metallurgy", sec: "Level 3 - A/R", d: 0, t: 15 }, { ch: "Metallurgy", sec: "Level 3 - Integer", d: 0, t: 0 },
        { ch: "Hydrogen and Its Compounds", sec: "Level 1 - Objective", d: 0, t: 30 }, { ch: "Hydrogen and Its Compounds", sec: "Level 2 - Objective", d: 0, t: 34 }, { ch: "Hydrogen and Its Compounds", sec: "Level 3 - Passage", d: 0, t: 0 }, { ch: "Hydrogen and Its Compounds", sec: "Level 3 - Multicorrect", d: 0, t: 17 }, { ch: "Hydrogen and Its Compounds", sec: "Level 3 - Matching", d: 0, t: 1 }, { ch: "Hydrogen and Its Compounds", sec: "Level 3 - A/R", d: 0, t: 1 }, { ch: "Hydrogen and Its Compounds", sec: "Level 3 - Integer", d: 0, t: 1 },
        { ch: "s-block Elements", sec: "Level 1 - Objective", d: 0, t: 55 }, { ch: "s-block Elements", sec: "Level 2 - Objective", d: 0, t: 43 }, { ch: "s-block Elements", sec: "Level 3 - Passage", d: 0, t: 25 }, { ch: "s-block Elements", sec: "Level 3 - Multicorrect", d: 0, t: 35 }, { ch: "s-block Elements", sec: "Level 3 - Matching", d: 0, t: 8 }, { ch: "s-block Elements", sec: "Level 3 - A/R", d: 0, t: 17 }, { ch: "s-block Elements", sec: "Level 3 - Integer", d: 0, t: 2 },
        { ch: "p-block Elements", sec: "Level 1 - Objective", d: 0, t: 69 }, { ch: "p-block Elements", sec: "Level 2 - Objective", d: 0, t: 89 }, { ch: "p-block Elements", sec: "Level 3 - Passage", d: 0, t: 21 }, { ch: "p-block Elements", sec: "Level 3 - Multicorrect", d: 0, t: 97 }, { ch: "p-block Elements", sec: "Level 3 - Matching", d: 0, t: 24 }, { ch: "p-block Elements", sec: "Level 3 - A/R", d: 0, t: 27 }, { ch: "p-block Elements", sec: "Level 3 - Integer", d: 0, t: 36 },
        { ch: "d- and f-block Elements", sec: "Level 1 - Objective", d: 0, t: 75 }, { ch: "d- and f-block Elements", sec: "Level 2 - Objective", d: 0, t: 92 }, { ch: "d- and f-block Elements", sec: "Level 3 - Passage", d: 0, t: 29 }, { ch: "d- and f-block Elements", sec: "Level 3 - Multicorrect", d: 0, t: 30 }, { ch: "d- and f-block Elements", sec: "Level 3 - Matching", d: 0, t: 6 }, { ch: "d- and f-block Elements", sec: "Level 3 - A/R", d: 0, t: 24 }, { ch: "d- and f-block Elements", sec: "Level 3 - Integer", d: 0, t: 7 },
        { ch: "Salt Analysis", sec: "Level 1 - Objective", d: 0, t: 92 }, { ch: "Salt Analysis", sec: "Level 2 - Objective", d: 0, t: 77 }, { ch: "Salt Analysis", sec: "Level 3 - Passage", d: 0, t: 85 }, { ch: "Salt Analysis", sec: "Level 3 - Multicorrect", d: 0, t: 45 }, { ch: "Salt Analysis", sec: "Level 3 - Matching", d: 0, t: 9 }, { ch: "Salt Analysis", sec: "Level 3 - A/R", d: 0, t: 18 }, { ch: "Salt Analysis", sec: "Level 3 - Integer", d: 0, t: 6 },
        { ch: "Environmental Chemistry", sec: "Level 1 - Objective", d: 0, t: 29 }, { ch: "Environmental Chemistry", sec: "Level 2 - Objective", d: 0, t: 21 }, { ch: "Environmental Chemistry", sec: "Level 3 - Passage", d: 0, t: 2 }, { ch: "Environmental Chemistry", sec: "Level 3 - Multicorrect", d: 0, t: 4 }, { ch: "Environmental Chemistry", sec: "Level 3 - Matching", d: 0, t: 4 }, { ch: "Environmental Chemistry", sec: "Level 3 - A/R", d: 0, t: 7 }, { ch: "Environmental Chemistry", sec: "Level 3 - Integer", d: 0, t: 0 }
    ],
    "Physics (GQB).csv": [
        { ch: "Full Syllabus", sec: "Subjective", d: 0, t: 80 }, { ch: "Full Syllabus", sec: "Objective", d: 0, t: 225 }, { ch: "Full Syllabus", sec: "A/R", d: 0, t: 20 }, { ch: "Full Syllabus", sec: "Multi-correct", d: 0, t: 65 }, { ch: "Full Syllabus", sec: "Comprehension", d: 0, t: 90 }, { ch: "Full Syllabus", sec: "Numerical", d: 0, t: 65 }, { ch: "Full Syllabus", sec: "Matching", d: 0, t: 45 }
    ],
    "Math (Pink Book).csv": [
        { ch: "Straight Line", sec: "Exercise 1 (Objective)", d: 0, t: 70 }, { ch: "Straight Line", sec: "Exercise 2 (Multicorrect)", d: 0, t: 23 }, { ch: "Straight Line", sec: "Exercise 3 (Comprehension)", d: 0, t: 41 }, { ch: "Straight Line", sec: "Exercise 4 (A/R)", d: 0, t: 10 }, { ch: "Straight Line", sec: "Exercise 5 (Matching)", d: 0, t: 7 }, { ch: "Straight Line", sec: "Exercise 6 (Integer)", d: 0, t: 20 },
        { ch: "Circle", sec: "Exercise 1 (Objective)", d: 0, t: 66 }, { ch: "Circle", sec: "Exercise 2 (Multicorrect)", d: 0, t: 18 }, { ch: "Circle", sec: "Exercise 3 (Comprehension)", d: 0, t: 48 }, { ch: "Circle", sec: "Exercise 4 (A/R)", d: 0, t: 11 }, { ch: "Circle", sec: "Exercise 5 (Matching)", d: 0, t: 12 }, { ch: "Circle", sec: "Exercise 6 (Integer)", d: 0, t: 16 },
        { ch: "Parabola", sec: "Exercise 1 (Objective)", d: 0, t: 33 }, { ch: "Parabola", sec: "Exercise 2 (Multicorrect)", d: 0, t: 21 }, { ch: "Parabola", sec: "Exercise 3 (Comprehension)", d: 0, t: 31 }, { ch: "Parabola", sec: "Exercise 4 (A/R)", d: 0, t: 0 }, { ch: "Parabola", sec: "Exercise 5 (Matching)", d: 0, t: 7 }, { ch: "Parabola", sec: "Exercise 6 (Integer)", d: 0, t: 13 },
        { ch: "Ellipse", sec: "Exercise 1 (Objective)", d: 0, t: 32 }, { ch: "Ellipse", sec: "Exercise 2 (Multicorrect)", d: 0, t: 16 }, { ch: "Ellipse", sec: "Exercise 3 (Comprehension)", d: 0, t: 14 }, { ch: "Ellipse", sec: "Exercise 4 (A/R)", d: 0, t: 0 }, { ch: "Ellipse", sec: "Exercise 5 (Matching)", d: 0, t: 4 }, { ch: "Ellipse", sec: "Exercise 6 (Integer)", d: 0, t: 12 },
        { ch: "Hyperbola", sec: "Exercise 1 (Objective)", d: 0, t: 22 }, { ch: "Hyperbola", sec: "Exercise 2 (Multicorrect)", d: 0, t: 11 }, { ch: "Hyperbola", sec: "Exercise 3 (Comprehension)", d: 0, t: 13 }, { ch: "Hyperbola", sec: "Exercise 4 (A/R)", d: 0, t: 0 }, { ch: "Hyperbola", sec: "Exercise 5 (Matching)", d: 0, t: 4 }, { ch: "Hyperbola", sec: "Exercise 6 (Integer)", d: 0, t: 5 }
    ],
    "Math (Sameer Bansal).csv": [
        { ch: "Functions", sec: "Exercise 1 (Objective)", d: 0, t: 36 }, { ch: "Functions", sec: "Exercise 2 (Comprehension)", d: 0, t: 19 }, { ch: "Functions", sec: "Exercise 3 (Multicorrect)", d: 0, t: 19 }, { ch: "Functions", sec: "Exercise 4 (Matching)", d: 0, t: 7 }, { ch: "Functions", sec: "Exercise 5 (Integer)", d: 0, t: 23 },
        { ch: "ITF", sec: "Exercise 1 (Objective)", d: 0, t: 48 }, { ch: "ITF", sec: "Exercise 2 (Comprehension)", d: 0, t: 19 }, { ch: "ITF", sec: "Exercise 3 (Multicorrect)", d: 0, t: 17 }, { ch: "ITF", sec: "Exercise 4 (Matching)", d: 0, t: 9 }, { ch: "ITF", sec: "Exercise 5 (Integer)", d: 0, t: 30 },
        { ch: "Limits, Continuity, Differentiability", sec: "Exercise 1 (Objective)", d: 0, t: 50 }, { ch: "Limits, Continuity, Differentiability", sec: "Exercise 2 (Comprehension)", d: 0, t: 32 }, { ch: "Limits, Continuity, Differentiability", sec: "Exercise 3 (Multicorrect)", d: 0, t: 30 }, { ch: "Limits, Continuity, Differentiability", sec: "Exercise 4 (Matching)", d: 0, t: 8 }, { ch: "Limits, Continuity, Differentiability", sec: "Exercise 5 (Integer)", d: 0, t: 47 },
        { ch: "Methods of Differentiation", sec: "Exercise 1 (Objective)", d: 0, t: 37 }, { ch: "Methods of Differentiation", sec: "Exercise 2 (Comprehension)", d: 0, t: 14 }, { ch: "Methods of Differentiation", sec: "Exercise 3 (Multicorrect)", d: 0, t: 9 }, { ch: "Methods of Differentiation", sec: "Exercise 4 (Matching)", d: 0, t: 2 }, { ch: "Methods of Differentiation", sec: "Exercise 5 (Integer)", d: 0, t: 16 },
        { ch: "Indefinite Integration", sec: "Exercise 1 (Objective)", d: 0, t: 31 }, { ch: "Indefinite Integration", sec: "Exercise 2 (Comprehension)", d: 0, t: 8 }, { ch: "Indefinite Integration", sec: "Exercise 3 (Multicorrect)", d: 0, t: 4 }, { ch: "Indefinite Integration", sec: "Exercise 4 (Matching)", d: 0, t: 1 }, { ch: "Indefinite Integration", sec: "Exercise 5 (Integer)", d: 0, t: 11 },
        { ch: "Definite Integration", sec: "Exercise 1 (Objective)", d: 0, t: 85 }, { ch: "Definite Integration", sec: "Exercise 2 (Comprehension)", d: 0, t: 37 }, { ch: "Definite Integration", sec: "Exercise 3 (Multicorrect)", d: 0, t: 19 }, { ch: "Definite Integration", sec: "Exercise 4 (Matching)", d: 0, t: 9 }, { ch: "Definite Integration", sec: "Exercise 5 (Integer)", d: 0, t: 50 },
        { ch: "AOD", sec: "Exercise 1 (Objective)", d: 0, t: 43 }, { ch: "AOD", sec: "Exercise 2 (Comprehension)", d: 0, t: 58 }, { ch: "AOD", sec: "Exercise 3 (Multicorrect)", d: 0, t: 21 }, { ch: "AOD", sec: "Exercise 4 (Matching)", d: 0, t: 5 }, { ch: "AOD", sec: "Exercise 5 (Integer)", d: 0, t: 34 },
        { ch: "D.E.", sec: "Exercise 1 (Objective)", d: 0, t: 25 }, { ch: "D.E.", sec: "Exercise 2 (Comprehension)", d: 0, t: 17 }, { ch: "D.E.", sec: "Exercise 3 (Multicorrect)", d: 0, t: 10 }, { ch: "D.E.", sec: "Exercise 4 (Matching)", d: 0, t: 0 }, { ch: "D.E.", sec: "Exercise 5 (Integer)", d: 0, t: 6 },
        { ch: "A.U.C.", sec: "Exercise 1 (Objective)", d: 0, t: 28 }, { ch: "A.U.C.", sec: "Exercise 2 (Comprehension)", d: 0, t: 18 }, { ch: "A.U.C.", sec: "Exercise 3 (Multicorrect)", d: 0, t: 5 }, { ch: "A.U.C.", sec: "Exercise 4 (Matching)", d: 0, t: 0 }, { ch: "A.U.C.", sec: "Exercise 5 (Integer)", d: 0, t: 18 }
    ],
    "Math (Yellow Book).csv": [
        { ch: "Quadratic Equations", sec: "Exercise 1 (Objective)", d: 0, t: 41 }, { ch: "Quadratic Equations", sec: "Exercise 2 (Multicorrect)", d: 0, t: 41 }, { ch: "Quadratic Equations", sec: "Exercise 3 (Comprehension)", d: 0, t: 35 }, { ch: "Quadratic Equations", sec: "Exercise 4 (Matching)", d: 0, t: 4 }, { ch: "Quadratic Equations", sec: "Exercise 5 (Integer)", d: 0, t: 55 },
        { ch: "Sequence and Progression", sec: "Exercise 1 (Objective)", d: 0, t: 40 }, { ch: "Sequence and Progression", sec: "Exercise 2 (Multicorrect)", d: 0, t: 40 }, { ch: "Sequence and Progression", sec: "Exercise 3 (Comprehension)", d: 0, t: 30 }, { ch: "Sequence and Progression", sec: "Exercise 4 (Matching)", d: 0, t: 5 }, { ch: "Sequence and Progression", sec: "Exercise 5 (Integer)", d: 0, t: 36 },
        { ch: "Permutations and Combinations", sec: "Exercise 1 (Objective)", d: 0, t: 36 }, { ch: "Permutations and Combinations", sec: "Exercise 2 (Multicorrect)", d: 0, t: 19 }, { ch: "Permutations and Combinations", sec: "Exercise 3 (Comprehension)", d: 0, t: 28 }, { ch: "Permutations and Combinations", sec: "Exercise 4 (Matching)", d: 0, t: 7 }, { ch: "Permutations and Combinations", sec: "Exercise 5 (Integer)", d: 0, t: 41 },
        { ch: "Binomial Theorem", sec: "Exercise 1 (Objective)", d: 0, t: 30 }, { ch: "Binomial Theorem", sec: "Exercise 2 (Multicorrect)", d: 0, t: 30 }, { ch: "Binomial Theorem", sec: "Exercise 3 (Comprehension)", d: 0, t: 10 }, { ch: "Binomial Theorem", sec: "Exercise 4 (Matching)", d: 0, t: 5 }, { ch: "Binomial Theorem", sec: "Exercise 5 (Integer)", d: 0, t: 28 },
        { ch: "Probability", sec: "Exercise 1 (Objective)", d: 0, t: 55 }, { ch: "Probability", sec: "Exercise 2 (Multicorrect)", d: 0, t: 17 }, { ch: "Probability", sec: "Exercise 3 (Comprehension)", d: 0, t: 46 }, { ch: "Probability", sec: "Exercise 4 (Matching)", d: 0, t: 9 }, { ch: "Probability", sec: "Exercise 5 (Integer)", d: 0, t: 24 },
        { ch: "Matrices", sec: "Exercise 1 (Objective)", d: 0, t: 25 }, { ch: "Matrices", sec: "Exercise 2 (Multicorrect)", d: 0, t: 34 }, { ch: "Matrices", sec: "Exercise 3 (Comprehension)", d: 0, t: 29 }, { ch: "Matrices", sec: "Exercise 4 (Matching)", d: 0, t: 5 }, { ch: "Matrices", sec: "Exercise 5 (Integer)", d: 0, t: 25 },
        { ch: "Complex Numbers", sec: "Exercise 1 (Objective)", d: 0, t: 35 }, { ch: "Complex Numbers", sec: "Exercise 2 (Multicorrect)", d: 0, t: 37 }, { ch: "Complex Numbers", sec: "Exercise 3 (Comprehension)", d: 0, t: 26 }, { ch: "Complex Numbers", sec: "Exercise 4 (Matching)", d: 0, t: 3 }, { ch: "Complex Numbers", sec: "Exercise 5 (Integer)", d: 0, t: 32 },
        { ch: "Logarithm", sec: "Exercise 1 (Objective)", d: 0, t: 10 }, { ch: "Logarithm", sec: "Exercise 2 (Multicorrect)", d: 0, t: 8 }, { ch: "Logarithm", sec: "Exercise 3 (Comprehension)", d: 0, t: 9 }, { ch: "Logarithm", sec: "Exercise 4 (Matching)", d: 0, t: 0 }, { ch: "Logarithm", sec: "Exercise 5 (Integer)", d: 0, t: 22 }
    ],
    "Neeraj Kumar JA.csv": [
        { ch: "Mole Concept", sec: "Section A (Objective)", d: 0, t: 80 }, { ch: "Mole Concept", sec: "Section B (Multicorrect)", d: 0, t: 30 }, { ch: "Mole Concept", sec: "Section C (Comprehension)", d: 0, t: 45 }, { ch: "Mole Concept", sec: "Section D (A/R)", d: 0, t: 15 }, { ch: "Mole Concept", sec: "Section E (Matching)", d: 0, t: 15 }, { ch: "Mole Concept", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 20 }, { ch: "Mole Concept", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 20 },
        { ch: "Equivalent Concept", sec: "Section A (Objective)", d: 0, t: 75 }, { ch: "Equivalent Concept", sec: "Section B (Multicorrect)", d: 0, t: 20 }, { ch: "Equivalent Concept", sec: "Section C (Comprehension)", d: 0, t: 30 }, { ch: "Equivalent Concept", sec: "Section D (A/R)", d: 0, t: 15 }, { ch: "Equivalent Concept", sec: "Section E (Matching)", d: 0, t: 10 }, { ch: "Equivalent Concept", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 20 }, { ch: "Equivalent Concept", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 20 },
        { ch: "Gaseous State", sec: "Section A (Objective)", d: 0, t: 95 }, { ch: "Gaseous State", sec: "Section B (Multicorrect)", d: 0, t: 20 }, { ch: "Gaseous State", sec: "Section C (Comprehension)", d: 0, t: 45 }, { ch: "Gaseous State", sec: "Section D (A/R)", d: 0, t: 20 }, { ch: "Gaseous State", sec: "Section E (Matching)", d: 0, t: 10 }, { ch: "Gaseous State", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 15 }, { ch: "Gaseous State", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 20 },
        { ch: "Thermodynamics", sec: "Section A (Objective)", d: 0, t: 80 }, { ch: "Thermodynamics", sec: "Section B (Multicorrect)", d: 0, t: 30 }, { ch: "Thermodynamics", sec: "Section C (Comprehension)", d: 0, t: 30 }, { ch: "Thermodynamics", sec: "Section D (A/R)", d: 0, t: 15 }, { ch: "Thermodynamics", sec: "Section E (Matching)", d: 0, t: 10 }, { ch: "Thermodynamics", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 15 }, { ch: "Thermodynamics", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 20 },
        { ch: "Thermochemistry", sec: "Section A (Objective)", d: 0, t: 55 }, { ch: "Thermochemistry", sec: "Section B (Multicorrect)", d: 0, t: 15 }, { ch: "Thermochemistry", sec: "Section C (Comprehension)", d: 0, t: 34 }, { ch: "Thermochemistry", sec: "Section D (A/R)", d: 0, t: 10 }, { ch: "Thermochemistry", sec: "Section E (Matching)", d: 0, t: 10 }, { ch: "Thermochemistry", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 10 }, { ch: "Thermochemistry", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 20 },
        { ch: "Chemical Equilibrium", sec: "Section A (Objective)", d: 0, t: 60 }, { ch: "Chemical Equilibrium", sec: "Section B (Multicorrect)", d: 0, t: 25 }, { ch: "Chemical Equilibrium", sec: "Section C (Comprehension)", d: 0, t: 24 }, { ch: "Chemical Equilibrium", sec: "Section D (A/R)", d: 0, t: 10 }, { ch: "Chemical Equilibrium", sec: "Section E (Matching)", d: 0, t: 10 }, { ch: "Chemical Equilibrium", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 15 }, { ch: "Chemical Equilibrium", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 15 },
        { ch: "Ionic Equilibrium", sec: "Section A (Objective)", d: 0, t: 80 }, { ch: "Ionic Equilibrium", sec: "Section B (Multicorrect)", d: 0, t: 20 }, { ch: "Ionic Equilibrium", sec: "Section C (Comprehension)", d: 0, t: 35 }, { ch: "Ionic Equilibrium", sec: "Section D (A/R)", d: 0, t: 10 }, { ch: "Ionic Equilibrium", sec: "Section E (Matching)", d: 0, t: 5 }, { ch: "Ionic Equilibrium", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 10 }, { ch: "Ionic Equilibrium", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 10 },
        { ch: "Electrochemistry", sec: "Section A (Objective)", d: 0, t: 80 }, { ch: "Electrochemistry", sec: "Section B (Multicorrect)", d: 0, t: 15 }, { ch: "Electrochemistry", sec: "Section C (Comprehension)", d: 0, t: 53 }, { ch: "Electrochemistry", sec: "Section D (A/R)", d: 0, t: 15 }, { ch: "Electrochemistry", sec: "Section E (Matching)", d: 0, t: 4 }, { ch: "Electrochemistry", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 15 }, { ch: "Electrochemistry", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 15 },
        { ch: "Solid State", sec: "Section A (Objective)", d: 0, t: 40 }, { ch: "Solid State", sec: "Section B (Multicorrect)", d: 0, t: 25 }, { ch: "Solid State", sec: "Section C (Comprehension)", d: 0, t: 38 }, { ch: "Solid State", sec: "Section D (A/R)", d: 0, t: 20 }, { ch: "Solid State", sec: "Section E (Matching)", d: 0, t: 11 }, { ch: "Solid State", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 15 }, { ch: "Solid State", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 15 },
        { ch: "Liquid Solution", sec: "Section A (Objective)", d: 0, t: 70 }, { ch: "Liquid Solution", sec: "Section B (Multicorrect)", d: 0, t: 15 }, { ch: "Liquid Solution", sec: "Section C (Comprehension)", d: 0, t: 32 }, { ch: "Liquid Solution", sec: "Section D (A/R)", d: 0, t: 10 }, { ch: "Liquid Solution", sec: "Section E (Matching)", d: 0, t: 7 }, { ch: "Liquid Solution", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 10 }, { ch: "Liquid Solution", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 15 },
        { ch: "Chemical Kinetics", sec: "Section A (Objective)", d: 0, t: 75 }, { ch: "Chemical Kinetics", sec: "Section B (Multicorrect)", d: 0, t: 30 }, { ch: "Chemical Kinetics", sec: "Section C (Comprehension)", d: 0, t: 56 }, { ch: "Chemical Kinetics", sec: "Section D (A/R)", d: 0, t: 10 }, { ch: "Chemical Kinetics", sec: "Section E (Matching)", d: 0, t: 10 }, { ch: "Chemical Kinetics", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 25 }, { ch: "Chemical Kinetics", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 25 },
        { ch: "Surface Chemistry", sec: "Section A (Objective)", d: 0, t: 30 }, { ch: "Surface Chemistry", sec: "Section B (Multicorrect)", d: 0, t: 25 }, { ch: "Surface Chemistry", sec: "Section C (Comprehension)", d: 0, t: 20 }, { ch: "Surface Chemistry", sec: "Section D (A/R)", d: 0, t: 20 }, { ch: "Surface Chemistry", sec: "Section E (Matching)", d: 0, t: 4 }, { ch: "Surface Chemistry", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 10 }, { ch: "Surface Chemistry", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 10 },
        { ch: "Atomic Structure", sec: "Section A (Objective)", d: 0, t: 110 }, { ch: "Atomic Structure", sec: "Section B (Multicorrect)", d: 0, t: 20 }, { ch: "Atomic Structure", sec: "Section C (Comprehension)", d: 0, t: 46 }, { ch: "Atomic Structure", sec: "Section D (A/R)", d: 0, t: 10 }, { ch: "Atomic Structure", sec: "Section E (Matching)", d: 0, t: 10 }, { ch: "Atomic Structure", sec: "Section F (a) (Single-digit Integer)", d: 0, t: 10 }, { ch: "Atomic Structure", sec: "Section F (a) (Four-digit Integer)", d: 0, t: 10 }
    ]
};
const RAW_INITIAL_DATA = {}; // Empty strictly.

const DEFAULT_RESOURCES = Object.freeze([]);
const DEFAULT_RESOURCE_FILES = new Set();
const DEFAULT_RES_COLORS = Object.freeze({});

let RESOURCES_LIST = [];

// Subject → accent color map
let SUBJ_COLORS = {
    '🧪 ORGANIC (SKM)': '#f5a623',
    '🧮 MATHS': '#a78bfa',
    '⚗️ PHYSICAL CHEM': '#38bdf8',
    '🧬 INORGANIC CHEM': '#34d399',
    '🧲 PHYSICS': '#fb7185',
};
// Resource file → color
let RES_COLORS = { ...DEFAULT_RES_COLORS };
let appData = { resources: {}, completions: {}, skipped: {}, injectedTasks: {}, ocCompleted: {} };
let undoStack = [];
const RANKS = [
    { min: 0, title: 'Initiate', icon: '🪨' },
    { min: 5, title: 'Recruit', icon: '🔰' },
    { min: 10, title: 'Cadet', icon: '🎽' },
    { min: 15, title: 'Scout', icon: '🏹' },
    { min: 20, title: 'Soldier', icon: '🛡️' },
    { min: 25, title: 'Corporal', icon: '🎖️' },
    { min: 30, title: 'Sergeant', icon: '💪' },
    { min: 35, title: 'Lieutenant', icon: '🌟' },
    { min: 40, title: 'Captain', icon: '⚡' },
    { min: 45, title: 'Major', icon: '🔥' },
    { min: 50, title: 'Colonel', icon: '💎' },
    { min: 55, title: 'Commander', icon: '🌊' },
    { min: 60, title: 'Brigadier', icon: '🦅' },
    { min: 65, title: 'General', icon: '🏆' },
    { min: 70, title: 'Marshal', icon: '👑' },
    { min: 75, title: 'Warlord', icon: '⚔️' },
    { min: 80, title: 'Conqueror', icon: '🌍' },
    { min: 85, title: 'Champion', icon: '🥇' },
    { min: 90, title: 'Grandmaster', icon: '🎯' },
    { min: 95, title: 'Legend', icon: '🌠' },
    { min: 100, title: 'Apex', icon: '🔱' },
];

let BADGE_DEFS = [
    // General — per-action (fire every qualifying session)
    { id: 'first_blood', name: 'First Blood', icon: '🩸', desc: 'First log of a day — fresh start.', cat: 'General', color: '#f87171', perAction: true },
    { id: 'half_century', name: 'Half Century', icon: '🏏', desc: '50+ Qs in a single log session.', cat: 'General', color: '#fb923c', perAction: true },
    { id: 'century', name: 'Century', icon: '💯', desc: '100+ Qs in a single log session.', cat: 'General', color: '#fbbf24', perAction: true },
    { id: 'double_century', name: 'Double Century', icon: '🌋', desc: '200+ Qs in a single log session.', cat: 'General', color: '#f5a623', perAction: true },
    { id: 'triple_century', name: 'Triple Century', icon: '☄️', desc: '300+ Qs in a single log session.', cat: 'General', color: '#e07b00', perAction: true },
    // General — cumulative global (fire once ever)
    { id: 'war_machine', name: 'War Machine', icon: '⚙️', desc: '500 total questions logged.', cat: 'General', color: '#a78bfa' },
    { id: 'thousand', name: 'Thousand Warrior', icon: '⚔️', desc: '1000 total questions logged.', cat: 'General', color: '#818cf8' },
    { id: 'five_thousand', name: 'Five Thousand', icon: '🏔️', desc: '5000 total questions logged.', cat: 'General', color: '#6366f1' },
    // Daily — per-action
    { id: 'early_bird', name: 'Early Bird', icon: '🐦', desc: 'Logged something on Day 1.', cat: 'Daily', color: '#34d399' },
    { id: 'perfect_day', name: 'Perfect Day', icon: '✅', desc: "Completed 100% of a day's assigned tasks.", cat: 'Daily', color: '#6ee7b7', perAction: true },
    { id: 'overdrive', name: 'Overdrive', icon: '🚀', desc: 'Exceeded the daily question cap.', cat: 'Daily', color: '#38bdf8', perAction: true },
    { id: 'iron_will', name: 'Iron Will', icon: '🪖', desc: 'Logged on a class + test day (0.4 weight).', cat: 'Daily', color: '#fb7185', perAction: true },
    { id: 'weekend_warrior', name: 'Weekend Warrior', icon: '🗡️', desc: 'Logged on a half-study day (0.5 weight).', cat: 'Daily', color: '#f472b6', perAction: true },
    // Streak — global
    { id: 'midnight_hunter', name: 'Midnight Hunter', icon: '🦉', desc: 'Logged a task between midnight and 4 AM.', cat: 'Daily', color: '#9333ea', perAction: true },
    { id: 'on_a_roll', name: 'On A Roll', icon: '🎲', desc: 'Maintained a 3-day logging streak.', cat: 'Streak', color: '#fbbf24' },
    { id: 'unstoppable', name: 'Unstoppable', icon: '🌪️', desc: 'Maintained a 7-day logging streak.', cat: 'Streak', color: '#f5a623' }
];

function updateDynamicBadges() {
    BADGE_DEFS = BADGE_DEFS.filter(b => b.cat !== 'Subject');
    let subjGroups = {};
    RESOURCES_LIST.forEach(r => {
        let meta = (appData.settings?.customResources || []).find(c => c.file === r.file) || {};
        let subj = meta.subj || '📦 EXTRA';
        if (!subjGroups[subj]) subjGroups[subj] = { color: meta.color || '#a78bfa' };
    });
    for (let subj in subjGroups) {
        let subjId = subj.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        let color = subjGroups[subj].color;
        let shortName = subj.replace(/[^a-zA-Z ]/g, '').trim().split(' ')[0] || 'Subject';
        BADGE_DEFS.push({ id: `${subjId}_25`, name: `${shortName} Initiate`, icon: '🥉', desc: `Completed 25% of ${subj}.`, cat: 'Subject', color: color });
        BADGE_DEFS.push({ id: `${subjId}_50`, name: `${shortName} Master`, icon: '🏅', desc: `Completed 50% of ${subj}.`, cat: 'Subject', color: color });
    }
}

function getRank(pct) {
    let r = RANKS[0];
    for (let rank of RANKS) { if (pct >= rank.min) r = rank; }
    return r;
}

// Returns {gD, gT, chaps} for OC entirely from OC_ASSIGNMENTS + ocCompleted
function _ocTrackerData() {
    let gD = 0, gT = 0, chaps = {};
    if (typeof OC_ASSIGNMENTS === 'undefined') return { gD, gT, chaps };
    for (let ch in OC_ASSIGNMENTS) {
        if (!chaps[ch]) chaps[ch] = { d: 0, t: 0, s: 0, secs: [] };
        for (let sec in OC_ASSIGNMENTS[ch]) {
            let qs = OC_ASSIGNMENTS[ch][sec];
            if (!Array.isArray(qs)) continue;
            let ticked = (appData.ocCompleted && appData.ocCompleted[`${ch}|${sec}`]) || [];
            let d = ticked.filter(q => qs.includes(q)).length;
            let t = qs.length;
            chaps[ch].d += d; chaps[ch].t += t;
            chaps[ch].secs.push({ sec, d, t, s: 0 });
            gD += d; gT += t;
        }
    }
    return { gD, gT, chaps };
}

function _subjFilePct(files) {
    let d = 0, t = 0;
    for (let fn of files) {
        if (fn === 'OC SKM.csv') {
            let { gD, gT } = _ocTrackerData();
            d += gD; t += gT;
        } else {
            (appData.resources[fn] || []).forEach(r => { d += r.d + (r.s || 0); t += r.t; });
        }
    }
    return t > 0 ? (d / t) * 100 : 0;
}

// Evaluate only global (once-ever) badges from current data state
function evaluateGlobalBadges() {
    let earned = new Set();
    let totalAll = 0;
    for (let ds in appData.completions) appData.completions[ds].forEach(c => totalAll += c.done);

    if (totalAll >= 500) earned.add('war_machine');
    if (totalAll >= 1000) earned.add('thousand');
    if (totalAll >= 5000) earned.add('five_thousand');

    let day1 = getDateStr(0);
    if (appData.completions[day1] && appData.completions[day1].length > 0) earned.add('early_bird');

    let streak = getStreak(currentActualDayIdx);
    if (streak >= 3) earned.add('on_a_roll');
    if (streak >= 7) earned.add('unstoppable');

    let subjGroups = {};
    RESOURCES_LIST.forEach(r => {
        let meta = (appData.settings?.customResources || []).find(c => c.file === r.file) || {};
        let subj = meta.subj || '📦 EXTRA';
        if (!subjGroups[subj]) subjGroups[subj] = [];
        subjGroups[subj].push(r.file);
    });

    for (let subj in subjGroups) {
        let pct = _subjFilePct(subjGroups[subj]);
        let subjId = subj.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        if (pct >= 25) earned.add(`${subjId}_25`);
        if (pct >= 50) earned.add(`${subjId}_50`);
    }

    return earned;
}

// For the stats grid: per-action badges shown if ever stored, global re-evaluated
function evaluateAllBadges() {
    let stored = getStoredBadges();
    let global = evaluateGlobalBadges();
    return new Set([...stored, ...global]);
}

function getStoredBadges() {
    return new Set(appData.badges || []);
}

function storeBadges(set) {
    appData.badges = [...set];
}

// Per-action badges fire when the day's running total crosses a threshold.
// Global badges fire once ever. Both stamp countNow on the returned def objects.
function getNewlyEarnedBadges(dailyTotalBefore, dailyTotalAfter, wasFirstLogToday, isPerfectDay, isOverdrive) {
    let ids = [];
    let counts = appData.badgeCounts || {};

    if (wasFirstLogToday) {
        ids.push('first_blood');
        let w = getDayWeight(currentActualDayIdx);
        if (w === 0.4) ids.push('iron_will');
        if (w === 0.5) ids.push('weekend_warrior');
    }
    const thresholds = [[50, 'half_century'], [100, 'century'], [200, 'double_century'], [300, 'triple_century']];
    for (let [thr, id] of thresholds)
        if (dailyTotalBefore < thr && dailyTotalAfter >= thr) ids.push(id);
    if (isPerfectDay) ids.push('perfect_day');
    if (isOverdrive) ids.push('overdrive');
    // Midnight Hunter: first log of a wall-clock day between 12 AM and 4 AM
    if (wasFirstLogToday) {
        let nowH = new Date().getHours();
        if (nowH >= 0 && nowH < 4) ids.push('midnight_hunter');
    }

    let prev = getStoredBadges();
    let curr = evaluateGlobalBadges();
    curr.forEach(id => { if (!prev.has(id)) ids.push(id); });

    ids.forEach(id => {
        let def = BADGE_DEFS.find(b => b.id === id);
        if (def && def.perAction) counts[id] = (counts[id] || 0) + 1;
    });
    appData.badgeCounts = counts;
    storeBadges(new Set([...prev, ...curr, ...ids]));

    return ids.map(id => {
        let def = BADGE_DEFS.find(b => b.id === id);
        if (!def) return null;
        return { ...def, countNow: counts[id] || 1 };
    }).filter(Boolean);
}


function getPersonalBest() {
    let best = 0, bestDay = null;
    for (let ds in appData.completions) {
        let total = appData.completions[ds].reduce((s, c) => s + c.done, 0);
        if (total > best) { best = total; bestDay = ds; }
    }
    return { best, bestDay };
}

function isChapterComplete(filename, chapterName) {
    let rows = (appData.resources[filename] || []).filter(r => r.ch === chapterName);
    if (!rows.length) return false;
    return rows.every(r => (r.t - r.d - (r.s || 0)) <= 0);
}

function getWeeklyStats() {
    let days = [];
    for (let i = 6; i >= 0; i--) {
        let idx = currentActualDayIdx - i;
        if (idx < 0 || idx >= TOTAL_DAYS) { days.push(null); continue; }
        let ds = getDateStr(idx);
        let dc = appData.completions[ds] || [];
        let total = dc.reduce((s, c) => s + c.done, 0);
        let w = getDayWeight(idx);
        days.push({ ds, total, weight: w, idx });
    }
    return days;
}
let currentActualDayIdx = 0;
let viewingDayIdx = 0;
let _dayNavDir = 0; // -1 = back, 1 = forward, 0 = jump
let masterSchedules = {};
let allQueuesClean = {};
let needsRebuild = true;
let currentVisIdx = 0;

// Current Modal Context
let modalContext = null;

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function getDateStr(dayIdx) {
    let d = new Date(START_DATE.getTime() + dayIdx * 86400000);
    return d.toISOString().split('T')[0];
}

function getDayWeight(dayIdx) {
    let ds = getDateStr(dayIdx);
    let overrides = appData.settings?.dayTypeOverrides || {};
    if (overrides[ds] !== undefined) return overrides[ds];
    return DATE_WEIGHTS[ds] !== undefined ? DATE_WEIGHTS[ds] : 1.0;
}

function getCompletionsForDay(dayIdx) {
    let ds = getDateStr(dayIdx);
    return appData.completions[ds] || [];
}

function getStreak(currentDayIdx) {
    let streak = 0;
    for (let d = currentDayIdx - 1; d >= 0; d--) {
        if (getDayWeight(d) === 0.0) continue;
        let ds = getDateStr(d);
        if (appData.completions[ds] && appData.completions[ds].length > 0) streak++;
        else break;
    }
    return streak;
}

function getCompletionRatioToday() {
    let comps = getCompletionsForDay(currentActualDayIdx);
    let totalDone = comps.reduce((sum, c) => sum + c.done, 0);
    let totalAssigned = totalDone; // start with done; add pending from schedule
    if (masterSchedules && Object.keys(masterSchedules).length > 0) {
        let loggedKeys = new Set(comps.map(c => `${c.chapter}|${c.section.trim()}`));
        for (let subj in masterSchedules) {
            let tasks = masterSchedules[subj][currentActualDayIdx] || [];
            tasks.filter(t => !loggedKeys.has(`${t.chapter}|${t.section.trim()}`))
                .forEach(t => totalAssigned += t.qs);
        }
    }
    let mStats = getMissionStatsForDay(currentActualDayIdx);
    totalDone += mStats.done;
    totalAssigned += Math.max(mStats.target, mStats.done);
    return totalAssigned > 0 ? totalDone / totalAssigned : 1.0;
}

// Function to quickly calculate the overall campaign completion % for Rank logic
window.getOverallCampaignPct = function () {
    let campDone = 0, campSkipped = 0, campTotal = 0;
    RESOURCES_LIST.forEach(r => {
        if (r.file === 'Organic Chemistry.csv') {
            let oc = _ocTrackerData();
            campDone += oc.gD; campTotal += oc.gT;
        } else {
            let rows = appData.resources[r.file] || [];
            rows.forEach(x => { campDone += x.d; campSkipped += (x.s || 0); campTotal += x.t; });
        }
    });
    return campTotal > 0 ? Math.round(((campDone + campSkipped) / campTotal) * 100) : 0;
};

// Function to update the Profile displays
window.updateProfileUI = function () {
    let user = window.appUser;
    let name = user ? (user.displayName || "Commander").split(' ')[0] : "Commander";

    // Default abstract avatar if no google profile pic
    let defaultSvg = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%2318181d'/><text x='50' y='65' font-size='40' font-family='sans-serif' text-anchor='middle' fill='%238888a8'>?</text></svg>";
    let pfp = user && user.photoURL ? user.photoURL : defaultSvg;

    let pct = getOverallCampaignPct();
    let rank = getRank(pct);
    let badges = evaluateAllBadges().size;

    // Dynamically calculate the tightest roughly square grid (m x n) to minimize area
    let cols = badges > 0 ? Math.ceil(Math.sqrt(badges)) : 1;

    let dotsHtml = '';
    for (let i = 0; i < badges; i++) {
        dotsHtml += `<div class="badge-dot" title="Earned Badges: ${badges}"></div>`;
    }

    // 1. Desktop Panel
    let pcContainer = document.getElementById('pc-profile-container');
    if (pcContainer) {
        pcContainer.innerHTML = `
            <div class="pc-profile">
                <img src="${pfp}" alt="Profile" class="pfp">
                <div class="prof-name">${name}</div>
                <div class="prof-rank">${rank.icon} ${rank.title}</div>
                <div class="prof-badges" style="grid-template-columns: repeat(${cols}, 1fr);">
                    ${dotsHtml}
                </div>
            </div>
        `;
    }

    // 2. Mobile Compact Panel
    let mobContainer = document.getElementById('mob-profile-container');
    if (mobContainer) {
        mobContainer.innerHTML = `
            <div class="mob-profile" onclick="openCC()" title="Open Command Centre">
                <img src="${pfp}" alt="Profile" class="pfp-mob">
                <div class="mob-prof-info">
                    <div class="prof-rank-mob">${rank.icon} ${rank.title}</div>
                    <div class="prof-badges-mob" style="grid-template-columns: repeat(${cols}, 1fr);">
                        ${dotsHtml}
                    </div>
                </div>
            </div>
        `;
    }
};

// ── Persistence via localStorage ────────────────────────────────────────────

function loadData() {
    // Check Firebase payload instead of localStorage
    if (window.firebaseAppData) {
        let parsed = window.firebaseAppData;
        appData = {
            resources: parsed.resources || {},
            completions: parsed.completions || {},
            skipped: parsed.skipped || {},
            badges: parsed.badges || [],
            badgeCounts: parsed.badgeCounts !== undefined ? parsed.badgeCounts : null,
            settings: parsed.settings || null,
            injectedTasks: parsed.injectedTasks || {},
            oneOffTasks: parsed.oneOffTasks || {},
            ocCompleted: parsed.ocCompleted || {}
        };
        undoStack = parsed.undoStack || [];
    } else {
        // Fresh user: Generate defaults
        appData = {
            resources: JSON.parse(JSON.stringify(RAW_INITIAL_DATA)),
            completions: {},
            skipped: {},
            badges: [],
            badgeCounts: null,
            settings: null,
            injectedTasks: {},
            ocCompleted: {}
        };
        undoStack = [];
        saveData(); // Pushes initial setup to Firebase
    }

    applyResourceList(appData.settings);
    for (let fn in appData.resources) {
        for (let r of appData.resources[fn]) {
            let key = `${fn}::${r.ch}::${r.sec}`;
            r.s = appData.skipped[key] || 0;
        }
    }
}

function saveData() {
    for (let fn in appData.resources) {
        for (let r of appData.resources[fn]) {
            let key = `${fn}::${r.ch}::${r.sec}`;
            if ((r.s || 0) > 0) appData.skipped[key] = r.s;
            else delete appData.skipped[key];
        }
    }

    const payload = {
        resources: appData.resources,
        completions: appData.completions,
        skipped: appData.skipped,
        undoStack: undoStack,
        badges: appData.badges || [],
        badgeCounts: appData.badgeCounts || {},
        settings: appData.settings || {},
        injectedTasks: appData.injectedTasks || {},
        oneOffTasks: appData.oneOffTasks || {},
        ocCompleted: appData.ocCompleted || {}
    };

    // Push to Firebase Cloud
    if (window.saveToFirebase) {
        window.saveToFirebase(payload);
    }

    // Optional: Keep localStorage updated as a local backup
    localStorage.setItem('tdxData', JSON.stringify(payload));
}

function factoryReset() {
    if (confirm("Are you sure? This will wipe all completion logs and restore all done counts to 0.\nTotal question counts are preserved.")) {
        localStorage.removeItem('tdxData');
        location.reload();
    }
}

// ── Settings defaults ─────────────────────────────────────────────────────────
const SETTINGS_DEFAULTS = {
    theme: 'theme-default',
    autoTarget: false,
    maxDailyCapacity: 150,
    pcPriority: ['Solid State', 'Surface Chemistry', 'Equivalent Concept', 'Electrochemistry', 'Thermodynamics', 'Ionic Equilibrium', 'Chemical Equilibrium', 'Liquid Solution', 'Chemical Kinetics', 'Gaseous State', 'Atomic Structure', 'Mole Concept', 'Thermochemistry'],
    iocPriority: ['p-block Elements', 'Coordination Compounds', 'Chemical Bonding (Advanced)', 'd- and f-block Elements', 'Salt Analysis', 'Chemical Bonding (Basic)', 'Metallurgy', 'Periodic Properties', 's-block Elements', 'Hydrogen and Its Compounds', 'Environmental Chemistry', 'Quantum Numbers'],
    mathPriority: ["Permutations and Combinations", "Probability", "Complex Numbers", "Matrices", "Quadratic Equations", "Sequence and Progression", "Binomial Theorem", "Logarithm", "Functions", "ITF", "Limits, Continuity, Differentiability", "Methods of Differentiation", "Indefinite Integration", "Definite Integration", "AOD", "D.E.", "A.U.C.", "Straight Line", "Circle", "Parabola", "Ellipse", "Hyperbola"],
    ocGroup1: ["Alkyl Halides", "Carbonyl Compounds - I", "Carbonyl Compounds - II", "Carboxylic Acids, Amines and their Derivatives"],
    ocGroup2: ["Hydrocarbons", "Aromatic Compounds", "Isomerism", "GOC", "IUPAC Nomenclature", "Biomolecules, POC, Polymers and Chemistry in Everyday Life"],
    physPriority: [],
    noSkipGlobalSections: [],
    noSkipGlobalChapters: [],
    noSkipLocalSections: [],
    sectionPriorities: {}
};

function applySettings(s) {
    if (!s) s = {};
    if (!s.subjects) s.subjects = JSON.parse(JSON.stringify(DEFAULT_SUBJECTS));

    // Backwards compatibility: upgrade old AMOLED setting to Theme setting
    if (s.amoled !== undefined) {
        s.theme = s.amoled ? 'theme-amoled' : 'theme-default';
        delete s.amoled;
    }

    // Build the SUBJ_COLORS map dynamically from user settings
    SUBJ_COLORS = {};
    s.subjects.forEach(sub => {
        SUBJ_COLORS[sub.name] = sub.color;
    });
    let d = SETTINGS_DEFAULTS;
    if (s.autoTarget) {
        let todayIdx = (typeof currentActualDayIdx !== 'undefined') ? currentActualDayIdx : -1;
        let override = s.autoTargetDayOverride;
        if (override && override.dayIdx === todayIdx) {
            MAX_DAILY_CAPACITY = override.cap;
        } else {
            MAX_DAILY_CAPACITY = computeAutoTarget();
        }
    } else {
        MAX_DAILY_CAPACITY = s.maxDailyCapacity ?? d.maxDailyCapacity;
    }
    PC_PRIORITY = s.pcPriority ? [...s.pcPriority] : [...d.pcPriority];
    IOC_PRIORITY = s.iocPriority ? [...s.iocPriority] : [...d.iocPriority];
    MATH_PRIORITY = s.mathPriority ? [...s.mathPriority] : [...d.mathPriority];
    OC_GROUP1 = s.ocGroup1 ? [...s.ocGroup1] : [...d.ocGroup1];
    OC_GROUP2 = s.ocGroup2 ? [...s.ocGroup2] : [...d.ocGroup2];

    let sp = s.sectionPriorities || {};
    function _loadSP(file) {
        let v = sp[file];
        if (!v) return null;
        return Array.isArray(v) ? [...v] : v;
    }
    PC_SECTION_PRIORITY = _loadSP('Physical Chemistry.csv');
    IOC_SECTION_PRIORITY = _loadSP('Inorganic Chemistry.csv');
    MATH_YB_SEC_PRIORITY = _loadSP('Math (Yellow Book).csv');
    MATH_SB_SEC_PRIORITY = _loadSP('Math (Sameer Bansal).csv');
    MATH_PB_SEC_PRIORITY = _loadSP('Math (Pink Book).csv');
    PHY_SECTION_PRIORITY = _loadSP('Physics.csv');
    CUSTOM_SEC_PRIORITIES = {};
    for (let f in sp) {
        if (!['Physical Chemistry.csv', 'Inorganic Chemistry.csv',
            'Math (Yellow Book).csv', 'Math (Sameer Bansal).csv', 'Math (Pink Book).csv',
            'Physics.csv', 'Organic Chemistry.csv'].includes(f)) {
            let v = sp[f];
            CUSTOM_SEC_PRIORITIES[f] = Array.isArray(v) ? [...v] : v;
        }
    }

    // Apply Theme to body
    document.body.className = s.theme || d.theme;

    applyResourceList(s);
}

function getBestEff() {
    let best = 0;
    for (let ds in appData.completions) {
        let comps = appData.completions[ds];
        if (!comps || comps.length === 0) continue;
        let total = comps.reduce((s, c) => s + c.done, 0);
        let d = new Date(ds + 'T00:00:00Z');
        let dayIdx = Math.round((d.getTime() - START_DATE.getTime()) / 86400000);
        let w = (dayIdx >= 0 && dayIdx < TOTAL_DAYS) ? getDayWeight(dayIdx) : 1;
        if (w <= 0) continue;
        let eff = total / w;
        if (eff > best) best = eff;
    }
    return best;
}

function computeAutoTarget() {
    let eff = getBestEff();
    return eff < 50 ? 50 : Math.round(1.1 * eff);
}

window.applyPreset = function () {
    let val = document.getElementById('ares-preset').value;
    if (!val) return;
    let parts = val.split('|');
    document.getElementById('ares-name').value = parts[0];

    let targetSubjShort = parts[1];
    // Map shortcodes to default exact names
    let shortMap = {
        'physics': '🧲 PHYSICS',
        'math': '🧮 MATHS',
        'pc': '⚗️ PHYSICAL CHEM',
        'ioc': '🧬 INORGANIC CHEM',
        'oc': '🧪 ORGANIC (SKM)'
    };
    let targetExact = shortMap[targetSubjShort] || targetSubjShort;

    let subjSel = document.getElementById('ares-subj');
    // Try to auto-select the subject if it still exists
    for (let i = 0; i < subjSel.options.length; i++) {
        if (subjSel.options[i].value === targetExact) {
            subjSel.selectedIndex = i;
            break;
        }
    }
};

function applyResourceList(s) {
    if (!s) s = {};
    let removed = s.removedDefaults || [];
    RESOURCES_LIST.length = 0;
    DEFAULT_RESOURCES.forEach(r => { if (!removed.includes(r.file)) RESOURCES_LIST.push({ ...r }); });
    Object.keys(RES_COLORS).forEach(k => delete RES_COLORS[k]);
    Object.assign(RES_COLORS, DEFAULT_RES_COLORS);
    removed.forEach(f => delete RES_COLORS[f]);
    (s.customResources || []).forEach(r => {
        if (!RESOURCES_LIST.find(x => x.file === r.file))
            RESOURCES_LIST.push({ name: r.name, file: r.file });
        RES_COLORS[r.file] = r.color || '#94a3b8';
        if (r.subj) SUBJ_COLORS[r.subj] = r.color || '#94a3b8';
    });
    updateDynamicBadges();
}

function initBadgeCountsFromHistory() {
    if (appData.badgeCounts !== null) return;
    let counts = {};
    const thresholds = [[50, 'half_century'], [100, 'century'], [200, 'double_century'], [300, 'triple_century']];
    for (let dayIdx = 0; dayIdx <= currentActualDayIdx; dayIdx++) {
        let ds = getDateStr(dayIdx);
        let comps = appData.completions[ds];
        if (!comps || comps.length === 0) continue;
        let dayTotal = comps.reduce((s, c) => s + c.done, 0);
        counts['first_blood'] = (counts['first_blood'] || 0) + 1;
        for (let [thr, id] of thresholds)
            if (dayTotal >= thr) counts[id] = (counts[id] || 0) + 1;
        let w = getDayWeight(dayIdx);
        if (w === 0.4) counts['iron_will'] = (counts['iron_will'] || 0) + 1;
        if (w === 0.5) counts['weekend_warrior'] = (counts['weekend_warrior'] || 0) + 1;
    }
    appData.badgeCounts = counts;
    let earnedSet = getStoredBadges();
    for (let id in counts) earnedSet.add(id);
    evaluateGlobalBadges().forEach(id => earnedSet.add(id));
    storeBadges(earnedSet);
    saveData();
}

// ==========================================
// CORE ENGINE: PARSER & SCHEDULER
// ==========================================
function parseResource(filename, ignoreSecs, targetChaps, strategy, priorityList) {
    let tasks = [];

    // OC drives entirely from OC_ASSIGNMENTS + ocCompleted — CSV is not consulted.
    if (filename === "Organic Chemistry.csv") {
        if (typeof OC_ASSIGNMENTS === 'undefined') return tasks;
        for (let ch in OC_ASSIGNMENTS) {
            let chData = OC_ASSIGNMENTS[ch];
            for (let sec in chData) {
                if (ignoreSecs && ignoreSecs.some(ign => sec.toLowerCase().includes(ign.toLowerCase()))) continue;
                let secData = chData[sec];
                if (!Array.isArray(secData)) continue;
                let completed = (appData.ocCompleted && appData.ocCompleted[`${ch}|${sec}`]) || [];
                let pending = secData.filter(q => !completed.includes(q));
                if (pending.length > 0) {
                    let pVal = (priorityList && priorityList.indexOf(ch) !== -1) ? priorityList.indexOf(ch) : 99;
                    tasks.push({ filename: filename, chapter: ch, section: sec, rem_raw: pending.length, target_qs: pending.length, specific_qs: pending, priority: pVal });
                }
            }
        }
        if (priorityList) tasks.sort((a, b) => a.priority - b.priority);
        return tasks;
    }

    let rows = appData.resources[filename] || [];
    for (let r of rows) {
        if (targetChaps && !targetChaps.includes(r.ch)) continue;
        if (ignoreSecs && ignoreSecs.some(ign => r.sec.toLowerCase().includes(ign.toLowerCase()))) continue;

        let rem = Math.max(0, r.t - r.d - (r.s || 0));
        if (rem > 0) {
            let maxQs = strategy === "Even/Odd" ? Math.floor((rem + 1) / 2) : rem;
            if (maxQs > 0) {
                let pVal = (priorityList && priorityList.indexOf(r.ch) !== -1) ? priorityList.indexOf(r.ch) : 99;
                tasks.push({ filename: filename, chapter: r.ch, section: r.sec, rem_raw: rem, target_qs: maxQs, priority: pVal });
            }
        }
    }

    if (priorityList) tasks.sort((a, b) => a.priority - b.priority);
    return tasks;
}

function distributeTasks(queue, startDay, totalDays, todayAlreadyDone, todayOverrideQs) {
    todayAlreadyDone = todayAlreadyDone || 0;
    let schedule = {};
    for (let i = 0; i < totalDays; i++) schedule[i] = [];
    if (!queue.length) return schedule;

    let totalWeight = 0;
    for (let d = startDay; d < totalDays; d++) totalWeight += getDayWeight(d);
    if (totalWeight === 0) return schedule;

    let totalQs = queue.reduce((sum, t) => sum + t.qs, 0);
    let targetForToday = 0;
    let targetForFuture = 0;

    if (todayOverrideQs !== undefined) {
        targetForToday = todayOverrideQs;
        targetForToday = Math.min(targetForToday, totalQs);
        targetForFuture = Math.max(0, totalQs - targetForToday);
    } else {
        targetForToday = (totalQs / totalWeight) * getDayWeight(startDay);
        targetForFuture = totalQs - targetForToday;
    }

    let futureWeight = totalWeight - getDayWeight(startDay);

    let dailyTargets = {};
    let running = 0;
    for (let d = startDay; d < totalDays; d++) {
        let w = getDayWeight(d);
        if (d === startDay) {
            // Changed to Math.ceil: Always rounds fractions UP to at least 1 task today
            dailyTargets[d] = Math.max(0, Math.ceil(targetForToday) - todayAlreadyDone);
        } else {
            if (futureWeight > 0) {
                running += (targetForFuture / futureWeight) * w;
                // Changed to Math.ceil: Eagerly spaces future assignments at the earliest possible interval
                let t = Math.max(0, Math.ceil(running));
                dailyTargets[d] = t;
                running -= t;
            } else {
                dailyTargets[d] = 0;
            }
        }
    }

    let queueIdx = 0;
    let currentTask = { ...queue[queueIdx] };

    for (let d = startDay; d < totalDays; d++) {
        let targetToday = dailyTargets[d] || 0;
        let qsToday = 0;

        while (qsToday < targetToday && currentTask) {
            let needed = targetToday - qsToday;
            if (currentTask.qs <= needed) {
                schedule[d].push({ ...currentTask });
                qsToday += currentTask.qs;
                queueIdx++;
                currentTask = queueIdx < queue.length ? { ...queue[queueIdx] } : null;
            } else {
                let pushedTask = { ...currentTask, qs: needed };
                if (currentTask.specific_qs) {
                    pushedTask.specific_qs = currentTask.specific_qs.slice(0, needed);
                    currentTask.specific_qs = currentTask.specific_qs.slice(needed);
                }
                schedule[d].push(pushedTask);
                currentTask.qs -= needed;
                qsToday += needed;
            }
        }
    }
    return schedule;
}

function generateMasterSchedule() {
    let allQueues = {};

    const getPriList = (f) => {
        let cp = (appData.settings?.customPriorities || {})[f];
        if (cp) return cp;
        // Legacy fallback support
        if (f === 'Neeraj Kumar JA.csv') return PC_PRIORITY;
        if (f === 'IOC VK Jaiswal.csv') return IOC_PRIORITY;
        if (f.startsWith('Math')) return MATH_PRIORITY;
        return null;
    };

    const getSecPri = (f) => {
        let sp = (appData.settings?.sectionPriorities || {})[f];
        if (sp) return sp;
        // Legacy fallback support
        if (f === 'Neeraj Kumar JA.csv') return PC_SECTION_PRIORITY;
        if (f === 'IOC VK Jaiswal.csv') return IOC_SECTION_PRIORITY;
        if (f === 'Math (Yellow Book).csv') return MATH_YB_SEC_PRIORITY;
        if (f === 'Math (Sameer Bansal).csv') return MATH_SB_SEC_PRIORITY;
        if (f === 'Math (Pink Book).csv') return MATH_PB_SEC_PRIORITY;
        if (f === 'Physics (GQB).csv') return PHY_SECTION_PRIORITY;
        return [];
    };

    RESOURCES_LIST.forEach(r => {
        let f = r.file;
        let meta = (appData.settings?.customResources || []).find(c => c.file === f) || {};
        let subj = meta.subj || '📦 EXTRA';
        if (!allQueues[subj]) allQueues[subj] = [];

        let strat = "Even/Odd";
        let ignore = null;
        if (f === 'Physics (GQB).csv' || f === 'Math (Pink Book).csv') strat = "ALL";
        if (f === 'IOC VK Jaiswal.csv') ignore = ["Level 1"];

        let priList = getPriList(f);
        let secPri = getSecPri(f);

        let tasks = parseResource(f, ignore, null, strat, priList);

        if (f === 'OC SKM.csv') {
            let g1 = tasks.filter(t => OC_GROUP1.includes(t.chapter));
            let g2 = tasks.filter(t => !OC_GROUP1.includes(t.chapter));
            g2.sort((a, b) => {
                let pA = OC_GROUP2.indexOf(a.chapter); if (pA === -1) pA = 999;
                let pB = OC_GROUP2.indexOf(b.chapter); if (pB === -1) pB = 999;
                return pA - pB;
            });
            function ocCycle(arr) {
                return [
                    ...arr.filter(t => t.section.includes('Objective')),
                    ...arr.filter(t => t.section.includes('Multicorrect')),
                    ...arr.filter(t => !t.section.includes('Objective') && !t.section.includes('Multicorrect'))
                ];
            }
            allQueues[subj].push(...ocCycle(g1), ...ocCycle(g2));
        } else if (f.startsWith('Math')) {
            allQueues[subj].push(..._applySecPriority(tasks, secPri));
        } else {
            allQueues[subj].push(..._applySecPriority(tasks, secPri));
        }
    });

    if (allQueues["🧮 MATHS"]) {
        allQueues["🧮 MATHS"].sort((a, b) => {
            if (a._mode === 'section-first' && b._mode === 'section-first') {
                if (a._pi !== b._pi) return a._pi - b._pi;
            }
            let pA = MATH_PRIORITY.indexOf(a.chapter);
            let pB = MATH_PRIORITY.indexOf(b.chapter);
            if (pA === -1) pA = 999;
            if (pB === -1) pB = 999;
            return pA - pB;
        });
    }

    // ── Global Subject Interleaving (Opt-in) ──
    if (appData.settings?.globalMathInterleave && allQueues["🧮 MATHS"]) {
        // Dynamically build a master priority list by chaining all active Math books
        let masterMathPri = [];
        RESOURCES_LIST.forEach(r => {
            let meta = (appData.settings?.customResources || []).find(c => c.file === r.file) || {};
            let subj = meta.subj || '📦 EXTRA';
            if (subj === '🧮 MATHS' || r.file.startsWith('Math')) {
                let pri = (appData.settings?.customPriorities || {})[r.file] || [];
                if (!pri.length && r.file.startsWith('Math')) pri = MATH_PRIORITY;
                pri.forEach(ch => { if (!masterMathPri.includes(ch)) masterMathPri.push(ch); });
            }
        });

        // Failsafe: Ensure any rogue chapters not in a priority list are appended
        allQueues["🧮 MATHS"].forEach(t => {
            if (!masterMathPri.includes(t.chapter)) masterMathPri.push(t.chapter);
        });

        // Execute the global sort
        allQueues["🧮 MATHS"].sort((a, b) => {
            if (a._mode === 'section-first' && b._mode === 'section-first') {
                if (a._pi !== b._pi) return a._pi - b._pi;
            }
            let pA = masterMathPri.indexOf(a.chapter);
            let pB = masterMathPri.indexOf(b.chapter);
            if (pA === -1) pA = 999;
            if (pB === -1) pB = 999;
            return pA - pB;
        });
    }

    _applyNeverSkip(allQueues, appData.settings);
    allQueuesClean = JSON.parse(JSON.stringify(allQueues));

    // Anti-porosity engine
    let effDaysLeft = 0;
    for (let i = currentActualDayIdx; i < TOTAL_DAYS; i++) effDaysLeft += getDayWeight(i);
    let totalCap = effDaysLeft * MAX_DAILY_CAPACITY;

    let totalForceAll = 0, totalTarget = 0, totalRaw = 0;
    for (let subj in allQueues) {
        for (let t of allQueues[subj]) {
            if (t.force_all || t.specific_qs) totalForceAll += t.rem_raw;
            else { totalTarget += t.target_qs; totalRaw += t.rem_raw; }
        }
    }
    let porosCap = Math.max(0, totalCap - totalForceAll);

    if (appData.settings?.optimalPorosity) {
        // ── Optimal Porosity: Projected Gradient Descent (real rebuild per step) ──
        //
        // Loss:      L(X) = Σ_i X_i           (minimise skip ratio per subject)
        // Gradient:  ∇L   = [1,1,…,1]          (decrease all X by 1 each step)
        // Feasible:  Σ_i realQs(i, X_i) ≤ porosCap
        //
        // Crucially, feasibility is evaluated by actually running distributeTasks
        // on each candidate X — not by a raw ceil(rem/x) approximation. This means
        // daily caps, day weights, and already-done are all respected in every step,
        // so the gradient works on the same numbers the user actually sees.

        let porousTasksBySubj = {};
        for (let subj in allQueues) {
            porousTasksBySubj[subj] = [];
            for (let t of allQueues[subj]) {
                if (t.specific_qs || t.force_all) {
                    t.effR = 1; t.qs = t.rem_raw;
                } else {
                    porousTasksBySubj[subj].push(t);
                }
            }
        }

        // Run a real distributeTasks rebuild for one subject at a given X,
        // returning the total questions actually placed across all remaining days.
        function realQs(subj, x) {
            x = Math.max(1, x);
            let tasksCopy = porousTasksBySubj[subj].map(t => ({
                ...t,
                qs: Math.max(1, Math.ceil(t.rem_raw / x)),
                effR: x
            }));
            let sched = distributeTasks(tasksCopy, currentActualDayIdx, TOTAL_DAYS, 0, undefined);
            let total = 0;
            for (let d in sched) for (let t of sched[d]) total += t.qs;
            return total;
        }

        // Initialise X_i from the toggle-OFF baseline per subject —
        // guarantees toggle-on always produces X ≤ toggle-off X.
        let subjX = {};
        {
            let cr = (totalTarget > 0 && porosCap < totalTarget) ? porosCap / totalTarget : 1;
            for (let subj in porousTasksBySubj) {
                let tasks = porousTasksBySubj[subj];
                if (!tasks.length) { subjX[subj] = 1; continue; }
                let subjRem = 0, subjQs = 0;
                for (let t of tasks) {
                    subjRem += t.rem_raw;
                    subjQs += Math.max(1, Math.ceil(t.target_qs * cr));
                }
                subjX[subj] = subjQs > 0 ? Math.max(1, Math.ceil(subjRem / subjQs)) : 1;
            }
        }

        // Seed allocated from real rebuild at initial X values.
        let allocated = 0;
        for (let subj in subjX) allocated += realQs(subj, subjX[subj]);

        let maxIters = 2000;
        while (maxIters-- > 0) {
            const eligible = Object.keys(subjX).filter(s => subjX[s] > 1);
            if (eligible.length === 0) break;

            // Real marginal cost of decreasing each subject's X by 1 (via full rebuild).
            const costs = {};
            let fullStepCost = 0;
            for (let subj of eligible) {
                costs[subj] = realQs(subj, subjX[subj] - 1) - realQs(subj, subjX[subj]);
                fullStepCost += costs[subj];
            }

            if (allocated + fullStepCost <= porosCap) {
                // Full gradient step: all eligible subjects decrease X by 1.
                for (let subj of eligible) {
                    subjX[subj]--;
                    allocated += costs[subj];
                }
            } else {
                // Projection: accept cheapest descents first until budget is exhausted.
                eligible.sort((a, b) => costs[a] - costs[b]);
                let anyChanged = false;
                for (let subj of eligible) {
                    if (allocated + costs[subj] <= porosCap) {
                        subjX[subj]--;
                        allocated += costs[subj];
                        anyChanged = true;
                    }
                }
                if (!anyChanged) break;
            }
        }

        for (let subj in porousTasksBySubj) {
            let x = Math.max(1, subjX[subj] || 1);
            for (let t of porousTasksBySubj[subj]) {
                t.effR = x;
                t.qs = Math.max(1, Math.ceil(t.rem_raw / x));
            }
        }
    } else {
        if (totalTarget > 0) {
            if (porosCap < totalTarget) {
                let cr = porosCap / totalTarget;
                for (let subj in allQueues) for (let t of allQueues[subj]) {
                    if (!t.force_all && !t.specific_qs) t.qs = Math.max(1, Math.ceil(t.target_qs * cr));
                }
            } else {
                for (let subj in allQueues) for (let t of allQueues[subj]) {
                    if (!t.force_all && !t.specific_qs) t.qs = Math.max(1, t.target_qs);
                }
            }
        }
        for (let subj in allQueues) {
            let subjRem = 0, subjQs = 0;
            for (let t of allQueues[subj]) { if (!t.specific_qs && !t.force_all) { subjRem += t.rem_raw; subjQs += t.qs; } }
            if (subjQs <= 0 || subjRem <= 0) {
                for (let t of allQueues[subj]) { if (t.specific_qs || t.force_all) { t.effR = 1; t.qs = t.rem_raw; } }
                continue;
            }
            let subjEffR = Math.max(1, Math.ceil(subjRem / subjQs));
            for (let t of allQueues[subj]) {
                if (t.specific_qs || t.force_all) { t.effR = 1; t.qs = t.rem_raw; }
                else {
                    t.qs = Math.max(1, Math.ceil(t.rem_raw / subjEffR));
                    t.effR = subjEffR;
                }
            }
        }
    }

    // Mood Water-Filling Algorithm
    let moodOverrides = {};
    if (appData.settings?.moodWeights?.active && currentActualDayIdx >= 0) {
        let weights = appData.settings.moodWeights.weights || {};
        let todayWeight = getDayWeight(currentActualDayIdx);
        let totalTodayCap = Math.round(todayWeight * MAX_DAILY_CAPACITY);

        let activeSubjs = Object.keys(allQueues).filter(s => allQueues[s].length > 0);
        let subjLimits = {};
        let totalPending = 0;

        activeSubjs.forEach(s => {
            let maxQs = allQueues[s].reduce((sum, t) => sum + t.qs, 0);
            subjLimits[s] = maxQs;
            totalPending += maxQs;
        });

        if (totalPending <= totalTodayCap) {
            activeSubjs.forEach(s => moodOverrides[s] = subjLimits[s]);
        } else {
            let remCap = totalTodayCap;
            let activePool = [...activeSubjs];
            activePool.forEach(s => moodOverrides[s] = 0);

            while (remCap > 0 && activePool.length > 0) {
                let sumW = activePool.reduce((sum, s) => sum + (weights[s] !== undefined ? parseInt(weights[s]) : 5), 0);
                if (sumW === 0) { activePool.forEach(s => weights[s] = 1); sumW = activePool.length; }

                let stepDist = {};
                activePool.forEach(s => {
                    let w = (weights[s] !== undefined ? parseInt(weights[s]) : 5);
                    stepDist[s] = Math.floor(remCap * (w / sumW));
                });

                let distSum = Object.values(stepDist).reduce((a, b) => a + b, 0);
                let diff = remCap - distSum;
                for (let i = 0; i < diff && activePool.length > 0; i++) {
                    stepDist[activePool[i % activePool.length]]++;
                }

                let toRemove = [];
                activePool.forEach(s => {
                    let addition = stepDist[s];
                    let current = moodOverrides[s];
                    if (current + addition >= subjLimits[s]) {
                        remCap -= (subjLimits[s] - current);
                        moodOverrides[s] = subjLimits[s];
                        toRemove.push(s);
                    } else {
                        moodOverrides[s] += addition;
                        remCap -= addition;
                    }
                });
                activePool = activePool.filter(s => !toRemove.includes(s));
            }
        }
    }

    masterSchedules = {};
    let todayDs = getDateStr(currentActualDayIdx);
    let todayComps = appData.completions[todayDs] || [];

    for (let subj in allQueues) {
        let todayDoneForSubj = todayComps
            .filter(c => c.subject === subj)
            .reduce((sum, c) => sum + c.done, 0);
        let override = moodOverrides[subj] !== undefined ? moodOverrides[subj] : undefined;
        masterSchedules[subj] = distributeTasks(
            JSON.parse(JSON.stringify(allQueues[subj])),
            currentActualDayIdx, TOTAL_DAYS, todayDoneForSubj, override
        );
    }

    // ── Inject user-assigned extra tasks for today ──────────────────────────
    // These are tasks the user explicitly picked via the "I want more" UI.
    // They appear as additional pending tasks on today's schedule, and their
    // qs count is subtracted from the queue so future days adjust accordingly.
    {
        let todayInj = (appData.injectedTasks || {})[todayDs] || [];
        todayInj.forEach(inj => {
            // Ensure subject bucket exists
            if (!masterSchedules[inj.subj]) masterSchedules[inj.subj] = {};
            if (!masterSchedules[inj.subj][currentActualDayIdx]) masterSchedules[inj.subj][currentActualDayIdx] = [];
            let slot = masterSchedules[inj.subj][currentActualDayIdx];
            // If already in today (shouldn't happen), bump its qs
            let existing = slot.find(t => t.chapter === inj.ch && t.section.trim() === inj.sec.trim());
            if (existing) {
                existing.qs += inj.qs;
            } else {
                slot.unshift({
                    filename: inj.filename, chapter: inj.ch, section: inj.sec,
                    qs: inj.qs, rem_raw: inj.qs, effR: inj.effR || 1, _injected: true
                });
            }
        });
    }
    // ── Global extra-cap pass ───────────────────────────────────────────────
    // After per-subject reduction, check if total done today (scheduled + custom)
    // exceeds the cap that the per-subject reductions already accounted for.
    // Only custom/extra logs can cause this — when they do, scale ALL remaining
    // pending tasks proportionally so total assigned today stays ≈ N.
    {
        let todayWeight = getDayWeight(currentActualDayIdx);
        let todayHardCap = todayWeight * MAX_DAILY_CAPACITY;
        let mStats = getMissionStatsForDay(currentActualDayIdx);
        let todayTotalDone = todayComps.reduce((sum, c) => sum + c.done, 0) + mStats.done;

        // What the per-subject pass already "consumed" from the cap
        let perSubjConsumed = 0;
        for (let subj in allQueues) {
            let subjDone = todayComps.filter(c => c.subject === subj).reduce((s, c) => s + c.done, 0);
            // Each subject's today budget before subtraction
            let subjBudget = (masterSchedules[subj][currentActualDayIdx] || []).reduce((s, t) => s + t.qs, 0)
                + subjDone; // budget = pending + already done for that subj
            perSubjConsumed += Math.min(subjDone, subjBudget);
        }

        // Extra done = anything logged beyond what per-subject reductions handled
        let extraDone = Math.max(0, todayTotalDone - perSubjConsumed);
        let remainingCap = Math.max(0, todayHardCap - todayTotalDone);

        if (extraDone > 0) {
            // Collect live references to all pending tasks today
            let loggedKeys = new Set(todayComps.map(c => `${c.chapter}|${c.section.trim()}`));
            let pendingTasks = [];
            for (let subj in masterSchedules) {
                for (let t of (masterSchedules[subj][currentActualDayIdx] || [])) {
                    if (!loggedKeys.has(`${t.chapter}|${t.section.trim()}`)) {
                        pendingTasks.push(t);
                    }
                }
            }
            let pendingTotal = pendingTasks.reduce((s, t) => s + t.qs, 0);
            if (pendingTotal > remainingCap && pendingTotal > 0) {
                let scale = remainingCap / pendingTotal;
                for (let t of pendingTasks) {
                    t.qs = Math.max(0, Math.round(t.qs * scale));
                }
            }
        }
    }
    // ───────────────────────────────────────────────────────────────────────

    needsRebuild = false;
}

// ==========================================
// UI RENDERERS
// ==========================================
function updateHeader() {
    let d = new Date(START_DATE.getTime() + viewingDayIdx * 86400000);
    let weight = getDayWeight(viewingDayIdx);

    let dsOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    let dStr = d.toLocaleDateString('en-GB', dsOptions);

    let type = "🔥 FULL STUDY DAY";
    if (weight === 0.0) type = "💀 HEAVY TEST DAY";
    else if (weight === 0.4) type = "⚖️ CLASS + TEST DAY";
    else if (weight === 0.5) type = "⚙️ HALF STUDY DAY";

    let isToday = viewingDayIdx === currentActualDayIdx;
    let isFuture = viewingDayIdx > currentActualDayIdx;
    let strk = getStreak(currentActualDayIdx);

    document.getElementById('header-title').innerText = `${dStr}  ·  DAY ${viewingDayIdx + 1}/${TOTAL_DAYS}`;
    let todayTag = isToday ? "◄ TODAY  |  " : `Day ${currentActualDayIdx + 1} is TODAY  |  `;

    // Show change-type pill only for today or future days
    let changePill = '';
    if (isToday || isFuture) {
        let hasOverride = !!(appData.settings?.dayTypeOverrides?.[getDateStr(viewingDayIdx)]);
        changePill = ` <button onclick="openDayTypePicker()" style="
            display:inline-flex;align-items:center;gap:4px;
            background:${hasOverride ? 'rgba(245,166,35,0.18)' : 'var(--surface-light)'};
            border:1px solid ${hasOverride ? 'var(--border-accent)' : 'var(--border)'};
            color:${hasOverride ? 'var(--accent)' : 'var(--text-muted)'};
            border-radius:100px;padding:1px 9px;font-size:0.62rem;font-weight:700;
            font-family:'Bricolage Grotesque',sans-serif;letter-spacing:0.5px;
            cursor:pointer;vertical-align:middle;text-transform:uppercase;
        " title="Change day type">✏️ change</button>`;
    }

    let sub = document.getElementById('header-subtitle');
    sub.innerHTML = `${todayTag}${type}  |  🔥 ${strk}d${changePill}`;
}

const DAY_TYPE_OPTIONS = [
    { label: "🔥 Full Study Day", weight: 1.0 },
    { label: "⚙️ Half Study Day", weight: 0.5 },
    { label: "⚖️ Class + Test Day", weight: 0.4 },
    { label: "💀 Heavy Test Day (Rest)", weight: 0.0 },
];

function openDayTypePicker() {
    let ds = getDateStr(viewingDayIdx);
    let current = getDayWeight(viewingDayIdx);
    let hasOverride = !!(appData.settings?.dayTypeOverrides?.[ds]);

    let optionsHtml = DAY_TYPE_OPTIONS.map(opt => {
        let isActive = Math.abs(opt.weight - current) < 0.01;
        return `<button onclick="setDayType(${opt.weight})" style="
            width:100%;text-align:left;padding:10px 14px;
            background:${isActive ? 'var(--accent-dim)' : 'var(--surface-light)'};
            border:1px solid ${isActive ? 'var(--border-accent)' : 'var(--border)'};
            color:${isActive ? 'var(--accent)' : 'var(--text)'};
            border-radius:10px;font-size:0.84rem;font-weight:${isActive ? '700' : '600'};
            cursor:pointer;margin-bottom:6px;font-family:'Nunito',sans-serif;
            transition:background 0.15s,border-color 0.15s;
        ">${opt.label}${isActive ? ' ✓' : ''}</button>`;
    }).join('');

    let resetBtn = hasOverride ? `<button onclick="resetDayType()" style="
        width:100%;padding:9px;margin-top:4px;
        background:transparent;border:1px dashed rgba(255,255,255,0.12);
        color:var(--text-muted);border-radius:10px;font-size:0.76rem;
        font-weight:600;cursor:pointer;font-family:'Nunito',sans-serif;
    ">↩ Reset to scheduled default</button>` : '';

    document.getElementById('settings-body').innerHTML = `
        <h2 style="margin-bottom:4px;">📅 Change Day Type</h2>
        <p style="font-size:0.78rem;color:var(--text-muted);margin:0 0 16px;">
            Override for <strong>${ds}</strong>. Affects how many questions are assigned for this day.
        </p>
        ${optionsHtml}
        ${resetBtn}
    `;
    document.getElementById('settings-panel-head').querySelector('h2').innerText = "Day Type";
    document.getElementById('settings-overlay').classList.add('open');
}

function setDayType(weight) {
    if (!appData.settings) appData.settings = {};
    if (!appData.settings.dayTypeOverrides) appData.settings.dayTypeOverrides = {};
    appData.settings.dayTypeOverrides[getDateStr(viewingDayIdx)] = weight;
    saveData();
    needsRebuild = true;
    document.getElementById('settings-overlay').classList.remove('open');
    renderDay();
    renderDayStrip();
}

function resetDayType() {
    if (!appData.settings?.dayTypeOverrides) return;
    delete appData.settings.dayTypeOverrides[getDateStr(viewingDayIdx)];
    saveData();
    needsRebuild = true;
    document.getElementById('settings-overlay').classList.remove('open');
    renderDay();
    renderDayStrip();
}

window.getMissionStatsForDay = function (dayIdx) {
    let d = 0, t = 0;
    let ms = appData.oneOffTasks?.[getDateStr(dayIdx)] || [];
    ms.forEach(m => { if (m.type === 'qs') { d += m.qsDone; t += m.qsTarget; } });
    return { done: d, target: t };
};

window.openMissionModal = function () {
    document.getElementById('mission-title').value = '';
    document.getElementById('mission-qs').value = '';
    document.getElementById('mission-date').value = getDateStr(viewingDayIdx);
    // Fix: target the input correctly by its attributes, and hide the number input
    let radioTick = document.querySelector('input[name="mission-type"][value="tick"]');
    if (radioTick) radioTick.checked = true;
    document.getElementById('mission-qs-wrap').style.display = 'none';

    document.getElementById('mission-modal').style.display = 'flex';
};

window.submitNewMission = function () {
    let title = document.getElementById('mission-title').value.trim();
    let type = document.querySelector('input[name="mission-type"]:checked').value;
    let dateStr = document.getElementById('mission-date').value;

    if (!title) { alert("Enter a mission objective."); return; }

    let qs = 0;
    if (type === 'qs') {
        qs = parseInt(document.getElementById('mission-qs').value);
        if (isNaN(qs) || qs <= 0) { alert("Enter a valid question target."); return; }
    }

    if (!appData.oneOffTasks) appData.oneOffTasks = {};
    if (!appData.oneOffTasks[dateStr]) appData.oneOffTasks[dateStr] = [];

    appData.oneOffTasks[dateStr].push({
        id: 'm_' + Date.now().toString(36),
        title: title,
        type: type,
        qsTarget: qs,
        qsDone: 0,
        done: false
    });

    saveData();
    needsRebuild = true;
    document.getElementById('mission-modal').style.display = 'none';
    renderDay();
    renderRightPanel();
};

window.toggleMission = function (id) {
    let dayStr = getDateStr(viewingDayIdx);
    let mission = appData.oneOffTasks[dayStr].find(m => m.id === id);
    if (mission) mission.done = !mission.done;
    saveData();
    renderDay();
};

window.promptMissionQs = function (id) {
    let dayStr = getDateStr(viewingDayIdx);
    let mission = appData.oneOffTasks[dayStr].find(m => m.id === id);
    if (!mission) return;

    let rem = mission.qsTarget - mission.qsDone;
    let valStr = prompt(`Logging progress for: ${mission.title}\nTarget remaining: ${rem} Qs\nHow many did you complete?`);
    if (!valStr) return;

    let val = parseInt(valStr);
    if (isNaN(val) || val <= 0) { alert("Invalid number."); return; }
    if (val > rem) { alert(`Cannot exceed remaining target (${rem}).`); return; }

    mission.qsDone += val;
    saveData();
    needsRebuild = true;
    renderDay();
    renderRightPanel();
};
// Replace the existing setInterval block with this:
setInterval(() => {
    const timeString = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', minute: '2-digit', hour12: true 
    });
    
    // Update EVERY instance of the clock (both mobile and PC)
    document.querySelectorAll('.engine-clock').forEach(clockEl => {
        clockEl.innerText = timeString;
    });
}, 1000);

window.renderWelcomeMsg = function (userName) {
    const now = new Date();
    const hour = now.getHours();

    // 1. Generate a tactical system status with the live local time
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    const systemTag = `⚡ <span class="engine-clock" style="color: #ff2a2a!important;">${timeString}</span> — ENGINE ONLINE`;

    // 2. Define time-aware, emotional message pools
    let messages = [];

    if (hour >= 0 && hour < 5) {
        // Late Night / Graveyard (Midnight to 5 AM)
        messages = [
            `The world sleeps, but you grind, ${userName}. Keep pushing.`,
            `Midnight oil burning bright. The matrix sees your dedication, ${userName}.`,
            `Quiet hours, loud results. What's the target tonight, ${userName}?`,
            `Most gave up hours ago. You're still here, ${userName}.`
        ];
    } else if (hour >= 5 && hour < 12) {
        // Morning (5 AM to Noon)
        messages = [
            `A new dawn, ${userName}. The matrix is yours to shape today.`,
            `Sun's up, systems online. Let's make today count, ${userName}.`,
            `The engine has been waiting for you. Ready to dominate, ${userName}?`,
            `Early hours build legends. What's the first strike, ${userName}?`
        ];
    } else if (hour >= 12 && hour < 17) {
        // Afternoon (Noon to 5 PM)
        messages = [
            `Midday momentum, ${userName}. Keep the fire burning.`,
            `Halfway through the cycle. Don't let off the gas, ${userName}.`,
            `The sun is high, and so are the stakes. Let's work, ${userName}.`,
            `Hold the line, ${userName}. Afternoon combat awaits.`
        ];
    } else {
        // Evening / Night (5 PM to Midnight)
        messages = [
            `The sun sets, but we don't power down yet, ${userName}.`,
            `Twilight hours. Time to finish what you started, ${userName}.`,
            `The day is ending, but the engine is still hungry. Feed it, ${userName}.`,
            `Final push of the cycle, ${userName}. Leave nothing on the table.`
        ];
    }

    // 3. Pick a random message from the current time bracket
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];

    // Mobile Version (Centered)
    const mobEl = document.getElementById('welcome-msg');
    if (mobEl) {
        mobEl.innerHTML = `
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 6px; font-family: var(--font-mono); letter-spacing: 1px; text-transform: uppercase;">${systemTag}</div>
            <div style="font-size: 1.15rem; font-weight: 800; color: var(--text); line-height: 1.3;">${randomMsg}</div>
        `;
        mobEl.style.display = 'block';
    }

    // PC Version (Right-aligned in nav)
    const pcEl = document.getElementById('welcome-msg-pc');
    if (pcEl) {
        pcEl.innerHTML = `
            <div style="font-size: 0.65rem; color: var(--text-muted); margin-bottom: 4px; font-family: var(--font-mono); letter-spacing: 1px; text-transform: uppercase;">${systemTag}</div>
            <div style="font-size: 0.95rem; font-weight: 800; color: var(--text); font-family: var(--font-head);">${randomMsg}</div>
        `;
    }
};

function renderDay() {
    if (needsRebuild) generateMasterSchedule();
    updateHeader();

    // ADD THIS HERE: Always generate the message regardless of tasks
    let displayName = (window.appUser && window.appUser.displayName) ? window.appUser.displayName.split(' ')[0] : "Commander";
    renderWelcomeMsg(displayName);

    let html = '';
    let weight = getDayWeight(viewingDayIdx);
    let comps = getCompletionsForDay(viewingDayIdx);

    let compsBySubj = {};
    comps.forEach(c => { if (!compsBySubj[c.subject]) compsBySubj[c.subject] = []; compsBySubj[c.subject].push(c); });

    if (weight === 0.0 && comps.length === 0) {
        html = `<div style="text-align:center; margin-top:50px; color:var(--danger); font-weight:bold;">[!] CHILL MAAR AUR SIRF TEST KI ANALYSIS KAR. NAYA KUCH NAHI UTHANA AAJ.</div>`;
        document.getElementById('schedule-content').innerHTML = html;
        document.getElementById('combat-bar-fixed').innerHTML = '';
    } else {
        let tQs = 0, tDone = 0;
        let loggedKeys = new Set(comps.map(c => `${c.chapter}|${c.section.trim()}`));

        let cards = []; // Make sure this line exists!

        // --- NEW: DAILY MISSIONS ---
        let dayStr = getDateStr(viewingDayIdx);
        let missions = appData.oneOffTasks?.[dayStr] || [];
        if (missions.length > 0) {
            let mCard = `<div class="card" style="--sc:#fb7185">
                <div class="card-header" style="background:rgba(251,113,133,0.08); border-bottom-color:rgba(251,113,133,0.2);"><span class="ch-title" style="background:linear-gradient(90deg,#fb7185,#fda4af);-webkit-background-clip:text;">🎯 DAILY MISSIONS</span></div>
                <ul class="task-list">`;

            missions.forEach(m => {
                if (m.type === 'tick') {
                    mCard += `<li class="task-item ${m.done ? 'done' : ''}">
                        <div class="task-info">
                            <div class="task-title" style="${m.done ? 'text-decoration:line-through;color:var(--success-bright);' : ''}">${m.title}</div>
                            <div class="task-meta">One-off Task</div>
                        </div>
                        <div class="task-action" style="padding:6px 12px; background:${m.done ? 'transparent' : 'var(--surface-light)'}; border-color:${m.done ? 'var(--success)' : 'var(--border)'}; color:${m.done ? 'var(--success)' : 'var(--text)'};" onclick="toggleMission('${m.id}')">${m.done ? '✔ DONE' : 'MARK DONE'}</div>
                    </li>`;
                } else {
                    let isDone = m.qsDone >= m.qsTarget;
                    mCard += `<li class="task-item ${isDone ? 'done' : ''}">
                        <div class="task-info">
                            <div class="task-title" style="${isDone ? 'text-decoration:line-through;color:var(--success-bright);' : ''}">${m.title}</div>
                            <div class="task-meta">Target: ${m.qsTarget} Qs &nbsp;·&nbsp; Done: ${m.qsDone}</div>
                        </div>
                        ${!isDone ? `<div class="task-action" onclick="promptMissionQs('${m.id}')">LOG ▶</div>` : `<div style="font-size:0.8rem; color:var(--success-bright); font-weight:bold; margin-right:12px;">✔</div>`}
                    </li>`;
                    tQs += m.qsTarget;
                    tDone += m.qsDone;
                }
            });
            mCard += `</ul></div>`;
            cards.push({ html: mCard, lines: missions.length });
        }
        // --- END DAILY MISSIONS ---

        // Build card HTML fragments + estimate height for greedy balancing
        for (let subj in masterSchedules) {
            let todaysTasks = masterSchedules[subj][viewingDayIdx] || [];
            let tComps = compsBySubj[subj] || [];
            let pTasks = todaysTasks.filter(t => !loggedKeys.has(`${t.chapter}|${t.section.trim()}`) && t.qs > 0);
            if (pTasks.length === 0 && tComps.length === 0) continue;

            let sc = SUBJ_COLORS[subj] || 'var(--accent)';
            let cardHtml = `<div class="card" style="--sc:${sc}">
                <div class="card-header"><span class="ch-title">${subj}</span></div>
                <ul class="task-list">`;
            let sQs = 0, sDone = 0;

            tComps.forEach(c => {
                cardHtml += `<li class="task-item done">
                    <div class="task-info">
                        <div class="task-title">✅ ${c.chapter} — ${c.section}</div>
                        <div class="task-meta">Done: ${c.done} Qs</div>
                    </div></li>`;
                sDone += c.done; tDone += c.done;
            });

            pTasks.forEach(t => {
                let effR = t.effR || 1;
                let strat = t.specific_qs ? "RIGID" : (effR > 1 ? `1 in ${effR}` : "ALL");
                let sqs_str = t.specific_qs ? t.specific_qs.join(',') : '';
                let actionBtn = viewingDayIdx === currentActualDayIdx
                    ? `<div class="task-action" onclick="openLogModal('${subj}','${t.chapter}','${t.section}',${t.rem_raw},'${t.filename}',${t.qs},${effR}, '${sqs_str}')">LOG ▶</div>`
                    : '';
                let formatQs = (arr) => { if (!arr || !arr.length) return ''; let res = [], s = arr[0], e = arr[0]; for (let i = 1; i < arr.length; i++) { if (arr[i] === e + 1) e = arr[i]; else { res.push(s === e ? s : (s === e - 1 ? s + ', ' + e : s + '-' + e)); s = e = arr[i]; } } res.push(s === e ? s : (s === e - 1 ? s + ', ' + e : s + '-' + e)); return res.join(', '); };
                let disp_qs = t.specific_qs ? formatQs(t.specific_qs) : '';
                let metaTxt = t.specific_qs ? `<div style="margin-bottom:2px;">Target: ${t.qs} Qs &nbsp;·&nbsp; Rem: ${t.rem_raw}</div><div style="white-space:normal; line-height:1.5; margin:4px 0; word-break:break-word; font-size:0.75rem; color:var(--text-muted);"><span style="color:var(--accent); font-weight:800; letter-spacing:0.5px;">[${disp_qs}]</span></div>` : `Target: ${t.qs} Qs &nbsp;·&nbsp; Rem: ${t.rem_raw}`;
                cardHtml += `<li class="task-item">
                    <div class="task-info">
                        <div class="task-title">▶ [${strat}] ${t.chapter} — ${t.section}</div>
                        <div class="task-meta">${metaTxt}</div>
                    </div>${actionBtn}</li>`;
                sQs += t.qs; tQs += t.qs;
            });

            cardHtml += `</ul>
                <div style="padding:5px 13px 6px; border-top:1px solid var(--border); font-size:0.67rem; color:var(--text-subtle); display:flex; justify-content:space-between; font-family:'JetBrains Mono','Noto Color Emoji',monospace;">
                    <span>TARGET</span><span style="color:var(--sc);">${sQs + sDone} Qs &nbsp;·&nbsp; done: ${sDone}</span>
                </div></div>`;

            cards.push({ html: cardHtml, lines: pTasks.length + tComps.length });
        }

        let isDesk = window.innerWidth >= 820;
        let finalHtml = '';

        if (cards.length === 0) {
            const EMPTY_MSGS = [
                "The battlefield is quiet... too quiet. Gear up by adding resources.",
                "Zero active directives. Deploy a Daily Mission or map out new targets.",
                "Blank slate. Time to touch grass, or configure your master schedule.",
                "The engine is idling. Forge your destiny in Settings or drop a quick task below."
            ];
            let msg = EMPTY_MSGS[Math.floor(Math.random() * EMPTY_MSGS.length)];
            finalHtml = `<div style="text-align:center; margin: 40px 10px; padding: 40px 20px; background:var(--surface-light); border:1px dashed var(--border-hi); border-radius: 24px; animation:fadeUp var(--dur-md) var(--decel) both;">
                <div style="font-size: 3rem; margin-bottom: 12px; filter: grayscale(1) opacity(0.5);">🍃</div>
                <div style="font-family:'Bricolage Grotesque',sans-serif; color:var(--text); font-weight:800; font-size:1.1rem; margin-bottom: 8px; text-transform:uppercase; letter-spacing:1px;">All Clear</div>
                <div style="color:var(--text-muted); font-size:0.85rem; line-height: 1.5; margin-bottom: 24px; max-width: 300px; margin-inline: auto;">${msg}</div>
                <button class="btn btn-primary" style="width:auto; padding:10px 24px;" onclick="switchTab('editor')">📝 Add Resources</button>
            </div>`;
        } else {
            if (isDesk) {
                cards.sort((a, b) => b.lines - a.lines);
                let cols = [[], [], []];
                let heights = [0, 0, 0];
                cards.forEach(c => {
                    let shortest = heights.indexOf(Math.min(...heights));
                    cols[shortest].push(c.html);
                    heights[shortest] += c.lines;
                });
                finalHtml = `<div class="sched-cols">
                    ${cols.map(col => `<div class="sched-col">${col.join('')}</div>`).join('')}
                </div>`;
            } else {
                cards.forEach(c => finalHtml += c.html);
            }
        }

        document.getElementById('schedule-content').innerHTML = finalHtml;

        // ⚡ Build and update fixed combat bar EXACTLY matching CMD logic
        let summaryCard = '';
        if (viewingDayIdx === currentActualDayIdx) {
            let __comps = getCompletionsForDay(currentActualDayIdx);
            let __todayDone = __comps.reduce((s, c) => s + c.done, 0);
            let __todayAssigned = __todayDone;

            if (masterSchedules && Object.keys(masterSchedules).length > 0) {
                let __loggedKeys = new Set(__comps.map(c => `${c.chapter}|${c.section.trim()}`));
                for (let subj in masterSchedules) {
                    (masterSchedules[subj][currentActualDayIdx] || [])
                        .filter(t => !__loggedKeys.has(`${t.chapter}|${t.section.trim()}`))
                        .forEach(t => __todayAssigned += (t.qs || 0));
                }
            }

            let __mStats = getMissionStatsForDay(currentActualDayIdx);
            __todayDone += __mStats.done;
            __todayAssigned += Math.max(__mStats.target, __mStats.done);

            if (__todayAssigned > 0 || __todayDone > 0) {
                let __todayPctInfo = __todayAssigned > 0 ? Math.round((__todayDone / __todayAssigned) * 100) : 100;
                
                // RESTORED BEAUTIFUL GRADIENT LOGIC
                let gradBar = __todayPctInfo >= 75 ? 'linear-gradient(90deg,#34d399,#6ee7b7)'
                    : __todayPctInfo >= 40 ? 'linear-gradient(90deg,#fb923c,#fbbf24)'
                    : 'linear-gradient(90deg,#f87171,#fb923c)';

                summaryCard = `<div class="card summary-card" style="padding:11px 18px; display:flex; align-items:center; gap:20px; box-shadow: 0 -4px 30px rgba(0,0,0,0.6);">
                    <div style="font-family:'JetBrains Mono',monospace; font-size:1.6rem; font-weight:700; background:${gradBar}; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; min-width:52px;">${__todayPctInfo}%</div>
                    <div style="flex:1;">
                        <div style="display:flex; justify-content:space-between; font-size:0.67rem; color:var(--text-muted); margin-bottom:5px; font-family:'JetBrains Mono',monospace;">
                            <span>TOTAL COMBAT</span><span>${__todayDone} done · ${__todayAssigned} assigned</span>
                        </div>
                        <div class="progress-bar-bg" style="height:5px;"><div class="progress-bar-fill" style="width:${__todayPctInfo}%; background:${gradBar};"></div></div>
                    </div>
                </div>`;
            }
        }
        document.getElementById('combat-bar-fixed').innerHTML = summaryCard;

        // Handle FAB visibility (Only show on Today's view)
        let fab = document.getElementById('fab-container');
        if (fab) {
            fab.style.display = (viewingDayIdx === currentActualDayIdx) ? 'flex' : 'none';
        }

        // Stagger task items and cards
        document.querySelectorAll('.task-item').forEach((el, i) => el.style.setProperty('--i', i));
        document.querySelectorAll('.sched-col').forEach(col => {
            col.querySelectorAll('.card').forEach((c, i) => c.style.setProperty('--ci', i));
        });
    }

    // Animate schedule content based on nav direction
    if (_dayNavDir !== 0) {
        let sc = document.getElementById('schedule-content');
        let animName = _dayNavDir < 0 ? 'slideInRight' : 'slideInLeft';
        sc.style.animation = 'none';
        sc.offsetHeight; // force reflow
        sc.style.animation = `${animName} var(--dur-md) var(--decel) both`;
    }
    _dayNavDir = 0;

    renderDayStrip();
    renderRightPanel();
}

// ==========================================
// LOGGING SYSTEM
// ==========================================
function openLogModal(subj, ch, sec, max, filename, target, effR, oc_qs_str) {
    modalContext = { subj, ch, sec, max, filename, effR: effR || 1, oc_qs_str };
    document.getElementById('modal-title').innerText = "Log Progress";
    document.getElementById('modal-desc').innerText = `How many exact questions did you solve for '${ch} - ${sec}'? (Target: ${target || 'Custom'}, Max Rem: ${max})`;
    document.getElementById('modal-input').value = "";
    document.getElementById('modal-input').max = max;

    // Show porosity row only for custom tasks (target === 0)
    let isCustom = (target === 0);
    let porosityRow = document.getElementById('modal-porosity-row');
    porosityRow.style.display = isCustom ? 'block' : 'none';
    if (isCustom) {
        document.getElementById('porous-no').checked = true;
        document.getElementById('porous-x-wrap').style.display = 'none';
        document.getElementById('porous-x').value = 2;
    }

    let dynContainer = document.getElementById('modal-dynamic-content');
    if (!dynContainer) {
        dynContainer = document.createElement('div');
        dynContainer.id = 'modal-dynamic-content';
        document.getElementById('modal-input').parentNode.insertBefore(dynContainer, document.getElementById('modal-porosity-row'));
    }

    if (oc_qs_str) {
        let qs = oc_qs_str.split(',');
        document.getElementById('modal-title').innerText = "Log Assigned Questions";
        document.getElementById('modal-desc').innerText = `Tick the exact questions you completed for:\n${ch} - ${sec}`;
        let html = `<div id="oc-checkboxes" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(60px, 1fr)); gap: 10px; margin: 15px 0; max-height:220px; overflow-y:auto; padding-right:5px;">`;
        qs.forEach(q => {
            html += `<label style="display:flex; align-items:center; gap:6px; background:var(--surface); padding:8px; border:1px solid var(--border); border-radius:8px; cursor:pointer;">
                <input type="checkbox" value="${q}" class="oc-cb" style="accent-color:var(--accent); width:18px; height:18px;">
                <span style="font-family:'JetBrains Mono','Noto Color Emoji',monospace; font-size:0.85rem; font-weight:bold;">${q}</span>
            </label>`;
        });
        html += `</div>`;
        dynContainer.innerHTML = html;
        dynContainer.style.display = "block";
        document.getElementById('modal-input').style.display = "none";
        document.getElementById('modal-porosity-row').style.display = "none";
    } else {
        dynContainer.style.display = "none";
        document.getElementById('modal-input').style.display = "block";
    }

    document.getElementById('input-modal').style.display = "flex";
    if (!oc_qs_str) document.getElementById('modal-input').focus();
}

function updatePorosityInput() {
    let isPorous = document.getElementById('porous-yes').checked;
    document.getElementById('porous-x-wrap').style.display = isPorous ? 'flex' : 'none';
}

function closeModal() { document.getElementById('input-modal').style.display = "none"; }

function submitModal() {
    let val = 0, specificDone = [];
    if (modalContext.oc_qs_str) {
        let cbs = document.querySelectorAll('.oc-cb:checked');
        cbs.forEach(cb => specificDone.push(parseInt(cb.value)));
        val = specificDone.length;
        if (val === 0) { alert("Please tick at least one question."); return; }
    } else {
        val = parseInt(document.getElementById('modal-input').value);
        if (isNaN(val) || val <= 0) { alert("Enter a valid positive number."); return; }
        if (val > modalContext.max) { alert(`Cannot exceed max remaining (${modalContext.max}).`); return; }
    }

    let effR = modalContext.effR || 1;
    // For custom tasks, override effR from the porosity UI
    if (document.getElementById('modal-porosity-row').style.display !== 'none') {
        if (document.getElementById('porous-yes').checked) {
            let x = parseInt(document.getElementById('porous-x').value);
            effR = (isNaN(x) || x < 2) ? 2 : x;
        } else {
            effR = 1;
        }
    }
    let skippedNow = val * (effR - 1);

    // ── Capture BEFORE-state ──────────────────────────────────────────────
    let triumphStats = computeTriumphStats(val, modalContext);
    let wasChapComplete = isChapterComplete(modalContext.filename, modalContext.ch);

    // wasFirstLogToday: true if today has NO completions yet (before this log)
    let ds = getDateStr(currentActualDayIdx);
    let wasFirstLogToday = !appData.completions[ds] || appData.completions[ds].length === 0;
    let dailyTotalBefore = (appData.completions[ds] || []).reduce((s, c) => s + c.done, 0);

    // Update raw resource file
    let row = appData.resources[modalContext.filename].find(r => r.ch === modalContext.ch && r.sec === modalContext.sec);
    if (row) {
        row.d = Math.min(row.d + val, row.t);
        row.s = Math.min((row.s || 0) + skippedNow, Math.max(0, row.t - row.d));
    }

    // Log Completion
    if (!appData.completions[ds]) appData.completions[ds] = [];
    let existing = appData.completions[ds].find(c => c.subject === modalContext.subj && c.chapter === modalContext.ch && c.section === modalContext.sec);
    if (existing) existing.done += val;
    else appData.completions[ds].push({ subject: modalContext.subj, chapter: modalContext.ch, section: modalContext.sec, done: val });

    let dailyTotalAfter = appData.completions[ds].reduce((s, c) => s + c.done, 0);

    // Update OC Completed
    if (modalContext.oc_qs_str) {
        if (!appData.ocCompleted) appData.ocCompleted = {};
        let key = `${modalContext.ch}|${modalContext.sec}`;
        if (!appData.ocCompleted[key]) appData.ocCompleted[key] = [];
        appData.ocCompleted[key].push(...specificDone);
        appData.ocCompleted[key] = [...new Set(appData.ocCompleted[key])];

        let row = appData.resources[modalContext.filename].find(r => r.ch === modalContext.ch && r.sec === modalContext.sec);
        if (row) {
            row.d = appData.ocCompleted[key].length;
            let maxTicked = appData.ocCompleted[key].length > 0 ? Math.max(...appData.ocCompleted[key]) : 0;
            row.s = Math.max(0, maxTicked - row.d);
        }
    }

    // Add to Undo Stack
    undoStack.push({ dayIdx: currentActualDayIdx, subj: modalContext.subj, ch: modalContext.ch, sec: modalContext.sec, filename: modalContext.filename, val: val, skipped: skippedNow, oc_done: specificDone });

    // Perfect Day: today just hit 100% of assigned
    let todayComps = appData.completions[ds] || [];
    let todayDone = todayComps.reduce((s, c) => s + c.done, 0);
    let todayAssigned = todayDone;
    if (masterSchedules) {
        let loggedKeys = new Set(todayComps.map(c => `${c.chapter}|${c.section.trim()}`));
        for (let subj in masterSchedules) {
            (masterSchedules[subj][currentActualDayIdx] || [])
                .filter(t => !loggedKeys.has(`${t.chapter}|${t.section.trim()}`) && t.qs > 0)
                .forEach(t => todayAssigned += t.qs);
        }
    }
    let isPerfectDay = todayAssigned > 0 && todayDone >= todayAssigned;

    // Overdrive: exceeds cap normally, OR in autoTarget: user logs after completing all assigned tasks
    let todayWeight = getDayWeight(currentActualDayIdx);
    let autoOn = !!(appData.settings?.autoTarget);
    let isOverdrive = autoOn
        ? (dailyTotalBefore >= todayAssigned && todayAssigned > 0)
        : (todayDone > todayWeight * MAX_DAILY_CAPACITY);

    // Chapter complete AFTER update?
    let nowChapComplete = !wasChapComplete && isChapterComplete(modalContext.filename, modalContext.ch);

    // New badges earned this submit
    let newBadges = getNewlyEarnedBadges(dailyTotalBefore, dailyTotalAfter, wasFirstLogToday, isPerfectDay, isOverdrive);

    // AutoTarget boost prompt: perfect day + autoTarget on
    let isPerfectAutoTarget = isPerfectDay && autoOn;

    saveData();
    needsRebuild = true;
    closeModal();
    showTriumph(triumphStats, val, modalContext, nowChapComplete, newBadges, isPerfectAutoTarget);
}

// ==========================================
// TRIUMPH CAROUSEL
// ==========================================
function computeTriumphStats(val, ctx) {
    // ── Today ──────────────────────────────────────────────────────────────
    let todayDs = getDateStr(currentActualDayIdx);
    let todayComps = appData.completions[todayDs] || [];
    let todayDone = todayComps.reduce((s, c) => s + c.done, 0);
    // Today's total = done so far + all pending tasks in master schedule
    let todayPending = 0;
    let loggedKeys = new Set(todayComps.map(c => `${c.chapter}|${c.section.trim()}`));
    for (let subj in masterSchedules) {
        for (let t of (masterSchedules[subj][currentActualDayIdx] || [])) {
            if (!loggedKeys.has(`${t.chapter}|${t.section.trim()}`)) todayPending += t.qs;
        }
    }
    let todayTotal = todayDone + todayPending;
    let todayPct = todayTotal > 0 ? (val / todayTotal) * 100 : 0;

    // ── Chapter ────────────────────────────────────────────────────────────
    let chapRows = (appData.resources[ctx.filename] || []).filter(r => r.ch === ctx.ch);
    let chapTotal = chapRows.reduce((s, r) => s + r.t, 0);
    let chapPct = chapTotal > 0 ? (val / chapTotal) * 100 : 0;

    // ── Subject ────────────────────────────────────────────────────────────
    // A subject may span multiple files — find which files belong to this subject
    let subjColor = SUBJ_COLORS[ctx.subj] || 'var(--accent)';
    let subjTotal = 0;
    // Map subject key → relevant filenames via RESOURCES_LIST colors
    let subjFiles = Object.entries(RES_COLORS)
        .filter(([fn, col]) => col === (RES_COLORS[ctx.filename] || ''))
        .map(([fn]) => fn);
    if (!subjFiles.length) subjFiles = [ctx.filename];
    for (let fn of subjFiles) {
        for (let r of (appData.resources[fn] || [])) subjTotal += r.t;
    }
    let subjPct = subjTotal > 0 ? (val / subjTotal) * 100 : 0;

    // ── Grand Total ────────────────────────────────────────────────────────
    let grandTotal = 0;
    for (let fn in appData.resources) {
        for (let r of appData.resources[fn]) grandTotal += r.t;
    }
    let grandPct = grandTotal > 0 ? (val / grandTotal) * 100 : 0;

    return { todayPct, chapPct, subjPct, grandPct, chapTotal, subjTotal, grandTotal, todayTotal, subjColor };
}

let _triumphSlides = [];
let _triumphIdx = 0;

function showTriumph(stats, val, ctx, chapComplete, newBadges, isPerfectAutoTarget) {
    let fmt = n => n < 0.01 ? '<0.01' : n.toFixed(2);
    _triumphSlides = [
        {
            type: 'stat', icon: '📅', label: "Today's Combat",
            number: `+${fmt(stats.todayPct)}%`,
            desc: `You solved <strong>${val} questions</strong> out of today's total assigned combat.`,
            sub: `Today total: ${stats.todayTotal} Qs`, pct: stats.todayPct,
            glowColor: '#f5a623'
        },
        {
            type: 'stat', icon: '📖', label: 'Chapter Progress',
            number: `+${fmt(stats.chapPct)}%`,
            desc: `<strong>${ctx.ch}</strong> — <em>${ctx.sec}</em> moved forward.`,
            sub: `Chapter total: ${stats.chapTotal} Qs`, pct: stats.chapPct,
            glowColor: '#38bdf8'
        },
        {
            type: 'stat', icon: '🧪', label: 'Subject Progress',
            number: `+${fmt(stats.subjPct)}%`,
            desc: `<strong>${ctx.subj}</strong> inched closer to completion.`,
            sub: `Subject total: ${stats.subjTotal} Qs`, pct: stats.subjPct,
            glowColor: RES_COLORS[ctx.filename] || '#f5a623'
        },
        {
            type: 'stat', icon: '🏆', label: 'Total Syllabus',
            number: `+${fmt(stats.grandPct)}%`,
            desc: `Your overall syllabus coverage grew by this much.`,
            sub: `Grand total: ${stats.grandTotal} Qs`, pct: stats.grandPct,
            glowColor: '#a78bfa'
        }
    ].filter(s => s.pct >= 1);

    if (chapComplete) {
        _triumphSlides.push({
            type: 'medal', icon: '🏅', label: 'Chapter Conquered',
            number: '100%',
            desc: `<strong>${ctx.ch}</strong> is fully complete. Every section cleared.`,
            sub: 'Chapter medal earned', pct: 100,
            glowColor: '#ffd700'
        });
    }
    if (newBadges && newBadges.length > 0) {
        _triumphSlides.push({ type: 'badges', badges: newBadges, glowColor: '#34d399' });
    }
    if (isPerfectAutoTarget) {
        _triumphSlides.push({ type: 'autotarget_boost', glowColor: '#a78bfa' });
    }

    _triumphIdx = 0;
    if (_triumphSlides.length === 0) {
        if (document.getElementById('view-custom').classList.contains('active')) switchTab('schedule');
        else renderDay();
        return;
    }
    _renderTriumphSlide();
    document.getElementById('triumph-overlay').classList.add('open');
}

function _renderTriumphSlide() {
    let slides = _triumphSlides;
    let idx = _triumphIdx;
    let isLast = idx === slides.length - 1;
    let gc = slides[idx].glowColor || '#f5a623';

    // Update glow color CSS variable on the overlay
    document.getElementById('triumph-overlay').style.setProperty('--gc', gc);

    let html = '';
    slides.forEach((sl, i) => {
        let active = i === idx ? 'active' : '';
        if (sl.type === 'autotarget_boost') {
            let todayDone = (appData.completions[getDateStr(currentActualDayIdx)] || []).reduce((s, c) => s + c.done, 0);
            let w = getDayWeight(currentActualDayIdx);
            let wLabel = w < 1 ? ` <span style="font-size:0.62rem;color:var(--text-muted);">(÷${w} weight → full-day cap)</span>` : '';
            html += `<div class="triumph-slide ${active}">
                <span class="triumph-icon">⚡</span>
                <div class="triumph-label">AutoTarget — Push More?</div>
                <div class="triumph-desc" style="margin-bottom:16px;">You've cleared every assigned task today.<br>Want to keep going? Pick how many extra:${wLabel}</div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:6px;">
                    ${[5, 10, 15, 20].map(n => {
                let newCap = Math.round((todayDone + n) / w);
                return `<button onclick="applyAutoTargetBoost(${todayDone},${n},${w})"
                            style="padding:12px 8px;background:rgba(167,139,250,0.15);border:1.5px solid rgba(167,139,250,0.4);border-radius:14px;color:#a78bfa;font-family:'Bricolage Grotesque',sans-serif;font-size:1rem;font-weight:800;cursor:pointer;transition:all 0.15s var(--spring);"
                            onmouseover="this.style.background='rgba(167,139,250,0.28)'" onmouseout="this.style.background='rgba(167,139,250,0.15)'">
                            +${n} Qs<br><span style="font-size:0.6rem;font-weight:600;opacity:0.7;">cap→${newCap}</span>
                        </button>`;
            }).join('')}
                </div>
            </div>`;
        } else if (sl.type === 'badges') {
            let badgeRows = sl.badges.map(b => {
                let isNew = b.countNow === 1;
                let cntStr = (b.perAction && b.countNow > 1)
                    ? `<span style="font-size:0.75rem;color:var(--accent);font-family:'JetBrains Mono','Noto Color Emoji',monospace;font-weight:800;margin-left:5px;">×${b.countNow}</span>`
                    : '';
                let tag = isNew
                    ? `<span style="font-size:0.56rem;background:rgba(52,211,153,0.15);color:#34d399;border:1px solid rgba(52,211,153,0.32);border-radius:100px;padding:1px 7px;margin-left:6px;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;vertical-align:middle;">NEW</span>`
                    : `<span style="font-size:0.56rem;background:rgba(245,166,35,0.15);color:var(--accent);border:1px solid rgba(245,166,35,0.3);border-radius:100px;padding:1px 7px;margin-left:6px;font-weight:800;letter-spacing:0.5px;text-transform:uppercase;vertical-align:middle;">+1</span>`;
                return `<div class="triumph-badge-row">
                    <span class="tb-icon">${b.icon}</span>
                    <div class="tb-info">
                        <div class="tb-name">${b.name}${cntStr}${tag}</div>
                        <div class="tb-desc">${b.desc}</div>
                    </div>
                </div>`;
            }).join('');
            let hasNew = sl.badges.some(b => b.countNow === 1);
            let hasUpgrade = sl.badges.some(b => b.perAction && b.countNow > 1);
            let label = (hasNew && hasUpgrade) ? 'Badges Earned' : hasNew ? (sl.badges.length > 1 ? 'Badges Unlocked' : 'Badge Unlocked') : 'Badges Upgraded';
            html += `<div class="triumph-slide ${active}">
                <span class="triumph-icon">🎖️</span>
                <div class="triumph-label">${label}</div>
                ${badgeRows}
            </div>`;
        } else {
            html += `<div class="triumph-slide ${active}">
                <span class="triumph-icon">${sl.icon}</span>
                <div class="triumph-label">${sl.label}</div>
                <span class="triumph-number" style="${sl.type === 'medal' ? 'font-size:3rem;' : ''}">${sl.number}</span>
                <div class="triumph-desc">${sl.desc}</div>
                <div class="triumph-sub">${sl.sub}</div>
            </div>`;
        }
    });
    document.getElementById('triumph-slides').innerHTML = html;

    let dotsHtml = slides.map((_, i) =>
        `<div class="triumph-dot ${i === idx ? 'active' : ''}"></div>`
    ).join('');
    document.getElementById('triumph-dots').innerHTML = dotsHtml;
    document.getElementById('triumph-btn').textContent = isLast ? '✔ FINISH' : 'NEXT ▶';
}

function triumphNext() {
    if (_triumphIdx < _triumphSlides.length - 1) {
        _triumphIdx++;
        _renderTriumphSlide();
    } else {
        document.getElementById('triumph-overlay').classList.remove('open');
        if (document.getElementById('view-custom').classList.contains('active')) switchTab('schedule');
        else renderDay();
    }
}

function applyAutoTargetBoost(todayDone, extra, weight) {
    let w = weight || getDayWeight(currentActualDayIdx) || 1;
    let newCap = Math.round((todayDone + extra) / w);
    if (!appData.settings) appData.settings = {};
    // Today-only override — next day recomputes from bestEff
    appData.settings.autoTargetDayOverride = { dayIdx: currentActualDayIdx, cap: newCap };
    MAX_DAILY_CAPACITY = newCap;
    saveData();
    needsRebuild = true;
    // Close the triumph overlay silently, then open the task assign UI
    document.getElementById('triumph-overlay').classList.remove('open');
    document.getElementById('triumph-btn').onclick = triumphNext;
    // Small delay so triumph closes before assign overlay opens
    setTimeout(() => _openAssignUI(true), 80);
}

// ══════════════════════════════════════════════════════════════════════════════
// AUTOTARGET ASSIGN UI
// ══════════════════════════════════════════════════════════════════════════════
let _aeCtx = {};  // stores selected task during the assign flow

function openWantMore() {
    _openAssignUI(false);
}

function _openAssignUI(isCapBump) {
    let todayDone = (appData.completions[getDateStr(currentActualDayIdx)] || []).reduce((s, c) => s + c.done, 0);
    let w = getDayWeight(currentActualDayIdx);
    let target = Math.round(MAX_DAILY_CAPACITY * w);
    let remaining = Math.max(0, target - todayDone);
    _aeCtx = {};

    // Build subject list from allQueuesClean (pre-porosity snapshot)
    let subjKeys = Object.keys(allQueuesClean).filter(s => allQueuesClean[s].length > 0);
    let subjOpts = subjKeys.map(s =>
        `<option value="${s.replace(/"/g, '&quot;')}">${s}</option>`
    ).join('');

    let headerLine = remaining > 0
        ? `<div style="font-size:0.8rem;color:var(--text-muted);line-height:1.5;margin-bottom:14px;">You have <strong style="color:#a78bfa;">${remaining} Qs</strong> of capacity left today. Pick a task to assign.</div>`
        : `<div style="font-size:0.8rem;color:var(--text-muted);line-height:1.5;margin-bottom:14px;">You are in <strong style="color:#38bdf8;">Overdrive</strong> — pick any extra task to add.</div>`;

    let wNote = w < 1
        ? `<div style="font-size:0.62rem;color:var(--text-muted);margin-top:3px;">Today's weight: ${w} — cap divisor applied to boost selection.</div>`
        : '';

    let slideHtml = `<div class="triumph-slide active" id="ae-slide" style="text-align:left;">
        <div style="text-align:center;margin-bottom:4px;">
            <span style="font-size:2rem;">⚡</span>
            <div style="font-family:'Bricolage Grotesque',sans-serif;font-size:0.58rem;letter-spacing:3px;text-transform:uppercase;color:rgba(168,139,250,0.7);font-weight:700;margin-top:4px;">AutoTarget — Assign Combat</div>
        </div>
        ${headerLine}${wNote}

        <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:10px;">
            <div style="font-size:0.62rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Subject</div>
            <select id="ae-subj" style="width:100%;" onchange="_aeSubjChange()">
                <option value="">— pick subject —</option>
                ${subjOpts}
            </select>
        </div>

        <div id="ae-chap-wrap" style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:12px;padding:12px;margin-bottom:10px;display:none;">
            <div style="font-size:0.62rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Chapter</div>
            <select id="ae-chap" style="width:100%;" onchange="_aeChapChange()">
                <option value="">— pick chapter —</option>
            </select>
        </div>

        <div id="ae-sec-wrap" style="display:none;">
            <div style="font-size:0.62rem;color:var(--text-muted);font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Section</div>
            <div id="ae-sec-list" style="max-height:160px;overflow-y:auto;display:flex;flex-direction:column;gap:6px;"></div>
        </div>

        <div id="ae-qty-wrap" style="background:rgba(168,139,250,0.07);border:1.5px solid rgba(168,139,250,0.3);border-radius:12px;padding:12px;margin-top:10px;display:none;">
            <div style="font-size:0.62rem;color:#a78bfa;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Questions to assign</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <input type="number" id="ae-qty" min="1" placeholder="e.g. 25"
                    style="flex:1;min-width:80px;padding:10px;border-radius:8px;border:1px solid rgba(168,139,250,0.4);background:var(--bg);color:var(--text);font-family:'JetBrains Mono','Noto Color Emoji',monospace;font-size:1.1rem;text-align:center;">
                <div style="display:flex;gap:5px;flex-wrap:wrap;">
                    ${[5, 10, 15, 20].map(n => `<button onclick="document.getElementById('ae-qty').value=${n}"
                        style="padding:6px 10px;background:rgba(168,139,250,0.12);border:1px solid rgba(168,139,250,0.3);color:#a78bfa;border-radius:8px;font-weight:700;font-size:0.78rem;cursor:pointer;">${n}</button>`).join('')}
                </div>
            </div>
            <div id="ae-rem-note" style="font-size:0.65rem;color:var(--text-muted);margin-top:5px;"></div>
            <button onclick="_aeConfirm()"
                style="width:100%;margin-top:12px;padding:12px;background:linear-gradient(90deg,#a78bfa,#6366f1);color:#fff;border:none;border-radius:10px;font-family:'Bricolage Grotesque',sans-serif;font-weight:800;font-size:0.88rem;text-transform:uppercase;letter-spacing:1px;cursor:pointer;">
                ⚡ Inject into Today
            </button>
        </div>
    </div>`;

    document.getElementById('triumph-overlay').style.setProperty('--gc', '#a78bfa');
    document.getElementById('triumph-slides').innerHTML = slideHtml;
    document.getElementById('triumph-dots').innerHTML = '';
    document.getElementById('triumph-btn').textContent = '✕ Close';
    document.getElementById('triumph-btn').onclick = _aeClose;
    document.getElementById('triumph-overlay').classList.add('open');
}

function _aeSubjChange() {
    let subj = document.getElementById('ae-subj').value;
    document.getElementById('ae-chap-wrap').style.display = 'none';
    document.getElementById('ae-sec-wrap').style.display = 'none';
    document.getElementById('ae-qty-wrap').style.display = 'none';
    _aeCtx = {};
    if (!subj) return;

    let tasks = allQueuesClean[subj] || [];
    let chaps = [...new Set(tasks.map(t => t.chapter))];
    let sel = document.getElementById('ae-chap');
    sel.innerHTML = '<option value="">— pick chapter —</option>' +
        chaps.map(ch => `<option value="${ch.replace(/"/g, '&quot;')}">${ch}</option>`).join('');
    document.getElementById('ae-chap-wrap').style.display = 'block';
    _aeCtx.subj = subj;
}

function _aeChapChange() {
    let chap = document.getElementById('ae-chap').value;
    document.getElementById('ae-sec-wrap').style.display = 'none';
    document.getElementById('ae-qty-wrap').style.display = 'none';
    _aeCtx.chap = null;
    _aeCtx.task = null;
    if (!chap) return;

    let subj = _aeCtx.subj;
    let tasks = (allQueuesClean[subj] || []).filter(t => t.chapter === chap && t.rem_raw > 0);
    if (!tasks.length) return;

    let listEl = document.getElementById('ae-sec-list');
    listEl.innerHTML = tasks.map((t, i) => `
        <div id="ae-sec-${i}" onclick="_aeSelectSec(${i})"
            style="display:flex;justify-content:space-between;align-items:center;
                   padding:9px 11px;background:var(--surface-light);border:1px solid var(--border);
                   border-radius:9px;cursor:pointer;transition:border-color 0.15s,background 0.15s;">
            <span style="font-size:0.8rem;font-weight:600;flex:1;margin-right:8px;">${t.section}</span>
            <span style="font-size:0.68rem;color:var(--text-muted);font-family:'JetBrains Mono','Noto Color Emoji',monospace;white-space:nowrap;">Rem: ${t.rem_raw}</span>
        </div>`).join('');
    _aeCtx.chap = chap;
    _aeCtx.tasks = tasks;
    document.getElementById('ae-sec-wrap').style.display = 'block';
}

function _aeSelectSec(idx) {
    let tasks = _aeCtx.tasks;
    if (!tasks) return;
    // Highlight selected
    tasks.forEach((_, i) => {
        let el = document.getElementById(`ae-sec-${i}`);
        if (!el) return;
        el.style.borderColor = i === idx ? '#a78bfa' : 'var(--border)';
        el.style.background = i === idx ? 'rgba(168,139,250,0.1)' : 'var(--surface-light)';
    });
    _aeCtx.task = tasks[idx];
    let qtyWrap = document.getElementById('ae-qty-wrap');
    qtyWrap.style.display = 'block';
    document.getElementById('ae-qty').value = '';
    document.getElementById('ae-qty').max = tasks[idx].rem_raw;
    document.getElementById('ae-rem-note').textContent = `Max: ${tasks[idx].rem_raw} remaining`;
    document.getElementById('ae-qty').focus();
}

function _aeConfirm() {
    let qty = parseInt(document.getElementById('ae-qty').value);
    if (isNaN(qty) || qty <= 0) { alert('Enter a valid number of questions.'); return; }
    let task = _aeCtx.task;
    if (!task) { alert('Select a section first.'); return; }
    if (qty > task.rem_raw) { alert(`Max remaining for this section is ${task.rem_raw}.`); return; }

    let ds = getDateStr(currentActualDayIdx);
    if (!appData.injectedTasks) appData.injectedTasks = {};
    if (!appData.injectedTasks[ds]) appData.injectedTasks[ds] = [];

    let existing = appData.injectedTasks[ds].find(i =>
        i.subj === _aeCtx.subj && i.ch === task.chapter && i.sec === task.section);
    if (existing) {
        existing.qs = Math.min(existing.qs + qty, task.rem_raw);
    } else {
        appData.injectedTasks[ds].push({
            subj: _aeCtx.subj, ch: task.chapter, sec: task.section,
            filename: task.filename, qs: qty, effR: task.effR || 1, rem_raw: task.rem_raw
        });
    }

    saveData();
    needsRebuild = true;
    _aeClose(true); // close without re-render — we renderDay below
    renderDay();
}

function _aeClose(skipRender) {
    document.getElementById('triumph-overlay').classList.remove('open');
    document.getElementById('triumph-btn').onclick = triumphNext;
    if (!skipRender) renderDay();
}

// closeWantMore still used by triumph carousel autotarget_boost close
function closeWantMore(skipRender) {
    document.getElementById('triumph-overlay').classList.remove('open');
    document.getElementById('triumph-btn').onclick = triumphNext;
    if (!skipRender) renderDay();
}


function undoLastLog() {
    if (undoStack.length === 0) { alert("Nothing to undo."); return; }
    let action = undoStack[undoStack.length - 1]; // peek, don't pop yet
    let dayStr = getDateStr(action.dayIdx);
    let confirmed = confirm(`Undo last log?\n\n📖 ${action.ch}\n   ${action.sec}\n\n✖ Remove ${action.val} Qs logged on ${dayStr}`);
    if (!confirmed) return;
    undoStack.pop();

    // Reverse Resource
    let row = appData.resources[action.filename].find(r => r.ch === action.ch && r.sec === action.sec);
    if (row) {
        row.d = Math.max(0, row.d - action.val);
        row.s = Math.max(0, (row.s || 0) - (action.skipped || 0));
    }

    if (action.oc_done && action.oc_done.length > 0) {
        let key = `${action.ch}|${action.sec}`;
        if (appData.ocCompleted && appData.ocCompleted[key]) {
            appData.ocCompleted[key] = appData.ocCompleted[key].filter(q => !action.oc_done.includes(q));
            let row = appData.resources[action.filename].find(r => r.ch === action.ch && r.sec === action.sec);
            if (row) {
                row.d = appData.ocCompleted[key].length;
                let maxTicked = appData.ocCompleted[key].length > 0 ? Math.max(...appData.ocCompleted[key]) : 0;
                row.s = Math.max(0, maxTicked - row.d);
            }
        }
    }

    // Reverse Completion
    let ds = getDateStr(action.dayIdx);
    if (appData.completions[ds]) {
        let idx = appData.completions[ds].findIndex(c => c.subject === action.subj && c.chapter === action.ch && c.section === action.sec);
        if (idx !== -1) {
            appData.completions[ds][idx].done -= action.val;
            if (appData.completions[ds][idx].done <= 0) appData.completions[ds].splice(idx, 1);
        }
        if (appData.completions[ds].length === 0) delete appData.completions[ds];
    }

    saveData();
    needsRebuild = true;
    renderStats();
}

// ==========================================
// CUSTOM TASK UI
// ==========================================
let customAgentState = { step: 0, subj: '', chap: '' };

function renderCustomUI() {
    let con = document.getElementById('view-custom');
    
    if (viewingDayIdx !== currentActualDayIdx) {
        con.innerHTML = `
            <div style="text-align:center; margin: 40px 10px; padding: 40px 20px; background:var(--surface-light); border:1px dashed var(--danger); border-radius: 24px; animation:fadeUp var(--dur-md) var(--decel) both;">
                <div style="font-size: 3rem; margin-bottom: 12px; filter: grayscale(1) opacity(0.8);">⏳</div>
                <div style="font-family:'Bricolage Grotesque',sans-serif; color:var(--danger); font-weight:800; font-size:1.1rem; margin-bottom: 8px; text-transform:uppercase; letter-spacing:1px;">Temporal Lock Active</div>
                <div style="color:var(--text-muted); font-size:0.85rem; line-height: 1.5;">Commander, custom overrides can only be injected into <strong>Today's</strong> combat matrix. Return to the present to log ad-hoc tasks.</div>
                <button class="btn btn-primary" style="width:auto; padding:10px 24px; margin-top:20px;" onclick="goToToday()">Return to Today</button>
            </div>
        `;
        return;
    }

    customAgentState = { step: 0, subj: '', chap: '' };
    renderCustomAgentStep();
}

window.renderCustomAgentStep = function() {
    let con = document.getElementById('view-custom');
    
    let html = `<div style="background:var(--surface-light); border:1px solid var(--border-accent); border-radius:16px; padding:24px; box-shadow: 0 8px 32px rgba(245,166,35,0.08); animation: fadeUp var(--dur-md) var(--decel) both; min-height: 500px; display:flex; flex-direction:column;">`;

    // Terminal Header
    html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; border-bottom:1px solid var(--border); padding-bottom:12px;">
        <div style="font-size:1.1rem; color:var(--accent); font-weight:800; text-transform:uppercase; letter-spacing:1.5px; display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.3rem; animation: pulse 1.5s infinite;">⚡</span> Custom Override
        </div>
        <button class="ed-del-btn" style="margin:0; padding:6px 14px;" onclick="renderCustomUI()">Abort Task</button>
    </div>`;

    html += `<div id="custom-chat-area" style="flex:1; overflow-y:auto; margin-bottom:20px; display:flex; flex-direction:column; gap:16px; padding-right:10px;">`;

    // Step 0: Subject Selection
    html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem;">
        <strong style="color:var(--text);">[SYSTEM]:</strong> Custom combat protocol initiated. Which tactical division (Subject) are we overriding?
    </div>`;
    
    if (customAgentState.step === 0) {
        let subjOpts = Object.keys(allQueuesClean).map(s => `<option value="${s}">${s}</option>`).join('');
        html += `<div class="agent-input-row" style="display:flex; gap:10px; animation: slideInLeft 0.3s ease;">
            <select id="custom-agent-subj" style="flex:1; padding:12px; background:var(--bg); color:var(--text); border:1px solid var(--border-accent); border-radius:8px; font-size:1rem; outline:none;">
                <option value="">-- Select Subject --</option>
                ${subjOpts}
            </select>
            <button class="btn-primary" style="border-radius:8px; padding:0 20px; font-weight:bold; border:none; cursor:pointer;" onclick="advanceCustomAgent(1)">Next ▶</button>
        </div>`;
    } else {
        html += `<div class="user-msg" style="align-self:flex-end; background:var(--accent-dim); color:var(--accent); padding:10px 16px; border-radius:12px 12px 0 12px; animation: fadeUp 0.3s ease;">${customAgentState.subj}</div>`;
    }

    // Step 1: Chapter Selection
    if (customAgentState.step >= 1) {
        html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem; animation: fadeUp 0.3s ease;">
            <strong style="color:var(--text);">[SYSTEM]:</strong> Division '${customAgentState.subj}' confirmed. What is the specific target (Chapter)?
        </div>`;
        
        if (customAgentState.step === 1) {
            let tasks = allQueuesClean[customAgentState.subj] || [];
            let chaps = [...new Set(tasks.map(t => t.chapter))];
            let chapOpts = chaps.map(c => `<option value="${c.replace(/"/g, '&quot;')}">${c}</option>`).join('');
            
            html += `<div class="agent-input-row" style="display:flex; gap:10px; animation: slideInLeft 0.3s ease;">
                <select id="custom-agent-chap" style="flex:1; padding:12px; background:var(--bg); color:var(--text); border:1px solid var(--border-accent); border-radius:8px; font-size:1rem; outline:none;">
                    <option value="">-- Select Chapter --</option>
                    ${chapOpts}
                </select>
                <button class="btn-primary" style="border-radius:8px; padding:0 20px; font-weight:bold; border:none; cursor:pointer;" onclick="advanceCustomAgent(2)">Load Targets ▶</button>
            </div>`;
        } else {
            html += `<div class="user-msg" style="align-self:flex-end; background:var(--accent-dim); color:var(--accent); padding:10px 16px; border-radius:12px 12px 0 12px; animation: fadeUp 0.3s ease;">${customAgentState.chap}</div>`;
        }
    }

    // Step 2: Section Display & Logging
    if (customAgentState.step >= 2) {
        html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem; animation: fadeUp 0.3s ease;">
            <strong style="color:var(--text);">[SYSTEM]:</strong> Targets acquired. Select a section to inject a custom log.
        </div>`;
        
        let s = customAgentState.subj;
        let c = customAgentState.chap;
        let tasks = allQueuesClean[s].filter(t => t.chapter === c);
        
        let secHtml = `<ul class="task-list" style="background:rgba(255,255,255,0.03); border:1px solid var(--border); border-radius:12px; animation: fadeUp 0.3s ease; overflow:hidden;">`;
        tasks.forEach(t => {
            let isOC = t.filename === 'Organic Chemistry.csv';
            let oc_qs_str = '';
            if (isOC) {
                let allQs = (typeof OC_ASSIGNMENTS !== 'undefined' && OC_ASSIGNMENTS[c] && OC_ASSIGNMENTS[c][t.section]) || [];
                let ticked = (appData.ocCompleted && appData.ocCompleted[`${c}|${t.section}`]) || [];
                oc_qs_str = allQs.filter(q => !ticked.includes(q)).join(',');
            }
            secHtml += `<li class="task-item" style="padding: 12px 16px;">
                        <div class="task-info">
                            <div class="task-title" style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text);">${t.section}</div>
                            <div class="task-meta">Rem: ${t.rem_raw}</div>
                        </div>
                        <div class="task-action" onclick="openLogModal('${s}', '${c.replace(/'/g, "\\'")}', '${t.section.replace(/'/g, "\\'")}', ${t.rem_raw}, '${t.filename}', 0, 1, '${oc_qs_str}')">LOG ▶</div>
                     </li>`;
        });
        secHtml += `</ul>`;
        
        html += `<div class="agent-input-row" style="animation: slideInLeft 0.3s ease; display:flex; flex-direction:column; gap:10px;">
            ${secHtml}
            <button class="btn" style="margin-top:10px; width: 100%; border-radius: 8px;" onclick="renderCustomUI()">↩ Restart Override</button>
        </div>`;
    }

    html += `</div></div>`;
    con.innerHTML = html;

    // Automatically scroll to the newest message
    setTimeout(() => {
        let chatArea = document.getElementById('custom-chat-area');
        if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;
    }, 50);
}

window.advanceCustomAgent = function(targetStep) {
    if (targetStep === 1) {
        let val = document.getElementById('custom-agent-subj').value;
        if (!val) { alert("Commander, you must specify a division."); return; }
        customAgentState.subj = val;
    } else if (targetStep === 2) {
        let val = document.getElementById('custom-agent-chap').value;
        if (!val) { alert("Commander, you must specify a target chapter."); return; }
        customAgentState.chap = val;
    }
    customAgentState.step = targetStep;
    renderCustomAgentStep();
}

// ==========================================
// VISUALIZER UI
// ==========================================
function drawBar(d, t, w, s) {
    s = s || 0;
    let p = t > 0 ? d / t : 0;
    let ps = t > 0 ? s / t : 0;
    let c = p >= 0.75 ? 'var(--success)' : (p >= 0.4 ? 'var(--warning)' : 'var(--danger)');
    return `<div class="progress-wrap" style="width:${w}px; display:inline-block; margin:0 8px; vertical-align:middle;">
              <div class="progress-bar-bg" style="position:relative;">
                <div class="progress-bar-fill" style="width:${p * 100}%; background:${c}; position:absolute; left:0; top:0; height:100%;"></div>
                <div style="width:${ps * 100}%; background:rgba(180,180,180,0.35); position:absolute; left:${p * 100}%; top:0; height:100%;"></div>
              </div>
            </div><span style="font-size:0.73rem;">${Math.round(p * 100)}%</span>`;
}

function buildResHtml(res, compact) {
    let data = appData.resources[res.file] || [];
    let chaps = {};
    let gDone = 0, gTotal = 0;
    data.forEach(r => {
        if (!chaps[r.ch]) chaps[r.ch] = { done: 0, total: 0, skipped: 0, secs: [] };
        chaps[r.ch].done += r.d; chaps[r.ch].total += r.t; chaps[r.ch].skipped += (r.s || 0);
        chaps[r.ch].secs.push(r);
        gDone += r.d; gTotal += r.t;
    });
    let gp = gTotal > 0 ? gDone / gTotal : 0;
    let rc = RES_COLORS[res.file] || 'var(--accent)';
    let rcLight = `color-mix(in srgb, ${rc} 55%, #fff 45%)`;

    let html = '';
    for (let c in chaps) {
        let d = chaps[c].done, t = chaps[c].total, sk = chaps[c].skipped || 0;
        let rem = t - d - sk;
        let p = t > 0 ? d / t : 0;
        let ps = t > 0 ? sk / t : 0;
        let progressTint = p >= 0.75 ? '#4ade80'
            : p >= 0.5 ? '#a3e635'
                : p >= 0.35 ? '#fbbf24'
                    : p >= 0.15 ? '#fb923c'
                        : '#f87171';
        let barColor = `linear-gradient(90deg, color-mix(in srgb, ${rc} 25%, ${progressTint} 75%), ${progressTint})`;
        let nameGrad = p === 0
            ? `linear-gradient(90deg, ${rc}, #f87171)`
            : `linear-gradient(90deg, ${rc}, ${progressTint})`;
        let mark = rem === 0 ? `<span style="color:var(--success); margin-left:5px;">✔</span>` : '';

        html += `<div style="padding:7px 0; border-bottom:1px solid var(--border);">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:4px;">
                <span style="font-size:${compact ? '0.78' : '0.9'}rem; font-weight:600; background:${nameGrad}; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;">${c}${mark}</span>
                <span style="font-size:0.68rem; color:var(--text-muted); font-family:'JetBrains Mono','Noto Color Emoji',monospace; margin-left:8px; white-space:nowrap;">${d}/${t}</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
                <div class="progress-bar-bg" style="flex:1; height:4px; background:rgba(255,255,255,0.05); position:relative; overflow:hidden;">
                    <div class="progress-bar-fill" style="width:${p * 100}%; background:${barColor}; position:absolute; left:0; top:0; height:100%;"></div>
                    <div style="width:${ps * 100}%; background:rgba(180,180,180,0.3); position:absolute; left:${p * 100}%; top:0; height:100%;"></div>
                </div>
                <span style="font-size:0.65rem; color:var(--text-muted); font-family:'JetBrains Mono','Noto Color Emoji',monospace; min-width:28px; text-align:right;">${Math.round(p * 100)}%</span>
            </div>`;

        if (rem > 0 && !compact) {
            chaps[c].secs.forEach(s => {
                let ssk = s.s || 0;
                let sr = s.t - s.d - ssk;
                let sp = s.t > 0 ? s.d / s.t : 0;
                let sps = s.t > 0 ? ssk / s.t : 0;
                html += `<div style="display:flex; align-items:center; gap:6px; margin-top:4px; padding-left:10px;">
                    <span style="color:var(--text-subtle); font-size:0.7rem; flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.sec}</span>
                    <div class="progress-bar-bg" style="width:60px; height:3px; background:rgba(255,255,255,0.05); flex-shrink:0; position:relative; overflow:hidden;">
                        <div class="progress-bar-fill" style="width:${sp * 100}%; background:${barColor}; position:absolute; left:0; top:0; height:100%;"></div>
                        <div style="width:${sps * 100}%; background:rgba(180,180,180,0.3); position:absolute; left:${sp * 100}%; top:0; height:100%;"></div>
                    </div>
                    <span style="font-size:0.62rem; color:var(--text-subtle); font-family:'JetBrains Mono','Noto Color Emoji',monospace; min-width:22px; text-align:right;">${sr === 0 ? '✔' : 'r:' + sr}</span>
                </div>`;
            });
        }
        html += `</div>`;
    }

    let gradPct = `linear-gradient(90deg,${rc},${rcLight})`;
    html += `<div style="margin-top:10px; padding:8px 10px; background:rgba(255,255,255,0.03); border-radius:6px; display:flex; align-items:center; gap:10px;">
        <span style="font-size:0.65rem; color:var(--text-muted); font-family:'JetBrains Mono','Noto Color Emoji',monospace;">TOTAL</span>
        <div class="progress-bar-bg" style="flex:1; height:4px; background:rgba(255,255,255,0.05);">
            <div class="progress-bar-fill" style="width:${gp * 100}%; background:${gradPct};"></div>
        </div>
        <span style="font-size:0.75rem; font-weight:700; background:${gradPct}; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${gDone}/${gTotal}</span>
    </div>`;
    return html;
}

function renderVisualizer() {
    const visCon = document.getElementById('vis-content');
    const isDesk = window.innerWidth >= 820;
    visCon.className = '';
    const vn = document.getElementById('vis-nav');
    const vt = document.getElementById('vis-title');
    if (vn) vn.style.display = 'none';
    if (vt) vt.style.display = 'none';

    // Gather data
    let campDone = 0, campSkipped = 0, campTotal = 0, totalQsLogged = 0;
    for (let ds in appData.completions) appData.completions[ds].forEach(c => totalQsLogged += c.done);
    
    let rdList = RESOURCES_LIST.map(res => {
        let gD, gS, gT, chaps;
        if (res.file === 'Organic Chemistry.csv') {
            let oc = _ocTrackerData();
            gD = oc.gD; gS = 0; gT = oc.gT; chaps = oc.chaps;
        } else {
            let rows = appData.resources[res.file] || [];
            gD = rows.reduce((s, x) => s + x.d, 0); gS = rows.reduce((s, x) => s + (x.s || 0), 0); gT = rows.reduce((s, x) => s + x.t, 0);
            chaps = {};
            rows.forEach(r => {
                if (!chaps[r.ch]) chaps[r.ch] = { d: 0, t: 0, s: 0, secs: [] };
                chaps[r.ch].d += r.d; chaps[r.ch].t += r.t; chaps[r.ch].s += (r.s || 0); chaps[r.ch].secs.push(r);
            });
        }
        campDone += gD; campSkipped += gS; campTotal += gT;
        return { res, gD, gS, gT, chaps, pct: gT > 0 ? gD / gT : 0, rc: RES_COLORS[res.file] || '#f5a623' };
    });

    // ⚡ EMPTY STATE CHECK ⚡
    if (campTotal === 0) {
        visCon.innerHTML = `
            <div style="text-align:center; margin: 40px 10px; padding: 40px 20px; background:var(--surface-light); border:1px dashed var(--border-hi); border-radius: 24px; animation:fadeUp var(--dur-md) var(--decel) both;">
                <div style="font-size: 3rem; margin-bottom: 12px; filter: grayscale(1) opacity(0.5);">📖</div>
                <div style="font-family:'Bricolage Grotesque',sans-serif; color:var(--text); font-weight:800; font-size:1.1rem; margin-bottom: 8px; text-transform:uppercase; letter-spacing:1px;">No Data Available</div>
                <div style="color:var(--text-muted); font-size:0.85rem; line-height: 1.5; margin-bottom: 24px; max-width: 320px; margin-inline: auto;">The reality matrix is currently blank. Compile and deploy resources to generate the tactical sunburst map.</div>
                <button class="btn btn-primary" style="width:auto; padding:10px 24px;" onclick="switchTab('editor')">📝 Initialize Asset Compiler</button>
            </div>
        `;
        return; // Stop rendering the rest of the visualizer
    }

    const campPct = campTotal > 0 ? campDone / campTotal : 0;
    const campPctN = Math.round(campPct * 100);
    const rank = getRank(campPctN);
    const strk = getStreak(currentActualDayIdx);
    const daysLeft = TOTAL_DAYS - currentActualDayIdx;
    const todayDone = (getCompletionsForDay(currentActualDayIdx) || []).reduce((s, c) => s + c.done, 0);
    const campGC = campPctN >= 75 ? ['#34d399', '#6ee7b7'] : campPctN >= 40 ? ['#fb923c', '#fbbf24'] : ['#f87171', '#fb923c'];

    // Sunburst SVG
    const W = Math.max(visCon.clientWidth || 0, isDesk ? window.innerWidth - 500 : window.innerWidth - 28);
    const SZ = isDesk ? Math.min(W * 0.44, 440) : Math.min(W - 4, 320);
    const cx = SZ / 2, cy = SZ / 2;
    const GAPRAD = 0.030;
    const RC = SZ * 0.14, R1I = SZ * 0.185, R1O = SZ * 0.30, R2I = SZ * 0.32, R2O = SZ * 0.462;

    function ptc(cx, cy, r, a) { return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
    function arcPath(cx, cy, ri, ro, a0, a1, fill, op) {
        if (a1 - a0 < 0.003 || op < 0.01) return '';
        const lg = (a1 - a0) > Math.PI ? 1 : 0;
        const [x1, y1] = ptc(cx, cy, ro, a0), [x2, y2] = ptc(cx, cy, ro, a1);
        const [x3, y3] = ptc(cx, cy, ri, a1), [x4, y4] = ptc(cx, cy, ri, a0);
        return `<path d="M${x1.toFixed(2)},${y1.toFixed(2)}A${ro},${ro},0,${lg},1,${x2.toFixed(2)},${y2.toFixed(2)}L${x3.toFixed(2)},${y3.toFixed(2)}A${ri},${ri},0,${lg},0,${x4.toFixed(2)},${y4.toFixed(2)}Z" fill="${fill}" opacity="${op}" stroke="rgba(0,0,0,0.35)" stroke-width="0.5"/>`;
    }

    const totalQsAll = rdList.reduce((s, r) => s + r.gT, 0) || 1;
    let paths = '', labs = '';
    let sa = -Math.PI / 2;

    rdList.forEach((rd, ri) => {
        const { gD, gS, gT, chaps, pct, rc } = rd;
        if (!gT) return;
        const span = (gT / totalQsAll) * (2 * Math.PI);
        const re2 = sa + span - GAPRAD;
        // Resource ring: track, done, skip
        paths += arcPath(cx, cy, R1I, R1O, sa, re2, rc, 0.13);
        paths += arcPath(cx, cy, R1I, R1O, sa, sa + (re2 - sa) * pct, rc, 0.92);
        const skP = gT > 0 ? gS / gT : 0;
        if (skP > 0.003) paths += arcPath(cx, cy, R1I, R1O, sa + (re2 - sa) * pct, sa + (re2 - sa) * (pct + skP), rc, 0.38);
        // Emoji label on resource ring
        const ma = sa + span / 2 - GAPRAD / 2;
        if (span > 0.26) {
            const [lx, ly] = ptc(cx, cy, (R1I + R1O) / 2, ma);
            const em = rd.res.name.split(' ')[0];
            // Fix: Added dynamic theme fill and a protective stroke halo
            labs += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="var(--text)" stroke="var(--bg)" stroke-width="4" stroke-linejoin="round" paint-order="stroke fill" font-size="${SZ * 0.042}" style="pointer-events:none;">${em}</text>`;
        }
        // Chapter ring
        const cEnt = Object.entries(chaps);
        const cTot = cEnt.reduce((s, [, v]) => s + v.t, 0) || 1;
        const cSpan = span - GAPRAD;
        let cs = sa;
        cEnt.forEach(([ch, cv]) => {
            const cS = (cv.t / cTot) * cSpan;
            const cEnd = cs + cS - GAPRAD * 0.42;
            if (cEnd > cs + 0.006) {
                const cp = cv.t > 0 ? cv.d / cv.t : 0;
                const csk = cv.t > 0 ? cv.s / cv.t : 0;
                paths += arcPath(cx, cy, R2I, R2O, cs, cEnd, rc, 0.11);
                paths += arcPath(cx, cy, R2I, R2O, cs, cs + (cEnd - cs) * cp, rc, 0.85);
                if (csk > 0.003) paths += arcPath(cx, cy, R2I, R2O, cs + (cEnd - cs) * cp, cs + (cEnd - cs) * (cp + csk), rc, 0.30);
            }
            cs += cS;
        });
        sa += span;
    });

    const svgHtml = `<svg width="${SZ}" height="${SZ}" viewBox="0 0 ${SZ} ${SZ}" style="display:block;overflow:visible;flex-shrink:0;">
        <defs>
            <radialGradient id="vRG" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${campGC[0]}" stop-opacity="0.14"/><stop offset="100%" stop-color="${campGC[0]}" stop-opacity="0"/></radialGradient>
            <linearGradient id="vLG" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="${campGC[0]}"/><stop offset="100%" stop-color="${campGC[1]}"/></linearGradient>
        </defs>
        <circle cx="${cx}" cy="${cy}" r="${R2O + 8}" fill="url(#vRG)"/>
        ${paths}
        ${labs}
        <circle cx="${cx}" cy="${cy}" r="${RC}" fill="var(--surface)" stroke="var(--border-hi)" stroke-width="1.5"/>
        <text x="${cx}" y="${cy - SZ * 0.042}" text-anchor="middle" dominant-baseline="central" fill="url(#vLG)" font-family="var(--font-mono)" font-size="${SZ * 0.068}" font-weight="700">${campPctN}%</text>
        <text x="${cx}" y="${cy + SZ * 0.018}" text-anchor="middle" dominant-baseline="central" fill="${campGC[0]}" font-family="var(--font-head)" font-size="${SZ * 0.033}" font-weight="800" opacity="0.9">${rank.icon} ${rank.title.toUpperCase()}</text>
        <text x="${cx}" y="${cy + SZ * 0.058}" text-anchor="middle" dominant-baseline="central" fill="var(--text-subtle)" font-family="var(--font-mono)" font-size="${SZ * 0.024}">${campDone.toLocaleString()}/${campTotal.toLocaleString()}</text>
    </svg>`;

    // Section chips
    function chipCol(p) { return p >= 1 ? '#34d399' : p >= 0.75 ? '#6ee7b7' : p >= 0.5 ? '#a3e635' : p >= 0.25 ? '#fbbf24' : p > 0.01 ? '#fb923c' : 'rgba(255,255,255,0.09)'; }
    const sectionHtml = rdList.map(rd => {
        const { res, chaps, rc, gT } = rd; if (!gT) return '';
        const parts = res.name.split(' ');
        const chapRows = Object.entries(chaps).map(([ch, cv]) => {
            const cp = cv.t > 0 ? cv.d / cv.t : 0;
            const chips = cv.secs.map(s => {
                const sp = s.t > 0 ? s.d / s.t : 0;
                const col = chipCol(sp);
                const rem = Math.max(0, s.t - s.d - (s.s || 0));
                const lbl = s.sec.replace(/\s*\(.*?\)/g, '').replace(/\s+/g, ' ').substring(0, 11).trim();
                const isDone = rem === 0 && s.t > 0;
                const isBg = col === 'rgba(255,255,255,0.09)';
                return `<div title="${s.sec}: ${s.d}/${s.t} done (${Math.round(sp * 100)}%)" style="display:inline-flex;align-items:center;gap:2px;background:color-mix(in srgb,${col} 18%,transparent);border:1px solid color-mix(in srgb,${col} 44%,transparent);border-radius:4px;padding:2px 5px;font-size:0.5rem;font-family:'JetBrains Mono','Noto Color Emoji',monospace;color:${isBg ? 'rgba(255,255,255,0.28)' : col};white-space:nowrap;flex-shrink:0;"><span style="width:5px;height:5px;border-radius:50%;background:${col};display:inline-block;flex-shrink:0;"></span>${lbl}${isDone ? '✔' : ''}</div>`;
            }).join('');
            return `<div style="margin-bottom:5px;">
                <div style="display:flex;align-items:center;gap:5px;margin-bottom:3px;">
                    <div style="font-size:0.58rem;font-weight:700;color:${rc};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0;">${ch}</div>
                    <div style="font-size:0.52rem;color:${rc};font-family:'JetBrains Mono','Noto Color Emoji',monospace;flex-shrink:0;">${Math.round(cp * 100)}%</div>
                </div>
                <div style="display:flex;flex-wrap:wrap;gap:3px;">${chips}</div>
            </div>`;
        }).join('');
        return `<div style="margin-bottom:8px;padding:8px 10px;background:color-mix(in srgb,${rc} 6%,var(--surface-light));border:1px solid color-mix(in srgb,${rc} 20%,transparent);border-radius:14px;"><div style="font-size:0.57rem;font-weight:800;font-family:'Bricolage Grotesque',sans-serif;text-transform:uppercase;letter-spacing:0.8px;background:linear-gradient(90deg,${rc},color-mix(in srgb,${rc} 55%,#fff 45%));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:6px;">${parts[0]} ${parts.slice(1).join(' ')}</div>${chapRows}</div>`;
    }).join('');

    // Weekly bars
    let weekDays = getWeeklyStats(), weekBest = weekDays.filter(Boolean).reduce((m, d) => Math.max(m, d.total), 0);
    const DL = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const weekBars = weekDays.map(d => {
        if (!d) return `<div style="flex:1;"></div>`;
        const lbl = DL[new Date(START_DATE.getTime() + d.idx * 86400000).getDay()];
        const h = weekBest > 0 ? Math.max(4, Math.round((d.total / weekBest) * 30)) : 4;
        const isToday = d.idx === currentActualDayIdx;
        const col = d.total === 0 ? 'rgba(255,255,255,0.07)' : isToday ? `linear-gradient(180deg,${campGC[0]},${campGC[1]})` : 'linear-gradient(180deg,#a78bfa,#6366f1)';
        return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;"><div style="font-size:0.44rem;color:${campGC[0]};font-family:'JetBrains Mono','Noto Color Emoji',monospace;min-height:9px;">${d.total > 0 ? d.total : ''}</div><div style="width:10px;height:${h}px;background:${col};border-radius:2px;margin-top:auto;"></div><div style="font-size:0.44rem;color:var(--text-subtle);font-weight:700;">${lbl}</div></div>`;
    }).join('');

    const statsStrip = `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:6px;">${[{ v: strk, l: 'Streak', c: '#fb923c', i: '🔥' }, { v: daysLeft, l: 'Days Left', c: '#f5a623', i: '📅' }, { v: totalQsLogged, l: 'Total Qs', c: '#a78bfa', i: '⚡' }, { v: todayDone, l: 'Today', c: '#38bdf8', i: '🎯' }].map(s => `<div style="background:color-mix(in srgb,${s.c} 8%,var(--surface));border:1px solid color-mix(in srgb,${s.c} 20%,transparent);border-radius:10px;padding:6px 4px;text-align:center;"><div style="font-size:0.88rem;font-weight:800;background:linear-gradient(135deg,${s.c},color-mix(in srgb,${s.c} 60%,#fff 40%));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${s.v}</div><div style="font-size:0.44rem;color:var(--text-subtle);text-transform:uppercase;letter-spacing:0.5px;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;">${s.l} ${s.i}</div></div>`).join('')}</div><div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:7px 10px;margin-bottom:6px;"><div style="font-size:0.44rem;letter-spacing:2px;text-transform:uppercase;color:var(--text-subtle);font-family:'Bricolage Grotesque',sans-serif;font-weight:700;margin-bottom:4px;">📈 7-Day Velocity</div><div style="display:flex;align-items:flex-end;gap:3px;height:38px;">${weekBars}</div></div>`;

    const legend = `<div style="display:flex;flex-wrap:wrap;gap:3px;margin-bottom:6px;align-items:center;">${rdList.map(rd => { const p = rd.res.name.split(' '); return `<div style="display:flex;align-items:center;gap:3px;font-size:0.46rem;color:var(--text-muted);background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:100px;padding:2px 6px;"><div style="width:6px;height:6px;border-radius:50%;background:${rd.rc};box-shadow:0 0 4px ${rd.rc};flex-shrink:0;"></div>${p[0]} ${p.slice(1).join(' ')}</div>`; }).join('')}<span style="font-size:0.42rem;color:var(--text-subtle);margin-left:2px;">inner ring=resource · outer ring=chapter · bright=done · dim=skipped</span></div>`;

    const secLabel = `<div style="font-size:0.48rem;letter-spacing:2px;text-transform:uppercase;color:var(--text-subtle);font-family:'Bricolage Grotesque',sans-serif;font-weight:700;margin-bottom:7px;padding-bottom:5px;border-bottom:1px solid var(--border);">🎯 Section Breakdown — chip color = completion level</div>`;

    if (isDesk) {
        // 2-col greedy layout: stats card anchors col-0, section cards distributed greedily across both cols
        const statsCard = {
            html: `<div style="margin-bottom:8px;">${svgHtml}${statsStrip}${legend}</div>`,
            weight: 12  // anchor weight — keeps stats in left col while sections balance around it
        };
        const secCards = rdList.filter(rd => rd.gT > 0).map(rd => {
            const { res, chaps, rc, gT } = rd;
            const parts = res.name.split(' ');
            const chapRows = Object.entries(chaps).map(([ch, cv]) => {
                const cp = cv.t > 0 ? cv.d / cv.t : 0;
                const chips = cv.secs.map(s => {
                    const sp = s.t > 0 ? s.d / s.t : 0;
                    const col = chipCol(sp);
                    const rem = Math.max(0, s.t - s.d - (s.s || 0));
                    const lbl = s.sec.replace(/\s*\(.*?\)/g, '').replace(/\s+/g, ' ').substring(0, 11).trim();
                    const isDone = rem === 0 && s.t > 0;
                    const isBg = col === 'rgba(255,255,255,0.09)';
                    return `<div title="${s.sec}: ${s.d}/${s.t} done (${Math.round(sp * 100)}%)" style="display:inline-flex;align-items:center;gap:2px;background:color-mix(in srgb,${col} 18%,transparent);border:1px solid color-mix(in srgb,${col} 44%,transparent);border-radius:4px;padding:2px 5px;font-size:0.5rem;font-family:'JetBrains Mono','Noto Color Emoji',monospace;color:${isBg ? 'rgba(255,255,255,0.28)' : col};white-space:nowrap;flex-shrink:0;"><span style="width:5px;height:5px;border-radius:50%;background:${col};display:inline-block;flex-shrink:0;"></span>${lbl}${isDone ? '✔' : ''}</div>`;
                }).join('');
                return `<div style="margin-bottom:5px;"><div style="display:flex;align-items:center;gap:5px;margin-bottom:3px;"><div style="font-size:0.58rem;font-weight:700;color:${rc};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0;">${ch}</div><div style="font-size:0.52rem;color:${rc};font-family:'JetBrains Mono','Noto Color Emoji',monospace;flex-shrink:0;">${Math.round(cp * 100)}%</div></div><div style="display:flex;flex-wrap:wrap;gap:3px;">${chips}</div></div>`;
            }).join('');
            const secCount = Object.values(chaps).reduce((s, cv) => s + cv.secs.length, 0);
            return {
                html: `<div style="margin-bottom:8px;padding:8px 10px;background:color-mix(in srgb,${rc} 6%,var(--surface-light));border:1px solid color-mix(in srgb,${rc} 20%,transparent);border-radius:14px;"><div style="font-size:0.57rem;font-weight:800;font-family:'Bricolage Grotesque',sans-serif;text-transform:uppercase;letter-spacing:0.8px;background:linear-gradient(90deg,${rc},color-mix(in srgb,${rc} 55%,#fff 45%));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:6px;">${parts[0]} ${parts.slice(1).join(' ')}</div>${chapRows}</div>`,
                weight: secCount
            };
        });
        // Greedy 2-col: stats card pre-placed in col-0, then section cards sorted heaviest-first
        secCards.sort((a, b) => b.weight - a.weight);
        const vCols = [[statsCard.html], []], vH = [statsCard.weight, 0];
        secCards.forEach(c => { const i = vH.indexOf(Math.min(...vH)); vCols[i].push(c.html); vH[i] += c.weight; });
        visCon.innerHTML = `<div style="display:flex;gap:14px;align-items:start;padding-bottom:80px;max-width:100%;overflow:hidden;">${vCols.map(col => `<div style="flex:1;min-width:0;">${secLabel}${col.join('')}</div>`).join('')}</div>`;
    } else {
        visCon.innerHTML = `<div style="max-width:100%;overflow-x:hidden;padding-bottom:120px;"><div style="display:flex;justify-content:center;margin-bottom:8px;">${svgHtml}</div>${statsStrip}${legend}${secLabel}${sectionHtml}</div>`;
    }
}

function changeVis(dir) {
    currentVisIdx = (currentVisIdx + dir + RESOURCES_LIST.length) % RESOURCES_LIST.length;
    renderVisualizer();
}


// ==========================================
// STATS UI
// ==========================================
function renderStats() {
    let subT = {};
    for (let d in appData.completions) {
        appData.completions[d].forEach(c => {
            subT[c.subject] = (subT[c.subject] || 0) + c.done;
        });
    }

    let totalAll = Object.values(subT).reduce((a, b) => a + b, 0);
    let strk = getStreak(currentActualDayIdx);
    let actD = 0;
    for (let d = 0; d < currentActualDayIdx; d++) if (getDayWeight(d) > 0) actD++;
    let daysLeft = TOTAL_DAYS - currentActualDayIdx;

    // Main stats card
    let html = `<div style="display:flex; justify-content:space-between; font-weight:bold; color:var(--text-muted); padding-bottom:10px; border-bottom:1px solid var(--border); font-size:0.78rem; text-transform:uppercase; letter-spacing:0.5px;"><span>Subject</span><span>Qs Logged</span></div>`;
    for (let s in subT) {
        let pct = totalAll > 0 ? (subT[s] / totalAll * 100) : 0;
        html += `<div class="stat-row">
            <span style="flex:1;">${s}</span>
            <div style="flex:1; margin:0 12px; display:flex; align-items:center;">
                <div class="progress-bar-bg" style="flex:1; height:5px;"><div class="progress-bar-fill" style="width:${pct}%; background:var(--accent);"></div></div>
            </div>
            <span style="font-weight:bold; font-family:'Share Tech Mono',monospace; min-width:36px; text-align:right;">${subT[s]}</span>
        </div>`;
    }
    html += `<div class="stat-row" style="border:none; margin-top:5px; font-size:1.05rem;"><span>TOTAL</span><span style="color:var(--accent); font-weight:bold; font-family:'Share Tech Mono',monospace;">${totalAll}</span></div>`;
    html += `<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-top:16px;">
        <div style="background:var(--surface-light); border:1px solid var(--border); border-radius:6px; padding:10px; text-align:center;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--warning); font-family:'Share Tech Mono',monospace;">${strk}</div>
            <div style="font-size:0.63rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px;">Streak 🔥</div>
        </div>
        <div style="background:var(--surface-light); border:1px solid var(--border); border-radius:6px; padding:10px; text-align:center;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--text); font-family:'Share Tech Mono',monospace;">${actD}</div>
            <div style="font-size:0.63rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px;">Days Active</div>
        </div>
        <div style="background:var(--surface-light); border:1px solid var(--border); border-radius:6px; padding:10px; text-align:center;">
            <div style="font-size:1.5rem; font-weight:800; color:var(--accent); font-family:'Share Tech Mono',monospace;">${daysLeft}</div>
            <div style="font-size:0.63rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px;">Days Left 📅</div>
        </div>
    </div>`;
    document.getElementById('stats-content').innerHTML = html;

    // Right column on desktop: weekly report + badges + activity log
    let extra = document.getElementById('stats-extra');
    if (extra) {
        // ── Weekly Report ──────────────────────────────────────────────────
        let weekDays = getWeeklyStats();
        let weekTotal = weekDays.filter(Boolean).reduce((s, d) => s + d.total, 0);
        let weekBest = weekDays.filter(Boolean).reduce((m, d) => Math.max(m, d.total), 0);
        let weekActive = weekDays.filter(d => d && d.total > 0).length;
        let dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        let weekBarHtml = weekDays.map(d => {
            if (!d) return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;"><div style="flex:1;"></div><div style="font-size:0.52rem;color:var(--text-subtle);">—</div></div>`;
            let date = new Date(START_DATE.getTime() + d.idx * 86400000);
            let label = dayLabels[date.getDay()];
            let h = weekBest > 0 ? Math.max(4, Math.round((d.total / weekBest) * 48)) : 4;
            let col = d.total === 0 ? 'rgba(255,255,255,0.06)' : d.idx === currentActualDayIdx ? 'linear-gradient(180deg,#f5a623,#e07b00)' : 'linear-gradient(180deg,#a78bfa,#6366f1)';
            return `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;">
                <div style="font-size:0.55rem;color:var(--accent);font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${d.total > 0 ? d.total : ''}</div>
                <div style="width:12px;height:${h}px;background:${col};border-radius:3px;margin-top:auto;"></div>
                <div style="font-size:0.52rem;color:var(--text-subtle);font-family:'Bricolage Grotesque',sans-serif;font-weight:700;">${label}</div>
            </div>`;
        }).join('');
        let weekHtml = `
        <div style="font-family:'JetBrains Mono','Noto Color Emoji',monospace; color:var(--accent); font-size:0.65rem; letter-spacing:2px; text-transform:uppercase; margin-bottom:10px;">Weekly Report</div>
        <div style="background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:12px; margin-bottom:14px;">
            <div style="display:flex; align-items:flex-end; gap:4px; height:68px; margin-bottom:8px;">${weekBarHtml}</div>
            <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-top:8px;border-top:1px solid var(--border);padding-top:8px;">
                <div style="text-align:center;">
                    <div style="font-size:1.1rem;font-weight:800;color:var(--accent);font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${weekTotal}</div>
                    <div style="font-size:0.55rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Total Qs</div>
                </div>
                <div style="text-align:center;">
                    <div style="font-size:1.1rem;font-weight:800;color:var(--success);font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${weekBest}</div>
                    <div style="font-size:0.55rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Best Day</div>
                </div>
                <div style="text-align:center;">
                    <div style="font-size:1.1rem;font-weight:800;color:var(--warning);font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${weekActive}/7</div>
                    <div style="font-size:0.55rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Days Active</div>
                </div>
            </div>
        </div>`;

        // ── Badges ─────────────────────────────────────────────────────────
        let earnedSet = evaluateAllBadges();
        let cats = [...new Set(BADGE_DEFS.map(b => b.cat))];
        let badgesHtml = `<div style="font-family:'JetBrains Mono','Noto Color Emoji',monospace; color:var(--accent); font-size:0.65rem; letter-spacing:2px; text-transform:uppercase; margin-bottom:10px; margin-top:16px;">Achievements <span style="color:var(--text-muted);">${earnedSet.size}/${BADGE_DEFS.length}</span></div>`;
        cats.forEach(cat => {
            let catBadges = BADGE_DEFS.filter(b => b.cat === cat);
            badgesHtml += `<div style="font-size:0.6rem;color:var(--text-subtle);text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin:10px 0 6px;font-family:'Bricolage Grotesque',sans-serif;">${cat}</div>`;
            badgesHtml += `<div class="badge-grid" style="margin-bottom:4px;">`;
            catBadges.forEach(b => {
                let earned = earnedSet.has(b.id);
                let cnt = b.perAction ? ((appData.badgeCounts || {})[b.id] || 0) : 0;
                let cntChip = (earned && cnt > 1) ? `<div style="margin-top:2px;font-size:0.63rem;font-weight:800;color:var(--bc,var(--accent));font-family:'JetBrains Mono','Noto Color Emoji',monospace;letter-spacing:0.5px;">×${cnt}</div>` : '';
                badgesHtml += `<div class="badge-card ${earned ? 'earned' : 'locked'}" style="--bc:${b.color || 'var(--accent)'};">
                    <span class="b-icon">${b.icon}</span>
                    <div class="b-name">${b.name}</div>
                    ${cntChip}
                    <div class="b-desc">${earned ? b.desc : '???'}</div>
                </div>`;
            });
            badgesHtml += `</div>`;
        });
        let statsBadgesEl = document.getElementById('stats-badges');
        if (statsBadgesEl) statsBadgesEl.innerHTML = badgesHtml;

        // ── Activity Log ───────────────────────────────────────────────────
        let sortedDays = Object.keys(appData.completions).filter(d => appData.completions[d].length > 0).sort((a, b) => b.localeCompare(a));
        let logHtml = `<div style="font-family:'JetBrains Mono','Noto Color Emoji',monospace; color:var(--accent); font-size:0.65rem; letter-spacing:2px; text-transform:uppercase; margin:14px 0 10px;">Activity Log</div>`;
        if (sortedDays.length === 0) {
            logHtml += `<div style="color:var(--text-muted); font-size:0.8rem;">No activity yet.</div>`;
        } else {
            sortedDays.slice(0, 20).forEach(ds => {
                let dayComps = appData.completions[ds];
                let dayTotal = dayComps.reduce((s, c) => s + c.done, 0);
                let isToday = ds === getDateStr(currentActualDayIdx);
                logHtml += `<div style="margin-bottom:10px; padding:10px; background:var(--surface); border:1px solid ${isToday ? 'var(--border-accent)' : 'var(--border)'}; border-radius:6px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
                        <span style="font-size:0.72rem; font-family:'JetBrains Mono','Noto Color Emoji',monospace; color:${isToday ? 'var(--accent)' : 'var(--text-muted)'};">${ds}${isToday ? ' ◄ TODAY' : ''}</span>
                        <span style="font-size:0.72rem; font-weight:700; color:var(--accent);">${dayTotal} Qs</span>
                    </div>`;
                dayComps.forEach(c => {
                    logHtml += `<div style="font-size:0.72rem; padding:2px 0; border-top:1px solid var(--border); display:flex; justify-content:space-between;">
                        <span style="color:var(--text-muted); flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-right:8px;">${c.chapter} · ${c.section}</span>
                        <span style="font-weight:600; white-space:nowrap;">${c.done}q</span>
                    </div>`;
                });
                logHtml += `</div>`;
            });
        }

        extra.innerHTML = weekHtml + logHtml;
    }

    document.getElementById('btn-undo').style.display = undoStack.length > 0 ? "block" : "none";
    renderRightPanel();
}

// ==========================================
// EDITOR UI

const DEFAULT_SUBJECTS = [
    { name: '🧲 PHYSICS', color: '#fb7185' },
    { name: '🧮 MATHS', color: '#a78bfa' },
    { name: '⚗️ PHYSICAL CHEM', color: '#38bdf8' },
    { name: '🧬 INORGANIC CHEM', color: '#34d399' },
    { name: '🧪 ORGANIC (SKM)', color: '#f5a623' },
    { name: '📦 EXTRA', color: '#94a3b8' }
];

function initEditor() {
    let sel = document.getElementById('editor-file');
    sel.innerHTML = '<option value="">-- Select Resource --</option>';
    RESOURCES_LIST.forEach(r => sel.innerHTML += `<option value="${r.file}">${r.name}</option>`);
    renderEditorResourceList();
    populateSubjectDropdowns();
}

let agentState = { step: 0, name: '', subj: '', blueprint: 'Exercise 1: 50\nExercise 2: 30\nPYQs', chapters: '' };

window.openAddResourceForm = function () {
    // Hide left-pane distractions
    document.getElementById('manage-subjects-form').style.display = 'none';
    let oldForm = document.getElementById('add-resource-form');
    if (oldForm) oldForm.style.display = 'none';

    // Deselect current file
    document.getElementById('editor-file').value = '';
    document.getElementById('editor-add-chapter-area').innerHTML = '';

    // Initialize Agent with explicit newline example
    agentState = { step: 0, name: '', subj: '', blueprint: 'Exercise 1: 50\nExercise 2: 30\nPYQs', chapters: '' };
    renderAgentStep();
};

window.renderAgentStep = function () {
    let con = document.getElementById('editor-content');

    let html = `<div style="background:var(--surface-light); border:1px solid var(--border-accent); border-radius:16px; padding:24px; box-shadow: 0 8px 32px rgba(245,166,35,0.08); animation: fadeUp var(--dur-md) var(--decel) both; min-height: 500px; display:flex; flex-direction:column;">`;

    // Terminal Header with Preset Dropdown
    html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; border-bottom:1px solid var(--border); padding-bottom:12px;">
        <div style="font-size:1.1rem; color:var(--accent); font-weight:800; text-transform:uppercase; letter-spacing:1.5px; display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.3rem; animation: pulse 1.5s infinite;">⚡</span> Asset Compiler
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
            <select id="agent-preset" onchange="applyAgentPreset()" style="padding:6px 10px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-size:0.75rem; font-weight:700; outline:none; cursor:pointer;">
                <option value="">+ Load Preset</option>
                <option value="Neeraj Kumar JA|pc">⚗️ Physical Chem: Neeraj Kumar JA</option>
                <option value="OC SKM|oc">🧪 Organic Chem: OC SKM</option>
                <option value="IOC VK Jaiswal|ioc">🧬 Inorganic Chem: IOC VK Jaiswal</option>
                <option value="Math (Yellow Book)|math">🧮 Math: Yellow Book</option>
                <option value="Math (Sameer Bansal)|math">🧮 Math: Sameer Bansal</option>
                <option value="Math (Pink Book)|math">🧮 Math: Pink Book</option>
                <option value="Physics (GQB)|physics">🧲 Physics (GQB)</option>
            </select>
            <button class="ed-del-btn" style="margin:0; padding:6px 14px;" onclick="renderEditor()">Abort Task</button>
        </div>
    </div>`;

    html += `<div id="agent-chat-area" style="flex:1; overflow-y:auto; margin-bottom:20px; display:flex; flex-direction:column; gap:16px; padding-right:10px;">`;

    // Step 0: Name
    html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem;">
        <strong style="color:var(--text);">[SYSTEM]:</strong> Commander, new intel detected. What is the codename for this asset? (e.g., HC Verma)
    </div>`;
    if (agentState.step === 0) {
        html += `<div class="agent-input-row" style="display:flex; gap:10px; animation: slideInLeft 0.3s ease;">
            <input type="text" id="agent-name-input" placeholder="Asset Name..." style="flex:1; padding:12px; background:var(--bg); color:var(--text); border:1px solid var(--border-accent); border-radius:8px; font-size:1rem; outline:none;" onkeydown="if(event.key==='Enter') advanceAgent(1)">
            <button class="btn-primary" style="border-radius:8px; padding:0 20px; font-weight:bold; border:none; cursor:pointer;" onclick="advanceAgent(1)">Next ▶</button>
        </div>`;
    } else {
        html += `<div class="user-msg" style="align-self:flex-end; background:var(--accent-dim); color:var(--accent); padding:10px 16px; border-radius:12px 12px 0 12px;">${agentState.name}</div>`;
    }

    // Step 1: Subject
    if (agentState.step >= 1 && !agentState.isPreset) {
        html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem; animation: fadeUp 0.3s ease;">
            <strong style="color:var(--text);">[SYSTEM]:</strong> Acknowledged. Which tactical division (Subject) does '${agentState.name}' belong to?
        </div>`;
        if (agentState.step === 1) {
            let subjOpts = (appData.settings?.subjects || []).map(s => `<option value="${s.name}">${s.name}</option>`).join('');
            html += `<div class="agent-input-row" style="display:flex; gap:10px; animation: slideInLeft 0.3s ease;">
                <select id="agent-subj-input" style="flex:1; padding:12px; background:var(--bg); color:var(--text); border:1px solid var(--border-accent); border-radius:8px; font-size:1rem; outline:none;">
                    ${subjOpts}
                </select>
                <button class="btn-primary" style="border-radius:8px; padding:0 20px; font-weight:bold; border:none; cursor:pointer;" onclick="advanceAgent(2)">Next ▶</button>
            </div>`;
        } else {
            html += `<div class="user-msg" style="align-self:flex-end; background:var(--accent-dim); color:var(--accent); padding:10px 16px; border-radius:12px 12px 0 12px; animation: fadeUp 0.3s ease;">${agentState.subj}</div>`;
        }
    }

    // Step 2: Blueprinting
    if (agentState.step >= 2 && !agentState.isPreset) {
        html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem; animation: fadeUp 0.3s ease;">
            <strong style="color:var(--text);">[SYSTEM]:</strong> Define the blueprint (One section per line).<br>
            <span style="font-size:0.75rem; color:var(--text-subtle); display:block; margin-top:4px;">💡 Tip: Add a colon and a number to set a default target (e.g., <b>Objective: 50</b>). If left blank, it initializes as TBD.</span>
        </div>`;
        if (agentState.step === 2) {
            html += `<div class="agent-input-row" style="display:flex; flex-direction:column; gap:10px; animation: slideInLeft 0.3s ease;">
                <textarea id="agent-bp-input" rows="4" style="width:100%; padding:12px; background:var(--bg); color:var(--accent); border:1px dashed var(--border-accent); border-radius:8px; font-size:0.9rem; outline:none; resize:vertical;" onkeydown="if(event.ctrlKey && event.key==='Enter') advanceAgent(3)">${agentState.blueprint}</textarea>
                <div style="display:flex; justify-content:flex-end;"><button class="btn-primary" style="border-radius:8px; padding:10px 20px; font-weight:bold; border:none; cursor:pointer;" onclick="advanceAgent(3)">Lock Blueprint ▶</button></div>
            </div>`;
        } else {
            html += `<div class="user-msg" style="align-self:flex-end; background:var(--accent-dim); color:var(--accent); padding:10px 16px; border-radius:12px 12px 0 12px; white-space:pre-wrap; animation: fadeUp 0.3s ease;">${agentState.blueprint}</div>`;
        }
    }

    // Step 3: Chapter Bulk Import
    if (agentState.step >= 3 && !agentState.isPreset) {
        html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem; animation: fadeUp 0.3s ease;">
            <strong style="color:var(--text);">[SYSTEM]:</strong> Blueprint locked. Paste the Table of Contents (one chapter per line) to bulk-generate the matrix.
        </div>`;
        if (agentState.step === 3) {
            html += `<div class="agent-input-row" style="display:flex; flex-direction:column; gap:10px; animation: slideInLeft 0.3s ease;">
                <textarea id="agent-chap-input" placeholder="Chapter 1\nChapter 2\n..." rows="7" style="width:100%; padding:12px; background:var(--bg); color:var(--text); border:1px solid var(--border-accent); border-radius:8px; font-size:0.9rem; outline:none; resize:vertical;"></textarea>
                <div style="display:flex; justify-content:flex-end;">
                    <button class="btn-primary" style="border-radius:8px; padding:14px 28px; font-size:1rem; font-weight:800; border:none; cursor:pointer; text-transform:uppercase; letter-spacing:1px;" onclick="deployAgentResource()">⚡ Compile & Deploy</button>
                </div>
            </div>`;
        }
    }

    // Step 4: Preset Deployment Ready
    if (agentState.step === 4 && agentState.isPreset) {
        html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem; animation: fadeUp 0.3s ease;">
            <strong style="color:var(--text);">[SYSTEM]:</strong> Blueprint '${agentState.presetKey}' acquired. Asset is configured and ready for matrix injection.
        </div>`;
        html += `<div class="agent-input-row" style="display:flex; justify-content:flex-end; animation: slideInLeft 0.3s ease;">
            <button class="btn-primary" style="border-radius:8px; padding:14px 28px; font-size:1rem; font-weight:800; border:none; cursor:pointer; text-transform:uppercase; letter-spacing:1px;" onclick="deployAgentResource()">⚡ Deploy Preset</button>
        </div>`;
    }

    html += `</div></div>`;
    con.innerHTML = html;

    setTimeout(() => {
        if (agentState.step === 0) document.getElementById('agent-name-input')?.focus();
        else if (agentState.step === 1) document.getElementById('agent-subj-input')?.focus();
        else if (agentState.step === 2) document.getElementById('agent-bp-input')?.focus();
        else if (agentState.step === 3) document.getElementById('agent-chap-input')?.focus();
        let chatArea = document.getElementById('agent-chat-area');
        if (chatArea) chatArea.scrollTop = chatArea.scrollHeight;
    }, 50);
};

window.applyAgentPreset = function () {
    let val = document.getElementById('agent-preset').value;
    if (!val) return;
    let parts = val.split('|');

    let targetSubjShort = parts[1];
    let shortMap = { 'physics': '🧲 PHYSICS', 'math': '🧮 MATHS', 'pc': '⚗️ PHYSICAL CHEM', 'ioc': '🧬 INORGANIC CHEM', 'oc': '🧪 ORGANIC (SKM)' };

    agentState.name = parts[0];
    agentState.subj = shortMap[targetSubjShort] || targetSubjShort;
    agentState.isPreset = true;
    agentState.presetKey = parts[0] + '.csv';
    agentState.step = 4; // Skip to deployment step
    renderAgentStep();
};

window.deployAgentResource = function () {
    let name = agentState.name;
    let subj = agentState.subj;
    let color = (appData.settings.subjects || []).find(s => s.name === subj)?.color || '#94a3b8';
    let file = _nameToFile(name);

    if (!appData.settings) appData.settings = {};
    if (!appData.settings.customResources) appData.settings.customResources = [];

    if (appData.settings.customResources.find(r => r.file === file) || DEFAULT_RESOURCE_FILES.has(file)) {
        let base = file.replace('.csv', ''), n = 2;
        while (appData.settings.customResources.find(r => r.file === base + '_' + n + '.csv')) n++;
        file = base + '_' + n + '.csv';
    }

    let rows = [];

    // Route A: Pre-existing Intel (Presets)
    if (agentState.isPreset && PRESET_DATA[agentState.presetKey]) {
        rows = JSON.parse(JSON.stringify(PRESET_DATA[agentState.presetKey]));
    }
    // Route B: Custom Bulk Blueprint Generation
    else {
        let chapVal = document.getElementById('agent-chap-input').value.trim();
        if (!chapVal) { alert("Provide at least one chapter to deploy."); return; }
        agentState.chapters = chapVal;

        let chapters = agentState.chapters.split('\n').map(c => c.trim()).filter(c => c.length > 0);
        let sectionsRaw = agentState.blueprint.split('\n').map(s => s.trim()).filter(s => s.length > 0);
        if (sectionsRaw.length === 0) sectionsRaw = ['Section A'];

        let sections = sectionsRaw.map(s => {
            let parts = s.split(':');
            return {
                name: parts[0].trim(),
                target: parts.length > 1 ? (parseInt(parts[1].trim()) || 0) : 0
            };
        });

        chapters.forEach(ch => {
            sections.forEach(secObj => {
                rows.push({ ch: ch, sec: secObj.name, d: 0, t: secObj.target, s: 0 });
            });
        });
    }

    appData.resources[file] = rows;
    appData.settings.customResources.push({ name, file, subj, color });

    applyResourceList(appData.settings);
    saveData();
    needsRebuild = true;
    initEditor();

    document.getElementById('editor-file').value = file;
    renderEditor();
};

window.advanceAgent = function (targetStep) {
    if (targetStep === 1) {
        let val = document.getElementById('agent-name-input').value.trim();
        if (!val) return;
        agentState.name = val;
    } else if (targetStep === 2) {
        let val = document.getElementById('agent-subj-input').value;
        if (!val) { alert("Add a Subject in the left panel first."); return; }
        agentState.subj = val;
    } else if (targetStep === 3) {
        let val = document.getElementById('agent-bp-input').value.trim();
        if (!val) return;
        agentState.blueprint = val;
    }
    agentState.step = targetStep;
    renderAgentStep();
};

// Hijack the main right pane for Subject Management
window.openManageSubjectsForm = function () {
    // Hide left-pane distractions
    document.getElementById('manage-subjects-form').style.display = 'none';
    let oldAddForm = document.getElementById('add-resource-form');
    if (oldAddForm) oldAddForm.style.display = 'none';

    // Clear the current resource view
    document.getElementById('editor-file').value = '';
    document.getElementById('editor-add-chapter-area').innerHTML = '';

    renderSubjectManager();
};

window.renderSubjectManager = function () {
    let con = document.getElementById('editor-content');
    let subjects = appData.settings?.subjects || [];

    let html = `<div style="background:var(--surface-light); border:1px solid var(--border-accent); border-radius:16px; padding:24px; box-shadow: 0 8px 32px rgba(245,166,35,0.08); animation: fadeUp var(--dur-md) var(--decel) both; min-height: 500px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; border-bottom:1px solid var(--border); padding-bottom:12px;">
            <div style="font-family:'Bricolage Grotesque',sans-serif; font-size:1.1rem; color:var(--accent); font-weight:800; text-transform:uppercase; letter-spacing:1.5px; display:flex; align-items:center; gap:8px;">
                <span style="font-size:1.3rem;">🏷️</span> Tactical Divisions (Subjects)
            </div>
            <button class="ed-del-btn" style="margin:0; padding:6px 14px;" onclick="renderEditor()">Close Terminal</button>
        </div>`;

    // Visual Grid of existing subjects
    if (subjects.length === 0) {
        html += `<div style="color:var(--text-muted); font-size:0.85rem; margin-bottom:24px;">No divisions established yet.</div>`;
    } else {
        html += `<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 12px; margin-bottom:28px;">`;
        subjects.forEach((sub, i) => {
            html += `<div style="background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:16px; display:flex; flex-direction:column; align-items:center; gap:12px; position:relative; transition: transform 0.2s var(--spring), box-shadow 0.2s;" onmouseenter="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(0,0,0,0.5)';" onmouseleave="this.style.transform=''; this.style.boxShadow='';">
                <button class="ed-del-btn" style="position:absolute; top:8px; right:4px; padding:4px 8px; margin:0;" onclick="editorDeleteSubject(${i})" title="Decommission Division">✕</button>
                <div style="width:36px; height:36px; border-radius:50%; background:${sub.color}; box-shadow:0 4px 16px color-mix(in srgb, ${sub.color} 50%, transparent);"></div>
                <div style="font-size:0.9rem; font-weight:800; text-align:center; font-family:'JetBrains Mono', monospace; word-break: break-word;">${sub.name}</div>
            </div>`;
        });
        html += `</div>`;
    }

    // Add New Division Interface
    html += `<div style="background:rgba(255,255,255,0.02); border:1px dashed var(--border); border-radius:12px; padding:18px;">
        <div style="font-size:0.75rem; color:var(--text-muted); font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Deploy New Division</div>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
            <input type="text" id="big-new-subj-name" placeholder="Division Name (e.g. 💻 CS)" style="flex:1; min-width:200px; padding:12px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-family:'JetBrains Mono', monospace; font-size:0.9rem; outline:none;">
            
            <div style="display:flex; align-items:center; gap:8px; background:var(--bg); padding:4px; border-radius:8px; border:1px solid var(--border);">
                <input type="color" id="big-new-subj-color" value="#38bdf8" style="width:38px; height:38px; padding:0; border:none; border-radius:6px; cursor:pointer; background:transparent;">
            </div>
            
            <button class="btn-primary" style="border-radius:8px; padding:0 24px; font-weight:800; text-transform:uppercase; letter-spacing:1px; border:none; cursor:pointer; height:48px;" onclick="bigEditorAddSubject()">Initialize ▶</button>
        </div>
    </div>`;

    html += `</div>`;
    con.innerHTML = html;
};

window.bigEditorAddSubject = function () {
    let name = document.getElementById('big-new-subj-name').value.trim();
    let color = document.getElementById('big-new-subj-color').value;
    if (!name) return alert("Commander, we need a division name to proceed.");

    if (!appData.settings.subjects) appData.settings.subjects = [];
    if (appData.settings.subjects.find(s => s.name.toLowerCase() === name.toLowerCase())) {
        return alert("This division is already deployed!");
    }

    appData.settings.subjects.push({ name, color });
    saveData();
    applySettings(appData.settings);
    renderSubjectManager(); // Instantly refresh the main stage
    populateSubjectDropdowns(); // Keep left-pane dropdowns synced
};

window.editorDeleteSubject = function (idx) {
    if (!confirm("Decommission this division? Resources assigned here will lose their color grouping unless re-assigned.")) return;

    appData.settings.subjects.splice(idx, 1);
    saveData();
    applySettings(appData.settings);
    renderSubjectManager(); // Instantly refresh the main stage
    populateSubjectDropdowns(); // Keep left-pane dropdowns synced
};

window.populateSubjectDropdowns = function () {
    let sel = document.getElementById('ares-subj');
    if (sel) {
        sel.innerHTML = '';
        let subjects = appData.settings?.subjects || [];
        subjects.forEach(sub => {
            sel.innerHTML += `<option value="${sub.name}">${sub.name}</option>`;
        });
    }
};

function renderEditorResourceList() {
    let el = document.getElementById('editor-resource-list');
    if (!el) return;
    let s = appData.settings || {};
    let removed = s.removedDefaults || [];
    let custom = s.customResources || [];
    let html = '';
    DEFAULT_RESOURCES.forEach(r => {
        let isRemoved = removed.includes(r.file);
        html += `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);">
            ${isRemoved
                ? `<button class="ed-add-btn" style="font-size:0.65rem;padding:3px 8px;" onclick="editorRestoreResource('${r.file}')">Restore</button>`
                : `<button class="ed-del-btn" style="font-size:0.65rem;padding:3px 8px;" onclick="editorRemoveDefault('${r.file.replace(/'/g, "\\'")}','${r.name.replace(/'/g, "\\'")}')">✕</button>`
            }
            <div style="width:8px;height:8px;border-radius:50%;background:${DEFAULT_RES_COLORS[r.file]};flex-shrink:0;"></div>
            <span style="flex:1;font-size:0.8rem;font-weight:600;${isRemoved ? 'opacity:0.4;text-decoration:line-through;' : ''}">${r.name}</span>
        </div>`;
    });
    custom.forEach(r => {
        html += `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);">
            <button class="ed-del-btn" style="font-size:0.65rem;padding:3px 8px;" onclick="editorDeleteResource('${r.file.replace(/'/g, "\\'")}','${r.name.replace(/'/g, "\\'")}')">✕</button>
            <div style="width:8px;height:8px;border-radius:50%;background:${r.color || '#94a3b8'};flex-shrink:0;"></div>
            <span style="flex:1;font-size:0.8rem;font-weight:600;">${r.name}</span>
        </div>`;
    });
    el.innerHTML = html || '<div style="font-size:0.78rem;color:var(--text-muted);">No resources.</div>';
}

function _nameToFile(name) {
    return name.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '')
        .replace(/[^\w\s()-]/g, '').trim()
        .replace(/\s+/g, ' ') + '.csv'; // Changed '_' to ' ' to preserve spaces
}

window.agentCompileResource = function () {
    let name = document.getElementById('ares-name').value.trim();
    let subj = document.getElementById('ares-subj').value;
    let blueprintStr = document.getElementById('ares-sections').value.trim();
    let chaptersStr = document.getElementById('ares-chapters').value.trim();
    let presetVal = document.getElementById('ares-preset').value;

    if (!name) { alert('Commander, we need an Asset Name to proceed.'); return; }
    if (!subj) { alert('Assign a Subject division first.'); return; }

    let color = (appData.settings.subjects || []).find(s => s.name === subj)?.color || '#94a3b8';
    let file = _nameToFile(name);

    if (!appData.settings) appData.settings = {};
    if (!appData.settings.customResources) appData.settings.customResources = [];
    if (appData.settings.customResources.find(r => r.file === file) || DEFAULT_RESOURCE_FILES.has(file)) {
        let base = file.replace('.csv', ''), n = 2;
        while (appData.settings.customResources.find(r => r.file === base + '_' + n + '.csv')) n++;
        file = base + '_' + n + '.csv';
    }

    let rows = [];
    let presetKey = presetVal ? presetVal.split('|')[0] + '.csv' : null;

    // Route A: Pre-existing Intel (Presets)
    if (presetKey && PRESET_DATA[presetKey]) {
        rows = JSON.parse(JSON.stringify(PRESET_DATA[presetKey]));
    }
    // Route B: Custom Bulk Blueprint Generation
    else {
        let chapters = chaptersStr.split('\n').map(c => c.trim()).filter(c => c.length > 0);
        let sections = blueprintStr.split(',').map(s => s.trim()).filter(s => s.length > 0);

        if (sections.length === 0) sections = ['Section A']; // Fallback

        if (chapters.length > 0) {
            chapters.forEach(ch => {
                sections.forEach(sec => {
                    // Initialize with target = 0 (TBD)
                    rows.push({ ch: ch, sec: sec, d: 0, t: 0, s: 0 });
                });
            });
        }
    }

    appData.resources[file] = rows;
    appData.settings.customResources.push({ name, file, subj, color });

    applyResourceList(appData.settings);
    saveData();
    needsRebuild = true;
    initEditor();

    document.getElementById('add-resource-form').style.display = 'none';
    document.getElementById('editor-file').value = file;
    renderEditor();

    // Mission Debrief
    if (rows.length > 0 && !presetVal) {
        let uniqueChaps = new Set(rows.map(r => r.ch)).size;
        alert(`Asset Compiled! Deployed ${uniqueChaps} chapters and ${rows.length} tracking sectors to the matrix. Target counts initialized as TBD.`);
    }
};

function editorRemoveDefault(file, name) {
    if (!confirm(`Hide "${name}" from the schedule and editor?\nNo data is deleted — you can restore it at any time.`)) return;
    if (!appData.settings) appData.settings = {};
    if (!appData.settings.removedDefaults) appData.settings.removedDefaults = [];
    if (!appData.settings.removedDefaults.includes(file)) appData.settings.removedDefaults.push(file);
    applyResourceList(appData.settings);
    saveData(); needsRebuild = true; initEditor();
    document.getElementById('editor-file').value = '';
    document.getElementById('editor-content').innerHTML = '';
    document.getElementById('editor-add-chapter-area').innerHTML = '';
}

function editorRestoreResource(file) {
    if (!appData.settings?.removedDefaults) return;
    appData.settings.removedDefaults = appData.settings.removedDefaults.filter(f => f !== file);
    applyResourceList(appData.settings);
    saveData(); needsRebuild = true; initEditor();
}

function editorDeleteResource(file, name) {
    if (!confirm(`Permanently delete custom resource "${name}"?\nAll its chapter/section data will be lost. This cannot be undone.`)) return;
    if (!appData.settings?.customResources) return;
    appData.settings.customResources = appData.settings.customResources.filter(r => r.file !== file);
    delete appData.resources[file];
    applyResourceList(appData.settings);
    saveData(); needsRebuild = true; initEditor();
    document.getElementById('editor-file').value = '';
    document.getElementById('editor-content').innerHTML = '';
    document.getElementById('editor-add-chapter-area').innerHTML = '';
}

function renderEditor() {
    let file = document.getElementById('editor-file').value;
    let con = document.getElementById('editor-content');
    let chapArea = document.getElementById('editor-add-chapter-area');
    con.innerHTML = ''; chapArea.innerHTML = '';
    if (!file) return;
    if (file === "Organic Chemistry.csv") {
        con.innerHTML = `
            <div style="margin-top:20px; background:rgba(245,166,35,0.05); border:1.5px solid rgba(245,166,35,0.3); border-radius:12px; padding:15px; text-align:center;">
                <div style="color:var(--accent); font-weight:800; font-family:'Bricolage Grotesque',sans-serif; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">🧪 OC Question Tracker</div>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:12px;">The manual text editor is disabled for Organic Chemistry to protect schedule sync. Please use the exact question tracker below to log your previous progress.</div>
                <button class="btn btn-primary" style="width:auto; padding:8px 20px;" onclick="openOCTracker()">Open Tracker</button>
            </div>
        `;
        chapArea.innerHTML = '';
        return;
    }
    let data = appData.resources[file] || [];
    let chaps = {};
    data.forEach(r => { if (!chaps[r.ch]) chaps[r.ch] = []; chaps[r.ch].push(r); });
    for (let c in chaps) {
        let safeC = encodeURIComponent(c);
        let html = `<div class="editor-group" id="edgrp_${safeC}">
            <div class="editor-header" onclick="this.parentElement.classList.toggle('open')">
                <button class="ed-del-btn" onclick="event.stopPropagation();editorDeleteChapter('${file}','${c.replace(/'/g, "\\'")}')">✕</button>
                <span style="flex:1;">${c}</span>
                <span style="font-size:0.7rem;color:var(--text-subtle);">▼</span>
            </div>
            <div class="editor-body">`;
        chaps[c].forEach(s => {
            html += `<div class="editor-input-row">
                <button class="ed-del-btn" onclick="editorDeleteSection('${file}','${c.replace(/'/g, "\\'")}','${s.sec.replace(/'/g, "\\'")}')">✕</button>
                <span style="flex:1;font-size:0.83rem;">${s.sec}</span>
                <div style="display:flex;flex-direction:column;align-items:center;font-size:0.6rem;color:var(--text-muted);">
                    Done<input type="number" id="ed_d_${file}_${c}_${s.sec}" value="${s.d}">
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;font-size:0.6rem;color:var(--text-muted);">
                    Total<input type="number" id="ed_t_${file}_${c}_${s.sec}" value="${s.t}">
                </div>
            </div>`;
        });
        html += `<div class="ed-add-row">
            <input type="text" placeholder="Section name…" id="ednewsec_${safeC}" style="flex:1;">
            <input type="number" placeholder="Total" id="ednewsect_${safeC}" min="0" value="0" style="width:58px;">
            <button class="ed-add-btn" onclick="editorAddSection('${file}','${c.replace(/'/g, "\\'")}')">+ Add</button>
        </div></div></div>`;
        con.innerHTML += html;
    }
    chapArea.innerHTML = `<div class="ed-add-chapter-wrap">
        <div style="font-size:0.7rem;font-family:'Bricolage Grotesque',sans-serif;color:var(--text-muted);text-transform:uppercase;letter-spacing:1.5px;font-weight:700;margin-bottom:8px;">+ New Chapter</div>
        <div class="ed-add-row">
            <input type="text" placeholder="Chapter name…" id="ednewchap_${file}" style="flex:1;font-weight:700;">
            <button class="ed-add-btn" onclick="editorAddChapter('${file}')">+ Add Chapter</button>
        </div>
    </div>`;

    if (file === "Organic Chemistry.csv") {
        chapArea.insertAdjacentHTML('beforeend', `
            <div style="margin-top:20px; background:rgba(245,166,35,0.05); border:1.5px solid rgba(245,166,35,0.3); border-radius:12px; padding:15px; text-align:center;">
                <div style="color:var(--accent); font-weight:800; font-family:'Bricolage Grotesque',sans-serif; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">🧪 OC Question Tracker</div>
                <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:12px;">Pre-mark specific JEE Advanced questions you've already completed so they aren't assigned.</div>
                <button class="btn btn-primary" style="width:auto; padding:8px 20px;" onclick="openOCTracker()">Open Tracker</button>
            </div>
        `);
    }
}

function editorDeleteSection(file, ch, sec) {
    let rows = appData.resources[file] || [];
    let chapsSections = rows.filter(r => r.ch === ch);

    if (chapsSections.length === 1) {
        if (!confirm(`WARNING: "${sec}" is the LAST section in "${ch}".\nDeleting this will wipe the entire chapter from the matrix.\nProceed?`)) return;
    } else {
        if (!confirm(`Delete section "${sec}" from "${ch}"?\nThis cannot be undone.`)) return;
    }

    appData.resources[file] = rows.filter(r => !(r.ch === ch && r.sec === sec));
    saveData(); needsRebuild = true; renderEditor();
}

function editorDeleteChapter(file, ch) {
    if (!confirm(`Delete entire chapter "${ch}" and all its sections?\nThis cannot be undone.`)) return;
    appData.resources[file] = (appData.resources[file] || []).filter(r => r.ch !== ch);
    saveData(); needsRebuild = true; renderEditor();
}

function editorAddSection(file, ch) {
    let safeC = encodeURIComponent(ch);
    let sec = (document.getElementById(`ednewsec_${safeC}`) || {}).value?.trim();
    let tot = parseInt((document.getElementById(`ednewsect_${safeC}`) || {}).value) || 0;
    if (!sec) { alert('Enter a section name.'); return; }
    let rows = appData.resources[file] || [];
    if (rows.find(r => r.ch === ch && r.sec === sec)) { alert('Section already exists.'); return; }
    rows.push({ ch, sec, d: 0, t: tot, s: 0 });
    appData.resources[file] = rows;
    saveData(); needsRebuild = true; renderEditor();
    let grp = document.getElementById(`edgrp_${encodeURIComponent(ch)}`);
    if (grp) grp.classList.add('open');
}

function editorAddChapter(file) {
    let ch = (document.getElementById(`ednewchap_${file}`) || {}).value?.trim();
    if (!ch) { alert('Enter a chapter name.'); return; }
    let rows = appData.resources[file] || [];
    if (rows.find(r => r.ch === ch)) { alert('Chapter already exists.'); return; }

    let initialSec = prompt(`Define the first section for [${ch}]:\n(e.g., Objective, Exercise 1)`, "Exercise 1");
    if (initialSec === null) return;
    if (initialSec.trim() === '') initialSec = 'Section A';

    rows.push({ ch, sec: initialSec.trim(), d: 0, t: 0, s: 0 });
    appData.resources[file] = rows;
    saveData(); needsRebuild = true; renderEditor();
    let grp = document.getElementById(`edgrp_${encodeURIComponent(ch)}`);
    if (grp) grp.classList.add('open');
}

function saveEditorData() {
    let file = document.getElementById('editor-file').value;
    if (!file) return;
    (appData.resources[file] || []).forEach(s => {
        let dIn = document.getElementById(`ed_d_${file}_${s.ch}_${s.sec}`);
        let tIn = document.getElementById(`ed_t_${file}_${s.ch}_${s.sec}`);
        if (dIn && tIn) {
            s.d = Math.max(0, parseInt(dIn.value) || 0);
            s.t = Math.max(0, parseInt(tIn.value) || 0);
            if (s.d > s.t) s.d = s.t;
        }
    });
    saveData(); needsRebuild = true;
    alert('Data saved! Schedule matrix will rebuild.');
    switchTab('schedule');
}

// ==========================================
// SETTINGS PANEL
// ==========================================
function _buildDragList(id, items) {
    let lis = items.map((item, i) => `
        <li class="drag-item" data-idx="${i}" data-list="${id}">
            <span class="drag-handle" title="Hold to reorder">⠿</span>
            <span class="drag-idx">${i + 1}</span>
            <span style="flex:1;">${item}</span>
        </li>`).join('');
    return `<ul class="drag-list" id="draglist_${id}">${lis}</ul>`;
}

// Returns ordered list of unique section names for a resource file (preserves data order).
function _getResourceSections(file) {
    let rows = appData.resources[file] || [];
    let seen = new Set(), out = [];
    rows.forEach(r => { if (!seen.has(r.sec)) { seen.add(r.sec); out.push(r.sec); } });
    return out;
}

// Build a collapsible priority group containing arbitrary inner HTML.
function _buildPriGroup(icon, title, hint, innerHtml, groupId, startOpen) {
    let oc = startOpen ? ' open' : '';
    return `<div class="pri-group${oc}" id="prigrp_${groupId}">
        <div class="pri-group-head" onclick="this.parentElement.classList.toggle('open')">
            <span class="pg-icon">${icon}</span>
            <span class="pg-title">${title}</span>
            <span class="pg-arrow">▾</span>
        </div>
        <div class="pri-group-body">
            ${hint ? `<div class="pri-group-hint">${hint}</div>` : ''}
            ${innerHtml}
        </div>
    </div>`;
}

// Build a collapsible sub-group (section priority nested inside chapter priority group).
function _buildSubGroup(title, innerHtml, groupId) {
    return `<div class="pri-sub-group" id="prisubgrp_${groupId}">
        <div class="pri-sub-group-head" onclick="this.parentElement.classList.toggle('open')">
            <span>§ ${title}</span>
            <span class="psg-arrow">▾</span>
        </div>
        <div class="pri-sub-group-body">
            <div class="pri-group-hint">Drag to reorder sections within each chapter of this resource.</div>
            ${innerHtml}
        </div>
    </div>`;
}

// Build section priority sub-group for a resource file.
// saved: already-saved section order (or null → use data order).
// label: optional resource name prefix shown in sub-group header.
function _buildSecPriSubGroup(file, listId, savedConfig) {
    const allSecs = _getResourceSections(file);
    if (!allSecs.length) return '';

    // ── Normalise savedConfig → { mode, passes } ──
    let mode = 'chapter-first', passes;
    if (!savedConfig) {
        passes = [allSecs.slice()];
    } else if (Array.isArray(savedConfig)) {
        // Legacy flat array → single chapter-first pass
        passes = [[...savedConfig.filter(s => allSecs.includes(s)),
        ...allSecs.filter(s => !savedConfig.includes(s))]];
    } else {
        mode = savedConfig.mode || 'chapter-first';
        passes = (savedConfig.passes || []).map(p => p.filter(s => allSecs.includes(s)))
            .filter(p => p.length > 0);
        if (!passes.length) passes = [allSecs.slice()];
        // Append new sections (added to resource after the setting was saved)
        const flat = new Set(passes.flat());
        const missing = allSecs.filter(s => !flat.has(s));
        if (missing.length) passes[passes.length - 1].push(...missing);
    }

    const wid = listId.replace(/[^a-zA-Z0-9]/g, '_');
    const bodyHtml = _renderSpPasses(wid, mode, passes);

    return `<div class="pri-sub-group" id="prisubgrp_${wid}">
        <div class="pri-sub-group-head" onclick="this.parentElement.classList.toggle('open')">
            <span>§ ${file.replace(".csv", "")} Passes</span>
            <span class="psg-arrow">▾</span>
        </div>
        <div class="pri-sub-group-body">
            <div id="spw_${wid}">${bodyHtml}</div>
        </div>
    </div>`;
}

// ── Render the inner HTML of a section-passes widget ─────────────────────────
function _renderSpPasses(wid, mode, passes) {
    const cfMode = (mode === 'chapter-first');
    const hint = cfMode
        ? 'Sections are sorted <strong>within each chapter</strong> by pass order. Chapters still follow their chapter-priority order.'
        : 'Each pass runs <strong>across ALL chapters</strong> before the next pass starts — e.g. put <em>Exercise 1</em> in Pass 1 to do it from every chapter first, then move to Pass 2.'
        ;

    const passesHtml = passes.map((secs, pi) => {
        const nPasses = passes.length;
        const items = secs.map(s => {
            const esc = s.replace(/\\/g, '&#92;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
            const movBtn = nPasses > 1
                ? `<button class="sp-move-btn" onclick="spMoveSec('${wid}',this,'${esc}')" title="Move to another pass">P${pi + 1} ▾</button>`
                : '';
            return `<div class="sp-drag-item" draggable="false" data-sec="${esc}" data-pass="${pi}">
                <span class="drag-handle" title="Drag to reorder">⠿</span>
                <span style="flex:1;">${s}</span>
                ${movBtn}
            </div>`;
        }).join('');
        const delBtn = nPasses > 1
            ? `<button class="sp-pass-del" onclick="spDeletePass('${wid}',${pi})">✕ Delete</button>`
            : '';
        return `<div class="sp-pass-block" data-pass-idx="${pi}">
            <div class="sp-pass-head">
                <span class="sp-pass-tag">Pass ${pi + 1}</span>${delBtn}
            </div>
            <div class="sp-pass-body" id="spb_${wid}_${pi}">${items || '<div class="sp-empty-hint">(empty — move sections here)</div>'}</div>
        </div>`;
    }).join('');

    return `
        <div class="sp-mode-toggle">
            <button class="sp-mode-btn ${cfMode ? 'active' : ''}" onclick="spSetMode('${wid}','chapter-first',this)">📚 Chapter-first</button>
            <button class="sp-mode-btn ${!cfMode ? 'active' : ''}" onclick="spSetMode('${wid}','section-first',this)">⚡ Section-first</button>
        </div>
        <div class="sp-mode-hint" id="sphint_${wid}">${hint}</div>
        <input type="hidden" id="spmode_${wid}" value="${mode}">
        <div class="sp-passes-wrap" id="sppasses_${wid}">${passesHtml}</div>
        <button class="sp-add-pass-btn" onclick="spAddPass('${wid}')">＋ Add Pass</button>
    `;
}

// Toggle chapter-first ↔ section-first and update hint text.
function spSetMode(wid, newMode, btn) {
    document.getElementById('spmode_' + wid).value = newMode;
    btn.closest('.sp-mode-toggle').querySelectorAll('.sp-mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cfMode = newMode === 'chapter-first';
    document.getElementById('sphint_' + wid).innerHTML = cfMode
        ? 'Sections are sorted <strong>within each chapter</strong> by pass order. Chapters still follow their chapter-priority order.'
        : 'Each pass runs <strong>across ALL chapters</strong> before the next pass starts — e.g. put <em>Exercise 1</em> in Pass 1 to do it from every chapter first, then move to Pass 2.';
}

// Add a new empty pass at the bottom.
function spAddPass(wid) {
    const wrap = document.getElementById('sppasses_' + wid);
    const pi = wrap.querySelectorAll('.sp-pass-block').length;
    const blk = document.createElement('div');
    blk.className = 'sp-pass-block';
    blk.dataset.passIdx = pi;
    blk.innerHTML = `
        <div class="sp-pass-head">
            <span class="sp-pass-tag">Pass ${pi + 1}</span>
            <button class="sp-pass-del" onclick="spDeletePass('${wid}',${pi})">✕ Delete</button>
        </div>
        <div class="sp-pass-body" id="spb_${wid}_${pi}"><div class="sp-empty-hint">(empty — move sections here)</div></div>`;
    wrap.appendChild(blk);
    _attachSpDrag(wrap, wid);
    _spRefreshMoveButtons(wid);
}

// Delete pass at index pi; its sections go to the first pass.
function spDeletePass(wid, pi) {
    const wrap = document.getElementById('sppasses_' + wid);
    const blocks = wrap.querySelectorAll('.sp-pass-block');
    if (blocks.length <= 1) return;
    const del = blocks[pi];
    const dest = blocks[pi === 0 ? 1 : 0].querySelector('.sp-pass-body');
    // Clear placeholder in destination if present
    const ph = dest.querySelector('.sp-empty-hint');
    del.querySelectorAll('.sp-drag-item').forEach(item => {
        if (ph) ph.remove();
        dest.appendChild(item);
    });
    del.remove();
    _spRenumber(wrap, wid);
    _attachSpDrag(wrap, wid);
}

// Renumber all pass blocks and refresh move-button labels.
function _spRenumber(wrap, wid) {
    wrap.querySelectorAll('.sp-pass-block').forEach((blk, i) => {
        blk.dataset.passIdx = i;
        const tag = blk.querySelector('.sp-pass-tag');
        if (tag) tag.textContent = 'Pass ' + (i + 1);
        const del = blk.querySelector('.sp-pass-del');
        if (del) del.setAttribute('onclick', `spDeletePass('${wid}',${i})`);
        blk.querySelectorAll('.sp-drag-item').forEach(item => { item.dataset.pass = String(i); });
    });
    _spRefreshMoveButtons(wid);
}

// Rebuild all "P# ▾" move buttons to reflect current pass count.
function _spRefreshMoveButtons(wid) {
    const wrap = document.getElementById('sppasses_' + wid);
    if (!wrap) return;
    const nPasses = wrap.querySelectorAll('.sp-pass-block').length;
    wrap.querySelectorAll('.sp-drag-item').forEach(item => {
        let btn = item.querySelector('.sp-move-btn');
        if (nPasses <= 1) { if (btn) btn.remove(); return; }
        const pi = parseInt(item.dataset.pass) || 0;
        const sec = item.dataset.sec;
        if (!btn) {
            btn = document.createElement('button');
            btn.className = 'sp-move-btn';
            item.appendChild(btn);
        }
        btn.title = 'Move to another pass';
        btn.setAttribute('onclick', `spMoveSec('${wid}',this,'${sec.replace(/'/g, "\'")}')`);
        btn.textContent = 'P' + (pi + 1) + ' ▾';
    });
}

// Show a floating picker to move a section to a different pass.
function spMoveSec(wid, btn, sec) {
    // Dismiss any open picker first
    document.querySelectorAll('.sp-move-picker').forEach(p => p.remove());

    const wrap = document.getElementById('sppasses_' + wid);
    const nPasses = wrap.querySelectorAll('.sp-pass-block').length;
    const item = btn.closest('.sp-drag-item');
    const curPass = parseInt(item.dataset.pass) || 0;

    const picker = document.createElement('div');
    picker.className = 'sp-move-picker';

    for (let i = 0; i < nPasses; i++) {
        if (i === curPass) continue;
        const opt = document.createElement('button');
        opt.className = 'sp-move-picker-opt';
        opt.textContent = '→ Pass ' + (i + 1);
        opt.onclick = e => {
            e.stopPropagation();
            picker.remove();
            const destBody = wrap.querySelectorAll('.sp-pass-body')[i];
            const ph = destBody.querySelector('.sp-empty-hint');
            if (ph) ph.remove();
            item.dataset.pass = String(i);
            destBody.appendChild(item);
            // Mark source pass empty if needed
            const srcBody = wrap.querySelectorAll('.sp-pass-body')[curPass];
            if (srcBody && !srcBody.querySelector('.sp-drag-item'))
                srcBody.innerHTML = '<div class="sp-empty-hint">(empty)</div>';
            _spRenumber(wrap, wid);
        };
        picker.appendChild(opt);
    }

    document.body.appendChild(picker);
    const rect = btn.getBoundingClientRect();
    picker.style.top = (rect.bottom + 4) + 'px';
    picker.style.left = Math.max(4, rect.right - picker.offsetWidth) + 'px';

    const dismiss = e => {
        if (!picker.contains(e.target)) { picker.remove(); document.removeEventListener('click', dismiss); }
    };
    setTimeout(() => document.addEventListener('click', dismiss), 10);
}

// Attach drag-to-reorder within each pass body (called after DOM changes).
function _attachSpDrag(passesWrap, wid) {
    passesWrap.querySelectorAll('.sp-pass-body').forEach(body => {
        let dragged = null;

        body.querySelectorAll('.drag-handle').forEach(handle => {
            handle.onmousedown = () => { handle.closest('.sp-drag-item').draggable = true; };
        });
        body.querySelectorAll('.sp-drag-item').forEach(item => {
            item.ondragstart = e => {
                if (!item.draggable) { e.preventDefault(); return; }
                dragged = item;
                setTimeout(() => item.classList.add('dragging'), 0);
            };
            item.ondragend = () => {
                item.draggable = false;
                item.classList.remove('dragging');
                body.querySelectorAll('.sp-drag-item').forEach(i => i.classList.remove('drag-over'));
                dragged = null;
            };
            item.ondragover = e => {
                e.preventDefault();
                if (!dragged || dragged === item) return;
                item.classList.add('drag-over');
                const mid = item.getBoundingClientRect().top + item.getBoundingClientRect().height / 2;
                body.insertBefore(dragged, e.clientY < mid ? item : item.nextSibling);
            };
            item.ondragleave = () => item.classList.remove('drag-over');
            item.ondrop = e => { e.preventDefault(); item.classList.remove('drag-over'); };
        });

        // Touch drag support
        body.querySelectorAll('.drag-handle').forEach(handle => {
            handle.addEventListener('touchstart', e => {
                dragged = handle.closest('.sp-drag-item');
                dragged.classList.add('dragging');
                e.stopPropagation();
                document.addEventListener('touchmove', onTouchMove, { passive: false });
                document.addEventListener('touchend', onTouchEnd);
            }, { passive: true });
        });

        function onTouchMove(e) {
            if (!dragged) return;
            e.preventDefault();
            const touch = e.touches[0];
            const el = document.elementFromPoint(touch.clientX, touch.clientY);
            const over = el && el.closest('.sp-drag-item');
            if (over && over !== dragged && over.closest('.sp-pass-body') === body) {
                body.querySelectorAll('.sp-drag-item').forEach(i => i.classList.remove('drag-over'));
                over.classList.add('drag-over');
                const mid = over.getBoundingClientRect().top + over.getBoundingClientRect().height / 2;
                body.insertBefore(dragged, touch.clientY < mid ? over : over.nextSibling);
            }
        }
        function onTouchEnd() {
            if (!dragged) return;
            dragged.draggable = false;
            dragged.classList.remove('dragging');
            body.querySelectorAll('.sp-drag-item').forEach(i => i.classList.remove('drag-over'));
            dragged = null;
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        }
    });
}

// Read section-pass config from a rendered widget in the DOM.
// Returns { mode: string, passes: [[sec,…],…] } or null if widget not found.
function _readSecPassConfig(wid) {
    const modeEl = document.getElementById('spmode_' + wid);
    const wrap = document.getElementById('sppasses_' + wid);
    if (!modeEl || !wrap) return null;
    const mode = modeEl.value || 'chapter-first';
    const passes = [];
    wrap.querySelectorAll('.sp-pass-block').forEach(blk => {
        const secs = [...blk.querySelectorAll('.sp-drag-item')].map(item => item.dataset.sec);
        if (secs.length) passes.push(secs);
    });
    return { mode, passes };
}

// Sort tasks according to a section-pass config.
// secConfig:
//   null / undefined  → no-op
//   flat array        → legacy chapter-first with that section order (single pass)
//   { mode, passes }  → full multi-pass config
//      mode = 'chapter-first': sort by (chapterPriority, passIdx, posInPass)
//      mode = 'section-first': sort by (passIdx, chapterPriority, posInPass)
//        — in section-first mode every chapter's sections in pass N are done
//          BEFORE any chapter starts pass N+1 (cross-chapter section grouping)
function _applySecPriority(tasks, secConfig) {
    if (!secConfig) return tasks;

    // Normalise to { mode, passes }
    let mode, passes;
    if (Array.isArray(secConfig)) {
        mode = 'chapter-first';
        passes = [secConfig];
    } else {
        mode = secConfig.mode || 'chapter-first';
        passes = Array.isArray(secConfig.passes) ? secConfig.passes : [];
    }

    // Drop empty passes; if nothing left, no-op
    passes = passes.filter(p => p && p.length > 0);
    if (!passes.length) return tasks;

    // Build lookup: section-name → { passIdx, posInPass }
    const secMap = {};
    passes.forEach((secs, pi) => secs.forEach((sec, si) => {
        if (!(sec in secMap)) secMap[sec] = { pi, si };
    }));

    return tasks.sort((a, b) => {
        const mA = secMap[a.section] || { pi: 9999, si: 9999 };
        const mB = secMap[b.section] || { pi: 9999, si: 9999 };
        const cA = a.priority !== undefined ? a.priority : 9999;
        const cB = b.priority !== undefined ? b.priority : 9999;

        a._mode = mode; a._pi = mA.pi;
        b._mode = mode; b._pi = mB.pi;

        if (mode === 'section-first') {
            // Primary: pass index (sections group across all chapters)
            if (mA.pi !== mB.pi) return mA.pi - mB.pi;
            // Secondary: chapter priority (within a pass, respect chapter order)
            if (cA !== cB) return cA - cB;
            // Tertiary: position within pass
            return mA.si - mB.si;
        } else {
            // Chapter-first (original behaviour preserved)
            if (cA !== cB) return cA - cB;
            if (mA.pi !== mB.pi) return mA.pi - mB.pi;
            return mA.si - mB.si;
        }
    });
}

function openSettings() {
    let s = appData.settings || {};
    let d = SETTINGS_DEFAULTS;
    let amoledOn = document.body.classList.contains('amoled');
    let cap = s.maxDailyCapacity ?? d.maxDailyCapacity;
    let autoOn = !!(s.autoTarget);
    let interleaveMath = !!(s.globalMathInterleave); // NEW
    let sp = s.sectionPriorities || {};

    let bestEff = getBestEff();
    let autoVal = computeAutoTarget();
    let autoDesc = bestEff < 50
        ? `Your best efficiency is below 50 — baseline of <strong>50 Qs/day</strong> will be used.`
        : `Based on your best day (${Math.round(bestEff)} eff), target = <strong>${autoVal} Qs/day</strong> (×1.1).`;

    // ── Build DYNAMIC resource priority sections ──
    let dynamicPriSections = '';
    RESOURCES_LIST.forEach(r => {
        let file = r.file;
        let chapters = [...new Set((appData.resources[file] || []).map(row => row.ch))];
        if (!chapters.length) return; // Skip empty resources

        // Read saved custom priority, fallback to legacy presets if needed, else current order
        let savedChap = (s.customPriorities || {})[file];
        if (!savedChap) {
            if (file === 'Neeraj Kumar JA.csv') savedChap = d.pcPriority;
            else if (file === 'IOC VK Jaiswal.csv') savedChap = d.iocPriority;
            else if (file.startsWith('Math')) savedChap = d.mathPriority;
            else savedChap = chapters;
        }

        // Merge saved array with actual data (adds new chapters to bottom, removes deleted ones)
        let mergedChap = [...savedChap.filter(c => chapters.includes(c)), ...chapters.filter(c => !savedChap.includes(c))];

        let listId = 'cust_' + file.replace(/[^a-zA-Z0-9]/g, '_');
        let secHtml = _buildSecPriSubGroup(file, 'sp_' + listId, sp[file] || null);

        // Attempt to extract the first emoji to use as an icon
        let emojiMatch = r.name.match(/^(\p{Emoji_Presentation}|\p{Extended_Pictographic})/u);
        let icon = emojiMatch ? emojiMatch[0] : '📚';
        let titleName = emojiMatch ? r.name.replace(icon, '').trim() : r.name;

        dynamicPriSections += _buildPriGroup(
            icon,
            titleName + ' — Priority',
            'Drag chapters to reorder. Expand section sub-group to set section order.',
            _buildDragList(listId, mergedChap) + secHtml,
            'custom_' + listId,
            false
        );
    });

    document.getElementById('settings-body').innerHTML = `
        <button class="sett-save-btn" onclick="saveSettings()">💾 Save Settings</button>
        <button class="btn btn-danger" style="width: 100%; margin-bottom: 20px;" onclick="window.logoutGoogle()">🚪 LOG OUT</button>

        ${_buildPriGroup('⚙️', 'General', null, `
            <div class="sett-row">
                <div>
                    <div class="sett-row-label">App Theme</div>
                    <div class="sett-row-desc">Customize UI colors and typography.</div>
                </div>
                <select id="sett-theme" style="width:145px; padding:6px 10px; margin:0; background:var(--surface); border:1px solid var(--border); border-radius:8px; color:var(--text); font-size:0.8rem;">
                    <option value="theme-default" ${s.theme === 'theme-default' ? 'selected' : ''}>Midnight (Default)</option>
                    <option value="theme-amoled" ${s.theme === 'theme-amoled' ? 'selected' : ''}>Pitch Black</option>
                    <option value="theme-cyber" ${s.theme === 'theme-cyber' ? 'selected' : ''}>Cyberpunk</option>
                    <option value="theme-crimson" ${s.theme === 'theme-crimson' ? 'selected' : ''}>Crimson Matrix</option>
                    <option value="theme-sakura" ${s.theme === 'theme-sakura' ? 'selected' : ''}>Sakura Light</option>
                </select>
            </div>
            <div class="sett-row" style="margin-top:10px;">
                <div>
                    <div class="sett-row-label">Campaign End Date</div>
                    <div class="sett-row-desc">The last day of your campaign. TOTAL_DAYS is recalculated automatically.</div>
                </div>
                <input type="date" id="sett-end-date" value="${(() => { let ed = s.campaignEndDate; if (!ed) { let e = new Date(START_DATE.getTime() + (TOTAL_DAYS - 1) * 86400000); ed = e.toISOString().slice(0, 10); } return ed; })()}" style="background:var(--surface-light);border:1px solid var(--border-hi);border-radius:8px;color:var(--text);padding:6px 10px;font-size:0.82rem;cursor:pointer;flex-shrink:0;">
            </div>
            <div class="sett-row" style="margin-top:10px;">
                <div>
                    <div class="sett-row-label">Global Math Interleaving</div>
                    <div class="sett-row-desc">Merge all active Math books and interleave their chapters globally.</div>
                </div>
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;flex-shrink:0;">
                    <input type="checkbox" id="sett-interleave-math" ${interleaveMath ? 'checked' : ''} style="width:18px;height:18px;accent-color:var(--accent);cursor:pointer;">
                </label>
            </div>
        `, 'general', true)}

        ${_buildPriGroup('⚡', 'Daily Target', null, `
            <div class="autotarget-toggle-wrap ${autoOn ? 'on' : ''}" onclick="toggleAutoTarget()">
                <div>
                    <div class="at-label ${autoOn ? 'on' : ''}">⚡ AutoTarget Mode</div>
                    <div class="at-desc">${autoDesc}</div>
                </div>
                <label class="at-switch" onclick="event.stopPropagation()">
                    <input type="checkbox" id="sett-autotarget" ${autoOn ? 'checked' : ''} onchange="toggleAutoTarget()">
                    <span class="at-slider"></span>
                </label>
            </div>
            <div class="sett-row" id="sett-cap-row" style="${autoOn ? 'opacity:0.38;pointer-events:none;' : ''}">
                <div>
                    <div class="sett-row-label">Max Daily Capacity</div>
                    <div class="sett-row-desc">Manual cap — disabled when AutoTarget is on.</div>
                </div>
                <input type="number" id="sett-cap" value="${cap}" min="10" max="500" step="5" ${autoOn ? 'disabled' : ''}>
            </div>
        `, 'target', true)}

        ${dynamicPriSections}

        ${_buildPriGroup('🚫', 'Never Skip — Assign All Questions',
        'Selected items always get 100% of remaining questions regardless of porosity. OC is unaffected.',
        _buildNoSkipSection(s),
        'noskip', false)}
    `;

    document.querySelectorAll('.drag-list').forEach(list => _attachDragList(list));
    document.getElementById('settings-overlay').classList.add('open');
}

// Build the "Never Skip" settings section with global sec/chap checkboxes + local tree.
function _buildNoSkipSection(s) {
    let gSecs = s.noSkipGlobalSections || [];
    let gChaps = s.noSkipGlobalChapters || [];
    let local = s.noSkipLocalSections || [];
    let localSet = new Set(local.map(x => x.file + '|' + x.chapter + '|' + x.section));

    // Gather unique section + chapter names across all non-OC resources
    let allSecs = new Set(), allChaps = new Set();
    for (let file in appData.resources) {
        if (file === 'Organic Chemistry.csv') continue;
        (appData.resources[file] || []).forEach(r => { allSecs.add(r.sec); allChaps.add(r.ch); });
    }

    function chkList(items, savedSet, pfx) {
        if (!items.size) return '<div style="color:var(--text-subtle);font-size:0.75rem;">No data loaded yet.</div>';
        return [...items].sort().map(v => {
            let id = pfx + '_' + v.replace(/[^a-zA-Z0-9]/g, '_');
            let chk = savedSet.includes(v) ? ' checked' : '';
            return `<label style="display:flex;align-items:center;gap:8px;padding:4px 0;cursor:pointer;font-size:0.8rem;">`
                + `<input type="checkbox" class="${pfx}_chk" value="${v}"${chk} style="accent-color:var(--accent);width:15px;height:15px;flex-shrink:0;">`
                + `<span style="color:var(--text);">${v}</span></label>`;
        }).join('');
    }

    // Local section tree: resource → chapter → section checkboxes
    let treeHtml = '';
    RESOURCES_LIST.filter(r => r.file !== 'Organic Chemistry.csv').forEach(r => {
        let rows = appData.resources[r.file] || [];
        if (!rows.length) return;
        let byChap = {};
        rows.forEach(row => { if (!byChap[row.ch]) byChap[row.ch] = []; byChap[row.ch].push(row.sec); });
        let chapHtml = Object.entries(byChap).map(([ch, secs]) => {
            let secHtml = secs.map(sec => {
                let key = r.file + '|' + ch + '|' + sec;
                let chk = localSet.has(key) ? ' checked' : '';
                let eid = 'lcl_' + key.replace(/[^a-zA-Z0-9]/g, '_');
                return `<label style="display:flex;align-items:center;gap:7px;padding:3px 0 3px 18px;cursor:pointer;font-size:0.75rem;">`
                    + `<input type="checkbox" class="noskip_local_chk" data-file="${r.file}" data-chapter="${ch}" data-section="${sec}"${chk} style="accent-color:var(--accent);width:13px;height:13px;flex-shrink:0;">`
                    + `<span style="color:var(--text-muted);">${sec}</span></label>`;
            }).join('');
            return `<div style="margin:4px 0 0;">`
                + `<div style="font-size:0.72rem;font-weight:700;color:var(--text);padding:3px 0 1px;">${ch}</div>`
                + secHtml + '</div>';
        }).join('');
        let fid = 'tree_' + r.file.replace(/[^a-zA-Z0-9]/g, '_');
        treeHtml += `<div class="pri-sub-group" style="margin-top:6px;" id="prisubgrp_${fid}">`
            + `<div class="pri-sub-group-head" onclick="this.parentElement.classList.toggle('open')">`
            + `<span>📂 ${r.name}</span><span class="psg-arrow">▾</span></div>`
            + `<div class="pri-sub-group-body">${chapHtml}</div></div>`;
    });

    return `
        <div style="margin-bottom:8px;">
            <div class="pri-group-hint" style="margin-bottom:4px;"><strong>Global Sections</strong> — apply to every resource where the section name appears.</div>
            <div id="noskip_gsec_wrap" style="max-height:160px;overflow-y:auto;padding:4px 0;">
            ${chkList(allSecs, gSecs, 'noskip_gsec')}
            </div>
        </div>
        <div style="margin-bottom:8px;">
            <div class="pri-group-hint" style="margin-bottom:4px;"><strong>Global Chapters</strong> — apply to every resource where the chapter name appears.</div>
            <div id="noskip_gchap_wrap" style="max-height:160px;overflow-y:auto;padding:4px 0;">
            ${chkList(allChaps, gChaps, 'noskip_gchap')}
            </div>
        </div>
        <div>
            <div class="pri-group-hint" style="margin-bottom:4px;"><strong>Local Sections</strong> — pick specific (Resource → Chapter → Section) triples.</div>
            ${treeHtml || '<div style="color:var(--text-subtle);font-size:0.75rem;">No data loaded.</div>'}
        </div>`;
}

// Read checked checkbox values from a container by class name.
function _readNoSkipChecks(cls) {
    return [...document.querySelectorAll('.' + cls + '_chk:checked')].map(el => el.value);
}

// Read local section triples from checked local checkboxes.
function _readNoSkipLocalSections() {
    return [...document.querySelectorAll('.noskip_local_chk:checked')].map(el => ({
        file: el.dataset.file,
        chapter: el.dataset.chapter,
        section: el.dataset.section
    }));
}

// Mark tasks matching never-skip settings as force_all.
// Skips Organic Chemistry entirely (its scheduling is managed separately).
function _applyNeverSkip(allQueues, s) {
    if (!s) return;
    let gSecs = s.noSkipGlobalSections || [];
    let gChaps = s.noSkipGlobalChapters || [];
    let local = s.noSkipLocalSections || [];
    let localSet = new Set(local.map(x => x.file + '|' + x.chapter + '|' + x.section));
    if (!gSecs.length && !gChaps.length && !localSet.size) return;
    for (let subj in allQueues) {
        for (let t of allQueues[subj]) {
            if (t.filename === 'Organic Chemistry.csv') continue;
            if (gSecs.includes(t.section) ||
                gChaps.includes(t.chapter) ||
                localSet.has(t.filename + '|' + t.chapter + '|' + t.section)) {
                t.force_all = true;
                t.target_qs = t.rem_raw;
                t.qs = t.rem_raw;
            }
        }
    }
}

function closeSettings() {
    document.getElementById('settings-overlay').classList.remove('open');
}

function _attachDragList(listEl) {
    let dragged = null;

    // Mouse (desktop): enable draggable only when handle is held
    listEl.querySelectorAll('.drag-handle').forEach(handle => {
        handle.addEventListener('mousedown', () => {
            handle.closest('.drag-item').draggable = true;
        });
    });

    listEl.querySelectorAll('.drag-item').forEach(item => {
        item.addEventListener('dragstart', e => {
            if (!item.draggable) { e.preventDefault(); return; }
            dragged = item;
            setTimeout(() => item.classList.add('dragging'), 0);
        });
        item.addEventListener('dragend', () => {
            item.draggable = false;
            item.classList.remove('dragging');
            listEl.querySelectorAll('.drag-item').forEach(i => i.classList.remove('drag-over'));
            _renumber(listEl);
            dragged = null;
        });
        item.addEventListener('dragover', e => {
            e.preventDefault();
            if (!dragged || dragged === item) return;
            item.classList.add('drag-over');
            let mid = item.getBoundingClientRect().top + item.getBoundingClientRect().height / 2;
            listEl.insertBefore(dragged, e.clientY < mid ? item : item.nextSibling);
        });
        item.addEventListener('dragleave', () => item.classList.remove('drag-over'));
        item.addEventListener('drop', e => { e.preventDefault(); item.classList.remove('drag-over'); });
    });

    // Touch (mobile): drag only initiated from the handle
    function onTouchMove(e) {
        if (!dragged) return;
        e.preventDefault();
        let touch = e.touches[0];
        let target = document.elementFromPoint(touch.clientX, touch.clientY);
        let over = target && target.closest('.drag-item');
        if (over && over !== dragged && over.closest('.drag-list') === listEl) {
            listEl.querySelectorAll('.drag-item').forEach(i => i.classList.remove('drag-over'));
            over.classList.add('drag-over');
            let mid = over.getBoundingClientRect().top + over.getBoundingClientRect().height / 2;
            listEl.insertBefore(dragged, touch.clientY < mid ? over : over.nextSibling);
        }
    }

    function onTouchEnd() {
        if (!dragged) return;
        dragged.draggable = false;
        dragged.classList.remove('dragging');
        listEl.querySelectorAll('.drag-item').forEach(i => i.classList.remove('drag-over'));
        _renumber(listEl);
        dragged = null;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    }

    listEl.querySelectorAll('.drag-handle').forEach(handle => {
        handle.addEventListener('touchstart', e => {
            dragged = handle.closest('.drag-item');
            dragged.classList.add('dragging');
            document.addEventListener('touchmove', onTouchMove, { passive: false });
            document.addEventListener('touchend', onTouchEnd);
            e.stopPropagation();
        }, { passive: true });
    });
}

function _renumber(listEl) {
    listEl.querySelectorAll('.drag-item').forEach((i, idx) => {
        i.dataset.idx = idx;
        i.querySelector('.drag-idx').textContent = idx + 1;
    });
}

function _readDragList(id) {
    let list = document.getElementById(`draglist_${id}`);
    if (!list) return null;
    return [...list.querySelectorAll('.drag-item')].map(i => i.querySelector('span:last-child').textContent.trim());
}

function toggleAutoTarget() {
    let cb = document.getElementById('sett-autotarget');
    let on = cb.checked;
    let row = document.getElementById('sett-cap-row');
    let cap = document.getElementById('sett-cap');
    let wrap = cb.closest('.autotarget-toggle-wrap');
    wrap.classList.toggle('on', on);
    wrap.querySelector('.at-label').classList.toggle('on', on);
    row.style.opacity = on ? '0.38' : '1';
    row.style.pointerEvents = on ? 'none' : '';
    cap.disabled = on;
    let bestEff = getBestEff(), autoVal = computeAutoTarget();
    let desc = bestEff < 50
        ? `Your best efficiency is below 50 — baseline of <strong>50 Qs/day</strong> will be used.`
        : `Based on your best day (${Math.round(bestEff)} eff), target = <strong>${autoVal} Qs/day</strong> (×1.1).`;
    wrap.querySelector('.at-desc').innerHTML = desc;

    if (on && !(appData.settings?.autoTargetSeenTutorial)) {
        let existing = document.getElementById('at-tutorial');
        if (!existing) {
            let tut = document.createElement('div');
            tut.id = 'at-tutorial';
            tut.style.cssText = 'background:linear-gradient(135deg,rgba(168,139,250,0.14),rgba(99,102,241,0.09));border:1.5px solid rgba(168,139,250,0.4);border-radius:14px;padding:14px 16px;margin-top:10px;animation:fadeUp 0.3s var(--decel) both;';
            tut.innerHTML = `
                <div style="font-family:'Bricolage Grotesque',sans-serif;font-size:0.72rem;font-weight:800;color:#a78bfa;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px;">⚡ How AutoTarget works</div>
                <div style="font-size:0.78rem;color:var(--text-muted);line-height:1.6;">
                    <b style="color:var(--text);">bestEff</b> = your best day's questions ÷ that day's weight.<br>
                    AutoTarget sets your daily cap to <b style="color:var(--text);">1.1 × bestEff</b> — 10% above your personal best — or 50 if you haven't logged enough yet.<br><br>
                    When you complete every assigned task, a <b style="color:#a78bfa;">⚡ I want more…</b> button appears. Tap it to optionally push beyond the target.<br><br>
                    Any extra you choose applies <b style="color:var(--text);">today only</b>. Tomorrow AutoTarget recalculates fresh from your new bestEff.
                </div>
                <button onclick="document.getElementById('at-tutorial').remove()" style="margin-top:10px;padding:5px 14px;background:rgba(168,139,250,0.15);border:1px solid rgba(168,139,250,0.3);border-radius:100px;color:#a78bfa;font-size:0.72rem;font-weight:700;cursor:pointer;">Got it ✓</button>`;
            wrap.insertAdjacentElement('afterend', tut);
            if (!appData.settings) appData.settings = {};
            appData.settings.autoTargetSeenTutorial = true;
        }
    }
}

function saveSettings() {
    if (!appData.settings) appData.settings = {};
    let s = appData.settings;

    s.theme = document.getElementById('sett-theme').value;
    s.globalMathInterleave = document.getElementById('sett-interleave-math')?.checked ?? false;

    let endDateVal = document.getElementById('sett-end-date')?.value;
    if (endDateVal) {
        s.campaignEndDate = endDateVal;
        let endMs = new Date(endDateVal + 'T00:00:00Z').getTime();
        let newDays = Math.round((endMs - START_DATE.getTime()) / 86400000) + 1;
        if (newDays >= 1) TOTAL_DAYS = newDays;
    }

    s.autoTarget = document.getElementById('sett-autotarget')?.checked ?? false;
    s.maxDailyCapacity = s.autoTarget
        ? computeAutoTarget()
        : Math.max(10, parseInt(document.getElementById('sett-cap').value) || 150);

    s.noSkipGlobalSections = _readNoSkipChecks('noskip_gsec');
    s.noSkipGlobalChapters = _readNoSkipChecks('noskip_gchap');
    s.noSkipLocalSections = _readNoSkipLocalSections();

    if (!s.customPriorities) s.customPriorities = {};
    if (!s.sectionPriorities) s.sectionPriorities = {};

    // Dynamically pull all lists from the DOM based on active resources
    RESOURCES_LIST.forEach(r => {
        let file = r.file;
        let listId = 'cust_' + file.replace(/[^a-zA-Z0-9]/g, '_');

        let chapResult = _readDragList(listId);
        if (chapResult) s.customPriorities[file] = chapResult;

        let secListId = 'sp_' + listId;
        let wid = secListId.replace(/[^a-zA-Z0-9]/g, '_');
        let cfg = _readSecPassConfig(wid);
        if (cfg) s.sectionPriorities[file] = cfg;
    });

    applySettings(s);
    saveData();
    needsRebuild = true;
    closeSettings();
    renderDay();
}

// ==========================================
// DESKTOP HELPERS
// ==========================================
function renderDayStrip() {
    let strip = document.getElementById('header-day-strip');
    if (!strip || window.innerWidth < 820) return;

    let dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    let start = Math.max(0, viewingDayIdx - 4);
    let end = Math.min(TOTAL_DAYS - 1, start + 8);
    if (end - start < 8) start = Math.max(0, end - 8);

    let html = '';
    for (let d = start; d <= end; d++) {
        let date = new Date(START_DATE.getTime() + d * 86400000);
        let dayName = dayNames[date.getDay()];
        let dayNum = date.getDate();
        let isViewing = d === viewingDayIdx;
        let isToday = d === currentActualDayIdx;
        let w = getDayWeight(d);
        let comps = getCompletionsForDay(d);
        let hasDone = comps.length > 0;

        let dotColor = w === 0.0 ? 'var(--danger)' : (hasDone ? 'var(--success-bright)' : 'var(--border)');
        let bg = isViewing
            ? `background:var(--accent); color:#000; border-color:var(--accent);`
            : isToday
                ? `background:var(--accent-dim); border-color:var(--border-accent); color:var(--accent);`
                : `background:transparent; border-color:var(--border); color:var(--text-subtle);`;

        html += `<button onclick="viewingDayIdx=${d}; renderDay();" style="
            flex:0 0 auto; min-width:40px; padding:5px 5px 4px;
            border:1px solid; border-radius:8px; cursor:pointer;
            text-align:center; transition:all 0.14s var(--ease); ${bg}
        ">
            <div style="font-size:0.5rem; text-transform:uppercase; letter-spacing:0.4px; font-weight:700; margin-bottom:1px;">${dayName}</div>
            <div style="font-size:0.88rem; font-weight:700; font-family:'JetBrains Mono','Noto Color Emoji',monospace; line-height:1.2;">${dayNum}</div>
            <div style="width:4px; height:4px; border-radius:50%; background:${dotColor}; margin:3px auto 0;"></div>
        </button>`;
    }

    html = `<button onclick="changeDay(-1)" style="flex:0 0 auto; padding:4px 7px; background:transparent; border:1px solid var(--border); border-radius:5px; cursor:pointer; color:var(--text-muted); font-size:0.75rem; align-self:center;">◄</button>`
        + html
        + `<button onclick="changeDay(1)" style="flex:0 0 auto; padding:4px 7px; background:transparent; border:1px solid var(--border); border-radius:5px; cursor:pointer; color:var(--text-muted); font-size:0.75rem; align-self:center;">►</button>`
        + `<button onclick="goToToday()" title="Jump to today" style="flex:0 0 auto; padding:4px 10px; background:var(--accent-dim); border:1px solid var(--border-accent); border-radius:5px; cursor:pointer; color:var(--accent); font-size:0.72rem; font-weight:700; align-self:center; font-family:'Bricolage Grotesque',sans-serif; letter-spacing:0.5px; margin-left:4px;">◉ Today</button>`;
    strip.innerHTML = html;

    // Slide the strip chips on navigation
    if (_dayNavDir !== 0) {
        strip.querySelectorAll('button:not(:first-child):not(:last-child):not(:nth-last-child(2))').forEach((btn, i) => {
            btn.style.animation = 'none';
            btn.offsetHeight;
            let anim = _dayNavDir < 0 ? 'slideInRight' : 'slideInLeft';
            btn.style.animation = `${anim} ${150 + i * 18}ms var(--decel) both`;
        });
    }
}

function renderRightPanel() {
    let panel = document.getElementById('drp-content');
    if (!panel) return;

    // ── Today's completion ──
    let comps = getCompletionsForDay(currentActualDayIdx);
    let todayDone = comps.reduce((s, c) => s + c.done, 0);
    let todayAssigned = todayDone;
    if (masterSchedules && Object.keys(masterSchedules).length > 0) {
        let loggedKeys = new Set(comps.map(c => `${c.chapter}|${c.section.trim()}`));
        for (let subj in masterSchedules) {
            (masterSchedules[subj][currentActualDayIdx] || [])
                .filter(t => !loggedKeys.has(`${t.chapter}|${t.section.trim()}`))
                .forEach(t => todayAssigned += t.qs);
        }
    }
    let mStats = getMissionStatsForDay(currentActualDayIdx);
    todayDone += mStats.done;
    todayAssigned += Math.max(mStats.target, mStats.done);
    let todayPct = todayAssigned > 0 ? Math.round((todayDone / todayAssigned) * 100) : 100;

    // ── Campaign-wide progress ──
    let campDone = 0, campSkipped = 0, campTotal = 0;
    RESOURCES_LIST.forEach(r => {
        if (r.file === 'Organic Chemistry.csv') {
            let oc = _ocTrackerData();
            campDone += oc.gD; campTotal += oc.gT;
        } else {
            let rows = appData.resources[r.file] || [];
            rows.forEach(x => { campDone += x.d; campSkipped += (x.s || 0); campTotal += x.t; });
        }
    });
    let campPct = campTotal > 0 ? Math.round(((campDone + campSkipped) / campTotal) * 100) : 0;
    let campDonePct = campTotal > 0 ? (campDone / campTotal) * 100 : 0;
    let campSkipPct = campTotal > 0 ? (campSkipped / campTotal) * 100 : 0;

    let strk = getStreak(currentActualDayIdx);
    let daysLeft = TOTAL_DAYS - currentActualDayIdx;

    // ── Per-resource health ──
    let resCards = [];
    let totalEffRem = 0;  // campaign-wide remaining after porosity
    RESOURCES_LIST.forEach(r => {
        let rows = appData.resources[r.file] || [];
        let d, t, effRem;
        if (r.file === 'Organic Chemistry.csv' && typeof OC_ASSIGNMENTS !== 'undefined') {
            t = 0; d = 0;
            for (let ch in OC_ASSIGNMENTS) {
                for (let sec in OC_ASSIGNMENTS[ch]) {
                    let assigned = OC_ASSIGNMENTS[ch][sec];
                    if (!Array.isArray(assigned)) continue;
                    t += assigned.length;
                    let ticked = (appData.ocCompleted && appData.ocCompleted[`${ch}|${sec}`]) || [];
                    d += ticked.filter(q => assigned.includes(q)).length;
                }
            }
            effRem = t - d;
            t = d + effRem;
        } else {
            d = rows.reduce((s, x) => s + x.d, 0);
            // Sum t.qs from all future scheduled days — this IS the porosity-adjusted assigned count
            effRem = 0;
            if (masterSchedules) {
                for (let subj in masterSchedules) {
                    for (let dayIdx in masterSchedules[subj]) {
                        if (parseInt(dayIdx) < currentActualDayIdx) continue;
                        for (let task of (masterSchedules[subj][dayIdx] || [])) {
                            if (task.filename === r.file) effRem += task.qs || 0;
                        }
                    }
                }
            }
            if (effRem === 0) {
                // fallback: no schedule yet, use raw remaining
                effRem = rows.reduce((s, x) => s + Math.max(0, x.t - x.d - (x.s || 0)), 0);
            }
            t = d + effRem;
        }
        totalEffRem += effRem;
        let p = t > 0 ? d / t : (d > 0 ? 1 : 0);
        let pct = Math.round(p * 100);
        let rc = RES_COLORS[r.file] || 'var(--accent)';
        let parts = r.name.split(' ');
        let emoji = parts[0];
        let label = parts.slice(1).join(' ');
        
        // Wavy Circular SVG calculations
        const R = 26, C = 34, STROKE = 5;
        const waves = 12, amp = 2.5; 
        
        let pathD = "";
        let pts = 120;
        let len = 0, px, py;
        
        for(let i = 0; i <= pts; i++) {
            let th = (i / pts) * 2 * Math.PI;
            let cr = R + amp * Math.sin(waves * th);
            let x = C + cr * Math.cos(th);
            let y = C + cr * Math.sin(th);
            if (i === 0) pathD += `M ${x.toFixed(2)} ${y.toFixed(2)} `;
            else pathD += `L ${x.toFixed(2)} ${y.toFixed(2)} `;
            if (px !== undefined) len += Math.hypot(x - px, y - py);
            px = x; py = y;
        }
        pathD += "Z";
        
        const dash = (p * len).toFixed(2);
        const gap = (len - p * len).toFixed(2);

        // glow color based on pct
        let glowCol = pct >= 75 ? '#34d399' : pct >= 40 ? '#fbbf24' : '#f87171';
        resCards.push(`
        <div style="display:flex;flex-direction:column;align-items:center;gap:5px;padding:10px 4px 8px;
            background:color-mix(in srgb,${rc} 7%,var(--surface-light));
            border:1px solid color-mix(in srgb,${rc} 28%,transparent);
            border-radius:16px;transition:transform 0.18s var(--spring),box-shadow 0.18s;cursor:default;"
            onmouseenter="this.style.transform='translateY(-2px) scale(1.03)';this.style.boxShadow='0 6px 20px color-mix(in srgb,${rc} 20%,transparent)'"
            onmouseleave="this.style.transform='';this.style.boxShadow=''">
            <svg width="${C * 2}" height="${C * 2}" viewBox="0 0 ${C * 2} ${C * 2}" style="overflow:visible;display:block;">
                <path d="${pathD}" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="${STROKE}" stroke-linejoin="round"/>
                <path d="${pathD}" fill="none"
                    stroke="${rc}" stroke-width="${STROKE}"
                    stroke-linecap="round" stroke-linejoin="round"
                    stroke-dasharray="${dash} ${gap}"
                    transform="rotate(-90 ${C} ${C})"
                    style="filter:drop-shadow(0 0 3px ${rc});transition:stroke-dasharray 0.7s var(--spring-soft)"/>
                <text x="${C}" y="${C}" text-anchor="middle" dominant-baseline="central"
                    fill="var(--text)" font-family="'JetBrains Mono',monospace" font-size="9" font-weight="700">${pct}%</text>
            </svg>
            <div style="font-size:1.1rem;line-height:1;">${emoji}</div>
            <div style="font-size:0.58rem;font-weight:700;font-family:'Bricolage Grotesque',sans-serif;text-transform:uppercase;letter-spacing:0.4px;color:var(--text-muted);text-align:center;line-height:1.25;max-width:62px;">${label}</div>
            <div style="font-size:0.55rem;color:color-mix(in srgb,${rc} 80%,transparent);font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${d}/${t}</div>
        </div>`);
    });
    let resHtml = `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:7px;">${resCards.join('')}</div>`;
    let idealDaily = daysLeft > 0 ? Math.ceil(totalEffRem / daysLeft) : 0;

    // ── Recent activity ──
    let allComps = [];
    for (let ds in appData.completions) appData.completions[ds].forEach(c => allComps.push({ ...c, date: ds }));
    allComps.sort((a, b) => b.date.localeCompare(a.date));
    let recentHtml = allComps.slice(0, 7).map(c => `
        <div style="padding:6px 0; border-bottom:1px solid var(--border);">
            <div style="display:flex; justify-content:space-between;">
                <span style="font-size:0.65rem; color:var(--text-muted); font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${c.date}</span>
                <span style="font-size:0.68rem; color:var(--accent); font-weight:700;">${c.done}q</span>
            </div>
            <div style="font-size:0.72rem; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:1px; color:var(--text);">${c.chapter}</div>
            <div style="font-size:0.66rem; color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${c.section}</div>
        </div>`).join('') || `<div style="color:var(--text-muted); font-size:0.75rem; padding:8px 0;">No activity yet.</div>`;

    let todayGrad = todayPct >= 75
        ? 'linear-gradient(135deg,#34d399,#6ee7b7)'
        : todayPct >= 40
            ? 'linear-gradient(135deg,#fb923c,#fbbf24)'
            : 'linear-gradient(135deg,#f87171,#fb923c)';
    let campGrad = campPct >= 75
        ? 'linear-gradient(90deg,#34d399,#6ee7b7)'
        : campPct >= 40
            ? 'linear-gradient(90deg,#fb923c,#fbbf24)'
            : 'linear-gradient(90deg,#f87171,#fb923c)';

    panel.innerHTML = `
        <div class="panel-label" style="margin-top:16px;">Today</div>
        <div style="padding:20px 14px 16px; background:color-mix(in srgb,${todayGrad.includes('34d399') ? '#34d399' : todayGrad.includes('fb923c') ? '#fb923c' : '#f87171'} 8%,var(--surface-light)); border:1px solid var(--border); border-radius:24px; margin-bottom:13px; text-align:center; animation:springUp var(--dur-lg) var(--spring) both;">
            <div style="font-size:3.8rem; font-weight:800; background:${todayGrad}; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace; line-height:1; animation:heroCount var(--dur-lg) var(--spring) both;">${todayPct}%</div>
            <div style="font-size:0.6rem; color:var(--text-subtle); margin-top:5px; text-transform:uppercase; letter-spacing:1.8px; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;">Daily Progress</div>
            <div class="progress-bar-bg" style="margin-top:12px; height:8px;">
                <div class="progress-bar-fill" style="width:${todayPct}%; background:${todayGrad};"></div>
            </div>
            <div style="font-size:0.63rem; color:var(--text-subtle); margin-top:5px; font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${todayDone} done &nbsp;·&nbsp; ${todayAssigned} assigned</div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; margin-bottom:14px;">
            <div style="background:color-mix(in srgb,#fb923c 8%,var(--surface-light)); border:1px solid var(--border); border-radius:20px; padding:14px 8px; text-align:center; animation:springUp var(--dur-lg) var(--spring) 60ms both;">
                <div style="font-size:2.4rem; font-weight:800; background:linear-gradient(135deg,#fb923c,#fbbf24); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace; animation:heroCount var(--dur-lg) var(--spring) 80ms both;">${strk}</div>
                <div style="font-size:0.58rem; color:var(--text-subtle); text-transform:uppercase; letter-spacing:1px; margin-top:3px; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;">Streak 🔥</div>
            </div>
            <div style="background:color-mix(in srgb,#f5a623 8%,var(--surface-light)); border:1px solid var(--border); border-radius:20px; padding:14px 8px; text-align:center; animation:springUp var(--dur-lg) var(--spring) 120ms both;">
                <div style="font-size:2.4rem; font-weight:800; background:linear-gradient(135deg,#f5a623,#fbbf24); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace; animation:heroCount var(--dur-lg) var(--spring) 140ms both;">${daysLeft}</div>
                <div style="font-size:0.58rem; color:var(--text-subtle); text-transform:uppercase; letter-spacing:1px; margin-top:3px; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;">Days Left 📅</div>
            </div>
            <div style="background:color-mix(in srgb,#a78bfa 8%,var(--surface-light)); border:1px solid var(--border); border-radius:20px; padding:14px 8px; text-align:center; animation:springUp var(--dur-lg) var(--spring) 180ms both;">
                <div style="font-size:2.4rem; font-weight:800; background:linear-gradient(135deg,#a78bfa,#818cf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace; animation:heroCount var(--dur-lg) var(--spring) 200ms both;">${getPersonalBest().best || 0}</div>
                <div style="font-size:0.58rem; color:var(--text-subtle); text-transform:uppercase; letter-spacing:1px; margin-top:3px; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;">Best Day 🥇</div>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:14px;">
            <div style="background:color-mix(in srgb,#34d399 8%,var(--surface-light)); border:1px solid var(--border); border-radius:20px; padding:14px 8px; text-align:center; animation:springUp var(--dur-lg) var(--spring) 240ms both;">
                <div style="font-size:2rem; font-weight:800; background:linear-gradient(135deg,#34d399,#6ee7b7); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace; animation:heroCount var(--dur-lg) var(--spring) 260ms both;">${totalEffRem.toLocaleString()}</div>
                <div style="font-size:0.58rem; color:var(--text-subtle); text-transform:uppercase; letter-spacing:1px; margin-top:3px; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;">Remaining 📚</div>
            </div>
            <div style="background:color-mix(in srgb,#818cf8 8%,var(--surface-light)); border:1px solid var(--border); border-radius:20px; padding:14px 8px; text-align:center; animation:springUp var(--dur-lg) var(--spring) 300ms both;">
                <div style="font-size:2rem; font-weight:800; background:linear-gradient(135deg,#818cf8,#a78bfa); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace; animation:heroCount var(--dur-lg) var(--spring) 320ms both;">${idealDaily}</div>
                <div style="font-size:0.58rem; color:var(--text-subtle); text-transform:uppercase; letter-spacing:1px; margin-top:3px; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;">Ideal / Day 🎯</div>
            </div>
        </div>

        <div class="panel-label">Campaign Progress</div>
        <div style="background:var(--surface-light); border:1px solid var(--border); border-radius:var(--r); padding:11px 12px; margin-bottom:13px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:7px;">
                <span class="rank-chip">${getRank(campPct).icon} ${getRank(campPct).title}</span>
                <span style="font-size:0.85rem; font-weight:700; background:${campGrad}; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${Math.round(campDonePct)}%</span>
            </div>
            <div class="progress-bar-bg" style="height:6px; background:var(--border); position:relative; overflow:hidden;">
               <div class="progress-bar-fill" style="width:${campDonePct}%; background:${campGrad}; position:absolute; left:0; top:0; height:100%;"></div>
               <div style="width:${campSkipPct}%; background:var(--text-subtle); position:absolute; left:${campDonePct}%; top:0; height:100%;"></div>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.62rem; color:var(--text-subtle); margin-top:5px; font-family:'JetBrains Mono','Noto Color Emoji',monospace;">
                <span>${campDone.toLocaleString()} done · ${campSkipped.toLocaleString()} skipped / ${campTotal.toLocaleString()}</span>
                <span>Next: ${getRank(campPct).min + 5 <= 100 ? getRank(campPct).min + 5 : 100}% → ${(RANKS.find(r => r.min === Math.min(getRank(campPct).min + 5, 100)) || RANKS[RANKS.length - 1]).title}</span>
            </div>
        </div>

        <div class="panel-label">Resource Health</div>
        <div style="margin-bottom:13px;">${resHtml}</div>

        <div class="panel-label">Recent Activity</div>
        <div style="margin-bottom:13px;">${recentHtml}</div>

        <button class="btn" onclick="switchTab('stats')" style="font-size:0.73rem; padding:7px;">📊 Full Stats →</button>
    `;

    updateProfileUI(); // <-- Add this line here
}

function toggleAmoled() {
    let on = document.body.classList.toggle('amoled');
    if (!appData.settings) appData.settings = {};
    appData.settings.amoled = on;
    saveData();
    let btn = document.getElementById('btn-amoled');
    btn.style.opacity = on ? '1' : '0.7';
    btn.querySelector('i').textContent = on ? '🟫' : '⬛';
}

// ==========================================
// NAVIGATION & INIT
// ==========================================
function switchTab(tabId) {
    document.querySelectorAll('.container').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));

    document.getElementById('view-' + tabId).classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');

    if (tabId === 'schedule') { document.getElementById('main-header').style.display = 'block'; renderDay(); }
    else { document.getElementById('main-header').style.display = window.innerWidth >= 820 ? 'none' : 'none'; }

    if (tabId === 'custom') renderCustomUI();
    if (tabId === 'visualize') renderVisualizer();
    if (tabId === 'stats') renderStats();
    // Right panel only updates on data changes (renderDay, submitModal, undoLastLog) — not on tab switch
}

function changeDay(dir) {
    let newDay = viewingDayIdx + dir;
    if (newDay >= 0 && newDay < TOTAL_DAYS) {
        _dayNavDir = dir;
        viewingDayIdx = newDay;
        renderDay();
    }
}

function goToToday() {
    _dayNavDir = viewingDayIdx < currentActualDayIdx ? 1 : (viewingDayIdx > currentActualDayIdx ? -1 : 0);
    viewingDayIdx = currentActualDayIdx;
    renderDay();
}

// ==========================================
// ENDGAME SCREEN & INITIALIZATION
// ==========================================

window.showEndgameScreen = function () {
    // Hide the loading overlay just in case
    document.getElementById('loading-overlay').style.display = 'none';

    // Get tomorrow's date as the minimum selectable extension
    let tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    let tmrStr = tmr.toISOString().split('T')[0];

    let overlay = document.createElement('div');
    overlay.id = 'endgame-overlay';
    overlay.style.cssText = 'position:fixed; inset:0; background:var(--bg); z-index:9999999; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px; text-align:center; animation: fadeUp 0.5s var(--decel) both;';

    overlay.innerHTML = `
        <div style="font-size: 4.5rem; margin-bottom: 12px; filter: drop-shadow(0 0 20px rgba(245,166,35,0.4));">🏁</div>
        <h2 style="font-family:'Bricolage Grotesque', sans-serif; font-size:1.8rem; color:var(--accent); margin-bottom:8px; text-transform:uppercase; letter-spacing:1px;">Campaign Complete</h2>
        <p style="color:var(--text-muted); font-size:0.9rem; max-width:380px; line-height:1.6; margin-bottom: 32px;">
            The war is over. You have reached the end of your scheduled timeline. What is your next move, Commander?
        </p>

        <div style="background:var(--surface-light); border:1px solid var(--border); border-radius:20px; padding:24px; width:100%; max-width:340px; margin-bottom:24px; box-shadow:var(--sh2);">
            <div style="font-size:0.75rem; color:var(--text-subtle); text-transform:uppercase; font-weight:800; letter-spacing:1.5px; margin-bottom:12px;">Extend Timeline</div>
            <input type="date" id="endgame-new-date" min="${tmrStr}" 
                style="width:100%; padding:14px; background:var(--bg); border:1.5px solid var(--border); color:var(--text); border-radius:12px; font-family:'JetBrains Mono', monospace; margin-bottom:16px; outline:none; transition:border-color 0.2s;">
            <button class="btn btn-primary" onclick="extendCampaign()" style="margin-bottom:0; font-size:1rem; padding:14px;">Update D-Day ⚡</button>
        </div>

        <button class="btn" style="width:auto; padding:10px 24px; background:transparent; border:1px dashed rgba(255,255,255,0.15); color:var(--text-muted); font-size:0.8rem;" onclick="window.logoutGoogle()">🚪 LOG OUT</button>
    `;

    // Add focus effect to input
    let input = overlay.querySelector('#endgame-new-date');
    input.addEventListener('focus', () => input.style.borderColor = 'var(--accent)');
    input.addEventListener('blur', () => input.style.borderColor = 'var(--border)');

    document.body.appendChild(overlay);
};

window.extendCampaign = function () {
    let newDateVal = document.getElementById('endgame-new-date').value;
    if (!newDateVal) {
        alert("Please select a new end date.");
        return;
    }
    if (!appData.settings) appData.settings = {};
    appData.settings.campaignEndDate = newDateVal;
    saveData();
    // Reload the app. init() will read the new date and bypass the endgame screen.
    location.reload();
};

function init() {
    loadData();

    // Hide loading overlay immediately
    document.getElementById('loading-overlay').style.display = 'none';

    if (!appData.settings) appData.settings = {};

    // --- 1. DYNAMIC START DATE LOGIC ---
    let today = new Date();
    // Use local midnight (shifting 4AM to count as the previous day logically)
    let shifted = new Date(today.getTime() - 4 * 3600000);
    let todayUTC = Date.UTC(shifted.getFullYear(), shifted.getMonth(), shifted.getDate());

    if (!appData.settings.campaignStartDate) {
        // First time the user opens the app! Set their start date to today.
        appData.settings.campaignStartDate = todayUTC;
        saveData();
    }
    START_DATE = new Date(appData.settings.campaignStartDate);

    // Apply all persisted settings 
    applySettings(appData.settings);

    // --- 2. DYNAMIC END DATE LOGIC ---
    if (appData.settings.campaignEndDate) {
        let endMs = new Date(appData.settings.campaignEndDate + 'T00:00:00Z').getTime();
        let newDays = Math.round((endMs - START_DATE.getTime()) / 86400000) + 1;
        if (newDays >= 1) TOTAL_DAYS = newDays;
    } else {
        // Default to a 365-day campaign if an end date hasn't been set yet
        let end = new Date(START_DATE.getTime() + (364 * 86400000));
        appData.settings.campaignEndDate = end.toISOString().slice(0, 10);
        TOTAL_DAYS = 365;
        saveData();
    }

    // --- 3. CAMPAIGN TIMELINE CHECK (D-DAY) ---
    let endUTC = START_DATE.getTime() + ((TOTAL_DAYS - 1) * 86400000);

    if (todayUTC <= endUTC && todayUTC >= START_DATE.getTime()) {
        currentActualDayIdx = Math.floor((todayUTC - START_DATE.getTime()) / 86400000);
    } else if (todayUTC > endUTC) {
        // D-Day has passed! 
        showEndgameScreen();
        return; // Halt normal UI initialization so they stay on the overlay
    } else {
        currentActualDayIdx = 0;
    }

    viewingDayIdx = currentActualDayIdx;

    initBadgeCountsFromHistory();
    initEditor();
    switchTab('schedule');

    updateProfileUI();
}

// ══════════════════════════════════════════════
// MOBILE COMMAND CENTRE — BULLETPROOF IMPLEMENTATION
// ══════════════════════════════════════════════
(function () {
    const sheet = document.getElementById('mobile-cc-sheet');
    const backdrop = document.getElementById('mobile-cc-backdrop');
    const inner = document.getElementById('mobile-cc-inner');
    const handle = document.getElementById('mobile-cc-handle');
    const hint = document.getElementById('mobile-cc-pull-hint');

    let isOpen = false;

    function syncContent() {
        const src = document.getElementById('drp-content');
        if (!src) return;
        const html = src.innerHTML.trim();
        if (html && !html.includes('Loading…')) {
            inner.innerHTML = html;
        }
    }

    const drp = document.getElementById('drp-content');
    if (drp) {
        new MutationObserver(syncContent).observe(drp, { childList: true, subtree: true, characterData: true });
    }
    setTimeout(syncContent, 800);

    window.openCC = function () {
        if (window.innerWidth >= 820) return;
        syncContent();
        isOpen = true;
        sheet.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
        sheet.style.transform = 'translateY(0)';
        backdrop.classList.add('visible');
        document.body.style.overflow = 'hidden';

        if (hint) hint.style.transform = 'translate(-50%, -100%)';
    };

    window.closeMobileCC = function () {
        isOpen = false;
        sheet.style.transition = 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
        sheet.style.transform = 'translateY(-100%)';
        backdrop.classList.remove('visible');
        document.body.style.overflow = '';

        if (hint) hint.style.transform = 'translate(-50%, 0)';
    };

    // Explicit tap-to-close on the handle
    if (handle) handle.addEventListener('click', window.closeMobileCC);

    // Clean edge-swipe logic (only targets top edge for opening, and ONLY the handle for dragging closed)
    let startY = 0;
    let isClosingDrag = false;

    document.addEventListener('touchstart', (e) => {
        if (window.innerWidth >= 820) return;
        startY = e.touches[0].clientY;

        // ONLY allow drag-to-close if the user touches the actual handle area
        if (isOpen && e.target.closest('#mobile-cc-handle')) {
            isClosingDrag = true;
            sheet.style.transition = 'none';
        }
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
        if (window.innerWidth >= 820) return;
        let dy = e.touches[0].clientY - startY;

        // Open on swipe down from the extreme top edge (as a backup to tapping the pill)
        if (!isOpen && startY < 30 && dy > 15) {
            window.openCC();
        }

        // Handle pulling UP on the sheet handle to close
        if (isClosingDrag && dy < 0) {
            e.preventDefault(); // stop any background scroll
            sheet.style.transform = `translateY(${dy}px)`;
        }
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
        if (isClosingDrag) {
            let dy = e.changedTouches[0].clientY - startY;
            if (dy < -35) {
                window.closeMobileCC();
            } else {
                // Snap back open if they didn't drag far enough
                sheet.style.transition = 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)';
                sheet.style.transform = 'translateY(0)';
            }
            isClosingDrag = false;
        }
    }, { passive: true });

})();




function openDroplet() {
    let s = appData.settings || {};
    document.getElementById('droplet-optimal').checked = !!s.optimalPorosity;
    document.getElementById('mood-active').checked = !!s.moodWeights?.active;

    renderMoodSliders();
    document.getElementById('droplet-overlay').style.display = 'flex';
}

function closeDroplet() {
    document.getElementById('droplet-overlay').style.display = 'none';
}

function updateDropletTradeoffs() {
    if (!document.getElementById('mood-active').checked) {
        document.getElementById('mood-tradeoffs').style.opacity = '0.4';
        return;
    }
    document.getElementById('mood-tradeoffs').style.opacity = '1';

    let todayWeight = getDayWeight(currentActualDayIdx);
    let totalTodayCap = Math.round(todayWeight * MAX_DAILY_CAPACITY);
    let futureWeight = 0;
    for (let d = currentActualDayIdx + 1; d < TOTAL_DAYS; d++) futureWeight += getDayWeight(d);
    let totalRemainingWeight = futureWeight + todayWeight;

    let activeSubjs = Object.keys(allQueuesClean).filter(s => allQueuesClean[s].length > 0);
    let weights = {};
    activeSubjs.forEach(s => {
        let id = 'mood-weight-' + s.replace(/[^a-zA-Z0-9]/g, '_');
        let el = document.getElementById(id);
        weights[s] = el ? parseInt(el.value) : 5;
    });

    // Simulate Water-Filling for tradeoff preview
    let simOverrides = {};
    let subjLimits = {};
    let totalPending = 0;
    activeSubjs.forEach(s => {
        let maxQs = 0;
        for (let d in masterSchedules[s]) {
            if (d >= currentActualDayIdx) maxQs += masterSchedules[s][d].reduce((sum, t) => sum + t.qs, 0);
        }
        subjLimits[s] = maxQs;
        totalPending += maxQs;
    });

    if (totalPending <= totalTodayCap) {
        activeSubjs.forEach(s => simOverrides[s] = subjLimits[s]);
    } else {
        let remCap = totalTodayCap;
        let activePool = [...activeSubjs];
        activePool.forEach(s => simOverrides[s] = 0);

        while (remCap > 0 && activePool.length > 0) {
            let currentSumW = activePool.reduce((sum, s) => sum + weights[s], 0);
            if (currentSumW === 0) { activePool.forEach(s => weights[s] = 1); currentSumW = activePool.length; }

            let stepDist = {};
            activePool.forEach(s => stepDist[s] = Math.floor(remCap * (weights[s] / currentSumW)));

            let distSum = Object.values(stepDist).reduce((a, b) => a + b, 0);
            let diff = remCap - distSum;
            for (let i = 0; i < diff && activePool.length > 0; i++) stepDist[activePool[i % activePool.length]]++;

            let toRemove = [];
            activePool.forEach(s => {
                let addition = stepDist[s];
                let current = simOverrides[s];
                if (current + addition >= subjLimits[s]) {
                    remCap -= (subjLimits[s] - current);
                    simOverrides[s] = subjLimits[s];
                    toRemove.push(s);
                } else {
                    simOverrides[s] += addition;
                    remCap -= addition;
                }
            });
            activePool = activePool.filter(s => !toRemove.includes(s));
        }
    }

    let html = `<div style="display:grid; grid-template-columns:2fr 1fr 1.2fr; gap:8px; font-size:0.65rem; color:var(--text-muted); margin-bottom:6px; border-bottom:1px solid var(--border); padding-bottom:4px; font-weight:700; text-transform:uppercase;">
        <span>Subject</span><span style="text-align:right;">Today</span><span style="text-align:right;">Future/Day</span>
    </div>`;

    activeSubjs.forEach(s => {
        let totalQs = subjLimits[s];
        let defaultToday = totalRemainingWeight > 0 ? Math.round((totalQs / totalRemainingWeight) * todayWeight) : 0;
        let newToday = simOverrides[s];

        let newFutureAvg = futureWeight > 0 ? ((totalQs - newToday) / futureWeight).toFixed(1) : 0;

        let color = SUBJ_COLORS[s] || 'var(--text)';
        let diff = newToday - defaultToday;
        let diffStr = diff > 0 ? `<span style="color:var(--success)">+${diff}</span>` : diff < 0 ? `<span style="color:var(--danger)">${diff}</span>` : `<span style="color:var(--text-muted)">-</span>`;

        html += `<div style="display:grid; grid-template-columns:2fr 1fr 1.2fr; gap:8px; font-size:0.8rem; margin-bottom:4px; align-items:center;">
            <span style="color:${color}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s}</span>
            <span style="text-align:right; font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${newToday} <span style="font-size:0.55rem; display:inline-block; min-width:20px; text-align:left;">(${diffStr})</span></span>
            <span style="text-align:right; font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${newFutureAvg}</span>
        </div>`;
    });

    document.getElementById('mood-tradeoffs').innerHTML = html || '<div style="color:var(--text-muted); font-size:0.7rem;">No tasks remaining.</div>';
}

function renderMoodSliders() {
    let s = appData.settings || {};
    let active = document.getElementById('mood-active').checked;
    let container = document.getElementById('mood-sliders-container');

    if (!active) {
        container.innerHTML = '';
        updateDropletTradeoffs();
        return;
    }

    let weights = s.moodWeights?.weights || {};
    let activeSubjs = Object.keys(allQueuesClean).filter(k => allQueuesClean[k].length > 0);

    let html = '';
    activeSubjs.forEach(subj => {
        let w = weights[subj] !== undefined ? weights[subj] : 5;
        let color = SUBJ_COLORS[subj] || 'var(--accent)';
        let id = 'mood-weight-' + subj.replace(/[^a-zA-Z0-9]/g, '_');
        html += `<div style="margin-bottom:12px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px; font-size:0.8rem;">
                <span style="color:${color}; font-weight:700;">${subj}</span>
                <span id="${id}-val" style="font-family:'JetBrains Mono','Noto Color Emoji',monospace; color:var(--text-muted);">${w}</span>
            </div>
            <input type="range" id="${id}" min="0" max="10" value="${w}" style="width:100%; accent-color:${color};" oninput="document.getElementById('${id}-val').innerText=this.value; updateDropletTradeoffs()">
        </div>`;
    });
    container.innerHTML = html;
    updateDropletTradeoffs();
}

function applyDroplet() {
    if (!appData.settings) appData.settings = {};
    appData.settings.optimalPorosity = document.getElementById('droplet-optimal').checked;

    let active = document.getElementById('mood-active').checked;
    let weights = {};
    if (active) {
        let activeSubjs = Object.keys(allQueuesClean).filter(k => allQueuesClean[k].length > 0);
        activeSubjs.forEach(subj => {
            let id = 'mood-weight-' + subj.replace(/[^a-zA-Z0-9]/g, '_');
            let el = document.getElementById(id);
            if (el) weights[subj] = parseInt(el.value);
        });
    }
    appData.settings.moodWeights = { active, weights };

    saveData();
    needsRebuild = true;
    closeDroplet();
    if (typeof renderDay === 'function') renderDay();
}

// ==========================================
// FAB MENU LOGIC
// ==========================================
window.toggleFab = function () {
    let menu = document.getElementById('fab-menu');
    let fabBtn = document.getElementById('main-fab');
    if (menu.style.display === 'none') {
        menu.style.display = 'flex';
        fabBtn.style.transform = 'rotate(45deg)';
    } else {
        menu.style.display = 'none';
        fabBtn.style.transform = 'rotate(0deg)';
    }
};

// Close FAB if clicked outside
document.addEventListener('click', (e) => {
    let fabWrap = document.getElementById('fab-container');
    if (fabWrap && !fabWrap.contains(e.target)) {
        document.getElementById('fab-menu').style.display = 'none';
        document.getElementById('main-fab').style.transform = 'rotate(0deg)';
    }
});

// === QUIT WARNING (mirrors Python's <60% quit guard) ===
window.addEventListener('beforeunload', function (e) {
    let weight = getDayWeight(currentActualDayIdx);
    if (weight > 0) {
        let ratio = getCompletionRatioToday();
        if (ratio < 0.6) {
            let msg = `⚠️ You've only completed ${Math.round(ratio * 100)}% of today's target. Sure you want to leave?`;
            e.preventDefault();
            e.returnValue = msg;
            return msg;
        }
    }
});
// Expose the init function globally so Firebase can trigger it after data is fetched
window.initializeAppLogic = function () {
    init();
};

// ── Global ripple on interactive elements ──
document.addEventListener('pointerdown', e => {
    const el = e.target.closest('.task-action, .btn, .btn-icon, .nav-item');
    if (!el) return;
    const r = document.createElement('span');
    r.className = 'ripple-wave';
    const rect = el.getBoundingClientRect();
    r.style.left = (e.clientX - rect.left) + 'px';
    r.style.top = (e.clientY - rect.top) + 'px';
    el.appendChild(r);
    setTimeout(() => r.remove(), 520);
});


// =====================================
// OC TRACKER SPECIFIC CONSTANTS
// =====================================
const OC_ASSIGNMENTS = {
    "Alkyl Halides": {
        "Objective": [2, 3, 4, 5, 6, 8, 12, 13, 15, 17, 18, 20, 23, 24, 27, 29, 32, 37, 39, 40, 43, 47, 49, 56, 59, 62, 68, 69, 70, 71, 73],
        "Multicorrect": [77, 81, 88, 94, 95, 96, 97, 105, 108, 110],
        "Comprehension": [1, 6],
        "Matching": [144, 148, 149],
        "Integer": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    "Carbonyl Compounds - I": {
        "Objective": [1, 3, 4, 6, 9, 13, 15, 26, 29, 33, 34, 35, 39, 40, 42, 43, 45, 46, 48, 49, 50, 51, 53, 54],
        "Multicorrect": [69, 70, 76, 93, 94, 96, 97, 98, 101, 103, 105, 107, 110, 118, 119, 120, 122, 127, 132, 139, 141, 150, 153],
        "Comprehension": [3, 4, 6, 8, 9],
        "Matching": [1, 2, 3, 4, 5, 6, 7],
        "Integer": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    "Carbonyl Compounds - II": {
        "Objective": [5, 14, 15, 16, 20, 23, 25],
        "Multicorrect": [33, 36, 38, 40, 41, 42, 48, 49, 50, 51, 54, 55, 56],
        "Comprehension": [1, 2, 3],
        "Matching": [1, 2, 3, 4],
        "Integer": [1, 2, 3, 4]
    },
    "Hydrocarbons": {
        "Objective": [1, 4, 7, 8, 9, 10, 11, 16, 20, 25, 27, 28, 29, 33, 37, 38, 43, 44, 49, 51, 56, 58, 60],
        "Multicorrect": [61, 62, 63, 65, 74, 76, 82, 84, 87, 89, 91, 94, 99, 104, 105, 106, 108, 110, 111, 117, 120],
        "Comprehension": [2, 3, 4, 6, 12, 13],
        "Matching": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        "Integer": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    },
    "Carboxylic Acids, Amines and their Derivatives": {
        "Objective": [1, 4, 6, 7, 8, 9, 11, 16, 18, 20, 23, 28, 31, 35, 36, 37, 38, 39, 40, 43, 44, 45, 46],
        "Multicorrect": [51, 52, 55, 58, 60, 61, 63, 64, 65, 68, 69, 71, 72, 74, 77, 80, 81, 82, 83, 85, 86, 87, 96, 108, 111, 112, 114, 123],
        "Comprehension": [2, 4, 5, 6, 9],
        "Matching": [1, 2, 3, 4, 5, 6, 7, 8, 9],
        "Integer": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    },
    "Aromatic Compounds": {
        "Objective": [1, 3, 4, 5, 9, 12, 13, 16, 18, 20, 31, 33, 39, 51, 54, 55, 56, 62, 64, 70],
        "Multicorrect": [71, 74, 75, 76, 82, 85, 94, 98, 99, 100, 102, 103, 104, 106, 124, 127, 128, 129, 131, 133, 134, 136, 137, 138],
        "Comprehension": [3, 4, 5, 7, 8, 9],
        "Matching": [1, 2, 3, 4, 5, 6, 7],
        "Integer": [1, 2, 3, 4, 5, 6]
    },
    "Isomerism": {
        "Objective": [1, 2, 3, 4, 15, 33, 35, 42, 59, 60, 65],
        "Multicorrect": [76, 77, 81, 107, 112, 114],
        "Integer": [182, 184, 189, 191, 192, 195, 197, 198, 199]
    },
    "GOC": {
        "Objective": [13, 16, 22, 26, 29, 30, 31, 51, 55, 57, 58, 60, 61, 63],
        "Multicorrect": [64, 65, 68, 71, 73, 74, 75, 77, 78, 82, 102, 108, 110, 111, 122, 125, 126, 131, 132, 133, 136, 143, 144, 150, 153, 154],
        "Comprehension": [4, 9, 11],
        "Matching": [192, 194, 197],
        "Integer": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    },
    "IUPAC Nomenclature": {
        "Objective": [6, 7, 12, 13, 16, 17, 18, 21, 23, 40, 41, 71, 72, 74, 80, 81]
    },
    "Biomolecules, POC, Polymers and Chemistry in Everyday Life": {
        "Objective": Array.from({ length: 50 }, (_, i) => i + 1),
        "Multicorrect": Array.from({ length: 50 }, (_, i) => i + 1),
        "Comprehension": Array.from({ length: 26 }, (_, i) => i + 1),
        "Matching": Array.from({ length: 14 }, (_, i) => i + 1),
        "Integer": Array.from({ length: 15 }, (_, i) => i + 1)
    }
};

function openOCTracker() {
    let html = `<h2 style="margin-bottom:5px;">🧪 OC Tracker</h2>
                <p style="font-size:0.8rem; color:var(--text-muted); margin-top:0; margin-bottom:15px;">Tick questions you've already solved previously.</p>`;

    for (let ch in OC_ASSIGNMENTS) {
        html += `<div style="background:var(--surface-light); border:1px solid var(--border); border-radius:12px; margin-bottom:10px; overflow:hidden;">
                    <div style="padding:10px 14px; font-weight:bold; cursor:pointer; display:flex; justify-content:space-between;" onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'none' ? 'block' : 'none'">
                        ${ch} <span style="font-size:0.7rem; color:var(--text-subtle);">▼</span>
                    </div>
                    <div style="display:none; padding:0 14px 10px; border-top:1px solid var(--border);">`;
        for (let sec in OC_ASSIGNMENTS[ch]) {
            let qs = OC_ASSIGNMENTS[ch][sec];
            if (!qs || !Array.isArray(qs)) continue;
            let completed = (appData.ocCompleted && appData.ocCompleted[`${ch}|${sec}`]) || [];

            html += `<div style="margin-top:10px; font-size:0.8rem; color:var(--accent); font-weight:bold; font-family:'Bricolage Grotesque',sans-serif; text-transform:uppercase;">${sec}</div>
                     <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(45px, 1fr)); gap: 6px; margin-top:8px;">`;

            qs.forEach(q => {
                let isChecked = completed.includes(q) ? "checked" : "";
                html += `<label style="display:flex; justify-content:center; align-items:center; background:var(--bg); border:1px solid var(--border); border-radius:6px; padding:6px; cursor:pointer;">
                            <input type="checkbox" value="${q}" class="oc-trk-cb" data-ch="${ch}" data-sec="${sec}" ${isChecked} style="accent-color:var(--accent); margin-right:4px;">
                            <span style="font-family:'JetBrains Mono','Noto Color Emoji',monospace; font-size:0.75rem;">${q}</span>
                         </label>`;
            });
            html += `</div>`;
        }
        html += `</div></div>`;
    }

    html += `<button class="btn btn-primary" style="margin-top:15px; padding:12px;" onclick="saveOCTracker()">💾 Save Tracker</button>`;

    document.getElementById('settings-body').innerHTML = html;
    document.getElementById('settings-panel-head').querySelector('h2').innerText = "OC Tracker";
    document.getElementById('settings-overlay').classList.add('open');
}
function saveOCTracker() {
    if (!appData.ocCompleted) appData.ocCompleted = {};
    let cbs = document.querySelectorAll('.oc-trk-cb');
    let trackerState = {};

    cbs.forEach(cb => {
        let key = `${cb.dataset.ch}|${cb.dataset.sec}`;
        if (!trackerState[key]) trackerState[key] = [];
        if (cb.checked) trackerState[key].push(parseInt(cb.value));
    });

    for (let key in trackerState) {
        appData.ocCompleted[key] = trackerState[key];
    }

    saveData();
    needsRebuild = true;
    document.getElementById('settings-overlay').classList.remove('open');
    alert("Organic Chemistry Tracker Saved! Your schedule has been updated.");
    renderDay();
}
