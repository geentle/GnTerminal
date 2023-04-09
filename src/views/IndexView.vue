<template>
    <gn-terminal ref="terminalRef" :user="loginUser" full-screen></gn-terminal>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '../stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { loginUser } = storeToRefs(userStore)

onMounted(() => {
    userStore.getAndSetLoginUser()
})
</script>

<style></style>
