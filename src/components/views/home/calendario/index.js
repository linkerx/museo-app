var React = require('react');
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

require('react-big-calendar/lib/css/react-big-calendar.css');
require('./styles.less');

moment.locale('es');

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

const CALENDAR_ID = 'prensalegisrn@gmail.com'
const API_KEY = 'AIzaSyC4phiAKuWFL-aWUup8cTZfHKTDtlVF0a8'

var views = ['mes', 'semana', 'dia', 'agenda'];

var today = {
  year: moment().format('YYYY'),
  month: moment().format('MMMM').charAt(0).toUpperCase() + moment().format('MMMM').slice(1),
  day: moment().format('dddd').charAt(0).toUpperCase() + moment().format('dddd').slice(1),
  number: moment().format('DD'),
}

class Calendario extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      date: moment().format('YYYY-MM[-01T00:00:00Z]'),
      items: []
    }

    this.getEvents = this.getEvents.bind(this);
    this.onNavigate = this.onNavigate.bind(this);
  }

  componentDidMount(){
      this.getEvents(this.state.date);
  }

  onNavigate(date){
    var mes = moment(date).format('YYYY-MM[-01T00:00:00Z]');
    if(mes < this.state.date)
      this.getEvents(mes);
  }

  getEvents(mes){
    var calId = 'prensalegisrn@gmail.com'

    var apiKey = 'AIzaSyC4phiAKuWFL-aWUup8cTZfHKTDtlVF0a8'
    var url = 'https://www.googleapis.com/calendar/v3/calendars/'+calId+'/events?key='+apiKey+'&timeMin='+mes;

    this.state = {
      date: this.state.date,
      items: []
    }

    axios.get(url)
      .then(function(response) {
          this.setState(function(){
            console.log(response.data.items);

            var finalItems = [];
            if(response.data.items){
              var finalItems = response.data.items.map(function(item,index){
                  return {
                    title: item.summary,
                    start: new Date(item.start.dateTime),
                    end: new Date(item.end.dateTime)
                  }
              })
            }
            return {
              mes: mes,
              items: finalItems
            }
          })
    }.bind(this));

  }

  render() {
    return (
      <section id='home-calendario' className='parallax-group'>
        <div className='calendario-wrapper'>
          <div className='day-container'>
            <div className='year'>{today.year}</div>
            <div className='month'>{today.month}</div>
            <div className='day'>{today.day}</div>
            <div className='number'>{today.number}</div>
          </div>
          <div className='day-efemerides'>
            <h1>Un día como hoy...</h1>
          </div>
          <div className='calendar-container'>
            <h1>Agenda del museo</h1>
            <BigCalendar
                selectable
                events={[]}
                defaultView='month'
                culture='es'
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={(slotInfo) => alert(
                  `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                  `\nend: ${slotInfo.end.toLocaleString()}`
                )}
            />
          </div>
        </div>
      </section>
    )
  }
}

module.exports = Calendario;

// mock events
