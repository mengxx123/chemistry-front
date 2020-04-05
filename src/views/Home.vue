<template>
    <my-page title="化学" :page="page">
        <div class="common-container container">
            <app-list :data="groups" />
        </div>
    </my-page>
</template>

<script>
    export default {
        data () {
            return {
                groups: [
                    {
                        // name: '基本',
                        apps: [
                            {
                                name: '元素周期表',
                                desc: '',
                                icon: '/static/chemistry.svg',
                                to: '/table'
                            },
                            {
                                name: '摩尔质量计算器',
                                desc: '',
                                icon: '/static/chemistry.svg',
                                to: '/molar_mass'
                            },
                            {
                                name: '化学方程式配平',
                                desc: '',
                                icon: '/static/chemistry.svg',
                                to: '/equation_balance'
                            },
                            {
                                name: '化学方程式配平',
                                desc: '专业版，开发中',
                                icon: '/static/chemistry.svg',
                                to: '/balance'
                            }
                        ]
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'search',
                            href: 'https://search.yunser.com?utm_source=chemistry',
                            target: '_blank',
                            title: '搜索'
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=chemistry',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        },
        computed: {
        },
        mounted() {
        },
        methods: {
            init() {
            },
            fileChange(e) {
            },
            sizeStr: function (size) {
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '../scss/var';

</style>
