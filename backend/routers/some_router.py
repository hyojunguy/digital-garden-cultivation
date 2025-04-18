# 기존 코드...

# 인증 의존성 주석 처리
@router.get("/some-endpoint")
# async def some_endpoint(current_user: User = Depends(get_current_user)):
async def some_endpoint():
    return {"data": "some data"}

# 기존 코드...