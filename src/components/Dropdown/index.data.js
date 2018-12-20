export default {
  binding: {
    items: [
      {
        id: 1,
        info: {
          name: '111',
          age: 11
        }
      },
      {
        id: 2,
        info: {
          name: '222',
          age: 22
        }
      },
      {
        id: 3,
        info: {
          name: '333',
          age: 33
        }
      }
    ],
    map: (item) => item.info
  }
}
