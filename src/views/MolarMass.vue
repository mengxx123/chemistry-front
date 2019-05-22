<template>
    <my-page title="摩尔质量计算器">
        <div class="common-container container">
            <ui-text-field v-model="exp" label="化学式" hintText="如：NaCl" />
            <br>
            <ui-raised-button class="btn" label="计算" primary @click="calculate" />
            <div v-if="result">{{ result }}</div>
        </div>
    </my-page>
</template>

<script>
    const molarmass = require('molarmass')

    export default {
        data () {
            return {
                exp: '',
                result: ''
            }
        },
        mounted() {
        },
        methods: {
            calculate() {
                if (!this.exp) {
                    this.$message({
                        type: 'danger',
                        text: '请输入化学式'
                    })
                    return
                }
                try {
                    this.result = molarmass(this.exp)
                } catch (e) {
                    console.log(e)
                    this.$message({
                        type: 'danger',
                        text: '请输入正确的化学式'
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.btn {
    margin-bottom: 16px;
}
</style>
