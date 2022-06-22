import React, {ChangeEvent, useState} from 'react';
import {Box, Modal, Input, styled, InputLabel, FormControl, IconButton} from "@mui/material";
import s from './EditProfileModal.module.scss'
import {PhotoCamera} from "@mui/icons-material";
import {useAppDispatch} from "../../../../state/store";
import {updateUserTC} from "../../../../state/app-reducer";
import Button from "@mui/material/Button";


type ModalPropsType = {
    title: string
    serverAvatar: string
    name: string |undefined
    email: string
    changeName: (name: string |undefined) => void
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
    borderRadius: 2,
};


const EditProfileModal = ({serverAvatar, name, email, title, changeName}: ModalPropsType) => {

    const [open, setOpen] = useState(false);
    const [LocalAvatar, setLocalAvatar] = useState<any>(serverAvatar);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setLocalAvatar(serverAvatar)
        setOpen(false)
    }
    const dispatch = useAppDispatch();

    const saveUserData = () => {
        dispatch(updateUserTC(name, LocalAvatar));
        setOpen(false);
    }

    const handleChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {

        const files = e.target?.files;
        if (files) {
            const reader = new FileReader();
            reader.onloadend = function () {
                setLocalAvatar(reader.result)
            }
            reader.readAsDataURL(files[0]);
        }
    }

    const changeLocalName = (e: ChangeEvent<HTMLInputElement>) => {
        changeName(e.currentTarget.value)
    }
    return (
        <div>
            <Button sx={{textTransform: "none"}}
                onClick={handleOpen}
                className={s.editBtn}
                title={'Edit profile'}>Edit profile</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box className={s.modalMainBox}>
                        <h3 title={s.title}>{title}</h3>
                        <Box className={s.avatarBlock}>
                            <img className={s.avatarImg} src={LocalAvatar} alt="avatar"/>
                            <Box className={s.iconUpload}>
                                <label htmlFor="icon-button-file">
                                    <UploadButton id="icon-button-file" type="file" onChange={handleChangeFileInput}/>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera/>
                                    </IconButton>
                                </label>
                            </Box>
                        </Box>
                        <Box>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="component-simple">Nickname</InputLabel>
                                <Input className={s.inputForms} id="component-simple" value={name}
                                       onChange={changeLocalName}/>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="component-simple">Email</InputLabel>
                                <Input className={s.inputForms} value={email} onChange={changeLocalName}
                                       disabled={true}/>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className={s.modalBtnGroup}>
                        <Button sx={{textTransform: "none"}} onClick={handleClose} className={s.btnCancel}>Cancel</Button>
                        <Button sx={{textTransform: "none"}} className={s.btnSave} onClick={saveUserData}>Save</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default EditProfileModal;