// ========================================
// Constraint Verification Practice System
// ========================================
// Topics covered:
// 1. Given sample data, determine if it violates integrity constraints
// 2. Trace referential integrity with CASCADE/SET NULL actions

// ========================================
// Database Schemas for Practice
// ========================================

const constraintSchemas = {
    company: {
        name: "Company Database",
        description: `
EMPLOYEE (SSN, Fname, Lname, Salary, SuperSSN, Dno)
    PRIMARY KEY: SSN
    FOREIGN KEY: SuperSSN REFERENCES EMPLOYEE(SSN) ON DELETE SET NULL
    FOREIGN KEY: Dno REFERENCES DEPARTMENT(Dnumber) ON DELETE SET NULL
    CONSTRAINT: Salary > 0

DEPARTMENT (Dnumber, Dname, MgrSSN, MgrStartDate)
    PRIMARY KEY: Dnumber
    UNIQUE: Dname
    FOREIGN KEY: MgrSSN REFERENCES EMPLOYEE(SSN) ON DELETE SET NULL

PROJECT (Pnumber, Pname, Plocation, Dnum)
    PRIMARY KEY: Pnumber
    UNIQUE: Pname
    FOREIGN KEY: Dnum REFERENCES DEPARTMENT(Dnumber) ON DELETE CASCADE

WORKS_ON (ESSN, Pno, Hours)
    PRIMARY KEY: (ESSN, Pno)
    FOREIGN KEY: ESSN REFERENCES EMPLOYEE(SSN) ON DELETE CASCADE
    FOREIGN KEY: Pno REFERENCES PROJECT(Pnumber) ON DELETE CASCADE
    CONSTRAINT: Hours >= 0

DEPENDENT (ESSN, Dependent_name, Relationship)
    PRIMARY KEY: (ESSN, Dependent_name)
    FOREIGN KEY: ESSN REFERENCES EMPLOYEE(SSN) ON DELETE CASCADE
`,
        tables: {
            EMPLOYEE: {
                columns: ['SSN', 'Fname', 'Lname', 'Salary', 'SuperSSN', 'Dno'],
                pk: ['SSN'],
                fk: {
                    SuperSSN: { references: 'EMPLOYEE(SSN)', onDelete: 'SET NULL' },
                    Dno: { references: 'DEPARTMENT(Dnumber)', onDelete: 'SET NULL' }
                },
                checks: ['Salary > 0']
            },
            DEPARTMENT: {
                columns: ['Dnumber', 'Dname', 'MgrSSN', 'MgrStartDate'],
                pk: ['Dnumber'],
                unique: ['Dname'],
                fk: {
                    MgrSSN: { references: 'EMPLOYEE(SSN)', onDelete: 'SET NULL' }
                }
            },
            PROJECT: {
                columns: ['Pnumber', 'Pname', 'Plocation', 'Dnum'],
                pk: ['Pnumber'],
                unique: ['Pname'],
                fk: {
                    Dnum: { references: 'DEPARTMENT(Dnumber)', onDelete: 'CASCADE' }
                }
            },
            WORKS_ON: {
                columns: ['ESSN', 'Pno', 'Hours'],
                pk: ['ESSN', 'Pno'],
                fk: {
                    ESSN: { references: 'EMPLOYEE(SSN)', onDelete: 'CASCADE' },
                    Pno: { references: 'PROJECT(Pnumber)', onDelete: 'CASCADE' }
                },
                checks: ['Hours >= 0']
            },
            DEPENDENT: {
                columns: ['ESSN', 'Dependent_name', 'Relationship'],
                pk: ['ESSN', 'Dependent_name'],
                fk: {
                    ESSN: { references: 'EMPLOYEE(SSN)', onDelete: 'CASCADE' }
                }
            }
        }
    },
    university: {
        name: "University Database",
        description: `
STUDENT (StudentID, Name, Major, GPA)
    PRIMARY KEY: StudentID
    CONSTRAINT: GPA BETWEEN 0.0 AND 4.0

COURSE (CourseID, Title, Credits, DeptID)
    PRIMARY KEY: CourseID
    FOREIGN KEY: DeptID REFERENCES DEPARTMENT(DeptID) ON DELETE SET NULL
    CONSTRAINT: Credits IN (1, 2, 3, 4)

DEPARTMENT (DeptID, DeptName, ChairID)
    PRIMARY KEY: DeptID
    UNIQUE: DeptName
    FOREIGN KEY: ChairID REFERENCES PROFESSOR(ProfID) ON DELETE SET NULL

PROFESSOR (ProfID, Name, DeptID, Salary)
    PRIMARY KEY: ProfID
    FOREIGN KEY: DeptID REFERENCES DEPARTMENT(DeptID) ON DELETE SET NULL

ENROLLMENT (StudentID, CourseID, Semester, Grade)
    PRIMARY KEY: (StudentID, CourseID, Semester)
    FOREIGN KEY: StudentID REFERENCES STUDENT(StudentID) ON DELETE CASCADE
    FOREIGN KEY: CourseID REFERENCES COURSE(CourseID) ON DELETE CASCADE
`,
        tables: {
            STUDENT: {
                columns: ['StudentID', 'Name', 'Major', 'GPA'],
                pk: ['StudentID'],
                checks: ['GPA BETWEEN 0.0 AND 4.0']
            },
            COURSE: {
                columns: ['CourseID', 'Title', 'Credits', 'DeptID'],
                pk: ['CourseID'],
                fk: {
                    DeptID: { references: 'DEPARTMENT(DeptID)', onDelete: 'SET NULL' }
                },
                checks: ['Credits IN (1, 2, 3, 4)']
            },
            DEPARTMENT: {
                columns: ['DeptID', 'DeptName', 'ChairID'],
                pk: ['DeptID'],
                unique: ['DeptName'],
                fk: {
                    ChairID: { references: 'PROFESSOR(ProfID)', onDelete: 'SET NULL' }
                }
            },
            PROFESSOR: {
                columns: ['ProfID', 'Name', 'DeptID', 'Salary'],
                pk: ['ProfID'],
                fk: {
                    DeptID: { references: 'DEPARTMENT(DeptID)', onDelete: 'SET NULL' }
                }
            },
            ENROLLMENT: {
                columns: ['StudentID', 'CourseID', 'Semester', 'Grade'],
                pk: ['StudentID', 'CourseID', 'Semester'],
                fk: {
                    StudentID: { references: 'STUDENT(StudentID)', onDelete: 'CASCADE' },
                    CourseID: { references: 'COURSE(CourseID)', onDelete: 'CASCADE' }
                }
            }
        }
    }
};

// ========================================
// Practice Questions
// ========================================

const constraintQuestions = [
    // ========================================
    // SECTION 1: Identifying Constraint Violations
    // ========================================

    // Primary Key Violations
    {
        id: 'cv1',
        category: 'pk-violation',
        difficulty: 'Easy',
        title: 'Primary Key Violation - Duplicate',
        schema: 'company',
        question: `Given the EMPLOYEE table with existing data:

| SSN       | Fname | Lname | Salary | SuperSSN  | Dno |
|-----------|-------|-------|--------|-----------|-----|
| 123456789 | John  | Smith | 50000  | 333445555 | 5   |
| 333445555 | Wong  | Frank | 60000  | NULL      | 5   |

Will this INSERT succeed?

INSERT INTO EMPLOYEE VALUES ('123456789', 'Jane', 'Doe', 45000, '333445555', 4);`,
        options: [
            { id: 'a', text: 'Yes, the insert will succeed' },
            { id: 'b', text: 'No - PRIMARY KEY violation (duplicate SSN)' },
            { id: 'c', text: 'No - FOREIGN KEY violation' },
            { id: 'd', text: 'No - CHECK constraint violation' }
        ],
        correctAnswer: 'b',
        explanation: `This INSERT violates the PRIMARY KEY constraint. SSN '123456789' already exists in the table. Primary keys must be UNIQUE - no two tuples can have the same primary key value.

Key concept: Primary Key = UNIQUE + NOT NULL`
    },
    {
        id: 'cv2',
        category: 'pk-violation',
        difficulty: 'Easy',
        title: 'Primary Key Violation - NULL Value',
        schema: 'company',
        question: `Will this INSERT into EMPLOYEE succeed?

INSERT INTO EMPLOYEE (SSN, Fname, Lname, Salary, Dno)
VALUES (NULL, 'Jane', 'Doe', 45000, 5);`,
        options: [
            { id: 'a', text: 'Yes, NULL is allowed in any column' },
            { id: 'b', text: 'No - ENTITY INTEGRITY violation (NULL in PK)' },
            { id: 'c', text: 'No - REFERENTIAL INTEGRITY violation' },
            { id: 'd', text: 'No - UNIQUE constraint violation' }
        ],
        correctAnswer: 'b',
        explanation: `This violates ENTITY INTEGRITY. Primary key attributes CANNOT be NULL because:
1. PKs are used to uniquely identify tuples
2. NULL represents "unknown" - can't identify with unknown value

Entity Integrity Rule: t[PK] ≠ NULL for any tuple t`
    },
    {
        id: 'cv3',
        category: 'pk-violation',
        difficulty: 'Medium',
        title: 'Composite Primary Key Violation',
        schema: 'company',
        question: `Given the WORKS_ON table with existing data:

| ESSN      | Pno | Hours |
|-----------|-----|-------|
| 123456789 | 1   | 32.5  |
| 123456789 | 2   | 7.5   |

Will this INSERT succeed?

INSERT INTO WORKS_ON VALUES ('123456789', 1, 10.0);`,
        options: [
            { id: 'a', text: 'Yes, Hours is different so it\'s a unique row' },
            { id: 'b', text: 'No - PRIMARY KEY violation (ESSN, Pno) already exists' },
            { id: 'c', text: 'No - CHECK constraint violation' },
            { id: 'd', text: 'No - FOREIGN KEY violation' }
        ],
        correctAnswer: 'b',
        explanation: `The PRIMARY KEY of WORKS_ON is (ESSN, Pno) - a COMPOSITE key. The combination (123456789, 1) already exists.

For composite keys, it's the COMBINATION of all key attributes that must be unique, not each individual attribute.

- (123456789, 1) exists -> violation
- (123456789, 3) would be OK (different Pno)
- (999999999, 1) would be OK (different ESSN)`
    },

    // Foreign Key Violations
    {
        id: 'cv4',
        category: 'fk-violation',
        difficulty: 'Easy',
        title: 'Foreign Key Violation - Non-existent Reference',
        schema: 'company',
        question: `Given that DEPARTMENT table contains only Dnumber values: 1, 4, 5

Will this INSERT succeed?

INSERT INTO EMPLOYEE VALUES ('999999999', 'Jane', 'Doe', 45000, NULL, 7);`,
        options: [
            { id: 'a', text: 'Yes, any Dno value is allowed' },
            { id: 'b', text: 'No - PRIMARY KEY violation' },
            { id: 'c', text: 'No - REFERENTIAL INTEGRITY violation (Dno=7 doesn\'t exist in DEPARTMENT)' },
            { id: 'd', text: 'No - CHECK constraint violation' }
        ],
        correctAnswer: 'c',
        explanation: `This violates REFERENTIAL INTEGRITY. The Dno attribute in EMPLOYEE is a FOREIGN KEY referencing DEPARTMENT(Dnumber).

Referential Integrity Rule: FK value must either:
1. Match a PK value in the referenced table, OR
2. Be NULL (if NULLs are allowed)

Since Dnumber=7 doesn't exist in DEPARTMENT, this INSERT is rejected.`
    },
    {
        id: 'cv5',
        category: 'fk-violation',
        difficulty: 'Medium',
        title: 'Foreign Key with NULL - Valid Case',
        schema: 'company',
        question: `Given that DEPARTMENT table contains Dnumber values: 1, 4, 5

Will this INSERT succeed?

INSERT INTO EMPLOYEE VALUES ('999999999', 'Jane', 'Doe', 45000, NULL, NULL);`,
        options: [
            { id: 'a', text: 'No - NULL is never allowed in foreign keys' },
            { id: 'b', text: 'No - Both SuperSSN and Dno cannot be NULL' },
            { id: 'c', text: 'Yes - NULL is valid for FK when referential integrity allows it' },
            { id: 'd', text: 'No - Entity integrity violation' }
        ],
        correctAnswer: 'c',
        explanation: `This INSERT SUCCEEDS. Foreign key values CAN be NULL (unless explicitly constrained with NOT NULL).

NULL in a FK means: "This employee has no supervisor assigned and no department assigned yet."

This is different from Entity Integrity which prohibits NULL only in PRIMARY KEY attributes.

FK rule: t1[FK] = t2[PK] OR t1[FK] = NULL`
    },
    {
        id: 'cv6',
        category: 'fk-violation',
        difficulty: 'Medium',
        title: 'Self-Referencing Foreign Key',
        schema: 'company',
        question: `The EMPLOYEE table has SuperSSN referencing EMPLOYEE(SSN).
Current employees have SSNs: 123456789, 333445555, 987654321

Will this INSERT succeed?

INSERT INTO EMPLOYEE VALUES ('111111111', 'New', 'Person', 40000, '555555555', 5);`,
        options: [
            { id: 'a', text: 'Yes - self-referencing FKs have special rules' },
            { id: 'b', text: 'No - REFERENTIAL INTEGRITY violation (SuperSSN not found)' },
            { id: 'c', text: 'No - cannot reference own table' },
            { id: 'd', text: 'Yes - the SSN 111111111 is being created' }
        ],
        correctAnswer: 'b',
        explanation: `This violates REFERENTIAL INTEGRITY. Even in self-referencing relationships:
- SuperSSN must reference an EXISTING SSN in EMPLOYEE
- SSN '555555555' does not exist in the table

Self-referencing FKs follow the same rules as regular FKs - the referenced value must already exist (or be NULL).

The new SSN '111111111' being inserted doesn't help because SuperSSN='555555555' which doesn't exist.`
    },

    // Check Constraint Violations
    {
        id: 'cv7',
        category: 'check-violation',
        difficulty: 'Easy',
        title: 'CHECK Constraint Violation - Salary',
        schema: 'company',
        question: `The EMPLOYEE table has: CHECK (Salary > 0)

Will this INSERT succeed?

INSERT INTO EMPLOYEE VALUES ('999999999', 'Jane', 'Doe', -5000, NULL, 5);`,
        options: [
            { id: 'a', text: 'Yes - CHECK constraints are just warnings' },
            { id: 'b', text: 'No - CHECK constraint violation (Salary must be > 0)' },
            { id: 'c', text: 'No - PRIMARY KEY violation' },
            { id: 'd', text: 'Yes - negative salary might represent a debt' }
        ],
        correctAnswer: 'b',
        explanation: `This violates the CHECK constraint. The schema specifies CHECK (Salary > 0), meaning all salary values must be positive.

-5000 < 0, so the constraint is violated.

CHECK constraints enforce domain/semantic constraints on attribute values. They are NOT optional warnings - violations are rejected.`
    },
    {
        id: 'cv8',
        category: 'check-violation',
        difficulty: 'Medium',
        title: 'CHECK Constraint - Hours',
        schema: 'company',
        question: `The WORKS_ON table has: CHECK (Hours >= 0)

Given existing data:
| ESSN      | Pno | Hours |
|-----------|-----|-------|
| 123456789 | 1   | 32.5  |

Will this UPDATE succeed?

UPDATE WORKS_ON SET Hours = -5 WHERE ESSN = '123456789' AND Pno = 1;`,
        options: [
            { id: 'a', text: 'Yes - UPDATE doesn\'t check constraints' },
            { id: 'b', text: 'No - CHECK constraint violation (Hours must be >= 0)' },
            { id: 'c', text: 'No - PRIMARY KEY violation' },
            { id: 'd', text: 'Yes - negative hours means owed time' }
        ],
        correctAnswer: 'b',
        explanation: `CHECK constraints are enforced on both INSERT and UPDATE operations.

The UPDATE tries to set Hours = -5, but CHECK (Hours >= 0) requires non-negative values.

-5 < 0, so the constraint is violated and the UPDATE is rejected.`
    },

    // Unique Constraint Violations
    {
        id: 'cv9',
        category: 'unique-violation',
        difficulty: 'Easy',
        title: 'UNIQUE Constraint Violation',
        schema: 'company',
        question: `The DEPARTMENT table has: UNIQUE (Dname)

Existing data:
| Dnumber | Dname      | MgrSSN    |
|---------|------------|-----------|
| 1       | Research   | 333445555 |
| 5       | Production | 123456789 |

Will this INSERT succeed?

INSERT INTO DEPARTMENT VALUES (7, 'Research', NULL, NULL);`,
        options: [
            { id: 'a', text: 'Yes - Dnumber 7 is new so it\'s unique' },
            { id: 'b', text: 'No - UNIQUE constraint violation (Dname \'Research\' exists)' },
            { id: 'c', text: 'No - PRIMARY KEY violation' },
            { id: 'd', text: 'No - FOREIGN KEY violation' }
        ],
        correctAnswer: 'b',
        explanation: `This violates the UNIQUE constraint on Dname. 'Research' already exists as a department name.

UNIQUE constraints ensure no duplicate values in that column, independent of the primary key.

- Dnumber 7 is fine (new PK value)
- But Dname 'Research' already exists -> UNIQUE violation`
    },

    // ========================================
    // SECTION 2: CASCADE Actions
    // ========================================

    {
        id: 'cv10',
        category: 'cascade-delete',
        difficulty: 'Medium',
        title: 'ON DELETE CASCADE - Single Level',
        schema: 'company',
        question: `WORKS_ON has: FOREIGN KEY (ESSN) REFERENCES EMPLOYEE(SSN) ON DELETE CASCADE

Current data:
EMPLOYEE:
| SSN       | Fname | Lname |
|-----------|-------|-------|
| 123456789 | John  | Smith |
| 333445555 | Wong  | Frank |

WORKS_ON:
| ESSN      | Pno | Hours |
|-----------|-----|-------|
| 123456789 | 1   | 32.5  |
| 123456789 | 2   | 7.5   |
| 333445555 | 1   | 20.0  |

After: DELETE FROM EMPLOYEE WHERE SSN = '123456789';

How many rows remain in WORKS_ON?`,
        options: [
            { id: 'a', text: '3 rows (delete blocked by FK)' },
            { id: 'b', text: '2 rows (only rows with ESSN=123456789 deleted)' },
            { id: 'c', text: '1 row (only 333445555, Pno 1 remains)' },
            { id: 'd', text: '0 rows (all cascaded)' }
        ],
        correctAnswer: 'c',
        explanation: `ON DELETE CASCADE means: when the referenced row is deleted, all referencing rows are ALSO deleted.

Step by step:
1. DELETE SSN='123456789' from EMPLOYEE
2. CASCADE: Delete all WORKS_ON rows where ESSN='123456789'
   - (123456789, 1, 32.5) -> DELETED
   - (123456789, 2, 7.5) -> DELETED
3. Row (333445555, 1, 20.0) is NOT affected

Result: 1 row remains in WORKS_ON`
    },
    {
        id: 'cv11',
        category: 'cascade-delete',
        difficulty: 'Hard',
        title: 'ON DELETE CASCADE - Chain Reaction',
        schema: 'company',
        question: `Schema:
- PROJECT(Dnum) REFERENCES DEPARTMENT(Dnumber) ON DELETE CASCADE
- WORKS_ON(Pno) REFERENCES PROJECT(Pnumber) ON DELETE CASCADE

Current data:
DEPARTMENT:
| Dnumber | Dname    |
|---------|----------|
| 5       | Research |

PROJECT:
| Pnumber | Pname   | Dnum |
|---------|---------|------|
| 1       | ProjectA| 5    |
| 2       | ProjectB| 5    |

WORKS_ON:
| ESSN      | Pno | Hours |
|-----------|-----|-------|
| 123456789 | 1   | 10.0  |
| 333445555 | 1   | 20.0  |
| 123456789 | 2   | 15.0  |

After: DELETE FROM DEPARTMENT WHERE Dnumber = 5;

What happens?`,
        options: [
            { id: 'a', text: 'Only DEPARTMENT row deleted; others blocked' },
            { id: 'b', text: 'DEPARTMENT + PROJECT rows deleted; WORKS_ON blocked' },
            { id: 'c', text: 'All rows in all three tables deleted (chain cascade)' },
            { id: 'd', text: 'Delete rejected due to dependencies' }
        ],
        correctAnswer: 'c',
        explanation: `CASCADE actions can CHAIN through multiple tables:

Step 1: DELETE Dnumber=5 from DEPARTMENT
Step 2: CASCADE to PROJECT - delete all where Dnum=5
   - ProjectA (Pnumber=1) -> DELETED
   - ProjectB (Pnumber=2) -> DELETED
Step 3: CASCADE to WORKS_ON - delete all where Pno IN (1, 2)
   - (123456789, 1) -> DELETED
   - (333445555, 1) -> DELETED
   - (123456789, 2) -> DELETED

Result: All related rows in the chain are deleted.
This is why CASCADE must be used carefully - it can have far-reaching effects!`
    },
    {
        id: 'cv12',
        category: 'set-null-delete',
        difficulty: 'Medium',
        title: 'ON DELETE SET NULL',
        schema: 'company',
        question: `EMPLOYEE has: FOREIGN KEY (SuperSSN) REFERENCES EMPLOYEE(SSN) ON DELETE SET NULL

Current data:
| SSN       | Fname | SuperSSN  |
|-----------|-------|-----------|
| 333445555 | Wong  | NULL      |
| 123456789 | John  | 333445555 |
| 987654321 | Jane  | 333445555 |
| 666884444 | Bob   | 123456789 |

After: DELETE FROM EMPLOYEE WHERE SSN = '333445555';

What are the SuperSSN values for John and Jane?`,
        options: [
            { id: 'a', text: 'Delete blocked - cannot delete referenced row' },
            { id: 'b', text: 'Both set to NULL' },
            { id: 'c', text: 'John and Jane rows are deleted (cascade)' },
            { id: 'd', text: 'SuperSSN unchanged, but with dangling reference' }
        ],
        correctAnswer: 'b',
        explanation: `ON DELETE SET NULL: When referenced row is deleted, set FK values to NULL.

Step 1: DELETE SSN='333445555' (Wong)
Step 2: SET NULL: All rows where SuperSSN='333445555' have SuperSSN set to NULL
   - John (123456789): SuperSSN -> NULL
   - Jane (987654321): SuperSSN -> NULL
   - Bob (666884444): SuperSSN stays '123456789' (not affected)

Result after delete:
| SSN       | Fname | SuperSSN  |
|-----------|-------|-----------|
| 123456789 | John  | NULL      |
| 987654321 | Jane  | NULL      |
| 666884444 | Bob   | 123456789 |`
    },
    {
        id: 'cv13',
        category: 'cascade-vs-setnull',
        difficulty: 'Hard',
        title: 'Mixed CASCADE and SET NULL',
        schema: 'company',
        question: `Schema:
- EMPLOYEE(Dno) REFERENCES DEPARTMENT(Dnumber) ON DELETE SET NULL
- PROJECT(Dnum) REFERENCES DEPARTMENT(Dnumber) ON DELETE CASCADE
- WORKS_ON(Pno) REFERENCES PROJECT(Pnumber) ON DELETE CASCADE

DEPARTMENT: Dnumber=5 (Research)
PROJECT: Pnumber=1, Dnum=5
EMPLOYEE: SSN=123456789, Dno=5
WORKS_ON: ESSN=123456789, Pno=1

After: DELETE FROM DEPARTMENT WHERE Dnumber = 5;

What happens to EMPLOYEE row 123456789?`,
        options: [
            { id: 'a', text: 'Deleted via CASCADE' },
            { id: 'b', text: 'Dno set to NULL; employee remains' },
            { id: 'c', text: 'Delete blocked' },
            { id: 'd', text: 'No change to employee' }
        ],
        correctAnswer: 'b',
        explanation: `Different FKs can have different referential actions!

When Dnumber=5 is deleted:

1. EMPLOYEE.Dno -> SET NULL (not CASCADE)
   - Employee 123456789's Dno becomes NULL
   - Employee record REMAINS in table

2. PROJECT.Dnum -> CASCADE
   - Project Pnumber=1 is DELETED

3. WORKS_ON.Pno -> CASCADE (from PROJECT)
   - WORKS_ON row with Pno=1 is DELETED

Final state:
- DEPARTMENT: Row deleted
- PROJECT: Row deleted
- WORKS_ON: Row deleted
- EMPLOYEE: Still exists with Dno=NULL`
    },
    {
        id: 'cv14',
        category: 'update-cascade',
        difficulty: 'Medium',
        title: 'ON UPDATE CASCADE',
        schema: 'university',
        question: `Assume: ENROLLMENT(StudentID) REFERENCES STUDENT(StudentID) ON UPDATE CASCADE

Current data:
STUDENT:
| StudentID | Name  |
|-----------|-------|
| S001      | Alice |
| S002      | Bob   |

ENROLLMENT:
| StudentID | CourseID | Grade |
|-----------|----------|-------|
| S001      | CS101    | A     |
| S001      | CS102    | B     |
| S002      | CS101    | B     |

After: UPDATE STUDENT SET StudentID = 'S999' WHERE StudentID = 'S001';

What happens to ENROLLMENT?`,
        options: [
            { id: 'a', text: 'Update blocked - PK in use as FK' },
            { id: 'b', text: 'ENROLLMENT rows with S001 are deleted' },
            { id: 'c', text: 'ENROLLMENT.StudentID updated to S999 for affected rows' },
            { id: 'd', text: 'ENROLLMENT unchanged, creating orphan rows' }
        ],
        correctAnswer: 'c',
        explanation: `ON UPDATE CASCADE: When referenced PK changes, FK values are updated to match.

Step 1: UPDATE StudentID from 'S001' to 'S999' in STUDENT
Step 2: CASCADE UPDATE to ENROLLMENT:
   - (S001, CS101, A) -> (S999, CS101, A)
   - (S001, CS102, B) -> (S999, CS102, B)
   - (S002, CS101, B) unchanged

Result in ENROLLMENT:
| StudentID | CourseID | Grade |
|-----------|----------|-------|
| S999      | CS101    | A     |
| S999      | CS102    | B     |
| S002      | CS101    | B     |

Note: ON UPDATE CASCADE is less common than ON DELETE CASCADE, but works similarly for updates.`
    },

    // ========================================
    // SECTION 3: Complex Scenarios
    // ========================================

    {
        id: 'cv15',
        category: 'multiple-violations',
        difficulty: 'Hard',
        title: 'Multiple Constraint Check',
        schema: 'company',
        question: `Which constraints does this INSERT violate?

Existing: EMPLOYEE SSN='123456789', DEPARTMENT Dnumber IN (1, 5)

INSERT INTO EMPLOYEE VALUES (NULL, 'Test', 'User', -1000, '999888777', 9);`,
        options: [
            { id: 'a', text: 'Entity Integrity only' },
            { id: 'b', text: 'Entity Integrity + CHECK (Salary)' },
            { id: 'c', text: 'Entity Integrity + CHECK (Salary) + Referential Integrity (2 FKs)' },
            { id: 'd', text: 'All of the above plus UNIQUE' }
        ],
        correctAnswer: 'c',
        explanation: `This INSERT violates MULTIPLE constraints:

1. ENTITY INTEGRITY: SSN = NULL
   - Primary key cannot be NULL

2. CHECK CONSTRAINT: Salary = -1000
   - Violates CHECK (Salary > 0)

3. REFERENTIAL INTEGRITY (SuperSSN): '999888777'
   - No employee with this SSN exists

4. REFERENTIAL INTEGRITY (Dno): 9
   - No department with Dnumber=9 exists

All four violations would cause rejection. The DBMS typically reports the first violation found, but all these issues exist.`
    },
    {
        id: 'cv16',
        category: 'delete-order',
        difficulty: 'Hard',
        title: 'Delete Order Matters',
        schema: 'company',
        question: `Without CASCADE, in what order must you delete to remove Department 5 and all its employees?

- EMPLOYEE.Dno REFERENCES DEPARTMENT(Dnumber)
- WORKS_ON.ESSN REFERENCES EMPLOYEE(SSN)
- DEPENDENT.ESSN REFERENCES EMPLOYEE(SSN)`,
        options: [
            { id: 'a', text: 'DEPARTMENT -> EMPLOYEE -> WORKS_ON -> DEPENDENT' },
            { id: 'b', text: 'DEPENDENT -> WORKS_ON -> EMPLOYEE -> DEPARTMENT' },
            { id: 'c', text: 'EMPLOYEE -> DEPARTMENT (others auto-deleted)' },
            { id: 'd', text: 'Any order works without CASCADE' }
        ],
        correctAnswer: 'b',
        explanation: `Without CASCADE, you must delete in reverse dependency order (delete referencing rows FIRST):

1. Delete DEPENDENT rows (no other table references DEPENDENT)
2. Delete WORKS_ON rows (no other table references WORKS_ON)
3. Delete EMPLOYEE rows (now safe - no more FK references to these employees)
4. Delete DEPARTMENT row (now safe - no more FK references to this department)

Why this order?
- Can't delete EMPLOYEE while WORKS_ON/DEPENDENT reference it
- Can't delete DEPARTMENT while EMPLOYEE references it

Think: Delete from the "leaves" of the dependency tree first, work back to the "root".`
    },
    {
        id: 'cv17',
        category: 'constraint-types',
        difficulty: 'Medium',
        title: 'Identify Constraint Type',
        schema: 'company',
        question: `Match the scenario to its constraint type:

"Two employees cannot have the same SSN value"`,
        options: [
            { id: 'a', text: 'Entity Integrity Constraint' },
            { id: 'b', text: 'Referential Integrity Constraint' },
            { id: 'c', text: 'Key Constraint (uniqueness)' },
            { id: 'd', text: 'Domain Constraint' }
        ],
        correctAnswer: 'c',
        explanation: `This is a KEY CONSTRAINT (specifically, uniqueness of primary key).

Constraint types:
- KEY CONSTRAINT: Ensures uniqueness of key values
- ENTITY INTEGRITY: PK cannot be NULL
- REFERENTIAL INTEGRITY: FK must match existing PK or be NULL
- DOMAIN CONSTRAINT: Values must be from valid domain (e.g., CHECK)

"No two tuples can have the same SSN" = Key/Uniqueness constraint`
    },
    {
        id: 'cv18',
        category: 'constraint-types',
        difficulty: 'Medium',
        title: 'Identify Constraint Type - FK',
        schema: 'company',
        question: `Match the scenario to its constraint type:

"An employee's department number must correspond to an existing department"`,
        options: [
            { id: 'a', text: 'Entity Integrity Constraint' },
            { id: 'b', text: 'Referential Integrity Constraint' },
            { id: 'c', text: 'Key Constraint' },
            { id: 'd', text: 'CHECK Constraint' }
        ],
        correctAnswer: 'b',
        explanation: `This is a REFERENTIAL INTEGRITY (Foreign Key) constraint.

It ensures that values in the FK column (Dno) must:
1. Match an existing PK value in referenced table (DEPARTMENT.Dnumber), OR
2. Be NULL (if allowed)

This maintains the logical connection between related tables.`
    },
    {
        id: 'cv19',
        category: 'set-null-behavior',
        difficulty: 'Hard',
        title: 'SET NULL with NOT NULL Conflict',
        schema: 'company',
        question: `Consider:
EMPLOYEE (SuperSSN) REFERENCES EMPLOYEE(SSN) ON DELETE SET NULL

But what if SuperSSN had a NOT NULL constraint?

DELETE FROM EMPLOYEE WHERE SSN = '333445555';
(333445555 supervises other employees)`,
        options: [
            { id: 'a', text: 'SET NULL proceeds, ignoring NOT NULL' },
            { id: 'b', text: 'Delete is REJECTED - conflict between actions' },
            { id: 'c', text: 'Referencing rows are deleted instead' },
            { id: 'd', text: 'SuperSSN keeps old value (dangling reference)' }
        ],
        correctAnswer: 'b',
        explanation: `When ON DELETE SET NULL conflicts with NOT NULL constraint, the DELETE is REJECTED.

The DBMS cannot:
- Leave dangling references (violates referential integrity)
- Set to NULL (violates NOT NULL constraint)
- Delete child rows (that's CASCADE, not SET NULL)

Therefore, the only option is to REJECT the delete operation.

This is why schema design must consider:
- If FK can be NULL, SET NULL is safe
- If FK must be NOT NULL, consider CASCADE or RESTRICT instead`
    },
    {
        id: 'cv20',
        category: 'cascade-complex',
        difficulty: 'Hard',
        title: 'Circular Reference Cascade',
        schema: 'company',
        question: `Consider the DEPARTMENT-EMPLOYEE relationship:
- EMPLOYEE.Dno REFERENCES DEPARTMENT(Dnumber) ON DELETE SET NULL
- DEPARTMENT.MgrSSN REFERENCES EMPLOYEE(SSN) ON DELETE SET NULL

DEPARTMENT: (5, 'Research', '333445555')
EMPLOYEE: ('333445555', 'Wong', 60000, NULL, 5)

What happens with: DELETE FROM EMPLOYEE WHERE SSN = '333445555';`,
        options: [
            { id: 'a', text: 'Infinite loop - delete keeps triggering' },
            { id: 'b', text: 'Wong deleted; Dept 5 MgrSSN set to NULL' },
            { id: 'c', text: 'Delete rejected due to circular dependency' },
            { id: 'd', text: 'Both Wong and Dept 5 deleted' }
        ],
        correctAnswer: 'b',
        explanation: `SET NULL handles circular references gracefully:

Step 1: DELETE SSN='333445555' from EMPLOYEE
Step 2: DEPARTMENT.MgrSSN references this SSN -> SET NULL
   - Department 5's MgrSSN becomes NULL

No infinite loop because:
- SET NULL doesn't delete rows, just sets values
- The cycle is broken - no further cascading needed

Result:
- EMPLOYEE: Wong deleted
- DEPARTMENT: (5, 'Research', NULL, ...)

Note: CASCADE in both directions COULD cause issues, but SET NULL is safe.`
    }
];

// ========================================
// Quiz State Management
// ========================================

let cvCurrentIndex = 0;
let cvSelectedAnswer = null;
let cvScore = 0;
let cvAttempts = {};
let cvCompleted = {};
let cvMode = 'practice'; // 'practice' or 'test'
let cvShuffledQuestions = [];

// Category labels for filtering
const categoryLabels = {
    'pk-violation': 'Primary Key Violations',
    'fk-violation': 'Foreign Key Violations',
    'check-violation': 'CHECK Constraint Violations',
    'unique-violation': 'UNIQUE Constraint Violations',
    'cascade-delete': 'ON DELETE CASCADE',
    'set-null-delete': 'ON DELETE SET NULL',
    'cascade-vs-setnull': 'Mixed Referential Actions',
    'update-cascade': 'ON UPDATE CASCADE',
    'multiple-violations': 'Multiple Violations',
    'delete-order': 'Delete Order',
    'constraint-types': 'Constraint Type Identification',
    'set-null-behavior': 'SET NULL Behavior',
    'cascade-complex': 'Complex CASCADE Scenarios'
};

// ========================================
// Initialization
// ========================================

function initConstraintVerification() {
    loadConstraintProgress();
    renderCVQuiz();
}

// ========================================
// Rendering Functions
// ========================================

function renderCVQuiz() {
    const container = document.getElementById('constraint-quiz-container');
    if (!container) return;

    const question = constraintQuestions[cvCurrentIndex];
    const categoryLabel = categoryLabels[question.category] || question.category;
    const isCompleted = cvCompleted[question.id];

    container.innerHTML = `
        <div class="constraint-quiz">
            <!-- Progress Bar -->
            <div class="quiz-progress-bar">
                <div class="quiz-progress-fill" style="width: ${((cvCurrentIndex + 1) / constraintQuestions.length) * 100}%"></div>
            </div>
            <div class="quiz-progress-text">
                Question ${cvCurrentIndex + 1} of ${constraintQuestions.length}
                ${isCompleted ? '<span class="completed-marker">Completed</span>' : ''}
            </div>

            <!-- Question Header -->
            <div class="question-header">
                <span class="question-category">${categoryLabel}</span>
                <span class="question-difficulty ${question.difficulty.toLowerCase()}">${question.difficulty}</span>
            </div>

            <!-- Question Title -->
            <h3 class="question-title">${question.title}</h3>

            <!-- Schema Reference -->
            <div class="schema-reference">
                <button class="schema-toggle-btn" onclick="toggleSchemaRef()">
                    Show Schema Reference
                </button>
                <div id="schema-ref-content" class="schema-ref-content" style="display: none;">
                    <pre>${constraintSchemas[question.schema].description}</pre>
                </div>
            </div>

            <!-- Question Content -->
            <div class="question-content">
                <pre class="question-code">${escapeHtmlCV(question.question)}</pre>
            </div>

            <!-- Answer Options -->
            <div class="answer-options">
                ${question.options.map(opt => `
                    <button class="answer-option ${cvSelectedAnswer === opt.id ? 'selected' : ''}"
                            onclick="cvSelectAnswer('${opt.id}')"
                            ${cvCompleted[question.id] ? 'disabled' : ''}>
                        <span class="option-letter">${opt.id.toUpperCase()}</span>
                        <span class="option-text">${opt.text}</span>
                    </button>
                `).join('')}
            </div>

            <!-- Action Buttons -->
            <div class="quiz-actions">
                <button class="btn nav-btn" onclick="cvPrevQuestion()" ${cvCurrentIndex === 0 ? 'disabled' : ''}>
                    Previous
                </button>
                <button class="btn submit-btn" onclick="cvSubmitAnswer()" ${!cvSelectedAnswer || cvCompleted[question.id] ? 'disabled' : ''}>
                    Submit Answer
                </button>
                <button class="btn nav-btn" onclick="cvNextQuestion()" ${cvCurrentIndex === constraintQuestions.length - 1 ? 'disabled' : ''}>
                    Next
                </button>
            </div>

            <!-- Feedback Area -->
            <div id="feedback-area" class="feedback-area" style="display: none;"></div>

            <!-- Question Navigation -->
            <div class="question-nav-dots">
                ${constraintQuestions.map((q, i) => `
                    <button class="nav-dot ${i === cvCurrentIndex ? 'current' : ''} ${cvCompleted[q.id] ? 'completed' : ''}"
                            onclick="cvGoToQuestion(${i})"
                            title="Question ${i + 1}: ${q.title}">
                    </button>
                `).join('')}
            </div>

            <!-- Category Filter -->
            <div class="category-filter">
                <label>Filter by topic:</label>
                <select onchange="cvFilterByCategory(this.value)">
                    <option value="all">All Topics</option>
                    ${Object.entries(categoryLabels).map(([key, label]) => `
                        <option value="${key}">${label}</option>
                    `).join('')}
                </select>
            </div>

            <!-- Score Display -->
            <div class="score-display">
                <span>Score: ${cvScore}/${Object.keys(cvCompleted).length}</span>
                <span>|</span>
                <span>Progress: ${Object.keys(cvCompleted).length}/${constraintQuestions.length} completed</span>
            </div>
        </div>
    `;
}

// ========================================
// Quiz Logic Functions
// ========================================

function cvSelectAnswer(answerId) {
    if (cvCompleted[constraintQuestions[cvCurrentIndex].id]) return;
    cvSelectedAnswer = answerId;
    renderCVQuiz();
}

function cvSubmitAnswer() {
    const question = constraintQuestions[cvCurrentIndex];
    if (!cvSelectedAnswer || cvCompleted[question.id]) return;

    const isCorrect = cvSelectedAnswer === question.correctAnswer;

    if (isCorrect) {
        cvScore++;
    }

    cvCompleted[question.id] = {
        answer: cvSelectedAnswer,
        correct: isCorrect
    };

    cvAttempts[question.id] = (cvAttempts[question.id] || 0) + 1;
    saveConstraintProgress();

    // Show feedback
    cvShowFeedback(question, isCorrect);

    // Re-render to update UI
    renderCVQuiz();
}

function cvShowFeedback(question, isCorrect) {
    const feedbackArea = document.getElementById('feedback-area');
    if (!feedbackArea) return;

    const correctOption = question.options.find(opt => opt.id === question.correctAnswer);

    feedbackArea.innerHTML = `
        <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
            <div class="feedback-header">
                ${isCorrect ? 'Correct!' : 'Incorrect'}
            </div>
            ${!isCorrect ? `
                <div class="correct-answer">
                    Correct answer: <strong>${correctOption.id.toUpperCase()}. ${correctOption.text}</strong>
                </div>
            ` : ''}
            <div class="explanation">
                <strong>Explanation:</strong>
                <pre class="explanation-text">${question.explanation}</pre>
            </div>
        </div>
    `;
    feedbackArea.style.display = 'block';
}

function cvPrevQuestion() {
    if (cvCurrentIndex > 0) {
        cvCurrentIndex--;
        cvSelectedAnswer = null;
        renderCVQuiz();
        document.getElementById('feedback-area').style.display = 'none';
    }
}

function cvNextQuestion() {
    if (cvCurrentIndex < constraintQuestions.length - 1) {
        cvCurrentIndex++;
        cvSelectedAnswer = null;
        renderCVQuiz();
        document.getElementById('feedback-area').style.display = 'none';
    }
}

function cvGoToQuestion(index) {
    cvCurrentIndex = index;
    cvSelectedAnswer = null;
    renderCVQuiz();
    const feedbackArea = document.getElementById('feedback-area');
    if (feedbackArea) feedbackArea.style.display = 'none';
}

function cvFilterByCategory(category) {
    if (category === 'all') {
        cvCurrentIndex = 0;
    } else {
        const index = constraintQuestions.findIndex(q => q.category === category);
        if (index !== -1) {
            cvCurrentIndex = index;
        }
    }
    cvSelectedAnswer = null;
    renderCVQuiz();
}

function toggleSchemaRef() {
    const content = document.getElementById('schema-ref-content');
    const btn = document.querySelector('.schema-toggle-btn');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        btn.textContent = 'Hide Schema Reference';
    } else {
        content.style.display = 'none';
        btn.textContent = 'Show Schema Reference';
    }
}

// ========================================
// Progress Persistence
// ========================================

function saveConstraintProgress() {
    localStorage.setItem('constraintQuizScore', JSON.stringify(cvScore));
    localStorage.setItem('constraintQuizCompleted', JSON.stringify(cvCompleted));
    localStorage.setItem('constraintQuizAttempts', JSON.stringify(cvAttempts));
}

function loadConstraintProgress() {
    const savedScore = localStorage.getItem('constraintQuizScore');
    const savedCompleted = localStorage.getItem('constraintQuizCompleted');
    const savedAttempts = localStorage.getItem('constraintQuizAttempts');

    if (savedScore) cvScore = JSON.parse(savedScore);
    if (savedCompleted) cvCompleted = JSON.parse(savedCompleted);
    if (savedAttempts) cvAttempts = JSON.parse(savedAttempts);
}

function resetConstraintProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        cvScore = 0;
        cvCompleted = {};
        cvAttempts = {};
        cvCurrentIndex = 0;
        cvSelectedAnswer = null;
        saveConstraintProgress();
        renderCVQuiz();
    }
}

// ========================================
// Utility Functions
// ========================================

function escapeHtmlCV(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ========================================
// Concept Quick Reference
// ========================================

const constraintConcepts = {
    entityIntegrity: {
        title: 'Entity Integrity',
        rule: 'Primary Key attributes CANNOT be NULL',
        reason: 'PKs are used to uniquely identify tuples; NULL means "unknown"',
        formula: 't[PK] ≠ NULL for any tuple t'
    },
    referentialIntegrity: {
        title: 'Referential Integrity',
        rule: 'FK value must match existing PK value OR be NULL',
        formula: 't1[FK] = t2[PK] OR t1[FK] = NULL',
        actions: {
            cascade: 'DELETE/UPDATE referenced row → DELETE/UPDATE referencing rows',
            setNull: 'DELETE/UPDATE referenced row → Set FK to NULL',
            restrict: 'Prevent DELETE/UPDATE if references exist',
            noAction: 'Default; check at end of statement'
        }
    },
    keyConstraint: {
        title: 'Key Constraint',
        rule: 'No two tuples can have the same key value',
        types: ['Primary Key (unique + not null)', 'Candidate Key (unique)', 'UNIQUE constraint']
    },
    checkConstraint: {
        title: 'CHECK Constraint',
        rule: 'Attribute values must satisfy specified condition',
        examples: ['Salary > 0', 'Age BETWEEN 0 AND 150', 'Status IN (\'A\', \'I\', \'P\')']
    }
};

function renderConceptReference() {
    const container = document.getElementById('concept-reference');
    if (!container) return;

    container.innerHTML = `
        <div class="concept-cards">
            <div class="concept-card">
                <h4>Entity Integrity</h4>
                <p><strong>Rule:</strong> ${constraintConcepts.entityIntegrity.rule}</p>
                <p><strong>Why:</strong> ${constraintConcepts.entityIntegrity.reason}</p>
                <code>${constraintConcepts.entityIntegrity.formula}</code>
            </div>

            <div class="concept-card">
                <h4>Referential Integrity</h4>
                <p><strong>Rule:</strong> ${constraintConcepts.referentialIntegrity.rule}</p>
                <code>${constraintConcepts.referentialIntegrity.formula}</code>
                <div class="actions-list">
                    <strong>Referential Actions:</strong>
                    <ul>
                        <li><strong>CASCADE:</strong> ${constraintConcepts.referentialIntegrity.actions.cascade}</li>
                        <li><strong>SET NULL:</strong> ${constraintConcepts.referentialIntegrity.actions.setNull}</li>
                        <li><strong>RESTRICT:</strong> ${constraintConcepts.referentialIntegrity.actions.restrict}</li>
                    </ul>
                </div>
            </div>

            <div class="concept-card">
                <h4>Key Constraint</h4>
                <p><strong>Rule:</strong> ${constraintConcepts.keyConstraint.rule}</p>
                <ul>
                    ${constraintConcepts.keyConstraint.types.map(t => `<li>${t}</li>`).join('')}
                </ul>
            </div>

            <div class="concept-card">
                <h4>CHECK Constraint</h4>
                <p><strong>Rule:</strong> ${constraintConcepts.checkConstraint.rule}</p>
                <ul>
                    ${constraintConcepts.checkConstraint.examples.map(e => `<li><code>${e}</code></li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// ========================================
// Global Exports
// ========================================

window.initConstraintVerification = initConstraintVerification;
window.cvSelectAnswer = cvSelectAnswer;
window.cvSubmitAnswer = cvSubmitAnswer;
window.cvPrevQuestion = cvPrevQuestion;
window.cvNextQuestion = cvNextQuestion;
window.cvGoToQuestion = cvGoToQuestion;
window.cvFilterByCategory = cvFilterByCategory;
window.toggleSchemaRef = toggleSchemaRef;
window.resetConstraintProgress = resetConstraintProgress;
window.renderConceptReference = renderConceptReference;

// Auto-initialize if section is active on page load
document.addEventListener('DOMContentLoaded', () => {
    const section = document.getElementById('constraint-verification');
    if (section && section.classList.contains('active')) {
        initConstraintVerification();
        renderConceptReference();
    }
});
