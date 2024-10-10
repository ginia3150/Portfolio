import { useState } from 'react';
import 'normalize.css';
import './styles/styles.css';
import { Layout, Menu } from 'antd';
import {
  ProductOutlined,
  RocketOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Link, BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Logo from './assets/Roulette.svg';
import HeaderWithPopconfirm from './components/HeaderWithPopconfirm';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          width={170}
          collapsed={collapsed}
          collapsedWidth={70}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ background: '#fff' }}
        >
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']} items={[
            {
              key: '1',
              icon: <RocketOutlined className='icon'/>,
              label: <Link to={"/roulette"}>ルーレット</Link>
            },
            {
              key: '2',
              icon: <ProductOutlined className='icon'/>,
              label: <Link to={"/applist"}>アプリ一覧</Link>
            },
            {
              key: '3',
              icon: <InfoCircleOutlined className='icon'/>,
              label: <Link to={"/update"}>アップデート</Link>
            },
          ]}>
          </Menu>
        </Sider>
        
        <Layout>
          <Header className='header'>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <Link to="/">
                <img src={Logo} alt="Logo" style={{ height: '50px', cursor: 'pointer', margin: '0 auto', maxWidth: '100%', maxHeight: 'auto', display: 'flex', alignItems: 'center' }}/>
              </Link>
            </div>
            <HeaderWithPopconfirm navigate={navigate} />
          </Header>

          <Content style={{ background: '#fff', margin: '24px 16px 0' }}>
            Content
          </Content>

          <Footer className='footer'>
            <Menu mode="horizontal" className='footer-menu' items={[
              {
                key: "feedback",
                label: <Link to={"/feedback"}>フィードバック</Link>
              },
              {
                key: "faq",
                label: <Link to={"/faq"}>FAQ</Link>
              },
              {
                key: "contact",
                label: <Link to={"/contact"}>お問い合わせ</Link>
              },
              {
                key: "terms",
                label: <Link to={"/terms"}>利用規約・プライバシーポリシー</Link>
              },
              {
                key: "gallery",
                label: <Link to={"/gallery"}>作品ギャラリー</Link>
              },
            ]}>
            </Menu>
            <div className='footer-copy'>
              © {new Date().getFullYear()} Tsurugi.T. All rights reserved.
            </div>
          </Footer>
        </Layout>
      </Layout>
  );
};
export default App;