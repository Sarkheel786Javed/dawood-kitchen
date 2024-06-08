import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <footer>
  <div className="container">
    <div className="row">
      <div className="col-lg-3 col-md-3 col-sm-6 col-6">
        <div className="footer-content">
          <h2>SMART CHARITABLES</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime adipisci veniam
             voluptatum voluptatem sed ex error beatae, asperiores dignissimos?</p>
          <ul>
            <li><i className="flaticon-facebook" /></li>
            <li><i className="flaticon-twitter" /></li>
            <li><i className="flaticon-behance" /></li>
            <li><i className="flaticon-instagram" /></li>
          </ul>
        </div>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-6">
        <div className="footer-content">
          <h2>Quick Links</h2>
          <ol>
            <li><Link to="#"><i className="flaticon-double-right-arrows-angles" />Home</Link></li>
            <li><Link to="#"><i className="flaticon-double-right-arrows-angles" />About Us</Link></li>
            <li><Link to="#"><i className="flaticon-double-right-arrows-angles" />Services</Link></li>
            <li><Link to="#"><i className="flaticon-double-right-arrows-angles" />Blog</Link></li>
            <li><Link to="#"><i className="flaticon-double-right-arrows-angles" />Contact Us</Link></li>
          </ol>
        </div>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-6">
        <div className="footer-content">
          <h2>Services</h2>
          <ol>
            <li><Link to="#"><i className="flaticon-double-right-arrows-angles" />Home</Link></li>
            <li><Link to="#"><i className="flaticon-double-right-arrows-angles" />About Us</Link></li>
            <li><Link to="#"><i className="flaticon-double-right-arrows-angles" />Services</Link></li>
            <li><Link to="#"><i className="flaticon-double-right-arrows-angles" />Blog</Link></li>
            <li><Link to="#"><i className="flaticon-double-right-arrows-angles" />Contact Us</Link></li>
          </ol>
        </div>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-6 col-6">
        <div className="footer-content">
          <h2>News Letters</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <div className="form-group">
            <input className="form-control" role name="email" type="email" placeholder="Enter Your Email" />
            <i className="flaticon-send" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="copy-right">
    <div className="container">
      <div className="copy-right-card">
        <p>2020 @ All Rights Reserved Designed and developed by<a href="https://www.smarteyeapps.com">SmarteyeTechnologies</a></p>
      </div>
    </div>
  </div>
</footer>

        </div>
    );
}

export default Footer;
