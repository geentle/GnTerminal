<template>
    <div class="container">
        <div class="left-bar">
            <iframe
                allowFullScreen="{true}"
                width="640px"
                height="360px"
                scrolling="no"
                sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"
                :src="videoPath"
                frameBorder="0"
            ></iframe>
            <div class="control-bottom">
                <a-button size="small" ghost @click="handlePre"
                    >上一个</a-button
                >
                <a-button size="small" ghost @click="handleNext"
                    >下一个</a-button
                >
            </div>
        </div>
        <div class="right-bar" ref="rightBar">
            <div
                v-for="(item, index) in hotList"
                :key="index"
                :class="index === curIndex ? 'active' : ''"
                class="video-item"
                @click="hanldeClickVideoItem($event, index)"
            >
                <div>
                    <span>{{ index === curIndex ? '>' : '·' }}</span>
                    {{ item.title.slice(0, 15) + '…' || '获取视频标题失败' }}
                </div>

                <div>{{ secondFormatter(item.duration) }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, toRefs, onMounted, ref, Ref } from 'vue'
import { secondFormatter } from '@/utils/timeUtils'

interface VideoBoxProps {
    hotList: Ref<any[]>
}

const props = withDefaults(defineProps<VideoBoxProps>(), {})
const { hotList } = toRefs(props)

const baseSrc = 'https://player.bilibili.com/player.html?bvid='

// 初始时
const curIndex = ref(0)

const videoPath = ref(baseSrc + hotList.value[curIndex.value]['bvid'])

const rightBar = ref()

const autoFocus = (height: number) => {
    // 自动定位active元素到autoFocusIndex
    const autoFocusIndex = 4
    if (curIndex.value > autoFocusIndex) {
        rightBar.value.scrollTop = (curIndex.value - autoFocusIndex) * height
    }
}

// pre
const handlePre = (event: Event) => {
    // 循环数组
    curIndex.value = (curIndex.value - 1) % hotList.value.length
    videoPath.value = baseSrc + hotList.value[curIndex.value]['bvid']
    // @ts-ignore
    autoFocus(event.target.clientHeight)
}

// next
const handleNext = (event: Event) => {
    // 循环数组
    curIndex.value = (curIndex.value + 1) % hotList.value.length
    videoPath.value = baseSrc + hotList.value[curIndex.value]['bvid']
    // @ts-ignore
    autoFocus(event.target.clientHeight)
}

// 切换视频
const hanldeClickVideoItem = (event: Event, index: number) => {
    curIndex.value = index
    videoPath.value = baseSrc + hotList.value[curIndex.value]['bvid']

    // 获取video item 的高度，根据高度自动调整
    // @ts-ignore
    autoFocus(event.target.clientHeight)
}

// 渲染完告诉父元素
const emit = defineEmits(['rendered'])
onMounted(() => {
    emit('rendered')
})
</script>

<style scoped>
.container {
    margin: 20px 0;
    display: flex;
    height: 394px;
}
.container .right-bar {
    margin-left: 30px;
    overflow-y: scroll;
    height: 100%;
    width: 350px;
    font-size: 14px;
}
.right-bar::-webkit-scrollbar {
    width: 5px;
}
.right-bar::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #918e8e;
}
.right-bar::-webkit-scrollbar-track {
    border-radius: 5px;
    background-color: white;
}
.right-bar .video-item {
    margin-right: 10px;
    padding: 2px 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
}
.right-bar .video-item:hover {
    color: skyblue;
}
.active {
    color: skyblue;
    font-weight: bold;
}
.control-bottom {
    display: flex;
    width: 640px;
    justify-content: space-between;
}
</style>
