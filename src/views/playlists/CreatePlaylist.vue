<template>
  <form @submit.prevent="handleSubmit">
    <h4>Create New Playlist</h4>
    <input 
      required
      type="text" 
      placeholder="Playlist Title"
      v-model="title"
    >
    <textarea
      required
      placeholder="Playlist Description..."
      v-model="description"
    ></textarea>
    <label>Upload Playlist Cover</label>
    <input type="file" @change="handleChange">

    <div class="error">{{ fileError }}</div>
    <button v-if="!isPending">Create</button>
    <button v-else disabled>Processing...</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    
    const { filePath, url, uploadFile } = useStorage()
    const { error, addDocument } = useCollection('playlists')
    const { user } = getUser()

    const title = ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const isPending = ref(false)

    const types = ["image/png", "image/jpg", "image/jpeg"]

    const handleChange = async (e) => {
      const selected = e.target.files[0];

      if(selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
      } else {
        file.value = null
        fileError.value = 'File must be (png, jpg, jpeg)'
      }
    }

    const handleSubmit = async () => {
      if(file.value) {
        isPending.value = true

        await uploadFile(file.value)

        const playlist = {
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value,
          songs: [],
          createdAt: timestamp()
        }

        const res = await addDocument(playlist)

        isPending.value = false

        if(!error.value) {
          router.push({ name: 'PlaylistDetails', params: { id: res.id} })
        }
      }
    }

    return { isPending, fileError, title, description, handleSubmit, handleChange }
  }
}
</script>

<style>
input[type="file"] {
  border: 0;
  padding: 0;
}
label {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
button {
  margin-top: 20px;
}
</style>