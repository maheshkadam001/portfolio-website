<?php
// Prevent direct access
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Set content type for JSON response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$to_email = "maheshramprasadkadam@gmail.com";
$from_name = "Portfolio Website";
$from_email = "noreply@maheshkadam.com"; // You should use your domain email

// Function to sanitize input
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Function to validate email
function validate_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

try {
    // Get POST data
    $input = json_decode(file_get_contents('php://input'), true);
    
    // If no JSON data, try regular POST
    if (!$input) {
        $input = $_POST;
    }
    
    // Validate required fields
    $required_fields = ['name', 'email', 'subject', 'message'];
    $errors = [];
    
    foreach ($required_fields as $field) {
        if (!isset($input[$field]) || empty(trim($input[$field]))) {
            $errors[] = ucfirst($field) . " is required";
        }
    }
    
    if (!empty($errors)) {
        echo json_encode([
            'success' => false, 
            'message' => 'Validation failed',
            'errors' => $errors
        ]);
        exit;
    }
    
    // Sanitize inputs
    $name = sanitize_input($input['name']);
    $email = sanitize_input($input['email']);
    $subject = sanitize_input($input['subject']);
    $message = sanitize_input($input['message']);
    
    // Validate email format
    if (!validate_email($email)) {
        echo json_encode([
            'success' => false, 
            'message' => 'Invalid email address'
        ]);
        exit;
    }
    
    // Validate name length
    if (strlen($name) < 2) {
        echo json_encode([
            'success' => false, 
            'message' => 'Name must be at least 2 characters long'
        ]);
        exit;
    }
    
    // Validate message length
    if (strlen($message) < 10) {
        echo json_encode([
            'success' => false, 
            'message' => 'Message must be at least 10 characters long'
        ]);
        exit;
    }
    
    // Create email subject
    $email_subject = "Portfolio Contact: " . $subject;
    
    // Create email body
    $email_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #D4AF37; color: #000; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #D4AF37; }
        .footer { background: #333; color: #fff; padding: 10px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
            <p>Portfolio Website - Mahesh Kadam</p>
        </div>
        
        <div class='content'>
            <div class='field'>
                <span class='label'>Name:</span><br>
                " . htmlspecialchars($name) . "
            </div>
            
            <div class='field'>
                <span class='label'>Email:</span><br>
                " . htmlspecialchars($email) . "
            </div>
            
            <div class='field'>
                <span class='label'>Subject:</span><br>
                " . htmlspecialchars($subject) . "
            </div>
            
            <div class='field'>
                <span class='label'>Message:</span><br>
                " . nl2br(htmlspecialchars($message)) . "
            </div>
            
            <div class='field'>
                <span class='label'>Sent on:</span><br>
                " . date('Y-m-d H:i:s') . " (Server Time)
            </div>
            
            <div class='field'>
                <span class='label'>IP Address:</span><br>
                " . $_SERVER['REMOTE_ADDR'] . "
            </div>
        </div>
        
        <div class='footer'>
            <p>This message was sent from your portfolio website contact form.</p>
            <p>Please reply directly to: " . htmlspecialchars($email) . "</p>
        </div>
    </div>
</body>
</html>";
    
    // Create headers
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . $from_name . ' <' . $from_email . '>',
        'Reply-To: ' . $name . ' <' . $email . '>',
        'X-Mailer: PHP/' . phpversion(),
        'X-Priority: 1',
        'Importance: High'
    ];
    
    // Send email
    $mail_sent = mail($to_email, $email_subject, $email_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        // Log the successful submission (optional)
        $log_entry = date('Y-m-d H:i:s') . " - Contact form submitted by: $name ($email) - Subject: $subject\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        echo json_encode([
            'success' => true, 
            'message' => 'Thank you! Your message has been sent successfully. I will get back to you soon.'
        ]);
    } else {
        echo json_encode([
            'success' => false, 
            'message' => 'Sorry, there was an error sending your message. Please try again later or contact me directly.'
        ]);
    }
    
} catch (Exception $e) {
    // Log error (in production, don't expose error details)
    error_log("Contact form error: " . $e->getMessage());
    
    echo json_encode([
        'success' => false, 
        'message' => 'An unexpected error occurred. Please try again later.'
    ]);
}
?>