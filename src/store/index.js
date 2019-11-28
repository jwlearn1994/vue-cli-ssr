import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore() {
	return new Vuex.Store({
		state() {
			return {
				post: {}
			}
		},
		mutations: {
			UPDATE_POST(state, post) {
				state.post = post;
			}
		},
		actions: {},
		modules: {}
	})
}