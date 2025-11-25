import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './utils/api';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import Pagination from './components/Pagination';
import logger from './logger';
import styled from 'styled-components';
const Container = styled.div`display:flex; gap:12px; padding:18px;`;
function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 8;
  useEffect(() => {
    let mounted = true;
    fetchTransactions()
      .then((data) => {
        if (!mounted) return;
        setTransactions(data);
        const unique = Array.from(new Set(data.map(d => d.customerId))).sort();
        setSelectedCustomer(unique[0] || null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);
  if (loading) return <div style={{padding:20}}>Loading...</div>;
  if (error) return <div style={{padding:20}}>Error: {error}</div>;
  return (
    <Container>
      <div style={{width:260}}>
        <CustomerList transactions={transactions} onSelectCustomer={(id)=>{logger.info('selected customer', id); setSelectedCustomer(id);}} selectedCustomerId={selectedCustomer} page={page} perPage={perPage} />
        <Pagination page={page} total={Array.from(new Set(transactions.map(t=>t.customerId))).length} perPage={perPage} onPage={setPage} />
      </div>
      <div style={{flex:1}}>
        {selectedCustomer ? (
          <CustomerDetails customerId={selectedCustomer} transactions={transactions} />
        ) : (
          <div>Select a customer</div>
        )}
      </div>
    </Container>
  );
}
export default App;
