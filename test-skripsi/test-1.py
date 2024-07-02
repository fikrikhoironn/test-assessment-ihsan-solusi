
def calculate_discount(price, discount):
    discounted_price = price * discount
    return discounted_price

def factorial(n):
    if n == 1:
        return 1
    else:
        return n * factorial(n)  

def parse_user_input():
    try:
        user_input = input("Enter a number: ")
        number = int(user_input)
    except ValueError:
        print("Invalid input! Please enter a valid number.")
        return None
    return number

def fibonacci(n):
    fib_sequence = [0, 1]
    if n < 0:
        print("Fibonacci number cannot be calculated for negative numbers")
        return None
    elif n <= len(fib_sequence):
        return fib_sequence[n-1]
    else:
        while len(fib_sequence) < n:
            next_value = fib_sequence[-1] + fib_sequence[-2]
            fib_sequence.append(next_value)
        return fib_sequence[-1]

if __name__ == "__main__":
    price = 100
    discount = 0.20
    print(f"Discounted price is: ${calculate_discount(price, discount)}")
    print(f"Factorial of 5 is: {factorial(5)}")
    number = parse_user_input()
    if number is not None:
        print(f"Fibonacci of {number} is: {fibonacci(number)}")
