import React from "react";
import exampleProduct from "./api/data";

import "./App.scss";

function toImage(name: string): string {
  return "images/".concat(name.concat(".jpg"));
}

function toThumbnail(name: string): string {
  return "images/".concat(name.concat("-thumbnail.jpg"));
}

const CloseButton = () => {
  return (
    <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
        fill="#FFA500"
        fillRule="evenodd"
      />
    </svg>
  );
};

const NextIcon = () => {
  return (
    <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="m2 1 8 8-8 8"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
};

const PrevIcon = () => {
  return (
    <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 1 3 9l8 8"
        stroke="currentColor"
        strokeWidth="3"
        fill="none"
        fillRule="evenodd"
      />
    </svg>
  );
};

interface itemProps {
  name: string;
  quantity: number;
}

function App() {
  const [currentImage, setCurrentImage] = React.useState(
    exampleProduct.images[0]
  );

  const [currentPageImage, setCurrentPageImage] = React.useState(
    exampleProduct.images[0]
  );

  const [quantityCount, setQuantityCount] = React.useState(1);
  const [commandCount, setCommandCount] = React.useState(1);

  const [cartItems, setCartItems] = React.useState<itemProps>();

  const cartboxRef = React.useRef<HTMLDivElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const backdropRef = React.useRef<HTMLDivElement>(null);
  const imagesRef = React.useRef<HTMLDivElement>(null);

  function onClickThumbnail(value: string) {
    setCurrentImage(value);
  }

  function onClickPageThumbnail(value: string) {
    setCurrentPageImage(value);
  }

  function onClickCart(event: React.MouseEvent<HTMLImageElement>) {
    if (cartboxRef.current === null) return;

    let display = getComputedStyle(cartboxRef.current).display;

    if (display === "none") {
      cartboxRef.current.style.display = "flex";
    } else {
      cartboxRef.current.style.display = "none";
    }
  }

  function onClickIncrement() {
    setQuantityCount((state) => {
      return state + 1;
    });
  }

  function onClickDecrement() {
    if (quantityCount === 1) {
      return;
    }

    setQuantityCount((state) => {
      return state - 1;
    });
  }

  function onClickAdd() {
    let itemToAdd = { name: exampleProduct.name, quantity: quantityCount };
    setCartItems(itemToAdd);
    setCommandCount(quantityCount);
  }

  function onClickDeleteItem() {
    setCartItems(undefined);
  }

  function onClickPrev() {
    setCurrentImage((state) => {
      let currentIndex = exampleProduct.images.findIndex(
        (value) => value === currentImage
      );
      if (currentIndex === 0) {
        currentIndex = exampleProduct.images.length - 1;
      } else {
        currentIndex--;
      }

      return exampleProduct.images[currentIndex];
    });
  }

  function onClickNext() {
    setCurrentImage((state) => {
      let currentIndex = exampleProduct.images.findIndex(
        (value) => value === currentImage
      );
      if (currentIndex === exampleProduct.images.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }

      return exampleProduct.images[currentIndex];
    });
  }

  function onClickPagePrev() {
    setCurrentPageImage((state) => {
      let currentIndex = exampleProduct.images.findIndex(
        (value) => value === currentPageImage
      );
      if (currentIndex === 0) {
        currentIndex = exampleProduct.images.length - 1;
      } else {
        currentIndex--;
      }

      return exampleProduct.images[currentIndex];
    });
  }

  function onClickPageNext() {
    setCurrentPageImage((state) => {
      let currentIndex = exampleProduct.images.findIndex(
        (value) => value === currentPageImage
      );
      if (currentIndex === exampleProduct.images.length - 1) {
        currentIndex = 0;
      } else {
        currentIndex++;
      }

      return exampleProduct.images[currentIndex];
    });
  }

  function onClickMenu() {
    if (dropdownRef.current === null) return;
    if (backdropRef.current === null) return;

    let display = getComputedStyle(dropdownRef.current).display;

    if (display === "none") {
      dropdownRef.current.style.display = "flex";
      backdropRef.current.style.display = "block";
    } else {
      dropdownRef.current.style.display = "none";
      backdropRef.current.style.display = "none";
    }
  }

  function onClickPageClose() {
    if (imagesRef.current === null) return;
    if (backdropRef.current === null) return;

    imagesRef.current.style.display = "none";
    backdropRef.current.style.display = "none";
  }

  function onClickProdImage() {
    if (imagesRef.current === null) return;
    if (backdropRef.current === null) return;

    imagesRef.current.style.display = "flex";
    backdropRef.current.style.display = "block";
  }

  function onClickBackdrop() {
    if (imagesRef.current === null) return;
    if (backdropRef.current === null) return;
    if (dropdownRef.current === null) return;

    imagesRef.current.style.display = "none";
    backdropRef.current.style.display = "none";
    dropdownRef.current.style.display = "none";
  }

  return (
    <main>
      <div
        onClick={onClickBackdrop}
        className="page-opacity"
        ref={backdropRef}
      ></div>
      <div className="page-images" ref={imagesRef}>
        <div className="page-image-container">
          <img className="page-img" src={toImage(currentPageImage)} alt="" />
          <button onClick={onClickPageClose} className="page-button-close">
            <CloseButton />
          </button>
          <button onClick={onClickPagePrev} className="page-button-prev">
            <PrevIcon />
          </button>
          <button onClick={onClickPageNext} className="page-button-next">
            <NextIcon />
          </button>

          <div className="product-small-images">
            {exampleProduct.images.map((value, index) => {
              return (
                <div
                  key={index}
                  className={
                    "product-thumbnail " +
                    (value === currentPageImage && "thumbnail-selected")
                  }
                >
                  <img
                    key={index}
                    onClick={(event) => onClickPageThumbnail(value)}
                    className="thumbnail-image"
                    src={toThumbnail(value)}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="App">
        {/* Navbar */}
        <nav>
          <div className="nav-start">
            <img
              onClick={onClickMenu}
              className="nav-menu"
              src="images/icon-menu.svg"
              alt=""
            />
            <div className="nav-dropdown" ref={dropdownRef}>
              <div className="nav-close-container">
                <img
                  onClick={onClickMenu}
                  className="nav-button-close"
                  src="images/icon-close.svg"
                  alt=""
                />
              </div>

              <div className="nav-drop-item">Collections</div>
              <div className="nav-drop-item">Men</div>
              <div className="nav-drop-item">Women</div>
              <div className="nav-drop-item">About</div>
              <div className="nav-drop-item">Contact</div>
            </div>
            <a href="." aria-label="brand logo">
              <img className="nav-logo" src="images/logo.svg" alt="" />
            </a>
            <div className="nav-items">
              <span className="nav-item">Collections</span>
              <span className="nav-item">Men</span>
              <span className="nav-item">Women</span>
              <span className="nav-item">About</span>
              <span className="nav-item">Contact</span>
            </div>
          </div>
          <div className="nav-right">
            <div className="cart-container">
              <img
                onClick={onClickCart}
                className="nav-cart"
                src="images/icon-cart.svg"
                alt=""
              />
              {cartItems && <div className="cart-count">{commandCount}</div>}
            </div>
            <div className="cart-box" ref={cartboxRef}>
              <div className="cart-header">Cart</div>
              <div>
                <hr />
              </div>
              {cartItems ? (
                <div className="cart-product">
                  <div className="cart-product-detail">
                    <div className="cart-container-image">
                      <img
                        className="cart-product-image"
                        src={toThumbnail(exampleProduct.images[0])}
                        alt=""
                      />
                    </div>

                    <div className="cart-item-info">
                      <div className="cart-item-name">{cartItems.name}</div>
                      <div className="cart-full-price">
                        <span className="cart-first-price">
                          $125.00 x {commandCount}
                        </span>
                        <span className="cart-final-price">
                          ${((12500 * commandCount) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="cart-delete">
                      <img
                        className="pointer-cursor"
                        onClick={onClickDeleteItem}
                        src="images/icon-delete.svg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="cart-button-container">
                    <button className="cart-checkout-button">Checkout</button>
                  </div>
                </div>
              ) : (
                <div className="cart-body">Your cart is empty.</div>
              )}
            </div>

            <div className="avatar-container">
              <img
                className="nav-avatar"
                src="images/image-avatar.png"
                alt=""
              />
            </div>
          </div>
        </nav>

        <div className="main-product">
          <div className="main-card">
            <div className="main-margin-left"></div>
            <div className="product-display">
              <div className="product-image-container">
                <img
                  onClick={onClickProdImage}
                  className="product-img"
                  src={toImage(currentImage)}
                  alt=""
                />
                <button onClick={onClickPrev} className="prod-button-prev">
                  <img className="" src="images/icon-previous.svg" alt="" />
                </button>
                <button onClick={onClickNext} className="prod-button-next">
                  <img className="" src="images/icon-next.svg" alt="" />
                </button>

                <div className="product-small-images">
                  {exampleProduct.images.map((value, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          "product-thumbnail " +
                          (value === currentImage && "thumbnail-selected")
                        }
                      >
                        <img
                          className="thumbnail-image"
                          onClick={(event) => onClickThumbnail(value)}
                          src={toThumbnail(value)}
                          alt=""
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="product-description">
              <h1 className="h1-title">Sneaker Company</h1>
              <h2 className="h2-title">{exampleProduct.name}</h2>
              <p className="p-desc">
                These low-profile sneakers are your perfect casual wear
                companion. Featuring a durable rubber outer sole, they’ll
                withstand everything the weather can offer.
              </p>
              <div className="price-info">
                <div className="price-and-discount">
                  <span className="product-price">$125.00</span>
                  <div className="product-discount">50%</div>
                </div>
                <p className="product-oldprice">$250.00</p>
              </div>

              <div className="footer-desc">
                <div className="quantity-panel">
                  <img
                    onClick={onClickIncrement}
                    className="pointer-cursor"
                    src="images/icon-plus.svg"
                    alt=""
                  />
                  {quantityCount}
                  <img
                    onClick={onClickDecrement}
                    className="pointer-cursor"
                    src="images/icon-minus.svg"
                    alt=""
                  />
                </div>
                <button className="add-button" onClick={onClickAdd}>
                  <img
                    className="cart-icon"
                    src="images/icon-cart.svg"
                    alt=""
                  />
                  Add to cart
                </button>
              </div>
            </div>

            <div className="main-margin-right"></div>
          </div>
        </div>
        <div className="attribution">
          Challenge by{" "}
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            rel="noreferrer"
          >
            Frontend Mentor
          </a>
          . Coded by <a href="https://github.com/justgo97">Hamdi</a>.
        </div>
      </div>
    </main>
  );
}

export default App;
