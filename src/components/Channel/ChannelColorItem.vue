<template>
    <div>

    </div>
</template>

<script>

export default {
    props: [ 'color' ],
    data() {
        return {
            isSelected: false,
        }
    },
    methods: {
        selectColor() {
            this.isSelected = true
        }
    },
}
</script>

<style>

</style>

