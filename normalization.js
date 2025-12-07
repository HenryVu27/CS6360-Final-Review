// ========================================
// Normalization Practice Exercises
// ========================================

// Exercise data for normalization practice
const normalizationExercises = {
    attributeClosure: [
        {
            id: 'ac1',
            title: 'Attribute Closure #1',
            relation: 'R(A, B, C, D, E)',
            fds: ['A → B', 'BC → D', 'D → E'],
            question: 'Compute the attribute closure of {A, C}',
            computeFor: ['A', 'C'],
            answer: ['A', 'B', 'C', 'D', 'E'],
            steps: [
                'Start with closure = {A, C}',
                'Apply A → B: A is in closure, add B. Closure = {A, B, C}',
                'Apply BC → D: B, C both in closure, add D. Closure = {A, B, C, D}',
                'Apply D → E: D is in closure, add E. Closure = {A, B, C, D, E}',
                'No more changes. Final {A, C}⁺ = {A, B, C, D, E}'
            ]
        },
        {
            id: 'ac2',
            title: 'Attribute Closure #2',
            relation: 'R(A, B, C, D, E, F)',
            fds: ['A → BC', 'CD → E', 'B → D', 'E → A'],
            question: 'Compute the attribute closure of {A}',
            computeFor: ['A'],
            answer: ['A', 'B', 'C', 'D', 'E'],
            steps: [
                'Start with closure = {A}',
                'Apply A → BC: A is in closure, add B, C. Closure = {A, B, C}',
                'Apply B → D: B is in closure, add D. Closure = {A, B, C, D}',
                'Apply CD → E: C, D both in closure, add E. Closure = {A, B, C, D, E}',
                'Apply E → A: E is in closure, A already in closure. No change.',
                'No more changes. Final {A}⁺ = {A, B, C, D, E}'
            ]
        },
        {
            id: 'ac3',
            title: 'Attribute Closure #3',
            relation: 'R(A, B, C, D)',
            fds: ['AB → C', 'C → D', 'D → A'],
            question: 'Compute the attribute closure of {B, C}',
            computeFor: ['B', 'C'],
            answer: ['A', 'B', 'C', 'D'],
            steps: [
                'Start with closure = {B, C}',
                'Apply AB → C: A not in closure. Cannot apply.',
                'Apply C → D: C is in closure, add D. Closure = {B, C, D}',
                'Apply D → A: D is in closure, add A. Closure = {A, B, C, D}',
                'Apply AB → C: A, B both in closure, C already in closure. No change.',
                'No more changes. Final {B, C}⁺ = {A, B, C, D}'
            ]
        },
        {
            id: 'ac4',
            title: 'Attribute Closure #4',
            relation: 'R(A, B, C, D, E)',
            fds: ['A → B', 'B → C', 'C → D', 'D → E'],
            question: 'Compute the attribute closure of {A}',
            computeFor: ['A'],
            answer: ['A', 'B', 'C', 'D', 'E'],
            steps: [
                'Start with closure = {A}',
                'Apply A → B: A is in closure, add B. Closure = {A, B}',
                'Apply B → C: B is in closure, add C. Closure = {A, B, C}',
                'Apply C → D: C is in closure, add D. Closure = {A, B, C, D}',
                'Apply D → E: D is in closure, add E. Closure = {A, B, C, D, E}',
                'This is a transitive chain! {A}⁺ = {A, B, C, D, E}'
            ]
        },
        {
            id: 'ac5',
            title: 'Attribute Closure #5',
            relation: 'R(A, B, C, D, E, F)',
            fds: ['AB → C', 'C → DE', 'D → F', 'F → A'],
            question: 'Compute the attribute closure of {A, B}',
            computeFor: ['A', 'B'],
            answer: ['A', 'B', 'C', 'D', 'E', 'F'],
            steps: [
                'Start with closure = {A, B}',
                'Apply AB → C: A, B both in closure, add C. Closure = {A, B, C}',
                'Apply C → DE: C is in closure, add D, E. Closure = {A, B, C, D, E}',
                'Apply D → F: D is in closure, add F. Closure = {A, B, C, D, E, F}',
                'Apply F → A: F is in closure, A already in closure. No change.',
                '{A, B}⁺ = {A, B, C, D, E, F} = all attributes, so AB is a superkey!'
            ]
        }
    ],

    normalFormIdentification: [
        {
            id: 'nf1',
            title: 'Normal Form #1',
            relation: 'R(StudentID, CourseID, StudentName, Grade)',
            fds: ['StudentID → StudentName', 'StudentID, CourseID → Grade'],
            keys: ['StudentID, CourseID'],
            answer: '1NF',
            violation: 'StudentID → StudentName is a partial dependency (StudentID is part of the key)',
            explanation: 'The relation is in 1NF (all atomic values). However, StudentName depends only on StudentID, which is part of the composite key {StudentID, CourseID}. This is a partial dependency, violating 2NF. The highest normal form is 1NF.',
            normalFormChecks: {
                '1NF': { passes: true, reason: 'All attributes are atomic' },
                '2NF': { passes: false, reason: 'StudentID → StudentName is partial dependency (StudentName depends on part of key)' },
                '3NF': { passes: false, reason: 'Fails 2NF, so cannot be in 3NF' },
                'BCNF': { passes: false, reason: 'Fails 2NF, so cannot be in BCNF' }
            }
        },
        {
            id: 'nf2',
            title: 'Normal Form #2',
            relation: 'R(A, B, C, D)',
            fds: ['A → BCD'],
            keys: ['A'],
            answer: 'BCNF',
            explanation: 'The only non-trivial FD is A → BCD, and A is the key (superkey). Therefore, all FDs have a superkey on the LHS, satisfying BCNF.',
            normalFormChecks: {
                '1NF': { passes: true, reason: 'All attributes are atomic' },
                '2NF': { passes: true, reason: 'No partial dependencies (key is single attribute)' },
                '3NF': { passes: true, reason: 'LHS of A → BCD is superkey' },
                'BCNF': { passes: true, reason: 'LHS of A → BCD is superkey' }
            }
        },
        {
            id: 'nf3',
            title: 'Normal Form #3',
            relation: 'R(A, B, C)',
            fds: ['AB → C', 'C → B'],
            keys: ['AB', 'AC'],
            answer: '3NF',
            explanation: 'For C → B: C is not a superkey, but B is a prime attribute (part of key AB). This satisfies 3NF but violates BCNF. Both candidate keys are {AB} and {AC}.',
            normalFormChecks: {
                '1NF': { passes: true, reason: 'All attributes are atomic' },
                '2NF': { passes: true, reason: 'No partial dependencies' },
                '3NF': { passes: true, reason: 'In C → B, B is prime (part of key AB)' },
                'BCNF': { passes: false, reason: 'C → B violates BCNF: C is not a superkey' }
            }
        },
        {
            id: 'nf4',
            title: 'Normal Form #4',
            relation: 'R(EmpID, EmpName, DeptID, DeptName)',
            fds: ['EmpID → EmpName, DeptID', 'DeptID → DeptName'],
            keys: ['EmpID'],
            answer: '2NF',
            explanation: 'There\'s a transitive dependency: EmpID → DeptID → DeptName. DeptName depends on EmpID through DeptID. This violates 3NF. The relation is in 2NF (no partial dependencies since key is single attribute).',
            normalFormChecks: {
                '1NF': { passes: true, reason: 'All attributes are atomic' },
                '2NF': { passes: true, reason: 'No partial dependencies (key is single attribute EmpID)' },
                '3NF': { passes: false, reason: 'DeptID → DeptName: DeptID is not superkey, DeptName is not prime' },
                'BCNF': { passes: false, reason: 'DeptID → DeptName: DeptID is not a superkey' }
            }
        },
        {
            id: 'nf5',
            title: 'Normal Form #5',
            relation: 'R(A, B, C, D)',
            fds: ['AB → CD', 'C → A'],
            keys: ['AB', 'BC'],
            answer: '3NF',
            explanation: 'Candidate keys are {AB} and {BC}. For C → A: C is not a superkey, but A is prime (part of key AB). This satisfies 3NF but violates BCNF.',
            normalFormChecks: {
                '1NF': { passes: true, reason: 'All attributes are atomic' },
                '2NF': { passes: true, reason: 'No partial dependencies on non-prime attributes' },
                '3NF': { passes: true, reason: 'In C → A, A is prime (part of key AB)' },
                'BCNF': { passes: false, reason: 'C → A: C is not a superkey' }
            }
        },
        {
            id: 'nf6',
            title: 'Normal Form #6',
            relation: 'R(SSN, Pnumber, Hours, Ename, Pname, Plocation)',
            fds: ['SSN → Ename', 'Pnumber → Pname, Plocation', 'SSN, Pnumber → Hours'],
            keys: ['SSN, Pnumber'],
            answer: '1NF',
            explanation: 'Multiple partial dependencies exist: SSN → Ename and Pnumber → Pname, Plocation. Both LHS are proper subsets of the key {SSN, Pnumber}, making these partial dependencies that violate 2NF.',
            normalFormChecks: {
                '1NF': { passes: true, reason: 'All attributes are atomic' },
                '2NF': { passes: false, reason: 'SSN → Ename and Pnumber → Pname, Plocation are partial dependencies' },
                '3NF': { passes: false, reason: 'Fails 2NF' },
                'BCNF': { passes: false, reason: 'Fails 2NF' }
            }
        }
    ],

    candidateKeys: [
        {
            id: 'ck1',
            title: 'Candidate Keys #1',
            relation: 'R(A, B, C, D, E)',
            fds: ['A → BC', 'CD → E', 'B → D', 'E → A'],
            answer: [['A'], ['E'], ['B', 'C']],
            explanation: 'First find attributes that appear only on RHS (none), only on LHS (none), or neither. All appear on both sides. Starting with {A}: {A}⁺ = {A,B,C,D,E}. So A is a key. {E}⁺ = {E,A,B,C,D,E} = all. So E is a key. {BC}⁺ = {B,C,D,E,A} = all. So BC is a key. The candidate keys are: {A}, {E}, {BC}.',
            steps: [
                'Identify attributes: All of A,B,C,D,E appear on both LHS and RHS of some FD',
                'Compute {A}⁺: A→BC gives {A,B,C}, B→D gives {A,B,C,D}, CD→E gives {A,B,C,D,E}. A is superkey!',
                'Compute {E}⁺: E→A gives {E,A}, A→BC gives {E,A,B,C}, B→D gives {E,A,B,C,D}. E is superkey!',
                'Compute {B}⁺: B→D gives {B,D}. Not a superkey.',
                'Compute {C}⁺: Nothing applies. {C}⁺ = {C}. Not a superkey.',
                'Compute {BC}⁺: B→D gives {B,C,D}, CD→E gives {B,C,D,E}, E→A gives {A,B,C,D,E}. BC is superkey!',
                'Candidate keys (minimal superkeys): {A}, {E}, {BC}'
            ]
        },
        {
            id: 'ck2',
            title: 'Candidate Keys #2',
            relation: 'R(A, B, C, D)',
            fds: ['A → B', 'B → C', 'C → D'],
            answer: [['A']],
            explanation: 'A appears only on LHS, so A must be in every key. {A}⁺ = {A,B,C,D} = all attributes. Therefore, {A} is the only candidate key.',
            steps: [
                'A appears only on LHS of FDs (never on RHS) → must be in every candidate key',
                'D appears only on RHS → cannot be part of any candidate key',
                'Compute {A}⁺: A→B→C→D gives {A,B,C,D}',
                '{A}⁺ = all attributes, so {A} is a superkey',
                '{A} is minimal (single attribute), so {A} is the only candidate key'
            ]
        },
        {
            id: 'ck3',
            title: 'Candidate Keys #3',
            relation: 'R(A, B, C, D, E)',
            fds: ['AB → C', 'C → D', 'D → B', 'D → E'],
            answer: [['A', 'B'], ['A', 'C'], ['A', 'D']],
            explanation: 'A appears only on LHS, so A must be in every key. But {A}⁺ = {A}, so A alone is not enough. Try AB: {AB}⁺ = {A,B,C,D,E}. Try AC: {AC}⁺ = {A,C,D,B,E}. Try AD: {AD}⁺ = {A,D,B,E,C} (D→B, AB→C). All three are candidate keys.',
            steps: [
                'A appears only on LHS → must be in every candidate key',
                'E appears only on RHS → cannot be part of any key',
                '{A}⁺ = {A} (no FD has just A on LHS). Not a superkey.',
                '{AB}⁺: AB→C gives {A,B,C}, C→D gives {A,B,C,D}, D→E gives {A,B,C,D,E}. Superkey!',
                '{AC}⁺: C→D gives {A,C,D}, D→B gives {A,B,C,D}, D→E gives {A,B,C,D,E}. Superkey!',
                '{AD}⁺: D→B gives {A,B,D}, D→E gives {A,B,D,E}, AB→C gives {A,B,C,D,E}. Superkey!',
                'All three {AB}, {AC}, {AD} are minimal → candidate keys'
            ]
        },
        {
            id: 'ck4',
            title: 'Candidate Keys #4',
            relation: 'R(A, B, C, D)',
            fds: ['A → B', 'BC → D', 'A → C'],
            answer: [['A']],
            explanation: 'A appears only on LHS. {A}⁺: A→B gives {A,B}, A→C gives {A,B,C}, BC→D gives {A,B,C,D}. So {A} determines all attributes and is the only candidate key.',
            steps: [
                'A appears only on LHS → must be in every candidate key',
                'D appears only on RHS → cannot be part of any key',
                '{A}⁺: A→B gives {A,B}, A→C gives {A,B,C}, BC→D gives {A,B,C,D}',
                '{A}⁺ = all attributes, so {A} is a superkey',
                '{A} is minimal, so it is the only candidate key'
            ]
        },
        {
            id: 'ck5',
            title: 'Candidate Keys #5',
            relation: 'R(A, B, C, D, E, F)',
            fds: ['A → B', 'A → C', 'CD → E', 'CD → F', 'BD → F'],
            answer: [['A', 'D']],
            explanation: 'A and D appear only on LHS, so both must be in every key. {AD}⁺: A→B,C gives {A,B,C,D}, CD→E,F gives {A,B,C,D,E,F}. So {AD} is the only candidate key.',
            steps: [
                'A appears only on LHS → must be in every candidate key',
                'D appears only on LHS → must be in every candidate key',
                'E, F appear only on RHS → cannot be part of any key',
                '{AD}⁺: A→B gives {A,B,D}, A→C gives {A,B,C,D}',
                'CD→E gives {A,B,C,D,E}, CD→F gives {A,B,C,D,E,F}',
                '{AD}⁺ = all attributes, so {AD} is the only candidate key'
            ]
        }
    ],

    minimalCover: [
        {
            id: 'mc1',
            title: 'Minimal Cover #1',
            fds: ['A → BC', 'B → C', 'AB → C'],
            answer: ['A → B', 'B → C'],
            steps: [
                'Step 1: Decompose RHS to single attributes:',
                '  A → BC becomes A → B, A → C',
                '  B → C stays as B → C',
                '  AB → C stays as AB → C',
                '  Result: {A → B, A → C, B → C, AB → C}',
                '',
                'Step 2: Remove extraneous LHS attributes:',
                '  For AB → C: Check if A → C is derivable. {A}⁺ with {A→B, A→C, B→C} = {A,B,C}. Yes! A → C.',
                '  So B is extraneous in AB → C. Remove it: A → C',
                '  Result: {A → B, A → C, B → C, A → C}',
                '',
                'Step 3: Remove redundant FDs:',
                '  A → C appears twice. Remove duplicate.',
                '  Check if A → C is derivable from {A → B, B → C}: {A}⁺ = {A,B,C}. Yes!',
                '  A → C is redundant (derivable via A → B → C). Remove it.',
                '  Result: {A → B, B → C}'
            ],
            explanation: 'A → BC is decomposed to A → B and A → C. Then A → C is redundant because we can derive it transitively through A → B → C. AB → C has extraneous B since A → C already.'
        },
        {
            id: 'mc2',
            title: 'Minimal Cover #2',
            fds: ['A → BC', 'B → C', 'A → B', 'AB → C'],
            answer: ['A → B', 'B → C'],
            steps: [
                'Step 1: Decompose RHS:',
                '  A → BC becomes A → B, A → C',
                '  Result: {A → B, A → C, B → C, A → B, AB → C}',
                '',
                'Step 2: Remove duplicate A → B',
                '  Result: {A → B, A → C, B → C, AB → C}',
                '',
                'Step 3: Remove extraneous LHS attributes:',
                '  For AB → C: {A}⁺ = {A,B,C}. A → C derivable, so B is extraneous.',
                '  Result: {A → B, A → C, B → C}',
                '',
                'Step 4: Remove redundant FDs:',
                '  Check A → C: From {A → B, B → C}, {A}⁺ = {A,B,C}. C is reachable!',
                '  A → C is redundant. Remove it.',
                '  Final: {A → B, B → C}'
            ],
            explanation: 'After decomposing RHS and removing extraneous attributes, A → C becomes redundant since it can be derived from A → B and B → C.'
        },
        {
            id: 'mc3',
            title: 'Minimal Cover #3',
            fds: ['AB → C', 'A → DE', 'B → F', 'F → GH'],
            answer: ['AB → C', 'A → D', 'A → E', 'B → F', 'F → G', 'F → H'],
            steps: [
                'Step 1: Decompose RHS to single attributes:',
                '  AB → C stays',
                '  A → DE becomes A → D, A → E',
                '  B → F stays',
                '  F → GH becomes F → G, F → H',
                '  Result: {AB → C, A → D, A → E, B → F, F → G, F → H}',
                '',
                'Step 2: Check for extraneous LHS attributes:',
                '  For AB → C: {A}⁺ = {A,D,E}. C not included.',
                '  {B}⁺ = {B,F,G,H}. C not included.',
                '  Neither A nor B alone can derive C. Both needed.',
                '  No extraneous attributes.',
                '',
                'Step 3: Check for redundant FDs:',
                '  Each FD derives something unique. None are redundant.',
                '  Final: {AB → C, A → D, A → E, B → F, F → G, F → H}'
            ],
            explanation: 'After decomposing RHS, we check each FD but find no redundancies. Each FD is needed.'
        },
        {
            id: 'mc4',
            title: 'Minimal Cover #4',
            fds: ['A → B', 'B → A', 'B → C', 'A → C'],
            answer: ['A → B', 'B → A', 'B → C'],
            steps: [
                'Step 1: RHS already single attributes. No decomposition needed.',
                '  FDs: {A → B, B → A, B → C, A → C}',
                '',
                'Step 2: No composite LHS, so no extraneous attributes to remove.',
                '',
                'Step 3: Check for redundant FDs:',
                '  Remove A → C, check if derivable from {A → B, B → A, B → C}:',
                '  {A}⁺ = A → B → C, so {A}⁺ = {A,B,C}. C is reachable!',
                '  A → C is redundant.',
                '  Final: {A → B, B → A, B → C}'
            ],
            explanation: 'A → C is redundant because we can derive it: A → B (given), then B → C (given), so A → C by transitivity.'
        }
    ]
};

// Current exercise state
let currentNormExercise = null;
let currentNormCategory = 'attributeClosure';
let normExerciseIndex = 0;

// Initialize normalization practice when the section becomes active
function initNormalizationPractice() {
    renderNormCategoryNav();
    loadNormExercise();
}

// Render category navigation
function renderNormCategoryNav() {
    const nav = document.getElementById('norm-category-nav');
    if (!nav) return;

    const categories = [
        { id: 'attributeClosure', name: 'Attribute Closure (X+)' },
        { id: 'normalFormIdentification', name: 'Normal Forms' },
        { id: 'candidateKeys', name: 'Candidate Keys' },
        { id: 'minimalCover', name: 'Minimal Cover' }
    ];

    nav.innerHTML = categories.map(cat => `
        <button class="norm-category-btn ${cat.id === currentNormCategory ? 'active' : ''}"
                onclick="selectNormCategory('${cat.id}')">
            ${cat.name}
        </button>
    `).join('');
}

// Select a category
function selectNormCategory(categoryId) {
    currentNormCategory = categoryId;
    normExerciseIndex = 0;
    renderNormCategoryNav();
    loadNormExercise();
}

// Load current exercise
function loadNormExercise() {
    const container = document.getElementById('norm-exercise-container');
    if (!container) return;

    const exercises = normalizationExercises[currentNormCategory];
    if (!exercises || exercises.length === 0) {
        container.innerHTML = '<p>No exercises available for this category.</p>';
        return;
    }

    currentNormExercise = exercises[normExerciseIndex];

    switch(currentNormCategory) {
        case 'attributeClosure':
            renderAttributeClosureExercise(container);
            break;
        case 'normalFormIdentification':
            renderNormalFormExercise(container);
            break;
        case 'candidateKeys':
            renderCandidateKeysExercise(container);
            break;
        case 'minimalCover':
            renderMinimalCoverExercise(container);
            break;
    }
}

// Render Attribute Closure Exercise
function renderAttributeClosureExercise(container) {
    const ex = currentNormExercise;
    const allAttrs = ex.relation.match(/\(([^)]+)\)/)[1].split(',').map(a => a.trim());

    container.innerHTML = `
        <div class="norm-exercise">
            <div class="exercise-header">
                <h3>${ex.title}</h3>
                <span class="exercise-counter">${normExerciseIndex + 1} / ${normalizationExercises[currentNormCategory].length}</span>
            </div>

            <div class="exercise-problem">
                <p><strong>Relation:</strong> ${ex.relation}</p>
                <p><strong>Functional Dependencies:</strong></p>
                <ul class="fd-list">
                    ${ex.fds.map(fd => `<li>${fd}</li>`).join('')}
                </ul>
                <p class="question"><strong>${ex.question}</strong></p>
            </div>

            <div class="answer-section">
                <p>Select all attributes in the closure:</p>
                <div class="attr-checkbox-group" id="closure-checkboxes">
                    ${allAttrs.map(attr => `
                        <label class="attr-checkbox">
                            <input type="checkbox" value="${attr}" id="attr-${attr}">
                            <span>${attr}</span>
                        </label>
                    `).join('')}
                </div>
                <button class="btn primary" onclick="checkAttributeClosure()">Check Answer</button>
            </div>

            <div id="norm-feedback" class="norm-feedback hidden"></div>
            <div id="norm-steps" class="norm-steps hidden"></div>

            <div class="exercise-navigation">
                <button class="btn secondary" onclick="prevNormExercise()" ${normExerciseIndex === 0 ? 'disabled' : ''}>← Previous</button>
                <button class="btn secondary" onclick="showNormSolution()">Show Solution</button>
                <button class="btn secondary" onclick="nextNormExercise()" ${normExerciseIndex >= normalizationExercises[currentNormCategory].length - 1 ? 'disabled' : ''}>Next →</button>
            </div>
        </div>
    `;
}

// Check Attribute Closure Answer
function checkAttributeClosure() {
    const checkboxes = document.querySelectorAll('#closure-checkboxes input[type="checkbox"]');
    const selected = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value).sort();
    const correct = [...currentNormExercise.answer].sort();

    const feedback = document.getElementById('norm-feedback');
    feedback.classList.remove('hidden');

    if (JSON.stringify(selected) === JSON.stringify(correct)) {
        feedback.className = 'norm-feedback correct';
        feedback.innerHTML = `<strong>✓ Correct!</strong> {${currentNormExercise.computeFor.join(', ')}}⁺ = {${correct.join(', ')}}`;
    } else {
        feedback.className = 'norm-feedback incorrect';
        const missing = correct.filter(a => !selected.includes(a));
        const extra = selected.filter(a => !correct.includes(a));
        let msg = '<strong>✗ Not quite.</strong>';
        if (missing.length > 0) msg += ` Missing: {${missing.join(', ')}}`;
        if (extra.length > 0) msg += ` Shouldn't include: {${extra.join(', ')}}`;
        feedback.innerHTML = msg;
    }
}

// Render Normal Form Exercise
function renderNormalFormExercise(container) {
    const ex = currentNormExercise;

    container.innerHTML = `
        <div class="norm-exercise">
            <div class="exercise-header">
                <h3>${ex.title}</h3>
                <span class="exercise-counter">${normExerciseIndex + 1} / ${normalizationExercises[currentNormCategory].length}</span>
            </div>

            <div class="exercise-problem">
                <p><strong>Relation:</strong> ${ex.relation}</p>
                <p><strong>Functional Dependencies:</strong></p>
                <ul class="fd-list">
                    ${ex.fds.map(fd => `<li>${fd}</li>`).join('')}
                </ul>
                <p><strong>Candidate Key(s):</strong> {${ex.keys.join('}, {')}}</p>
                <p class="question"><strong>What is the highest normal form this relation satisfies?</strong></p>
            </div>

            <div class="answer-section">
                <div class="nf-radio-group" id="nf-radios">
                    ${['1NF', '2NF', '3NF', 'BCNF'].map(nf => `
                        <label class="nf-radio">
                            <input type="radio" name="normal-form" value="${nf}">
                            <span>${nf}</span>
                        </label>
                    `).join('')}
                </div>
                <button class="btn primary" onclick="checkNormalForm()">Check Answer</button>
            </div>

            <div id="norm-feedback" class="norm-feedback hidden"></div>
            <div id="norm-steps" class="norm-steps hidden"></div>

            <div class="exercise-navigation">
                <button class="btn secondary" onclick="prevNormExercise()" ${normExerciseIndex === 0 ? 'disabled' : ''}>← Previous</button>
                <button class="btn secondary" onclick="showNormSolution()">Show Solution</button>
                <button class="btn secondary" onclick="nextNormExercise()" ${normExerciseIndex >= normalizationExercises[currentNormCategory].length - 1 ? 'disabled' : ''}>Next →</button>
            </div>
        </div>
    `;
}

// Check Normal Form Answer
function checkNormalForm() {
    const selected = document.querySelector('input[name="normal-form"]:checked');
    if (!selected) {
        alert('Please select a normal form.');
        return;
    }

    const feedback = document.getElementById('norm-feedback');
    feedback.classList.remove('hidden');

    if (selected.value === currentNormExercise.answer) {
        feedback.className = 'norm-feedback correct';
        feedback.innerHTML = `<strong>✓ Correct!</strong> The relation is in ${currentNormExercise.answer}.<br>${currentNormExercise.explanation}`;
    } else {
        feedback.className = 'norm-feedback incorrect';
        feedback.innerHTML = `<strong>✗ Incorrect.</strong> You selected ${selected.value}, but the correct answer is ${currentNormExercise.answer}.<br>${currentNormExercise.explanation}`;
    }
}

// Render Candidate Keys Exercise
function renderCandidateKeysExercise(container) {
    const ex = currentNormExercise;
    const allAttrs = ex.relation.match(/\(([^)]+)\)/)[1].split(',').map(a => a.trim());

    container.innerHTML = `
        <div class="norm-exercise">
            <div class="exercise-header">
                <h3>${ex.title}</h3>
                <span class="exercise-counter">${normExerciseIndex + 1} / ${normalizationExercises[currentNormCategory].length}</span>
            </div>

            <div class="exercise-problem">
                <p><strong>Relation:</strong> ${ex.relation}</p>
                <p><strong>Functional Dependencies:</strong></p>
                <ul class="fd-list">
                    ${ex.fds.map(fd => `<li>${fd}</li>`).join('')}
                </ul>
                <p class="question"><strong>Find all candidate keys for this relation.</strong></p>
            </div>

            <div class="answer-section">
                <p>Enter candidate keys (comma-separated attributes for each key, one key per line):</p>
                <textarea id="candidate-keys-input" class="keys-input" rows="4" placeholder="Example:
A
BC
AD"></textarea>
                <button class="btn primary" onclick="checkCandidateKeys()">Check Answer</button>
            </div>

            <div id="norm-feedback" class="norm-feedback hidden"></div>
            <div id="norm-steps" class="norm-steps hidden"></div>

            <div class="exercise-navigation">
                <button class="btn secondary" onclick="prevNormExercise()" ${normExerciseIndex === 0 ? 'disabled' : ''}>← Previous</button>
                <button class="btn secondary" onclick="showNormSolution()">Show Solution</button>
                <button class="btn secondary" onclick="nextNormExercise()" ${normExerciseIndex >= normalizationExercises[currentNormCategory].length - 1 ? 'disabled' : ''}>Next →</button>
            </div>
        </div>
    `;
}

// Check Candidate Keys Answer
function checkCandidateKeys() {
    const input = document.getElementById('candidate-keys-input').value.trim();
    const lines = input.split('\n').filter(l => l.trim());
    const userKeys = lines.map(line =>
        line.toUpperCase().replace(/[,\s]+/g, '').split('').sort().join('')
    ).sort();

    const correctKeys = currentNormExercise.answer.map(key =>
        key.join('').toUpperCase().split('').sort().join('')
    ).sort();

    const feedback = document.getElementById('norm-feedback');
    feedback.classList.remove('hidden');

    // Check if arrays match
    const isCorrect = JSON.stringify(userKeys) === JSON.stringify(correctKeys);

    if (isCorrect) {
        feedback.className = 'norm-feedback correct';
        feedback.innerHTML = `<strong>✓ Correct!</strong> The candidate keys are: ${currentNormExercise.answer.map(k => '{' + k.join(', ') + '}').join(', ')}`;
    } else {
        feedback.className = 'norm-feedback incorrect';
        const missing = correctKeys.filter(k => !userKeys.includes(k));
        const extra = userKeys.filter(k => !correctKeys.includes(k));
        let msg = `<strong>✗ Not quite.</strong> The correct candidate keys are: ${currentNormExercise.answer.map(k => '{' + k.join(', ') + '}').join(', ')}`;
        feedback.innerHTML = msg;
    }
}

// Render Minimal Cover Exercise
function renderMinimalCoverExercise(container) {
    const ex = currentNormExercise;

    container.innerHTML = `
        <div class="norm-exercise">
            <div class="exercise-header">
                <h3>${ex.title}</h3>
                <span class="exercise-counter">${normExerciseIndex + 1} / ${normalizationExercises[currentNormCategory].length}</span>
            </div>

            <div class="exercise-problem">
                <p><strong>Functional Dependencies:</strong></p>
                <ul class="fd-list">
                    ${ex.fds.map(fd => `<li>${fd}</li>`).join('')}
                </ul>
                <p class="question"><strong>Compute the minimal cover for this set of FDs.</strong></p>
            </div>

            <div class="answer-section">
                <p>Enter the minimal cover (one FD per line, e.g., "A → B"):</p>
                <textarea id="minimal-cover-input" class="keys-input" rows="6" placeholder="Example:
A → B
B → C
CD → E"></textarea>
                <button class="btn primary" onclick="checkMinimalCover()">Check Answer</button>
            </div>

            <div id="norm-feedback" class="norm-feedback hidden"></div>
            <div id="norm-steps" class="norm-steps hidden"></div>

            <div class="exercise-navigation">
                <button class="btn secondary" onclick="prevNormExercise()" ${normExerciseIndex === 0 ? 'disabled' : ''}>← Previous</button>
                <button class="btn secondary" onclick="showNormSolution()">Show Solution</button>
                <button class="btn secondary" onclick="nextNormExercise()" ${normExerciseIndex >= normalizationExercises[currentNormCategory].length - 1 ? 'disabled' : ''}>Next →</button>
            </div>
        </div>
    `;
}

// Check Minimal Cover Answer
function checkMinimalCover() {
    const input = document.getElementById('minimal-cover-input').value.trim();
    const lines = input.split('\n').filter(l => l.trim());

    // Normalize user FDs
    const userFDs = lines.map(line => {
        const normalized = line.toUpperCase().replace(/\s+/g, '').replace(/→|->/, '→');
        return normalized;
    }).sort();

    // Normalize correct FDs
    const correctFDs = currentNormExercise.answer.map(fd => {
        return fd.toUpperCase().replace(/\s+/g, '').replace(/→|->/, '→');
    }).sort();

    const feedback = document.getElementById('norm-feedback');
    feedback.classList.remove('hidden');

    if (JSON.stringify(userFDs) === JSON.stringify(correctFDs)) {
        feedback.className = 'norm-feedback correct';
        feedback.innerHTML = `<strong>✓ Correct!</strong> The minimal cover is: {${currentNormExercise.answer.join(', ')}}`;
    } else {
        feedback.className = 'norm-feedback incorrect';
        feedback.innerHTML = `<strong>✗ Not quite.</strong> The correct minimal cover is: {${currentNormExercise.answer.join(', ')}}<br><br>${currentNormExercise.explanation}`;
    }
}

// Show solution steps
function showNormSolution() {
    const stepsDiv = document.getElementById('norm-steps');
    stepsDiv.classList.remove('hidden');

    const ex = currentNormExercise;
    let stepsHtml = '<h4>Solution Steps:</h4><ol class="solution-steps">';

    if (ex.steps) {
        stepsHtml += ex.steps.map(step => `<li>${step}</li>`).join('');
    } else if (ex.normalFormChecks) {
        stepsHtml += '<li><strong>Normal Form Analysis:</strong><ul>';
        for (const [nf, check] of Object.entries(ex.normalFormChecks)) {
            const icon = check.passes ? '✓' : '✗';
            stepsHtml += `<li>${icon} <strong>${nf}:</strong> ${check.reason}</li>`;
        }
        stepsHtml += '</ul></li>';
    } else if (ex.explanation) {
        stepsHtml += `<li>${ex.explanation}</li>`;
    }

    stepsHtml += '</ol>';

    // Show the correct answer
    if (currentNormCategory === 'attributeClosure') {
        stepsHtml += `<p class="final-answer"><strong>Answer:</strong> {${ex.computeFor.join(', ')}}⁺ = {${ex.answer.join(', ')}}</p>`;
    } else if (currentNormCategory === 'normalFormIdentification') {
        stepsHtml += `<p class="final-answer"><strong>Answer:</strong> ${ex.answer}</p>`;
    } else if (currentNormCategory === 'candidateKeys') {
        stepsHtml += `<p class="final-answer"><strong>Answer:</strong> Candidate Keys: ${ex.answer.map(k => '{' + k.join(', ') + '}').join(', ')}</p>`;
    } else if (currentNormCategory === 'minimalCover') {
        stepsHtml += `<p class="final-answer"><strong>Answer:</strong> {${ex.answer.join(', ')}}</p>`;
    }

    stepsDiv.innerHTML = stepsHtml;
}

// Navigation
function nextNormExercise() {
    if (normExerciseIndex < normalizationExercises[currentNormCategory].length - 1) {
        normExerciseIndex++;
        loadNormExercise();
    }
}

function prevNormExercise() {
    if (normExerciseIndex > 0) {
        normExerciseIndex--;
        loadNormExercise();
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Listen for clicks on the Practice Exercises tab
    const practiceBtn = document.querySelector('button[data-topic="norm-practice"]');
    if (practiceBtn) {
        practiceBtn.addEventListener('click', function() {
            setTimeout(initNormalizationPractice, 50);
        });
    }

    // Also check if practice panel is already active on page load
    const practicePanel = document.getElementById('norm-practice');
    if (practicePanel && practicePanel.classList.contains('active')) {
        initNormalizationPractice();
    }
});
