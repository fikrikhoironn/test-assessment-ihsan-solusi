def title_format(input_string):
    cleaned_string = ''.join(char for char in input_string if char.isalnum() or char.isspace())
    title_string = cleaned_string.title()
    return title_string

def normal_format(input_string):
    cleaned_string = ''.join(char for char in input_string if char.isalnum() or char.isspace())
    normal_string = cleaned_string.lower().replace(' ', '-')
    return normal_string

input_string = input("Enter a string: ")
title_string = title_format(input_string)
normal_string = normal_format(input_string)

print("Original String: ", input_string)
print("Title Format: ", title_string)
print("Normal Format: ", normal_string)
