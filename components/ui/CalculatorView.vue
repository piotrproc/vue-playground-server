<template>
  <div class="item text-center">
    <div class="details mx-3">
      <h3 class="text-xl font-extrabold dark:text-white">
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

