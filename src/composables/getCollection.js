import { ref, watchEffect } from 'vue'
import { collection, orderBy, query, onSnapshot, where } from 'firebase/firestore';
import { store } from "../firebase/config";

const getCollection = (collectionName, queryOpt) => {
  const error = ref(null)
  const documents = ref(null)

  let colRef = collection(store, collectionName)
  let q = query(colRef, orderBy('createdAt', 'asc'))

  if(queryOpt) {
    colRef = collection(store, collectionName)
    q = query(colRef, orderBy('createdAt', 'asc'), where(...queryOpt))
  }

  const unsub = onSnapshot(q, (snap) => {
    let results = []

    snap.docs.forEach(doc => {
      results.push({ ...doc.data(), id: doc.id })
    })

    documents.value = results
    error.value = null
  }, (err) => {
    console.log(err);
    error.value = err.message
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })
  
  return { error, documents }
}

export default getCollection