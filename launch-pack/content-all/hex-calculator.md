---
url: /hex-calculator
title: "Hex Calculator: Hexadecimal Arithmetic & Conversion | FigSumo"
description: "Add, subtract, multiply and divide hexadecimal numbers and convert between hex, decimal and binary, step by step."
h1: "Hex Calculator"
country: global
status: keep
body_words: 636 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Hex Calculator
Hexadecimal (base 16) uses sixteen digits: 0 to 9 and A to F, where A = 10 and F = 15. Programmers use it because each hex digit stands for exactly four binary digits, making long binary values short and readable. This calculator converts between decimal and hex and adds two hex numbers.
How to use this calculator
1. Mode:
Decimal → hexadecimal: converts the whole number in Value A.
Hexadecimal → decimal: converts a hex string such as 1A3F (case doesn't matter; don't include a 0x prefix).
Add two hex values: adds Value A and Value B.
2. Value A and Value B (add only).
Results: the converted value, or the sum in decimal and hex.
How hexadecimal works
Each position is a power of 16:
Position
3
2
1
0
Value
4,096
256
16
1
Hex → decimal: multiply each digit by its place value and add. 1A3F = 1 × 4,096 + 10 × 256 + 3 × 16 + 15 = 6719.
Decimal → hex: divide by 16 repeatedly and read the remainders upward (10–15 become A–F).
Worked examples
Example 1: 255 to hex
255 ÷ 16 = 15 remainder 15 → F
15 ÷ 16 = 0 remainder 15 → F
FF
Other values: 4,096 = 1000; 48,879 = BEEF (spells "BEEF", a favourite of programmers).
Example 2: adding 2F and 1C
Add column by column, carrying when a column reaches 16:
F + C = 15 + 12 = 27 = 16 + 11 → write B, carry 1
2 + 1 + 1 = 4
4B (the calculator shows 4B, decimal 75)
FF + 1 = 100 (256): just like 99 + 1 = 100 in decimal.
Hex and binary
Hex
Binary
Hex
Binary
0
0000
8
1000
1
0001
9
1001
2
0010
A
1010
3
0011
B
1011
4
0100
C
1100
5
0101
D
1101
6
0110
E
1110
7
0111
F
1111
So 0xB7 = 1011 0111. Two hex digits make one byte. See the binary calculator.
Where you'll see hex
Web colours: #3399FF means red 33, green 99, blue FF in hex, or 51, 153, 255 in decimal.
Memory addresses and debugging output.
MAC addresses (six bytes, such as 00:1A:2B:3C:4D:5E) and IPv6 addresses.
Character codes: Unicode code points such as U+00E9 (é); see the URL encode/decode tool, where %20 is hex for a space.
Understanding your results
Letters are shown in upper case. Lower-case input is accepted.
Range: decimal → hex works correctly for whole numbers from 0 to 4,294,967,295 (FFFFFFFF). Negative inputs display as 32-bit two's complement (−1 shows as FFFFFFFF).
Prefixes: code often writes hex as 0xFF or #FF; type just FF.
Tips and common mistakes
Forgetting that A–F are digits worth 10–15.
Including 0x or # in the input.
Reading remainders in the wrong order when converting by hand.
Confusing the letter O with zero.
Notes for US, Canada and UK readers
Hexadecimal is identical worldwide. It appears in US AP Computer Science Principles, Canadian high-school computer studies and UK GCSE Computer Science, where students convert between denary (the UK word for decimal), binary and hex. UK papers often write hex values with no prefix, while programmers write 0x or #.
Practice problems
1. 2026 in hex: 7EA.
2. Colour #FF8800 as one number: 16,746,496.
3. B4 in binary: 10110100 (B = 1011, 4 = 0100).
Frequently asked questions
What is FF in decimal?
255.
Why do programmers use hexadecimal?
Each hex digit maps to four bits, so binary data is compact and easy to read.
How do I convert hex to binary?
Replace each hex digit with its four-bit pattern from the table.
What does 0x mean?
A prefix marking a number as hexadecimal in many programming languages.
Can I subtract hex numbers here?
Not yet. Convert to decimal, subtract, and convert back.
Is hex case-sensitive?
No: ff and FF are the same value.
Related calculators
Binary Calculator
Big Number Calculator
IP Subnet Calculator
Base64 Encoder and Decoder
URL Encoder and Decoder
Scientific Calculator
Sources
1. MDN Web Docs: "parseInt() (radix)" (accessed 14 Oct 2026). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
2. W3C: "CSS Color Module Level 4: hex colors" (accessed 14 Oct 2026). https://www.w3.org/TR/css-color-4/#hex-notation
3. FigSumo methodology.
