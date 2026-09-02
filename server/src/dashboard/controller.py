from fastapi import APIRouter, Header, Query, HTTPException, status
from typing import Optional, List
from src.dashboard.models import (
    DashboardDataResponse,
    SummaryResponse,
    MonthlyOverviewPoint,
    TransactionResponse,
    TransactionCreate,
    SavingsGoalResponse,
    UpcomingBillResponse,
    AlertResponse,
)
from src.dashboard.service import DashboardService

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])


def get_current_user_id(x_user_id: Optional[str] = Header(default="1")) -> int:
    """Extract user_id from X-User-Id request header, defaulting to 1 (Alex Chen)."""
    try:
        if x_user_id and x_user_id.isdigit():
            return int(x_user_id)
        return 1
    except Exception:
        return 1


@router.get("/data", response_model=DashboardDataResponse)
def get_dashboard_data(
    range: str = Query(default="6M", description="Chart timeframe: 1M, 3M, or 6M"),
    x_user_id: Optional[str] = Header(default="1"),
):
    """Consolidated endpoint returning all required dashboard metrics and lists."""
    user_id = get_current_user_id(x_user_id)
    return DashboardService.get_full_dashboard_data(user_id, range)


@router.get("/summary", response_model=SummaryResponse)
def get_summary(x_user_id: Optional[str] = Header(default="1")):
    user_id = get_current_user_id(x_user_id)
    return DashboardService.get_summary(user_id)


@router.get("/chart", response_model=List[MonthlyOverviewPoint])
def get_chart_data(
    range: str = Query(default="6M", description="Chart timeframe: 1M, 3M, or 6M"),
    x_user_id: Optional[str] = Header(default="1"),
):
    user_id = get_current_user_id(x_user_id)
    return DashboardService.get_monthly_overview(user_id, range)


@router.get("/transactions", response_model=List[TransactionResponse])
def get_transactions(
    limit: int = Query(default=6, ge=1, le=50),
    x_user_id: Optional[str] = Header(default="1"),
):
    user_id = get_current_user_id(x_user_id)
    return DashboardService.get_recent_transactions(user_id, limit=limit)


@router.post("/transactions", response_model=TransactionResponse, status_code=status.HTTP_201_CREATED)
def create_transaction(
    payload: TransactionCreate,
    x_user_id: Optional[str] = Header(default="1"),
):
    """Adds a new expense or income transaction to the database."""
    user_id = get_current_user_id(x_user_id)
    if payload.type.lower() not in ["income", "expense"]:
        raise HTTPException(status_code=400, detail="Transaction type must be 'income' or 'expense'")

    return DashboardService.add_transaction(
        user_id=user_id,
        title=payload.title,
        category=payload.category,
        type_=payload.type.lower(),
        amount=payload.amount,
        date=payload.date,
    )


@router.get("/goals", response_model=List[SavingsGoalResponse])
def get_savings_goals(x_user_id: Optional[str] = Header(default="1")):
    user_id = get_current_user_id(x_user_id)
    return DashboardService.get_savings_goals(user_id)


@router.get("/bills", response_model=List[UpcomingBillResponse])
def get_upcoming_bills(x_user_id: Optional[str] = Header(default="1")):
    user_id = get_current_user_id(x_user_id)
    return DashboardService.get_upcoming_bills(user_id)


@router.get("/alerts", response_model=List[AlertResponse])
def get_alerts(x_user_id: Optional[str] = Header(default="1")):
    user_id = get_current_user_id(x_user_id)
    return DashboardService.get_alerts(user_id)
