import React, {ChangeEvent, useState} from 'react';
import {Box, Modal, Input, styled, InputLabel, FormControl, IconButton} from "@mui/material";
import Button from "../../../../Common/Components/Button";
import s from './EditProfileModal.module.scss'
import {PhotoCamera} from "@mui/icons-material";
import {useAppDispatch} from "../../../bll/store";
import {updateUserTC} from "../../../bll/app-reducer";


type ModalPropsType = {
    title: string
    avatar: string
    name: string |undefined
    email: string
    changeName: ( name: string| undefined) => void
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


const EditProfileModal = ({avatar, name, email, title, changeName}: ModalPropsType) => {

    const [open, setOpen] = useState(false);
    const [photo, setPhoto] = useState<any>(avatar);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)
    const dispatch = useAppDispatch();


    const saveUserData = () => {
        debugger
        const code = window.btoa(avatar)
        dispatch(updateUserTC(name, code));
        setOpen(false);
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPhoto(e.target.files[0])
        }
    }

    const changeLocalName = (e:ChangeEvent<HTMLInputElement>) =>{
        changeName(e.currentTarget.value)
    }
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
                    <Box className={s.modalMainBox}>
                        <h3 title={s.title}>{title}</h3>
                        <Box className={s.avatarBlock}>
                            <img className={s.avatarImg} src={photo} alt="avatar"/>
                            <Box className={s.iconUpload}>
                                <label htmlFor="icon-button-file">
                                    <UploadButton id="icon-button-file" type="file" onChange={onMainPhotoSelected}/>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCamera/>
                                    </IconButton>
                                </label>
                            </Box>
                        </Box>
                        <Box>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="component-simple">Nickname</InputLabel>
                                <Input className={s.inputForms} id="component-simple" value={name} onChange={changeLocalName}/>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl variant="standard">
                                <InputLabel htmlFor="component-simple">Nickname</InputLabel>
                                <Input className={s.inputForms} value={email} onChange={changeLocalName} disabled={true}/>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box className={s.modalBtnGroup}>
                        <Button onClick={handleClose} className={s.btnCancel} title={'Cancel'}/>
                        <Button className={s.btnSave} title={'Save'} onClick={saveUserData}/>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default EditProfileModal;