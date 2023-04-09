<template>
    <div class="output-content">
        <!-- 输出为文本类型 -->
        <template v-if="output.type === 'text'">
            <span v-if="output.status">{{ statusTag }}&nbsp;</span>
            <span v-html="smartText(output.text)"></span>
        </template>
        <!-- 输出为组件类型 -->
        <component
            :is="output.component"
            v-if="output.type === 'component'"
            v-bind="output.props ?? {}"
            @rendered="handleAsyncComRendered"
        />
    </div>
</template>
<script setup lang="ts">
import CommandOutputType = GnTerminal.CommandOutputType
import { toRefs, computed } from 'vue'
import smartText from '../../utils/smartText'

interface OutputProps {
    output: CommandOutputType
}
// 接收组件传参
const props = defineProps<OutputProps>()
const { output } = toRefs(props)
const statusTag = computed(() => {
    switch (output.value.status) {
        case 'success':
            return '✔️'
        case 'error':
            return '❌'
        case 'warning':
            return '⚠️'
        default:
            return ''
    }
})

const emit = defineEmits(['rendered'])
const handleAsyncComRendered = () => {
    emit('rendered')
}
</script>
<style scoped></style>
