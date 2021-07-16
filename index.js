const arvish = require('arvish')
const { lib } = require('emojilib')
const emojisyo = require('./emojisyo')

const keywordList = Object.keys(emojisyo)

const getEmojis = keyword => (
  arvish.matches(keyword, keywordList)
    .map(key => emojisyo[key])
    .flat()
)

let items = null
const inputs = arvish.input.split(/\s+/g).filter(Boolean)
for (const input of inputs) {
  items = items
    ? new Set(getEmojis(input).filter(emoji => items.has(emoji)))
    : new Set(getEmojis(input))
}

arvish.output(
  Array.from(items).map(name => ({
    title: `${(lib[name] || {}).char} :${name}:`,
    subtitle: lib[name].keywords.join(', '),
    arg: lib[name].char,
    icon: { path: './5502E777-B578-4938-B155-D11E48EA3589.png' }
  }))
)
