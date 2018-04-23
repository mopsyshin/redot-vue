<template>
    <div class="dropdown-container">
        <div class="selected-item" 
             @click="toggleDropdown" 
             v-if="selectedItem !== ''">
             {{ selectedItem }}
             <img class="icn-down" src="@/assets/icn-down.svg" alt="">
        </div>
        <div class="selected-item" 
             @click="toggleDropdown" 
             v-if="selectedItem == ''">
             {{ this.placeholder }}
             <img class="icn-down" src="@/assets/icn-down.svg" alt="">
        </div>
        <transition name="dropdown-animation" mode="out-in" appear>
            <div class="dropdown-list" v-if="dropdownState">
                <div class="dropdown-list-item" 
                    v-for="item in items" 
                    :key="item.key" 
                    @click="selectItem(item)">
                    {{ item }}
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: ['items', 'placeholder', 'defaultItem'],
    data() {
        return {
            selectedItem: '',
            dropdownState: false,
        }
    },
    mounted() {
        this.selectItem(this.defaultItem)
    },
    methods: {
        toggleDropdown() {
            this.dropdownState = !this.dropdownState
        },
        selectItem(item) {
            this.selectedItem = item
            this.dropdownState = false
            this.$emit('itemSelected', item)
        }
    }
}
</script>

<style>

</style>
