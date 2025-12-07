// ========================================
// Relational Algebra Practice System
// ========================================

// ========================================
// RELATIONAL ALGEBRA REFERENCE
// ========================================
const raReference = {
    basicOperators: [
        {
            symbol: 'σ (sigma)',
            name: 'SELECT',
            syntax: 'σ_condition(R)',
            description: 'Selects ROWS satisfying condition. Result has same attributes as R.',
            example: 'σ_Salary>50000(EMPLOYEE)',
            notes: 'Condition uses: <, <=, >=, >, =, <> with AND, OR, NOT'
        },
        {
            symbol: 'π (pi)',
            name: 'PROJECT',
            syntax: 'π_attribute-list(R)',
            description: 'Selects COLUMNS. ELIMINATES DUPLICATE tuples.',
            example: 'π_Fname,Lname(EMPLOYEE)',
            notes: 'Result is a SET - no duplicates allowed'
        },
        {
            symbol: '∪',
            name: 'UNION',
            syntax: 'R ∪ S',
            description: 'All tuples in R OR S (duplicates removed).',
            example: 'π_Name(STUDENT) ∪ π_Name(INSTRUCTOR)',
            notes: 'Requires UNION COMPATIBILITY'
        },
        {
            symbol: '−',
            name: 'SET DIFFERENCE',
            syntax: 'R − S',
            description: 'Tuples in R but NOT in S.',
            example: 'π_SSN(EMPLOYEE) − π_ESSN(WORKS_ON)',
            notes: 'Requires UNION COMPATIBILITY'
        },
        {
            symbol: '×',
            name: 'CARTESIAN PRODUCT',
            syntax: 'R × S',
            description: 'All combinations of tuples from R and S.',
            example: 'EMPLOYEE × DEPARTMENT',
            notes: 'Result has |R| × |S| tuples, (m+n) attributes'
        }
    ],
    derivedOperators: [
        {
            symbol: '∩',
            name: 'INTERSECTION',
            syntax: 'R ∩ S',
            description: 'Tuples in BOTH R and S.',
            formula: 'R ∩ S = R − (R − S)',
            notes: 'Requires UNION COMPATIBILITY'
        },
        {
            symbol: '⋈',
            name: 'THETA JOIN',
            syntax: 'R ⋈_condition S',
            description: 'Combines related tuples based on condition.',
            formula: 'R ⋈_c S = σ_c(R × S)',
            notes: 'Condition uses theta operators: =, <, >, etc.'
        },
        {
            symbol: '⋈ or *',
            name: 'NATURAL JOIN',
            syntax: 'R * S or R ⋈ S',
            description: 'Equijoin on ALL common attributes, duplicate columns removed.',
            formula: 'R * S = π_(unique attrs)(σ_(common attrs equal)(R × S))',
            notes: 'If no common attributes, becomes Cartesian product'
        },
        {
            symbol: '÷',
            name: 'DIVISION',
            syntax: 'R ÷ S',
            description: 'Tuples in R related to ALL tuples in S.',
            formula: 'R ÷ S = π_A(R) − π_A((π_A(R) × S) − R)',
            notes: 'S attributes must be SUBSET of R attributes'
        },
        {
            symbol: '⋉',
            name: 'SEMIJOIN',
            syntax: 'R ⋉ S',
            description: 'Tuples of R that have a match in S.',
            formula: 'R ⋉ S = π_(R-attrs)(R * S)',
            notes: 'Returns only R\'s attributes'
        },
        {
            symbol: '▷',
            name: 'ANTIJOIN',
            syntax: 'R ▷ S',
            description: 'Tuples of R with NO match in S.',
            formula: 'R ▷ S = R − π_(R-attrs)(R * S)',
            notes: 'Opposite of semijoin'
        }
    ],
    aggregateOperators: [
        {
            symbol: 'ℱ',
            name: 'AGGREGATE',
            syntax: 'G ℱ_F(R) or grouping-attrs ℱ function-list(R)',
            description: 'Apply aggregate functions, optionally grouped.',
            example: 'Dno ℱ COUNT_SSN, AVG_Salary(EMPLOYEE)',
            notes: 'Functions: SUM, COUNT, AVG, MAX, MIN'
        }
    ],
    outerJoins: [
        {
            symbol: '⟕',
            name: 'LEFT OUTER JOIN',
            syntax: 'R ⟕ S',
            description: 'All tuples from R, matched with S (NULLs for no match).',
            notes: 'Preserves all left-side tuples'
        },
        {
            symbol: '⟖',
            name: 'RIGHT OUTER JOIN',
            syntax: 'R ⟖ S',
            description: 'All tuples from S, matched with R (NULLs for no match).',
            notes: 'Preserves all right-side tuples'
        },
        {
            symbol: '⟗',
            name: 'FULL OUTER JOIN',
            syntax: 'R ⟗ S',
            description: 'All tuples from both R and S (NULLs for no match).',
            notes: 'Preserves all tuples from both sides'
        }
    ],
    renaming: [
        {
            symbol: 'ρ',
            name: 'RENAME',
            syntax: 'ρ_S(A1,A2,...)(R) or expression[A1,A2,...]',
            description: 'Rename relation to S and/or rename attributes.',
            example: 'ρ_SUPERVISOR(SSN,Name)(π_SSN,Fname(EMPLOYEE))',
            notes: 'Useful for self-joins and disambiguating attributes'
        }
    ],
    unionCompatibility: {
        title: 'UNION COMPATIBILITY',
        requirements: [
            'Same number of attributes (same degree)',
            'Corresponding attributes have compatible domains',
            'Result uses attribute names from FIRST operand'
        ],
        requiredFor: ['UNION (∪)', 'INTERSECTION (∩)', 'SET DIFFERENCE (−)']
    },
    keyFormulas: [
        { name: 'Join to basic', formula: 'R ⋈_c S = σ_c(R × S)' },
        { name: 'Natural Join', formula: 'R * S = π_(unique)(σ_(equal common)(R × S))' },
        { name: 'Intersection', formula: 'R ∩ S = R − (R − S)' },
        { name: 'Division', formula: 'R ÷ S = π_A(R) − π_A((π_A(R) × S) − R)' },
        { name: 'Semijoin', formula: 'R ⋉ S = π_(R-attrs)(R * S)' },
        { name: 'Antijoin', formula: 'R ▷ S = R − (R ⋉ S)' }
    ],
    properties: [
        'SELECT is commutative: σ_c1(σ_c2(R)) = σ_c2(σ_c1(R))',
        'SELECT cascade: σ_c1(σ_c2(R)) = σ_(c1 AND c2)(R)',
        'PROJECT is NOT commutative',
        'PROJECT cascade: π_L1(π_L2(R)) = π_L1(R) if L1 ⊆ L2',
        'UNION and INTERSECTION are commutative and associative',
        'SET DIFFERENCE is NOT commutative: R − S ≠ S − R',
        'Cartesian product is commutative: R × S = S × R (up to column order)'
    ]
};

// ========================================
// SAMPLE DATABASE FOR EXERCISES
// ========================================
const sampleDatabase = {
    schema: `
COMPANY DATABASE SCHEMA (for Relational Algebra Practice):
============================================================

EMPLOYEE (SSN, Fname, Lname, Bdate, Address, Sex, Salary, SuperSSN, Dno)
DEPARTMENT (Dname, Dnumber, MgrSSN, MgrStartDate)
PROJECT (Pname, Pnumber, Plocation, Dnum)
WORKS_ON (ESSN, Pno, Hours)
DEPENDENT (ESSN, Dependent_name, Sex, Bdate, Relationship)
DEPT_LOCATIONS (Dnumber, Dlocation)

UNIVERSITY DATABASE SCHEMA:
============================================================

STUDENT (StudId, Name, Major, GPA)
COURSE (CrsCode, CrsName, Credits, Dept)
TRANSCRIPT (StudId, CrsCode, Semester, Grade)
TEACHING (ProfId, CrsCode, Semester)
PROFESSOR (ProfId, Name, Dept)
`,
    sampleData: {
        EMPLOYEE: {
            columns: ['SSN', 'Fname', 'Lname', 'Salary', 'Dno'],
            rows: [
                ['111', 'John', 'Smith', 30000, 5],
                ['222', 'Jane', 'Doe', 40000, 5],
                ['333', 'Bob', 'Wilson', 35000, 4],
                ['444', 'Alice', 'Brown', 50000, 4],
                ['555', 'Charlie', 'Davis', 45000, 5]
            ]
        },
        DEPARTMENT: {
            columns: ['Dname', 'Dnumber', 'MgrSSN'],
            rows: [
                ['Research', 5, '111'],
                ['Admin', 4, '333'],
                ['HR', 1, '444']
            ]
        },
        WORKS_ON: {
            columns: ['ESSN', 'Pno', 'Hours'],
            rows: [
                ['111', 1, 20],
                ['111', 2, 10],
                ['222', 1, 15],
                ['222', 2, 20],
                ['222', 3, 5],
                ['333', 2, 30],
                ['444', 3, 25]
            ]
        },
        PROJECT: {
            columns: ['Pname', 'Pnumber', 'Dnum'],
            rows: [
                ['ProductX', 1, 5],
                ['ProductY', 2, 5],
                ['ProductZ', 3, 4]
            ]
        },
        STUDENT: {
            columns: ['StudId', 'Name', 'Major'],
            rows: [
                ['S1', 'Alice', 'CS'],
                ['S2', 'Bob', 'Math'],
                ['S3', 'Carol', 'CS'],
                ['S4', 'David', 'Physics']
            ]
        },
        TRANSCRIPT: {
            columns: ['StudId', 'CrsCode', 'Grade'],
            rows: [
                ['S1', 'CS101', 'A'],
                ['S1', 'CS102', 'B'],
                ['S1', 'MA101', 'A'],
                ['S2', 'CS101', 'B'],
                ['S2', 'MA101', 'A'],
                ['S3', 'CS101', 'A'],
                ['S3', 'CS102', 'A'],
                ['S3', 'MA101', 'B']
            ]
        },
        COURSE: {
            columns: ['CrsCode', 'CrsName', 'Dept'],
            rows: [
                ['CS101', 'Intro to CS', 'CS'],
                ['CS102', 'Data Structures', 'CS'],
                ['MA101', 'Calculus', 'Math']
            ]
        }
    }
};

// ========================================
// RELATIONAL ALGEBRA EXERCISES
// ========================================
const raExercises = {
    // ========================================
    // Category 1: Write RA from English
    // ========================================
    writeRA: [
        {
            id: 'wr1',
            title: 'Simple Selection',
            difficulty: 'Easy',
            description: 'Write a RA expression to find all employees with salary greater than 40000.',
            hint: 'Use the SELECT (σ) operator with a comparison condition.',
            sampleAnswer: 'σ_Salary>40000(EMPLOYEE)',
            alternateAnswers: ['σ_(Salary>40000)(EMPLOYEE)', 'σ Salary>40000 (EMPLOYEE)'],
            keyPoints: ['σ (SELECT)', 'Comparison condition'],
            explanation: 'SELECT (σ) filters rows. The condition Salary>40000 keeps only employees earning more than 40000.'
        },
        {
            id: 'wr2',
            title: 'Simple Projection',
            difficulty: 'Easy',
            description: 'Write a RA expression to get the names (Fname, Lname) of all employees.',
            hint: 'Use the PROJECT (π) operator with the attribute list.',
            sampleAnswer: 'π_Fname,Lname(EMPLOYEE)',
            alternateAnswers: ['π_(Fname,Lname)(EMPLOYEE)', 'π Fname,Lname (EMPLOYEE)'],
            keyPoints: ['π (PROJECT)', 'Attribute list'],
            explanation: 'PROJECT (π) selects columns. The result contains only Fname and Lname, with duplicates eliminated.'
        },
        {
            id: 'wr3',
            title: 'Selection with AND',
            difficulty: 'Easy',
            description: 'Find employees who work in department 5 AND have salary >= 35000.',
            hint: 'Use SELECT with AND to combine two conditions.',
            sampleAnswer: 'σ_(Dno=5 AND Salary>=35000)(EMPLOYEE)',
            alternateAnswers: ['σ_Dno=5 AND Salary>=35000(EMPLOYEE)', 'σ_(Salary>=35000 AND Dno=5)(EMPLOYEE)'],
            keyPoints: ['σ (SELECT)', 'AND operator', 'Multiple conditions'],
            explanation: 'Use AND to combine conditions. Both must be true for a tuple to be selected.'
        },
        {
            id: 'wr4',
            title: 'Combined Select and Project',
            difficulty: 'Easy',
            description: 'Get the names of employees who work in department 5.',
            hint: 'First SELECT to filter, then PROJECT to get names.',
            sampleAnswer: 'π_Fname,Lname(σ_Dno=5(EMPLOYEE))',
            alternateAnswers: ['π_(Fname,Lname)(σ_(Dno=5)(EMPLOYEE))'],
            keyPoints: ['σ (SELECT)', 'π (PROJECT)', 'Composition'],
            explanation: 'Apply SELECT first to filter rows, then PROJECT to get only the name columns.'
        },
        {
            id: 'wr5',
            title: 'Natural Join',
            difficulty: 'Medium',
            description: 'List employee names with their department names (use EMPLOYEE and DEPARTMENT).',
            hint: 'Use Natural Join (*) on the common attribute (Dno/Dnumber), then project.',
            sampleAnswer: 'π_Fname,Lname,Dname(EMPLOYEE ⋈_Dno=Dnumber DEPARTMENT)',
            alternateAnswers: [
                'π_Fname,Lname,Dname(σ_Dno=Dnumber(EMPLOYEE × DEPARTMENT))',
                'π_(Fname,Lname,Dname)(EMPLOYEE * DEPARTMENT)'
            ],
            keyPoints: ['⋈ (JOIN)', 'π (PROJECT)', 'Join condition'],
            explanation: 'Join EMPLOYEE and DEPARTMENT on the department number, then project the names.'
        },
        {
            id: 'wr6',
            title: 'Set Difference',
            difficulty: 'Medium',
            description: 'Find SSNs of employees who do NOT work on any project.',
            hint: 'Use SET DIFFERENCE: All employee SSNs minus those in WORKS_ON.',
            sampleAnswer: 'π_SSN(EMPLOYEE) − π_ESSN(WORKS_ON)',
            alternateAnswers: ['π_(SSN)(EMPLOYEE) − π_(ESSN)(WORKS_ON)'],
            keyPoints: ['− (SET DIFFERENCE)', 'π (PROJECT)'],
            explanation: 'Project SSNs from both relations, then subtract. Result is SSNs with no work assignments.'
        },
        {
            id: 'wr7',
            title: 'Self-Join (Supervisors)',
            difficulty: 'Medium',
            description: 'Find pairs of (Employee name, Supervisor name) for all employees who have supervisors.',
            hint: 'Join EMPLOYEE with itself, renaming one copy. Match SuperSSN with SSN.',
            sampleAnswer: 'π_E.Fname,E.Lname,S.Fname,S.Lname(σ_E.SuperSSN=S.SSN(ρ_E(EMPLOYEE) × ρ_S(EMPLOYEE)))',
            alternateAnswers: [
                'π_(E.Fname,E.Lname,S.Fname,S.Lname)(EMPLOYEE[E] ⋈_E.SuperSSN=S.SSN EMPLOYEE[S])'
            ],
            keyPoints: ['Self-join', 'ρ (RENAME)', 'Table aliases'],
            explanation: 'Rename EMPLOYEE twice (E for employee, S for supervisor). Join where employee\'s SuperSSN equals supervisor\'s SSN.'
        },
        {
            id: 'wr8',
            title: 'Three-Way Join',
            difficulty: 'Medium',
            description: 'Find names of employees who work on project "ProductX".',
            hint: 'Join EMPLOYEE → WORKS_ON → PROJECT, then select and project.',
            sampleAnswer: 'π_Fname,Lname(σ_Pname=\'ProductX\'(EMPLOYEE ⋈_SSN=ESSN WORKS_ON ⋈_Pno=Pnumber PROJECT))',
            alternateAnswers: [
                'π_Fname,Lname(EMPLOYEE ⋈_SSN=ESSN (WORKS_ON ⋈_Pno=Pnumber σ_Pname=\'ProductX\'(PROJECT)))'
            ],
            keyPoints: ['Multiple joins', 'σ (SELECT)', 'π (PROJECT)'],
            explanation: 'Chain joins: EMPLOYEE to WORKS_ON on SSN=ESSN, then to PROJECT on Pno=Pnumber. Filter by project name, project employee names.'
        },
        {
            id: 'wr9',
            title: 'Union',
            difficulty: 'Medium',
            description: 'Find all location names where either a department is located OR a project is based.',
            hint: 'Use UNION on projected location attributes from both relations.',
            sampleAnswer: 'π_Dlocation(DEPT_LOCATIONS) ∪ π_Plocation(PROJECT)',
            alternateAnswers: ['π_(Dlocation)(DEPT_LOCATIONS) ∪ π_(Plocation)(PROJECT)'],
            keyPoints: ['∪ (UNION)', 'π (PROJECT)', 'Union compatibility'],
            explanation: 'Project locations from both tables. UNION combines them and removes duplicates.'
        },
        {
            id: 'wr10',
            title: 'Intersection',
            difficulty: 'Medium',
            description: 'Find SSNs of employees who are also department managers.',
            hint: 'Intersect employee SSNs with manager SSNs from DEPARTMENT.',
            sampleAnswer: 'π_SSN(EMPLOYEE) ∩ π_MgrSSN(DEPARTMENT)',
            alternateAnswers: [
                'π_SSN(EMPLOYEE) − (π_SSN(EMPLOYEE) − π_MgrSSN(DEPARTMENT))'
            ],
            keyPoints: ['∩ (INTERSECTION)', 'π (PROJECT)'],
            explanation: 'INTERSECTION finds values in both sets. Alternative: use R ∩ S = R − (R − S).'
        },
        {
            id: 'wr11',
            title: 'Aggregate Function',
            difficulty: 'Medium',
            description: 'Find the average salary of employees in each department.',
            hint: 'Use the aggregate operator with grouping.',
            sampleAnswer: 'Dno ℱ AVG_Salary(EMPLOYEE)',
            alternateAnswers: ['Dno ℱ_(AVG Salary)(EMPLOYEE)', 'γ_Dno, AVG(Salary)(EMPLOYEE)'],
            keyPoints: ['ℱ (AGGREGATE)', 'GROUP BY equivalent', 'AVG function'],
            explanation: 'Group by Dno, apply AVG to Salary. Result has one row per department with avg salary.'
        },
        {
            id: 'wr12',
            title: 'Employees in Specific Departments',
            difficulty: 'Medium',
            description: 'Find names of employees who work in "Research" or "Admin" department.',
            hint: 'Join with DEPARTMENT, select by department name, project employee names.',
            sampleAnswer: 'π_Fname,Lname(σ_(Dname=\'Research\' OR Dname=\'Admin\')(EMPLOYEE ⋈_Dno=Dnumber DEPARTMENT))',
            alternateAnswers: [
                'π_Fname,Lname(EMPLOYEE ⋈_Dno=Dnumber (σ_(Dname=\'Research\' OR Dname=\'Admin\')(DEPARTMENT)))'
            ],
            keyPoints: ['⋈ (JOIN)', 'OR operator', 'π (PROJECT)'],
            explanation: 'Join to get department names, filter by department name, then project employee names.'
        }
    ],

    // ========================================
    // Category 2: Step-by-Step Evaluation
    // ========================================
    stepByStep: [
        {
            id: 'sbs1',
            title: 'Evaluate Selection',
            difficulty: 'Easy',
            description: 'Evaluate σ_Salary>35000(EMPLOYEE) using the sample data.',
            sampleData: 'EMPLOYEE',
            expression: 'σ_Salary>35000(EMPLOYEE)',
            hint: 'Check each row: if Salary > 35000, include it in the result.',
            sampleAnswer: `Step 1: Check each tuple in EMPLOYEE
Row 1: SSN=111, Salary=30000 → 30000 > 35000? NO → Exclude
Row 2: SSN=222, Salary=40000 → 40000 > 35000? YES → Include
Row 3: SSN=333, Salary=35000 → 35000 > 35000? NO → Exclude
Row 4: SSN=444, Salary=50000 → 50000 > 35000? YES → Include
Row 5: SSN=555, Salary=45000 → 45000 > 35000? YES → Include

Result:
| SSN | Fname   | Lname | Salary | Dno |
|-----|---------|-------|--------|-----|
| 222 | Jane    | Doe   | 40000  | 5   |
| 444 | Alice   | Brown | 50000  | 4   |
| 555 | Charlie | Davis | 45000  | 5   |`,
            keyPoints: ['Row-by-row evaluation', 'Condition checking'],
            resultTable: {
                columns: ['SSN', 'Fname', 'Lname', 'Salary', 'Dno'],
                rows: [
                    ['222', 'Jane', 'Doe', 40000, 5],
                    ['444', 'Alice', 'Brown', 50000, 4],
                    ['555', 'Charlie', 'Davis', 45000, 5]
                ]
            }
        },
        {
            id: 'sbs2',
            title: 'Evaluate Projection',
            difficulty: 'Easy',
            description: 'Evaluate π_Fname,Dno(EMPLOYEE) using the sample data.',
            sampleData: 'EMPLOYEE',
            expression: 'π_Fname,Dno(EMPLOYEE)',
            hint: 'Keep only Fname and Dno columns. Remove duplicate rows if any.',
            sampleAnswer: `Step 1: Extract only Fname and Dno columns
Step 2: Remove duplicates (none in this case)

Result:
| Fname   | Dno |
|---------|-----|
| John    | 5   |
| Jane    | 5   |
| Bob     | 4   |
| Alice   | 4   |
| Charlie | 5   |

Note: All 5 rows are unique, so no duplicates removed.`,
            keyPoints: ['Column extraction', 'Duplicate elimination'],
            resultTable: {
                columns: ['Fname', 'Dno'],
                rows: [
                    ['John', 5],
                    ['Jane', 5],
                    ['Bob', 4],
                    ['Alice', 4],
                    ['Charlie', 5]
                ]
            }
        },
        {
            id: 'sbs3',
            title: 'Evaluate π_Dno(EMPLOYEE) - With Duplicates',
            difficulty: 'Easy',
            description: 'Evaluate π_Dno(EMPLOYEE) - notice duplicate elimination.',
            sampleData: 'EMPLOYEE',
            expression: 'π_Dno(EMPLOYEE)',
            hint: 'PROJECT eliminates duplicates - this is key!',
            sampleAnswer: `Step 1: Extract Dno from each row:
Row 1: Dno = 5
Row 2: Dno = 5  (duplicate!)
Row 3: Dno = 4
Row 4: Dno = 4  (duplicate!)
Row 5: Dno = 5  (duplicate!)

Step 2: Remove duplicates

Result:
| Dno |
|-----|
| 5   |
| 4   |

IMPORTANT: PROJECT always eliminates duplicates!
Original had 5 rows, result has only 2 unique values.`,
            keyPoints: ['Duplicate elimination in PROJECT', 'Set semantics'],
            resultTable: {
                columns: ['Dno'],
                rows: [[5], [4]]
            }
        },
        {
            id: 'sbs4',
            title: 'Evaluate Set Difference',
            difficulty: 'Medium',
            description: 'Given R = {1, 2, 3, 4} and S = {2, 4, 5}, evaluate R − S.',
            expression: 'R − S',
            hint: 'R − S contains elements in R that are NOT in S.',
            sampleAnswer: `R = {1, 2, 3, 4}
S = {2, 4, 5}

Step 1: For each element in R, check if it's in S:
1 ∈ S? NO → Keep 1
2 ∈ S? YES → Remove 2
3 ∈ S? NO → Keep 3
4 ∈ S? YES → Remove 4

Result: R − S = {1, 3}

Note: 5 is in S but not in R - it does NOT appear in the result.
R − S ≠ S − R (set difference is NOT commutative)`,
            keyPoints: ['Set difference semantics', 'Not commutative'],
            resultTable: {
                columns: ['Value'],
                rows: [[1], [3]]
            }
        },
        {
            id: 'sbs5',
            title: 'Evaluate Cartesian Product',
            difficulty: 'Medium',
            description: 'Evaluate the Cartesian product of A(X) = {1, 2} and B(Y) = {a, b}.',
            expression: 'A × B',
            hint: 'Combine EVERY tuple in A with EVERY tuple in B.',
            sampleAnswer: `A = | X |    B = | Y |
    |---|        |---|
    | 1 |        | a |
    | 2 |        | b |

Step 1: Combine each tuple of A with each tuple of B:
(1, a), (1, b), (2, a), (2, b)

Result:
| X | Y |
|---|---|
| 1 | a |
| 1 | b |
| 2 | a |
| 2 | b |

Size: |A| × |B| = 2 × 2 = 4 tuples
Attributes: X from A + Y from B = 2 attributes`,
            keyPoints: ['All combinations', 'Result size = |R| × |S|'],
            resultTable: {
                columns: ['X', 'Y'],
                rows: [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
            }
        },
        {
            id: 'sbs6',
            title: 'Evaluate Join',
            difficulty: 'Medium',
            description: 'Evaluate EMPLOYEE ⋈_Dno=Dnumber DEPARTMENT using sample data.',
            sampleData: 'EMPLOYEE, DEPARTMENT',
            expression: 'EMPLOYEE ⋈_Dno=Dnumber DEPARTMENT',
            hint: 'Match each employee with department where Dno = Dnumber.',
            sampleAnswer: `Step 1: For each EMPLOYEE tuple, find matching DEPARTMENT tuple(s):

E(111, John, 30000, 5) matches D(Research, 5, 111)
E(222, Jane, 40000, 5) matches D(Research, 5, 111)
E(333, Bob, 35000, 4) matches D(Admin, 4, 333)
E(444, Alice, 50000, 4) matches D(Admin, 4, 333)
E(555, Charlie, 45000, 5) matches D(Research, 5, 111)

Note: HR department (Dnumber=1) has no matching employees.

Result:
| SSN | Fname   | Salary | Dno | Dname    | Dnumber | MgrSSN |
|-----|---------|--------|-----|----------|---------|--------|
| 111 | John    | 30000  | 5   | Research | 5       | 111    |
| 222 | Jane    | 40000  | 5   | Research | 5       | 111    |
| 333 | Bob     | 35000  | 4   | Admin    | 4       | 333    |
| 444 | Alice   | 50000  | 4   | Admin    | 4       | 333    |
| 555 | Charlie | 45000  | 5   | Research | 5       | 111    |`,
            keyPoints: ['Match on condition', 'Unmatched tuples excluded in regular join'],
            resultTable: {
                columns: ['SSN', 'Fname', 'Salary', 'Dno', 'Dname', 'MgrSSN'],
                rows: [
                    ['111', 'John', 30000, 5, 'Research', '111'],
                    ['222', 'Jane', 40000, 5, 'Research', '111'],
                    ['333', 'Bob', 35000, 4, 'Admin', '333'],
                    ['444', 'Alice', 50000, 4, 'Admin', '333'],
                    ['555', 'Charlie', 45000, 5, 'Research', '111']
                ]
            }
        },
        {
            id: 'sbs7',
            title: 'Evaluate Combined Expression',
            difficulty: 'Medium',
            description: 'Evaluate π_Fname(σ_Dno=5(EMPLOYEE)) step by step.',
            sampleData: 'EMPLOYEE',
            expression: 'π_Fname(σ_Dno=5(EMPLOYEE))',
            hint: 'Work inside-out: first SELECT, then PROJECT.',
            sampleAnswer: `Step 1: Evaluate σ_Dno=5(EMPLOYEE)
Check each row for Dno = 5:
(111, John, 30000, 5) → Dno=5? YES
(222, Jane, 40000, 5) → Dno=5? YES
(333, Bob, 35000, 4) → Dno=5? NO
(444, Alice, 50000, 4) → Dno=5? NO
(555, Charlie, 45000, 5) → Dno=5? YES

Intermediate result (T1):
| SSN | Fname   | Lname | Salary | Dno |
|-----|---------|-------|--------|-----|
| 111 | John    | Smith | 30000  | 5   |
| 222 | Jane    | Doe   | 40000  | 5   |
| 555 | Charlie | Davis | 45000  | 5   |

Step 2: Evaluate π_Fname(T1)
Extract only Fname column:

Final Result:
| Fname   |
|---------|
| John    |
| Jane    |
| Charlie |`,
            keyPoints: ['Inside-out evaluation', 'Intermediate results'],
            resultTable: {
                columns: ['Fname'],
                rows: [['John'], ['Jane'], ['Charlie']]
            }
        },
        {
            id: 'sbs8',
            title: 'Evaluate INTERSECTION using Basic Operators',
            difficulty: 'Hard',
            description: 'Given R = {1, 2, 3, 4} and S = {2, 3, 5}, evaluate R ∩ S using the formula R − (R − S).',
            expression: 'R ∩ S = R − (R − S)',
            hint: 'First compute R − S, then compute R − (that result).',
            sampleAnswer: `R = {1, 2, 3, 4}
S = {2, 3, 5}

Step 1: Compute R − S
Elements in R but not in S:
1 ∈ S? NO → include 1
2 ∈ S? YES → exclude
3 ∈ S? YES → exclude
4 ∈ S? NO → include 4

R − S = {1, 4}

Step 2: Compute R − (R − S) = R − {1, 4}
Elements in R but not in {1, 4}:
1 ∈ {1,4}? YES → exclude
2 ∈ {1,4}? NO → include 2
3 ∈ {1,4}? NO → include 3
4 ∈ {1,4}? YES → exclude

R − (R − S) = {2, 3}

Verification: R ∩ S = {2, 3} (elements in both R and S)`,
            keyPoints: ['Intersection formula', 'Nested set operations'],
            resultTable: {
                columns: ['Value'],
                rows: [[2], [3]]
            }
        }
    ],

    // ========================================
    // Category 3: Equivalent Expressions
    // ========================================
    equivalentExpressions: [
        {
            id: 'eq1',
            title: 'Join as Cartesian + Select',
            difficulty: 'Medium',
            description: 'Convert R ⋈_A=B S to an equivalent expression using Cartesian product and SELECT.',
            originalExpr: 'R ⋈_A=B S',
            hint: 'THETA JOIN = SELECT applied to CARTESIAN PRODUCT.',
            sampleAnswer: 'σ_A=B(R × S)',
            explanation: `THETA JOIN Definition:
R ⋈_condition S = σ_condition(R × S)

The JOIN is equivalent to:
1. First compute R × S (all combinations)
2. Then apply σ_A=B to keep only matching pairs

Example:
R ⋈_Dno=Dnumber S = σ_Dno=Dnumber(R × S)`,
            keyPoints: ['Join decomposition', 'Cartesian + Select']
        },
        {
            id: 'eq2',
            title: 'Natural Join Expansion',
            difficulty: 'Medium',
            description: 'Express R * S (natural join on common attribute C) using basic operators.',
            originalExpr: 'R(A, B, C) * S(C, D, E)',
            hint: 'Natural join = Cartesian, Select on equal common attrs, Project to remove duplicates.',
            sampleAnswer: 'π_A,B,C,D,E(σ_R.C=S.C(R × S))',
            explanation: `Natural Join expands to:
1. Cartesian product: R × S
2. Select where common attributes equal: σ_R.C=S.C(R × S)
3. Project to remove duplicate columns: π_A,B,C,D,E(...)

Note: We keep only ONE copy of the common attribute C.

If multiple common attributes, AND them:
R(A,B) * S(A,B,C) → π_A,B,C(σ_(R.A=S.A AND R.B=S.B)(R × S))`,
            keyPoints: ['Natural join definition', 'Duplicate column removal']
        },
        {
            id: 'eq3',
            title: 'Cascading Selects',
            difficulty: 'Easy',
            description: 'Simplify σ_A=1(σ_B=2(R)) to a single SELECT.',
            originalExpr: 'σ_A=1(σ_B=2(R))',
            hint: 'Multiple SELECTs can be combined with AND.',
            sampleAnswer: 'σ_A=1 AND B=2(R)',
            explanation: `SELECT CASCADE Property:
σ_c1(σ_c2(R)) = σ_c1 AND c2(R)

Both conditions must be satisfied, so combining with AND is equivalent.

This is more efficient - only one pass through the data.

Also, SELECT is commutative:
σ_A=1(σ_B=2(R)) = σ_B=2(σ_A=1(R))`,
            keyPoints: ['Select cascade', 'AND combination', 'Commutativity']
        },
        {
            id: 'eq4',
            title: 'Push Selection Through Join',
            difficulty: 'Hard',
            description: 'Optimize σ_A=5(R ⋈_B=C S) where A is an attribute of R only.',
            originalExpr: 'σ_A=5(R ⋈_B=C S)',
            hint: 'If the selection condition only involves R, push it before the join.',
            sampleAnswer: '(σ_A=5(R)) ⋈_B=C S',
            explanation: `Optimization: Push selection BEFORE join

When condition involves only ONE relation's attributes:
σ_cond(R ⋈ S) = (σ_cond(R)) ⋈ S   [if cond uses only R's attrs]

Benefits:
1. Reduces size of R before the expensive join
2. Fewer tuples to process in the join

This is a key query optimization technique!

If condition involves both R and S, cannot push down.`,
            keyPoints: ['Query optimization', 'Selection pushdown']
        },
        {
            id: 'eq5',
            title: 'Intersection to Difference',
            difficulty: 'Medium',
            description: 'Express R ∩ S using only SET DIFFERENCE.',
            originalExpr: 'R ∩ S',
            hint: 'INTERSECTION = R minus (elements in R but not in S).',
            sampleAnswer: 'R − (R − S)',
            explanation: `Intersection using Difference:
R ∩ S = R − (R − S)

Why this works:
- R − S gives elements in R but NOT in S
- R − (R − S) removes those from R
- What remains = elements in R that ARE also in S
- Which is exactly R ∩ S

This proves INTERSECTION is not a basic operator - it can be derived.`,
            keyPoints: ['Derived operator', 'Set algebra']
        },
        {
            id: 'eq6',
            title: 'Semijoin Definition',
            difficulty: 'Medium',
            description: 'Express SEMIJOIN R ⋉ S using basic operators.',
            originalExpr: 'R ⋉ S',
            hint: 'Semijoin returns R tuples that have a match in S.',
            sampleAnswer: 'π_R-attrs(R * S)',
            alternateAnswers: ['π_(attributes of R)(R ⋈ S)', 'R ⋈ π_common-attrs(S)'],
            explanation: `Semijoin Definition:
R ⋉ S = π_(R's attributes)(R * S)

Returns only:
- Attributes from R
- Tuples of R that have at least one match in S

Example: Find employees who work on some project:
EMPLOYEE ⋉ WORKS_ON
= π_EMPLOYEE-attrs(EMPLOYEE ⋈_SSN=ESSN WORKS_ON)`,
            keyPoints: ['Semijoin definition', 'Project after join']
        },
        {
            id: 'eq7',
            title: 'Antijoin Definition',
            difficulty: 'Medium',
            description: 'Express ANTIJOIN R ▷ S using basic operators.',
            originalExpr: 'R ▷ S',
            hint: 'Antijoin returns R tuples that have NO match in S.',
            sampleAnswer: 'R − (R ⋉ S)',
            alternateAnswers: ['R − π_R-attrs(R * S)'],
            explanation: `Antijoin Definition:
R ▷ S = R − (R ⋉ S)

Returns:
- Tuples of R that have NO match in S
- Opposite of semijoin

Example: Find employees who work on NO projects:
EMPLOYEE ▷ WORKS_ON
= EMPLOYEE − π_EMPLOYEE-attrs(EMPLOYEE ⋈_SSN=ESSN WORKS_ON)`,
            keyPoints: ['Antijoin definition', 'Difference with semijoin']
        },
        {
            id: 'eq8',
            title: 'Project Cascade',
            difficulty: 'Medium',
            description: 'Simplify π_A(π_A,B,C(R)).',
            originalExpr: 'π_A(π_A,B,C(R))',
            hint: 'When cascading projects, the outer one wins if its attributes are subset of inner.',
            sampleAnswer: 'π_A(R)',
            explanation: `Project Cascade:
π_L1(π_L2(R)) = π_L1(R)  when L1 ⊆ L2

The inner projection is redundant because:
1. Inner π_A,B,C keeps A, B, C
2. Outer π_A then keeps only A
3. Same as directly projecting A from R

Note: PROJECT is NOT commutative!
π_A(π_B(R)) ≠ π_B(π_A(R)) in general

The first succeeds only if A ⊆ {B}
The second succeeds only if B ⊆ {A}`,
            keyPoints: ['Project cascade', 'Subset requirement']
        }
    ],

    // ========================================
    // Category 4: Division Problems (CRITICAL FOR EXAMS!)
    // ========================================
    division: [
        {
            id: 'div1',
            title: 'Division Concept',
            difficulty: 'Hard',
            description: 'Given R(A, B) and S(B), what does R ÷ S return? Explain the concept.',
            hint: 'Division finds A values that are paired with ALL B values in S.',
            sampleAnswer: `DIVISION returns A values from R that are related to ALL B values in S.

Formal Definition:
R ÷ S = { a | for EVERY b in S, (a, b) is in R }

In words: "Find all A's that have a match with EVERY value in S"

Example interpretation:
- R(StudentId, CourseId) = students enrolled in courses
- S(CourseId) = required courses
- R ÷ S = students enrolled in ALL required courses

Division is used for "find all X that relate to ALL Y" queries.`,
            keyPoints: ['Universal quantification', 'ALL semantics'],
            explanation: 'Division implements universal quantification (for all) in relational algebra.'
        },
        {
            id: 'div2',
            title: 'Division Step-by-Step Example',
            difficulty: 'Hard',
            description: 'Given WORKS_ON(ESSN, Pno) and PROJ(Pno) = {1, 2}, find employees who work on ALL projects in PROJ.',
            hint: 'Apply the division formula step by step.',
            sampleAnswer: `Given:
WORKS_ON:
| ESSN | Pno |
|------|-----|
| 111  | 1   |
| 111  | 2   |
| 222  | 1   |
| 222  | 2   |
| 222  | 3   |
| 333  | 2   |
| 444  | 3   |

PROJ (S):
| Pno |
|-----|
| 1   |
| 2   |

Division: WORKS_ON ÷ PROJ

Step 1: π_ESSN(WORKS_ON) = {111, 222, 333, 444}
       (All employees)

Step 2: π_ESSN(WORKS_ON) × PROJ
       All possible (employee, project) combinations:
       (111,1), (111,2), (222,1), (222,2), (333,1), (333,2), (444,1), (444,2)

Step 3: (π_ESSN(WORKS_ON) × PROJ) − WORKS_ON
       Pairs that SHOULD exist but DON'T:
       (333,1), (444,1), (444,2)

Step 4: π_ESSN(Step 3)
       Employees MISSING some project: {333, 444}

Step 5: π_ESSN(WORKS_ON) − Step 4
       {111, 222, 333, 444} − {333, 444} = {111, 222}

RESULT: Employees 111 and 222 work on ALL projects {1, 2}`,
            keyPoints: ['Division algorithm', '5-step process'],
            resultTable: {
                columns: ['ESSN'],
                rows: [['111'], ['222']]
            }
        },
        {
            id: 'div3',
            title: 'Division Formula Derivation',
            difficulty: 'Hard',
            description: 'Explain why R ÷ S = π_A(R) − π_A((π_A(R) × S) − R) works.',
            hint: 'Break down each step and its purpose.',
            sampleAnswer: `Division Formula: R(A,B) ÷ S(B) = π_A(R) − π_A((π_A(R) × S) − R)

Let's call R's attributes: A (the ones we keep) and B (shared with S)

STEP-BY-STEP BREAKDOWN:

1. π_A(R)
   Purpose: Get ALL candidate A values
   These are ALL the A's that MIGHT be in our answer

2. π_A(R) × S
   Purpose: Create all POSSIBLE (A, B) combinations
   If an A relates to ALL of S, it MUST have all these pairs

3. (π_A(R) × S) − R
   Purpose: Find (A, B) pairs that are MISSING from R
   If (a, b) is here, then a does NOT relate to b

4. π_A((π_A(R) × S) − R)
   Purpose: Get A values that are MISSING at least one B
   These A's are DISQUALIFIED from the answer

5. π_A(R) − [step 4]
   Purpose: Remove disqualified A's from candidates
   What remains = A's related to ALL B's in S`,
            keyPoints: ['Division logic', 'Exclusion approach'],
            explanation: 'The formula works by finding and removing A values that are missing any B value from S.'
        },
        {
            id: 'div4',
            title: 'Students Who Passed ALL CS Courses',
            difficulty: 'Hard',
            description: 'Write a RA expression to find students who have taken ALL courses offered by the CS department.',
            hint: 'First get CS courses, then divide TRANSCRIPT by that.',
            sampleAnswer: `Let:
- CS_COURSES = π_CrsCode(σ_Dept='CS'(COURSE))
- STUDENT_COURSES = π_StudId,CrsCode(TRANSCRIPT)

Answer: STUDENT_COURSES ÷ CS_COURSES

Expanded:
π_StudId,CrsCode(TRANSCRIPT) ÷ π_CrsCode(σ_Dept='CS'(COURSE))

This finds StudIds that appear with EVERY CrsCode from CS department.`,
            keyPoints: ['Division application', 'Universal quantification'],
            explanation: 'Division is perfect for "all" queries: students who took ALL courses, employees on ALL projects, etc.'
        },
        {
            id: 'div5',
            title: 'Employees on ALL Projects in Department 5',
            difficulty: 'Hard',
            description: 'Find SSNs of employees who work on EVERY project controlled by department 5.',
            hint: 'Get dept 5 project numbers, then divide WORKS_ON by that.',
            sampleAnswer: `Step 1: Get project numbers in department 5
DEPT5_PROJECTS = π_Pnumber(σ_Dnum=5(PROJECT))

Step 2: Get (employee, project) pairs
EMP_PROJ = π_ESSN,Pno(WORKS_ON)

Step 3: Apply division
RESULT = EMP_PROJ ÷ DEPT5_PROJECTS

Complete expression:
π_ESSN,Pno(WORKS_ON) ÷ π_Pnumber(σ_Dnum=5(PROJECT))`,
            keyPoints: ['Division with selection', 'Two-step problem'],
            explanation: 'First isolate the "ALL" set (dept 5 projects), then find employees related to ALL of them.'
        },
        {
            id: 'div6',
            title: 'Division Without Division Operator',
            difficulty: 'Hard',
            description: 'Express "Find employees who work on ALL projects" using only π, σ, ×, −, ⋈ (no ÷).',
            hint: 'Use double negation: "not missing any project".',
            sampleAnswer: `Query: Find ESSN where employee works on ALL projects

Without ÷, use the formula:
π_ESSN(WORKS_ON) − π_ESSN((π_ESSN(WORKS_ON) × π_Pnumber(PROJECT)) − WORKS_ON)

Or equivalently with NOT EXISTS logic:
"Find employees for whom there does NOT EXIST a project they don't work on"

Let R = WORKS_ON(ESSN, Pno)
Let S = PROJECT(Pnumber)

Step 1: ALL_EMP = π_ESSN(R)
Step 2: ALL_PROJ = π_Pnumber(S)
Step 3: ALL_COMBINATIONS = ALL_EMP × ALL_PROJ
Step 4: MISSING = ALL_COMBINATIONS − R
Step 5: DISQUALIFIED = π_ESSN(MISSING)
Step 6: RESULT = ALL_EMP − DISQUALIFIED

This is exactly the division formula expanded!`,
            keyPoints: ['Division expansion', 'Double negation'],
            explanation: 'Division can always be expressed using the five basic operators.'
        },
        {
            id: 'div7',
            title: 'Division Practice with Given Data',
            difficulty: 'Hard',
            description: 'Evaluate R ÷ S where R(A,B) = {(1,a), (1,b), (2,a), (3,a), (3,b), (3,c)} and S(B) = {a, b}.',
            hint: 'Find A values that appear with BOTH a AND b in R.',
            sampleAnswer: `R(A,B):
| A | B |
|---|---|
| 1 | a |
| 1 | b |
| 2 | a |
| 3 | a |
| 3 | b |
| 3 | c |

S(B):
| B |
|---|
| a |
| b |

We need A values that have BOTH (A,a) AND (A,b) in R.

Check each A value:
- A=1: Has (1,a) and (1,b) → Both a,b present → INCLUDE
- A=2: Has (2,a) only → Missing b → EXCLUDE
- A=3: Has (3,a) and (3,b) → Both a,b present → INCLUDE

Note: (3,c) is extra but doesn't matter - we only need a and b.

RESULT: R ÷ S = {1, 3}`,
            keyPoints: ['Checking completeness', 'Extra values OK'],
            resultTable: {
                columns: ['A'],
                rows: [[1], [3]]
            }
        },
        {
            id: 'div8',
            title: 'Common Division Mistakes',
            difficulty: 'Hard',
            description: 'Identify what\'s wrong with this attempt: "Find employees on all projects" = σ_COUNT(Pno)=COUNT(PROJECT)(WORKS_ON)?',
            hint: 'Think about what relational algebra can and cannot do.',
            sampleAnswer: `PROBLEMS WITH THIS APPROACH:

1. RELATIONAL ALGEBRA LIMITATION:
   Standard RA doesn't have COUNT as a selection condition
   You can't write σ_COUNT(...)(...) in pure RA

2. EVEN WITH AGGREGATES, THIS IS WRONG:
   COUNT(Pno) per employee ≠ Total projects
   What if employee works same project twice? (Can't happen with PK, but conceptually wrong)

3. CORRECT APPROACH - USE DIVISION:
   π_ESSN,Pno(WORKS_ON) ÷ π_Pnumber(PROJECT)

4. WHY DIVISION WORKS:
   - No counting needed
   - Directly checks "related to ALL"
   - Uses set operations, not aggregates

KEY INSIGHT: Division is the RA equivalent of "for all" (∀) quantifier.
Don't try to simulate it with counting!`,
            keyPoints: ['Division purpose', 'Aggregate limitations'],
            explanation: 'Division is specifically designed for "all" queries - don\'t reinvent it with counts.'
        }
    ],

    // ========================================
    // Category 5: Complex Query Construction
    // ========================================
    complexQueries: [
        {
            id: 'cq1',
            title: 'Employees with No Dependents',
            difficulty: 'Medium',
            description: 'Find names of employees who have no dependents.',
            hint: 'Use set difference: all employees minus those with dependents.',
            sampleAnswer: 'π_Fname,Lname(EMPLOYEE ⋈_SSN=ESSN (π_SSN(EMPLOYEE) − π_ESSN(DEPENDENT)))',
            alternateAnswers: [
                'π_Fname,Lname(EMPLOYEE) − π_Fname,Lname(EMPLOYEE ⋈_SSN=ESSN DEPENDENT)',
                'π_Fname,Lname(EMPLOYEE ▷ DEPENDENT)'
            ],
            keyPoints: ['Antijoin pattern', 'Difference for "not in"'],
            explanation: 'Find SSNs not in DEPENDENT, then join back to get names.'
        },
        {
            id: 'cq2',
            title: 'Departments with No Employees',
            difficulty: 'Medium',
            description: 'Find names of departments that have no employees.',
            hint: 'All departments minus departments that have employees.',
            sampleAnswer: 'π_Dname(DEPARTMENT) − π_Dname(DEPARTMENT ⋈_Dnumber=Dno EMPLOYEE)',
            alternateAnswers: [
                'π_Dname(DEPARTMENT ▷ (ρ_(Dnumber)(π_Dno(EMPLOYEE))))'
            ],
            keyPoints: ['Set difference', 'Empty relationship'],
            explanation: 'Subtract departments that have employees from all departments.'
        },
        {
            id: 'cq3',
            title: 'Employees with Highest Salary in Their Department',
            difficulty: 'Hard',
            description: 'Find employees who earn the highest salary in their own department.',
            hint: 'Compare each employee with all others in same department.',
            sampleAnswer: `π_E.Fname,E.Lname,E.Salary(
    σ_E.Dno=E2.Dno AND E.Salary<E2.Salary(
        ρ_E(EMPLOYEE) × ρ_E2(EMPLOYEE)
    )
)

Then: EMPLOYEE − (above result)

Or more directly:
EMPLOYEE − π_SSN,Fname,Lname,Salary,Dno(
    σ_E1.Dno=E2.Dno AND E1.Salary<E2.Salary(
        ρ_E1(EMPLOYEE) × ρ_E2(EMPLOYEE)
    )
)`,
            keyPoints: ['Self-join', 'Exclusion pattern'],
            explanation: 'Find employees who DON\'T have a higher-paid colleague in same department.'
        },
        {
            id: 'cq4',
            title: 'Projects Involving All Departments',
            difficulty: 'Hard',
            description: 'Find projects that have at least one employee from every department.',
            hint: 'This is a division problem! Project-Department pairs ÷ All Departments.',
            sampleAnswer: `Step 1: Get (Project, Department) pairs through employee work
PROJ_DEPT = π_Pno,Dno(WORKS_ON ⋈_ESSN=SSN EMPLOYEE)

Step 2: Get all department numbers
ALL_DEPT = π_Dnumber(DEPARTMENT)

Step 3: Divide to find projects covering all departments
RESULT_PNO = PROJ_DEPT ÷ ρ_(Dno)(ALL_DEPT)

Step 4: Get project names
π_Pname(PROJECT ⋈_Pnumber=Pno RESULT_PNO)`,
            keyPoints: ['Division application', 'Intermediate relation'],
            explanation: 'Construct (Project, Dept) pairs, then use division to find projects with ALL departments.'
        },
        {
            id: 'cq5',
            title: 'Employees Working More Hours Than Their Manager',
            difficulty: 'Hard',
            description: 'Find employees who work more total hours (across all projects) than their department manager.',
            hint: 'Need aggregates for total hours, then compare with manager.',
            sampleAnswer: `Using aggregate operator ℱ:

Step 1: Total hours per employee
EMP_HOURS = ESSN ℱ SUM_Hours(WORKS_ON)

Step 2: Get manager SSN for each department
DEPT_MGR = π_Dnumber,MgrSSN(DEPARTMENT)

Step 3: Get manager's total hours
MGR_HOURS = ρ_(MgrSSN,MgrTotalHours)(EMP_HOURS ⋈_ESSN=MgrSSN DEPT_MGR)

Step 4: Compare employee hours with their manager's hours
RESULT = π_ESSN(σ_E.TotalHours>M.MgrTotalHours(
    EMP_HOURS ⋈_... EMPLOYEE ⋈_Dno=Dnumber MGR_HOURS
))`,
            keyPoints: ['Aggregation', 'Self-comparison through join'],
            explanation: 'Complex query requiring aggregation and multiple joins.'
        }
    ],

    // ========================================
    // Category 6: Identify Errors
    // ========================================
    errorIdentification: [
        {
            id: 'err1',
            title: 'Union Compatibility Error',
            difficulty: 'Medium',
            description: 'What\'s wrong with: π_Fname,Lname(EMPLOYEE) ∪ π_Dname(DEPARTMENT)?',
            expression: 'π_Fname,Lname(EMPLOYEE) ∪ π_Dname(DEPARTMENT)',
            hint: 'Check union compatibility requirements.',
            sampleAnswer: `ERROR: Union Compatibility Violation

Left operand: π_Fname,Lname(EMPLOYEE)
- Has 2 attributes: Fname, Lname (both VARCHAR)

Right operand: π_Dname(DEPARTMENT)
- Has 1 attribute: Dname (VARCHAR)

PROBLEM: Different number of attributes (degree)!
Union requires:
1. Same number of attributes [VIOLATED]
2. Compatible domains for corresponding attributes

CANNOT perform this union.`,
            keyPoints: ['Union compatibility', 'Degree check'],
            explanation: 'UNION requires identical degree (number of attributes).'
        },
        {
            id: 'err2',
            title: 'Attribute Reference Error',
            difficulty: 'Medium',
            description: 'What\'s wrong with: π_Name(EMPLOYEE)?',
            expression: 'π_Name(EMPLOYEE)',
            hint: 'Check the EMPLOYEE schema.',
            sampleAnswer: `ERROR: Attribute Does Not Exist

EMPLOYEE schema: (SSN, Fname, Lname, Bdate, Address, Sex, Salary, SuperSSN, Dno)

There is no attribute called "Name" in EMPLOYEE!

Possible corrections:
- π_Fname(EMPLOYEE) for first name
- π_Lname(EMPLOYEE) for last name
- π_Fname,Lname(EMPLOYEE) for both names

Always check the schema before writing RA expressions!`,
            keyPoints: ['Schema awareness', 'Attribute names'],
            explanation: 'Project can only use attributes that exist in the relation.'
        },
        {
            id: 'err3',
            title: 'Missing Join Condition',
            difficulty: 'Medium',
            description: 'What\'s problematic about: π_Fname,Dname(EMPLOYEE × DEPARTMENT)?',
            expression: 'π_Fname,Dname(EMPLOYEE × DEPARTMENT)',
            hint: 'What does Cartesian product without selection give you?',
            sampleAnswer: `PROBLEM: Meaningless Cartesian Product

This expression:
1. Creates ALL combinations of employees and departments
2. Then projects Fname and Dname

Result: EVERY employee name paired with EVERY department name!
- 5 employees × 3 departments = 15 rows
- John appears with Research, Admin, AND HR
- This is NOT meaningful data!

CORRECTION: Add join condition
π_Fname,Dname(σ_Dno=Dnumber(EMPLOYEE × DEPARTMENT))

Or use join directly:
π_Fname,Dname(EMPLOYEE ⋈_Dno=Dnumber DEPARTMENT)`,
            keyPoints: ['Cartesian product semantics', 'Join condition needed'],
            explanation: 'Raw Cartesian product rarely makes sense - usually need a join condition.'
        },
        {
            id: 'err4',
            title: 'Division Attribute Error',
            difficulty: 'Hard',
            description: 'What\'s wrong with: EMPLOYEE ÷ PROJECT?',
            expression: 'EMPLOYEE ÷ PROJECT',
            hint: 'Check division preconditions: S attributes must be subset of R attributes.',
            sampleAnswer: `ERROR: Division Precondition Violated

For R ÷ S:
- S's attributes must be a SUBSET of R's attributes
- They must have COMMON attributes for the division to make sense

EMPLOYEE(SSN, Fname, Lname, Bdate, Address, Sex, Salary, SuperSSN, Dno)
PROJECT(Pname, Pnumber, Plocation, Dnum)

These relations share NO common attributes!
Division cannot be performed.

CORRECT for "employees on all projects":
π_ESSN,Pno(WORKS_ON) ÷ π_Pnumber(PROJECT)

Here WORKS_ON has Pno and PROJECT has Pnumber - compatible!`,
            keyPoints: ['Division preconditions', 'Common attributes'],
            explanation: 'Division requires the divisor\'s attributes to be a subset of the dividend\'s.'
        },
        {
            id: 'err5',
            title: 'Self-Join Without Rename',
            difficulty: 'Medium',
            description: 'What\'s wrong with: σ_SuperSSN=SSN(EMPLOYEE × EMPLOYEE)?',
            expression: 'σ_SuperSSN=SSN(EMPLOYEE × EMPLOYEE)',
            hint: 'When you join a table with itself, attribute names collide.',
            sampleAnswer: `ERROR: Ambiguous Attribute Names

When computing EMPLOYEE × EMPLOYEE:
- Both copies have SSN, Fname, Lname, etc.
- Which SSN does "SSN" refer to in the condition?

CORRECTION: Use RENAME to distinguish copies

σ_E.SuperSSN=S.SSN(ρ_E(EMPLOYEE) × ρ_S(EMPLOYEE))

Or with explicit attribute renaming:
ρ_E(EMPLOYEE)[E_SSN,E_Fname,...] × ρ_S(EMPLOYEE)[S_SSN,S_Fname,...]

Then: σ_E_SuperSSN=S_SSN(...)`,
            keyPoints: ['Self-join', 'Rename operator', 'Disambiguation'],
            explanation: 'Self-joins require renaming to avoid attribute name conflicts.'
        }
    ]
};

// ========================================
// STATE MANAGEMENT
// ========================================
let currentRACategory = 'writeRA';
let currentRAExerciseIndex = 0;
let raExerciseAttempts = {};
let raExerciseCompleted = {};

// ========================================
// INITIALIZATION
// ========================================
function initRAPractice() {
    loadRAProgress();
    renderRACategoryNav();
    renderRAReference();
    renderRAExercise();
}

// ========================================
// RENDER FUNCTIONS
// ========================================
function renderRACategoryNav() {
    const nav = document.getElementById('ra-category-nav');
    if (!nav) return;

    const categories = [
        { id: 'writeRA', name: 'Write RA Expressions', icon: 'write' },
        { id: 'stepByStep', name: 'Step-by-Step Evaluation', icon: 'steps' },
        { id: 'equivalentExpressions', name: 'Equivalent Expressions', icon: 'convert' },
        { id: 'division', name: 'Division Problems', icon: 'divide' },
        { id: 'complexQueries', name: 'Complex Queries', icon: 'complex' },
        { id: 'errorIdentification', name: 'Find Errors', icon: 'error' }
    ];

    nav.innerHTML = categories.map(cat => {
        const exercises = raExercises[cat.id];
        const completed = exercises.filter(ex => raExerciseCompleted[ex.id]).length;
        return `<button class="ra-cat-btn ${currentRACategory === cat.id ? 'active' : ''}"
                        data-category="${cat.id}"
                        onclick="selectRACategory('${cat.id}')">
            <span class="cat-name">${cat.name}</span>
            <span class="cat-progress">${completed}/${exercises.length}</span>
        </button>`;
    }).join('');
}

function renderRAReference() {
    const sidebar = document.getElementById('ra-reference-sidebar');
    if (!sidebar) return;

    let html = '<h3>RA Quick Reference</h3>';

    // Basic Operators
    html += `<div class="ref-section">
        <h4 class="ref-section-title" onclick="toggleRARefSection(this)">Basic Operators (Complete Set) <span class="toggle-icon">▼</span></h4>
        <div class="ref-section-content">`;
    raReference.basicOperators.forEach(op => {
        html += `<div class="ref-item">
            <code class="ref-symbol">${op.symbol}</code>
            <div class="ref-name">${op.name}</div>
            <div class="ref-syntax">${op.syntax}</div>
            <div class="ref-desc">${op.description}</div>
        </div>`;
    });
    html += '</div></div>';

    // Derived Operators
    html += `<div class="ref-section">
        <h4 class="ref-section-title" onclick="toggleRARefSection(this)">Derived Operators <span class="toggle-icon">▼</span></h4>
        <div class="ref-section-content">`;
    raReference.derivedOperators.forEach(op => {
        html += `<div class="ref-item">
            <code class="ref-symbol">${op.symbol}</code>
            <div class="ref-name">${op.name}</div>
            <div class="ref-syntax">${op.syntax}</div>
            <div class="ref-formula">${op.formula || ''}</div>
        </div>`;
    });
    html += '</div></div>';

    // Aggregate
    html += `<div class="ref-section">
        <h4 class="ref-section-title" onclick="toggleRARefSection(this)">Aggregate Functions <span class="toggle-icon">▼</span></h4>
        <div class="ref-section-content">`;
    raReference.aggregateOperators.forEach(op => {
        html += `<div class="ref-item">
            <code class="ref-symbol">${op.symbol}</code>
            <div class="ref-syntax">${op.syntax}</div>
            <div class="ref-desc">${op.notes}</div>
        </div>`;
    });
    html += '</div></div>';

    // Key Formulas
    html += `<div class="ref-section">
        <h4 class="ref-section-title" onclick="toggleRARefSection(this)">Key Formulas <span class="toggle-icon">▼</span></h4>
        <div class="ref-section-content formula-list">`;
    raReference.keyFormulas.forEach(f => {
        html += `<div class="formula-item">
            <strong>${f.name}:</strong><br>
            <code>${f.formula}</code>
        </div>`;
    });
    html += '</div></div>';

    // Properties
    html += `<div class="ref-section">
        <h4 class="ref-section-title" onclick="toggleRARefSection(this)">Properties <span class="toggle-icon">▼</span></h4>
        <div class="ref-section-content">
            <ul class="property-list">`;
    raReference.properties.forEach(prop => {
        html += `<li>${prop}</li>`;
    });
    html += '</ul></div></div>';

    sidebar.innerHTML = html;
}

function toggleRARefSection(element) {
    const content = element.nextElementSibling;
    const icon = element.querySelector('.toggle-icon');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        icon.textContent = '▼';
    } else {
        content.style.display = 'none';
        icon.textContent = '▶';
    }
}

function renderRAExercise() {
    const container = document.getElementById('ra-exercise-container');
    if (!container) return;

    const exercises = raExercises[currentRACategory];
    const exercise = exercises[currentRAExerciseIndex];

    const completed = raExerciseCompleted[exercise.id] ? 'completed' : '';

    // Build sample data section if applicable
    let sampleDataHtml = '';
    if (exercise.sampleData) {
        const tables = exercise.sampleData.split(',').map(t => t.trim());
        sampleDataHtml = '<div class="sample-data-section"><h4>Sample Data:</h4>';
        tables.forEach(tableName => {
            const data = sampleDatabase.sampleData[tableName];
            if (data) {
                sampleDataHtml += `<div class="sample-table">
                    <strong>${tableName}</strong>
                    <table class="data-table">
                        <tr>${data.columns.map(c => `<th>${c}</th>`).join('')}</tr>
                        ${data.rows.map(row => `<tr>${row.map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}
                    </table>
                </div>`;
            }
        });
        sampleDataHtml += '</div>';
    }

    // Build result table if applicable
    let resultHtml = '';
    if (exercise.resultTable) {
        resultHtml = `<div class="expected-result">
            <h4>Expected Result:</h4>
            <table class="data-table result-table">
                <tr>${exercise.resultTable.columns.map(c => `<th>${c}</th>`).join('')}</tr>
                ${exercise.resultTable.rows.map(row => `<tr>${row.map(v => `<td>${v}</td>`).join('')}</tr>`).join('')}
            </table>
        </div>`;
    }

    container.innerHTML = `
        <div class="exercise-header">
            <div class="exercise-nav">
                <button class="nav-btn" onclick="prevRAExercise()" ${currentRAExerciseIndex === 0 ? 'disabled' : ''}>Previous</button>
                <span class="exercise-counter">${currentRAExerciseIndex + 1} / ${exercises.length}</span>
                <button class="nav-btn" onclick="nextRAExercise()" ${currentRAExerciseIndex === exercises.length - 1 ? 'disabled' : ''}>Next</button>
            </div>
            <div class="exercise-meta">
                <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                ${completed ? '<span class="completed-badge">Completed</span>' : ''}
            </div>
        </div>

        <div class="exercise-content">
            <h3 class="exercise-title">${exercise.title}</h3>
            <p class="exercise-description">${exercise.description}</p>

            ${exercise.expression ? `<div class="expression-display">
                <strong>Expression:</strong> <code class="ra-expression">${escapeHtmlRA(exercise.expression)}</code>
            </div>` : ''}

            ${sampleDataHtml}

            <div class="key-points">
                <strong>Key Concepts:</strong> ${exercise.keyPoints.map(kp => `<span class="key-point">${kp}</span>`).join(' ')}
            </div>

            <div class="ra-input-area">
                <label for="ra-input">Your Answer:</label>
                <textarea id="ra-input" class="ra-input" placeholder="Write your relational algebra expression or explanation here..." rows="6">${getRAavedAnswer(exercise.id)}</textarea>
            </div>

            <div class="symbol-helper">
                <span class="helper-title">Insert Symbol:</span>
                <button onclick="insertSymbol('σ')" title="SELECT">σ</button>
                <button onclick="insertSymbol('π')" title="PROJECT">π</button>
                <button onclick="insertSymbol('×')" title="CARTESIAN PRODUCT">×</button>
                <button onclick="insertSymbol('⋈')" title="JOIN">⋈</button>
                <button onclick="insertSymbol('∪')" title="UNION">∪</button>
                <button onclick="insertSymbol('∩')" title="INTERSECTION">∩</button>
                <button onclick="insertSymbol('−')" title="DIFFERENCE">−</button>
                <button onclick="insertSymbol('÷')" title="DIVISION">÷</button>
                <button onclick="insertSymbol('ρ')" title="RENAME">ρ</button>
                <button onclick="insertSymbol('ℱ')" title="AGGREGATE">ℱ</button>
                <button onclick="insertSymbol('⟕')" title="LEFT OUTER JOIN">⟕</button>
                <button onclick="insertSymbol('⟖')" title="RIGHT OUTER JOIN">⟖</button>
                <button onclick="insertSymbol('⋉')" title="SEMIJOIN">⋉</button>
                <button onclick="insertSymbol('▷')" title="ANTIJOIN">▷</button>
            </div>

            <div class="exercise-actions">
                <button class="btn hint-btn" onclick="showRAHint()">Show Hint</button>
                <button class="btn check-btn" onclick="checkRAAnswer()">Check Answer</button>
                <button class="btn answer-btn" onclick="showRAAnswer()">Show Answer</button>
                <button class="btn primary mark-btn ${completed}" onclick="markRAExerciseComplete('${exercise.id}')">
                    ${completed ? 'Completed' : 'Mark Complete'}
                </button>
            </div>

            <div id="ra-hint-box" class="hint-box" style="display: none;">
                <strong>Hint:</strong> ${exercise.hint}
            </div>

            <div id="ra-answer-box" class="answer-box" style="display: none;">
                <h4>Sample Answer:</h4>
                <pre class="sample-answer">${escapeHtmlRA(exercise.sampleAnswer)}</pre>
                ${exercise.explanation ? `<div class="explanation"><strong>Explanation:</strong> ${exercise.explanation}</div>` : ''}
                ${resultHtml}
                <p class="note">Note: There may be multiple correct ways to write this expression!</p>
            </div>

            <div id="ra-feedback-box" class="feedback-box" style="display: none;"></div>
        </div>

        <div class="schema-reminder">
            <h4>Database Schema Reference</h4>
            <pre class="schema-text">${sampleDatabase.schema}</pre>
        </div>
    `;

    // Auto-save input
    document.getElementById('ra-input').addEventListener('input', (e) => {
        saveRAAnswer(exercise.id, e.target.value);
    });
}

// ========================================
// INTERACTION FUNCTIONS
// ========================================
function selectRACategory(categoryId) {
    currentRACategory = categoryId;
    currentRAExerciseIndex = 0;
    renderRACategoryNav();
    renderRAExercise();
}

function prevRAExercise() {
    if (currentRAExerciseIndex > 0) {
        currentRAExerciseIndex--;
        renderRAExercise();
    }
}

function nextRAExercise() {
    const exercises = raExercises[currentRACategory];
    if (currentRAExerciseIndex < exercises.length - 1) {
        currentRAExerciseIndex++;
        renderRAExercise();
    }
}

function insertSymbol(symbol) {
    const input = document.getElementById('ra-input');
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const text = input.value;
    input.value = text.substring(0, start) + symbol + text.substring(end);
    input.selectionStart = input.selectionEnd = start + symbol.length;
    input.focus();

    // Trigger save
    const exercise = raExercises[currentRACategory][currentRAExerciseIndex];
    saveRAAnswer(exercise.id, input.value);
}

function showRAHint() {
    const hintBox = document.getElementById('ra-hint-box');
    hintBox.style.display = hintBox.style.display === 'none' ? 'block' : 'none';
}

function showRAAnswer() {
    const answerBox = document.getElementById('ra-answer-box');
    answerBox.style.display = answerBox.style.display === 'none' ? 'block' : 'none';
}

function checkRAAnswer() {
    const exercise = raExercises[currentRACategory][currentRAExerciseIndex];
    const userInput = document.getElementById('ra-input').value.trim();
    const feedbackBox = document.getElementById('ra-feedback-box');

    if (!userInput) {
        feedbackBox.innerHTML = '<span class="error">Please write your answer first.</span>';
        feedbackBox.style.display = 'block';
        return;
    }

    // Track attempts
    raExerciseAttempts[exercise.id] = (raExerciseAttempts[exercise.id] || 0) + 1;
    saveRAProgress();

    // Check for key concepts
    let feedback = [];
    let correct = 0;
    let total = exercise.keyPoints.length;

    // Symbol and keyword mappings
    const conceptMappings = {
        'σ (SELECT)': ['σ', 'SIGMA', 'SELECT'],
        'π (PROJECT)': ['π', 'PI', 'PROJECT'],
        '∪ (UNION)': ['∪', 'UNION', 'U'],
        '∩ (INTERSECTION)': ['∩', 'INTERSECTION', 'INTERSECT'],
        '− (SET DIFFERENCE)': ['−', '-', 'DIFFERENCE', 'MINUS'],
        '× (CARTESIAN PRODUCT)': ['×', 'X', 'CARTESIAN', 'CROSS'],
        '÷ (DIVISION)': ['÷', '/', 'DIVISION', 'DIV'],
        '⋈ (JOIN)': ['⋈', 'JOIN', 'BOWTIE'],
        'ρ (RENAME)': ['ρ', 'RHO', 'RENAME'],
        'Comparison condition': ['>', '<', '>=', '<=', '=', '<>'],
        'Attribute list': true,
        'AND operator': ['AND'],
        'OR operator': ['OR'],
        'Multiple conditions': ['AND', 'OR'],
        'Composition': ['(', ')'],
        'Join condition': ['='],
        'Table aliases': true,
        'Self-join': ['×', '⋈'],
        'Multiple joins': ['⋈', '×'],
        'Union compatibility': true,
        'ℱ (AGGREGATE)': ['ℱ', 'F', 'AVG', 'SUM', 'COUNT', 'MAX', 'MIN'],
        'GROUP BY equivalent': ['ℱ', 'GROUP'],
        'AVG function': ['AVG'],
        'Antijoin pattern': ['−', '▷'],
        'Difference for "not in"': ['−', '-'],
        'Universal quantification': ['÷', 'ALL'],
        'ALL semantics': ['÷', 'ALL', 'EVERY'],
        'Division algorithm': ['÷', '×', '−', 'π'],
        '5-step process': true,
        'Division logic': ['÷'],
        'Exclusion approach': ['−'],
        'Division application': ['÷'],
        'Division with selection': ['÷', 'σ'],
        'Two-step problem': true,
        'Division expansion': ['×', '−', 'π'],
        'Double negation': ['−'],
        'Checking completeness': true,
        'Extra values OK': true,
        'Division purpose': ['÷'],
        'Aggregate limitations': true,
        'Set difference': ['−'],
        'Empty relationship': ['−'],
        'Self-comparison through join': ['×', '⋈'],
        'Intermediate relation': true,
        'Union compatibility': true,
        'Degree check': true,
        'Schema awareness': true,
        'Attribute names': true,
        'Cartesian product semantics': ['×'],
        'Join condition needed': ['=', '⋈'],
        'Division preconditions': true,
        'Common attributes': true,
        'Disambiguation': ['ρ'],
        'Row-by-row evaluation': true,
        'Condition checking': true,
        'Column extraction': true,
        'Duplicate elimination': true,
        'Duplicate elimination in PROJECT': ['π'],
        'Set semantics': true,
        'Set difference semantics': ['−'],
        'Not commutative': true,
        'All combinations': ['×'],
        'Result size = |R| × |S|': true,
        'Match on condition': ['='],
        'Unmatched tuples excluded in regular join': true,
        'Inside-out evaluation': true,
        'Intermediate results': true,
        'Intersection formula': ['−'],
        'Nested set operations': ['−'],
        'Join decomposition': ['σ', '×'],
        'Cartesian + Select': ['σ', '×'],
        'Natural join definition': ['π', 'σ', '×'],
        'Duplicate column removal': ['π'],
        'Select cascade': ['σ', 'AND'],
        'AND combination': ['AND'],
        'Commutativity': true,
        'Query optimization': true,
        'Selection pushdown': ['σ'],
        'Derived operator': true,
        'Set algebra': ['−'],
        'Semijoin definition': ['⋉', 'π'],
        'Project after join': ['π'],
        'Antijoin definition': ['▷', '−'],
        'Difference with semijoin': ['−', '⋉'],
        'Project cascade': ['π'],
        'Subset requirement': true
    };

    const inputUpper = userInput.toUpperCase();

    exercise.keyPoints.forEach(concept => {
        let found = false;

        if (conceptMappings[concept]) {
            const mapping = conceptMappings[concept];
            if (mapping === true) {
                found = userInput.length > 5;
            } else if (Array.isArray(mapping)) {
                found = mapping.some(kw => inputUpper.includes(kw.toUpperCase()) || userInput.includes(kw));
            }
        } else {
            // Default check
            found = inputUpper.includes(concept.toUpperCase());
        }

        if (found) {
            feedback.push(`<span class="check-correct">[OK] ${concept}</span>`);
            correct++;
        } else {
            feedback.push(`<span class="check-missing">[X] ${concept}</span>`);
        }
    });

    const score = Math.round((correct / total) * 100);
    let resultClass = score >= 80 ? 'success' : score >= 50 ? 'partial' : 'error';

    feedbackBox.innerHTML = `
        <div class="feedback-header ${resultClass}">
            <strong>Score: ${score}%</strong> (${correct}/${total} concepts found)
        </div>
        <div class="feedback-details">
            ${feedback.join('<br>')}
        </div>
        <p class="note">This is a basic keyword check. Click "Show Answer" to compare with the sample solution.</p>
    `;
    feedbackBox.style.display = 'block';
}

function markRAExerciseComplete(exerciseId) {
    raExerciseCompleted[exerciseId] = true;
    saveRAProgress();
    renderRACategoryNav();
    renderRAExercise();
}

// ========================================
// SAVE/LOAD FUNCTIONS
// ========================================
function saveRAAnswer(exerciseId, answer) {
    const saved = JSON.parse(localStorage.getItem('raPracticeAnswers') || '{}');
    saved[exerciseId] = answer;
    localStorage.setItem('raPracticeAnswers', JSON.stringify(saved));
}

function getRAavedAnswer(exerciseId) {
    const saved = JSON.parse(localStorage.getItem('raPracticeAnswers') || '{}');
    return saved[exerciseId] || '';
}

function saveRAProgress() {
    localStorage.setItem('raExerciseAttempts', JSON.stringify(raExerciseAttempts));
    localStorage.setItem('raExerciseCompleted', JSON.stringify(raExerciseCompleted));
}

function loadRAProgress() {
    raExerciseAttempts = JSON.parse(localStorage.getItem('raExerciseAttempts') || '{}');
    raExerciseCompleted = JSON.parse(localStorage.getItem('raExerciseCompleted') || '{}');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================
function escapeHtmlRA(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// GLOBAL EXPORTS
// ========================================
window.initRAPractice = initRAPractice;
window.selectRACategory = selectRACategory;
window.prevRAExercise = prevRAExercise;
window.nextRAExercise = nextRAExercise;
window.insertSymbol = insertSymbol;
window.showRAHint = showRAHint;
window.showRAAnswer = showRAAnswer;
window.checkRAAnswer = checkRAAnswer;
window.markRAExerciseComplete = markRAExerciseComplete;
window.toggleRARefSection = toggleRARefSection;
