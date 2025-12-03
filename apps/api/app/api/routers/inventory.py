from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from app.db.session import get_session
from app.models.models import (
    InventoryItem, 
    TeamInventoryAllocation, 
    InventoryMovement,
    InventoryMovementType
)

router = APIRouter()

# --- Items ---

@router.post("/items", response_model=InventoryItem)
def create_item(item: InventoryItem, session: Session = Depends(get_session)):
    session.add(item)
    session.commit()
    session.refresh(item)
    return item

@router.get("/items/club/{club_id}", response_model=List[InventoryItem])
def read_items(club_id: UUID, session: Session = Depends(get_session)):
    items = session.exec(select(InventoryItem).where(InventoryItem.club_id == club_id)).all()
    return items

# --- Allocations ---

@router.post("/allocations", response_model=TeamInventoryAllocation)
def allocate_item(allocation: TeamInventoryAllocation, session: Session = Depends(get_session)):
    session.add(allocation)
    session.commit()
    session.refresh(allocation)
    return allocation

# --- Movements ---

@router.post("/movements", response_model=InventoryMovement)
def create_movement(movement: InventoryMovement, session: Session = Depends(get_session)):
    # Logic to update total_quantity or allocated_quantity could go here
    # For now, just record the movement
    
    item = session.get(InventoryItem, movement.inventory_item_id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    if movement.type == InventoryMovementType.ADD:
        item.total_quantity += movement.quantity
    elif movement.type in [InventoryMovementType.REMOVE, InventoryMovementType.LOSS, InventoryMovementType.BROKEN]:
        item.total_quantity -= movement.quantity
    
    session.add(item)
    session.add(movement)
    session.commit()
    session.refresh(movement)
    return movement
