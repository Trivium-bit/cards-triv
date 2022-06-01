import React from 'react';
import {Box, Modal, Input, styled, InputLabel, FormControl, IconButton} from "@mui/material";
import Button from "../../../../Common/Components/Button";
import s from './EditProfileModal.module.scss'
import {PhotoCamera} from "@mui/icons-material";


type ModalPropsType = {
    title: string
    avatar: string
    name: string
    email:string

}
const UploadButton = styled('input')({
    display: 'none',
});

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 250,
    bgcolor: '#F9F9FE',
    boxShadow: 24,
    p: 4,
    borderRadius: 8,
};


const EditProfileModal = ({avatar,name,email,title}:ModalPropsType) => {
    const [myName, setName] = React.useState(name);
    const [myEmail, seEmail] = React.useState(email);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)


    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        seEmail(event.target.value);
    };
    return (
        <div>
            <Button
                onClick={handleOpen}
                className={s.editBtn}
                title={'Edit profile'}/>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box  className={s.modalMainBox}>
                        <h3 title={s.title}>{title}</h3>
                        <Box className={s.avatarBlock}>
                            <img className={s.avatarImg}  src={avatar} alt="avatar"/>
                            <Box className={s.iconUpload}>
                                <label htmlFor="icon-button-file">
                                    <UploadButton  id="icon-button-file" type="file" />
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </Box>
                        </Box>
                        <Box>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="component-simple">Nickname</InputLabel>
                                <Input className={s.inputForms} id="component-simple" value={myName} onChange={handleChangeName} />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="component-simple">E-mail</InputLabel>
                                <Input className={s.inputForms} id="component-simple" value={myEmail} onChange={handleChangeEmail} />
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className={s.modalBtnGroup}>
                        <Button onClick={handleClose} className={s.btnCancel} title={'Cancel'}/>
                        <Button className={s.btnSave} title={'Save'}/>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default EditProfileModal;