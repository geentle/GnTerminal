<template>
    <div class="container">
        <a-row class="hot hot-title">
            <a-col :span="1"></a-col>
            <a-col :span="8">歌曲名</a-col>
            <a-col :span="15">歌手</a-col>
        </a-row>
        <a-row
            class="hot"
            v-for="(song, index) in songList"
            :key="index"
            align="middle"
        >
            <a-col :span="1" :class="index < 3 ? 'top3' : ''">{{
                index + 1
            }}</a-col>
            <a-col :span="8">
                <a
                    :href="`https://music.163.com/#/song?id=${song?.id}`"
                    target="_blank"
                >
                    <template v-if="index < 3">
                        <img
                            :src="song?.al?.picUrl"
                            height="50"
                            :alt="song?.al?.name"
                            style="margin-right: 10px; padding: 0 10"
                        />
                    </template>
                    {{ song?.al?.name }}
                </a>
            </a-col>
            <a-col :span="15">
                <template v-if="song?.ar?.length > 0">
                    <template
                        v-for="(artist, art_index) in song?.ar"
                        :key="art_index"
                    >
                        <span v-if="art_index !== 0">&nbsp;&nbsp;</span>
                        <a
                            :href="`https://music.163.com/#/artist?id=${song?.ar?.id}`"
                            target="_blank"
                            >{{ artist?.name }}</a
                        >
                    </template>
                </template>
            </a-col>
        </a-row>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { listHotMusics } from '@/api/music'
import { message } from 'ant-design-vue'

const songList = ref([] as any[])

const emit = defineEmits(['rendered'])

// onMounted(() => {
//     emit('rendered')
// })

onMounted(async () => {
    try {
        const res: any = await listHotMusics()
        const songs = res.data
        songList.value = songs.slice(0, 10)
        emit('rendered')
    } catch (err) {
        message.error('加载失败')
    }
})
</script>

<style scoped>
/* .container {
    height: 460px;
} */
/* .container::-webkit-scrollbar {
    display: none;
} */
.hot {
    font-size: 14px;
    border: 1px solid #505050;
    padding: 5px;
}
.hot-title {
    color: #75ede7;
    font-weight: bold;
}
.top3 {
    color: #ff6a00;
    font-weight: bold;
}
</style>
