import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './SoftButton.css';
const SoftButton = ({ onClick }) => {
    return (_jsx("div", { className: "soft-container", children: _jsxs("div", { className: "soft btn cursor-pointer", onClick: onClick, children: [_jsx("div", { className: "btn-txt soft-txt", children: "back" }), _jsx("div", {}), _jsx("div", {})] }) }));
};
export default SoftButton;
