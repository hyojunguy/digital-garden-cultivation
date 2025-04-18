# 기존 코드...

# 인증 관련 임포트 주석 처리
# from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from jose import JWTError, jwt
# from passlib.context import CryptContext

# 인증 관련 설정 주석 처리
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# 인증 관련 함수 주석 처리
# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)

# def get_password_hash(password):
#     return pwd_context.hash(password)

# 토큰 생성 및 검증 함수 주석 처리
# def create_access_token(data: dict, expires_delta: timedelta = None):
#     ...

# def verify_token(token: str = Depends(oauth2_scheme)):
#     ...

# 라우터에 인증 의존성 제거
@app.get("/api/protected-route")
# async def protected_route(current_user: User = Depends(get_current_user)):
async def protected_route():
    return {"message": "This is a protected route"}

# 기존 코드...