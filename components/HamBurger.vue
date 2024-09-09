<template>
  <button class="hamburger" type="button" title="Toggle Menu">
    <span class="hamburger-box">
      <span class="hamburger-inner" />
    </span>
  </button>
</template>
<style scoped>
.hamburger {
  font: inherit;
  display: inline-block;
  overflow: visible;
  margin: 0;
  padding: 0;
  cursor: pointer;
  text-transform: none;
  color: inherit;
  border: 0;
  background-color: transparent;
  z-index: 10000;
  position: fixed;
  top: 1rem;
  transform: translateY(50%);
  right: 1rem;
}

#app[data-preload-status='preloading'] .hamburger {
  opacity: 0;
  transition: opacity ease 0.3s;
}

#app[data-preload-status='preloaded'] .hamburger {
  opacity: 1;
}

.hamburger-box {
  position: relative;
  display: inline-block;
  width: 24px;
  height: 24px;
}

.hamburger-inner {
  display: block;
  margin-top: -1px;
  top: auto;
  bottom: 0;
}

.hamburger-inner,
.hamburger-inner::after,
.hamburger-inner::before {
  position: absolute;
  width: 24px;
  height: 2px;
  transition: all ease 0.3s;
  background-color: var(--tertiary);
}

.hamburger-inner::after,
.hamburger-inner::before {
  display: block;
  content: "";
}

.hamburger-inner::before {
  top: -10px;
}

.hamburger-inner::after {
  top: -20px;
}

.hamburger:hover .hamburger-inner,
.hamburger:hover .hamburger-inner::after,
.hamburger:hover .hamburger-inner::before {
  background-color: #fff;
}

#app[data-nav-status='open'] .hamburger-inner {
  transform: translate3d(0, -10px, 0) rotate(-45deg);
}

#app[data-nav-status='open'] .hamburger-inner::after {
  top: 0;
  opacity: 0;
}

#app[data-nav-status='open'] .hamburger-inner::before {
  top: 0;
  transform: rotate(-90deg);
}

@media only screen and (min-width: 600px) {
  .hamburger {
    right: 2rem;
  }
}

@media only screen and (min-width: 1360px) {
  .hamburger {
    right: 3rem;
  }
}

@media only screen and (min-width: 1720px) {
  .hamburger {
    right: 4rem;
  }
}
</style>
