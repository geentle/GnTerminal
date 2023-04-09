<template>
    <div>✔️ 有关某个命令的详细信息，请键入 'help 命令名'</div>
    <div>以下是已定义的命令列表📜</div>
    <div>
        <a-row v-for="command in commandList" :key="command.command">
            <a-col :span="4">{{ command.command }}</a-col>
            <a-col :span="8">{{ command.name }}</a-col>
            <a-col :span="12">{{ command.desc }}</a-col>
        </a-row>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { commandList } from '../../../commandRegister'

const emit = defineEmits(['rendered'])
onMounted(() => {
    emit('rendered')
})
</script>
<style scoped></style>
