<template>
  <div class="books">
    <h1>My Books</h1>
    <b-container class="bv-example-row">
      <b-form @submit="onSubmit">
        <b-form-row>
          <b-form-group class="col-md-5">
            <label for="name">Название</label>
            <b-form-input
              type="text"
              class="form-control"
              id="name"
              v-model="form.name"
              placeholder="Название"
              required
            />
          </b-form-group>
          <b-form-group class="col-md-5 offset-md-2">
            <label for="author">Автор</label>
            <b-form-input
              type="text"
              class="form-control"
              id="author"
              v-model="form.autor"
              placeholder="Автор"
              required
            />
          </b-form-group>
        </b-form-row>
        <b-form-group class="col-md-8 offset-md-2">
          <label for="description">Описание</label>
          <b-form-textarea
            class="form-control"
            id="description"
            placeholder="Описание"
            required
            v-model="form.description"
          />
        </b-form-group>
        <button type="submit" class="btn btn-primary">Добавить</button>
      </b-form>
      <b-row>
        <b-table striped hover :books="books"/>
        <tbody>
          <th></th>
          <tr v-for="book in books" v-bind:key="book.id">
            <td>{{book.id}}</td>
            <td>{{book.title}}</td>
            <td>{{book.author}}</td>
          </tr>
        </tbody>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "Books",
  data() {
    return {
      form: {
        name: "",
        autor: "",
        description: ""
      }
    };
  },
  created: function() {
    this.$store.dispatch("books/getBooks");
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.$store.dispatch("books/postBook", this.form);
    }
  },
  computed: {
    ...mapState("books", {
      books: state => {
        return state.data;
      }
    })
  },
  ...mapActions("books", ["getBooks", "postBook"])
};
</script>

<style scoped>
.row {
  margin-top: 20px;
}
</style>
