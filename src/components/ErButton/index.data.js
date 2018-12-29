export default {
  binding: {
    type: 'primary'
  },
  // state: ['primary', 'info', 'success',
  //   'warning', 'error', 'normal', 'full'
  // ].map(tag => ({
  //   type: tag
  // }))
  state () {
    const result = []
    ;['primary', 'info', 'success', 'warning', 'error', 'normal'].forEach(type => {
      [false, true].forEach(full => {
        [false, true].forEach(outline => {
          [false, true].forEach(round => {
            result.push({
              type,
              full,
              outline,
              round,
              icon: Math.random() >= 0.5 ? 'fas fa-bomb' : ''
              // disabled: Math.random() >= 0.5
            })
          })
        })
      })
    })
    return result
  },
  slot: 'content'
}
