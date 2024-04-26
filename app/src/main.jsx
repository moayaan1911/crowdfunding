/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import Details from './components/Details.jsx';
import { BinanceTestnet } from '@thirdweb-dev/chains';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/details/:id',
    element: <Details />,
  },
]);
const activeChain = 'binance-testnet';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={'binance-testnet'}
      clientId={'09c4e70f62deeb54f83478b51e5839ac'}
      chainId={1442}
      supportedChains={[BinanceTestnet]}
      autoConnect={false}>
      <RouterProvider router={router} />
    </ThirdwebProvider>
  </React.StrictMode>
);
