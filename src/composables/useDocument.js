import { ref } from 'vue'
import { deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { store } from "../firebase/config";

const useDocument = (collectionName, id) => {
  const error = ref(null)
  const isPending = ref(false)

  const documentRef = doc(store, collectionName, id)

  const updateDocument = async (docUpdate) => {
    isPending.value = true
    error.value = null

    try {
      const res = await updateDoc(documentRef, docUpdate)

      isPending.value = false
      error.value = null

      return res
    } catch (err) {
      isPending.value = false
      error.value = err.message
    }
  }

  const deleteDocument = async () => {
    isPending.value = true
    error.value = null

    try {
      const res = await deleteDoc(documentRef)

      isPending.value = false
      error.value = null

      return res
    } catch (err) {
      isPending.value = false
      error.value = err.message
    }
  }

  return { error, isPending, deleteDocument, updateDocument }
}

export default useDocument