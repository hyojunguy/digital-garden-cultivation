from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.score import Score
from app.models.content import StageEnum

def get_user_scores(db: Session, user_id: int) -> List[Score]:
    return db.query(Score).filter(Score.user_id == user_id).all()

def get_user_score_by_stage(db: Session, user_id: int, stage: StageEnum) -> Optional[Score]:
    return db.query(Score).filter(
        Score.user_id == user_id,
        Score.stage == stage
    ).first()

def initialize_user_scores(db: Session, user_id: int) -> None:
    """Initialize scores for all stages for a new user"""
    for stage in StageEnum:
        # Start with 10 points in seed stage, 0 in others
        initial_score = 10 if stage == StageEnum.seed else 0
        
        db_obj = Score(
            user_id=user_id,
            stage=stage,
            score=initial_score
        )
        db.add(db_obj)
    
    db.commit()

def update_user_score(db: Session, user_id: int, stage: StageEnum, score_to_add: int) -> Score:
    """Update user score for a specific stage"""
    score = get_user_score_by_stage(db, user_id, stage)
    
    if not score:
        # Create score if it doesn't exist
        score = Score(
            user_id=user_id,
            stage=stage,
            score=score_to_add
        )
        db.add(score)
    else:
        # Update existing score
        score.score += score_to_add
        db.add(score)
    
    db.commit()
    db.refresh(score)
    return score

def get_user_current_stage(db: Session, user_id: int) -> StageEnum:
    """Determine user's current stage based on scores"""
    # Stage thresholds
    thresholds = {
        StageEnum.seed: 0,      # Start at seed
        StageEnum.sprout: 30,   # Need 30 points to reach sprout
        StageEnum.growth: 60,   # Need 60 points to reach growth
        StageEnum.flower: 100,  # Need 100 points to reach flower
        StageEnum.fruit: 150,   # Need 150 points to reach fruit
        StageEnum.harvest: 200  # Need 200 points to reach harvest
    }
    
    # Get total score across all stages
    scores = get_user_scores(db, user_id)
    total_score = sum(score.score for score in scores)
    
    # Determine current stage based on total score
    current_stage = StageEnum.seed  # Default
    
    for stage, threshold in sorted(thresholds.items(), key=lambda x: x[1], reverse=True):
        if total_score >= threshold:
            current_stage = stage
            break
    
    return current_stage