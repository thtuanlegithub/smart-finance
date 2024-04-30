import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainTabNavigation from './layouts/MainTabNavigation';
import AuthenticationRoute from './layouts/AuthenticationRoute';
import LoadingItem from './components/LoadingItem';
import { isEmailPasswordSignedIn } from './features/authentication';
import { getCurrentUser, isUserSignedIn, setUser } from './features/authentication';
import { getUserSetting, createUserSetting, updateUserSetting, setSetting } from './features/setting';
import { SettingFields } from './data/firebaseConstant';

const Root = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);
    const settingState = useSelector((state) => state.setting);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserSignedIn = async () => {          
            if (await isUserSignedIn() || await isEmailPasswordSignedIn()) {
                const currentUser = getCurrentUser();
                dispatch(setUser(currentUser.toJSON()));
                // let setting = await getUserSetting(currentUser.uid);
                // if (!setting) {
                //     const newSetting = createUserSetting(currentUser.uid);
                //     const settingId = await updateUserSetting('', newSetting);
                //     newSetting[SettingFields.SETTING_ID] = settingId;
                //     await updateUserSetting(settingId, newSetting);
                //     setting = newSetting;
                // }
                // dispatch(setSetting(setting));
            }
            setLoading(false);
        };
        checkUserSignedIn();
    }, [dispatch]);

    if (loading) {
        return <LoadingItem />;
    }

    return (
        <>
            {
                user ? <MainTabNavigation /> : <AuthenticationRoute />
            }
        </>
    );
};

export default Root;