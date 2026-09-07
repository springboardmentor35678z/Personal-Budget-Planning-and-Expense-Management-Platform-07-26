from pydantic import BaseModel, Field
from typing import List, Optional


class TransactionCreate(BaseModel):
    title: str
    category: str
    type: str  # 'income' or 'expense'
    amount: float = Field(gt=0, description="Amount must be positive")
    date: Optional[str] = None


class TransactionResponse(BaseModel):
    id: int
    user_id: int
    title: str
    category: str
    type: str
    amount: float
    date: str
    created_at: Optional[str] = None


class SummaryResponse(BaseModel):
    balance: float
    income: float
    spend: float
    savingsRate: float
    incomeTrend: str
    spendTrend: str
    balanceTrend: str


class MonthlyOverviewPoint(BaseModel):
    month: str
    income: float
    expense: float


class SavingsGoalResponse(BaseModel):
    id: int
    name: str
    target_amount: float
    current_amount: float
    progress_percentage: float
    color_badge: str


class UpcomingBillResponse(BaseModel):
    id: int
    title: str
    amount: float
    due_in_days: int
    status: str
    icon_type: str


class AlertResponse(BaseModel):
    id: int
    title: str
    description: str
    level: str
    dot_color: str


class DashboardDataResponse(BaseModel):
    summary: SummaryResponse
    monthlyOverview: List[MonthlyOverviewPoint]
    recentTransactions: List[TransactionResponse]
    alerts: List[AlertResponse]
    savingsGoals: List[SavingsGoalResponse]
    upcomingBills: List[UpcomingBillResponse]
