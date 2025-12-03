from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from pydantic import BaseModel
from app.db.session import get_session
from app.models.models import Player, Match, Event, RpeEntry, Injury

router = APIRouter()

# --- Schemas ---

class LineupRequest(BaseModel):
    match_id: Optional[UUID] = None
    formation: str = "4-3-3"

class PlayerRecommendation(BaseModel):
    player_id: UUID
    player_name: str
    position: str
    score: float
    reason: str

class LineupSuggestion(BaseModel):
    formation: str
    starters: List[PlayerRecommendation]
    substitutes: List[PlayerRecommendation]

class RiskAssessment(BaseModel):
    player_id: UUID
    player_name: str
    risk_score: float # 0-100
    risk_level: str # LOW, MEDIUM, HIGH
    factors: List[str]

class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = None

class ChatResponse(BaseModel):
    reply: str
    actions: List[str] = []

# --- Endpoints ---

@router.post("/suggest-lineup", response_model=LineupSuggestion)
def suggest_lineup(request: LineupRequest, session: Session = Depends(get_session)):
    # Mock logic for MVP - in real app, this would use stats and availability
    players = session.exec(select(Player)).all()
    
    starters = []
    subs = []
    
    # Simple round-robin assignment for demo
    for i, p in enumerate(players):
        rec = PlayerRecommendation(
            player_id=p.id,
            player_name=f"{p.first_name} {p.last_name}",
            position=p.position_main,
            score=8.5 if i < 11 else 6.0,
            reason="Forme récente" if i < 11 else "Rotation"
        )
        if i < 11:
            starters.append(rec)
        else:
            subs.append(rec)
            
    return LineupSuggestion(
        formation=request.formation,
        starters=starters,
        substitutes=subs
    )

@router.get("/risk-assessment/{team_id}", response_model=List[RiskAssessment])
def get_risk_assessment(team_id: UUID, session: Session = Depends(get_session)):
    players = session.exec(select(Player).where(Player.team_id == team_id)).all()
    assessments = []
    
    for p in players:
        # Mock logic: Random risk based on ID hash or similar deterministic factor
        # In real app: Calculate ACWR (Acute:Chronic Workload Ratio) from RpeEntry
        risk_score = (hash(p.id) % 100) / 100.0 * 100
        level = "LOW"
        if risk_score > 70:
            level = "HIGH"
        elif risk_score > 40:
            level = "MEDIUM"
            
        assessments.append(RiskAssessment(
            player_id=p.id,
            player_name=f"{p.first_name} {p.last_name}",
            risk_score=risk_score,
            risk_level=level,
            factors=["Charge élevée" if level == "HIGH" else "Récupération incomplète" if level == "MEDIUM" else "RAS"]
        ))
        
    return assessments

@router.post("/copilot/chat", response_model=ChatResponse)
def chat_copilot(request: ChatRequest, session: Session = Depends(get_session)):
    # Simple rule-based responses for MVP
    msg = request.message.lower()
    reply = "Je n'ai pas compris votre demande."
    
    if "blessé" in msg or "injury" in msg:
        injuries = session.exec(select(Injury)).all()
        count = len(injuries)
        reply = f"Il y a actuellement {count} joueur(s) blessé(s)."
    elif "forme" in msg:
        reply = "L'équipe semble en bonne forme, la charge moyenne est stable."
    elif "entrainement" in msg:
        reply = "Voulez-vous que je propose une séance basée sur la récupération ?"
        
    return ChatResponse(reply=reply)
