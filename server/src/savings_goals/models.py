from datetime import date
from decimal import Decimal

from pydantic import BaseModel, Field


class SavingsGoalCreate(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    target_amount: Decimal = Field(gt=0)
    saved_amount: Decimal = Field(default=0, ge=0)
    target_date: date


class SavingsGoalResponse(BaseModel):
    id: int
    name: str
    target_amount: Decimal
    saved_amount: Decimal
    target_date: date

    class Config:
        from_attributes = True


class SavingsGoalUpdateAmount(BaseModel):
    amount: Decimal = Field(gt=0)
    