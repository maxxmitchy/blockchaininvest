import React from "react";
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const TextInput = ({
    id,
    name,
    value,
    label,
    refs,
    status,
    onChange,
    onClick,
    type,
    placeholder,
    autoComplete,
    disabled,
    color
}) => {
    return (
        <div className="form-group h6">
            <label htmlFor={id}>
                {label} &nbsp;&nbsp;&nbsp;
                {label === "Password" &&
                    (!status ? (
                        <FaEyeSlash onClick={onClick} />
                    ) : (
                        <FaEye onClick={onClick} />
                    ))}
            </label>
            <div className="field">
                <input
                    style={{ background: `${color}`,borderRadius:"10px" }}
                    disabled={disabled}
                    required
                    ref={refs}
                    type={type}
                    id={id}
                    onChange={onChange}
                    name={name}
                    placeholder={placeholder}
                    className="form-control bg-white"
                    value={value}
                    autoComplete={autoComplete}
                />
            </div>
        </div>
    );
};

TextInput.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default TextInput;
