import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function VerifyUserLogin({children}) {
    const {user} = useSelector((state) => state.Auth);

    if (user == null) return <Navigate to="/login"/>
    else return  children;
}
