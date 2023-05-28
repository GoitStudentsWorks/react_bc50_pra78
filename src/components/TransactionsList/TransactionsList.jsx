import * as React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilterDate } from 'redux/transaction/transactionSelectors';

import {
  BtnDelStyled,
  ScrollWrapStyled,
  SvgStyled,
  TableColumnStyled,
  TableHeadColumnStyled,
  TableHeadRowStyled,
  TableRowStyled,
  TableStyled,
} from './TransactionsList.styled';
import { selectionExpenses, selectionIncome } from '../../shared/category';
import { delete as icon } from '../../images/Categories/index';
import { deleteTransaction } from 'redux/transaction/transactionOperations';
import { useMemo } from 'react';

const TransactionsList = () => {
  const params = useParams();
  const expenses = params.expenses;
  const dispatch = useDispatch();
  const transactionExpenses = useSelector(state => state.transaction.expenses);
  const transactionIncomes = useSelector(state => state.transaction.incomes);
  const dateFilter = useSelector(selectFilterDate);
  let transaction;
  const categoryChange = [...selectionExpenses, ...selectionIncome];

  const transactionIncome = useMemo(() => {
    return transactionIncomes
      .filter(el => el.date.includes(dateFilter))
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }, [dateFilter, transactionIncomes]);
  const transactionExpense = useMemo(() => {
    return transactionExpenses
      .filter(el => el.date.includes(dateFilter))
      .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
  }, [dateFilter, transactionExpenses]);

  expenses === 'income'
    ? (transaction = transactionIncome)
    : (transaction = transactionExpense);

  // console.log('trans', transaction.length);

  return (
    <div>
      <TableStyled>
        <thead>
        <TableHeadRowStyled>
          <TableHeadColumnStyled>DATE</TableHeadColumnStyled>
          <TableHeadColumnStyled>DESCRIPTION</TableHeadColumnStyled>
          <TableHeadColumnStyled>CATEGORY</TableHeadColumnStyled>
          <TableHeadColumnStyled>SUM</TableHeadColumnStyled>
          <TableHeadColumnStyled></TableHeadColumnStyled>
        </TableHeadRowStyled>
        </thead>
      </TableStyled>
      <ScrollWrapStyled>
        <TableStyled>
          <tbody>
            {transaction.map(el => (
              <TableRowStyled key={el._id}>
                <TableColumnStyled>{el.date}</TableColumnStyled>
                <TableColumnStyled>{el.description}</TableColumnStyled>
                <TableColumnStyled>
                  {categoryChange
                    .filter(({ value, label, trans }) => trans === el.category)
                    .map(el => el.label)
                    .join()}
                </TableColumnStyled>
                <TableColumnStyled data-color={expenses}>
                  {expenses === 'income'
                    ? el.amount.toFixed(2)
                    : `-${el.amount.toFixed(2)}`}{' '}
                  UAH.
                </TableColumnStyled>
                <TableColumnStyled>
                  <BtnDelStyled
                    type="button"
                    onClick={() => dispatch(deleteTransaction(el._id))}
                  >
                    <SvgStyled src={icon} />
                  </BtnDelStyled>
                </TableColumnStyled>
              </TableRowStyled>
            ))}
          </tbody>
        </TableStyled>
      </ScrollWrapStyled>
    </div>
  );
};

export default TransactionsList;
