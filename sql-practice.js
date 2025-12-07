// ========================================
// SQL Practice System
// ========================================

// Database schema for exercises
const practiceDatabase = {
    description: `
COMPANY DATABASE SCHEMA:
========================

EMPLOYEE (SSN, Fname, Lname, Bdate, Address, Sex, Salary, SuperSSN, Dno)
    - SSN: CHAR(9), Primary Key
    - SuperSSN: CHAR(9), Foreign Key references EMPLOYEE(SSN)
    - Dno: INTEGER, Foreign Key references DEPARTMENT(Dnumber)

DEPARTMENT (Dname, Dnumber, MgrSSN, MgrStartDate)
    - Dnumber: INTEGER, Primary Key
    - Dname: VARCHAR(15), Unique
    - MgrSSN: CHAR(9), Foreign Key references EMPLOYEE(SSN)

PROJECT (Pname, Pnumber, Plocation, Dnum)
    - Pnumber: INTEGER, Primary Key
    - Pname: VARCHAR(15), Unique
    - Dnum: INTEGER, Foreign Key references DEPARTMENT(Dnumber)

WORKS_ON (ESSN, Pno, Hours)
    - (ESSN, Pno): Primary Key
    - ESSN: CHAR(9), Foreign Key references EMPLOYEE(SSN)
    - Pno: INTEGER, Foreign Key references PROJECT(Pnumber)

DEPENDENT (ESSN, Dependent_name, Sex, Bdate, Relationship)
    - (ESSN, Dependent_name): Primary Key
    - ESSN: CHAR(9), Foreign Key references EMPLOYEE(SSN)

DEPT_LOCATIONS (Dnumber, Dlocation)
    - (Dnumber, Dlocation): Primary Key
    - Dnumber: INTEGER, Foreign Key references DEPARTMENT(Dnumber)
`,
    tables: {
        EMPLOYEE: {
            columns: ['SSN', 'Fname', 'Lname', 'Bdate', 'Address', 'Sex', 'Salary', 'SuperSSN', 'Dno'],
            pk: ['SSN'],
            fk: { SuperSSN: 'EMPLOYEE(SSN)', Dno: 'DEPARTMENT(Dnumber)' }
        },
        DEPARTMENT: {
            columns: ['Dname', 'Dnumber', 'MgrSSN', 'MgrStartDate'],
            pk: ['Dnumber'],
            unique: ['Dname'],
            fk: { MgrSSN: 'EMPLOYEE(SSN)' }
        },
        PROJECT: {
            columns: ['Pname', 'Pnumber', 'Plocation', 'Dnum'],
            pk: ['Pnumber'],
            unique: ['Pname'],
            fk: { Dnum: 'DEPARTMENT(Dnumber)' }
        },
        WORKS_ON: {
            columns: ['ESSN', 'Pno', 'Hours'],
            pk: ['ESSN', 'Pno'],
            fk: { ESSN: 'EMPLOYEE(SSN)', Pno: 'PROJECT(Pnumber)' }
        },
        DEPENDENT: {
            columns: ['ESSN', 'Dependent_name', 'Sex', 'Bdate', 'Relationship'],
            pk: ['ESSN', 'Dependent_name'],
            fk: { ESSN: 'EMPLOYEE(SSN)' }
        },
        DEPT_LOCATIONS: {
            columns: ['Dnumber', 'Dlocation'],
            pk: ['Dnumber', 'Dlocation'],
            fk: { Dnumber: 'DEPARTMENT(Dnumber)' }
        }
    }
};

// SQL Command Reference
const sqlReference = {
    ddl: [
        { cmd: 'CREATE TABLE', syntax: 'CREATE TABLE name (col1 type, ...)', desc: 'Create new table' },
        { cmd: 'ALTER TABLE', syntax: 'ALTER TABLE name ADD/DROP column', desc: 'Modify table structure' },
        { cmd: 'DROP TABLE', syntax: 'DROP TABLE name', desc: 'Delete table' },
        { cmd: 'CREATE VIEW', syntax: 'CREATE VIEW name AS SELECT...', desc: 'Create virtual table' }
    ],
    dml: [
        { cmd: 'SELECT', syntax: 'SELECT cols FROM table WHERE...', desc: 'Query data' },
        { cmd: 'INSERT', syntax: 'INSERT INTO table VALUES(...)', desc: 'Add new rows' },
        { cmd: 'UPDATE', syntax: 'UPDATE table SET col=val WHERE...', desc: 'Modify rows' },
        { cmd: 'DELETE', syntax: 'DELETE FROM table WHERE...', desc: 'Remove rows' }
    ],
    clauses: [
        { cmd: 'WHERE', syntax: 'WHERE condition', desc: 'Filter rows' },
        { cmd: 'GROUP BY', syntax: 'GROUP BY col1, col2', desc: 'Group rows' },
        { cmd: 'HAVING', syntax: 'HAVING aggregate_condition', desc: 'Filter groups' },
        { cmd: 'ORDER BY', syntax: 'ORDER BY col ASC/DESC', desc: 'Sort results' },
        { cmd: 'DISTINCT', syntax: 'SELECT DISTINCT cols', desc: 'Remove duplicates' }
    ],
    joins: [
        { cmd: 'INNER JOIN', syntax: 'T1 INNER JOIN T2 ON condition', desc: 'Matching rows only' },
        { cmd: 'LEFT JOIN', syntax: 'T1 LEFT JOIN T2 ON condition', desc: 'All left + matching right' },
        { cmd: 'RIGHT JOIN', syntax: 'T1 RIGHT JOIN T2 ON condition', desc: 'All right + matching left' },
        { cmd: 'FULL JOIN', syntax: 'T1 FULL JOIN T2 ON condition', desc: 'All rows from both' }
    ],
    operators: [
        { cmd: 'IN', syntax: 'col IN (val1, val2, ...)', desc: 'Match any value in list' },
        { cmd: 'NOT IN', syntax: 'col NOT IN (subquery)', desc: 'Not in list/subquery' },
        { cmd: 'EXISTS', syntax: 'EXISTS (subquery)', desc: 'True if subquery returns rows' },
        { cmd: 'BETWEEN', syntax: 'col BETWEEN val1 AND val2', desc: 'Range check' },
        { cmd: 'LIKE', syntax: "col LIKE 'pattern'", desc: '% = any chars, _ = one char' },
        { cmd: 'IS NULL', syntax: 'col IS NULL', desc: 'Check for NULL' }
    ],
    aggregates: [
        { cmd: 'COUNT', syntax: 'COUNT(*) or COUNT(col)', desc: 'Count rows' },
        { cmd: 'SUM', syntax: 'SUM(col)', desc: 'Sum values' },
        { cmd: 'AVG', syntax: 'AVG(col)', desc: 'Average value' },
        { cmd: 'MAX', syntax: 'MAX(col)', desc: 'Maximum value' },
        { cmd: 'MIN', syntax: 'MIN(col)', desc: 'Minimum value' }
    ],
    sets: [
        { cmd: 'UNION', syntax: 'query1 UNION query2', desc: 'Combine, remove dups' },
        { cmd: 'INTERSECT', syntax: 'query1 INTERSECT query2', desc: 'Common rows' },
        { cmd: 'EXCEPT', syntax: 'query1 EXCEPT query2', desc: 'Rows in first not second' }
    ],
    constraints: [
        { cmd: 'PRIMARY KEY', syntax: 'PRIMARY KEY (col)', desc: 'Unique identifier' },
        { cmd: 'FOREIGN KEY', syntax: 'FOREIGN KEY (col) REFERENCES table(col)', desc: 'Reference constraint' },
        { cmd: 'NOT NULL', syntax: 'col type NOT NULL', desc: 'Cannot be NULL' },
        { cmd: 'UNIQUE', syntax: 'UNIQUE (col)', desc: 'Must be unique' },
        { cmd: 'CHECK', syntax: 'CHECK (condition)', desc: 'Value constraint' },
        { cmd: 'DEFAULT', syntax: 'col type DEFAULT value', desc: 'Default value' }
    ],
    referential: [
        { cmd: 'ON DELETE CASCADE', syntax: 'ON DELETE CASCADE', desc: 'Delete referencing rows' },
        { cmd: 'ON DELETE SET NULL', syntax: 'ON DELETE SET NULL', desc: 'Set FK to NULL' },
        { cmd: 'ON UPDATE CASCADE', syntax: 'ON UPDATE CASCADE', desc: 'Update FK values' }
    ]
};

// SQL Practice Exercises organized by category
const sqlExercises = {
    // ========================================
    // DDL - CREATE TABLE
    // ========================================
    createTable: [
        {
            id: 'ct1',
            title: 'Basic Table Creation',
            difficulty: 'Easy',
            description: 'Create a STUDENT table with StudentID (integer, primary key), Name (varchar 50), and Age (integer).',
            hint: 'Use CREATE TABLE with column definitions and PRIMARY KEY constraint.',
            sampleAnswer: `CREATE TABLE STUDENT (
    StudentID INTEGER PRIMARY KEY,
    Name VARCHAR(50),
    Age INTEGER
);`,
            keyPoints: ['CREATE TABLE', 'PRIMARY KEY', 'Data types']
        },
        {
            id: 'ct2',
            title: 'Table with Multiple Constraints',
            difficulty: 'Medium',
            description: 'Create a COURSE table with: CourseID (char 6, primary key), CourseName (varchar 30, unique, not null), Credits (integer, default 3), and Department (varchar 20).',
            hint: 'Combine PRIMARY KEY, UNIQUE, NOT NULL, and DEFAULT constraints.',
            sampleAnswer: `CREATE TABLE COURSE (
    CourseID CHAR(6) PRIMARY KEY,
    CourseName VARCHAR(30) UNIQUE NOT NULL,
    Credits INTEGER DEFAULT 3,
    Department VARCHAR(20)
);`,
            keyPoints: ['UNIQUE', 'NOT NULL', 'DEFAULT']
        },
        {
            id: 'ct3',
            title: 'Table with Foreign Key',
            difficulty: 'Medium',
            description: 'Create an ENROLLMENT table with: StudentID (integer), CourseID (char 6), Grade (char 2). StudentID references STUDENT, CourseID references COURSE. Primary key is (StudentID, CourseID).',
            hint: 'Use composite primary key and FOREIGN KEY REFERENCES.',
            sampleAnswer: `CREATE TABLE ENROLLMENT (
    StudentID INTEGER,
    CourseID CHAR(6),
    Grade CHAR(2),
    PRIMARY KEY (StudentID, CourseID),
    FOREIGN KEY (StudentID) REFERENCES STUDENT(StudentID),
    FOREIGN KEY (CourseID) REFERENCES COURSE(CourseID)
);`,
            keyPoints: ['Composite PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES']
        },
        {
            id: 'ct4',
            title: 'Table with CHECK Constraint',
            difficulty: 'Medium',
            description: 'Create an ACCOUNT table with: AccountNo (integer, primary key), Balance (numeric 10,2), AccountType (varchar 10) that must be either "Savings" or "Checking", and OpenDate (date).',
            hint: 'Use CHECK constraint with IN for limiting values.',
            sampleAnswer: `CREATE TABLE ACCOUNT (
    AccountNo INTEGER PRIMARY KEY,
    Balance NUMERIC(10,2),
    AccountType VARCHAR(10) CHECK (AccountType IN ('Savings', 'Checking')),
    OpenDate DATE
);`,
            keyPoints: ['CHECK constraint', 'IN operator', 'NUMERIC type']
        },
        {
            id: 'ct5',
            title: 'Table with Referential Actions',
            difficulty: 'Hard',
            description: 'Create an ORDER_ITEM table with: OrderID (integer), ProductID (integer), Quantity (integer not null, check > 0), Price (numeric 8,2). PK is (OrderID, ProductID). OrderID references ORDERS with CASCADE delete, ProductID references PRODUCT with SET NULL on delete.',
            hint: 'Use ON DELETE CASCADE and ON DELETE SET NULL for different foreign keys.',
            sampleAnswer: `CREATE TABLE ORDER_ITEM (
    OrderID INTEGER,
    ProductID INTEGER,
    Quantity INTEGER NOT NULL CHECK (Quantity > 0),
    Price NUMERIC(8,2),
    PRIMARY KEY (OrderID, ProductID),
    FOREIGN KEY (OrderID) REFERENCES ORDERS(OrderID)
        ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES PRODUCT(ProductID)
        ON DELETE SET NULL
);`,
            keyPoints: ['ON DELETE CASCADE', 'ON DELETE SET NULL', 'CHECK with comparison']
        }
    ],

    // ========================================
    // DDL - ALTER and DROP
    // ========================================
    alterDrop: [
        {
            id: 'ad1',
            title: 'Add Column',
            difficulty: 'Easy',
            description: 'Add a new column Email (varchar 100) to the EMPLOYEE table.',
            hint: 'Use ALTER TABLE ... ADD',
            sampleAnswer: `ALTER TABLE EMPLOYEE ADD Email VARCHAR(100);`,
            keyPoints: ['ALTER TABLE', 'ADD column']
        },
        {
            id: 'ad2',
            title: 'Drop Column',
            difficulty: 'Easy',
            description: 'Remove the Address column from the EMPLOYEE table.',
            hint: 'Use ALTER TABLE ... DROP',
            sampleAnswer: `ALTER TABLE EMPLOYEE DROP Address;`,
            keyPoints: ['ALTER TABLE', 'DROP column']
        },
        {
            id: 'ad3',
            title: 'Add Constraint',
            difficulty: 'Medium',
            description: 'Add a CHECK constraint to ensure Salary in EMPLOYEE is at least 30000.',
            hint: 'Use ALTER TABLE ... ADD CONSTRAINT or ADD CHECK',
            sampleAnswer: `ALTER TABLE EMPLOYEE ADD CONSTRAINT salary_min CHECK (Salary >= 30000);`,
            keyPoints: ['ADD CONSTRAINT', 'CHECK']
        },
        {
            id: 'ad4',
            title: 'Drop Table',
            difficulty: 'Easy',
            description: 'Delete the TEMP_DATA table completely from the database.',
            hint: 'Use DROP TABLE',
            sampleAnswer: `DROP TABLE TEMP_DATA;`,
            keyPoints: ['DROP TABLE']
        }
    ],

    // ========================================
    // Basic SELECT Queries
    // ========================================
    basicSelect: [
        {
            id: 'bs1',
            title: 'Select All Columns',
            difficulty: 'Easy',
            description: 'Retrieve all information about all employees.',
            hint: 'Use SELECT * FROM table',
            sampleAnswer: `SELECT * FROM EMPLOYEE;`,
            keyPoints: ['SELECT *', 'FROM']
        },
        {
            id: 'bs2',
            title: 'Select Specific Columns',
            difficulty: 'Easy',
            description: 'Get the first name, last name, and salary of all employees.',
            hint: 'List the column names after SELECT',
            sampleAnswer: `SELECT Fname, Lname, Salary FROM EMPLOYEE;`,
            keyPoints: ['SELECT columns', 'Column list']
        },
        {
            id: 'bs3',
            title: 'WHERE with Comparison',
            difficulty: 'Easy',
            description: 'Find all employees with salary greater than 50000.',
            hint: 'Use WHERE with > operator',
            sampleAnswer: `SELECT * FROM EMPLOYEE WHERE Salary > 50000;`,
            keyPoints: ['WHERE', 'Comparison operators']
        },
        {
            id: 'bs4',
            title: 'WHERE with AND',
            difficulty: 'Easy',
            description: 'Find all female employees in department 5.',
            hint: 'Use WHERE with AND to combine conditions',
            sampleAnswer: `SELECT * FROM EMPLOYEE WHERE Sex = 'F' AND Dno = 5;`,
            keyPoints: ['AND operator', 'Multiple conditions']
        },
        {
            id: 'bs5',
            title: 'WHERE with OR',
            difficulty: 'Easy',
            description: 'Find employees who work in department 4 or department 5.',
            hint: 'Use WHERE with OR operator',
            sampleAnswer: `SELECT * FROM EMPLOYEE WHERE Dno = 4 OR Dno = 5;`,
            keyPoints: ['OR operator']
        },
        {
            id: 'bs6',
            title: 'DISTINCT',
            difficulty: 'Easy',
            description: 'List all unique department numbers that have employees.',
            hint: 'Use SELECT DISTINCT',
            sampleAnswer: `SELECT DISTINCT Dno FROM EMPLOYEE;`,
            keyPoints: ['DISTINCT', 'Eliminate duplicates']
        },
        {
            id: 'bs7',
            title: 'ORDER BY',
            difficulty: 'Easy',
            description: 'List all employees ordered by salary from highest to lowest.',
            hint: 'Use ORDER BY with DESC',
            sampleAnswer: `SELECT * FROM EMPLOYEE ORDER BY Salary DESC;`,
            keyPoints: ['ORDER BY', 'DESC']
        },
        {
            id: 'bs8',
            title: 'Column Alias',
            difficulty: 'Easy',
            description: 'Display employee names with salary increased by 10%, calling the new column "NewSalary".',
            hint: 'Use AS for alias and arithmetic expression',
            sampleAnswer: `SELECT Fname, Lname, Salary * 1.1 AS NewSalary FROM EMPLOYEE;`,
            keyPoints: ['AS alias', 'Arithmetic expressions']
        }
    ],

    // ========================================
    // Pattern Matching and NULL
    // ========================================
    patternNull: [
        {
            id: 'pn1',
            title: 'LIKE with %',
            difficulty: 'Easy',
            description: 'Find all employees whose first name starts with "J".',
            hint: 'Use LIKE with % wildcard',
            sampleAnswer: `SELECT * FROM EMPLOYEE WHERE Fname LIKE 'J%';`,
            keyPoints: ['LIKE', '% wildcard']
        },
        {
            id: 'pn2',
            title: 'LIKE with _',
            difficulty: 'Easy',
            description: 'Find all employees whose first name is exactly 4 characters and ends with "n".',
            hint: 'Use _ for single character wildcard',
            sampleAnswer: `SELECT * FROM EMPLOYEE WHERE Fname LIKE '___n';`,
            keyPoints: ['LIKE', '_ wildcard']
        },
        {
            id: 'pn3',
            title: 'BETWEEN',
            difficulty: 'Easy',
            description: 'Find employees with salary between 30000 and 50000 (inclusive).',
            hint: 'Use BETWEEN ... AND',
            sampleAnswer: `SELECT * FROM EMPLOYEE WHERE Salary BETWEEN 30000 AND 50000;`,
            keyPoints: ['BETWEEN', 'Inclusive range']
        },
        {
            id: 'pn4',
            title: 'IN Operator',
            difficulty: 'Easy',
            description: 'Find employees who work in departments 1, 4, or 5.',
            hint: 'Use IN with a list of values',
            sampleAnswer: `SELECT * FROM EMPLOYEE WHERE Dno IN (1, 4, 5);`,
            keyPoints: ['IN operator', 'Value list']
        },
        {
            id: 'pn5',
            title: 'IS NULL',
            difficulty: 'Easy',
            description: 'Find all employees who do not have a supervisor.',
            hint: 'Use IS NULL (not = NULL)',
            sampleAnswer: `SELECT * FROM EMPLOYEE WHERE SuperSSN IS NULL;`,
            keyPoints: ['IS NULL', 'NULL comparison']
        },
        {
            id: 'pn6',
            title: 'IS NOT NULL',
            difficulty: 'Easy',
            description: 'Find all employees who have a supervisor assigned.',
            hint: 'Use IS NOT NULL',
            sampleAnswer: `SELECT * FROM EMPLOYEE WHERE SuperSSN IS NOT NULL;`,
            keyPoints: ['IS NOT NULL']
        }
    ],

    // ========================================
    // JOIN Queries
    // ========================================
    joins: [
        {
            id: 'j1',
            title: 'Simple Join (Implicit)',
            difficulty: 'Medium',
            description: 'List each employee name along with their department name.',
            hint: 'Join EMPLOYEE and DEPARTMENT on Dno = Dnumber',
            sampleAnswer: `SELECT E.Fname, E.Lname, D.Dname
FROM EMPLOYEE E, DEPARTMENT D
WHERE E.Dno = D.Dnumber;`,
            keyPoints: ['Implicit join', 'Table aliases', 'Join condition in WHERE']
        },
        {
            id: 'j2',
            title: 'INNER JOIN (Explicit)',
            difficulty: 'Medium',
            description: 'Same as above but using explicit INNER JOIN syntax.',
            hint: 'Use INNER JOIN ... ON',
            sampleAnswer: `SELECT E.Fname, E.Lname, D.Dname
FROM EMPLOYEE E
INNER JOIN DEPARTMENT D ON E.Dno = D.Dnumber;`,
            keyPoints: ['INNER JOIN', 'ON clause']
        },
        {
            id: 'j3',
            title: 'Three-Table Join',
            difficulty: 'Medium',
            description: 'List employee names, their department names, and the projects they work on.',
            hint: 'Join EMPLOYEE, DEPARTMENT, WORKS_ON, and PROJECT',
            sampleAnswer: `SELECT E.Fname, E.Lname, D.Dname, P.Pname
FROM EMPLOYEE E, DEPARTMENT D, WORKS_ON W, PROJECT P
WHERE E.Dno = D.Dnumber
  AND E.SSN = W.ESSN
  AND W.Pno = P.Pnumber;`,
            keyPoints: ['Multiple table join', 'Multiple join conditions']
        },
        {
            id: 'j4',
            title: 'Self Join',
            difficulty: 'Hard',
            description: 'List each employee with their supervisor\'s name.',
            hint: 'Join EMPLOYEE to itself using SuperSSN',
            sampleAnswer: `SELECT E.Fname AS Employee, E.Lname,
       S.Fname AS Supervisor, S.Lname
FROM EMPLOYEE E, EMPLOYEE S
WHERE E.SuperSSN = S.SSN;`,
            keyPoints: ['Self join', 'Table aliases', 'Same table twice']
        },
        {
            id: 'j5',
            title: 'LEFT OUTER JOIN',
            difficulty: 'Medium',
            description: 'List ALL employees and their department names (include employees with no department).',
            hint: 'Use LEFT JOIN to include all employees',
            sampleAnswer: `SELECT E.Fname, E.Lname, D.Dname
FROM EMPLOYEE E
LEFT JOIN DEPARTMENT D ON E.Dno = D.Dnumber;`,
            keyPoints: ['LEFT JOIN', 'Include unmatched rows']
        },
        {
            id: 'j6',
            title: 'RIGHT OUTER JOIN',
            difficulty: 'Medium',
            description: 'List ALL departments and employees working in them (include departments with no employees).',
            hint: 'Use RIGHT JOIN to include all departments',
            sampleAnswer: `SELECT E.Fname, E.Lname, D.Dname
FROM EMPLOYEE E
RIGHT JOIN DEPARTMENT D ON E.Dno = D.Dnumber;`,
            keyPoints: ['RIGHT JOIN', 'Include all from right table']
        },
        {
            id: 'j7',
            title: 'FULL OUTER JOIN',
            difficulty: 'Medium',
            description: 'List all employees and all departments, matching where possible.',
            hint: 'Use FULL JOIN',
            sampleAnswer: `SELECT E.Fname, E.Lname, D.Dname
FROM EMPLOYEE E
FULL JOIN DEPARTMENT D ON E.Dno = D.Dnumber;`,
            keyPoints: ['FULL JOIN', 'All rows from both tables']
        }
    ],

    // ========================================
    // Aggregate Functions
    // ========================================
    aggregates: [
        {
            id: 'ag1',
            title: 'COUNT All Rows',
            difficulty: 'Easy',
            description: 'Count the total number of employees.',
            hint: 'Use COUNT(*)',
            sampleAnswer: `SELECT COUNT(*) FROM EMPLOYEE;`,
            keyPoints: ['COUNT(*)', 'Count all rows']
        },
        {
            id: 'ag2',
            title: 'COUNT with DISTINCT',
            difficulty: 'Easy',
            description: 'Count how many different departments have employees.',
            hint: 'Use COUNT(DISTINCT column)',
            sampleAnswer: `SELECT COUNT(DISTINCT Dno) FROM EMPLOYEE;`,
            keyPoints: ['COUNT(DISTINCT)', 'Unique count']
        },
        {
            id: 'ag3',
            title: 'SUM',
            difficulty: 'Easy',
            description: 'Calculate the total salary paid to all employees.',
            hint: 'Use SUM(column)',
            sampleAnswer: `SELECT SUM(Salary) FROM EMPLOYEE;`,
            keyPoints: ['SUM']
        },
        {
            id: 'ag4',
            title: 'AVG',
            difficulty: 'Easy',
            description: 'Find the average salary of employees in department 5.',
            hint: 'Use AVG with WHERE',
            sampleAnswer: `SELECT AVG(Salary) FROM EMPLOYEE WHERE Dno = 5;`,
            keyPoints: ['AVG', 'Filter with WHERE']
        },
        {
            id: 'ag5',
            title: 'MAX and MIN',
            difficulty: 'Easy',
            description: 'Find the highest and lowest salaries in the company.',
            hint: 'Use MAX and MIN in same query',
            sampleAnswer: `SELECT MAX(Salary) AS Highest, MIN(Salary) AS Lowest FROM EMPLOYEE;`,
            keyPoints: ['MAX', 'MIN', 'Multiple aggregates']
        },
        {
            id: 'ag6',
            title: 'COUNT vs COUNT Column',
            difficulty: 'Medium',
            description: 'Compare the count of all employees with count of employees who have supervisors.',
            hint: 'COUNT(*) counts all, COUNT(column) ignores NULLs',
            sampleAnswer: `SELECT COUNT(*) AS TotalEmployees,
       COUNT(SuperSSN) AS WithSupervisor
FROM EMPLOYEE;`,
            keyPoints: ['COUNT(*) vs COUNT(column)', 'NULL handling']
        }
    ],

    // ========================================
    // GROUP BY and HAVING
    // ========================================
    groupBy: [
        {
            id: 'gb1',
            title: 'Simple GROUP BY',
            difficulty: 'Medium',
            description: 'Count the number of employees in each department.',
            hint: 'GROUP BY department, use COUNT',
            sampleAnswer: `SELECT Dno, COUNT(*) AS NumEmployees
FROM EMPLOYEE
GROUP BY Dno;`,
            keyPoints: ['GROUP BY', 'Aggregate per group']
        },
        {
            id: 'gb2',
            title: 'GROUP BY with Multiple Aggregates',
            difficulty: 'Medium',
            description: 'For each department, show the average salary and total salary.',
            hint: 'Use multiple aggregate functions with GROUP BY',
            sampleAnswer: `SELECT Dno, AVG(Salary) AS AvgSalary, SUM(Salary) AS TotalSalary
FROM EMPLOYEE
GROUP BY Dno;`,
            keyPoints: ['Multiple aggregates', 'GROUP BY']
        },
        {
            id: 'gb3',
            title: 'HAVING Clause',
            difficulty: 'Medium',
            description: 'Find departments that have more than 3 employees.',
            hint: 'Use HAVING to filter groups',
            sampleAnswer: `SELECT Dno, COUNT(*) AS NumEmployees
FROM EMPLOYEE
GROUP BY Dno
HAVING COUNT(*) > 3;`,
            keyPoints: ['HAVING', 'Filter groups after aggregation']
        },
        {
            id: 'gb4',
            title: 'WHERE vs HAVING',
            difficulty: 'Medium',
            description: 'Find departments where the average salary of employees earning more than 30000 exceeds 50000.',
            hint: 'Use WHERE to filter rows, HAVING to filter groups',
            sampleAnswer: `SELECT Dno, AVG(Salary) AS AvgSalary
FROM EMPLOYEE
WHERE Salary > 30000
GROUP BY Dno
HAVING AVG(Salary) > 50000;`,
            keyPoints: ['WHERE before GROUP BY', 'HAVING after GROUP BY']
        },
        {
            id: 'gb5',
            title: 'GROUP BY Multiple Columns',
            difficulty: 'Medium',
            description: 'Count employees by department and sex.',
            hint: 'GROUP BY both columns',
            sampleAnswer: `SELECT Dno, Sex, COUNT(*) AS NumEmployees
FROM EMPLOYEE
GROUP BY Dno, Sex;`,
            keyPoints: ['GROUP BY multiple columns']
        },
        {
            id: 'gb6',
            title: 'Complex GROUP BY',
            difficulty: 'Hard',
            description: 'For each project, find the total hours worked and average hours, but only for projects with more than 2 employees working on them.',
            hint: 'Join WORKS_ON with PROJECT, use GROUP BY and HAVING',
            sampleAnswer: `SELECT P.Pname, SUM(W.Hours) AS TotalHours,
       AVG(W.Hours) AS AvgHours, COUNT(*) AS NumWorkers
FROM PROJECT P, WORKS_ON W
WHERE P.Pnumber = W.Pno
GROUP BY P.Pname
HAVING COUNT(*) > 2;`,
            keyPoints: ['JOIN with GROUP BY', 'HAVING with COUNT']
        }
    ],

    // ========================================
    // Subqueries - Type I (Non-Correlated)
    // ========================================
    subqueryType1: [
        {
            id: 'sq1_1',
            title: 'Subquery with IN',
            difficulty: 'Medium',
            description: 'Find employees who work in the "Research" department.',
            hint: 'Use subquery to find department number first',
            sampleAnswer: `SELECT * FROM EMPLOYEE
WHERE Dno IN (SELECT Dnumber FROM DEPARTMENT WHERE Dname = 'Research');`,
            keyPoints: ['IN with subquery', 'Non-correlated subquery']
        },
        {
            id: 'sq1_2',
            title: 'Subquery with NOT IN',
            difficulty: 'Medium',
            description: 'Find employees who do not work on any project.',
            hint: 'Use NOT IN with subquery on WORKS_ON',
            sampleAnswer: `SELECT * FROM EMPLOYEE
WHERE SSN NOT IN (SELECT ESSN FROM WORKS_ON);`,
            keyPoints: ['NOT IN', 'Finding non-matches']
        },
        {
            id: 'sq1_3',
            title: 'Subquery with Comparison',
            difficulty: 'Medium',
            description: 'Find employees who earn more than the average salary.',
            hint: 'Use > with subquery calculating AVG',
            sampleAnswer: `SELECT * FROM EMPLOYEE
WHERE Salary > (SELECT AVG(Salary) FROM EMPLOYEE);`,
            keyPoints: ['Scalar subquery', 'Comparison with aggregate']
        },
        {
            id: 'sq1_4',
            title: 'Subquery with MAX',
            difficulty: 'Medium',
            description: 'Find the employee(s) with the highest salary.',
            hint: 'Compare salary to MAX(Salary) subquery',
            sampleAnswer: `SELECT * FROM EMPLOYEE
WHERE Salary = (SELECT MAX(Salary) FROM EMPLOYEE);`,
            keyPoints: ['Subquery with MAX', 'Finding maximum']
        },
        {
            id: 'sq1_5',
            title: 'Nested Subqueries',
            difficulty: 'Hard',
            description: 'Find employees who work on projects controlled by the "Research" department.',
            hint: 'Nest subqueries: WORKS_ON -> PROJECT -> DEPARTMENT',
            sampleAnswer: `SELECT * FROM EMPLOYEE
WHERE SSN IN (
    SELECT ESSN FROM WORKS_ON
    WHERE Pno IN (
        SELECT Pnumber FROM PROJECT
        WHERE Dnum IN (
            SELECT Dnumber FROM DEPARTMENT
            WHERE Dname = 'Research'
        )
    )
);`,
            keyPoints: ['Nested subqueries', 'Multiple levels']
        }
    ],

    // ========================================
    // Subqueries - Type II (Correlated)
    // ========================================
    subqueryType2: [
        {
            id: 'sq2_1',
            title: 'EXISTS',
            difficulty: 'Hard',
            description: 'Find employees who have at least one dependent.',
            hint: 'Use EXISTS with correlated subquery',
            sampleAnswer: `SELECT * FROM EMPLOYEE E
WHERE EXISTS (
    SELECT * FROM DEPENDENT D
    WHERE D.ESSN = E.SSN
);`,
            keyPoints: ['EXISTS', 'Correlated subquery']
        },
        {
            id: 'sq2_2',
            title: 'NOT EXISTS',
            difficulty: 'Hard',
            description: 'Find employees who have NO dependents.',
            hint: 'Use NOT EXISTS with correlated subquery',
            sampleAnswer: `SELECT * FROM EMPLOYEE E
WHERE NOT EXISTS (
    SELECT * FROM DEPENDENT D
    WHERE D.ESSN = E.SSN
);`,
            keyPoints: ['NOT EXISTS', 'Finding non-matches']
        },
        {
            id: 'sq2_3',
            title: 'Correlated Subquery in WHERE',
            difficulty: 'Hard',
            description: 'Find employees who earn more than the average salary of their department.',
            hint: 'Correlated subquery references outer query\'s department',
            sampleAnswer: `SELECT * FROM EMPLOYEE E
WHERE Salary > (
    SELECT AVG(Salary) FROM EMPLOYEE
    WHERE Dno = E.Dno
);`,
            keyPoints: ['Correlated subquery', 'Reference to outer query']
        },
        {
            id: 'sq2_4',
            title: 'Division with NOT EXISTS',
            difficulty: 'Hard',
            description: 'Find employees who work on ALL projects controlled by department 5.',
            hint: 'Use double NOT EXISTS pattern for division',
            sampleAnswer: `SELECT * FROM EMPLOYEE E
WHERE NOT EXISTS (
    SELECT * FROM PROJECT P
    WHERE P.Dnum = 5
    AND NOT EXISTS (
        SELECT * FROM WORKS_ON W
        WHERE W.ESSN = E.SSN
        AND W.Pno = P.Pnumber
    )
);`,
            keyPoints: ['Division operation', 'Double NOT EXISTS']
        }
    ],

    // ========================================
    // Set Operations
    // ========================================
    setOps: [
        {
            id: 'so1',
            title: 'UNION',
            difficulty: 'Medium',
            description: 'Find all last names that appear in EMPLOYEE or as dependent names.',
            hint: 'Use UNION to combine two SELECT statements',
            sampleAnswer: `SELECT Lname FROM EMPLOYEE
UNION
SELECT Dependent_name FROM DEPENDENT;`,
            keyPoints: ['UNION', 'Combines results', 'Removes duplicates']
        },
        {
            id: 'so2',
            title: 'UNION ALL',
            difficulty: 'Medium',
            description: 'Same as above but keep duplicates.',
            hint: 'Use UNION ALL to keep duplicates',
            sampleAnswer: `SELECT Lname FROM EMPLOYEE
UNION ALL
SELECT Dependent_name FROM DEPENDENT;`,
            keyPoints: ['UNION ALL', 'Keeps duplicates']
        },
        {
            id: 'so3',
            title: 'INTERSECT',
            difficulty: 'Medium',
            description: 'Find SSNs of employees who are also supervisors.',
            hint: 'Intersect SSN with SuperSSN',
            sampleAnswer: `SELECT SSN FROM EMPLOYEE
INTERSECT
SELECT SuperSSN FROM EMPLOYEE WHERE SuperSSN IS NOT NULL;`,
            keyPoints: ['INTERSECT', 'Common values']
        },
        {
            id: 'so4',
            title: 'EXCEPT',
            difficulty: 'Medium',
            description: 'Find employees who do not have any dependents (using EXCEPT).',
            hint: 'Use EXCEPT between SSN and ESSN from DEPENDENT',
            sampleAnswer: `SELECT SSN FROM EMPLOYEE
EXCEPT
SELECT ESSN FROM DEPENDENT;`,
            keyPoints: ['EXCEPT', 'Set difference']
        }
    ],

    // ========================================
    // Views
    // ========================================
    views: [
        {
            id: 'v1',
            title: 'Create Simple View',
            difficulty: 'Medium',
            description: 'Create a view called DEPT_SUMMARY showing department name and number of employees.',
            hint: 'CREATE VIEW with GROUP BY query',
            sampleAnswer: `CREATE VIEW DEPT_SUMMARY AS
SELECT D.Dname, COUNT(*) AS NumEmployees
FROM DEPARTMENT D, EMPLOYEE E
WHERE D.Dnumber = E.Dno
GROUP BY D.Dname;`,
            keyPoints: ['CREATE VIEW', 'View with aggregation']
        },
        {
            id: 'v2',
            title: 'View for Data Hiding',
            difficulty: 'Medium',
            description: 'Create a view EMP_PUBLIC showing only Fname, Lname, and Dno (hiding salary and SSN).',
            hint: 'CREATE VIEW selecting only non-sensitive columns',
            sampleAnswer: `CREATE VIEW EMP_PUBLIC AS
SELECT Fname, Lname, Dno
FROM EMPLOYEE;`,
            keyPoints: ['CREATE VIEW', 'Column restriction', 'Security']
        },
        {
            id: 'v3',
            title: 'View with Join',
            difficulty: 'Medium',
            description: 'Create a view EMP_DEPT_INFO showing employee name with their department name.',
            hint: 'CREATE VIEW with JOIN in the SELECT',
            sampleAnswer: `CREATE VIEW EMP_DEPT_INFO AS
SELECT E.Fname, E.Lname, D.Dname
FROM EMPLOYEE E
INNER JOIN DEPARTMENT D ON E.Dno = D.Dnumber;`,
            keyPoints: ['CREATE VIEW', 'View with JOIN']
        },
        {
            id: 'v4',
            title: 'Query a View',
            difficulty: 'Easy',
            description: 'Using the DEPT_SUMMARY view, find departments with more than 5 employees.',
            hint: 'Query the view like a regular table',
            sampleAnswer: `SELECT * FROM DEPT_SUMMARY WHERE NumEmployees > 5;`,
            keyPoints: ['Query from view', 'Views as virtual tables']
        }
    ],

    // ========================================
    // INSERT Statements
    // ========================================
    insert: [
        {
            id: 'ins1',
            title: 'Insert Single Row',
            difficulty: 'Easy',
            description: 'Insert a new department: "Marketing", number 6, no manager yet.',
            hint: 'Use INSERT INTO with VALUES, use NULL for unknown',
            sampleAnswer: `INSERT INTO DEPARTMENT (Dname, Dnumber, MgrSSN, MgrStartDate)
VALUES ('Marketing', 6, NULL, NULL);`,
            keyPoints: ['INSERT INTO', 'VALUES', 'NULL for unknown']
        },
        {
            id: 'ins2',
            title: 'Insert with Column List',
            difficulty: 'Easy',
            description: 'Insert a new employee John Smith, SSN 999999999, salary 45000, in department 5.',
            hint: 'Specify columns you\'re providing values for',
            sampleAnswer: `INSERT INTO EMPLOYEE (SSN, Fname, Lname, Salary, Dno)
VALUES ('999999999', 'John', 'Smith', 45000, 5);`,
            keyPoints: ['Partial INSERT', 'Column specification']
        },
        {
            id: 'ins3',
            title: 'Insert from SELECT',
            difficulty: 'Medium',
            description: 'Insert all employees with salary > 60000 into a SENIOR_EMPLOYEE table (assume it has same structure).',
            hint: 'Use INSERT INTO ... SELECT',
            sampleAnswer: `INSERT INTO SENIOR_EMPLOYEE
SELECT * FROM EMPLOYEE WHERE Salary > 60000;`,
            keyPoints: ['INSERT ... SELECT', 'Bulk insert from query']
        }
    ],

    // ========================================
    // UPDATE Statements
    // ========================================
    update: [
        {
            id: 'upd1',
            title: 'Simple UPDATE',
            difficulty: 'Easy',
            description: 'Give all employees a 5% salary increase.',
            hint: 'UPDATE with SET using arithmetic',
            sampleAnswer: `UPDATE EMPLOYEE SET Salary = Salary * 1.05;`,
            keyPoints: ['UPDATE', 'SET', 'Arithmetic in SET']
        },
        {
            id: 'upd2',
            title: 'UPDATE with WHERE',
            difficulty: 'Easy',
            description: 'Give employees in department 5 a 10% raise.',
            hint: 'Add WHERE clause to limit affected rows',
            sampleAnswer: `UPDATE EMPLOYEE SET Salary = Salary * 1.10 WHERE Dno = 5;`,
            keyPoints: ['UPDATE with WHERE', 'Conditional update']
        },
        {
            id: 'upd3',
            title: 'UPDATE Multiple Columns',
            difficulty: 'Medium',
            description: 'For employee with SSN 123456789, change department to 4 and supervisor to 333445555.',
            hint: 'SET can update multiple columns with commas',
            sampleAnswer: `UPDATE EMPLOYEE
SET Dno = 4, SuperSSN = '333445555'
WHERE SSN = '123456789';`,
            keyPoints: ['UPDATE multiple columns', 'SET with comma']
        },
        {
            id: 'upd4',
            title: 'UPDATE with Subquery',
            difficulty: 'Hard',
            description: 'Set the manager of department "Research" to the employee with SSN 333445555.',
            hint: 'UPDATE with WHERE using subquery',
            sampleAnswer: `UPDATE DEPARTMENT
SET MgrSSN = '333445555'
WHERE Dname = 'Research';`,
            keyPoints: ['UPDATE specific row', 'Text comparison']
        }
    ],

    // ========================================
    // DELETE Statements
    // ========================================
    delete: [
        {
            id: 'del1',
            title: 'DELETE with WHERE',
            difficulty: 'Easy',
            description: 'Delete all dependents with relationship "Spouse".',
            hint: 'DELETE FROM with WHERE condition',
            sampleAnswer: `DELETE FROM DEPENDENT WHERE Relationship = 'Spouse';`,
            keyPoints: ['DELETE FROM', 'WHERE condition']
        },
        {
            id: 'del2',
            title: 'DELETE All Rows',
            difficulty: 'Easy',
            description: 'Delete all records from the WORKS_ON table.',
            hint: 'DELETE without WHERE deletes all rows',
            sampleAnswer: `DELETE FROM WORKS_ON;`,
            keyPoints: ['DELETE all rows', 'No WHERE = all rows']
        },
        {
            id: 'del3',
            title: 'DELETE with Subquery',
            difficulty: 'Hard',
            description: 'Delete all employees who do not work on any project.',
            hint: 'Use NOT IN with subquery',
            sampleAnswer: `DELETE FROM EMPLOYEE
WHERE SSN NOT IN (SELECT ESSN FROM WORKS_ON);`,
            keyPoints: ['DELETE with subquery', 'NOT IN']
        }
    ],

    // ========================================
    // Nested Queries in FROM (Derived Tables)
    // ========================================
    derivedTables: [
        {
            id: 'dt1',
            title: 'Aggregate of Aggregates',
            difficulty: 'Hard',
            description: 'Find the maximum average salary across all departments.',
            hint: 'First compute AVG per department, then MAX of those',
            sampleAnswer: `SELECT MAX(DeptAvg) AS MaxAvgSalary
FROM (
    SELECT Dno, AVG(Salary) AS DeptAvg
    FROM EMPLOYEE
    GROUP BY Dno
) AS DeptAverages;`,
            keyPoints: ['Derived table', 'Nested aggregate', 'Alias required']
        },
        {
            id: 'dt2',
            title: 'Find Department with Max Employees',
            difficulty: 'Hard',
            description: 'Find the department name that has the most employees.',
            hint: 'Use derived table to get counts, then find max',
            sampleAnswer: `SELECT D.Dname
FROM DEPARTMENT D, (
    SELECT Dno, COUNT(*) AS Cnt
    FROM EMPLOYEE
    GROUP BY Dno
) AS DeptCounts
WHERE D.Dnumber = DeptCounts.Dno
AND DeptCounts.Cnt = (
    SELECT MAX(Cnt) FROM (
        SELECT Dno, COUNT(*) AS Cnt
        FROM EMPLOYEE
        GROUP BY Dno
    ) AS AllCounts
);`,
            keyPoints: ['Derived tables in FROM', 'Nested aggregates']
        }
    ],

    // ========================================
    // Difference Problems (Multiple Methods)
    // ========================================
    difference: [
        {
            id: 'diff1',
            title: 'Method 1: NOT IN',
            difficulty: 'Medium',
            description: 'Find employees who have no dependents using NOT IN.',
            hint: 'SSN NOT IN (subquery of ESSN from DEPENDENT)',
            sampleAnswer: `SELECT * FROM EMPLOYEE
WHERE SSN NOT IN (SELECT ESSN FROM DEPENDENT);`,
            keyPoints: ['NOT IN', 'Difference via subquery']
        },
        {
            id: 'diff2',
            title: 'Method 2: NOT EXISTS',
            difficulty: 'Medium',
            description: 'Find employees who have no dependents using NOT EXISTS.',
            hint: 'NOT EXISTS (correlated subquery matching ESSN to SSN)',
            sampleAnswer: `SELECT * FROM EMPLOYEE E
WHERE NOT EXISTS (
    SELECT * FROM DEPENDENT D
    WHERE D.ESSN = E.SSN
);`,
            keyPoints: ['NOT EXISTS', 'Correlated difference']
        },
        {
            id: 'diff3',
            title: 'Method 3: LEFT JOIN with NULL',
            difficulty: 'Medium',
            description: 'Find employees who have no dependents using LEFT JOIN.',
            hint: 'LEFT JOIN then check for NULL in right table',
            sampleAnswer: `SELECT E.*
FROM EMPLOYEE E
LEFT JOIN DEPENDENT D ON E.SSN = D.ESSN
WHERE D.ESSN IS NULL;`,
            keyPoints: ['LEFT JOIN', 'IS NULL for no match']
        },
        {
            id: 'diff4',
            title: 'Method 4: EXCEPT',
            difficulty: 'Medium',
            description: 'Find SSNs of employees who have no dependents using EXCEPT.',
            hint: 'Employee SSNs EXCEPT dependent ESSNs',
            sampleAnswer: `SELECT SSN FROM EMPLOYEE
EXCEPT
SELECT ESSN FROM DEPENDENT;`,
            keyPoints: ['EXCEPT', 'Set difference']
        }
    ]
};

// Current exercise state
let currentCategory = 'createTable';
let currentExerciseIndex = 0;
let exerciseAttempts = {};
let exerciseCompleted = {};

// Initialize SQL Practice
function initSQLPractice() {
    loadProgress();
    renderCategoryNav();
    renderSQLReference();
    renderExercise();
}

// Render category navigation
function renderCategoryNav() {
    const nav = document.getElementById('sql-category-nav');
    if (!nav) return;

    const categories = [
        { id: 'createTable', name: 'CREATE TABLE', icon: '🏗️' },
        { id: 'alterDrop', name: 'ALTER/DROP', icon: '🔧' },
        { id: 'basicSelect', name: 'Basic SELECT', icon: '🔍' },
        { id: 'patternNull', name: 'Patterns & NULL', icon: '🎯' },
        { id: 'joins', name: 'JOINs', icon: '🔗' },
        { id: 'aggregates', name: 'Aggregates', icon: '📊' },
        { id: 'groupBy', name: 'GROUP BY', icon: '📁' },
        { id: 'subqueryType1', name: 'Subqueries I', icon: '📦' },
        { id: 'subqueryType2', name: 'Subqueries II', icon: '📦' },
        { id: 'setOps', name: 'Set Operations', icon: '∪' },
        { id: 'views', name: 'Views', icon: '👁️' },
        { id: 'insert', name: 'INSERT', icon: '➕' },
        { id: 'update', name: 'UPDATE', icon: '✏️' },
        { id: 'delete', name: 'DELETE', icon: '🗑️' },
        { id: 'derivedTables', name: 'Derived Tables', icon: '📋' },
        { id: 'difference', name: 'Difference', icon: '➖' }
    ];

    nav.innerHTML = categories.map(cat => {
        const exercises = sqlExercises[cat.id];
        const completed = exercises.filter(ex => exerciseCompleted[ex.id]).length;
        return `<button class="sql-cat-btn ${currentCategory === cat.id ? 'active' : ''}"
                        data-category="${cat.id}"
                        onclick="selectCategory('${cat.id}')">
            <span class="cat-icon">${cat.icon}</span>
            <span class="cat-name">${cat.name}</span>
            <span class="cat-progress">${completed}/${exercises.length}</span>
        </button>`;
    }).join('');
}

// Select category
function selectCategory(categoryId) {
    currentCategory = categoryId;
    currentExerciseIndex = 0;
    renderCategoryNav();
    renderExercise();
}

// Render SQL Reference sidebar
function renderSQLReference() {
    const sidebar = document.getElementById('sql-reference-sidebar');
    if (!sidebar) return;

    let html = '<h3>SQL Quick Reference</h3>';

    const sections = [
        { key: 'ddl', title: 'DDL (Definition)' },
        { key: 'dml', title: 'DML (Manipulation)' },
        { key: 'clauses', title: 'Clauses' },
        { key: 'joins', title: 'Joins' },
        { key: 'operators', title: 'Operators' },
        { key: 'aggregates', title: 'Aggregates' },
        { key: 'sets', title: 'Set Operations' },
        { key: 'constraints', title: 'Constraints' },
        { key: 'referential', title: 'Referential Actions' }
    ];

    sections.forEach(section => {
        html += `<div class="ref-section">
            <h4 class="ref-section-title" onclick="toggleRefSection(this)">${section.title} <span class="toggle-icon">▼</span></h4>
            <div class="ref-section-content">`;

        sqlReference[section.key].forEach(item => {
            html += `<div class="ref-item">
                <code class="ref-cmd">${item.cmd}</code>
                <div class="ref-syntax">${item.syntax}</div>
                <div class="ref-desc">${item.desc}</div>
            </div>`;
        });

        html += '</div></div>';
    });

    sidebar.innerHTML = html;
}

// Toggle reference section
function toggleRefSection(element) {
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

// Render current exercise
function renderExercise() {
    const container = document.getElementById('sql-exercise-container');
    if (!container) return;

    const exercises = sqlExercises[currentCategory];
    const exercise = exercises[currentExerciseIndex];

    const completed = exerciseCompleted[exercise.id] ? 'completed' : '';
    const attempts = exerciseAttempts[exercise.id] || 0;

    container.innerHTML = `
        <div class="exercise-header">
            <div class="exercise-nav">
                <button class="nav-btn" onclick="prevExercise()" ${currentExerciseIndex === 0 ? 'disabled' : ''}>← Previous</button>
                <span class="exercise-counter">${currentExerciseIndex + 1} / ${exercises.length}</span>
                <button class="nav-btn" onclick="nextExercise()" ${currentExerciseIndex === exercises.length - 1 ? 'disabled' : ''}>Next →</button>
            </div>
            <div class="exercise-meta">
                <span class="difficulty ${exercise.difficulty.toLowerCase()}">${exercise.difficulty}</span>
                ${completed ? '<span class="completed-badge">✓ Completed</span>' : ''}
            </div>
        </div>

        <div class="exercise-content">
            <h3 class="exercise-title">${exercise.title}</h3>
            <p class="exercise-description">${exercise.description}</p>

            <div class="key-points">
                <strong>Key Concepts:</strong> ${exercise.keyPoints.map(kp => `<span class="key-point">${kp}</span>`).join(' ')}
            </div>

            <div class="sql-input-area">
                <label for="sql-input">Your SQL Query:</label>
                <textarea id="sql-input" class="sql-input" placeholder="Write your SQL query here..." rows="8">${getSavedAnswer(exercise.id)}</textarea>
            </div>

            <div class="exercise-actions">
                <button class="btn hint-btn" onclick="showHint()">💡 Show Hint</button>
                <button class="btn check-btn" onclick="checkAnswer()">✓ Check Answer</button>
                <button class="btn answer-btn" onclick="showAnswer()">📖 Show Answer</button>
                <button class="btn primary mark-btn ${completed}" onclick="markExerciseComplete('${exercise.id}')">
                    ${completed ? '✓ Completed' : 'Mark Complete'}
                </button>
            </div>

            <div id="hint-box" class="hint-box" style="display: none;">
                <strong>Hint:</strong> ${exercise.hint}
            </div>

            <div id="answer-box" class="answer-box" style="display: none;">
                <h4>Sample Answer:</h4>
                <pre class="sample-answer">${escapeHtml(exercise.sampleAnswer)}</pre>
                <p class="note">Note: There may be multiple correct solutions!</p>
            </div>

            <div id="feedback-box" class="feedback-box" style="display: none;"></div>
        </div>

        <div class="schema-reminder">
            <h4>Database Schema Reference</h4>
            <pre class="schema-text">${practiceDatabase.description}</pre>
        </div>
    `;

    // Auto-save input
    document.getElementById('sql-input').addEventListener('input', (e) => {
        saveAnswer(exercise.id, e.target.value);
    });
}

// Navigation functions
function prevExercise() {
    if (currentExerciseIndex > 0) {
        currentExerciseIndex--;
        renderExercise();
    }
}

function nextExercise() {
    const exercises = sqlExercises[currentCategory];
    if (currentExerciseIndex < exercises.length - 1) {
        currentExerciseIndex++;
        renderExercise();
    }
}

// Show hint
function showHint() {
    const hintBox = document.getElementById('hint-box');
    hintBox.style.display = hintBox.style.display === 'none' ? 'block' : 'none';
}

// Show answer
function showAnswer() {
    const answerBox = document.getElementById('answer-box');
    answerBox.style.display = answerBox.style.display === 'none' ? 'block' : 'none';
}

// Check answer (basic keyword checking)
function checkAnswer() {
    const exercises = sqlExercises[currentCategory];
    const exercise = exercises[currentExerciseIndex];
    const userInput = document.getElementById('sql-input').value.toUpperCase().trim();
    const feedbackBox = document.getElementById('feedback-box');

    if (!userInput) {
        feedbackBox.innerHTML = '<span class="error">Please write a SQL query first.</span>';
        feedbackBox.style.display = 'block';
        return;
    }

    // Track attempts
    exerciseAttempts[exercise.id] = (exerciseAttempts[exercise.id] || 0) + 1;
    saveProgress();

    // Basic keyword checking
    let feedback = [];
    let correct = 0;
    let total = exercise.keyPoints.length;

    exercise.keyPoints.forEach(keyword => {
        const keywordUpper = keyword.toUpperCase().replace(/[^A-Z0-9 ]/g, '');
        if (userInput.includes(keywordUpper) || userInput.includes(keyword.toUpperCase())) {
            feedback.push(`<span class="check-correct">✓ Contains "${keyword}"</span>`);
            correct++;
        } else {
            feedback.push(`<span class="check-missing">✗ Missing or incorrect: "${keyword}"</span>`);
        }
    });

    // Additional syntax checks
    const syntaxChecks = [];

    // Check for common errors
    if (userInput.includes('= NULL') && !userInput.includes('IS NULL')) {
        syntaxChecks.push('<span class="check-warning">⚠ Use IS NULL instead of = NULL</span>');
    }
    if (userInput.includes('WHERE') && userInput.includes('HAVING') &&
        userInput.indexOf('WHERE') > userInput.indexOf('HAVING')) {
        syntaxChecks.push('<span class="check-warning">⚠ WHERE should come before HAVING</span>');
    }
    if (userInput.includes('GROUP BY') && userInput.includes('WHERE') &&
        userInput.indexOf('GROUP BY') < userInput.indexOf('WHERE')) {
        syntaxChecks.push('<span class="check-warning">⚠ WHERE should come before GROUP BY</span>');
    }

    const score = Math.round((correct / total) * 100);
    let resultClass = score >= 80 ? 'success' : score >= 50 ? 'partial' : 'error';

    feedbackBox.innerHTML = `
        <div class="feedback-header ${resultClass}">
            <strong>Score: ${score}%</strong> (${correct}/${total} key concepts found)
        </div>
        <div class="feedback-details">
            ${feedback.join('<br>')}
            ${syntaxChecks.length > 0 ? '<br><br>' + syntaxChecks.join('<br>') : ''}
        </div>
        <p class="note">Note: This is a basic check. Click "Show Answer" to compare with the sample solution.</p>
    `;
    feedbackBox.style.display = 'block';
}

// Mark exercise as complete
function markExerciseComplete(exerciseId) {
    exerciseCompleted[exerciseId] = true;
    saveProgress();
    renderCategoryNav();
    renderExercise();
}

// Save/Load functions
function saveAnswer(exerciseId, answer) {
    const saved = JSON.parse(localStorage.getItem('sqlPracticeAnswers') || '{}');
    saved[exerciseId] = answer;
    localStorage.setItem('sqlPracticeAnswers', JSON.stringify(saved));
}

function getSavedAnswer(exerciseId) {
    const saved = JSON.parse(localStorage.getItem('sqlPracticeAnswers') || '{}');
    return saved[exerciseId] || '';
}

function saveProgress() {
    localStorage.setItem('sqlExerciseAttempts', JSON.stringify(exerciseAttempts));
    localStorage.setItem('sqlExerciseCompleted', JSON.stringify(exerciseCompleted));
}

function loadProgress() {
    exerciseAttempts = JSON.parse(localStorage.getItem('sqlExerciseAttempts') || '{}');
    exerciseCompleted = JSON.parse(localStorage.getItem('sqlExerciseCompleted') || '{}');
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if on SQL practice section
    if (document.getElementById('sql-practice')) {
        initSQLPractice();
    }
});

// Make functions available globally
window.selectCategory = selectCategory;
window.prevExercise = prevExercise;
window.nextExercise = nextExercise;
window.showHint = showHint;
window.showAnswer = showAnswer;
window.checkAnswer = checkAnswer;
window.markExerciseComplete = markExerciseComplete;
window.toggleRefSection = toggleRefSection;
window.initSQLPractice = initSQLPractice;
