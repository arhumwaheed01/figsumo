---
url: /binary-calculator
title: "Binary Calculator: Add, Subtract, Convert | FigSumo"
description: "Do arithmetic on binary numbers and convert between binary, decimal and hexadecimal, with each step of the conversion shown."
h1: "Binary Calculator"
country: global
status: keep
body_words: 638 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Binary Calculator
Binary (base 2) is the number system computers use internally: every value is written with only the digits 0 and 1. This calculator converts whole numbers between decimal and binary and adds two binary numbers, showing the sum in both bases.
How to use this calculator
1. Mode:
Decimal → binary: converts the whole number in Value A to binary.
Binary → decimal: converts a string of 0s and 1s in Value A to decimal.
Add two binary numbers: adds Value A and Value B (both binary).
2. Value A: the number to convert, or the first binary number.
3. Value B (add only): the second binary number.
Results: the converted value, or the sum in decimal and binary.
How binary works
Each binary digit (bit) is a power of 2, starting with 2⁰ = 1 on the right:
Bit position
7
6
5
4
3
2
1
0
Value
128
64
32
16
8
4
2
1
Binary → decimal: add the place values of the 1 bits. 11001101 = 128 + 64 + 8 + 4 + 1 = 205.
Decimal → binary (repeated division): divide by 2, record the remainder, repeat with the quotient, then read the remainders from bottom to top.
Worked examples
Example 1: 42 to binary
Step
Division
Quotient
Remainder
1
42 ÷ 2
21
0
2
21 ÷ 2
10
1
3
10 ÷ 2
5
0
4
5 ÷ 2
2
1
5
2 ÷ 2
1
0
6
1 ÷ 2
0
1
Reading the remainders upward: 101010. Check: 32 + 8 + 2 = 42.
Other conversions: 255 = 11111111 (eight 1s, the largest 8-bit value); 1,000 = 1111101000.
Example 2: adding 1010 and 1011
Binary addition works like decimal addition, but you carry when a column reaches 2:
0 + 1 = 1
1 + 1 = 10 (write 0, carry 1)
1 + 1 + 1 = 11 (write 1, carry 1)
   1010   (10)
 + 1011   (11)
 ------
  10101   (21)
The calculator shows Sum (decimal) 21 and Sum (binary) 10101.
Understanding your results
Whole numbers only. Fractions in binary (like 0.1) often repeat forever, which is why computers can't store some decimals exactly.
Large numbers: the decimal → binary mode currently works on 32-bit unsigned values, so enter numbers below 4294967296 (2³²) for a correct result.
Negative numbers: in decimal → binary mode a negative input is shown as its 32-bit two's-complement pattern. For −5 that's 11111111111111111111111111111011. Computers store signed integers this way: invert the bits of 5 and add 1.
Leading zeros don't change the value: 00101010 = 101010.
Where binary is used
Computer memory and storage: 8 bits make a byte; a byte holds 0 to 255.
Networking: IP addresses and subnet masks are 32-bit binary numbers; see the IP subnet calculator.
Permissions and flags: Unix file permissions and bit flags pack yes/no settings into bits.
Hexadecimal shorthand: each hex digit stands for 4 bits; see the hex calculator.
Tips and common mistakes
Reading remainders top to bottom. The first remainder is the rightmost bit.
Typing digits other than 0 and 1 in binary modes; the calculator will ask you to correct them.
Forgetting the final carry in addition, which adds a new leftmost bit.
Confusing 10 (binary two) with ten.
Frequently asked questions
How do I convert decimal to binary?
Divide by 2 repeatedly and read the remainders from last to first.
How do I convert binary to decimal?
Add the powers of 2 for each position holding a 1.
What is 1 + 1 in binary?
10 (which is 2 in decimal).
How many bits are in a byte?
8, giving 256 possible values (0 to 255).
Can I subtract or multiply binary numbers here?
Not yet. Convert to decimal, calculate, and convert back.
Why do computers use binary?
Electronic circuits reliably represent two states (on/off), which map to 1 and 0.
Related calculators
Hex Calculator
Big Number Calculator
Scientific Calculator
IP Subnet Calculator
Base64 Encoder and Decoder
Roman Numeral Converter
Sources
1. Khan Academy: "Binary numbers" (accessed 14 Oct 2026). https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:digital-information/xcae6f4a7ff015e7d:binary-numbers/a/bits-and-binary
2. MDN Web Docs: "Number.prototype.toString() (radix)" (accessed 14 Oct 2026). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toString
3. FigSumo methodology.
