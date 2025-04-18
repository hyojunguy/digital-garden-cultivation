from fastapi import APIRouter

router = APIRouter()

@router.get("/scores")
async def get_scores():
    # Implement logic to retrieve scores
    return {"message": "Scores retrieved successfully"}

@router.get("/scores/current-stage")
async def get_current_stage_score():
    # Implement logic to retrieve current stage score
    return {"message": "Current stage score retrieved successfully"}