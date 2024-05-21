
jQuery(document).ready(function ($) {
    console.log("running")
// Check and execute only for GWAC Form
          if ($("input[value='/form-submission/dpa-gwac']").length) {
            $("input[name=Need_Assistance]").change(function () {
              if ($("#assistanceYes").is(':checked')) {
                console.log("checked");
                $(".other-text input").addClass("validate-input");
                $(".other-text").removeClass("hidden");
                $(".other-text input").attr("required", true);
                $(".other-text input").removeAttr("disabled");
              } else {
                $(".other-text input").removeClass("validate-input");
                $(".other-text").addClass("hidden");
                $(".other-text input").removeAttr("required");
                $(".other-text input").attr("disabled", true);
              }
            });
            $("input.selectable").click(function () {
              var disField = $(this).parentsUntil(".grid-row").next().find("input, select"),
                errormsg = $(this).parentsUntil(".grid-row").next().find(".usa-error-message"),
                errorClass = $(this).parentsUntil(".grid-row").next().find(".usa-form-group--error"),
                otherField = $(this).parentsUntil(".grid-row").next().find(".otherInput");
              if ($(this).is(':checked')) {
                console.log("checked!");
                $(disField).attr("required", true);
                $(disField).attr("disabled", false);
                $(disField).addClass("validate-input");
                $(disField).removeClass("disabled");
                $('.notice-checkbox > legend').removeClass('usa-form-group--error');
              } else if ($(this).not(':checked')) {
                console.log("Not checked!");
                if($('.notice-checkbox .usa-checkbox__input:checked').length == 0) {
                  $('.notice-checkbox > legend').addClass('usa-form-group--error');
                }
                $(errormsg).text('');
                $(disField).removeAttr("required");
                $(disField).attr("disabled", true);
                $(disField).addClass("validate-input disabled");
                $(disField).parent().removeClass('usa-form-group--error');
                $(disField).removeClass("usa-input--error");
                $(disField).removeClass("validate-input").prop('selectedIndex', 0);
                $(otherField).addClass("hidden");
                $(otherField).find("input").removeAttr("required");
              }
            });
            // Disable other checkboxes if first option is checked and viseversa
            var allActive = $("input#GwacDpa"),
              otherCheckboxes = $("input.optionB"),
              otherOptionInputs = $("input.options_B").find(".disabled");
            $(allActive).click(function () {
              if ($(this).is(':checked')) {
                $(otherCheckboxes).attr("disabled", true);
                $(otherCheckboxes).prop("checked", false);
                $(otherOptionInputs).attr("disabled", true);
                $(".options_B select.form-control").prop('selectedIndex', 0);
                $(".options_B input[type='text']").val('');
              } else if ($(this).not(':checked')) {
                $(".options_A select.form-control").prop('selectedIndex', 0);
                $(".options_A input[type='text']").val('');
                $(otherCheckboxes).attr("disabled", false);
              }
            });
            $(otherCheckboxes).click(function () {
              if ($(this).is(':checked')) {
                $(allActive).attr("disabled", true);
                $(allActive).prop("checked", false);
                $(".options_A select.form-control").prop('selectedIndex', 0);
              } else if ($(this).not(':checked')) {
                $(this).find("select.form-control").prop('selectedIndex', 0);
                $(this).parentsUntil(".grid-row").next().find("input[type='text']").val('');
                if($(".optionB:checked").length == 0) {
                  $(allActive).attr("disabled", false);
                  $(allActive).prop("checked", false);
                }
              }
            });
            var otherSelected = $("select.if-other");
            $(otherSelected).change(function () {
              var otherInput = $(this).parent("div").next();
              if ($(this).val() == "Other") {
                $(otherInput).removeClass("hidden");
                $(otherInput).find("input").addClass("validate-input").attr('required', 'true');
              } else {
                $(otherInput).addClass("hidden");
                $(otherInput).find("input").removeClass("validate-input").removeAttr('required');
              }
            });
            function switchVar() {
            }
          }
  
          // Check and execute only for OASIS Form
          if ($("input[value='/form-submission/dpa-oasis']").length) {
            function checkGwacs() {
              var checkbox = $("input[name^=category]");
              $(checkbox).click(function () {
                if (checkbox.val() == "OASIS") {
                  if ($("#oasis").prop('checked')) {
                    $('.oasis-gwac').removeClass('hidden').find('.usa-select,.usa-input validate-input').removeAttr("disabled").attr("required", true);
                  }
                  else {
                    $('.oasis-gwac').addClass('hidden').find('.usa-select,.usa-input validate-input').attr("disabled", true).removeAttr("required");
                  }
                }
                if ($(checkbox).val() == "HCaTS") {
                  if ($("#hcats").prop('checked')) {
                    $('.hcats-gwac').find('.usa-select,.usa-input validate-input').removeAttr("disabled").attr("required", true);
                  }
                  else {
                    $('.hcats-gwac').find('.usa-select,.usa-input validate-input').attr("disabled", true).removeAttr("required");
                  }
                }
              });
            }
            function switchVar() {
              if ($("#assistanceYes").is(':checked')) {
                $(".other-text").removeClass("hidden");
                $("#Need_Assistance").attr("required", true);
                $("#Need_Assistance").removeAttr("disabled");
              } else {
                $(".other-text").addClass("hidden");
                $("#Need_Assistance").removeAttr("required");
                $("#Need_Assistance").attr("disabled", true);
              }
            }
  
            switchVar();
            $("input[name=Assistancequestion]").change(switchVar);
            $("input.selectable").click(function () {
              var disField = $(this).parentsUntil(".grid-row").next().find(".disabled"),
                errormsg = $(this).parentsUntil(".grid-row").next().find(".usa-error-message"),
                errorClass = $(this).parentsUntil(".grid-row").next().find(".usa-form-group--error"),
                otherField = $(this).parentsUntil(".grid-row").next().find(".otherInput");
              if ($(this).is(':checked')) {
                $(disField).attr("required", true);
                $(disField).attr("disabled", false);
                $(disField).addClass("validate-input");
              } else if ($(this).not(':checked')) {
                $(errorClass).removeClass('usa-form-group--error');
                $(errormsg).text('');
                $(disField).removeAttr("required");
                $(disField).attr("disabled", true);
                $(disField).removeClass("validate-input").prop('selectedIndex', 0);
                $(otherField).addClass("hidden");
                $(otherField).find("input").removeAttr("required");
              }
            });
            var otherSelected = $("select.if-other");
            $(otherSelected).change(function () {
              var otherInput = $(this).parent("div").next();
              if ($(this).val() == "Other") {
                $(otherInput).removeClass("hidden");
                $(otherInput).find("#oasis-Other").addClass("validate-input");
                $(otherInput).find("#oasis-Other").removeAttr("disabled")
                $(otherInput).find("#oasis-Other").attr("required", true);
              } else {
                $(otherInput).addClass("hidden");
                $(otherInput).find("#oasis-Other").removeClass("validate-input");
                $(otherInput).find("#oasis-Other").removeAttr("disabled")
                $(otherInput).find("#oasis-Other").removeAttr("required");
              }
            });
          }
          if ($("input[value='https://preview.gsa.gov/form-submission/dpa-oasisplus']").length) {
            console.log()
            function switchVar() {
              if ($("#assistanceYes").is(':checked')) {
                $(".other-text").removeClass("hidden");
                $("#Need_Assistance").attr("required", true);
                $("#Need_Assistance").removeAttr("disabled");
              } else {
                $(".other-text").addClass("hidden");
                $("#Need_Assistance").removeAttr("required");
                $("#Need_Assistance").attr("disabled", true);
              }
            }
  
            switchVar();
            $("input[name=Assistancequestion]").change(switchVar);
            $("input.selectable").click(function () {
              var disField = $(this).parentsUntil(".grid-row").next().find(".disabled"),
                errormsg = $(this).parentsUntil(".grid-row").next().find(".usa-error-message"),
                errorClass = $(this).parentsUntil(".grid-row").next().find(".usa-form-group--error"),
                otherField = $(this).parentsUntil(".grid-row").next().find(".otherInput");
              if ($(this).is(':checked')) {
                $(disField).attr("required", true);
                $(disField).attr("disabled", false);
                $(disField).addClass("validate-input");
              } else if ($(this).not(':checked')) {
                $(errorClass).removeClass('usa-form-group--error');
                $(errormsg).text('');
                $(disField).removeAttr("required");
                $(disField).attr("disabled", true);
                $(disField).removeClass("validate-input").prop('selectedIndex', 0);
                $(otherField).addClass("hidden");
                $(otherField).find("input").removeAttr("required");
              }
            });
            var otherSelected = $("select.if-other");
            $(otherSelected).change(function () {
              var otherInput = $(this).parent("div").next();
              if ($(this).val() == "Other") {
                $(otherInput).removeClass("hidden");
                $(otherInput).find("#oasis-Other").addClass("validate-input");
                $(otherInput).find("#oasis-Other").removeAttr("disabled")
                $(otherInput).find("#oasis-Other").attr("required", true);
              } else {
                $(otherInput).addClass("hidden");
                $(otherInput).find("#oasis-Other").removeClass("validate-input");
                $(otherInput).find("#oasis-Other").removeAttr("disabled")
                $(otherInput).find("#oasis-Other").removeAttr("required");
              }
            });
          }
  
          // Check and execute only for CS3 Form
          if ($("input[value='/form-submission/dpa-cs3']").length) {
            function switchVar() {
              if ($("#satcom-requirement-yes").is(':checked')) {
                $(".other-text").removeClass("hidden");
                $(".other-text input").attr("required", true);
                $(".other-text input").removeAttr("disabled");
              } else {
                $(".other-text").addClass("hidden");
                $(".other-text input").removeAttr("required");
                $(".other-text input").attr("disabled", true);
              }
            }
  
            switchVar();
            $("input[name=Need_Assistance]").change(switchVar);
            $("input.selectable").click(function () {
                console.log("clicked!!!")
              var disField = $(this).parentsUntil(".grid-row").next().find(".disabled"),
                errormsg = $(this).parentsUntil(".grid-row").next().find(".usa-error-message"),
                errorClass = $(this).parentsUntil(".grid-row").next().find(".usa-form-group--error");
              if ($(this).is(':checked')) {
                $(disField).attr("required", true);
                $(disField).attr("disabled", false);
                $(disField).addClass("validate-input");
              } else if ($(this).not(':checked')) {
                $(errorClass).removeClass('usa-form-group--error')
                $(errormsg).text('');
                $(disField).removeAttr("required");
                $(disField).attr("disabled", true);
                $(disField).removeClass("validate-input");
              }
            });
          }
  
          // Check and execute only for DEFAULT DPA Form
          if ($("input[value='/form-submission/dpa']").length) {
  
          }
  
  
        })