import React, { useState } from "react";
import { Input, List, Form } from "antd";

interface RouletteEditorProps {
    onAddItems: (items: string[]) => void;
}

const RouletteEditor: React.FC<RouletteEditorProps> = ({ onAddItems }) => {
    const [inputValue, setInputValue] = useState("");
    const [itemList, setItemList] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && inputValue.trim()) {
            const updatedItems = [...itemList, inputValue.trim()];
            setItemList(updatedItems);
            setInputValue("");
            onAddItems(updatedItems);
        }
    }

    return (
        <Form layout="vertical">
            <Form.Item label="ルーレット項目の入力">
                <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    placeholder="項目を入力してEnterを押す"
                    style={{ width: 300 }}
                />
            </Form.Item>

            <List
                header={<div>ルーレット項目リスト</div>}
                bordered
                dataSource={itemList}
                renderItem={(item) => <List.Item>{item}</List.Item>}
                style={{ width: 300 }}
            />
        </Form>
    );
};
export default RouletteEditor;