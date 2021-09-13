import React, { useEffect, useState } from 'react'
import {firebase} from "../../firebase/firebase-config"
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import { JournalScreen } from '../journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import Loading from '../loading/Loading';
import { startLoadingNotes } from '../../actions/notes';

export const AppRouter = () => {


    const [checking,setCheking] = useState(true)
    const [isLogin,setIsLogin] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async ( user) => {
            if(user?.uid) {
                dispatch(login(user.uid,user.displayName))
                setIsLogin(true)
                dispatch(startLoadingNotes(user.uid))

            }else {
                setIsLogin(false)
            }

            setCheking(false)
        })
    },[dispatch,setCheking,setIsLogin])

    if(checking){
        return (
            <Loading></Loading>
        )
    }

    return (
        <Router>
            <div>
            <Switch>
                <PublicRoute
                isAuthenticated={isLogin} 
                path="/auth" 
                component={AuthRouter} 
                />
                <PrivateRoute 
                exact 
                isAuthenticated={isLogin}
                path="/" 
                component={JournalScreen} />

                <Redirect to="/auth/login"/>
            </Switch>
            </div>
        </Router>
    )
}
