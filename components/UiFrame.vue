<template>
  <div class="ui">
    <span class="ui-corner tl">
      <span class="dots" />
    </span>
    <span class="ui-corner tr">
      <span class="dots" />
    </span>
    <span class="ui-corner bl">
      <span class="dots" />
    </span>
    <span class="ui-corner br">
      <span class="dots" />
    </span>
    <span class="ui-ctr">
      <span class="ui-corner tl">
        <span class="dots" />
      </span>
      <span class="ui-corner tr">
        <span class="dots" />
      </span>
      <span class="ui-corner bl">
        <span class="dots" />
      </span>
      <span class="ui-corner br">
        <span class="dots" />
      </span>
    </span>
  </div>
</template>

<style scoped>
.ui {
  width: 100%;
  height: 80vh;
  overflow: hidden;
  position: fixed;
  top: 10vh;
  left: 0;
  z-index: 2;
  pointer-events: none;
  transform: scaleY(0);
  transition: all ease 0.6s;
  transition-delay: 1.3s;
}

#app[data-preload-status='preloaded'] .ui {
  transform: scaleY(1);
}

.ui-corner {
  display: block;
  width: 90px;
  height: 30px;
  position: absolute;
  z-index: 3;
}

.ui-corner::before {
  border-left: 1px solid var(--secondary-alpha);
  border-right: 1px solid var(--secondary-alpha);
  display: block;
  content: '';
  position: absolute;
  height: 5px;
  width: 45px;
  z-index: 3;
}

.ui-corner::after {
  display: block;
  content: '';
  position: absolute;
  height: 10px;
  width: 10px;
  z-index: 3;
}

.ui-corner.tl {
  top: 0;
  left: 1rem;
  border-top: 1px dotted rgba(255, 255, 255, 0.2);
  border-left: 1px dotted rgba(255, 255, 255, 0.2);
}

.ui-corner.tl::before {
  top: 0;
  left: 0;
  transform: translateX(22.5px) translateY(-3px);
}

.ui-corner.tl::after {
  top: 0;
  left: 0;
  transform: translateX(-1px) translateY(-1px);
  border-top: 1px solid var(--secondary-alpha);
  border-left: 1px solid var(--secondary-alpha);
}

.ui-corner.tr {
  top: 0;
  right: 1rem;
  border-top: 1px dotted rgba(255, 255, 255, 0.2);
  border-right: 1px dotted rgba(255, 255, 255, 0.2);
}

.ui-corner.tr::before {
  top: 0;
  right: 0;
  transform: translateX(-22.5px) translateY(-3px);
}

.ui-corner.tr::after {
  top: 0;
  right: 0;
  transform: translateX(1px) translateY(-1px);
  border-top: 1px solid var(--secondary-alpha);
  border-right: 1px solid var(--secondary-alpha);
}

.ui-corner.bl {
  bottom: 0;
  left: 1rem;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.2);
  border-left: 1px dotted rgba(255, 255, 255, 0.2);
}

.ui-corner.bl::before {
  bottom: 0;
  left: 0;
  transform: translateX(22.5px) translateY(3px);
}

.ui-corner.bl::after {
  bottom: 0;
  left: 0;
  transform: translateX(-1px) translateY(1px);
  border-bottom: 1px solid var(--secondary-alpha);
  border-left: 1px solid var(--secondary-alpha);
}

.ui-corner.br {
  bottom: 0;
  right: 1rem;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.2);
  border-right: 1px dotted rgba(255, 255, 255, 0.2);
}

.ui-corner.br::before {
  bottom: 0;
  right: 0;
  transform: translateX(-22.5px) translateY(3px);
}

.ui-corner.br::after {
  bottom: 0;
  right: 0;
  transform: translateX(1px) translateY(1px);
  border-bottom: 1px solid var(--secondary-alpha);
  border-right: 1px solid var(--secondary-alpha);
}

.dots {
  position: absolute;
  display: block;
  width: 30px;
  height: 2px;
  opacity: 0.5;
}

.ui-corner.tr .dots {
  border-left: 1px solid var(--secondary-alpha);
  border-right: 1px solid var(--secondary-alpha);
  transform: translateX(30px) translateY(-1px);
}

.ui-corner.bl .dots {
  border-left: 1px solid var(--secondary-alpha);
  border-right: 1px solid var(--secondary-alpha);
  transform: translateX(30px) translateY(1px);
  bottom: 0;
}

.ui-corner.br .dots {
  border-left: 1px solid var(--secondary-alpha);
  border-right: 1px solid var(--secondary-alpha);
  transform: translateX(30px) translateY(1px);
  bottom: 0;
}

.ui-corner.tl .dots {
  border-left: 1px solid var(--secondary-alpha);
  border-right: 1px solid var(--secondary-alpha);
  transform: translateX(30px) translateY(-1px);
}

.ui-ctr {
  width: calc(100% - 2rem);
  height: calc(80vh - 2rem);
  overflow: hidden;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 3;
  pointer-events: none;
  opacity: 0;
  transform: scaleY(2);
  transition: all ease 0.6s;
  transition-delay: 1.3s;
}

#app[data-preload-status='preloaded'] .ui-ctr {
  transform: scaleY(1);
  opacity: 0.75;
}

.ui-ctr::before {
  content: '';
  position: absolute;
  top: 2rem;
  left: 1rem;
  width: calc(100% - 2rem);
  height: calc(100% - 4rem);
  background: rgba(13, 234, 221, 0.01);
  border: 1px solid rgba(13, 234, 221, 0.1);
}

.ui-ctr::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/images/svg/ptn-1.svg') repeat center center;
  background-size: 10px 10px;
}

.ui-ctr .ui-corner {
  width: 45px;
  height: 15px;
}

.ui-ctr .ui-corner.bl {
  bottom: 4rem;
}

.ui-ctr .ui-corner.br {
  bottom: 4rem;
}

.ui-ctr .ui-corner.tl {
  top: 4rem;
}

.ui-ctr .ui-corner.tr {
  top: 4rem;
}

@media only screen and (min-width: 600px) {
  .ui-corner.tl,
  .ui-corner.bl {
    left: 2rem;
  }

  .ui-corner.tr,
  .ui-corner.br {
    right: 2rem;
  }

  .ui-ctr {
    width: calc(100% - 4rem);
    left: 2rem;
  }

  .ui-ctr::before {
    left: 2rem;
    width: calc(100% - 4rem);
  }
}

@media only screen and (min-width: 1360px) {
  .ui::before,
  .ui::after {
    border-left: 1px dashed rgba(13, 234, 221, 0.3);
    display: block;
    content: '';
    position: absolute;
    height: 50%;
    width: 2px;
    top: 25%;
    left: 4rem;
    z-index: 3;
  }

  .ui::after {
    border-left: none;
    border-right: 1px dashed rgba(13, 234, 221, 0.3);
    left: auto;
    right: 4rem;
  }

  .ui-corner.tl,
  .ui-corner.bl {
    left: 3rem;
  }

  .ui-corner.tr,
  .ui-corner.br {
    right: 3rem;
  }

  .ui-ctr {
    width: calc(100% - 6rem);
    left: 3rem;
  }
}

@media only screen and (min-width: 1720px) {
  .ui-corner.tl,
  .ui-corner.bl {
    left: 4rem;
  }

  .ui-corner.tr,
  .ui-corner.br {
    right: 4rem;
  }

  .ui-ctr {
    width: calc(100% - 8rem);
    left: 4rem;
  }
}
</style>
