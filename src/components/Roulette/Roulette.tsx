import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { Button } from "antd";

interface RouletteProps {
    items: string[];
}

const Roulette: React.FC<RouletteProps> = ({ items }) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);

    const { rotate } = useSpring({
        to: { rotate: rotation },
        config: {
            mass: 1,
            tension: 50,
            friction: 20,
            clamp: true,
        },
        onRest: () => {
            setIsSpinning(false);
        },
    });

    const startSpin = () => {
        if (!isSpinning) {
            const newRotation = Math.random() * 2000 + 2000;
            setRotation((prevRotation) => prevRotation + newRotation);
            setIsSpinning(true);
        }   
    }

    return (
    <div>
        <animated.div
            style={{
                transform: rotate.to((r) => `rotate(${r}deg)`),
                width: "300px",
                height: "300px",
                border: "2px solid black",
                borderRadius: "50%",
                position: "relative",
                margin: "0 auto",
            }}
            onClick={startSpin}
        >
            {items.map((item, index) => {
                const angle = (360 / items.length) * index;
                return (
                    <div
                    key={index}
                    style={{
                        position: "absolute",
                        transform: `rotate(${angle}deg) translateY(-100px) rotate(${270}deg)`, 
                        transformOrigin: "50% 50%",
                        textAlign: "left",
                        width: "100%",
                        top: "50%",
                        display: "flex",
                        justifyContent: "center",
                        textOverflow: "ellipsis",
                    }}
                >
                    <div style={{ whiteSpace: "nowrap" }}>{item}</div>
                </div>
                );
            })}
        </animated.div>

        <Button
            type="primary"
            onClick={startSpin}
            style={{ marginTop: "28px" }}
            disabled={isSpinning}
        >
             {isSpinning ? "Spinning..." : "Start"}
        </Button>
    </div>
    );
};

export default Roulette;