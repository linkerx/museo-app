var React = require('react');
var WpCalendar = require('wp/calendar');
var WpCalendarDay = require('wp/calendar-day');
import moment from 'moment';
require('./styles.less');

var today = {
  year: moment().format('YYYY'),
  month: moment().format('MMMM').charAt(0).toUpperCase() + moment().format('MMMM').slice(1),
  day: moment().format('dddd').charAt(0).toUpperCase() + moment().format('dddd').slice(1),
  number: moment().format('DD'),
}

class Calendario extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }

   render(){
   const calendars = [
        {
            nombre: "Efemérides",
            apiKey: "AIzaSyCNWbiphmOQ0cYa7AV4PneCGwaezMLQt0M",
            calId: "linkerx.com.ar_mshat57sculhtpe3hbe0tleco4@group.calendar.google.com",
            clase: "calefe"
        },
        {
            nombre: "Museo Emma",
            apiKey: "AIzaSyCNWbiphmOQ0cYa7AV4PneCGwaezMLQt0M",
            calId: "museoema@gmail.com",
            clase: "calema"
        },
    ]

    return (
      <section id='home-calendario' className='parallax-group'>
        <div className='day-container'>
          <div className='year'>{today.year}</div>
          <div className='month'>{today.month}</div>
          <div className='day'>{today.day}</div>
          <div className='number'>{today.number}</div>
        </div>
        <div className='day-efemerides'>
          <h1>Un día como hoy...</h1>
          <WpCalendarDay sources={calendars} />
        </div>
        <div className='calendar-container'>
          <WpCalendar selectable sources={calendars} debug={false}/>
        </div>
      </section>
    )
  }
}

module.exports = Calendario;

//TODO: styles para nuev forma o adaptar actuales (sería mejor aprobechar para rediseñar)


/*
    var React = require('react');
    var axios = require('axios');
    var WpApi = require('wp/api');
    var WpItemTitle = require('wp/item-title');
    var WpItemImage = require('wp/item-image');
    var renderHTML = require('react-render-html');

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
          itemsToday: [],
          modalOpen: false,
          modalItem: null
        }

        this.getEvents = this.getEvents.bind(this);
        this.addEvents = this.fetchEvents.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.onSelectEvent = this.onSelectEvent.bind(this);
        this.onSelectSlot = this.onSelectSlot.bind(this);
      }

      componentDidMount(){
          var minDate = new Date(this.state.date);
          var maxDate = minDate.setFullYear(minDate.getFullYear() + 1 );
          var max = moment(maxDate).format('YYYY-MM[-01T00:00:00Z]');
          this.getEvents(this.state.date,max);
      }

      onNavigate(date){
        var min = moment(date).format('YYYY-MM[-01T00:00:00Z]');
        var minDate = new Date(min);
        var maxDate = minDate.setFullYear(minDate.getFullYear() + 1 );
        var max = moment(maxDate).format('YYYY-MM[-01T00:00:00Z]');
        if(min < this.state.date)
          this.getEvents(this.props.sources,min,max);
      }

      getEvents(sources,min,max){

        const baseUrl = "https://www.googleapis.com/calendar/v3/calendars/";


        var debug = true;

        if(debug){
          console.log(url);
        }

        this.state = {
          date: this.state.date,
          items: [],
          itemsToday: []
        }

        sources.map((source) => {
            this.addEvents(baseUrl+source.calId+'/events?key='+source.apiKey+'&timeMin='+min+'&timeMax='+max+'&showDeleted=false&singleEvents=true',min,max);
        }.bind(this));

      }

        addEvents(url,min,evClass){

        var debug = false;

        axios.get(url)
          .then(function(response) {
              this.setState(function(){
                const events = [];
                var itemsToday = [];
                if(response.data.items){

                    if(debug){
                      console.log(response.data.items);
                    }

                    events = response.data.items.map((event) => {
                        return {
                            start: event.start.date || event.start.dateTime,
                            end: event.end.date || event.end.dateTime,
                            title: event.summary,
                            desc: event.description,
                        }
                    }.bind(this));
                }
                return {
                  mes: min,
                  items: this.state.items.concat(finalItems),
                  itemsToday: this.state.itemsToday.concat(itemsToday)
                }
              }.bind(this));
        }.bind(this));

      }

      onSelectEvent(event){

        if(event.desc){
          var opts = {
            type: 'post',
            id: event.desc,
            queries: ['_embed'],
            debug: true
          }

          WpApi.getItem(opts)
            .then(function(item){
              console.log(item);
              this.setState(function(){
                return {
                  modalOpen: true,
                  modalItem: {
                      event: event,
                      post: item
                    }
                }
              }.bind(this));
            }.bind(this));
        } else {
          this.setState(function(){
            return {
              modalOpen: true,
              modalItem: {
                  event: event,
                  post: null
                }
            }
          })
        }
      }

      onSelectSlot(slotInfo){
      }

      closeModal(){
        this.setState(function(){
          return {
            modalOpen: false,
            modalItem: null
          }
        })
      }

      render() {

        //console.log(this.state);

        var modalStyle = 'closed';
        if(this.state.modalOpen){
            modalStyle = 'opened';
        }

        if(this.state.modalItem){
          if(this.state.modalItem.post){
            if(this.state.modalItem.post._embedded['wp:featuredmedia']){
              var post_image = this.state.modalItem.post._embedded['wp:featuredmedia'][0].media_details.sizes['thumbnail'].source_url;
            }
          }
        }

        var espMessages = {
          date: 'Fecha',
          time: 'Hora',
          allDay: 'Todo el Día',
          previous: 'Anterior',
          next: 'Próximo',
          today: 'Hoy',
          month: 'Mes',
          week: 'Semana',
          day: 'Día',
          agenda: 'Agenda',
        }

        return (
          <section id='home-calendario' className='parallax-group'>
            <div className='calendario-wrapper'>
              <div className='calendar-container'>
                <WpCalendar
                  selectable
                  events={this.state.items}
                  defaultView='month'
                  onSelectEvent={
                    function(event){
                      this.onSelectEvent(event);
                    }.bind(this)
                  }
                  onSelectSlot={
                    function(slotInfo){
                      this.onSelectSlot(slotInfo);
                    }.bind(this)
                  }
                  eventPropGetter={
                    function(event){
                      return {
                        className: event.evClass
                      }
                    }
                  }
                />
              </div>
              <div className={'modal-back '+modalStyle}></div>
              <div className={'calendar-modal '+modalStyle} >
                <button className='close-btn' onClick={function(){this.closeModal()}.bind(this)}>
                  <FontAwesome name='close' />
                </button>
                {this.state.modalItem &&
                    <div className='modal-content'>
                    {this.state.modalItem.post
                      ?
                      <div className='post_content'>
                        <WpItemTitle linkTo='#' title={this.state.modalItem.post.title.rendered} heading='2' />
                        {post_image && <WpItemImage src={post_image} render='img'/>}
                        <div className='excerpt'>{renderHTML(this.state.modalItem.post.excerpt.rendered)}</div>
                        <div className='content'>{renderHTML(this.state.modalItem.post.content.rendered)}</div>
                      </div>
                      :
                      <div className='no-item'>
                        <h3>{this.state.modalItem.event.title}</h3>
                        <span>Sin Descripcion</span>
                      </div>
                    }
                    </div>
                }
              </div>
            </div>
          </section>
        )
      }
    }

    module.exports = Calendario;

    // mock sources
    const sources = [
        {
            apiKey
        }
    ]

    var apiKey = 'AIzaSyCNWbiphmOQ0cYa7AV4PneCGwaezMLQt0M';

    var calId = 'linkerx.com.ar_mshat57sculhtpe3hbe0tleco4@group.calendar.google.com';
    var calId2 = 'museoema@gmail.com';

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
                  return (<li key={index} onClick={function(){this.onSelectEvent(item)}.bind(this)} >{item.title}</li>)
                }.bind(this))}
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
              onSelectEvent={
                function(event){
                  this.onSelectEvent(event);
                }.bind(this)
              }
              onSelectSlot={
                function(slotInfo){
                  this.onSelectSlot(slotInfo);
                }.bind(this)
              }
              eventPropGetter={
                function(event){
                  return {
                    className: event.evClass
                  }
                }
              }
            />
          </div>
          <div className={'modal-back '+modalStyle}></div>
          <div className={'calendar-modal '+modalStyle} >
            <button className='close-btn' onClick={function(){this.closeModal()}.bind(this)}>
              <FontAwesome name='close' />
            </button>
            {this.state.modalItem &&
                <div className='modal-content'>
                {this.state.modalItem.post
                  ?
                  <div className='post_content'>
                    <WpItemTitle linkTo='#' title={this.state.modalItem.post.title.rendered} heading='2' />
                    {post_image && <WpItemImage src={post_image} render='img'/>}
                    <div className='excerpt'>{renderHTML(this.state.modalItem.post.excerpt.rendered)}</div>
                    <div className='content'>{renderHTML(this.state.modalItem.post.content.rendered)}</div>
                  </div>
                  :
                  <div className='no-item'>
                    <h3>{this.state.modalItem.event.title}</h3>
                    <span>Sin Descripcion</span>
                  </div>
                }
                </div>
            }
          </div>
        </div>
      </section>
    )
  }
}

module.exports = Calendario;
*/
// mock events
