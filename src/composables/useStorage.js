import { storage } from '../firebase/config'
import { ref as refFirebase, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { ref } from 'vue'
import getUser from './getUser'

const { user } = getUser()

const useStorage = () => {
  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadFile = async (file) => {
    filePath.value = `covers/${user.value.uid}/${file.name}`
    const storageRef = refFirebase(storage, filePath.value)

    try {
      const res = await uploadBytes(storageRef, file)
      url.value = await getDownloadURL(res.ref)
    } catch (err) {
      console.log(err.message);
      error.value = err.message
    }
  }

  const deleteFile = async (path) => {
    const storageRef = refFirebase(storage, path)

    try {
      await deleteObject(storageRef)
    } catch (err) {
      console.log(err.message);
      error.value = err.message
    }
  }

  return { error, url, filePath, uploadFile, deleteFile }
}

export default useStorage