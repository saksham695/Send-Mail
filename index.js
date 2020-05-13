function sendEmail() {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "",
    Password: "##",
    To: "",
    From: "",
    Subject: "New Mail",
    Body: "email body",
  }).then((message) => alert("mail sent successfully"));
}
