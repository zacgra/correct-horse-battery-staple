# correct-horse-battery-staple

A random password generator that runs on Node.js

This password generator uses a word list as its symbol pool, borrowing the concept from https://xkcd.com/936/.

## What does it do?

Sample

```console
$ node main.js
Password (readable):    refining backfield cackle twice
Password (useable):     refiningbackfieldcackletwice
Bits of Entropy:        51.7
Equiv AlphaNum Length:  8.7
```

It prints the following info:

1. the four-word string separated by a space for readability
2. the four-word string without spaces
3. the four-word password's bits of entropy
4. the length necessary for a random alphanumeric (upper & lowercase) password to have the same entropy

## Explanation of Calculations

In cryptography, entropy is used to measure how hard it is to guess a key (or password). To calculate entropy, we need to know the number of bits needed to represent the total possible passwords in any given password-generating system. If the size of the symbol pool is P, and the number of symbols is N.
Then P^N is the total number of possible different passwords we could create.

### Example

If our symbol pool is a single bit with the possibility of either 0 or 1, then P = 2. If we have three bits then N = 3, and the total number of possible states of those bits is 2^3 or 8.

These total numbers of possible states become really big very quickly. For example, we had 8 possible outcomes with 3 bits, but what if we had 50 bits? 2^50 = 1.13 x 10^15, which is a large and unwieldy number. Why can't we just refer to the number of bits (50), and use that a shorthand for our complexity? Well, that is exactly what we do with logarithms. They allow us to refer to exponential data in a linear way.

So far this is simple enough, but what if our symbol pool has more than 2 symbols? For example, let's consider a symbol pool made of uppercase and lowercase letters as well as numbers 0-9. So, adding all three sets together we have 2\*26 + 10 = 62 symbols. A password of three characters in this system has 62^3 = 238328 possibilities.

In the prior system of bits, I said 50 bits was shorthand for 2^50. Bits is implying that our base is 2, but in the system of alphanumeric characters our base is 62. To find the corresponding exponent in base 2, we can take the log₂(62^3) ≈ 17.9.

> What does this mean? This means that 62^3 ≈ 2^17.9, and that we wil need almost 18 bits to represent the same complexity as 3 alphanumeric characters.

### Calculating our password complexity

In this project, we are using a wordlist that is 7776 words long as our symbol list. Each word in the list is serving the purpose of a bit in our first example, or a character in our second. That means our total possible outcomes are 7776^4 ≈ 3.7 x 10^15. To find base 2 (binary), I'll take the log: log₂(7776^4) ≈ 51.7. So I would need about 52 bits to represent the same complexity as 4 words from my list.

What if I wanted to compare the complexity of a password in my list to an alphanumeric password? I don't have a calculator that can take log base 62 of something, so I'll need to use a change of bases. log_62(7776) = log(7776)/log(62) ≈ 8.7.

> What does this mean? This means that 7776^4 ≈ 62^9, and I would need a 9 digit alphanumeric password to represent the same complexity as a 4 word password from my list.

## Acknowledgements

The word list in the root directory came from https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt.
