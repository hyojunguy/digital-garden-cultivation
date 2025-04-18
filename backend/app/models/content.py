from sqlalchemy import Column, Integer, String, Text, ForeignKey, Enum, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base

class StageEnum(str, enum.Enum):
    seed = "seed"
    sprout = "sprout"
    growth = "growth"
    flower = "flower"
    fruit = "fruit"
    harvest = "harvest"

class ContentTypeEnum(str, enum.Enum):
    text = "text"
    image = "image"
    video = "video"
    quiz = "quiz"

class Content(Base):
    __tablename__ = "contents"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    stage = Column(Enum(StageEnum))
    type = Column(Enum(ContentTypeEnum))
    content = Column(Text, nullable=True)
    media_url = Column(Text, nullable=True)
    score = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="contents")