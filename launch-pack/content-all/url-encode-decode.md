---
url: /url-encode-decode
title: "URL Encode and Decode Online | FigSumo"
description: "Percent-encode text for use in URLs or decode encoded strings, using encodeURIComponent rules, entirely in your browser."
h1: "URL Encoder and Decoder"
country: global
status: keep
body_words: 669 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: URL Encoder and Decoder
URLs can only contain a limited set of characters. Spaces, accented letters, emoji and symbols with special meaning (such as &, = and ?) must be percent-encoded to travel safely in a web address or query string. This tool encodes text for use in a URL, or decodes percent-encoded text back to readable form, in your browser.
How to use this tool
1. Text: paste the text or the encoded string (default "figsumo calculators").
2. Mode: "URL-encode" or "URL-decode".
Result: the encoded or decoded text. Malformed sequences (such as a lone % sign) show an error when decoding.
How percent-encoding works
Each character that isn't allowed is converted to its UTF-8 bytes, and each byte is written as % followed by two hexadecimal digits.
Space → %20
é (two UTF-8 bytes, C3 A9) → %C3%A9
👍 (four bytes) → %F0%9F%91%8D
Characters left unchanged by this tool: letters A–Z and a–z, digits 0–9, and - _ . ! ~ * ' ( ). Everything else, including / ? & = # + :, is encoded, which makes the output safe to drop into a single query-string value or path segment.
Worked examples
Example 1: the default
"figsumo calculators" → figsumo%20calculators
Example 2: reserved characters
"a&b=c/d?e" → a%26b%3Dc%2Fd%3Fe. Without encoding, the & and = would split the value into separate parameters.
Example 3: accents and percent signs
"café 50%" → caf%C3%A9%2050%25
Example 4: building a search link
To link to a search for "mortgage & tax", encode the term and add it to the URL: https://example.com/search?q=mortgage%20%26%20tax.
Example 5: decoding a tracking link
utm_campaign=spring%20sale%202026 decodes to "spring sale 2026".
Reserved and unreserved characters
Type
Characters
Notes
Unreserved (never need encoding)
A–Z a–z 0–9 - _ . ~
Safe anywhere
Reserved (have meaning)
: / ? # [ ] @ ! $ & ' ( ) * + , ; =
Encode when used as data
Everything else
spaces, %, ", <, >, non-ASCII
Always encode
%20 or +?
In HTML form submissions (application/x-www-form-urlencoded), spaces are often written as +. In paths and most modern APIs, %20 is used. This tool encodes spaces as %20 and doesn't convert + to a space when decoding; replace + with %20 first if you're decoding form data.
Common uses
Query-string values in links and API calls.
UTM tracking parameters in marketing links.
Redirect URLs passed inside another URL (?next=%2Fdashboard).
Debugging: reading encoded text in server logs and analytics.
Encoding is not encryption
Anyone can decode percent-encoded text. Never put passwords or personal data in URLs: they're stored in browser history, server logs and analytics. For a different encoding used for binary data, see the Base64 tool.
Privacy
Encoding and decoding run in your browser; the text isn't sent to FigSumo.
Tips and common mistakes
Double encoding: encoding an already encoded string turns %20 into %2520.
Encoding a whole URL with this tool also encodes :// and /; encode only the parts that are data.
Decoding + as a space in form data.
Notes for US, Canada and UK users
Percent-encoding is an international standard (RFC 3986), so it works the same in every country. Differences you'll notice are in the text itself: French Canadian place names such as Trois-Rivières or Montréal contain accented letters that become two-byte UTF-8 sequences (è is %C3%A8, é is %C3%A9), and the pound sign £ becomes %C2%A3. The dollar sign is plain ASCII, but it's a reserved character in some contexts and may be encoded as %24.
Checking an encoded link
1. Decode it here and read the result: you should see the address, path and parameters you expect.
2. Look for double encoding, such as %2520, which is an encoded %20. It usually means a link was encoded twice.
3. Make sure the domain at the start of the decoded link is the one you intend to visit.
Frequently asked questions
What is URL encoding?
Replacing unsafe characters with % and their hex byte values.
What does %20 mean?
A space.
Why does my URL have %2F?
It's an encoded forward slash (/).
Is URL encoding the same as Base64?
No. They're different encodings for different purposes.
What is %25?
An encoded percent sign.
Does it support emoji?
Yes, via UTF-8.
Related calculators
Base64 Encoder and Decoder
Password Generator
IP Subnet Calculator
Hex Calculator
Binary Calculator
Download Time Calculator
Sources
1. IETF RFC 3986: "Uniform Resource Identifier (URI): Generic Syntax" (accessed 14 Oct 2026). https://www.rfc-editor.org/rfc/rfc3986
2. MDN Web Docs: "encodeURIComponent()" (accessed 14 Oct 2026). https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
3. WHATWG URL Standard: "application/x-www-form-urlencoded" (accessed 14 Oct 2026). https://url.spec.whatwg.org/#application/x-www-form-urlencoded
4. FigSumo methodology.
