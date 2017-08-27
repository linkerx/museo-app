var React = require('react');
require('./styles.less');

function Footer(props) {
  return (
    <div className='footer_wrapper'>
      {props.location.pathname !== "/" &&
        <footer>
        Info!
        </footer>
      }
    </div>
  )
}

module.exports = Footer;
