<template>
  <div id="contact-us">
    <div class="mui-container">
      <form class="mui-form" id="contact-form">
        <legend>Contact Us</legend>
        <div class="mui-textfield">
          <input v-model="name" id="inputName" type="text" required />
          <label>Name</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
          <input v-model="email" id="inputEmail" type="email" required />
          <label>Email Address</label>
        </div>
        <div class="mui-textfield mui-textfield--float-label">
          <textarea v-model="message" id="inputMessage" required></textarea>
          <label>Textarea</label>
        </div>
        <button @click.prevent="sentEmail"
          id="submitEmail"
          type="submit"
          class="mui-btn mui-btn--flat"
        >Submit</button>
        <p id="my-form-status"></p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      name: "",
      email: "",
      message: ""
    };
  },
  methods: {
    sentEmail: function() {
      if (this.name == "" || this.email == "" || this.message == "") {
        console.log("fail");
        return false;
      } else {
        var status = document.getElementById("my-form-status");
        var url = "https://formspree.io/xwkrpzap";
        var method = "POST";
        var data = new FormData();
        data.append("email", this.email);
        data.append("name", this.name);
        data.append("message", this.message);

        var xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.onreadystatechange = function() {
          if (this.readyState !== XMLHttpRequest.DONE) return;
          if (this.status === 200) {
            status.innerHTML = "Thanks! Your message was send.";
          } else {
            status.innerHTML = "Oops! There was a problem.";
          }
        };
        xhr.send(data);
      }
    }
  }
};
</script>
