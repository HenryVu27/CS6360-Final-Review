// ========================================
// DBMS Study Guide - Interactive JavaScript
// ========================================

// ========================================
// Navigation System
// ========================================

function navigateTo(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show target section
    document.getElementById(sectionId).classList.add('active');

    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === sectionId) {
            item.classList.add('active');
        }
    });

    // Scroll to top
    window.scrollTo(0, 0);
}

// Navigation click handlers
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(item.dataset.section);
    });
});

// ========================================
// Topic Tab System
// ========================================

document.querySelectorAll('.topic-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const parent = btn.closest('.section');

        // Update button states
        parent.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update panel visibility
        const topicId = btn.dataset.topic;
        parent.querySelectorAll('.topic-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        parent.querySelector(`#${topicId}`).classList.add('active');
    });
});

// ========================================
// Progress Tracking System
// ========================================

const studyProgress = {
    topics: {},
    load() {
        const saved = localStorage.getItem('dbmsStudyProgress');
        if (saved) {
            this.topics = JSON.parse(saved);
        }
        this.updateUI();
    },
    save() {
        localStorage.setItem('dbmsStudyProgress', JSON.stringify(this.topics));
    },
    markComplete(topicId) {
        this.topics[topicId] = true;
        this.save();
        this.updateUI();
    },
    updateUI() {
        const totalTopics = 24; // Total number of study topics (updated with new content)
        const completed = Object.keys(this.topics).length;
        const percent = Math.round((completed / totalTopics) * 100);

        document.getElementById('progress-fill').style.width = `${percent}%`;
        document.getElementById('progress-text').textContent = `${percent}% Complete`;

        // Update button states
        document.querySelectorAll('.mark-complete-btn').forEach(btn => {
            if (this.topics[btn.dataset.topic]) {
                btn.textContent = 'Completed!';
                btn.classList.add('completed');
            }
        });
    }
};

// Mark complete button handlers
document.querySelectorAll('.mark-complete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!btn.classList.contains('completed')) {
            studyProgress.markComplete(btn.dataset.topic);
        }
    });
});

// Load progress on page load
studyProgress.load();

// ========================================
// Flashcard System
// ========================================

const flashcards = {
    // DBMS Basics
    dbms: [
        { q: "What is a Database?", a: "Collection of data central to some enterprise (persistent)" },
        { q: "What is Metadata?", a: "Description of the database stored in DBMS catalog" },
        { q: "What is Schema (Intension)?", a: "Description/structure of the database that changes infrequently" },
        { q: "What is Instance (Extension)?", a: "Actual data at a particular moment, changes with every update" },
        { q: "What is Logical Data Independence?", a: "Ability to change conceptual schema without changing external schemas" },
        { q: "What is Physical Data Independence?", a: "Ability to change internal schema without changing conceptual schema" },
        { q: "What are the three levels of Three-Schema Architecture?", a: "External (user views), Conceptual (whole database structure), Internal (storage)" },
        { q: "What is a Superkey?", a: "Set of attributes where no two tuples have the same value" },
        { q: "What is a Candidate Key?", a: "A MINIMAL superkey - removing any attribute would make it not a superkey" },
        { q: "What is Entity Integrity Constraint?", a: "Primary key attributes CANNOT be NULL" },
        { q: "What is Referential Integrity?", a: "FK in R1 references PK of R2; values must match or be NULL" },
        { q: "What does SELECT (σ) do in Relational Algebra?", a: "Selects ROWS satisfying a condition" },
        { q: "What does PROJECT (π) do?", a: "Selects COLUMNS and eliminates duplicates" },
        { q: "What is a Natural Join (*)?", a: "Equijoin on ALL common attributes with duplicate columns eliminated" },
        { q: "What does Division (r/s) return?", a: "Tuples <a> where for EVERY tuple <b> in s, <a,b> is in r" },
        { q: "What are the three Data Model Categories?", a: "Conceptual (high-level), Physical (low-level), Implementation (record-oriented like Relational)" },
        { q: "What is DDL?", a: "Data Definition Language - defines schemas; result is catalog (metadata)" },
        { q: "What is DML?", a: "Data Manipulation Language - specifies retrievals and updates (high-level: WHAT; low-level: WHAT and HOW)" },
        { q: "What is Relationally Complete?", a: "A DML with same retrieval power as relational algebra" },
        { q: "How do you map a weak entity to relational?", a: "Combine entity's partial key + owner entity's key as the composite primary key" },
        { q: "What is Arity (Degree) of a relation?", a: "Number of attributes in a relation" },
        { q: "What is Cardinality of a relation?", a: "Number of tuples in a relation" },
        { q: "What is Union Compatibility?", a: "Same number of attributes (degree) AND corresponding attributes have compatible domains" },
        { q: "Which RA operators require Union Compatibility?", a: "UNION (∪), INTERSECTION (∩), SET DIFFERENCE (−)" },
        { q: "What are the preconditions for SELECT (σ)?", a: "Condition attributes must exist in relation; condition must be valid boolean; comparison values must be domain-compatible" },
        { q: "What are the preconditions for PROJECT (π)?", a: "Projected attributes must exist in relation; duplicates are automatically removed" },
        { q: "What are the preconditions for Natural Join?", a: "Must have at least one common attribute name; common attributes must have compatible domains; if no common attrs → Cartesian product" },
        { q: "What are the preconditions for Division (r ÷ s)?", a: "S's attributes must be a SUBSET of R's attributes; result has attributes R − S" },
        { q: "What is the Division formula?", a: "r ÷ s = π(R−S)(r) − π(R−S)((π(R−S)(r) × s) − r)" },
        { q: "What are the 5 basic RA operators?", a: "σ (SELECT), π (PROJECT), ∪ (UNION), − (SET DIFFERENCE), × (CARTESIAN PRODUCT)" },
        { q: "How to express INTERSECTION using basic operators?", a: "R ∩ S = R − (R − S)" },
        { q: "How to express THETA JOIN using basic operators?", a: "R ⋈θ S = σθ(R × S)" },
        { q: "How to express NATURAL JOIN using basic operators?", a: "R * S = π(unique attrs)(σ(common attrs equal)(R × S))" },
        { q: "How to express SEMIJOIN using basic operators?", a: "R ⋉ S = π(R-attrs)(R * S) - tuples of R that match S" },
        { q: "How to express ANTIJOIN using basic operators?", a: "R ▷ S = R − π(R-attrs)(R * S) - tuples of R with NO match in S" },
        { q: "Division step 1: π_A(R) does what?", a: "Gets all A values from R (all possible candidates)" },
        { q: "Division step 2: π_A(R) × S does what?", a: "Creates all possible (A,B) combinations - what R SHOULD have if A matches ALL of S" },
        { q: "Division step 3: (π_A(R) × S) − R does what?", a: "Finds (A,B) pairs that are MISSING from R" },
        { q: "Division final step explanation?", a: "π_A(R) − π_A(missing) = Remove A values that are missing some B → leaves only A's with ALL B's" },
    ],

    // ER & EER
    er: [
        { q: "What is an Entity?", a: "Real-world object/thing represented in database (drawn as RECTANGLE)" },
        { q: "What is a Multi-valued Attribute?", a: "Attribute with multiple values possible (drawn as DOUBLE OVAL)" },
        { q: "What is a Derived Attribute?", a: "Attribute computed from others (drawn as DASHED OVAL)" },
        { q: "What is Total Participation?", a: "Every entity MUST participate in relationship (DOUBLE LINE)" },
        { q: "What is Partial Participation?", a: "Some entities may not participate (SINGLE LINE)" },
        { q: "What does (1,1) mean in min-max notation?", a: "Exactly one relationship (total participation, single value)" },
        { q: "What is a Weak Entity?", a: "Entity without its own key, depends on owner entity (DOUBLE RECTANGLE)" },
        { q: "How is a Weak Entity identified?", a: "Full Key = Partial Key + Owner's Primary Key" },
        { q: "What is Specialization?", a: "Top-down: Defining subclasses of an entity type (superclass)" },
        { q: "What is Generalization?", a: "Bottom-up: Combining entity types with common attributes into superclass" },
        { q: "What does Disjoint (d) constraint mean?", a: "Entity can be member of AT MOST ONE subclass" },
        { q: "What does Overlapping (o) constraint mean?", a: "Entity can be member of MULTIPLE subclasses" },
        { q: "What does Total coverage mean in EER?", a: "Every superclass entity MUST be in some subclass (DOUBLE LINE)" },
        { q: "What do subclasses inherit?", a: "ALL attributes and ALL relationships from superclass" },
        { q: "What is a Ternary Relationship?", a: "Connects 3 entity types simultaneously; NOT equivalent to 3 binary relationships" },
        { q: "What is a Recursive Relationship?", a: "Same entity type participates twice with different roles (e.g., EMPLOYEE supervises EMPLOYEE)" },
        { q: "What is a Specialization Lattice?", a: "Subclass with multiple superclasses (multiple inheritance); forms lattice not hierarchy" },
        { q: "What are the 3 Database Design Phases?", a: "1) Conceptual Design (ER), 2) Schema Refinement (Normalization), 3) Physical Design" },
        { q: "What is Chain of Weakness?", a: "Weak entities forming chains - each level adds to the key" },
        { q: "When to use Entity Set vs Attribute?", a: "Use entity set if: has non-key attributes, has relationships with multiple entities, or is 'many' side" },
    ],

    // Normalization
    norm: [
        { q: "What is Update Anomaly?", a: "A change must be made in multiple places due to redundancy" },
        { q: "What is Deletion Anomaly?", a: "Deleting data may cause loss of other information" },
        { q: "What is Insertion Anomaly?", a: "Cannot insert data without providing other unrelated data" },
        { q: "What does X → Y (Functional Dependency) mean?", a: "If tuples agree on X attributes, they must agree on Y attributes" },
        { q: "What is Armstrong's Reflexivity axiom?", a: "If Y ⊆ X, then X → Y (trivial FD)" },
        { q: "What is Armstrong's Transitivity axiom?", a: "If X → Y and Y → Z, then X → Z" },
        { q: "What is 1NF?", a: "All attribute values must be atomic (no composite, multivalued, or nested)" },
        { q: "What is 2NF?", a: "1NF + No partial dependencies (non-prime depends on part of key)" },
        { q: "What is 3NF?", a: "For X → A: A ⊆ X (trivial) OR X is superkey OR A is prime attribute" },
        { q: "What is BCNF?", a: "For X → Y: Y ⊆ X (trivial) OR X is superkey" },
        { q: "What is a Lossless Decomposition?", a: "Original relation can be reconstructed: r = r1 ⋈ r2" },
        { q: "What is Dependency-preserving Decomposition?", a: "All FDs can be checked without joining tables" },
        { q: "What is the Normal Form hierarchy?", a: "4NF ⇒ BCNF ⇒ 3NF ⇒ 2NF ⇒ 1NF" },
        { q: "Test for Lossless Binary Decomposition?", a: "R1 ∩ R2 → R1 or R1 ∩ R2 → R2 must be in F+" },
        { q: "What is Attribute Closure X+?", a: "Set of all attributes A such that X → A can be derived from F" },
        { q: "What is a Minimal Cover?", a: "Equivalent to F, single attribute RHS, cannot be made smaller" },
        { q: "What is Armstrong's Augmentation axiom?", a: "If X → Y, then XZ → YZ" },
        { q: "What is a Prime Attribute?", a: "Attribute that is part of some candidate key" },
        { q: "What is a Transitive Dependency?", a: "X → Y → Z where Z depends on X through Y" },
        { q: "What is Denormalization?", a: "Intentionally introducing redundancy to improve query performance (avoids joins)" },
    ],

    // SQL
    sql: [
        { q: "What is the difference between char(n) and varchar(n)?", a: "char(n) is fixed length, varchar(n) is variable length" },
        { q: "What does PRIMARY KEY imply?", a: "Implies NOT NULL and UNIQUE" },
        { q: "What does ON DELETE CASCADE do?", a: "Automatically deletes referencing rows when referenced row is deleted" },
        { q: "What does DISTINCT do?", a: "Eliminates duplicate rows from query results" },
        { q: "What is the % wildcard in LIKE?", a: "Matches any sequence of characters" },
        { q: "What is the _ wildcard in LIKE?", a: "Matches exactly one character" },
        { q: "What is a Type I (Non-Correlated) Subquery?", a: "Executes ONCE, no reference to outer query, used with IN/NOT IN" },
        { q: "What is a Type II (Correlated) Subquery?", a: "Executes for EACH ROW of outer, references outer query, used with EXISTS" },
        { q: "What is the difference between WHERE and HAVING?", a: "WHERE filters rows (before grouping), HAVING filters groups (after grouping)" },
        { q: "What is LEFT OUTER JOIN?", a: "All rows from left table + matching from right, unmatched padded with NULLs" },
        { q: "What does COUNT(*) vs COUNT(column) do?", a: "COUNT(*) counts all rows; COUNT(column) ignores NULLs" },
        { q: "What is the query evaluation order?", a: "FROM → WHERE → GROUP BY → aggregates → HAVING → SELECT → ORDER BY" },
        { q: "How to find 'rows NOT in another set'?", a: "NOT EXISTS, NOT IN, LEFT JOIN with IS NULL, or EXCEPT/MINUS" },
        { q: "What are SQL set operators?", a: "UNION (combines, removes dups), INTERSECT (common), EXCEPT (difference)" },
        { q: "What is a View?", a: "Virtual table (not stored) - result of SELECT, materialized when used" },
        { q: "What does WITH CHECK OPTION do?", a: "Ensures new tuples inserted through view will appear in the view" },
        { q: "What is Three-Valued Logic in SQL?", a: "TRUE, FALSE, UNKNOWN - comparisons with NULL yield UNKNOWN" },
        { q: "What happens to UNKNOWN in WHERE clause?", a: "Rows with UNKNOWN are discarded (not returned)" },
        { q: "What is an Assertion?", a: "A predicate the database must always satisfy; CREATE ASSERTION name CHECK (predicate)" },
        { q: "What does INITIALLY DEFERRED do?", a: "Constraint is checked at end of transaction, not immediately" },
        { q: "What does ALTER TABLE do?", a: "ADD or DROP columns; new columns get NULL in existing tuples" },
    ],

    // Transactions
    trans: [
        { q: "What is a Transaction?", a: "Logical unit of database processing with one or more access operations" },
        { q: "What does Atomicity mean?", a: "All actions performed or none (all-or-nothing)" },
        { q: "What does Consistency mean?", a: "Moves database from one consistent state to another" },
        { q: "What does Isolation mean?", a: "Transaction's updates not visible to others before commit" },
        { q: "What does Durability mean?", a: "Committed changes to database are permanent" },
        { q: "What is Lost Update problem?", a: "Two transactions update same item, one update is lost" },
        { q: "What is Dirty Read?", a: "Reading uncommitted data that may be rolled back" },
        { q: "What does UNDO operation do?", a: "Trace BACKWARD, reset items to OLD values" },
        { q: "What does REDO operation do?", a: "Trace FORWARD, set items to NEW values" },
        { q: "What is a Commit Point?", a: "When all operations executed successfully AND effects recorded in log" },
        { q: "What is a Strict Schedule?", a: "No concurrent read/write on any data item" },
        { q: "What is a Cascadeless Schedule?", a: "No dirty read - commit before read" },
        { q: "What is a Serializable Schedule?", a: "Equivalent to some serial schedule of same transactions" },
        { q: "Which operations conflict?", a: "Wi-Wj, Wi-Rj, Ri-Wj conflict; Ri-Rj does NOT conflict" },
        { q: "How to test Conflict Serializability?", a: "Build precedence graph; NO CYCLE means serializable" },
        { q: "What is Throughput?", a: "Number of transactions per second (TPS)" },
        { q: "What is Force Writing?", a: "Before commit point, any unwritten log portion must be written to disk" },
        { q: "What is Committed Projection C(S)?", a: "Operations from committed transactions only" },
        { q: "What is Result Equivalence?", a: "Schedules produce same final DB state - NOT sufficient for correctness" },
        { q: "What is Conflict Equivalence?", a: "Order of any two conflicting operations is identical - standard for correctness" },
        { q: "What is Global Serializability?", a: "For distributed DBs: subtransactions serializable at each site AND globally" },
        { q: "What are the 4 failure types?", a: "Catastrophic, System (HW/disk/OS), Transaction error, Rollback due to concurrency" },
    ]
};

let currentCards = [];
let currentCardIndex = 0;

function loadFlashcards(topic) {
    if (topic === 'all') {
        currentCards = [
            ...flashcards.dbms,
            ...flashcards.er,
            ...flashcards.norm,
            ...flashcards.sql,
            ...flashcards.trans
        ];
    } else {
        currentCards = [...flashcards[topic]];
    }
    currentCardIndex = 0;
    updateFlashcard();
}

function updateFlashcard() {
    const card = currentCards[currentCardIndex];
    document.getElementById('flashcard-question').textContent = card.q;
    document.getElementById('flashcard-answer').textContent = card.a;
    document.getElementById('card-counter').textContent = `Card ${currentCardIndex + 1} of ${currentCards.length}`;

    // Remove flipped state
    document.getElementById('current-flashcard').classList.remove('flipped');
}

function shuffleCards() {
    for (let i = currentCards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentCards[i], currentCards[j]] = [currentCards[j], currentCards[i]];
    }
    currentCardIndex = 0;
    updateFlashcard();
}

// Flashcard event listeners
document.getElementById('flashcard-topic').addEventListener('change', (e) => {
    loadFlashcards(e.target.value);
});

document.getElementById('shuffle-btn').addEventListener('click', shuffleCards);

document.getElementById('prev-card').addEventListener('click', () => {
    if (currentCardIndex > 0) {
        currentCardIndex--;
        updateFlashcard();
    }
});

document.getElementById('next-card').addEventListener('click', () => {
    if (currentCardIndex < currentCards.length - 1) {
        currentCardIndex++;
        updateFlashcard();
    }
});

document.getElementById('flip-card').addEventListener('click', () => {
    document.getElementById('current-flashcard').classList.toggle('flipped');
});

document.getElementById('current-flashcard').addEventListener('click', () => {
    document.getElementById('current-flashcard').classList.toggle('flipped');
});

// Initialize flashcards
loadFlashcards('all');

// ========================================
// Quiz System
// ========================================

const quizQuestions = {
    dbms: [
        {
            q: "What is the purpose of the Three-Schema Architecture?",
            options: ["To increase storage capacity", "To support program-data independence and multiple views", "To speed up queries", "To reduce database size"],
            correct: 1
        },
        {
            q: "Which level of the Three-Schema Architecture deals with user views?",
            options: ["Internal Schema", "Conceptual Schema", "External Schema", "Physical Schema"],
            correct: 2
        },
        {
            q: "What is a minimal superkey called?",
            options: ["Primary Key", "Foreign Key", "Candidate Key", "Super Key"],
            correct: 2
        },
        {
            q: "Entity Integrity Constraint states that:",
            options: ["Foreign keys can be NULL", "Primary key attributes cannot be NULL", "All attributes must be unique", "Tables must have indexes"],
            correct: 1
        },
        {
            q: "Which relational algebra operation selects rows?",
            options: ["PROJECT (π)", "SELECT (σ)", "UNION", "JOIN"],
            correct: 1
        },
        {
            q: "The PROJECT operation:",
            options: ["Selects rows", "Eliminates duplicates", "Combines tables", "Both B and selects columns"],
            correct: 3
        },
        {
            q: "Which operation requires union compatibility?",
            options: ["Cartesian Product", "Natural Join", "UNION", "SELECT"],
            correct: 2
        },
        {
            q: "A Natural Join:",
            options: ["Keeps all duplicate columns", "Joins on all common attributes and removes duplicate columns", "Never removes any data", "Requires explicit join condition"],
            correct: 1
        },
        {
            q: "What does Division (r/s) find?",
            options: ["Tuples in r but not s", "Tuples related to ALL tuples in s", "Common tuples", "Unique tuples"],
            correct: 1
        },
        {
            q: "Which is NOT a basic relational algebra operator?",
            options: ["SELECT", "PROJECT", "JOIN", "SET DIFFERENCE"],
            correct: 2
        },
        {
            q: "What are the three Data Model Categories?",
            options: ["Physical, Logical, External", "Conceptual, Physical, Implementation", "Internal, External, Relational", "Schema, Instance, Catalog"],
            correct: 1
        },
        {
            q: "What is DDL used for?",
            options: ["Querying data", "Defining schemas", "Updating data", "Backup and recovery"],
            correct: 1
        },
        {
            q: "A DML with same retrieval power as relational algebra is called:",
            options: ["Complete SQL", "Relationally Complete", "Fully Functional", "Query Equivalent"],
            correct: 1
        },
        {
            q: "What does Union Compatibility require?",
            options: ["Same table names", "Same degree and compatible domains", "Same primary keys", "Same number of rows"],
            correct: 1
        },
        {
            q: "Which operator does NOT require Union Compatibility?",
            options: ["UNION", "INTERSECTION", "SET DIFFERENCE", "CARTESIAN PRODUCT"],
            correct: 3
        },
        {
            q: "What happens if Natural Join has no common attributes?",
            options: ["Error", "Empty result", "Cartesian product", "Returns first relation"],
            correct: 2
        },
        {
            q: "For Division r ÷ s, what must be true about S's attributes?",
            options: ["Must equal R's", "Must be a subset of R's", "Must be disjoint from R's", "Must be a superset of R's"],
            correct: 1
        },
        {
            q: "How many basic RA operators are there?",
            options: ["3", "4", "5", "6"],
            correct: 2
        },
        {
            q: "INTERSECTION R ∩ S using basic operators is:",
            options: ["R ∪ S", "R − (R − S)", "R × S", "σ(R ∪ S)"],
            correct: 1
        },
        {
            q: "THETA JOIN R ⋈θ S using basic operators is:",
            options: ["R × S", "σθ(R × S)", "πθ(R × S)", "R − S"],
            correct: 1
        },
        {
            q: "In Division formula, (π_A(R) × S) − R finds:",
            options: ["All matching pairs", "Missing (A,B) pairs not in R", "Common attributes", "Primary keys"],
            correct: 1
        },
        {
            q: "SEMIJOIN R ⋉ S returns:",
            options: ["All of R", "Tuples of R that match S", "Tuples of R with no match in S", "All of S"],
            correct: 1
        },
        {
            q: "ANTIJOIN R ▷ S returns:",
            options: ["All of R", "Tuples of R that match S", "Tuples of R with NO match in S", "All of S"],
            correct: 2
        }
    ],
    er: [
        {
            q: "Entities in an ER diagram are drawn as:",
            options: ["Ovals", "Diamonds", "Rectangles", "Double lines"],
            correct: 2
        },
        {
            q: "A multi-valued attribute is drawn as:",
            options: ["Single oval", "Double oval", "Dashed oval", "Rectangle"],
            correct: 1
        },
        {
            q: "Total participation is shown by:",
            options: ["Single line", "Double line", "Dashed line", "Arrow"],
            correct: 1
        },
        {
            q: "What does (0,N) mean in min-max notation?",
            options: ["Exactly N relationships", "Optional, any number", "Must have at least N", "Zero relationships only"],
            correct: 1
        },
        {
            q: "A weak entity is identified by:",
            options: ["Only its own key", "Partial key + Owner's key", "Foreign key", "Composite attribute"],
            correct: 1
        },
        {
            q: "Weak entities are drawn as:",
            options: ["Single rectangle", "Double rectangle", "Dashed rectangle", "Oval"],
            correct: 1
        },
        {
            q: "Specialization is a:",
            options: ["Bottom-up approach", "Top-down approach", "Left-right approach", "Random approach"],
            correct: 1
        },
        {
            q: "Disjoint (d) constraint means:",
            options: ["Entity can be in multiple subclasses", "Entity can be in at most one subclass", "Entity must be in all subclasses", "No constraint"],
            correct: 1
        },
        {
            q: "Subclasses inherit from superclass:",
            options: ["Only attributes", "Only relationships", "Both attributes and relationships", "Nothing"],
            correct: 2
        },
        {
            q: "A derived attribute is shown as:",
            options: ["Double oval", "Underlined oval", "Dashed oval", "Filled oval"],
            correct: 2
        },
        {
            q: "A ternary relationship connects:",
            options: ["2 entity types", "3 entity types", "Any number of types", "1 entity type"],
            correct: 1
        },
        {
            q: "Can a ternary relationship be decomposed into binary relationships?",
            options: ["Always", "Never", "Not always - information may be lost", "Only with foreign keys"],
            correct: 2
        },
        {
            q: "A specialization lattice allows:",
            options: ["Only one superclass", "Multiple superclasses (multiple inheritance)", "No inheritance", "Only disjoint subclasses"],
            correct: 1
        },
        {
            q: "What is a recursive relationship?",
            options: ["Connects different entity types", "Same entity type participates twice with different roles", "A weak entity relationship", "A ternary relationship"],
            correct: 1
        }
    ],
    norm: [
        {
            q: "Which anomaly occurs when a change must be made in multiple places?",
            options: ["Insertion Anomaly", "Deletion Anomaly", "Update Anomaly", "Selection Anomaly"],
            correct: 2
        },
        {
            q: "X → Y is called a:",
            options: ["Key constraint", "Functional dependency", "Referential integrity", "Entity constraint"],
            correct: 1
        },
        {
            q: "Armstrong's Transitivity axiom states:",
            options: ["If X → Y, then XZ → YZ", "If X → Y and Y → Z, then X → Z", "If Y ⊆ X, then X → Y", "If X → Y and X → Z, then X → YZ"],
            correct: 1
        },
        {
            q: "1NF requires:",
            options: ["No partial dependencies", "No transitive dependencies", "All values atomic", "X is superkey"],
            correct: 2
        },
        {
            q: "2NF eliminates:",
            options: ["Transitive dependencies", "Partial dependencies", "Multi-valued dependencies", "All dependencies"],
            correct: 1
        },
        {
            q: "Which normal form is strongest?",
            options: ["1NF", "2NF", "3NF", "BCNF"],
            correct: 3
        },
        {
            q: "BCNF requires that for X → Y:",
            options: ["Y is prime", "X is superkey (or trivial)", "Y is partial key", "X is foreign key"],
            correct: 1
        },
        {
            q: "A lossless decomposition means:",
            options: ["No data is stored", "Original can be reconstructed by join", "Faster queries", "Less storage"],
            correct: 1
        },
        {
            q: "3NF synthesis algorithm produces:",
            options: ["BCNF, lossless, dependency-preserving", "3NF, lossless, dependency-preserving", "2NF, lossless", "1NF only"],
            correct: 1
        },
        {
            q: "For lossless binary decomposition, the common attributes must be:",
            options: ["Foreign key of both", "Key of at least one", "Empty set", "All attributes"],
            correct: 1
        },
        {
            q: "What is attribute closure X+?",
            options: ["All attributes in X", "All attributes derivable from X using FDs", "The primary key", "All non-prime attributes"],
            correct: 1
        },
        {
            q: "What is a minimal cover?",
            options: ["Smallest set of attributes", "Equivalent to F with single RHS, no redundancy", "The primary key", "All candidate keys"],
            correct: 1
        },
        {
            q: "What is denormalization?",
            options: ["Converting to 1NF", "Intentionally adding redundancy for performance", "Removing all FDs", "Creating more tables"],
            correct: 1
        }
    ],
    sql: [
        {
            q: "PRIMARY KEY implies:",
            options: ["NOT NULL only", "UNIQUE only", "Both NOT NULL and UNIQUE", "Neither"],
            correct: 2
        },
        {
            q: "Which wildcard matches any sequence of characters in LIKE?",
            options: ["_", "%", "*", "?"],
            correct: 1
        },
        {
            q: "ON DELETE CASCADE will:",
            options: ["Set FK to NULL", "Delete referencing rows automatically", "Prevent deletion", "Update FK value"],
            correct: 1
        },
        {
            q: "A correlated subquery:",
            options: ["Executes once", "Has no reference to outer query", "Executes for each row of outer query", "Cannot use EXISTS"],
            correct: 2
        },
        {
            q: "WHERE clause filters:",
            options: ["Groups", "Rows before grouping", "Rows after grouping", "Columns"],
            correct: 1
        },
        {
            q: "HAVING clause filters:",
            options: ["Rows before grouping", "Groups after grouping", "Columns", "Tables"],
            correct: 1
        },
        {
            q: "LEFT OUTER JOIN returns:",
            options: ["Only matching rows", "All rows from left + matching from right", "All rows from right", "Cartesian product"],
            correct: 1
        },
        {
            q: "COUNT(*) vs COUNT(column):",
            options: ["Same result always", "COUNT(*) counts all rows, COUNT(column) ignores NULLs", "COUNT(column) counts all rows", "Neither counts NULLs"],
            correct: 1
        },
        {
            q: "Which executes first: WHERE or GROUP BY?",
            options: ["GROUP BY", "WHERE", "They execute together", "It depends"],
            correct: 1
        },
        {
            q: "EXCEPT (or MINUS) returns:",
            options: ["All rows from both tables", "Common rows", "Rows in first but not second", "Rows in second but not first"],
            correct: 2
        },
        {
            q: "What is a View in SQL?",
            options: ["Physical table", "Virtual table from SELECT", "Index", "Constraint"],
            correct: 1
        },
        {
            q: "What does comparison with NULL yield?",
            options: ["TRUE", "FALSE", "UNKNOWN", "ERROR"],
            correct: 2
        },
        {
            q: "What happens to rows with UNKNOWN in WHERE?",
            options: ["Included in result", "Discarded", "Error thrown", "Converted to FALSE"],
            correct: 1
        },
        {
            q: "What does ALTER TABLE do?",
            options: ["Delete table", "Add or drop columns", "Create table", "Query table"],
            correct: 1
        },
        {
            q: "What is an Assertion?",
            options: ["A column constraint", "A predicate DB must always satisfy", "A foreign key", "An index"],
            correct: 1
        }
    ],
    trans: [
        {
            q: "The 'A' in ACID stands for:",
            options: ["Availability", "Atomicity", "Accuracy", "Accessibility"],
            correct: 1
        },
        {
            q: "Durability ensures:",
            options: ["Transactions are fast", "Committed changes are permanent", "No concurrent access", "All operations logged"],
            correct: 1
        },
        {
            q: "Dirty Read is reading:",
            options: ["Committed data", "Uncommitted data that may rollback", "Deleted data", "Encrypted data"],
            correct: 1
        },
        {
            q: "UNDO operation traces through log:",
            options: ["Forward, uses new values", "Backward, uses old values", "Forward, uses old values", "Backward, uses new values"],
            correct: 1
        },
        {
            q: "Which operations conflict on same item X?",
            options: ["Ri(X) and Rj(X)", "Wi(X) and Wj(X)", "Only reads", "None conflict"],
            correct: 1
        },
        {
            q: "A schedule is conflict serializable if its precedence graph has:",
            options: ["Many cycles", "No cycles", "Exactly one cycle", "At least two cycles"],
            correct: 1
        },
        {
            q: "Strict ⊂ Cascadeless ⊂ ___:",
            options: ["Serializable", "Recoverable", "Serial", "Concurrent"],
            correct: 1
        },
        {
            q: "Commit point is when:",
            options: ["Transaction starts", "All operations done AND effects in log", "First write occurs", "Transaction aborts"],
            correct: 1
        },
        {
            q: "Which is NOT a concurrency problem?",
            options: ["Lost update", "Dirty read", "Normalization", "Unrepeatable read"],
            correct: 2
        },
        {
            q: "Force writing means:",
            options: ["Fast writes", "Log must be written to disk before commit", "No logging", "Immediate commit"],
            correct: 1
        },
        {
            q: "What is Throughput in transactions?",
            options: ["Data transferred", "Transactions per second (TPS)", "Memory usage", "Disk I/O"],
            correct: 1
        },
        {
            q: "What is Committed Projection C(S)?",
            options: ["All operations", "Operations from committed transactions only", "Failed operations", "Aborted operations"],
            correct: 1
        },
        {
            q: "Result equivalence is sufficient for correctness:",
            options: ["True", "False - conflict equivalence is needed", "Only for serial schedules", "Only for 2 transactions"],
            correct: 1
        },
        {
            q: "Global serializability in distributed databases requires:",
            options: ["Local serializability only", "Global serializability only", "Both local and global serializability", "Neither"],
            correct: 2
        }
    ]
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let userAnswers = [];

function startQuiz() {
    const topic = document.getElementById('quiz-topic').value;
    const count = parseInt(document.getElementById('quiz-count').value);

    // Get questions based on topic
    let questions = [];
    if (topic === 'all') {
        questions = [
            ...quizQuestions.dbms,
            ...quizQuestions.er,
            ...quizQuestions.norm,
            ...quizQuestions.sql,
            ...quizQuestions.trans
        ];
    } else {
        questions = [...quizQuestions[topic]];
    }

    // Shuffle and select
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }

    currentQuiz = questions.slice(0, count);
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.length).fill(null);

    // Show quiz container
    document.getElementById('quiz-setup').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';

    displayQuestion();
}

function displayQuestion() {
    const question = currentQuiz[currentQuestionIndex];

    // Update progress
    const progress = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;
    document.getElementById('quiz-progress-fill').style.width = `${progress}%`;
    document.getElementById('quiz-progress-text').textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.length}`;

    // Display question
    document.getElementById('quiz-question').textContent = question.q;

    // Display options
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        if (userAnswers[currentQuestionIndex] === index) {
            optionDiv.classList.add('selected');
        }
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(optionDiv);
    });

    // Update navigation buttons
    document.getElementById('prev-question').disabled = currentQuestionIndex === 0;

    if (currentQuestionIndex === currentQuiz.length - 1) {
        document.getElementById('next-question').style.display = 'none';
        document.getElementById('submit-quiz').style.display = 'inline-block';
    } else {
        document.getElementById('next-question').style.display = 'inline-block';
        document.getElementById('submit-quiz').style.display = 'none';
    }
}

function selectAnswer(index) {
    userAnswers[currentQuestionIndex] = index;

    // Update UI
    document.querySelectorAll('.quiz-option').forEach((opt, i) => {
        opt.classList.remove('selected');
        if (i === index) {
            opt.classList.add('selected');
        }
    });
}

function showResults() {
    let correct = 0;

    currentQuiz.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            correct++;
        }
    });

    const percent = Math.round((correct / currentQuiz.length) * 100);

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';

    document.getElementById('score-percent').textContent = `${percent}%`;
    document.getElementById('correct-count').textContent = correct;
    document.getElementById('total-count').textContent = currentQuiz.length;

    // Show breakdown
    const breakdown = document.getElementById('results-breakdown');
    breakdown.innerHTML = '';

    currentQuiz.forEach((question, index) => {
        const isCorrect = userAnswers[index] === question.correct;
        const item = document.createElement('div');
        item.className = `result-item ${isCorrect ? 'correct' : 'incorrect'}`;

        const userAnswer = userAnswers[index] !== null ? question.options[userAnswers[index]] : 'Not answered';
        const correctAnswer = question.options[question.correct];

        item.innerHTML = `
            <p class="question">${index + 1}. ${question.q}</p>
            <p class="your-answer">Your answer: ${userAnswer}</p>
            ${!isCorrect ? `<p class="correct-answer">Correct answer: ${correctAnswer}</p>` : ''}
        `;

        breakdown.appendChild(item);
    });
}

// Quiz event listeners
document.getElementById('start-quiz').addEventListener('click', startQuiz);

document.getElementById('prev-question').addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

document.getElementById('next-question').addEventListener('click', () => {
    if (currentQuestionIndex < currentQuiz.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
});

document.getElementById('submit-quiz').addEventListener('click', showResults);

document.getElementById('retake-quiz').addEventListener('click', () => {
    document.getElementById('quiz-setup').style.display = 'block';
    document.getElementById('quiz-results').style.display = 'none';
});

// ========================================
// Keyboard Navigation
// ========================================

document.addEventListener('keydown', (e) => {
    // Flashcard navigation
    const flashcardSection = document.getElementById('flashcards');
    if (flashcardSection.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            document.getElementById('prev-card').click();
        } else if (e.key === 'ArrowRight') {
            document.getElementById('next-card').click();
        } else if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('flip-card').click();
        }
    }

    // Quiz navigation
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer.style.display === 'block') {
        if (e.key === 'ArrowLeft') {
            document.getElementById('prev-question').click();
        } else if (e.key === 'ArrowRight') {
            document.getElementById('next-question').click();
        } else if (e.key >= '1' && e.key <= '4') {
            const index = parseInt(e.key) - 1;
            const options = document.querySelectorAll('.quiz-option');
            if (options[index]) {
                options[index].click();
            }
        }
    }
});

// ========================================
// Initialize
// ========================================

console.log('DBMS Study Guide loaded successfully!');
