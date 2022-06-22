import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import styles from "./../Components/ButtonStyles.module.scss"
import Button from '@mui/material/Button';
// тип пропсов обычной кнопки, children в котором хранится название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>


const CustomButton: React.FC<DefaultButtonPropsType> = ({title, className, disabled, onClick}) => {

    return (

        <Button  sx={{textTransform: "none"}} className={`${styles.commonButtonStyles} ${className} ${disabled ? styles.disabled : ""}`}
                disabled={disabled} onClick={onClick }>{title}</Button>
    )
}

export default CustomButton
