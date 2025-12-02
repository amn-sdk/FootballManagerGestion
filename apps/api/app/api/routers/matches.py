from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.models import Match, MatchLineup, Event, MatchLineup

router = APIRouter()

@router.post("/{event_id}/result", response_model=Match)
def update_match_result(
    event_id: UUID, 
    our_score: int, 
    opponent_score: int, 
    session: Session = Depends(get_session)
):
    # Find match by event_id or create if not exists
    match = session.exec(select(Match).where(Match.event_id == event_id)).first()
    
    if not match:
        # We need to fetch event to get details for creation if needed, 
        # but for now let's assume we create it linked to event
        # In a real app, we might want to create the Match object when Event is created if type is MATCH
        # For MVP, let's create it here on demand
        event = session.get(Event, event_id)
        if not event:
             raise HTTPException(status_code=404, detail="Event not found")
        
        match = Match(
            event_id=event_id, 
            opponent_name="Unknown", # Should be passed or updated
            home_away="HOME"
        )
        session.add(match)
    
    match.our_score = our_score
    match.opponent_score = opponent_score
    session.add(match)
    session.commit()
    session.refresh(match)
    return match

@router.post("/{match_id}/lineup", response_model=MatchLineup)
def update_lineup(
    match_id: UUID,
    player_id: UUID,
    is_starter: bool,
    session: Session = Depends(get_session)
):
    lineup = session.exec(
        select(MatchLineup)
        .where(MatchLineup.match_id == match_id)
        .where(MatchLineup.player_id == player_id)
    ).first()
    
    if not lineup:
        lineup = MatchLineup(match_id=match_id, player_id=player_id)
    
    lineup.is_starter = is_starter
    session.add(lineup)
    session.commit()
    session.refresh(lineup)
    return lineup
