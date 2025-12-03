from typing import Optional, List
from datetime import datetime
from uuid import UUID, uuid4
from sqlmodel import Field, SQLModel, Relationship
from enum import Enum

# Enums
class Role(str, Enum):
    ADMIN = "ADMIN"
    PRESIDENT_TRESORIER = "PRESIDENT_TRESORIER"
    COACH = "COACH"
    JOUEUR = "JOUEUR"

# Models
class UserClubRole(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    user_id: UUID = Field(foreign_key="user.id")
    club_id: UUID = Field(foreign_key="club.id")
    role: Role

    user: "User" = Relationship(back_populates="club_roles")
    club: "Club" = Relationship(back_populates="members")

class User(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    email: str = Field(unique=True, index=True)
    hashed_password: str
    first_name: str
    last_name: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    
    club_roles: List["UserClubRole"] = Relationship(back_populates="user")
    announcements: List["Announcement"] = Relationship(back_populates="author")
    documents: List["Document"] = Relationship(back_populates="uploader")

class Club(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str
    logo_url: Optional[str] = None
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    members: List["UserClubRole"] = Relationship(back_populates="club")
    teams: List["Team"] = Relationship(back_populates="club")
    payment_products: List["PaymentProduct"] = Relationship(back_populates="club")
    inventory_items: List["InventoryItem"] = Relationship(back_populates="club")

class Team(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    club_id: UUID = Field(foreign_key="club.id")
    name: str
    category: str # e.g., "U18", "Senior"
    season: str # e.g., "2025-2026"
    
    club: Club = Relationship(back_populates="teams")
    players: List["Player"] = Relationship(back_populates="team")
    events: List["Event"] = Relationship(back_populates="team")
    inventory_allocations: List["TeamInventoryAllocation"] = Relationship(back_populates="team")
    inventory_movements: List["InventoryMovement"] = Relationship(back_populates="team")
    announcements: List["Announcement"] = Relationship(back_populates="team")
    documents: List["Document"] = Relationship(back_populates="team")

class Player(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    team_id: UUID = Field(foreign_key="team.id")
    user_id: Optional[UUID] = Field(foreign_key="user.id", nullable=True)
    
    first_name: str
    last_name: str
    birthdate: Optional[datetime] = None
    position_main: str
    position_secondary: Optional[str] = None
    shirt_number: Optional[int] = None
    
    team: Team = Relationship(back_populates="players")
    # user: Optional[User] = Relationship(back_populates="player_profile") # Circular ref issue, handle carefully if needed
    attendances: List["EventAttendance"] = Relationship(back_populates="player")
    match_stats: List["MatchLineup"] = Relationship(back_populates="player")
    license: Optional["License"] = Relationship(back_populates="player")
    payment_assignments: List["PlayerPaymentAssignment"] = Relationship(back_populates="player")
    injuries: List["Injury"] = Relationship(back_populates="player")

class EventType(str, Enum):
    TRAINING = "TRAINING"
    MATCH = "MATCH"
    MEETING = "MEETING"
    OTHER = "OTHER"

class Event(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    team_id: UUID = Field(foreign_key="team.id")
    type: EventType
    title: str
    start_time: datetime
    end_time: datetime
    location: Optional[str] = None
    
    team: Team = Relationship(back_populates="events")
    attendances: List["EventAttendance"] = Relationship(back_populates="event")
    match_details: Optional["Match"] = Relationship(back_populates="event")

class AttendanceStatus(str, Enum):
    PRESENT = "PRESENT"
    ABSENT = "ABSENT"
    LATE = "LATE"
    EXCUSED = "EXCUSED"
    UNKNOWN = "UNKNOWN"

class EventAttendance(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    event_id: UUID = Field(foreign_key="event.id")
    player_id: UUID = Field(foreign_key="player.id")
    
    status: AttendanceStatus = AttendanceStatus.UNKNOWN
    response_status: Optional[str] = None # YES, NO, MAYBE
    
    event: Event = Relationship(back_populates="attendances")
    player: Player = Relationship(back_populates="attendances")

class Match(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    event_id: UUID = Field(foreign_key="event.id")
    opponent_name: str
    home_away: str # HOME, AWAY
    our_score: Optional[int] = None
    opponent_score: Optional[int] = None
    
    event: Event = Relationship(back_populates="match_details")
    lineups: List["MatchLineup"] = Relationship(back_populates="match")

class MatchLineup(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    match_id: UUID = Field(foreign_key="match.id")
    player_id: UUID = Field(foreign_key="player.id")
    is_starter: bool = False
    minutes_played: int = 0
    goals: int = 0
    assists: int = 0
    
    match: Match = Relationship(back_populates="lineups")
    player: Player = Relationship(back_populates="match_stats")

# Phase 3 Models

class LicenseStatus(str, Enum):
    TO_DO = "TO_DO"
    IN_PROGRESS = "IN_PROGRESS"
    VALIDATED = "VALIDATED"
    REJECTED = "REJECTED"

class License(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    player_id: UUID = Field(foreign_key="player.id")
    season: str
    license_number: Optional[str] = None
    status: LicenseStatus = LicenseStatus.TO_DO
    comment: Optional[str] = None
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    player: Player = Relationship(back_populates="license")

class PaymentProduct(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    club_id: UUID = Field(foreign_key="club.id")
    name: str
    description: Optional[str] = None
    amount_cents: int
    currency: str = "EUR"
    is_active: bool = True

    club: Club = Relationship(back_populates="payment_products")
    assignments: List["PlayerPaymentAssignment"] = Relationship(back_populates="product")

class PlayerPaymentAssignment(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    player_id: UUID = Field(foreign_key="player.id")
    product_id: UUID = Field(foreign_key="paymentproduct.id")
    total_amount_cents: int
    due_date: Optional[datetime] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    player: Player = Relationship(back_populates="payment_assignments")
    product: PaymentProduct = Relationship(back_populates="assignments")
    payments: List["Payment"] = Relationship(back_populates="assignment")

class PaymentMethod(str, Enum):
    CASH = "CASH"
    CARD = "CARD"
    BANK_TRANSFER = "BANK_TRANSFER"
    OTHER = "OTHER"

class Payment(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    assignment_id: UUID = Field(foreign_key="playerpaymentassignment.id")
    amount_cents: int
    payment_date: datetime = Field(default_factory=datetime.utcnow)
    method: PaymentMethod
    note: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    assignment: PlayerPaymentAssignment = Relationship(back_populates="payments")

class InventoryItem(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    club_id: UUID = Field(foreign_key="club.id")
    name: str
    description: Optional[str] = None
    total_quantity: int
    unit: str = "piece"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    club: Club = Relationship(back_populates="inventory_items")
    allocations: List["TeamInventoryAllocation"] = Relationship(back_populates="item")
    movements: List["InventoryMovement"] = Relationship(back_populates="item")

class TeamInventoryAllocation(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    inventory_item_id: UUID = Field(foreign_key="inventoryitem.id")
    team_id: UUID = Field(foreign_key="team.id")
    allocated_quantity: int
    created_at: datetime = Field(default_factory=datetime.utcnow)

    item: InventoryItem = Relationship(back_populates="allocations")
    team: Team = Relationship(back_populates="inventory_allocations")

class InventoryMovementType(str, Enum):
    ADD = "ADD"
    REMOVE = "REMOVE"
    LOSS = "LOSS"
    BROKEN = "BROKEN"

class InventoryMovement(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    inventory_item_id: UUID = Field(foreign_key="inventoryitem.id")
    team_id: Optional[UUID] = Field(foreign_key="team.id", nullable=True)
    type: InventoryMovementType
    quantity: int
    reason: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    item: InventoryItem = Relationship(back_populates="movements")
    team: Optional[Team] = Relationship(back_populates="inventory_movements")

class InjurySeverity(str, Enum):
    MINOR = "MINOR"
    MODERATE = "MODERATE"
    SEVERE = "SEVERE"

class InjuryStatus(str, Enum):
    REST = "REST"
    INDIVIDUAL = "INDIVIDUAL"
    TEAM_LIMITED = "TEAM_LIMITED"
    FULL = "FULL"

class Injury(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    player_id: UUID = Field(foreign_key="player.id")
    start_date: datetime
    end_date: Optional[datetime] = None
    type: str
    location: str
    severity: InjurySeverity
    status: InjuryStatus
    cause: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    player: Player = Relationship(back_populates="injuries")

class Announcement(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    team_id: UUID = Field(foreign_key="team.id")
    created_by: UUID = Field(foreign_key="user.id")
    title: str
    content: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    team: Team = Relationship(back_populates="announcements")
    author: User = Relationship(back_populates="announcements")

class DocumentCategory(str, Enum):
    REGLEMENT = "REGLEMENT"
    CHARTE = "CHARTE"
    DOC_ADMIN = "DOC_ADMIN"
    OTHER = "OTHER"

class Document(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    team_id: UUID = Field(foreign_key="team.id")
    uploaded_by: UUID = Field(foreign_key="user.id")
    name: str
    file_url: str
    category: DocumentCategory
    created_at: datetime = Field(default_factory=datetime.utcnow)

    team: Team = Relationship(back_populates="documents")
    uploader: User = Relationship(back_populates="documents")
