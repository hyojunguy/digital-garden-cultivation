from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from app.models.content import StageEnum

class ScoreBase(BaseModel):
    stage: StageEnum
    score: int

class ScoreCreate(ScoreBase):
    pass

class ScoreUpdate(BaseModel):
    score: Optional[int] = None

class ScoreInDBBase(ScoreBase):
    id: int
    user_id: int
    updated_at: datetime

    class Config:
        orm_mode = True

class Score(ScoreInDBBase):
    pass