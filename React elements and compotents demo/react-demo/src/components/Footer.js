export const Footer = () => {
    return (
        <div className="container-fluid bg-primary text-white mt-5 py-5 px-sm-3 px-md-5">
          <div className="container text-center py-5">
            <div className="d-flex justify-content-center mb-4">
              <a className="btn btn-light btn-social mr-2" href="#"><i className="fab fa-twitter" /></a>
              <a className="btn btn-light btn-social mr-2" href="#"><i className="fab fa-facebook-f" /></a>
              <a className="btn btn-light btn-social mr-2" href="#"><i className="fab fa-linkedin-in" /></a>
              <a className="btn btn-light btn-social" href="#"><i className="fab fa-instagram" /></a>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <a className="text-white" href="#">Privacy</a>
              <span className="px-3">|</span>
              <a className="text-white" href="#">Terms</a>
              <span className="px-3">|</span>
              <a className="text-white" href="#">FAQs</a>
              <span className="px-3">|</span>
              <a className="text-white" href="#">Help</a>
            </div>
            <p className="m-0">© <a className="text-white font-weight-bold" href="#">Domain Name</a>. All Rights Reserved. Designed by <a className="text-white font-weight-bold" href="https://htmlcodex.com">HTML Codex</a>
            </p>
          </div>
        </div>
    )
}