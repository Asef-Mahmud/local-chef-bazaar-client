import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { chefToast } from '../utils/chefToast';
import { useNavigate } from 'react-router';



const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {

    const { user, signOutUser } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // interceptor request
        const reqInterceptor = axiosSecure.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${user?.accessToken}`
            return config
        })

        //interceptor response
        const resInterceptor = axiosSecure.interceptors.response.use((response) => {
            return response
        }, (error) => {
            chefToast('Error');

            // unauthorized - logging out the user
            const statusCode = error.status;
            if (statusCode === 401 || statusCode === 403) {
                signOutUser()
                    .then(() => {
                        navigate('/login')
                    })
            }



            return Promise.reject(error)
        })

        // Cleaning/Removing interceptor
        return () => {
            axiosSecure.interceptors.request.eject(reqInterceptor)
            axiosSecure.interceptors.response.eject(resInterceptor);
        }



    }, [user, signOutUser, navigate])


    return axiosSecure
};

export default useAxiosSecure;