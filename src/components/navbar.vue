<template>

    <header class="mui-appbar">
      <table>
        <tr class="mui--appbar-height">
          <td class="mui--text-title">
            <img
              src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/15664219991579250992-512.png"
              alt=""
            />
            <div id="title-crypto" class="mui--text-display3">LSD</div>
          </td>
          <td class="mui--text-right">
            <ul class="mui-list--inline mui--text-body2">
              <li>
                <a href="#myChart"><span class="mui-text mui-caret--right">Chart</span></a>
              </li>
              <li>
                <a href="#contact-us"><span class="mui-text mui-caret--right">Contact Us</span></a>
              </li>
              <li>
                <a href="#about-project"><span class="mui-text mui-caret--right">About project</span></a>
              </li>
              <li>
                <a href="#crypto-news"><span class="mui-text mui-caret--right">Crypto News</span></a>
              </li>
           <li><span class="darkmode" :class="(mode === 'dark') ? 'dark' : 'light'"></span></li>
            </ul>
          </td>
        </tr>
      </table>
    </header>



</template>

<script>
module.exports = {
  data: function() {
    return {
      // mode: 'dark'
    };
  }
};
</script>

<style lang="stylus">

</style>