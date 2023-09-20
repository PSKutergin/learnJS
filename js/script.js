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

const cmsOpen = document.getElementById('cms-open')
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants')
const cmsSelect = document.getElementById('cms-select')
const cmsOtherInput = document.getElementById('cms-other-input')

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
    this.addTitle()

    startBtn.addEventListener('click', this.start.bind(this));
    resetBtn.addEventListener('click', this.reset.bind(this));

    buttonPlus.addEventListener('click', this.addScreenBlock);

    inputRange.addEventListener('input', () => {
      inputRangeValue.textContent = inputRange.value + '%'
      this.rollback = inputRange.value
    });

    cmsOpen.addEventListener('change', () => {
      if (cmsOpen.checked) {
        hiddenCmsVariants.style.display = 'flex'
      } else {
        hiddenCmsVariants.style.display = 'none'
      }
    });

    cmsSelect.addEventListener('change', (e) => {
      if (e.target.value === 'other') {
        hiddenCmsVariants.querySelector('.main-controls__input').style.display = 'block'
      } else {
        hiddenCmsVariants.querySelector('.main-controls__input').style.display = 'none'
      }
    });
  },
  addTitle: function () {
    document.title = title.textContent
  },
  addScreens: function () {
    screens = document.querySelectorAll('.screen')
    this.screens.length = 0
    this.count = 0
    this.isError = false

    screens.forEach((screen, index) => {
      const select = screen.querySelector('select')
      const input = screen.querySelector('input')
      const selectName = select.options[select.selectedIndex].textContent

      if (select.selectedIndex === 0 || input.value.trim() === '' || input.value.trim() === 0) {
        this.isError = true
      } else {
        this.screens.push({
          id: index,
          name: selectName,
          price: +select.value * +input.value
        });
      }
      this.count = +input.value + this.count
    })
  },
  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value
      };
    })

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type=checkbox]')
      const label = item.querySelector('label')
      const input = item.querySelector('input[type=text]')

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value
      };
    })
  },
  addScreenBlock: function () {
    screens = document.querySelectorAll('.screen')
    const cloneScreen = screens[0].cloneNode(true)

    screens[screens.length - 1].after(cloneScreen)
  },
  addPrice: function () {
    this.screenPrice = 0
    this.fullPrice = 0
    this.servicePercentPrice = 0
    this.servicePricesNumber = 0
    this.servicePricesPercent = 0

    for (let screen of this.screens) {
      this.screenPrice += +screen.price
    }

    // this.screenPrice = this.screens.reduce((sum, screen) => {
    //   return sum += +screen.price
    // }, 0)

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key]
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
    }

    this.fullPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber

    if (cmsOpen.checked) {
      if (cmsSelect.options[cmsSelect.selectedIndex].value == 50) {
        this.fullPrice = 0.5 * this.fullPrice + this.fullPrice
      } else if (cmsSelect.options[cmsSelect.selectedIndex].value === 'other') {
        this.fullPrice = +cmsOtherInput.value / 100 * this.fullPrice + this.fullPrice
      }
    }

    this.servicePercentPrice = Math.ceil(this.fullPrice - this.fullPrice * (this.rollback / 100))
  },
  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrice();
    this.showResult();
    // this.logger();
  },
  showResult: function () {
    if (!this.isError) {
      total.value = this.screenPrice
      totalCount.value = this.count
      totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
      fullTotalCount.value = this.fullPrice
      totalCountRollback.value = this.servicePercentPrice

      document.querySelectorAll('.main-controls__item [type="text"]').forEach(elem => elem.disabled = true)
      document.querySelectorAll('.main-controls__item select').forEach(elem => elem.disabled = true)
      startBtn.style.display = 'none'
      resetBtn.style.display = 'block'
    }
  },
  reset: function () {
    document.querySelectorAll('.other-items [type="checkbox"]').forEach(elem => elem.checked = false);
    document.querySelectorAll('.main-controls__item [type="text"]').forEach(elem => elem.disabled = false);
    document.querySelectorAll('.main-controls__item select').forEach(elem => elem.disabled = false);
    document.querySelectorAll('.total-input').forEach(elem => elem.value = 0);

    document.querySelectorAll('.screen').forEach((elem, index) => {
      if (index !== 0) {
        elem.remove()
      } else {
        elem.querySelector('select').selectedIndex = 0
        elem.querySelector('input').value = ''
      }
    });

    cmsSelect.selectedIndex = 0;
    hiddenCmsVariants.style.display = 'none'
    cmsOpen.checked = false

    inputRangeValue.textContent = 0 + '%'
    inputRange.value = 0

    startBtn.style.display = 'block';
    resetBtn.style.display = 'none';

  },
  logger: function () {
    console.log(this.fullPrice);
    console.log(this.servicePercentPrice);
    console.log(this.screens);
    console.log(this.services);
  }
}

appData.init()
