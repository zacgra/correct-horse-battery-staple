# random-password-generator

A random password generator that runs on Node.js

This password generator uses a word list as its symbol pool, borrowing the concept from https://xkcd.com/936/.

It prints the following info:

1. the four-word string separated by a space for readability
2. the four-word string without spaces
3. the four-word password's bits of entropy
4. the length necessary for a random alphanumeric & special symbol char password to have the same entropy

The word list in the root directory came from https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt.
