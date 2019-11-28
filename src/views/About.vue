<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>
      <h3>{{ post.title }}</h3>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  asyncData(context) {
    if (context.isClient) {
      console.log(context);
    }
    return axios('https://jsonplaceholder.typicode.com/posts/1')
      .then(res => {
        context.store.commit('UPDATE_POST', res.data);
      });
  },
  computed: {
    ...mapState(['post']),
  }
}
</script>