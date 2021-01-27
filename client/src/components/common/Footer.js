import React from 'react';
import './style.scss';

const copyrightYear = () => {
   let date = new Date(), year = date.getFullYear();
   return year;
}

const Footer = () => {
  return(
    <div className="footer col-lg-12 col-md-12 col-sm-12 col-xs-12">
       <p>&copy;&nbsp;MedCheck {copyrightYear()}.</p>
    </div>
  );
}

export default Footer;