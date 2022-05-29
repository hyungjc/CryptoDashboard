from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()


def get_uuid():
    return uuid4().hex


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True,
                   unique=True, default=get_uuid)
    email = db.Column(db.String(345), primary_key=True, unique=True)
    password = db.Column(db.Text, nullable=False)
    pvtKey = db.Column(db.String, nullable=False)
    pubKey = db.Column(db.String, nullable=False)
    walletAddress = db.Column(db.String, nullable=False)
