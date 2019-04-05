var React = require('react');
var Share = require('react-share');

var FacebookShareButton = Share.FacebookShareButton;
var TwitterShareButton = Share.TwitterShareButton;
var GooglePlusShareButton = Share.GooglePlusShareButton;
var WhatsappShareButton = Share.WhatsappShareButton;
var TelegramShareButton = Share.TelegramShareButton;
var LinkedinShareButton = Share.LinkedinShareButton;

var FacebookIcon = Share.FacebookIcon;
var TwitterIcon = Share.TwitterIcon;
var GooglePlusIcon = Share.GooglePlusIcon;
var WhatsappIcon = Share.WhatsappIcon;
var TelegramIcon = Share.TelegramIcon;
var LinkedinIcon = Share.LinkedinIcon;

require('./styles.less');



function ShareButtons (props) {

    var seoFullUrl = window.location.href;

    return(
        <section id='share-buttons'>
            <FacebookShareButton url={seoFullUrl} quote={props.quote} className="share-facebook">
                <FacebookIcon size={30} round />
            </FacebookShareButton>
            <TwitterShareButton url={seoFullUrl} quote={props.quote} className="share-twitter">
                <TwitterIcon size={30} round />
            </TwitterShareButton>
            <TelegramShareButton url={seoFullUrl} quote={props.quote} className="share-whatsapp">
                <TelegramIcon size={30} round />
            </TelegramShareButton>
            <WhatsappShareButton url={seoFullUrl} quote={props.quote} className="share-whatsapp">
                <WhatsappIcon size={30} round />
            </WhatsappShareButton>
            <LinkedinShareButton url={seoFullUrl} quote={props.quote} className="share-whatsapp">
                <LinkedinIcon size={30} round />
            </LinkedinShareButton>
        </section>
    )
}

module.exports = ShareButtons;
