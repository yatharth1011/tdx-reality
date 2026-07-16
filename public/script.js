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

// ==========================================
// UNITS & POINTS ("Combat Currency" system)
// A resource's work is measured in questions, minutes, or raw points — the
// capacity/scheduling algorithm treats all three identically (1 unit = 1
// capacity = 1 point), so this only changes labels/rewards, never scheduling.
// ==========================================
const UNIT_META = {
    q: { label: 'Qs', short: 'Q', icon: '📝', full: 'Questions' },
    min: { label: 'min', short: 'min', icon: '⏱️', full: 'Minutes' },
    pts: { label: 'pts', short: 'pt', icon: '🏆', full: 'Points' },
    pages: { label: 'pgs', short: 'pg', icon: '📖', full: 'Pages' },
};
function getResourceUnit(file) {
    return (appData.settings && appData.settings.resourceUnits && appData.settings.resourceUnits[file]) || 'q';
}
function setResourceUnit(file, unit) {
    if (!appData.settings) appData.settings = {};
    if (!appData.settings.resourceUnits) appData.settings.resourceUnits = {};
    appData.settings.resourceUnits[file] = unit;
}

// A resource's "kind" (exercise book / reading book / YouTube playlist) drives
// creation-flow shape and a few display tweaks — separate from its unit, which
// only drives the capacity/points label.
function getResourceKind(file) {
    return (appData.settings && appData.settings.resourceKind && appData.settings.resourceKind[file]) || 'exercise';
}
function setResourceKind(file, kind) {
    if (!appData.settings) appData.settings = {};
    if (!appData.settings.resourceKind) appData.settings.resourceKind = {};
    appData.settings.resourceKind[file] = kind;
}
// Standard YouTube "play button" mark, inlined so it renders crisply at any size.
const YOUTUBE_ICON_SVG = `<svg width="16" height="12" viewBox="0 0 28 20" style="flex-shrink:0;" xmlns="http://www.w3.org/2000/svg"><path d="M27.4 3.1c-.3-1.2-1.3-2.1-2.5-2.4C22.7.1 14 .1 14 .1s-8.7 0-10.9.6C1.9 1 .9 1.9.6 3.1 0 5.3 0 10 0 10s0 4.7.6 6.9c.3 1.2 1.3 2.1 2.5 2.4C5.3 19.9 14 19.9 14 19.9s8.7 0 10.9-.6c1.2-.3 2.2-1.2 2.5-2.4.6-2.2.6-6.9.6-6.9s0-4.7-.6-6.9z" fill="#FF0000"/><path d="M11.2 14.3 18.5 10l-7.3-4.3v8.6z" fill="#fff"/></svg>`;

const RESOURCE_KIND_META = {
    exercise: { icon: '📚', label: 'Exercise Book' },
    reading: { icon: '📗', label: 'Reading Book' },
    youtube: { icon: '▶️', label: 'YouTube Playlist' },
};
function unitLabel(count, file) {
    let u = UNIT_META[getResourceUnit(file)] || UNIT_META.q;
    return `${count} ${u.label}`;
}
// Best-effort lookup for records (like completion log entries) that don't
// carry a filename — scans resources for a matching chapter/section.
function _findResourceUnitForChSec(ch, sec) {
    for (let f in appData.resources) {
        if ((appData.resources[f] || []).some(r => r.ch === ch && r.sec === sec)) return getResourceUnit(f);
    }
    return 'q';
}
window.setResourceUnitAndRefresh = function (file, unit) {
    setResourceUnit(file, unit);
    saveData(); needsRebuild = true;
    renderEditor();
};
window.setResourceKindAndRefresh = function (file, kind) {
    setResourceKind(file, kind);
    saveData(); needsRebuild = true;
    renderEditor();
};
window.renameResourceAndRefresh = function (file, newName) {
    newName = newName.trim();
    if (!newName) return;
    let meta = (appData.settings?.customResources || []).find(r => r.file === file);
    if (meta) meta.name = newName;
    saveData(); needsRebuild = true;
    initEditor();
    document.getElementById('editor-file').value = file;
    renderEditor();
};
window.reassignResourceSubjectAndRefresh = function (file, newSubj) {
    let meta = (appData.settings?.customResources || []).find(r => r.file === file);
    if (!meta) return;
    meta.subj = newSubj;
    let color = (appData.settings?.subjects || []).find(s => s.name === newSubj)?.color;
    if (color) { meta.color = color; RES_COLORS[file] = color; }
    saveData(); needsRebuild = true;
    renderEditor();
};

// A small unique generative "flower" icon per point value, via the flora
// system — a subtle visual signature for how much a task is worth.
let _floraIconSeq = 0;
function taskPointsIconHtml(points) {
    if (!points || points <= 0) return '';
    let id = `flora-ico-${_floraIconSeq++}`;
    setTimeout(() => { if (window.makeBadgeFlower) makeBadgeFlower(id, String(points)); }, 0);
    return `<canvas id="${id}" width="16" height="16" style="border-radius:50%; vertical-align:middle; box-shadow:0 0 0 1px var(--border);" title="${points} pts"></canvas>`;
}
let appData = { resources: {}, completions: {}, skipped: {}, injectedTasks: {}, ocCompleted: {}, habits: [], habitLogs: {} };
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
    // Questions — per-action (fire every qualifying session), question-unit only
    { id: 'first_blood', name: 'First Blood', icon: '🩸', desc: 'First log of a day — fresh start.', cat: 'General', color: '#f87171', perAction: true },
    { id: 'half_century', name: 'Half Century', icon: '🏏', desc: '50+ Qs in a single day.', cat: 'Questions', color: '#fb923c', perAction: true },
    { id: 'century', name: 'Century', icon: '💯', desc: '100+ Qs in a single day.', cat: 'Questions', color: '#fbbf24', perAction: true },
    { id: 'double_century', name: 'Double Century', icon: '🌋', desc: '200+ Qs in a single day.', cat: 'Questions', color: '#f5a623', perAction: true },
    { id: 'triple_century', name: 'Triple Century', icon: '☄️', desc: '300+ Qs in a single day.', cat: 'Questions', color: '#e07b00', perAction: true },
    { id: 'war_machine', name: 'War Machine', icon: '⚙️', desc: '500 total questions logged.', cat: 'Questions', color: '#a78bfa' },
    { id: 'thousand', name: 'Thousand Warrior', icon: '⚔️', desc: '1000 total questions logged.', cat: 'Questions', color: '#818cf8' },
    { id: 'five_thousand', name: 'Five Thousand', icon: '🏔️', desc: '5000 total questions logged.', cat: 'Questions', color: '#6366f1' },
    // Minutes — time-based work (videos, timed sessions)
    { id: 'focused_session', name: 'Focused Session', icon: '⏱️', desc: '30+ min logged in a single day.', cat: 'Minutes', color: '#38bdf8', perAction: true },
    { id: 'deep_focus', name: 'Deep Focus', icon: '🎧', desc: '60+ min logged in a single day.', cat: 'Minutes', color: '#0ea5e9', perAction: true },
    { id: 'marathon_session', name: 'Marathon Session', icon: '🏃', desc: '120+ min logged in a single day.', cat: 'Minutes', color: '#0284c7', perAction: true },
    { id: 'time_traveler', name: 'Time Traveler', icon: '🕰️', desc: '500 total minutes logged.', cat: 'Minutes', color: '#0369a1' },
    { id: 'time_lord', name: 'Time Lord', icon: '⏳', desc: '2000 total minutes logged.', cat: 'Minutes', color: '#075985' },
    // Pages — reading books
    { id: 'page_turner', name: 'Page Turner', icon: '📖', desc: '25+ pages read in a single day.', cat: 'Pages', color: '#4ade80', perAction: true },
    { id: 'chapter_closer', name: 'Chapter Closer', icon: '📘', desc: '50+ pages read in a single day.', cat: 'Pages', color: '#22c55e', perAction: true },
    { id: 'bookworm', name: 'Bookworm', icon: '🐛', desc: '100+ pages read in a single day.', cat: 'Pages', color: '#16a34a', perAction: true },
    { id: 'librarian', name: 'Librarian', icon: '📚', desc: '500 total pages read.', cat: 'Pages', color: '#15803d' },
    { id: 'bibliophile', name: 'Bibliophile', icon: '🏛️', desc: '2000 total pages read.', cat: 'Pages', color: '#166534' },
    // Points — raw point-based work
    { id: 'point_scorer', name: 'Point Scorer', icon: '🏆', desc: '50+ pts logged in a single day.', cat: 'Points', color: '#fbbf24', perAction: true },
    { id: 'point_master', name: 'Point Master', icon: '💰', desc: '100+ pts logged in a single day.', cat: 'Points', color: '#f59e0b', perAction: true },
    { id: 'point_hoarder', name: 'Point Hoarder', icon: '💎', desc: '1000 total points logged.', cat: 'Points', color: '#d97706' },
    { id: 'point_legend', name: 'Point Legend', icon: '👑', desc: '5000 total points logged.', cat: 'Points', color: '#b45309' },
    // Daily — per-action
    { id: 'early_bird', name: 'Early Bird', icon: '🐦', desc: 'Logged something on Day 1.', cat: 'Daily', color: '#34d399' },
    { id: 'perfect_day', name: 'Perfect Day', icon: '✅', desc: "Completed 100% of a day's assigned tasks.", cat: 'Daily', color: '#6ee7b7', perAction: true },
    { id: 'overdrive', name: 'Overdrive', icon: '🚀', desc: 'Exceeded the daily capacity cap.', cat: 'Daily', color: '#38bdf8', perAction: true },
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
    // Cumulative totals, split per unit — a badge named "Total Questions" should
    // only count actual questions, not minutes/pages/points logged elsewhere.
    let totalByUnit = { q: 0, min: 0, pages: 0, pts: 0 };
    for (let ds in appData.completions) {
        appData.completions[ds].forEach(c => {
            let u = _findResourceUnitForChSec(c.chapter, c.section);
            totalByUnit[u] = (totalByUnit[u] || 0) + c.done;
        });
    }

    if (totalByUnit.q >= 500) earned.add('war_machine');
    if (totalByUnit.q >= 1000) earned.add('thousand');
    if (totalByUnit.q >= 5000) earned.add('five_thousand');
    if (totalByUnit.min >= 500) earned.add('time_traveler');
    if (totalByUnit.min >= 2000) earned.add('time_lord');
    if (totalByUnit.pages >= 500) earned.add('librarian');
    if (totalByUnit.pages >= 2000) earned.add('bibliophile');
    if (totalByUnit.pts >= 1000) earned.add('point_hoarder');
    if (totalByUnit.pts >= 5000) earned.add('point_legend');

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

// Per-action badges fire when the day's running total (for the unit being
// logged) crosses a threshold. Global badges fire once ever. Both stamp
// countNow on the returned def objects.
const UNIT_DAILY_THRESHOLDS = {
    q: [[50, 'half_century'], [100, 'century'], [200, 'double_century'], [300, 'triple_century']],
    min: [[30, 'focused_session'], [60, 'deep_focus'], [120, 'marathon_session']],
    pages: [[25, 'page_turner'], [50, 'chapter_closer'], [100, 'bookworm']],
    pts: [[50, 'point_scorer'], [100, 'point_master']],
};
function getNewlyEarnedBadges(dailyTotalBefore, dailyTotalAfter, wasFirstLogToday, isPerfectDay, isOverdrive, logUnit, dailyUnitTotalBefore, dailyUnitTotalAfter) {
    let ids = [];
    let counts = appData.badgeCounts || {};

    if (wasFirstLogToday) {
        ids.push('first_blood');
        let w = getDayWeight(currentActualDayIdx);
        if (w === 0.4) ids.push('iron_will');
        if (w === 0.5) ids.push('weekend_warrior');
    }
    const thresholds = UNIT_DAILY_THRESHOLDS[logUnit] || UNIT_DAILY_THRESHOLDS.q;
    for (let [thr, id] of thresholds)
        if (dailyUnitTotalBefore < thr && dailyUnitTotalAfter >= thr) ids.push(id);
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

// Converts an ISO "YYYY-MM-DD" deadline string into a campaign day index.
// Returns null when the string is missing/unparseable (caller should fall back
// to the campaign end date, which is what "optional deadline" means).
function resolveDeadlineDayIdx(deadlineStr) {
    if (!deadlineStr) return null;
    let d = new Date(deadlineStr + 'T00:00:00Z');
    if (isNaN(d.getTime())) return null;
    return Math.round((d.getTime() - START_DATE.getTime()) / 86400000);
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

    // Sum up the total amount of badges, including multiple copies of the same badge
    let earnedSet = evaluateAllBadges();
    let totalBadges = 0;
    let counts = appData.badgeCounts || {};

    earnedSet.forEach(id => {
        if (counts[id]) {
            totalBadges += counts[id];
        } else {
            totalBadges += 1; // Used for global one-off badges
        }
    });

    // 1. Desktop Panel
    let pcContainer = document.getElementById('pc-profile-container');
    if (pcContainer) {
        pcContainer.innerHTML = `
            <div class="pc-profile">
                <img src="${pfp}" alt="Profile" class="pfp">
                <div class="prof-name">${name}</div>
                <div class="prof-rank">${rank.icon} ${rank.title}</div>
                
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 6px; background: rgba(0,0,0,0.25); padding: 4px 14px 4px 4px; border-radius: 100px; border: 1px solid var(--border); box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);">
                    ${totalBadges > 0
                ? `<canvas id="pc-badge-flower" width="36" height="36" style="border-radius: 50%;"></canvas>`
                : `<div style="width: 36px; height: 36px; border-radius: 50%; background: var(--surface-light); border: 1px dashed var(--border); display: flex; align-items: center; justify-content: center; font-size: 14px; opacity: 0.5;">🌑</div>`
            }
                    <div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 0.95rem; color: var(--text-muted); font-weight: 800; letter-spacing: 1.5px; text-transform: uppercase;">
                        🎖️<span style="color: var(--accent); font-family: 'JetBrains Mono', monospace; font-size: 0.95rem;">${totalBadges}</span>
                    </div>
                </div>
            </div>
        `;

        if (totalBadges > 0) {
            setTimeout(() => {
                makeBadgeFlower('pc-badge-flower', totalBadges.toString());
            }, 0);
        }
    }

    // 2. Mobile Compact Panel (SPLIT PILLS + CENTER LOGO + BULLETPROOF SIZE)
    let mobContainer = document.getElementById('mob-profile-container');
    if (mobContainer) {
        // Generate a unique ID to prevent double-scaling race conditions on load
        let uniqueCanvasId = 'mob-badge-flower-' + Math.random().toString(36).substr(2, 9);

        mobContainer.innerHTML = `
            <style>
                #mob-profile-container {
                    display: flex !important;
                    justify-content: space-between !important;
                    align-items: center !important;
                    width: 100% !important;
                    margin-top: 14px !important;
                    margin-bottom: 8px !important;
                    position: relative; /* For absolute centering of the logo */
                }
                @media (min-width: 820px) {
                    #mob-profile-container { display: none !important; }
                }
                .mob-pill {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid var(--border);
                    border-radius: 100px;
                    padding: 4px 12px 4px 4px;
                    cursor: pointer;
                    transition: transform 0.15s;
                    z-index: 2; /* Keep clickable above center logo */
                }
                .mob-pill:active { transform: scale(0.96); }
                .mob-pill.right { padding: 4px 10px 4px 4px; }

                /* Center Branding - Pill Style */
                .mob-center-brand {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid var(--border);
                    border-radius: 100px;
                    padding: 5px 12px;
                    z-index: 1;
                    cursor: pointer;
                }
            </style>
            
            <div class="mob-pill" onclick="openCC()">
                <img src="${pfp}" alt="Profile" style="width:26px !important; height:26px !important; min-width:26px !important; border-radius:50%; border:1px solid var(--accent); object-fit:cover; display:block; box-sizing:border-box;">
                <div style="font-family:'Bricolage Grotesque',sans-serif; font-size:0.65rem; color:var(--accent); font-weight:800; text-transform:uppercase; letter-spacing:0.5px;">${rank.icon} ${rank.title}</div>
            </div>

            <div class="mob-center-brand" onclick="openCC()">
                <span style="font-size:0.9rem; filter:drop-shadow(0 0 6px var(--accent));">⚡</span>
            </div>

            <div class="mob-pill right" onclick="openCC()">
                ${totalBadges > 0
                ? `<canvas id="${uniqueCanvasId}" width="26" height="26" style="width:26px !important; height:26px !important; min-width:26px !important; border-radius:50%; display:block; box-sizing:border-box; flex-shrink:0;"></canvas>`
                : `<div style="width:26px !important; height:26px !important; min-width:26px !important; border-radius:50%; background:var(--surface-light); border:1px dashed var(--border); display:flex; align-items:center; justify-content:center; font-size:10px; opacity:0.5; box-sizing:border-box; flex-shrink:0;">🌑</div>`
            }
                <div style="font-family: 'Bricolage Grotesque', sans-serif; font-size: 0.68rem; color: var(--text-muted); font-weight: 800; letter-spacing: 1px; text-transform: uppercase;">
                    🎖️ <span style="color: var(--accent); font-family: 'JetBrains Mono', monospace;">${totalBadges}</span>
                </div>
            </div>
        `;

        if (totalBadges > 0) {
            setTimeout(() => {
                makeBadgeFlower(uniqueCanvasId, totalBadges.toString());
            }, 0);
        }
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
            ocCompleted: parsed.ocCompleted || {},
            habits: parsed.habits || [],
            habitLogs: parsed.habitLogs || {},
            brainboard: parsed.brainboard || [],  // (Inside the IF block)
            bbLinks: parsed.bbLinks || [],
            bbCam: parsed.bbCam || { x: 0, y: 0, z: 1 },
            bbShareId: parsed.bbShareId || null,
            bbLastSnapshotDate: parsed.bbLastSnapshotDate || null,
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
            settings: { optimalPorosity: true },
            injectedTasks: {},
            ocCompleted: {},
            habits: [],
            habitLogs: {},
            brainboard: [],                       // (Inside the ELSE block)
            bbLinks: [],
            bbCam: { x: 0, y: 0, z: 1 },
            bbShareId: null,
            bbLastSnapshotDate: null,
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

// Recursively drops any explicit `undefined` values — Firebase's set()
// rejects them anywhere in the payload tree and fails the ENTIRE write
// (not just the offending field), which silently bricks Log/Save/Rebuild
// until the bad value is gone. A defensive net here means one accidental
// undefined in any future feature can't brick saving app-wide again.
function _stripUndefinedDeep(obj) {
    if (Array.isArray(obj)) return obj.map(_stripUndefinedDeep);
    if (obj && typeof obj === 'object') {
        let out = {};
        for (let k in obj) {
            if (obj[k] === undefined) continue;
            out[k] = _stripUndefinedDeep(obj[k]);
        }
        return out;
    }
    return obj;
}

function saveData() {
    for (let fn in appData.resources) {
        for (let r of appData.resources[fn]) {
            let key = `${fn}::${r.ch}::${r.sec}`;
            if ((r.s || 0) > 0) appData.skipped[key] = r.s;
            else delete appData.skipped[key];
        }
    }

    const payload = _stripUndefinedDeep({
        resources: appData.resources,
        completions: appData.completions,
        skipped: appData.skipped,
        undoStack: undoStack,
        badges: appData.badges || [],
        badgeCounts: appData.badgeCounts || {},
        settings: appData.settings || {},
        injectedTasks: appData.injectedTasks || {},
        oneOffTasks: appData.oneOffTasks || {},
        ocCompleted: appData.ocCompleted || {},
        brainboard: appData.brainboard || [],
        bbLinks: appData.bbLinks || [],
        bbCam: appData.bbCam || { x: 0, y: 0, z: 1 },
        bbShareId: appData.bbShareId || null,
        bbLastSnapshotDate: appData.bbLastSnapshotDate || null,
    });

    // Push to Firebase Cloud
    if (window.saveToFirebase) {
        window.saveToFirebase(payload);
    }

    // Keep the public share mirror (if sharing is on) and the daily history
    // snapshot in sync with whatever was just saved.
    if (appData.bbShareId && window.publishSharedBoard) {
        window.publishSharedBoard(appData.bbShareId, {
            nodes: appData.brainboard || [],
            links: appData.bbLinks || [],
            cam: appData.bbCam || { x: 0, y: 0, z: 1 },
        });
    }
    window.maybeSnapshotBrainboardHistory();

    // Optional: Keep localStorage updated as a local backup
    localStorage.setItem('tdxData', JSON.stringify(payload));
}

async function factoryReset() {
    // Unambiguous character set (no 0/O, 1/I/L) since the user has to retype it.
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let code = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');

    let confirmed = await new Promise(resolve => {
        let modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal" style="max-width:420px;">
                <h2>⚠️ Factory Reset</h2>
                <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">This will wipe all completion logs and restore all done counts to 0. Total question counts are preserved. <strong style="color:var(--danger);">This cannot be undone.</strong></p>
                <p style="font-size:0.78rem; color:var(--text-muted); margin-top:12px; margin-bottom:6px;">Type this code to confirm:</p>
                <div style="font-family:'JetBrains Mono',monospace; font-size:1.4rem; font-weight:800; letter-spacing:5px; text-align:center; color:var(--danger); background:rgba(248,113,113,0.08); border:1.5px dashed var(--danger); border-radius:12px; padding:10px; user-select:all;">${code}</div>
                <input type="text" id="factory-reset-input" placeholder="Type the code…" autocomplete="off" autocapitalize="characters" spellcheck="false" style="text-transform:uppercase; letter-spacing:3px; text-align:center; font-family:'JetBrains Mono',monospace; margin-top:10px;">
                <div class="modal-buttons">
                    <button class="btn" id="fr-cancel">Cancel</button>
                    <button class="btn btn-danger" id="fr-ok" disabled style="opacity:0.4; cursor:not-allowed;">Wipe Everything</button>
                </div>
            </div>`;
        document.body.appendChild(modal);
        let input = modal.querySelector('#factory-reset-input');
        let okBtn = modal.querySelector('#fr-ok');
        let cleanup = (val) => { modal.remove(); resolve(val); };
        modal.addEventListener('click', e => { if (e.target === modal) cleanup(false); });
        modal.querySelector('#fr-cancel').onclick = () => cleanup(false);
        let syncOkState = () => {
            let match = input.value.trim().toUpperCase() === code;
            okBtn.disabled = !match;
            okBtn.style.opacity = match ? '1' : '0.4';
            okBtn.style.cursor = match ? 'pointer' : 'not-allowed';
        };
        input.addEventListener('input', syncOkState);
        input.addEventListener('keydown', e => { if (e.key === 'Enter' && !okBtn.disabled) cleanup(true); });
        okBtn.onclick = () => { if (input.value.trim().toUpperCase() === code) cleanup(true); };
        setTimeout(() => input.focus(), 50);
    });

    if (confirmed) {
        localStorage.removeItem('tdxData');
        location.reload();
    }
}

// ── Settings defaults ─────────────────────────────────────────────────────────
const SETTINGS_DEFAULTS = {
    theme: 'theme-default',
    autoTarget: false,
    optimalPorosity: true,
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

    // 1. APPLY THEME FIRST (This resets the body classes)
    let d = SETTINGS_DEFAULTS;
    document.body.className = s.theme || d.theme;

    // 2. THEN ADD MODIFIERS (These will now survive)
    if (s.fabStyle === 'gear' || s.classicFab) {
        document.body.classList.add('fab-gear');
    } else {
        document.body.classList.remove('fab-gear');
    }

    // FAB Style Override
    if (s.classicFab) {
        document.body.classList.add('fab-gear');
    } else {
        document.body.classList.remove('fab-gear');
    }

    document.body.classList.toggle('arcade-mode', !!s.arcadeMode);

    // Build the SUBJ_COLORS map dynamically from user settings
    SUBJ_COLORS = {};
    s.subjects.forEach(sub => {
        SUBJ_COLORS[sub.name] = sub.color;
    });
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
    for (let dayIdx = 0; dayIdx <= currentActualDayIdx; dayIdx++) {
        let ds = getDateStr(dayIdx);
        let comps = appData.completions[ds];
        if (!comps || comps.length === 0) continue;
        let dayTotalsByUnit = {};
        comps.forEach(c => {
            let u = _findResourceUnitForChSec(c.chapter, c.section);
            dayTotalsByUnit[u] = (dayTotalsByUnit[u] || 0) + c.done;
        });
        counts['first_blood'] = (counts['first_blood'] || 0) + 1;
        for (let u in dayTotalsByUnit) {
            let thresholds = UNIT_DAILY_THRESHOLDS[u] || UNIT_DAILY_THRESHOLDS.q;
            for (let [thr, id] of thresholds)
                if (dayTotalsByUnit[u] >= thr) counts[id] = (counts[id] || 0) + 1;
        }
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
                    tasks.push({ filename: filename, chapter: ch, section: sec, rem_raw: pending.length, target_qs: pending.length, total_qs: secData.length, specific_qs: pending, priority: pVal });
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
                tasks.push({ filename: filename, chapter: r.ch, section: r.sec, rem_raw: rem, target_qs: maxQs, total_qs: r.t, priority: pVal, deadline: r.dl || null });
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
            // Atomic (time-based) tasks are never split across days — the whole
            // block lands on whichever day has room to start it, even if that
            // means slightly overflowing that day's target.
            if (currentTask.qs <= needed || currentTask.atomic) {
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

// Wraps distributeTasks with awareness of optional per-exercise deadlines.
// Tasks with no override (t.deadline is null/unset) fall back to the campaign
// end date, i.e. behave exactly as before. When a subject's queue mixes
// deadlines, each distinct deadline is scheduled as its own sub-queue with a
// shorter horizon (startDay..deadlineDay) so that exercise is fully placed
// on or before its due date, then the day-by-day results are merged back
// together into a single schedule for the subject.
function distributeSubjectSchedule(queue, startDay, totalDays, todayAlreadyDone, todayOverrideQs) {
    let empty = {};
    for (let i = 0; i < totalDays; i++) empty[i] = [];
    if (!queue.length) return empty;

    let lastDay = totalDays - 1;
    let groups = new Map();
    for (let t of queue) {
        let dlDay = lastDay;
        if (t.deadline) {
            let resolved = resolveDeadlineDayIdx(t.deadline);
            if (resolved !== null && !isNaN(resolved)) {
                dlDay = Math.min(lastDay, Math.max(startDay, resolved));
            }
        }
        if (!groups.has(dlDay)) groups.set(dlDay, []);
        groups.get(dlDay).push(t);
    }

    // Fast path: nothing has an *effective* custom deadline — every task's
    // horizon resolved to the campaign end day, so the extra grouping below
    // would be a no-op. NB: groups.size === 1 alone isn't sufficient here —
    // a whole subject can share one *custom* deadline (e.g. one resource in
    // its own subject, entirely deadlined), which must still use the
    // shorter horizon below rather than being spread across the full
    // remaining campaign.
    if (groups.size === 1 && groups.has(lastDay)) {
        return distributeTasks(queue, startDay, totalDays, todayAlreadyDone, todayOverrideQs);
    }

    let sortedDeadlines = [...groups.keys()].sort((a, b) => a - b);

    // Probe each group's "natural" share of today's work (ignoring
    // already-done/override) so those two budgets can be split fairly
    // across groups instead of being double-applied to each of them.
    let naturalToday = {};
    let totalNaturalToday = 0;
    sortedDeadlines.forEach(dlDay => {
        let horizon = Math.max(startDay + 1, dlDay + 1);
        let probe = distributeTasks(groups.get(dlDay), startDay, horizon, 0, undefined);
        let today = (probe[startDay] || []).reduce((s, t) => s + t.qs, 0);
        naturalToday[dlDay] = today;
        totalNaturalToday += today;
    });

    let merged = {};
    for (let i = 0; i < totalDays; i++) merged[i] = [];

    let remainingAlreadyDone = todayAlreadyDone || 0;
    let remainingOverride = todayOverrideQs;

    sortedDeadlines.forEach((dlDay, idx) => {
        let horizon = Math.max(startDay + 1, dlDay + 1);
        let share = totalNaturalToday > 0 ? naturalToday[dlDay] / totalNaturalToday : 0;
        let isLast = idx === sortedDeadlines.length - 1;

        let groupAlreadyDone = isLast ? remainingAlreadyDone : Math.min(remainingAlreadyDone, Math.round((todayAlreadyDone || 0) * share));
        let groupOverride;
        if (todayOverrideQs !== undefined) {
            groupOverride = isLast ? remainingOverride : Math.min(remainingOverride, Math.round(todayOverrideQs * share));
        }

        let sched = distributeTasks(groups.get(dlDay), startDay, horizon, groupAlreadyDone, groupOverride);
        for (let d = startDay; d < horizon; d++) {
            if (sched[d] && sched[d].length) merged[d].push(...sched[d]);
        }

        remainingAlreadyDone = Math.max(0, remainingAlreadyDone - groupAlreadyDone);
        if (todayOverrideQs !== undefined) remainingOverride = Math.max(0, remainingOverride - groupOverride);
    });

    return merged;
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

        // Porosity ("1 in X" skip-sampling) only makes sense for question
        // banks. Reading pages, timed sessions, and raw points must always be
        // assigned in full, in order — never skipped/sampled. Minutes go one
        // step further: they're also atomic (never split across days), since
        // a video/lecture can't be resumed mid-session the way a book can.
        let resUnit = getResourceUnit(f);
        if (resUnit !== 'q') {
            tasks.forEach(t => { t.force_all = true; t.target_qs = t.rem_raw; t.qs = t.rem_raw; });
        }
        if (resUnit === 'min') {
            tasks.forEach(t => { t.atomic = true; });
        }

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

    const useOptimalPorosity = appData.settings?.optimalPorosity ?? SETTINGS_DEFAULTS.optimalPorosity;

    if (useOptimalPorosity) {
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
        masterSchedules[subj] = distributeSubjectSchedule(
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

    _applyHabitFloors();
    needsRebuild = false;
}

// Resource-tied habits act as an "at least N/day" floor on top of whatever
// the algorithm naturally assigns for that resource — every day from today
// through the habit's end date (or the campaign end, if indefinite), not
// just today, so the Visualizer/forward-looking views stay honest too.
// Simple (untied) habits never touch this — they stay fully separate from
// the scheduling engine, as before.
function _applyHabitFloors() {
    (appData.habits || []).forEach(h => {
        if (!h.tiedResource) return;
        let meta = (appData.settings?.customResources || []).find(r => r.file === h.tiedResource);
        let subj = meta?.subj;
        if (!subj || !masterSchedules[subj]) return;
        let endDay = h.endDate ? resolveDeadlineDayIdx(h.endDate) : (TOTAL_DAYS - 1);
        if (endDay == null || isNaN(endDay)) endDay = TOTAL_DAYS - 1;
        endDay = Math.min(endDay, TOTAL_DAYS - 1);

        for (let d = currentActualDayIdx; d <= endDay; d++) {
            let dayTasks = masterSchedules[subj][d];
            if (!dayTasks) continue;
            let tied = dayTasks.filter(t => t.filename === h.tiedResource);
            if (!tied.length) continue; // nothing pending from this resource that day — nothing to floor
            let assigned = tied.reduce((s, t) => s + t.qs, 0);
            if (assigned < h.target) {
                tied[0].qs += (h.target - assigned);
            }
        }
    });
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
        <h2 style="margin-bottom:4px;">🗓️ Change Day Type</h2>
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

    if (!title) { tdxAlert("Enter a mission objective."); return; }

    let qs = 0;
    if (type === 'qs') {
        qs = parseInt(document.getElementById('mission-qs').value);
        if (isNaN(qs) || qs <= 0) { tdxAlert("Enter a valid question target."); return; }
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

window.toggleMission = async function (id) {
    let dayStr = getDateStr(viewingDayIdx);
    let mission = appData.oneOffTasks[dayStr].find(m => m.id === id);
    if (!mission) return;
    if (!mission.done) {
        let confirmed = await tdxConfirm(`Mark "${mission.title}" as done?`, { title: 'Confirm Completion', icon: '✔', confirmText: 'Mark Done' });
        if (!confirmed) return;
    }
    mission.done = !mission.done;
    saveData();
    renderDay();
};

window.promptMissionQs = async function (id) {
    let dayStr = getDateStr(viewingDayIdx);
    let mission = appData.oneOffTasks[dayStr].find(m => m.id === id);
    if (!mission) return;

    let rem = mission.qsTarget - mission.qsDone;

    // Never instant-complete on a single click — confirm first, with special
    // copy when this mission's whole target is 1 (a true One-Shot milestone).
    if (rem === 1) {
        let confirmed = mission.qsTarget === 1
            ? await tdxConfirm(`Are you sure you want to strike this One-Shot milestone?\n\n${mission.title}`, { title: '🎯 One-Shot Milestone', icon: '🎯', confirmText: 'Strike It!' })
            : await tdxConfirm(`Log the final point for:\n${mission.title}`, { title: 'Confirm Log', icon: '✅', confirmText: 'Log It' });
        if (!confirmed) return;
        mission.qsDone += 1;
        saveData();
        needsRebuild = true;
        renderDay();
        renderRightPanel();
        return;
    }

    let valStr = await tdxPrompt(`Target remaining: ${rem}\nHow much did you complete?`, { title: `Logging: ${mission.title}`, placeholder: 'Amount', inputType: 'number' });
    if (!valStr) return;

    let val = parseInt(valStr);
    if (isNaN(val) || val <= 0) { await tdxAlert("Invalid number."); return; }
    if (val > rem) { await tdxAlert(`Cannot exceed remaining target (${rem}).`); return; }

    mission.qsDone += val;
    saveData();
    needsRebuild = true;
    renderDay();
    renderRightPanel();
};

// ==========================================
// DAILY HABITS — recurring, entirely separate storage from appData.resources/
// completions so the algorithmic scheduling engine never sees them.
// ==========================================
function getHabitDoneToday(habitId, dayIdx) {
    let ds = getDateStr(dayIdx);
    return (appData.habitLogs[ds] && appData.habitLogs[ds][habitId]) || 0;
}

// Consecutive-day streak, ending today if today's already met, otherwise
// ending yesterday (so the streak doesn't look "broken" before the day is over).
function getHabitStreak(habitId, target) {
    let streak = 0;
    let startDay = getHabitDoneToday(habitId, currentActualDayIdx) >= target ? currentActualDayIdx : currentActualDayIdx - 1;
    for (let d = startDay; d >= 0; d--) {
        if (getHabitDoneToday(habitId, d) >= target) streak++;
        else break;
    }
    return streak;
}

const HABIT_ICONS = ['🌱', '📖', '💪', '🧘', '💧', '🎯', '✍️', '🎨', '🏃', '😴', '🧹', '🎵'];
function _habitIconPickerHtml(idPrefix, selected) {
    selected = selected || '🌱';
    return `<div id="${idPrefix}-icon-picker" style="display:flex; flex-wrap:wrap; gap:6px;">
        ${HABIT_ICONS.map(ic => `<button type="button" data-icon="${ic}" onclick="_pickHabitIcon('${idPrefix}', '${ic}', this)" style="width:34px; height:34px; font-size:1.1rem; border-radius:8px; border:1.5px solid ${ic === selected ? 'var(--accent)' : 'var(--border)'}; background:${ic === selected ? 'var(--accent-dim)' : 'var(--bg)'}; cursor:pointer; padding:0;">${ic}</button>`).join('')}
        <input type="hidden" id="${idPrefix}-icon-value" value="${selected}">
    </div>`;
}
window._pickHabitIcon = function (idPrefix, icon, btn) {
    document.getElementById(`${idPrefix}-icon-value`).value = icon;
    btn.parentElement.querySelectorAll('button[data-icon]').forEach(b => {
        let isSel = b === btn;
        b.style.borderColor = isSel ? 'var(--accent)' : 'var(--border)';
        b.style.background = isSel ? 'var(--accent-dim)' : 'var(--bg)';
    });
};

function _habitAdvancedToggleHtml(panelId) {
    return `<button type="button" onclick="window._toggleHabitAdvanced('${panelId}', this)" style="display:inline-flex; align-items:center; gap:7px; background:var(--surface); border:1px solid var(--border); color:var(--accent); font-size:0.72rem; font-weight:700; cursor:pointer; text-align:left; padding:9px 13px; border-radius:9px; margin-bottom:8px; width:fit-content;">⚙️ Advanced: tie to a resource, set an end date<span class="habit-adv-chevron" style="display:inline-block; transition:transform 0.2s ease; font-size:0.65rem;">▸</span></button>`;
}
window._toggleHabitAdvanced = function (panelId, btn) {
    let panel = document.getElementById(panelId);
    if (!panel) return;
    let open = panel.style.display === 'flex';
    panel.style.display = open ? 'none' : 'flex';
    let chev = btn.querySelector('.habit-adv-chevron');
    if (chev) chev.style.transform = open ? 'rotate(0deg)' : 'rotate(90deg)';
    btn.style.borderColor = open ? 'var(--border)' : 'var(--border-accent)';
};

function _setHabitDone(habitId, dayIdx, amount) {
    let ds = getDateStr(dayIdx);
    if (!appData.habitLogs[ds]) appData.habitLogs[ds] = {};
    appData.habitLogs[ds][habitId] = amount;
}

function _createHabit(title, mode, target, tiedResource, endDate, icon) {
    if (!appData.habits) appData.habits = [];
    appData.habits.push({ id: 'h_' + Date.now().toString(36), title, mode, target, tiedResource: tiedResource || null, endDate: endDate || null, icon: icon || '🌱' });
    saveData();
    needsRebuild = true;
}

window.addHabit = function () {
    let titleEl = document.getElementById('new-habit-title');
    let modeEl = document.getElementById('new-habit-mode');
    let targetEl = document.getElementById('new-habit-target');
    let resEl = document.getElementById('new-habit-resource');
    let endEl = document.getElementById('new-habit-enddate');
    let iconEl = document.getElementById('new-habit-icon-value');
    let title = titleEl.value.trim();
    if (!title) { tdxAlert('Name your habit first.'); return; }
    _createHabit(title, modeEl.value, Math.max(1, parseInt(targetEl.value) || 1), resEl?.value, endEl?.value, iconEl?.value);
    titleEl.value = ''; targetEl.value = ''; if (resEl) resEl.value = ''; if (endEl) endEl.value = '';
    renderHabitsSettingsList();
    renderDay();
};

// Quick-add entry point from the main "+" FAB menu, so Habits doesn't only
// live buried in Settings.
window.openQuickAddHabitModal = function () {
    let modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal" style="max-width:420px;">
            <h2>🌱 Add Habit</h2>
            <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; font-weight:800; color:var(--text-muted); margin-bottom:6px;">Icon</div>
            ${_habitIconPickerHtml('qa-habit', '🌱')}
            <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; font-weight:800; color:var(--text-muted); margin:14px 0 6px;">Name</div>
            <input type="text" id="qa-habit-title" placeholder="e.g. Read for 20 mins" style="margin-bottom:10px;">
            <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; font-weight:800; color:var(--text-muted); margin-bottom:6px;">Measured In / Target</div>
            <div style="display:flex; gap:8px; margin-bottom:8px;">
                <select id="qa-habit-mode" style="flex:1; padding:12px; background:var(--bg); color:var(--text); border:1.5px solid var(--border); border-radius:16px; font-size:0.9rem;">
                    <option value="q">📝 Questions</option>
                    <option value="min">⏱️ Minutes</option>
                    <option value="pts">🏆 Points</option>
                </select>
                <input type="number" id="qa-habit-target" placeholder="Target" min="1" value="1" style="width:100px; margin:0; text-align:center;">
            </div>
            ${_habitAdvancedToggleHtml('qa-habit-advanced')}
            <div id="qa-habit-advanced" style="display:none; flex-direction:column; gap:8px; margin-bottom:8px;">
                <select id="qa-habit-resource" style="padding:10px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-size:0.8rem;">
                    <option value="">— Not tied to a resource (simple habit) —</option>
                    ${RESOURCES_LIST.map(r => `<option value="${r.file}">${r.name}</option>`).join('')}
                </select>
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="font-size:0.7rem; color:var(--text-muted); white-space:nowrap;">Ends</span>
                    <input type="date" id="qa-habit-enddate" style="flex:1; padding:8px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-size:0.78rem;">
                </div>
            </div>
            <div class="modal-buttons">
                <button class="btn" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                <button class="btn btn-primary" id="qa-habit-ok">+ Add Habit</button>
            </div>
        </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    modal.querySelector('#qa-habit-ok').onclick = () => {
        let title = modal.querySelector('#qa-habit-title').value.trim();
        if (!title) { tdxAlert('Name your habit first.'); return; }
        let mode = modal.querySelector('#qa-habit-mode').value;
        let target = Math.max(1, parseInt(modal.querySelector('#qa-habit-target').value) || 1);
        let tiedResource = modal.querySelector('#qa-habit-resource').value;
        let endDate = modal.querySelector('#qa-habit-enddate').value;
        let icon = modal.querySelector('#qa-habit-icon-value').value;
        _createHabit(title, mode, target, tiedResource, endDate, icon);
        modal.remove();
        renderDay();
    };
};

window.deleteHabit = async function (id) {
    let habit = (appData.habits || []).find(h => h.id === id);
    if (!habit) return;
    if (!await tdxConfirm(`Delete habit "${habit.title}"? Past logs are kept, but it will no longer appear day to day.`, { title: 'Delete Habit', icon: '🗑️', confirmText: 'Delete', danger: true })) return;
    appData.habits = appData.habits.filter(h => h.id !== id);
    saveData();
    renderHabitsSettingsList();
    renderDay();
};

function renderHabitsSettingsList() {
    let con = document.getElementById('habits-settings-list');
    if (!con) return;
    let habits = appData.habits || [];
    if (!habits.length) {
        con.innerHTML = `<div style="font-size:0.78rem; color:var(--text-muted); text-align:center; padding:10px 0;">No habits yet — add one below.</div>`;
        return;
    }
    con.innerHTML = habits.map(h => {
        let u = UNIT_META[h.mode] || UNIT_META.q;
        let tiedName = h.tiedResource ? ((appData.settings?.customResources || []).find(r => r.file === h.tiedResource)?.name || h.tiedResource) : null;
        let streak = getHabitStreak(h.id, h.target);
        let subline = [
            `${u.icon} at least ${h.target} ${u.label} / day`,
            tiedName ? `📌 ${tiedName}` : null,
            h.endDate ? `until ${h.endDate}` : null,
        ].filter(Boolean).join(' &nbsp;·&nbsp; ');
        return `<div style="display:flex; align-items:center; gap:10px; padding:9px 12px; background:var(--surface); border:1px solid var(--border); border-radius:10px; margin-bottom:8px;">
            <div style="width:34px; height:34px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:1.15rem; background:var(--bg); border:1px solid var(--border); border-radius:9px;">${h.icon || '🌱'}</div>
            <div style="flex:1; min-width:0;">
                <div style="font-weight:700; font-size:0.85rem;">${h.title}</div>
                <div style="font-size:0.68rem; color:var(--text-muted);">${subline}</div>
            </div>
            ${streak > 0 ? `<div style="font-size:0.72rem; font-weight:800; color:#fb923c; white-space:nowrap;" title="${streak}-day streak">🔥 ${streak}</div>` : ''}
            <button class="ed-del-btn" style="margin:0;" onclick="deleteHabit('${h.id}')">✕</button>
        </div>`;
    }).join('');
}

window.toggleHabitTick = async function (habitId) {
    let habit = (appData.habits || []).find(h => h.id === habitId);
    if (!habit) return;
    let done = getHabitDoneToday(habitId, viewingDayIdx) >= habit.target;
    if (!done) {
        let confirmed = await tdxConfirm(`Are you sure you want to strike this One-Shot milestone?\n\n${habit.title}`, { title: '🎯 One-Shot Milestone', icon: '🎯', confirmText: 'Strike It!' });
        if (!confirmed) return;
        _setHabitDone(habitId, viewingDayIdx, habit.target);
    } else {
        _setHabitDone(habitId, viewingDayIdx, 0);
    }
    saveData();
    renderDay();
};

window.logHabitQty = async function (habitId) {
    let habit = (appData.habits || []).find(h => h.id === habitId);
    if (!habit) return;
    let doneNow = getHabitDoneToday(habitId, viewingDayIdx);
    let rem = habit.target - doneNow;
    if (rem <= 0) return;
    let u = UNIT_META[habit.mode] || UNIT_META.q;

    if (rem === 1) {
        let confirmed = await tdxConfirm(`Log the final ${u.short} for:\n${habit.title}`, { title: 'Confirm Log', icon: '✅', confirmText: 'Log It' });
        if (!confirmed) return;
        _setHabitDone(habitId, viewingDayIdx, habit.target);
        saveData(); renderDay();
        return;
    }

    if (habit.mode === 'min') {
        let confirmed = await tdxConfirm(`This is a time-based habit and must be completed in full.\n\nLog all ${rem} minutes for:\n${habit.title}?`, { title: '⏱️ Complete Session', icon: '⏱️', confirmText: 'Complete Session' });
        if (!confirmed) return;
        _setHabitDone(habitId, viewingDayIdx, habit.target);
        saveData(); renderDay();
        return;
    }

    let valStr = await tdxPrompt(`Target remaining: ${rem} ${u.label}\nHow much did you complete?`, { title: `Logging: ${habit.title}`, placeholder: 'Amount', inputType: 'number' });
    if (!valStr) return;
    let val = parseInt(valStr);
    if (isNaN(val) || val <= 0) { tdxAlert("Invalid number."); return; }
    if (val > rem) { tdxAlert(`Cannot exceed remaining target (${rem}).`); return; }
    _setHabitDone(habitId, viewingDayIdx, doneNow + val);
    saveData(); renderDay();
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

    if (hour >= 0 && hour < 2) { // Deep Midnight
        messages = [
            `The world is asleep, ${userName}, but something in you refused to stop tonight. That matters.`,
            `This silence isn't lonely, ${userName} — it's just you and a dream that's still worth chasing.`,
            `You're tired, ${userName}, and you're still here. That's not weakness. That's quiet strength.`,
            `${userName}, some of the strongest people you'll ever become are being shaped in hours like this.`,
            `You don't have to feel unstoppable right now, ${userName}. Just keep going a little longer.`,
            `Whatever brought you here tonight, ${userName}, it's still worth showing up for.`,
            `${userName}, this hour is yours. No comparisons, no pressure — just you and the next small step.`,
            `You've made it through harder nights than this one, ${userName}. You know how to do this.`,
            `Rest is close, ${userName}. But so is one more small win, if you want it.`,
            `The fact that you're still trying, ${userName}, says more about you than any result will.`
        ];
    } else if (hour >= 2 && hour < 5) { // Before Dawn
        messages = [
            `${userName}, this is usually where people quietly rest. If you're still here, be proud of that.`,
            `You don't need to have it all figured out right now, ${userName}. Just the next question.`,
            `Every hard hour you get through adds a little more proof that you can do this, ${userName}.`,
            `${userName}, it's okay to feel unsure. Unsure and still trying is exactly enough.`,
            `Whatever tomorrow holds, ${userName}, you'll meet it a little stronger because of tonight.`,
            `You're allowed to go slow right now, ${userName}. Slow is still moving.`,
            `${userName}, the dream you're chasing hasn't gone anywhere. Neither have you.`,
            `This tiredness will pass, ${userName}. What you build tonight will stay.`,
            `You've believed in this dream before, ${userName}. Let yourself believe in it a little more tonight.`,
            `One more small step, ${userName}, and then rest — you've earned both.`
        ];
    } else if (hour >= 5 && hour < 7) { // Dawn
        messages = [
            `${userName}, you made it through the hardest hours. Be gentle with yourself now, and keep going.`,
            `A quiet kind of hope arrives with each new start, ${userName}. Let it in.`,
            `${userName}, today hasn't happened yet. Whatever came before, this part is still unwritten.`,
            `You don't have to feel ready, ${userName}. Just willing. That's enough to begin.`,
            `Every small effort today builds on all the ones before it, ${userName}.`,
            `${userName}, you're allowed to be proud of just showing up again.`,
            `This morning is a fresh page, ${userName} — no need to carry yesterday's doubts onto it.`,
            `Progress rarely feels big in the moment, ${userName}. It adds up anyway.`,
            `${userName}, you've gotten through every hard morning so far. Trust that you'll get through this one too.`,
            `Take it one step at a time, ${userName}. That's really all anyone does.`
        ];
    } else if (hour >= 7 && hour < 10) { // Morning
        messages = [
            `${userName}, you don't need to feel strong all day. Just for the next hour.`,
            `Every bit of effort you give right now is building something real, ${userName}.`,
            `${userName}, it's okay if today feels hard. Hard doesn't mean you're failing.`,
            `You've come further than you probably give yourself credit for, ${userName}.`,
            `This is your pace, ${userName}, and it's allowed to be exactly what it is today.`,
            `${userName}, small steady effort beats big bursts of pressure. Keep it steady.`,
            `You are capable of more than this tired moment is telling you, ${userName}.`,
            `${userName}, however today goes, showing up already counts for something.`,
            `Be kind to yourself while you push forward, ${userName}. Both are possible together.`,
            `One task at a time, ${userName}. That's the whole plan.`
        ];
    } else if (hour >= 10 && hour < 13) { // Late Morning
        messages = [
            `${userName}, if focus is hard right now, that's human. Come back to it gently.`,
            `You're allowed to find this difficult, ${userName}, and still keep trying.`,
            `${userName}, every bit of understanding you gain now is yours to keep, always.`,
            `You don't have to outdo anyone, ${userName}. Just yesterday's version of you.`,
            `This part of the day tests patience more than energy, ${userName}. You have more than you think.`,
            `${userName}, it's okay to need a breath. Take it, then come back.`,
            `You are building something slowly and steadily, ${userName}, even on the hard days.`,
            `${userName}, doubt doesn't mean you're on the wrong path. It just means you care.`,
            `Small progress is still progress, ${userName}. Let that be enough for now.`,
            `You're doing better than the tired version of you can see right now, ${userName}.`
        ];
    } else if (hour >= 13 && hour < 15) { // Early Afternoon
        messages = [
            `${userName}, if this hour feels heavy, you're allowed to slow down without giving up.`,
            `You've handled hard afternoons before, ${userName}. You know how to get through this one too.`,
            `${userName}, rest when you need to. Then return to it — that's still consistency.`,
            `This dip in energy is temporary, ${userName}. Your effort doesn't have to match it.`,
            `${userName}, you are more capable than this tired stretch is letting you feel.`,
            `One small win right now, ${userName}, can shift the whole rest of your day.`,
            `You don't need to prove anything to anyone, ${userName}. Just take the next small step for you.`,
            `${userName}, it's okay to feel low and still choose to keep going, gently.`,
            `Whatever this hour looks like, ${userName}, it's not your whole story.`,
            `You're allowed to rebuild your momentum slowly, ${userName}. No rush.`
        ];
    } else if (hour >= 15 && hour < 17) { // Late Afternoon
        messages = [
            `${userName}, if you're low on energy, that's okay. Low energy and still here still counts.`,
            `You've gotten through harder stretches than this, ${userName}. Trust that a little.`,
            `${userName}, whatever doubt shows up right now, it doesn't get the final say.`,
            `This part of the day asks for patience more than power, ${userName}. Be patient with yourself.`,
            `${userName}, you are allowed to rest and still be someone who's working hard.`,
            `Every hard concept faced today becomes a little less scary tomorrow, ${userName}.`,
            `You don't have to feel motivated to keep moving, ${userName}. Just willing.`,
            `${userName}, this moment is temporary. What you're building isn't.`,
            `You're doing this for you, ${userName}. That's reason enough to keep going.`,
            `Small, steady, kind to yourself — that's a good way through this hour, ${userName}.`
        ];
    } else if (hour >= 17 && hour < 19) { // Sunset
        messages = [
            `${userName}, today doesn't need to be perfect to matter. It already does.`,
            `Whatever you managed today, ${userName}, let it be enough for today.`,
            `${userName}, closing the day with care for yourself is still a form of discipline.`,
            `You don't have to finish everything today, ${userName}. Just keep moving forward, gently.`,
            `${userName}, be proud of what you gave today, even if it wasn't everything.`,
            `This is a good time to reflect kindly, ${userName}, not harshly, on how far you've come.`,
            `${userName}, tomorrow is a new chance. Today was just one part of the journey.`,
            `You're allowed to rest tonight knowing you tried, ${userName}. That's genuinely enough.`,
            `${userName}, small consistent days are what quietly build big dreams.`,
            `Let today end with a little grace toward yourself, ${userName}.`
        ];
    } else if (hour >= 19 && hour < 22) { // Evening
        messages = [
            `${userName}, no one's keeping score but you — so be a fair judge of yourself.`,
            `Every bit of effort so far still counts, ${userName}, even the quiet, unnoticed kind.`,
            `You're becoming someone steadier through all of this, ${userName}, even on hard days.`,
            `${userName}, it's okay to not feel ready. Keep showing up anyway, gently.`,
            `Somewhere ahead, ${userName}, this consistency will feel like it was worth it.`,
            `You don't need to feel confident to keep going, ${userName}. Just keep going.`,
            `${userName}, this hour of effort matters, even if you can't see the result yet.`,
            `Every hard truth you face tonight makes tomorrow a little lighter, ${userName}.`,
            `${userName}, you've quietly given a lot to this dream. It's not unnoticed by you, at least.`,
            `Stay a little longer if you can, ${userName}. And if you can't, that's okay too.`
        ];
    } else { // Late Night
        messages = [
            `${userName}, today is almost done. However it went, you're still someone who kept trying.`,
            `One more gentle effort tonight, ${userName}, then let yourself rest.`,
            `${userName}, your future is still being shaped, a little more, by tonight's quiet effort.`,
            `Whatever this journey has cost you, ${userName}, let it also give you something back tonight.`,
            `The finish is still far, ${userName}, but so is giving up — you're still here, still going.`,
            `You've come a long way already, ${userName}. Be kind to yourself about the rest.`,
            `${userName}, one small step tonight is still a step. Take it if you can.`,
            `Imagine feeling proud of tonight tomorrow, ${userName}. That's still within reach.`,
            `Every bit of effort tonight becomes a little more strength for you later, ${userName}.`,
            `${userName}, rest is close. You don't have to carry everything alone right now.`
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
        updateFabVisibility(_getActiveTabId());
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
                    let metaMission = (m.qsTarget === 1)
                        ? `<span style="display:inline-flex; align-items:center; gap:5px; background:var(--accent-dim); color:var(--accent); padding:3px 8px; border-radius:100px; border:1px solid var(--border-accent); font-family:'Bricolage Grotesque',sans-serif; font-size:0.6rem; font-weight:800; letter-spacing:0.5px; text-transform:uppercase; box-shadow: 0 0 10px rgba(245, 166, 35, 0.1);">🎯 ONE-SHOT</span>`
                        : `Target: ${m.qsTarget} Pts &nbsp;·&nbsp; Done: ${m.qsDone}`;

                    mCard += `<li class="task-item ${isDone ? 'done' : ''}">
    <div class="task-info">
        <div class="task-title" style="${isDone ? 'text-decoration:line-through;color:var(--success-bright);' : ''}">${m.title}</div>
        <div class="task-meta">${metaMission}</div>
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

        // --- DAILY HABITS (recurring — fully separate from the resource scheduling engine) ---
        let habits = appData.habits || [];
        if (habits.length > 0) {
            let hCard = `<div class="card" style="--sc:#4ade80">
                <div class="card-header" style="background:rgba(74,222,128,0.08); border-bottom-color:rgba(74,222,128,0.2);"><span class="ch-title" style="background:linear-gradient(90deg,#4ade80,#86efac);-webkit-background-clip:text;">🌱 HABITS</span></div>
                <ul class="task-list">`;

            habits.forEach(h => {
                if (h.endDate) {
                    let endDay = resolveDeadlineDayIdx(h.endDate);
                    if (endDay != null && !isNaN(endDay) && viewingDayIdx > endDay) return; // habit has ended
                }
                let u = UNIT_META[h.mode] || UNIT_META.q;
                let points = h.target;
                let streak = getHabitStreak(h.id, h.target);
                let icon = h.icon || '🌱';
                let streakBadge = streak > 0 ? `<span style="display:inline-flex; align-items:center; gap:2px; color:#fb923c; font-weight:800; margin-left:6px;" title="${streak}-day streak">🔥${streak}</span>` : '';

                if (h.tiedResource) {
                    // Resource-tied: this is just a read-only "did today's floor get met?"
                    // status — the actual logging happens on the resource's own task card,
                    // where _applyHabitFloors() already guaranteed at least h.target got assigned.
                    let ds = getDateStr(viewingDayIdx);
                    let resRows = appData.resources[h.tiedResource] || [];
                    let doneAmt = (appData.completions[ds] || [])
                        .filter(c => resRows.some(r => r.ch === c.chapter && r.sec === c.section))
                        .reduce((s, c) => s + c.done, 0);
                    let isDone = doneAmt >= h.target;
                    let pct = Math.min(100, Math.round((doneAmt / h.target) * 100));
                    let resName = (appData.settings?.customResources || []).find(r => r.file === h.tiedResource)?.name || h.tiedResource;
                    let metaHabit = `📌 ${resName} &nbsp;·&nbsp; ${u.icon} ${doneAmt}/${h.target} ${u.label} today`
                        + `<span style="display:inline-flex; align-items:center; gap:4px; margin-left:6px; color:#fbbf24; font-weight:700;">${taskPointsIconHtml(points)} +${points} pts</span>${streakBadge}`;
                    hCard += `<li class="task-item ${isDone ? 'done' : ''}" style="align-items:center;">
                        <div style="width:36px; height:36px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:1.2rem; background:rgba(74,222,128,0.08); border:1px solid rgba(74,222,128,0.25); border-radius:10px; margin-right:10px;">${icon}</div>
                        <div class="task-info">
                            <div class="task-title" style="${isDone ? 'text-decoration:line-through;color:var(--success-bright);' : ''}">${h.title}</div>
                            <div class="task-meta">${metaHabit}</div>
                            <div class="progress-bar-bg" style="height:5px; margin-top:6px;"><div class="progress-bar-fill" style="width:${pct}%; background:${isDone ? 'var(--success-bright)' : '#4ade80'};"></div></div>
                        </div>
                        <div style="font-size:0.9rem; color:${isDone ? 'var(--success-bright)' : 'var(--text-muted)'}; font-weight:bold; margin-left:10px;">${isDone ? '✔' : '⏳'}</div>
                    </li>`;
                    return;
                }

                let doneAmt = getHabitDoneToday(h.id, viewingDayIdx);
                let isDone = doneAmt >= h.target;
                let pct = Math.min(100, Math.round((doneAmt / h.target) * 100));
                let metaHabit = isDone
                    ? `Done: ${doneAmt} ${u.label}`
                    : (h.target === 1
                        ? `<span style="display:inline-flex; align-items:center; gap:5px; background:var(--accent-dim); color:var(--accent); padding:3px 8px; border-radius:100px; border:1px solid var(--border-accent); font-family:'Bricolage Grotesque',sans-serif; font-size:0.6rem; font-weight:800; letter-spacing:0.5px; text-transform:uppercase; box-shadow: 0 0 10px rgba(245, 166, 35, 0.1);">🎯 ONE-SHOT</span>`
                        : `${u.icon} ${doneAmt}/${h.target} ${u.label}`)
                    + `<span style="display:inline-flex; align-items:center; gap:4px; margin-left:6px; color:#fbbf24; font-weight:700;">${taskPointsIconHtml(points)} +${points} pts</span>${streakBadge}`;
                let actionHandler = h.target === 1 ? `toggleHabitTick('${h.id}')` : `logHabitQty('${h.id}')`;

                hCard += `<li class="task-item ${isDone ? 'done' : ''}" style="align-items:center;">
                    <div style="width:36px; height:36px; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-size:1.2rem; background:rgba(74,222,128,0.08); border:1px solid rgba(74,222,128,0.25); border-radius:10px; margin-right:10px;">${icon}</div>
                    <div class="task-info">
                        <div class="task-title" style="${isDone ? 'text-decoration:line-through;color:var(--success-bright);' : ''}">${h.title}</div>
                        <div class="task-meta">${metaHabit}</div>
                        ${h.target > 1 ? `<div class="progress-bar-bg" style="height:5px; margin-top:6px;"><div class="progress-bar-fill" style="width:${pct}%; background:${isDone ? 'var(--success-bright)' : '#4ade80'};"></div></div>` : ''}
                    </div>
                    ${!isDone ? `<div class="task-action" onclick="${actionHandler}">LOG ▶</div>` : `<div style="font-size:0.9rem; color:var(--success-bright); font-weight:bold; margin-left:10px;">✔</div>`}
                </li>`;
            });
            hCard += `</ul></div>`;
            cards.push({ html: hCard, lines: habits.length });
        }
        // --- END DAILY HABITS ---

        // Build card HTML fragments + estimate height for greedy balancing
        for (let subj in masterSchedules) {
            let todaysTasks = masterSchedules[subj][viewingDayIdx] || [];
            let tComps = compsBySubj[subj] || [];
            let doneMap = {};
            tComps.forEach(c => { doneMap[`${c.chapter}|${c.section.trim()}`] = c.done; });
            // Minute-based tasks stay open for more logging even after partial
            // progress today — a "persistent" logger you can keep adding to as
            // you keep watching/working, instead of vanishing after one log.
            let pTasks = todaysTasks.filter(t => {
                let key = `${t.chapter}|${t.section.trim()}`;
                if (!loggedKeys.has(key)) return t.qs > 0;
                return getResourceUnit(t.filename) === 'min' && t.qs > 0;
            });
            let pendingKeys = new Set(pTasks.map(t => `${t.chapter}|${t.section.trim()}`));
            if (pTasks.length === 0 && tComps.length === 0) continue;

            let sc = SUBJ_COLORS[subj] || 'var(--accent)';
            let cardHtml = `<div class="card" style="--sc:${sc}">
                <div class="card-header"><span class="ch-title">${subj}</span></div>
                <ul class="task-list">`;
            let sQs = 0, sDone = 0;

            tComps.forEach(c => {
                let key = `${c.chapter}|${c.section.trim()}`;
                sDone += c.done; tDone += c.done;
                if (pendingKeys.has(key)) return; // still loggable — shown in the pending list below instead
                let cUnit = UNIT_META[_findResourceUnitForChSec(c.chapter, c.section)] || UNIT_META.q;
                cardHtml += `<li class="task-item done">
                    <div class="task-info">
                        <div class="task-title">✅ ${c.chapter} — ${c.section}</div>
                        <div class="task-meta">Done: ${c.done} ${cUnit.label}</div>
                    </div></li>`;
            });

            pTasks.forEach(t => {
                let effR = t.effR || 1;
                let strat = t.specific_qs ? "RIGID" : (effR > 1 ? `1 in ${effR}` : "ALL");
                let sqs_str = t.specific_qs ? t.specific_qs.join(',') : '';
                let isOneShot = t.total_qs === 1 && !t.specific_qs;
                let kind = getResourceKind(t.filename);
                let unit = getResourceUnit(t.filename);
                let hasProgressToday = !!doneMap[`${t.chapter}|${t.section.trim()}`];
                let actionBtn = viewingDayIdx === currentActualDayIdx
                    ? `<div class="task-action" onclick="openLogModal('${subj}','${t.chapter}','${t.section}',${t.rem_raw},'${t.filename}',${t.qs},${effR}, '${sqs_str}', ${isOneShot})">${hasProgressToday ? 'CONTINUE ▶' : 'LOG ▶'}</div>`
                    : '';
                if (kind === 'youtube') {
                    let ytRow = (appData.resources[t.filename] || []).find(r => r.ch === t.chapter && r.sec === t.section);
                    if (ytRow && ytRow.yt) {
                        let startAt = Math.max(0, ytRow.ytWatchedSec != null ? ytRow.ytWatchedSec : ytRow.d * 60);
                        actionBtn = `<div style="display:flex; flex-direction:column; gap:6px; align-items:flex-end;">
                            <a href="https://www.youtube.com/watch?v=${ytRow.yt}&t=${startAt}s" target="_blank" rel="noopener" class="task-action" style="text-decoration:none; display:inline-flex; align-items:center; gap:5px;">${YOUTUBE_ICON_SVG} Watch</a>
                            ${actionBtn}
                        </div>`;
                    }
                }
                let formatQs = (arr) => { if (!arr || !arr.length) return ''; let res = [], s = arr[0], e = arr[0]; for (let i = 1; i < arr.length; i++) { if (arr[i] === e + 1) e = arr[i]; else { res.push(s === e ? s : (s === e - 1 ? s + ', ' + e : s + '-' + e)); s = e = arr[i]; } } res.push(s === e ? s : (s === e - 1 ? s + ', ' + e : s + '-' + e)); return res.join(', '); };
                let disp_qs = t.specific_qs ? formatQs(t.specific_qs) : '';
                let taskPoints = t.qs; // 1 unit (Q/min/pt) always equals 1 point
                let rewardHtml = `<span style="display:inline-flex; align-items:center; gap:4px; margin-left:6px; color:#fbbf24; font-weight:700;">${taskPointsIconHtml(taskPoints)} +${taskPoints} pts</span>`;
                let metaTxt = '';
                if (isOneShot) {
                    // Elegant Badge — this exercise has exactly 1 question total, not just 1 remaining
                    metaTxt = `<span style="display:inline-flex; align-items:center; gap:5px; background:var(--accent-dim); color:var(--accent); padding:3px 8px; border-radius:100px; border:1px solid var(--border-accent); font-family:'Bricolage Grotesque',sans-serif; font-size:0.6rem; font-weight:800; letter-spacing:0.5px; text-transform:uppercase; box-shadow: 0 0 10px rgba(245, 166, 35, 0.1);">🎯 ONE-SHOT</span>${rewardHtml}`;
                } else if (kind === 'reading' && !t.specific_qs) {
                    // Reading books show a page range instead of a raw count
                    let readRow = (appData.resources[t.filename] || []).find(r => r.ch === t.chapter && r.sec === t.section);
                    let alreadyRead = readRow ? readRow.d : 0;
                    metaTxt = `Read pg ${alreadyRead + 1}–${alreadyRead + t.qs} of ${t.total_qs}${rewardHtml}`;
                } else if (unit === 'min' && !t.specific_qs) {
                    // Time-based tasks are always assigned in full, but can be
                    // logged across multiple sessions — show progress so far.
                    let alreadyToday = doneMap[`${t.chapter}|${t.section.trim()}`] || 0;
                    let progressNote = alreadyToday > 0 ? `<span style="color:var(--success-bright); font-weight:700;"> · +${alreadyToday} logged today</span>` : '';
                    metaTxt = `${unitLabel(t.qs, t.filename)}${progressNote}${rewardHtml}`;
                } else {
                    // Normal Text — unit-aware (Questions / Minutes / Points)
                    metaTxt = t.specific_qs ? `<div style="margin-bottom:2px;">Target: ${unitLabel(t.qs, t.filename)} &nbsp;·&nbsp; Rem: ${t.rem_raw}${rewardHtml}</div><div style="white-space:normal; line-height:1.5; margin:4px 0; word-break:break-word; font-size:0.75rem; color:var(--text-muted);"><span style="color:var(--accent); font-weight:800; letter-spacing:0.5px;">[${disp_qs}]</span></div>` : `Target: ${unitLabel(t.qs, t.filename)} &nbsp;·&nbsp; Rem: ${t.rem_raw}${rewardHtml}`;
                }
                let dlBadge = '';
                if (t.deadline) {
                    let daysLeft = resolveDeadlineDayIdx(t.deadline) - currentActualDayIdx;
                    let dlColor = daysLeft < 0 ? 'var(--danger)' : (daysLeft <= 2 ? '#f5a623' : 'var(--text-muted)');
                    let dlLabel = daysLeft < 0 ? 'OVERDUE' : (daysLeft === 0 ? 'DUE TODAY' : `${daysLeft}d left`);
                    dlBadge = `<span style="margin-left:6px; color:${dlColor}; font-weight:700;" title="Exercise deadline: ${t.deadline}">⏰ ${dlLabel}</span>`;
                }
                cardHtml += `<li class="task-item">
                    <div class="task-info">
                        <div class="task-title">▶ [${strat}] ${t.chapter} — ${t.section}${dlBadge}</div>
                        <div class="task-meta">${metaTxt}</div>
                    </div>${actionBtn}</li>`;
                sQs += t.qs; tQs += t.qs;
            });

            cardHtml += `</ul>
                <div style="padding:5px 13px 6px; border-top:1px solid var(--border); font-size:0.67rem; color:var(--text-subtle); display:flex; justify-content:space-between; font-family:'JetBrains Mono','Noto Color Emoji',monospace;">
                    <span>TARGET</span><span style="color:var(--sc);">${sQs + sDone} pts &nbsp;·&nbsp; done: ${sDone}</span>
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

            // Calculate percentage safely, defaulting to 0 if nothing is assigned
            let __todayPctInfo = __todayAssigned > 0 ? Math.round((__todayDone / __todayAssigned) * 100) : 0;

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
        document.getElementById('combat-bar-fixed').innerHTML = summaryCard;
        updateFabVisibility(_getActiveTabId());

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
// CUSTOM DIALOG SYSTEM (sleek replacements for native alert/confirm/prompt)
// ==========================================
function tdxDialog(opts) {
    return new Promise(resolve => {
        let modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.display = 'flex';
        let icon = opts.icon || (opts.kind === 'confirm' ? '❓' : opts.kind === 'prompt' ? '✏️' : 'ℹ️');
        let title = (opts.title || '').replace(/</g, '&lt;');
        let message = (opts.message || '').replace(/</g, '&lt;');
        let danger = opts.danger ? 'btn-danger' : 'btn-primary';
        let showInput = opts.kind === 'prompt';
        let showCancel = opts.kind !== 'alert';
        let safeDefault = (opts.defaultValue != null ? String(opts.defaultValue) : '').replace(/"/g, '&quot;');
        modal.innerHTML = `
            <div class="modal" style="max-width:420px;">
                <h2>${icon} ${title}</h2>
                <p style="font-size:0.88rem; color:var(--text-muted); white-space:pre-line; line-height:1.5; margin:0 0 ${showInput ? '4px' : '18px'};">${message}</p>
                ${showInput ? `<input type="${opts.inputType || 'text'}" id="tdx-dialog-input" placeholder="${(opts.placeholder || '').replace(/"/g, '&quot;')}" value="${safeDefault}" style="font-size:1.1rem;">` : ''}
                <div class="modal-buttons">
                    ${showCancel ? `<button class="btn" id="tdx-dialog-cancel">${opts.cancelText || 'Cancel'}</button>` : ''}
                    <button class="btn ${danger}" id="tdx-dialog-ok">${opts.confirmText || 'OK'}</button>
                </div>
            </div>`;
        document.body.appendChild(modal);
        let input = modal.querySelector('#tdx-dialog-input');
        let cancelVal = opts.kind === 'prompt' ? null : false;
        let cleanup = (val) => { modal.remove(); resolve(val); };
        modal.addEventListener('click', e => { if (e.target === modal) cleanup(cancelVal); });
        let cancelBtn = modal.querySelector('#tdx-dialog-cancel');
        if (cancelBtn) cancelBtn.onclick = () => cleanup(cancelVal);
        modal.querySelector('#tdx-dialog-ok').onclick = () => cleanup(opts.kind === 'prompt' ? input.value : true);
        if (input) {
            setTimeout(() => input.focus(), 50);
            input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); cleanup(input.value); } });
        }
    });
}
function tdxAlert(message, opts = {}) {
    return tdxDialog({ kind: 'alert', message, title: opts.title || 'Notice', icon: opts.icon, confirmText: opts.confirmText || 'OK' });
}
function tdxConfirm(message, opts = {}) {
    return tdxDialog({ kind: 'confirm', message, title: opts.title || 'Are you sure?', icon: opts.icon, confirmText: opts.confirmText || 'Confirm', cancelText: opts.cancelText || 'Cancel', danger: opts.danger });
}
function tdxPrompt(message, opts = {}) {
    return tdxDialog({ kind: 'prompt', message, title: opts.title || 'Input Required', icon: opts.icon, confirmText: opts.confirmText || 'OK', cancelText: opts.cancelText || 'Cancel', placeholder: opts.placeholder, defaultValue: opts.defaultValue, inputType: opts.inputType });
}
window.tdxAlert = tdxAlert; window.tdxConfirm = tdxConfirm; window.tdxPrompt = tdxPrompt;

// ==========================================
// LOGGING SYSTEM
// ==========================================
async function openLogModal(subj, ch, sec, max, filename, target, effR, oc_qs_str, isOneShot) {
    modalContext = { subj, ch, sec, max, filename, effR: effR || 1, oc_qs_str };

    // Only 1 question remains for this exercise — never instant-complete on a
    // single click. Confirm first, with special copy when it's a true One-Shot
    // (the exercise's total question count is 1, not just its remaining count).
    if (max === 1 && !oc_qs_str) {
        document.getElementById('modal-input').value = "1";
        document.getElementById('modal-porosity-row').style.display = 'none';
        let confirmed = isOneShot
            ? await tdxConfirm(`Are you sure you want to strike this One-Shot milestone?\n\n${ch} — ${sec}`, { title: '🎯 One-Shot Milestone', icon: '🎯', confirmText: 'Strike It!' })
            : await tdxConfirm(`Log the final question for:\n${ch} — ${sec}`, { title: 'Confirm Log', icon: '✅', confirmText: 'Log It' });
        if (confirmed) submitModal();
        return;
    }

    let unit = getResourceUnit(filename);
    let uMeta = UNIT_META[unit] || UNIT_META.q;

    // YouTube videos: enter your current timestamp — the delta since last
    // time is auto-computed, so partial watches are as natural as full ones.
    // The task stays a "persistent" logger for the day until fully watched.
    if (unit === 'min' && !oc_qs_str && getResourceKind(filename) === 'youtube') {
        let result = await openYoutubeLogModal(ch, sec, filename, max);
        if (!result) return;
        let row = (appData.resources[filename] || []).find(r => r.ch === ch && r.sec === sec);
        // Captured BEFORE mutating, so undoLastLog() can restore the exact
        // pre-log watched-position later — not just the row.d/completions.
        modalContext.prevYtWatchedSec = row ? (row.ytWatchedSec != null ? row.ytWatchedSec : row.d * 60) : null;
        if (row) row.ytWatchedSec = result.newWatchedSec;
        document.getElementById('modal-input').value = String(result.deltaMin);
        document.getElementById('modal-porosity-row').style.display = 'none';
        submitModal();
        return;
    }

    // Other time-based (minutes) resources: log any amount up to what's left
    // today. Logging less than the full block keeps it active/loggable for
    // the rest of the day, rather than forcing one all-or-nothing session.
    if (unit === 'min' && !oc_qs_str) {
        document.getElementById('modal-title').innerText = "Log Progress";
        document.getElementById('modal-desc').innerText = `How many minutes did you complete for '${ch} - ${sec}'? (Up to ${max} min left today)`;
        document.getElementById('modal-input').placeholder = "Amount (min)";
        document.getElementById('modal-input').value = "";
        document.getElementById('modal-input').max = max;
        document.getElementById('modal-input').style.display = 'block';
        document.getElementById('modal-porosity-row').style.display = 'none';
        let dynContainer = document.getElementById('modal-dynamic-content');
        if (dynContainer) dynContainer.style.display = 'none';
        document.getElementById('input-modal').style.display = "flex";
        document.getElementById('modal-input').focus();
        return;
    }

    document.getElementById('modal-title').innerText = "Log Combat";
    document.getElementById('modal-desc').innerText = `How much did you complete for '${ch} - ${sec}'? (Target: ${target || 'Custom'} ${uMeta.label}, Max Rem: ${max})`;
    document.getElementById('modal-input').placeholder = `Amount (${uMeta.label})`;
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

function _fmtHMS(totalSec) {
    totalSec = Math.max(0, Math.round(totalSec));
    let h = Math.floor(totalSec / 3600), m = Math.floor((totalSec % 3600) / 60), s = totalSec % 60;
    return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`;
}

// Timestamp-based watch logging: shows where the user left off and where the
// video ends, and lets them enter their *current* position (hh:mm:ss) — the
// delta since last time is computed automatically, so they never have to do
// the subtraction themselves. Resolves { newWatchedSec, deltaMin } or null.
function openYoutubeLogModal(ch, sec, filename, maxToday) {
    return new Promise(resolve => {
        let row = (appData.resources[filename] || []).find(r => r.ch === ch && r.sec === sec);
        if (!row) { resolve(null); return; }
        let totalSec = row.ytSec || row.t * 60;
        let watchedSec = row.ytWatchedSec != null ? row.ytWatchedSec : row.d * 60;
        let useHours = totalSec >= 3600;
        let alreadyFull = watchedSec >= totalSec;
        let hasQuotaLeft = (maxToday || 0) > 0;

        let modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal" style="max-width:420px;">
                <h2>▶️ Log Watch Progress</h2>
                <p style="font-size:0.85rem; color:var(--text-muted);">${ch} — ${sec}<br>You're at <strong style="color:var(--accent);">${_fmtHMS(watchedSec)}</strong> of <strong>${_fmtHMS(totalSec)}</strong>.</p>
                <div style="font-size:0.65rem; color:var(--text-subtle); text-transform:uppercase; letter-spacing:1px; font-weight:700; text-align:center; margin-top:10px;">Your current timestamp</div>
                <div style="display:flex; gap:6px; align-items:center; justify-content:center; margin:10px 0;">
                    ${useHours ? `<input type="number" id="yt-h" min="0" value="${Math.floor(watchedSec / 3600)}" style="width:56px; margin:0; text-align:center; font-size:1.3rem; padding:10px 4px;"><span style="font-weight:800;">:</span>` : ''}
                    <input type="number" id="yt-m" min="0" max="59" value="${Math.floor((watchedSec % 3600) / 60)}" style="width:56px; margin:0; text-align:center; font-size:1.3rem; padding:10px 4px;">
                    <span style="font-weight:800;">:</span>
                    <input type="number" id="yt-s" min="0" max="59" value="${Math.floor(watchedSec % 60)}" style="width:56px; margin:0; text-align:center; font-size:1.3rem; padding:10px 4px;">
                </div>
                <div id="yt-delta-note" style="font-size:0.75rem; color:var(--text-muted); text-align:center; margin-bottom:14px; min-height:1.2em;"></div>
                <div class="modal-buttons">
                    <button class="btn" id="yt-full">${alreadyFull ? '✔ Already Fully Watched' : '✔ Fully Watched'}</button>
                    <button class="btn btn-primary" id="yt-log">Log Progress</button>
                </div>
            </div>`;
        document.body.appendChild(modal);

        let hEl = modal.querySelector('#yt-h'), mEl = modal.querySelector('#yt-m'), sEl = modal.querySelector('#yt-s');
        let noteEl = modal.querySelector('#yt-delta-note');
        function currentSec() {
            return (hEl ? (parseInt(hEl.value) || 0) : 0) * 3600 + (parseInt(mEl.value) || 0) * 60 + (parseInt(sEl.value) || 0);
        }
        function updateNote() {
            let delta = currentSec() - watchedSec;
            if (delta > 0) noteEl.innerHTML = `+${_fmtHMS(delta)} watched &nbsp;·&nbsp; <span style="color:#fbbf24; font-weight:700;">+${Math.min(Math.max(1, Math.round(delta / 60)), maxToday || Infinity)} pts</span>`;
            else if (delta === 0) noteEl.textContent = alreadyFull ? 'Already fully watched' : 'No new progress yet';
            else noteEl.textContent = "That's before where you left off";
        }
        [hEl, mEl, sEl].forEach(el => el && el.addEventListener('input', updateNote));
        updateNote();

        let cleanup = (result) => { modal.remove(); resolve(result); };
        modal.addEventListener('click', e => { if (e.target === modal) cleanup(null); });

        // "Fully Watched" — only awards points for genuinely new watch time.
        // If the video was already fully watched (no new seconds to credit)
        // but today's task still has quota left (e.g. a multi-day catch-up),
        // it directly completes today's remaining quota in one click instead
        // of doing nothing or fabricating a phantom +1 forever.
        modal.querySelector('#yt-full').onclick = () => {
            let deltaSec = totalSec - watchedSec;
            if (deltaSec <= 0) {
                if (hasQuotaLeft) cleanup({ newWatchedSec: totalSec, deltaMin: maxToday });
                else tdxAlert("You've already fully watched this video — nothing new to log.");
                return;
            }
            let rawMin = Math.max(1, Math.round(deltaSec / 60));
            let creditMin = hasQuotaLeft ? Math.min(rawMin, maxToday) : rawMin;
            let newWatchedSec = creditMin >= rawMin ? totalSec : watchedSec + creditMin * 60;
            cleanup({ newWatchedSec, deltaMin: creditMin });
        };
        modal.querySelector('#yt-log').onclick = () => {
            let newSec = currentSec();
            let delta = newSec - watchedSec;
            if (newSec > totalSec) { tdxAlert(`This video is only ${_fmtHMS(totalSec)} long.`); return; }
            if (delta <= 0) { tdxAlert(alreadyFull ? "You've already fully watched this video." : 'Enter a timestamp after where you left off.'); return; }
            let rawMin = Math.max(1, Math.round(delta / 60));
            let creditMin = hasQuotaLeft ? Math.min(rawMin, maxToday) : rawMin;
            let newWatchedSec = creditMin >= rawMin ? newSec : watchedSec + creditMin * 60;
            cleanup({ newWatchedSec, deltaMin: creditMin });
        };
    });
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
        if (val === 0) { tdxAlert("Please tick at least one question."); return; }
    } else {
        val = parseInt(document.getElementById('modal-input').value);
        if (isNaN(val) || val <= 0) { tdxAlert("Enter a valid positive number."); return; }
        if (val > modalContext.max) { tdxAlert(`Cannot exceed max remaining (${modalContext.max}).`); return; }
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
    let logUnit = getResourceUnit(modalContext.filename);
    let dailyUnitTotalBefore = (appData.completions[ds] || [])
        .filter(c => _findResourceUnitForChSec(c.chapter, c.section) === logUnit)
        .reduce((s, c) => s + c.done, 0);

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

    // Add to Undo Stack. prevYtWatchedSec only exists on the modalContext for
    // YouTube logs — omit the key entirely otherwise (never push it as an
    // explicit `undefined`, which Firebase's set() rejects anywhere in the
    // payload and would silently brick every future save).
    let undoEntry = { dayIdx: currentActualDayIdx, subj: modalContext.subj, ch: modalContext.ch, sec: modalContext.sec, filename: modalContext.filename, val: val, skipped: skippedNow, oc_done: specificDone };
    if (modalContext.prevYtWatchedSec != null) undoEntry.prevYtWatchedSec = modalContext.prevYtWatchedSec;
    undoStack.push(undoEntry);

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
    let dailyUnitTotalAfter = dailyUnitTotalBefore + val;
    let newBadges = getNewlyEarnedBadges(dailyTotalBefore, dailyTotalAfter, wasFirstLogToday, isPerfectDay, isOverdrive, logUnit, dailyUnitTotalBefore, dailyUnitTotalAfter);

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
    let uMeta = UNIT_META[getResourceUnit(ctx.filename)] || UNIT_META.q;
    let verb = uMeta === UNIT_META.min ? 'watched/worked' : uMeta === UNIT_META.pages ? 'read' : 'solved';
    _triumphSlides = [
        {
            type: 'stat', icon: '🗓️', label: "Today's Combat",
            number: `+${fmt(stats.todayPct)}%`,
            desc: `You ${verb} <strong>${val} ${uMeta.label}</strong> out of today's total assigned combat.`,
            sub: `Today total: ${stats.todayTotal} pts`, pct: stats.todayPct,
            glowColor: '#f5a623'
        },
        {
            type: 'stat', icon: '📖', label: 'Chapter Progress',
            number: `+${fmt(stats.chapPct)}%`,
            desc: `<strong>${ctx.ch}</strong> — <em>${ctx.sec}</em> moved forward.`,
            sub: `Chapter total: ${stats.chapTotal} pts`, pct: stats.chapPct,
            glowColor: '#38bdf8'
        },
        {
            type: 'stat', icon: '🧪', label: 'Subject Progress',
            number: `+${fmt(stats.subjPct)}%`,
            desc: `<strong>${ctx.subj}</strong> inched closer to completion.`,
            sub: `Subject total: ${stats.subjTotal} pts`, pct: stats.subjPct,
            glowColor: RES_COLORS[ctx.filename] || '#f5a623'
        },
        {
            type: 'stat', icon: '🏆', label: 'Total Syllabus',
            number: `+${fmt(stats.grandPct)}%`,
            desc: `Your overall syllabus coverage grew by this much.`,
            sub: `Grand total: ${stats.grandTotal} pts`, pct: stats.grandPct,
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
    _showTriumphFlora(Math.max(1, Math.round(val)));
}

// Seeds the orbiting flora canvas with the points just awarded — a unique
// generative pattern per value, same engine as the badge flowers. The canvas
// is recreated fresh each time: makeBadgeFlower scales canvas.width in place
// by devicePixelRatio, so re-running it on a *reused* element compounds that
// scale-up on every call.
let _triumphFloraStop = null;
function _showTriumphFlora(points) {
    let ring = document.getElementById('triumph-flora-ring');
    let orbit = document.getElementById('triumph-flora-orbit');
    let card = document.querySelector('#triumph-overlay .triumph-card');
    if (!ring || !orbit || !window.makeAnimatedBadgeFlower) return;
    if (_triumphFloraStop) { _triumphFloraStop(); _triumphFloraStop = null; }
    ring.innerHTML = `<canvas id="triumph-flora-canvas" class="triumph-flora-dot"></canvas>`;
    orbit.classList.add('active');
    setTimeout(() => { _triumphFloraStop = makeAnimatedBadgeFlower('triumph-flora-canvas', String(points), card); }, 0);
}
function _hideTriumphFlora() {
    if (_triumphFloraStop) { _triumphFloraStop(); _triumphFloraStop = null; }
    let orbit = document.getElementById('triumph-flora-orbit');
    if (orbit) orbit.classList.remove('active');
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
                            +${n} pts<br><span style="font-size:0.6rem;font-weight:600;opacity:0.7;">cap→${newCap}</span>
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
        _hideTriumphFlora();
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
    _hideTriumphFlora(); // this reuses #triumph-overlay for a non-celebration purpose
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
        ? `<div style="font-size:0.8rem;color:var(--text-muted);line-height:1.5;margin-bottom:14px;">You have <strong style="color:#a78bfa;">${remaining} pts</strong> of capacity left today. Pick a task to assign.</div>`
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
            <div id="ae-qty-label" style="font-size:0.62rem;color:#a78bfa;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Amount to assign</div>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                <input type="number" id="ae-qty" min="1" placeholder="e.g. 25"
                    style="flex:1;min-width:80px;padding:10px;border-radius:8px;border:1px solid rgba(168,139,250,0.4);background:var(--bg);color:var(--text);font-family:'JetBrains Mono','Noto Color Emoji',monospace;font-size:1.1rem;text-align:center;">
                <div id="ae-qty-chips" style="display:flex;gap:5px;flex-wrap:wrap;">
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
            <span style="font-size:0.68rem;color:var(--text-muted);font-family:'JetBrains Mono','Noto Color Emoji',monospace;white-space:nowrap;">Rem: ${unitLabel(t.rem_raw, t.filename)}</span>
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
    let task = tasks[idx];
    _aeCtx.task = task;
    let u = UNIT_META[getResourceUnit(task.filename)] || UNIT_META.q;
    let qtyWrap = document.getElementById('ae-qty-wrap');
    qtyWrap.style.display = 'block';
    let qtyInput = document.getElementById('ae-qty');
    qtyInput.max = task.rem_raw;
    document.getElementById('ae-qty-label').textContent = `${u.full} to assign`;
    if (task.atomic) {
        // Time-based tasks are injected in full, same as regular scheduling — no partial amount.
        qtyInput.value = task.rem_raw;
        qtyInput.readOnly = true;
        document.getElementById('ae-qty-chips').style.display = 'none';
        document.getElementById('ae-rem-note').textContent = `Time-based — injects the full ${task.rem_raw} ${u.label}.`;
    } else {
        qtyInput.value = '';
        qtyInput.readOnly = false;
        document.getElementById('ae-qty-chips').style.display = 'flex';
        document.getElementById('ae-rem-note').textContent = `Max: ${task.rem_raw} ${u.label} remaining`;
    }
    qtyInput.focus();
}

function _aeConfirm() {
    let qty = parseInt(document.getElementById('ae-qty').value);
    let task = _aeCtx.task;
    if (!task) { tdxAlert('Select a section first.'); return; }
    let u = UNIT_META[getResourceUnit(task.filename)] || UNIT_META.q;
    if (isNaN(qty) || qty <= 0) { tdxAlert(`Enter a valid ${u.full.toLowerCase()} amount.`); return; }
    if (qty > task.rem_raw) { tdxAlert(`Max remaining for this section is ${task.rem_raw}.`); return; }

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
    _hideTriumphFlora();
    document.getElementById('triumph-btn').onclick = triumphNext;
    if (!skipRender) renderDay();
}

// closeWantMore still used by triumph carousel autotarget_boost close
function closeWantMore(skipRender) {
    document.getElementById('triumph-overlay').classList.remove('open');
    _hideTriumphFlora();
    document.getElementById('triumph-btn').onclick = triumphNext;
    if (!skipRender) renderDay();
}


async function undoLastLog() {
    if (undoStack.length === 0) { tdxAlert("Nothing to undo."); return; }
    let action = undoStack[undoStack.length - 1]; // peek, don't pop yet
    let dayStr = getDateStr(action.dayIdx);
    let confirmed = await tdxConfirm(`📖 ${action.ch}\n   ${action.sec}\n\n✖ Remove ${unitLabel(action.val, action.filename)} logged on ${dayStr}`, { title: 'Undo Last Log', icon: '↩️', confirmText: 'Undo' });
    if (!confirmed) return;
    undoStack.pop();

    // Reverse Resource
    let row = appData.resources[action.filename].find(r => r.ch === action.ch && r.sec === action.sec);
    if (row) {
        row.d = Math.max(0, row.d - action.val);
        row.s = Math.max(0, (row.s || 0) - (action.skipped || 0));
        // YouTube rows also track an absolute watched-position separate from
        // row.d/completions — without restoring it, the video would still
        // "remember" the un-done progress and refuse to let it be re-logged.
        if (action.prevYtWatchedSec != null) row.ytWatchedSec = action.prevYtWatchedSec;
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

window.renderCustomAgentStep = function () {
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
                            <div class="task-meta">Rem: ${unitLabel(t.rem_raw, t.filename)}</div>
                        </div>
                        <div class="task-action" onclick="openLogModal('${s}', '${c.replace(/'/g, "\\'")}', '${t.section.replace(/'/g, "\\'")}', ${t.rem_raw}, '${t.filename}', 0, 1, '${oc_qs_str}', ${t.total_qs === 1 && !oc_qs_str})">LOG ▶</div>
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

window.advanceCustomAgent = function (targetStep) {
    if (targetStep === 1) {
        let val = document.getElementById('custom-agent-subj').value;
        if (!val) { tdxAlert("Commander, you must specify a division."); return; }
        customAgentState.subj = val;
    } else if (targetStep === 2) {
        let val = document.getElementById('custom-agent-chap').value;
        if (!val) { tdxAlert("Commander, you must specify a target chapter."); return; }
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

    const statsStrip = `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:6px;">${[{ v: strk, l: 'Streak', c: '#fb923c', i: '🔥' }, { v: daysLeft, l: 'Days Left', c: '#f5a623', i: '🗓️' }, { v: totalQsLogged, l: 'Total Pts', c: '#a78bfa', i: '⚡' }, { v: todayDone, l: 'Today', c: '#38bdf8', i: '🎯' }].map(s => `<div style="background:color-mix(in srgb,${s.c} 8%,var(--surface));border:1px solid color-mix(in srgb,${s.c} 20%,transparent);border-radius:10px;padding:6px 4px;text-align:center;"><div style="font-size:0.88rem;font-weight:800;background:linear-gradient(135deg,${s.c},color-mix(in srgb,${s.c} 60%,#fff 40%));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${s.v}</div><div style="font-size:0.44rem;color:var(--text-subtle);text-transform:uppercase;letter-spacing:0.5px;font-family:'Bricolage Grotesque',sans-serif;font-weight:700;">${s.l} ${s.i}</div></div>`).join('')}</div><div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:7px 10px;margin-bottom:6px;"><div style="font-size:0.44rem;letter-spacing:2px;text-transform:uppercase;color:var(--text-subtle);font-family:'Bricolage Grotesque',sans-serif;font-weight:700;margin-bottom:4px;">📈 7-Day Velocity</div><div style="display:flex;align-items:flex-end;gap:3px;height:38px;">${weekBars}</div></div>`;

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
    let html = `<div style="display:flex; justify-content:space-between; font-weight:bold; color:var(--text-muted); padding-bottom:10px; border-bottom:1px solid var(--border); font-size:0.78rem; text-transform:uppercase; letter-spacing:0.5px;"><span>Subject</span><span>Pts Logged</span></div>`;
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
            <div style="font-size:0.63rem; color:var(--text-muted); text-transform:uppercase; letter-spacing:1px;">Days Left 🗓️</div>
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
                    <div style="font-size:0.55rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.5px;">Total Pts</div>
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
                        <span style="font-size:0.72rem; font-weight:700; color:var(--accent);">${dayTotal} pts</span>
                    </div>`;
                dayComps.forEach(c => {
                    let cu = UNIT_META[_findResourceUnitForChSec(c.chapter, c.section)] || UNIT_META.q;
                    logHtml += `<div style="font-size:0.72rem; padding:2px 0; border-top:1px solid var(--border); display:flex; justify-content:space-between;">
                        <span style="color:var(--text-muted); flex:1; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-right:8px;">${c.chapter} · ${c.section}</span>
                        <span style="font-weight:600; white-space:nowrap;">${c.done}${cu.short}</span>
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
    // #editor-file is a hidden state holder now (search+list replaced the old
    // <select> — see editorSelectResource), so there are no <option>s to build.
    renderEditorResourceList();
    populateSubjectDropdowns();
}

let agentState = { step: 0, kind: 'exercise', name: '', subj: '', blueprint: 'Exercise 1: 50\nExercise 2: 30\nPYQs', chapters: '', pages: '' };

window.openAddResourceForm = function () {
    // Hide left-pane distractions
    document.getElementById('manage-subjects-form').style.display = 'none';
    let oldForm = document.getElementById('add-resource-form');
    if (oldForm) oldForm.style.display = 'none';

    // Deselect current file
    document.getElementById('editor-file').value = '';
    document.getElementById('editor-add-chapter-area').innerHTML = '';
    _updateEditingIndicator();
    renderEditorResourceList();

    // Initialize Agent with explicit newline example
    agentState = { step: 0, kind: 'exercise', name: '', subj: '', blueprint: 'Exercise 1: 50\nExercise 2: 30\nPYQs', chapters: '', pages: '' };
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
            <button class="btn btn-primary" style="margin:0; width:auto; padding:6px 14px; font-size:0.75rem;" onclick="switchTab('library')">🏛️ Browse Library</button>
            <button class="ed-del-btn" style="margin:0; padding:6px 14px;" onclick="renderEditor()">Abort Task</button>
        </div>
    </div>`;

    html += `<div id="agent-chat-area" style="flex:1; overflow-y:auto; margin-bottom:20px; display:flex; flex-direction:column; gap:16px; padding-right:10px;">`;

    // Step 0: Kind + Name
    html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem;">
        <strong style="color:var(--text);">[SYSTEM]:</strong> Commander, new intel detected. What kind of asset is this, and what's its codename?
    </div>`;
    if (agentState.step === 0) {
        let isYoutube = agentState.kind === 'youtube';
        html += `<div class="agent-input-row" style="display:flex; flex-direction:column; gap:10px; animation: slideInLeft 0.3s ease;">
            <select id="agent-kind-input" onchange="_agentKindChanged()" style="width:100%; padding:12px; background:var(--bg); color:var(--text); border:1px solid var(--border-accent); border-radius:8px; font-size:0.9rem; outline:none;">
                <option value="exercise" ${agentState.kind === 'exercise' ? 'selected' : ''}>📚 Exercise Book — chapters & sections of questions</option>
                <option value="reading" ${agentState.kind === 'reading' ? 'selected' : ''}>📗 Reading Book — tracked by pages</option>
                <option value="youtube" ${isYoutube ? 'selected' : ''}>▶️ YouTube Playlist — tracked by minutes</option>
            </select>
            ${isYoutube ? `
                <div style="background:rgba(255,0,0,0.06); border:1px dashed rgba(255,0,0,0.3); border-radius:8px; padding:14px; text-align:center;">
                    <div style="font-size:0.83rem; color:var(--text-muted); margin-bottom:10px; line-height:1.5;">YouTube playlists are imported straight from the Library — durations are auto-fetched, so there's nothing to name here first.</div>
                    <button class="btn btn-primary" style="margin:0; width:auto; padding:10px 22px;" onclick="switchTab('library')">🏛️ Go to Library</button>
                </div>
            ` : `
                <div style="display:flex; gap:10px;">
                    <input type="text" id="agent-name-input" placeholder="Asset Name..." style="flex:1; padding:12px; background:var(--bg); color:var(--text); border:1px solid var(--border-accent); border-radius:8px; font-size:1rem; outline:none;" onkeydown="if(event.key==='Enter') advanceAgent(1)">
                    <button class="btn-primary" style="border-radius:8px; padding:0 20px; font-weight:bold; border:none; cursor:pointer;" onclick="advanceAgent(1)">Next ▶</button>
                </div>
            `}
        </div>`;
    } else {
        html += `<div class="user-msg" style="align-self:flex-end; background:var(--accent-dim); color:var(--accent); padding:10px 16px; border-radius:12px 12px 0 12px;">${RESOURCE_KIND_META[agentState.kind]?.icon || '📚'} ${agentState.name}</div>`;
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

    // Step 2: Blueprinting (exercise books) or Page Count (reading books)
    if (agentState.step >= 2 && !agentState.isPreset && agentState.kind === 'reading') {
        html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem; animation: fadeUp 0.3s ease;">
            <strong style="color:var(--text);">[SYSTEM]:</strong> How many total pages does '${agentState.name}' have? You can edit pages-already-read anytime in the Editor.
        </div>`;
        if (agentState.step === 2) {
            html += `<div class="agent-input-row" style="display:flex; gap:10px; animation: slideInLeft 0.3s ease;">
                <input type="number" id="agent-pages-input" min="1" placeholder="e.g. 320" style="flex:1; padding:12px; background:var(--bg); color:var(--text); border:1px solid var(--border-accent); border-radius:8px; font-size:1rem; outline:none;" onkeydown="if(event.key==='Enter') deployReadingBook()">
                <button class="btn-primary" style="border-radius:8px; padding:0 20px; font-weight:bold; border:none; cursor:pointer;" onclick="deployReadingBook()">⚡ Deploy</button>
            </div>`;
        }
    } else if (agentState.step >= 2 && !agentState.isPreset) {
        html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem; animation: fadeUp 0.3s ease;">
            <strong style="color:var(--text);">[SYSTEM]:</strong> Define the blueprint (One section per line).<br>
            <span style="font-size:0.75rem; color:var(--text-subtle); display:block; margin-top:4px;">💡 Tip: Add a colon and a number to set a default target (e.g., <b>Objective: 50</b>). If left blank, it initializes to 1 Q (a One-Shot milestone).<br><strong style="color:var(--text-muted);">Don't worry about getting exact counts right now — every exercise's question count can be changed anytime later in the Editor.</strong></span>
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
        if (!chapVal) { tdxAlert("Provide at least one chapter to deploy."); return; }
        agentState.chapters = chapVal;

        let chapters = agentState.chapters.split('\n').map(c => c.trim()).filter(c => c.length > 0);
        let sectionsRaw = agentState.blueprint.split('\n').map(s => s.trim()).filter(s => s.length > 0);
        if (sectionsRaw.length === 0) sectionsRaw = ['Section A'];

        let sections = sectionsRaw.map(s => {
            let parts = s.split(':');
            return {
                name: parts[0].trim(),
                target: parts.length > 1 ? (parseInt(parts[1].trim()) || 1) : 1
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
    setResourceKind(file, 'exercise');

    applyResourceList(appData.settings);
    saveData();
    needsRebuild = true;
    initEditor();

    document.getElementById('editor-file').value = file;
    renderEditor();
};

window.deployReadingBook = function () {
    let pages = parseInt(document.getElementById('agent-pages-input').value);
    if (isNaN(pages) || pages <= 0) { tdxAlert('Enter a valid page count.'); return; }

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

    appData.resources[file] = [{ ch: name, sec: 'Reading Progress', d: 0, t: pages, s: 0 }];
    appData.settings.customResources.push({ name, file, subj, color });
    setResourceUnit(file, 'pages');
    setResourceKind(file, 'reading');

    applyResourceList(appData.settings);
    saveData();
    needsRebuild = true;
    initEditor();

    document.getElementById('editor-file').value = file;
    renderEditor();
};

// Re-renders step 0 immediately when the kind changes, so picking "YouTube
// Playlist" swaps straight to the Library redirect — no wasted name entry.
window._agentKindChanged = function () {
    let kindEl = document.getElementById('agent-kind-input');
    if (kindEl) agentState.kind = kindEl.value;
    renderAgentStep();
};

window.advanceAgent = function (targetStep) {
    if (targetStep === 1) {
        let kindEl = document.getElementById('agent-kind-input');
        if (kindEl) agentState.kind = kindEl.value;
        if (agentState.kind === 'youtube') { switchTab('library'); return; }
        let val = document.getElementById('agent-name-input').value.trim();
        if (!val) return;
        agentState.name = val;
    } else if (targetStep === 2) {
        let val = document.getElementById('agent-subj-input').value;
        if (!val) { tdxAlert("Add a Subject in the left panel first."); return; }
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
    _updateEditingIndicator();
    renderEditorResourceList();

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
    if (!name) { tdxAlert("Commander, we need a division name to proceed."); return; }

    if (!appData.settings.subjects) appData.settings.subjects = [];
    if (appData.settings.subjects.find(s => s.name.toLowerCase() === name.toLowerCase())) {
        tdxAlert("This division is already deployed!"); return;
    }

    appData.settings.subjects.push({ name, color });
    saveData();
    applySettings(appData.settings);
    renderSubjectManager(); // Instantly refresh the main stage
    populateSubjectDropdowns(); // Keep left-pane dropdowns synced
};

window.editorDeleteSubject = async function (idx) {
    if (!await tdxConfirm("Decommission this division? Resources assigned here will lose their color grouping unless re-assigned.", { title: 'Decommission Division', icon: '⚠️', danger: true, confirmText: 'Decommission' })) return;

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

function renderEditorResourceList(filterQuery) {
    let el = document.getElementById('editor-resource-list');
    if (!el) return;
    let s = appData.settings || {};
    let removed = s.removedDefaults || [];
    let custom = s.customResources || [];
    let searchBox = document.getElementById('editor-resource-search');
    let q = (filterQuery !== undefined ? filterQuery : (searchBox ? searchBox.value : '')).trim().toLowerCase();
    let currentFile = document.getElementById('editor-file')?.value || '';
    let anyMatched = false;
    let html = '';
    DEFAULT_RESOURCES.forEach(r => {
        if (q && !r.name.toLowerCase().includes(q)) return;
        anyMatched = true;
        let isRemoved = removed.includes(r.file);
        let isEditing = r.file === currentFile;
        html += `<div style="display:flex;align-items:center;gap:8px;padding:6px 6px;margin:0 -6px;border-radius:8px;border-bottom:1px solid var(--border);${isEditing ? 'background:var(--accent-dim);' : ''}">
            ${isRemoved
                ? `<button class="ed-add-btn" style="font-size:0.65rem;padding:3px 8px;flex-shrink:0;" onclick="editorRestoreResource('${r.file}')">Restore</button>`
                : `<button class="ed-del-btn" style="font-size:0.65rem;padding:3px 8px;flex-shrink:0;" onclick="editorRemoveDefault('${r.file.replace(/'/g, "\\'")}','${r.name.replace(/'/g, "\\'")}')">✕</button>`
            }
            <div style="width:8px;height:8px;border-radius:50%;background:${DEFAULT_RES_COLORS[r.file]};flex-shrink:0;"></div>
            <span style="flex:1;font-size:0.8rem;font-weight:600;${isRemoved ? 'opacity:0.4;text-decoration:line-through;' : ''}">${r.name}</span>
            ${!isRemoved ? `<button class="ed-add-btn" style="font-size:0.65rem;padding:3px 8px;flex-shrink:0;" title="Edit" onclick="editorSelectResource('${r.file.replace(/'/g, "\\'")}')">✏️</button>` : ''}
        </div>`;
    });
    custom.forEach(r => {
        if (q && !r.name.toLowerCase().includes(q)) return;
        anyMatched = true;
        let isEditing = r.file === currentFile;
        html += `<div style="display:flex;align-items:center;gap:8px;padding:6px 6px;margin:0 -6px;border-radius:8px;border-bottom:1px solid var(--border);${isEditing ? 'background:var(--accent-dim);' : ''}">
            <button class="ed-del-btn" style="font-size:0.65rem;padding:3px 8px;flex-shrink:0;" onclick="editorDeleteResource('${r.file.replace(/'/g, "\\'")}','${r.name.replace(/'/g, "\\'")}')">✕</button>
            <div style="width:8px;height:8px;border-radius:50%;background:${r.color || '#94a3b8'};flex-shrink:0;"></div>
            <span style="flex:1;font-size:0.8rem;font-weight:600;">${r.name}</span>
            <button class="ed-add-btn" style="font-size:0.65rem;padding:3px 8px;flex-shrink:0;" title="Edit" onclick="editorSelectResource('${r.file.replace(/'/g, "\\'")}')">✏️</button>
        </div>`;
    });
    el.innerHTML = html || `<div style="font-size:0.78rem;color:var(--text-muted);">${q ? `No resources match "${filterQuery ?? q}".` : 'No resources.'}</div>`;
}

// Selecting a resource from the (searchable) list above — replaces the old
// plain <select> dropdown. #editor-file stays as a hidden state holder since
// many other functions read/write its value to restore selection.
window.editorSelectResource = function (file) {
    document.getElementById('editor-file').value = file;
    renderEditor();
    renderEditorResourceList();
};

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

    if (!name) { tdxAlert('Commander, we need an Asset Name to proceed.'); return; }
    if (!subj) { tdxAlert('Assign a Subject division first.'); return; }

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
                    // Default target is 1 Q (renders as a One-Shot milestone) — edit anytime in the editor.
                    rows.push({ ch: ch, sec: sec, d: 0, t: 1, s: 0 });
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
        tdxAlert(`Asset Compiled! Deployed ${uniqueChaps} chapters and ${rows.length} tracking sectors to the matrix. Target counts initialized to 1 Q each — edit them anytime in the Editor.`, { title: 'Asset Compiled', icon: '⚡' });
    }
};

// ==========================================
// LIBRARY — featured + community-published resource presets, and YouTube
// playlist import. Replaces the old "+ Load Preset" dropdown.
// ==========================================
// App-provided default key so playlist import works out of the box; users can
// override it with their own in Settings → General if they hit quota limits.
const TDX_DEFAULT_YOUTUBE_API_KEY = "AIzaSyDf4KBxcjn81L3WDBeAOk0XSMcAf3obbiQ";

const FEATURED_PRESETS = [
    { key: "Neeraj Kumar JA.csv", label: "Physical Chem: Neeraj Kumar JA", icon: "⚗️" },
    { key: "OC SKM.csv", label: "Organic Chem: OC SKM", icon: "🧪" },
    { key: "IOC VK Jaiswal.csv", label: "Inorganic Chem: IOC VK Jaiswal", icon: "🧬" },
    { key: "Math (Yellow Book).csv", label: "Math: Yellow Book", icon: "🧮" },
    { key: "Math (Sameer Bansal).csv", label: "Math: Sameer Bansal", icon: "🧮" },
    { key: "Math (Pink Book).csv", label: "Math: Pink Book", icon: "🧮" },
    { key: "Physics (GQB).csv", label: "Physics (GQB)", icon: "🧲" },
];

function libraryPickSubject() {
    return new Promise(resolve => {
        let subjects = appData.settings?.subjects || [];
        let modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal" style="max-width:380px;">
                <h2>🏷️ Assign Subject</h2>
                <p style="font-size:0.85rem; color:var(--text-muted);">Which division should this resource belong to?</p>
                <select id="lib-pick-subj" style="width:100%; padding:12px; background:var(--bg); color:var(--text); border:1.5px solid var(--border); border-radius:16px; font-size:1rem; margin:14px 0;">
                    ${subjects.map(s => `<option value="${s.name.replace(/"/g, '&quot;')}">${s.name}</option>`).join('')}
                </select>
                <div class="modal-buttons">
                    <button class="btn" id="lib-pick-cancel">Cancel</button>
                    <button class="btn btn-primary" id="lib-pick-ok">Add Resource</button>
                </div>
            </div>`;
        document.body.appendChild(modal);
        let cleanup = (val) => { modal.remove(); resolve(val); };
        modal.addEventListener('click', e => { if (e.target === modal) cleanup(null); });
        modal.querySelector('#lib-pick-cancel').onclick = () => cleanup(null);
        modal.querySelector('#lib-pick-ok').onclick = () => cleanup(modal.querySelector('#lib-pick-subj').value);
    });
}

// Deploys a preset's rows into the user's own app as a new custom resource.
// `provenance`, when given, links this local copy back to the community
// preset/version it came from, so the user can later publish edits as a new
// version of the *same* preset instead of a disconnected new one.
window.libraryDeployPreset = async function (name, rows, unit, kind, provenance) {
    if (!(appData.settings?.subjects || []).length) { tdxAlert('Add a Subject first (Editor → 🏷️ Subjects) before adding a resource.'); return; }
    let subj = await libraryPickSubject();
    if (!subj) return;
    let color = (appData.settings.subjects || []).find(s => s.name === subj)?.color || '#94a3b8';
    let file = _nameToFile(name);

    if (!appData.settings.customResources) appData.settings.customResources = [];
    if (appData.settings.customResources.find(r => r.file === file) || DEFAULT_RESOURCE_FILES.has(file)) {
        let base = file.replace('.csv', ''), n = 2;
        while (appData.settings.customResources.find(r => r.file === base + '_' + n + '.csv')) n++;
        file = base + '_' + n + '.csv';
    }

    appData.resources[file] = JSON.parse(JSON.stringify(rows));
    let entry = { name, file, subj, color };
    if (provenance) { entry.sourcePresetId = provenance.presetId; entry.sourceVersionId = provenance.versionId; }
    appData.settings.customResources.push(entry);
    if (unit && unit !== 'q') setResourceUnit(file, unit);
    if (kind && kind !== 'exercise') setResourceKind(file, kind);

    applyResourceList(appData.settings);
    saveData();
    needsRebuild = true;
    tdxAlert(`"${name}" added to your app under ${subj}!`, { title: 'Resource Added', icon: '✅' });
    switchTab('editor');
    initEditor();
    document.getElementById('editor-file').value = file;
    renderEditor();
};

window.libraryDeployFeatured = function (key) {
    let preset = PRESET_DATA[key];
    let meta = FEATURED_PRESETS.find(p => p.key === key);
    if (!preset) { tdxAlert('This preset is unavailable.'); return; }
    window.libraryDeployPreset(meta ? meta.label : key.replace('.csv', ''), preset, 'q', 'exercise');
};

// Adds a specific version of a community preset (defaults to the latest).
window.libraryDeployCommunity = function (id, versionId) {
    let preset = _communityPresetsCache.find(p => p.id === id);
    if (!preset || !preset.versions) return;
    let vId = versionId || preset.latestVersionId || Object.keys(preset.versions)[0];
    let v = preset.versions[vId];
    if (!v) return;
    window.libraryDeployPreset(preset.name, v.rows || [], v.unit || 'q', v.kind || 'exercise', { presetId: id, versionId: vId });
};

// (Per-version browsing now lives inline in libraryOpenCommunityDetail's
// Version History list, rather than a separate picker modal.)

// Publish one of the user's own custom resources to the shared community
// library. If it was itself downloaded from the Library, this appends a new
// version to that same preset (attributed to whoever edited it); otherwise
// it creates a brand-new community preset.
// Shared publish logic — appends a new version if `file` already has
// provenance (sourcePresetId), otherwise starts a brand-new community preset.
// Strips the publisher's own personal progress before it becomes a shared
// preset — otherwise everyone who adds it would inherit however much of the
// video the publisher happened to have watched, which questions they'd
// already ticked off, and the publisher's own campaign-specific per-exercise
// deadline override. Content fields (ch/sec/t and the YouTube id/duration)
// are kept; anything that only describes *this user's* progress resets to
// its natural untouched default instead.
function _naturalizeRowsForPublish(rows) {
    return (rows || []).map(r => {
        let out = { ch: r.ch, sec: r.sec, d: 0, t: r.t, s: 0 };
        if (r.yt != null) { out.yt = r.yt; out.ytSec = r.ytSec; out.ytWatchedSec = 0; }
        return out;
    });
}

async function _libraryPublishFile(file) {
    let meta = (appData.settings?.customResources || []).find(r => r.file === file);
    if (!meta) return;
    let kind = getResourceKind(file);
    let isNew = !meta.sourcePresetId;
    let id = meta.sourcePresetId || ('cp_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6));
    let versionId = 'v_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
    await window.publishCommunityPreset(id, versionId, {
        name: meta.name,
        subjHint: meta.subj || '',
        icon: RESOURCE_KIND_META[kind]?.icon || '📚',
        unit: getResourceUnit(file),
        kind: kind,
        rows: _naturalizeRowsForPublish(appData.resources[file]),
        parentVersionId: meta.sourceVersionId || null,
        isNew: isNew,
    });
    // Track provenance locally so future publishes of this same resource
    // keep appending versions to the same preset instead of forking again.
    meta.sourcePresetId = id;
    meta.sourceVersionId = versionId;
    saveData();
    tdxAlert(isNew ? `"${meta.name}" is now live in the Library!` : `Published a new version of "${meta.name}"!`, { title: 'Published', icon: '📤' });
    renderLibrary();
}

// Called from a resource's Library detail view when the user already has a
// local copy tied to that exact preset — publishes it directly, no picker.
window.libraryPublishExistingTie = function (file) {
    _libraryPublishFile(file);
};

window.libraryOpenPublishPicker = function () {
    let mine = appData.settings?.customResources || [];
    if (!mine.length) { tdxAlert('Create a custom resource first (Editor → ➕ Add Resource), then publish it here.'); return; }
    let modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal" style="max-width:420px;">
            <h2>📤 Publish to Library</h2>
            <p style="font-size:0.85rem; color:var(--text-muted);">Share one of your custom resources with the community. If it came from the Library, this publishes it as a new version of that same preset — otherwise it starts a brand-new one.</p>
            <select id="lib-publish-pick" style="width:100%; padding:12px; background:var(--bg); color:var(--text); border:1.5px solid var(--border); border-radius:16px; font-size:0.95rem; margin:14px 0;">
                ${mine.map(r => `<option value="${r.file.replace(/"/g, '&quot;')}">${r.name}${r.sourcePresetId ? ' (new version)' : ''}</option>`).join('')}
            </select>
            <div class="modal-buttons">
                <button class="btn" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                <button class="btn btn-primary" id="lib-publish-ok">Publish</button>
            </div>
        </div>`;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    modal.querySelector('#lib-publish-ok').onclick = async () => {
        let file = modal.querySelector('#lib-publish-pick').value;
        modal.remove();
        await _libraryPublishFile(file);
    };
};

window.libraryDeleteMyPreset = async function (id) {
    if (!await tdxConfirm('Remove this ENTIRE preset (all versions) from the community library? Anyone who already added a copy keeps it.', { title: 'Remove Preset', icon: '🗑️', confirmText: 'Remove', danger: true })) return;
    await window.deleteCommunityPreset(id);
    renderLibrary();
};

// ── YouTube playlist import ──────────────────────────────────────────────
function libraryExtractPlaylistId(url) {
    let m = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    return m ? m[1] : null;
}

function _parseIso8601Duration(iso) {
    let m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!m) return 0;
    let h = parseInt(m[1] || 0), mi = parseInt(m[2] || 0), s = parseInt(m[3] || 0);
    return h * 3600 + mi * 60 + s;
}

async function fetchYoutubePlaylist(playlistId, apiKey) {
    let videos = [];
    let pageToken = '';
    do {
        let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${encodeURIComponent(playlistId)}&key=${encodeURIComponent(apiKey)}${pageToken ? '&pageToken=' + pageToken : ''}`;
        let res = await fetch(url);
        let data = await res.json();
        if (data.error) throw new Error(data.error.message || 'YouTube API error');
        (data.items || []).forEach(it => {
            let vid = it.snippet?.resourceId?.videoId;
            if (vid) videos.push({ id: vid, title: it.snippet.title });
        });
        pageToken = data.nextPageToken || '';
    } while (pageToken);

    // Fetch durations in batches of 50
    for (let i = 0; i < videos.length; i += 50) {
        let batch = videos.slice(i, i + 50);
        let ids = batch.map(v => v.id).join(',');
        let url = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${encodeURIComponent(apiKey)}`;
        let res = await fetch(url);
        let data = await res.json();
        if (data.error) throw new Error(data.error.message || 'YouTube API error');
        (data.items || []).forEach(item => {
            let v = batch.find(b => b.id === item.id);
            if (v) v.seconds = _parseIso8601Duration(item.contentDetails.duration);
        });
    }
    return videos;
}

window.libraryAddYoutubePlaylist = async function () {
    let apiKey = appData.settings?.youtubeApiKey || TDX_DEFAULT_YOUTUBE_API_KEY;
    let url = await tdxPrompt('Paste a public or unlisted YouTube playlist link:', { title: '▶️ Add YouTube Playlist', icon: '▶️', placeholder: 'https://youtube.com/playlist?list=...' });
    if (!url) return;
    let playlistId = libraryExtractPlaylistId(url);
    if (!playlistId) { tdxAlert("Couldn't find a playlist in that link."); return; }

    let name = await tdxPrompt('Name this resource:', { title: 'Name Your Playlist Resource', defaultValue: 'YouTube Playlist' });
    if (!name) return;

    tdxAlert('Fetching video lengths from YouTube… this may take a few seconds.', { title: 'Fetching', icon: '⏳' });
    try {
        let videos = await fetchYoutubePlaylist(playlistId, apiKey);
        if (!videos.length) { tdxAlert('That playlist has no videos, or is private.'); return; }
        let rows = videos.map(v => ({ ch: name, sec: v.title.slice(0, 120), d: 0, t: Math.max(1, Math.round((v.seconds || 60) / 60)), s: 0, yt: v.id, ytSec: v.seconds || 60, ytWatchedSec: 0 }));
        let totalMin = rows.reduce((s, r) => s + r.t, 0);
        await window.libraryDeployPreset(name, rows, 'min', 'youtube');
        tdxAlert(`Imported ${rows.length} videos — ${totalMin} minutes total, worth ${totalMin} pts.`, { title: 'Playlist Imported', icon: '▶️' });
    } catch (err) {
        console.error(err);
        tdxAlert('Failed to fetch playlist: ' + err.message);
    }
};

let _communityPresetsCache = [];

function _libraryFeaturedCardHtml(p) {
    return `<div class="lib-card" onclick="libraryOpenFeaturedDetail('${p.key.replace(/'/g, "\\'")}')" style="cursor:pointer; background:var(--surface-light); border:1px solid var(--border); border-radius:16px; padding:14px; display:flex; flex-direction:column; gap:8px; transition:border-color 0.15s,transform 0.15s;">
        <div style="font-size:1.6rem;">${p.icon}</div>
        <div style="font-weight:800; font-size:0.85rem; flex:1;">${p.label}</div>
        <div style="display:flex; gap:6px;">
            <button class="btn btn-primary" style="margin:0; padding:8px; font-size:0.95rem; flex:1;" title="Add to my app" onclick="event.stopPropagation(); libraryDeployFeatured('${p.key.replace(/'/g, "\\'")}')">＋</button>
            <button class="btn" style="margin:0; padding:8px; font-size:0.95rem; flex:1;" title="View details" onclick="event.stopPropagation(); libraryOpenFeaturedDetail('${p.key.replace(/'/g, "\\'")}')">👁</button>
        </div>
    </div>`;
}

// Shared attribution summary — used on both the grid card and the detail view.
function _libraryAttribution(p, versions, latest) {
    let counts = {};
    versions.forEach(v => { counts[v.authorName] = (counts[v.authorName] || 0) + 1; });
    let topContributor = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
    let attribution = `Original: ${p.originalAuthorName || 'a TDX user'}`;
    if (latest.authorName && latest.authorName !== p.originalAuthorName) attribution += ` &nbsp;·&nbsp; Latest: ${latest.authorName}`;
    if (topContributor && counts[topContributor] > 1) attribution += ` &nbsp;·&nbsp; Top: ${topContributor} (${counts[topContributor]}v)`;
    return attribution;
}

function _libraryCommunityCardHtml(p) {
    // The write rule allows any signed-in user to manage community presets
    // (it's a shared-trust library, not per-owner locked), so gate delete on
    // "signed in" rather than an exact originalAuthorUid match — the stricter
    // check was fragile and made the button vanish even for real owners.
    let canManage = !!window.appUser;
    let versions = Object.keys(p.versions || {}).map(vId => ({ vId, ...p.versions[vId] }));
    let latest = p.versions?.[p.latestVersionId] || versions[versions.length - 1] || {};
    let rowCount = (latest.rows || []).length;
    let u = UNIT_META[latest.unit] || UNIT_META.q;
    let attribution = _libraryAttribution(p, versions, latest);

    return `<div class="lib-card" onclick="libraryOpenCommunityDetail('${p.id}')" style="cursor:pointer; background:var(--surface-light); border:1px solid var(--border); border-radius:16px; padding:14px; display:flex; flex-direction:column; gap:8px; transition:border-color 0.15s,transform 0.15s;">
        <div style="font-size:1.6rem;">${p.icon || '📚'}</div>
        <div style="font-weight:800; font-size:0.85rem;">${p.name}</div>
        <div style="font-size:0.68rem; color:var(--text-muted);">${u.icon} ${rowCount} sections &nbsp;·&nbsp; ${versions.length} version${versions.length === 1 ? '' : 's'}</div>
        <div style="font-size:0.62rem; color:var(--text-subtle); line-height:1.5;">${attribution}</div>
        <div style="display:flex; gap:6px;">
            <button class="btn btn-primary" style="margin:0; padding:8px; font-size:0.95rem;" title="Add latest version" onclick="event.stopPropagation(); libraryDeployCommunity('${p.id}')">＋</button>
            <button class="btn" style="margin:0; padding:8px; font-size:0.95rem;" title="View details" onclick="event.stopPropagation(); libraryOpenCommunityDetail('${p.id}')">👁</button>
            ${canManage ? `<button class="ed-del-btn" style="margin:0;" title="Delete" onclick="event.stopPropagation(); libraryDeleteMyPreset('${p.id}')">✕</button>` : ''}
        </div>
    </div>`;
}

let _libraryLastQuery = '';

async function renderLibrary() {
    let con = document.getElementById('library-content');
    if (!con) return;

    con.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:10px;">
            <h2 style="margin:0;">🏛️ Library</h2>
            <div style="display:flex; gap:8px;">
                <button class="btn" style="margin:0; width:auto; padding:9px 16px; font-size:0.78rem;" onclick="libraryAddYoutubePlaylist()">▶️ Add YouTube Playlist</button>
                <button class="btn btn-primary" style="margin:0; width:auto; padding:9px 16px; font-size:0.78rem;" onclick="libraryOpenPublishPicker()">📤 Publish Mine</button>
            </div>
        </div>
        <input type="text" id="library-search" placeholder="🔍 Search the Library…" value="${_libraryLastQuery.replace(/"/g, '&quot;')}" oninput="_libraryLastQuery=this.value; _renderLibraryGrids(this.value)"
            style="width:100%; padding:10px 14px; margin-bottom:20px; background:var(--surface-light); color:var(--text); border:1px solid var(--border); border-radius:100px; font-size:0.85rem; outline:none;">

        <div style="font-size:0.7rem; text-transform:uppercase; letter-spacing:1.5px; font-weight:800; color:var(--text-muted); margin-bottom:10px;">⭐ Featured</div>
        <div id="library-featured-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(150px, 1fr)); gap:12px; margin-bottom:28px;"></div>

        <div style="font-size:0.7rem; text-transform:uppercase; letter-spacing:1.5px; font-weight:800; color:var(--text-muted); margin-bottom:10px;">🌐 Community</div>
        <div id="library-community-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(150px, 1fr)); gap:12px;">
            <div style="grid-column:1/-1; text-align:center; color:var(--text-muted); font-size:0.82rem; padding:20px 0;">Loading…</div>
        </div>
    `;

    try {
        _communityPresetsCache = window.fetchCommunityPresets ? await window.fetchCommunityPresets() : [];
    } catch (e) {
        _communityPresetsCache = [];
    }
    _renderLibraryGrids(_libraryLastQuery);
}

// Local, no-refetch re-render — used for both the initial paint and every
// search keystroke, so typing never re-hits Firebase.
function _renderLibraryGrids(query) {
    let q = (query || '').trim().toLowerCase();
    let fGrid = document.getElementById('library-featured-grid');
    let cGrid = document.getElementById('library-community-grid');
    if (!fGrid || !cGrid) return;

    let featured = FEATURED_PRESETS.filter(p => !q || p.label.toLowerCase().includes(q));
    fGrid.innerHTML = featured.length
        ? featured.map(_libraryFeaturedCardHtml).join('')
        : `<div style="grid-column:1/-1; text-align:center; color:var(--text-muted); font-size:0.82rem; padding:10px 0;">No matches.</div>`;

    let community = _communityPresetsCache.filter(p => !q || (p.name || '').toLowerCase().includes(q));
    if (!_communityPresetsCache.length) {
        cGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:var(--text-muted); font-size:0.82rem; padding:20px 0;">No community presets yet — be the first to publish one!</div>`;
    } else if (!community.length) {
        cGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; color:var(--text-muted); font-size:0.82rem; padding:20px 0;">No matches.</div>`;
    } else {
        cGrid.innerHTML = community.map(_libraryCommunityCardHtml).join('');
    }
}

// ── Detail views ─────────────────────────────────────────────────────────
// Same level of detail as the Editor tab's resource view: each chapter
// lists its own exercises/sections with their individual question counts,
// not just a chapter-wide aggregate.
function _libraryChapterSummaryHtml(rows) {
    let chaps = {};
    let order = [];
    (rows || []).forEach(r => {
        if (!chaps[r.ch]) { chaps[r.ch] = []; order.push(r.ch); }
        chaps[r.ch].push(r);
    });
    if (!order.length) return `<div style="font-size:0.8rem; color:var(--text-muted);">No chapters yet.</div>`;
    return `<div style="display:flex; flex-direction:column; gap:8px; max-height:320px; overflow-y:auto;">
        ${order.map(ch => {
        let secs = chaps[ch];
        let total = secs.reduce((s, r) => s + (r.t || 0), 0);
        return `<div style="background:var(--surface); border:1px solid var(--border); border-radius:8px; padding:8px 10px;">
                <div style="display:flex; justify-content:space-between; gap:10px; font-size:0.78rem; font-weight:700; margin-bottom:6px;">
                    <span>${ch}</span>
                    <span style="color:var(--text-muted); font-weight:400; white-space:nowrap;">${secs.length} sections &nbsp;·&nbsp; ${total} total</span>
                </div>
                <div style="display:flex; flex-direction:column; gap:3px;">
                    ${secs.map(s => `<div style="display:flex; justify-content:space-between; gap:8px; font-size:0.7rem; color:var(--text-muted); padding-left:8px;">
                        <span style="flex:1;">${s.sec}</span>
                        <span style="white-space:nowrap; font-family:'JetBrains Mono',monospace;">${s.t ?? 0}</span>
                    </div>`).join('')}
                </div>
            </div>`;
    }).join('')}
    </div>`;
}

// Detail views used to be small centered modals — cramped and impossible to
// give real dashboard structure to. They now render *inside* the Library
// tab itself (replacing the grid, with a Back button), so there's room for
// a proper stat row and — for community presets — a master/detail layout
// where picking a version in the list updates the chapter panel beside it.
function _libraryDetailHeader(icon, name, stats) {
    return `
        <button class="btn" style="margin:0 0 16px; width:auto; padding:8px 14px; font-size:0.78rem;" onclick="renderLibrary()">← Back to Library</button>
        <div style="display:flex; align-items:center; gap:14px; margin-bottom:16px; flex-wrap:wrap;">
            <div style="font-size:2.2rem; width:60px; height:60px; display:flex; align-items:center; justify-content:center; background:var(--surface-light); border:1px solid var(--border); border-radius:16px; flex-shrink:0;">${icon}</div>
            <h2 style="margin:0;">${name}</h2>
        </div>
        <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:22px;">
            ${stats.map(s => `<div style="background:var(--surface-light); border:1px solid var(--border); border-radius:12px; padding:9px 16px; min-width:88px;">
                <div style="font-size:1.05rem; font-weight:800;">${s.value}</div>
                <div style="font-size:0.6rem; text-transform:uppercase; letter-spacing:0.8px; color:var(--text-muted); font-weight:700;">${s.label}</div>
            </div>`).join('')}
        </div>`;
}

window.libraryOpenFeaturedDetail = function (key) {
    let rows = PRESET_DATA[key];
    let meta = FEATURED_PRESETS.find(p => p.key === key);
    if (!rows || !meta) { tdxAlert('This preset is unavailable.'); return; }
    let totalQs = rows.reduce((s, r) => s + (r.t || 0), 0);
    let con = document.getElementById('library-content');
    if (!con) return;
    con.innerHTML = `
        ${_libraryDetailHeader(meta.icon, meta.label, [
        { value: rows.length, label: 'Sections' },
        { value: totalQs, label: 'Total Qs' },
        { value: 'Built-in', label: 'Source' },
    ])}
        <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; font-weight:800; color:var(--text-muted); margin-bottom:8px;">📖 Chapters</div>
        ${_libraryChapterSummaryHtml(rows)}
        <div class="modal-buttons" style="margin-top:20px; justify-content:flex-start;">
            <button class="btn btn-primary" style="width:auto; padding:10px 20px;" onclick="libraryDeployFeatured('${key.replace(/'/g, "\\'")}')">＋ Add to My App</button>
        </div>
    `;
};

// Master/detail: the version list on the left is clickable — picking one
// re-renders this same view with that version's chapters shown on the
// right, instead of a cramped inline expand/collapse per row.
window.libraryOpenCommunityDetail = function (id, selectVId) {
    let p = _communityPresetsCache.find(x => x.id === id);
    if (!p) return;
    let versions = Object.keys(p.versions || {}).map(vId => ({ vId, ...p.versions[vId] })).sort((a, b) => b.createdAt - a.createdAt);
    let latestVId = p.latestVersionId || (versions[0] && versions[0].vId);
    let selVId = selectVId || latestVId;
    let selected = versions.find(v => v.vId === selVId) || versions[0] || {};
    let latest = p.versions?.[latestVId] || versions[0] || {};
    let u = UNIT_META[selected.unit] || UNIT_META.q;
    let kindMeta = RESOURCE_KIND_META[selected.kind] || RESOURCE_KIND_META.exercise;
    let attribution = _libraryAttribution(p, versions, latest);
    // See _libraryCommunityCardHtml for why this is "signed in", not a strict
    // originalAuthorUid match — the write rule doesn't restrict by owner
    // either, and the strict check was making the button vanish unreliably.
    let canManage = !!window.appUser;

    // If the user has a local copy tied to this exact preset, they can publish
    // straight from here without going through the generic picker's dropdown.
    let myTiedResource = (appData.settings?.customResources || []).find(r => r.sourcePresetId === id);

    // Contributors, ranked by version count.
    let contribCounts = {};
    versions.forEach(v => { contribCounts[v.authorName] = (contribCounts[v.authorName] || 0) + 1; });
    let contributors = Object.keys(contribCounts).sort((a, b) => contribCounts[b] - contribCounts[a]);

    let con = document.getElementById('library-content');
    if (!con) return;
    con.innerHTML = `
        ${_libraryDetailHeader(p.icon || '📚', p.name, [
        { value: (selected.rows || []).length, label: 'Sections (shown)' },
        { value: versions.length, label: 'Versions' },
        { value: contributors.length, label: 'Contributors' },
        { value: `${u.icon} ${kindMeta.icon}`, label: `${u.short} · ${kindMeta.label}` },
    ])}
        ${p.subjHint ? `<div style="font-size:0.72rem; color:var(--text-subtle); margin-bottom:6px;">🏷️ Suggested subject: ${p.subjHint}</div>` : ''}
        <div style="font-size:0.68rem; color:var(--text-subtle); margin-bottom:20px;">${attribution}</div>

        <div class="lib-dash-grid" style="display:grid; grid-template-columns:minmax(200px,280px) 1fr; gap:20px; align-items:start;">
            <div>
                <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; font-weight:800; color:var(--text-muted); margin-bottom:8px;">🔀 Version History</div>
                <div style="display:flex; flex-direction:column; gap:6px; max-height:420px; overflow-y:auto;">
                    ${versions.map(v => `
                        <div onclick="libraryOpenCommunityDetail('${id}','${v.vId}')" style="cursor:pointer; background:${v.vId === selVId ? 'var(--accent-dim)' : 'var(--surface-light)'}; border:1px solid ${v.vId === selVId ? 'var(--border-accent)' : 'var(--border)'}; border-radius:10px; padding:9px 11px;">
                            <div style="font-weight:700; font-size:0.8rem;">${v.vId === latestVId ? '⭐ ' : ''}${v.authorName || 'a TDX user'}</div>
                            <div style="font-size:0.64rem; color:var(--text-muted);">${new Date(v.createdAt).toLocaleDateString()} &nbsp;·&nbsp; ${(v.rows || []).length} sections${v.note ? ' &nbsp;·&nbsp; ' + v.note : ''}</div>
                        </div>`).join('')}
                </div>
                <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; font-weight:800; color:var(--text-muted); margin:18px 0 8px;">👥 Contributors</div>
                <div style="display:flex; flex-wrap:wrap; gap:6px;">
                    ${contributors.map(name => `<span style="background:var(--surface); border:1px solid var(--border); border-radius:100px; padding:4px 10px; font-size:0.72rem;">${name === p.originalAuthorName ? '⭐ ' : ''}${name} (${contribCounts[name]}v)</span>`).join('')}
                </div>
            </div>
            <div>
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
                    <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; font-weight:800; color:var(--text-muted);">📖 Chapters — ${selVId === latestVId ? 'Latest' : (selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : 'selected')} version</div>
                    <button class="btn btn-primary" style="margin:0; width:auto; padding:8px 14px; font-size:0.78rem;" onclick="libraryDeployCommunity('${id}','${selVId}')">＋ Add This Version</button>
                </div>
                ${_libraryChapterSummaryHtml(selected.rows)}
                <div class="modal-buttons" style="margin-top:20px; justify-content:flex-start; flex-wrap:wrap;">
                    ${myTiedResource ? `<button class="btn" style="width:auto; padding:9px 16px; color:var(--accent); border-color:var(--border-accent);" onclick="libraryPublishExistingTie('${myTiedResource.file.replace(/'/g, "\\'")}')">📤 Publish My Changes</button>` : ''}
                    ${canManage ? `<button class="btn btn-danger" style="width:auto; padding:9px 16px;" onclick="libraryDeleteMyPreset('${id}')">🗑️ Delete Preset</button>` : ''}
                </div>
            </div>
        </div>
    `;
};

async function editorRemoveDefault(file, name) {
    if (!await tdxConfirm(`Hide "${name}" from the schedule and editor?\nNo data is deleted — you can restore it at any time.`, { title: 'Hide Resource', icon: '🙈', confirmText: 'Hide' })) return;
    if (!appData.settings) appData.settings = {};
    if (!appData.settings.removedDefaults) appData.settings.removedDefaults = [];
    if (!appData.settings.removedDefaults.includes(file)) appData.settings.removedDefaults.push(file);
    applyResourceList(appData.settings);
    saveData(); needsRebuild = true; initEditor();
    document.getElementById('editor-file').value = '';
    document.getElementById('editor-content').innerHTML = '';
    document.getElementById('editor-add-chapter-area').innerHTML = '';
    _updateEditingIndicator();
    renderEditorResourceList();
}

function editorRestoreResource(file) {
    if (!appData.settings?.removedDefaults) return;
    appData.settings.removedDefaults = appData.settings.removedDefaults.filter(f => f !== file);
    applyResourceList(appData.settings);
    saveData(); needsRebuild = true; initEditor();
}

async function editorDeleteResource(file, name) {
    if (!await tdxConfirm(`Permanently delete custom resource "${name}"?\nAll its chapter/section data will be lost. This cannot be undone.`, { title: 'Delete Resource', icon: '🗑️', confirmText: 'Delete', danger: true })) return;
    if (!appData.settings?.customResources) return;
    appData.settings.customResources = appData.settings.customResources.filter(r => r.file !== file);
    delete appData.resources[file];
    applyResourceList(appData.settings);
    saveData(); needsRebuild = true; initEditor();
    document.getElementById('editor-file').value = '';
    document.getElementById('editor-content').innerHTML = '';
    document.getElementById('editor-add-chapter-area').innerHTML = '';
    _updateEditingIndicator();
    renderEditorResourceList();
}

function _updateEditingIndicator() {
    let editingLabel = document.getElementById('editor-currently-editing');
    if (!editingLabel) return;
    let file = document.getElementById('editor-file')?.value;
    if (file) {
        let name = (appData.settings?.customResources || []).find(r => r.file === file)?.name || file.replace('.csv', '');
        editingLabel.innerHTML = `Currently editing: <strong style="color:var(--accent);">${name}</strong>`;
    } else {
        editingLabel.textContent = 'Click ✏️ next to a resource above to edit it.';
    }
}

function renderEditor() {
    let file = document.getElementById('editor-file').value;
    let con = document.getElementById('editor-content');
    let chapArea = document.getElementById('editor-add-chapter-area');
    con.innerHTML = ''; chapArea.innerHTML = '';
    _updateEditingIndicator();
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
    let curUnit = getResourceUnit(file);
    let curKind = getResourceKind(file);
    let doneLabel = curKind === 'reading' ? 'Pages Read' : 'Done';
    let totalLabel = curKind === 'reading' ? 'Total Pages' : 'Total';
    let resMeta = (appData.settings?.customResources || []).find(r => r.file === file) || {};
    let subjOpts = (appData.settings?.subjects || []).map(s =>
        `<option value="${s.name.replace(/"/g, '&quot;')}" ${s.name === resMeta.subj ? 'selected' : ''}>${s.name}</option>`).join('');
    con.innerHTML = `<div style="background:var(--surface-light); border:1px solid var(--border); border-radius:12px; padding:12px 14px; margin-bottom:14px; display:flex; flex-direction:column; gap:10px;">
        <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:0.68rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); white-space:nowrap; width:78px; flex-shrink:0;">Name</span>
            <input type="text" id="ed-res-name" value="${(resMeta.name || file.replace('.csv', '')).replace(/"/g, '&quot;')}" onchange="renameResourceAndRefresh('${file}', this.value)" style="flex:1; padding:8px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-size:0.82rem;">
        </div>
        ${subjOpts ? `<div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:0.68rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); white-space:nowrap; width:78px; flex-shrink:0;">Subject</span>
            <select onchange="reassignResourceSubjectAndRefresh('${file}', this.value)" style="flex:1; padding:8px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-weight:700; font-size:0.82rem;">
                ${subjOpts}
            </select>
        </div>` : ''}
        <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:0.68rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); white-space:nowrap; width:78px; flex-shrink:0;">Kind</span>
            <select onchange="setResourceKindAndRefresh('${file}', this.value)" style="flex:1; padding:8px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-weight:700; font-size:0.82rem;">
                <option value="exercise" ${curKind === 'exercise' ? 'selected' : ''}>📚 Exercise Book</option>
                <option value="reading" ${curKind === 'reading' ? 'selected' : ''}>📗 Reading Book</option>
                <option value="youtube" ${curKind === 'youtube' ? 'selected' : ''}>▶️ YouTube Playlist</option>
            </select>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:0.68rem; font-weight:800; text-transform:uppercase; letter-spacing:1px; color:var(--text-muted); white-space:nowrap; width:78px; flex-shrink:0;">Measured In</span>
            <select onchange="setResourceUnitAndRefresh('${file}', this.value)" style="flex:1; padding:8px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-weight:700; font-size:0.82rem;">
                <option value="q" ${curUnit === 'q' ? 'selected' : ''}>📝 Questions</option>
                <option value="min" ${curUnit === 'min' ? 'selected' : ''}>⏱️ Minutes (must be logged in full)</option>
                <option value="pts" ${curUnit === 'pts' ? 'selected' : ''}>🏆 Points</option>
                <option value="pages" ${curUnit === 'pages' ? 'selected' : ''}>📖 Pages</option>
            </select>
        </div>
    </div>`;

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
            let dlTag = s.dl ? `<span title="Deadline: ${s.dl} — edit in ⏰ Manage Deadlines" style="font-size:0.62rem;color:var(--danger);white-space:nowrap;">⏰ ${s.dl}</span>` : '';
            html += `<div class="editor-input-row">
                <button class="ed-del-btn" onclick="editorDeleteSection('${file}','${c.replace(/'/g, "\\'")}','${s.sec.replace(/'/g, "\\'")}')">✕</button>
                <span style="flex:1;font-size:0.83rem;display:flex;align-items:center;gap:6px;flex-wrap:wrap;">${s.sec}${dlTag}</span>
                <div style="display:flex;flex-direction:column;align-items:center;font-size:0.6rem;color:var(--text-muted);">
                    ${doneLabel}<input type="number" id="ed_d_${file}_${c}_${s.sec}" value="${s.d}" onchange="autoSaveEditorRow('${file}','${c.replace(/'/g, "\\'")}','${s.sec.replace(/'/g, "\\'")}')">
                </div>
                <div style="display:flex;flex-direction:column;align-items:center;font-size:0.6rem;color:var(--text-muted);">
                    ${totalLabel}<input type="number" id="ed_t_${file}_${c}_${s.sec}" value="${s.t}" onchange="autoSaveEditorRow('${file}','${c.replace(/'/g, "\\'")}','${s.sec.replace(/'/g, "\\'")}')">
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

async function editorDeleteSection(file, ch, sec) {
    let rows = appData.resources[file] || [];
    let chapsSections = rows.filter(r => r.ch === ch);

    if (chapsSections.length === 1) {
        if (!await tdxConfirm(`WARNING: "${sec}" is the LAST section in "${ch}".\nDeleting this will wipe the entire chapter from the matrix.\nProceed?`, { title: 'Delete Last Section', icon: '⚠️', confirmText: 'Delete', danger: true })) return;
    } else {
        if (!await tdxConfirm(`Delete section "${sec}" from "${ch}"?\nThis cannot be undone.`, { title: 'Delete Section', icon: '🗑️', confirmText: 'Delete', danger: true })) return;
    }

    appData.resources[file] = rows.filter(r => !(r.ch === ch && r.sec === sec));
    saveData(); needsRebuild = true; renderEditor();
}

async function editorDeleteChapter(file, ch) {
    if (!await tdxConfirm(`Delete entire chapter "${ch}" and all its sections?\nThis cannot be undone.`, { title: 'Delete Chapter', icon: '🗑️', confirmText: 'Delete', danger: true })) return;
    appData.resources[file] = (appData.resources[file] || []).filter(r => r.ch !== ch);
    saveData(); needsRebuild = true; renderEditor();
}

function editorAddSection(file, ch) {
    let safeC = encodeURIComponent(ch);
    let sec = (document.getElementById(`ednewsec_${safeC}`) || {}).value?.trim();
    let tot = parseInt((document.getElementById(`ednewsect_${safeC}`) || {}).value) || 1;
    if (!sec) { tdxAlert('Enter a section name.'); return; }
    let rows = appData.resources[file] || [];
    if (rows.find(r => r.ch === ch && r.sec === sec)) { tdxAlert('Section already exists.'); return; }
    rows.push({ ch, sec, d: 0, t: tot, s: 0 });
    appData.resources[file] = rows;
    saveData(); needsRebuild = true; renderEditor();
    let grp = document.getElementById(`edgrp_${encodeURIComponent(ch)}`);
    if (grp) grp.classList.add('open');
}

async function editorAddChapter(file) {
    let ch = (document.getElementById(`ednewchap_${file}`) || {}).value?.trim();
    if (!ch) { tdxAlert('Enter a chapter name.'); return; }
    let rows = appData.resources[file] || [];
    if (rows.find(r => r.ch === ch)) { tdxAlert('Chapter already exists.'); return; }

    let initialSec = await tdxPrompt(`Define the first section for [${ch}]:\n(e.g., Objective, Exercise 1)`, { title: 'New Section', defaultValue: "Exercise 1" });
    if (initialSec === null) return;
    if (initialSec.trim() === '') initialSec = 'Section A';

    rows.push({ ch, sec: initialSec.trim(), d: 0, t: 1, s: 0 });
    appData.resources[file] = rows;
    saveData(); needsRebuild = true; renderEditor();
    let grp = document.getElementById(`edgrp_${encodeURIComponent(ch)}`);
    if (grp) grp.classList.add('open');
}

// Auto-saves a single section's Done/Total the moment either field changes —
// no manual "Save & Rebuild" step. Shows a small transient "Saved" flash
// instead of a blocking alert, and never yanks the user out of the Editor.
window.autoSaveEditorRow = function (file, ch, sec) {
    let row = (appData.resources[file] || []).find(r => r.ch === ch && r.sec === sec);
    let dIn = document.getElementById(`ed_d_${file}_${ch}_${sec}`);
    let tIn = document.getElementById(`ed_t_${file}_${ch}_${sec}`);
    if (!row || !dIn || !tIn) return;
    row.d = Math.max(0, parseInt(dIn.value) || 0);
    row.t = Math.max(1, parseInt(tIn.value) || 1);
    if (row.d > row.t) row.d = row.t;
    dIn.value = row.d; tIn.value = row.t;
    saveData();
    needsRebuild = true;
    _flashEditorSaved();
};

let _editorSavedFlashTimer = null;
function _flashEditorSaved() {
    let el = document.getElementById('editor-saved-flash');
    if (!el) return;
    el.style.opacity = '1';
    clearTimeout(_editorSavedFlashTimer);
    _editorSavedFlashTimer = setTimeout(() => { el.style.opacity = '0'; }, 1100);
}

// ==========================================
// DEADLINE MANAGER
// ==========================================
// Exercise deadlines are entirely optional (stored as row.dl, an ISO date).
// Anything without one falls back to the campaign end date — see
// distributeSubjectSchedule(). This terminal is the only place deadlines are
// set/edited so the per-row editor above doesn't look like it demands one.
let dlWizard = { step: 0, picks: [] }; // picks: [{file, ch, sec}]

window.openDeadlineManager = function () {
    // Hide left-pane distractions
    document.getElementById('manage-subjects-form').style.display = 'none';
    let oldAddForm = document.getElementById('add-resource-form');
    if (oldAddForm) oldAddForm.style.display = 'none';

    // Clear the current resource view
    document.getElementById('editor-file').value = '';
    document.getElementById('editor-add-chapter-area').innerHTML = '';
    _updateEditingIndicator();
    renderEditorResourceList();

    dlWizard = { step: 0, picks: [] };
    renderDeadlineManager();
};

function _allDeadlineRows() {
    let out = [];
    for (let file in appData.resources) {
        if (file === 'Organic Chemistry.csv') continue; // OC has no per-row editor
        (appData.resources[file] || []).forEach(r => {
            if (r.dl) out.push({ file, ch: r.ch, sec: r.sec, dl: r.dl });
        });
    }
    return out;
}

// Escapes a value for safe use inside a double-quoted CSS attribute selector, e.g. [data-file="…"].
function _cssEsc(s) { return String(s).replace(/["\\]/g, '\\$&'); }

function _buildDeadlinePickerTree() {
    let html = '';
    RESOURCES_LIST.filter(r => r.file !== 'Organic Chemistry.csv').forEach(r => {
        let rows = appData.resources[r.file] || [];
        if (!rows.length) return;
        let byChap = {};
        rows.forEach(row => { if (!byChap[row.ch]) byChap[row.ch] = []; byChap[row.ch].push(row); });
        let chapHtml = Object.entries(byChap).map(([ch, secs]) => {
            let secHtml = secs.map(row => {
                let hasDl = row.dl ? ` <span style="color:var(--text-subtle);">(has deadline)</span>` : '';
                return `<label style="display:flex;align-items:center;gap:7px;padding:3px 0 3px 30px;cursor:pointer;font-size:0.75rem;">`
                    + `<input type="checkbox" class="dlpick_chk" data-file="${r.file}" data-chapter="${ch}" data-section="${row.sec}" onchange="handleDlPickChange(this)" style="accent-color:var(--danger);width:13px;height:13px;flex-shrink:0;">`
                    + `<span style="color:var(--text-muted);">${row.sec}${hasDl}</span></label>`;
            }).join('');
            return `<div style="margin:4px 0 0;">`
                + `<label style="display:flex;align-items:center;gap:7px;padding:3px 0 1px 18px;cursor:pointer;">`
                + `<input type="checkbox" class="dlpick_chap_chk" data-file="${r.file}" data-chapter="${ch}" onchange="handleDlPickChange(this)" style="accent-color:var(--danger);width:13px;height:13px;flex-shrink:0;">`
                + `<span style="font-size:0.72rem;font-weight:700;color:var(--text);">${ch}</span></label>`
                + secHtml + '</div>';
        }).join('');
        html += `<div class="pri-sub-group" style="margin-top:6px;">`
            + `<div class="pri-sub-group-head" onclick="this.parentElement.classList.toggle('open')">`
            + `<span style="display:flex;align-items:center;gap:8px;">`
            + `<input type="checkbox" class="dlpick_res_chk" data-file="${r.file}" onclick="event.stopPropagation()" onchange="handleDlPickChange(this)" style="accent-color:var(--danger);width:13px;height:13px;flex-shrink:0;">`
            + `📂 ${r.name}</span><span class="psg-arrow">▾</span></div>`
            + `<div class="pri-sub-group-body">${chapHtml}</div></div>`;
    });
    return html || '<div style="color:var(--text-subtle);font-size:0.75rem;">No data loaded. Add a resource first.</div>';
}

// One-click select propagates down (resource → all its exercises, chapter →
// its exercises) and recomputes ancestor checked/indeterminate state up.
window.handleDlPickChange = function (el) {
    if (el.classList.contains('dlpick_res_chk')) {
        let file = el.dataset.file;
        document.querySelectorAll(`.dlpick_chap_chk[data-file="${_cssEsc(file)}"]`).forEach(c => { c.checked = el.checked; c.indeterminate = false; });
        document.querySelectorAll(`.dlpick_chk[data-file="${_cssEsc(file)}"]`).forEach(c => { c.checked = el.checked; });
        el.indeterminate = false;
    } else if (el.classList.contains('dlpick_chap_chk')) {
        let file = el.dataset.file, ch = el.dataset.chapter;
        document.querySelectorAll(`.dlpick_chk[data-file="${_cssEsc(file)}"][data-chapter="${_cssEsc(ch)}"]`).forEach(c => { c.checked = el.checked; });
        el.indeterminate = false;
        _recalcDlPickResource(file);
    } else {
        let file = el.dataset.file, ch = el.dataset.chapter;
        _recalcDlPickChapter(file, ch);
        _recalcDlPickResource(file);
    }
};

function _recalcDlPickChapter(file, ch) {
    let secs = [...document.querySelectorAll(`.dlpick_chk[data-file="${_cssEsc(file)}"][data-chapter="${_cssEsc(ch)}"]`)];
    let chapEl = document.querySelector(`.dlpick_chap_chk[data-file="${_cssEsc(file)}"][data-chapter="${_cssEsc(ch)}"]`);
    if (!chapEl || !secs.length) return;
    let allChecked = secs.every(s => s.checked);
    let noneChecked = secs.every(s => !s.checked);
    chapEl.checked = allChecked;
    chapEl.indeterminate = !allChecked && !noneChecked;
}

function _recalcDlPickResource(file) {
    let chaps = [...document.querySelectorAll(`.dlpick_chap_chk[data-file="${_cssEsc(file)}"]`)];
    let resEl = document.querySelector(`.dlpick_res_chk[data-file="${_cssEsc(file)}"]`);
    if (!resEl || !chaps.length) return;
    let allChecked = chaps.every(c => c.checked && !c.indeterminate);
    let noneChecked = chaps.every(c => !c.checked && !c.indeterminate);
    resEl.checked = allChecked;
    resEl.indeterminate = !allChecked && !noneChecked;
}

window.renderDeadlineManager = function () {
    let con = document.getElementById('editor-content');
    let existing = _allDeadlineRows().sort((a, b) => a.dl.localeCompare(b.dl));

    let html = `<div style="background:var(--surface-light); border:1px solid var(--danger); border-radius:16px; padding:24px; box-shadow: 0 8px 32px rgba(248,113,113,0.1); animation: fadeUp var(--dur-md) var(--decel) both; min-height: 500px; display:flex; flex-direction:column;">`;

    html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid var(--border); padding-bottom:12px;">
        <div style="font-family:'Bricolage Grotesque',sans-serif; font-size:1.1rem; color:var(--danger); font-weight:800; text-transform:uppercase; letter-spacing:1.5px; display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.3rem;">⏰</span> Deadline Manager
        </div>
        <button class="ed-del-btn" style="margin:0; padding:6px 14px;" onclick="renderEditor()">Close Terminal</button>
    </div>`;

    html += `<div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:18px; line-height:1.5;">
        Deadlines are <strong style="color:var(--text);">entirely optional</strong>. Any exercise without one just rides on your Campaign End Date — set one here only for exercises that need to be finished sooner.
    </div>`;

    // ── Active deadlines list ──
    // Bulk-select + bulk-apply so moving a whole resource's deadlines (or
    // clearing them) doesn't mean clicking every row one at a time — the
    // same "pick many, apply once" idea as the add-new wizard above.
    html += `<div style="margin-bottom:24px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
            <div style="font-size:0.7rem; color:var(--text-subtle); text-transform:uppercase; font-weight:800; letter-spacing:1px;">Active Deadlines (${existing.length})</div>`;
    if (existing.length) {
        html += `<label style="display:flex; align-items:center; gap:5px; font-size:0.68rem; color:var(--text-muted); cursor:pointer;">
                <input type="checkbox" id="dledit-selectall" onchange="toggleDlEditSelectAll(this)" style="accent-color:var(--danger); width:12px; height:12px;"> Select all
            </label>`;
    }
    html += `</div>`;
    if (!existing.length) {
        html += `<div style="color:var(--text-subtle); font-size:0.8rem; background:var(--bg); border:1px dashed var(--border); border-radius:10px; padding:14px; text-align:center;">None set. Every exercise currently uses the campaign end date.</div>`;
    } else {
        // Bulk toolbar — hidden until at least one row is checked.
        html += `<div id="dledit-toolbar" style="display:none; align-items:center; gap:10px; background:rgba(248,113,113,0.06); border:1px solid var(--border-accent); border-radius:10px; padding:8px 12px; margin-bottom:10px;">
            <span id="dledit-count" style="font-size:0.75rem; color:var(--text); font-weight:700; flex:1;">0 selected</span>
            <div style="position:relative; display:inline-flex;">
                <input type="date" id="dledit-bulk-date" style="position:absolute; inset:0; width:100%; height:100%; opacity:0; pointer-events:none; border:0;" onchange="applyBulkDeadline(this.value)">
                <button type="button" class="btn-primary" style="border:none; border-radius:8px; padding:6px 14px; font-size:0.72rem; font-weight:700; cursor:pointer; white-space:nowrap;" onclick="openDlDatePicker('dledit-bulk-date')">🗓️ Set Deadline</button>
            </div>
            <button type="button" class="ed-del-btn" style="margin:0; white-space:nowrap;" onclick="bulkClearDeadlines()">✕ Clear</button>
            <button type="button" class="ed-del-btn" style="margin:0; color:var(--text-muted); border-color:var(--border); background:transparent;" onclick="clearDlEditSelection()">Cancel</button>
        </div>`;

        html += `<div style="display:flex; flex-direction:column; gap:8px; max-height:260px; overflow-y:auto; padding-right:4px;">`;
        existing.forEach((e, i) => {
            let resName = (RESOURCES_LIST.find(r => r.file === e.file) || {}).name || e.file;
            let fEsc = e.file.replace(/'/g, "\\'"), cEsc = e.ch.replace(/'/g, "\\'"), sEsc = e.sec.replace(/'/g, "\\'");
            let inputId = `dlrow_pick_${i}`;
            // A visible date input re-fires onchange on every keystroke that
            // happens to complete a valid date (typing a new day digit over an
            // already-filled value does this immediately) — each firing used to
            // rebuild this whole panel mid-edit and steal focus. Instead: an
            // invisible native date input anchored under a plain button; picking
            // a date via the calendar popup commits once, atomically.
            html += `<div style="display:flex; align-items:center; gap:10px; background:var(--bg); border:1px solid var(--border); border-radius:10px; padding:10px 12px;">
                <input type="checkbox" class="dledit_chk" data-file="${e.file}" data-chapter="${e.ch}" data-section="${e.sec}" onchange="updateDlEditToolbar()" style="accent-color:var(--danger); width:13px; height:13px; flex-shrink:0;">
                <div style="flex:1; min-width:0;">
                    <div style="font-size:0.82rem; font-weight:700; color:var(--text); overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${e.ch} — ${e.sec}</div>
                    <div style="font-size:0.68rem; color:var(--text-subtle);">${resName}</div>
                </div>
                <div style="position:relative; display:inline-flex;">
                    <input type="date" id="${inputId}" value="${e.dl}" style="position:absolute; inset:0; width:100%; height:100%; opacity:0; pointer-events:none; border:0;" onchange="editDeadlineRow('${fEsc}','${cEsc}','${sEsc}', this.value)">
                    <button type="button" class="ed-del-btn" style="margin:0; padding:6px 10px; color:var(--text); border-color:var(--border-hi);" title="Change deadline" onclick="openDlDatePicker('${inputId}')">🗓️ ${e.dl}</button>
                </div>
                <button class="ed-del-btn" style="margin:0;" title="Clear deadline" onclick="clearDeadlineRow('${fEsc}','${cEsc}','${sEsc}')">✕</button>
            </div>`;
        });
        html += `</div>`;
    }
    html += `</div>`;

    // ── Chat-style "add new" wizard ──
    html += `<div style="border-top:1px dashed var(--border); padding-top:20px;">
        <div style="font-size:0.7rem; color:var(--text-subtle); text-transform:uppercase; font-weight:800; letter-spacing:1px; margin-bottom:12px;">+ Set A New Deadline</div>
        <div id="dl-chat-area" style="display:flex; flex-direction:column; gap:16px;">`;

    html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem;">
        <strong style="color:var(--text);">[SYSTEM]:</strong> Which exercise(s) need a deadline? Tick one or more below.
    </div>`;
    if (dlWizard.step === 0) {
        html += `<div class="agent-input-row" style="display:flex; flex-direction:column; gap:10px; animation: slideInLeft 0.3s ease;">
            <div style="max-height:220px; overflow-y:auto; background:var(--bg); border:1px solid var(--border); border-radius:10px; padding:10px;">
                ${_buildDeadlinePickerTree()}
            </div>
            <div style="display:flex; justify-content:flex-end;">
                <button class="btn-primary" style="border-radius:8px; padding:10px 20px; font-weight:bold; border:none; cursor:pointer;" onclick="advanceDeadlineWizard()">Next ▶</button>
            </div>
        </div>`;
    } else {
        let label = dlWizard.picks.length === 1
            ? `${dlWizard.picks[0].ch} — ${dlWizard.picks[0].sec}`
            : `${dlWizard.picks.length} exercises selected`;
        html += `<div class="user-msg" style="align-self:flex-end; background:var(--accent-dim); color:var(--accent); padding:10px 16px; border-radius:12px 12px 0 12px;">${label}</div>`;

        html += `<div class="agent-msg" style="color:var(--text-muted); font-size:0.9rem; animation: fadeUp 0.3s ease;">
            <strong style="color:var(--text);">[SYSTEM]:</strong> When's the deadline?
        </div>`;
        html += `<div class="agent-input-row" style="display:flex; gap:10px; animation: slideInLeft 0.3s ease;">
            <input type="date" id="dl-wizard-date" style="flex:1; padding:12px; background:var(--bg); color:var(--text); border:1px solid var(--border-accent); border-radius:8px; font-size:1rem; outline:none;">
            <button class="ed-del-btn" style="margin:0; padding:0 16px;" onclick="dlWizard={step:0,picks:[]};renderDeadlineManager();">Back</button>
            <button class="btn-primary" style="border-radius:8px; padding:0 20px; font-weight:bold; border:none; cursor:pointer;" onclick="applyDeadlineWizard()">Apply ▶</button>
        </div>`;
    }

    html += `</div></div>`;
    html += `</div>`;
    con.innerHTML = html;

    setTimeout(() => {
        if (dlWizard.step >= 1) document.getElementById('dl-wizard-date')?.focus();
    }, 50);
};

window.advanceDeadlineWizard = function () {
    let picks = [...document.querySelectorAll('.dlpick_chk:checked')].map(el => ({
        file: el.dataset.file, ch: el.dataset.chapter, sec: el.dataset.section
    }));
    if (!picks.length) { tdxAlert('Tick at least one exercise first.'); return; }
    dlWizard.picks = picks;
    dlWizard.step = 1;
    renderDeadlineManager();
};

window.applyDeadlineWizard = function () {
    let dateVal = document.getElementById('dl-wizard-date').value;
    if (!dateVal) { tdxAlert('Pick a date first.'); return; }
    dlWizard.picks.forEach(p => {
        let row = (appData.resources[p.file] || []).find(r => r.ch === p.ch && r.sec === p.sec);
        if (row) row.dl = dateVal;
    });
    saveData(); needsRebuild = true;
    dlWizard = { step: 0, picks: [] };
    renderDeadlineManager();
};

// Opens the native calendar popup for an (invisible) date input instead of
// letting the user type into it directly — see the comment above where this
// is rendered for why free typing was breaking.
window.openDlDatePicker = function (id) {
    let el = document.getElementById(id);
    if (!el) return;
    if (el.showPicker) {
        try { el.showPicker(); return; } catch (e) { /* falls through to focus() */ }
    }
    el.focus();
};

window.editDeadlineRow = function (file, ch, sec, val) {
    let row = (appData.resources[file] || []).find(r => r.ch === ch && r.sec === sec);
    if (!row) return;
    if (val) row.dl = val; else delete row.dl;
    saveData(); needsRebuild = true;
    renderDeadlineManager();
};

window.clearDeadlineRow = function (file, ch, sec) {
    let row = (appData.resources[file] || []).find(r => r.ch === ch && r.sec === sec);
    if (!row) return;
    delete row.dl;
    saveData(); needsRebuild = true;
    renderDeadlineManager();
};

// ── Bulk edit for the Active Deadlines list ──
// Checking rows just flips their .dledit_chk state and refreshes the toolbar
// in place (no re-render) so the checked set survives while you keep
// selecting. The toolbar's own re-render (bulk apply/clear) is the only
// point where the list actually rebuilds.
window.toggleDlEditSelectAll = function (cb) {
    document.querySelectorAll('.dledit_chk').forEach(c => { c.checked = cb.checked; });
    updateDlEditToolbar();
};

window.updateDlEditToolbar = function () {
    let bar = document.getElementById('dledit-toolbar');
    let countEl = document.getElementById('dledit-count');
    if (!bar || !countEl) return;
    let all = [...document.querySelectorAll('.dledit_chk')];
    let n = all.filter(c => c.checked).length;
    bar.style.display = n > 0 ? 'flex' : 'none';
    countEl.textContent = `${n} selected`;
    let selectAll = document.getElementById('dledit-selectall');
    if (selectAll) selectAll.checked = all.length > 0 && n === all.length;
};

function _getDlEditSelection() {
    return [...document.querySelectorAll('.dledit_chk:checked')].map(el => ({
        file: el.dataset.file, ch: el.dataset.chapter, sec: el.dataset.section
    }));
}

window.clearDlEditSelection = function () {
    document.querySelectorAll('.dledit_chk').forEach(c => { c.checked = false; });
    let selectAll = document.getElementById('dledit-selectall');
    if (selectAll) selectAll.checked = false;
    updateDlEditToolbar();
};

window.applyBulkDeadline = function (val) {
    if (!val) return;
    let picks = _getDlEditSelection();
    if (!picks.length) return;
    picks.forEach(p => {
        let row = (appData.resources[p.file] || []).find(r => r.ch === p.ch && r.sec === p.sec);
        if (row) row.dl = val;
    });
    saveData(); needsRebuild = true;
    renderDeadlineManager();
};

window.bulkClearDeadlines = async function () {
    let picks = _getDlEditSelection();
    if (!picks.length) return;
    if (!await tdxConfirm(`Clear the deadline for ${picks.length} exercise(s)? They'll fall back to the campaign end date.`, { title: 'Clear Deadlines', icon: '⏰', confirmText: 'Clear' })) return;
    picks.forEach(p => {
        let row = (appData.resources[p.file] || []).find(r => r.ch === p.ch && r.sec === p.sec);
        if (row) delete row.dl;
    });
    saveData(); needsRebuild = true;
    renderDeadlineManager();
};

// ==========================================
// BRAINBOARD
// ==========================================
// Global State Initialization for Infinite Canvas & Links
window.bbImageCache = window.bbImageCache || {};
window.bbLinkingFrom = null; // Stores node ID when drawing spidey tape

window.renderBrainboard = function() {
    let con = document.getElementById('brainboard-content');
    if (!con) return;

    let hasDriveToken = !!sessionStorage.getItem('gdrive_token');

    // Auto-initialize camera and links if they don't exist
    if (!appData.bbCam) appData.bbCam = { x: 0, y: 0, z: 1 };
    if (!appData.bbLinks) appData.bbLinks = [];

    if (!hasDriveToken) {
        con.innerHTML = `
            <div style="text-align:center; margin: 40px 10px; padding: 40px 20px; background:var(--surface-light); border:1px dashed var(--border-hi); border-radius: 24px; animation:fadeUp var(--dur-md) var(--decel) both;">
                <div style="font-size: 3rem; margin-bottom: 12px;">🧠</div>
                <div style="font-family:'Bricolage Grotesque',sans-serif; color:var(--text); font-weight:800; font-size:1.1rem; margin-bottom: 8px; text-transform:uppercase; letter-spacing:1px;">The Brainboard</div>
                <div style="color:var(--text-muted); font-size:0.85rem; line-height: 1.5; margin-bottom: 24px; max-width: 320px; margin-inline: auto;">
                    An infinite spatial canvas. Connect ideas with Spidey Tape. Zoom and pan freely.<br><br>
                    Files are securely stored in your personal <b>Google Drive</b>.
                </div>
                <button class="btn btn-primary" style="width:auto; padding:10px 24px; display:inline-flex; align-items:center; gap:8px;" onclick="connectGoogleDrive()">
                    <span style="font-size:1.1rem;">📁</span> Connect Google Drive
                </button>
            </div>
        `;
    } else {
        con.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; gap:8px;">
                <h2 style="margin:0; display:flex; align-items:center; gap:8px;"><span style="font-size:1.5rem;">🧠</span> The Brainboard</h2>
                <div style="display:flex; align-items:center; gap:14px;">
                    <div class="bb-hint-text" style="font-size:0.75rem; color:var(--text-muted);">Double-click: Text · Drag: Pan · Scroll/Pinch: Zoom</div>
                    <span style="cursor:pointer; font-size:1.2rem; padding:4px;" onclick="openBrainboardShareModal()" title="Share this board">🔗</span>
                    <span style="cursor:pointer; font-size:1.2rem; padding:4px;" onclick="openBrainboardHistoryModal()" title="View history">🕓</span>
                </div>
            </div>

            <!-- THE VIEWPORT (Window to the infinite board; JS sizes this to fit the visible screen) -->
            <div id="bb-viewport" style="position: relative; width: 100%; height: 70vh; min-height: 320px; background: var(--surface-light); border: 1px solid var(--border-hi); border-radius: 16px; overflow: hidden; touch-action: none; cursor: grab; -webkit-tap-highlight-color: transparent;">
                
                <!-- THE INFINITE BOARD -->
                <div id="bb-board" style="position: absolute; width: 10000px; height: 10000px; transform-origin: 0 0; background-image: radial-gradient(circle, rgba(255,255,255,0.08) 2px, transparent 2px); background-size: 40px 40px;">
                    <!-- SPIDEY TAPE LAYER -->
                    <svg id="bb-svg" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;"></svg>
                </div>

                <div id="bb-drop-overlay" style="display:none; position:absolute; inset:0; background:rgba(245,166,35,0.15); border: 3px dashed var(--accent); z-index: 1000; align-items:center; justify-content:center; backdrop-filter:blur(4px); pointer-events:none;">
                    <div style="font-size:1.5rem; font-weight:800; color:var(--accent); font-family:'Bricolage Grotesque',sans-serif; text-transform:uppercase; letter-spacing:1px; filter:drop-shadow(0 4px 10px rgba(0,0,0,0.8));">Drop to Upload</div>
                </div>
            </div>
            
            <input type="file" id="bb-file-input" style="display:none;" multiple onchange="triggerBrainboardUpload(event)">
        `;

        // Apply saved camera position
        window.applyBbCamera();
        drawBrainboardNodes();
        window.fitBbViewport();

        if (!window._bbFitBound) {
            window._bbFitBound = true;
            let refit = () => { if (document.getElementById('bb-viewport')) window.fitBbViewport(); };
            window.addEventListener('resize', refit);
            window.addEventListener('orientationchange', () => setTimeout(refit, 200));
        }

        let viewport = document.getElementById('bb-viewport');
        let dropOverlay = document.getElementById('bb-drop-overlay');
        let dragCounter = 0;

        // ── PAN & ZOOM LOGIC (Mobile + Desktop) ──
        let pointers = [];
        let isPanning = false;
        let startPanX, startPanY, startCamX, startCamY, startDist, startZ;

        // Registered on the CAPTURE phase so pinch-zoom keeps working even when
        // a finger lands on a node — node headers/rotators/resizers call
        // stopPropagation() on their own (bubble-phase) listeners, which would
        // otherwise stop this pointer from ever being tracked here, breaking
        // any pinch gesture where either finger touches an object.
        viewport.addEventListener('pointerdown', e => {
            // Only the actual move/rotate/resize handles should keep this
            // pointer from panning the board. On touch, dragging over a
            // node's non-handle content (note text, image, file thumbnail)
            // has nothing else to do with the gesture, so let it pan instead
            // of just being dead space. On mouse/pen (PC), leave that content
            // non-draggable as before — e.g. so text can still be selected.
            let onHandle = !!e.target.closest('.bb-node-handle');
            let blocksPan = onHandle || (e.pointerType !== 'touch' && !!e.target.closest('.bb-node'));
            pointers.push({ id: e.pointerId, x: e.clientX, y: e.clientY, blocksPan });

            if (pointers.length === 1) {
                if (!blocksPan) {
                    viewport.style.cursor = 'grabbing';
                    isPanning = true;
                    startPanX = e.clientX; startPanY = e.clientY;
                    startCamX = appData.bbCam.x; startCamY = appData.bbCam.y;
                    viewport.setPointerCapture(e.pointerId);
                }
            } else if (pointers.length === 2) {
                // A second finger down is always a pinch, regardless of what
                // either finger is touching.
                isPanning = false;
                startDist = Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y);
                startZ = appData.bbCam.z;
            }
        }, true);

        viewport.addEventListener('pointermove', e => {
            let idx = pointers.findIndex(p => p.id === e.pointerId);
            if (idx !== -1) { pointers[idx].x = e.clientX; pointers[idx].y = e.clientY; }

            if (pointers.length === 1 && isPanning) {
                appData.bbCam.x = startCamX + (e.clientX - startPanX);
                appData.bbCam.y = startCamY + (e.clientY - startPanY);
                window.applyBbCamera();
            } else if (pointers.length === 2) {
                let dist = Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y);
                let newZ = Math.min(Math.max(0.1, startZ * (dist / startDist)), 4);

                // Zoom around the midpoint between the two fingers (same anchor
                // math as the wheel-zoom below), not the board's top-left corner.
                let rect = viewport.getBoundingClientRect();
                let midX = (pointers[0].x + pointers[1].x) / 2 - rect.left;
                let midY = (pointers[0].y + pointers[1].y) / 2 - rect.top;
                appData.bbCam.x = midX - (midX - appData.bbCam.x) * (newZ / appData.bbCam.z);
                appData.bbCam.y = midY - (midY - appData.bbCam.y) * (newZ / appData.bbCam.z);
                appData.bbCam.z = newZ;
                window.applyBbCamera();
            }
        }, true);

        const endPointer = (e) => {
            pointers = pointers.filter(p => p.id !== e.pointerId);
            if (pointers.length === 0) { isPanning = false; viewport.style.cursor = 'grab'; saveData(); }
            if (pointers.length === 1 && !pointers[0].blocksPan) {
                // Re-anchor pan if one finger lifts (and the remaining finger
                // isn't itself on a node being dragged/rotated/resized).
                startPanX = pointers[0].x; startPanY = pointers[0].y;
                startCamX = appData.bbCam.x; startCamY = appData.bbCam.y;
                isPanning = true;
            }
        };
        viewport.addEventListener('pointerup', endPointer, true);
        viewport.addEventListener('pointercancel', endPointer, true);

        // ── PC MOUSE WHEEL ZOOM ──
        viewport.addEventListener('wheel', e => {
            e.preventDefault();
            let zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
            let newZ = Math.min(Math.max(0.1, appData.bbCam.z * zoomFactor), 4);
            
            let rect = viewport.getBoundingClientRect();
            let mx = e.clientX - rect.left;
            let my = e.clientY - rect.top;
            
            appData.bbCam.x = mx - (mx - appData.bbCam.x) * (newZ / appData.bbCam.z);
            appData.bbCam.y = my - (my - appData.bbCam.y) * (newZ / appData.bbCam.z);
            appData.bbCam.z = newZ;
            
            window.applyBbCamera();
            saveData();
        });

        // Add node on double click
        viewport.addEventListener('dblclick', (e) => {
            if (e.target !== viewport && e.target.id !== 'bb-board') return; 
            let rect = viewport.getBoundingClientRect();
            // Map screen coordinates to world coordinates
            let worldX = ((e.clientX - rect.left) - appData.bbCam.x) / appData.bbCam.z;
            let worldY = ((e.clientY - rect.top) - appData.bbCam.y) / appData.bbCam.z;

            let id = 'node_' + Date.now().toString(36);
            appData.brainboard.push({
                id: id, type: 'text', content: 'New Note',
                x: worldX, y: worldY, w: 200, h: 100, r: 0
            });
            saveData();
            drawBrainboardNodes();
        });

        // Drag & Drop Files
        viewport.addEventListener('dragenter', (e) => { e.preventDefault(); dragCounter++; dropOverlay.style.display = 'flex'; });
        viewport.addEventListener('dragleave', (e) => { e.preventDefault(); dragCounter--; if(dragCounter === 0) dropOverlay.style.display = 'none'; });
        viewport.addEventListener('dragover', (e) => { e.preventDefault(); });
        viewport.addEventListener('drop', (e) => {
            e.preventDefault();
            dragCounter = 0;
            dropOverlay.style.display = 'none';
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                let rect = viewport.getBoundingClientRect();
                let worldX = ((e.clientX - rect.left) - appData.bbCam.x) / appData.bbCam.z;
                let worldY = ((e.clientY - rect.top) - appData.bbCam.y) / appData.bbCam.z;
                Array.from(e.dataTransfer.files).forEach(file => handleBrainboardUpload(file, worldX, worldY));
            }
        });
    }
};

window.applyBbCamera = function() {
    let board = document.getElementById('bb-board');
    if (board && appData.bbCam) {
        board.style.transform = `translate(${appData.bbCam.x}px, ${appData.bbCam.y}px) scale(${appData.bbCam.z})`;
    }
};

// Sizes #bb-viewport to exactly fill whatever space is left below it on
// screen, so the canvas never causes an outer page scrollbar on mobile.
window.fitBbViewport = function() {
    let viewport = document.getElementById('bb-viewport');
    if (!viewport) return;
    let top = viewport.getBoundingClientRect().top;
    let isDesk = window.innerWidth >= 820;
    let nav = document.querySelector('.bottom-nav');
    let combatBar = document.getElementById('combat-bar-fixed');
    let reserve = 20; // breathing room at the bottom
    if (!isDesk && nav) reserve += nav.getBoundingClientRect().height;
    // The combat bar floats on top of whatever's beneath it (it's position:fixed
    // with pointer-events:none on its own background) — reserve its height too
    // so the canvas's bottom edge ends above it, not hidden underneath it.
    if (combatBar) reserve += combatBar.getBoundingClientRect().height;
    let available = window.innerHeight - top - reserve;
    viewport.style.height = Math.max(320, available) + 'px';
};

// ── NOTE RICH-TEXT HELPERS ──
// Strips only background colouring from pasted HTML (per user request: keep
// everything else — bold, italic, lists, links — except text background).
// Also strips script/style/event-handler content since paste can come from
// anywhere on the web.
window.sanitizePastedHtml = function(html) {
    let container = document.createElement('div');
    container.innerHTML = html;
    container.querySelectorAll('script, style, meta, link, title, object, embed, iframe').forEach(el => el.remove());
    container.querySelectorAll('*').forEach(el => {
        el.style.removeProperty('background-color');
        el.style.removeProperty('background');
        el.removeAttribute('bgcolor');
        [...el.attributes].forEach(attr => {
            if (/^on/i.test(attr.name)) el.removeAttribute(attr.name);
        });
    });
    return container.innerHTML;
};

// WhatsApp-style live shortcuts: typing *word* / _word_ / ~word~ converts the
// just-closed span into bold/italic/strikethrough. Only touches the single
// text node under the caret, so it never disturbs the rest of the note or
// loses cursor position elsewhere.
window.tryInlineMarkdownShortcut = function(editableEl) {
    let sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    let range = sel.getRangeAt(0);
    if (!range.collapsed) return;
    let node = range.startContainer;
    if (node.nodeType !== Node.TEXT_NODE || !editableEl.contains(node)) return;

    let caretPos = range.startOffset;
    let before = node.textContent.slice(0, caretPos);
    let m = before.match(/(?<=^|\s)([*_~])([^\s*_~][^*_~]*?)\1$/);
    if (!m) return;

    let tag = m[1] === '*' ? 'b' : m[1] === '_' ? 'i' : 's';
    let matchStart = caretPos - m[0].length;
    let restText = node.textContent.slice(caretPos);

    let replacementEl = document.createElement(tag);
    replacementEl.textContent = m[2];
    let afterNode = document.createTextNode(restText);

    node.textContent = node.textContent.slice(0, matchStart);
    node.parentNode.insertBefore(replacementEl, node.nextSibling);
    replacementEl.parentNode.insertBefore(afterNode, replacementEl.nextSibling);

    let newRange = document.createRange();
    newRange.setStart(afterNode, 0);
    newRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(newRange);
};

window.drawBrainboardNodes = function() {
    let board = document.getElementById('bb-board');
    if (!board) return;

    // Clean old nodes but keep the SVG links layer
    Array.from(board.children).forEach(child => {
        if (child.id !== 'bb-svg') child.remove();
    });

    window.updateBrainboardLinks(); // Draw Spidey Tape

    appData.brainboard.forEach(node => {
        let el = document.createElement('div');
        el.className = 'bb-node'; // Class added for click-filtering
        el.id = node.id;
        node.r = node.r || 0; 
        
        let isLinking = window.bbLinkingFrom === node.id;
        let borderStyle = isLinking ? '2px dashed var(--danger)' : '1px solid var(--border-accent)';
        let shadow = isLinking ? '0 0 15px rgba(248, 113, 113, 0.5)' : 'var(--sh2)';

        el.style.cssText = `
            position: absolute; left: ${node.x}px; top: ${node.y}px; 
            width: ${node.w}px; height: ${node.h}px; 
            background: var(--surface); border: ${borderStyle}; 
            border-radius: 12px; box-shadow: ${shadow};
            overflow: hidden; display: flex; flex-direction: column;
            transform: rotate(${node.r}deg); transform-origin: center center;
            touch-action: none; z-index: 10; -webkit-tap-highlight-color: transparent;
            cursor: default;
        `;

        // The Header with Link (Spidey Tape) & Delete buttons
        let header = document.createElement('div');
        header.className = 'bb-node-handle';
        header.style.cssText = `
            background: var(--surface-hover); padding: 4px 4px 4px 8px; cursor: grab;
            display: flex; justify-content: space-between; align-items: center;
            border-bottom: 1px solid var(--border); font-size: 0.65rem; color: var(--text-muted);
            user-select: none; -webkit-touch-callout: none; border-radius: 12px 12px 0 0;
        `;
        header.innerHTML = `
            <span>⠿ Move</span>
            <div style="display:flex; gap:2px; align-items:center;">
                <span style="cursor:pointer; color:var(--danger); font-size:0.9rem; padding:7px 8px; line-height:1;" onpointerdown="toggleSpideyTape('${node.id}'); event.stopPropagation();" title="Link/Spidey Tape">🔗</span>
                <span style="cursor:pointer; color:var(--danger); font-size:0.85rem; padding:7px 8px; line-height:1;" onpointerdown="deleteBrainboardNode('${node.id}'); event.stopPropagation();" title="Delete">✕</span>
            </div>
        `;

        let body = document.createElement('div');
        body.style.cssText = `flex: 1; padding: 8px; padding-bottom: 30px; overflow: hidden; display:flex; flex-direction:column; border-radius: 0 0 12px 12px;`;

        if (node.type === 'text') {
            body.style.padding = '0';

            let toolbar = document.createElement('div');
            toolbar.style.cssText = `display:none; flex-wrap:wrap; gap:1px; padding:2px 3px; border-bottom:1px solid var(--border); flex-shrink:0; -webkit-tap-highlight-color:transparent;`;
            toolbar.innerHTML = `
                <button type="button" class="bb-fmt-btn" data-cmd="bold" title="Bold (*text*)"><b>B</b></button>
                <button type="button" class="bb-fmt-btn" data-cmd="italic" title="Italic (_text_)"><i>I</i></button>
                <button type="button" class="bb-fmt-btn" data-cmd="underline" title="Underline"><u>U</u></button>
                <button type="button" class="bb-fmt-btn" data-cmd="insertUnorderedList" title="Bullet list">☰•</button>
                <button type="button" class="bb-fmt-btn" data-cmd="insertOrderedList" title="Numbered list">☰1</button>
                <button type="button" class="bb-fmt-btn" data-cmd="checklist" title="Checklist">☑</button>
            `;

            let editable = document.createElement('div');
            editable.contentEditable = 'true';
            editable.className = 'bb-note-body';
            editable.style.cssText = `flex:1; padding:8px; padding-bottom:24px; overflow:auto; outline:none; font-family: var(--font-main); font-size: 0.85rem; color: var(--text); cursor: text;`;
            editable.innerHTML = node.content || '';

            editable.addEventListener('pointerdown', (e) => e.stopPropagation());
            editable.addEventListener('focus', () => { toolbar.style.display = 'flex'; });
            editable.addEventListener('input', () => {
                window.tryInlineMarkdownShortcut(editable);
                node.content = editable.innerHTML;
            });
            editable.addEventListener('blur', () => {
                toolbar.style.display = 'none';
                saveData();
            });
            editable.addEventListener('change', (e) => {
                if (e.target && e.target.matches('input[type="checkbox"]')) {
                    e.target.toggleAttribute('checked', e.target.checked);
                    node.content = editable.innerHTML;
                    saveData();
                }
            });
            editable.addEventListener('paste', (e) => {
                e.preventDefault();
                let html = e.clipboardData.getData('text/html');
                let insertHtml;
                if (html) {
                    insertHtml = window.sanitizePastedHtml(html);
                } else {
                    let text = e.clipboardData.getData('text/plain');
                    insertHtml = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
                }
                document.execCommand('insertHTML', false, insertHtml);
                node.content = editable.innerHTML;
            });

            toolbar.querySelectorAll('.bb-fmt-btn').forEach(btn => {
                // Prevent the editable from losing focus/selection when tapping a toolbar button.
                btn.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); });
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    editable.focus();
                    if (btn.dataset.cmd === 'checklist') {
                        document.execCommand('insertHTML', false, '<div class="bb-check-item"><input type="checkbox"> <span>New item</span></div>');
                    } else {
                        document.execCommand(btn.dataset.cmd, false, null);
                    }
                    node.content = editable.innerHTML;
                });
            });

            body.appendChild(toolbar);
            body.appendChild(editable);
        } else if (node.type === 'image') {
            body.style.padding = '0';
            body.style.background = 'rgba(0,0,0,0.2)';
            if (window.bbImageCache[node.fileId]) {
                body.innerHTML = `<img src="${window.bbImageCache[node.fileId]}" style="width:100%; height:100%; object-fit:contain; pointer-events:none;" draggable="false">`;
            } else {
                body.innerHTML = `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:var(--text-muted); font-size:0.7rem; text-align:center; padding:8px;" id="img_ldr_${node.id}">Loading...</div>`;
                if (node.fileId) {
                    window.driveApiFetch(`https://www.googleapis.com/drive/v3/files/${node.fileId}?alt=media`)
                        .then(res => res.blob())
                        .then(blob => {
                            let objUrl = URL.createObjectURL(blob);
                            window.bbImageCache[node.fileId] = objUrl;
                            let ldr = document.getElementById(`img_ldr_${node.id}`);
                            if (ldr) ldr.parentElement.innerHTML = `<img src="${objUrl}" style="width:100%; height:100%; object-fit:contain; pointer-events:none;" draggable="false">`;
                        })
                        .catch(err => {
                            console.error('Image load failed:', err);
                            let ldr = document.getElementById(`img_ldr_${node.id}`);
                            if (ldr) ldr.textContent = 'Reconnect Google Drive to view this image';
                        });
                }
            }
        } else if (node.type === 'video') {
            body.style.padding = '0';
            body.style.background = '#000';
            body.innerHTML = `<iframe src="https://drive.google.com/file/d/${node.fileId}/preview" style="width:100%; height:100%; border:0;" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        } else if (node.type === 'youtube') {
            body.style.padding = '0';
            body.style.background = '#000';
            body.innerHTML = `<iframe src="https://www.youtube.com/embed/${node.youtubeId}" style="width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else if (node.type === 'file' || !node.type) {
            body.innerHTML = `
                <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
                    <div style="font-size:2rem; margin-bottom:5px;">📄</div>
                    <div style="font-size:0.7rem; font-weight:bold; color:var(--accent); word-break:break-all;">${node.filename}</div>
                    <a href="${node.url}" target="_blank" style="margin-top:8px; font-size:0.75rem; color:var(--success); text-decoration:none; border:1px solid var(--success); padding:3px 10px; border-radius:100px;">Open File ↗</a>
                </div>
            `;
        }

        let rotator = document.createElement('div');
        rotator.className = 'bb-node-handle';
        rotator.style.cssText = `
            position: absolute; bottom: 6px; left: 50%; transform: translateX(-50%);
            width: 28px; height: 28px; background: var(--surface-light); border: 1px solid var(--border-accent);
            border-radius: 50%; cursor: grab; display: flex; align-items: center; justify-content: center;
            font-size: 0.8rem; color: var(--accent); box-shadow: var(--sh1); user-select: none;
            -webkit-touch-callout: none; touch-action: none; z-index: 10;
        `;
        rotator.innerHTML = '↻';

        // ── RESIZE HANDLE (custom, so it works with touch on mobile too) ──
        let resizer = document.createElement('div');
        resizer.className = 'bb-node-handle';
        resizer.style.cssText = `
            position: absolute; bottom: 0; right: 0;
            width: 30px; height: 30px; cursor: nwse-resize;
            display: flex; align-items: flex-end; justify-content: flex-end;
            padding: 4px; color: var(--text-muted); font-size: 0.9rem;
            opacity: 0.7; touch-action: none; z-index: 11; user-select: none;
            -webkit-touch-callout: none;
        `;
        resizer.innerHTML = '⤡';

        el.appendChild(header);
        el.appendChild(body);
        el.appendChild(rotator);
        el.appendChild(resizer);
        board.appendChild(el);

        // ── NODE DRAG LOGIC (Adjusted for scale) ──
        let isDragging = false;
        let startX, startY, initialX, initialY;

        header.addEventListener('pointerdown', (e) => {
            isDragging = true;
            header.style.cursor = 'grabbing';
            startX = e.clientX; startY = e.clientY;
            initialX = node.x; initialY = node.y;
            header.setPointerCapture(e.pointerId);
            e.stopPropagation();
        });

        header.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            // Math: screen movement divided by camera zoom = world movement
            let dx = (e.clientX - startX) / appData.bbCam.z;
            let dy = (e.clientY - startY) / appData.bbCam.z;
            node.x = initialX + dx;
            node.y = initialY + dy;
            el.style.left = node.x + 'px';
            el.style.top = node.y + 'px';
            window.updateBrainboardLinks(); // Realtime tape drag!
        });

        header.addEventListener('pointerup', (e) => {
            if (isDragging) {
                isDragging = false;
                header.style.cursor = 'grab';
                header.releasePointerCapture(e.pointerId);
                saveData(); 
            }
        });

        // ── ROTATOR LOGIC ──
        let isRotating = false;
        rotator.addEventListener('pointerdown', (e) => {
            isRotating = true;
            rotator.style.cursor = 'grabbing';
            rotator.setPointerCapture(e.pointerId);
            e.stopPropagation(); e.preventDefault();
        });
        rotator.addEventListener('pointermove', (e) => {
            if (!isRotating) return;
            let rect = el.getBoundingClientRect();
            let cx = rect.left + rect.width / 2;
            let cy = rect.top + rect.height / 2;
            let angle = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI);
            node.r = Math.round(angle - 90);
            el.style.transform = `rotate(${node.r}deg)`;
            window.updateBrainboardLinks(); 
        });
        rotator.addEventListener('pointerup', (e) => {
            if (isRotating) {
                isRotating = false;
                rotator.style.cursor = 'grab';
                rotator.releasePointerCapture(e.pointerId);
                saveData();
            }
        });

        // ── RESIZER LOGIC (mouse + touch) ──
        let isResizing = false;
        let startRX, startRY, startW, startH;
        resizer.addEventListener('pointerdown', (e) => {
            isResizing = true;
            startRX = e.clientX; startRY = e.clientY;
            startW = node.w; startH = node.h;
            resizer.setPointerCapture(e.pointerId);
            e.stopPropagation(); e.preventDefault();
        });
        resizer.addEventListener('pointermove', (e) => {
            if (!isResizing) return;
            let dx = (e.clientX - startRX) / appData.bbCam.z;
            let dy = (e.clientY - startRY) / appData.bbCam.z;
            node.w = Math.max(120, startW + dx);
            node.h = Math.max(60, startH + dy);
            el.style.width = node.w + 'px';
            el.style.height = node.h + 'px';
            window.updateBrainboardLinks();
        });
        resizer.addEventListener('pointerup', (e) => {
            if (isResizing) {
                isResizing = false;
                resizer.releasePointerCapture(e.pointerId);
                saveData();
            }
        });
    });
};

// ── SPIDEY TAPE LOGIC ──
window.toggleSpideyTape = function(nodeId) {
    if (!window.bbLinkingFrom) {
        // Start linking
        window.bbLinkingFrom = nodeId;
        drawBrainboardNodes(); // Highlight the node
    } else if (window.bbLinkingFrom === nodeId) {
        // Cancel linking
        window.bbLinkingFrom = null;
        drawBrainboardNodes();
    } else {
        // Complete the link
        let existingIdx = appData.bbLinks.findIndex(l => 
            (l.source === window.bbLinkingFrom && l.target === nodeId) || 
            (l.target === window.bbLinkingFrom && l.source === nodeId)
        );
        
        if (existingIdx !== -1) {
            // Toggle off if it already exists
            appData.bbLinks.splice(existingIdx, 1);
        } else {
            // Create new tape
            appData.bbLinks.push({ source: window.bbLinkingFrom, target: nodeId });
        }
        
        window.bbLinkingFrom = null;
        saveData();
        drawBrainboardNodes();
    }
};

window.updateBrainboardLinks = function() {
    let svg = document.getElementById('bb-svg');
    if (!svg) return;
    
    let html = '';
    (appData.bbLinks || []).forEach(link => {
        let n1 = appData.brainboard.find(n => n.id === link.source);
        let n2 = appData.brainboard.find(n => n.id === link.target);
        if(n1 && n2) {
            let cx1 = n1.x + n1.w / 2;
            let cy1 = n1.y + n1.h / 2;
            let cx2 = n2.x + n2.w / 2;
            let cy2 = n2.y + n2.h / 2;
            
            // Draw a beautiful elastic red web curve
            html += `<path d="M ${cx1} ${cy1} C ${cx1} ${cy2}, ${cx2} ${cy1}, ${cx2} ${cy2}" 
                stroke="rgba(248, 113, 113, 0.7)" stroke-width="4" stroke-dasharray="10 6" fill="none" 
                style="filter: drop-shadow(0 0 6px rgba(248,113,113,0.8));" />`;
        }
    });
    
    // Draw an active line if currently linking to mouse? (Optional, skipping for stability)
    svg.innerHTML = html;
};

window.deleteBrainboardNode = async function(id) {
    if(!await tdxConfirm("Remove this item from the board?", { title: 'Remove Item', icon: '🗑️', confirmText: 'Remove', danger: true })) return;
    appData.brainboard = appData.brainboard.filter(n => n.id !== id);
    // Sever connected Spidey Tapes
    appData.bbLinks = appData.bbLinks.filter(l => l.source !== id && l.target !== id);
    saveData();
    drawBrainboardNodes();
};

window.addBrainboardText = function() {
    let id = 'node_' + Date.now().toString(36);
    // Drop it in the center of the current camera view
    let vp = document.getElementById('bb-viewport');
    let worldX = (vp.clientWidth / 2 - appData.bbCam.x) / appData.bbCam.z;
    let worldY = (vp.clientHeight / 2 - appData.bbCam.y) / appData.bbCam.z;

    appData.brainboard.push({
        id: id, type: 'text', content: 'New Note',
        x: worldX - 100, y: worldY - 50, w: 200, h: 100, r: 0
    });
    saveData();
    drawBrainboardNodes();
};

window.extractYoutubeId = function(url) {
    let m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
};

window.addBrainboardYoutube = async function() {
    let url = await tdxPrompt("Paste a YouTube video link:", { title: 'Add YouTube Video', icon: '▶️', placeholder: 'https://youtube.com/watch?v=...' });
    if (!url) return;
    let youtubeId = window.extractYoutubeId(url.trim());
    if (!youtubeId) { tdxAlert("Couldn't find a YouTube video in that link."); return; }

    let id = 'node_' + Date.now().toString(36);
    let vp = document.getElementById('bb-viewport');
    let worldX = (vp.clientWidth / 2 - appData.bbCam.x) / appData.bbCam.z;
    let worldY = (vp.clientHeight / 2 - appData.bbCam.y) / appData.bbCam.z;

    appData.brainboard.push({
        id: id, type: 'youtube', youtubeId: youtubeId,
        x: worldX - 160, y: worldY - 90, w: 320, h: 180, r: 0
    });
    saveData();
    drawBrainboardNodes();
};

window.triggerBrainboardUpload = function(event) {
    if (!event.target.files || event.target.files.length === 0) return;
    let vp = document.getElementById('bb-viewport');
    let worldX = (vp.clientWidth / 2 - appData.bbCam.x) / appData.bbCam.z;
    let worldY = (vp.clientHeight / 2 - appData.bbCam.y) / appData.bbCam.z;

    Array.from(event.target.files).forEach((file, idx) => {
        handleBrainboardUpload(file, worldX + (idx*20), worldY + (idx*20)); 
    });
    event.target.value = ''; 
};

// Videos under this size play inline on the board (via Drive's preview player);
// larger ones are still uploaded but shown as an "Open File" link instead.
window.BB_VIDEO_INLINE_LIMIT = 100 * 1024 * 1024; // 100MB

window.handleBrainboardUpload = async function(file, dropX, dropY) {
    if (!sessionStorage.getItem('gdrive_token')) { tdxAlert("Session expired. Please reconnect Google Drive."); connectGoogleDrive(); return; }

    let tempId = 'loading_' + Date.now();
    appData.brainboard.push({
        id: tempId, type: 'text', content: `Uploading ${file.name}...<br>Please wait ⚡`,
        x: dropX, y: dropY, w: 200, h: 120
    });
    drawBrainboardNodes();

    let metadata = { name: file.name, mimeType: file.type };
    let form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    try {
        let res = await window.driveApiFetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,webViewLink', {
            method: 'POST',
            body: form
        });
        let data = await res.json();
        if (data.error) throw new Error(data.error.message);

        let node = appData.brainboard.find(n => n.id === tempId);
        if (node) {
            node.type = file.type.startsWith('image/') ? 'image'
                : file.type.startsWith('video/') ? (file.size <= window.BB_VIDEO_INLINE_LIMIT ? 'video' : 'file')
                : 'file';
            node.fileId = data.id;
            node.url = data.webViewLink;
            node.filename = file.name;
            delete node.content;

            // If sharing is already on, publish this new attachment immediately
            // so it's visible in the shared link without needing to reopen Share.
            if (appData.bbShareId) {
                let ok = await window.makeDriveFilePublic(node.fileId);
                if (ok) {
                    node.driveShared = true;
                    node.publicUrl = `https://drive.google.com/thumbnail?id=${node.fileId}&sz=w2000`;
                }
            }

            saveData(); drawBrainboardNodes();
        }
    } catch (err) {
        console.error("Drive Upload Error:", err);
        if (err.message === 'DRIVE_TOKEN_EXPIRED' || err.message === 'NO_DRIVE_TOKEN') {
            tdxAlert("Your Google Drive session expired. Please reconnect Google Drive and try uploading again.");
        } else {
            tdxAlert("Upload failed: " + err.message);
        }
        appData.brainboard = appData.brainboard.filter(n => n.id !== tempId);
        drawBrainboardNodes();
    }
};

// ── SHARING ──
// A shared link mirrors a read-only copy of the board to a public path
// (sharedBoards/<id>) that anyone with the link can view; only the owner
// can keep editing the live board.

// navigator.clipboard needs a secure context + isn't implemented everywhere
// on mobile (some Android WebViews / non-HTTPS contexts) — fall back to the
// old execCommand trick so "Copy Link" always does something.
window.copyTextToClipboard = async function(text) {
    if (navigator.clipboard && window.isSecureContext) {
        try { await navigator.clipboard.writeText(text); return true; } catch (e) { /* fall through */ }
    }
    let ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed; top:0; left:-9999px;';
    document.body.appendChild(ta);
    ta.focus();
    ta.setSelectionRange(0, ta.value.length);
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
};

// Wraps a Drive API call with the stored OAuth token. Google access tokens
// from signInWithPopup expire after ~1hr with no refresh token exposed to us,
// so a 401 here almost always means "session expired" rather than a real
// permissions problem — treat it uniformly by dropping the stale token and
// falling back to the "Connect Google Drive" screen instead of a cryptic
// Google error message.
window.driveApiFetch = async function(url, options = {}) {
    let token = sessionStorage.getItem('gdrive_token');
    if (!token) { window.handleDriveAuthExpired(); throw new Error('NO_DRIVE_TOKEN'); }
    let headers = new Headers(options.headers || {});
    headers.set('Authorization', 'Bearer ' + token);
    let res = await fetch(url, { ...options, headers });
    if (res.status === 401) {
        window.handleDriveAuthExpired();
        throw new Error('DRIVE_TOKEN_EXPIRED');
    }
    return res;
};

window.handleDriveAuthExpired = function() {
    sessionStorage.removeItem('gdrive_token');
    if (window.renderBrainboard) window.renderBrainboard();
};

// Grants "anyone with the link can view" on a Drive file so it loads for
// people who aren't signed into the owner's Google account. Idempotent-ish:
// callers should skip files that already have node.driveShared set.
window.makeDriveFilePublic = async function(fileId) {
    if (!fileId) return false;
    try {
        let res = await window.driveApiFetch(`https://www.googleapis.com/drive/v3/files/${fileId}/permissions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ role: 'reader', type: 'anyone' })
        });
        return res.ok;
    } catch (err) {
        console.error('Drive publish failed:', err);
        return false;
    }
};

// Publishes any not-yet-public Drive-backed nodes (image/video/file) so they're
// visible to shared-link viewers who aren't signed into the owner's Drive.
// Also re-derives publicUrl for already-shared nodes, so boards shared before
// a URL-format fix pick up the corrected link the next time Share is opened.
window.publishDriveAttachments = async function() {
    let driveNodes = (appData.brainboard || []).filter(n =>
        (n.type === 'image' || n.type === 'video' || n.type === 'file') && n.fileId
    );
    if (!driveNodes.length) return true;

    let needPermission = driveNodes.filter(n => !n.driveShared);
    let allOk = true;
    if (needPermission.length) {
        if (!sessionStorage.getItem('gdrive_token')) {
            allOk = false;
        } else {
            for (let n of needPermission) {
                let ok = await window.makeDriveFilePublic(n.fileId);
                if (ok) n.driveShared = true;
                else allOk = false;
            }
        }
    }

    // drive.google.com/uc?export=view stopped reliably serving image bytes to
    // hotlinked <img> tags — the thumbnail endpoint is the current stable
    // replacement and doesn't require the viewer to be signed in.
    driveNodes.forEach(n => {
        if (n.driveShared) n.publicUrl = `https://drive.google.com/thumbnail?id=${n.fileId}&sz=w2000`;
    });
    return allOk;
};

window.openBrainboardShareModal = async function() {
    if (!appData.bbShareId) {
        appData.bbShareId = 'share_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    }

    let modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal" style="max-width:420px;">
            <h2>🔗 Share Brainboard</h2>
            <p style="font-size:0.85rem; color:var(--text-muted);">Anyone with this link can view your board (read-only). Keep editing normally — the shared view updates every time you save.</p>
            <div id="bb-share-body" style="font-size:0.8rem; color:var(--text-muted); text-align:center; padding:14px 0;">Preparing your shareable link…</div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

    let attachmentsOk = await window.publishDriveAttachments();
    saveData(); // persists bbShareId + driveShared/publicUrl flags, and publishes the board mirror

    let url = `${location.origin}${location.pathname}?shared=${appData.bbShareId}`;
    let warning = attachmentsOk ? '' : `<p style="font-size:0.78rem; color:var(--danger);">Reconnect Google Drive so uploaded images/files are visible to viewers.</p>`;
    modal.querySelector('#bb-share-body').outerHTML = `
        <div id="bb-share-body">
            ${warning}
            <input type="text" readonly value="${url}" onclick="this.setSelectionRange(0, this.value.length);" style="font-size:0.8rem; text-align:left; font-family:'JetBrains Mono',monospace;">
            <div class="modal-buttons">
                <button class="btn" id="bb-share-stop">Stop Sharing</button>
                <button class="btn btn-primary" id="bb-share-copy">Copy Link</button>
            </div>
        </div>
    `;

    modal.querySelector('#bb-share-copy').onclick = async () => {
        let btn = modal.querySelector('#bb-share-copy');
        let ok = await window.copyTextToClipboard(url);
        btn.textContent = ok ? 'Copied!' : 'Couldn\'t copy — select & copy manually';
    };
    modal.querySelector('#bb-share-stop').onclick = async () => {
        if (!await tdxConfirm("Stop sharing? The link will stop working.", { title: 'Stop Sharing', icon: '🔗', confirmText: 'Stop Sharing', danger: true })) return;
        if (window.unpublishSharedBoard) await window.unpublishSharedBoard(appData.bbShareId);
        appData.bbShareId = null;
        saveData();
        modal.remove();
    };
};

// ── HISTORY (one snapshot per calendar day) ──
window.maybeSnapshotBrainboardHistory = function() {
    if (!appData.brainboard || !appData.brainboard.length) return;
    let todayKey = new Date().toISOString().slice(0, 10);
    if (appData.bbLastSnapshotDate === todayKey) return;
    appData.bbLastSnapshotDate = todayKey;
    if (window.saveBrainboardSnapshot) {
        window.saveBrainboardSnapshot(todayKey, {
            nodes: appData.brainboard,
            links: appData.bbLinks || [],
            cam: appData.bbCam || { x: 0, y: 0, z: 1 },
        });
    }
};

window.openBrainboardHistoryModal = async function() {
    let modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal" style="max-width:420px;">
            <h2>🕓 Brainboard History</h2>
            <p style="font-size:0.85rem; color:var(--text-muted);">A snapshot is saved once per day. Pick a date to preview it.</p>
            <div id="bb-history-list" style="max-height:280px; overflow-y:auto; display:flex; flex-direction:column; gap:8px; margin:14px 0;">Loading…</div>
            <div class="modal-buttons">
                <button class="btn" onclick="this.closest('.modal-overlay').remove()">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });

    let dates = window.fetchBrainboardHistoryDates ? await window.fetchBrainboardHistoryDates() : [];
    let listEl = modal.querySelector('#bb-history-list');
    if (!dates.length) {
        listEl.innerHTML = `<div style="font-size:0.8rem; color:var(--text-muted); text-align:center;">No history yet — check back tomorrow.</div>`;
        return;
    }
    listEl.innerHTML = dates.sort().reverse().map(d =>
        `<button class="btn" data-date="${d}" style="justify-content:flex-start;">${d}</button>`
    ).join('');
    listEl.querySelectorAll('button').forEach(btn => {
        btn.onclick = async () => {
            let snap = window.fetchBrainboardSnapshot ? await window.fetchBrainboardSnapshot(btn.dataset.date) : null;
            modal.remove();
            window.previewBrainboardSnapshot(btn.dataset.date, snap);
        };
    });
};

window.previewBrainboardSnapshot = function(dateKey, snap) {
    if (!snap) { tdxAlert("Couldn't load that snapshot."); return; }
    let modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal" style="max-width:700px; width:95vw;">
            <h2>🕓 Brainboard — ${dateKey}</h2>
            <div id="bb-snap-viewport" style="position:relative; width:100%; height:60vh; background:var(--surface-light); border:1px solid var(--border-hi); border-radius:16px; overflow:hidden; touch-action:none;"></div>
            <div class="modal-buttons">
                <button class="btn" onclick="this.closest('.modal-overlay').remove()">Close</button>
                <button class="btn btn-primary" id="bb-snap-restore">Restore This Version</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    window.renderReadonlyBoard('bb-snap-viewport', snap.nodes || [], snap.links || []);

    modal.querySelector('#bb-snap-restore').onclick = async () => {
        if (!await tdxConfirm(`Replace your CURRENT brainboard with the ${dateKey} snapshot? This can't be undone.`, { title: 'Restore Snapshot', icon: '🕓', confirmText: 'Restore', danger: true })) return;
        appData.brainboard = snap.nodes || [];
        appData.bbLinks = snap.links || [];
        appData.bbCam = snap.cam || { x: 0, y: 0, z: 1 };
        saveData();
        window.applyBbCamera();
        drawBrainboardNodes();
        modal.remove();
    };
};

// ── READ-ONLY BOARD RENDERER ──
// Shared by the public "?shared=" viewer page and the history preview modal.
// No drag / resize / rotate / link controls — pan & zoom only.
window.renderReadonlyBoard = function(containerId, nodes, links, cam) {
    let viewport = document.getElementById(containerId);
    if (!viewport) return;
    viewport.style.cursor = 'grab';

    let cam2 = cam ? { ...cam } : { x: 0, y: 0, z: 1 };
    if (!cam && nodes.length) {
        // Auto-fit the camera to the content's bounding box.
        let minX = Math.min(...nodes.map(n => n.x)), minY = Math.min(...nodes.map(n => n.y));
        let maxX = Math.max(...nodes.map(n => n.x + n.w)), maxY = Math.max(...nodes.map(n => n.y + n.h));
        let bw = Math.max(1, maxX - minX), bh = Math.max(1, maxY - minY);
        let vw = viewport.clientWidth || 600, vh = viewport.clientHeight || 400;
        let z = Math.min(vw / (bw + 100), vh / (bh + 100), 1.5);
        cam2 = { x: -minX * z + 50, y: -minY * z + 50, z };
    }

    let board = document.createElement('div');
    board.style.cssText = `position:absolute; width:10000px; height:10000px; transform-origin:0 0; background-image: radial-gradient(circle, rgba(255,255,255,0.08) 2px, transparent 2px); background-size: 40px 40px;`;
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = 'position:absolute; inset:0; width:100%; height:100%; pointer-events:none; z-index:1;';
    board.appendChild(svg);

    function applyCam() { board.style.transform = `translate(${cam2.x}px, ${cam2.y}px) scale(${cam2.z})`; }

    let linkHtml = '';
    (links || []).forEach(link => {
        let n1 = nodes.find(n => n.id === link.source);
        let n2 = nodes.find(n => n.id === link.target);
        if (n1 && n2) {
            let cx1 = n1.x + n1.w / 2, cy1 = n1.y + n1.h / 2;
            let cx2 = n2.x + n2.w / 2, cy2 = n2.y + n2.h / 2;
            linkHtml += `<path d="M ${cx1} ${cy1} C ${cx1} ${cy2}, ${cx2} ${cy1}, ${cx2} ${cy2}"
                stroke="rgba(248, 113, 113, 0.7)" stroke-width="4" stroke-dasharray="10 6" fill="none"
                style="filter: drop-shadow(0 0 6px rgba(248,113,113,0.8));" />`;
        }
    });
    svg.innerHTML = linkHtml;

    (nodes || []).forEach(node => {
        let el = document.createElement('div');
        el.style.cssText = `
            position:absolute; left:${node.x}px; top:${node.y}px; width:${node.w}px; height:${node.h}px;
            background:var(--surface); border:1px solid var(--border-accent); border-radius:12px; box-shadow:var(--sh2);
            overflow:hidden; display:flex; flex-direction:column; z-index: 10;
            transform: rotate(${node.r || 0}deg); transform-origin:center center;
        `;
        let body = document.createElement('div');
        body.style.cssText = `flex:1; padding:8px; overflow:hidden; display:flex; flex-direction:column;`;
        if (node.type === 'text') {
            body.style.overflow = 'auto';
            body.innerHTML = `<div class="bb-note-body" style="font-size:0.85rem; color:var(--text); overflow-wrap:break-word;">${node.content || ''}</div>`;
            // Viewers can see checklist state but can't toggle it — no write access to the shared board.
            body.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.disabled = true);
        } else if (node.type === 'image') {
            body.style.padding = '0';
            body.style.background = 'rgba(0,0,0,0.2)';
            if (node.publicUrl) {
                body.innerHTML = `<img src="${node.publicUrl}" style="width:100%; height:100%; object-fit:contain;" draggable="false">`;
            } else {
                body.innerHTML = `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:var(--text-muted); font-size:0.7rem; text-align:center; padding:8px;">🖼️ Image not shared yet — owner needs to reshare</div>`;
            }
        } else if (node.type === 'video') {
            body.style.padding = '0';
            body.style.background = '#000';
            body.innerHTML = `<iframe src="https://drive.google.com/file/d/${node.fileId}/preview" style="width:100%; height:100%; border:0;" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
        } else if (node.type === 'youtube') {
            body.style.padding = '0';
            body.style.background = '#000';
            body.innerHTML = `<iframe src="https://www.youtube.com/embed/${node.youtubeId}" style="width:100%; height:100%; border:0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else {
            let filenameSafe = (node.filename || 'File').replace(/&/g, '&amp;').replace(/</g, '&lt;');
            body.innerHTML = `
                <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
                    <div style="font-size:2rem; margin-bottom:5px;">📄</div>
                    <div style="font-size:0.7rem; font-weight:bold; color:var(--accent); word-break:break-all;">${filenameSafe}</div>
                    ${node.url ? `<a href="${node.url}" target="_blank" style="margin-top:8px; font-size:0.75rem; color:var(--success); text-decoration:none; border:1px solid var(--success); padding:3px 10px; border-radius:100px;">Open File ↗</a>` : ''}
                </div>
            `;
        }
        el.appendChild(body);
        board.appendChild(el);
    });

    viewport.innerHTML = '';
    viewport.appendChild(board);
    applyCam();

    // Pan (drag) + wheel/pinch zoom only — no node interaction.
    let pointers = [];
    let isPanning = false, startPanX, startPanY, startCamX, startCamY, startDist, startZ;
    viewport.addEventListener('pointerdown', e => {
        pointers.push({ id: e.pointerId, x: e.clientX, y: e.clientY });
        if (pointers.length === 1) {
            isPanning = true;
            startPanX = e.clientX; startPanY = e.clientY;
            startCamX = cam2.x; startCamY = cam2.y;
            viewport.setPointerCapture(e.pointerId);
        } else if (pointers.length === 2) {
            isPanning = false;
            startDist = Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y);
            startZ = cam2.z;
        }
    });
    viewport.addEventListener('pointermove', e => {
        let idx = pointers.findIndex(p => p.id === e.pointerId);
        if (idx !== -1) { pointers[idx].x = e.clientX; pointers[idx].y = e.clientY; }
        if (pointers.length === 1 && isPanning) {
            cam2.x = startCamX + (e.clientX - startPanX);
            cam2.y = startCamY + (e.clientY - startPanY);
            applyCam();
        } else if (pointers.length === 2) {
            let dist = Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y);
            let newZ = Math.min(Math.max(0.1, startZ * (dist / startDist)), 4);

            let rect = viewport.getBoundingClientRect();
            let midX = (pointers[0].x + pointers[1].x) / 2 - rect.left;
            let midY = (pointers[0].y + pointers[1].y) / 2 - rect.top;
            cam2.x = midX - (midX - cam2.x) * (newZ / cam2.z);
            cam2.y = midY - (midY - cam2.y) * (newZ / cam2.z);
            cam2.z = newZ;
            applyCam();
        }
    });
    const endReadonlyPointer = (e) => {
        pointers = pointers.filter(p => p.id !== e.pointerId);
        if (!pointers.length) isPanning = false;
    };
    viewport.addEventListener('pointerup', endReadonlyPointer);
    viewport.addEventListener('pointercancel', endReadonlyPointer);
    viewport.addEventListener('wheel', e => {
        e.preventDefault();
        let newZ = Math.min(Math.max(0.1, cam2.z * (e.deltaY < 0 ? 1.1 : 0.9)), 4);
        let rect = viewport.getBoundingClientRect();
        let mx = e.clientX - rect.left, my = e.clientY - rect.top;
        cam2.x = mx - (mx - cam2.x) * (newZ / cam2.z);
        cam2.y = my - (my - cam2.y) * (newZ / cam2.z);
        cam2.z = newZ;
        applyCam();
    });
};

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
        ? `Your best efficiency is below 50 — baseline of <strong>50 pts/day</strong> will be used.`
        : `Based on your best day (${Math.round(bestEff)} eff), target = <strong>${autoVal} pts/day</strong> (×1.1).`;

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
                    <div class="sett-row-label">Classic Gear FAB</div>
                    <div class="sett-row-desc">Disable the liquid matrix and restore the mechanical gear.</div>
                </div>
                <label class="at-switch" style="margin-left:12px;">
                    <input type="checkbox" id="sett-fab-gear" ${s.classicFab ? 'checked' : ''}>
                    <span class="at-slider"></span>
                </label>
            </div>
            <div class="sett-row" style="margin-top:10px;">
                <div>
                    <div class="sett-row-label">Campaign End Date</div>
                    <div class="sett-row-desc">The last day of your campaign. TOTAL_DAYS is recalculated automatically. Also the default deadline for any exercise without its own — set a per-exercise deadline in the Data Editor.</div>
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
            <div class="sett-row" style="margin-top:10px; flex-direction:column; align-items:stretch; gap:8px;">
                <div>
                    <div class="sett-row-label">YouTube Data API Key</div>
                    <div class="sett-row-desc">Optional — your own free key, used only in your browser to auto-fetch playlist video lengths for the Library. Leave blank to use the app's shared default (never shown here). <a href="https://console.cloud.google.com/apis/library/youtube.googleapis.com" target="_blank" rel="noopener" style="color:var(--accent);">Get one here</a>.</div>
                </div>
                <input type="password" id="sett-yt-api-key" value="${s.youtubeApiKey || ''}" autocomplete="off" placeholder="${s.youtubeApiKey ? '••••••••••••••••' : 'Using shared default key'}" style="width:100%; padding:8px 10px; background:var(--surface-light); border:1px solid var(--border); border-radius:8px; color:var(--text); font-family:'JetBrains Mono',monospace; font-size:0.78rem;">
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

        ${_buildPriGroup('🌱', 'Habits', 'Recurring habits that reset every day — tracked separately from your resource schedule.', `
            <div id="habits-settings-list"></div>
            <div style="display:flex; flex-direction:column; gap:10px; margin-top:12px; padding-top:12px; border-top:1px dashed var(--border);">
                <div>
                    <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; font-weight:800; color:var(--text-muted); margin-bottom:6px;">Icon</div>
                    ${_habitIconPickerHtml('new-habit', '🌱')}
                </div>
                <div>
                    <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; font-weight:800; color:var(--text-muted); margin-bottom:6px;">Name</div>
                    <input type="text" id="new-habit-title" placeholder="e.g. Read for 20 mins" style="padding:10px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-size:0.85rem; width:100%;">
                </div>
                <div>
                    <div style="font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; font-weight:800; color:var(--text-muted); margin-bottom:6px;">Measured In / Target</div>
                    <div style="display:flex; gap:8px;">
                        <select id="new-habit-mode" style="flex:1; padding:10px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-size:0.8rem;">
                            <option value="q">📝 Questions</option>
                            <option value="min">⏱️ Minutes</option>
                            <option value="pts">🏆 Points</option>
                        </select>
                        <input type="number" id="new-habit-target" placeholder="Target" min="1" value="1" style="width:90px; padding:10px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-size:0.85rem; text-align:center;">
                    </div>
                </div>
                ${_habitAdvancedToggleHtml('new-habit-advanced')}
                <div id="new-habit-advanced" style="display:none; flex-direction:column; gap:8px;">
                    <select id="new-habit-resource" style="padding:10px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-size:0.8rem;">
                        <option value="">— Not tied to a resource (simple habit) —</option>
                        ${RESOURCES_LIST.map(r => `<option value="${r.file}">${r.name}</option>`).join('')}
                    </select>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <span style="font-size:0.7rem; color:var(--text-muted); white-space:nowrap;">Ends</span>
                        <input type="date" id="new-habit-enddate" style="flex:1; padding:8px; background:var(--bg); color:var(--text); border:1px solid var(--border); border-radius:8px; font-size:0.78rem;">
                        <span style="font-size:0.62rem; color:var(--text-subtle); white-space:nowrap;">blank = indefinite</span>
                    </div>
                </div>
                <button class="btn btn-primary" style="margin:0;" onclick="addHabit()">+ Add Habit</button>
            </div>
        `, 'habits', false)}

        ${dynamicPriSections}

        ${_buildPriGroup('🚫', 'Never Skip — Assign All Questions',
        'Selected items always get 100% of remaining questions regardless of porosity. OC is unaffected.',
        _buildNoSkipSection(s),
        'noskip', false)}

        <div class="arcade-toggle-row" style="margin-top:18px;">
            <span style="font-size:0.68rem; color:var(--text-subtle); display:flex; align-items:center; gap:8px;">
                🕹️ arcade mode
                <span class="arcade-coin-blink">${s.arcadeMode ? 'PLAYER 1 READY' : 'INSERT COIN ▸'}</span>
            </span>
            <label class="at-switch">
                <input type="checkbox" id="sett-arcade-mode" ${s.arcadeMode ? 'checked' : ''} onchange="toggleArcadeMode(this.checked); this.closest('.arcade-toggle-row').querySelector('.arcade-coin-blink').textContent = this.checked ? 'PLAYER 1 READY' : 'INSERT COIN ▸';">
                <span class="at-slider"></span>
            </label>
        </div>
    `;

    document.querySelectorAll('.drag-list').forEach(list => _attachDragList(list));
    renderHabitsSettingsList();
    document.getElementById('settings-overlay').classList.add('open');
}

window.toggleArcadeMode = function (on) {
    if (!appData.settings) appData.settings = {};
    appData.settings.arcadeMode = on;
    document.body.classList.toggle('arcade-mode', on);
    saveData();
};

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
        ? `Your best efficiency is below 50 — baseline of <strong>50 pts/day</strong> will be used.`
        : `Based on your best day (${Math.round(bestEff)} eff), target = <strong>${autoVal} pts/day</strong> (×1.1).`;
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
    s.classicFab = document.getElementById('sett-fab-gear')?.checked ?? false;
    s.youtubeApiKey = document.getElementById('sett-yt-api-key')?.value.trim() || '';
    s.fabStyle = document.getElementById('sett-fab-style')?.value || 'liquid';
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
        + `<button onclick="goToToday()" title="Jump to today" style="flex:0 0 auto; padding:4px 10px; background:var(--accent-dim); border:1px solid var(--border-accent); border-radius:5px; cursor:pointer; color:var(--accent); font-size:0.72rem; font-weight:700; align-self:center; font-family:'Bricolage Grotesque',sans-serif; letter-spacing:0.5px; margin-left:4px;">⚔️ Today</button>`;
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

        for (let i = 0; i <= pts; i++) {
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
        <div style="display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px 6px 14px;
            background:color-mix(in srgb,${rc} 7%,var(--surface-light));
            border:1px solid color-mix(in srgb,${rc} 28%,transparent);
            border-radius:18px;transition:transform 0.18s var(--spring),box-shadow 0.18s;cursor:default;"
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
            <div style="font-size:1.2rem;line-height:1;margin-top:4px;">${emoji}</div>
            <div style="font-size:0.6rem;font-weight:700;font-family:'Bricolage Grotesque',sans-serif;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);text-align:center;line-height:1.3;width:100%;padding:0 8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${label}</div>
            <div style="font-size:0.6rem;color:color-mix(in srgb,${rc} 80%,transparent);font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${d}/${t}</div>
        </div>`);
    });
    let resHtml = `<div style="display:grid;grid-template-columns:repeat(2, minmax(0, 1fr));gap:10px;">${resCards.join('')}</div>`;
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
        <div style="padding:24px 16px 20px; background:color-mix(in srgb,${todayGrad.includes('34d399') ? '#34d399' : todayGrad.includes('fb923c') ? '#fb923c' : '#f87171'} 8%,var(--surface-light)); border:1px solid var(--border); border-radius:24px; margin-bottom:16px; text-align:center; animation:springUp var(--dur-lg) var(--spring) both;">
            <div style="font-size:3.8rem; font-weight:800; background:${todayGrad}; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace; line-height:1.1; animation:heroCount var(--dur-lg) var(--spring) both;">${todayPct}%</div>
            <div style="font-size:0.65rem; color:var(--text-subtle); margin-top:8px; text-transform:uppercase; letter-spacing:2px; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;">Daily Progress</div>
            <div class="progress-bar-bg" style="margin-top:16px; height:8px;">
                <div class="progress-bar-fill" style="width:${todayPct}%; background:${todayGrad};"></div>
            </div>
            <div style="font-size:0.68rem; color:var(--text-subtle); margin-top:8px; font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${todayDone} done &nbsp;·&nbsp; ${todayAssigned} assigned</div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:16px;">
            <div style="background:color-mix(in srgb,#fb923c 8%,var(--surface-light)); border:1px solid var(--border); border-radius:20px; padding:18px 4px; text-align:center; animation:springUp var(--dur-lg) var(--spring) 60ms both;">
                <div style="font-size:1.7rem; font-weight:800; background:linear-gradient(135deg,#fb923c,#fbbf24); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace; line-height:1.2; animation:heroCount var(--dur-lg) var(--spring) 80ms both;">${strk}</div>
                <div style="font-size:0.55rem; color:var(--text-subtle); text-transform:uppercase; letter-spacing:1px; margin-top:6px; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;">Streak<br>🔥</div>
            </div>
            <div style="background:color-mix(in srgb,#f5a623 8%,var(--surface-light)); border:1px solid var(--border); border-radius:20px; padding:18px 4px; text-align:center; animation:springUp var(--dur-lg) var(--spring) 120ms both;">
                <div style="font-size:1.7rem; font-weight:800; background:linear-gradient(135deg,#f5a623,#fbbf24); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace; line-height:1.2; animation:heroCount var(--dur-lg) var(--spring) 140ms both;">${daysLeft}</div>
                <div style="font-size:0.55rem; color:var(--text-subtle); text-transform:uppercase; letter-spacing:1px; margin-top:6px; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;">Days Left<br>🗓️</div>
            </div>
            <div style="background:color-mix(in srgb,#a78bfa 8%,var(--surface-light)); border:1px solid var(--border); border-radius:20px; padding:18px 4px; text-align:center; animation:springUp var(--dur-lg) var(--spring) 180ms both;">
                <div style="font-size:1.7rem; font-weight:800; background:linear-gradient(135deg,#a78bfa,#818cf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace; line-height:1.2; animation:heroCount var(--dur-lg) var(--spring) 200ms both;">${getPersonalBest().best || 0}</div>
                <div style="font-size:0.55rem; color:var(--text-subtle); text-transform:uppercase; letter-spacing:1px; margin-top:6px; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;">Best Day<br>🥇</div>
            </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:10px; margin-bottom:16px;">
            <div style="background:color-mix(in srgb,#34d399 8%,var(--surface-light)); border:1px solid var(--border); border-radius:20px; padding:18px 4px; text-align:center; animation:springUp var(--dur-lg) var(--spring) 240ms both;">
                <div style="font-size:1.9rem; font-weight:800; background:linear-gradient(135deg,#34d399,#6ee7b7); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace; line-height:1.2; animation:heroCount var(--dur-lg) var(--spring) 260ms both;">${totalEffRem.toLocaleString()}</div>
                <div style="font-size:0.55rem; color:var(--text-subtle); text-transform:uppercase; letter-spacing:1px; margin-top:6px; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;">Remaining<br>📚</div>
            </div>
            <div style="background:color-mix(in srgb,#818cf8 8%,var(--surface-light)); border:1px solid var(--border); border-radius:20px; padding:18px 4px; text-align:center; animation:springUp var(--dur-lg) var(--spring) 300ms both;">
                <div style="font-size:1.9rem; font-weight:800; background:linear-gradient(135deg,#818cf8,#a78bfa); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace; line-height:1.2; animation:heroCount var(--dur-lg) var(--spring) 320ms both;">${idealDaily}</div>
                <div style="font-size:0.55rem; color:var(--text-subtle); text-transform:uppercase; letter-spacing:1px; margin-top:6px; font-family:'Bricolage Grotesque',sans-serif; font-weight:700;">Ideal / Day<br>🎯</div>
            </div>
        </div>

        <div class="panel-label">Campaign Progress</div>
        <div style="background:var(--surface-light); border:1px solid var(--border); border-radius:var(--r); padding:14px; margin-bottom:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span class="rank-chip">${getRank(campPct).icon} ${getRank(campPct).title}</span>
                <span style="font-size:0.9rem; font-weight:700; background:${campGrad}; -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-family:'JetBrains Mono','Noto Color Emoji',monospace;">${Math.round(campDonePct)}%</span>
            </div>
            <div class="progress-bar-bg" style="height:6px; background:var(--border); position:relative; overflow:hidden;">
               <div class="progress-bar-fill" style="width:${campDonePct}%; background:${campGrad}; position:absolute; left:0; top:0; height:100%;"></div>
               <div style="width:${campSkipPct}%; background:var(--text-subtle); position:absolute; left:${campDonePct}%; top:0; height:100%;"></div>
            </div>
            <div style="display:flex; flex-direction:column; gap:6px; font-size:0.65rem; color:var(--text-subtle); margin-top:10px; font-family:'JetBrains Mono','Noto Color Emoji',monospace;">
                <div style="display:flex; justify-content:space-between; width:100%;">
                    <span>${campDone.toLocaleString()} done / ${campTotal.toLocaleString()}</span>
                    <span>Skip: ${campSkipped.toLocaleString()}</span>
                </div>
                <div style="color:var(--text-muted);">Next: ${getRank(campPct).min + 5 <= 100 ? getRank(campPct).min + 5 : 100}% → ${(RANKS.find(r => r.min === Math.min(getRank(campPct).min + 5, 100)) || RANKS[RANKS.length - 1]).title}</div>
            </div>
        </div>

        <div class="panel-label">Resource Health</div>
        <div style="margin-bottom:16px;">${resHtml}</div>

        <div class="panel-label">Recent Activity</div>
        <div style="margin-bottom:16px;">${recentHtml}</div>

        <button class="btn" onclick="switchTab('stats')" style="font-size:0.75rem; padding:10px;">📊 Full Stats →</button>
    `;

    updateProfileUI();
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
    let tabBtn = document.getElementById('tab-' + tabId);
    if(tabBtn) tabBtn.classList.add('active');

    let isDesk = window.innerWidth >= 820;
    if (tabId === 'schedule') {
        document.getElementById('main-header').style.display = 'block';
        renderDay();
    } else {
        document.getElementById('main-header').style.display = isDesk ? 'none' : 'none';
    }

    // The combat bar stays up on every tab. On the brainboard tab specifically,
    // the canvas needs to end above it (handled in fitBbViewport) and the page
    // itself shouldn't scroll — panning/zooming happens inside the canvas, not
    // via the outer page.
    document.body.style.overflow = tabId === 'brainboard' ? 'hidden' : '';

    if (tabId === 'custom') renderCustomUI();
    if (tabId === 'visualize') renderVisualizer();
    if (tabId === 'stats') renderStats();
    if (tabId === 'brainboard') renderBrainboard();
    if (tabId === 'library') renderLibrary();

    updateFabVisibility(tabId);
}

// Returns the tab id ('schedule', 'brainboard', …) of whichever .container
// currently has the 'active' class — used by callers that aren't switchTab
// itself (e.g. renderDay after a day-navigation, not a tab-navigation).
function _getActiveTabId() {
    let activeContainer = document.querySelector('.container.active');
    return activeContainer ? activeContainer.id.replace('view-', '') : 'schedule';
}

// ── CONTEXTUAL FAB LOGIC ──
// The FAB should never appear when the fixed combat bar isn't showing —
// it's the bar's "+" action, not a standalone button. The combat bar itself
// is only populated for TODAY (see renderDay), and stays empty on
// weight-0/no-completions "chill" days, so both of those cases hide the FAB
// too, on every tab (the combat bar persists across tab switches).
function updateFabVisibility(tabId) {
    let fab = document.getElementById('fab-container');
    let fabMenu = document.getElementById('fab-menu');
    let combatBar = document.getElementById('combat-bar-fixed');
    let combatBarVisible = !!(combatBar && combatBar.innerHTML.trim());

    if (!combatBarVisible) {
        fab.style.display = 'none';
        if (isMenuFabOpen) toggleFab(); // close menu if open
        return;
    }

    if (tabId === 'brainboard' && !!sessionStorage.getItem('gdrive_token')) {
        fab.style.display = 'flex';
        // Ordered longest label first — tapers top-to-bottom when stacked, and
        // reads as a natural size gradient when laid out horizontally too.
        fabMenu.innerHTML = `
            <button class="fab-menu-item" onclick="toggleFab(); addBrainboardYoutube();">▶️ Add YouTube Video</button>
            <button class="fab-menu-item" onclick="toggleFab(); addBrainboardText();">📝 Add Text Note</button>
            <button class="fab-menu-item" onclick="toggleFab(); document.getElementById('bb-file-input').click();">📁 Upload File</button>
        `;
    } else if (tabId === 'schedule' && viewingDayIdx === currentActualDayIdx) {
        fab.style.display = 'flex';
        fabMenu.innerHTML = `
            <button class="fab-menu-item" onclick="toggleFab(); openWantMore();">⚡ Inject Resource Task</button>
            <button class="fab-menu-item" onclick="toggleFab(); openMissionModal();">🎯 Add Daily Mission</button>
            <button class="fab-menu-item" onclick="toggleFab(); switchTab('editor');">➕ Add Resource</button>
            <button class="fab-menu-item" onclick="toggleFab(); openQuickAddHabitModal();">🌱 Add Habit</button>
        `;
    } else {
        fab.style.display = 'none';
        if (isMenuFabOpen) toggleFab(); // close menu if open
    }
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
        tdxAlert("Please select a new end date.");
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
    document.getElementById('droplet-optimal').checked = s.optimalPorosity ?? SETTINGS_DEFAULTS.optimalPorosity;
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
// No shared backdrop panel behind the whole menu anymore — each pill and
// the main button carry their own negative-glow shadow (see .fab-menu-item
// and #main-fab in index.html/styles.css) so they read as floating
// individually instead of needing a blurred container behind the cluster.
window.toggleFab = function () {
    let menu = document.getElementById('fab-menu');
    let icon = document.getElementById('fab-icon');
    let fabBtn = document.getElementById('main-fab');
    let isGear = document.body.classList.contains('fab-gear');

    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'flex';
        isMenuFabOpen = true;

        if (isGear) {
            // Classic Gear: Rotate the entire physical button. Explicitly
            // clear any icon-only transform too — without this, a stray
            // rotation left on #fab-icon (e.g. from a prior liquid-mode
            // session) could make it look like only the "+" spins while
            // the gear body stays still.
            if (fabBtn) fabBtn.style.transform = 'rotate(45deg)';
            if (icon) icon.style.transform = 'none';
        } else {
            // Liquid Engine: Rotate just the icon, blast the fluid velocity
            if (icon) icon.style.transform = 'rotate(45deg) scale(1.1)';
            currentFabVelocity = 0.35;
            targetFabVelocity = 0.04;
        }
    } else {
        menu.style.display = 'none';
        isMenuFabOpen = false;

        if (isGear) {
            if (fabBtn) fabBtn.style.transform = 'rotate(0deg)';
            if (icon) icon.style.transform = 'none';
        } else {
            if (icon) icon.style.transform = 'rotate(0deg) scale(1)';
            currentFabVelocity = -0.15;
            targetFabVelocity = 0.015;
        }
    }

    // Safety clamp: Lock the outer container rotation when using the liquid engine
    if (!isGear && fabBtn) fabBtn.style.transform = 'rotate(0deg)';
};

// Close FAB if clicked outside
document.addEventListener('click', (e) => {
    let fabWrap = document.getElementById('fab-container');
    // If we clicked outside the FAB area AND the menu is currently open
    if (fabWrap && !fabWrap.contains(e.target) && isMenuFabOpen) {
        // Run your existing toggle function to smoothly reverse all animations
        toggleFab();
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
    tdxAlert("Organic Chemistry Tracker Saved! Your schedule has been updated.");
    renderDay();
}

let currentFabPhase = 0;
let targetFabVelocity = 0; // Initialize at 0 so it stays completely still on load
let currentFabVelocity = 0;
let isMenuFabOpen = false;

function initLiquidFab() {
    const svgDefs = document.querySelector('svg defs');
    let newClip = document.getElementById('m3-flush-fab-shape');

    if (!newClip) {
        newClip = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
        newClip.setAttribute('id', 'm3-flush-fab-shape');
        newClip.setAttribute('clipPathUnits', 'objectBoundingBox');
        const newPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        newClip.appendChild(newPathEl);
        if (svgDefs) svgDefs.appendChild(newClip);
    }

    const fabBtn = document.getElementById('main-fab');
    if (fabBtn && !document.getElementById('fab-icon')) {
        let content = fabBtn.innerHTML.trim() === '+' ? '+' : '+';
        fabBtn.innerHTML = `<span id="fab-icon" style="transition: transform 0.4s var(--spring); display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; pointer-events: none;">${content}</span>`;
    }

    updateFabPath(0);
    window.addEventListener('resize', () => updateFabPath(currentFabPhase));
    requestAnimationFrame(renderFabLoop);
}

function updateFabPath(phase) {
    const fabBtn = document.getElementById('main-fab');
    let btnW = fabBtn ? fabBtn.offsetWidth : 1000;
    if (btnW < 50) btnW = 1000;

    let W = Math.min(320 / btnW, 1.0);
    let pts = ['M 0,1', 'L 0,0.96'];
    let steps = 400;

    for (let i = 0; i <= steps; i++) {
        let x = i / steps;
        let cx = x - 0.5;
        let t = cx / (W / 2);

        if (Math.abs(t) <= 1) {
            let bell = Math.pow(1 - t * t, 2);
            let teeth = Math.cos(t * Math.PI * 8 - phase);
            let fluid = teeth * 0.055 * bell;
            let y = 0.96 - (0.65 * bell) + fluid;
            pts.push(`L ${x.toFixed(4)},${y.toFixed(4)}`);
        } else {
            pts.push(`L ${x.toFixed(4)},0.9600`);
        }
    }
    pts.push('L 1,0.96');
    pts.push('L 1,1 Z');

    let pathEl = document.querySelector('#m3-flush-fab-shape path');
    if (pathEl) pathEl.setAttribute('d', pts.join(' '));
}

function renderFabLoop() {
    if (document.body.classList.contains('fab-gear')) {
        requestAnimationFrame(renderFabLoop);
        return;
    }
    if (isMenuFabOpen) {
        // Active state: smoothly ramp up to the flowing speed targets
        currentFabVelocity += (targetFabVelocity - currentFabVelocity) * 0.08;
        currentFabPhase += currentFabVelocity;
    } else {
        // Idle state: apply heavy brake matrix to the velocity vector
        currentFabVelocity += (0 - currentFabVelocity) * 0.12;
        currentFabPhase += currentFabVelocity;

        // Keep the phase bounded locally within a single unit circle rotation (0 to 2*PI)
        currentFabPhase = currentFabPhase % (Math.PI * 2);
        if (currentFabPhase < 0) currentFabPhase += Math.PI * 2;

        // When the kinetic energy drops below threshold, magnetically guide it to perfect symmetry
        if (Math.abs(currentFabVelocity) < 0.005) {
            currentFabVelocity = 0;

            // Determine whether 0 or 2*PI is closer to the current resting point
            let targetSymmetryPhase = currentFabPhase > Math.PI ? (Math.PI * 2) : 0;

            // Asymptotic deceleration back to absolute structural equilibrium
            currentFabPhase += (targetSymmetryPhase - currentFabPhase) * 0.12;
        }
    }

    updateFabPath(currentFabPhase);
    requestAnimationFrame(renderFabLoop);
}

// Initialize
document.addEventListener('DOMContentLoaded', initLiquidFab);

// ── NAV LABEL FIT ──
// Shrinks every bottom-nav (or sidebar) label by the same amount, in lockstep,
// until the longest one fits without wrapping/clipping — so labels stay
// visible and stay the same size as each other, instead of some tabs having
// text and others not (or each tab at a different size).
window.fitNavLabels = function() {
    let spans = Array.from(document.querySelectorAll('.nav-item span'));
    if (!spans.length) return;

    // Reset to the CSS-defined size first so growing the window can grow the
    // text back too, not just shrink it permanently.
    spans.forEach(span => { span.style.fontSize = ''; });

    let size = parseFloat(getComputedStyle(spans[0]).fontSize);
    let minSize = 8; // px floor — stop shrinking before labels get unreadable
    let step = 0.5;

    let allFit = () => spans.every(span => span.scrollWidth <= span.clientWidth + 1);

    while (!allFit() && size > minSize) {
        size -= step;
        spans.forEach(span => { span.style.fontSize = size + 'px'; });
    }
};
window.fitNavLabels();
window.addEventListener('resize', window.fitNavLabels);
window.addEventListener('orientationchange', () => setTimeout(window.fitNavLabels, 200));

// ── BOTTOM NAV HEIGHT SYNC ──
// #combat-bar-fixed needs to reserve exactly enough space for the bottom nav
// so its solid backdrop reaches the nav with no gap and no overlap. Rather
// than hardcode that height (which silently drifts out of sync whenever the
// nav's own content changes, e.g. hiding labels on phone), measure it live.
window.syncBottomNavHeight = function () {
    if (window.innerWidth >= 820) return; // desktop uses a sidebar, not a bottom bar
    let nav = document.querySelector('.bottom-nav');
    if (!nav) return;
    let h = nav.getBoundingClientRect().height;
    if (h > 0) document.documentElement.style.setProperty('--bottom-nav-h', h + 'px');
};
window.syncBottomNavHeight();
window.addEventListener('resize', window.syncBottomNavHeight);
window.addEventListener('orientationchange', () => setTimeout(window.syncBottomNavHeight, 200));
if (document.fonts && document.fonts.ready) document.fonts.ready.then(window.syncBottomNavHeight);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(window.fitNavLabels);