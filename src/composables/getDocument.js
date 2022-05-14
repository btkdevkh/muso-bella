import { ref, watchEffect } from 'vue'
import { doc, onSnapshot } from 'firebase/firestore';
import { store } from "../firebase/config";

const getDocument = (collectionName, id) => {
  const error = ref(null)
  const document = ref(null)

  const documentRef = doc(store, collectionName, id)

  const unsub = onSnapshot(documentRef, doc => {
    if(doc.data()) {
      document.value = { ...doc.data(), id: doc.id }
      error.value = null
    } else {
      error.value = 'Document does not exist'
    }
  }, (err) => {
    console.log(err);
    error.value = err.message
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })
  
  return { error, document }
}

export default getDocument