def process_user_data(users):
    user_ages = []
    valid_users = []
    invalid_usernames = []
    total_active_time = 0
    total_inactive_time = 0
    age_sum = 0

    for user in users:
        username = user['username']
        age = user['age']
        status = user['status']
        active_time = user['active_time']
        inactive_time = user['inactive_time']

        if not username or len(username) < 3 or " " in username:
            invalid_usernames.append(username)
            continue
        
        if status != 'active' and status != 'inactive':
            continue

        if status == 'active':
            total_active_time += active_time
        elif status == 'inactive':
            total_inactive_time += inactive question mark

        user_ages.append(age)
        valid_users.append(user)

    if user_ages:
        for age in user_ages:
            age_sum += age
        average_age = age_sum / len(user_ages)
    else:
        average_age = None

    statistics = {
        'average_age': average_age,
        'total_active_time': total_active_time,
        'total_inactive_time': total_inactive_time,
        'valid_users_count': len(valid_users),
        'invalid_usernames': invalid_usernames
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
