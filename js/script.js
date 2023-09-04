function main() {
  const title = prompt('Как называется ваш проект?')
  const screens = prompt(
    'Какие типы экранов нужно разработать?',
    'Простые, Сложные, Интерактивные',
  )
  const screenPrice = +prompt('Сколько будет стоить данная работа?')
  const rollback = 20
  const adaptive = confirm('Нужен ли адаптив на сайте?')
  const service1 = prompt('Какой дополнительный тип услуги нужен?')
  const servicePrice1 = +prompt('Сколько это будет стоить?')
  const service2 = prompt('Какой дополнительный тип услуги нужен?')
  const servicePrice2 = +prompt('Сколько это будет стоить?')
  const fullPrice = screenPrice + servicePrice1 + servicePrice2
  const servicePercentPrice = Math.ceil(
    fullPrice - fullPrice * (rollback / 100),
  )

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

  console.log(
    'Стоимость за вычетом отката посреднику ' + servicePercentPrice + ' рублей',
  )

  if (fullPrice >= 30000) {
    console.log('Даем скидку в 10%')
  } else if (fullPrice >= 15000) {
    console.log('Даем скидку в 5%')
  } else if (fullPrice >= 0) {
    console.log('Скидка не предусмотрена')
  } else {
    console.log('Что то пошло не так')
  }
}

main()
