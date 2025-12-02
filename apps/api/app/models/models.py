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
    teams: List["Team"] = Relationship(back_populates="club")

class Team(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    club_id: UUID = Field(foreign_key="club.id")
    name: str
    category: str # e.g., "U18", "Senior"
    season: str # e.g., "2025-2026"
    
    club: Club = Relationship(back_populates="teams")
    players: List["Player"] = Relationship(back_populates="team")
    events: List["Event"] = Relationship(back_populates="team")

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
