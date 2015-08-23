export default {
  totalOwed(lineItems) {
    let total = lineItems.reduce((reduction, lineItem) => {
          return reduction += (lineItem.get('TotalOwed') || 0);
        }, 0);

    return Math.round(total * 100) / 100;
  },

  hoursByHourlRate(lineItems) {
    return lineItems.groupBy((lineItem) => lineItem.get('HourlyRate'), this)
                    .map((lineItem, hourlyRate, iterable) => {
                      return lineItem.reduce((reduction, line) => {
                        return Math.round((reduction + (line.get('TotalHours') || 0)) * 100) / 100;
                      }, 0);
                    });
  }
}
