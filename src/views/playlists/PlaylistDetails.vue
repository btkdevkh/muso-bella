<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div class="playlist-details" v-if="document">
    <div class="playlist-info">
      <div class="cover">
        <img :src="document.coverUrl" alt="">
      </div>
      <h2>{{ document.title }}</h2>
      <p class="username">{{ document.userName }}</p>
      <p class="description">{{ document.description }}</p>

      <button @click="handleDelete" v-if="ownership">
        Delete Playlist
      </button>
    </div>

    <div class="song-list">
      <div v-if="!document.songs.length">No song added yet</div>
      <div class="single-song" v-for="song in document.songs" :key="song.id">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
          <button v-if="ownership" @click="handleDeleteSong(song.id)">Delete</button>
        </div>
      </div>

      <AddSong v-if="ownership" :playlist="document" />
    </div>
  </div>
</template>

<script>
import getDocument from '@/composables/getDocument'
import useDocument from '@/composables/useDocument'
import useStorage from '@/composables/useStorage'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AddSong from '@/components/AddSong.vue'

export default {
  props: ['id'],
  components: { AddSong },
  setup({ id }) {
    const router = useRouter()

    const { error, document } = getDocument('playlists', id)
    const { deleteDocument, updateDocument } = useDocument('playlists', id)
    const { deleteFile } = useStorage()
    const { user } = getUser()

    const ownership = computed(() => {
      return document.value && user.value && user.value.uid === document.value.userId
    })

    const handleDelete = async () => {
      await deleteFile(document.value.filePath)
      await deleteDocument()

      router.push({ name: 'Home' })
    }

    const handleDeleteSong = async (id) => {
      const filteredSongs = document.value.songs.filter(d => d.id !== id)
      await updateDocument({ songs: filteredSongs })
    }

    return { error, document, ownership, handleDelete, handleDeleteSong }
  }
}
</script>

<style>
  .playlist-details {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 80px;
  }
  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: #999;
  }
  .description {
    text-align: center;
  }
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
</style>