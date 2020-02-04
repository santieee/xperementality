<template>
  <div class="preloader-block">
    <div id="cube-loader">
      <div class="caption">
        <div class="cube-loader">
          <div class="cube loader-1"></div>
          <div class="cube loader-2"></div>
          <div class="cube loader-4"></div>
          <div class="cube loader-3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.preloader-block{
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: rgb(137,133,207);
  background-image: linear-gradient(to top, rgb(9, 10, 26), rgb(15, 19, 39), rgb(21, 29, 53), rgb(27, 38, 66), rgb(33, 48, 79), rgb(39, 57, 93), rgb(45, 67, 106), rgb(51, 76, 120), rgb(57, 86, 133), rgb(63, 95, 146), rgb(69, 105, 160), rgb(75, 114, 173));
  z-index: 100;
}
#cube-loader {
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  position: fixed;
  & .caption {
    margin: 0 auto;
  }
  .cube-loader {
    width: 73px;
    height: 73px;
    margin: 0 auto;
    margin-top: 49px;
    position: relative;
    transform: rotateZ(45deg);

    & .cube {
      position: relative;
      transform: rotateZ(45deg);
      width: 50%;
      height: 50%;
      float: left;
      transform: scale(1.1);
    }
    & .cube:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgb(89%, 26%, 26%);
      animation: cube-loader 2.76s infinite linear both;
      transform-origin: 100% 100%;
    }
    & .loader-2 {
      transform: scale(1.1) rotateZ(90deg);
    }
    & .loader-3 {
      transform: scale(1.1) rotateZ(180deg);
    }
    & .loader-4 {
      transform: scale(1.1) rotateZ(270deg);
    }
    & .loader-2:before {
      animation-delay: 0.35s;
    }
    & .loader-3:before {
      animation-delay: 0.69s;
    }
    & .loader-4:before {
      animation-delay: 1.04s;
    }
  }
}

@keyframes cube-loader {
  0%, 10% {
    transform: perspective(136px) rotateX(-180deg);
    opacity: 0;
  }
  25%, 75% {
    transform: perspective(136px) rotateX(0deg);
    opacity: 1;
  }
  90%, 100% {
    transform: perspective(136px) rotateY(180deg);
    opacity: 0;
  }
}

</style>