import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../common/hooks/hooks";
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import {Button, FormControl, FormGroup, TextField} from "@mui/material";
import {FormikErrorType} from "./Registration";
import {createNewPassword} from "../auth-reducer";
import {CheckEmail} from "./checkEmail/CheckEmail";
import {Wrapper} from "../../../common/UniversalComponents/Wrapper";

export const ForgotPassword = () => {

    // const dataFromRequest = {
    //     from: "test-front-admin <alertdsg@gmail.com>",
    //     message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`,
    // }

    const dispatch = useAppDispatch()
    const isChange = useAppSelector(state => state.auth.isChange)
    const status = useAppSelector(state => state.app.status)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(createNewPassword({
                email: values.email,
                message: `<div style="background-color: lime; padding: 15px">password recovery link: <a href='https://alertdsg.github.io/Cards/#/set-new-password/$token$'>link</a></div>`,
                from: "test-front-admin <alertdsg@gmail.com>",
            }))
            formik.resetForm()
        },
    })


    return <>
        {
            isChange
                ?
                <CheckEmail/>
                :
                <Wrapper>
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
                                <p style={{paddingTop: '20px', opacity: '.7'}}>Enter your email address ad we will send
                                    you further
                                    instructions</p>
                                <Button disabled={status === 'loading'} type={'submit'} variant={'contained'}
                                        color={'primary'}
                                        style={{marginTop: '20px'}}>
                                    Send Instructions
                                </Button>
                            </FormGroup>
                            <h2 style={{paddingBottom: '10px', opacity: '.7'}}>Did you remember you password?</h2>
                            <NavLink to={'/login'} style={{color: 'blue'}}>Try logging in</NavLink>
                        </form>
                    </FormControl>
                </Wrapper>
        }
    </>
};

