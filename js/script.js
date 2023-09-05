'use strict'

function main() {
  let title = prompt('Как называется ваш проект?')
  let screens = prompt(
    'Какие типы экранов нужно разработать?',
    'Простые, Сложные, Интерактивные',
  )
  let screenPrice = +prompt('Сколько будет стоить данная работа?')
  let rollback = 20
  let adaptive = confirm('Нужен ли адаптив на сайте?')
  let service1 = prompt('Какой дополнительный тип услуги нужен?')
  let servicePrice1 = +prompt('Сколько это будет стоить?')
  let service2 = prompt('Какой дополнительный тип услуги нужен?')
  let servicePrice2 = +prompt('Сколько это будет стоить?')

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

  const getAllServicePrices = function (price1, price2) {
    return price1 + price2
  }
  function getFullPrice(price, callback) {
    return price + callback
  }
  const getServicePercentPrices = function (price, rollback) {
    return Math.ceil(price - price * (rollback / 100))
  }
  const getTitle = function (str) {
    return (
      str.trim().charAt(0).toUpperCase() + str.trim().slice(1).toLowerCase()
    )
  }

  let fullPrice = getFullPrice(
    screenPrice,
    getAllServicePrices(servicePrice1, servicePrice2),
  )
  let servicePercentPrice = getServicePercentPrices(fullPrice, rollback)
  title = getTitle(title)

  showTypeOF(title)
  showTypeOF(fullPrice)
  showTypeOF(adaptive)

  console.log(screens.toLowerCase().split(', '))
  console.log(getRollbackMessage(fullPrice))
  console.log(
    'Стоимость за вычетом отката посреднику ' + servicePercentPrice + ' рублей',
  )
}

main()
