import React from 'react';
import {Button, FormControl, FormGroup, FormLabel, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {Navigate, useParams} from 'react-router-dom';
import {setNewPassTC} from '../auth-reducer';
import {useAppDispatch, useAppSelector} from '../../../common/hooks/hooks';
import {Wrapper} from "../../../common/UniversalComponents/Wrapper";

export const NewPassword = () => {

    const {token} = useParams() // достаем токен из url (см. url в App.tsx)

    const changePassStatus = useAppSelector(state => state.auth.changePassStatus)

    type FormikErrorType = {
        newPassword?: string
    }
    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            newPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {};

            if (!values.newPassword) {
                errors.newPassword = 'Required';
            } else if (values.newPassword.length < 8) {
                errors.newPassword = 'Password should be longer 7 symbols';
            }
            return errors;
        },

        onSubmit: values => {
            token && dispatch(setNewPassTC(values.newPassword, token)) // проверка на undefined token
            formik.resetForm()
        }
    })

    if (changePassStatus) {
        return <Navigate to={'/login'}/>
    }

    return <Wrapper>
        <form onSubmit={formik.handleSubmit} style={{textAlign: 'center'}}>
            <FormControl>
                <FormLabel>
                    <p>Create new password</p>
                </FormLabel>
                <FormGroup>
                    <TextField
                        type='password'
                        label='New password'
                        margin='normal'
                        {...formik.getFieldProps('newPassword')}
                    />
                    {formik.touched.newPassword && formik.errors.newPassword
                        && <div style={{color: 'red'}}>{formik.errors.newPassword}</div>}
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Create new password</Button>
                </FormGroup>
            </FormControl>
        </form>
    </Wrapper>
}


