import React, { useRef, useState, useEffect } from "react";
import { Input, List, Form, InputRef, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface RouletteEditorProps {
    onAddItems: (items: { name: string; count?: number | null; time?: number | null }[]) => void;
}

const RouletteEditor: React.FC<RouletteEditorProps> = ({ onAddItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [countValue, setCountValue] = useState<number | null>(null);
    const [timeValue, setTimeValue] = useState<number | null>(null);
    const [itemList, setItemList] = useState<{ name: string; count?: number | null; time?: number | null }[]>([]);

    const inputRef = useRef<InputRef>(null);
    const countRef = useRef<InputRef>(null);
    const timeRef = useRef<InputRef>(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        handleAddOrUpdateItem();
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setCountValue(isNaN(value) ? null : value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeValue(Number(e.target.value) || null);
    };

    const saveToLocalStorage = (items: any[]) => {
        localStorage.setItem("rouletteItems", JSON.stringify(items));
    };

    const loadFromLocalStorage = () => {
        const savedItems = localStorage.getItem("rouletteItems");
        return savedItems ? JSON.parse(savedItems) : [];
    };

    useEffect(() => {
        const intialItems = [
          { name: "スクワット", count: 10 },
          { name: "腕立て伏せ", count: 10 },
          { name: "腹筋", count: 10 },
          { name: "プランク", time: 10 }  
        ];
        const savedItems = loadFromLocalStorage();
        const itemToDisplay = savedItems.length > 0 ? savedItems : intialItems;

        setItemList(itemToDisplay);
        onAddItems(itemToDisplay);
    }, [onAddItems]);

    const handleAddOrUpdateItem = () => {
        const newItem = inputValue.includes("プランク")
            ? { name: inputValue.trim(), time: timeValue }
            : { name: inputValue.trim(), count: countValue };

        const updatedItems = [...itemList, newItem];
        setItemList(updatedItems);
        saveToLocalStorage(updatedItems);

        setInputValue("");
        setCountValue(null);
        setTimeValue(null);
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" ) {
            e.preventDefault();
            console.log("Input", inputValue);
            console.log("Count", countValue);
            console.log("Time", timeValue);

            if (!inputValue.trim()) {
                inputRef.current?.focus();
            } else if (inputValue.includes("プランク") && timeValue === null) {
                timeRef.current?.focus();
            } else if (!inputValue.includes("プランク") && countValue === null) {
                countRef.current?.focus();
            } else {
                handleAddOrUpdateItem();
            }
        }
    };

    const handleEditItem = (index: number, field: string, value: any) => {
        const updatedItems = itemList.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setItemList(updatedItems);
        onAddItems(updatedItems);
        saveToLocalStorage(updatedItems);
    };

    return (
        <div>
            <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                style={{ position: 'fixed', bottom: 120, right: 60 }}
                onClick={showModal}
            />

            <Modal title="ルーレット項目の追加" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form layout="vertical" onSubmitCapture={(e) => e.preventDefault()}>
                    <Form.Item label="ルーレット項目の入力">
                        <div style={{ display: "flex", gap: "10px" }}>
                            <Input
                                ref={inputRef}
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="項目を入力してEnterを押す"
                                onKeyDown={handleKeyPress}
                                style={{ width: 200 }}
                            />
                            {inputValue.includes("プランク") ? (
                                <Input
                                    ref={timeRef}
                                    type="number"
                                    value={timeValue !== null ? timeValue : ""}
                                    onChange={handleTimeChange}
                                    placeholder="秒数を入力"
                                    onKeyDown={handleKeyPress}
                                    style={{ width: 100 }}
                                />
                            ) : (
                                <Input
                                    ref={countRef}
                                    type="number"
                                    value={countValue !== null ? countValue :""}
                                    onChange={handleCountChange}
                                    placeholder="回数を入力"
                                    onKeyDown={handleKeyPress}
                                    style={{ width: 100 }}
                                />
                            )}
                        </div>
                    </Form.Item>

                    <List
                        header={<div>ルーレット項目リスト</div>}
                        bordered
                        dataSource={itemList}
                        renderItem={(item, index) => (
                            <List.Item key={index}>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <Input
                                        value={item.name}
                                        onChange={(e) => handleEditItem(index, "name", e.target.value)}
                                        style={{ width: "150px" }}
                                    />
                                    {item.time !== null && item.time !== undefined ? (
                                            <Input.Group compact>
                                                <Input
                                                    type="number"
                                                    value={item.time !== null ? item.time : ""}
                                                    onChange={(e) => handleEditItem(index, "time", Number(e.target.value))}
                                                    style={{ width: "80px" }}
                                                />
                                                <span style={{ marginLeft: "5px", lineHeight: "32px" }}>秒</span>
                                            </Input.Group>
                                        ) : (
                                            <Input.Group compact>
                                                <Input
                                                    type="number"
                                                    value={item.count !== null ? item.count : ""}
                                                    onChange={(e) => handleEditItem(index, "count", Number(e.target.value))}
                                                    style={{ width: "80px" }}
                                                />
                                                <span style={{ marginLeft: "5px", lineHeight: "32px" }}>回</span>
                                            </Input.Group>
                                        )}
                                </div>
                            </List.Item>
                        )}
                        style={{ width: 300 }}
                    />
                </Form>
            </Modal>
        </div>
    );
};
export default RouletteEditor;