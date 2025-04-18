from typing import Any, List, Optional

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from app.api.deps import get_current_user, get_db
from app.models.user import User
from app.models.content import Content, StageEnum, ContentTypeEnum
from app.schemas.content import Content as ContentSchema, ContentCreate, ContentUpdate

router = APIRouter()

@router.post("/", response_model=ContentSchema)
async def create_content(
    *,
    db: Session = Depends(get_db),
    stage: StageEnum,
    type: ContentTypeEnum,
    content: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create new content.
    """
    from app.services.content import create_content, upload_file_to_s3
    
    # Handle file upload if provided
    media_url = None
    if file and (type == ContentTypeEnum.image or type == ContentTypeEnum.video):
        media_url = await upload_file_to_s3(file, f"{current_user.id}/{stage}")
    
    content_in = ContentCreate(
        stage=stage,
        type=type,
        content=content,
        media_url=media_url
    )
    
    content = create_content(db, obj_in=content_in, user_id=current_user.id)
    return content

@router.get("/", response_model=List[ContentSchema])
def read_contents(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    stage: Optional[StageEnum] = None,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Retrieve contents.
    """
    query = db.query(Content).filter(Content.user_id == current_user.id)
    
    if stage:
        query = query.filter(Content.stage == stage)
    
    contents = query.offset(skip).limit(limit).all()
    return contents

@router.get("/{content_id}", response_model=ContentSchema)
def read_content(
    *,
    db: Session = Depends(get_db),
    content_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get content by ID.
    """
    content = db.query(Content).filter(
        Content.id == content_id, 
        Content.user_id == current_user.id
    ).first()
    
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    
    return content