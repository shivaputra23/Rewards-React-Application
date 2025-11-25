import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const Table = styled.table`width:100%; border-collapse:collapse;`;
const Th = styled.th`text-align:left; padding:8px; border-bottom:1px solid #ddd;`;
const Td = styled.td`padding:8px; border-bottom:1px solid #f2f2f2;`;
function TransactionsTable({ transactions }) {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Transaction ID</Th>
          <Th>Date</Th>
          <Th>Amount</Th>
          <Th>Points</Th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(tx => (
          <tr key={tx.transactionId}>
            <Td>{tx.transactionId}</Td>
            <Td>{tx.date}</Td>
            <Td>${tx.amount}</Td>
            <Td>{tx.points}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
TransactionsTable.propTypes = { transactions: PropTypes.array.isRequired };
export default TransactionsTable;
