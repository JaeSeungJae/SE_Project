import React from "react";
import className from "classnames/bind"
import styles from "./InputBox.module.css"

const cx = className.bind(styles)

const InputBox = ({boxName, boxType, boxPlaceHolder, value, onChange, required, disabled}) => {
    return (
        <div className={cx("container")}>
            <p>{boxName}</p>
            <input
                className={cx("inputBox")}
                type={boxType}
                placeholder={boxPlaceHolder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}></input>
        </div>
    )
}

export default InputBox;