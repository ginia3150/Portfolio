import { useState } from "react";
import { IdcardOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

interface HeaderWithPopconfirmProps {
    navigate: (path: string) => void;
}

const HeaderWithPopconfirm: React.FC<HeaderWithPopconfirmProps> = ({ navigate }) => {
    const [visible, setVisible] = useState(false);

    const showPopconfirm = () => {
        setVisible(true);
    };

    const handleConfirm = () => {
        setVisible(false);
        navigate("/profile");
    };

    const headleCancel = () => {
        setVisible(false);
    };

    const handleMouseLeave = () => {
        setVisible(false);
    }

    return (
        <div onMouseLeave={handleMouseLeave}>
            <Popconfirm
                title="プロフィールページに移動しますか？"
                open={visible}
                onConfirm={handleConfirm}
                onCancel={headleCancel}
                okText="はい"
                cancelText="いいえ"
            >
                <IdcardOutlined
                    className="icon"
                    style={{ marginRight: '15px' }}
                    onMouseEnter={showPopconfirm}
                />
            </Popconfirm>
        </div>
    );
};

export default HeaderWithPopconfirm;