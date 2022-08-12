import {useFormik} from 'formik';
import React from 'react';
import {Button, FormControl, FormGroup, TextField} from "@mui/material";
import {NavLink} from "react-router-dom";
import {createUser} from "../auth-reducer";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {Navigate} from 'react-router-dom';
import {Wrapper} from "../../../common/UniversalComponents/Wrapper";

export type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Registration = () => {

    const dispatch = useAppDispatch()
    const isRegister = useAppSelector(state => state.auth.isRegister)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
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
            } else if (values.password.length < 8) {
                errors.password = 'Should be more 7';
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Not password';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(createUser({email: values.email, password: values.password}))
            formik.resetForm()
        },
    })
    if (isRegister || isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <Wrapper>
        <FormControl style={{textAlign: 'center'}}>
            <form onSubmit={formik.handleSubmit}>
                <FormGroup style={{paddingBottom: '20px'}}>
                    <TextField
                        label="Email"
                        margin="normal"
                        variant="standard"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ?
                        <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    <TextField
                        type="password"
                        label="Password"
                        variant="standard"
                        margin="normal"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ?
                        <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

                    <TextField
                        type="password"
                        label="Confirm Password"
                        variant="standard"
                        margin="normal"
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                        <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}

                    <Button disabled={status === 'loading'} type={'submit'} variant={'contained'} color={'primary'}
                            style={{marginTop: '20px'}}>
                        Sign Up
                    </Button>
                </FormGroup>
                <h2 style={{paddingBottom: '10px', opacity: '.7'}}>Do you have an account?</h2>
                <NavLink to={'/login'} style={{color: 'blue'}}>Sign In</NavLink>
            </form>
        </FormControl>
    </Wrapper>
}