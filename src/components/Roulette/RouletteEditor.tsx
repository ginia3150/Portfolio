import React, { useRef, useState, useEffect } from "react";
import { Input, List, Form, InputRef, Button, Modal, Checkbox } from "antd";
import { PlusOutlined, ReloadOutlined, CheckOutlined } from "@ant-design/icons";
import { update } from "@react-spring/web";

interface Item {
    name: string;
    count?: number;
    time?: number;
    checked?: boolean;
}

interface RouletteEditorProps {
    onAddItems: (items: Item[]) => void;
}

const RouletteEditor: React.FC<RouletteEditorProps> = ({ onAddItems }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [countValue, setCountValue] = useState<number | null>(null);
    const [timeValue, setTimeValue] = useState<number | null>(null);
    const [itemList, setItemList] = useState<Item[]>([]);

    const inputRef = useRef<InputRef>(null);
    const countRef = useRef<InputRef>(null);
    const timeRef = useRef<InputRef>(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {

        if (!inputValue.trim()) {
            setIsModalOpen(false);
            return;
        }
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
        setCountValue(value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value)
        setTimeValue(value);
    };

    const saveToLocalStorage = (items: any[]) => {
        localStorage.setItem("rouletteItems", JSON.stringify(items));
    };

    const loadFromLocalStorage = () => {
        const savedItems = localStorage.getItem("rouletteItems");
        return savedItems ? JSON.parse(savedItems) : [];
    };

    useEffect(() => {
        if (isModalOpen) {
            setInputValue("");
            setCountValue(null);
            setTimeValue(null);
        }
    }, [isModalOpen]);

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
    }, []);

    const handleAddOrUpdateItem = () => {

        if (!inputValue.trim()) {
            return;
        }

        const newItem = inputValue.includes("プランク")
            ? { name: inputValue.trim(), time: timeValue ?? 0 }
            : { name: inputValue.trim(), count: countValue ?? 0 };

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

    const handleEditItem = (index: number, field: keyof Item, value: number | string) => {
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

    const handleCheckboxChange = (index: number) => {
        const updatedItems = itemList.map((item, i) => {
            if (i === index) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setItemList(updatedItems);
    };

    const handleResetChecked = () => {
        const updatedItems = itemList.filter(item => !item.checked);
        setItemList(updatedItems);
        onAddItems(updatedItems);
        saveToLocalStorage(updatedItems);
    }

    const handleSelectAll = () => {
        const allChecked = itemList.every(item => item.checked);
        const updatedItems = itemList.map(item => ({ ...item, checked: !allChecked }));
        setItemList(updatedItems);
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

                    <Button type="default" onClick={handleSelectAll} style={{ marginRight: 8 }}>
                        <CheckOutlined />全選択
                    </Button>

                    <Button type="default" onClick={handleResetChecked} style={{ marginBottom: 16 }}>
                            <ReloadOutlined />初期化
                    </Button>

                    <List
                        header={<div>ルーレット項目リスト</div>}
                        bordered
                        dataSource={itemList}
                        renderItem={(item, index) => (
                            <List.Item key={index}>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <Checkbox
                                        checked={item.checked}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                    <Input
                                        value={item.name}
                                        onChange={(e) => handleEditItem(index, "name", e.target.value)}
                                        style={{ width: "150px" }}
                                    />
                                    {item.time !== undefined ? (
                                            <Input.Group compact>
                                                <Input
                                                    type="number"
                                                    value={item.time !== undefined ? item.time : ""}
                                                    onChange={(e) => handleEditItem(index, "time", Number(e.target.value))}
                                                    style={{ width: "80px" }}
                                                />
                                                <span style={{ marginLeft: "5px", lineHeight: "32px" }}>秒</span>
                                            </Input.Group>
                                        ) : (
                                            <Input.Group compact>
                                                <Input
                                                    type="number"
                                                    value={item.count !== undefined ? item.count : ""}
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