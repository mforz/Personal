<template>
    <div class="fulfilling-square-spinner" v-show="show">
        <div class="spinner-inner"></div>
    </div>
</template>

<script>
export default {
    name:'spinner',
    props:{
        show:{type:Boolean,required:true}
    },
    mounted() {
       
    },

}
</script>

<style>
.fulfilling-square-spinner , .fulfilling-square-spinner * {
        box-sizing: border-box;
      }

      .fulfilling-square-spinner {
        height: 50px;
        width: 50px;
        position: absolute;
        border: 4px solid #ff1d5e;
        top:50%;
        left:50%;
        margin-top:-25px;
        margin-left:-25px;
        animation: fulfilling-square-spinner-animation 3s infinite ease;
      }

      .fulfilling-square-spinner .spinner-inner {
        vertical-align: top;
        display: inline-block;
        background-color: #ff1d5e;
        width: 100%;
        opacity: 1;
        animation: fulfilling-square-spinner-inner-animation 3s infinite ease-in;
      }

      @keyframes fulfilling-square-spinner-animation {
        0% {
          transform: rotate(0deg);
        }

        25% {
          transform: rotate(180deg);
        }

        50% {
          transform: rotate(180deg);
        }

        75% {
          transform: rotate(360deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes fulfilling-square-spinner-inner-animation {
        0% {
          height: 0%;
          opacity: .1;
        }

        25% {
          height: 0%;
          opacity: .1;
        }

        50% {
          height: 100%;
          opacity: 1;
        }

        75% {
          height: 100%;
          opacity: 1;
        }

        100% {
          height: 0%;
          opacity: .1;
        }
      }
</style>
