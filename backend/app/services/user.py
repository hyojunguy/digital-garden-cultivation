from typing import Optional

from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate

def get_user(db: Session, user_id: int) -> Optional[User]:
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_username(db: Session, username: str) -> Optional[User]:
    return db.query(User).filter(User.username == username).first()

def create_user(db: Session, obj_in: UserCreate) -> User:
    db_obj = User(
        username=obj_in.username,
        school=obj_in.school,
        class_number=obj_in.class_number,
        password_hash=get_password_hash(obj_in.password),
        is_active=True,
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    
    # Initialize scores for all stages
    from app.services.score import initialize_user_scores
    initialize_user_scores(db, user_id=db_obj.id)
    
    return db_obj

def update_user(
    db: Session, *, db_obj: User, obj_in: UserUpdate
) -> User:
    update_data = obj_in.dict(exclude_unset=True)
    
    for field in update_data:
        setattr(db_obj, field, update_data[field])
    
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj