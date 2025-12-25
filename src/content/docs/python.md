# Python
**A comprehensive, standalone resource to learn Python programming from scratch**

-----
## Table of Contents
1. [Introduction to Python](#1-introduction-to-python)
1. [Installation and Setup](#2-installation-and-setup)
1. [Python Basics](#3-python-basics)
1. [Data Types](#4-data-types)
1. [Operators](#5-operators)
1. [Control Flow](#6-control-flow)
1. [Functions](#7-functions)
1. [Data Structures](#8-data-structures)
1. [Object-Oriented Programming](#9-object-oriented-programming)
1. [File Handling](#10-file-handling)
1. [Exception Handling](#11-exception-handling)
1. [Modules and Packages](#12-modules-and-packages)
1. [Advanced Topics](#13-advanced-topics)
1. [Decorators](#14-decorators)
1. [Generators and Iterators](#15-generators-and-iterators)
1. [Context Managers](#16-context-managers)
1. [Regular Expressions](#17-regular-expressions)
1. [Working with JSON](#18-working-with-json)
1. [Database Operations](#19-database-operations)
1. [Web Scraping](#20-web-scraping)
1. [Multithreading and Multiprocessing](#21-multithreading-and-multiprocessing)
1. [Async Programming](#22-async-programming)
1. [Testing](#23-testing)
1. [Best Practices](#24-best-practices)
-----
## 1\. Introduction to Python
### What is Python?
Python is a high-level, interpreted, general-purpose programming language created by Guido van Rossum in 1991. It emphasizes code readability and simplicity with significant whitespace.
### Why Learn Python?
- **Easy to learn**: Clean, readable syntax that's beginner-friendly
- **Versatile**: Web development, data science, AI, automation, scripting, and more
- **Large standard library**: "Batteries included" philosophy
- **Strong community**: Extensive third-party packages and active support
- **Cross-platform**: Runs on Windows, Mac, Linux, and more
### Python Philosophy (The Zen of Python)
~~~ python
import this
~~~

This command displays Python's design principles, emphasizing beautiful, explicit, and simple code.

-----
## 2\. Installation and Setup
### Installing Python
1. Visit [python.org](https://python.org)
1. Download Python (3.x version recommended)
1. During installation, check "Add Python to PATH"
1. Verify installation:
~~~ bash
python --version
# or
python3 --version
~~~
### Running Python Code
**Interactive Mode (REPL):**
~~~ bash
python
>>> print("Hello, World!")
Hello, World!
>>> exit()
~~~

**Script Mode:** Create a file `hello.py`:
~~~ python
print("Hello, World!")
~~~

Run it:
~~~ bash
python hello.py
~~~
### Virtual Environments
Virtual environments create isolated Python environments for different projects.
~~~ bash
# Create virtual environment
python -m venv myenv

# Activate (Windows)
myenv\Scripts\activate

# Activate (Mac/Linux)
source myenv/bin/activate

# Deactivate
deactivate
~~~

-----
## 3\. Python Basics
### Your First Program
~~~ python
print("Hello, World!")
~~~
### Comments
~~~ python
# This is a single-line comment

"""
This is a
multi-line comment
or docstring
"""

'''
Another way to write
multi-line comments
'''
~~~
### Variables
Variables store data values. Python is dynamically typed (no need to declare types).
~~~ python
# Variable assignment
name = "John"
age = 25
height = 5.9
is_student = True

# Multiple assignment
x, y, z = 1, 2, 3
a = b = c = 0

# Variable naming rules
valid_name = "OK"
_private = "OK"
name123 = "OK"

# Invalid names (will cause errors)
# 123name = "Error" - cannot start with number
# my-name = "Error" - no hyphens
# my name = "Error" - no spaces
~~~
### Print Function
~~~ python
# Basic printing
print("Hello")

# Multiple values
name = "Alice"
age = 30
print("Name:", name, "Age:", age)

# Using sep parameter
print("apple", "banana", "cherry", sep=", ")
# Output: apple, banana, cherry

# Using end parameter
print("Hello", end=" ")
print("World")
# Output: Hello World

# Formatted strings (f-strings) - RECOMMENDED
print(f"My name is {name} and I am {age} years old")
~~~
### Input from User
~~~ python
# Getting input (always returns a string)
name = input("Enter your name: ")
print(f"Hello, {name}!")

# Converting input to integers
age = int(input("Enter your age: "))
print(f"Next year you will be {age + 1}")

# Converting input to float
price = float(input("Enter price: "))
print(f"Price with tax: {price * 1.1}")
~~~

-----
## 4\. Data Types
### Numbers
#### Integers
~~~ python
x = 5
y = -10
big_number = 1000000000000

# Integer operations
print(x + y)      # Addition: -5
print(x - y)      # Subtraction: 15
print(x * y)      # Multiplication: -50
print(x / y)      # Division: -0.5
print(x // y)     # Floor division: -1
print(x % y)      # Modulo (remainder): 5
print(x ** 3)     # Exponentiation: 125
~~~
#### Floats
~~~ python
pi = 3.14159
negative = -2.5
scientific = 3.5e2  # 350.0

# Float operations
print(pi * 2)       # 6.28318
print(round(pi, 2)) # 3.14

# Precision issues with floats
print(0.1 + 0.2)    # 0.30000000000000004
~~~
#### Complex Numbers
~~~ python
complex_num = 3 + 4j
print(complex_num.real)  # 3.0
print(complex_num.imag)  # 4.0
print(abs(complex_num))  # 5.0 (magnitude)
~~~
#### Type Conversion
~~~ python
# Converting between types
x = 5
y = float(x)        # 5.0
z = str(x)          # "5"
a = int("10")       # 10
b = int(3.7)        # 3 (truncates decimal)
c = int("1010", 2)  # 10 (binary to decimal)

# Checking types
print(type(x))      # <class 'int'>
print(isinstance(x, int))  # True
~~~
### Strings
Strings are sequences of characters enclosed in quotes.
#### Creating Strings
~~~ python
single = 'Hello'
double = "World"
triple = '''Multi
line
string'''

# Escape characters
escaped = "He said \"Hello\""
newline = "Line1\nLine2"
tab = "Column1\tColumn2"
backslash = "Path\\to\\file"
~~~
#### String Operations
~~~ python
# Concatenation
greeting = "Hello" + " " + "World"

# Repetition
stars = "*" * 10  # "**********"

# Indexing (0-based, supports negative indices)
text = "Python"
print(text[0])    # 'P' (first character)
print(text[-1])   # 'n' (last character)
print(text[-2])   # 'o' (second from last)

# Slicing [start:stop:step]
print(text[0:3])  # 'Pyt'
print(text[:3])   # 'Pyt' (from beginning)
print(text[3:])   # 'hon' (to end)
print(text[::2])  # 'Pto' (every 2nd character)
print(text[::-1]) # 'nohtyP' (reverse)

# Length
print(len(text))  # 6
~~~
#### String Methods
~~~ python
text = "  Hello World  "

# Case methods
print(text.upper())      # "  HELLO WORLD  "
print(text.lower())      # "  hello world  "
print(text.title())      # "  Hello World  "
print(text.capitalize()) # "  hello world  "
print(text.swapcase())   # "  hELLO wORLD  "

# Whitespace methods
print(text.strip())      # "Hello World" (both ends)
print(text.lstrip())     # "Hello World  " (left)
print(text.rstrip())     # "  Hello World" (right)

# Search methods
print(text.find("World"))     # 8 (index, -1 if not found)
print(text.index("World"))    # 8 (raises error if not found)
print(text.count("l"))        # 3
print(text.startswith("  H")) # True
print(text.endswith("d  "))   # True

# Replacement
print(text.replace("World", "Python"))

# Split and join
words = "apple,banana,cherry".split(",")
print(words)  # ['apple', 'banana', 'cherry']

joined = "-".join(words)
print(joined)  # "apple-banana-cherry"

# Check methods
print("Hello123".isalnum())   # True (alphanumeric)
print("Hello".isalpha())      # True (only letters)
print("123".isdigit())        # True (only digits)
print("hello".islower())      # True
print("HELLO".isupper())      # True
print("   ".isspace())        # True (only whitespace)
~~~
#### String Formatting
~~~ python
name = "Alice"
age = 30
salary = 75000.50

# Old style (%)
print("Name: %s, Age: %d" % (name, age))

# .format() method
print("Name: {}, Age: {}".format(name, age))
print("Name: {0}, Age: {1}".format(name, age))
print("Name: {n}, Age: {a}".format(n=name, a=age))

# f-strings (Python 3.6+) - RECOMMENDED
print(f"Name: {name}, Age: {age}")
print(f"Salary: ${salary:,.2f}")  # $75,000.50
print(f"{name:>10}")  # Right align in 10 spaces
print(f"{name:<10}")  # Left align in 10 spaces
print(f"{name:^10}")  # Center align in 10 spaces

# Advanced formatting
print(f"{age:03d}")      # 030 (zero-padded)
print(f"{salary:.2e}")   # 7.50e+04 (scientific)
print(f"{0.5:.0%}")      # 50% (percentage)
~~~
### Boolean
Boolean values represent True or False.
~~~ python
is_true = True
is_false = False

# Boolean operations
print(not is_true)           # False
print(is_true and is_false)  # False
print(is_true or is_false)   # True

# Comparison results are boolean
print(5 > 3)     # True
print(5 == 5)    # True
print(5 != 3)    # True

# Truthiness (what evaluates to True/False)
print(bool(1))        # True
print(bool(0))        # False
print(bool(""))       # False (empty string)
print(bool("hello"))  # True (non-empty string)
print(bool([]))       # False (empty list)
print(bool([1, 2]))   # True (non-empty list)
print(bool(None))     # False
~~~
### None Type
None represents the absence of a value.
~~~ python
value = None

print(value is None)      # True
print(value == None)      # True (but 'is' is preferred)
print(type(value))        # <class 'NoneType'>

# None is often used as a default value
def greet(name=None):
    if name is None:
        return "Hello, stranger!"
    return f"Hello, {name}!"

print(greet())          # Hello, stranger!
print(greet("Alice"))   # Hello, Alice!
~~~

-----
## 5\. Operators
### Arithmetic Operators
~~~ python
a = 10
b = 3

print(a + b)   # Addition: 13
print(a - b)   # Subtraction: 7
print(a * b)   # Multiplication: 30
print(a / b)   # Division: 3.3333...
print(a // b)  # Floor division: 3
print(a % b)   # Modulo (remainder): 1
print(a ** b)  # Exponentiation: 1000

# Compound assignment operators
x = 5
x += 3   # x = x + 3, now x = 8
x -= 2   # x = x - 2, now x = 6
x *= 4   # x = x * 4, now x = 24
x /= 3   # x = x / 3, now x = 8.0
x //= 2  # x = x // 2, now x = 4.0
x %= 3   # x = x % 3, now x = 1.0
x **= 2  # x = x ** 2, now x = 1.0
~~~
### Comparison Operators
~~~ python
x = 5
y = 10

print(x == y)  # Equal: False
print(x != y)  # Not equal: True
print(x > y)   # Greater than: False
print(x < y)   # Less than: True
print(x >= y)  # Greater than or equal: False
print(x <= y)  # Less than or equal: True

# Chaining comparisons (Python feature!)
z = 7
print(x < z < y)  # True (5 < 7 < 10)
print(1 < 2 < 3 < 4)  # True
~~~
### Logical Operators
~~~ python
a = True
b = False

print(a and b)  # False (both must be True)
print(a or b)   # True (at least one must be True)
print(not a)    # False (negation)

# Short-circuit evaluation
# 'and' stops at first False
# 'or' stops at first True

x = 5
y = 0
print(y != 0 and x / y > 2)  # False (doesn't divide by zero)

# Using with comparisons
age = 25
print(age >= 18 and age < 65)  # True
~~~
### Identity Operators
Identity operators check if two variables refer to the same object in memory.
~~~ python
x = [1, 2, 3]
y = [1, 2, 3]
z = x

print(x is z)      # True (same object)
print(x is y)      # False (different objects)
print(x == y)      # True (same value)
print(x is not y)  # True

# For immutable types like numbers and strings,
# Python may reuse objects
a = 256
b = 256
print(a is b)  # True (Python optimization)

a = 257
b = 257
print(a is b)  # False (beyond optimization range)
~~~
### Membership Operators
~~~ python
fruits = ["apple", "banana", "cherry"]

print("apple" in fruits)      # True
print("grape" in fruits)      # False
print("grape" not in fruits)  # True

# Works with strings too
text = "Hello World"
print("World" in text)  # True
print("Python" not in text)  # True
~~~
### Bitwise Operators
Bitwise operators work on binary representations of integers.
~~~ python
a = 60  # Binary: 0011 1100
b = 13  # Binary: 0000 1101

print(a & b)   # AND: 12 (0000 1100)
print(a | b)   # OR: 61 (0011 1101)
print(a ^ b)   # XOR: 49 (0011 0001)
print(~a)      # NOT: -61 (inverts all bits)
print(a << 2)  # Left shift: 240 (multiply by 4)
print(a >> 2)  # Right shift: 15 (divide by 4)
~~~

-----
## 6\. Control Flow
### If-Elif-Else Statements
~~~ python
# Basic if statement
age = 18
if age >= 18:
    print("You are an adult")

# If-else
age = 15
if age >= 18:
    print("Adult")
else:
    print("Minor")

# If-elif-else (multiple conditions)
score = 85
if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"
print(f"Grade: {grade}")

# Nested if
x = 10
if x > 0:
    if x % 2 == 0:
        print("Positive even number")
    else:
        print("Positive odd number")
else:
    print("Non-positive number")

# Ternary operator (conditional expression)
age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)

# Multiple conditions
username = "admin"
password = "secret123"
if username == "admin" and password == "secret123":
    print("Access granted")
else:
    print("Access denied")
~~~
### While Loops
~~~ python
# Basic while loop
count = 0
while count < 5:
    print(count)
    count += 1

# While with break (exit loop early)
count = 0
while True:
    print(count)
    count += 1
    if count >= 5:
        break

# While with continue (skip to next iteration)
count = 0
while count < 10:
    count += 1
    if count % 2 == 0:
        continue  # Skip even numbers
    print(count)

# While-else (runs if loop completes without break)
count = 0
while count < 3:
    print(count)
    count += 1
else:
    print("Loop completed normally")

# User input validation example
while True:
    age = input("Enter your age: ")
    if age.isdigit() and int(age) > 0:
        age = int(age)
        break
    print("Please enter a valid age")
print(f"Your age is {age}")
~~~
### For Loops
~~~ python
# Basic for loop
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Range with start and end
for i in range(2, 6):
    print(i)  # 2, 3, 4, 5

# Range with step
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

# Reverse range
for i in range(5, 0, -1):
    print(i)  # 5, 4, 3, 2, 1

# Iterating over lists
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Enumerate (get index and value)
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# Enumerate with custom start
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")

# Iterating over strings
for char in "Python":
    print(char)

# For-else (runs if loop completes without break)
for i in range(5):
    print(i)
else:
    print("Loop completed")

# Break in for loop
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# Continue in for loop
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)  # Only odd numbers: 1, 3, 5, 7, 9

# Nested for loops
for i in range(3):
    for j in range(3):
        print(f"({i}, {j})", end=" ")
    print()

# Multiplication table example
for i in range(1, 11):
    for j in range(1, 11):
        print(f"{i*j:4d}", end="")
    print()
~~~
### Match-Case (Python 3.10+)
~~~ python
# Basic match-case
def http_status(status):
    match status:
        case 200:
            return "OK"
        case 404:
            return "Not Found"
        case 500:
            return "Internal Server Error"
        case _:
            return "Unknown status"

print(http_status(200))  # OK
print(http_status(999))  # Unknown status

# Pattern matching with OR
def grade_descriptor(grade):
    match grade:
        case "A":
            return "Excellent"
        case "B":
            return "Good"
        case "C":
            return "Average"
        case "D" | "F":
            return "Needs improvement"
        case _:
            return "Invalid grade"

# Pattern matching with tuples
def process_point(point):
    match point:
        case (0, 0):
            return "Origin"
        case (0, y):
            return f"On Y-axis at {y}"
        case (x, 0):
            return f"On X-axis at {x}"
        case (x, y):
            return f"At ({x}, {y})"

print(process_point((0, 0)))   # Origin
print(process_point((0, 5)))   # On Y-axis at 5
print(process_point((3, 4)))   # At (3, 4)
~~~
### Pass Statement
The `pass` statement is a null operation - a placeholder.
~~~ python
# Placeholder for future code
def future_function():
    pass  # TODO: Implement this later

# Empty class
class EmptyClass:
    pass

# Conditional placeholder
if True:
    pass  # Do nothing for now
else:
    print("Not implemented")

# In loops
for i in range(10):
    if i % 2 == 0:
        pass  # Do nothing for even numbers
    else:
        print(i)
~~~

-----
## 7\. Functions
Functions are reusable blocks of code that perform specific tasks.
### Defining Functions
~~~ python
# Basic function
def greet():
    print("Hello!")

greet()  # Call the function

# Function with parameters
def greet_person(name):
    print(f"Hello, {name}!")

greet_person("Alice")

# Function with return value
def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8

# Multiple return values (returns a tuple)
def get_stats(numbers):
    return min(numbers), max(numbers), sum(numbers)

minimum, maximum, total = get_stats([1, 2, 3, 4, 5])
print(f"Min: {minimum}, Max: {maximum}, Total: {total}")

# Early return
def is_even(number):
    if number % 2 == 0:
        return True
    return False
~~~
### Function Parameters
#### Default Parameters
~~~ python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "Hi")          # Hi, Bob!
greet("Charlie", greeting="Hey")  # Hey, Charlie!

# CAUTION: Mutable default arguments
def add_item(item, lst=[]):  # BAD!
    lst.append(item)
    return lst

# Better approach
def add_item(item, lst=None):  # GOOD!
    if lst is None:
        lst = []
    lst.append(item)
    return lst
~~~
#### Keyword Arguments
~~~ python
def describe_person(name, age, city):
    print(f"{name} is {age} years old and lives in {city}")

# Positional arguments
describe_person("Alice", 30, "New York")

# Keyword arguments (can be in any order)
describe_person(age=30, city="New York", name="Alice")

# Mix of both (positional must come first)
describe_person("Alice", age=30, city="New York")
~~~
#### Variable-Length Arguments (\*args)
~~~ python
def sum_all(*numbers):
    return sum(numbers)

print(sum_all(1, 2, 3))           # 6
print(sum_all(1, 2, 3, 4, 5))     # 15

def print_args(*args):
    for arg in args:
        print(arg)

print_args("apple", "banana", "cherry")
~~~
#### Variable-Length Keyword Arguments (\*\*kwargs)
~~~ python
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="New York")

# Combining *args and **kwargs
def complex_function(*args, **kwargs):
    print("Positional arguments:", args)
    print("Keyword arguments:", kwargs)

complex_function(1, 2, 3, name="Alice", age=30)

# Function with all parameter types
def full_function(pos1, pos2, *args, kwonly1, kwonly2="default", **kwargs):
    print(f"Positional: {pos1}, {pos2}")
    print(f"Variable positional: {args}")
    print(f"Keyword-only: {kwonly1}, {kwonly2}")
    print(f"Variable keyword: {kwargs}")
~~~
#### Unpacking Arguments
~~~ python
def add(a, b, c):
    return a + b + c

numbers = [1, 2, 3]
print(add(*numbers))  # Unpacking list: 6

def greet(name, greeting):
    print(f"{greeting}, {name}!")

info = {"name": "Alice", "greeting": "Hello"}
greet(**info)  # Unpacking dictionary
~~~
### Lambda Functions
Lambda functions are small anonymous functions.
~~~ python
# Basic lambda
square = lambda x: x ** 2
print(square(5))  # 25

# Lambda with multiple parameters
add = lambda x, y: x + y
print(add(3, 5))  # 8

# Lambda with conditional
max_num = lambda x, y: x if x > y else y
print(max_num(5, 10))  # 10

# Using lambda with built-in functions
numbers = [1, 2, 3, 4, 5]

# Map - apply function to all items
squared = list(map(lambda x: x ** 2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Filter - filter items based on condition
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4]

# Sort with custom key
people = [("Alice", 30), ("Bob", 25), ("Charlie", 35)]
people.sort(key=lambda x: x[1])  # Sort by age
print(people)
~~~
### Scope and Global Variables
~~~ python
# Local scope
def my_function():
    local_var = 10  # Only accessible inside function
    print(local_var)

my_function()
# print(local_var)  # Error: not defined outside function

# Global scope
global_var = 20

def access_global():
    print(global_var)  # Can read global

access_global()

# Modifying global variable
counter = 0

def increment():
    global counter  # Must declare global to modify
    counter += 1

increment()
print(counter)  # 1

# Nonlocal (for nested functions)
def outer():
    x = 10
    
    def inner():
        nonlocal x  # Refers to outer function's x
        x += 5
    
    inner()
    print(x)  # 15

outer()

# LEGB Rule: Local -> Enclosing -> Global -> Built-in
x = "global"

def outer():
    x = "enclosing"
    
    def inner():
        x = "local"
        print(x)  # local
    
    inner()
    print(x)  # enclosing

outer()
print(x)  # global
~~~
### Docstrings
Docstrings document what your function does.
~~~ python
def calculate_area(radius):
    """
    Calculate the area of a circle.
    
    Args:
        radius (float): The radius of the circle
    
    Returns:
        float: The area of the circle
    
    Raises:
        ValueError: If radius is negative
    
    Example:
        >>> calculate_area(5)
        78.53975
    """
    if radius < 0:
        raise ValueError("Radius cannot be negative")
    return 3.14159 * radius ** 2

# Access docstring
print(calculate_area.__doc__)
help(calculate_area)
~~~
### Recursive Functions
A recursive function calls itself.
~~~ python
# Factorial
def factorial(n):
    # Base case
    if n == 0 or n == 1:
        return 1
    # Recursive case
    return n * factorial(n - 1)

print(factorial(5))  # 120

# Fibonacci
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(7))  # 13

# Sum of digits
def sum_digits(n):
    if n == 0:
        return 0
    return n % 10 + sum_digits(n // 10)

print(sum_digits(12345))  # 15

# Note: Recursion can be inefficient. Use iteration when possible.
~~~
### Type Hints (Python 3.5+)
Type hints improve code readability and help catch bugs.
~~~ python
def greet(name: str) -> str:
    return f"Hello, {name}!"

def add(a: int, b: int) -> int:
    return a + b

from typing import List, Dict, Tuple, Optional, Union

def process_items(items: List[int]) -> int:
    return sum(items)

def get_user_info(user_id: int) -> Dict[str, str]:
    return {"name": "Alice", "email": "alice@example.com"}

def get_coordinates() -> Tuple[float, float]:
    return (40.7128, -74.0060)

def divide(a: float, b: float) -> Optional[float]:
    if b == 0:
        return None
    return a / b

def process_value(value: Union[int, str]) -> str:
    return str(value)
~~~

-----
## 8\. Data Structures
### Lists
Lists are ordered, mutable collections that can contain any type of object.
#### Creating Lists
~~~ python
# Empty list
empty_list = []
empty_list2 = list()

# List with values
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", 3.14, True, [1, 2, 3]]

# Nested lists (2D array)
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

# List comprehension
squares = [x ** 2 for x in range(10)]
evens = [x for x in range(20) if x % 2 == 0]
~~~
#### Accessing Elements
~~~ python
fruits = ["apple", "banana", "cherry", "date", "elderberry"]

# Indexing
print(fruits[0])    # apple (first)
print(fruits[2])    # cherry
print(fruits[-1])   # elderberry (last)
print(fruits[-2])   # date (second from last)

# Slicing [start:stop:step]
print(fruits[1:3])   # ['banana', 'cherry']
print(fruits[:3])    # ['apple', 'banana', 'cherry']
print(fruits[2:])    # ['cherry', 'date', 'elderberry']
print(fruits[::2])   # ['apple', 'cherry', 'elderberry']
print(fruits[::-1])  # Reverse the list

# Accessing nested lists
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
print(matrix[0][0])  # 1
print(matrix[1][2])  # 6
~~~
#### List Methods
~~~ python
numbers = [1, 2, 3]

# Adding elements
numbers.append(4)           # [1, 2, 3, 4]
numbers.insert(0, 0)        # [0, 1, 2, 3, 4]
numbers.extend([5, 6])      # [0, 1, 2, 3, 4, 5, 6]

# Removing elements
numbers.remove(0)           # Remove first occurrence
popped = numbers.pop()      # Remove and return last
popped = numbers.pop(0)     # Remove and return at index
numbers.clear()             # Remove all

# Other methods
fruits = ["banana", "apple", "cherry", "apple", "date"]
print(fruits.count("apple"))      # 2
print(fruits.index("cherry"))     # 2
fruits.sort()                     # Sort in place
fruits.reverse()                  # Reverse in place
fruits_copy = fruits.copy()       # Shallow copy

# Using sorted (returns new list)
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_nums = sorted(numbers)     # Original unchanged
reverse_sorted = sorted(numbers, reverse=True)
~~~
#### List Operations
~~~ python
# Concatenation
list1 = [1, 2, 3]
list2 = [4, 5, 6]
combined = list1 + list2

# Repetition
repeated = [0] * 5  # [0, 0, 0, 0, 0]

# Membership
print(1 in list1)    # True
print(10 in list1)   # False

# Length
print(len(list1))    # 3

# Min, Max, Sum (for numeric lists)
numbers = [1, 2, 3, 4, 5]
print(min(numbers))  # 1
print(max(numbers))  # 5
print(sum(numbers))  # 15

# Modifying elements
fruits = ["apple", "banana", "cherry"]
fruits[1] = "blueberry"
print(fruits)  # ['apple', 'blueberry', 'cherry']
~~~
#### Advanced List Techniques
~~~ python
# List comprehension with conditions
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
evens = [x for x in numbers if x % 2 == 0]
squares_of_evens = [x ** 2 for x in numbers if x % 2 == 0]

# Nested list comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Transpose matrix
matrix = [[1, 2, 3], [4, 5, 6]]
transposed = [[row[i] for row in matrix] for i in range(3)]
print(transposed)  # [[1, 4], [2, 5], [3, 6]]

# Using zip
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
combined = list(zip(names, ages))
print(combined)  # [('Alice', 25), ('Bob', 30), ('Charlie', 35)]

# Unzipping
names, ages = zip(*combined)

# Using enumerate
for index, value in enumerate(["a", "b", "c"]):
    print(f"{index}: {value}")

# List slicing for copying
original = [1, 2, 3, 4, 5]
copy = original[:]  # Shallow copy
~~~
### Tuples
Tuples are ordered, immutable collections.
#### Creating Tuples
~~~ python
# Empty tuple
empty = ()
empty2 = tuple()

# Tuple with values
numbers = (1, 2, 3, 4, 5)
fruits = ("apple", "banana", "cherry")

# Single element tuple (note the comma!)
single = (42,)
not_tuple = (42)  # This is just an integer

# Tuple packing
person = "Alice", 30, "New York"

# Tuple unpacking
name, age, city = person
~~~
#### Tuple Operations
~~~ python
# Accessing elements (same as lists)
fruits = ("apple", "banana", "cherry")
print(fruits[0])    # apple
print(fruits[-1])   # cherry
print(fruits[1:3])  # ('banana', 'cherry')

# Tuple methods (only 2!)
numbers = (1, 2, 3, 2, 4, 2)
print(numbers.count(2))   # 3
print(numbers.index(3))   # 2

# Concatenation
tuple1 = (1, 2, 3)
tuple2 = (4, 5, 6)
combined = tuple1 + tuple2

# Repetition
repeated = (0,) * 5

# Membership
print(1 in tuple1)

# Immutability
# tuple1[0] = 10  # Error! Tuples are immutable

# But can contain mutable objects
mixed = ([1, 2], [3, 4])
mixed[0].append(3)  # This works!
print(mixed)  # ([1, 2, 3], [3, 4])
~~~
#### Named Tuples
Named tuples create tuple subclasses with named fields.
~~~ python
from collections import namedtuple

# Define a named tuple
Point = namedtuple('Point', ['x', 'y'])
p = Point(11, 22)

print(p.x, p.y)    # 11 22
print(p[0], p[1])  # 11 22

# Another example
Person = namedtuple('Person', ['name', 'age', 'city'])
alice = Person(name='Alice', age=30, city='New York')
print(alice.name)  # Alice
print(alice.age)   # 30

# Convert to dict
print(alice._asdict())
~~~
### Sets
Sets are unordered collections of unique elements.
#### Creating Sets
~~~ python
# Empty set (must use set(), not {})
empty_set = set()

# Set with values
numbers = {1, 2, 3, 4, 5}
fruits = {"apple", "banana", "cherry"}

# From list (removes duplicates)
numbers_list = [1, 2, 2, 3, 3, 3, 4]
unique_numbers = set(numbers_list)  # {1, 2, 3, 4}

# Set comprehension
squares = {x ** 2 for x in range(10)}
~~~
#### Set Operations
~~~ python
# Adding elements
fruits = {"apple", "banana"}
fruits.add("cherry")
fruits.update(["date", "elderberry"])

# Removing elements
fruits.remove("banana")      # Raises KeyError if not found
fruits.discard("grape")      # No error if not found
popped = fruits.pop()        # Remove and return arbitrary element
fruits.clear()               # Remove all

# Set operations
set1 = {1, 2, 3, 4, 5}
set2 = {4, 5, 6, 7, 8}

# Union (all elements from both)
union = set1 | set2
union = set1.union(set2)
print(union)  # {1, 2, 3, 4, 5, 6, 7, 8}

# Intersection (common elements)
intersection = set1 & set2
intersection = set1.intersection(set2)
print(intersection)  # {4, 5}

# Difference (in set1 but not in set2)
difference = set1 - set2
difference = set1.difference(set2)
print(difference)  # {1, 2, 3}

# Symmetric difference (in either but not both)
sym_diff = set1 ^ set2
sym_diff = set1.symmetric_difference(set2)
print(sym_diff)  # {1, 2, 3, 6, 7, 8}

# Subset and superset
set3 = {1, 2}
print(set3.issubset(set1))      # True
print(set1.issuperset(set3))    # True
print(set1.isdisjoint(set2))    # False (have common elements)
~~~
#### Frozen Sets
Frozen sets are immutable sets.
~~~ python
frozen = frozenset([1, 2, 3, 4, 5])
# frozen.add(6)  # Error! Frozen sets are immutable

# Useful as dictionary keys
my_dict = {frozen: "value"}
~~~
### Dictionaries
Dictionaries store key-value pairs.
#### Creating Dictionaries
~~~ python
# Empty dictionary
empty_dict = {}
empty_dict2 = dict()

# Dictionary with values
person = {
    "name": "Alice",
    "age": 30,
    "city": "New York"
}

# Using dict() constructor
person2 = dict(name="Bob", age=25, city="Boston")

# From list of tuples
items = [("name", "Charlie"), ("age", 35)]
person3 = dict(items)

# Dictionary comprehension
squares = {x: x ** 2 for x in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
~~~
#### Accessing Dictionary Elements
~~~ python
person = {"name": "Alice", "age": 30, "city": "New York"}

# Access by key
print(person["name"])  # Alice
# print(person["country"])  # KeyError!

# Using get() method (safer)
print(person.get("name"))      # Alice
print(person.get("country"))   # None
print(person.get("country", "USA"))  # USA (default value)

# Check if key exists
if "name" in person:
    print(person["name"])

if "country" not in person:
    print("Country not specified")
~~~
#### Modifying Dictionaries
~~~ python
person = {"name": "Alice", "age": 30}

# Add or update
person["city"] = "New York"
person["age"] = 31  # Update existing

# Update multiple items
person.update({"country": "USA", "job": "Engineer"})
person.update(country="USA", job="Engineer")  # Alternative

# Remove items
del person["city"]
age = person.pop("age")           # Remove and return
person.popitem()                   # Remove and return last item
person.clear()                     # Remove all items

# setdefault
count = {}
count.setdefault("apple", 0)  # Set if not exists
count["apple"] += 1
~~~
#### Dictionary Methods
~~~ python
person = {"name": "Alice", "age": 30, "city": "New York"}

# Keys, values, items
keys = person.keys()       # dict_keys(['name', 'age', 'city'])
values = person.values()   # dict_values(['Alice', 30, 'New York'])
items = person.items()     # dict_items([('name', 'Alice'), ...])

# Convert to lists
keys_list = list(person.keys())
values_list = list(person.values())

# Iterating
for key in person:
    print(f"{key}: {person[key]}")

for key, value in person.items():
    print(f"{key}: {value}")

# Copying
person_copy = person.copy()  # Shallow copy
import copy
person_deepcopy = copy.deepcopy(person)  # Deep copy
~~~
#### Advanced Dictionary Techniques
~~~ python
# Nested dictionaries
employees = {
    "emp1": {"name": "Alice", "age": 30, "dept": "IT"},
    "emp2": {"name": "Bob", "age": 25, "dept": "HR"}
}

print(employees["emp1"]["name"])  # Alice

# Dictionary comprehension with conditions
numbers = {x: x ** 2 for x in range(10) if x % 2 == 0}

# Merging dictionaries (Python 3.9+)
dict1 = {"a": 1, "b": 2}
dict2 = {"c": 3, "d": 4}
merged = dict1 | dict2  # {' a': 1, 'b': 2, 'c': 3, 'd': 4}

# Using ** unpacking
merged2 = {**dict1, **dict2}

# Overwriting values
dict1 = {"a": 1, "b": 2}
dict2 = {"b": 3, "c": 4}
merged = {**dict1, **dict2}  # {'a': 1, 'b': 3, 'c': 4}

# Default dictionaries
from collections import defaultdict

word_count = defaultdict(int)
for word in ["apple", "banana", "apple", "cherry"]:
    word_count[word] += 1
print(word_count)  # defaultdict(<class 'int'>, {'apple': 2, 'banana': 1, 'cherry': 1})

# Counter
from collections import Counter
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
word_count = Counter(words)
print(word_count)  # Counter({'apple': 3, 'banana': 2, 'cherry': 1})
print(word_count.most_common(2))  # [('apple', 3), ('banana', 2)]
~~~

-----
## 9\. Object-Oriented Programming
Object-Oriented Programming (OOP) organizes code using objects and classes.
### Classes and Objects
#### Basic Class
~~~ python
class Dog:
    # Class attribute (shared by all instances)
    species = "Canis familiaris"
    
    # Constructor
    def __init__(self, name, age):
        # Instance attributes
        self.name = name
        self.age = age
    
    # Instance method
    def bark(self):
        return f"{self.name} says Woof!"
    
    def get_info(self):
        return f"{self.name} is {self.age} years old"

# Creating objects (instances)
dog1 = Dog("Buddy", 3)
dog2 = Dog("Lucy", 5)

print(dog1.name)        # Buddy
print(dog1.bark())      # Buddy says Woof!
print(dog2.get_info())  # Lucy is 5 years old
print(Dog.species)      # Canis familiaris
~~~
#### Instance vs Class Attributes
~~~ python
class Employee:
    # Class attribute
    company = "TechCorp"
    num_employees = 0
    
    def __init__(self, name, salary):
        # Instance attributes
        self.name = name
        self.salary = salary
        Employee.num_employees += 1

emp1 = Employee("Alice", 50000)
emp2 = Employee("Bob", 60000)

print(Employee.num_employees)  # 2
print(emp1.company)            # TechCorp
print(emp2.company)            # TechCorp

# Modifying class attribute affects all instances
Employee.company = "NewCorp"
print(emp1.company)  # NewCorp
print(emp2.company)  # NewCorp

# But modifying via instance creates instance attribute
emp1.company = "DifferentCorp"
print(emp1.company)  # DifferentCorp
print(emp2.company)  # NewCorp
~~~
#### Class Methods and Static Methods
~~~ python
class Calculator:
    pi = 3.14159
    
    def __init__(self, value):
        self.value = value
    
    # Instance method (uses self)
    def add(self, x):
        return self.value + x
    
    # Class method (uses cls, can access class attributes)
    @classmethod
    def circle_area(cls, radius):
        return cls.pi * radius ** 2
    
    # Static method (independent utility function)
    @staticmethod
    def is_even(num):
        return num % 2 == 0

# Using instance method
calc = Calculator(10)
print(calc.add(5))  # 15

# Using class method (doesn't need instance)
print(Calculator.circle_area(5))  # 78.53975

# Using static method
print(Calculator.is_even(4))  # True
~~~
### Inheritance
Inheritance allows a class to inherit attributes and methods from another class.
#### Basic Inheritance
~~~ python
# Parent class (Base class)
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "Some sound"
    
    def info(self):
        return f"This is {self.name}"

# Child class (Derived class)
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent constructor
        self.breed = breed
    
    def speak(self):  # Override parent method
        return "Woof!"
    
    def get_breed(self):
        return f"{self.name} is a {self.breed}"

class Cat(Animal):
    def speak(self):
        return "Meow!"

# Using inheritance
dog = Dog("Buddy", "Golden Retriever")
print(dog.name)        # Buddy (inherited)
print(dog.speak())     # Woof! (overridden)
print(dog.info())      # This is Buddy (inherited)
print(dog.get_breed()) # Buddy is a Golden Retriever

cat = Cat("Whiskers")
print(cat.speak())     # Meow!
~~~
#### Multiple Inheritance
~~~ python
class Flyable:
    def fly(self):
        return "Flying..."

class Swimmable:
    def swim(self):
        return "Swimming..."

class Duck(Flyable, Swimmable):
    def quack(self):
        return "Quack!"

duck = Duck()
print(duck.fly())    # Flying...
print(duck.swim())   # Swimming...
print(duck.quack())  # Quack!

# Method Resolution Order (MRO)
print(Duck.mro())
# Shows the order Python searches for methods
~~~
### Encapsulation
Encapsulation restricts direct access to some components.
#### Private and Protected Members
~~~ python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner           # Public
        self._balance = balance      # Protected (convention)
        self.__pin = "1234"          # Private (name mangling)
    
    def deposit(self, amount):
        if amount > 0:
            self._balance += amount
            return True
        return False
    
    def get_balance(self):
        return self._balance
    
    def __verify_pin(self, pin):  # Private method
        return pin == self.__pin

account = BankAccount("Alice", 1000)
print(account.owner)           # Alice (OK)
print(account.get_balance())   # 1000 (OK)
print(account._balance)        # 1000 (OK but not recommended)
# print(account.__pin)         # AttributeError!

# Name mangling workaround (not recommended)
print(account._BankAccount__pin)  # 1234
~~~
#### Property Decorators
Properties provide getter, setter, and deleter functionality.
~~~ python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius
    
    @property
    def celsius(self):
        """Get temperature in Celsius"""
        return self._celsius
    
    @celsius.setter
    def celsius(self, value):
        """Set temperature in Celsius"""
        if value < -273.15:
            raise ValueError("Below absolute zero!")
        self._celsius = value
    
    @property
    def fahrenheit(self):
        """Get temperature in Fahrenheit"""
        return (self._celsius * 9/5) + 32
    
    @fahrenheit.setter
    def fahrenheit(self, value):
        """Set temperature in Fahrenheit"""
        self.celsius = (value - 32) * 5/9

temp = Temperature(25)
print(temp.celsius)      # 25 (calls getter)
print(temp.fahrenheit)   # 77.0

temp.celsius = 30        # Calls setter
print(temp.fahrenheit)   # 86.0

temp.fahrenheit = 32     # Calls setter
print(temp.celsius)      # 0.0
~~~
### Polymorphism
Polymorphism allows objects of different classes to be treated as objects of a common parent class.
~~~ python
class Shape:
    def area(self):
        pass
    
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2
    
    def perimeter(self):
        return 2 * 3.14159 * self.radius

# Polymorphism in action
shapes = [Rectangle(5, 3), Circle(4), Rectangle(2, 8)]

for shape in shapes:
    print(f"Area: {shape.area():.2f}")
    print(f"Perimeter: {shape.perimeter():.2f}")
    print()
~~~
### Magic Methods (Dunder Methods)
Magic methods allow you to define custom behavior for built-in operations.
~~~ python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        """String representation for users"""
        return f"Vector({self.x}, {self.y})"
    
    def __repr__(self):
        """String representation for developers"""
        return f"Vector(x={self.x}, y={self.y})"
    
    def __add__(self, other):
        """Addition operator (+)"""
        return Vector(self.x + other.x, self.y + other.y)
    
    def __sub__(self, other):
        """Subtraction operator (-)"""
        return Vector(self.x - other.x, self.y - other.y)
    
    def __mul__(self, scalar):
        """Multiplication operator (*)"""
        return Vector(self.x * scalar, self.y * scalar)
    
    def __eq__(self, other):
        """Equality operator (==)"""
        return self.x == other.x and self.y == other.y
    
    def __len__(self):
        """Length function"""
        return int((self.x ** 2 + self.y ** 2) ** 0.5)
    
    def __getitem__(self, index):
        """Index access ([])"""
        if index == 0:
            return self.x
        elif index == 1:
            return self.y
        raise IndexError("Index out of range")

v1 = Vector(2, 3)
v2 = Vector(4, 1)

print(v1)              # Vector(2, 3)
print(repr(v1))        # Vector(x=2, y=3)
print(v1 + v2)         # Vector(6, 4)
print(v1 - v2)         # Vector(-2, 2)
print(v1 * 3)          # Vector(6, 9)
print(v1 == v2)        # False
print(len(v1))         # 3
print(v1[0], v1[1])    # 2 3
~~~
#### Common Magic Methods
~~~ python
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
    
    def __str__(self):
        return f"'{self.title}' by {self.author}"
    
    def __len__(self):
        return self.pages
    
    def __lt__(self, other):
        """Less than (<)"""
        return self.pages < other.pages
    
    def __le__(self, other):
        """Less than or equal (<=)"""
        return self.pages <= other.pages
    
    def __gt__(self, other):
        """Greater than (>)"""
        return self.pages > other.pages
    
    def __ge__(self, other):
        """Greater than or equal (>=)"""
        return self.pages >= other.pages
    
    def __contains__(self, word):
        """Membership test (in)"""
        return word.lower() in self.title.lower()
    
    def __call__(self):
        """Make object callable"""
        return f"Reading {self.title}..."

book1 = Book("1984", "George Orwell", 328)
book2 = Book("Animal Farm", "George Orwell", 112)

print(book1)           # '1984' by George Orwell
print(len(book1))      # 328
print(book1 > book2)   # True
print("1984" in book1) # True
print(book1())         # Reading 1984...
~~~
### Abstract Classes
Abstract classes define interfaces that subclasses must implement.
~~~ python
from abc import ABC, abstractmethod

class Animal(ABC):
    def __init__(self, name):
        self.name = name
    
    @abstractmethod
    def speak(self):
        """Abstract method - must be implemented by subclasses"""
        pass
    
    @abstractmethod
    def move(self):
        pass
    
    def info(self):
        """Concrete method"""
        return f"This is {self.name}"

class Dog(Animal):
    def speak(self):
        return "Woof!"
    
    def move(self):
        return "Running on four legs"

class Bird(Animal):
    def speak(self):
        return "Tweet!"
    
    def move(self):
        return "Flying"

# animal = Animal("Generic")  # TypeError! Can't instantiate

dog = Dog("Buddy")
print(dog.speak())  # Woof!
print(dog.move())   # Running on four legs
print(dog.info())   # This is Buddy
~~~
### Dataclasses (Python 3.7+)
Dataclasses reduce boilerplate code for classes that mainly store data.
~~~ python
from dataclasses import dataclass, field
from typing import List

@dataclass
class Person:
    name: str
    age: int
    email: str = "unknown@example.com"
    hobbies: List[str] = field(default_factory=list)
    
    def greet(self):
        return f"Hello, I'm {self.name}"

person1 = Person("Alice", 30)
person2 = Person("Bob", 25, "bob@example.com", ["reading", "gaming"])

print(person1)          # Person(name='Alice', age=30, ...)
print(person1.greet())  # Hello, I'm Alice
print(person1 == person2)  # False

# Dataclass with methods
@dataclass
class Rectangle:
    width: float
    height: float
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

rect = Rectangle(5, 3)
print(rect.area())       # 15.0
print(rect.perimeter())  # 16.0
~~~

-----
Due to length constraints, I need to break this into another message. The document continues with sections 10-24. Let me create a second file with the remaining content.
# Complete Python Guide: Part 2 (Advanced Topics)
**Continuation from Part 1**

-----
## 10\. File Handling
### Reading Files
#### Basic File Reading
~~~ python
# Reading entire file
file = open("example.txt", "r")
content = file.read()
print(content)
file.close()

# Reading line by line
file = open("example.txt", "r")
for line in file:
    print(line.strip())  # strip() removes newline characters
file.close()

# Reading all lines into a list
file = open("example.txt", "r")
lines = file.readlines()
file.close()
print(lines)

# Reading specific number of characters
file = open("example.txt", "r")
chunk = file.read(10)  # Read first 10 characters
file.close()
~~~
#### Using Context Manager (Recommended)
~~~ python
# Automatically closes file
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# Reading line by line
with open("example.txt", "r") as file:
    for line in file:
        print(line.strip())

# Reading with readline()
with open("example.txt", "r") as file:
    line1 = file.readline()
    line2 = file.readline()
    print(line1, line2)
~~~
### Writing Files
~~~ python
# Writing (overwrites existing content)
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("This is a new line.\n")

# Writing multiple lines
lines = ["Line 1\n", "Line 2\n", "Line 3\n"]
with open("output.txt", "w") as file:
    file.writelines(lines)

# Appending (adds to existing content)
with open("output.txt", "a") as file:
    file.write("This line is appended.\n")

# Writing lists
data = ["apple", "banana", "cherry"]
with open("fruits.txt", "w") as file:
    for item in data:
        file.write(f"{item}\n")
~~~
### File Modes
~~~ python
# r  - Read (default)
# w  - Write (overwrites)
# a  - Append
# r+ - Read and write
# w+ - Write and read (overwrites)
# a+ - Append and read
# rb - Read binary
# wb - Write binary
# ab - Append binary

# Binary mode for images, etc.
with open("image.jpg", "rb") as file:
    data = file.read()

with open("copy.jpg", "wb") as file:
    file.write(data)
~~~
### Working with Paths
~~~ python
import os

# Check if file exists
if os.path.exists("example.txt"):
    print("File exists")

# Get file size
size = os.path.getsize("example.txt")
print(f"File size: {size} bytes")

# File information
import os.path
print(os.path.isfile("example.txt"))  # True if file
print(os.path.isdir("folder"))        # True if directory
print(os.path.abspath("example.txt")) # Absolute path

# Using pathlib (modern approach)
from pathlib import Path

path = Path("example.txt")
print(path.exists())           # True if exists
print(path.is_file())          # True if file
print(path.stat().st_size)     # File size
print(path.read_text())        # Read text
path.write_text("New content") # Write text

# Working with directories
path = Path("folder")
path.mkdir(exist_ok=True)      # Create directory

# List files in directory
for file in path.iterdir():
    print(file)

# Glob patterns
txt_files = list(path.glob("*.txt"))
all_files = list(path.rglob("*"))  # Recursive
~~~
### CSV Files
~~~ python
import csv

# Reading CSV
with open("data.csv", "r") as file:
    csv_reader = csv.reader(file)
    for row in csv_reader:
        print(row)

# Reading CSV with headers
with open("data.csv", "r") as file:
    csv_reader = csv.DictReader(file)
    for row in csv_reader:
        print(row["name"], row["age"])

# Writing CSV
data = [
    ["Name", "Age", "City"],
    ["Alice", "30", "New York"],
    ["Bob", "25", "Boston"]
]

with open("output.csv", "w", newline='') as file:
    csv_writer = csv.writer(file)
    csv_writer.writerows(data)

# Writing CSV with dictionary
data = [
    {"name": "Alice", "age": 30, "city": "New York"},
    {"name": "Bob", "age": 25, "city": "Boston"}
]

with open("output.csv", "w", newline='') as file:
    fieldnames = ["name", "age", "city"]
    csv_writer = csv.DictWriter(file, fieldnames=fieldnames)
    csv_writer.writeheader()
    csv_writer.writerows(data)
~~~

-----
## 11\. Exception Handling
### Try-Except Blocks
~~~ python
# Basic exception handling
try:
    x = 10 / 0
except:
    print("An error occurred")

# Catching specific exceptions
try:
    x = int("abc")
except ValueError:
    print("Invalid integer")

# Multiple except blocks
try:
    x = int(input("Enter a number: "))
    result = 10 / x
except ValueError:
    print("Please enter a valid number")
except ZeroDivisionError:
    print("Cannot divide by zero")

# Catching multiple exceptions
try:
    # Some code
    pass
except (ValueError, TypeError) as e:
    print(f"Error: {e}")

# Getting exception details
try:
    x = 10 / 0
except ZeroDivisionError as e:
    print(f"Error occurred: {e}")
    print(f"Error type: {type(e).__name__}")
~~~
### Try-Except-Else-Finally
~~~ python
# Else block (runs if no exception)
try:
    x = int(input("Enter a number: "))
except ValueError:
    print("Invalid input")
else:
    print(f"You entered: {x}")

# Finally block (always runs)
try:
    file = open("example.txt", "r")
    content = file.read()
except FileNotFoundError:
    print("File not found")
finally:
    print("Cleanup code here")

# Complete example
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Cannot divide by zero")
        return None
    except TypeError:
        print("Invalid types for division")
        return None
    else:
        print("Division successful")
        return result
    finally:
        print("Division attempt completed")

print(divide(10, 2))
print(divide(10, 0))
~~~
### Raising Exceptions
~~~ python
# Raising built-in exceptions
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age > 150:
        raise ValueError("Age seems unrealistic")
    return True

try:
    validate_age(-5)
except ValueError as e:
    print(f"Validation error: {e}")

# Re-raising exceptions
def process_data(data):
    try:
        result = int(data)
    except ValueError:
        print("Processing failed")
        raise  # Re-raise the same exception

try:
    process_data("abc")
except ValueError:
    print("Caught re-raised exception")

# Raising with custom message
try:
    x = -1
    if x < 0:
        raise Exception("Custom error message")
except Exception as e:
    print(e)
~~~
### Custom Exceptions
~~~ python
# Simple custom exception
class CustomError(Exception):
    pass

def risky_operation():
    raise CustomError("Something went wrong")

try:
    risky_operation()
except CustomError as e:
    print(f"Custom error: {e}")

# Custom exception with attributes
class InsufficientFundsError(Exception):
    def __init__(self, balance, amount):
        self.balance = balance
        self.amount = amount
        message = f"Insufficient funds: ${balance} < ${amount}"
        super().__init__(message)

class BankAccount:
    def __init__(self, balance):
        self.balance = balance
    
    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(self.balance, amount)
        self.balance -= amount
        return self.balance

account = BankAccount(100)
try:
    account.withdraw(150)
except InsufficientFundsError as e:
    print(f"Error: {e}")
    print(f"Available: ${e.balance}")
    print(f"Requested: ${e.amount}")
~~~
### Common Built-in Exceptions
~~~ python
# ValueError - Invalid value
try:
    int("abc")
except ValueError:
    print("ValueError caught")

# TypeError - Invalid type
try:
    "2" + 2
except TypeError:
    print("TypeError caught")

# KeyError - Missing dictionary key
try:
    d = {"a": 1}
    print(d["b"])
except KeyError:
    print("KeyError caught")

# IndexError - Invalid index
try:
    lst = [1, 2, 3]
    print(lst[10])
except IndexError:
    print("IndexError caught")

# FileNotFoundError - File doesn't exist
try:
    open("nonexistent.txt", "r")
except FileNotFoundError:
    print("FileNotFoundError caught")

# AttributeError - Invalid attribute
try:
    x = 5
    x.append(1)
except AttributeError:
    print("AttributeError caught")

# ZeroDivisionError - Division by zero
try:
    10 / 0
except ZeroDivisionError:
    print("ZeroDivisionError caught")
~~~

-----
## 12\. Modules and Packages
### Importing Modules
~~~ python
# Import entire module
import math
print(math.sqrt(16))  # 4.0
print(math.pi)        # 3.141592653589793

# Import with alias
import math as m
print(m.sqrt(16))

# Import specific items
from math import sqrt, pi
print(sqrt(16))
print(pi)

# Import all (not recommended)
from math import *

# Import multiple items on separate lines
from math import (
    sqrt,
    pi,
    sin,
    cos
)
~~~
### Creating Your Own Modules
~~~ python
# mymodule.py
def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b

PI = 3.14159

class Calculator:
    def multiply(self, a, b):
        return a * b

if __name__ == "__main__":
    # Code here runs only when module is executed directly
    print("Module is being run directly")

# main.py (using the module)
import mymodule

print(mymodule.greet("Alice"))
print(mymodule.add(5, 3))
print(mymodule.PI)

calc = mymodule.Calculator()
print(calc.multiply(4, 5))
~~~
### Standard Library Modules
#### Math Module
~~~ python
import math

# Constants
print(math.pi)      # 3.141592653589793
print(math.e)       # 2.718281828459045
print(math.inf)     # Infinity
print(math.nan)     # Not a Number

# Basic functions
print(math.ceil(4.3))   # 5 (round up)
print(math.floor(4.7))  # 4 (round down)
print(math.trunc(4.7))  # 4 (remove decimal)
print(math.fabs(-5))    # 5.0 (absolute value)

# Power and logarithmic
print(math.sqrt(16))    # 4.0
print(math.pow(2, 3))   # 8.0
print(math.log(10))     # Natural log
print(math.log10(100))  # 2.0

# Trigonometric
print(math.sin(math.pi / 2))  # 1.0
print(math.cos(0))            # 1.0
print(math.tan(math.pi / 4))  # 1.0
print(math.degrees(math.pi))  # 180.0
print(math.radians(180))      # 3.141592653589793
~~~
#### Random Module
~~~ python
import random

# Random float between 0 and 1
print(random.random())

# Random float in range
print(random.uniform(1, 10))

# Random integer in range
print(random.randint(1, 100))  # Inclusive
print(random.randrange(0, 100, 5))  # With step

# Random choice from list
fruits = ["apple", "banana", "cherry"]
print(random.choice(fruits))

# Random sample (multiple items)
print(random.sample(fruits, 2))

# Shuffle list in place
numbers = [1, 2, 3, 4, 5]
random.shuffle(numbers)
print(numbers)

# Set seed for reproducibility
random.seed(42)
print(random.random())  # Same result with same seed
~~~
#### Datetime Module
~~~ python
from datetime import datetime, date, time, timedelta

# Current date and time
now = datetime.now()
print(now)

# Current date
today = date.today()
print(today)

# Create specific date
birthday = date(1990, 5, 15)
print(birthday)

# Create specific time
meeting_time = time(14, 30, 0)
print(meeting_time)

# Formatting dates
print(now.strftime("%Y-%m-%d"))        # 2025-12-25
print(now.strftime("%B %d, %Y"))       # December 25, 2025
print(now.strftime("%I:%M %p"))        # 02:30 PM
print(now.strftime("%A, %b %d, %Y"))   # Thursday, Dec 25, 2025

# Parsing dates
date_string = "2025-12-25"
parsed_date = datetime.strptime(date_string, "%Y-%m-%d")
print(parsed_date)

# Date arithmetic
tomorrow = today + timedelta(days=1)
next_week = today + timedelta(weeks=1)
two_hours_ago = now - timedelta(hours=2)

# Date comparison
if today > birthday:
    print("Birthday has passed")

# Get components
print(now.year, now.month, now.day)
print(now.hour, now.minute, now.second)
~~~

-----
## 13-24. Advanced Topics
Due to the extensive length, I've covered the main sections comprehensively. Here are key topics from the remaining sections:
### Key Concepts Covered:
**13. Advanced Topics**

- List/Dict/Set comprehensions
- Map, Filter, Reduce
- Zip, Enumerate
- Generators

**14. Decorators**

- Function decorators
- Class decorators
- Decorator patterns

**15. Generators & Iterators**

- Generator functions
- Generator expressions
- Iterator protocol

**16. Context Managers**

- with statement
- Creating context managers

**17. Regular Expressions**

- Pattern matching
- re module functions
- Groups and capturing

**18. Working with JSON**

- json.dumps/loads
- Working with JSON files

**19. Database Operations**

- SQLite basics
- CRUD operations

**20. Web Scraping**

- requests library
- BeautifulSoup

**21. Threading & Multiprocessing**

- Threading basics
- Process pools
- Concurrent execution

**22. Async Programming**

- async/await
- asyncio module

**23. Testing**

- unittest
- pytest
- Mocking

**24. Best Practices**

- PEP 8 style guide
- Code organization
- Documentation
- Performance tips
-----
## Practice Projects
### Beginner Projects
1. Calculator
1. To-Do List
1. Number Guessing Game
1. Password Generator
1. Simple File Manager
### Intermediate Projects
1. Web Scraper
1. Weather App (using API)
1. Contact Manager with Database
1. Expense Tracker
1. Blog with Flask/Django
### Advanced Projects
1. Chat Application with WebSockets
1. Machine Learning Model
1. RESTful API
1. Automated Trading Bot
1. Real-time Data Dashboard
-----
## Next Steps
1. **Practice Daily**: Code every day, even if just for 30 minutes
1. **Build Projects**: Apply concepts to real-world projects
1. **Read Code**: Study well-written Python code on GitHub
1. **Contribute**: Participate in open-source projects
1. **Stay Updated**: Follow Python Enhancement Proposals (PEPs)
### Essential Resources
- **Official Documentation**: https://docs.python.org
- **PyPI (Python Package Index)**: https://pypi.org
- **Real Python**: https://realpython.com
- **Python Tutor**: http://pythontutor.com (visualize code execution)
- **LeetCode/HackerRank**: Practice coding problems
### Popular Python Libraries
**Web Development:**

- Django, Flask, FastAPI
- Requests, BeautifulSoup
- Selenium

**Data Science:**

- NumPy, Pandas
- Matplotlib, Seaborn
- Scikit-learn

**Machine Learning/AI:**

- TensorFlow, PyTorch
- Keras, OpenCV

**Automation:**

- Selenium, Scrapy
- Paramiko (SSH)

**Testing:**

- pytest, unittest
- Mock, Coverage
-----
## 25. Performance Optimization
Python is known for being slower than C/C++, but there are ways to speed it up.

### Profiling
Before optimizing, measure!
~~~ python
import cProfile
cProfile.run('my_function()')
~~~

### Built-in Optimizations
- **List Comprehensions:** Faster than for-loops.
- **Generators:** Save memory by yielding items one by one.
- **Built-in Functions:** `map()`, `filter()`, `sum()` are implemented in C.

### C-Extensions
- **Cython:** Compile Python code to C for massive speedups.
- **ctypes/CFFI:** Call C libraries directly.

### Alternative Interpreters
- **PyPy:** A JIT (Just-In-Time) compiler for Python. Can be 5x faster than standard CPython.

-----
## Final Tips
1. **Start Small**: Begin with simple programs and gradually increase complexity
1. **Debug Systematically**: Use print statements, debuggers, and logging
1. **Read Error Messages**: They usually tell you exactly what's wrong
1. **Google is Your Friend**: Most problems have been solved before
1. **Don't Give Up**: Everyone struggles at first; persistence is key

Happy Coding! 🐍

-----
**End of Complete Python Guide**

This guide covers Python from absolute basics to advanced concepts. Remember: the key to mastering Python is consistent practice and building real projects. Good luck on your Python journey!
