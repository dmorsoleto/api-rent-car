const moment = require('moment');
const utils = require('../build/utils/index')

test('Dias entre duas datas', () => {
    const now = moment().unix()
    const sevenDaysLater = moment().add(7, 'day').unix()
    const result = utils.calculateDaysBetweenDates(now, sevenDaysLater);
    expect(result).toEqual(7);
})

test('Validar data inícial maior que a final', () => {
    const now = moment().valueOf()
    const oneMonthLater = moment().add(1, 'month').valueOf()

    const result = utils.checkDatesStartEnds(now, oneMonthLater);
    expect(result).toBeTruthy();
})

test('Validar erro data final maior que a inicial', () => {
    const now = moment().valueOf()
    const oneMonthLater = moment().add(1, 'month').valueOf()

    const result = utils.checkDatesStartEnds(oneMonthLater, now);
    expect(result).toBeFalsy();
})