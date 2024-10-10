import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { ConfigProvider, theme } from 'antd';

const customTheme = {
  token: {
    colorPrimary: '#61fdbc',
    colorSuccess: '#52c41a', 
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorInfo: '#61fdbc',
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={customTheme}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
