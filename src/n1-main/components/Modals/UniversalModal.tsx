import React, {CSSProperties} from 'react';
import modalStyles from "./ModalStyles.module.scss";
import {Box} from "@mui/material";
import Modal from "@mui/material/Modal";


interface IModal {
    show: boolean
    children?: React.ReactNode
    modalOnClick?: () => void;
    h1Title?: string
    modalStyle?: CSSProperties;
}


export const UniversalModal: React.FC<IModal> = (
    {
        show,
        modalOnClick,
        h1Title,
        modalStyle,
        children,

    }) => {

    if (!show) return null;

    return (
        <Modal open={show}>
            <Box sx={modalStyle} className={modalStyles.modalBlock}>
                <h1 onClick={modalOnClick} className={modalStyles.modalTitle}>{h1Title}</h1>
                {children}
            </Box>
        </Modal>
    );
    };
