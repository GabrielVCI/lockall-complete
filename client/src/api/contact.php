<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode([
        "ok" => false,
        "message" => "Method not allowed"
    ]);
    exit;
}

function respond($status, $data) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

function escape_html($text) {
    return htmlspecialchars((string)$text, ENT_QUOTES | ENT_SUBSTITUTE, "UTF-8");
}

function is_valid_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!$data || !is_array($data)) {
    respond(400, [
        "ok" => false,
        "message" => "Invalid JSON payload"
    ]);
}

$requiredFields = [
    "institution",
    "country",
    "institutionType",
    "volume",
    "deviceType",
    "role",
    "email",
    "message"
];

foreach ($requiredFields as $field) {
    if (!isset($data[$field]) || trim((string)$data[$field]) === "") {
        respond(400, [
            "ok" => false,
            "message" => "Field \"$field\" is required"
        ]);
    }
}

if (!is_valid_email($data["email"])) {
    respond(400, [
        "ok" => false,
        "message" => "Invalid email format"
    ]);
}

$institution     = escape_html($data["institution"]);
$country         = escape_html($data["country"]);
$institutionType = escape_html($data["institutionType"]);
$volume          = escape_html($data["volume"]);
$deviceType      = escape_html($data["deviceType"]);
$role            = escape_html($data["role"]);
$email           = escape_html($data["email"]);
$phone           = isset($data["phone"]) ? escape_html($data["phone"]) : "N/A";
$message         = escape_html($data["message"]);

$to = "info@lockall.co";
$subject = "New Corporate Contact Request — " . $institution;

$html = '
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>New Corporate Contact Request — LOCKALL</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; background: #f3f4f6; margin: 0; padding: 20px;">
  <div style="max-width: 700px; margin: 0 auto; background: #fff; border-radius: 10px; overflow: hidden;">
    <div style="background-color: #0ea5e9; color: white; padding: 24px;">
      <h1 style="margin: 0 0 6px 0;">New Corporate Contact Request</h1>
      <p style="margin: 0;">LOCKALL - Contact Form Submission</p>
    </div>

    <div style="padding: 24px;">
      <p>A new corporate contact request has been received from the LOCKALL website.</p>

      <table style="width: 100%; border-collapse: collapse; margin-top: 12px;">
        <tr>
          <th style="padding: 12px; border: 1px solid #d1d5db; text-align:left;">Field</th>
          <th style="padding: 12px; border: 1px solid #d1d5db; text-align:left;">Value</th>
        </tr>
        <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Institution</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">' . $institution . '</td></tr>
        <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Country</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">' . $country . '</td></tr>
        <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Institution Type</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">' . $institutionType . '</td></tr>
        <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Monthly Volume</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">' . $volume . '</td></tr>
        <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Device Type</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">' . $deviceType . '</td></tr>
        <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Role</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">' . $role . '</td></tr>
        <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Corporate Email</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">' . $email . '</td></tr>
        <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Phone</strong></td><td style="padding: 12px; border: 1px solid #d1d5db;">' . $phone . '</td></tr>
        <tr><td style="padding: 12px; border: 1px solid #d1d5db;"><strong>Message</strong></td><td style="padding: 12px; border: 1px solid #d1d5db; white-space: pre-wrap;">' . nl2br($message) . '</td></tr>
      </table>

      <p style="margin-top:20px; font-size:12px; color:#6b7280;">
        Timestamp: ' . date("c") . '
      </p>
    </div>
  </div>
</body>
</html>
';

$headers = [];
$headers[] = "MIME-Version: 1.0";
$headers[] = "Content-type: text/html; charset=UTF-8";
$headers[] = "From: Lockall Website <info@lockall.co>";
$headers[] = "Reply-To: " . $data["email"];
$headers[] = "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $subject, $html, implode("\r\n", $headers));

if (!$sent) {
    respond(500, [
        "ok" => false,
        "message" => "Failed to send email"
    ]);
}

respond(200, [
    "ok" => true,
    "message" => "Contact form submitted successfully"
]);