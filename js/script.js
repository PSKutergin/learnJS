'use strict'

const title = document.getElementsByTagName('h1')[0]
const startBtn = document.getElementsByClassName('handler_btn')[0]
const resetBtn = document.getElementsByClassName('handler_btn')[1]
const buttonPlus = document.querySelector('.screen-btn')
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')
const inputRange = document.querySelector('.rollback input')
const inputRangeValue = document.querySelector('.rollback .range-value')
const total = document.getElementsByClassName('total-input')[0]
const totalCount = document.getElementsByClassName('total-input')[1]
const totalCountOther = document.getElementsByClassName('total-input')[2]
const fullTotalCount = document.getElementsByClassName('total-input')[3]
const totalCountRollback = document.getElementsByClassName('total-input')[4]

let screens = document.querySelectorAll('.screen')

const appData = {
  title: '',
  screens: [],
  count: 0,
  screenPrice: 0,
  rollback: 0,
  adaptive: true,
  servicesPercent: {},
  servicesNumber: {},
  servicePrice: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  rollbackMessage: '',
  isError: false,
  init: function () {
    appData.addTitle()

    startBtn.addEventListener('click', appData.start);

    buttonPlus.addEventListener('click', appData.addScreenBlock);

    inputRange.addEventListener('input', function () {
      inputRangeValue.textContent = inputRange.value + '%'
      appData.rollback = inputRange.value
    });
  },
  addTitle: function () {
    document.title = title.textContent
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen')
    appData.screens.length = 0
    appData.count = 0
    appData.isError = false

    screens.forEach(function (screen, index) {
      const select = screen.querySelector('select')
      const input = screen.querySelector('input')
      const selectName = select.options[select.selectedIndex].textContent

      if (select.selectedIndex === 0 || input.value.trim() === '' || input.value.trim() === 0) {
        appData.isError = true
      } else {
        appData.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value
        });
      }
      appData.count = +input.value + appData.count
    })
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value
      };
    })

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value
      };
    })
  },
  addScreenBlock: function () {
    screens = document.querySelectorAll('.screen')
    const cloneScreen = screens[0].cloneNode(true)

    screens[screens.length - 1].after(cloneScreen)
  },
  start: function () {
    appData.addScreens()
    appData.addServices()
    appData.addPrice();
    appData.showResult()
    // appData.logger();
  },
  showResult: function () {
    if (!appData.isError) {
      total.value = appData.screenPrice
      totalCount.value = appData.count
      totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
      fullTotalCount.value = appData.fullPrice
      totalCountRollback.value = appData.servicePercentPrice
    }
  },
  addPrice: function () {
    appData.screenPrice = 0
    appData.fullPrice = 0
    appData.servicePercentPrice = 0
    appData.servicePricesNumber = 0
    appData.servicePricesPercent = 0

    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price
    }

    // appData.screenPrice = appData.screens.reduce((sum, screen) => {
    //   return sum += +screen.price
    // }, 0)

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key]
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
    }

    appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber
    appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100))
  },
  logger: function () {
    console.log(appData.fullPrice);
    console.log(appData.servicePercentPrice);
    console.log(appData.screens);
    console.log(appData.services);
  }
}

appData.init()
