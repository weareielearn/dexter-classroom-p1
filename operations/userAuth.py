import firebase_admin
from firebase_admin import credentials, db


def user_auth_init():
    cred = credentials.Certificate('./dexter-classroom.json')
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://dexter-classroom.firebaseio.com/',
        'databaseAuthVariableOverride': None
    })


def create_user(username, password, phone, community):
    ref = db.reference('users')
    users_ref = ref.child(username)
    users_ref.set({
        'password': password,
        'community': community,
        'phone': phone
    })
