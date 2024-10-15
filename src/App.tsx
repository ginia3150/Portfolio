import { useState } from "react";
import "normalize.css";
import "./styles/styles.css";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  ProductOutlined,
  RocketOutlined,
  InfoCircleOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Link, BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Logo from "./assets/Roulette.svg";
import HeaderWithPopconfirm from "./components/HeaderWithPopconfirm";
import Roulette from "./components/Roulette/Roulette";
import RouletteEditor from "./components/Roulette/RouletteEditor";
import Home from "./components/Home";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);
  const [items, setItems] = useState<string[]>([]);

  const handleMouseEnter = () => {
    setCollapsed(false);
  };

  const handleMouseLeave = () => {
    setCollapsed(true);
  };

  const handeleAddItems = (newItems: string[]) => {
    setItems(newItems);
  }

  const currentPath = location.pathname.split("/").filter(i => i);

  const breadcrumbItems = [
    {
      href: "/home",
      title: <Link to="/home"><HomeOutlined /></Link>,
    },
    ...currentPath.map((_, index) => {
      const url = "/${currentPath.slice(0, index + 1).join('/')}";
      return {
        href: url,
        title: <Link to={url}>{currentPath[index]}</Link>,
      };
    })
  ];

  return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          width={170}
          collapsed={collapsed}
          collapsedWidth={70}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ background: "#fff" }}
        >
          <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]} items={[
            {
              key: "1",
              icon: <HomeOutlined className="icon"/>,
              label: <Link to={"/home"}>ホーム</Link>
            },
            {
              key: "2",
              icon: <RocketOutlined className="icon"/>,
              label: <Link to={"/roulette"}>ルーレット</Link>
            },
            {
              key: "3",
              icon: <ProductOutlined className="icon"/>,
              label: <Link to={"/applist"}>アプリ一覧</Link>
            },
            {
              key: "4",
              icon: <InfoCircleOutlined className="icon"/>,
              label: <Link to={"/update"}>アップデート</Link>
            },
          ]} />
        </Sider>
        
        <Layout>
          <Header className="header">
            <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Link to="/home">
                <img src={Logo} alt="Logo" style={{ height: "50px", cursor: "pointer", margin: "0 auto", maxWidth: "100%", maxHeight: "auto", display: "flex", alignItems: "center" }}/>
              </Link>
            </div>
            <HeaderWithPopconfirm navigate={navigate} />
          </Header>

          <Content style={{ background: "#fff", margin: "24px 16px 0" }}>
            <Breadcrumb style={{ margin: "16px 0 0 20px" }} items={breadcrumbItems} />

            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/home" element={<Home />} />
              <Route
                path="/roulette" 
                element={
                  <div style={{ padding: "24px", display: "flex", gap: "28px", flexDirection: "column" }}>
                  <RouletteEditor onAddItems={handeleAddItems}/>
                  <Roulette items={items}/>
                </div>
                }
              />
              <Route path="" />
              <Route path="" />
            </Routes>
          </Content>

          <Footer className="footer">
            <Menu mode="horizontal" className="footer-menu" items={[
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
            <div className="footer-copy">
              © {new Date().getFullYear()} Tsurugi.T. All rights reserved.
            </div>
          </Footer>
        </Layout>
      </Layout>
  );
};
export default App;