from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from app.db.session import get_session
from app.core.security import create_access_token, verify_password, get_password_hash
from app.models.models import User, Club, UserClubRole, Role

router = APIRouter()

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(subject=user.id)
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/register")
def register(
    email: str, 
    password: str, 
    first_name: str, 
    last_name: str, 
    club_name: str,
    session: Session = Depends(get_session)
):
    # Check if user exists
    existing_user = session.exec(select(User).where(User.email == email)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Create User
    user = User(
        email=email,
        hashed_password=get_password_hash(password),
        first_name=first_name,
        last_name=last_name
    )
    session.add(user)
    
    # Create Club
    club = Club(name=club_name)
    session.add(club)
    session.commit() # Commit to get IDs
    session.refresh(user)
    session.refresh(club)
    
    # Assign Admin Role
    user_role = UserClubRole(user_id=user.id, club_id=club.id, role=Role.ADMIN)
    session.add(user_role)
    session.commit()
    
    access_token = create_access_token(subject=user.id)
    return {"access_token": access_token, "token_type": "bearer", "user": user, "club": club}
