/* eslint-disable */
/**
 * @jest-environment jsdom
 */

import { createLocalVue, shallowMount } from '@vue/test-utils'
import SignUpWithEmailForm from 'src/components/auth/SignUpWithEmailForm.vue'

import * as All from 'quasar'
const { Quasar } = All

const components = Object.keys(All).reduce((object, key) => {
  const val = All[key]
  if (val && val.component && val.component.name != null) {
    object[key] = val
  }
  return object
}, {})

describe('Mount Quasar', () => {
  const localVue = createLocalVue()
  localVue.use(Quasar, { components }) // , lang: langEn

  const wrapper = shallowMount(SignUpWithEmailForm, {
    localVue,
  })
  const vm = wrapper.vm

  it("パスワード強度テスト", () => {
    // 8文字以上の数字、英大文字、英小文字が混在すること
    const localThis = { regex: vm.$data.regex }
    localThis.password = null
    expect(SignUpWithEmailForm.computed.isValid.call(localThis)).toBe(false)

    localThis.password = 'password'
    expect(SignUpWithEmailForm.computed.isValid.call(localThis)).toBe(false)

    localThis.password = 'PASSWORD'
    expect(SignUpWithEmailForm.computed.isValid.call(localThis)).toBe(false)

    localThis.password = 'PASSWORD1234'
    expect(SignUpWithEmailForm.computed.isValid.call(localThis)).toBe(false)

    localThis.password = 'パスワード'
    expect(SignUpWithEmailForm.computed.isValid.call(localThis)).toBe(false)

    localThis.password = 'Password'
    expect(SignUpWithEmailForm.computed.isValid.call(localThis)).toBe(false)

    localThis.password = 'Password 1234'
    expect(SignUpWithEmailForm.computed.isValid.call(localThis)).toBe(false)

    localThis.password = 'Pass123'
    expect(SignUpWithEmailForm.computed.isValid.call(localThis)).toBe(false)

    localThis.password = 'Pass1234'
    expect(SignUpWithEmailForm.computed.isValid.call(localThis)).toBe(true)
    
    // 8文字以上の境界値
    localThis.password = 'Password1234'
    expect(SignUpWithEmailForm.computed.isValid.call(localThis)).toBe(true)

    localThis.password = 'Password1234Password1234Password1234Password1234Password1234Password1234Password1234Password1234Password1234Password1234'
    expect(SignUpWithEmailForm.computed.isValid.call(localThis)).toBe(true)
  })
})
