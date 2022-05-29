from flask import Flask, jsonify, request, session
from dotenv import load_dotenv
from config import ApplicationConfig
from models import db, User
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
from flask_session import Session
import requests
from requests.structures import CaseInsensitiveDict
import json

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session()
db.init_app(app)

with app.app_context():
    db.create_all()


@app.route('/@me')
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Not authorized"}), 401

    user = User.query.filter_by(id=user_id).first()

    return jsonify({
        "id": user.id,
        "email": user.email
    })


@app.route("/signup", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    repassword = request.json["repassword"]
    pvtKey = request.json["pvtKey"]
    pubKey = request.json["pubKey"]
    walletAddress = request.json["walletAddress"]

    user_exists = User.query.filter_by(email=email).first() is not None
    if user_exists:
        return jsonify({"error": "User already exists with same email"})

    if password != repassword:
        return jsonify({"error": "Passwords do not match"})

    hashed_password = bcrypt.generate_password_hash(password)
    hashed_pvtKey = bcrypt.generate_password_hash(pvtKey)

    new_user = User(email=email, password=hashed_password,
                    pvtKey=pvtKey, pubKey=pubKey, walletAddress=walletAddress)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email,
    })


@app.route("/login", methods=["POST"])
def login_user():

    user_id = session.get("user_id")

    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Unauthorized"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Unauthorized"}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email,
    })


@app.route("/dashboard")
def dashboard():
    user_id = session.get("user_id")
    user = User.query.filter_by(id=user_id).first()
    pvt = user.pvtKey
    pub = user.pubKey

    url = "https://api.korbit.co.kr/v1/oauth2/access_token"
    headers = CaseInsensitiveDict()
    headers["Content-Type"] = "application/x-www-form-urlencoded"

    data = "client_id={}&client_secret={}&grant_type=client_credentials".format(
        pub, pvt)

    resp = requests.post(url, headers=headers, data=data)

    obj = resp.json()

    access_token = obj["access_token"]

    print("access",access_token)

    url_balance = "https://api.korbit.co.kr/v1/user/balances"
    headers_balance = CaseInsensitiveDict()
    headers_balance["Authorization"] = "Bearer {}".format(access_token)

    resp_balance = requests.get(url_balance, headers = headers_balance)

    #print(resp_balance.status_code)

    
    obj_balance = resp_balance.json()


    #----------------------

    url_price = "https://api.korbit.co.kr/v1/ticker/detailed/all"

    resp_price = requests.get(url_price)

    obj_price = resp_price.json()

    #print(obj_price)

    price = {}
    for i in obj_price:
        price[i.split("_")[0]] = obj_price[i]['last']  #to make new dictionary with keys uniform with obj_bal

    #print(price)

    #print(obj_balance)

    available_bal = {}
    for i in obj_balance:
        if obj_balance[i]['available'] != '0':
            available_bal[i] = {'available' : str(obj_balance[i]['available']), 'avg_price' : str(obj_balance[i]['avg_price'])}


    for i in available_bal:
        if i == 'krw':
            available_bal['krw']["current"] = str(1)
        else:
            available_bal[i]["current"] = str(price[i])


    for i in list(available_bal.keys()):
        available_bal[i]["profit_krw"] = str(float(available_bal[i]['available']) * (float(available_bal[i]['current']) - float(available_bal[i]['avg_price'])))
        if (float(available_bal[i]['available']) * float(available_bal[i]['avg_price'])) < 500:
            del(available_bal[i])
        else:
            available_bal[i]["profit_perc"] = str(float(available_bal[i]["profit_krw"]) / (float(available_bal[i]['available']) * float(available_bal[i]['avg_price'])))

    
    

            #change the dictionary to look like this : {
#     {
#       "data": [
#         {
#             "name": "ada",
#             "available": 1.4
#         },
#         {
#             "name": "eth",
#             "available": 2
#         }
        
#         ]
#      }
        
    #print(json.dump(available_bal))

    #print(obj_balance['krw'])

    #available = {}


    

    return jsonify(
        available_bal
    )
    


@ app.route("/logout", methods=["POST"])
def logout():
    session.pop("user_id")
    return "200"


if __name__ == "__main__":
    app.run(debug=True)
