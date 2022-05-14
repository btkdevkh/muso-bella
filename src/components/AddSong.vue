<template>
  <div class="add-song">
    <button v-if="!show" @click="show = true">Add Song</button>

    <form v-if="show" @submit.prevent="handleSumit">
      <h4>Add New Song</h4>
      <input 
        type="text"
        placeholder="Song Title"
        v-model="title"
        required
      >
      <input 
        type="text"
        placeholder="Artist"
        v-model="artist"
        required
      >
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'

export default {
  props: ['playlist'],
  setup(props) {
    const { updateDocument } = useDocument('playlists', props.playlist.id)

    const title = ref('')
    const artist = ref('')
    const show = ref(false)

    const handleSumit = async () => {
      const newSong = {
        title: title.value,
        artist: artist.value,
        id: Date.now()
      }

      await updateDocument({
        songs: [ ...props.playlist.songs, newSong ]
      })

      title.value = ''
      artist.value = ''
      show.value = false
    }

    return { title, artist, show, handleSumit }
  }
}
</script>

<style scoped>
.add-song {
  text-align: center;
  margin: 0 40px;
}
form {
  max-width: 100%;
  text-align: left;
}
</style>