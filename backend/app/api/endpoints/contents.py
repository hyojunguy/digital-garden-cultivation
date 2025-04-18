from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from app.api.deps import get_current_user
import boto3
import os
from typing import Optional

router = APIRouter()

s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)

@router.post("/contents")
async def upload_contents(file: UploadFile = File(...)):
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")
    # Optionally, save the file or upload to S3 here
    return {"message": "File uploaded successfully", "filename": file.filename}

@router.get("/contents")
async def get_contents(stage: str):
    if stage == "seed":
        return {"message": "Seed stage contents"}
    else:
        return {"error": "Stage not found"}