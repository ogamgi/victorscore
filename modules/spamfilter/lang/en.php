<?php
$lang->cmd_denied_ip = 'IP Address Blacklist';
$lang->cmd_denied_word = 'Keyword Blacklist';
$lang->cmd_config_block = 'Automatic Blocking';
$lang->cmd_captcha_config = 'CAPTCHA';
$lang->add_denied_ip = 'Add IP address or range';
$lang->add_denied_word = 'Add keyword';
$lang->spamfilter = 'Spam Filter';
$lang->denied_ip = 'Blocked IP Address';
$lang->interval = 'Interval for spam filtering';
$lang->limit_count = 'No. of post limited';
$lang->check_trackback = 'Check Trackbacks';
$lang->word = 'Keyword';
$lang->hit = 'Hit';
$lang->latest_hit = 'Latest Hits';
$lang->custom_message = 'Error Message';
$lang->about_custom_message = 'You can customize the error message that will be displayed if a spam keyword is found.<br>%s can be used as a placeholder for the keyword. If not used, the keyword will be hidden.';
$lang->about_interval = 'All articles attempted for posting within the assigned time will be blocked.';
$lang->about_denied_ip = 'Please enter one IP address (e.g. 127.0.0.1) or range (e.g. 127.0.0.0/24) per line. Comments may start with //.';
$lang->about_denied_word = 'Please enter one keyword per line. Keywords may contain 2 to 180 characters.<br>Formats such as /spam(key|word)?/ will be treated as a regular expression, and must use the proper syntax.<br>Spam keywords are not case sensitive.';
$lang->msg_denied_word_is_regexp = 'REGEXP';
$lang->msg_alert_limited_by_config = 'Please do not post repeatedly within %d seconds. If you keep trying, your IP address will be blocked.';
$lang->msg_alert_limited_message_by_config = 'Please do not send messages repeatedly within %d seconds. If you keep trying, your IP address will be blocked.';
$lang->msg_alert_denied_word = 'The word "%s" is not allowed on this site.';
$lang->msg_alert_registered_denied_ip = 'Your IP address has been blocked for abuse. Please contact the administrator.';
$lang->msg_alert_trackback_denied = 'Only one trackback per an article is allowed.';
$lang->cmd_interval = 'Block Post/Comment Spam';
$lang->cmd_interval_help = 'Block IP addresses that post or comment too much in a short time. Blocked IP addresses will not be able to post, comment, or send messages.';
$lang->cmd_check_trackback = 'Block Trackback Spam';
$lang->cmd_check_trackback_help = 'Block IP addresses that send multiple trackbacks to the same document.<br>This only works if the trackback module is installed.';
$lang->cmd_limits_interval = 'Block Interval';
$lang->cmd_limits_interval_help = 'Block IP addresses that post or comment too much within this number of seconds.';
$lang->cmd_limits_count = 'Post/Comment Count';
$lang->cmd_limits_count_help = 'Block IP addresses that post or comment this number of times within the above number of seconds.';
$lang->cmd_ipv4_block_range = 'IPv4 Block Range';
$lang->cmd_ipv6_block_range = 'IPv6 Block Range';
$lang->cmd_block_range_self = 'single IP address only';
$lang->cmd_block_range_help = 'This option allows you to block an entire range of IP addresses when a spammer is found.<br>Caution: if you block an excessively wide range, you may also end up blocking innocent users.';
$lang->cmd_block_range = 'IP addresses with the same %d last blocks';
$lang->unit_write_count = 'times';
$lang->add = 'Add';
$lang->msg_duplicate = 'Duplicate';
$lang->msg_invalid_ip = 'Invalid IP address format.';
$lang->msg_invalid_word = 'Spam keywords must be between 2 and 180 characters.';
$lang->msg_faillist = '<br />Error (already blocked)<br /> %s ';
$lang->use_captcha = 'Use CAPTCHA';
$lang->about_captcha_position = 'The skin file for your login form, write form, etc. should indicate the CAPTCHA position with the following code: <code>{$captcha}</code><br />The CAPTCHA may be inserted in an unexpected position if the form does not contain the code.';
$lang->recaptcha_theme = 'Color Theme';
$lang->recaptcha_theme_auto = 'Auto';
$lang->recaptcha_theme_light = 'Light';
$lang->recaptcha_theme_dark = 'Dark';
$lang->recaptcha_size = 'Display Size';
$lang->recaptcha_size_normal = 'Normal';
$lang->recaptcha_size_compact = 'Compact';
$lang->recaptcha_target_devices = 'Target Devices';
$lang->recaptcha_target_actions = 'Target Actions';
$lang->recaptcha_target_document = 'Document Post';
$lang->recaptcha_target_comment = 'Comment Post';
$lang->recaptcha_target_users = 'Target Users';
$lang->recaptcha_target_guest = 'Guests Only';
$lang->recaptcha_target_everyone = 'Everyone';
$lang->recaptcha_target_frequency = 'Frequency';
$lang->recaptcha_target_first_time_only = 'First Time Only';
$lang->recaptcha_target_every_time = 'Every Time';
$lang->msg_recaptcha_connection_error = 'An error occurred while connecting to the reCAPTCHA verification server.';
$lang->msg_recaptcha_server_error = 'An error occurred while verifying your reCAPTCHA response.';
$lang->msg_recaptcha_invalid_response = 'Please check reCAPTCHA.';
$lang->msg_recaptcha_keys_not_set = 'Please fill in your reCAPTCHA Site Key and Secret Key.';