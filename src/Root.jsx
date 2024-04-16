import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainTabNavigation from './layouts/MainTabNavigation';
import AuthenticationRoute from './layouts/AuthenticationRoute';
import { getCurrentUser, isUserSignedIn, setUser } from './features/authentication';
import Loading from './components/Loading'; // import your loading component
import { isEmailPasswordSignedIn } from './features/authentication';

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
        return <Loading />;
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