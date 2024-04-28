<div class="loader"></div>

<style>
/* HTML: <div class="loader"></div> */
/* HTML: <div class="loader"></div> */
.loader {
  width: 40px;
  aspect-ratio: 1.154;
  --g: no-repeat radial-gradient(farthest-side,#ffffff 90%,#ffffff00);
  background: 
    var(--g) 50%  0,
    var(--g) 0    100%,
    var(--g) 100% 100%;
  background-size: 35% calc(35%*1.154);
  animation: l16 1s infinite;
}
@keyframes l16{ 
    50%,100% {background-position: 100% 100%,50% 0,0 100%} 
}
</style>
