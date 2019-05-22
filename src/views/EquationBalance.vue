<template>
    <my-page title="化学方程式配平" :page="page">
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
            <div class="result equation" v-html="result" v-if="result"></div>
            <!-- <textarea class="form-control" v-model="result" rows="6" placeholder="结果" disabled v-if="result"></textarea> -->
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import {balanceEq, format} from '../util/balance/'

    // Tests:
    // balanceEq(['CH4', 'Cl2'], ['CCl4', 'HCl']);
    // balanceEq(['Fe2O3', 'C'], ['Fe', 'CO2']);
    // balanceEq(['N2', 'H2'], ['NH3']);
    // balanceEq(['C2H4', 'O2'], ['CO2', 'H2O']);
    
    export default {
        data () {
            return {
                // reagents: 'Fe,Cl2',
                // products: 'FeCl3',
                exp: 'Fe + Cl2 = FeCl3',
                result: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/help'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
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
                this.result = output

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
