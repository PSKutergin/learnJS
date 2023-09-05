'use strict'

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

  const showTypeOF = function (variable) {
    console.log(variable, typeof variable)
  }

  const getRollbackMessage = function (price) {
    if (price >= 30000) {
      return 'Даем скидку в 10%'
    } else if (price >= 15000) {
      return 'Даем скидку в 5%'
    } else if (price >= 0) {
      return 'Скидка не предусмотрена'
    } else {
      return 'Что то пошло не так'
    }
  }

  showTypeOF(title)
  showTypeOF(fullPrice)
  showTypeOF(adaptive)

  console.log(getRollbackMessage(fullPrice))
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
}

main()
