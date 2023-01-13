(function() {
    // get all data in form and return object
    function getFormData(form) {
      var elements = form.elements;
      var honeypot;
  
      var fields = Object.keys(elements).filter(function(k) {
        if (elements[k].name === "honeypot") {
          honeypot = elements[k].value;
          return false;
        }
        return true;
      }).map(function(k) {
        if(elements[k].name !== undefined) {
          return elements[k].name;
        // special case for Edge's html collection
        }else if(elements[k].length > 0){
          return elements[k].item(0).name;
        }
      }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
      });
  
      var formData = {};
      fields.forEach(function(name){
        var element = elements[name];
        
        // singular form elements just have one value
        formData[name] = element.value;
  
        // when our element has multiple items, get their values
        // if (element.length) {
        //   var data = [];
        //   for (var i = 0; i < element.length; i++) {
        //     var item = element.item(i);
        //     if (item.checked || item.selected) {
        //       data.push(item.value);
        //     }
        //   }
        //   formData[name] = data.join(', ');
        // }
      });
  
      // add form-specific values into the data
      formData.formDataNameOrder = JSON.stringify(fields);
      formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
      formData.formGoogleSendEmail
        = form.dataset.email || ""; // no email by default
  
      return {data: formData, honeypot: honeypot};
    }
  
    function handleFormSubmit(event) {  // handles form submit without any jquery
      event.preventDefault();           // we are submitting via xhr below
      var form = event.target;
      var formData = getFormData(form);
      var data = formData.data;
  
      // If a honeypot field is filled, assume it was done so by a spam bot.
      if (formData.honeypot) {
        return false;
      }

      const email = document.querySelector('#email')
      console.log(email.value.length)
      if (email.value.length >= 1) {
        let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if (exptext.test(email.value) == false) {	
            alert("Please enter a vaild email");
            email.focus();
            document.querySelector(".gform").action = " ";
        }else if(email.value.length === 0){
            alert("hello")
            return
        }else{
            document.querySelector(".gform").action = "https://script.google.com/macros/s/AKfycbwGNiUTv98-qxYw8ZoypvZHrfM57p8IG5j7otanN2MhuWgLRWbhNtO0dYJZZru5QuwM1Q/exec";
            document.querySelector('.send-btn').classList.add('disabled')
            var url = form.action;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            // xhr.withCredentials = true;
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                  form.reset();
                  var formElements = form.querySelector(".form-elements")
                  if (formElements) {
                    formElements.style.display = "none"; // hide form
                  }
                  var thankYouMessage = form.querySelector(".thankyou_message");
                  if (thankYouMessage) {
                    thankYouMessage.style.display = "block";
                  }
                }
            };
            // url encode form data for sending as post data
            var encoded = Object.keys(data).map(function(k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
            }).join('&');
            xhr.send(encoded);
          }
        }

       
    }
      
  
    //   disableAllButtons(form);
    //   var url = form.action;
    //   var xhr = new XMLHttpRequest();
    //   xhr.open('POST', url);
    //   // xhr.withCredentials = true;
    //   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //   xhr.onreadystatechange = function() {
    //       if (xhr.readyState === 4 && xhr.status === 200) {
    //         form.reset();
    //         var formElements = form.querySelector(".form-elements")
    //         if (formElements) {
    //           formElements.style.display = "none"; // hide form
    //         }
    //         var thankYouMessage = form.querySelector(".thankyou_message");
    //         if (thankYouMessage) {
    //           thankYouMessage.style.display = "block";
    //         }
    //       }
    //   };
    //   // url encode form data for sending as post data
    //   var encoded = Object.keys(data).map(function(k) {
    //       return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    //   }).join('&');
    //   xhr.send(encoded);
    // }
    
    function loaded() {
      // bind to the submit event of our form
      var forms = document.querySelectorAll("form.gform");
      for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", handleFormSubmit, false);
      }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);
  
    // function disableAllButtons(form) {
    //   var buttons = form.querySelectorAll("button");
    //   for (var i = 0; i < buttons.length; i++) {
    //     buttons[i].disabled = true;
    //   }
    // }
    
  })();

// function check(){
   
//   var email = document.getElementById("email").value;
//   if (email != "") {
//       var exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
//       if (exptext.test(email) == false) {
//           //이메일 형식이 알파벳+숫자@알파벳+숫자.알파벳+숫자 형식이 아닐경우			
//           alert("wrong email type");
//           document.formtag.email.focus();
//           document.getElementById("form태그의 id").action = " ";
//       }
//   }else{
//       if(email.trim().length === 0){
//           return
//       }
//   }}

function play(){
    const audio = document.querySelector('#audio1')
    audio.play()
}

document.querySelector('.bgsound-stop').addEventListener('click', ()=>{
    const audio = document.querySelector('#audio1')
    audio.pause()
    audio.load()
})