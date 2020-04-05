<template>
    <my-page title="摩尔质量计算器" :page="page">
        <div class="common-container container">
            <ui-text-field v-model="exp" label="化学式" hintText="如：NaCl" />
            <br>
            <ui-raised-button class="btn" label="计算" primary @click="calculate" />
            <div v-if="result">
                <!-- {{ result }} -->
                <ui-article>
                    <table>
                        <tr>
                            <th>化合物</th>
                            <th>质量</th>
                        </tr>
                        <tr>
                            <td v-html="result.exp"></td>
                            <td>{{ result.mass }}</td>
                        </tr>
                    </table>

                    <h2>组成</h2>

                    <table>
                        <tr>
                            <th>元素</th>
                            <th>原子质量</th>
                            <th>数量</th>
                            <th>总质量</th>
                            <th>质量占比</th>
                        </tr>
                        <tr v-for="item in result.elements">
                            <td>{{ item.element.symbol }}</td>
                            <td>{{ item.element.mass.toFixed(4) }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ itemMass(item) }}</td>
                            <td>{{ itemPercent(item) }}%</td>
                        </tr>
                    </table>
                </ui-article>
            </div>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import {balanceEq, format} from '../util/balance/'
    const molarmass = require('molarmass')

    console.log('format', format('Ca(OH)2'))
    export default {
        data () {
            return {
                exp: '',
                result: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/387f96f0554d11eaa20029984370e1fd',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.debug()
        },
        methods: {
            debug() {
                this.exp = 'Ca(Na(OH)2)2'
                this.calculate()
            },
            itemMass(item) {
                return (item.element.mass * item.quantity).toFixed(4)
            },
            itemPercent(item) {
                return (item.element.mass * item.quantity / this.result.mass * 100).toFixed(4)
            },
            calculate() {
                if (!this.exp) {
                    this.$message({
                        type: 'danger',
                        text: '请输入化学式'
                    })
                    return
                }
                try {
                    let calResult = molarmass(this.exp, {
                        returnCompound: true,
                    })
                    this.result = {
                        exp: format(this.exp),
                        mass: calResult.molarMass.toFixed(4),
                        elements: calResult.elements,
                    }

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
