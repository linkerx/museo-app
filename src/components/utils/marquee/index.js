var React = require('react');
require('./styles.less');

class Marquee {
  constructor(props) {
    super(props);
    this.state = {
      current: 0;
      items: [
        'Investigación historica',
        'Visitas Guiadas'
      ]
    }

    this.start = this.start.bind(this);
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.lastItem = this.lastItem.bind(this);
    this.nextItem = this.nextItem.bind(this);
    this.backItem = this.backItem.bind(this);    
  }

  start(){
    this.show(0);
    timer: setTimeout(function(){this.next()}.bind(this),10000);
  }

  next(){
    var item = this.nextItem();
    this.show(item);
    timer: setTimeout(function(){this.next()}.bind(this),10000);
  }

  back(){
    var item = this.backItem();
    this.show(item);
    timer: setTimeout(function(){this.next()}.bind(this),10000);
  }

  lastItem(){
    return (count(this.state.items)-1);
  }

  nextItem(){
    if(this.state.current.page == this.lastItem()) {
      return 1;
    } else {
      return this.state.current.page + 1;
    }
  }

  backItem(){
    if(this.state.current == 0) {
      return this.lastItem();
    } else {
      return this.state.current - 1;
    }
  }


  render(){

  }
}
