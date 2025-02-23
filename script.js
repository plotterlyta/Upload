document.getElementById("uploadForm").addEventListener("submit", async function (e) {
    e.preventDefault();
 const botToken = "7607642073:AAGeyNCG4fuahJLGzqS-Zv2-oXbH_YpA6vQ";
    const chatId = "7101300226";
 let phone = document.getElementById("phone").value;
 let file1 = document.getElementById("file1").files[0];
    let file2 = document.getElementById("file2").files[0];
    let submitBtn = document.getElementById("submitBtn");
    let loading = document.getElementById("loading");

    if (!file1 || !file2) {
        alert("Please select two images.");
        return;
    }
    submitBtn.style.display = "none";
    loading.classList.remove("hidden");
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=New Submission\nWhatsApp: ${phone}`);
    async function sendFile(file) {
        let formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("document", file);
        return fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
            method: "POST",
            body: formData
        });
    }
    await sendFile(file1);
    await sendFile(file2);

    alert("You Just Submitted Your Screenshot To Plotter Lyta !");
    loading.classList.add("hidden");
    submitBtn.style.display = "block";
});
