import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './Card.scss';
const Card = () => {
    return (_jsx("section", { "aria-label": "Instruction card", children: _jsx("div", { className: "card green", children: _jsx("div", { className: "card-body", children: _jsxs("h3", { children: ["Right click ", _jsx("br", {}), " & Close"] }) }) }) }));
};
export default Card;
