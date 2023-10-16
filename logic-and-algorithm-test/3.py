def generate_sequences(n_terms):
    # Sequence 1: Squares of natural numbers
    seq1 = [i**2 for i in range(1, n_terms + 1)]
    
    # Sequence 2: n^2 - 2n + 2
    seq2 = []
    for i in range (1, n_terms + 1):
        num = i**2-2*i+2
        seq2.append(num)
      
    # Sequence 3: Sum of two previous numbers + 1, except the first two numbers
    seq3 = [0, 0]
    for i in range(2, n_terms):
        seq3.append(seq3[i-1] + seq3[i-2] + 1)
    
    
    return seq1, seq2, seq3

n_terms = int(input("Enter the number of terms to display: "))

seq1, seq2, seq3 = generate_sequences(n_terms)

print("Sequence 1: ", " ".join(map(str, seq1)))
print("Sequence 2: ", " ".join(map(str, seq2)))
print("Sequence 3: ", " ".join(map(str, seq3)))
