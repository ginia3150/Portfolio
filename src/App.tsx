import { useState } from 'react';
import 'normalize.css';
import { Layout, Menu } from 'antd';
import {
  ProductOutlined,
  RocketOutlined,
  InfoCircleOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Logo from './assets/Roulette.svg';

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);

  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    setCollapsed(true);
  };

const iconStyle = {
  fontSize: collapsed ? '24px' : '24px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

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
          <Menu.Item key="1" icon={<RocketOutlined style={iconStyle}/>}>
            ホーム
          </Menu.Item>
          <Menu.Item key="2" icon={<ProductOutlined style={iconStyle}/>}>
            プロフィール
          </Menu.Item>
          <Menu.Item key="3" icon={<InfoCircleOutlined style={iconStyle}/>}>
            問い合わせ
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>

          <Link to="/">
            <img src={Logo} alt="ロゴ" style={{ height: '50px', cursor: 'pointer', margin: '0 auto', maxWidth: '100%', maxHeight: 'auto', display: 'flex', alignItems: 'center' }}/>
          </Link>
          </div>

          <Link to="/profile" style={{ ...iconStyle, marginRight: '15px' }}>
            <IdcardOutlined/>
          </Link>
        </Header>
        <Content style={{ margin: '24px 16px 0', background: '#fff' }}>
          Content
        </Content>
        <Footer style={{ textAlign: 'center' }}>Footer</Footer>
      </Layout>
    </Layout>
  );
};
export default App;