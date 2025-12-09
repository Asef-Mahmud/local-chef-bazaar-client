import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import imgbg from '../../../assets/cook_bg.jpg'
import useAuth from '../../../hooks/useAuth';
import { chefToast } from '../../../utils/chefToast';

const Register = () => {

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm()
    const { registerUser } = useAuth()
    
    const navigate = useNavigate()

    // Check password
    const password = useWatch({
        control,
        name: "password",
    });


    const handleRegister = (data) => {
        console.log('after registration', data)

        // Register User
        registerUser(data.email, data.password)
            .then(result => {
                console.log(result)
                chefToast.success('Registration Successful!')
                navigate('/')
            })
            .catch(error => {
                console.log(error)
                chefToast.error(error.message)
            })


        // Reset the form
        reset()
    }



    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center max-w-7xl mx-auto"
            style={{ backgroundImage: `url(${imgbg})` }}
        >
            <div className='mx-auto card bg-base-100/30 shadow-2xl backdrop-blur-sm md:backdrop-blur-3xl border border-white/20 w-full max-w-sm md:max-w-md shrink-0 my-15 p-10'>
                <h3 className="font-bold text-3xl text-primary md:text-secondary">Create an Account</h3>
                <p className='mt-3 mb-3 text-primary md:text-secondary'>Register with Local Chef Bazaar</p>
                <form className='card-body' onSubmit={handleSubmit(handleRegister)}>
                    <fieldset className="fieldset">


                        {/* Name Field */}
                        <label className="label text-secondary">Name</label>
                        <input type="text" {...register('name', { required: true })} className="input" placeholder="Your Name" />
                        {errors.name?.type === 'required' && <p className='text-warning'>Name is required.</p>}


                        {/* Email Field */}
                        <label className="label text-secondary">Email</label>
                        <input type="email" {...register('email', { required: true })} className="input" placeholder="Your Email" />
                        {errors.email?.type === 'required' && <p className='text-warning'>Email is required.</p>}


                        {/* Address Field */}
                        <label className="label text-secondary">Address</label>
                        <input type="text" {...register('address', { required: true })} className="input" placeholder="Your Address" />
                        {errors.name?.type === 'required' && <p className='text-warning'>Address is required.</p>}


                        {/* Password */}
                        <label className="label text-secondary">Password</label>
                        <input type="password" {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=])[A-Za-z\d@$!%*?&^#()_+\-=]{8,}$/ })} className="input" placeholder="Password" />
                        {errors.password?.type === 'required' && <p className='text-warning'>Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-warning'>Password should contain at least 6 characters</p>}
                        {errors.password?.type === 'pattern' && <p className='text-warning'>Password must include at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long.</p>}


                        {/* Confirm Password */}
                        <label className="label text-secondary">Confirm Password</label>
                        <input type="password" {...register("confirmPassword", {
                            required: "Confirm Password is required",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                            className="input"
                            placeholder="Confirm Password"
                        />

                        {errors.confirmPassword && (
                            <p className="text-warning">{errors.confirmPassword.message}</p>
                        )}

                        {/* Image Field */}
                        <label className="label text-secondary">Your Photo</label>

                        <input type="file" {...register('image', { required: true })} className="file-input" placeholder="Your Image" />
                        {errors.name?.type === 'required' && <p className='text-warning'>Image is required.</p>}


                        <button className="btn hover:border-2 hover:border-secondary font-bold bg-primary border-0 rounded-xl text-base-100 mt-4 ">Register</button>
                    </fieldset>
                    <p className='text-secondary'>Already have an account? <Link to='/login' className='hover:underline'>Login</Link></p>
                </form>
            </div>

        </div>
    );
};

export default Register;