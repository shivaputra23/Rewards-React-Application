import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { aggregateCustomerTransactions } from '../utils/rewards';
import { MONTHS, YEARS } from '../constants';
import TransactionsTable from './TransactionsTable';
import styled from 'styled-components';
const Container = styled.div`padding:12px; border-left:1px solid #ddd;`;
const Select = styled.select`margin-right:8px;`;
function CustomerDetails({ customerId, transactions }) {
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const customerTx = useMemo(() => transactions.filter(t => t.customerId === customerId), [transactions, customerId]);
  const aggregated = useMemo(() => aggregateCustomerTransactions(customerTx), [customerTx]);
  const monthsKeys = useMemo(() => Object.keys(aggregated).sort().reverse(), [aggregated]);
  const totalPoints = useMemo(() => Object.values(aggregated).reduce((s, v) => s + v.points, 0), [aggregated]);
  const selectedKey = month !== null ? `${year}-${String(Number(month) + 1).padStart(2, '0')}` : monthsKeys.slice(0, 3)[0] || null;
  const monthEntries = Object.entries(aggregated).sort((a,b)=> b[0].localeCompare(a[0]));
  return (
    <Container>
      <h3>Customer: {customerId}</h3>
      <div> Total Points: {totalPoints}</div>
      <div style={{marginTop:12}}>
        <label>Year</label>
        <Select value={year} onChange={(e)=> setYear(Number(e.target.value))}>
          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
        </Select>
        <label>Month</label>
        <Select value={month ?? ''} onChange={(e)=> setMonth(e.target.value === '' ? null : Number(e.target.value))}>
          <option value="">-- last 3 months --</option>
          {MONTHS.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
        </Select>
      </div>
      <div style={{marginTop:16}}>
        <h4>Monthly Points</h4>
        {monthEntries.length === 0 && <div>No transactions</div>}
        <ul>
          {monthEntries.map(([key, val]) => (
            <li key={key} style={{padding:6}}>
              {key} — {val.points} points
              <button style={{marginLeft:8}} onClick={()=>{ const [y, m] = key.split('-'); setYear(Number(y)); setMonth(Number(m)-1); }}>View</button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{marginTop:20}}>
        <h4>Transactions for {selectedKey || 'N/A'}</h4>
        {selectedKey && aggregated[selectedKey] ? (
          <TransactionsTable transactions={aggregated[selectedKey].transactions} />
        ) : (
          <div>No transactions</div>
        )}
      </div>
    </Container>
  );
}
CustomerDetails.propTypes = { customerId: PropTypes.string.isRequired, transactions: PropTypes.array.isRequired };
export default CustomerDetails;
