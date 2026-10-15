---
url: /love-calculator
title: "Love Calculator (Just for Fun) | FigSumo"
description: "A name-based love compatibility game for entertainment only. The score is generated from the letters in the names and means nothing."
h1: "Love Calculator"
country: global
status: keep
body_words: 644 (minimum 600)
verify_flags: 0
updated: 2026-10-15
source: FigSumo-All-Page-Content.docx
---

H1: Love Calculator
The love calculator is a game: type two names and it returns a "compatibility" percentage. It's for fun at parties, on a first date or in a classroom lesson on how algorithms work. It doesn't (and can't) measure real compatibility.
How to use it
1. First name: default Alex.
2. Second name: default Jordan.
3. Press Calculate.
Result: a compatibility score between 13% and 98%.
How the score is made
The calculator joins the two names, ignores capital letters and spaces, and runs the result through a simple hashing function, a recipe that turns text into a large number. It then maps that number onto the range 13–98.
Because the recipe is fixed:
The same pair always gets the same score. Alex and Jordan get 28% every time, however you capitalise them ("alex" and "JORDAN" also give 28%).
Order matters. Jordan and Alex give 60%, because the letters are combined in a different sequence.
Tiny changes swing the score. Adding a surname or using a nickname gives a completely different number.
There's no randomness and no psychology involved; it's a demonstration of how a hash function behaves.
Famous couples
Names
Score
Romeo + Juliet
93%
Elizabeth + Darcy
77%
Alex + Jordan
28%
Literature's most tragic couple outscores one of its happiest, which says everything about how seriously to take the result.
Ideas for using it
Party game: everyone tests their name with a celebrity; the highest score picks the next song.
Classroom: show that the same input always gives the same output, then change one letter and see the "avalanche" effect. It's a gentle introduction to how hashing is used for passwords and data checks.
Icebreaker: test team members' names with "pizza" or "Mondays".
What really predicts relationship satisfaction
Research on couples points to things a name can't capture: how partners handle conflict, shared values, kindness and trust, and commitment over time. The Gottman Institute's research, for example, emphasises how partners respond to each other's bids for attention [VERIFY specific findings before citing]. If you're looking for relationship support, professional counselling services exist in the US, Canada and the UK.
Privacy
Names are processed in your browser to create the score. FigSumo doesn't need or keep them.
Want it on your site?
You can embed the same game on a blog or event page with the love calculator widget.
Tips
Try full names and nicknames for a different result.
Swap the order for a second opinion.
Don't base decisions on it. It's a toy.
Notes for US, Canada and UK users
Love calculators are an old schoolyard and magazine game in all three countries, and there's no regional version: the score depends only on the letters typed. Names with accents (Chloé, Zoë) are treated as they're typed, so "Chloe" and "Chloé" can give different scores. If you're comparing friends' names, spell them the same way each time.
Make it a game
Try each pair both ways round. The current version gives different scores for different name orders, which is part of the fun.
Use nicknames and full names and see which "matches" better.
Frequently asked questions
Is the love calculator accurate?
No. It's a game based on a hash of the letters, not on anything about the people.
Why does the same pair always get the same score?
The calculation is deterministic: the same letters always give the same number.
Does the order of the names matter?
Yes. Swapping them usually changes the score.
Why is the lowest score 13%?
The game keeps scores between 13% and 98% so nobody gets a flat zero or a perfect 100.
Does capitalisation matter?
No; names are converted to lower case first.
Are names stored?
No; the score is calculated in your browser.
Related calculators
Free Love Calculator Widget
Random Number Generator
Dice Roller
Age Calculator
Day Counter
Date Calculator
Sources
1. NIST: "Hash functions" project overview (accessed 14 Oct 2026). https://csrc.nist.gov/projects/hash-functions
2. The Gottman Institute: research overview (accessed 14 Oct 2026). https://www.gottman.com/about/research/
3. FigSumo methodology.
