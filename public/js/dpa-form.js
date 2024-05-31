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

const form = document.getElementById("dpa_form");

function getFormDataAsUrlEncoded(form) {
  const formData = new FormData(form);
  const params = new URLSearchParams();

  for (const [key, value] of formData.entries()) {
      params.append(key, value);
  }

  return params.toString();
}
function getFormDataAsJsonString(form) {
  const formData = new FormData(form);
  const jsonObject = {};

  for (const [key, value] of formData.entries()) {
      jsonObject[key] = value;
  }

  return JSON.stringify(jsonObject);
}

const jsonString = getFormDataAsJsonString(form);
console.log(jsonString);

function beginValidation(form) {
  console.log("validating!", form)
  form.setAttribute('form-is-valid', 'true');
  return true;
}

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting the traditional way

  const form = event.currentTarget;
  const formData = getFormDataAsUrlEncoded(form);
  console.log("form data:", formData)
  beginValidation(form)
  fetch('https://preview.gsa.gov/api/verify-recaptcha', {
      method: 'POST',
      credentials: 'include',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData
  })
  .then(response => response.text())
  .then(data => {
      console.log('Success:', data);
  })
  .catch(error => {
      console.error('Error:', error);
  });

});