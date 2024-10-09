import { useState } from 'react';
import 'normalize.css';
import './styles/styles.css';
import { Layout, Menu } from 'antd';
import {
  ProductOutlined,
  RocketOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from './assets/Roulette.svg';
import HeaderWithPopconfirm from './components/HeaderWithPopconfirm';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
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
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<RocketOutlined className='icon'/>}>
            ルーレット
          </Menu.Item>
          <Menu.Item key="2" icon={<ProductOutlined className='icon'/>}>
            アプリ一覧
          </Menu.Item>
          <Menu.Item key="3" icon={<InfoCircleOutlined className='icon'/>}>
            アップデート
          </Menu.Item>
        </Menu>
      </Sider>
      
      <Layout>
        <Header className='header'>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Link to="/">
              <img src={Logo} alt="ロゴ" style={{ height: '50px', cursor: 'pointer', margin: '0 auto', maxWidth: '100%', maxHeight: 'auto', display: 'flex', alignItems: 'center' }}/>
            </Link>
          </div>
          <HeaderWithPopconfirm />
        </Header>

        <Content style={{ background: '#fff', margin: '24px 16px 0' }}>
          Content
        </Content>

        <Footer className='footer'>
          <Menu mode="horizontal" className='footer-menu'>
            <Menu.Item key={"feedback"}>
              <Link to={"feedback"}>フィードバック</Link>
            </Menu.Item>
            <Menu.Item key={"faq"}>
              <Link to={"faq"}>FAQ</Link>
            </Menu.Item>
            <Menu.Item key={"contact"}>
              <Link to={"contact"}>お問い合わせ</Link>
            </Menu.Item>
            <Menu.Item key={"terms"}>
              <Link to={"terms"}>利用規約・プライバシーポリシー</Link>
            </Menu.Item>
            <Menu.Item key={"gallery"}>
              <Link to={"gallery"}>作品ギャラリー</Link>
            </Menu.Item>
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