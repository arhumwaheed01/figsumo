---
url: /base64-encode-decode
title: "Base64 Encode and Decode Online | FigSumo"
description: "Encode text to Base64 or decode Base64 back to text in your browser, with UTF-8 support and URL-safe variant. Nothing is uploaded."
h1: "Base64 Encoder and Decoder"
country: global
status: keep
body_words: 604 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Base64 Encoder and Decoder
Base64 turns any data into plain text made of 64 safe characters (A–Z, a–z, 0–9, + and /). It's how email attachments travel, how small images are embedded in web pages and CSS, and how many APIs pass binary data inside JSON. This tool encodes text to Base64 or decodes Base64 back to readable text, entirely in your browser.
How to use this tool
1. Text: paste the text to encode, or the Base64 string to decode.
2. Mode: "Encode to Base64" or "Decode from Base64".
Result: the Base64 output or the decoded text. Text is handled as UTF-8, so accents, non-Latin scripts and emoji work. If the input isn't valid Base64, you'll see "Could not decode".
How Base64 works
1. Convert the text to bytes (UTF-8).
2. Take the bytes three at a time: 3 bytes = 24 bits.
3. Split the 24 bits into four 6-bit groups (values 0–63).
4. Map each value to a character: 0–25 → A–Z, 26–51 → a–z, 52–61 → 0–9, 62 → +, 63 → /.
5. If the last group has only one or two bytes, pad the output with = signs.
Every 3 bytes become 4 characters, so encoded data is about 33% larger than the original.
Worked examples
Example 1: the default
"Hello, Figsumo!" → SGVsbG8sIEZpZ3N1bW8h
Example 2: three letters, step by step
"Man" in ASCII is 77, 97, 110 → binary 01001101 01100001 01101110 → 6-bit groups 19, 22, 5, 46 → TWFu.
Example 3: padding
"Ma" → TWE= (one = for a missing byte); "M" → TQ== (two).
Example 4: non-English text
"café" → Y2Fmw6k=. The é takes two bytes in UTF-8, which is why the output is longer than for "cafe".
Example 5: an HTTP Basic auth header
"user:pass" → dXNlcjpwYXNz. Anyone can decode this, which is why Basic authentication must only be used over HTTPS.
Where you'll see Base64
Email (MIME): attachments are Base64 encoded.
Data URIs: data:image/png;base64,iVBOR… embeds an image directly in HTML or CSS.
JSON Web Tokens (JWT): the header and payload are base64url encoded; decode them to inspect claims.
API keys and certificates: PEM files (-----BEGIN CERTIFICATE-----) contain Base64.
Variants
Variant
Characters 62, 63
Padding
Standard (RFC 4648) — this tool
+ /
=
base64url (URLs, JWT)
- _
Often omitted
MIME
+ /
=, with line breaks every 76 characters
To decode base64url here, replace - with + and _ with /, and add = until the length is a multiple of 4.
Base64 is not encryption
Base64 is reversible by anyone, with no key. Never use it to hide passwords or personal data. For secrets, use proper encryption; for strong passwords, use the password generator.
Privacy
Encoding and decoding run in your browser. The text you paste isn't sent to FigSumo's servers.
Tips and common mistakes
Stray spaces or line breaks inside pasted Base64 can cause decode errors; leading and trailing spaces are trimmed.
Missing padding from base64url strings.
Decoding binary files as text gives garbled characters; that data was an image or file, not text.
Confusing Base64 with URL encoding. For query strings, use the URL encoder.
Practice
A 300-byte file becomes exactly 400 Base64 characters.
Frequently asked questions
What is Base64 used for?
Sending binary data through text-only channels such as email, JSON and HTML.
Is Base64 secure?
No. It's an encoding, not encryption.
Why does Base64 end with = or ==?
Padding, when the input length isn't a multiple of 3 bytes.
Why is the output longer than the input?
Every 3 bytes become 4 characters (about 33% more).
Does it support emoji and accents?
Yes, via UTF-8.
Can I encode an image?
Not yet; this tool handles text.
Related calculators
URL Encoder and Decoder
Password Generator
Hex Calculator
Binary Calculator
Download Time Calculator
IP Subnet Calculator
Sources
1. IETF RFC 4648: "The Base16, Base32, and Base64 Data Encodings" (accessed 14 Oct 2026). https://www.rfc-editor.org/rfc/rfc4648
2. MDN Web Docs: "Base64" (accessed 14 Oct 2026). https://developer.mozilla.org/en-US/docs/Glossary/Base64
3. FigSumo methodology.
