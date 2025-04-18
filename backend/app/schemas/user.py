from typing import Optional, List
from pydantic import BaseModel, EmailStr

# Base schema with shared attributes
class UserBase(BaseModel):
    username: str
    email: EmailStr

# Schema for creating a user - only include fields that exist in the database
class UserCreate(UserBase):
    password: str

# Schema for updating a user - fields should be optional
class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None # Optional: Include if password updates are allowed

# Schema for reading user data
class User(UserBase):
    id: int
    is_active: bool = True

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"