<template>
    <div>⭐️命令介绍</div>
    <div>命令名：{{ command.command }}（{{ command.name }}）</div>
    <div>用法：{{ usageStr }}</div>
    <div style="text-indent: 2em">
        <div class="main-desc">作用：{{ command.desc }}</div>
        <div
            class="main-alias"
            v-if="command.alias && command.alias.length > 0"
        >
            别名：{{ command.alias.join(', ') }}
        </div>

        <div
            class="options"
            v-if="command.options && command.options.length > 0"
        >
            <div>选项</div>
            <!-- options -->
            <ul style="list-style-type: none">
                <li v-for="option in command.options" :key="option.name">
                    <a-row>
                        <a-col :span="4">
                            <!-- 有无别名，有就遍历输出 -->
                            <template
                                v-if="option.alias && option.alias.length > 0"
                            >
                                <span v-for="ali in option.alias" :key="ali">
                                    -{{ ali }},
                                </span>
                            </template>
                            <!-- 全名 -->
                            <span>--{{ option.name }}</span>
                        </a-col>
                        <a-col :span="20">
                            <span
                                >{{ option.desc }} （{{
                                    option.required ? '必选项' : '可选项'
                                }}）</span
                            >
                        </a-col>
                    </a-row>
                </li>
            </ul>
        </div>
        <div class="arguments" v-if="command.args && command.args.length > 0">
            <div>参数：</div>
            <ul
                style="list-style-type: none"
                v-if="command.args && command.args.length > 0"
            >
                <li v-for="arg in command.args" :key="arg.name">
                    <a-row>
                        <a-col :span="4">{{ arg.name }}</a-col>
                        <a-col :span="20"
                            >{{ arg.desc }}（{{
                                arg.required ? '必填项' : '可填项'
                            }}）</a-col
                        >
                    </a-row>
                </li>
            </ul>
        </div>
    </div>
    <br />
</template>
<script setup lang="ts">
import { CommandType } from '../../../command'
import { toRefs, computed, onMounted } from 'vue'
import { usageStrFormatter } from '../componets/helpUtils'

const emit = defineEmits(['rendered'])
onMounted(() => {
    emit('rendered')
})

interface HelpBoxProps {
    command: CommandType
}
const props = withDefaults(defineProps<HelpBoxProps>(), {})
const { command } = toRefs(props)

const usageStr = computed(() => {
    return usageStrFormatter(command.value)
})
</script>
<style scoped>
.main-desc {
    margin-top: 20px;
}
.main-alias {
    margin-top: 20px;
}
.options {
    margin-top: 20px;
}
.arguments {
    margin-top: 20px;
}
</style>
