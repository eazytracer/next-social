from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    surname = Column(String, nullable=True)
    avatar = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    posts = relationship("Post", back_populates="user")

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    desc = Column(String, nullable=False)
    img = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post")
    likes = relationship("Like", back_populates="post")

class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    desc = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    post_id = Column(Integer, ForeignKey("posts.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User")
    post = relationship("Post", back_populates="comments")

class Like(Base):
    __tablename__ = "likes"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User")
    post = relationship("Post", back_populates="likes")