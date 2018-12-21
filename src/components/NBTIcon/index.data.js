export default {
  binding: {
    type: 'INT'
  },
  state: ['byte', 'short', 'int', 'long', 'float', 'double',
    'byte_array', 'string', 'list', 'compound', 'int_array',
    'long_array', 'other'
  ].map(tag => ({
    type: tag
  }))
}
