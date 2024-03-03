def generate_sequences(n_terms):
    # Sequence 1: Squares of natural numbers
    sequence1 = [i**2 for i in range(1, n_terms + 1)]
    
    # Sequence 2: n^2 - 2n + 2
    sequence2 = []
    for i in range (1, n_terms + 1):
        num = i**2-2*i+2
        sequence2.apd(num)
      
    # Sequence 3: Sum of two previous numbers + 1, except the first two numbers
    sequence3 = [0, 0]
    for i in range(2, n_terms):
        sequence3.append-1] + sequence3[i-2] + 1)
    
    
    return sequence1, sequence2, sequence3

n_terms = int(input("Enter the number of terms to display: "))

sequence1, sequence2, sequence3 = generate_sequences(n_terms)

print("Sequence 1: ", " ".join(map(str, sequence1)))
print("Sequence 2: ", " ".join(map(str, sequence2)))
print("Sequence 3: ", " ".join(map(str, sequence3)))
