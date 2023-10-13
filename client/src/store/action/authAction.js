import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { setCurrentUser } from '../slice/authSlice'
import { setErrors } from '../slice/errorSlice'
import { SERVER_URL } from '../../config'
import socket from '../../socket'
import setAuthToken from '../../utils/setAuthToken'
import { setChatTarget } from './chatAction'
import { updateNugeFlag } from '../slice/chatSlice'
import toast from '../../utils/toast'

export const loginUser = (param) => dispatch => {
    return new Promise(resolve => {
        axios.post(SERVER_URL + '/api/auth/login', param)
            .then(({ data: res }) => {
                const { status, token, errors } = res
                dispatch(setErrors(errors))
                if (!status) {
                    localStorage.setItem('jwtToken', token)
                    setAuthToken(token)
                    try {
                        const decoded = jwt_decode(token)
                        dispatch(updateNugeFlag(0))
                        dispatch(setCurrentUser(decoded))
                        socket.connect()
                        dispatch(setChatTarget({}))
                        toast('Sign in successfully', 'success')
                    } catch (err) {
                        dispatch(setCurrentUser({}))
                    }
                }
                resolve()
            }).catch(err => {
                console.error(err)
                resolve()
            })
    })
}

export const logoutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    setAuthToken(false)
    dispatch(setCurrentUser({}))
    socket.disconnect()
}

export const setUserInfo = (param) => dispatch => {
    return new Promise(resolve => {
        axios.post(SERVER_URL + '/api/auth/info', param)
            .then(({ data: res }) => {
                const { status, token } = res;
                if (!status) {
                    localStorage.setItem('jwtToken', token)
                    setAuthToken(token)
                    try {
                        const decoded = jwt_decode(token)
                        dispatch(setCurrentUser(decoded))
                    } catch (err) {
                        console.error(err)
                    }
                }
            })
            .catch(err => { })
            .finally(() => {
                resolve();
            })
    })
}

export const registerUser = (param) => dispatch => {
    return new Promise(resolve => {
        axios.put(SERVER_URL + '/api/auth/register', param)
            .then(({ data: res }) => {
                const { status, user, errors } = res
                dispatch(setErrors(errors))
                if (status == 0) {
                    toast('Sign up successfully', 'success')
                }
                resolve()
            }).catch(err => {
                console.error(err)
                resolve()
            })
    })
}

export const uploadAvatar = (param) => dispatch => {
    return new Promise(resolve => {
        var formData = new FormData()
        formData.append('avatar', param)
        axios.post(SERVER_URL + '/api/auth/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(({ data: res }) => {
                const { status, user } = res;
                if (user) {
                    dispatch(setCurrentUser(user))
                }
            }).catch(err => {
                console.error(err)
                resolve()
            })
    })
}