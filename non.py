s= 'IceCreAm'
rev = []
vowels = ['a','e','i','o','u','A','E','I','O','U']
pos = []
s=list(s)
for i in range(len(s)):
    if s[i] in vowels:
        pos.append(i)

for i in range(len(pos)//2):
    s[pos[0+i]], s[pos[-1-i]] = s[pos[-1-i]], s[pos[0+i]]
    print(''.join(s))
    