import React from 'react';
import PropTypes from 'prop-types';
function Pagination({ page, total, perPage, onPage }) {
  const totalPages = Math.ceil(total / perPage);
  return (
    <div style={{marginTop:8}}>
      <button onClick={() => onPage(Math.max(1, page - 1))} disabled={page <= 1}>Prev</button>
      <span style={{margin: '0 8px'}}>Page {page} / {totalPages}</span>
      <button onClick={() => onPage(Math.min(totalPages, page + 1))} disabled={page >= totalPages}>Next</button>
    </div>
  );
}
Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  onPage: PropTypes.func.isRequired
};
export default Pagination;
