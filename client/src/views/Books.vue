<template>
  <div class="books">
    <h1>This is page about books</h1>
    <Books/>
  </div>
</template>

<script>
import Books from "@/components/Books.vue";

export default {
  name: "books",
  components: {
    Books
  }
};
</script>