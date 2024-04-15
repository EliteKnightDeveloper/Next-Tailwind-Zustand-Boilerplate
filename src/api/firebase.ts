import {
  GoogleAuthProvider as _GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { firebaseAuth } from './firebaseConfig'
import { IUser } from '@/interfaces'

const GoogleAuthProvider = new _GoogleAuthProvider()

export const attemptSignInWithGoogle = async ({
  onSuccess,
  onFail,
}: {
  onSuccess: any
  onFail: any
}) => {
  try {
    const userCredential = await signInWithPopup(
      firebaseAuth,
      GoogleAuthProvider
    )
    onSuccess(userCredential.user)
  } catch (error) {
    onFail && onFail(error)
  }
}

export const attemptSignOut = async ({
  onSuccess,
  onFail,
}: {
  onSuccess: any
  onFail: any
}) => {
  try {
    await signOut(firebaseAuth)
      .then(() => {})
      .catch(() => {})
    onSuccess && onSuccess()
  } catch (error) {
    onFail && onFail(error)
  }
}

export const attemptSignInWithEmailAndPassword = async ({
  email,
  password,
  onSuccess,
  onFail,
}: {
  email: string
  password: string
  onSuccess: any
  onFail: any
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    )
    const user = userCredential.user
    onSuccess && onSuccess(user)
  } catch (error) {
    onFail && onFail(error)
  }
}

export const attemptSignUpWithEmailAndPassword = async ({
  email,
  password,
  onSuccess,
  onFail,
}: {
  email: string
  password: string
  onSuccess: any
  onFail: any
}) => {
  try {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user
        sendEmailVerification(user)
        onSuccess(user)
      })
      .catch((error: any) => {
        onFail && onFail(error)
      })
  } catch (error) {
    onFail && onFail(error)
  }
}

export const attemptPasswordReset = async ({
  email,
  onSuccess,
  onFail,
}: {
  email: string
  onSuccess: any
  onFail: any
}) => {
  try {
    sendPasswordResetEmail(firebaseAuth, email)
      .then((result) => {
        onSuccess(result)
      })
      .catch((error) => {
        onFail && onFail(error)
      })
  } catch (error) {
    onFail && onFail(error)
  }
}

export const updateUserProfile = ({
  displayName,
  onSuccess,
  onFail,
}: {
  displayName: string
  onSuccess: any
  onFail: any
}) => {
  const currentUser = firebaseAuth.currentUser
  if (!currentUser) {
    onFail && onFail('No user signed in')
  } else {
    updateProfile(currentUser, {
      displayName: displayName,
    })
      .then(() => {
        onSuccess(firebaseAuth.currentUser?.displayName)
      })
      .catch((error) => {
        onFail && onFail(error)
      })
  }
}

export const createNewUser = async (
  tenant: string,
  email: string,
  name: string,
  token: string
) => {
  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Bearer ${token}`)
  myHeaders.append('Access-Control-Allow-Origin', '*')

  const raw = JSON.stringify({
    email: email,
    name: name,
    role: 'viewer',
    image: 'http://static.azara-ai.com/Default.png',
    business_profile: '',
    subscription_id: null,
    disabled: false,
    token: token,
    timezone: -1,
  })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  return new Promise<IUser>((resolve, reject) => {
    fetch(`https://${tenant}.azara-ai.com:9000/login`, requestOptions)
      .then(async (response) => {
        const data = await response.json()
        if (!response.ok) throw new Error(data.message)
        return data
      })
      .then((result) => {
        resolve(result)
      })
      .catch((error) => {
        reject(error.message)
      })
  })
}
