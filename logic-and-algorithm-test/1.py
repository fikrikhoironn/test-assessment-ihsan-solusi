# Diberikan sebuah string yang dapat mengandung huruf, angka, spasi dan tanda baca.
# ○ Ubahlah format string tersebut menjadi format penulisan judul yang hanya menerima
# huruf dan angka
# ○ Ubahlah format string tersebut menjadi format penulisan biasa dengan mengkonversi
# spasi menjadi “-“ (strip)

def is_alphanumeric_or_space(char):
    ascii_val = ord(char)
    return (65 <= ascii_val <= 90) or (97 <= ascii_val <= 122) or (48 <= ascii_val <= 57) or ascii_val == 32

def title_format(input_string):
    cleaned_string = ''.join(char for char in input_string if is_alphanumeric_or_space(char))
    title_string = cleaned_string.title()
    return title_string

def normal_format(input_string):
    cleaned_string = ''.join(char for char in input_string if is_alphanumeric_or_space(char))
    normal_string = cleaned_string.lower().replace(' ', '-')
    return normal_string

input_string = input("Enter a string: ")
title_string = title_format(input_string)
normal_string = normal_format(input_string)

print("Original String: ", input_string)
print("Title Format: ", title_string)
print("Normal Format: ", normal_string)

