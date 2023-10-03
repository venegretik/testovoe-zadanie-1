<template>
    <input type="text" :value="modelValue" @input="createInput"/>
</template>

<script>
export default{
    name:'custom-input',
    props: {
        modelValue: [Number, String]
    },
    data() {
        return {

        }
    },
    methods: {
        createInput(e) {
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>

<style>

</style>