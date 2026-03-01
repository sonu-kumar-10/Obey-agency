function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
  const mainEl = document.querySelector(".main");
  if (!mainEl || typeof LocomotiveScroll === "undefined") {
    return; // nothing to initialize
  }

  const locoScroll = new LocomotiveScroll({
    el: mainEl,
    smooth: true,
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      if (arguments.length) {
        locoScroll.scrollTo(value, 0, 0);
        return;
      }
      return locoScroll && locoScroll.scroll && locoScroll.scroll.instance
        ? locoScroll.scroll.instance.scroll.y
        : mainEl.scrollTop;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // use the real main element to decide pin type
    pinType: mainEl.style.transform ? "transform" : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function loadingAnimation() {
  let t1 = gsap.timeline();

  gsap.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.6,
    delay: 0.5,
  });

  t1.from(".line1-part1 ", {
    opacity: 0,
    onStart: function () {
      let h5Timer = document.querySelector(".line1-part1 h5");
      let grow = 0;
      setInterval(() => {
        if (grow < 100) {
          h5Timer.innerHTML = grow++;
        } else {
          h5Timer.innerHTML = "100";
        }
      }, 27);
    },
  });

  t1.to(".line h2", {
    animationName: "anime",
    opacity: 1,
  });
  t1.to(".loader", {
    opacity: 0,
    duration: 0.4,
    delay: 4,
  });

  t1.from(".page1", {
    delay: 0.2,
    y: 1200,
    opacity: 0,
    ease: "power4",
    duration: 0.5,
  });

  t1.to(".loader", {
    display: "none",
  });
  t1.from(".nav", {
    opacity: 0,
  });

  t1.from(".hero h1, .hero h2", {
    y: 100,
    stagger: 0.2,
  });
  t1.from(
    ".hero1, .page2",
    {
      opacity: 0,
    },
    "-=1.2",
  );
}

function cursorAnimation() {
  Shery.makeMagnet(".list p");

  // text animation on header paragraphs
  document.querySelectorAll(".left-side-header p").forEach(el => {
    el.addEventListener("mouseenter", () => {
      if (typeof Shery !== "undefined" && Shery.textAnimate) {
        Shery.textAnimate(el, {
          style: 2,
          y: 40,
          duration: 1,
          ease: "power3.out",
          multiplier: 0.05,
        });
      }
    });
  });

  const menuOverlay = document.querySelector(".menu-overlay");
  const overlayCursor = menuOverlay ;
  const bodyCursor = document.querySelector("body > .cursor");

  const videoContainer = document.querySelector(".video-container");
  const videoCursor = document.querySelector(".video-cursor");
  const video = document.querySelector(".video-container video");

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let isInVideoContainer = false;

  // Track mouse position globally
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;

    if (bodyCursor) {
      bodyCursor.style.left = cursorX - 16 + "px";
      bodyCursor.style.top = cursorY - 16 + "px";
      bodyCursor.style.opacity = menuOverlay && menuOverlay.classList.contains("open") ? 0 : 1;
    }
    if (overlayCursor) {
      overlayCursor.style.opacity = menuOverlay && menuOverlay.classList.contains("open") ? 1 : 0;
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  if (videoContainer) {
    videoContainer.addEventListener("mouseenter", () => {
      isInVideoContainer = true;
      if (bodyCursor) bodyCursor.style.opacity = 0;
    });
    videoContainer.addEventListener("mousemove", (dets) => {
      if (videoCursor) {
        videoCursor.style.left = dets.clientX - 40 + "px";
        videoCursor.style.top = dets.clientY - 40 + "px";
      }
    });
    videoContainer.addEventListener("mouseleave", () => {
      isInVideoContainer = false;
      if (bodyCursor) bodyCursor.style.opacity = 1;
      if (videoCursor) {
        videoCursor.style.left = "80%";
        videoCursor.style.top = "5%";
      }
    });
    let flag = 0;
    videoContainer.addEventListener("click", () => {
      if (!video) return;
      if (flag === 0) {
        video.play();
        video.style.opacity = 1;
        if (videoCursor) videoCursor.innerHTML = `<i class="ri-pause-fill"></i>`;
        gsap.to(videoCursor, { scale: 0.5 });
        flag = 1;
      } else {
        video.pause();
        video.style.opacity = 0;
        if (videoCursor) videoCursor.innerHTML = `<i class="ri-play-fill"></i>`;
        gsap.to(videoCursor, { scale: 1 });
        flag = 0;
      }
    });
  }
}



function page3Animation() {
  if (typeof Shery === "undefined") {
    console.error("Shery.js not loaded");
    return;
  }

  Shery.imageEffect(".image-div", {
    style: 5,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7272749998247967 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.15, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.7, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
    gooey: true,
  });
}

function flagAnimation() {
  document.addEventListener("mousemove", (dets) => {
    gsap.to("#flag", {
      left: dets.x,
      top: dets.y,
    });
  });

  document.querySelector("#hero3").addEventListener("mouseenter", () => {
    gsap.to("#flag", {
      opacity: 1,
      scale: 1,
    });
  });

  document.querySelector("#hero3").addEventListener("mouseleave", () => {
    gsap.to("#flag", {
      opacity: 0,
      scale: 0.5,
    });
  });
}
loadingAnimation();
locomotiveAnimation();
cursorAnimation();
flagAnimation();
page3Animation();



document.querySelectorAll(
  ".page3-content h1, .page4-content h1, .footer h1"
).forEach((el) => {

  gsap.fromTo(
    el,
    {
      x: 100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      ease: "none",

      scrollTrigger: {
        trigger: el,
        scroller: ".main",   
        start: "top 80%",
        end: "top 30%",
        scrub: 1,            // scroll ke saath chalega
      }
    }
  );

});


document.querySelectorAll(
  ".image-div img,.center-circle,.allcircle"
).forEach((el) => {

  gsap.fromTo(
    el,
    {
      y: 100,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      ease: "none",

      scrollTrigger: {
        trigger: el,
        scroller: ".main",   
        start: "top 80%",
        end: "top 30%",
        scrub: 1,            // scroll ke saath chalega
      }
    }
  );

});

// menu open/close and item click behavior
const menuIcon = document.querySelector('.menu-opener__square');
const menuOverlay = document.querySelector('.menu-overlay');
const menuCloseBtn = document.querySelector('.menu-close-btn');
const page1 = document.querySelector('.page1');

// hide overlay until user opens it
if (menuOverlay) {
  menuOverlay.style.visibility = 'hidden';
}


let menuOpen = false;

const isMobile = window.innerWidth <= 768;

// Function to update menu icon
const updateMenuIcon = (isOpen) => {
  if (menuIcon) {
    const menuSvg = menuIcon.innerHTML;
    if (isOpen) {
      // Show X icon by changing the SVG content
      menuIcon.innerHTML = '<line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" stroke-width="1.5"></line><line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" stroke-width="1.5"></line>';
    } else {
      // Restore original dots icon
      menuIcon.innerHTML = '<rect y="10" width="2" height="2" fill="currentColor"></rect><rect y="5" width="2" height="2" fill="currentColor"></rect><rect width="2" height="2" fill="currentColor"></rect><rect x="5" y="10" width="2" height="2" fill="currentColor"></rect><rect x="5" y="5" width="2" height="2" fill="currentColor"></rect><rect x="5" width="2" height="2" fill="currentColor"></rect><rect x="10" y="10" width="2" height="2" fill="currentColor"></rect><rect x="10" y="5" width="2" height="2" fill="currentColor"></rect><rect x="10" width="2" height="2" fill="currentColor"></rect>';
    }
  }
};

if (menuIcon && menuOverlay) {
  menuIcon.addEventListener('click', () => {
    if (!menuOpen) {
      // hide the opener icon while overlay is active to avoid overlapping white square
      if (menuIcon) {
        menuIcon.style.opacity = '0';
        menuIcon.style.pointerEvents = 'none';
      }
      // Different animation for mobile vs desktop
      const tl = gsap.timeline();
      
      if (isMobile) {
        // Mobile: animate overlay scale + fade then animate items
        tl.fromTo(
          menuOverlay,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(1.4)' }
        )
          .fromTo(
            menuOverlay.querySelectorAll('.menu-content p'),
            { opacity: 0, y: 40 }, // start from below
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.35 },
            '<'
          );
      } else {
        // Desktop: slide down from top
        tl.fromTo(
          menuOverlay,
          { y: '-100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.8, ease: 'power4.out' }
        ).fromTo(
          menuOverlay.querySelectorAll('.menu-content p'),
          { y: 40, opacity: 0 },   // start from below (bottom)
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.5 },
          '<0.1'
        );
      }

      // make overlay interactive and prevent page scroll
      if (menuOverlay) menuOverlay.style.visibility = 'visible';
      menuOverlay.classList.add('open');
      if (page1) page1.classList.add('blurred');
      const mainEl = document.querySelector('.main');
      if (mainEl) mainEl.classList.add('blurred');
      // keep the menu icon visible above the overlay
      if (menuIcon) menuIcon.classList.add('fixed-menu-icon');
      document.body.style.overflow = 'hidden';
      updateMenuIcon(true);
    } else {
      // Close menu
      // restore body cursor
      if (bodyCursor) bodyCursor.style.opacity = '1';
      if (isMobile) {
        // hide overlay with a quick scale/fade
        gsap.to(menuOverlay, { scale: 0.95, opacity: 0, duration: 0.28, ease: 'power1.in' });
      } else {
        gsap.to(menuOverlay, { y: '-100%', opacity: 0, duration: 0.6, ease: 'power4.in' });
      }
      // remove interactivity and restore scroll
      menuOverlay.classList.remove('open');
      if (page1) page1.classList.remove('blurred');
      const mainEl2 = document.querySelector('.main');
      if (mainEl2) mainEl2.classList.remove('blurred');
      if (menuIcon) menuIcon.classList.remove('fixed-menu-icon');
      document.body.style.overflow = '';
      updateMenuIcon(false);
      // hide after animation completes to prevent pre‑load visibility
      gsap.delayedCall(0.3, () => {
        if (menuOverlay) menuOverlay.style.visibility = 'hidden';
      });
    }
    menuOpen = !menuOpen;
  });

  // Close button handler
  if (menuCloseBtn) {
    menuCloseBtn.addEventListener('click', () => {
      if (menuOpen) {
        if (isMobile) {
          gsap.to(menuOverlay, { scale: 0.95, opacity: 0, duration: 0.28, ease: 'power1.in' });
        } else {
          gsap.to(menuOverlay, { y: '-100%', opacity: 0, duration: 0.6, ease: 'power4.in' });
        }
        menuOverlay.classList.remove('open');
        if (page1) page1.classList.remove('blurred');
        const mainEl3 = document.querySelector('.main');
        if (mainEl3) mainEl3.classList.remove('blurred');
        document.body.style.overflow = '';
        updateMenuIcon(false);
        if (menuIcon) {
          menuIcon.classList.remove('fixed-menu-icon');
          menuIcon.style.opacity = '';
          menuIcon.style.pointerEvents = '';
        }
        menuOpen = false;
      }
    });
  }

  // when an item is clicked, scroll to top and close menu
  menuOverlay.querySelectorAll('.menu-content p').forEach((item) => {
    item.addEventListener('click', () => {
      // animate scroll to top
      gsap.to(window, { duration: 1, scrollTo: { y: 0, autoKill: false } });
      // close overlay after animation
      if (isMobile) {
        gsap.to(menuOverlay, { opacity: 0, duration: 0.4, delay: 0.2, onComplete: () => {
          gsap.set(menuOverlay, { scale: 0, opacity: 1 });
        }});
      } else {
        gsap.to(menuOverlay, { y: '-100%', duration: 0.6, delay: 0.2, ease: 'power4.in' });
      }
      menuOverlay.classList.remove('open');
      if (page1) page1.classList.remove('blurred');
      document.body.style.overflow = '';
      updateMenuIcon(false);
      if (menuIcon) {
        menuIcon.style.opacity = '';
        menuIcon.style.pointerEvents = '';
      }
      menuOpen = false;
    });
  });
}

// Animate footer heading and run textillate (if available) with safe fallbacks
gsap.fromTo(
  '.footer h1',
  { y: 100, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    delay: 0.5,
    duration: 1,
  }
);

// Run textillate (or fallback) only when the user hovers the footer heading
(function () {
  const footerH1 = document.querySelector('.footer h1');
  if (!footerH1) return;

  // Support repeatable textillate runs on every hover. Initialize textillate once with autoStart:false
  let textillateReady = false;
  const setupTextillate = () => {
    try {
      if (typeof jQuery !== 'undefined' && jQuery.fn && typeof jQuery.fn.textillate === 'function') {
        // initialize without autoStart so we can trigger manually
        jQuery(footerH1).textillate({ in: { effect: 'rollIn' }, autoStart: false });
        textillateReady = true;
        return true;
      }
    } catch (e) {}
    return false;
  };

  const runAnimate = () => {
    try {
      if (typeof jQuery !== 'undefined' && jQuery.fn && typeof jQuery.fn.textillate === 'function') {
        if (!textillateReady) setupTextillate();
        try {
          jQuery(footerH1).textillate('in');
        } catch (e) {
          // If plugin fails to run, attempt re-init then run
          setupTextillate();
          try { jQuery(footerH1).textillate('in'); } catch (err) { /* ignore */ }
        }
        return;
      }
    } catch (e) {}

    // Fallback to Shery.textAnimate on each hover
    if (typeof Shery !== 'undefined' && typeof Shery.textAnimate === 'function') {
      Shery.textAnimate(footerH1, {
        style: 2,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        multiplier: 0.05,
      });
    }
  };

  // Use mouseenter so it triggers when pointer enters (and not on child moves)
  footerH1.addEventListener('mouseenter', runAnimate);
})();


