'use strict'

function main() {
  const appData = {
    title: '',
    screens: [],
    screenPrice: 0,
    rollback: 10,
    adaptive: true,
    services: {},
    servicePrice: 0,
    allServicePrices: 0,
    fullPrice: 0,
    servicePercentPrice: 0,
    rollbackMessage: '',
    isNumber: function (num) {
      return !isNaN(parseFloat(num)) && isFinite(num) && num.match(/^\d+$/)
    },
    isString: function (str) {
      return (/[^a-z0-9]/).test(str)
    },
    asking: function () {
      do {
        appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки');
      } while (!appData.isString(appData.title));
  
      for (let i = 0; i < 2; i++) {
        let name
        let price = 0

        do {
          name = prompt('Какие типы экранов нужно разработать?')
        } while (!appData.isString(name));
  
        do {
          price = prompt('Сколько будет стоить данная работа?')
        } while (!appData.isNumber(price));

        appData.screens.push({id: i, name: name, price: price})
      }

      for (let i = 0; i < 2; i++) {
        let name
        let price = 0

        do {
          name = prompt('Какой дополнительный тип услуги нужен?')
        } while (!appData.isString(name));
  
        do {
          price = prompt('Сколько это будет стоить?')
        } while (!appData.isNumber(price));
        
        if(Object.keys(appData.services).includes(name)){
          appData.services[name + i] = +price;
          } else {
            appData.services[name] = +price;
          }
      }
  
      appData.adaptive = confirm('Нужен ли адаптив на сайте?');

    },
    addPrice: function () {
      // for (let screen of appData.screens) {
      //   appData.screenPrice += +screen.price
      // }

      appData.screenPrice = appData.screens.reduce((sum, screen) => {
        return sum += +screen.price
      }, 0)

      for (let key in appData.services) {
        appData.allServicePrices += appData.services[key]
      }
    },
    getTitle: function () {
      appData.title = (appData.title.trim().charAt(0).toUpperCase() + appData.title.trim().slice(1).toLowerCase())
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
      console.log(appData.fullPrice);
      console.log(appData.servicePercentPrice);
      console.log(appData.screens);
      console.log(appData.services);
    },
    start: function() {
      appData.asking();
      appData.getTitle();
      appData.addPrice();
      appData.getFullPrice();
      appData.getServicePercentPrices();
      appData.getRollbackMessage();
      appData.logger();
    },
  }

  appData.start()
}

main()
