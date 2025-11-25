import logger from '../logger';
export function fetchTransactions() {
  logger.info('API: fetchTransactions called');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch('/data/transactions.json')
        .then((res) => {
          if (!res.ok) throw new Error('Network response was not ok');
          return res.json();
        })
        .then((data) => {
          logger.info({ msg: 'fetched transactions', count: data.length });
          resolve(data);
        })
        .catch((err) => {
          logger.error('fetchTransactions failed', err && err.message);
          reject(err);
        });
    }, 700);
  });
}
