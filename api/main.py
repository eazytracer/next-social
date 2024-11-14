from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import User, Post, Comment, Like
from pydantic import BaseModel

app = FastAPI()

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic schemas for validation
class UserCreate(BaseModel):
    username: str
    name: str | None = None
    surname: str | None = None

class PostCreate(BaseModel):
    desc: str
    user_id: int
    img: str | None = None

class CommentCreate(BaseModel):
    desc: str
    post_id: int
    user_id: int

class LikeCreate(BaseModel):
    post_id: int
    user_id: int

# Routes

@app.get("/users/")
def get_or_create_user(username: str, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == username).first()
    if db_user:
        # Return the existing user's ID and username
        return {"id": db_user.id, "username": db_user.username}
    
    # Create a new user if they don't exist
    new_user = User(username=username)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)  # Refresh to get the ID assigned by the database
    return {"id": new_user.id, "username": new_user.username}


@app.post("/users/", response_model=UserCreate)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        return {"id": db_user.id, "username": db_user.username}
    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@app.post("/posts/")
def create_post(post: PostCreate, db: Session = Depends(get_db)):
    new_post = Post(**post.dict())
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@app.post("/comments/")
def create_comment(comment: CommentCreate, db: Session = Depends(get_db)):
    new_comment = Comment(**comment.dict())
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment

@app.post("/likes/")
def create_like(like: LikeCreate, db: Session = Depends(get_db)):
    new_like = Like(**like.dict())
    db.add(new_like)
    db.commit()
    db.refresh(new_like)
    return new_like

@app.get("/posts/")
def get_posts(db: Session = Depends(get_db)):
    return db.query(Post).all()
