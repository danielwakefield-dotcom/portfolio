<template>
  <header id="header">
    <div class="ctr">
      <div>
        <ul>
          <li>
            <nuxt-link to="/portfolio/" title="Portfolio" class="traverse" data-heat="teal">
              Portfolio
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/resume/" title="Resume" class="traverse" data-heat="orange">
              Resume
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/services/" title="Web & Apps" class="traverse" data-heat="violet">
              Key Skills
            </nuxt-link>
          </li>
        </ul>
      </div>
      <nuxt-link to="/" title="Link Title" class="traverse">
        <Logo />
      </nuxt-link>
      <div />
    </div>
  </header>
</template>
<style scoped>
#header {
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  height: 80px;
  z-index: 900;
  font-family: 'Michroma', sans-serif;
  width: 100%;
}

#app[data-scroll-status="scrolling"] #header {
  backdrop-filter: blur(10px);
}

#header ul {
  opacity: 1;
  transform: translateY(0);
  transition: opacity ease 0.3s;
}

#header .ctr {
  display: flex;
  justify-content: center;
}

#header .ctr > div {
  display: none;
}

#header .ctr > a {
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  width: 140px;
  padding: 10px 0;
}

#app[data-nav-status='open'] > #header ul {
  opacity: 0;
  transform: translateY(-100px);
}

#app[data-preload-status='preloading'] #header {
  opacity: 0;
  transition: opacity ease 0.3s;
}

#app[data-preload-status='preloaded'] #header {
  opacity: 1;
}

@media only screen and (min-width: 1024px) {
  #header .ctr > div {
    display: flex;
    width: 50%;
  }

  #header .ctr :nth-child(3) {
    justify-content: flex-end;
  }

  #header ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  #header .ctr :nth-child(1) ul li {
    padding: 0 1.5rem 0 0;
  }

  #header .ctr :nth-child(3) ul li {
    padding: 0 0 0 1.5rem;
  }

  #header li a {
    color: var(--tertiary);
    font-size: 9px;
    letter-spacing: 1px;
    line-height: 58px;
    display: flex;
    font-weight: 600;
    text-decoration: none;
    text-transform: uppercase;
    align-items: center;
    justify-content: center;
    transition: color ease 0.3s;
  }

  #header .ctr > a {
    position: fixed;
    left: calc(50% - 70px);
  }

  #header li:hover a {
    color: var(--white);
  }
}
</style>
