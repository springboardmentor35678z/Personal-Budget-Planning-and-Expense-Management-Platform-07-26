from sqlalchemy.orm import Session

from src.entities.savings_goal import SavingsGoal
from src.savings_goals.models import (
    SavingsGoalCreate,
    SavingsGoalUpdateAmount,
)


def get_savings_goals(db: Session):
    return db.query(SavingsGoal).all()


def create_savings_goal(
    db: Session,
    goal_data: SavingsGoalCreate,
):
    goal = SavingsGoal(
        name=goal_data.name,
        target_amount=goal_data.target_amount,
        saved_amount=goal_data.saved_amount,
        target_date=goal_data.target_date,
    )

    db.add(goal)
    db.commit()
    db.refresh(goal)

    return goal


def add_amount(
    db: Session,
    goal_id: int,
    amount_data: SavingsGoalUpdateAmount,
):
    goal = (
        db.query(SavingsGoal)
        .filter(SavingsGoal.id == goal_id)
        .first()
    )

    if goal is None:
        return None

    new_saved_amount = goal.saved_amount + amount_data.amount

    if new_saved_amount > goal.target_amount:
        new_saved_amount = goal.target_amount

    goal.saved_amount = new_saved_amount

    db.commit()
    db.refresh(goal)

    return goal


def delete_savings_goal(
    db: Session,
    goal_id: int,
):
    goal = (
        db.query(SavingsGoal)
        .filter(SavingsGoal.id == goal_id)
        .first()
    )

    if goal is None:
        return False

    db.delete(goal)
    db.commit()

    return True