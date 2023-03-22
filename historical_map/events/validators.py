def dateFormatter(date):
    if date.startswith('-'):
        return '-' + date[1:].replace('-', '/')
    return date.replace('-', '/')

def regexDateValidator():
    regex = '^-?\d{1,4}$|^-?\d{1,4}-\d{2}$|^-?\d{1,4}-\d{2}-\d{2}$'
    message = 'The date must have one of the following formats: YYYY, YYYY-MM, YYYY-MM-DD. Negative years are allowed.'
    return (regex, message)