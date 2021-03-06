import React, {CSSProperties, useEffect} from 'react';
import {UniversalModal} from "./UniversalModal";
import {PacksResponseType} from "../../../api/cardPacksAPI";
import {useAppDispatch, useAppSelector} from "../../../state/store";
import {getCardsTC} from "../../../state/cardsReducer";
import LearnModalBody from "./LearnModalBody";
import {RequestStatusType} from "../../../state/app-reducer";
import {appStatusSelector} from "../../../Common/Selectors/Selectors";


type ModalContainerPropsType = {
    pack: PacksResponseType | undefined //это выбранная в PackTable колода карт
    closeModalCallback: (item:undefined) => void
    styles: CSSProperties
}

export const LearnModalContainer = React.memo(({pack, closeModalCallback, styles}: ModalContainerPropsType) => {
    const dispatch = useAppDispatch();
    const handleCloseLearnModal = () => {
        closeModalCallback(undefined)
    };
    const appStatus = useAppSelector<RequestStatusType>(appStatusSelector);

    useEffect(() => {
        if(pack){
            dispatch(getCardsTC({cardsPack_id: pack?._id, pageCount: 100000})) // получаем все карточки в выбранной колоде
        }
    }, [dispatch, pack])

    return (
        <>
            {
                appStatus !== "loading" &&
                <UniversalModal modalStyle={styles} show={!!pack} handleClose={handleCloseLearnModal}>
                    <LearnModalBody modalStyle={styles} cardPack={pack} onCancel={handleCloseLearnModal}/>
                </UniversalModal>
            }
        </>
    );
});

