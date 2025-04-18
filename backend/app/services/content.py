from typing import Optional
import boto3
from fastapi import UploadFile
import uuid

from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.content import Content
from app.schemas.content import ContentCreate, ContentUpdate

async def upload_file_to_s3(file: UploadFile, folder: str) -> str:
    """Upload a file to AWS S3 and return the URL"""
    s3_client = boto3.client(
        's3',
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REGION
    )
    
    # Generate a unique filename
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    s3_path = f"{folder}/{unique_filename}"
    
    # Upload file
    file_content = await file.read()
    s3_client.put_object(
        Bucket=settings.AWS_BUCKET_NAME,
        Key=s3_path,
        Body=file_content,
        ContentType=file.content_type
    )
    
    # Return the URL
    return f"https://{settings.AWS_BUCKET_NAME}.s3.{settings.AWS_REGION}.amazonaws.com/{s3_path}"

def create_content(db: Session, obj_in: ContentCreate, user_id: int) -> Content:
    """Create a new content entry and update user score"""
    db_obj = Content(
        user_id=user_id,
        stage=obj_in.stage,
        type=obj_in.type,
        content=obj_in.content,
        media_url=obj_in.media_url,
        score=10  # Default score for content creation
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    
    # Update user score for this stage
    from app.services.score import update_user_score
    update_user_score(db, user_id=user_id, stage=obj_in.stage, score_to_add=10)
    
    return db_obj

def get_content(db: Session, content_id: int) -> Optional[Content]:
    return db.query(Content).filter(Content.id == content_id).first()