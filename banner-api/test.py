import pyrebase
import urllib.request


config = {
     "apiKey": "AIzaSyC_cYQskL_dKhkt-aQ1ayHt8ia2NQYEHTs",
    "authDomain": "comparez.firebaseapp.com",
    "databaseURL": "https://comparez.firebaseio.com",
    "storageBucket": "comparez.appspot.com",
    "messagingSenderId": "975260713071",
  }
firebase = pyrebase.initialize_app(config)

def download():
    auth = firebase.auth()

# Log the user in
    user = auth.sign_in_with_email_and_password('test@user.com', '123456')
    #print(user)
    """ print(auth.current_user) """
    

    """ storage = firebase.storage().child('images/test.png').get_url(token=user['idToken']) """
    """ urllib.request.urlretrieve(storage, "local-filename.jpg") """
    storage = firebase.storage().child('images/test.png').get_url(token=user['idToken'])
    #storage.download('test.png')
    print(storage)
    return "ok"

download()