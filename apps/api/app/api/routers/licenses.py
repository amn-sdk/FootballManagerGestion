from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.models import License, Player, LicenseStatus

router = APIRouter()

@router.post("/", response_model=License)
def create_license(license: License, session: Session = Depends(get_session)):
    # Check if license already exists for player/season?
    session.add(license)
    session.commit()
    session.refresh(license)
    return license

@router.get("/player/{player_id}", response_model=List[License])
def read_player_licenses(player_id: UUID, session: Session = Depends(get_session)):
    licenses = session.exec(select(License).where(License.player_id == player_id)).all()
    return licenses

@router.patch("/{license_id}/status", response_model=License)
def update_license_status(license_id: UUID, status: LicenseStatus, session: Session = Depends(get_session)):
    license = session.get(License, license_id)
    if not license:
        raise HTTPException(status_code=404, detail="License not found")
    
    license.status = status
    session.add(license)
    session.commit()
    session.refresh(license)
    return license
