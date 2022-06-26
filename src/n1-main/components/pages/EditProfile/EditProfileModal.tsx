import React, {ChangeEvent, useRef, useState} from 'react';
import {Box, Modal, Input, styled, InputLabel, FormControl, IconButton} from "@mui/material";
import s from './EditProfileModal.module.scss'
import {PhotoCamera} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../../../state/store";
import {setAppErrorAC, updateUserTC} from "../../../../state/app-reducer";
import Button from "@mui/material/Button";
import {returnBase64FileSize, returnFileSize} from "../../../../utils/countBase64Size";

import Popover from "@mui/material/Popover";
import {makeStyles} from "@mui/styles";
import TextField from "@mui/material/TextField";
import {ResponseLoginType} from "../../../../api/loginAPI";
import {appUserSelector} from "../../../../Common/Selectors/Selectors";
import anonymousUserPhoto from "../../../../images/anonymousUserPhoto.jpg";


type ModalPropsType = {
    title: string
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

export const maxProfileNameLength = 30;
export const maxPictureSize = 1000000;
const regExp = /^[a-z A-Z0-9.@_-]+$/ //допускатся буквы латинского алфавита, цифры и . @ _ -
const EditProfileModal = ({title}: ModalPropsType) => {

        const user = useAppSelector<ResponseLoginType>(appUserSelector);
        const [localName, setLocalName] = useState<string>(user.name);
        const [inputError, setInputError] = useState(false);
        const [inputRexExpError, setInputRexExpError] = useState(false);
        const [open, setOpen] = useState(false);
        const [localAvatar, setLocalAvatar] = useState<any>(user.avatar);
        const [openedPopover, setOpenedPopover] = useState(false)
        const popoverAnchor = useRef(null);
        const popoverEnter = () => {
            setOpenedPopover(true)
        };

        const popoverLeave = () => {
            setOpenedPopover(false)
        };

        const useStyles = makeStyles(() => ({
            popover: {
                pointerEvents: 'none',
            },
            popoverContent: {
                pointerEvents: 'auto',
            },
        }));
        const classes = useStyles();


        const handleOpen = () => setOpen(true);
        const handleClose = () => {
            setLocalName(user.name);
            setLocalAvatar(user.avatar);
            setOpen(false);
            setInputError(false);
            setInputRexExpError(false);
        }
        const dispatch = useAppDispatch();

        const base64fileSize = returnBase64FileSize(localAvatar || anonymousUserPhoto);
        const stringFileSize = returnFileSize(base64fileSize)

        const saveUserData = () => {

            if(localName !== "" && localName.length <= maxProfileNameLength && !inputRexExpError){
                dispatch(updateUserTC(localName, localAvatar ));
                setOpen(false);
            }else if(inputError){
                setInputError(true);
            } else {
                setInputRexExpError(true);
            }
        }

        const uploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {

            const reader = new FileReader();
            const file = e.target?.files;

            if ((file && file[0].type) && (file[0].type === "image/png" || file[0].type === "image/jpeg" || file[0].type === "image/gif")) {
                reader.onloadend = function () {
                    setLocalAvatar(reader.result)
                }
                if (file[0].size && file[0].size <= maxPictureSize) {
                    reader.readAsDataURL(file[0])
                } else {
                    dispatch(setAppErrorAC("Your file size must be less then 1MB 😕"))
                }

            } else {
                dispatch(setAppErrorAC(`Your file has not in .png .jpeg .gif format. Please choose the right file`))
            }


        }

        const changeLocalName = (e: ChangeEvent<HTMLInputElement>) => {

            if(e.currentTarget.value.match(regExp) ){
                setLocalName(e.currentTarget.value.trim())
                setInputError(false);
                setInputRexExpError(false);
            } else if(e.currentTarget.value !== "") {
                setInputRexExpError(true);
            }
            else {
                setLocalName("");
                setInputError(true);
            }
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
                                <img className={s.avatarImg} src={localAvatar || anonymousUserPhoto} alt="avatar"
                                     ref={popoverAnchor}
                                     aria-owns="mouse-over-popover"
                                     onMouseEnter={popoverEnter}
                                     onMouseLeave={popoverLeave}/>

                                <Box className={s.iconUpload}>
                                    <label htmlFor="icon-button-file">
                                        <UploadButton id="icon-button-file" type="file" onChange={uploadAvatar}
                                                      accept="image/*"/>
                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                            <PhotoCamera/>
                                        </IconButton>
                                    </label>
                                </Box>
                            </Box>
                            <Box>
                                <TextField inputProps={{ pattern: "[A-Za-z]" }}
                                           className={s.inputForms}
                                           defaultValue={user.name}
                                           onChange={changeLocalName}
                                           placeholder={"Enter a profile name"}
                                           label="Name"
                                           error={localName.length > maxProfileNameLength || localName.length === 0 || inputRexExpError || inputError}
                                           helperText={
                                               (localName.length > maxProfileNameLength && `Profile name must be ${maxProfileNameLength} symbols max`)
                                           || (inputRexExpError && 'Use latin alphabet symbols') || (inputError && "Type a new user name")}
                                           variant="standard"

                                />
                            </Box>
                            <Box>
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Email</InputLabel>
                                    <Input className={s.inputForms} value={user.email} onChange={changeLocalName}
                                           disabled={true}
                                    />
                                </FormControl>
                            </Box>
                        </Box>
                        <Box className={s.modalBtnGroup}>
                            <Button sx={{textTransform: "none"}} onClick={handleClose}
                                    className={s.btnCancel}>Cancel</Button>
                            <Button sx={{textTransform: "none"}} onClick={saveUserData}
                                    className={s.btnSave}>Save</Button>
                        </Box>
                        <Popover
                            id="mouse-over-popover"
                            className={classes.popover}
                            classes={{
                                paper: classes.popoverContent,
                            }}
                            open={openedPopover}
                            anchorEl={popoverAnchor.current}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}

                            PaperProps={{onMouseEnter: popoverEnter, onMouseLeave: popoverLeave}}
                        >
                            <div>
                                File size: {stringFileSize}
                            </div>
                        </Popover>
                    </Box>
                </Modal>
            </div>
        );
    }
;

export default EditProfileModal;