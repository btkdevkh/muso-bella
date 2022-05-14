import { ref } from 'vue'
import { addDoc, collection } from 'firebase/firestore';
import { store } from "../firebase/config";

const useCollection = (collectionName) => {
  const error = ref(null)
  const isPending = ref(false)

  const colRef = collection(store, collectionName)

  const addDocument = async (doc) => {
    error.value = null
    isPending.value = true

    try {
      const res = await addDoc(colRef, doc)
      error.value = null
      isPending.value = false
      
      return res
    } catch (err) {
      error.value = err.message
      isPending.value = false
    }
  }

  return { error, isPending, addDocument }
}

export default useCollection