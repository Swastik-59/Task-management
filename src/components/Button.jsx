/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

function Button({
    children,
    bgColor,
    textColor,
    hoverColor,
    paddingX,
    marginX,
    marginY,
    tag = "button",
    onClick,
}) {
    const Tag = tag;

    return (
        <motion.div
            as={Tag}
            className={`${bgColor} px-${paddingX} py-3 rounded-lg shadow-lg transition-colors duration-200 cursor-pointer text-md font-semibold`}
            whileTap={{ scale: 0.8 }}
            whileHover={{backgroundColor:hoverColor}}
            onClick={onClick}
            style={{ margin: `${marginY || 0}rem ${marginX || 0}rem`, color: textColor }}
        >
            {children}
        </motion.div>
    );
}

export default Button;
