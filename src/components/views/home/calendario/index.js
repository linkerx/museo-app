var React = require('react');
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

require('react-big-calendar/lib/css/react-big-calendar.css');
require('./styles.less');

moment.locale('es');

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);


var events = [
  {
    'title': 'Evento de todo el día',
    'allDay': true,
    'start': new Date(2017, 7, 17),
    'end': new Date(2017, 7, 17)
  },
  {
    'title': 'Evento Largo',
    'start': new Date(2017, 7, 20, 8, 15),
    'end': new Date(2015, 7, 20, 9, 30)
  }
];

var today = {
  year: '2017',
  month: 'Julio',
  day: 'Lunes',
  number: 17,
  event: 'texto de prueba de un evento o fraase del día'
}

function Calendario() {
  return (
    <section id='home-calendario' className='parallax-group'>
      <div className='day-container'>
        <div className='year'>{today.year}</div>
        <div className='month'>{today.month}</div>
        <div className='day'>{today.day}</div>
        <div className='number'>{today.number}</div>
        <div className='event'>{today.event}</div>
      </div>

    <div className='calendar-container'>
      <BigCalendar
          selectable
          events={events}
          defaultView='month'
          culture='es'
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={(slotInfo) => alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}`
          )}
      />
    </div>

    </section>
  )
}

module.exports = Calendario;

// mock events
