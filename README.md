
# 📚 Virtual Classroom Manager & Design Pattern Exercises

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

##  Overview

This repository contains my submission for the **2025-26 Coding Exercises**. The project is built in **TypeScript** and demonstrates:

* Implementation of **behavioral, creational, and structural design patterns** (Exercise 1).
* A **console-based Virtual Classroom Manager** (Exercise 2).

The focus is on **code quality, SOLID principles, defensive programming, validations, logging, and error handling**, rather than building a UI.

---

##  Features

### Virtual Classroom Manager

* Manage classrooms, students, and assignments.
* Schedule, submit, and track assignments.
* **Persistent storage using JSON files** (data survives across app restarts).
* Gold-standard **logging with Winston**.
* **Defensive programming** & exception handling across services.
* Input validation for robust user experience.

### Design Patterns Demonstration

* 2 **Behavioral** Patterns
* 2 **Creational** Patterns
* 2 **Structural** Patterns
* Each with **separate use cases** and explanations.

---

##  Tech Stack

* **Language**: TypeScript (strict mode enabled)
* **Runtime**: Node.js
* **Logging**: Winston
* **CLI**: Node.js console app
* **Persistence**: File-based repositories (JSON storage)

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

---

## Getting Started

### 1️ Clone the Repository

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
```

### 2️ Install Dependencies

```bash
npm install
```

### 3️ Run the Application

If you have `npm start` defined:

```bash
npm start
```

Or directly via ts-node:

```bash
npx ts-node src/index.ts
```

---

## Usage

After starting, you’ll see:

```
Virtual Classroom Manager — type "help" for commands.
```

---

##  Command Reference

| Command               | Usage                                                             | Description                   |                         |
| --------------------- | ----------------------------------------------------------------- | ----------------------------- | ----------------------- |
| `add_classroom`       | `add_classroom <classId> "<name>"`                                | Create a new classroom        |                         |
| `list_classrooms`     | `list_classrooms`                                                 | View all classrooms           |                         |
| `add_student`         | `add_student <studentId> <classId> "<studentName>"`               | Add student to classroom      |                         |
| `remove_student`      | `remove_student <studentId> <classId>`                            | Remove a student from a class |                         |
| `schedule_assignment` | `schedule_assignment <classId> "<title>" "<desc>" <dueDate>`      | Schedule assignment           |                         |
| `list_assignments`    | `list_assignments <classId>`                                      | View assignments in a class   |                         |
| `assignment_details`  | `assignment_details <assignmentId>`                               | View assignment details       |                         |
| `submit_assignment`   | `submit_assignment <studentId> <classId> <assignmentId> "<text>"` | Submit homework               |                         |
| `view_submissions`    | `view_submissions <classId> <assignmentId>`                       | View all submissions          |                         |
| `student_grades`      | `student_grades <studentId> <classId>`                            | View student’s grades         |                         |
| `set_grading`         | `set_grading <points                                              | letter>`                      | Change grading strategy |
| `help`                | `help`                                                            | List commands                 |                         |
| `exit`                | `exit`                                                            | Quit the app                  |                         |

---

##  Example Run

```bash
> add_classroom C1 "Maths Classroom"
Classroom C1 has been created.

> add_student S1 C1 "Alice"
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

* **Behavioral**

  * *Strategy* → grading system (letter vs points)
  * *Observer* → notify on assignment submission

* **Creational**

  * *Factory Method* → create repositories
  * *Singleton* → shared Winston logger

* **Structural**

  * *Adapter* → adapt file persistence for repository interface
  * *Decorator* → extend assignment objects with grading details

---

##  Best Practices Implemented

* **SOLID design principles**
* **Defensive programming** (validations at all layers)
* **Centralized logging** with Winston
* **Exception handling & transient error handling**
* **No hardcoded loops** like `while(true)` – CLI is event-driven

---

## How to Walk Through in Interview

1. Start with **`app.ts`** → explain initialization flow.
2. Show **repository layer (FileRepository)** → persistence strategy.
3. Show **service layer** → business rules + defensive checks.
4. Walk through **CommandController** → CLI commands → services.
5. Highlight **Logger** → Winston-based, file + console.
6. Demonstrate **Design Patterns** with the 6 use cases.

---

##  License

This project is for educational purposes as part of the **2025-26 Coding Exercises**.

