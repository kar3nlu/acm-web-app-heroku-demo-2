#app.py
from datetime import date
from flask import Flask, jsonify, redirect, render_template, request, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

db = SQLAlchemy(app)

# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
from models import Post
db.create_all()

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', page='index')

@app.route('/about', methods=['GET'])
def about():
    return render_template('index.html', page='about')

@app.route('/get_posts', methods=['GET'])
def get_posts():
    posts = Post.query.order_by(Post.id.desc())
    formatted_posts = []
    for post in posts:
        formatted_posts.append({
            "date": post.date.strftime("%m/%d/%y"),
            "text": post.post_text,
        })
    return jsonify({
        "posts": formatted_posts,
    })

@app.route('/save_post', methods=['POST'])
def save_post():
    today = date.today()
    post_text = request.form["post-text"]
    new_post = Post(date=today, post_text=post_text)
    db.session.add(new_post)
    db.session.commit()
    return redirect(url_for('index'))
