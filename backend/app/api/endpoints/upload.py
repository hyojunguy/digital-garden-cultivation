from fastapi import APIRouter, UploadFile, File, Depends
import boto3
import os
from app.api.deps import get_current_user

router = APIRouter()

s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    bucket_name = os.getenv('AWS_S3_BUCKET_NAME')
    user_id = current_user['id']  # Assuming the user object has an 'id' field
    file_location = f"uploads/{user_id}/{file.filename}"

    try:
        s3_client.upload_fileobj(file.file, bucket_name, file_location)
        return {"message": "File uploaded successfully", "file_location": file_location}
    except Exception as e:
        return {"error": str(e)}