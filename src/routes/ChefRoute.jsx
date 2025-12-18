import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loader from '../Loader/Loader';
import Forbidden from '../Pages/Forbidden/Forbidden';




const ChefRoute = ({children}) => {
    const {loading} = useAuth()
    const {role, roleLoading} = useRole()


    if(loading || roleLoading){
        return  <Loader></Loader>
    }

    if(role !== 'chef'){
        return <Forbidden></Forbidden>
    }


    return children
};

export default ChefRoute;