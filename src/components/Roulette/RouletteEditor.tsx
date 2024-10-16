import React, { useRef, useState } from "react";
import { Input, List, Form, InputRef } from "antd";

interface RouletteEditorProps {
    onAddItems: (items: { name: string; count?: number | null; time?: number | null }[]) => void;
}

const RouletteEditor: React.FC<RouletteEditorProps> = ({ onAddItems }) => {
    const [inputValue, setInputValue] = useState("");
    const [countValue, setCountValue] = useState<number | null>(null);
    const [timeValue, setTimeValue] = useState<number | null>(null);
    const [itemList, setItemList] = useState<{ name: string; count?: number | null; time?: number | null }[]>([]);

    const inputRef = useRef<InputRef>(null);
    const countRef = useRef<InputRef>(null);
    const timeRef = useRef<InputRef>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountValue(Number(e.target.value) || null);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeValue(Number(e.target.value) || null);
    };

    const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" ) {
            e.preventDefault();

            if (!inputValue.trim()) {
                inputRef.current?.focus();
            } else if (inputValue.includes("プランク") && timeValue === null) {
                timeRef.current?.focus();
            } else if (!inputValue.includes("プランク") && countValue === null) {
                countRef.current?.focus();
            } else {
                const newItem = inputValue.includes("プランク")
                    ? { name: inputValue.trim(), time: timeValue }
                    : { name: inputValue.trim(), count: countValue };

                setItemList(prevItems => {
                    const updatedItems = [...prevItems, newItem];
                    onAddItems(updatedItems);
                    return updatedItems;
                });

                setInputValue("");
                setCountValue(null);
                setTimeValue(null);
            }
        }
    };

    const addItemToBackend = async (item: { name: string; count?: number | null; time?: number | null }) => {
        try {
            const response = await fetch("/api/add-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error("Faled to add item");
            }
            console.log("Item added successfully")
        } catch (error) {
            console.log("Error:", error)
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
    };

    return (
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
                            {item.time !== null ? (
                                <Input
                                    type="number"
                                    value={item.time !== null ? item.time : ""}
                                    onChange={(e) => handleEditItem(index, "time", Number(e.target.value))}
                                    style={{ width: "50px" }}
                                />
                            ) : (
                                <Input
                                    type="number"
                                    value={item.count !== null ? item.count : ""}
                                    onChange={(e) => handleEditItem(index, "count", Number(e.target.value))}
                                    style={{ width: "50px" }}
                                />
                            )}
                        </div>
                    </List.Item>
                )}
                style={{ width: 300 }}
            />
        </Form>
    );
};
export default RouletteEditor;