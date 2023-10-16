# Diberikan sebuah deret angka random oleh user berupa string (dipisahkan oleh spasi atau
# koma untuk menghitung min, max, mean
def calculate_statistics(number_string):
    numbers = [int(n.strip()) for n in number_string.replace(',', ' ').split()]
    
    max_val = numbers[0] 
    min_val = numbers[0] 
    total = numbers[0]   
    
    for num in numbers[1:]:
        if num > max_val:
            max_val = num
        elif num < min_val:
            min_val = num
        total += num
    
    avg_val = total / len(numbers)
    
    return max_val, min_val, avg_val

user_input = input("Masukkan deret angka (pisahkan dengan spasi atau koma): ")

max_val, min_val, avg_val = calculate_statistics(user_input)
print(f"Nilai terbesar: {max_val}")
print(f"Nilai terkecil: {min_val}")
print(f"Nilai rata-rata: {avg_val:.2f}")
