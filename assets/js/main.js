import {
  PUBLIC_KEY,
  SUBSCRIBE_TEMPLATE,
  CONTACT_TEMPLATE,
  SERVICE_ID,
} from "./constant.js";

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Countdown timer
   */
  let countdown = select(".countdown");
  const output = countdown.innerHTML;

  const countDownDate = function () {
    let timeleft =
      new Date(countdown.getAttribute("data-count")).getTime() -
      new Date().getTime();

    let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    countdown.innerHTML = output
      .replace("%d", days)
      .replace("%h", hours)
      .replace("%m", minutes)
      .replace("%s", seconds);
  };
  countDownDate();
  setInterval(countDownDate, 1000);
})();

//Initialize EMAIL.JS with Public Key
emailjs.init(PUBLIC_KEY);

const contactFormSender = () => {
  const LOADER = document.querySelector("#contact-form .loading");
  const SUCCESS = document.querySelector("#contact-form .sent-message");
  const FAILED = document.querySelector("#contact-form .error-message");

  document
    .getElementById("contact-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      // generate a five digit number for the contact_number variable
      this.contact_number.value = (Math.random() * 100000) | 0;
      // these IDs from the previous steps
      try {
        LOADER.style.display = "block";
        await emailjs.sendForm(SERVICE_ID, CONTACT_TEMPLATE, this);
        SUCCESS.style.display = "block";
      } catch (error) {
        LOADER.style.display = "none";
        FAILED.innerHTML = `${error.message}`;
        FAILED.style.display = "block";
      } finally {
        LOADER.style.display = "none";
        window.setTimeout(() => {
          FAILED.style.display = "none";

          SUCCESS.style.display = "none";
        }, 4000);
      }
    });
};

const subscribeFormSender = () => {
  const LOADER = document.querySelector("#subscribe-form .loading");
  const SUCCESS = document.querySelector("#subscribe-form .sent-message");
  const FAILED = document.querySelector("#subscribe-form .error-message");

  document
    .getElementById("subscribe-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      // generate a five digit number for the contact_number variable
      this.contact_number.value = (Math.random() * 100000) | 0;
      // these IDs from the previous steps
      try {
        LOADER.style.display = "block";
        await emailjs.sendForm(SERVICE_ID, SUBSCRIBE_TEMPLATE, this);
        SUCCESS.style.display = "block";
      } catch (error) {
        LOADER.style.display = "none";
        FAILED.innerHTML = `${error.message}`;
        FAILED.style.display = "block";
      } finally {
        LOADER.style.display = "none";
        window.setTimeout(() => {
          FAILED.style.display = "none";

          SUCCESS.style.display = "none";
        }, 4000);
      }
    });
};

window.onload = function () {
  contactFormSender();
  subscribeFormSender();
};
