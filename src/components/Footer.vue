<template>
    <!-- Footer component of the application -->
    <footer>
      &copy; WAD Galaxy. All rights reserved.
    </footer>
  </template>
  
  <script>
  export default {
    name: "AppFooter", // Name of the component
    // This component serves as the footer for the app, displaying a simple copyright notice.
  };
  </script>
  
  <style scoped>

footer {
    display: flex;;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 5px;
    background-color: rgba(0, 0, 0, 0.6); /* Adjusted for more transparency */
    min-height: 75px;
    font-size: 15px;
    box-shadow: inset 0px 0px 10px 0px midnightblue;
    /* No need for margin-top if footer is always at the bottom */
}

  </style>
  