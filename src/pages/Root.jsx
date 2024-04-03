import React from 'react'
import { useSelector } from 'react-redux'
import MainTabNavigation from '../layouts/MainTabNavigation';
import AuthenticationRoute from '../layouts/AuthenticationRoute';
const Root = () => {
    const user = useSelector((state) => state.login.user);
    return (
        <>
            {
                user ? <MainTabNavigation user={user} /> : <AuthenticationRoute />
            }
        </>
    )
}

export default Root