const title = 'nameProject'
const screens = 'Простые, Сложные, Интерактивные'
const screenPrice = 55000
const rollback = 20
const fullPrice = 1000000
const adaptive = true

console.log(typeof title)
console.log(typeof fullPrice)
console.log(typeof adaptive)

console.log(screens.length)

console.log('Стоимость верстки экранов ' + screenPrice + ' рублей')
console.log('Стоимость разработки сайта ' + fullPrice + ' рублей')

console.log(
  'Стоимость верстки экранов ' + Math.round(screenPrice / 96.2) + ' долларов',
)
console.log(
  'Стоимость разработки сайта ' + Math.round(fullPrice / 96.2) + ' долларов',
)

console.log(
  'Стоимость верстки экранов ' + Math.round(screenPrice * 0.39) + ' гривен',
)
console.log(
  'Стоимость разработки сайта ' + Math.round(fullPrice * 0.39) + ' гривен',
)

console.log(
  'Стоимость верстки экранов ' + Math.round(screenPrice / 13.2) + ' юани',
)
console.log(
  'Стоимость разработки сайта ' + Math.round(fullPrice / 13.2) + ' юани',
)

console.log(screens.toLowerCase().split(', '))

console.log(fullPrice * (rollback / 100))
