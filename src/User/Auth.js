import React from 'react';
import firebase from "firebase";
import config from '../Config/Config';
import 'firebase/auth';
class  Auth {
    constructor(){
        this.authenticate = false;
        this.firebaseApp = firebase.initializeApp(config);
        this.firebaseAppAuth =  this.firebaseApp.auth();
        this.providers = {
            googleProvider: new firebase.auth.GoogleAuthProvider(),
        };
    }
    login(callbackSuccess, callBackError){
        this.authenticate = true;
        this.firebaseAppAuth.signInWithPopup(this.providers.googleProvider).then(function (result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            localStorage.setItem('user', result.user.displayName);
            localStorage.setItem('token', token);
            if(callbackSuccess){
                callbackSuccess();
            }
            // window.navigator("/users")
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            if(callbackSuccess){
                callBackError(errorMessage);
            }
        });
    }
    logout(cb){
        this.authenticate = false;
    }
    isAuthenticate (){
        return localStorage.getItem('user');
    }
    getName(){
        return localStorage.getItem('user');
    }
}
export default new Auth();