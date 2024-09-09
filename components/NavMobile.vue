<template>
  <nav id="nav">
    <div class="ctr">
      <div class="nav_grid">
        <div class="nav_grid-cell">
          <span class="nav_grid-title">
            <span>Navigation</span>
          </span>
          <ul>
            <li>
              <nuxt-link to="/" title="home" data-heat="teal">
                Home
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/portfolio/" title="Web & Apps" data-heat="teal">
                Portfolio
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/resume/" title="Resume / CV" data-heat="orange">
                Resume
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/services/" title="Key Skills" data-heat="violet">
                Key Skills
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="nav_grid-cell">
          <span class="nav_grid-title">
            <span>Portfolio</span>
          </span>
          <ul>
            <li>
              <a href="https://aquercia.co.uk/" target="_blank">
                aquercia.co.uk
              </a>
            </li>
            <li>
              <a href="https://www.cld-systems.com/" target="_blank">
                cld-systems.com
              </a>
            </li>
            <li>
              <a href="https://www.extramiledigital.com/" target="_blank">
                extramiledigital.com
              </a>
            </li>
            <li>
              <a href="https://youngstart.co.uk/" target="_blank">
                youngstart.co.uk
              </a>
            </li>
            <li>
              <a href="https://www.realtymgt.co.uk/" target="_blank">
                realtymgt.co.uk
              </a>
            </li>
            <li>
              <a href="https://bluskyltd.com/" target="_blank">
                bluskyltd.com
              </a>
            </li>
          </ul>
        </div>
        <div class="nav_grid-cell">
          <span class="nav_grid-title">
            <span>></span>
          </span>
          <ul>
            <li>
              <a href="https://payl8r.com/" target="_blank">
                payl8r.com
              </a>
            </li>
            <li>
              <a href="https://thedesignawards.co.uk/" target="_blank">
                thedesignawards.co.uk
              </a>
            </li>
            <li>
              <a href="https://grenadier.co.uk/" target="_blank">
                grenadier.co.uk
              </a>
            </li>
            <li>
              <a href="https://www.geraldeve.com/" target="_blank">
                geraldeve.com
              </a>
            </li>
            <li>
              <a href="https://www.amalgamet.co.uk/" target="_blank">
                amalgamet.co.uk
              </a>
            </li>
            <li>
              <a href="https://ameca.org.uk/" target="_blank">
                ameca.org.uk
              </a>
            </li>
          </ul>
        </div>
        <div class="nav_grid-cell">
          <span class="nav_grid-title">
            <span>Contact</span>
          </span>
          <ul>
            <li>
              <span>DANIEL WAKEFIELD</span>
            </li>
            <li>
              <span>
                T: 07377 805 443<br>
                E: dan@danielwakefield.co.uk
              </span>
            </li>
            <li>
              <span>
                Ford House Farm<br>
                Dairy House Lane<br>
                Ford (Nr Leek)<br>
                ST13 7RW
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped>
#nav {
  font-family: 'Michroma', sans-serif;
  background: rgba(0, 0, 0, 0.5) url('/images/svg/ptn-1.svg') repeat center center;
  background-size: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 800;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  height: 100vh;
  width: 100%;
  transition: opacity ease 0.3s;
}

#app[data-nav-status='open'] > #nav {
  opacity: 1;
  pointer-events: all;
}

.nav_grid {
  border-top: 2px solid rgba(255, 255, 255, 0.04);
  border-bottom: 2px solid rgba(255, 255, 255, 0.04);
  padding: 2rem 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 2rem;
  width: 100%;
}

.nav_grid-cell {
  border-right: 2px solid rgba(255, 255, 255, 0.04);
  text-align: left;
  padding: 2rem;
}

.nav_grid .nav_grid-cell:nth-child(n + 3) {
  display: none;
}

.nav_grid .nav_grid-cell:last-child {
  border-right: none;
}

#nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0 1rem;
  transition: all ease 0.3s;
}

#nav ul li {
  opacity: 0;
  transform: translateY(-1rem);
  transition: all ease 0.3s;
}

.nav_grid-title {
  position: relative;
}

.nav_grid-title span {
  display: block;
  position: relative;
  margin: 0 0 0.5rem 0;
  padding: 0 0.5rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 2.5;
  text-transform: uppercase;
}

.nav_grid-title::after {
  position: absolute;
  background: rgba(255, 255, 255, 0.05);
  height: 100%;
  width: 0;
  top: 0;
  left: 0;
  content: "";
  z-index: -1;
  transition: all ease-out 0.3s;
}

#nav ul li > span {
  display: block;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.65rem;
  font-weight: 400;
  line-height: 2;
  text-decoration: none;
  margin: 0 0 0.5rem 0;
}

#nav ul li a {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.65rem;
  font-weight: 400;
  line-height: 2.8;
  text-decoration: none;
}

#app[data-nav-status='open'] .nav_grid-title::after {
  width: 100%;
}

#nav ul li:nth-child(2) {
  transition-delay: 0.05s;
}

#nav ul li:nth-child(3) {
  transition-delay: 0.1s;
}

#nav ul li:nth-child(4) {
  transition-delay: 0.15s;
}

#nav ul li:nth-child(5) {
  transition-delay: 0.2s;
}

#nav ul li:nth-child(6) {
  transition-delay: 0.25s;
}

#nav ul li:nth-child(7) {
  transition-delay: 0.3s;
}

#app[data-nav-status='open'] > #nav ul li {
  opacity: 1;
  transform: translateY(0);
}

@media only screen and (min-width: 1240px) {
  .nav_grid {
    grid-template-columns: 0.75fr 1.25fr 1.25fr 0.75fr;
    grid-template-rows: 1fr;
  }

  .nav_grid .nav_grid-cell:nth-child(n + 3) {
    display: block;
  }
}
</style>
