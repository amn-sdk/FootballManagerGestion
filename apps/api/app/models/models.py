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

class Club(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    name: str
    logo_url: Optional[str] = None
    primary_color: Optional[str] = None
    secondary_color: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    members: List["UserClubRole"] = Relationship(back_populates="club")
