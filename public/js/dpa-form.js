document.addEventListener('DOMContentLoaded', function() {
  function initRecaptcha() {
    if (typeof grecaptcha == "undefined") {
      return;
    }
    grecaptcha.ready(function() {
      grecaptcha.execute(recaptcha_site_key, {
        action: 'submit'
      }).then(function(token) {
        if (token.length > 0) {
          document.getElementById('g-token').value = token;
        }
      });
    });
  }

  initRecaptcha();
  setInterval(initRecaptcha, 30000);
  
  /**  
   * Handle showing additional fields exposed by
   * clicking yes on some radio buttons
   */

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

/**
 *  validation based on GSA.gov form validation
 */

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



let validateThis = "form.validate-form[validate='true']";

beginValidation(validateThis)
formatPhoneFields()

function beginValidation(form_selector) {

  const js_forms = document.querySelectorAll(form_selector);

  for (const js_form of js_forms) {
    // Disable default html5 validation for all forms on page
    setNoValidate(js_form);

    let required_inputs = js_form.querySelectorAll(".validate-input")
    let select_inputs = js_form.querySelectorAll("select:not(#perdiemSearchVO_fy)")
    let textarea_inputs = js_form.querySelectorAll("textarea")
    let check_boxes = js_form.querySelectorAll(".usa-radio__input[type=radio],.usa-checkbox__input.validate-checkbox[type=checkbox]")
    
    let error_container_class = "usa-form-group--error"
    let check_boxes_min = document.querySelectorAll('.js-min_one[type="checkbox"]')

    // begin by reseting all values on load
    document.addEventListener('DOMContentLoaded', function() {
    
      [].forEach.call(required_inputs, function (text_input) {
        text_input.value = ''
      });
      [].forEach.call(select_inputs, function (select_input) {
        select_input.value = ''
      });
      [].forEach.call(textarea_inputs, function (textarea_input) {
        textarea_input.value = ''
      });

      for (let checked_input of check_boxes) {
        checked_input.checked = false
      }
      for (let check_box_min of check_boxes_min) {
        check_box_min.checked = false
      }
      
    });

    js_form.onsubmit = function submit(event) {
      let not_pass;
      let required_inputs = js_form.querySelectorAll(".validate-input");

      [].forEach.call(required_inputs, function (text_input) {
        if (window.getComputedStyle(text_input).display == 'none') {
          return
        }
        let error_msg = text_input.getAttribute("data-error-msg")
        let invalid = text_input.validity.patternMismatch || text_input.validity.valueMissing || text_input.validity.typeMismatch;

        if (!error_msg) {
          error_msg = `This is a required field`;
          console.log(`${text_input.name} is missing the data-error-msg to display error feedback`)
        }

        if (invalid) {
          not_pass = true;
          text_input.closest(".usa-form-group").classList.add(error_container_class);
          text_input.classList.add("usa-input--error");
          var errorId = text_input.getAttribute('data-error-id');
          var errorSpan = document.getElementById(errorId);
          if (errorSpan) {
            errorSpan.innerText = error_msg
          }
          console.log(`${text_input.name} is missing`);
        } else {

          text_input.closest(".usa-form-group").classList.remove(error_container_class);
          var errorId = text_input.getAttribute('data-error-id');
          var errorSpan = document.getElementById(errorId);
          errorSpan.innerText = " ";
          text_input.classList.remove("usa-input--error");
        }
      });


      // If inputs exist
      // It is assumed that all radios and checkboxes are required and atleast one text input will also exist on the page.
      if (document.body.contains(check_boxes[0])) {
        // Get all radio buttons, convert to an array.
        const inputs_array = Array.prototype.slice.call(check_boxes);

        // Group inputs by parent id
        const questions = Object.values(inputs_array.reduce((result, el) => {
          let parent = el.closest('fieldset');
          return Object.assign(result, {[parent.id]: (result[parent.id] || []).concat(el)});
        }, {}));

        // Loop through each question, looking for any that aren't answered.
        let hasUnanswered = questions.some(question => !question.some(el => el.checked));
        questions.forEach(question => {
          var fieldset =  question[0].closest(".usa-fieldset")
          var errorId = fieldset.getAttribute('data-error-id');
          var error_msg = fieldset.getAttribute("data-error-msg")
          var input_type = question[0].type

          // at least one radio button in the group or all checkboxes must be checked
          if ((input_type == "radio" && !question.some(el => el.checked)) || (input_type == "checkbox" && !question.every(el => el.checked))) {
            hasUnanswered = true;
          
            fieldset.classList.add(error_container_class);
            if (errorId && error_msg) {
                var errorSpan = document.getElementById(errorId)
                errorSpan.innerText = error_msg
            }
          } else {
            fieldset.classList.remove(error_container_class);
            if (errorId && error_msg) {
              var errorSpan = document.getElementById(errorId)
              errorSpan.innerText = " "
            }
          }
        });
        // Radio button is un answered
        if (hasUnanswered && not_pass) {
          not_pass = true;
        }
        if (hasUnanswered) {
          not_pass = true;
        }
      }

      //if not pass then
      if (not_pass) {
        event.preventDefault();
        console.log('Page did not pass: ' + not_pass);
        didNotPass();
        return false;
      }
      if (!not_pass && typeof form == "object") {
        form.setAttribute('form-is-valid', 'true');
        return true;
      }
    }
  }
}

function setNoValidate(arg) {
  arg.setAttribute("novalidate", "true");
  return true;
};

function didNotPass() {
  setTimeout(function () {
    var elements = document.querySelectorAll("[class$=-error] :is(input, select)");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      // Check if the element is visible
      if (window.getComputedStyle(element).display !== 'none') {
        element.focus();  
        return
      }
  }
  }, 100);
};


function enforceFormat(event) {
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if (!isNumericInput(event) && !isModifierKey(event)) {
    event.preventDefault();
  }
};

function formatToPhone(event){
  if (isModifierKey(event)) { return; }
  const target = event.target;
  const input = event.target.value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
  const area = input.substring(0, 3);
  const middle = input.substring(3, 6);
  const last = input.substring(6, 10);

  if (input.length > 6) { target.value = `${area}-${middle}-${last}`; }
  else if (input.length > 3) { target.value = `${area}-${middle}`; }
  else if (input.length > 0) { target.value = `${area}`; }
};

function formatPhoneFields() {
  let tel_inputs = document.querySelectorAll("input[type=tel]");

  for (let tel_input of tel_inputs) {
    tel_input.addEventListener('keydown', enforceFormat);
    tel_input.addEventListener('keyup', formatToPhone)
  }
}


function isNumericInput(event){
  const key = event.keyCode;
  return ((key >= 48 && key <= 57) || // Allow number line
    (key >= 96 && key <= 105) // Allow number pad
  );
};

function isModifierKey(event){
  const key = event.keyCode;
  return (event.shiftKey === true || key === 35 || key === 36) || // Allow Shift, Home, End
    (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
    (key > 36 && key < 41) || // Allow left, up, right, down
    (
      // Allow Ctrl/Command + A,C,V,X,Z
      (event.ctrlKey === true || event.metaKey === true) &&
      (key === 65 || key === 67 || key === 86 || key === 88 || key === 90)
    )
};

