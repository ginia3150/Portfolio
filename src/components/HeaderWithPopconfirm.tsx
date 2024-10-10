import { useState } from "react";
import { IdcardOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface HeaderWithTooltipProps {
    navigate: (path: string) => void;
}

const HeaderWithTooltip: React.FC<HeaderWithTooltipProps> = ({ navigate }) => {
    const [visible, setVisible] = useState(false);

    const showTooltip = () => {
        setVisible(true);
    };

    const hideTooltip = () => {
        setVisible(false);
    }

    const handleTooltip = () => {
        setVisible(false);
        navigate("/profile");
    };

    return (
        <div onMouseLeave={hideTooltip}>
            <Tooltip
                title="プロフィールに移動しますか？"
                open={visible}
                color="lime"
            >
                <IdcardOutlined
                    className="icon"
                    style={{ marginRight: '15px' }}
                    onMouseEnter={showTooltip}
                    onClick={handleTooltip}
                />
            </Tooltip>
        </div>
    );
};

export default HeaderWithTooltip;