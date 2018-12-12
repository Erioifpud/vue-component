const json = `
{
  "name": "Example",
  "type": "file",
  "value": [
    {
      "name": "directory 1",
      "type": "dir",
      "value": [
        {
          "name": "pic 1",
          "type": "file",
          "value": "xxx.png"
        },
        {
          "name": "pic 2",
          "type": "file",
          "value": "yyy.jpeg"
        }
      ]
    },
    {
      "name": "text 1",
      "type": "file",
      "value": "note.txt"
    }
  ]
}
`

export default JSON.parse(json)
