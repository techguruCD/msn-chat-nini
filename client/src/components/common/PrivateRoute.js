import React from 'react'
import { Route, Navigate } from "react-router-dom"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return <>
        {
            isAuthenticated ? <Component {...rest} /> : <><Navigate to="/chat/login" /></>
        }
    </>
}

export default PrivateRoute