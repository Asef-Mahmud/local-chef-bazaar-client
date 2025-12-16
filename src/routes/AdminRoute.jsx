import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../Pages/Forbidden/Forbidden';
import Loader from '../Loader/Loader';



const AdminRoute = ({children}) => {
    const {loading} = useAuth()
    const {role, roleLoading} = useRole()


    if(loading || roleLoading){
        return  <Loader></Loader>
    }

    if(role !== 'admin'){
        return <Forbidden></Forbidden>
    }


    return children
};

export default AdminRoute;