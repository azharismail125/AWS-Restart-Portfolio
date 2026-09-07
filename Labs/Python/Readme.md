# Python Labs

Hands-on introductory Python exercises completed.
The topics progress from language basics through composite data structures and file I/O.

---

## Files

| File | Topic | What it does |
|---|---|---|
| `hello_world.py` | Getting Started | Prints "Hello World" |
| `numerical_data.py` | Numeric Types | Demonstrates `int`, `float`, `complex`, and `bool` with `type()` |
| `stringdata.py` | Strings | String creation, concatenation, and `format()` with user input |
| `categorize_values.py` | Type Identification | Iterates a mixed-type list and prints each item's data type |
| `collections112.py` | Collections | Creates and indexes a list, tuple, and dictionary |
| `conditionals.py` | Control Flow | `if / elif / else` branches driven by user input |
| `forloop.py` | Loops | `for` loop with `range()` counting 0–10 |
| `whileloop.py` | Loops | Number-guessing game using `while` and `random.randint()` |
| `composite-data.py` | Composite Data & File I/O | Reads `car_fleet.csv` into a list of dicts using `csv`, `copy.deepcopy()` |
| `car_fleet.csv` | Data File | Vehicle inventory used by `composite-data.py` |

---
**Collections file had to be renamed with random numbers due to *module shadowing* which is when a local file with the same name as a standard library module takes priority resulting in the file reference getting jumbled up.

## Concepts Covered

- Primitive types: `int`, `float`, `complex`, `bool`, `str`
- Collections: lists, tuples, dictionaries
- Control flow: `if / elif / else`, `for`, `while`
- User input and string formatting
- CSV file reading with the `csv` module
- Deep copying objects with `copy.deepcopy()`
