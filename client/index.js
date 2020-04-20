import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import styles from './index.module.scss';
import App from './ListingPage';
import ScrollToTop from './components/ScrollToTop';

document.addEventListener('DOMContentLoaded', () => {
  let root = document.getElementById('root');
  if (!root) {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  }
  ReactDOM.render(
    <BrowserRouter>
      <ScrollToTop>
        <App className={`${styles.body} ${styles.code}`} />
      </ScrollToTop>
    </BrowserRouter>,
    root
  );
});
