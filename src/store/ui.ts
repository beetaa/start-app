import { UI } from './mutation_types'

export default {
  namespaced: true,
  state: {
    leftPanels: {
      home: false,
      task: false,
      hub: false,
      run: true
    },
    rightPanels: {
      visible: false,
      user: false,
      note: false,
      room: false,
      group: false,
      rank: false,
      setting: false,
      help: false
    },
    controlButtons: {
      setting: false,
      share: false,
      backward: false,
      play: false,
      forward: false,
      fullscreen: false,
      detail: false
    }
  },
  getters: {},
  mutations: {
    [UI.TOGGLE_LEFT_PANEL](state: any, panelName: string): void {
      if (!state.leftPanels[panelName]) {
        for (const i in state.leftPanels) {
          state.leftPanels[i] = false
        }
        state.leftPanels[panelName] = true
      }
    },
    [UI.TOGGLE_RIGHT_PANEL](state: any, panelName: string): void {
      if (state.rightPanels[panelName]) {
        state.rightPanels[panelName] = false
        state.rightPanels.visible = false
      } else {
        for (const i in state.rightPanels) {
          state.rightPanels[i] = false
        }
        state.rightPanels[panelName] = true
        state.rightPanels.visible = true
      }
    },
    [UI.TOGGLE_CONTROL_BUTTON](state: any, buttonName: string): void {
      state.controlButtons[buttonName] = !state.controlButtons[buttonName]
      // 这里要处理那些逻辑是联动的
    }
  },
  actions: {}
}
