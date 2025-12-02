from typing import List, Optional
from uuid import UUID
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.models import Event, EventType, Team, EventAttendance, Player

router = APIRouter()

@router.post("/", response_model=Event)
def create_event(event: Event, session: Session = Depends(get_session)):
    session.add(event)
    session.commit()
    session.refresh(event)
    
    # Auto-create attendance records for all players in the team
    players = session.exec(select(Player).where(Player.team_id == event.team_id)).all()
    for player in players:
        attendance = EventAttendance(event_id=event.id, player_id=player.id)
        session.add(attendance)
    session.commit()
    
    return event

@router.get("/", response_model=List[Event])
def read_events(
    team_id: UUID, 
    start_date: Optional[datetime] = None, 
    end_date: Optional[datetime] = None,
    session: Session = Depends(get_session)
):
    query = select(Event).where(Event.team_id == team_id)
    if start_date:
        query = query.where(Event.start_time >= start_date)
    if end_date:
        query = query.where(Event.end_time <= end_date)
    
    events = session.exec(query).all()
    return events

@router.get("/{event_id}", response_model=Event)
def read_event(event_id: UUID, session: Session = Depends(get_session)):
    event = session.get(Event, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

@router.post("/{event_id}/attendance", response_model=EventAttendance)
def update_attendance(
    event_id: UUID, 
    player_id: UUID, 
    status: str, 
    session: Session = Depends(get_session)
):
    attendance = session.exec(
        select(EventAttendance)
        .where(EventAttendance.event_id == event_id)
        .where(EventAttendance.player_id == player_id)
    ).first()
    
    if not attendance:
        raise HTTPException(status_code=404, detail="Attendance record not found")
    
    attendance.response_status = status
    session.add(attendance)
    session.commit()
    session.refresh(attendance)
    return attendance
