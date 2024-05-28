document.addEventListener('DOMContentLoaded', function() {
  console.log("running")
  function initRecaptcha() {
    if (typeof grecaptcha == "undefined") {
      console.log("no captcha")
      return;
    }
    console.log("captcha!")
    grecaptcha.ready(function() {
      grecaptcha.execute(recaptcha_site_key, {
        action: 'submit'
      }).then(function(token) {
        if (token.length > 0) {
          console.log("token: ", token)
          document.getElementById('g-token').value = token;
        }
      });
    });
  }

  initRecaptcha();
  setInterval(initRecaptcha, 30000);
  

  function switchVar() {
    var assistanceYes = document.getElementById("assistanceYes");
    var otherTextElements = document.querySelectorAll(".other-text");
    var needAssistance = document.getElementById("Need_Assistance");
  
    if (assistanceYes.checked) {
      otherTextElements.forEach(function(element) {
        element.classList.remove("hidden");
      });
      needAssistance.setAttribute("required", true);
      needAssistance.removeAttribute("disabled");
    } else {
      otherTextElements.forEach(function(element) {
        element.classList.add("hidden");
      });
      needAssistance.removeAttribute("required");
      needAssistance.setAttribute("disabled", true);
    }
  }

  switchVar();
  document.querySelectorAll("input[name=Assistancequestion]").forEach(function(element) {
    element.addEventListener('change', switchVar);
  });
  
  document.querySelectorAll("input.selectable").forEach(function(element) {
    element.addEventListener('click', function() {
      var disField = this.closest(".grid-row").nextElementSibling.querySelector(".disabled"),
          errormsg = this.closest(".grid-row").nextElementSibling.querySelector(".usa-error-message"),
          errorClass = this.closest(".grid-row").nextElementSibling.querySelector(".usa-form-group--error"),
          otherField = this.closest(".grid-row").nextElementSibling.querySelector(".otherInput");
      
      if (this.checked) {
        disField.setAttribute("required", true);
        disField.removeAttribute("disabled");
        disField.classList.add("validate-input");
      } else {
        errorClass.classList.remove('usa-form-group--error');
        errormsg.textContent = '';
        disField.removeAttribute("required");
        disField.setAttribute("disabled", true);
        disField.classList.remove("validate-input");
        disField.selectedIndex = 0;
        otherField.classList.add("hidden");
        otherField.querySelector("input").removeAttribute("required");
      }
    });
  });
  
  var otherSelected = document.querySelector("select.if-other");
  otherSelected.addEventListener('change', function() {
    var otherInput = this.parentElement.nextElementSibling;
    if (this.value == "Other") {
      otherInput.classList.remove("hidden");
      var oasisOther = otherInput.querySelector("#oasis-Other");
      oasisOther.classList.add("validate-input");
      oasisOther.removeAttribute("disabled");
      oasisOther.setAttribute("required", true);
    } else {
      otherInput.classList.add("hidden");
      var oasisOther = otherInput.querySelector("#oasis-Other");
      oasisOther.classList.remove("validate-input");
      oasisOther.removeAttribute("disabled");
      oasisOther.removeAttribute("required");
    }
  });
})