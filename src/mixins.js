let uuid = 0

export default {
  uniqueId: {
    beforeCreate () {
      this.uniqueId = uuid.toString()
      uuid += 1
    }
  }
}

// export default {
//   beforeCreate () {
//     this.uniqueId = uuid.toString()
//     uuid += 1
//   }
// }
