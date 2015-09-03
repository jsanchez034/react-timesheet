export default {
  grandTotalOwed(lineItems) {
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
  },

  totalHours(start, end) {
    let toMinutes = function(s) {
      let part = s && s.match(/(\d+):(\d+)(?: )?(am|pm)?/i);

      if (!part || part.length !== 4) {
        return NaN;
      }

      let hh = parseInt(part[1], 10);
      let mm = parseInt(part[2], 10);
      let ap = part[3] ? part[3].toUpperCase() : null;

      if (ap === "AM") {
          if (hh == 12) {
              hh = 0;
          }
      }
      if (ap === "PM") {
          if (hh != 12) {
              hh += 12;
          }
      }
      return (hh * 60) + mm;
    };

    let totalMinutes = toMinutes(end) - toMinutes(start);

    return !isNaN(totalMinutes) && totalMinutes > 0 ? Math.round((totalMinutes / 60) * 100) / 100 : 0;

  },

  lineTotalOwed(hours, rate) {
    return Math.round(((hours || 0) * (rate || 0) * 100)) / 100;
  }
}
