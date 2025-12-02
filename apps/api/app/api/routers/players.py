from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.models import Player, Team

router = APIRouter()

@router.post("/", response_model=Player)
def create_player(player: Player, session: Session = Depends(get_session)):
    session.add(player)
    session.commit()
    session.refresh(player)
    return player

@router.get("/team/{team_id}", response_model=List[Player])
def read_players(team_id: UUID, session: Session = Depends(get_session)):
    players = session.exec(select(Player).where(Player.team_id == team_id)).all()
    return players

@router.get("/{player_id}", response_model=Player)
def read_player(player_id: UUID, session: Session = Depends(get_session)):
    player = session.get(Player, player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player

@router.delete("/{player_id}")
def delete_player(player_id: UUID, session: Session = Depends(get_session)):
    player = session.get(Player, player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    session.delete(player)
    session.commit()
    return {"ok": True}
