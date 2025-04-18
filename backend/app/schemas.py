from pydantic import BaseModel

class UserLogin(BaseModel):
    id: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str