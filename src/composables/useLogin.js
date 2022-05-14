import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
  error.value = null
  isPending.value = true

  try {
    const res = await signInWithEmailAndPassword(auth, email, password)

    if(!res) throw new Error('Could not login')
    
    error.value = null
    isPending.value = false

    return res
  } catch (err) {
    console.log(err);
    error.value = err.message
    isPending.value = false
  }
}

const useLogin = () => {
  return { error, isPending, login }
}

export default useLogin
