from sqlalchemy import Column, String
from app.db.base_class import Base

class User(Base):
    id = Column(String, primary_key=True, index=True)
    username = Column(String, index=True)
    password = Column(String)