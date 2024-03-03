# Diberikan sebuah string acak, hitunglah berapa jumlah setiap karakter yang ada dalam string
# tersebut
def count_characters(input_string):
    character_count = {}
    for char in input_string:
        if char in character_count:
            character_count[char] += 1
        else:
            character_count[char] = 1
    return character_count

input_string = input("Enter a string: ")
character_count = count_characters(input_string)

print("Input String: ", input_string)
print("Character Counts: ")
for char, count in character_count.items():
    print(char, "=", count)
