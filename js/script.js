'use strict'

function main() {
  const appData = {
    title: '',
    screens: '',
    screenPrice: 0,
    rollback: 20,
    adaptive: true,
    service1: '',
    service2: '',
    servicePrice: 0,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    rollbackMessage: '',
    isNumber: function (num) {
      return !isNaN(parseFloat(num)) && isFinite(num) && num.match(/^\d+$/)
    },
    asking: function () {
      appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
      appData.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
  
      do {
        appData.screenPrice = prompt('Сколько будет стоить данная работа?')
      } while (!appData.isNumber(appData.screenPrice));
  
      if (typeof appData.screenPrice !== 'number') {
        appData.screenPrice = +appData.screenPrice
      };
  
      appData.adaptive = confirm('Нужен ли адаптив на сайте?');
    },
    getTitle: function () {
      appData.title = (appData.title.trim().charAt(0).toUpperCase() + appData.title.trim().slice(1).toLowerCase())
    },
    getAllServicePrices: function () {
      let sum = 0;
  
      for (let i = 0; i < 2; i++) {
        if (i === 0) {
          appData.service1 = prompt('Какой дополнительный тип услуги нужен?')
        } else if (i === 1) {
          appData.service2 = prompt('Какой дополнительный тип услуги нужен?')
        };
  
        do {
          appData.servicePrice = prompt('Сколько это будет стоить?')
        } while (!appData.isNumber(appData.servicePrice));
  
        if (typeof appData.servicePrice !== 'number') {
          appData.servicePrice = +appData.servicePrice
        };
  
        sum += appData.servicePrice;
      }
      appData.allServicePrices = sum;
    },
    getFullPrice: function() {
      appData.fullPrice = appData.screenPrice + appData.allServicePrices
    },
    getServicePercentPrices: function () {
      appData.servicePercentPrice = Math.ceil(appData.fullPrice - appData.fullPrice * (appData.rollback / 100))
    },
    getRollbackMessage: function() {
      if (appData.fullPrice >= 30000) {
        appData.rollbackMessage = 'Даем скидку в 10%'
      } else if (appData.fullPrice >= 15000) {
        appData.rollbackMessage = 'Даем скидку в 5%'
      } else if (appData.fullPrice >= 0) {
        appData.rollbackMessage = 'Скидка не предусмотрена'
      } else {
        appData.rollbackMessage = 'Что то пошло не так'
      }
    },
    logger: function (){
      for (let key in appData) {
        console.log(appData[key])
      }
    },
    start: function() {
      appData.asking();
      appData.getTitle();
      appData.getAllServicePrices();
      appData.getFullPrice();
      appData.getServicePercentPrices();
      appData.getRollbackMessage();
      appData.logger();
    },
  }

  appData.start()
}

main()
