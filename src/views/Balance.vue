<template>
    <my-page title="化学方程式配平（专业版）" :page="page">
        <div class="common-container container">
            <!-- <div class="input">
                <p>List reagents, separated by commas: 
                    <input type="text" v-model="reagents" class="reagents" value=""></p>
                <p>List products, separated by commas: 
                    <input v-model="products" type="text" class="products" value=""></p>
            </div> -->

            <textarea class="form-control" v-model="exp" rows="6" placeholder="化学方程式，如："></textarea>
            <div class="btns">
                <ui-raised-button class="btn" primary label="配平" @click="balance" />
            </div>
            <div v-if="result">
                <p class="result equation" v-html="result.exp"></p>

                <ui-article>
                    <table>
                        <tr>
                            <th>化合物</th>
                            <th>系数</th>
                            <th>摩尔质量</th>
                        </tr>
                        <tr v-for="item in result.leftResults">
                            <td>
                                <div v-html="item.formatedExp"></div>
                            </td>
                            <td>{{ item.number }}</td>
                            <td>{{ mMass(item) }}</td>
                        </tr>
                        <hr>
                        <tr v-for="item in result.rightResults">
                            <td>
                                <div v-html="item.formatedExp"></div>
                            </td>
                            <td>{{ item.number }}</td>
                            <td>{{ mMass(item) }}</td>
                        </tr>
                    </table>

                    <!-- <h2>调试</h2> -->


                </ui-article>
            </div>
            <!-- <textarea class="form-control" v-model="result" rows="6" placeholder="结果" disabled v-if="result"></textarea> -->
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import {balanceEq, format} from '../util/balance/'
    import { getResult, } from '../util/chemistry/balancePro'
    const molarmass = require('molarmass')
    import { algebra } from 'mathjs'

    // console.log('mathjs', algebra)

    // Tests:
    // balanceEq(['CH4', 'Cl2'], ['CCl4', 'HCl']);
    // balanceEq(['Fe2O3', 'C'], ['Fe', 'CO2']);
    // balanceEq(['N2', 'H2'], ['NH3']);
    // balanceEq(['C2H4', 'O2'], ['CO2', 'H2O']);
    
    // let balanceEq2 = require('chem-eb')
    // console.log(balanceEq2('P+O2=P2O5'))

    class ChemicalC {
        constructor(exp) {
            this.exp = exp
            let stack = [
                {},
            ]
            
            let tmp = ''
            function add(elem, num = 1) {
                let elems = stack[stack.length - 1]
                console.log('index', stack.length - 1)
                console.log('add', elem)
                let match = elem.match(/[\d]+/)
                let _elem = elem
                if (match) {
                    console.log('match', match)
                    _elem = elem.replace(match[0], '')
                    num = parseInt(match[0])
                }
                // let findedItem = elems.find(item => ite)
                if (!elems[_elem]) {
                    elems[_elem] = {
                        number: num,
                        elec: 0,
                    }
                } else {
                    elems[_elem].number += num
                }
            }
            for (let i = 0; i < exp.length; i++) {
                let char = exp[i]

                if (char === '(') {
                    if (tmp) {
                        add(tmp)
                        tmp = ''
                    }
                    stack.push({})
                } else if (char === ')') {

                } else if (char.match(/\d/)) {
                    let last = i+1
                    while (last < exp.length - 1) {
                        console.log('exp[last]', exp[last])
                        if (exp[last].match(/\d/)) {
                            console.log('匹配')
                            last++
                        } else {
                            break
                        }
                        let idx = last - 1
                        let num = parseInt(exp.substring(i ,idx + 1))
                        console.log('_num', num)
                        if (tmp) {
                            add(tmp, num)
                            tmp = ''
                            i = idx
                        }
                    }
                                                                        
                    console.log('last', last)
                } else {
                    if (i !== 0 && char.match(/[A-Z]/)) {
                        if (tmp) {
                            add(tmp)
                            tmp = ''
                        }
                    }
                    tmp += char
                    
                }

                // if (i === exp.length - 1) {
                //     add(tmp)
                // }
                
            }
            if (tmp) {
                console.log('lastTmp', tmp)
                add(tmp)
            }
            console.log('stack', stack)
            // this.elems = elems
        }
    }

    function testing(a, b) {
        if (a === b) {
            
        } else {
            console.error('error', a, b)
        }
    }
    // testing(new ChemicalC('FeC').elems['Fe'], 1)
    console.log(new ChemicalC('Fe23C33'))

    export default {
        data () {
            return {
                // reagents: 'Fe,Cl2',
                // products: 'FeCl3',
                exp: 'Fe + Cl2 = FeCl3',
                // exp: 'Fe{3+} + I{-} = Fe{2+} + I2',
                // exp: 'Cu + H(NO3) = Cu(NO3)2 + NO2 + H2O',
                result: null,
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/569ec570554d11eaa20029984370e1fd',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
            // this.debug()
        },
        methods: {
            mMass(item) {
                return molarmass(item.exp)
            },
            init() {
            },
            debug() {
                // this.exp = 'Fe{3+} + I{-} = Fe{2+} + I2'
                this.balance()
            },
            balance() {
                if (!this.exp) {
                    this.$message({
                        type: 'danger',
                        text: '请输入化学方程式'
                    })
                    return
                }
                if (this.exp.indexOf('=') === -1) {
                    this.$message({
                        type: 'danger',
                        text: '化学方程式不正确'
                    })
                    return
                }
                let arr = this.exp.split('=')
                function getReesults(text) {
                    return text.split('+')
                        .map(item => item.replace(/^\s+/g, '').replace(/\s+$/g, ''))
                        .map(item => {
                            return {
                                exp: item,
                                formatedExp: format(item)
                            }
                        })
                }
                let leftResults = getReesults(arr[0])
                let rightResults = getReesults(arr[1])

                let ret = getResult(arr[0], arr[1])
                console.log('ret', ret)

                for (let i = 0; i < ret.ans.length; i++) {
                    if (i < leftResults.length) {
                        leftResults[i].number = ret.ans[i]
                    } else {
                        let idx = i - leftResults.length
                        rightResults[idx].number = ret.ans[i]
                    }
                }

                this.result = {
                    exp: ret.exp,
                    leftResults,
                    rightResults,
                }
                console.log('this.result', this.result)
            },
            balance2() {
                if (!this.exp) {
                    this.$message({
                        type: 'danger',
                        text: '请输入化学方程式'
                    })
                    return
                }
                if (this.exp.indexOf('=') === -1) {
                    this.$message({
                        type: 'danger',
                        text: '化学方程式不正确'
                    })
                    return
                }

                let arr = this.exp.split('=')

                var reagents = arr[0].split('+')
                var products = arr[1].split('+')
                // console.log(reagents, products);
                // console.log(getMols(reagents));

                let solution = balanceEq(reagents, products)

                var output = ''
                reagents.concat(products).forEach((mol, index) => {
                    console.log('循环', mol, index)
                    if (solution[index] !== 1) {
                        output += `<span class="num">${solution[index]}</span> `
                    }
                    output += format(mol)
                    if (index == reagents.length - 1) {
                        output += ' === '
                    } else if (index != solution.length - 1) {
                        output += ' + '
                    }
                })
                console.log('output', output)
                this.result = {
                    exp: output,
                    results: [
                        {

                        }
                    ]
                }
                console.log('this.result', this.result)

                // let reagent_mols = getMols(reagents); // array of objects
                // let product_mols = getMols(products);
            }
        }
    }
</script>

<style lang="scss" scoped>
textarea.form-control {
    height: auto;
}
.form-control {
    display: block;
    width: 100%;
    max-width: 400px;
    height: 33px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42;
    color: #55595c;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 2px;
    outline: none;
}
.charset {
    margin-top: 16px;
}
.btns {
    margin-top: 16px;
    margin-bottom: 16px;
    .btn {
        margin-right: 8px;
    }
}
</style>

<style lang="scss">
.equation {
    font-size: 16px;
    .num {
        font-weight: bold;
        color: #4285f4;
    }
}
</style>
