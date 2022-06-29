export const Contact = () => {
    
    <div className="container-fluid py-5" id="contact">
    <div className="container">
      <div className="position-relative d-flex align-items-center justify-content-center">
        <h1 className="display-1 text-uppercase text-white" style={{WebkitTextStroke: '1px #dee2e6'}}>Contact</h1>
        <h1 className="position-absolute text-uppercase text-primary">Contact Me</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="contact-form text-center">
            <div id="success" />
            <form name="sentMessage" id="contactForm" noValidate="novalidate">
              <div className="form-row">
                <div className="control-group col-sm-6">
                  <input type="text" className="form-control p-4" id="name" placeholder="Your Name" required="required" data-validation-required-message="Please enter your name" />
                  <p className="help-block text-danger" />
                </div>
                <div className="control-group col-sm-6">
                  <input type="email" className="form-control p-4" id="email" placeholder="Your Email" required="required" data-validation-required-message="Please enter your email" />
                  <p className="help-block text-danger" />
                </div>
              </div>
              <div className="control-group">
                <input type="text" className="form-control p-4" id="subject" placeholder="Subject" required="required" data-validation-required-message="Please enter a subject" />
                <p className="help-block text-danger" />
              </div>
              <div className="control-group">
                <textarea className="form-control py-3 px-4" rows={5} id="message" placeholder="Message" required="required" data-validation-required-message="Please enter your message" defaultValue={""} />
                <p className="help-block text-danger" />
              </div>
              <div>
                <button className="btn btn-outline-primary" type="submit" id="sendMessageButton">Send
                  Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
} 