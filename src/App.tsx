import { useState } from 'react';
import 'normalize.css';
import { Flex, Layout, Menu } from 'antd';
import {
  ProductOutlined,
  RocketOutlined,
  InfoCircleOutlined,
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        width={160}
        collapsed={collapsed}
        collapsedWidth={60}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ background: '#fff' }}
      >
        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<RocketOutlined />}>
            ホーム
          </Menu.Item>
          <Menu.Item key="2" icon={<ProductOutlined />}>
            プロフィール
          </Menu.Item>
          <Menu.Item key="3" icon={<InfoCircleOutlined />}>
            問い合わせ
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, display: 'flex', justifyContent: 'flex-start'}}>
          <Link to="/">
            <img src={Logo} alt="ロゴ" style={{ height: '50px', cursor: 'pointer', marginLeft: '15px', marginTop: '1vh', maxWidth: '100%', maxHeight: 'auto' }}/>
          </Link>

          <style>{`
            @media (max-width: 760px) {
              Header {
                height: 56px;
              }
              img {
                height: 40px;
                marginTop: '0.5vh';
              }
            }
            @media (max-width: 480px) {
              Header {
                height: 48px;
              }
              img {
                height: 30px;
                marginTop: '0.3vh';
              }
            }
          `}</style>
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
