import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import imgbg from '../../../assets/cook_bg.jpg'
import useAuth from '../../../hooks/useAuth';
import { chefToast } from '../../../utils/chefToast';


const Login = () => {

    const {signInUser} = useAuth()

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const handleLogin = (data) => {
        console.log('after login', data)

        // signIn USer
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result)
                chefToast.success('Signin Successful!')

            })
            .catch(error => {
                console.log(error)
                chefToast.error(error.message)
            })

        reset()
    }


    return (
        <div
            className="h-auto md:min-h-screen bg-cover bg-center flex items-center justify-center max-w-7xl mx-auto"
            style={{ backgroundImage: `url(${imgbg})` }}
        >
            <div className='mx-auto card bg-base-100/30 shadow-2xl backdrop-blur-sm md:backdrop-blur-3xl border border-white/20 w-full max-w-sm md:max-w-md shrink-0 my-15 p-6 md:p-10'>
                <h3 className="font-bold text-3xl text-primary md:text-secondary mt-5">Login to Your Account</h3>
                <p className='mt-3 mb-3 text-primary md:text-secondary'>Welcome back to Local Chef Bazaar</p>
                <form className='card-body' onSubmit={handleSubmit(handleLogin)}>
                    <fieldset className="fieldset">


                        {/* Email Field */}
                        <label className="label text-secondary">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input" placeholder="Your Email" />
                        {errors.email?.type === 'required' && <p className='text-warning'>Email is required.</p>}


                        {/* Password */}
                        <label className="label text-secondary">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=])[A-Za-z\d@$!%*?&^#()_+\-=]{8,}$/ })} className="input" placeholder="Password" />
                        {errors.password?.type === 'required' && <p className='text-warning'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-warning'>Password should contain at least 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className='text-warning'>Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.</p>}


                        <div><a className="link link-hover text-secondary text-[11px]">Forgot password?</a></div>
                        <button className="btn hover:border-2 hover:border-secondary font-bold bg-primary border-0 rounded-xl text-base-100 mt-4">Login</button>
                    </fieldset>
                    <p className='text-secondary'>Don't have an account? <Link to='/register' className='hover:underline mb-10'>Register</Link></p>
                </form>
            </div>

        </div>
    );
};

export default Login;