// import { createSelector } from '@reduxjs/toolkit';
export const selectReportsIsLoading = state => state.reports.isLoading;

export const selectIncomesTotal = state => state.reports.incomes.incomeTotal;
export const selectExpensesTotal = state => state.reports.expenses.expenseTotal;
