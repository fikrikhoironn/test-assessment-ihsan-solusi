def validate_username(username):
    return username and len(username) >= 3 and " " not in username

def calculate_average_age(ages):
    return sum(ages) / len(ages) if ages else None

def process_user_data(users):
    valid_users = [user for user in users if validate_username(user['username'])]
    active_time = sum(user['active_time'] for user in valid_users if user['status'] == 'active')
    inactive_time = sum(user['inactive_time'] for user in valid_users if user['status'] == 'inactive')
    user_ages = [user['age'] for user in valid_users]

    statistics = {
        'average_age': calculate_average_age(user_ages),
        'total_active_time': active_time,
        'total_inactive_active_time': inactive_time,
        'valid_users_count': len(valid_users),
        'invalid_usernames': [user['username'] for user in users if not validate_username(user['username'])]
    }

    return statistics

users_data = [
    {'username': 'johndoe', 'age': 28, 'status': 'active', 'active_time': 300, 'inactive_time': 50},
    {'username': 'jane_doe', 'age': 22, 'status': 'active', 'active_time': 150, 'inactive_time': 30},
    {'username': ' bad_username ', 'age': 34, 'status': 'inactive', 'active_time': 100, 'inactive_time': 200},
    {'username': 'rob', 'age': 45, 'status': 'inactive', 'active_time': 250, 'inactive_time': 300}
]

result = process_user_data(users_data)
print(result)
