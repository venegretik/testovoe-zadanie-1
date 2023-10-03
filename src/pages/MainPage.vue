<template>
    <div class="container">
        <div class="input__search__container">
            <div class="input__search">
                <custom-input ref="search" @update:model-value="($event) => inputChange($event)" :modelValue="searchValue"
                    placeholder="Search jokes..."></custom-input>
                <p v-if="jokesArrayLength">Found jokes: {{ jokesArrayLength }}</p>
            </div>
        </div>
        <div class="jokes__list">
            <a :href="item.url" class="jokes__cart" v-for="item in jokesArray" :key="item">
                <p>{{ item.value }}</p>
                <div class="jokes__cart__footer">
                    <p class="id__cart">{{ item.id }}</p>
                    <p>{{ new Date(item.created_at).toLocaleDateString() }}</p>
                </div>
            </a>
        </div>
        <div v-if="isFetch" class="loader">
            <img src="/img/loader.gif" alt="">
        </div>
        <div class="ErrorText" v-if="textError">
            <p>{{ textError }}</p>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
export default {
    methods: {
        inputChange(e) {
            this.setSearchValue(e);
            if (e.length > 3) {
                this.searchFunc();
                this.setTextError('');
            }
            else {
                this.setTextError('Введите минимум 4 символа');
            }
            this.clearValues()
        },
        ...mapMutations({
            setSearchValue: 'jokesStorage/setSearchValue',
            setTextError: 'jokesStorage/setTextError',
            clearValues:'jokesStorage/clearValues'
        }),
        ...mapActions({
            searchFunc: 'jokesStorage/searchFunc'
        }),
    },
    mounted() {
        this.$refs.search.$el.focus();
    },
    computed: {
        ...mapState({
            searchValue: state => state.jokesStorage.searchValue,
            jokesArray: state => state.jokesStorage.jokesArray,
            jokesArrayLength: state => state.jokesStorage.jokesArrayLength,
            isFetch: state => state.jokesStorage.isFetch,
            textError: state => state.jokesStorage.textError
        })
    }
}
</script>

<style scoped>
.container {
    max-width: 1600px;
    width: 83%;
    display: flex;
    flex-direction: column;
    margin: 0px auto;
}

.input__search__container {
    margin-top: 10.66666vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input__search p {
    margin-top: 15px;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    margin-left: 20px;
}

.input__search {
    max-width: 626px;
    width: 33%;
}

.input__search input {
    padding: 10px 20px;
    width: 100%;
    border: 0px;
    color: #656EC2;
    font-family: 'Fira Sans', sans-serif;
    font-size: 20px;
    font-weight: 700;
    box-shadow: 0px 7px 12px 0px #64646F33;
}

.jokes__list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    column-gap: 10px;
    row-gap: 10px;
}

.jokes__cart {
    box-shadow: 0px 7px 25px 0px #64646F33;
    padding: 20px;
    display: flex;
    min-height: 150px;
    color: #282626;
    text-decoration: none;
    flex-direction: column;
    font-family: 'Fira Sans', sans-serif;
    justify-content: space-between;
    max-width: calc(33.3333% - 10px);
    width: 100%;
}

.jokes__list .jokes__cart:nth-child(2),
.jokes__list .jokes__cart:nth-child(1) {
    max-width: calc(50% - 10px);
    min-height: 262px;
    width: 100%;

}

.jokes__cart__footer {
    margin-top: 20px;
    width: 100%;
    color: #767676;
    column-gap: 10px;
    display: flex;
    justify-content: space-between;
    word-wrap: break-word;
    font-family: 'Montserrat', sans-serif;
}

.id__cart {
    width: 60%;
}

.loader,
.ErrorText {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.ErrorText p {
    font-weight: 600;
    font-size: 20px;
    font-family: 'Montserrat', sans-serif;
}

.loader img {
    width: 60px;
}

@media(max-width:1280px) {
    .container {
        width: 100%;
        padding: 0px 20px;
    }
}

@media(max-width:978px) {
    .jokes__list .jokes__cart:nth-child(1) {
        max-width: calc(100% - 10px);
        min-height: 262px;
        width: 100%;

    }

    .input__search {
        max-width: none;
        width: 100%;
    }

    .jokes__list .jokes__cart:nth-child(2) {
        min-height: 150px;
    }

    .jokes__cart {
        max-width: calc(50% - 10px);
    }
}

@media(max-width:768px) {
    .jokes__list .jokes__cart:nth-child(1) {
        min-height: 150px;
    }

    .jokes__list .jokes__cart:nth-child(2) {
        max-width: calc(100% - 10px);
    }

    .jokes__cart {
        max-width: calc(100% - 10px);
    }
}</style>