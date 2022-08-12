import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {Link, Navigate} from 'react-router-dom';
import {loginTC} from '../auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {Wrapper} from "../../../common/UniversalComponents/Wrapper";

export const Login = () => {

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 3) {
                errors.password = 'Password should be longer 2 symbols';
            }
            return errors;
        },

        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        }
    })


    if (isLoggedIn) {
        return <Navigate to='/packs'/>
    }

    return <>
        <Wrapper>
            <form onSubmit={formik.handleSubmit} style={{textAlign: 'center'}}>
                <FormControl>
                    <FormLabel>
                        <p>Test account credentials:</p>
                        <p>Email: nya-admin@nya.nya</p>
                        <p>Password: 1qazxcvBG</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label='Email'
                            margin='normal'
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            type='password'
                            label='Password'
                            margin='normal'
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password
                            && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel
                            label='Remember me'
                            control={<Checkbox {...formik.getFieldProps('rememberMe')}/>}
                        />
                        <Link to={'/forgot'}><h2
                            style={{display: 'flex', justifyContent: 'end', marginBottom: '15px', opacity: '.7'}}>Forgot
                            Password</h2></Link>
                        <Button disabled={status === 'loading'} type={'submit'} variant={'contained'}
                                color={'primary'}>Login</Button>
                        <h2 style={{padding: '15px 0', opacity: '.7'}}>Do you have an account?</h2>
                        <Link to={'/registration'} style={{color: 'blue'}}>Sign In</Link>
                    </FormGroup>
                </FormControl>
            </form>
        </Wrapper>
    </>
}
