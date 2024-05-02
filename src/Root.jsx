import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainTabNavigation from './layouts/MainTabNavigation';
import AuthenticationRoute from './layouts/AuthenticationRoute';
import LoadingItem from './components/LoadingItem';
import { isEmailPasswordSignedIn } from './features/authentication';
import { getCurrentUser, isUserSignedIn, setUser } from './features/authentication';

const Root = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserSignedIn = async () => {          
            if (await isUserSignedIn() || await isEmailPasswordSignedIn()) {
                const currentUser = getCurrentUser();
                dispatch(setUser(currentUser.toJSON()));
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