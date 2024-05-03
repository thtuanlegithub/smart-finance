export { default as authReducer, setUser, clearUser } from './services/authSlice';

export {
    default as emailPasswordSignIn,
    emailPasswordSignOut,
    isEmailPasswordSignedIn,
    getCurrentUser
} from './utils/emailPasswordAuthentication';

export {
    default as googleSignIn,
    isUserSignedIn,
    googleSignOut
} from './utils/googleAuthentication';