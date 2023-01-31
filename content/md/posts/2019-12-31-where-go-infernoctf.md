{:title "Where did he GO? - Inferno CTF"
 :layout :post
 :tags  ["ctf" "writeup" "go"]
 :toc false}

This was also one of the easier ones. As you can tell, I'm not that good at
these things. I also have never scripted in go before. Here's what happened.

The program asked for a password, and if the password was correct, we would get
a nice success message. Looking into the program, we see that the input is
checked against an obfuscated string of bytes. The input is run through 2
functions:

```go
func jai_ram_ji_ki(s string) string {
	chars := []rune(s)
	for i, j := 0, len(words) - 1; i < j; i, j = i + 1, j - 1 {
		chars[i], chars[j] = chars[j], chars[i]
	}
	return string(chars)
}

func mandir_wahi_banega(s string) string {
	words := strings.Fields(s)
	for i, j := 0, len(words) - 1; i < j; i, j = i + 1, j - 1 {
		words[i], words[j] = jai_ram_ji_ki(words[j]), jai_ram_ji_ki(words[i])
	}
	return strings.Join(words, "_")
}

jai_ram_ji_ki(mandir_wahi_banega(string(user_input)))
```

Let's see what would happen if we simply printed the encrypted bytes as a
string:

```go
fmt.Println(ency)
//!!tA3rG_s1_gn1MMaRg0rP_0g
```

This looks awfully like some kind of flag. Let's see what happens when we
reverse it (using `jai_ram_ji_ki`):

```go
fmt.Println(jai_ram_ji_ki(ency))
//g0_Pr0gRaMM1ng_1s_Gr3At!!
```

And whaddyaknow, that's the flag!
