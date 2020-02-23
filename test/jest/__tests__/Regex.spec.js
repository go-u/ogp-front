/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { mount, createLocalVue, shallowMount } from '@vue/test-utils'
import EditName from 'src/pages/edit/EditName.vue'
import * as All from 'quasar'
const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

const $route = {
  name: 'edit-username'
}
const user = {
  username: 'myname'
}

describe('Mount Quasar', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components }) // , lang: langEn

  const wrapper = mount(EditName, {
    localVue,
    computed: {
      user () {
        return user
      }
    },
    mocks: {
      $route
    }
  })
  const vm = wrapper.vm

  it('passes the sanity check and creates a wrapper', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('has a created hook', () => {
    expect(typeof vm.isValidUsername).toBe('function')
  })

  it('Regex Test', () => {
    vm.$data.userName = "username"
    expect(vm.isValidUsername()).toBe(true)

    vm.$data.userName = "_name_"
    expect(vm.isValidUsername()).toBe(true)

    vm.$data.userName = " "
    expect(vm.isValidUsername()).toBe(false)

    vm.$data.userName = "なまえ"
    expect(vm.isValidUsername()).toBe(false)
  })
})
