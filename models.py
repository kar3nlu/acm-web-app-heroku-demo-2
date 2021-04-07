# models.py
from app import db

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date(), unique=False, nullable=False)
    post_text = db.Column(db.String(1000), unique=False, nullable=False)

    def __repr__(self):
        return '<Post %r>' % self.post_text
