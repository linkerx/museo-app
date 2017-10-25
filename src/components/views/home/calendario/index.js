var React = require('react');
var axios = require('axios');
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

require('react-big-calendar/lib/css/react-big-calendar.css');
require('./styles.less');

moment.locale('es');

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(moment)
);

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
      items: [],
      itemsToday: []
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
    var calId = 'linkerx.com.ar_mshat57sculhtpe3hbe0tleco4@group.calendar.google.com'
    var apiKey = 'AIzaSyCNWbiphmOQ0cYa7AV4PneCGwaezMLQt0M'
    var url = 'https://www.googleapis.com/calendar/v3/calendars/'+calId+'/events?key='+apiKey+'&timeMin='+mes+'&showDeleted=false&singleEvents=true';

    this.state = {
      date: this.state.date,
      items: [],
      itemsToday: []
    }

    axios.get(url)
      .then(function(response) {
          this.setState(function(){
            var finalItems = [];
            var itemsToday = [];
            if(response.data.items){

                console.log(response.data.items);

                var finalItems = response.data.items.map(function(item,index){

                if(!item.start){
                  console.log(item);
                }


                if(start){
                  var start = new Date(item.start.dateTime)
                } else {
                  var start = new Date(item.start.date)
                }

                if(end){
                  var end = new Date(item.end.dateTime)
                } else {
                  var end = new Date(item.end.date)
                }

                start.setHours(start.getHours() + 3 );

                var today = new Date(moment().format('YYYY-MM-DD[T00:00:00Z]'));
                today.setHours(today.getHours() + 3 );

                var resp =  {
                  title: item.summary,
                  start: start,
                  end: end,
                  allDay: true
                }

                if(start.getTime() === today.getTime()){
                  console.log('yes');
                  itemsToday.push(resp);
                }

                return resp;

              }.bind(this))


            }
            return {
              mes: mes,
              items: finalItems,
              itemsToday: itemsToday
            }
          }.bind(this));
    }.bind(this));

  }

  render() {
    console.log(this.state.itemsToday);
    return (
      <section id='home-calendario' className='parallax-group'>
        <div className='calendario-wrapper'>
          <h1>Agenda del museo / Efemérides</h1>
          <div className='day-container'>
            <div className='year'>{today.year}</div>
            <div className='month'>{today.month}</div>
            <div className='day'>{today.day}</div>
            <div className='number'>{today.number}</div>
          </div>
          <div className='day-efemerides'>
            <h1>Un día como hoy...</h1>
            {this.state.itemsToday
              ?
                <ul>
                {this.state.itemsToday.map(function(item,index){
                  return (<li key={index}>{item.title}</li>)
                })}
                </ul>
              :
              <div>No hay efemérides para hoy</div>

            }
          </div>
          <div className='calendar-container'>
            <BigCalendar
                selectable
                events={this.state.items}
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
