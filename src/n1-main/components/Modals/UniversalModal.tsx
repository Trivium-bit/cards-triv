import React, {CSSProperties} from 'react';
import modalStyles from "./ModalStyles.module.scss";
import {Box} from "@mui/material";
import Modal from "@mui/material/Modal";



interface IModal {
    show: boolean
    handleClose?: any
    children?: React.ReactNode
    h1Title?: string
    modalStyle?: CSSProperties;
}


export const UniversalModal: React.FC<IModal> = (
    {
        show,
        handleClose,
        h1Title,
        modalStyle,
        children,

    }) => {

    if (!show) return null;


    return (
        <Modal open={show} onClose={handleClose}>
            <Box sx={modalStyle} className={modalStyles.modalBlock}>
                <h1 className={modalStyles.modalTitle}>{h1Title}</h1>
                {children}
            </Box>
        </Modal>
    );
    };
