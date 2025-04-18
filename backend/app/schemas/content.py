from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from app.models.content import StageEnum, ContentTypeEnum

class ContentBase(BaseModel):
    stage: StageEnum
    type: ContentTypeEnum
    content: Optional[str] = None
    media_url: Optional[str] = None

class ContentCreate(ContentBase):
    pass

class ContentUpdate(BaseModel):
    content: Optional[str] = None
    media_url: Optional[str] = None

class ContentInDBBase(ContentBase):
    id: int
    user_id: int
    score: int
    created_at: datetime

    class Config:
        orm_mode = True

class Content(ContentInDBBase):
    pass