def count_characters(input_string):
    char_count = {}
    for char in input_string:
        if char in char_count:
            char_count[char] += 1
        else:
            char_count[char] = 1
    return char_count

input_string = input("Enter a string: ")
char_count = count_characters(input_string)

print("Input String: ", input_string)
print("Character Counts: ")
for char, count in char_count.items():
    print(char, "=", count)
