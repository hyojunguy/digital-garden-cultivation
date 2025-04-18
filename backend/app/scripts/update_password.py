from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.security import get_password_hash
from app.models.user import User

# MySQL database URL
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://loop:loopailabs@169.211.254.16:3306/digital_garden"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def update_user_password():
    db = SessionLocal()
    try:
        # Find the admin user
        user = db.query(User).filter(User.username == "admin").first()
        if user:
            # Update with properly hashed password
            user.password = get_password_hash("admin123")
            db.commit()
            print("Password updated successfully")
        else:
            print("User not found")
    finally:
        db.close()

if __name__ == "__main__":
    update_user_password()