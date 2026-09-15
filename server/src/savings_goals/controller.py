from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from src.database.core import SessionLocal
from src.savings_goals.models import (
    SavingsGoalCreate,
    SavingsGoalResponse,
    SavingsGoalUpdateAmount,
)
from src.savings_goals.service import (
    add_amount,
    create_savings_goal,
    delete_savings_goal,
    get_savings_goals,
)


router = APIRouter(
    prefix="/savings-goals",
    tags=["Savings Goals"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@router.get(
    "",
    response_model=list[SavingsGoalResponse],
)
def get_goals(
    db: Session = Depends(get_db),
):
    return get_savings_goals(db)


@router.post(
    "",
    response_model=SavingsGoalResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_goal(
    goal_data: SavingsGoalCreate,
    db: Session = Depends(get_db),
):
    return create_savings_goal(db, goal_data)


@router.patch(
    "/{goal_id}/amount",
    response_model=SavingsGoalResponse,
)
def update_goal_amount(
    goal_id: int,
    amount_data: SavingsGoalUpdateAmount,
    db: Session = Depends(get_db),
):
    goal = add_amount(
        db,
        goal_id,
        amount_data,
    )

    if goal is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Savings goal not found",
        )

    return goal


@router.delete(
    "/{goal_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_goal(
    goal_id: int,
    db: Session = Depends(get_db),
):
    deleted = delete_savings_goal(
        db,
        goal_id,
    )

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Savings goal not found",
        )

    return None