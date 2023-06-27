def save_user_id_to_session(strategy, backend, user, response, *args, **kwargs):
    request = strategy.request
    request.session['user_id'] = user.id