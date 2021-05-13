import React, { useEffect } from 'react';
import router from 'next/router';
import firebase from 'firebase/app';
import 'firebase/auth';
import initFirebase from '../config';

initFirebase();
const auth = firebase.auth();

const withAuth = Component => props => {
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (!authUser) {
        router.push('/signin');
      }
    });
  }, []);

  return (
    <div>
      <Component {...props} />
    </div>
  )
};

export default withAuth;
