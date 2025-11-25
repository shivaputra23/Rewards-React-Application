import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
const List = styled.ul`padding:0; list-style:none;`;
const Item = styled.li`padding:8px; border-bottom:1px solid #eee; cursor:pointer;`;
function CustomerList({ transactions, onSelectCustomer, selectedCustomerId, perPage=10, page=1 }) {
  const customers = useMemo(() => {
    const map = new Map();
    transactions.forEach(tx => map.set(tx.customerId, (map.get(tx.customerId) || []).concat(tx)));
    return Array.from(map.keys()).sort();
  }, [transactions]);
  const start = (page - 1) * perPage;
  const slice = customers.slice(start, start + perPage);
  return (
    <div>
      <h3>Customers</h3>
      <List>
        {slice.map((cid) => (
          <Item key={cid} onClick={() => onSelectCustomer(cid)} style={{background: cid === selectedCustomerId ? '#f0f8ff' : 'transparent'}}>
            {cid}
          </Item>
        ))}
      </List>
    </div>
  );
}
CustomerList.propTypes = {
  transactions: PropTypes.array.isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
  selectedCustomerId: PropTypes.string,
  perPage: PropTypes.number,
  page: PropTypes.number
};
export default CustomerList;
