# Virtual Classroom Manager & Design Pattern Exercises  

##  Overview  
This repository contains my submission for the **2025-26 Coding Exercises**. The project is built in **TypeScript** and demonstrates:  

- Implementation of **behavioral, creational, and structural design patterns** (Exercise 1).  
- A **mini console-based application** simulating a **Virtual Classroom Manager** (Exercise 2).  

The focus is on **code quality, SOLID principles, defensive programming, validations, logging, and error handling**, rather than building a fancy UI.  

---

##  Features  

### Virtual Classroom Manager  
- Manage classrooms, students, and assignments.  
- Schedule, submit, and track assignments.  
- Persistent storage using JSON files.  
- Gold-standard **logging with Winston**.  
- **Defensive programming** & exception handling across services.  
- Input validation for robust user experience.  

### Design Patterns Demonstration  
-  2 Behavioral Patterns  
-  2 Creational Patterns  
-  2 Structural Patterns  
- Each demonstrated with **separate use cases**.  

---

##  Tech Stack  
- **Language**: TypeScript (strict mode enabled)  
- **Runtime**: Node.js  
- **Logging**: Winston  
- **CLI**: Node.js console app  
- **Persistence**: File-based repositories (JSON storage)  

---

## Project Structure  

```

├── src
│   ├── app.ts                 # Main application entry point
│   ├── index.ts               # Starts the CLI
│   ├── cli.ts                 # CLI logic
│   ├── controllers/           # Command controller
│   ├── services/              # Business logic (Classroom, Student, Assignment)
│   ├── repositories/          # File-based repositories
│   ├── models/                # Entities (Classroom, Student, Assignment)
│   ├── patterns/              # Design pattern use cases
│   ├── utils/                 # Logger, validation helpers
│   └── data/                  # JSON files for persistence
├── package.json
├── tsconfig.json
└── README.md

```

### Getting Started  

### 1️ Clone the Repository  
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
````

### 2️ Install Dependencies

```bash
npm install
```

### 3️ Run the Application

```bash
npx ts-node src/index.ts
```

---

##  Usage

After starting, you’ll see:

```
Virtual Classroom Manager — type "help" for commands.
```

Example commands:

```bash
> add_classroom C1 "Maths Classroom"
> add_student S1 C1 "Alice"
> schedule_assignment C1 "Algebra Homework" "Solve equations" "2025-10-05"
> list_assignments C1
> submit_assignment S1 C1 <assignmentId> "Here is my homework!"
```

---

##  Sample Output

```
2025-09-30T14:37:24.171Z [info] Initializing application
2025-09-30T14:37:24.175Z [info] Starting CLI
Virtual Classroom Manager — type "help" for commands.

> add_classroom C1
Classroom C1 has been created.

> add_student S1 C1 Alice
Student S1 has been enrolled in C1.

> schedule_assignment C1 "Algebra Homework" "Solve equations" 2025-10-05
Assignment for C1 has been scheduled.

> list_assignments C1
Assignments:
- 87f5a1b0-8a5c-4df1-b07e-dc0c99d8e8c2: Algebra Homework (due: 2025-10-05T00:00:00.000Z)

> submit_assignment S1 C1 87f5a1b0-8a5c-4df1-b07e-dc0c99d8e8c2 "Here is my homework!"
Assignment submitted by Student S1 in C1.
```

---

##  Exercise 1 – Design Patterns

Inside `/src/patterns/`, you’ll find:

* **Behavioral**: Strategy, Observer
* **Creational**: Factory Method, Singleton
* **Structural**: Adapter, Decorator

Each pattern has its **own use case with documentation** inside the file.

---

##  Best Practices Implemented

* **SOLID design principles**
* **Defensive programming** (validations at all layers)
* **Centralized logging** with Winston
* **Exception handling & transient error handling**
* **No hardcoded loops** like `while(true)` – CLI is event-driven

---

##  How to Walk Through in Interview

1. Start with **`app.ts`** → explain initialization flow.
2. Show **repository layer (FileRepository)** → persistence strategy.
3. Show **service layer** → business rules + defensive checks.
4. Walk through **CommandController** → maps CLI commands to services.
5. Highlight **Logger** → Winston-based, file + console.
6. Demonstrate **Design Patterns** with the 6 use cases.

---

##  License

This project is for educational purposes as part of the **2025-26 Coding Exercises**.

```

---

```
