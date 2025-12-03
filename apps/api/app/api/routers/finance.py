from typing import List, Optional
from uuid import UUID
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select, func
from app.db.session import get_session
from app.models.models import (
    PaymentProduct, 
    PlayerPaymentAssignment, 
    Payment, 
    Club, 
    Player
)

router = APIRouter()

# --- Products ---

@router.post("/products", response_model=PaymentProduct)
def create_product(product: PaymentProduct, session: Session = Depends(get_session)):
    session.add(product)
    session.commit()
    session.refresh(product)
    return product

@router.get("/products/club/{club_id}", response_model=List[PaymentProduct])
def read_products(club_id: UUID, session: Session = Depends(get_session)):
    products = session.exec(select(PaymentProduct).where(PaymentProduct.club_id == club_id)).all()
    return products

# --- Assignments ---

@router.post("/assignments", response_model=PlayerPaymentAssignment)
def assign_payment(assignment: PlayerPaymentAssignment, session: Session = Depends(get_session)):
    session.add(assignment)
    session.commit()
    session.refresh(assignment)
    return assignment

@router.get("/assignments/player/{player_id}", response_model=List[PlayerPaymentAssignment])
def read_player_assignments(player_id: UUID, session: Session = Depends(get_session)):
    assignments = session.exec(select(PlayerPaymentAssignment).where(PlayerPaymentAssignment.player_id == player_id)).all()
    return assignments

@router.get("/assignments/club/{club_id}", response_model=List[PlayerPaymentAssignment])
def read_club_assignments(club_id: UUID, session: Session = Depends(get_session)):
    # Join to filter by club via Product or Player -> Team -> Club
    # Simpler: Filter by product.club_id
    assignments = session.exec(
        select(PlayerPaymentAssignment)
        .join(PaymentProduct)
        .where(PaymentProduct.club_id == club_id)
    ).all()
    return assignments

# --- Payments ---

@router.post("/payments", response_model=Payment)
def create_payment(payment: Payment, session: Session = Depends(get_session)):
    session.add(payment)
    session.commit()
    session.refresh(payment)
    return payment

# --- Dashboard ---

@router.get("/dashboard/{club_id}")
def get_finance_dashboard(club_id: UUID, session: Session = Depends(get_session)):
    # Total expected (sum of assignments)
    total_expected = session.exec(
        select(func.sum(PlayerPaymentAssignment.total_amount_cents))
        .join(PaymentProduct)
        .where(PaymentProduct.club_id == club_id)
    ).one() or 0

    # Total collected (sum of payments)
    total_collected = session.exec(
        select(func.sum(Payment.amount_cents))
        .join(PlayerPaymentAssignment)
        .join(PaymentProduct)
        .where(PaymentProduct.club_id == club_id)
    ).one() or 0

    return {
        "total_expected_cents": total_expected,
        "total_collected_cents": total_collected,
        "total_due_cents": total_expected - total_collected
    }
