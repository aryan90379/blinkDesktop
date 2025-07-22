import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Timer.css'; // Make sure this file exists and styles the component
const Timer = ({ title, onClick }) => {
    return (_jsx("div", { className: "timer-container cursor-pointer", onClick: onClick, children: _jsxs("a", { href: "#", className: "button", children: [_jsx("span", {}), _jsx("span", {}), _jsx("span", {}), _jsx("span", {}), title] }) }));
};
export default Timer;
