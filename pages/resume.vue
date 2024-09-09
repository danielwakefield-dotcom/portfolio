<template>
  <div>
    <section class="hero hero-wide">
      <div class="hero_ctr ctr">
        <div class="hero_excerpt">
          <div>
            <h1>
              <span>
                Curriculum
              </span>
              <span>
                Vitae
              </span>
            </h1>
            <ul class="hero-cv">
              <li>
                <div>
                  <span class="hero-cv_date">
                    November 2020 ---
                  </span>
                  <h2>
                    The Artlab
                  </h2>
                  <h3>Senior Web Developer</h3>
                </div>
              </li>
              <li>
                <div>
                  <span class="hero-cv_date">
                    June 2018 - November 2020
                  </span>
                  <h2>
                    PayL8r
                  </h2>
                  <h3>Senior Front End Developer</h3>
                </div>
              </li>
              <li>
                <div>
                  <span class="hero-cv_date">
                    May 2013 - June 2018
                  </span>
                  <h2>
                    Dub Code
                  </h2>
                  <h3>Owner / Web Developer</h3>
                </div>
              </li>
              <li>
                <div>
                  <span class="hero-cv_date">
                    February 2010 - May 2013
                  </span>
                  <h2>
                    TMC Strategic Communications
                  </h2>
                  <h3>Senior Web Developer</h3>
                </div>
              </li>
              <li>
                <div>
                  <span class="hero-cv_date">
                    Jan 2009 - February 2010
                  </span>
                  <h2>
                    The Gate Design Group
                  </h2>
                  <h3>Commercial TV Producer</h3>
                </div>
              </li>
              <li>
                <div>
                  <span class="hero-cv_date">
                    May 2006 - Jan 2009
                  </span>
                  <h2>
                    Triad Media
                  </h2>
                  <h3>Web Developer / VFX Video Trainee</h3>
                </div>
              </li>
              <li>
                <div>
                  <span class="hero-cv_date">
                    June 2004 - May 2006
                  </span>
                  <h2>
                    Angus Limelight
                  </h2>
                  <h3>Junior Web Developer</h3>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="hero_model">
        <ModelAbout />
      </div>
    </section>
  </div>
</template>
<script>
export default {
  head () {
    return {
      // Meta Data
      title: 'Test Title',
      meta: [
        { name: 'google', content: 'notranslate' },
        { hid: 'og:title', name: 'og:title', content: 'This is Ultra' },
        {
          hid: 'description',
          name: 'description',
          content: 'Web Designer & Website Developer Cheshire | ultr4.co.uk'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: 'Web Designer & Website Developer Cheshire | ultr4.co.uk'
        },
        {
          name: 'keywords',
          content:
            'web designer, web developer, cheshire, front end, javascript, php, WordPress'
        }
      ]
    }
  }
}
</script>
