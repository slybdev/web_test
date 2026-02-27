export const metadata = {
  title: 'Nature - Health Supplement Landing Page',
  description: 'Premium health supplements and nutrition products',
};

export default function HomePage() {
  return (
    <>
      {/* Pre-loader-start */}
      <div id="preloader">
        <div className="tg-cube-grid">
          <div className="tg-cube tg-cube1"></div>
          <div className="tg-cube tg-cube2"></div>
          <div className="tg-cube tg-cube3"></div>
          <div className="tg-cube tg-cube4"></div>
          <div className="tg-cube tg-cube5"></div>
          <div className="tg-cube tg-cube6"></div>
          <div className="tg-cube tg-cube7"></div>
          <div className="tg-cube tg-cube8"></div>
          <div className="tg-cube tg-cube9"></div>
        </div>
      </div>

      {/* Scroll-top */}
      <button className="scroll-top scroll-to-target" data-target="html">
        <i className="fas fa-angle-up"></i>
      </button>

      {/* header-area */}
      <header id="home">
        <div id="header-top-fixed"></div>
        <div id="sticky-header" className="menu-area">
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="mobile-nav-toggler"><i className="flaticon-layout"></i></div>
                <div className="menu-wrap">
                  <nav className="menu-nav">
                    <div className="logo">
                      <a href="/"><img src="/images/logo.png" alt="Logo" /></a>
                    </div>
                    <div className="navbar-wrap main-menu d-none d-xl-flex">
                      <ul className="navigation">
                        <li className="active menu-item-has-children"><a href="#home" className="section-link">Home</a>
                          <ul className="sub-menu">
                            <li className="active"><a href="/">Home One</a></li>
                            <li><a href="/">Home Two</a></li>
                            <li><a href="/">Home Three</a></li>
                          </ul>
                        </li>
                        <li><a href="#features" className="section-link">Features</a></li>
                        <li><a href="#paroller" className="section-link">Product</a></li>
                        <li><a href="#ingredient" className="section-link">Ingredient</a></li>
                        <li><a href="#pricing" className="section-link">Pricing</a></li>
                        <li className="menu-item-has-children"><a href="#">Shop</a>
                          <ul className="sub-menu">
                            <li><a href="/products">Our Shop</a></li>
                            <li><a href="/products">Shop Details</a></li>
                            <li><a href="/cart">Cart Page</a></li>
                          </ul>
                        </li>
                        <li className="menu-item-has-children"><a href="#news" className="section-link">News</a>
                          <ul className="sub-menu">
                            <li><a href="#">Our Blog</a></li>
                            <li><a href="#">Blog Details</a></li>
                          </ul>
                        </li>
                        <li><a href="#">contacts</a></li>
                      </ul>
                    </div>
                    <div className="header-action d-none d-sm-block">
                      <ul>
                        <li className="header-shop-cart">
                          <a href="/cart" className="cart-count"><i className="flaticon-shopping-cart"></i>
                            <span className="mini-cart-count">0</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu">
          <nav className="menu-box">
            <div className="close-btn"><i className="fas fa-times"></i></div>
            <div className="nav-logo">
              <a href="/"><img src="/images/logo.png" alt="" /></a>
            </div>
            <div className="menu-outer"></div>
            <div className="social-links">
              <ul className="clearfix">
                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                <li><a href="#"><i className="fab fa-youtube"></i></a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="menu-backdrop"></div>
      </header>

      {/* main-area */}
      <main className="main-area fix">
        {/* banner-area */}
        <section className="banner-area">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xxl-8 col-xl-7 col-lg-8 col-md-10">
                <div className="banner-content text-center">
                  <p className="banner-caption">.. Increased Energy With NATURE ..</p>
                  <h2 className="title">Mix Protein Provided Way To Growth</h2>
                  <a href="/products" className="btn btn-two">Shop Now</a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="banner-images text-center">
                  <img src="/images/banner_img01.png" alt="img" className="main-img" />
                  <img src="/images/banner_round_bg.png" alt="img" className="bg-shape" />
                </div>
              </div>
            </div>
          </div>
          <div className="banner-shape one">
            <img src="/images/banner_shape01.png" alt="shape" className="wow bannerFadeInLeft" data-wow-delay=".2s" data-wow-duration="2s" />
          </div>
          <div className="banner-shape two">
            <img src="/images/banner_shape02.png" alt="shape" className="wow bannerFadeInRight" data-wow-delay=".2s" data-wow-duration="2s" />
          </div>
          <div className="banner-shape three">
            <img src="/images/banner_shape03.png" alt="shape" className="wow bannerFadeInDown" data-wow-delay=".2s" data-wow-duration="2s" />
          </div>
          <div className="banner-shape four">
            <img src="/images/banner_shape04.png" alt="shape" className="wow bannerFadeInDown" data-wow-delay=".2s" data-wow-duration="2s" />
          </div>
        </section>

        {/* brand-area */}
        <div className="brand-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="brand-title text-center mb-50">
                  <p className="title">Perfect Brand is Featured on</p>
                </div>
              </div>
            </div>
            <div className="row brand-active">
              <div className="col-2">
                <div className="brand-item">
                  <a href="#"><img src="/images/brand_01.png" alt="brand" /></a>
                </div>
              </div>
              <div className="col-2">
                <div className="brand-item">
                  <a href="#"><img src="/images/brand_02.png" alt="brand" /></a>
                </div>
              </div>
              <div className="col-2">
                <div className="brand-item">
                  <a href="#"><img src="/images/brand_03.png" alt="brand" /></a>
                </div>
              </div>
              <div className="col-2">
                <div className="brand-item">
                  <a href="#"><img src="/images/brand_04.png" alt="brand" /></a>
                </div>
              </div>
              <div className="col-2">
                <div className="brand-item">
                  <a href="#"><img src="/images/brand_05.png" alt="brand" /></a>
                </div>
              </div>
              <div className="col-2">
                <div className="brand-item">
                  <a href="#"><img src="/images/brand_06.png" alt="brand" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
