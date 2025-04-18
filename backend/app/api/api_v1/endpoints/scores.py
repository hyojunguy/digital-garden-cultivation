from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.models.score import Score
from app.models.content import StageEnum
from app.schemas.score import Score as ScoreSchema

router = APIRouter()

@router.get("/", response_model=List[ScoreSchema])
def read_scores(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Retrieve scores.
    """
    scores = db.query(Score).filter(Score.user_id == current_user.id).all()
    return scores

@router.get("/current-stage", response_model=StageEnum)
def get_current_stage(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get user's current stage based on scores.
    """
    from app.services.score import get_user_current_stage
    
    current_stage = get_user_current_stage(db, user_id=current_user.id)
    return current_stage