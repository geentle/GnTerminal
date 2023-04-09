<template>
    <div>
        <iframe
            ref="iframeRef"
            v-if="musicPath"
            frameborder="no"
            marginwidth="0"
            marginheight="0"
            width="330"
            height="86"
            :src="musicPath"
        />
        <div v-if="errorHint">{{ errorHint }}</div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs } from 'vue'
import { getSingleMusic } from '@/api/music'

const iframeRef = ref()
interface MusicBoxProps {
    query: string
}

const props = withDefaults(defineProps<MusicBoxProps>(), {})
const { query } = toRefs(props)
const musicPath = ref('')
const errorHint = ref('')

const emit = defineEmits(['rendered'])

onMounted(async () => {
    try {
        const res = await getSingleMusic(query.value)
        const music = res?.data
        musicPath.value = `https://music.163.com/outchain/player?type=2&id=${music.id}&auto=1&height=66`
        // 加载完毕，提交事件告诉父组件
        emit('rendered')
    } catch (err) {
        errorHint.value = '未找到音乐'
    }
})
</script>

<style scoped></style>
